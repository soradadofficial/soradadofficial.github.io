/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Cart + wishlist state (persisted in localStorage). Fires "hft:change" so views can refresh. */
(function (H) {
  'use strict';
  var $ = H.$, S = H.state;

  function badge(sel, n) { var el = $(sel); el.textContent = n; el.setAttribute('data-n', n); }
  function changed(type) {
    H.store.set('hft_cart', S.cart); H.store.set('hft_wish', S.wish);
    badge('#wishCount', S.wish.length); badge('#cartCount', S.cart.length);
    document.dispatchEvent(new CustomEvent('hft:change', { detail: { type: type || 'update' } }));
  }

  H.cart = {
    init: function () {
      badge('#wishCount', S.wish.length); badge('#cartCount', S.cart.length);
      $('#cartBtn').addEventListener('click', function () { H.cartPanel.open('cart', this); });
      $('#wishBtn').addEventListener('click', function () { H.cartPanel.open('wish', this); });
    },
    add: function (p) { S.cart.push(p.id); changed('add'); H.toast(H.t('toast.add', { c: p.code })); },
    qty: function (id) { return S.cart.filter(function (x) { return x === id; }).length; },
    dec: function (id) { var i = S.cart.lastIndexOf(id); if (i > -1) S.cart.splice(i, 1); changed(); },
    remove: function (id) { S.cart = S.cart.filter(function (x) { return x !== id; }); changed(); },
    clear: function () { S.cart = []; changed(); },
    /* cart grouped as [{p, qty}] in first-added order */
    lines: function () {
      var seen = {}, out = [];
      S.cart.forEach(function (id) { if (!seen[id]) { seen[id] = 1; out.push({ p: H.find(id), qty: H.cart.qty(id) }); } });
      return out;
    },
    toggleWish: function (p) {
      var i = S.wish.indexOf(p.id);
      if (i > -1) { S.wish.splice(i, 1); H.toast(H.t('toast.wish.rm')); }
      else { S.wish.push(p.id); H.toast(H.t('toast.wish.add', { c: p.code })); }
      changed();
    },
    unwish: function (id) { S.wish = S.wish.filter(function (x) { return x !== id; }); changed(); },
    isWished: function (p) { return S.wish.indexOf(p.id) > -1; }
  };
})(window.HFT);
