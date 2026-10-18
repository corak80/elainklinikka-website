// Falling autumn leaves on the homepage (FI/SV/EN). Purely decorative.
// Source of js/leaves.js. Rebuild after an edit:
//   npx --yes esbuild js/leaves.src.js --minify --target=es2017 --outfile=js/leaves.js
// Leaf pictures: images/leaves/leaves.webp, drawn by `node tools/leaves/make_sprites.js`.
// SEASON: 'autumn' = leaves, 'off' = nothing. (Snowflakes come later, when the snow does.)
(function () {
  var SEASON = 'autumn';
  if (SEASON !== 'autumn') return;
  if (!window.matchMedia || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (navigator.connection && navigator.connection.saveData) return;

  var SHEET = '/images/leaves/leaves.webp?v=20261018a', CELL = 128, COLS = 8;
  // Sheet cell 2i = front, 2i+1 = back. 0-6 birch, 7-12 aspen, 13-19 maple; birch is listed most often.
  var PICK = [];
  for (var i = 0; i < 20; i++) for (var k = 0; k < (i < 7 ? 3 : 2); k++) PICK.push(i);

  var COUNT = 14, SPEED = [30, 58];
  var img, canvas, ctx, W = 0, H = 0, dpr = 1, leaves = [], raf = 0, last = 0;

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function makeLeaf(yMin, yMax) {
    var depth = Math.random(); // 0 far .. 1 near
    return {
      n: PICK[Math.floor(Math.random() * PICK.length)],
      size: (24 + depth * 30) * Math.max(0.72, Math.min(1, W / 1280)),
      alpha: 0.7 + depth * 0.3,
      x0: rnd(-20, W + 20), y: rnd(yMin, yMax), t: rnd(0, 10),
      vy: rnd(SPEED[0], SPEED[1]) * (0.65 + depth * 0.5),
      drift: rnd(4, 16) * (Math.random() < 0.8 ? 1 : -1),
      amp: rnd(18, 60), w: rnd(0.6, 1.4), ph: rnd(0, 6.28),
      rot0: rnd(-0.6, 0.6), rotAmp: rnd(0.3, 0.9), spin: rnd(-0.25, 0.25),
      fw: rnd(0.6, 2.0), fph: rnd(0, 6.28)
    };
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
    var n = Math.round(COUNT * Math.max(0.45, Math.min(1.2, W / 1280)));
    while (leaves.length < n) leaves.push(makeLeaf(-H, H * 0.9));
    leaves.length = n;
  }

  function frame(now) {
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < leaves.length; i++) {
      var L = leaves[i];
      L.t += dt;
      var swing = L.w * L.t + L.ph;
      L.y += L.vy * (0.75 + 0.5 * Math.abs(Math.cos(swing))) * dt; // faster through the bottom of each swing
      L.x0 += L.drift * dt;
      if (L.y > H + L.size || L.x0 < -100 || L.x0 > W + 100) L = leaves[i] = makeLeaf(-L.size - rnd(0, H * 0.25), -L.size);
      var x = L.x0 + L.amp * Math.sin(swing);
      var rot = L.rot0 + L.rotAmp * Math.cos(swing) + L.spin * L.t;
      var flip = Math.cos(L.fw * L.t + L.fph); // turning over: narrow when edge-on, back side when negative
      var fx = Math.max(0.08, Math.abs(flip)), c = Math.cos(rot), s = Math.sin(rot);
      var cell = L.n * 2 + (flip < 0 ? 1 : 0);
      ctx.globalAlpha = L.alpha;
      ctx.setTransform(dpr * c * fx, dpr * s * fx, -dpr * s, dpr * c, dpr * x, dpr * L.y);
      ctx.drawImage(img, (cell % COLS) * CELL, Math.floor(cell / COLS) * CELL, CELL, CELL,
                    -L.size / 2, -L.size / 2, L.size, L.size);
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }

  function run() {
    if (!raf && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }

  function setup() {
    canvas = document.createElement('canvas');
    canvas.className = 'fall-leaves';
    canvas.setAttribute('aria-hidden', 'true');
    // Under the header (z-index 1000), so leaves drift behind its frosted glass and never cover the menu.
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;pointer-events:none;' +
      'z-index:998;opacity:0;transition:opacity 2s ease';
    var st = document.createElement('style');
    st.textContent = '@media print{.fall-leaves{display:none}}';
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

  // Start only once the page has loaded and the browser is idle, so the leaves never slow the page down.
  function begin() {
    img = new Image();
    img.decoding = 'async';
    img.fetchPriority = 'low';
    img.onload = setup;
    img.src = SHEET;
  }
  function later() { (window.requestIdleCallback || function (f) { setTimeout(f, 800); })(begin, { timeout: 3000 }); }
  if (document.readyState === 'complete') later(); else addEventListener('load', later);
})();
