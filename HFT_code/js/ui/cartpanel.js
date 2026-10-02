/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Slide-in panel that lists the cart or the wishlist. */
(function (H) {
  'use strict';
  var $ = H.$, esc = H.esc, S = H.state;
  var panel, mode = 'cart', lastFocus = null;

  function row(p, extra) {
    return '<li class="cprow"><img src="' + p.img + '" alt="" width="64" height="64"><div class="cprow__t"><b>' +
      esc(H.pick({ th: p.th, en: p.en })) + '</b><small>' + p.code + ' · ' + H.fmt(p.price) + ' ' + esc(H.t('price.sfx')) + '</small>' + extra + '</div></li>';
  }

  function render() {
    var body = $('#cpBody'), foot = $('#cpFoot');
    $('#cpTitle').textContent = H.t(mode === 'cart' ? 'cp.cart' : 'cp.wish');
    if (mode === 'cart') {
      var lines = H.cart.lines(), total = 0;
      if (!lines.length) { body.innerHTML = '<p class="cp-empty">' + esc(H.t('cp.empty.cart')) + '</p>'; foot.innerHTML = ''; return; }
      body.innerHTML = '<ul>' + lines.map(function (l) {
        total += l.p.price * l.qty;
        return row(l.p, '<div class="qty" data-id="' + l.p.id + '"><button type="button" data-a="dec" aria-label="−">−</button><span>' + l.qty +
          '</span><button type="button" data-a="inc" aria-label="+">+</button><button type="button" class="rm" data-a="rm">' + esc(H.t('cp.remove')) + '</button></div>');
      }).join('') + '</ul>';
      foot.innerHTML = '<div class="cp-total"><span>' + esc(H.t('cp.total')) + '</span><b>' + H.fmt(total) + ' ' + esc(H.t('price.sfx')) + '</b></div>' +
        '<button type="button" class="btn btn--primary" data-a="quote">' + esc(H.t('cp.quote')) + '</button>' +
        '<button type="button" class="cp-link" data-a="clear">' + esc(H.t('cp.clear')) + '</button>';
    } else {
      if (!S.wish.length) { body.innerHTML = '<p class="cp-empty">' + esc(H.t('cp.empty.wish')) + '</p>'; foot.innerHTML = ''; return; }
      body.innerHTML = '<ul>' + S.wish.map(function (id) {
        return row(H.find(id), '<div class="qty" data-id="' + id + '"><button type="button" class="btn btn--sm btn--primary" data-a="tocart">' + esc(H.t('m.add')) +
          '</button><button type="button" class="rm" data-a="unwish">' + esc(H.t('cp.remove')) + '</button></div>');
      }).join('') + '</ul>';
      foot.innerHTML = '';
    }
  }

  /* send the cart to the quote form */
  function toQuote() {
    var lines = H.cart.lines(), f = $('#quote');
    f.elements.product.value = lines.length === 1 ? lines[0].p.code : 'other';
    f.elements.qty.value = lines.length === 1 ? lines[0].qty : 1;
    f.elements.msg.value = lines.map(function (l) { return l.p.code + ' x' + l.qty; }).join(', ');
    api.close();
    f.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  var api = H.cartPanel = {
    init: function () {
      panel = $('#cpanel');
      panel.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-close')) { api.close(); return; }
        var b = e.target.closest('[data-a]'); if (!b) return;
        var holder = b.closest('[data-id]'), id = holder ? +holder.getAttribute('data-id') : 0, a = b.getAttribute('data-a');
        if (a === 'inc') H.cart.add(H.find(id));
        else if (a === 'dec') H.cart.dec(id);
        else if (a === 'rm') H.cart.remove(id);
        else if (a === 'clear') H.cart.clear();
        else if (a === 'quote') toQuote();
        else if (a === 'unwish') H.cart.unwish(id);
        else if (a === 'tocart') { H.cart.add(H.find(id)); H.cart.unwish(id); }
      });
      document.addEventListener('hft:change', function () { if (!panel.hidden) render(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) api.close(); });
      H.onRender(function () { if (!panel.hidden) render(); });
    },
    open: function (m, from) {
      mode = m; lastFocus = from || null; render();
      panel.hidden = false; document.documentElement.classList.add('lock'); $('.cpanel__x').focus();
    },
    close: function () {
      panel.hidden = true; document.documentElement.classList.remove('lock'); if (lastFocus) lastFocus.focus();
    }
  };
})(window.HFT);
