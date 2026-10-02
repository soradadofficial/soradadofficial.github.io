/* Single source of truth for runtime state. */
(function (H) {
  'use strict';
  var lang = H.store.get('hft_lang', 'th');
  var wish = H.store.get('hft_wish', []);
  var cart = H.store.get('hft_cart', []);
  H.state = {
    lang: lang === 'en' ? 'en' : 'th',
    theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
    wish: Array.isArray(wish) ? wish : [],
    cart: Array.isArray(cart) ? cart : [],
    filter: 'all', q: '', sort: 'default',
    current: null      // product shown in the quick-view modal
  };
})(window.HFT);
