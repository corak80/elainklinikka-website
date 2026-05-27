#!/usr/bin/env node
/**
 * Refresh every <lastmod> in sitemap.xml based on the actual last-edit date
 * of the source HTML file backing each URL.
 *
 * URL → file mapping:
 *   https://saarivet.fi/          → index.html
 *   https://saarivet.fi/foo/      → foo/index.html
 *   https://saarivet.fi/foo/bar/  → foo/bar/index.html
 *   https://saarivet.fi/x.html    → x.html
 *
 * Date source per URL (in order of preference):
 *   1) If the file has uncommitted modifications      → today (YYYY-MM-DD, local time)
 *   2) Else the date of the last git commit that touched it → that date
 *   3) Else (file never committed)                    → today
 *   4) Else (file does not exist)                     → leave lastmod alone, log warning
 *
 * Run: node build-sitemap.js
 *
 * Only mutates <lastmod> values. Does not add or remove <url> entries —
 * URL membership is managed manually.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = '/Users/assafwydra/elainklinikka-website';
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const HOST = 'https://saarivet.fi';

function today() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function gitDate(relPath) {
  try {
    const out = execSync(`git log -1 --format=%cs HEAD -- "${relPath}"`, {
      cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    return out || null;
  } catch { return null; }
}

let modifiedFiles = new Set();
try {
  const status = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf8' });
  for (const line of status.split('\n')) {
    const f = line.slice(3).trim();
    if (f) modifiedFiles.add(f);
  }
} catch { /* not a git repo — fall through to mtime-only */ }

function urlToFile(url) {
  if (!url.startsWith(HOST)) return null;
  let p = url.slice(HOST.length); // path part with leading /
  if (p === '' || p === '/') return 'index.html';
  if (p.endsWith('/')) return p.slice(1) + 'index.html';
  if (p.endsWith('.html') || p.endsWith('.xml') || p.endsWith('.pdf')) return p.slice(1);
  // Default: treat as directory
  return p.slice(1) + '/index.html';
}

function pickDate(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return { date: null, reason: 'FILE NOT FOUND' };
  if (modifiedFiles.has(relPath)) return { date: today(), reason: 'uncommitted' };
  const gd = gitDate(relPath);
  if (gd) return { date: gd, reason: 'git' };
  return { date: today(), reason: 'no-git-history' };
}

const xml = fs.readFileSync(SITEMAP, 'utf8');

const stats = { updated: 0, unchanged: 0, missing: 0, added: 0 };
const missingFiles = [];

// Process each <url> block independently
const newXml = xml.replace(/<url>([\s\S]*?)<\/url>/g, (block) => {
  const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
  if (!locMatch) return block;
  const url = locMatch[1].trim();
  const file = urlToFile(url);
  if (!file) return block;
  const { date, reason } = pickDate(file);
  if (!date) {
    stats.missing++;
    missingFiles.push(`${url}  (looked for: ${file})`);
    return block;
  }
  const existing = block.match(/<lastmod>([^<]+)<\/lastmod>/);
  if (existing) {
    if (existing[1].trim() === date) { stats.unchanged++; return block; }
    stats.updated++;
    return block.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${date}</lastmod>`);
  }
  // No <lastmod> — insert one right after </loc>
  stats.added++;
  return block.replace(/<\/loc>/, `</loc>\n    <lastmod>${date}</lastmod>`);
});

if (newXml !== xml) {
  fs.writeFileSync(SITEMAP, newXml);
  console.log(`Wrote ${SITEMAP}`);
} else {
  console.log('No changes — sitemap already current.');
}

console.log(`\nSummary: ${stats.updated} updated, ${stats.added} added, ${stats.unchanged} unchanged, ${stats.missing} missing source files`);
if (missingFiles.length) {
  console.log('\nMissing source files:');
  for (const m of missingFiles.slice(0, 20)) console.log('  - ' + m);
  if (missingFiles.length > 20) console.log(`  ... and ${missingFiles.length - 20} more`);
}
