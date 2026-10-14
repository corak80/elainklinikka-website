'use strict';
// IndexNow: tell Bing (and Yandex/Seznam/Naver, which share api.indexnow.org) which pages changed,
// so they recrawl them now instead of whenever. Added 14-10-2026: ChatGPT search leans on Bing.
// Same idea as ~/kauppa/deploy/indexnow.js, but this site has no deploy script: GitHub Pages
// publishes every push to main, so .github/workflows/indexnow.yml runs this after each push.
//
// Changed URL = a sitemap page whose <lastmod> moved, that was added or removed, or whose HTML file
// was touched by the push (a second edit on the same day leaves lastmod alone). Stateless: the
// push's before/after commits are compared through the GitHub API. Waits for the Pages build of
// the pushed commit before pinging, so Bing doesn't recrawl the old page. Never fails the push.
//   node .github/scripts/indexnow.js                    (in Actions: BEFORE, AFTER, GITHUB_TOKEN, GITHUB_REPOSITORY)
//   node .github/scripts/indexnow.js --since 2026-10-01 ping every page with lastmod >= that date
//   add --dry-run to print the URLs and send nothing
// Tests: node --test .github/scripts/indexnow.test.js
const fs = require('node:fs');
const path = require('node:path');

const HOST = 'elainklinikkasaari.fi';
const KEY = '8906b1226252f800b3a6d71a8250cdeb'; // public by design; must match /<KEY>.txt at the site root
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITEMAP = path.join(__dirname, '..', '..', 'sitemap.xml');
const BUILD_WAIT_MS = 20 * 60 * 1000; // Pages builds take ~1 min, the worst seen was ~9 min
const POLL_MS = 30 * 1000;

// { loc: lastmod } for every <url> on our host
function parseSitemap(xml) {
  const out = {};
  for (const [, body] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = ((/<loc>([^<]+)<\/loc>/.exec(body) || [])[1] || '').replace(/&amp;/g, '&').trim();
    try { if (new URL(loc).host !== HOST) continue; } catch { continue; }
    out[loc] = ((/<lastmod>([^<]+)<\/lastmod>/.exec(body) || [])[1] || '').trim();
  }
  return out;
}

// index.html -> https://host/ ; foo/index.html -> https://host/foo/ ; x.html -> https://host/x.html
function fileToUrl(file) {
  if (!file.endsWith('.html')) return null;
  const p = file.replace(/(^|\/)index\.html$/, '$1');
  return `https://${HOST}/${p}`;
}

// oldMap/newMap from parseSitemap, files = paths changed by the push. Only sitemap URLs are sent
// (404.html, tool pages and drafts are not), removed pages included so Bing sees the 404/redirect.
function changedUrls(oldMap, newMap, files = []) {
  const urls = new Set();
  for (const [loc, lastmod] of Object.entries(newMap)) if (oldMap[loc] !== lastmod) urls.add(loc);
  for (const loc of Object.keys(oldMap)) if (!(loc in newMap)) urls.add(loc);
  for (const f of files) {
    const u = fileToUrl(f);
    if (u && (u in newMap || u in oldMap)) urls.add(u);
  }
  return [...urls].sort();
}

function sinceUrls(newMap, since) {
  return Object.entries(newMap).filter(([, d]) => d >= since).map(([loc]) => loc).sort();
}

function payload(urls) {
  return { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function gh(pathname, accept = 'application/vnd.github+json') {
  const r = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}${pathname}`, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: accept, 'X-GitHub-Api-Version': '2022-11-28' },
  });
  if (!r.ok) throw new Error(`GitHub ${pathname} HTTP ${r.status}`);
  return accept.includes('raw') ? r.text() : r.json();
}

// True once Pages has built AFTER or a later commit that contains it.
async function built(after) {
  const b = await gh('/pages/builds/latest');
  if (b.status !== 'built' || !b.commit) return false;
  if (b.commit === after) return true;
  const c = await gh(`/compare/${after}...${b.commit}`);
  return c.status === 'ahead' || c.status === 'identical';
}

async function main(argv = process.argv.slice(2)) {
  const dry = argv.includes('--dry-run');
  const sinceAt = argv.indexOf('--since');
  const newMap = parseSitemap(fs.readFileSync(SITEMAP, 'utf8'));
  let urls;
  if (sinceAt !== -1) {
    urls = sinceUrls(newMap, argv[sinceAt + 1] || '');
  } else {
    const { BEFORE: before, AFTER: after } = process.env;
    if (!before || /^0+$/.test(before) || !after) { console.log('== IndexNow: no previous commit to compare, nothing sent'); return; }
    const oldMap = parseSitemap(await gh(`/contents/sitemap.xml?ref=${before}`, 'application/vnd.github.raw+json'));
    const cmp = await gh(`/compare/${before}...${after}`);
    // compare lists at most 300 files; past that, sitemap lastmods still catch the changed pages
    const files = (cmp.files || []).flatMap(f => [f.filename, f.previous_filename].filter(Boolean));
    urls = changedUrls(oldMap, newMap, files);
    if (urls.length && !dry) {
      const until = Date.now() + BUILD_WAIT_MS;
      while (!(await built(after).catch(() => false))) {
        if (Date.now() > until) { console.log('::warning::Pages build not finished after 20 min, pinging anyway'); break; }
        await sleep(POLL_MS);
      }
    }
  }
  if (!urls.length) { console.log('== IndexNow: no changed pages, nothing sent'); return; }
  if (dry) { console.log(`== IndexNow dry run: would send ${urls.length} URLs\n${urls.join('\n')}`); return; }

  // IndexNow fetches the key file to prove we own the host; if it isn't live, the ping is wasted.
  const keyRes = await fetch(`${KEY_LOCATION}?check=${Date.now()}`);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : '';
  if (keyBody !== KEY) throw new Error(`key file not served (${keyRes.status}) at ${KEY_LOCATION}`);

  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload(urls)),
  });
  // 200 = accepted, 202 = accepted while the key is still being verified (first ping)
  if (r.status !== 200 && r.status !== 202) throw new Error(`IndexNow HTTP ${r.status} ${(await r.text()).slice(0, 200)}`);
  console.log(`== IndexNow: sent ${urls.length} URLs, HTTP ${r.status}\n${urls.join('\n')}`);
}

module.exports = { HOST, KEY, KEY_LOCATION, parseSitemap, fileToUrl, changedUrls, sinceUrls, payload };

if (require.main === module) {
  main().catch(e => { console.log(`::warning::IndexNow ping failed (site is fine): ${e.message}`); });
}
