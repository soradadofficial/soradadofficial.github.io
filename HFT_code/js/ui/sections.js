/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Data-driven page sections: footer sitemap + "all categories" grid. */
(function (H) {
  'use strict';
  var $ = H.$, esc = H.esc, link = H.link, D = H.data;

  function renderSitemap() {
    $('#sitemap').innerHTML = D.FOOT.map(function (g) {
      return '<div><h4>' + esc(H.pick(g)) + '</h4><ul>' + g.kids.map(function (k) {
        return '<li><a' + link(k[2]) + '>' + esc(H.pick({ th: k[0], en: k[1] })) + '</a></li>';
      }).join('') + '</ul></div>';
    }).join('');
  }

  function renderAllCats() {
    var en = H.state.lang === 'en';
    $('#allCatsList').innerHTML = D.ALLCATS.map(function (c) {
      return '<li><a href="' + D.ALLP + '" target="_blank" rel="noopener"><span class="ci" aria-hidden="true">' + c[0] + '</span><b>' +
        esc(en ? c[1] : c[2]) + '</b><small>' + esc(en ? c[2] : c[1]) + '</small></a></li>';
    }).join('');
  }

  H.ui.sections = {
    init: function () { H.onRender(renderSitemap); H.onRender(renderAllCats); }
  };
})(window.HFT);
