// Falling snow on the homepage (FI/SV/EN). Purely decorative. Winter partner of js/leaves.js.
// Source of js/snow.js. Rebuild after an edit:
//   npx --yes esbuild js/snow.src.js --minify --target=es2017 --outfile=js/snow.js
// No picture file: the flakes are drawn once into a hidden canvas after the page has loaded.
// Round flakes are white with a soft blue shadow and the snowflakes are painted in pale blue,
// so both show on the dark hero video and on the white sections below it.
// Season switch: index.html carries ONE of /js/snow.js (winter) or /js/leaves.js (autumn);
// change that script line (new ?v=), run `node build-homepages.js`, push, purge.
(function () {
  if (!window.matchMedia || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (navigator.connection && navigator.connection.saveData) return;

  var DOTS = 26, CRYSTALS = 17; // how many in a 1280 x 800 window; scaled to the window's size

  var CELL = 128, COLS = 8, TAU = Math.PI * 2;
  var sheet, canvas, ctx, W = 0, H = 0, dpr = 1, flakes = [], raf = 0, last = 0, T = 0;

  function rnd(a, b) { return a + Math.random() * (b - a); }

  // ---------- flake pictures ----------
  function seeded(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // A round flake: soft = 0 crisp .. 1 very blurred (a flake close to the eye).
  function drawDot(c, cx, cy, soft) {
    var r = CELL * 0.25, sy = cy + r * 0.2;
    var g = c.createRadialGradient(cx, sy, r * 0.3, cx, sy, r * 1.8);
    g.addColorStop(0, 'rgba(86,116,178,' + (0.7 - soft * 0.25) + ')');
    g.addColorStop(1, 'rgba(86,116,178,0)');
    c.fillStyle = g; c.beginPath(); c.arc(cx, sy, r * 1.8, 0, TAU); c.fill();
    var R = r * (1 + soft * 0.6), edge = Math.max(0.05, 0.8 - soft * 0.75);
    g = c.createRadialGradient(cx, cy, 0, cx, cy, R);
    g.addColorStop(0, '#fff');
    g.addColorStop(edge * 0.4, '#fff');
    g.addColorStop(edge, 'rgb(206,220,245)');          // white on the dark video, pale blue on a white page
    g.addColorStop(1, 'rgba(190,207,240,0)');
    c.fillStyle = g; c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.fill();
  }

  // The line pieces of one six-armed crystal, in a circle of radius 1. Same branches on every arm.
  function crystalShape(r) {
    var three = r() < 0.45, hex = r() < 0.6 ? 0.15 + r() * 0.07 : 0, fork = r() < 0.5;
    var at = three ? [0.34, 0.55, 0.75] : [0.42, 0.68], len = three ? [0.30, 0.26, 0.17] : [0.34, 0.24];
    var B = at.map(function (a, i) {
      return { at: a + (r() - 0.5) * 0.05, len: len[i] * (0.85 + r() * 0.3), ang: (52 + r() * 14) * Math.PI / 180 };
    });
    var arms = [], twigs = [], tips = [], end = fork ? 0.84 : 0.97;
    for (var k = 0; k < 6; k++) {
      var a = k * Math.PI / 3 - Math.PI / 2, dx = Math.cos(a), dy = Math.sin(a);
      arms.push([0, 0, dx * end, dy * end]);
      for (var i = 0; i < B.length; i++) for (var s = -1; s <= 1; s += 2) {
        var b = B[i], aa = a + s * b.ang, px = dx * b.at, py = dy * b.at;
        twigs.push([px, py, px + Math.cos(aa) * b.len, py + Math.sin(aa) * b.len]);
        tips.push([px + Math.cos(aa) * b.len, py + Math.sin(aa) * b.len]);
      }
      if (fork) for (var f = -1; f <= 1; f += 2) {
        var fa = a + f * 0.6;
        twigs.push([dx * end, dy * end, dx * end + Math.cos(fa) * 0.15, dy * end + Math.sin(fa) * 0.15]);
      } else tips.push([dx * end, dy * end]);
      if (hex) twigs.push([dx * hex, dy * hex, Math.cos(a + Math.PI / 3) * hex, Math.sin(a + Math.PI / 3) * hex]);
    }
    return { arms: arms, twigs: twigs, tips: tips };
  }

  function strokeAll(c, segs, R) {
    c.beginPath();
    for (var i = 0; i < segs.length; i++) { c.moveTo(segs[i][0] * R, segs[i][1] * R); c.lineTo(segs[i][2] * R, segs[i][3] * R); }
    c.stroke();
  }

  // Painted snowflake: a few loose washes of blue, pigment pooled at the tips, a pale brush line on top.
  function drawPainted(c, cx, cy, r) {
    var S = crystalShape(r), R = CELL * 0.4, all = S.arms.concat(S.twigs);
    var pal = ['118,160,214', '142,182,230', '104,142,204', '160,156,222'];
    var j = function (a) { return (r() - 0.5) * 2 * a; };
    c.save(); c.translate(cx, cy); c.lineCap = 'round';
    for (var pass = 0; pass < 2; pass++) for (var i = 0; i < all.length; i++) {
      var s = all[i], col = pal[Math.floor(r() * pal.length)];
      c.strokeStyle = 'rgba(' + col + ',' + (0.26 + r() * 0.2) + ')';
      c.shadowColor = 'rgba(' + col + ',.5)'; c.shadowBlur = 5;
      c.lineWidth = (i < 6 ? 8 : 5.5) + r() * 4;
      c.beginPath(); c.moveTo(s[0] * R + j(1.6), s[1] * R + j(1.6)); c.lineTo(s[2] * R + j(1.6), s[3] * R + j(1.6)); c.stroke();
    }
    c.shadowBlur = 4;
    for (var t = 0; t < S.tips.length; t++) {
      c.fillStyle = 'rgba(92,128,196,' + (0.25 + r() * 0.25) + ')'; c.shadowColor = 'rgba(92,128,196,.4)';
      c.beginPath(); c.arc(S.tips[t][0] * R + j(1), S.tips[t][1] * R + j(1), 3 + r() * 2.5, 0, TAU); c.fill();
    }
    c.shadowColor = 'transparent'; c.shadowBlur = 0;
    c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 2.4; strokeAll(c, S.arms, R);
    c.lineWidth = 1.6; c.strokeStyle = 'rgba(255,255,255,.6)'; strokeAll(c, S.twigs, R);
    c.restore();
  }

  // Row 0 = round flakes (crisp → blurred), row 1 = painted snowflakes.
  function buildSheet() {
    sheet = document.createElement('canvas');
    sheet.width = CELL * COLS; sheet.height = CELL * 2;
    var c = sheet.getContext('2d');
    for (var i = 0; i < COLS; i++) {
      var cx = i * CELL + CELL / 2;
      drawDot(c, cx, CELL / 2, i / (COLS - 1));
      drawPainted(c, cx, CELL * 1.5, seeded(211 + i * 29));
    }
  }

  // ---------- falling ----------
  function makeFlake(crystal, yMin, yMax) {
    var depth = Math.random(), big = !crystal && Math.random() < 0.06; // 0 far .. 1 near; big = a blurred flake right by the eye
    var k = Math.max(0.78, Math.min(1, W / 1280));
    return {
      crystal: crystal,
      n: crystal ? Math.floor(Math.random() * COLS) : big ? 6 + Math.floor(Math.random() * 2) : Math.floor(Math.random() * (2 + depth * 4)),
      size: (crystal ? 20 + depth * 24 : big ? rnd(22, 36) : 6 + depth * depth * 11) * k,
      alpha: big ? rnd(0.4, 0.55) : 0.72 + depth * 0.28,
      x0: rnd(-30, W + 30), y: rnd(yMin, yMax), t: rnd(0, 20),
      vy: (crystal ? 20 + depth * 26 : big ? rnd(62, 84) : 22 + depth * 46) * rnd(0.85, 1.15),
      k: 0.5 + depth * 0.8,                                   // how much the wind moves it
      amp: rnd(5, crystal ? 30 : 20), w: rnd(0.5, 1.3), ph: rnd(0, TAU),
      rot: rnd(0, TAU), spin: rnd(-0.5, 0.5), fw: rnd(0.5, 1.5), fph: rnd(0, TAU)
    };
  }

  function fill() {
    var area = Math.max(0.36, Math.min(1.35, W * H / (1280 * 800)));
    var nd = Math.round(DOTS * area), nc = Math.round(CRYSTALS * area);
    flakes = flakes.filter(function (F) { return F.crystal ? nc-- > 0 : nd-- > 0; });
    while (nd-- > 0) flakes.push(makeFlake(false, -H * 0.15, H));
    while (nc-- > 0) flakes.push(makeFlake(true, -H * 0.15, H));
    flakes.sort(function (a, b) { return a.size - b.size; }); // small (far) ones behind
  }

  function resize() {
    var w = document.documentElement.clientWidth, h = window.innerHeight; // clientWidth: without the scrollbar
    // A phone's address bar slides in and out while scrolling; only grow for that, so the canvas
    // isn't reallocated on every scroll. A new width (rotation, window resize) resizes fully.
    if (w === W && h <= H) return;
    W = w; H = h;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.height = H + 'px';
    fill();
  }

  function frame(now) {
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now; T += dt;
    var wind = 5 + 10 * Math.sin(T * 0.11) + 6 * Math.sin(T * 0.27 + 1.3); // slow gusts, shared by every flake
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < flakes.length; i++) {
      var F = flakes[i];
      F.t += dt;
      F.y += F.vy * dt;
      F.x0 += wind * F.k * dt;
      if (F.y > H + F.size) { F.y = -F.size - rnd(0, H * 0.12); F.x0 = rnd(-30, W + 30); }
      if (F.x0 < -60) F.x0 += W + 120; else if (F.x0 > W + 60) F.x0 -= W + 120;
      var x = F.x0 + F.amp * Math.sin(F.w * F.t + F.ph), s = F.size;
      ctx.globalAlpha = F.alpha;
      if (F.crystal) {
        var rot = F.rot + F.spin * F.t, c = Math.cos(rot), sn = Math.sin(rot);
        var fx = 0.6 + 0.4 * Math.abs(Math.cos(F.fw * F.t + F.fph)); // slowly turning in the air
        ctx.setTransform(dpr * c * fx, dpr * sn * fx, -dpr * sn, dpr * c, dpr * x, dpr * F.y);
      } else ctx.setTransform(dpr, 0, 0, dpr, dpr * x, dpr * F.y);
      ctx.drawImage(sheet, F.n * CELL, F.crystal ? CELL : 0, CELL, CELL, -s / 2, -s / 2, s, s);
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }

  function run() {
    if (!raf && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }

  function setup() {
    buildSheet();
    canvas = document.createElement('canvas');
    canvas.className = 'fall-snow';
    canvas.setAttribute('aria-hidden', 'true');
    // Under the header (z-index 1000), so the snow falls behind its frosted glass and never covers the menu.
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;pointer-events:none;' +
      'z-index:998;opacity:0;transition:opacity 2s ease';
    var st = document.createElement('style');
    st.textContent = '@media print{.fall-snow{display:none}}';
    document.head.appendChild(st);
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
    addEventListener('resize', resize);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else run();
    });
    run();
    requestAnimationFrame(function () { canvas.style.opacity = '1'; });
  }

  // Start only once the page has loaded and the browser is idle, so the snow never slows the page down.
  function later() { (window.requestIdleCallback || function (f) { setTimeout(f, 800); })(setup, { timeout: 3000 }); }
  if (document.readyState === 'complete') later(); else addEventListener('load', later);
})();
