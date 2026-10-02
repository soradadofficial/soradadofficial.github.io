/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Product quick-view modal. */
(function (H) {
  'use strict';
  var $ = H.$, S = H.state;
  var modal, lastFocus = null;

  function fill(p) {
    $('#mImg').src = p.img; $('#mImg').alt = H.pick({ th: p.th, en: p.en });
    $('#mCode').textContent = p.code; $('#mTitle').textContent = H.pick({ th: p.th, en: p.en });
    $('#mPrice').textContent = H.fmt(p.price) + ' ' + H.t('price.sfx');
    $('#mDesc').textContent = S.lang === 'en' ? p.den : p.dth;
    var link = $('#mLink'); link.hidden = !p.url; if (p.url) link.href = p.url;
    var sp = p.spec || {}, rows = [];
    if (sp.dims) rows.push([H.t('sp.size'), sp.dims + ' ' + H.t('u.mm')]);
    if (sp.kg) rows.push([H.t('sp.kg'), sp.kg + ' ' + H.t('u.kg')]);
    if (sp.steel) rows.push([H.t('sp.steel'), '≤ ' + sp.steel + ' ' + H.t('u.mm')]);
    if (sp.load) rows.push([H.t('sp.load'), sp.load + ' ' + H.t('u.kg')]);
    $('#mSpecs').innerHTML = rows.map(function (r) { return '<li><span>' + H.esc(r[0]) + '</span><b>' + H.esc(r[1]) + '</b></li>'; }).join('');
  }

  H.modal = {
    init: function () {
      modal = $('#modal');
      modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) H.modal.close(); });
      $('#mQuote').addEventListener('click', function () { var p = S.current; H.modal.close(); if (p) H.quoteFor(p); });
      $('#mAdd').addEventListener('click', function () { if (S.current) { H.cart.add(S.current); H.modal.close(); } });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) H.modal.close(); });
      H.onRender(function () { if (!modal.hidden && S.current) fill(S.current); });
    },
    open: function (p, from) {
      S.current = p; lastFocus = from; fill(p);
      modal.hidden = false; document.body.style.overflow = 'hidden'; $('.modal__x').focus();
    },
    close: function () {
      modal.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus();
    }
  };
})(window.HFT);
