/* Cart + wishlist (persisted in localStorage). */
(function (H) {
  'use strict';
  var $ = H.$, S = H.state;

  function badge(sel, n) { var el = $(sel); el.textContent = n; el.setAttribute('data-n', n); }
  function counts() { badge('#wishCount', S.wish.length); badge('#cartCount', S.cart.length); }

  H.cart = {
    init: function () {
      counts();
      $('#cartBtn').addEventListener('click', function () {
        H.toast(S.cart.length ? H.t('toast.cart.n', { n: S.cart.length }) : H.t('toast.cart.0'));
      });
      $('#wishBtn').addEventListener('click', function () {
        H.toast(S.wish.length ? H.t('toast.wish.n', { n: S.wish.length }) : H.t('toast.wish.0'));
      });
    },
    add: function (p) {
      S.cart.push(p.id); H.store.set('hft_cart', S.cart); counts();
      H.toast(H.t('toast.add', { c: p.code }));
    },
    toggleWish: function (p) {
      var i = S.wish.indexOf(p.id);
      if (i > -1) { S.wish.splice(i, 1); H.toast(H.t('toast.wish.rm')); }
      else { S.wish.push(p.id); H.toast(H.t('toast.wish.add', { c: p.code })); }
      H.store.set('hft_wish', S.wish); counts();
    },
    isWished: function (p) { return S.wish.indexOf(p.id) > -1; }
  };
})(window.HFT);
