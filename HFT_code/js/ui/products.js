/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Product grid: render, filter, search, sort. */
(function (H) {
  'use strict';
  var $ = H.$, $$ = H.$$, esc = H.esc, S = H.state, grid, io;
  var PAGE_SIZE = 12;
  var BLANK = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

  /* load a product photo only when it is about to scroll into view (saves bandwidth on first load) */
  function observeImages() {
    var imgs = $$('#grid img[data-src]');
    if (!('IntersectionObserver' in window)) { imgs.forEach(function (i) { i.src = i.getAttribute('data-src'); }); return; }
    if (!io) io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var i = en.target; i.src = i.getAttribute('data-src'); i.removeAttribute('data-src'); io.unobserve(i);
      });
    }, { rootMargin: '250px 0px' });
    imgs.forEach(function (i) { io.observe(i); });
  }

  function cardHTML(p, i) {
    var name = H.pick({ th: p.th, en: p.en });
    return '<li class="card" style="animation-delay:' + (i * 50) + 'ms" data-id="' + p.id + '">' +
      '<div class="card__img">' +
        '<img src="' + BLANK + '" data-src="' + p.img + '" alt="' + esc(name) + '" width="260" height="260" decoding="async">' +
        '<span class="tag' + (p.hot ? ' tag--hot' : '') + '">' + esc(p.hot ? H.t('tag.hot') : H.t('tag.' + p.type)) + '</span>' +
        '<button class="fav" data-act="fav" aria-pressed="' + H.cart.isWished(p) + '" aria-label="' + esc(H.t('aria.fav')) + '"><svg viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.4-9.5 9-9.5 9z"/></svg></button>' +
        '<button class="quick" data-act="view">' + esc(H.t('quick')) + '</button>' +
      '</div>' +
      '<div class="card__body">' +
        '<span class="code">' + p.code + '</span>' +
        '<h3>' + (p.url ? '<a href="' + p.url + '" target="_blank" rel="noopener">' + esc(name) + '</a>' : '<a href="#quote" data-act="quote">' + esc(name) + '</a>') + '</h3>' +
        '<div class="card__foot"><div class="price">' + H.fmt(p.price) + ' <small>' + esc(H.t('price.sfx')) + '</small></div>' +
        '<button class="add" data-act="add" aria-label="' + esc(H.t('aria.add', { c: p.code })) + '"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button></div>' +
      '</div></li>';
  }

  /* page buttons: Prev 1 2 3 ... Next */
  function renderPager(pages) {
    var el = $('#pager');
    if (pages < 2) { el.innerHTML = ''; return; }
    var h = '<button type="button" data-p="' + (S.page - 1) + '"' + (S.page === 1 ? ' disabled' : '') + '>‹ ' + esc(H.t('pg.prev')) + '</button>';
    for (var i = 1; i <= pages; i++) {
      h += '<button type="button" data-p="' + i + '" class="' + (i === S.page ? 'is-on' : '') + '"' + (i === S.page ? ' aria-current="page"' : '') +
        ' aria-label="' + esc(H.t('pg.page', { n: i })) + '">' + i + '</button>';
    }
    h += '<button type="button" data-p="' + (S.page + 1) + '"' + (S.page === pages ? ' disabled' : '') + '>' + esc(H.t('pg.next')) + ' ›</button>';
    el.innerHTML = h;
  }

  function render() {
    var q = S.q.trim().toLowerCase();
    var list = H.data.PRODUCTS.filter(function (p) {
      return (S.filter === 'all' || p.type === S.filter) &&
        (!q || (p.th + ' ' + p.en + ' ' + p.code).toLowerCase().indexOf(q) > -1);
    });
    if (S.sort === 'asc') list.sort(function (a, b) { return a.price - b.price; });
    if (S.sort === 'desc') list.sort(function (a, b) { return b.price - a.price; });
    var pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    if (S.page > pages) S.page = pages;
    if (S.page < 1) S.page = 1;
    grid.innerHTML = list.slice((S.page - 1) * PAGE_SIZE, S.page * PAGE_SIZE).map(cardHTML).join('');
    renderPager(pages);
    $('#resultCount').textContent = list.length;
    $('#empty').hidden = list.length > 0;
    observeImages();
  }

  H.ui.products = {
    init: function () {
      grid = $('#grid');
      grid.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-act]');
        if (btn && btn.getAttribute('data-act') === 'quote') { e.preventDefault(); var qp = H.find(+btn.closest('.card').getAttribute('data-id')); if (qp) H.quoteFor(qp); return; }
        if (!btn) {   // tapping the photo opens quick view (touch screens have no hover button)
          var img = e.target.closest('.card__img');
          if (img) { var pp = H.find(+img.closest('.card').getAttribute('data-id')); if (pp) H.modal.open(pp, img); }
          return;
        }
        var p = H.find(+btn.closest('.card').getAttribute('data-id')); if (!p) return;
        var act = btn.getAttribute('data-act');
        if (act === 'add') H.cart.add(p);
        if (act === 'fav') { H.cart.toggleWish(p); btn.setAttribute('aria-pressed', H.cart.isWished(p)); }
        if (act === 'view') H.modal.open(p, btn);
      });
      $('#filters').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        $$('#filters button').forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-selected', on); });
        S.filter = b.getAttribute('data-filter'); S.page = 1; render();
      });
      $('#q').addEventListener('input', function (e) { S.q = e.target.value; S.page = 1; render(); });
      $('#sort').addEventListener('change', function (e) { S.sort = e.target.value; S.page = 1; render(); });
      document.addEventListener('hft:change', function () {
        $$('#grid .card').forEach(function (c) {
          c.querySelector('.fav').setAttribute('aria-pressed', H.cart.isWished(H.find(+c.getAttribute('data-id'))));
        });
      });
      $('#pager').addEventListener('click', function (e) {
        var b = e.target.closest('button[data-p]'); if (!b || b.disabled) return;
        S.page = +b.getAttribute('data-p'); render();
        var top = $('#products .toolbar').getBoundingClientRect().top;
        if (top < 0 || top > window.innerHeight * .6) $('#products .toolbar').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      H.onRender(render);
    }
  };
})(window.HFT);
