/* RESUME QUEST — a tiny pixel-art platformer drawn on <canvas>. No libraries, no assets.
   Walk through the career "levels" (checkpoints), collect coins (= skills). */
(function () {
  'use strict';
  var cvs = document.getElementById('game');
  if (!cvs || !cvs.getContext) return;
  var ctx = cvs.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  var STAGES = window.STAGES || [];
  var W = 320, H = 180, GROUND = 150, WORLD = 2100, GOAL_X = 1930;
  var GRAV = 0.27, JUMP = -5.6, ACC = 0.16, MAXV = 1.75;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var screenEl = $('screen'), overlay = $('startOverlay'), card = $('stageCard'), chipsEl = $('chips'),
      hudLevel = $('hudLevel'), hudCoins = $('hudCoins'), btnSound = $('btnSound'), touch = $('touch');
  var lang = function () { return document.documentElement.lang === 'th' ? 'th' : 'en'; };
  var toast = function (m, g) { if (window.pxToast) window.pxToast(m, g); };

  /* ------------------------------------------------------------ themes */
  var THEMES = {
    dark: { sky: ['#070b1f', '#0b1130', '#111946', '#1a2360', '#26317a', '#37449a'], far: '#161e57', mid: '#1f2970', midWin: '#ffd76a',
      ground: '#2c9a72', groundHi: '#55e6a8', dirt: '#182550', dirt2: '#213268', cloud: '#2a357d', bush: '#1e7f5f', bushHi: '#2fae82', trunk: '#3b2b5c', star: true },
    light: { sky: ['#4fb0ff', '#6cc0ff', '#8dd0ff', '#acdeff', '#c9ebff', '#e4f6ff'], far: '#9ec4ee', mid: '#7fa9df', midWin: '#ffffff',
      ground: '#37b877', groundHi: '#7fe7a8', dirt: '#b98a5c', dirt2: '#a67a4d', cloud: '#ffffff', bush: '#2fa568', bushHi: '#5fd08e', trunk: '#8a5a34', star: false }
  };
  var theme = THEMES.dark, layers = {};

  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function hash(n) { n = (n ^ 61) ^ (n >>> 16); n = n + (n << 3); n = n ^ (n >>> 4); n = Math.imul(n, 0x27d4eb2d); n = n ^ (n >>> 15); return (n >>> 0) / 4294967296; }
  function mk(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; var x = c.getContext('2d'); x.imageSmoothingEnabled = false; return [c, x]; }

  function buildLayers() {
    var key = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    theme = THEMES[key];
    // far: mountains (parallax .25)
    var a = mk(Math.ceil(WORLD * 0.25) + W + 8, H), fx = a[1], r = rng(11);
    fx.fillStyle = theme.far;
    for (var x = 0; x < a[0].width; x++) {
      var h = 34 + 26 * Math.sin(x * 0.021) + 16 * Math.sin(x * 0.057 + 1.3) + 8 * Math.sin(x * 0.13);
      h = Math.round(h / 3) * 3;
      fx.fillRect(x, GROUND - h, 1, h);
    }
    // mid: skyline with windows (parallax .5)
    var b = mk(Math.ceil(WORLD * 0.5) + W + 8, H), mx = b[1], bx = 0; r = rng(23);
    while (bx < b[0].width) {
      var bw = 16 + Math.floor(r() * 22), bh = 26 + Math.floor(r() * 54);
      mx.fillStyle = theme.mid; mx.fillRect(bx, GROUND - bh, bw, bh);
      mx.fillStyle = 'rgba(255,255,255,.07)'; mx.fillRect(bx, GROUND - bh, 2, bh);
      for (var wy = GROUND - bh + 5; wy < GROUND - 6; wy += 8)
        for (var wx = bx + 4; wx < bx + bw - 4; wx += 6)
          if (r() < (key === 'dark' ? 0.42 : 0.5)) { mx.fillStyle = theme.midWin; mx.globalAlpha = key === 'dark' ? 0.8 : 0.55; mx.fillRect(wx, wy, 3, 4); mx.globalAlpha = 1; }
      bx += bw + Math.floor(r() * 5);
    }
    layers = { far: a[0], mid: b[0] };
  }

  /* ------------------------------------------------------------ sprites */
  function bake(rows, pal) {
    var c = mk(rows[0].length, rows.length);
    for (var y = 0; y < rows.length; y++) for (var x = 0; x < rows[y].length; x++) {
      var ch = rows[y][x]; if (ch === '.' || !pal[ch]) continue;
      c[1].fillStyle = pal[ch]; c[1].fillRect(x, y, 1, 1);
    }
    return c[0];
  }
  var PAL = { h: '#2b2140', s: '#ffd2a6', g: '#141428', G: '#bff0ff', b: '#3fd8ff', d: '#1f9fc4', p: '#3a3f86', w: '#f2f4ff' };
  var HEAD = ['....hhhh....', '...hhhhhh...', '..hhhhhhhh..', '..hssssssh..', '..gGgssgGg..', '..ssssssss..', '...ssssss...',
    '..bbbbbbbb..', '.sbbbbbbbbs.', '.sbbddddbbs.', '.sbbbbbbbbs.', '..bbbbbbbb..', '..pppppppp..'];
  var LEGS = {
    idle: ['..ppp..ppp..', '..ppp..ppp..', '..www..www..'],
    run1: ['.ppp....ppp.', 'ppp......ppp', 'www......www'],
    run2: ['...pppppp...', '...pppppp...', '...wwwwww...'],
    jump: ['.ppp....ppp.', '..pp....pp..', '..ww....ww..']
  };
  var SPR = {};
  Object.keys(LEGS).forEach(function (k) { SPR[k] = bake(HEAD.concat(LEGS[k]), PAL); });
  var FONT = { '0': '111101101101111', '1': '010110010010111', '2': '111001111100111', '3': '111001111001111', '4': '101101111001001',
    '5': '111100111001111', '6': '111100111101111', '7': '111001001001001', '8': '111101111101111', '9': '111101111001111' };
  function digits(str, x, y, s, col) {
    ctx.fillStyle = col;
    for (var i = 0; i < str.length; i++) {
      var g = FONT[str[i]]; if (!g) continue;
      for (var k = 0; k < 15; k++) if (g[k] === '1') ctx.fillRect(x + i * 4 * s + (k % 3) * s, y + Math.floor(k / 3) * s, s, s);
    }
  }
  function shade(hex, f) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    r = Math.min(255, Math.round(r * f)); g = Math.min(255, Math.round(g * f)); b = Math.min(255, Math.round(b * f));
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  /* ------------------------------------------------------------ world */
  var PLATFORMS = [
    { x: 190, y: 120, w: 48 }, { x: 285, y: 102, w: 40 }, { x: 520, y: 120, w: 56 }, { x: 815, y: 118, w: 48 }, { x: 895, y: 100, w: 40 },
    { x: 1180, y: 120, w: 56 }, { x: 1495, y: 116, w: 48 }, { x: 1575, y: 98, w: 40 }, { x: 1775, y: 120, w: 48 }
  ];
  var COIN_DEF = [
    ['Technical SEO', 214, 108, '#4de1ff'], ['Keyword Research', 305, 90, '#4de1ff'], ['Core Web Vitals', 150, 134, '#4de1ff'],
    ['Semrush', 548, 108, '#4de1ff'], ['GA4', 600, 134, '#4de1ff'], ['Looker Studio', 840, 106, '#4de1ff'], ['Python', 915, 88, '#7cffb2'],
    ['Node.js', 760, 134, '#7cffb2'], ['Next.js', 1208, 108, '#7cffb2'], ['React', 1100, 134, '#7cffb2'], ['PostgreSQL', 1520, 104, '#7cffb2'],
    ['Supabase', 1595, 86, '#7cffb2'], ['Google Ads', 1800, 108, '#ffcc4d'], ['Cloudflare', 1450, 134, '#ffcc4d']
  ];
  var coins = COIN_DEF.map(function (c, i) { return { name: c[0], x: c[1], y: c[2], col: c[3], got: false, i: i }; });
  var stars = []; (function () { var r = rng(5); for (var i = 0; i < 70; i++) stars.push([Math.floor(r() * 640), Math.floor(r() * 110), r()]); })();
  var clouds = []; (function () { var r = rng(9); for (var i = 0; i < 9; i++) clouds.push([i * 150 + r() * 60, 14 + r() * 40, 18 + r() * 16]); })();

  var player, cam, tick = 0, state = 'attract', keys = { left: false, right: false, jump: false }, jumpBuf = 0, wasGround = true;
  var particles = [], visited = {}, activeStage = -1, shake = 0, doneAll = false;
  function resetPlayer() { player = { x: 60, y: GROUND, vx: 0, vy: 0, face: 1, onGround: true, coyote: 0 }; cam = 0; }
  resetPlayer();

  /* ------------------------------------------------------------ sound (opt-in) */
  var ac = null, soundOn = false;
  function beep(f, dur, type, vol, slide, delay) {
    if (!soundOn) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      var t = ac.currentTime + (delay || 0), o = ac.createOscillator(), g = ac.createGain();
      o.type = type || 'square'; o.frequency.setValueAtTime(f, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, f + slide), t + dur);
      g.gain.setValueAtTime(vol || 0.04, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur);
    } catch (e) {}
  }
  var sfx = {
    jump: function () { beep(320, .13, 'square', .03, 420); },
    coin: function () { beep(988, .07, 'square', .035); beep(1319, .14, 'square', .035, 0, .07); },
    stage: function () { [523, 659, 784, 1047].forEach(function (f, i) { beep(f, .12, 'square', .035, 0, i * .07); }); },
    win: function () { [523, 659, 784, 1047, 1319, 1568].forEach(function (f, i) { beep(f, .16, 'square', .04, 0, i * .09); }); }
  };
  if (btnSound) btnSound.addEventListener('click', function () {
    soundOn = !soundOn; btnSound.setAttribute('aria-pressed', soundOn); updateHud(); if (soundOn) sfx.coin();
  });

  /* ------------------------------------------------------------ particles */
  function burst(x, y, col, n, spread) {
    if (reduce) return;
    for (var i = 0; i < n; i++) particles.push({ x: x, y: y, vx: (Math.random() - .5) * spread, vy: -Math.random() * spread * .8, life: 22 + Math.random() * 14, col: col, s: Math.random() < .5 ? 1 : 2 });
  }
  function dust(x, y) { burst(x, y, 'rgba(255,255,255,.7)', 4, 1.6); }

  /* ------------------------------------------------------------ HUD / card / chips */
  var L = { en: { lv: 'LEVEL', sk: 'SKILLS', on: 'SOUND ON', off: 'SOUND OFF', more: 'Full details ↓', goal: 'GAME CLEAR!', goalT: 'You reached the end of the quest', goalP: 'Thanks for playing. Ready to work together?', goalA: 'Contact me ↓', start: 'START' },
            th: { lv: 'เลเวล', sk: 'สกิล', on: 'เสียง เปิด', off: 'เสียง ปิด', more: 'ดูรายละเอียด ↓', goal: 'เคลียร์ด่าน!', goalT: 'คุณเดินมาถึงจุดสิ้นสุดของเควสต์แล้ว', goalP: 'ขอบคุณที่เล่น พร้อมร่วมงานกันไหม?', goalA: 'ติดต่อผม ↓', start: 'เริ่มต้น' } };
  function nVisited() { return Object.keys(visited).length; }
  function nCoins() { return coins.filter(function (c) { return c.got; }).length; }
  function updateHud() {
    var t = L[lang()];
    if (hudLevel) hudLevel.innerHTML = t.lv + ' <b>' + nVisited() + '/' + STAGES.length + '</b>';
    if (hudCoins) hudCoins.innerHTML = t.sk + ' <b>' + nCoins() + '/' + coins.length + '</b>';
    if (btnSound) btnSound.textContent = soundOn ? t.on : t.off;
    if (chipsEl) Array.prototype.forEach.call(chipsEl.children, function (b) {
      var i = +b.dataset.i;
      b.classList.toggle('act', i === activeStage);
      b.classList.toggle('done', !!visited[i]);
    });
  }
  function renderCard() {
    if (!card) return;
    if (activeStage === -1) { card.hidden = true; return; }
    var t = L[lang()], el, ul, a;
    card.innerHTML = '';
    if (activeStage === 99) {
      card.style.setProperty('--c', '#ffcc4d');
      el = document.createElement('p'); el.className = 'c-lv'; el.textContent = t.goal; card.appendChild(el);
      el = document.createElement('h3'); el.textContent = t.goalT; card.appendChild(el);
      el = document.createElement('p'); el.className = 'c-org'; el.textContent = t.goalP; card.appendChild(el);
      a = document.createElement('a'); a.href = '#contact'; a.textContent = t.goalA; card.appendChild(a);
    } else {
      var s = STAGES[activeStage], d = s[lang()];
      card.style.setProperty('--c', s.color);
      el = document.createElement('p'); el.className = 'c-lv'; el.textContent = 'LV ' + (s.lv < 10 ? '0' : '') + s.lv + ' · ' + d.date; card.appendChild(el);
      el = document.createElement('h3'); el.textContent = d.role; card.appendChild(el);
      el = document.createElement('p'); el.className = 'c-org'; el.textContent = d.org; card.appendChild(el);
      ul = document.createElement('ul');
      d.points.forEach(function (p) { var li = document.createElement('li'); li.textContent = p; ul.appendChild(li); });
      card.appendChild(ul);
      a = document.createElement('a'); a.href = '#exp-' + s.id; a.textContent = t.more; card.appendChild(a);
    }
    card.hidden = false;
  }
  function buildChips() {
    if (!chipsEl) return;
    chipsEl.innerHTML = '';
    STAGES.forEach(function (s, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.dataset.i = i; b.style.setProperty('--c', s.color);
      b.innerHTML = '<span class="y pixel"></span><span class="n"></span>';
      b.firstChild.textContent = s.year; b.lastChild.textContent = s.chip;
      b.addEventListener('click', function () { warpTo(i); });
      chipsEl.appendChild(b);
    });
  }
  window.addEventListener('langchange', function () { updateHud(); renderCard(); });
  window.addEventListener('themechange', buildLayers);

  /* ------------------------------------------------------------ control */
  function start() {
    if (state === 'play') return;
    state = 'play'; resetPlayer();
    if (overlay) overlay.hidden = true;
    if (touch) touch.classList.add('live');
    if (screenEl) screenEl.focus({ preventScroll: true });
    var r = screenEl && screenEl.getBoundingClientRect();
    if (r && (r.top < 0 || r.bottom > innerHeight)) screenEl.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
    sfx.coin(); updateHud();
  }
  function exitGame() {
    state = 'attract'; keys.left = keys.right = keys.jump = false;
    if (overlay) overlay.hidden = false; activeStage = -1; renderCard(); updateHud();
    if (touch) touch.classList.remove('live');
    resetPlayer();
  }
  function warpTo(i) {
    if (state !== 'play') start();
    var s = STAGES[i]; if (!s) return;
    burst(player.x, player.y - 8, '#ffffff', 10, 3);
    player.x = s.x - 26; player.y = GROUND; player.vx = 0; player.vy = 0; cam = Math.max(0, Math.min(WORLD - W, player.x - W / 2));
    burst(player.x, player.y - 8, s.color, 12, 3);
    if (screenEl) screenEl.focus({ preventScroll: true });
  }
  var startBtn = $('btnStart'), playBtn = $('playBtn');
  if (startBtn) startBtn.addEventListener('click', start);
  if (playBtn) playBtn.addEventListener('click', function () {
    var a = $('arcade'); if (a) a.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
    setTimeout(start, reduce ? 0 : 350);
  });
  window.PixelGame = { start: start, warpTo: warpTo, exit: exitGame };

  var KEYMAP = { ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right', ArrowUp: 'jump', w: 'jump', W: 'jump', ' ': 'jump', Spacebar: 'jump' };
  if (screenEl) {
    screenEl.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { exitGame(); return; }
      var k = KEYMAP[e.key];
      if (!k) return;
      e.preventDefault();
      if (state !== 'play') { start(); return; }
      if (k === 'jump' && !keys.jump) jumpBuf = 7;
      keys[k] = true;
    });
    screenEl.addEventListener('keyup', function (e) { var k = KEYMAP[e.key]; if (k) { keys[k] = false; e.preventDefault(); } });
    screenEl.addEventListener('focusout', function (e) { if (!screenEl.contains(e.relatedTarget)) keys.left = keys.right = keys.jump = false; });
  }
  if (touch) Array.prototype.forEach.call(touch.querySelectorAll('button'), function (b) {
    var k = b.dataset.key;
    function down(e) { e.preventDefault(); if (k === 'jump' && !keys.jump) jumpBuf = 7; keys[k] = true; b.classList.add('on'); }
    function up(e) { e.preventDefault(); keys[k] = false; b.classList.remove('on'); }
    b.addEventListener('pointerdown', down); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', up);
  });

  /* ------------------------------------------------------------ update */
  function update() {
    tick++;
    var p = player, ax = 0;
    if (state === 'play') { if (keys.left) ax -= 1; if (keys.right) ax += 1; }
    else if (!reduce) {
      ax = 1; keys.jump = true;
      if (p.onGround && tick % 95 === 0) jumpBuf = 7;
    }
    var maxv = state === 'play' ? MAXV : 1.15;
    p.vx += ax * ACC;
    if (!ax) p.vx *= p.onGround ? 0.8 : 0.96;
    p.vx = Math.max(-maxv, Math.min(maxv, p.vx));
    if (ax) p.face = ax > 0 ? 1 : -1;

    if (p.onGround) p.coyote = 6; else p.coyote--;
    if (jumpBuf > 0) jumpBuf--;
    if (jumpBuf > 0 && p.coyote > 0) { p.vy = JUMP; p.onGround = false; p.coyote = 0; jumpBuf = 0; if (state === 'play') { sfx.jump(); dust(p.x, p.y); } }
    if (state === 'play' && !keys.jump && p.vy < -2.4) p.vy = -2.4;

    p.vy = Math.min(7, p.vy + GRAV);
    var prevY = p.y;
    p.x = Math.max(8, Math.min(WORLD - 8, p.x + p.vx));
    p.y += p.vy;
    p.onGround = false;
    if (p.y >= GROUND) { p.y = GROUND; p.vy = 0; p.onGround = true; }
    if (p.vy >= 0) for (var i = 0; i < PLATFORMS.length; i++) {
      var pl = PLATFORMS[i];
      if (p.x + 4 > pl.x && p.x - 4 < pl.x + pl.w && prevY <= pl.y + 0.01 && p.y >= pl.y) { p.y = pl.y; p.vy = 0; p.onGround = true; }
    }
    if (p.onGround && !wasGround && state === 'play') dust(p.x, p.y);
    if (p.onGround && Math.abs(p.vx) > 1.2 && tick % 9 === 0 && state === 'play') dust(p.x - p.face * 4, p.y);
    wasGround = p.onGround;

    if (state === 'attract' && p.x > WORLD - 200) { resetPlayer(); }

    // coins
    if (state === 'play') {
      coins.forEach(function (c) {
        if (c.got) return;
        var cy = c.y + Math.sin(tick * 0.05 + c.i) * 2;
        if (c.x > p.x - 9 && c.x < p.x + 9 && cy > p.y - 22 && cy < p.y + 3) {
          c.got = true; burst(c.x, cy, c.col, 12, 3); sfx.coin(); updateHud();
          toast('+1 ' + (lang() === 'th' ? 'สกิล' : 'SKILL') + ' · ' + c.name.toUpperCase() + '  (' + nCoins() + '/' + coins.length + ')');
          if (nCoins() === coins.length && !doneAll) { doneAll = true; setTimeout(function () { toast(lang() === 'th' ? '★ เก็บสกิลครบทุกอย่างแล้ว! ★' : '★ ALL SKILLS COLLECTED! ★', true); sfx.win(); burst(player.x, player.y - 10, '#ffcc4d', 40, 5); }, 900); }
        }
      });
      // stages
      var found = -1;
      for (var s = 0; s < STAGES.length; s++) if (Math.abs(p.x - STAGES[s].x) < 48) found = s;
      if (Math.abs(p.x - GOAL_X) < 44) found = 99;
      if (found !== activeStage) {
        activeStage = found; renderCard();
        if (found >= 0 && found !== 99 && !visited[found]) { visited[found] = true; sfx.stage(); burst(STAGES[found].x, GROUND - 30, STAGES[found].color, 18, 3.5); updateHud(); if (nVisited() === STAGES.length) toast(lang() === 'th' ? '★ ผ่านครบทุกเลเวลแล้ว ★' : '★ ALL LEVELS CLEARED ★', true); }
        else if (found === 99) { sfx.win(); burst(GOAL_X, GROUND - 40, '#ffcc4d', 30, 4); }
        updateHud();
      }
    }

    // camera
    var target = Math.max(0, Math.min(WORLD - W, p.x - W / 2 + p.face * 22));
    cam += (target - cam) * 0.1;

    for (var k = particles.length - 1; k >= 0; k--) {
      var q = particles[k]; q.x += q.vx; q.y += q.vy; q.vy += 0.12; q.life--;
      if (q.life <= 0) particles.splice(k, 1);
    }
  }

  /* ------------------------------------------------------------ draw */
  function drawSky() {
    var bh = Math.ceil(H / theme.sky.length);
    for (var i = 0; i < theme.sky.length; i++) { ctx.fillStyle = theme.sky[i]; ctx.fillRect(0, i * bh, W, bh); }
    var cx = Math.round(cam);
    if (theme.star) {
      for (var s = 0; s < stars.length; s++) {
        var st = stars[s], x = ((st[0] - cx * 0.05) % 640 + 640) % 640;
        if (x > W) continue;
        ctx.fillStyle = (Math.sin(tick * 0.04 + st[2] * 20) > 0.2) ? '#ffffff' : '#7f8ad6'; ctx.fillRect(Math.floor(x), st[1], 1, 1);
      }
      // moon
      ctx.fillStyle = '#f4f1d8'; ctx.fillRect(252, 22, 16, 16); ctx.fillRect(250, 24, 20, 12); ctx.fillRect(254, 20, 12, 20);
      ctx.fillStyle = '#e0dcc0'; ctx.fillRect(258, 27, 3, 3); ctx.fillRect(263, 32, 2, 2);
      ctx.fillStyle = theme.sky[1]; ctx.fillRect(262, 20, 6, 8);
    } else {
      ctx.fillStyle = '#fff3a6'; ctx.fillRect(254, 20, 16, 16); ctx.fillRect(252, 22, 20, 12); ctx.fillRect(256, 18, 12, 20);
      ctx.fillStyle = '#ffe46b'; ctx.fillRect(256, 22, 12, 12);
    }
    ctx.fillStyle = theme.cloud;
    for (var c = 0; c < clouds.length; c++) {
      var cl = clouds[c], x2 = ((cl[0] - cx * 0.15 + tick * 0.04) % 1400 + 1400) % 1400 - 60;
      if (x2 > W || x2 < -60) continue;
      var w = Math.round(cl[2]), y = Math.round(cl[1]);
      ctx.globalAlpha = theme.star ? 0.55 : 0.9;
      ctx.fillRect(Math.round(x2), y + 4, w, 5); ctx.fillRect(Math.round(x2) + 4, y, w - 10, 5); ctx.fillRect(Math.round(x2) + 2, y + 2, w - 4, 4);
      ctx.globalAlpha = 1;
    }
  }
  function drawBuilding(s, i) {
    var x = Math.round(s.x + 20 - cam), bw = 56, bh = 46 + i * 4, y = GROUND - bh;
    if (x > W + 10 || x + bw < -10) return;
    ctx.fillStyle = s.color; ctx.fillRect(x, y, bw, bh);
    ctx.fillStyle = shade(s.color, 0.72); ctx.fillRect(x + bw - 8, y, 8, bh); ctx.fillRect(x, y + bh - 4, bw, 4);
    ctx.fillStyle = shade(s.color, 1.25); ctx.fillRect(x - 3, y - 4, bw + 6, 5);
    ctx.fillStyle = shade(s.color, 0.55); ctx.fillRect(x - 3, y + 1, bw + 6, 2);
    // windows
    for (var wy = y + 8; wy < GROUND - 22; wy += 12) for (var wx = x + 6; wx < x + bw - 12; wx += 14) {
      var lit = hash(i * 31 + wx + wy) > 0.35 || theme.star === false;
      ctx.fillStyle = lit ? (theme.star ? '#ffe9a0' : '#e6f6ff') : shade(s.color, 0.45); ctx.fillRect(wx, wy, 8, 7);
      ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(wx + 3, wy, 1, 7); ctx.fillRect(wx, wy + 3, 8, 1);
    }
    // door
    ctx.fillStyle = '#10122c'; ctx.fillRect(x + 20, GROUND - 17, 12, 17); ctx.fillStyle = '#ffd76a'; ctx.fillRect(x + 29, GROUND - 9, 1, 2);
    // year plaque
    var yw = s.year.length * 8 + 6, yx = x + Math.round(bw / 2 - yw / 2), yy = y - 22;
    ctx.fillStyle = '#0a0e1c'; ctx.fillRect(yx, yy, yw, 14);
    ctx.fillStyle = s.color; ctx.fillRect(yx, yy, yw, 1); ctx.fillRect(yx, yy + 13, yw, 1); ctx.fillRect(yx, yy, 1, 14); ctx.fillRect(yx + yw - 1, yy, 1, 14);
    digits(s.year, yx + 3, yy + 2, 2, '#ffffff');
    ctx.fillStyle = '#0a0e1c'; ctx.fillRect(x + 4, y - 6, 1, 6); ctx.fillRect(x + bw - 5, y - 6, 1, 6);
  }
  function drawFlag(s, active) {
    var x = Math.round(s.x - cam); if (x < -20 || x > W + 20) return;
    ctx.fillStyle = '#cfd6ff'; ctx.fillRect(x, GROUND - 40, 2, 40);
    ctx.fillStyle = '#ffd76a'; ctx.fillRect(x - 1, GROUND - 42, 4, 3);
    ctx.fillStyle = s.color;
    for (var i = 0; i < 10; i++) {
      var off = Math.round(Math.sin(tick * 0.12 + i * 0.55) * 1.6);
      ctx.fillRect(x + 2 + i, GROUND - 38 + off, 1, 9 - Math.floor(i / 3));
    }
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(x - 3, GROUND - 2, 8, 2);
    if (active) { ctx.fillStyle = s.color; ctx.globalAlpha = 0.35 + 0.25 * Math.sin(tick * 0.2); ctx.fillRect(x - 14, GROUND - 2, 30, 2); ctx.globalAlpha = 1; }
  }
  function drawDecor() {
    var cx = Math.round(cam), first = Math.floor(cx / 44) - 1;
    for (var i = first; i < first + Math.ceil(W / 44) + 3; i++) {
      var h = hash(i * 13 + 7); if (h < 0.35 || i < 0) continue;
      var x = i * 44 + Math.floor(h * 30), near = false;
      for (var s = 0; s < STAGES.length; s++) if (x > STAGES[s].x - 30 && x < STAGES[s].x + 84) near = true;
      if (near || (x > GOAL_X - 50 && x < GOAL_X + 50)) continue;
      var sx = x - cx;
      if (h > 0.72) { // tree
        ctx.fillStyle = theme.trunk; ctx.fillRect(sx + 5, GROUND - 14, 4, 14);
        ctx.fillStyle = theme.bush; ctx.fillRect(sx, GROUND - 26, 14, 14); ctx.fillRect(sx + 3, GROUND - 32, 8, 6);
        ctx.fillStyle = theme.bushHi; ctx.fillRect(sx + 3, GROUND - 26, 4, 3); ctx.fillRect(sx + 4, GROUND - 32, 3, 2);
      } else { // bush
        ctx.fillStyle = theme.bush; ctx.fillRect(sx, GROUND - 7, 16, 7); ctx.fillRect(sx + 3, GROUND - 11, 10, 4);
        ctx.fillStyle = theme.bushHi; ctx.fillRect(sx + 3, GROUND - 9, 3, 2);
      }
    }
  }
  function drawGround() {
    var cx = Math.round(cam);
    ctx.fillStyle = theme.dirt; ctx.fillRect(0, GROUND, W, H - GROUND);
    for (var i = Math.floor(cx / 8); i < Math.floor(cx / 8) + W / 8 + 2; i++) {
      var h = hash(i * 5 + 3), sx = i * 8 - cx;
      if (h < 0.5) { ctx.fillStyle = theme.dirt2; ctx.fillRect(sx + Math.floor(h * 10), GROUND + 9 + Math.floor(h * 16), 3, 2); }
      if (h > 0.8) { ctx.fillStyle = theme.dirt2; ctx.fillRect(sx + 2, GROUND + 18, 2, 2); }
    }
    ctx.fillStyle = theme.ground; ctx.fillRect(0, GROUND, W, 5);
    ctx.fillStyle = theme.groundHi; ctx.fillRect(0, GROUND, W, 2);
    for (var g = Math.floor(cx / 6); g < Math.floor(cx / 6) + W / 6 + 2; g++) {
      var hh = hash(g * 9 + 1); if (hh > 0.45) { ctx.fillStyle = theme.groundHi; ctx.fillRect(g * 6 - cx, GROUND - 1, 1, 1); }
    }
  }
  function drawGoal() {
    var x = Math.round(GOAL_X - cam); if (x < -60 || x > W + 60) return;
    var tw = 34, th = 70, y = GROUND - th;
    ctx.fillStyle = '#8b7cff'; ctx.fillRect(x - tw / 2, y, tw, th);
    ctx.fillStyle = '#6a5be0'; ctx.fillRect(x + 6, y, 11, th);
    ctx.fillStyle = '#a99cff'; for (var i = 0; i < 5; i++) ctx.fillRect(x - tw / 2 + i * 8 - (i === 4 ? 2 : 0), y - 6, 6, 6);
    ctx.fillStyle = '#10122c'; ctx.fillRect(x - 6, GROUND - 20, 12, 20); ctx.fillRect(x - 3, GROUND - 22, 6, 2);
    ctx.fillStyle = '#ffe46b'; ctx.fillRect(x - 2, y + 12, 4, 6); ctx.fillRect(x - 2, y + 26, 4, 6);
    ctx.fillStyle = '#cfd6ff'; ctx.fillRect(x, y - 24, 2, 18);
    ctx.fillStyle = '#ffcc4d'; var wob = Math.round(Math.sin(tick * 0.15) * 1);
    ctx.fillRect(x + 2, y - 24 + wob, 12, 3); ctx.fillRect(x + 2, y - 21 + wob, 9, 3); ctx.fillRect(x + 2, y - 18 + wob, 6, 2);
    // sparkle star
    var sy = y - 40 + Math.round(Math.sin(tick * 0.08) * 3), sa = 0.6 + 0.4 * Math.sin(tick * 0.2);
    ctx.globalAlpha = sa; ctx.fillStyle = '#fff6b0'; ctx.fillRect(x - 1, sy - 4, 3, 9); ctx.fillRect(x - 4, sy - 1, 9, 3); ctx.globalAlpha = 1;
  }
  function drawStart() {
    var x = Math.round(28 - cam); if (x < -30) return;
    ctx.fillStyle = '#6b4a2b'; ctx.fillRect(x + 8, GROUND - 16, 3, 16);
    ctx.fillStyle = '#e8c88a'; ctx.fillRect(x, GROUND - 26, 20, 10); ctx.fillStyle = '#9a7443'; ctx.fillRect(x, GROUND - 17, 20, 1);
    ctx.fillStyle = '#4a3220'; ctx.fillRect(x + 4, GROUND - 22, 9, 2); ctx.fillRect(x + 11, GROUND - 24, 2, 6); ctx.fillRect(x + 13, GROUND - 23, 2, 4); ctx.fillRect(x + 15, GROUND - 22, 1, 2);
  }
  function drawPlatforms() {
    PLATFORMS.forEach(function (pl) {
      var x = Math.round(pl.x - cam); if (x > W || x + pl.w < 0) return;
      ctx.fillStyle = theme.dirt2; ctx.fillRect(x, pl.y + 3, pl.w, 5);
      ctx.fillStyle = theme.ground; ctx.fillRect(x, pl.y, pl.w, 3);
      ctx.fillStyle = theme.groundHi; ctx.fillRect(x, pl.y, pl.w, 1);
      ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(x, pl.y + 7, pl.w, 1);
      for (var i = 4; i < pl.w - 3; i += 8) { ctx.fillStyle = theme.dirt; ctx.fillRect(x + i, pl.y + 4, 2, 2); }
    });
  }
  function drawCoins() {
    coins.forEach(function (c) {
      if (c.got) return;
      var x = Math.round(c.x - cam); if (x < -10 || x > W + 10) return;
      var y = Math.round(c.y + Math.sin(tick * 0.05 + c.i) * 2);
      var w = Math.max(2, Math.round(8 * Math.abs(Math.cos(tick * 0.06 + c.i))));
      ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(x - 3, GROUND - 1, 6, 1);
      ctx.fillStyle = c.col; ctx.fillRect(x - w / 2, y - 4, w, 8); ctx.fillRect(x - w / 2 - 1, y - 2, w + 2, 4);
      ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fillRect(x - w / 2 + 1, y - 3, Math.max(1, w / 3), 3);
      ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(x + w / 2 - 1, y, 1, 3);
    });
  }
  function drawPlayer() {
    var p = player, moving = Math.abs(p.vx) > 0.35, spr;
    if (!p.onGround) spr = SPR.jump;
    else if (moving) spr = [SPR.run1, SPR.run2, SPR.idle, SPR.run2][Math.floor(tick / 6) % 4];
    else spr = SPR.idle;
    var bob = (p.onGround && !moving && Math.floor(tick / 28) % 2) ? 1 : 0;
    var x = Math.round(p.x - cam), y = Math.round(p.y) - 16 + bob;
    ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(x - 5, Math.round(p.y) - 1 + (p.onGround ? 0 : 0), 10, 2);
    if (p.face < 0) { ctx.save(); ctx.translate(x + 6, y); ctx.scale(-1, 1); ctx.drawImage(spr, 0, 0); ctx.restore(); }
    else ctx.drawImage(spr, x - 6, y);
  }
  function drawParticles() {
    particles.forEach(function (q) {
      ctx.globalAlpha = Math.min(1, q.life / 14); ctx.fillStyle = q.col; ctx.fillRect(Math.round(q.x - cam), Math.round(q.y), q.s, q.s);
    });
    ctx.globalAlpha = 1;
  }
  function draw() {
    var cx = Math.round(cam);
    drawSky();
    drawParallax(layers.far, cx * 0.25);
    drawParallax(layers.mid, cx * 0.5);
    drawGround();
    drawDecor(); drawStart();
    STAGES.forEach(function (s, i) { drawBuilding(s, i); });
    drawGoal();
    STAGES.forEach(function (s, i) { drawFlag(s, i === activeStage); });
    drawPlatforms(); drawCoins(); drawPlayer(); drawParticles();
  }
  function drawParallax(img, off) {
    off = Math.round(off);
    ctx.drawImage(img, off, 0, W, H, 0, 0, W, H);
  }

  /* ------------------------------------------------------------ loop */
  var last = performance.now(), acc = 0, STEP = 1000 / 60, visible = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }, { threshold: 0 }).observe(cvs);
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) { last = now; return; }
    acc += Math.min(100, now - last); last = now;
    while (acc >= STEP) { update(); acc -= STEP; }
    draw();
  }

  /* ------------------------------------------------------------ crisp scaling */
  function fit() {
    var host = screenEl && screenEl.parentElement; if (!host) return;
    var avail = host.clientWidth - 12, wpx;
    if (avail >= 640) wpx = W * Math.min(4, Math.floor(avail / W)); else wpx = Math.max(280, avail);
    screenEl.style.width = wpx + 'px'; screenEl.style.height = Math.round(wpx * H / W) + 'px';
    // small screens: show the level card under the game instead of covering it
    if (card && chipsEl) {
      var small = avail < 640;
      if (small && card.parentElement === screenEl) host.insertBefore(card, chipsEl);
      else if (!small && card.parentElement !== screenEl) screenEl.appendChild(card);
    }
  }
  window.addEventListener('resize', fit);

  buildChips(); buildLayers(); fit(); updateHud();
  // final sizing once webfonts/layout settle
  window.addEventListener('load', fit);
  requestAnimationFrame(frame);
})();
