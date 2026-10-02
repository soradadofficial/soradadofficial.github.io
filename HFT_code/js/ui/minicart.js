/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Mini cart: hover/focus the cart icon (or add an item) to peek at what is in the cart. */
(function (H) {
  'use strict';
  var $ = H.$, esc = H.esc, S = H.state;
  var wrap, box, hideTimer, hover, shownAt = 0;

  function render() {
    var lines = H.cart.lines(), total = 0;
    if (!lines.length) { box.innerHTML = '<p class="mc-empty">' + esc(H.t('cp.empty.cart')) + '</p>'; return; }
    box.innerHTML = '<ul>' + lines.map(function (l) {
      total += l.p.price * l.qty;
      return '<li><img src="' + l.p.img + '" alt="" width="48" height="48"><span class="mc-n">' + esc(H.pick({ th: l.p.th, en: l.p.en })) +
        '</span><span class="mc-q">×' + l.qty + '<small>' + H.fmt(l.p.price * l.qty) + '</small></span></li>';
    }).join('') + '</ul>' +
      '<div class="mc-total"><span>' + esc(H.t('cp.total')) + '</span><b>' + H.fmt(total) + ' ' + esc(H.t('price.sfx')) + '</b></div>' +
      '<button type="button" class="btn btn--primary btn--sm" data-mc="open">' + esc(H.t('mc.view')) + '</button>';
  }

  function place() {          // sit just under the header, inside the viewport
    var r = $('#header').getBoundingClientRect();
    box.style.top = Math.max(r.bottom, 0) + 6 + 'px';
  }
  function show(autoHide) {
    shownAt = Date.now();
    render(); place(); box.hidden = false; clearTimeout(hideTimer);
    if (autoHide) hideTimer = setTimeout(function () { if (!hover) hide(); }, 3200);
  }
  function hide() { clearTimeout(hideTimer); box.hidden = true; }

  H.minicart = {
    init: function () {
      wrap = $('#cartWrap'); box = $('#miniCart');
      var canHover = window.matchMedia('(hover:hover) and (min-width:900px)');
      wrap.addEventListener('mouseenter', function () { if (canHover.matches) { hover = true; show(false); } });
      wrap.addEventListener('mouseleave', function () { hover = false; hideTimer = setTimeout(hide, 250); });
      box.addEventListener('mouseenter', function () { hover = true; clearTimeout(hideTimer); });
      box.addEventListener('mouseleave', function () { hover = false; hideTimer = setTimeout(hide, 250); });
      $('#cartBtn').addEventListener('focus', function () { show(false); });
      $('#cartBtn').addEventListener('click', hide);
      box.addEventListener('click', function (e) {
        if (e.target.closest('[data-mc="open"]')) { hide(); H.cartPanel.open('cart', $('#cartBtn')); }
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
      document.addEventListener('click', function (e) {
        if (Date.now() - shownAt < 150) return;      // the same click that added the item must not close it
        if (!box.hidden &&!wrap.contains(e.target) && !box.contains(e.target)) hide(); });
      window.addEventListener('scroll', function () { if (!box.hidden) place(); }, { passive: true });
      document.addEventListener('hft:change', function (e) {
        if (e.detail && e.detail.type === 'add') show(true);     // flash after adding
        else if (!box.hidden) render();
      });
      H.onRender(function () { if (!box.hidden) render(); });
    }
  };
})(window.HFT);
