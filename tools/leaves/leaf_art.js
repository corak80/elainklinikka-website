// Leaf artwork: builds pre-rendered leaf sprites (front + back) in three styles.
// Geometry lives in a 200x200 box, stem at the bottom.
(function () {
  var SPR = 256, PAD = 18, SC = (SPR - 2 * PAD) / 200;

  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Closed Catmull-Rom path through points; points flagged sharp become corners.
  function smoothPath(pts) {
    var p = new Path2D(), n = pts.length;
    p.moveTo(pts[0].x, pts[0].y);
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      var t1 = p1.sharp ? 0 : 1, t2 = p2.sharp ? 0 : 1;
      p.bezierCurveTo(p1.x + (p2.x - p0.x) / 6 * t1, p1.y + (p2.y - p0.y) / 6 * t1,
                      p2.x - (p3.x - p1.x) / 6 * t2, p2.y - (p3.y - p1.y) / 6 * t2, p2.x, p2.y);
    }
    p.closePath();
    return p;
  }

  // ---------------- shapes ----------------
  function maple(r) {
    var j = function (a) { return (r() - 0.5) * 2 * a; };
    var C = { x: 100, y: 124 };
    var big = [[0.30, 0.17], [0.48, 0.22], [0.58, 0.34, 1], [0.64, 0.19], [0.80, 0.14], [0.85, 0.21, 1], [0.91, 0.08]];
    var small = [[0.34, 0.17], [0.56, 0.21], [0.66, 0.33, 1], [0.74, 0.13]];
    var lobes = [
      { a: 248 + j(4), L: 58 + j(5), prof: small },
      { a: 300 + j(4), L: 94 + j(6), prof: big },
      { a: 360 + j(3), L: 108 + j(5), prof: big },
      { a: 420 + j(4), L: 94 + j(6), prof: big },
      { a: 472 + j(4), L: 58 + j(5), prof: small }
    ];
    var pts = [], veins = [], minor = [];
    var rad = Math.PI / 180;
    function at(a, u, v) {
      var d = { x: Math.sin(a * rad), y: -Math.cos(a * rad) }, q = { x: Math.cos(a * rad), y: Math.sin(a * rad) };
      return { x: C.x + d.x * u + q.x * v, y: C.y + d.y * u + q.y * v };
    }
    pts.push(Object.assign(at(180, 12, 0), { sharp: false }));          // base sinus by the stem
    lobes.forEach(function (lb, k) {
      var tw = 1 + j(0.12);
      if (k > 0) {                                                        // rounded sinus between lobes
        var prev = lobes[k - 1], mid = (prev.a + lb.a) / 2;
        pts.push(Object.assign(at(mid, 30 + j(3), 0), { sharp: false }));
      }
      for (var s = 0; s < lb.prof.length; s++) {                          // left side, base → tip
        var pr = lb.prof[s], P = at(lb.a, pr[0] * lb.L, -pr[1] * lb.L * tw);
        pts.push({ x: P.x, y: P.y, sharp: !!pr[2] });
        if (pr[2]) minor.push([at(lb.a, pr[0] * lb.L * 0.72, 0), P]);
      }
      var T = at(lb.a, lb.L, 0); pts.push({ x: T.x, y: T.y, sharp: true });
      veins.push([C, T, 4.2]);
      for (var e = lb.prof.length - 1; e >= 0; e--) {                     // right side, tip → base
        var pr2 = lb.prof[e], Q = at(lb.a, pr2[0] * lb.L, pr2[1] * lb.L * tw);
        pts.push({ x: Q.x, y: Q.y, sharp: !!pr2[2] });
        if (pr2[2]) minor.push([at(lb.a, pr2[0] * lb.L * 0.72, 0), Q]);
      }
    });
    return { path: smoothPath(pts), axis: [C, at(0, 108, 0)], veins: veins, minor: minor,
             stem: [{ x: 100, y: C.y + 6 }, { x: 100 + j(8), y: 196 }], center: C, stemW: 4.5 };
  }

  function birch(r) {
    var j = function (a) { return (r() - 0.5) * 2 * a; };
    var baseY = 160, tipY = 8 + j(4), H = baseY - tipY, W = 58 + j(5), bend = j(6);
    function mid(s) { return 100 + bend * Math.sin(Math.PI * s); }
    function f(s) { return s < 0.32 ? Math.pow(Math.sin(Math.PI / 2 * s / 0.32), 0.85) : Math.pow(Math.cos(Math.PI / 2 * (s - 0.32) / 0.68), 1.7); }
    var side = [], sp = 0.082, s0 = 0.06;
    for (var s = s0; s < 0.95; s += sp) {
      var big = W * f(s), amp = (3.6 + j(0.8)) * (1 - 0.45 * s);
      side.push({ s: s, w: big - 0.5, sharp: false });
      side.push({ s: s + sp * 0.42, w: W * f(s + sp * 0.42) + amp * 0.55, sharp: true });   // small tooth
      side.push({ s: s + sp * 0.52, w: W * f(s + sp * 0.52) - 0.4, sharp: false });
      side.push({ s: s + sp * 0.9, w: W * f(s + sp * 0.9) + amp, sharp: true });            // main tooth
      side.push({ s: s + sp * 0.97, w: W * f(s + sp * 0.97) - 0.8, sharp: false });
    }
    var pts = [{ x: mid(0), y: baseY, sharp: false }];
    side.forEach(function (q) { pts.push({ x: mid(q.s) + q.w, y: baseY - q.s * H, sharp: q.sharp }); });
    pts.push({ x: mid(1), y: tipY, sharp: true });
    for (var k = side.length - 1; k >= 0; k--) { var q = side[k]; pts.push({ x: mid(q.s) - q.w, y: baseY - q.s * H, sharp: q.sharp }); }
    var veins = [[{ x: mid(0), y: baseY }, { x: mid(0.97), y: baseY - 0.97 * H }, 3.4]], minor = [];
    for (var v = 0.12; v < 0.8; v += 0.11) {
      var y = baseY - v * H, ts = Math.min(0.97, v + 0.13), ty = baseY - ts * H, tw = W * f(ts) * 0.92;
      minor.push([{ x: mid(v), y: y }, { x: mid(ts) + tw, y: ty }]);
      minor.push([{ x: mid(v), y: y }, { x: mid(ts) - tw, y: ty }]);
    }
    return { path: smoothPath(pts), axis: [{ x: mid(0), y: baseY }, { x: mid(1), y: tipY }], veins: veins, minor: minor,
             stem: [{ x: mid(0), y: baseY - 4 }, { x: mid(0) + j(6), y: 196 }], center: { x: 100, y: baseY - 0.3 * H }, stemW: 3.2 };
  }

  function aspen(r) {
    var j = function (a) { return (r() - 0.5) * 2 * a; };
    var C = { x: 100, y: 98 }, R = 66 + j(4), pts = [], N = 132, cren = 15 + Math.round(j(2)), wide = 1.06 + j(0.05);
    for (var i = 0; i < N; i++) {
      var th = (i / N) * Math.PI * 2;                                   // 0 = up, clockwise
      var rr = R * (1 - 0.06 * Math.cos(th));
      rr += 9 * Math.exp(-Math.pow(th / 0.16, 2)) + 9 * Math.exp(-Math.pow((th - 2 * Math.PI) / 0.16, 2));  // short pointed tip
      rr -= 9 * Math.exp(-Math.pow((th - Math.PI) / 0.45, 2));           // truncate base
      rr += 2.1 * Math.cos(cren * th);                                   // rounded crenate margin
      pts.push({ x: C.x + Math.sin(th) * rr * wide, y: C.y - Math.cos(th) * rr, sharp: i === 0 });
    }
    var B = { x: 100, y: C.y + R * 0.78 };
    var veins = [[B, { x: 100, y: C.y - R + 2 }, 3.4],
                 [B, { x: 100 + R * 0.78, y: C.y - R * 0.05 }, 2.4],
                 [B, { x: 100 - R * 0.78, y: C.y - R * 0.05 }, 2.4]];
    var minor = [];
    [0.15, 0.45].forEach(function (k) {
      var y = C.y - R * k;
      minor.push([{ x: 100, y: y + 10 }, { x: 100 + R * 0.72, y: y - R * 0.32 }]);
      minor.push([{ x: 100, y: y + 10 }, { x: 100 - R * 0.72, y: y - R * 0.32 }]);
    });
    return { path: smoothPath(pts), axis: [B, { x: 100, y: C.y - R }], veins: veins, minor: minor,
             stem: [{ x: 100, y: B.y - 2 }, { x: 100 + j(10), y: 197 }], center: { x: 100, y: C.y + R * 0.4 }, stemW: 3.2 };
  }

  // ---------------- colour ----------------
  var PAL = {
    maple: [['#F6D64A', '#F29A2E', '#D9431F'], ['#F4C542', '#EE7F2A', '#C9301E'], ['#F2A43A', '#E0552A', '#A8231C'],
            ['#F7DC5C', '#F0B23A', '#E2782C'], ['#EE7A3A', '#D23A22', '#93201A']],
    birch: [['#D9D35C', '#EEC43C', '#D99A22'], ['#F2D45A', '#E9B830', '#C98E1E'], ['#F5DF77', '#EFC64A', '#D8A12E'],
            ['#E3CF55', '#E6AE2C', '#BF8420']],
    aspen: [['#F2B23A', '#E2552A', '#B5221E'], ['#F5CF4A', '#EE9A30', '#D9602A'], ['#EC8A3C', '#C9301E', '#8E1A2A'],
            ['#F0C040', '#E07B2C', '#C0442A']]
  };
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
  function css(c, a) { return 'rgba(' + c.map(Math.round).join(',') + ',' + (a == null ? 1 : a) + ')'; }
  function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function shade(c, f) { return [c[0] * f, c[1] * f, c[2] * f]; }
  function backSide(c) { return shade(mix(c, [214, 190, 140], 0.3), 0.93); }

  function taper(x, a, b, w0, w1, color) {
    var n = 6;
    x.strokeStyle = color; x.lineCap = 'round';
    for (var i = 0; i < n; i++) {
      var t0 = i / n, t1 = (i + 1) / n;
      x.lineWidth = w0 + (w1 - w0) * t0;
      x.beginPath();
      x.moveTo(a.x + (b.x - a.x) * t0, a.y + (b.y - a.y) * t0);
      x.lineTo(a.x + (b.x - a.x) * t1, a.y + (b.y - a.y) * t1);
      x.stroke();
    }
  }
  function newCanvas() {
    var c = document.createElement('canvas'); c.width = c.height = SPR;
    var x = c.getContext('2d'); x.translate(PAD, PAD); x.scale(SC, SC);
    return { c: c, x: x };
  }
  function stemColor(kind, pal) { return kind === 'maple' ? shade(pal[2], 0.85) : kind === 'aspen' ? mix(pal[0], pal[2], 0.6) : mix(pal[2], [120, 80, 30], 0.35); }

  // Painted: radial colour shift, mottling, fold shading, texture, embossed tapered veins, soft shadow.
  function painted(kind, sh, pal, back, r) {
    var cv = newCanvas(), x = cv.x, P = pal.map(rgb);
    if (back) P = P.map(backSide);
    taper(x, sh.stem[0], sh.stem[1], sh.stemW, sh.stemW * 0.55, css(stemColor(kind, P)));
    x.save(); x.shadowColor = 'rgba(70,35,10,0.28)'; x.shadowBlur = 7; x.shadowOffsetY = 3;
    x.fillStyle = css(P[1]); x.fill(sh.path); x.restore();
    x.save(); x.clip(sh.path);
    var g = x.createRadialGradient(sh.center.x, sh.center.y, 4, sh.center.x, sh.center.y, kind === 'birch' ? 135 : 112);
    g.addColorStop(0, css(P[0])); g.addColorStop(0.5, css(P[1])); g.addColorStop(1, css(P[2]));
    x.fillStyle = g; x.fillRect(0, 0, 200, 200);
    for (var m = 0; m < 5; m++) {                                       // mottling
      var mx = 30 + r() * 140, my = 20 + r() * 150, mr = 18 + r() * 34, mc = P[Math.floor(r() * 3)];
      var mg = x.createRadialGradient(mx, my, 0, mx, my, mr);
      mg.addColorStop(0, css(mc, 0.32)); mg.addColorStop(1, css(mc, 0));
      x.fillStyle = mg; x.fillRect(mx - mr, my - mr, mr * 2, mr * 2);
    }
    var a0 = sh.axis[0], a1 = sh.axis[1], dx = a1.x - a0.x, dy = a1.y - a0.y, len = Math.hypot(dx, dy);
    var nx = -dy / len, ny = dx / len, cx = (a0.x + a1.x) / 2, cy = (a0.y + a1.y) / 2;
    var fg = x.createLinearGradient(cx - nx * 90, cy - ny * 90, cx + nx * 90, cy + ny * 90);   // folded along the midrib
    var sideA = back ? 'rgba(255,245,220,0.12)' : 'rgba(60,20,0,0.16)', sideB = back ? 'rgba(60,20,0,0.12)' : 'rgba(255,245,220,0.12)';
    fg.addColorStop(0, sideA); fg.addColorStop(0.5, 'rgba(0,0,0,0)'); fg.addColorStop(1, sideB);
    x.fillStyle = fg; x.fillRect(0, 0, 200, 200);
    for (var d = 0; d < 1100; d++) {                                    // fine texture
      x.fillStyle = r() < 0.5 ? 'rgba(60,25,0,0.07)' : 'rgba(255,240,200,0.07)';
      x.fillRect(r() * 200, r() * 200, 0.9, 0.9);
    }
    if (kind === 'birch' && r() < 0.6) {                                // a few brown freckles on birch
      for (var f = 0; f < 4; f++) { x.fillStyle = 'rgba(120,70,20,0.25)'; x.beginPath(); x.arc(40 + r() * 120, 40 + r() * 110, 0.8 + r() * 1.6, 0, 7); x.fill(); }
    }
    var light = css(mix(P[0], [255, 248, 225], 0.45), back ? 0.75 : 0.55), dark = 'rgba(70,30,5,0.18)';
    sh.minor.forEach(function (v) {
      taper(x, { x: v[0].x + 0.7, y: v[0].y + 0.7 }, { x: v[1].x + 0.7, y: v[1].y + 0.7 }, 1.3, 0.3, dark);
      taper(x, v[0], v[1], 1.3, 0.3, light);
    });
    sh.veins.forEach(function (v) {
      taper(x, { x: v[0].x + 0.8, y: v[0].y + 0.8 }, { x: v[1].x + 0.8, y: v[1].y + 0.8 }, v[2], 0.4, dark);
      taper(x, v[0], v[1], v[2], 0.4, light);
    });
    x.lineWidth = 3; x.strokeStyle = css(shade(P[2], 0.6), 0.5); x.stroke(sh.path);   // darker rim
    x.restore();
    return cv.c;
  }

  // Illustrated: clean two-tone halves, light veins, no texture.
  function illustrated(kind, sh, pal, back, r) {
    var cv = newCanvas(), x = cv.x, P = pal.map(rgb);
    if (back) P = P.map(backSide);
    var base = mix(P[1], P[2], 0.25 + r() * 0.4);
    taper(x, sh.stem[0], sh.stem[1], sh.stemW, sh.stemW * 0.6, css(shade(base, 0.72)));
    x.fillStyle = css(base); x.fill(sh.path);
    x.save(); x.clip(sh.path);
    var a0 = sh.axis[0], a1 = sh.axis[1], dx = a1.x - a0.x, dy = a1.y - a0.y, len = Math.hypot(dx, dy);
    var nx = -dy / len, ny = dx / len, ex = dx / len * 400, ey = dy / len * 400;
    x.beginPath();                                                      // one half a shade darker
    x.moveTo(a0.x - ex, a0.y - ey); x.lineTo(a0.x + ex, a0.y + ey);
    x.lineTo(a0.x + ex + nx * 400, a0.y + ey + ny * 400); x.lineTo(a0.x - ex + nx * 400, a0.y - ey + ny * 400); x.closePath();
    x.fillStyle = css(shade(base, back ? 1.06 : 0.86)); x.fill();
    var vein = css(mix(P[0], [255, 250, 235], 0.55), 0.85);
    x.lineCap = 'round';
    sh.minor.forEach(function (v) { x.lineWidth = 1.4; x.strokeStyle = vein; x.beginPath(); x.moveTo(v[0].x, v[0].y); x.lineTo(v[1].x, v[1].y); x.stroke(); });
    sh.veins.forEach(function (v) { taper(x, v[0], v[1], v[2] * 0.8, 1, vein); });
    x.restore();
    return cv.c;
  }

  // Watercolour: layered translucent washes, pigment pooling at the edge, blooms, lifted veins.
  function watercolour(kind, sh, pal, back, r) {
    var cv = newCanvas(), x = cv.x, P = pal.map(rgb);
    if (back) P = P.map(backSide);
    x.save(); x.filter = 'blur(0.6px)';
    taper(x, sh.stem[0], sh.stem[1], sh.stemW * 0.9, sh.stemW * 0.4, css(stemColor(kind, P), 0.8));
    x.restore();
    for (var k = 0; k < 4; k++) {                                       // washes
      x.save();
      var s = 1 + (r() - 0.5) * 0.035, ox = (r() - 0.5) * 3, oy = (r() - 0.5) * 3;
      x.translate(100 + ox, 100 + oy); x.scale(s, s); x.translate(-100, -100);
      x.filter = 'blur(' + (0.4 + r() * 0.6) + 'px)';
      x.fillStyle = css(P[k === 0 ? 1 : Math.floor(r() * 3)], 0.42); x.fill(sh.path);
      x.restore();
    }
    x.save(); x.clip(sh.path);
    var g = x.createRadialGradient(sh.center.x, sh.center.y, 2, sh.center.x, sh.center.y, 105);
    g.addColorStop(0, css(P[0], 0.5)); g.addColorStop(1, css(P[2], 0.25));
    x.fillStyle = g; x.fillRect(0, 0, 200, 200);
    for (var b = 0; b < 3; b++) {                                       // blooms
      var bx = 40 + r() * 120, by = 40 + r() * 120, br = 14 + r() * 22;
      var bg = x.createRadialGradient(bx, by, 0, bx, by, br);
      bg.addColorStop(0, css(mix(P[0], [255, 250, 235], 0.35), 0.2)); bg.addColorStop(1, css(P[0], 0));
      x.fillStyle = bg; x.fillRect(bx - br, by - br, br * 2, br * 2);
    }
    for (var d = 0; d < 900; d++) { x.fillStyle = 'rgba(90,40,10,0.09)'; x.fillRect(r() * 200, r() * 200, 0.8 + r(), 0.8 + r()); }
    x.filter = 'blur(1.4px)'; x.lineWidth = 4.5; x.strokeStyle = css(shade(P[2], 0.7), 0.55); x.stroke(sh.path);   // pooled edge
    x.filter = 'blur(0.5px)';
    var lifted = css(mix(P[0], [255, 250, 235], 0.6), 0.5);
    sh.minor.forEach(function (v) { taper(x, v[0], v[1], 1.2, 0.3, lifted); });
    sh.veins.forEach(function (v) { taper(x, v[0], v[1], v[2] * 0.75, 0.4, lifted); });
    x.restore();
    return cv.c;
  }

  var STYLES = { painted: painted, illustrated: illustrated, watercolour: watercolour };
  var KINDS = [
    { kind: 'birch', make: birch, n: 7, weight: 3 },
    { kind: 'aspen', make: aspen, n: 6, weight: 2 },
    { kind: 'maple', make: maple, n: 7, weight: 2 }
  ];
  var cache = {};
  window.LeafArt = {
    build: function (style) {
      if (cache[style]) return cache[style];
      var draw = STYLES[style], pool = [], gallery = [], seed = 1;
      KINDS.forEach(function (K) {
        for (var i = 0; i < K.n; i++) {
          var r = rng(seed++ * 7919), sh = K.make(r), pal = PAL[K.kind][i % PAL[K.kind].length];
          var pair = { front: draw(K.kind, sh, pal, false, rng(seed * 31)), back: draw(K.kind, sh, pal, true, rng(seed * 31)) };
          gallery.push(pair);
          for (var w = 0; w < K.weight; w++) pool.push(pair);
        }
      });
      return (cache[style] = { pool: pool, gallery: gallery });
    }
  };
})();
