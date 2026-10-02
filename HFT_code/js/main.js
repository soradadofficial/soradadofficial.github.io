/* Entry point: initialise every module in order, then run the first render. */
(function (H) {
  'use strict';

  var BOOT = [
    H.i18n,            // capture Thai source text first
    H.cart, H.modal,
    H.ui.products, H.ui.navigation, H.ui.sections, H.ui.forms, H.ui.controls, H.ui.effects,
    H.sys.search, H.sys.chat, H.sys.seo, H.sys.background
  ];

  function start() {
    BOOT.forEach(function (m) { if (m && m.init) m.init(); });
    H.i18n.apply();    // paints language-dependent parts (and runs every registered renderer)
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})(window.HFT);
