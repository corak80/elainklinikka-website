#!/usr/bin/env node
/**
 * Check that the dental "typical price" change is complete and that no
 * "estimate before the procedure" promise is left (FI/SV/EN).
 * Spec: docs/superpowers/specs/2026-11-16-dental-typical-price-design.md
 *
 * Run: node tools/check-dental-price.js          (files on disk)
 *      node tools/check-dental-price.js --live   (https://elainklinikkasaari.fi)
 * Exit 0 = clean. Otherwise one line per failure: "<file>: <reason>".
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LIVE = process.argv.includes('--live');
const BASE = 'https://elainklinikkasaari.fi/';
const W = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/superpowers/specs/2026-11-16-dental-typical-price-wording.json'), 'utf8'));
const LANGS = ['fi', 'sv', 'en'];

const PRICE_LISTS = { fi: 'hinnasto/index.html', sv: 'sv/prislista/index.html', en: 'en/pricelist/index.html' };
const DENTAL = { fi: 'palvelut/hammashoito/index.html', sv: 'sv/tjanster/tandvard/index.html', en: 'en/services/dental-care/index.html' };
const ARTICLES = { fi: 'articles/hammasresorptio.html', sv: 'sv/artiklar/tandresorption.html', en: 'en/articles/tooth-resorption.html' };

// Old promises that must be gone everywhere (case-insensitive).
const BANNED = [
  'hinta-arvio tutkimuksen jälkeen', 'hinta-arviolla', 'saat hinta-arvion ennen toimenpidettä',
  'hinta-arviot suoraan klinikalta', 'kostnadsförslag', 'prisuppskattningar direkt',
  'by estimate', 'price estimates directly', 'ask the clinic for estimates',
  'receive an estimate before the procedure', 'cost estimate for any extractions',
  'estimate after examination', 'prisuppskattning',
];
// llms-full.txt also carries other pages' legitimate "kostnadsförslag" (emergency visit), so it gets the
// dental-specific Swedish phrases instead of the generic word.
const BANNED_LLMS = BANNED.filter((b) => b !== 'kostnadsförslag').concat([
  'enligt kostnadsförslag', 'kostnadsförslag efter undersökning', 'ett kostnadsförslag före ingreppet',
]);
const LLMS = { fi: 'llms-full.txt', sv: 'sv/llms-full.txt', en: 'en/llms-full.txt' };

const failures = [];
const fail = (file, reason) => failures.push(`${file}: ${reason}`);

// main.js stores non-ASCII as \xNN / \uNNNN; turn a plain string into that form.
const escapeLikeMainJs = (s) => s.replace(/[^\x00-\x7f]/g, (c) => {
  const n = c.charCodeAt(0);
  return n < 256 ? '\\x' + n.toString(16).toUpperCase().padStart(2, '0') : '\\u' + n.toString(16).toUpperCase().padStart(4, '0');
});
const decodeEntities = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;|&#x27;|&apos;|&rsquo;/g, "'")
  .replace(/&ndash;/g, '–').replace(/&euro;/g, '€').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&amp;/g, '&');
const norm = (s) => decodeEntities(s).replace(/\s+/g, ' ').replace(/[’]/g, "'");
const plain = (s) => norm(s.replace(/<[^>]+>/g, ''));

async function read(rel) {
  if (!LIVE) return fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const url = BASE + rel.replace(/index\.html$/, '');
  const r = await fetch(url, { headers: { 'cache-control': 'no-cache' } });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return r.text();
}

function checkBanned(file, text, escaped, list = BANNED) {
  const hay = norm(text).toLowerCase();
  for (const b of list) {
    if (hay.includes(b)) fail(file, `old promise still present: "${b}"`);
    if (escaped && text.toLowerCase().includes(escapeLikeMainJs(b).toLowerCase())) fail(file, `old promise still present (escaped): "${b}"`);
  }
}
function requireText(file, text, needle, label) {
  if (!norm(text).includes(norm(needle))) fail(file, `missing ${label}: "${needle}"`);
}
function ldBlocks(file, html) {
  const out = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    try { out.push(JSON.parse(m[1])); } catch (e) { fail(file, `JSON-LD does not parse: ${e.message}`); }
  }
  return out;
}
function faqAnswer(blocks, question) {
  for (const b of blocks) {
    for (const it of (Array.isArray(b) ? b : (b['@graph'] || [b]))) {
      if (it['@type'] !== 'FAQPage') continue;
      for (const q of it.mainEntity || []) if (norm(q.name) === norm(question)) return q.acceptedAnswer && q.acceptedAnswer.text;
    }
  }
  return null;
}

async function main() {
  for (const lang of LANGS) {
    const need = (k) => {
      const v = W[k] && W[k][lang];
      if (!v) fail('wording.json', `no ${lang} text for ${k}`);
      return v || `<missing ${k}.${lang}>`;
    };
    const vCat = need('valueCat'), vDog = need('valueDog');

    const pl = PRICE_LISTS[lang], plHtml = await read(pl);
    checkBanned(pl, plHtml);
    requireText(pl, plHtml, need('rowCat'), 'cat row name');
    requireText(pl, plHtml, vCat, 'cat typical price');
    requireText(pl, plHtml, need('rowDog'), 'dog row name');
    requireText(pl, plHtml, vDog, 'dog typical price');
    requireText(pl, plHtml, need('noteShort'), 'typical-price note');
    requireText(pl, plain(plHtml), need('rowIncludes'), 'what the price includes (row line)');

    const dp = DENTAL[lang], dpHtml = await read(dp);
    checkBanned(dp, dpHtml);
    requireText(dp, plain(dpHtml), vCat, 'cat typical price');
    requireText(dp, plain(dpHtml), vDog, 'dog typical price');
    requireText(dp, plain(dpHtml), need('whyHeading'), 'why-heading');
    requireText(dp, plain(dpHtml), need('rowIncludes'), 'what the price includes (row line)');
    requireText(dp, plain(dpHtml), plain(need('whyText')), 'why-text');
    requireText(dp, plain(dpHtml), plain(need('twoVisitsText')), 'two-visits text');
    if (!/id="extraction-price"/.test(dpHtml)) fail(dp, 'missing anchor id="extraction-price"');
    const t = (dpHtml.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
    if (norm(t) !== norm(need('title'))) fail(dp, `title is "${norm(t)}"`);
    const md = (dpHtml.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    if (norm(md) !== norm(need('metaDescription'))) fail(dp, `meta description is "${norm(md)}"`);
    const ans = faqAnswer(ldBlocks(dp, dpHtml), W._meta.faqQuestionExisting[lang]);
    if (!ans) fail(dp, 'FAQPage answer for the extraction-cost question not found');
    else if (!norm(ans).includes(norm(vCat)) || !norm(ans).includes(norm(vDog))) fail(dp, 'FAQPage answer lacks the typical prices');

    const lf = LLMS[lang], lfText = await read(lf);
    checkBanned(lf, lfText, false, BANNED_LLMS);
    requireText(lf, lfText, need('whyHeading'), 'why-heading');
    requireText(lf, lfText, vCat, 'cat typical price');

    const ar = ARTICLES[lang], arHtml = await read(ar);
    checkBanned(ar, arHtml);
    ldBlocks(ar, arHtml);
    if (!arHtml.includes(`href="${W._meta.articleLinks[lang]}"`)) fail(ar, `missing link to ${W._meta.articleLinks[lang]}`);
    requireText(ar, plain(arHtml), vCat, 'cat typical price');
  }

  const mainJs = await read('js/main.js');
  checkBanned('js/main.js', mainJs, true);
  for (const lang of LANGS) {
    const note = W.noteShort && W.noteShort[lang];
    if (note && !mainJs.includes(escapeLikeMainJs(note)) && !mainJs.includes(note)) fail('js/main.js', `missing ${lang} note`);
  }
  if (!LIVE) {
    const src = fs.readFileSync(path.join(ROOT, 'js/main.src.js'), 'utf8');
    checkBanned('js/main.src.js', src);
    for (const lang of LANGS) if (W.noteShort && W.noteShort[lang] && !src.includes(W.noteShort[lang])) fail('js/main.src.js', `missing ${lang} note`);
  }
  const pricing = await read('pricing.md');
  checkBanned('pricing.md', pricing);
  requireText('pricing.md', pricing, '(typical): about 700 €', 'cat line');
  requireText('pricing.md', pricing, '(typical): about 880 €', 'dog line');

  if (failures.length) { console.log(failures.join('\n')); process.exit(1); }
}

main().catch((e) => { console.log(`error: ${e.message}`); process.exit(2); });
