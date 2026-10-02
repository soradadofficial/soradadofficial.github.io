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
    $('#mLink').href = p.url;
  }

  H.modal = {
    init: function () {
      modal = $('#modal');
      modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) H.modal.close(); });
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
