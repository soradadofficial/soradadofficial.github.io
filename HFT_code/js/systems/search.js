/* Global search: products, articles and categories in one dropdown under the header. */
(function (H) {
  'use strict';
  var $ = H.$, $$ = H.$$, esc = H.esc, link = H.link, D = H.data;
  var sbar, gq, sRes, btn;

  function artList() {
    return $$('.art').map(function (el, i) { return { i: i, el: el, title: el.querySelector('h3').textContent, ex: el.querySelector('.art__ex').textContent }; });
  }

  function render(q) {
    var tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    var chips = '<p class="sres__t">' + esc(H.t('search.pop')) + '</p><div class="sres__kw">' + D.KW.map(function (k) {
      return '<button type="button" class="kw" data-q="' + esc(H.pick(k)) + '">' + esc(H.pick(k)) + '</button>';
    }).join('') + '</div>';
    if (!tokens.length) { sRes.innerHTML = chips; return; }
    var has = function (s) { s = s.toLowerCase(); return tokens.every(function (k) { return s.indexOf(k) > -1; }); };
    var ps = D.PRODUCTS.filter(function (p) { return has(p.th + ' ' + p.en + ' ' + p.code + ' ' + p.dth + ' ' + p.den); }).slice(0, 5);
    var as = artList().filter(function (a) { return has(a.title + ' ' + a.ex); }).slice(0, 3);
    var cs = D.MEGA.filter(function (c) {
      return has(c.th + ' ' + c.en + ' ' + (c.kids || []).map(function (k) { return k[0] + ' ' + k[1]; }).join(' '));
    }).slice(0, 5);
    var out = '';
    if (ps.length) out += '<p class="sres__t">' + esc(H.t('search.p')) + '</p>' + ps.map(function (p) {
      return '<button type="button" class="sitem" data-sp="' + p.id + '"><img src="' + p.img + '" alt="" width="44" height="44"><span><b>' + esc(H.pick({ th: p.th, en: p.en })) + '</b><small>' + p.code + ' · ' + H.fmt(p.price) + ' ' + esc(H.t('price.sfx')) + '</small></span></button>';
    }).join('');
    if (as.length) out += '<p class="sres__t">' + esc(H.t('search.a')) + '</p>' + as.map(function (a) {
      return '<button type="button" class="sitem sitem--t" data-sa="' + a.i + '"><span><b>' + esc(a.title) + '</b><small>' + esc(a.ex) + '</small></span></button>';
    }).join('');
    if (cs.length) out += '<p class="sres__t">' + esc(H.t('search.c')) + '</p>' + cs.map(function (c) {
      return '<a class="sitem sitem--t"' + link(c.url) + '><span><b>' + c.e + ' ' + esc(H.pick(c)) + '</b></span></a>';
    }).join('');
    sRes.innerHTML = out || ('<p class="sres__none">' + esc(H.t('search.none', { q: q })) + '</p>' + chips);
  }

  var api = H.sys.search = {
    init: function () {
      sbar = $('#sbar'); gq = $('#gq'); sRes = $('#sRes'); btn = $('#searchBtn');
      btn.addEventListener('click', function () { sbar.hidden ? api.open('') : api.close(); });
      $('#sClose').addEventListener('click', api.close);
      gq.addEventListener('input', function () { render(gq.value); });
      sRes.addEventListener('click', function (e) {
        var kw = e.target.closest('[data-q]');
        if (kw) { gq.value = kw.getAttribute('data-q'); render(gq.value); gq.focus(); return; }
        var sp = e.target.closest('[data-sp]');
        if (sp) { api.close(); H.modal.open(H.find(+sp.getAttribute('data-sp')), btn); return; }
        var sa = e.target.closest('[data-sa]');
        if (sa) {
          api.close();
          var a = artList()[+sa.getAttribute('data-sa')];
          a.el.scrollIntoView({ behavior: 'smooth', block: 'center' }); a.el.querySelector('details').open = true; return;
        }
        if (e.target.closest('a')) api.close();
      });
      document.addEventListener('click', function (e) {
        if (!sbar.hidden && !sbar.contains(e.target) && !btn.contains(e.target)) api.close();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') api.close();
        var tag = (document.activeElement && document.activeElement.tagName) || '';
        if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(tag)) { e.preventDefault(); api.open(''); }
      });
      H.onRender(function () { if (!sbar.hidden) render(gq.value); });
    },
    open: function (q) {
      sbar.hidden = false; btn.setAttribute('aria-expanded', 'true');
      gq.value = q || ''; render(gq.value); setTimeout(function () { gq.focus(); }, 30);
    },
    close: function () { sbar.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
  };
})(window.HFT);
