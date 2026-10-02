/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Single source of truth for runtime state. */
(function (H) {
  'use strict';
  var lang = H.session.get('hft_lang', 'th');
  var wish = H.store.get('hft_wish', []);
  var cart = H.store.get('hft_cart', []);
  H.state = {
    lang: lang === 'en' ? 'en' : 'th',
    theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
    wish: Array.isArray(wish) ? wish : [],
    cart: Array.isArray(cart) ? cart : [],
    filter: 'all', q: '', sort: 'default', page: 1,
    current: null      // product shown in the quick-view modal
  };
})(window.HFT);
