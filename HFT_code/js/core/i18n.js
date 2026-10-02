/* Language engine. Thai text lives in the HTML itself (captured once); English lives in the dictionary. */
(function (H) {
  'use strict';
  var $ = H.$, $$ = H.$$, S = H.state;
  var DICT = window.I18N || { th: {}, en: {} };
  var domTh = {};

  function capture() {
    $$('[data-i18n]').forEach(function (el) { domTh[el.getAttribute('data-i18n')] = el.innerHTML; });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'); if (p.length === 2 && !(p[1] in domTh)) domTh[p[1]] = el.getAttribute(p[0]) || '';
      });
    });
  }

  /* translate a key, with optional {var} substitution */
  H.t = function (key, vars) {
    var en = S.lang === 'en';
    var s = en ? (DICT.en[key] != null ? DICT.en[key] : (DICT.th[key] != null ? DICT.th[key] : domTh[key]))
               : (DICT.th[key] != null ? DICT.th[key] : domTh[key]);
    if (s == null) s = key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  };
  H.pick = function (o) { return S.lang === 'en' ? o.en : o.th; };      // {th,en} -> current language
  H.T2 = function (th, en) { return S.lang === 'en' ? en : th; };

  H.i18n = {
    init: capture,
    apply: function () {
      document.documentElement.lang = S.lang;
      $$('[data-i18n]').forEach(function (el) { el.innerHTML = H.t(el.getAttribute('data-i18n')); });
      $$('[data-i18n-attr]').forEach(function (el) {
        el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
          var p = pair.split(':'); if (p.length === 2) el.setAttribute(p[0], H.t(p[1]));
        });
      });
      document.title = H.t('meta.title');
      var md = $('meta[name="description"]'); if (md) md.setAttribute('content', H.t('meta.desc'));
      H.renderers.forEach(function (fn) { fn(); });
    },
    toggle: function () {
      S.lang = S.lang === 'th' ? 'en' : 'th';
      H.store.set('hft_lang', S.lang);
      H.i18n.apply();
    }
  };
})(window.HFT);
