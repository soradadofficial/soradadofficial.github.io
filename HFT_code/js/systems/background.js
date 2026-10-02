/* Animated background: floating weights drift, spin and "heartbeat-pulse" behind the page. */
(function (H) {
  'use strict';
  var S = H.state, cv, ctx, W = 0, H_ = 0, shapes = [], last = 0, T = 0, raf = 0, reduce = false;

  function drawShape(type, s) {
    ctx.beginPath();
    if (type === 0) { /* dumbbell */
      ctx.moveTo(-s, 0); ctx.lineTo(s, 0);
      [[-.55, .22, .9], [.55, .22, .9], [-.82, .18, .6], [.82, .18, .6]].forEach(function (r) {
        ctx.rect(r[0] * s - r[1] * s / 2, -r[2] * s / 2, r[1] * s, r[2] * s);
      });
    } else if (type === 1) { /* plate */
      ctx.arc(0, 0, s * .9, 0, 6.2832); ctx.moveTo(s * .62, 0); ctx.arc(0, 0, s * .62, 0, 6.2832);
      ctx.moveTo(s * .16, 0); ctx.arc(0, 0, s * .16, 0, 6.2832);
    } else { /* kettlebell */
      ctx.arc(0, s * .28, s * .62, 0, 6.2832); ctx.moveTo(-s * .36, -s * .2); ctx.arc(0, -s * .2, s * .36, Math.PI, 0);
    }
    ctx.stroke();
  }

  function spawn() {
    var n = Math.max(8, Math.min(20, Math.round(W / 105)));
    shapes = [];
    for (var i = 0; i < n; i++) {
      shapes.push({ type: i % 3, x: Math.random() * W, y: Math.random() * (H_ + 160), s: 20 + Math.random() * 30,
        d: .12 + Math.random() * .45, vy: -(5 + Math.random() * 12), vx: (Math.random() - .5) * 8,
        r: Math.random() * 6.28, vr: (Math.random() - .5) * .5, ph: Math.random() * 6.28, o: Math.random() < .28 });
    }
  }

  function frame(dt) {
    ctx.clearRect(0, 0, W, H_);
    var dark = S.theme === 'dark', y0 = window.pageYOffset, span = H_ + 160;
    ctx.lineWidth = 2.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (var i = 0; i < shapes.length; i++) {
      var s = shapes[i];
      s.x += s.vx * dt; s.y += s.vy * dt; s.r += s.vr * dt;
      if (s.x < -80) s.x = W + 80; if (s.x > W + 80) s.x = -80;
      var py = (((s.y - y0 * s.d) % span) + span) % span - 80;           // parallax with page scroll
      var beat = Math.pow(Math.max(0, Math.sin(T * 2.2 + s.ph)), 8) * .12;  // heartbeat pulse
      ctx.save();
      ctx.translate(s.x, py); ctx.rotate(s.r); ctx.scale(1 + beat, 1 + beat);
      ctx.strokeStyle = s.o ? 'rgba(253,80,3,' + (dark ? .2 : .16) + ')' : (dark ? 'rgba(111,179,255,.18)' : 'rgba(4,67,148,.14)');
      drawShape(s.type, s.s);
      ctx.restore();
    }
  }

  function loop(ts) {
    var dt = Math.min(.05, (ts - last) / 1000 || 0); last = ts; T += dt;
    frame(dt); raf = requestAnimationFrame(loop);
  }

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H_ = window.innerHeight;
    cv.width = W * dpr; cv.height = H_ * dpr; cv.style.width = W + 'px'; cv.style.height = H_ + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    spawn(); H.sys.background.redraw();
  }

  H.sys.background = {
    init: function () {
      cv = H.$('#bg'); ctx = cv.getContext && cv.getContext('2d'); if (!ctx) return;
      reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
      window.addEventListener('resize', resize);
      resize();
      if (!reduce) raf = requestAnimationFrame(loop);
    },
    redraw: function () { if (ctx && !raf) frame(0); }   // static repaint (reduced motion / theme change)
  };
})(window.HFT);
