/* Header: mobile drawer, mega menu (with SEO keyword strip), scroll state. */
(function (H) {
  'use strict';
  var $ = H.$, $$ = H.$$, esc = H.esc, link = H.link, D = H.data;
  var burger, nav, scrim, megaItem, megaBtn, mega, header, totop, desktop, megaTimer;

  function renderMega() {
    var active = $('#mega .mg.is-active') ? $$('#mega .mg').indexOf($('#mega .mg.is-active')) : 0;
    var html = '<div class="mega__l">' + D.MEGA.map(function (c, i) {
      var kids = c.kids && c.kids.length;
      var sub = kids ? c.kids.map(function (k) { return '<li><a' + link(k[2]) + '>' + esc(H.pick({ th: k[0], en: k[1] })) + '</a></li>'; }).join('')
        : '<li><a' + link(c.url) + '>' + esc(H.t('mega.empty')) + ' →</a></li>';
      return '<div class="mg' + (i === active ? ' is-active' : '') + (kids ? ' has-kids' : '') + '">' +
        '<a class="mega__cat"' + link(c.url) + ' title="' + esc(H.pick(c)) + ' – HomeFitTools"><span class="mi" aria-hidden="true">' + c.e + '</span><span class="mname">' + esc(H.pick(c)) + '</span>' + (kids ? '<span class="ar" aria-hidden="true">→</span>' : '') + '</a>' +
        '<ul class="mega__sub">' + sub + '</ul></div>';
    }).join('') + '</div>' +
      '<div class="mega__kw"><b>' + esc(H.t('kw.title')) + '</b>' + D.KW.map(function (k, i) {
        return '<button type="button" class="kw" data-kw="' + i + '">' + esc(H.pick(k)) + '</button>';
      }).join('') + '</div>';
    mega.innerHTML = html;
  }

  function setMega(open) { megaItem.classList.toggle('is-open', open); megaBtn.setAttribute('aria-expanded', open); }
  function setActive(mg) { $$('.mg', mega).forEach(function (x) { x.classList.toggle('is-active', x === mg); }); }
  function closeNav() {
    nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); scrim.classList.remove('is-on'); setMega(false);
  }
  H.closeNav = closeNav;

  function onScroll() {
    var y = window.pageYOffset;
    header.classList.toggle('is-stuck', y > 10);
    totop.hidden = y < 600;
  }

  H.ui.navigation = {
    init: function () {
      burger = $('#burger'); nav = $('#nav'); scrim = $('#scrim'); megaItem = $('#megaItem');
      megaBtn = $('#megaBtn'); mega = $('#mega'); header = $('#header'); totop = $('#totop');
      desktop = window.matchMedia('(min-width:1280px)');

      burger.addEventListener('click', function () {
        var o = nav.classList.toggle('is-open'); burger.setAttribute('aria-expanded', o); scrim.classList.toggle('is-on', o);
      });
      scrim.addEventListener('click', closeNav);
      megaBtn.addEventListener('click', function (e) { e.stopPropagation(); setMega(!megaItem.classList.contains('is-open')); });

      megaItem.addEventListener('mouseenter', function () { if (desktop.matches) { clearTimeout(megaTimer); setMega(true); } });
      megaItem.addEventListener('mouseleave', function () { if (desktop.matches) megaTimer = setTimeout(function () { setMega(false); }, 160); });
      mega.addEventListener('mouseover', function (e) { if (!desktop.matches) return; var mg = e.target.closest('.mg'); if (mg) setActive(mg); });
      mega.addEventListener('focusin', function (e) { var mg = e.target.closest('.mg'); if (mg && desktop.matches) setActive(mg); });
      mega.addEventListener('click', function (e) {
        var kw = e.target.closest('.kw');
        if (kw) { closeNav(); H.sys.search.open(H.pick(D.KW[+kw.getAttribute('data-kw')])); return; }
        var cat = e.target.closest('.mega__cat'); if (!cat) return;
        var mg = cat.parentNode;
        if (!desktop.matches && mg.classList.contains('has-kids')) { e.preventDefault(); setActive(mg.classList.contains('is-active') ? null : mg); }
      });
      megaItem.addEventListener('focusout', function (e) { if (!megaItem.contains(e.relatedTarget)) setMega(false); });

      nav.addEventListener('click', function (e) {
        var a = e.target.closest('a'); if (!a) return;
        var accordion = a.classList.contains('mega__cat') && a.parentNode.classList.contains('has-kids') && !desktop.matches;
        if (!accordion) closeNav();
      });
      document.addEventListener('click', function (e) { if (!megaItem.contains(e.target)) setMega(false); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
      window.addEventListener('resize', function () { if (desktop.matches) closeNav(); });

      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
      totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

      H.onRender(renderMega);
    }
  };
})(window.HFT);
