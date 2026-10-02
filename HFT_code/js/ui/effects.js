/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Page effects: scroll reveal, hero counters, one-open-at-a-time accordions, cookie banner. */
(function (H) {
  'use strict';
  var $ = H.$, $$ = H.$$;

  function exclusive(sel) {
    var all = $$(sel);
    all.forEach(function (d) {
      d.addEventListener('toggle', function () { if (d.open) all.forEach(function (o) { if (o !== d) o.open = false; }); });
    });
  }

  H.ui.effects = {
    init: function () {
      $$('.sec-head, .cats li, .feat li, .who, .banner, .faq details, .steps li, .svc li, .art, .form, .allcats li, .promo, .channels, .ct-title').forEach(function (el) { el.classList.add('rv'); });
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
        }, { threshold: .1 });
        $$('.rv').forEach(function (el) { io.observe(el); });
      } else { $$('.rv').forEach(function (el) { el.classList.add('in'); }); }

      $$('[data-count]').forEach(function (el) {
        var end = +el.getAttribute('data-count'), n = 0;
        var timer = setInterval(function () { n++; el.textContent = n; if (n >= end) clearInterval(timer); }, 90);
      });

      exclusive('.faq details'); exclusive('.art details');

      var ck = $('#cookie');
      if (!H.store.get('hft_cookie', false)) ck.hidden = false;
      $('#cookieOk').addEventListener('click', function () { H.store.set('hft_cookie', true); ck.hidden = true; });
    }
  };
})(window.HFT);
