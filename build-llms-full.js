#!/usr/bin/env node
/**
 * Build the llms-full.txt files: the text of every page in sitemap.xml as plain
 * text, so an AI assistant or agent gets the whole site in one request
 * (companion to the hand-written llms.txt, which is the short index).
 *
 * One file per language, because all three together are ~1.8 MB:
 *   /llms-full.txt     Finnish (canonical)
 *   /sv/llms-full.txt  Swedish
 *   /en/llms-full.txt  English
 *
 * Per page: title, URL, sitemap lastmod, then the page's <main> converted to
 * light Markdown (headings, list items, table rows). Navigation, header, footer,
 * scripts, forms, images and symbol-only lines (emoji icons, rating stars) are
 * dropped. Order inside a file: home, price list, other pages, articles, then
 * the privacy/media/partner pages, so a reader that truncates still gets the
 * clinic facts first.
 *
 * Deterministic (no build date in the output), so an unchanged site gives
 * unchanged files. The pre-commit hook in .githooks/ runs this whenever HTML or
 * sitemap.xml is committed, and stages the result.
 *
 * Run: node build-llms-full.js            (writes the three files)
 *      node build-llms-full.js --check    (exit 1 if any file is out of date)
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const HOST = 'https://elainklinikkasaari.fi';
const OUT = { fi: 'llms-full.txt', sv: 'sv/llms-full.txt', en: 'en/llms-full.txt' };
const LANG_NAME = { fi: 'Finnish', sv: 'Swedish', en: 'English' };

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', shy: '',
  auml: 'ä', Auml: 'Ä', ouml: 'ö', Ouml: 'Ö', aring: 'å', Aring: 'Å', uuml: 'ü', Uuml: 'Ü',
  eacute: 'é', Eacute: 'É', egrave: 'è', aacute: 'á', oacute: 'ó', szlig: 'ß',
  ndash: '–', mdash: '—', hellip: '…', euro: '€', middot: '·', times: '×', deg: '°',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', laquo: '«', raquo: '»', bull: '•',
  rarr: '→', larr: '←', copy: '©', reg: '®', trade: '™', plusmn: '±', le: '≤', ge: '≥',
  frac12: '½', sup2: '²', micro: 'µ', minus: '−', thinsp: ' ', ensp: ' ', emsp: ' ', zwj: '', zwnj: '',
};

function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z0-9]+);/gi, (m, e) => {
    if (e[0] === '#') {
      const cp = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : m;
    }
    return e in ENTITIES ? ENTITIES[e] : m;
  });
}

function urlToFile(url) {
  let p = decodeURI(url.slice(HOST.length));
  if (p === '' || p === '/') return 'index.html';
  if (p.endsWith('/')) return p.slice(1) + 'index.html';
  if (p.endsWith('.html')) return p.slice(1);
  return p.slice(1) + '/index.html';
}

function langOf(url) {
  const p = url.slice(HOST.length);
  if (p.startsWith('/sv/')) return 'sv';
  if (p.startsWith('/en/')) return 'en';
  return 'fi';
}

// 0 home · 1 price list · 2 everything else · 3 articles · 4 privacy, media, partner pages
function rank(url) {
  const p = url.slice(HOST.length);
  if (/^\/((sv|en)\/)?$/.test(p)) return 0;
  if (/^\/((sv|en)\/)?(hinnasto|prislista|pricelist)\//.test(p)) return 1;
  if (/^\/((sv|en)\/)?(tietosuoja|media|yhteistyo|kissatalo|vesy)\//.test(p)) return 4;
  if (/\/(articles|artiklar|artikkelit)\//.test(p)) return 3;
  return 2;
}

function pageText(html) {
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1]).replace(/\s+/g, ' ').trim();
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  let body = main ? main[1] : (html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i) || [, html])[1];

  body = body
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|noscript|svg|template|iframe|form|button|select|nav|header|footer|video|audio|picture)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<(img|input|source|track|hr)\b[^>]*>/gi, '');

  body = body
    .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (m, n, t) => `\n\n${'#'.repeat(Math.min(6, Number(n) + 1))} ${t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')}\n\n`)
    .replace(/<li\b[^>]*>/gi, '\n- ')
    .replace(/<(td|th)\b[^>]*>/gi, ' | ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(p|div|section|article|aside|ul|ol|li|table|thead|tbody|tr|figure|figcaption|details|summary|dl|dt|dd|blockquote)\b[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');

  const lines = decode(body).split('\n')
    .map(l => l.replace(/[ \t ]+/g, ' ').replace(/ ([.,;:!?)])/g, '$1').replace(/\( /g, '(').trim())
    .map(l => l.replace(/^\| /, '').replace(/^- \| /, '- '))
    .filter(l => /[\p{L}\p{N}]/u.test(l.replace(/^#+/, '')));

  // Blank line around headings only; consecutive body lines stay together.
  const out = [];
  for (const l of lines) {
    if (l.startsWith('#')) out.push('', l, '');
    else out.push(l);
  }
  return { title, text: out.join('\n').replace(/\n{3,}/g, '\n\n').trim() };
}

function build() {
  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => ({
    loc: (m[1].match(/<loc>([^<]+)<\/loc>/) || [])[1],
    lastmod: (m[1].match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1] || '',
  })).filter(e => e.loc && e.loc.startsWith(HOST));

  const groups = { fi: [], sv: [], en: [] };
  const missing = [];
  entries.forEach((e, i) => {
    const file = path.join(ROOT, urlToFile(e.loc));
    if (!fs.existsSync(file)) { missing.push(e.loc); return; }
    const { title, text } = pageText(fs.readFileSync(file, 'utf8'));
    if (!text) return;
    groups[langOf(e.loc)].push({
      rank: rank(e.loc), i,
      block: `---\n\n# ${title}\n\nURL: ${e.loc}\n${e.lastmod ? `Last updated: ${e.lastmod}\n` : ''}\n${text}\n`,
    });
  });

  const llms = fs.readFileSync(path.join(ROOT, 'llms.txt'), 'utf8');
  const summary = (llms.match(/^> .*$/m) || [''])[0];
  const others = l => Object.keys(OUT).filter(x => x !== l)
    .map(x => `${LANG_NAME[x]}: ${HOST}/${OUT[x]}`).join(' · ');

  const files = {};
  for (const lang of Object.keys(OUT)) {
    const pages = groups[lang].sort((a, b) => a.rank - b.rank || a.i - b.i);
    const head = [
      `# Eläinklinikka Saari — full site text (${LANG_NAME[lang]})`,
      '',
      summary,
      '',
      `> The text of all ${pages.length} ${LANG_NAME[lang]} pages on ${HOST}, generated from the live pages: home and price list first, articles near the end. Same content in other languages: ${others(lang)}. Short index: ${HOST}/llms.txt. Machine-readable prices: ${HOST}/pricing.md. Prices are in euros including VAT. When this file and a page disagree, the page is correct.`,
      '',
    ].join('\n');
    files[lang] = head + '\n' + pages.map(p => p.block).join('\n');
  }
  return { files, missing };
}

const { files, missing } = build();
if (process.argv.includes('--check')) {
  const stale = Object.keys(OUT).filter(l => {
    const f = path.join(ROOT, OUT[l]);
    return !fs.existsSync(f) || fs.readFileSync(f, 'utf8') !== files[l];
  });
  if (stale.length) { console.error(`out of date: ${stale.map(l => OUT[l]).join(', ')} (run node build-llms-full.js)`); process.exit(1); }
  process.exit(0);
}
for (const [lang, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(ROOT, OUT[lang]), content);
  console.log(`${OUT[lang]}: ${(content.match(/^URL: /gm) || []).length} pages, ${(Buffer.byteLength(content) / 1024).toFixed(0)} KB`);
}
for (const m of missing) console.warn(`  missing file for ${m}`);
