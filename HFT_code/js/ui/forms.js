/* Payment-confirmation + quote forms (front-end only: hook your API into the submit handler). */
(function (H) {
  'use strict';
  var $ = H.$, $$ = H.$$, esc = H.esc;

  function renderQuoteSelect() {
    var sel = $('#qProduct'), cur = sel.value;
    sel.innerHTML = '<option value="">' + esc(H.t('qt.pick')) + '</option>' +
      H.data.PRODUCTS.map(function (p) { return '<option value="' + p.code + '">' + esc(p.code + ' – ' + H.pick({ th: p.th, en: p.en })) + '</option>'; }).join('') +
      '<option value="other">' + esc(H.t('qt.other')) + '</option>';
    sel.value = cur;
  }

  H.ui.forms = {
    init: function () {
      $$('form.form').forEach(function (f) {
        f.addEventListener('submit', function (e) {
          e.preventDefault();
          var ok = f.querySelector('.form__ok');
          if (!f.checkValidity()) { f.reportValidity(); H.toast(H.t('form.err')); return; }
          ok.textContent = H.t(f.id === 'payment' ? 'form.ok.pay' : 'form.ok.qt'); ok.hidden = false;
          f.reset(); renderQuoteSelect();
          setTimeout(function () { ok.hidden = true; }, 8000);
        });
      });
      H.onRender(renderQuoteSelect);
    }
  };
})(window.HFT);
