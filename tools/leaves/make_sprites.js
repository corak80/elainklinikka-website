#!/usr/bin/env node
// Renders tools/leaves/make_sprites.html in headless Chrome and writes
// images/leaves/leaves.webp (the sprite sheet js/leaves.js draws from).
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const dom = execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--allow-file-access-from-files',
  '--virtual-time-budget=5000', '--dump-dom', 'file://' + path.join(__dirname, 'make_sprites.html')],
  { encoding: 'utf8', maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'], timeout: 60000 });
const json = dom.match(/<pre id="out">([^<]+)<\/pre>/)[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const out = JSON.parse(json);
const dir = path.join(ROOT, 'images', 'leaves');
fs.mkdirSync(dir, { recursive: true });
const png = path.join(os.tmpdir(), 'leaves-sheet.png');
fs.writeFileSync(png, Buffer.from(out.png.split(',')[1], 'base64'));
execFileSync('cwebp', ['-quiet', '-q', '82', '-alpha_q', '90', '-m', '6', png, '-o', path.join(dir, 'leaves.webp')]);
console.log(`${out.count} leaves × 2 sides, ${out.cell}px cells, ${out.cols} per row → images/leaves/leaves.webp`);
