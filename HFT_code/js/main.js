/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Entry point: initialise every module in order, then run the first render. */
(function (H) {
  'use strict';

  var BOOT = [
    H.i18n,            // capture Thai source text first
    H.cart, H.cartPanel, H.minicart, H.modal,
    H.ui.products, H.ui.navigation, H.ui.sections, H.ui.forms, H.ui.controls, H.ui.effects,
    H.sys.search, H.sys.chat, H.sys.seo, H.sys.background
  ];

  /* Initialise in small slices (one module per task) so no single long task blocks input. */
  function start() {
    var i = 0;
    (function step() {
      if (i < BOOT.length) {
        var m = BOOT[i++]; if (m && m.init) m.init();
        setTimeout(step, 0);
      } else {
        H.i18n.apply(true);    // paints language-dependent parts (renderers run one per task as well)
      }
    })();
  }

  /* The header + hero are plain HTML, so let the browser paint them first and wire everything else
     right after the first frame (keeps LCP / FCP independent of our script cost). */
  function afterFirstPaint() {
    if (window.requestAnimationFrame) requestAnimationFrame(function () { setTimeout(start, 0); });
    else start();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', afterFirstPaint);
  else afterFirstPaint();
})(window.HFT);
