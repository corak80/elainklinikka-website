'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { HOST, KEY, KEY_LOCATION, parseSitemap, fileToUrl, changedUrls, sinceUrls, payload } = require('./indexnow');

const ROOT = path.join(__dirname, '..', '..');
const u = p => `https://${HOST}${p}`;
const xml = entries => `<?xml version="1.0"?><urlset>${entries.map(([loc, mod]) =>
  `<url><loc>${loc}</loc><lastmod>${mod}</lastmod><xhtml:link rel="alternate" hreflang="sv" href="${u('/sv/')}"/></url>`).join('')}</urlset>`;

test('key file at the site root matches the key', () => {
  assert.strictEqual(fs.readFileSync(path.join(ROOT, `${KEY}.txt`), 'utf8').trim(), KEY);
  assert.strictEqual(KEY_LOCATION, `https://${HOST}/${KEY}.txt`);
});

test('parseSitemap reads loc + lastmod, ignores alternates and other hosts', () => {
  const m = parseSitemap(xml([[u('/'), '2026-10-06'], [u('/palvelut/'), '2026-10-14'], ['https://example.com/x/', '2026-01-01']]));
  assert.deepStrictEqual(m, { [u('/')]: '2026-10-06', [u('/palvelut/')]: '2026-10-14' });
});

test('the real sitemap parses to the expected size', () => {
  const m = parseSitemap(fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8'));
  assert.ok(Object.keys(m).length > 150, 'sitemap looks truncated');
  assert.ok(u('/palvelut/rehumyynti/') in m);
});

test('fileToUrl maps index.html files to directory URLs and skips non-HTML', () => {
  assert.strictEqual(fileToUrl('index.html'), u('/'));
  assert.strictEqual(fileToUrl('palvelut/rehumyynti/index.html'), u('/palvelut/rehumyynti/'));
  assert.strictEqual(fileToUrl('sv/index.html'), u('/sv/'));
  assert.strictEqual(fileToUrl('404.html'), u('/404.html'));
  assert.strictEqual(fileToUrl('css/style.css'), null);
});

test('changedUrls: lastmod moved, added, removed, and touched files that are in the sitemap', () => {
  const oldMap = { [u('/')]: '2026-10-06', [u('/a/')]: '2026-10-01', [u('/gone/')]: '2026-09-01', [u('/same-day/')]: '2026-10-14' };
  const newMap = { [u('/')]: '2026-10-06', [u('/a/')]: '2026-10-14', [u('/new/')]: '2026-10-14', [u('/same-day/')]: '2026-10-14' };
  const files = ['same-day/index.html', '404.html', 'css/style.css', 'not-in-sitemap/index.html'];
  assert.deepStrictEqual(changedUrls(oldMap, newMap, files), [u('/a/'), u('/gone/'), u('/new/'), u('/same-day/')]);
});

test('changedUrls: nothing changed -> nothing sent', () => {
  const m = { [u('/')]: '2026-10-06' };
  assert.deepStrictEqual(changedUrls(m, { ...m }, ['css/style.css']), []);
});

test('sinceUrls picks pages with lastmod on or after the date', () => {
  const m = { [u('/a/')]: '2026-09-30', [u('/b/')]: '2026-10-01', [u('/c/')]: '2026-10-14' };
  assert.deepStrictEqual(sinceUrls(m, '2026-10-01'), [u('/b/'), u('/c/')]);
});

test('payload carries host, key and key location', () => {
  assert.deepStrictEqual(payload([u('/')]), { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: [u('/')] });
});
