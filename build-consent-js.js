#!/usr/bin/env node
// build-consent-js.js — js/consent.src.js → js/consent.js (minified, same esbuild flags as main.js).
// Usage: node build-consent-js.js   (then bump ?v= on the <script src="/js/consent.js?v=…"> tags)
const { execFileSync } = require('child_process');
const path = require('path');
execFileSync('npx', ['--yes', 'esbuild', path.join(__dirname, 'js/consent.src.js'), '--minify', '--target=es2020',
  '--charset=utf8', '--outfile=' + path.join(__dirname, 'js/consent.js')], { stdio: 'inherit' });
