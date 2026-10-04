/* RESUME DOOM-STYLE — a tiny first-person raycaster (think 1993, but cute).
   7 rooms = 7 steps of the career. Beat the bugs, read the terminals, collect skill orbs, defeat the boss.
   Vanilla JS + <canvas>. No libraries, no image files. */
(function () {
  'use strict';
  var Art = window.DoomArt, STAGES = window.STAGES || [];
  var cvs = document.getElementById('view');
  if (!Art || !cvs || !cvs.getContext) return;
  var ctx = cvs.getContext('2d', { alpha: false });
  var W = 320, H = 180, HALF = H >> 1;
  cvs.width = W; cvs.height = H; ctx.imageSmoothingEnabled = false;
  var img = ctx.createImageData(W, H), buf = new Uint32Array(img.data.buffer);
  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = function () { return document.documentElement.lang === 'th' ? 'th' : 'en'; };
  var toast = function (m, g) { if (window.pxToast) window.pxToast(m, g); };

  var T = Art.build();
  function D(t) { return t.d; } // typed pixels

  /* ------------------------------------------------------------------ strings */
  var L = {
    en: {
      title: 'RESUME QUEST', sub: 'A cute first-person dungeon of my career. Beat the bugs, read the terminals, defeat the boss.',
      cute: '♥ CUTE MODE', doom: '☠ DOOM MODE', cuteT: 'Friendly bugs, regenerating hearts', doomT: 'Fast bugs, no regen, real danger',
      skip: 'Skip to resume ↓', pause: 'PAUSED', resume: '▶ RESUME', restart: '↺ RESTART',
      dead: 'YOU GOT BUGGED!', deadSub: 'Oops. Even great devs ship bugs. Try again?', retry: '↻ RETRY ROOM',
      win: 'GAME CLEAR ★', winSub: 'You beat THE CORE UPDATE. Now let’s talk!', contact: '✉ Contact me', read: 'Read resume ↓', again: '↺ Play again',
      hp: 'HEALTH', sk: 'SKILLS', kl: 'BUGS', lv: 'AREA', mode: 'MODE', time: 'TIME', deaths: 'RETRIES',
      hint: 'WASD / arrows move · mouse or ← → turn · Space / click fire · Esc pause',
      hintTouch: 'Left pad moves · drag the view to look · FIRE to shoot',
      cleared: 'AREA CLEAR!', unlocked: 'Door unlocked →', lobby: 'LOBBY', boss: 'BOSS: THE CORE UPDATE', level: 'LEVEL',
      sound: 'SOUND', on: 'ON', off: 'OFF', more: 'Full details ↓', allSk: '★ ALL 14 SKILLS COLLECTED! ★', heal: '+25 HEALTH ♥',
      rank: 'RANK', god: '♥ GOD MODE (cute edition) ', kills: 'BUGS SQUASHED', skills: 'SKILLS', accuracy: ''
    },
    th: {
      title: 'RESUME QUEST', sub: 'ดันเจี้ยนมุมมองบุคคลที่หนึ่งสุดน่ารักของเส้นทางอาชีพผม กำจัดบั๊ก อ่านเทอร์มินัล และเอาชนะบอส',
      cute: '♥ โหมดน่ารัก', doom: '☠ โหมด DOOM', cuteT: 'บั๊กใจดี หัวใจฟื้นเอง', doomT: 'บั๊กเร็ว ไม่ฟื้นเลือด อันตรายจริง',
      skip: 'ข้ามไปที่ Resume ↓', pause: 'หยุดชั่วคราว', resume: '▶ เล่นต่อ', restart: '↺ เริ่มใหม่',
      dead: 'โดนบั๊กกัดแล้ว!', deadSub: 'อุ๊ปส์ ขนาดนักพัฒนาเก่งๆ ก็ปล่อยบั๊กหลุด ลองอีกทีไหม?', retry: '↻ ลองห้องนี้ใหม่',
      win: 'เคลียร์ด่าน ★', winSub: 'คุณชนะ THE CORE UPDATE แล้ว มาคุยกันเลย!', contact: '✉ ติดต่อผม', read: 'อ่าน Resume ↓', again: '↺ เล่นอีกครั้ง',
      hp: 'พลังชีวิต', sk: 'สกิล', kl: 'บั๊ก', lv: 'พื้นที่', mode: 'โหมด', time: 'เวลา', deaths: 'ลองใหม่',
      hint: 'WASD / ลูกศร เดิน · เมาส์ หรือ ← → หมุน · Space / คลิก ยิง · Esc หยุด',
      hintTouch: 'แผงซ้ายเดิน · ลากที่จอเพื่อมอง · กด FIRE เพื่อยิง',
      cleared: 'เคลียร์พื้นที่!', unlocked: 'ประตูเปิดแล้ว →', lobby: 'ล็อบบี้', boss: 'บอส: THE CORE UPDATE', level: 'เลเวล',
      sound: 'เสียง', on: 'เปิด', off: 'ปิด', more: 'ดูรายละเอียด ↓', allSk: '★ เก็บสกิลครบทั้ง 14 อย่าง! ★', heal: '+25 พลังชีวิต ♥',
      rank: 'อันดับ', god: '♥ โหมดอมตะ (เวอร์ชันน่ารัก) ', kills: 'บั๊กที่กำจัด', skills: 'สกิล', accuracy: ''
    }
  };
  var TERM = {
    lobby: {
      en: { lv: 'START ROOM', role: 'Welcome, recruiter!', org: 'Surajak Chansamrit · Full-Stack Web Developer & Technical SEO Specialist',
        points: ['8+ years across Technical SEO, digital marketing, analytics and full-stack development.', 'Clear each room to unlock the next door. Terminals show my career.', 'Collect 14 skill orbs, beat the boss, then say hi!'] },
      th: { lv: 'ห้องเริ่มต้น', role: 'ยินดีต้อนรับครับ!', org: 'Surajak Chansamrit · Full-Stack Web Developer & Technical SEO Specialist',
        points: ['ประสบการณ์กว่า 8 ปี ด้าน Technical SEO, การตลาดดิจิทัล, Analytics และ Full-Stack Development', 'เคลียร์แต่ละห้องเพื่อปลดล็อกประตูถัดไป เทอร์มินัลจะแสดงเส้นทางอาชีพของผม', 'เก็บสกิลออร์บ 14 ลูก เอาชนะบอส แล้วมาทักทายกัน!'] }
    },
    boss: {
      en: { lv: 'FINAL ROOM', role: 'The SEO’s final boss', org: 'THE CORE UPDATE',
        points: ['Every SEO fears a core algorithm update. I recovered +35% non-brand organic traffic after one at HomePro.', 'Dodge the pink shots. Aim for the crowned cutie.'] },
      th: { lv: 'ห้องสุดท้าย', role: 'บอสสุดท้ายของคนทำ SEO', org: 'THE CORE UPDATE',
        points: ['คนทำ SEO ทุกคนกลัว core algorithm update ผมเคยฟื้นทราฟฟิก non-brand +35% หลังโดนที่ HomePro', 'หลบกระสุนสีชมพู แล้วเล็งไปที่เจ้าตัวน่ารักสวมมงกุฎ'] }
    }
  };

  /* ------------------------------------------------------------------ map */
  var MW = 100, MH = 15, NR = 7;
  var grid = new Uint8Array(MW * MH).fill(255), zone = new Uint8Array(MW * MH).fill(255);
  var rooms = [];
  (function buildMap() {
    var r, x, y;
    for (r = 0; r < NR; r++) {
      var x0 = 1 + 14 * r;
      for (y = 2; y <= 12; y++) for (x = x0; x <= x0 + 10; x++) { grid[y * MW + x] = 0; zone[y * MW + x] = r; }
      if (r < NR - 1) {
        for (y = 6; y <= 8; y++) {
          grid[y * MW + x0 + 11] = 20 + r; zone[y * MW + x0 + 11] = 7;
          grid[y * MW + x0 + 12] = 0; zone[y * MW + x0 + 12] = 7;
          grid[y * MW + x0 + 13] = 0; zone[y * MW + x0 + 13] = 7;
        }
      }
      [[3, 4], [7, 4], [3, 10], [7, 10]].forEach(function (p) { grid[p[1] * MW + x0 + p[0]] = 255; });
      rooms.push({ i: r, x0: x0, x1: x0 + 10, cleared: false, ents: [], term: { x: x0 + 5.5, y: 2.55 }, seen: false });
    }
  })();
  // fix wall ids: recompute cleanly (above loop kept simple fallback)
  (function fixWalls() {
    for (var i = 0; i < MW * MH; i++) {
      if (grid[i] === 0 || (grid[i] >= 20 && grid[i] !== 255)) continue;
      var cx = i % MW, cy = (i / MW) | 0, best = 99;
      for (var j = -1; j <= 1; j++) for (var k = -1; k <= 1; k++) {
        var nx = cx + k, ny = cy + j; if (nx < 0 || ny < 0 || nx >= MW || ny >= MH) continue;
        var n = ny * MW + nx; if (grid[n] === 0 && zone[n] < 7) best = Math.min(best, zone[n]);
      }
      grid[i] = best === 99 ? 8 : best + 1;
    }
  })();

  var wallsD = T.walls.map(function (t) { return t ? D(t) : null; });
  var doorsD = T.doors.map(D), floorsD = T.floors.map(D), ceilD = D(T.ceil);

  /* ------------------------------------------------------------------ entities */
  var ENEMY = {
    ghost: { hp: 3, sp: 1.0, r: 0.35, melee: true, dmg: 8, cd: 1.0, scale: 0.85, lift: 0.1 },
    snail: { hp: 6, sp: 0.5, r: 0.4, shoot: true, rate: 2.6, pspd: 1.8, dmg: 8, keep: 5, scale: 0.9, lift: 0 },
    slime: { hp: 3, sp: 1.7, r: 0.35, melee: true, dmg: 10, cd: 0.9, scale: 0.8, lift: 0, hop: true },
    toxic: { hp: 5, sp: 0.8, r: 0.38, shoot: true, rate: 2.0, pspd: 2.4, dmg: 9, keep: 4, scale: 0.9, lift: 0 },
    bug: { hp: 4, sp: 1.2, r: 0.35, shoot: true, rate: 1.5, pspd: 2.8, dmg: 7, keep: 3.5, strafe: true, scale: 0.85, lift: 0 },
    boss: { hp: 60, sp: 0.7, r: 0.85, shoot: true, rate: 1.7, pspd: 2.6, dmg: 10, keep: 5, scale: 1.75, lift: 0, boss: true }
  };
  var SPAWN = {
    1: [['ghost', 8.5, 4.5], ['ghost', 8.5, 9.5], ['ghost', 6.5, 7.5]],
    2: [['snail', 8.5, 4.5], ['snail', 8.5, 10.5], ['snail', 6.5, 7.5], ['slime', 9.5, 7.5]],
    3: [['slime', 6.5, 4.5], ['slime', 8.5, 6.5], ['slime', 8.5, 9.5], ['slime', 5.5, 10.5], ['slime', 6.5, 7.5]],
    4: [['toxic', 8.5, 4.5], ['toxic', 8.5, 10.5], ['toxic', 6.0, 7.5], ['toxic', 9.5, 7.5], ['ghost', 5.5, 5.5], ['ghost', 5.5, 9.5]],
    5: [['bug', 8.5, 3.5], ['bug', 9.0, 5.5], ['bug', 9.0, 9.5], ['bug', 8.5, 11.5], ['bug', 5.5, 7.5], ['bug', 8.5, 7.5]],
    6: [['boss', 7.5, 7.5]]
  };
  var SKILL_DEF = [['Technical SEO', 0], ['Keyword Research', 0], ['Core Web Vitals', 0], ['Semrush', 0], ['GA4', 0], ['Looker Studio', 0], ['Python', 1], ['Node.js', 1], ['Next.js', 1], ['React', 1], ['PostgreSQL', 1], ['Supabase', 1], ['Google Ads', 2], ['Cloudflare', 2]];
  var ORB_COL = ['#4de1ff', '#7cffb2', '#ffcc4d'];

  var enemies = [], items = [], props = [], shots = [], fx = [], terminals = [], portal = null;
  var P = { x: 2.5, y: 7.5, a: 0, hp: 100 };
  var state = 'menu', mode = 'cute', god = false, started = false;
  var stats = { kills: 0, skills: 0, deaths: 0, t: 0, totalKills: 0 };
  var curRoom = 0, hurtT = 0, flashT = 0, cool = 0, pickT = 0, bobT = 0, moving = 0, lastHurt = 99, faceKill = 0, bossAwake = false, clock = 0;

  function addEnemy(kind, x, y, room) {
    var d = ENEMY[kind];
    var e = { kind: kind, x: x, y: y, sx: x, sy: y, hp: d.hp, hp0: d.hp, r: d.r, room: room, state: 'idle', cd: 1 + Math.random(), bite: 0, flash: 0, dead: false, fr: 0, ft: Math.random(), side: Math.random() < 0.5 ? 1 : -1, stuck: 0, losT: 0, los: false, phase2: false, spawned: false };
    enemies.push(e); rooms[room].ents.push(e); stats.totalKills++; return e;
  }
  (function populate() {
    var r, i;
    for (r = 0; r < NR; r++) {
      var x0 = rooms[r].x0;
      (SPAWN[r] || []).forEach(function (s) { addEnemy(s[0], x0 + s[1], s[2], r); });
      var term = rooms[r].term; terminals.push({ x: term.x, y: term.y, room: r, tex: T.term });
      [[0.7, 2.3], [10.3, 2.3], [0.7, 12.7], [10.3, 12.7]].forEach(function (p) { props.push({ x: x0 + p[0], y: p[1], tex: r === 6 ? T.crystal : T.lamp, fps: 3, scale: 0.7, lift: r === 6 ? 0 : 0.18 }); });
      if (r === 0 || r === 6) { props.push({ x: x0 + 1.0, y: 3.4, tex: T.plant, fps: 0, scale: 0.8, lift: 0 }); props.push({ x: x0 + 1.0, y: 11.6, tex: T.plant, fps: 0, scale: 0.8, lift: 0 }); props.push({ x: x0 + 10.0, y: 4.0, tex: T.plant, fps: 0, scale: 0.8, lift: 0 }); props.push({ x: x0 + 10.0, y: 11.0, tex: T.plant, fps: 0, scale: 0.8, lift: 0 }); }
    }
    // skill orbs: 2 per room
    SKILL_DEF.forEach(function (s, i) {
      var r2 = (i / 2) | 0, odd = r2 & 1, pos = (i & 1) ? (odd ? [2.2, 3.0] : [9.5, 3.0]) : (odd ? [9.5, 11.0] : [2.2, 11.0]);
      items.push({ type: 'skill', name: s[0], x: rooms[r2].x0 + pos[0], y: pos[1], tex: T.orb[ORB_COL[s[1]]], alive: true, i: i });
    });
    [[1, 2.3, 7.5], [2, 9.7, 12.2], [3, 2.3, 7.5], [4, 9.7, 2.8], [5, 2.3, 12.2], [5, 9.7, 12.2], [6, 2.3, 12.2], [6, 2.3, 2.6]].forEach(function (h) {
      items.push({ type: 'heart', x: rooms[h[0]].x0 + h[1], y: h[2], tex: T.heart, alive: true });
    });
  })();

  /* ------------------------------------------------------------------ world helpers */
  function solid(x, y) { var cx = x | 0, cy = y | 0; if (x < 0 || y < 0 || cx >= MW || cy >= MH) return true; return grid[cy * MW + cx] !== 0; }
  function walk(x, y, r) { return !solid(x - r, y - r) && !solid(x + r, y - r) && !solid(x - r, y + r) && !solid(x + r, y + r); }
  function castDist(px, py, dx, dy) {
    var mx = px | 0, my = py | 0, ddx = dx === 0 ? 1e30 : Math.abs(1 / dx), ddy = dy === 0 ? 1e30 : Math.abs(1 / dy), sx, sy, sdx, sdy, side = 0, n = 0;
    if (dx < 0) { sx = -1; sdx = (px - mx) * ddx; } else { sx = 1; sdx = (mx + 1 - px) * ddx; }
    if (dy < 0) { sy = -1; sdy = (py - my) * ddy; } else { sy = 1; sdy = (my + 1 - py) * ddy; }
    while (n++ < 80) {
      if (sdx < sdy) { sdx += ddx; mx += sx; side = 0; } else { sdy += ddy; my += sy; side = 1; }
      if (mx < 0 || my < 0 || mx >= MW || my >= MH || grid[my * MW + mx] !== 0) break;
    }
    return side === 0 ? sdx - ddx : sdy - ddy;
  }
  function hasLOS(e) { var dx = P.x - e.x, dy = P.y - e.y, d = Math.sqrt(dx * dx + dy * dy); return castDist(e.x, e.y, dx / d, dy / d) >= d - 0.2; }
  function zoneAt(x, y) { var cx = x | 0, cy = y | 0; return (cx < 0 || cy < 0 || cx >= MW || cy >= MH) ? 255 : zone[cy * MW + cx]; }

  /* ------------------------------------------------------------------ sound */
  var ac = null, soundOn = false, musicTimer = null, step = 0, nextT = 0;
  function A() { if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } return ac; }
  function tone(f, dur, type, vol, slide, delay) {
    if (!soundOn || !A()) return;
    try {
      var t = ac.currentTime + (delay || 0), o = ac.createOscillator(), g = ac.createGain();
      o.type = type || 'square'; o.frequency.setValueAtTime(f, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + dur);
      g.gain.setValueAtTime(vol || 0.04, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + 0.02);
    } catch (e) {}
  }
  var sfx = {
    shoot: function () { tone(880, 0.1, 'square', 0.035, -640); },
    hit: function () { tone(300, 0.05, 'triangle', 0.05); },
    kill: function () { tone(700, 0.28, 'sine', 0.07, -520); tone(1100, 0.1, 'square', 0.025, 0, 0.04); },
    pick: function () { tone(988, 0.07, 'square', 0.035); tone(1319, 0.14, 'square', 0.035, 0, 0.07); },
    heal: function () { tone(523, 0.1, 'triangle', 0.06); tone(784, 0.1, 'triangle', 0.06, 0, 0.09); tone(1047, 0.18, 'triangle', 0.06, 0, 0.18); },
    hurt: function () { tone(170, 0.22, 'sawtooth', 0.06, -90); },
    door: function () { tone(110, 0.5, 'sawtooth', 0.05, 200); tone(660, 0.12, 'square', 0.03, 0, 0.3); },
    term: function () { tone(660, 0.06, 'square', 0.03); tone(990, 0.08, 'square', 0.03, 0, 0.06); },
    win: function () { [523, 659, 784, 1047, 1319, 1568].forEach(function (f, i) { tone(f, 0.18, 'square', 0.04, 0, i * 0.1); }); },
    die: function () { tone(400, 0.6, 'sawtooth', 0.06, -330); }
  };
  var BASS = [55, 0, 55, 0, 65.4, 0, 55, 0, 82.4, 0, 82.4, 0, 73.4, 0, 65.4, 0];
  var LEAD = [0, 0, 440, 0, 0, 523, 0, 659, 0, 0, 587, 0, 523, 0, 440, 0];
  function musicTick() {
    if (!soundOn || !ac || state !== 'play') return;
    var spb = 60 / 132 / 4;
    while (nextT < ac.currentTime + 0.15) {
      var i = step & 15, t = nextT - ac.currentTime;
      if (BASS[i]) tone(BASS[i], spb * 1.6, 'sawtooth', 0.028, 0, Math.max(0, t));
      if (LEAD[i]) tone(LEAD[i], spb * 1.8, 'square', 0.014, 0, Math.max(0, t));
      if (i % 4 === 0) tone(60, 0.08, 'sine', 0.07, -30, Math.max(0, t));
      step++; nextT += spb;
    }
  }
  function setSound(on) {
    soundOn = on; var b = $('btnSound'); if (b) { b.setAttribute('aria-pressed', on); }
    if (on) { A(); if (ac && ac.state === 'suspended') ac.resume(); nextT = ac ? ac.currentTime + 0.1 : 0; if (!musicTimer) musicTimer = setInterval(musicTick, 40); sfx.pick(); }
    updateHud();
  }

  /* ------------------------------------------------------------------ DOM / HUD */
  var el = { hp: $('hpNum'), face: $('faceCv'), sk: $('skillNum'), kl: $('killNum'), lv: $('lvlName'), md: $('modeName'), banner: $('banner'), card: $('termCard'), overlay: $('overlay'),
    bossBar: $('bossBar'), bossFill: $('bossFill'), screen: $('screen'), hint: $('hintLine'), cab: $('cabinet'), touch: $('touch'), hurt: $('hurtFx') };
  var faceCtx = el.face ? el.face.getContext('2d') : null, faceState = '';
  function setFace(s) { if (s === faceState || !faceCtx) return; faceState = s; faceCtx.clearRect(0, 0, 32, 32); faceCtx.drawImage(T.face[s], 0, 0); }
  function roomName(r) {
    if (r === 0) return L[lang()].lobby;
    if (r === 6) return L[lang()].boss;
    var s = STAGES[r - 1]; return s ? (s.chip + ' · ' + s.year) : '';
  }
  function updateHud() {
    var t = L[lang()];
    if (el.hp) el.hp.textContent = Math.max(0, Math.ceil(P.hp)) + '%';
    if (el.sk) el.sk.textContent = stats.skills + '/' + SKILL_DEF.length;
    if (el.kl) el.kl.textContent = stats.kills + '/' + stats.totalKills;
    if (el.lv) el.lv.textContent = roomName(curRoom);
    if (el.md) el.md.textContent = mode === 'cute' ? '♥ CUTE' : '☠ DOOM';
    var set = function (id, txt) { var n = $(id); if (n) n.textContent = txt; };
    set('lblHp', t.hp); set('lblSk', t.sk); set('lblKl', t.kl); set('lblLv', t.lv); set('lblMd', t.mode);
    var b = $('btnSound'); if (b) b.textContent = t.sound + ' ' + (soundOn ? t.on : t.off);
    if (el.hint) el.hint.textContent = coarse ? t.hintTouch : t.hint;
    var hp = P.hp; if (state === 'dead') setFace('dead'); else if (faceKill > 0) setFace('grin'); else if (hurtT > 0.15) setFace('ouch'); else setFace(hp > 66 ? 'ok' : (hp > 33 ? 'meh' : 'bad'));
  }
  var bannerT = 0;
  function banner(a, b, cls) {
    if (!el.banner) return;
    el.banner.innerHTML = ''; var h = document.createElement('div'); h.className = 'b1'; h.textContent = a; el.banner.appendChild(h);
    if (b) { var s = document.createElement('div'); s.className = 'b2'; s.textContent = b; el.banner.appendChild(s); }
    el.banner.className = 'banner show' + (cls ? ' ' + cls : ''); bannerT = 2.4;
  }
  var cardRoom = -1;
  function renderCard() {
    var c = el.card; if (!c) return;
    if (cardRoom < 0) { c.hidden = true; return; }
    var r = cardRoom, tdata, color = '#4de1ff', link = null, L2 = lang();
    if (r === 0) { tdata = TERM.lobby[L2]; color = '#7cffd4'; }
    else if (r === 6) { tdata = TERM.boss[L2]; color = '#ff5fa2'; }
    else { var s = STAGES[r - 1], d = s[L2]; tdata = { lv: L[L2].level + ' ' + (s.lv < 10 ? '0' : '') + s.lv + ' · ' + d.date, role: d.role, org: d.org, points: d.points }; color = s.color; link = '#exp-' + s.id; }
    c.style.setProperty('--c', color); c.innerHTML = '';
    var mk = function (tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; n.textContent = txt; c.appendChild(n); return n; };
    mk('p', 'c-lv', tdata.lv); mk('h3', '', tdata.role); mk('p', 'c-org', tdata.org);
    var ul = document.createElement('ul'); tdata.points.forEach(function (p) { var li = document.createElement('li'); li.textContent = p; ul.appendChild(li); }); c.appendChild(ul);
    if (link) { var a = mk('a', '', L[L2].more); a.href = link; }
    c.hidden = false;
  }

  /* ------------------------------------------------------------------ overlay */
  function btn(txt, cls, fn) { var b = document.createElement('button'); b.type = 'button'; b.className = 'btn ' + (cls || ''); b.textContent = txt; b.addEventListener('click', fn); return b; }
  function showOverlay(kind) {
    var o = el.overlay, t = L[lang()]; if (!o) return;
    o.innerHTML = ''; o.hidden = false; o.dataset.kind = kind;
    if (el.banner) { el.banner.classList.remove('show'); bannerT = 0; }
    var mk = function (tag, cls, txt) { var n = document.createElement(tag); n.className = cls; n.textContent = txt; o.appendChild(n); return n; };
    var row = document.createElement('div'); row.className = 'ov-row';
    if (kind === 'menu') {
      mk('p', 'pixel ov-title', t.title); mk('p', 'ov-sub', t.sub);
      var r1 = document.createElement('div'); r1.className = 'mode-pick';
      [['cute', t.cute, t.cuteT, ''], ['doom', t.doom, t.doomT, 'hot']].forEach(function (m) {
        var wrap = document.createElement('div'); wrap.className = 'mode'; wrap.appendChild(btn(m[1], m[3], function () { begin(m[0]); })); var sm = document.createElement('small'); sm.textContent = m[2]; wrap.appendChild(sm); r1.appendChild(wrap);
      });
      o.appendChild(r1);
      var a = document.createElement('a'); a.href = '#about'; a.className = 'btn ghost'; a.textContent = t.skip; row.appendChild(a); o.appendChild(row);
    } else if (kind === 'pause') {
      mk('p', 'pixel ov-title', t.pause); row.appendChild(btn(t.resume, '', resumeGame)); row.appendChild(btn(t.restart, 'ghost', function () { begin(mode); }));
      var a2 = document.createElement('a'); a2.href = '#about'; a2.className = 'btn ghost'; a2.textContent = t.skip; row.appendChild(a2); o.appendChild(row);
    } else if (kind === 'dead') {
      o.classList.add('dead'); mk('p', 'pixel ov-title', t.dead); mk('p', 'ov-sub', t.deadSub); row.appendChild(btn(t.retry, 'hot', respawn)); o.appendChild(row);
    } else if (kind === 'win') {
      mk('p', 'pixel ov-title gold', t.win); mk('p', 'ov-sub', t.winSub);
      var all = stats.skills === SKILL_DEF.length, rank = all && stats.deaths === 0 ? 'S' : (all ? 'A' : (stats.deaths < 3 ? 'B' : 'C'));
      var mins = Math.floor(stats.t / 60), secs = ('0' + Math.floor(stats.t % 60)).slice(-2);
      var st = mk('p', 'ov-stats pixel', t.rank + ' ' + rank + ' · ' + t.time + ' ' + mins + ':' + secs + ' · ' + t.skills + ' ' + stats.skills + '/' + SKILL_DEF.length + ' · ' + t.deaths + ' ' + stats.deaths);
      var ac2 = document.createElement('a'); ac2.href = '#contact'; ac2.className = 'btn'; ac2.textContent = t.contact; row.appendChild(ac2);
      var ar = document.createElement('a'); ar.href = '#about'; ar.className = 'btn ghost'; ar.textContent = t.read; row.appendChild(ar);
      row.appendChild(btn(t.again, 'ghost', function () { begin(mode); })); o.appendChild(row);
    }
    if (kind !== 'dead') o.classList.remove('dead');
  }
  window.addEventListener('langchange', function () { updateHud(); renderCard(); if (!el.overlay.hidden) showOverlay(el.overlay.dataset.kind); });

  /* ------------------------------------------------------------------ game flow */
  var MODES = { cute: { pdmg: 2, edmg: 0.4, espd: 0.8, erate: 1.5, pspd: 0.72, regen: 3 }, doom: { pdmg: 1, edmg: 1, espd: 1.12, erate: 1, pspd: 1, regen: 0 } };
  var coarse = window.matchMedia && matchMedia('(pointer: coarse)').matches;
  function resetWorld() {
    enemies.forEach(function (e) { e.x = e.sx; e.y = e.sy; e.hp = e.hp0; e.dead = false; e.state = 'idle'; e.flash = 0; e.phase2 = false; e.spawned = false; e.cd = 1 + Math.random(); });
    for (var i = enemies.length - 1; i >= 0; i--) if (enemies[i].extra) { enemies.splice(i, 1); }
    items.forEach(function (it) { it.alive = true; });
    shots.length = 0; fx.length = 0; portal = null;
    // rebuild room ents / doors
    rooms.forEach(function (r) { r.cleared = false; r.ents = []; r.seen = false; });
    enemies.forEach(function (e) { rooms[e.room].ents.push(e); });
    for (var k = 0; k < MW * MH; k++) if (grid[k] >= 20) grid[k] = grid[k]; // doors stay as built
    // re-close doors
    for (var r = 0; r < NR - 1; r++) for (var y = 6; y <= 8; y++) grid[y * MW + rooms[r].x0 + 11] = 20 + r;
    stats = { kills: 0, skills: 0, deaths: 0, t: 0, totalKills: stats.totalKills };
    P.x = 2.5; P.y = 7.5; P.a = 0; P.hp = 100; curRoom = 0; bossAwake = false; god = false; cardRoom = -1;
    if (el.bossBar) el.bossBar.hidden = true;
    openIfClear(0, true);
  }
  function begin(m) {
    mode = m; resetWorld(); started = true; state = 'play'; if (el.overlay) el.overlay.hidden = true;
    if (el.touch && coarse) el.touch.classList.add('live');
    lockPointer(); if (el.screen) el.screen.focus({ preventScroll: true });
    var r = el.screen && el.screen.getBoundingClientRect(); if (r && (r.top < 0 || r.bottom > innerHeight)) el.screen.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
    updateHud(); banner(L[lang()].lobby, L[lang()].level + ' 0'); sfx.pick(); step = 0; nextT = ac ? ac.currentTime + 0.1 : 0;
  }
  function resumeGame() { state = 'play'; el.overlay.hidden = true; lockPointer(); if (el.screen) el.screen.focus({ preventScroll: true }); last = performance.now(); }
  function pauseGame() { if (state !== 'play') return; state = 'pause'; keys = {}; firing = false; showOverlay('pause'); try { if (document.exitPointerLock) document.exitPointerLock(); } catch (e) {} }
  function lockPointer() { if (coarse || !cvs.requestPointerLock) return; try { var p = cvs.requestPointerLock(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
  document.addEventListener('pointerlockchange', function () { if (document.pointerLockElement !== cvs && state === 'play' && !coarse) pauseGame(); });
  function respawn() {
    var r = rooms[curRoom];
    stats.deaths++; r.ents.forEach(function (e) { if (!e.dead || true) { e.x = e.sx; e.y = e.sy; e.hp = e.hp0; if (e.dead && !e.extra) { stats.kills--; } e.dead = false; e.state = 'idle'; e.phase2 = false; } });
    for (var i = enemies.length - 1; i >= 0; i--) if (enemies[i].extra && enemies[i].room === curRoom) { enemies.splice(i, 1); }
    r.ents = r.ents.filter(function (e) { return !e.extra; });
    shots.length = 0; if (el.bossBar) el.bossBar.hidden = true; bossAwake = false;
    P.x = curRoom === 0 ? 2.5 : r.x0 + 1.5; P.y = 7.5; P.a = 0; P.hp = 100; hurtT = 0;
    el.overlay.hidden = true; state = 'play'; lockPointer(); if (el.screen) el.screen.focus({ preventScroll: true }); last = performance.now(); updateHud();
  }
  function die() {
    state = 'dead'; keys = {}; firing = false; sfx.die(); showOverlay('dead'); updateHud(); try { if (document.exitPointerLock) document.exitPointerLock(); } catch (e) {}
  }
  function openIfClear(r, silent) {
    var room = rooms[r]; if (room.cleared) return;
    var alive = room.ents.filter(function (e) { return !e.dead; }).length;
    if (alive > 0) return;
    room.cleared = true;
    if (r < NR - 1) { for (var y = 6; y <= 8; y++) grid[y * MW + room.x0 + 11] = 0; if (!silent) { sfx.door(); banner(L[lang()].cleared, L[lang()].unlocked, 'good'); } }
    else if (!silent) { portal = { x: room.x0 + 9.5, y: 7.5 }; banner(L[lang()].cleared, '★', 'good'); sfx.win(); }
  }

  /* ------------------------------------------------------------------ input */
  var keys = {}, firing = false, joy = { x: 0, y: 0 }, turnVel = 0;
  var GAMEKEYS = { ArrowUp: 1, ArrowDown: 1, ArrowLeft: 1, ArrowRight: 1, ' ': 1, w: 1, a: 1, s: 1, d: 1, W: 1, A: 1, S: 1, D: 1, q: 1, e: 1, Q: 1, E: 1, Control: 1, f: 1, F: 1, Shift: 1 };
  window.addEventListener('keydown', function (e) {
    if (state === 'play') {
      if (e.key === 'Escape') { pauseGame(); return; }
      if (GAMEKEYS[e.key]) { e.preventDefault(); keys[e.key.toLowerCase()] = true; if (e.key === ' ' || e.key === 'Control' || e.key === 'f' || e.key === 'F') firing = true; }
    } else if (state === 'dead' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); respawn(); }
    else if (state === 'pause' && (e.key === 'Enter')) { resumeGame(); }
  });
  window.addEventListener('keyup', function (e) {
    var k = e.key.toLowerCase(); keys[k] = false;
    if (e.key === ' ' || e.key === 'Control' || e.key === 'f' || e.key === 'F') firing = false;
  });
  window.addEventListener('blur', function () { keys = {}; firing = false; });
  cvs.addEventListener('mousedown', function (e) { if (state === 'play' && e.button === 0) { firing = true; if (!coarse && document.pointerLockElement !== cvs) lockPointer(); } });
  window.addEventListener('mouseup', function () { if (!coarse) firing = false; });
  document.addEventListener('mousemove', function (e) { if (state === 'play' && document.pointerLockElement === cvs) P.a += e.movementX * 0.0024; });
  // touch: joystick + drag to look + fire button
  (function touchInit() {
    var pad = $('joy'), knob = $('joyKnob'), fireB = $('fireBtn'), id = null;
    if (pad) {
      var upd = function (e) { var r = pad.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, dx = e.clientX - cx, dy = e.clientY - cy, m = r.width / 2, d = Math.sqrt(dx * dx + dy * dy); if (d > m) { dx *= m / d; dy *= m / d; } joy.x = dx / m; joy.y = dy / m; if (knob) knob.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; };
      pad.addEventListener('pointerdown', function (e) { id = e.pointerId; pad.setPointerCapture(id); upd(e); e.preventDefault(); });
      pad.addEventListener('pointermove', function (e) { if (e.pointerId === id) upd(e); });
      var end = function (e) { if (e.pointerId === id) { id = null; joy.x = joy.y = 0; if (knob) knob.style.transform = ''; } };
      pad.addEventListener('pointerup', end); pad.addEventListener('pointercancel', end);
    }
    if (fireB) {
      fireB.addEventListener('pointerdown', function (e) { firing = true; fireB.classList.add('on'); fireB.setPointerCapture(e.pointerId); e.preventDefault(); });
      var fe = function () { firing = false; fireB.classList.remove('on'); };
      fireB.addEventListener('pointerup', fe); fireB.addEventListener('pointercancel', fe);
    }
    var lx = null, lid = null;
    cvs.addEventListener('pointerdown', function (e) { if (e.pointerType === 'touch' && state === 'play') { lid = e.pointerId; lx = e.clientX; cvs.setPointerCapture(lid); } });
    cvs.addEventListener('pointermove', function (e) { if (e.pointerType === 'touch' && e.pointerId === lid && state === 'play') { P.a += (e.clientX - lx) * 0.012; lx = e.clientX; } });
    var le = function (e) { if (e.pointerId === lid) lid = null; };
    cvs.addEventListener('pointerup', le); cvs.addEventListener('pointercancel', le);
  })();
  var cheat = '';
  window.addEventListener('keypress', function (e) {
    cheat = (cheat + e.key.toLowerCase()).slice(-5);
    if (cheat === 'iddqd') { god = !god; toast(L[lang()].god + (god ? L[lang()].on : L[lang()].off), true); }
  });
  var sndBtn = $('btnSound'); if (sndBtn) sndBtn.addEventListener('click', function () { setSound(!soundOn); });

  /* ------------------------------------------------------------------ combat */
  function hurtPlayer(d) {
    if (state !== 'play' || god) return;
    P.hp -= d * MODES[mode].edmg; hurtT = 0.35; lastHurt = 0; sfx.hurt();
    if (P.hp <= 0) { P.hp = 0; die(); }
    updateHud();
  }
  function damageEnemy(e, d) {
    if (e.dead) return;
    e.hp -= d; e.flash = 0.12; sfx.hit();
    if (e.state === 'idle') e.state = 'chase';
    if (e.kind === 'boss') { bossAwake = true; if (el.bossFill) el.bossFill.style.width = Math.max(0, e.hp / e.hp0 * 100) + '%'; if (!e.phase2 && e.hp < e.hp0 / 2) { e.phase2 = true; banner('PHASE 2', '♥', 'bad'); spawnExtra(e); } }
    if (e.hp <= 0) {
      e.dead = true; e.deadT = 0; if (!e.extra) stats.kills++; faceKill = 0.9; sfx.kill();
      for (var i = 0; i < 6; i++) fx.push({ x: e.x, y: e.y, tex: T.shotGold, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, z: 0.3 + Math.random() * 0.3, vz: 1 + Math.random(), life: 0.7, scale: 0.18 });
      if (e.kind === 'boss' && el.bossBar) el.bossBar.hidden = true;
      openIfClear(e.room);
      updateHud();
    }
  }
  function spawnExtra(boss) {
    var x0 = rooms[boss.room].x0;
    [[x0 + 5.5, 4.5], [x0 + 5.5, 10.5]].forEach(function (p) { var s = addEnemy('slime', p[0], p[1], boss.room); s.extra = true; s.state = 'chase'; stats.totalKills--; });
    rooms[boss.room].cleared = false;
  }
  function fireShot() {
    if (cool > 0) return; cool = 0.2; flashT = 0.08; sfx.shoot();
    var dx = Math.cos(P.a), dy = Math.sin(P.a), wd = castDist(P.x, P.y, dx, dy), best = null, bd = wd, slack = mode === 'cute' ? 0.18 : 0.06;
    for (var i = 0; i < enemies.length; i++) {
      var e = enemies[i]; if (e.dead) continue;
      var ex = e.x - P.x, ey = e.y - P.y, along = ex * dx + ey * dy; if (along < 0.15 || along > bd) continue;
      var perp = Math.abs(ex * dy - ey * dx); if (perp < e.r + slack) { bd = along; best = e; }
    }
    if (best) damageEnemy(best, MODES[mode].pdmg);
    else fx.push({ x: P.x + dx * (wd - 0.05), y: P.y + dy * (wd - 0.05), tex: T.shotGold, vx: 0, vy: 0, z: 0.5, vz: 0, life: 0.2, scale: 0.15 });
  }
  function enemyShoot(e, ang, spd, tex) {
    shots.push({ x: e.x, y: e.y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, dmg: ENEMY[e.kind].dmg, life: 6, tex: tex, z: 0.5 });
  }

  /* ------------------------------------------------------------------ update */
  var last = performance.now();
  function update(dt) {
    var M = MODES[mode];
    clock += dt; stats.t += dt;
    cool -= dt; hurtT -= dt; flashT -= dt; faceKill -= dt; lastHurt += dt; pickT -= dt; bannerT -= dt;
    if (bannerT <= 0 && el.banner) el.banner.classList.remove('show');
    // turning
    var turn = 0; if (keys.arrowleft || keys.q) turn -= 1; if (keys.arrowright || keys.e) turn += 1;
    P.a += turn * 2.5 * dt;
    // moving
    var fwd = 0, str = 0;
    if (keys.w || keys.arrowup) fwd += 1; if (keys.s || keys.arrowdown) fwd -= 1;
    if (keys.a) str -= 1; if (keys.d) str += 1;
    fwd += -joy.y; str += joy.x;
    var len = Math.sqrt(fwd * fwd + str * str); if (len > 1) { fwd /= len; str /= len; }
    var spd = (keys.shift ? 4.4 : 3.3) * dt, cs = Math.cos(P.a), sn = Math.sin(P.a);
    var mx = (cs * fwd - sn * str) * spd, my = (sn * fwd + cs * str) * spd;
    if (walk(P.x + mx, P.y, 0.22)) P.x += mx; if (walk(P.x, P.y + my, 0.22)) P.y += my;
    moving = (Math.abs(fwd) + Math.abs(str)) > 0.1 ? 1 : 0; bobT += dt * (moving ? 1 : 0);
    if (firing) fireShot();
    if (M.regen && lastHurt > 5 && P.hp < 100 && P.hp > 0) { P.hp = Math.min(100, P.hp + M.regen * dt); }
    var zi = zoneAt(P.x, P.y);
    if (zi < 7 && zi !== curRoom) {
      curRoom = zi; var rr = rooms[zi];
      if (!rr.seen) { rr.seen = true; banner(roomName(zi), zi > 0 && zi < 6 ? L[lang()].level + ' ' + zi : '', zi === 6 ? 'bad' : ''); }
      updateHud();
    }
    // terminals
    var near = -1;
    for (var t = 0; t < terminals.length; t++) { var tm = terminals[t], dx = tm.x - P.x, dy = tm.y - P.y; if (dx * dx + dy * dy < 7) near = tm.room; }
    if (near !== cardRoom) { cardRoom = near; renderCard(); if (near >= 0) sfx.term(); }
    // items
    for (var i = 0; i < items.length; i++) {
      var it = items[i]; if (!it.alive) continue;
      var ix = it.x - P.x, iy = it.y - P.y; if (ix * ix + iy * iy > 0.36) continue;
      if (it.type === 'heart') { if (P.hp >= 100) continue; P.hp = Math.min(100, P.hp + 25); it.alive = false; sfx.heal(); toast(L[lang()].heal); pickT = 0.2; }
      else { it.alive = false; stats.skills++; sfx.pick(); pickT = 0.2; toast('+ ' + it.name.toUpperCase() + '   ' + stats.skills + '/' + SKILL_DEF.length); if (stats.skills === SKILL_DEF.length) setTimeout(function () { toast(L[lang()].allSk, true); sfx.win(); }, 900); }
      updateHud();
    }
    // portal
    if (portal) { var px = portal.x - P.x, py = portal.y - P.y; if (px * px + py * py < 0.8) { state = 'win'; keys = {}; firing = false; sfx.win(); showOverlay('win'); try { if (document.exitPointerLock) document.exitPointerLock(); } catch (e) {} } }
    // enemies
    for (var n = 0; n < enemies.length; n++) {
      var e = enemies[n], d = ENEMY[e.kind];
      e.ft += dt; e.fr = ((e.ft * (e.state === 'idle' ? 2 : 4)) | 0) & 1;
      if (e.flash > 0) e.flash -= dt;
      if (e.dead) continue;
      var ex = P.x - e.x, ey = P.y - e.y, dist = Math.sqrt(ex * ex + ey * ey) || 0.001, ux = ex / dist, uy = ey / dist;
      e.losT -= dt; if (e.losT <= 0) { e.losT = 0.25; e.los = dist < 16 && hasLOS(e); }
      if (e.state === 'idle') {
        if (e.los && dist < 11) { e.state = 'chase'; if (e.kind === 'boss') { bossAwake = true; if (el.bossBar) { el.bossBar.hidden = false; el.bossFill.style.width = '100%'; } banner(L[lang()].boss, '♥', 'bad'); } }
        continue;
      }
      var sp = d.sp * M.espd * (e.phase2 ? 1.35 : 1), vx = 0, vy = 0;
      if (d.melee) {
        vx = ux; vy = uy; if (d.hop) { var hop = 0.4 + 0.9 * Math.abs(Math.sin(e.ft * 5)); vx *= hop; vy *= hop; }
        e.bite -= dt; if (dist < e.r + 0.45 && e.bite <= 0) { e.bite = d.cd * (mode === 'cute' ? 1.3 : 1); hurtPlayer(d.dmg); }
      } else {
        var keep = d.keep;
        if (dist > keep + 1) { vx = ux; vy = uy; } else if (dist < keep - 1.2) { vx = -ux; vy = -uy; }
        if (d.strafe || e.kind === 'boss' || dist <= keep + 1) { vx += -uy * e.side * 0.7; vy += ux * e.side * 0.7; }
        if ((n + (e.ft | 0)) % 7 === 0 && Math.random() < 0.01) e.side = -e.side;
        e.cd -= dt;
        if (e.cd <= 0 && e.los && dist < 12) {
          var base = Math.atan2(ey, ex), ps = d.pspd * M.pspd;
          if (e.kind === 'boss') { var nf = e.phase2 ? 5 : 3, sp2 = 0.22; for (var q = 0; q < nf; q++) enemyShoot(e, base + (q - (nf - 1) / 2) * sp2, ps, T.shotPink); e.cd = d.rate * M.erate * (e.phase2 ? 0.75 : 1); }
          else { enemyShoot(e, base, ps, e.kind === 'toxic' || e.kind === 'snail' ? T.shotGreen : T.shotPink); e.cd = d.rate * M.erate * (0.8 + Math.random() * 0.4); }
          tone(520, 0.06, 'triangle', 0.025, 220);
        }
      }
      var mxx = vx * sp * dt, myy = vy * sp * dt, rr2 = e.r * 0.7, moved = false;
      if (walk(e.x + mxx, e.y, rr2)) { e.x += mxx; moved = true; } if (walk(e.x, e.y + myy, rr2)) { e.y += myy; moved = true; }
      if (!moved) { e.stuck += dt; if (e.stuck > 0.4) { e.side = -e.side; e.stuck = 0; var sx2 = -uy * e.side * sp * dt * 4, sy2 = ux * e.side * sp * dt * 4; if (walk(e.x + sx2, e.y, rr2)) e.x += sx2; if (walk(e.x, e.y + sy2, rr2)) e.y += sy2; } } else e.stuck = 0;
      // soft separation
      for (var m = n + 1; m < enemies.length; m++) { var o = enemies[m]; if (o.dead || o.state === 'idle') continue; var sx = o.x - e.x, sy = o.y - e.y, ds = sx * sx + sy * sy, mr = e.r + o.r; if (ds < mr * mr && ds > 0.0001) { var dd = Math.sqrt(ds), push = (mr - dd) * 0.5; if (walk(e.x - sx / dd * push, e.y, rr2)) e.x -= sx / dd * push; if (walk(e.x, e.y - sy / dd * push, rr2)) e.y -= sy / dd * push; } }
      // push player out of enemies
      if (dist < e.r + 0.25) { var pp = (e.r + 0.25 - dist); if (walk(P.x - ux * pp, P.y, 0.22)) P.x -= ux * pp; if (walk(P.x, P.y - uy * pp, 0.22)) P.y -= uy * pp; }
    }
    // shots
    for (var s = shots.length - 1; s >= 0; s--) {
      var sh = shots[s]; sh.x += sh.vx * dt; sh.y += sh.vy * dt; sh.life -= dt;
      if (sh.life <= 0 || solid(sh.x, sh.y)) { shots.splice(s, 1); continue; }
      var hx = sh.x - P.x, hy = sh.y - P.y; if (hx * hx + hy * hy < 0.1) { hurtPlayer(sh.dmg); shots.splice(s, 1); }
    }
    for (var f = fx.length - 1; f >= 0; f--) { var p2 = fx[f]; p2.life -= dt; p2.x += p2.vx * dt; p2.y += p2.vy * dt; p2.z += p2.vz * dt; p2.vz -= 3 * dt; if (p2.life <= 0) fx.splice(f, 1); }
    if (state === 'play' && P.hp > 0 && hurtT > 0 && el.hurt) el.hurt.style.opacity = Math.min(0.7, hurtT * 2);
    else if (el.hurt) el.hurt.style.opacity = 0;
    if (Math.floor(clock * 4) !== Math.floor((clock - dt) * 4)) updateHudFace();
    if (el.bossBar && !el.bossBar.hidden) { /* kept in sync on damage */ }
  }
  function updateHudFace() { var hp = P.hp; if (el.hp) el.hp.textContent = Math.max(0, Math.ceil(hp)) + '%'; if (state === 'dead') setFace('dead'); else if (faceKill > 0) setFace('grin'); else if (hurtT > 0.15) setFace('ouch'); else setFace(hp > 66 ? 'ok' : (hp > 33 ? 'meh' : 'bad')); }

  /* ------------------------------------------------------------------ render */
  var zBuf = new Float32Array(W), FOVK = 0.78;
  var FR = 26, FG = 11, FB = 46;
  function shade(c, f) {
    var r = ((c & 255) * f >> 8) + (FR * (256 - f) >> 8), g = (((c >> 8) & 255) * f >> 8) + (FG * (256 - f) >> 8), b = (((c >> 16) & 255) * f >> 8) + (FB * (256 - f) >> 8);
    return (255 << 24) | (b << 16) | (g << 8) | r;
  }
  function fogF(d) { var f = 256 - d * 11 | 0; return f < 44 ? 44 : f; }
  function renderWorld() {
    var px = P.x, py = P.y, dx = Math.cos(P.a), dy = Math.sin(P.a), plx = -dy * FOVK, ply = dx * FOVK;
    var rdx0 = dx - plx, rdy0 = dy - ply, rdx1 = dx + plx, rdy1 = dy + ply, x, y;
    for (y = HALF + 1; y < H; y++) {
      var p = y - HALF, rowDist = HALF / p, f = fogF(rowDist), fsx = rowDist * (rdx1 - rdx0) / W, fsy = rowDist * (rdy1 - rdy0) / W, fxx = px + rowDist * rdx0, fyy = py + rowDist * rdy0, rowF = y * W, rowC = (H - 1 - y) * W;
      for (x = 0; x < W; x++) {
        var cx = fxx | 0, cy = fyy | 0, zi = (cx >= 0 && cx < MW && cy >= 0 && cy < MH) ? zone[cy * MW + cx] : 7; if (zi === 255) zi = 7;
        var ti = ((((fyy * 64) | 0) & 63) << 6) + (((fxx * 64) | 0) & 63);
        buf[rowF + x] = shade(floorsD[zi][ti], f); buf[rowC + x] = shade(ceilD[ti], f);
        fxx += fsx; fyy += fsy;
      }
    }
    for (x = 0; x < W; x++) {
      var camX = 2 * x / W - 1, rdx = dx + plx * camX, rdy = dy + ply * camX, mx = px | 0, my = py | 0;
      var ddx = rdx === 0 ? 1e30 : Math.abs(1 / rdx), ddy = rdy === 0 ? 1e30 : Math.abs(1 / rdy), stx, sty, sdx, sdy, side = 0, hit = 0, n = 0;
      if (rdx < 0) { stx = -1; sdx = (px - mx) * ddx; } else { stx = 1; sdx = (mx + 1 - px) * ddx; }
      if (rdy < 0) { sty = -1; sdy = (py - my) * ddy; } else { sty = 1; sdy = (my + 1 - py) * ddy; }
      while (n++ < 80) {
        if (sdx < sdy) { sdx += ddx; mx += stx; side = 0; } else { sdy += ddy; my += sty; side = 1; }
        if (mx < 0 || my < 0 || mx >= MW || my >= MH) { hit = 8; break; }
        hit = grid[my * MW + mx]; if (hit !== 0) break;
      }
      var perp = side === 0 ? sdx - ddx : sdy - ddy; if (perp < 0.05) perp = 0.05;
      zBuf[x] = perp;
      var lineH = H / perp, ds = (H - lineH) / 2, y0 = ds < 0 ? 0 : ds | 0, y1 = (H + lineH) / 2 | 0; if (y1 >= H) y1 = H - 1;
      var wx = side === 0 ? py + perp * rdy : px + perp * rdx; wx -= Math.floor(wx);
      var tx = (wx * 64) | 0; if ((side === 0 && rdx > 0) || (side === 1 && rdy < 0)) tx = 63 - tx;
      var tex = hit >= 20 ? doorsD[hit - 20] : wallsD[hit] || wallsD[8], tp = tex.d || tex;
      var fw = fogF(perp); if (side === 1) fw = fw * 205 >> 8;
      var stp = 64 / lineH, tpos = (y0 - ds) * stp;
      for (y = y0; y <= y1; y++) { buf[y * W + x] = shade(tp[(((tpos | 0) & 63) << 6) + tx], fw); tpos += stp; }
    }
    return { dx: dx, dy: dy, plx: plx, ply: ply };
  }
  var list = [];
  function pushSprite(x, y, tex, frame, scale, lift, flash, dead) {
    list.push({ x: x, y: y, tex: tex, fr: frame, sc: scale, lift: lift, fl: flash, dist: (x - P.x) * (x - P.x) + (y - P.y) * (y - P.y) });
  }
  function drawSprites(c) {
    list.length = 0;
    var tm = clock, i;
    for (i = 0; i < props.length; i++) { var pr = props[i]; if (pr.scale <= 0) continue; pushSprite(pr.x, pr.y, pr.tex, pr.fps ? ((tm * pr.fps) | 0) % pr.tex.length : 0, pr.scale, pr.lift, 0); }
    for (i = 0; i < terminals.length; i++) { var t = terminals[i]; pushSprite(t.x, t.y, T.term, ((tm * 2) | 0) & 1, 0.8, 0.0, 0); }
    for (i = 0; i < items.length; i++) { var it = items[i]; if (!it.alive) continue; pushSprite(it.x, it.y, it.tex, ((tm * 3) | 0) & 1, 0.5, 0.28 + Math.sin(tm * 3 + i) * 0.05, 0); }
    for (i = 0; i < enemies.length; i++) {
      var e = enemies[i], d = ENEMY[e.kind], m = T.mon[e.kind];
      if (e.dead) { pushSprite(e.x, e.y, [m.dead], 0, d.scale * 0.75, 0, 0); continue; }
      var lift = d.lift + (d.hop ? Math.abs(Math.sin(e.ft * 5)) * 0.18 : 0) + (e.kind === 'ghost' ? Math.sin(e.ft * 3) * 0.06 : 0);
      pushSprite(e.x, e.y, m.f, e.fr, d.scale, lift, e.flash > 0 ? 1 : 0);
    }
    for (i = 0; i < shots.length; i++) pushSprite(shots[i].x, shots[i].y, shots[i].tex, 0, 0.32, 0.3, 0);
    for (i = 0; i < fx.length; i++) pushSprite(fx[i].x, fx[i].y, fx[i].tex, 0, fx[i].scale, Math.max(0, fx[i].z - 0.3), 0);
    if (portal) pushSprite(portal.x, portal.y, T.portal, ((tm * 4) | 0) & 1, 1.1, 0.0, 0);
    list.sort(function (a, b) { return b.dist - a.dist; });
    var inv = 1 / (c.plx * c.dy - c.dx * c.ply);
    for (i = 0; i < list.length; i++) {
      var s = list[i], sx = s.x - P.x, sy = s.y - P.y, trX = inv * (c.dy * sx - c.dx * sy), trY = inv * (-c.ply * sx + c.plx * sy);
      if (trY < 0.15) continue;
      var tex = s.tex[s.fr % s.tex.length], tw = tex.w, th = tex.h, td = tex.d;
      var scrX = (W / 2) * (1 + trX / trY), size = Math.abs(H / trY) * s.sc, floorY = HALF + (H / trY) / 2, endY = floorY - s.lift * H / trY, startY = endY - size;
      var x0 = (scrX - size / 2) | 0, x1 = (scrX + size / 2) | 0, f = fogF(trY), fl = s.fl;
      if (x1 < 0 || x0 >= W) continue;
      var xs = x0 < 0 ? 0 : x0, xe = x1 >= W ? W - 1 : x1, ys = startY < 0 ? 0 : startY | 0, ye = endY >= H ? H - 1 : endY | 0;
      for (var x = xs; x <= xe; x++) {
        if (trY >= zBuf[x]) continue;
        var tx = ((x - (scrX - size / 2)) * tw / size) | 0; if (tx < 0 || tx >= tw) continue;
        for (var y = ys; y <= ye; y++) {
          var ty = ((y - startY) * th / size) | 0; if (ty < 0 || ty >= th) continue;
          var col = td[ty * tw + tx]; if ((col >>> 24) < 128) continue;
          if (fl) { var r = col & 255, g = (col >> 8) & 255, b = (col >> 16) & 255; col = (255 << 24) | (((b + 255) >> 1) << 16) | (((g + 255) >> 1) << 8) | ((r + 255) >> 1); }
          buf[y * W + x] = f >= 250 ? col : shade(col, f);
        }
      }
    }
  }
  function render() {
    var c = renderWorld(); drawSprites(c);
    ctx.putImageData(img, 0, 0);
    // weapon
    var bobx = Math.round(Math.sin(bobT * 9) * 3), boby = Math.round(Math.abs(Math.cos(bobT * 9)) * 3), rec = flashT > 0 ? 4 : 0;
    var wimg = T.weapon[flashT > 0 ? 1 : 0];
    if (state === 'play' || state === 'dead' || state === 'pause') ctx.drawImage(wimg, W / 2 - 36 + bobx, H - 64 + boby + rec + (flashT > 0 ? -2 : 4));
    // crosshair
    if (state === 'play') { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(W / 2 - 1, HALF - 5, 2, 3); ctx.fillRect(W / 2 - 1, HALF + 3, 2, 3); ctx.fillRect(W / 2 - 5, HALF - 1, 3, 2); ctx.fillRect(W / 2 + 3, HALF - 1, 3, 2); }
    if (pickT > 0) { ctx.fillStyle = 'rgba(255,230,120,' + Math.min(0.25, pickT) + ')'; ctx.fillRect(0, 0, W, H); }
    if (flashT > 0) { ctx.fillStyle = 'rgba(255,240,180,.1)'; ctx.fillRect(0, 0, W, H); }
  }

  /* ------------------------------------------------------------------ loop */
  var visible = true, acc = 0;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }, { threshold: 0 }).observe(cvs);
  // attract-mode camera on the menu: slowly look around the lobby
  function menuCam(dt) { P.x = 6.5; P.y = 7.5; P.a += dt * 0.25; }
  function frame(now) {
    requestAnimationFrame(frame);
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible || document.hidden) return;
    if (state === 'play') update(dt);
    else if (state === 'menu') { clock += dt; if (!reduce) menuCam(dt); }
    else if (state === 'dead' || state === 'win') { clock += dt; }
    render();
  }

  /* ------------------------------------------------------------------ layout */
  function fit() {
    var host = el.cab && el.cab.parentElement; if (!host) return;
    var avail = host.clientWidth - 12, wpx = avail >= 640 ? W * Math.min(4, Math.floor(avail / W)) : Math.max(280, avail);
    el.cab.style.width = wpx + 'px'; if (el.screen) el.screen.style.height = Math.round(wpx * H / W) + 'px';
    var card = el.card, small = avail < 640;
    if (card && el.cab) { if (small && card.parentElement === el.screen) el.cab.insertBefore(card, $('hudBar')); else if (!small && card.parentElement !== el.screen) el.screen.appendChild(card); }
  }
  window.addEventListener('resize', fit); window.addEventListener('load', fit);

  /* ------------------------------------------------------------------ boot */
  var playBtn = $('playBtn');
  if (playBtn) playBtn.addEventListener('click', function () { var a = $('arcade'); if (a) a.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' }); });
  P.x = 6.5; P.a = 0.3; setFace('ok'); fit(); showOverlay('menu'); updateHud();
  requestAnimationFrame(frame);

  window.DoomResume = { // small debug/QA surface
    P: P, enemies: enemies, rooms: rooms, items: items, begin: begin, state: function () { return state; }, grid: grid, stats: function () { return stats; },
    tp: function (x, y, a) { P.x = x; P.y = y; if (a !== undefined) P.a = a; }, god: function (b) { god = b; }, killAll: function () { enemies.forEach(function (e) { if (!e.dead) damageEnemy(e, 999); }); },
    fire: function () { cool = 0; fireShot(); }, input: function () { return { keys: keys, firing: firing, cool: cool }; }, shots: shots, mode: function () { return mode; }, hit: hurtPlayer, portal: function () { return portal; }
  };
})();
