/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Header controls: language switch + day/night theme. */
(function (H) {
  'use strict';
  var $ = H.$, S = H.state;

  function sync() {
    document.documentElement.setAttribute('data-theme', S.theme);
    $('#themeBtn').setAttribute('aria-label', H.t(S.theme === 'dark' ? 'theme.light' : 'theme.dark'));
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', S.theme === 'dark' ? '#0b1422' : '#044394');
    $('#langLbl').textContent = H.t('lang.btn');
  }

  H.ui.controls = {
    init: function () {
      $('#langBtn').addEventListener('click', H.i18n.toggle);
      $('#themeBtn').addEventListener('click', function () {
        S.theme = S.theme === 'dark' ? 'light' : 'dark';
        H.session.set('hft_theme', S.theme); sync();
        if (H.sys.background) H.sys.background.redraw();
      });
      H.onRender(sync);
    }
  };
})(window.HFT);
