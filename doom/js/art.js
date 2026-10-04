/* Procedural pixel art for the DOOM-style resume: wall/floor textures, cute monsters, items, weapon, HUD face.
   Everything is drawn with code (no image files). Exposes window.DoomArt. */
(function () {
  'use strict';

  function cv(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; var x = c.getContext('2d'); x.imageSmoothingEnabled = false; return [c, x]; }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function rgb(h) { var n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
  function sh(h, f) { var c = rgb(h); return 'rgb(' + Math.max(0, Math.min(255, Math.round(c[0] * f))) + ',' + Math.max(0, Math.min(255, Math.round(c[1] * f))) + ',' + Math.max(0, Math.min(255, Math.round(c[2] * f))) + ')'; }
  function u32(c) { var d = c.getContext('2d').getImageData(0, 0, c.width, c.height); return { w: c.width, h: c.height, d: new Uint32Array(d.data.buffer) }; }
  function ell(x, cx, cy, rx, ry, col) {
    x.fillStyle = col;
    for (var y = -ry; y <= ry; y++) { var hw = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry + 0.0001)))); x.fillRect(cx - hw, cy + y, hw * 2 + 1, 1); }
  }
  function rect(x, a, b, w, h, col) { x.fillStyle = col; x.fillRect(a, b, w, h); }
  var HEART = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'];
  function heart(x, cx, cy, s, col, hi) {
    x.fillStyle = col;
    for (var j = 0; j < HEART.length; j++) for (var i = 0; i < 7; i++) if (HEART[j][i] === 'X') x.fillRect(cx + (i - 3) * s, cy + (j - 3) * s, s, s);
    if (hi) { x.fillStyle = hi; x.fillRect(cx - 2 * s, cy - 2 * s, s, s); }
  }
  function star4(x, cx, cy, r, col) { x.fillStyle = col; x.fillRect(cx - 1, cy - r, 2, r * 2); x.fillRect(cx - r, cy - 1, r * 2, 2); }

  /* ---------------------------------------------------------------- walls */
  function wall(o) {
    var a = cv(64, 64), c = a[0], x = a[1], r = rng(o.seed || 1), i, j;
    rect(x, 0, 0, 64, 64, o.mortar);
    if (o.pattern === 'brick') {
      for (j = 0; j < 8; j++) { var off = (j & 1) ? 8 : 0; for (i = -1; i < 5; i++) { var bx = i * 16 + off, f = 0.82 + r() * 0.34;
        rect(x, bx + 1, j * 8 + 1, 14, 6, sh(o.base, f)); rect(x, bx + 1, j * 8 + 1, 14, 1, sh(o.base, f * 1.3)); rect(x, bx + 1, j * 8 + 6, 14, 1, sh(o.base, f * 0.68)); } }
    } else if (o.pattern === 'panel') {
      rect(x, 0, 0, 64, 64, sh(o.base, 0.9));
      for (j = 0; j < 2; j++) for (i = 0; i < 2; i++) {
        var px = i * 32, py = j * 32;
        rect(x, px + 1, py + 1, 30, 30, sh(o.base, 1.15)); rect(x, px + 3, py + 3, 26, 26, sh(o.base, 0.85));
        rect(x, px + 3, py + 3, 26, 1, sh(o.base, 1.3)); rect(x, px + 3, py + 28, 26, 1, sh(o.base, 0.6));
        rect(x, px + 2, py + 2, 2, 2, o.accent); rect(x, px + 28, py + 2, 2, 2, o.accent); rect(x, px + 2, py + 28, 2, 2, o.accent); rect(x, px + 28, py + 28, 2, 2, o.accent);
        for (var k = 0; k < 5; k++) rect(x, px + 7 + k * 4, py + 14 + (j ? 0 : 4), 3, 2, ((k + i + j) & 1) ? o.accent : sh(o.accent, 0.4));
      }
    } else if (o.pattern === 'tile') {
      for (j = 0; j < 4; j++) for (i = 0; i < 4; i++) { var f2 = 0.88 + r() * 0.24;
        rect(x, i * 16 + 1, j * 16 + 1, 14, 14, sh(o.base, f2)); rect(x, i * 16 + 1, j * 16 + 1, 14, 2, sh(o.base, f2 * 1.3)); rect(x, i * 16 + 1, j * 16 + 13, 14, 2, sh(o.base, f2 * 0.7));
        if (r() < 0.18) star4(x, i * 16 + 8, j * 16 + 8, 3, o.accent); }
    } else if (o.pattern === 'circuit') {
      rect(x, 0, 0, 64, 64, sh(o.base, 0.8));
      for (j = 0; j < 10; j++) { var tx = Math.floor(r() * 14) * 4 + 4, ty = Math.floor(r() * 14) * 4 + 4, len = 8 + Math.floor(r() * 20), horiz = r() < 0.5;
        x.fillStyle = o.accent; if (horiz) x.fillRect(tx, ty, len, 2); else x.fillRect(tx, ty, 2, len);
        rect(x, horiz ? tx + len : tx - 1, horiz ? ty - 1 : ty + len, 4, 4, sh(o.accent, 1.2)); }
      for (j = 0; j < 8; j++) rect(x, Math.floor(r() * 15) * 4, Math.floor(r() * 15) * 4, 3, 3, sh(o.base, 1.6));
    } else if (o.pattern === 'hearts') {
      for (j = 0; j < 4; j++) for (i = 0; i < 4; i++) rect(x, i * 16, j * 16, 16, 16, ((i + j) & 1) ? sh(o.base, 1.0) : sh(o.base, 0.8));
      for (j = 0; j < 2; j++) for (i = 0; i < 2; i++) heart(x, 16 + i * 32, 16 + j * 32, 2, o.accent, '#ffffff');
      rect(x, 0, 0, 64, 2, sh(o.base, 1.4)); rect(x, 0, 62, 64, 2, sh(o.base, 0.5));
    }
    if (o.decal === 'heart') { rect(x, 22, 20, 20, 20, 'rgba(0,0,0,.35)'); heart(x, 32, 31, 3, o.accent, '#fff'); }
    if (o.decal === 'star') { rect(x, 24, 24, 16, 16, 'rgba(0,0,0,.35)'); star4(x, 32, 32, 7, o.accent); star4(x, 32, 32, 3, '#fff'); }
    rect(x, 0, 0, 64, 1, 'rgba(255,255,255,.15)'); rect(x, 0, 63, 64, 1, 'rgba(0,0,0,.3)');
    return u32(c);
  }
  function door(accent) {
    var a = cv(64, 64), c = a[0], x = a[1], i;
    rect(x, 0, 0, 64, 64, '#6f6890');
    for (i = 0; i < 8; i++) { rect(x, i * 8, 0, 1, 64, '#5a5478'); rect(x, i * 8 + 1, 0, 1, 64, '#857eaa'); }
    for (i = 0; i < 64; i += 8) { rect(x, i, 0, 4, 6, '#ffd54a'); rect(x, i + 4, 0, 4, 6, '#2a2038'); rect(x, i, 58, 4, 6, '#2a2038'); rect(x, i + 4, 58, 4, 6, '#ffd54a'); }
    rect(x, 24, 14, 16, 36, '#2a2038'); rect(x, 26, 16, 12, 32, accent);
    // padlock
    rect(x, 27, 30, 10, 9, '#ffd54a'); rect(x, 27, 30, 10, 1, '#fff2a8'); rect(x, 31, 33, 2, 3, '#2a2038');
    rect(x, 28, 24, 2, 6, '#ffd54a'); rect(x, 34, 24, 2, 6, '#ffd54a'); rect(x, 28, 23, 8, 2, '#ffd54a');
    rect(x, 0, 0, 64, 1, 'rgba(255,255,255,.25)');
    return u32(c);
  }
  function floorTex(c1, c2, seed, grout) {
    var a = cv(64, 64), c = a[0], x = a[1], r = rng(seed), i, j;
    for (j = 0; j < 2; j++) for (i = 0; i < 2; i++) {
      var base = ((i + j) & 1) ? c1 : c2;
      rect(x, i * 32, j * 32, 32, 32, base);
      for (var k = 0; k < 26; k++) rect(x, i * 32 + Math.floor(r() * 32), j * 32 + Math.floor(r() * 32), 1, 1, sh(base, 0.85 + r() * 0.3));
      rect(x, i * 32, j * 32, 32, 1, sh(base, 1.25)); rect(x, i * 32, j * 32, 1, 32, sh(base, 1.25));
    }
    if (grout) { rect(x, 0, 0, 64, 1, grout); rect(x, 0, 32, 64, 1, grout); rect(x, 0, 0, 1, 64, grout); rect(x, 32, 0, 1, 64, grout); }
    return u32(c);
  }
  function ceilTex() {
    var a = cv(64, 64), c = a[0], x = a[1], r = rng(77), i;
    rect(x, 0, 0, 64, 64, '#150b30');
    for (i = 0; i < 4; i++) { rect(x, i * 16, 0, 1, 64, '#1d1042'); rect(x, 0, i * 16, 64, 1, '#1d1042'); }
    for (i = 0; i < 26; i++) { var sx = Math.floor(r() * 64), sy = Math.floor(r() * 64), b = r(); rect(x, sx, sy, 1, 1, b > 0.7 ? '#ffffff' : (b > 0.35 ? '#b69cff' : '#7a5ad6')); if (b > 0.9) star4(x, sx, sy, 2, '#ffd0ea'); }
    return u32(c);
  }

  /* ---------------------------------------------------------------- monsters (32x32, boss 64x64) */
  var O = '#2a1646';
  function face(x, lx, rx, ey, look, bl) {
    ell(x, lx, ey, 3, 4, '#ffffff'); ell(x, rx, ey, 3, 4, '#ffffff');
    rect(x, lx - 1 + look, ey - 1, 3, 4, '#1b1030'); rect(x, rx - 1 + look, ey - 1, 3, 4, '#1b1030');
    rect(x, lx - 1 + look, ey - 1, 1, 1, '#fff'); rect(x, rx - 1 + look, ey - 1, 1, 1, '#fff');
    if (bl) { rect(x, lx - 5, ey + 4, 4, 2, '#ff9ec4'); rect(x, rx + 2, ey + 4, 4, 2, '#ff9ec4'); }
  }
  function ghost(f) {
    var a = cv(32, 32), c = a[0], x = a[1], i;
    ell(x, 16, 13, 12, 11, O); ell(x, 16, 13, 11, 10, '#f6efff');
    rect(x, 4, 13, 24, 13, O); rect(x, 5, 13, 22, 13, '#f6efff');
    for (i = 0; i < 6; i++) { var d = ((i + f) & 1) ? 4 : 1; rect(x, 4 + i * 4, 26, 4, 1 + d, O); rect(x, 5 + i * 4, 26, 2, d, '#f6efff'); }
    ell(x, 6 + f, 18, 3, 3, '#f6efff'); ell(x, 26 - f, 18, 3, 3, '#f6efff');
    face(x, 12, 20, 13, 0, true);
    rect(x, 15, 19, 3, 3, O); rect(x, 16, 20, 1, 1, '#ff7ba8');
    rect(x, 8, 5, 2, 2, '#d9c9ff'); rect(x, 10, 4, 3, 1, '#ffffff');
    return c;
  }
  function snail(f) {
    var a = cv(32, 32), c = a[0], x = a[1];
    ell(x, 16, 24, 14, 5, O); ell(x, 16, 24, 13, 4, '#7be0c3');
    ell(x, 25, 17, 4, 7, O); ell(x, 25, 17, 3, 6, '#7be0c3');
    rect(x, 23, 7 - f, 2, 6, O); rect(x, 28, 8 + f, 2, 5, O);
    ell(x, 24, 6 - f, 3, 3, '#fff'); ell(x, 29, 7 + f, 2, 3, '#fff'); rect(x, 24, 6 - f, 1, 3, '#1b1030'); rect(x, 29, 7 + f, 1, 2, '#1b1030');
    ell(x, 11, 14, 10, 10, O); ell(x, 11, 14, 9, 9, '#ff9f4a');
    ell(x, 11, 14, 6, 6, '#ffbf7a'); ell(x, 11, 14, 3, 3, '#ff9f4a'); rect(x, 10, 13, 2, 2, '#c4601e');
    rect(x, 3, 12, 3, 1, '#c4601e'); rect(x, 15, 8, 3, 1, '#ffd7a8');
    rect(x, 23, 22, 4, 2, '#ff9ec4'); rect(x, 26, 20, 2, 1, O);
    return c;
  }
  function slime(f) {
    var a = cv(32, 32), c = a[0], x = a[1], ry = f ? 8 : 11, rx = f ? 13 : 11, cy = 31 - ry - 3;
    ell(x, 16, cy, rx + 1, ry + 1, O); ell(x, 16, cy, rx, ry, '#b480ff'); ell(x, 16, cy - 1, rx - 3, ry - 3, '#c9a2ff');
    rect(x, 9, cy - ry + 2, 4, 2, '#f1e3ff');
    face(x, 11, 21, cy - 1, 0, true); rect(x, 15, cy + 4, 3, 2, O); rect(x, 16, cy + 5, 1, 1, '#ff7ba8');
    rect(x, 15, cy - ry - 3, 3, 3, '#b480ff'); rect(x, 16, cy - ry - 4, 1, 1, O);
    return c;
  }
  function toxic(f) {
    var a = cv(32, 32), c = a[0], x = a[1], i;
    ell(x, 16, 20, 12, 9, O); ell(x, 16, 20, 11, 8, '#6fdc6a'); ell(x, 16, 19, 8, 5, '#8af07f');
    for (i = 0; i < 5; i++) { var sx = 6 + i * 5; rect(x, sx, 8 - (i & 1) * 2 + f, 3, 4, O); rect(x, sx + 1, 9 - (i & 1) * 2 + f, 1, 3, '#6fdc6a'); }
    face(x, 11, 21, 18, 0, false);
    rect(x, 7, 12, 7, 2, O); rect(x, 8, 13, 3, 1, O); rect(x, 18, 12, 7, 2, O); rect(x, 21, 13, 3, 1, O);
    rect(x, 7, 12, 5, 1, '#6fdc6a'); rect(x, 20, 12, 5, 1, '#6fdc6a');
    rect(x, 12, 24, 8, 3, O); rect(x, 13, 24, 2, 2, '#fff'); rect(x, 17, 24, 2, 2, '#fff');
    // little chain link badge
    ell(x, 6, 5, 3, 2, '#ffd54a'); ell(x, 6, 5, 1, 1, '#2a1646'); ell(x, 10, 5, 3, 2, '#ffd54a'); ell(x, 10, 5, 1, 1, '#2a1646');
    return c;
  }
  function bug(f) {
    var a = cv(32, 32), c = a[0], x = a[1], i;
    for (i = 0; i < 3; i++) { var ly = 17 + i * 4; rect(x, 3 - ((i + f) & 1), ly, 5, 2, O); rect(x, 25 + ((i + f) & 1), ly, 5, 2, O); }
    ell(x, 16, 20, 11, 9, O); ell(x, 16, 20, 10, 8, '#ff5a6e'); ell(x, 16, 19, 8, 5, '#ff8a98');
    rect(x, 15, 12, 2, 16, O);
    ell(x, 10, 19, 2, 2, O); ell(x, 22, 19, 2, 2, O); ell(x, 12, 25, 2, 2, O); ell(x, 20, 25, 2, 2, O);
    ell(x, 16, 10, 7, 5, O); ell(x, 16, 10, 6, 4, '#3b2a66');
    rect(x, 9, 2 + f, 2, 5, O); rect(x, 21, 2 + f, 2, 5, O); ell(x, 10, 2 + f, 2, 2, '#ffd54a'); ell(x, 22, 2 + f, 2, 2, '#ffd54a');
    ell(x, 12, 10, 2, 2, '#fff'); ell(x, 20, 10, 2, 2, '#fff'); rect(x, 12, 10, 1, 2, O); rect(x, 20, 10, 1, 2, O);
    rect(x, 15, 12, 2, 1, '#ff9ec4');
    // tiny "404" tag on back
    rect(x, 13, 21, 6, 4, '#fff'); rect(x, 13, 21, 1, 2, O); rect(x, 15, 21, 1, 4, O); rect(x, 17, 21, 1, 2, O); rect(x, 13, 23, 3, 1, O); rect(x, 18, 21, 1, 4, O);
    return c;
  }
  function boss(f) {
    var a = cv(64, 64), c = a[0], x = a[1], i;
    // horns
    for (i = 0; i < 8; i++) { rect(x, 10 + i, 18 - i * 2, 4, 3, O); rect(x, 50 - i, 18 - i * 2, 4, 3, O); }
    for (i = 0; i < 6; i++) { rect(x, 12 + i, 17 - i * 2, 2, 2, '#ffd54a'); rect(x, 50 - i, 17 - i * 2, 2, 2, '#ffd54a'); }
    ell(x, 32, 38, 27, 23, O); ell(x, 32, 38, 26, 22, '#ff5fa2'); ell(x, 32, 34, 22, 15, '#ff82b8');
    for (i = 0; i < 6; i++) { ell(x, 10 + i * 9, 58 + (((i + f) & 1) ? 1 : 0), 5, 3, O); ell(x, 10 + i * 9, 58 + (((i + f) & 1) ? 1 : 0), 4, 2, '#ff5fa2'); }
    ell(x, 6, 40 + f * 2, 5, 6, O); ell(x, 6, 40 + f * 2, 4, 5, '#ff5fa2'); ell(x, 58, 40 - f * 2 + 2, 5, 6, O); ell(x, 58, 40 - f * 2 + 2, 4, 5, '#ff5fa2');
    // crown
    rect(x, 20, 8, 24, 6, O); rect(x, 21, 9, 22, 4, '#ffd54a'); for (i = 0; i < 4; i++) { rect(x, 21 + i * 7, 3, 4, 6, O); rect(x, 22 + i * 7, 4, 2, 5, '#ffd54a'); } rect(x, 31, 10, 3, 2, '#ff3d6e');
    // eyes
    ell(x, 22, 32, 7, 8, O); ell(x, 42, 32, 7, 8, O); ell(x, 22, 32, 6, 7, '#fff'); ell(x, 42, 32, 6, 7, '#fff');
    rect(x, 21, 29, 5, 7, '#1b1030'); rect(x, 41, 29, 5, 7, '#1b1030'); rect(x, 21, 29, 2, 2, '#fff'); rect(x, 41, 29, 2, 2, '#fff');
    for (i = 0; i < 9; i++) { rect(x, 14 + i, 20 + (i >> 1), 2, 2, O); rect(x, 49 - i, 20 + (i >> 1), 2, 2, O); }
    rect(x, 11, 40, 7, 3, '#ffb3d1'); rect(x, 46, 40, 7, 3, '#ffb3d1');
    // mouth
    if (f) { ell(x, 32, 47, 8, 5, O); ell(x, 32, 49, 5, 2, '#ff7ba8'); rect(x, 26, 43, 3, 3, '#fff'); rect(x, 35, 43, 3, 3, '#fff'); }
    else { rect(x, 24, 45, 16, 3, O); rect(x, 26, 45, 3, 3, '#fff'); rect(x, 35, 45, 3, 3, '#fff'); }
    rect(x, 40, 20, 10, 2, '#ffc6e0');
    return c;
  }
  function squash(base, spark) {
    var w = base.width, a = cv(w, w), c = a[0], x = a[1], s = w / 32;
    x.drawImage(base, 0, 0, w, w, 0, w - Math.round(11 * s), w, Math.round(11 * s));
    x.fillStyle = 'rgba(0,0,0,.28)'; x.fillRect(Math.round(2 * s), w - Math.round(2 * s), w - Math.round(4 * s), Math.round(2 * s));
    star4(x, Math.round(8 * s), Math.round(14 * s), Math.round(3 * s), spark || '#ffd54a'); star4(x, Math.round(24 * s), Math.round(10 * s), Math.round(2 * s), '#fff'); star4(x, Math.round(17 * s), Math.round(20 * s), Math.round(2 * s), '#ff9ec4');
    return c;
  }

  /* ---------------------------------------------------------------- items & props */
  function heartItem(f) {
    var a = cv(32, 32), c = a[0], x = a[1];
    heart(x, 16, 15, 3, O); heart(x, 16, 15, 2, '#ff3d6e', '#ffd0dc'); heart(x, 16, 15, 3, 'rgba(0,0,0,0)');
    x.fillStyle = O; for (var j = 0; j < HEART.length; j++) for (var i = 0; i < 7; i++) if (HEART[j][i] === 'X') { x.fillRect(16 + (i - 3) * 3 - 1, 15 + (j - 3) * 3 - 1, 5, 5); }
    heart(x, 16, 15, 3, '#ff3d6e', '#ffd0dc'); rect(x, 12, 11, 2, 2, '#fff');
    star4(x, f ? 5 : 27, f ? 8 : 6, 3, '#fff'); star4(x, f ? 27 : 5, 24, 2, '#ffd0dc');
    return c;
  }
  function orb(col, f) {
    var a = cv(32, 32), c = a[0], x = a[1];
    ell(x, 16, 16, 10, 10, O); ell(x, 16, 16, 9, 9, col); ell(x, 16, 17, 7, 6, sh(col, 1.25)); ell(x, 14, 13, 3, 3, '#fff');
    rect(x, 20, 20, 3, 2, sh(col, 0.7)); star4(x, f ? 4 : 28, f ? 6 : 8, 3, '#fff'); star4(x, f ? 28 : 4, 25, 2, col);
    return c;
  }
  function terminal(f) {
    var a = cv(32, 32), c = a[0], x = a[1], i;
    rect(x, 8, 26, 16, 3, O); rect(x, 13, 22, 6, 5, '#4d3f7a');
    rect(x, 3, 3, 26, 20, O); rect(x, 4, 4, 24, 18, '#6b5aa8'); rect(x, 6, 6, 20, 14, '#0c1a2e');
    for (i = 0; i < 4; i++) rect(x, 8, 8 + i * 3, 8 + ((i * 5 + f * 3) % 9), 1, i & 1 ? '#7cffd4' : '#4de1ff');
    heart(x, 22, 17, 1, f ? '#ff3d81' : '#ff9ec4');
    rect(x, 26, 21, 1, 1, f ? '#7cffd4' : '#ff3d81');
    rect(x, 6, 6, 20, 1, 'rgba(255,255,255,.25)');
    star4(x, 28, 3, 2, f ? '#fff' : '#4de1ff');
    return c;
  }
  function lamp(f) {
    var a = cv(32, 32), c = a[0], x = a[1];
    rect(x, 15, 12, 2, 18, O); rect(x, 11, 29, 10, 3, O); rect(x, 12, 29, 8, 2, '#6b5aa8');
    ell(x, 16, 9, 6 + f, 6 + f, 'rgba(255,200,120,.35)');
    ell(x, 16, 9, 4, 4, O); ell(x, 16, 9, 3, 3, f ? '#fff3b0' : '#ffd36b'); rect(x, 15, 8, 1, 1, '#fff');
    rect(x, 13, 13, 6, 2, O);
    return c;
  }
  function plant() {
    var a = cv(32, 32), c = a[0], x = a[1];
    rect(x, 10, 22, 12, 9, O); rect(x, 11, 23, 10, 7, '#ff8a3d'); rect(x, 11, 23, 10, 2, '#ffb36b');
    ell(x, 16, 15, 5, 7, O); ell(x, 16, 15, 4, 6, '#59d98a'); ell(x, 9, 18, 4, 3, O); ell(x, 9, 18, 3, 2, '#59d98a'); ell(x, 23, 18, 4, 3, O); ell(x, 23, 18, 3, 2, '#59d98a');
    rect(x, 15, 13, 1, 4, '#9bf5b8'); heart(x, 16, 7, 1, '#ff5fa2');
    return c;
  }
  function crystal(f) {
    var a = cv(32, 32), c = a[0], x = a[1];
    for (var i = 0; i < 12; i++) { rect(x, 16 - i, 28 - i * 2, i * 2 + 1, 2, i < 1 ? O : (i % 5 === 0 ? '#c9a2ff' : '#8f6bff')); }
    for (i = 0; i < 12; i++) { rect(x, 16 - i, 4 + i * 2, i * 2 + 1, 2, '#8f6bff'); }
    rect(x, 13, 10, 2, 12, '#d9c2ff'); star4(x, f ? 24 : 7, 8, 3, '#fff');
    return c;
  }
  function portal(f) {
    var a = cv(64, 64), c = a[0], x = a[1], i;
    for (i = 0; i < 5; i++) { ell(x, 32, 34, 27 - i * 4, 29 - i * 4, ((i + f) & 1) ? '#ff3d81' : '#4de1ff'); }
    ell(x, 32, 34, 8, 10, '#ffffff'); star4(x, 32, 34, 12, '#fff2a8'); star4(x, f ? 12 : 52, 12, 4, '#fff'); star4(x, f ? 54 : 10, 52, 3, '#ffd0ea');
    return c;
  }
  function shot(col, hi) {
    var a = cv(16, 16), c = a[0], x = a[1];
    ell(x, 8, 8, 6, 6, O); ell(x, 8, 8, 5, 5, col); ell(x, 8, 8, 3, 3, hi); rect(x, 6, 5, 2, 2, '#fff');
    return c;
  }
  function weapon(fire) {
    var a = cv(72, 64), c = a[0], x = a[1];
    // arms / gloves
    rect(x, 10, 46, 14, 18, O); rect(x, 11, 47, 12, 17, '#ffd2a6'); rect(x, 10, 44, 14, 6, O); rect(x, 11, 45, 12, 4, '#fff');
    rect(x, 48, 46, 14, 18, O); rect(x, 49, 47, 12, 17, '#ffd2a6'); rect(x, 48, 44, 14, 6, O); rect(x, 49, 45, 12, 4, '#fff');
    // body
    rect(x, 18, 30, 36, 34, O); rect(x, 19, 31, 34, 33, '#6a5bd6'); rect(x, 19, 31, 34, 3, '#9a8cff'); rect(x, 19, 60, 34, 4, '#463aa8');
    rect(x, 24, 38, 24, 14, '#4de1ff'); rect(x, 24, 38, 24, 2, '#a8f2ff'); rect(x, 24, 50, 24, 2, '#1b8fae');
    heart(x, 36, 46, 2, '#ff3d81', '#ffd0dc');
    // barrel
    rect(x, 28, 8, 16, 26, O); rect(x, 29, 9, 14, 25, '#4de1ff'); rect(x, 29, 9, 3, 25, '#bdf6ff'); rect(x, 40, 9, 3, 25, '#1b8fae');
    rect(x, 26, 6, 20, 6, O); rect(x, 27, 7, 18, 4, '#ff3d81'); rect(x, 27, 7, 18, 1, '#ffb3d1');
    for (var i = 0; i < 3; i++) rect(x, 31, 16 + i * 5, 10, 2, '#1b8fae');
    if (fire) { star4(x, 36, 3, 12, '#fff2a8'); star4(x, 36, 3, 8, '#fff'); rect(x, 31, 0, 10, 4, '#ffd54a'); star4(x, 24, 6, 4, '#ffb3d1'); star4(x, 48, 6, 4, '#ffb3d1'); }
    return c;
  }
  function hudFace(state) { // 'ok' | 'meh' | 'bad' | 'grin' | 'dead' | 'ouch'
    var a = cv(32, 32), c = a[0], x = a[1];
    ell(x, 16, 17, 12, 13, O); ell(x, 16, 17, 11, 12, '#ffd2a6');
    ell(x, 16, 9, 11, 7, O); ell(x, 16, 9, 10, 6, '#2b2140'); rect(x, 7, 12, 18, 3, '#2b2140'); rect(x, 12, 11, 8, 2, '#2b2140');
    rect(x, 6, 16, 8, 6, O); rect(x, 18, 16, 8, 6, O); rect(x, 14, 17, 4, 2, O);
    var lens = state === 'dead' ? '#ffffff' : '#bff0ff';
    rect(x, 7, 17, 6, 4, lens); rect(x, 19, 17, 6, 4, lens);
    if (state === 'dead') { x.fillStyle = O; for (var i = 0; i < 4; i++) { x.fillRect(7 + i, 17 + i, 1, 1); x.fillRect(12 - i, 17 + i, 1, 1); x.fillRect(19 + i, 17 + i, 1, 1); x.fillRect(24 - i, 17 + i, 1, 1); } }
    else { rect(x, 9, 18, 2, 3, O); rect(x, 21, 18, 2, 3, O); rect(x, 9, 18, 1, 1, '#fff'); rect(x, 21, 18, 1, 1, '#fff'); }
    rect(x, 6, 23, 3, 2, '#ff9ec4'); rect(x, 23, 23, 3, 2, '#ff9ec4');
    if (state === 'ok') { rect(x, 12, 26, 8, 1, O); rect(x, 11, 25, 1, 1, O); rect(x, 20, 25, 1, 1, O); }
    else if (state === 'grin') { rect(x, 11, 25, 10, 3, O); rect(x, 12, 25, 8, 1, '#fff'); }
    else if (state === 'meh') { rect(x, 13, 26, 6, 1, O); rect(x, 26, 12, 2, 4, '#7ad7ff'); }
    else if (state === 'bad' || state === 'ouch') { rect(x, 13, 26, 6, 2, O); rect(x, 12, 27, 1, 1, O); rect(x, 19, 27, 1, 1, O); rect(x, 21, 7, 8, 3, '#fff'); rect(x, 24, 6, 2, 5, '#ff3d6e'); }
    else if (state === 'dead') { rect(x, 13, 26, 6, 2, O); rect(x, 14, 27, 4, 1, '#ff7ba8'); }
    return c;
  }

  function sheet(c) { return u32(c); }
  var T = {};
  function build() {
    var P = {
      lobby: { base: '#5a52c8', mortar: '#1a1040', pattern: 'panel', accent: '#7cffd4', seed: 1 },
      r1: { base: '#4a78e8', mortar: '#0f1a4a', pattern: 'brick', accent: '#ffffff', seed: 2, decal: 'star' },
      r2: { base: '#25b59c', mortar: '#0b3a36', pattern: 'tile', accent: '#fff2a8', seed: 3 },
      r3: { base: '#9a63ff', mortar: '#2a1060', pattern: 'brick', accent: '#ffd54a', seed: 4, decal: 'heart' },
      r4: { base: '#f0803c', mortar: '#4a1f0a', pattern: 'brick', accent: '#fff2a8', seed: 5, decal: 'star' },
      r5: { base: '#d9418a', mortar: '#40102e', pattern: 'circuit', accent: '#4de1ff', seed: 6 },
      boss: { base: '#8f1d4a', mortar: '#1a0614', pattern: 'hearts', accent: '#ff9ec4', seed: 7 },
      corr: { base: '#4a4470', mortar: '#171230', pattern: 'panel', accent: '#ff9ec4', seed: 8 }
    };
    T.walls = [null, wall(P.lobby), wall(P.r1), wall(P.r2), wall(P.r3), wall(P.r4), wall(P.r5), wall(P.boss), wall(P.corr)];
    T.doors = [];
    var doorCols = ['#7cffd4', '#4a78e8', '#25b59c', '#c9a2ff', '#ff9f4a', '#ff5fa2', '#ff3d6e'];
    for (var i = 0; i < 7; i++) T.doors.push(door(doorCols[i]));
    T.floors = [
      floorTex('#7b72e8', '#5c53c8', 11, '#2a2070'), floorTex('#7ea6ff', '#5b86ee', 12, '#1f3a8a'), floorTex('#6fe0c4', '#47bfa3', 13, '#146a5c'),
      floorTex('#c4a0ff', '#a07af0', 14, '#4a2a9a'), floorTex('#ffb06b', '#f08c3a', 15, '#8a4410'), floorTex('#ff7eb8', '#e0549a', 16, '#7a1c52'),
      floorTex('#7a2748', '#5e1a38', 17, '#2a0a1c'), floorTex('#5e5890', '#4a4478', 18, '#241e48')
    ];
    T.ceil = ceilTex();
    var m = {};
    m.ghost = [ghost(0), ghost(1)]; m.snail = [snail(0), snail(1)]; m.slime = [slime(0), slime(1)]; m.toxic = [toxic(0), toxic(1)]; m.bug = [bug(0), bug(1)]; m.boss = [boss(0), boss(1)];
    T.mon = {};
    Object.keys(m).forEach(function (k) { T.mon[k] = { f: [sheet(m[k][0]), sheet(m[k][1])], dead: sheet(squash(m[k][0])) }; });
    T.heart = [sheet(heartItem(0)), sheet(heartItem(1))];
    T.orb = {};
    ['#4de1ff', '#7cffb2', '#ffcc4d'].forEach(function (c) { T.orb[c] = [sheet(orb(c, 0)), sheet(orb(c, 1))]; });
    T.term = [sheet(terminal(0)), sheet(terminal(1))];
    T.lamp = [sheet(lamp(0)), sheet(lamp(1))];
    T.plant = [sheet(plant())]; T.crystal = [sheet(crystal(0)), sheet(crystal(1))];
    T.portal = [sheet(portal(0)), sheet(portal(1))];
    T.shotPink = [sheet(shot('#ff5fa2', '#ffc6e0'))]; T.shotGreen = [sheet(shot('#6fdc6a', '#d4ffc9'))]; T.shotGold = [sheet(shot('#ffcc4d', '#fff2a8'))];
    T.weapon = [weapon(false), weapon(true)];
    T.face = {}; ['ok', 'meh', 'bad', 'grin', 'dead', 'ouch'].forEach(function (s) { T.face[s] = hudFace(s); });
    T.previews = { m: m };
    return T;
  }
  window.DoomArt = { build: build, rng: rng };
})();
