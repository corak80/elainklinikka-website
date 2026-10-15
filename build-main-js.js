#!/usr/bin/env node
/**
 * build-main-js.js — bundles js/main.src.js into js/main.js (the file browsers load).
 *
 * Usage: node build-main-js.js
 *
 * js/main.src.js stays the single source of truth: build-articles.js and
 * build-homepages.js read the full `translations` object from it. The runtime
 * bundle, however, drops every `article.*` translation key before minifying.
 * Reason (15-10-2026): those keys are the article bodies in three languages —
 * 608 KB of an 814 KB bundle — and no page needs them at runtime. Every article
 * has its own FI/SV/EN URL with the text already in the static HTML, and the
 * language toggle on article pages is a plain link, not an in-place switch; the
 * homepage (the only page that switches language in place) uses no `article.*`
 * key. setLanguage() simply leaves an element alone when its key is missing.
 *
 * The bundle is produced with the same esbuild flags as before
 * (`--minify --target=es2020`). Besides the smaller translations table, the code
 * after it is wrapped in an IIFE so internal names get minified; the functions the
 * pages call from inline handlers (EXPORTS below) are assigned to window.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'js', 'main.src.js');
const OUT = path.join(ROOT, 'js', 'main.js');
const DROP_PREFIXES = ['article.'];

// Return [start, end) of the `const translations = {...}` object literal in `src`.
function locateTranslations(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`translations object not found (marker "${marker}")`);
  let depth = 0;
  let inStr = null;
  let esc = false;
  for (let i = start + marker.length - 1; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (ch === '\\') { esc = true; continue; }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return [start + marker.length - 1, i + 1];
    }
  }
  throw new Error('translations object: matching brace not found');
}

const src = fs.readFileSync(SRC, 'utf8');
const [objStart, objEnd] = locateTranslations(src, 'const translations = {');
const full = vm.runInNewContext('(' + src.slice(objStart, objEnd) + ')');

const kept = {};
let dropped = 0;
let droppedBytes = 0;
for (const [key, value] of Object.entries(full)) {
  if (DROP_PREFIXES.some((p) => key.startsWith(p))) {
    dropped++;
    droppedBytes += JSON.stringify(value).length;
  } else {
    kept[key] = value;
  }
}

// Everything after the translations table is wrapped in an IIFE so esbuild can shorten the
// internal function/variable names (the pages' inline handlers only call these by name):
const EXPORTS = ['setLanguage', 'openVetProfile', 'closeVetProfile', 'openNurseProfile', 'closeNurseProfile'];
const tail = src.slice(objEnd).replace(/^;/, '');
for (const name of EXPORTS) {
  if (!new RegExp(`^function ${name}\\(`, 'm').test(tail)) throw new Error(`exported function ${name} not found in main.src.js`);
}
const runtimeSrc = src.slice(0, objStart) + JSON.stringify(kept) + ';\n(function () {\n' + tail +
  `\nObject.assign(window, { ${EXPORTS.join(', ')} });\n})();\n`;
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'saari-main-js-'));
const tmpFile = path.join(tmpDir, 'main.runtime.src.js');
fs.writeFileSync(tmpFile, runtimeSrc);

let bundle;
try {
  bundle = execFileSync('npx', ['--yes', 'esbuild', tmpFile, '--minify', '--target=es2020'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'inherit'],
  });
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

// Self-check: the bundle must carry exactly the kept keys with identical values.
const [bStart, bEnd] = locateTranslations(bundle, 'const translations={');
const bundled = vm.runInNewContext('(' + bundle.slice(bStart, bEnd) + ')');
const keptKeys = Object.keys(kept);
const bundledKeys = Object.keys(bundled);
if (keptKeys.length !== bundledKeys.length) {
  throw new Error(`bundle has ${bundledKeys.length} translation keys, expected ${keptKeys.length}`);
}
for (const key of keptKeys) {
  if (JSON.stringify(bundled[key]) !== JSON.stringify(kept[key])) {
    throw new Error(`translation "${key}" differs between source and bundle`);
  }
}

const previous = fs.existsSync(OUT) ? fs.statSync(OUT).size : 0;
fs.writeFileSync(OUT, bundle);
const kb = (n) => (n / 1024).toFixed(0) + ' KB';
console.log(
  `js/main.js: ${kb(previous)} → ${kb(bundle.length)} ` +
  `(${Object.keys(full).length} translation keys in source, ${dropped} article keys / ${kb(droppedBytes)} dropped, ${keptKeys.length} kept)`
);
