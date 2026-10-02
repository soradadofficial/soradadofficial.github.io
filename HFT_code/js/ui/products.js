/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Product grid: render, filter, search, sort. */
(function (H) {
  'use strict';
  var $ = H.$, $$ = H.$$, esc = H.esc, S = H.state, grid;

  function cardHTML(p, i) {
    var name = H.pick({ th: p.th, en: p.en });
    return '<li class="card" style="animation-delay:' + (i * 50) + 'ms" data-id="' + p.id + '">' +
      '<div class="card__img">' +
        '<img src="' + p.img + '" alt="' + esc(name) + '" loading="lazy" width="260" height="260">' +
        '<span class="tag' + (p.hot ? ' tag--hot' : '') + '">' + esc(p.hot ? H.t('tag.hot') : H.t(p.type === 'bench' ? 'tag.bench' : 'tag.machine')) + '</span>' +
        '<button class="fav" data-act="fav" aria-pressed="' + H.cart.isWished(p) + '" aria-label="' + esc(H.t('aria.fav')) + '"><svg viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.4-9.5 9-9.5 9z"/></svg></button>' +
        '<button class="quick" data-act="view">' + esc(H.t('quick')) + '</button>' +
      '</div>' +
      '<div class="card__body">' +
        '<span class="code">' + p.code + '</span>' +
        '<h3><a href="' + p.url + '" target="_blank" rel="noopener">' + esc(name) + '</a></h3>' +
        '<div class="card__foot"><div class="price">' + H.fmt(p.price) + ' <small>' + esc(H.t('price.sfx')) + '</small></div>' +
        '<button class="add" data-act="add" aria-label="' + esc(H.t('aria.add', { c: p.code })) + '"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button></div>' +
      '</div></li>';
  }

  function render() {
    var q = S.q.trim().toLowerCase();
    var list = H.data.PRODUCTS.filter(function (p) {
      return (S.filter === 'all' || p.type === S.filter) &&
        (!q || (p.th + ' ' + p.en + ' ' + p.code).toLowerCase().indexOf(q) > -1);
    });
    if (S.sort === 'asc') list.sort(function (a, b) { return a.price - b.price; });
    if (S.sort === 'desc') list.sort(function (a, b) { return b.price - a.price; });
    grid.innerHTML = list.map(cardHTML).join('');
    $('#resultCount').textContent = list.length;
    $('#empty').hidden = list.length > 0;
  }

  H.ui.products = {
    init: function () {
      grid = $('#grid');
      grid.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-act]');
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
        S.filter = b.getAttribute('data-filter'); render();
      });
      $('#q').addEventListener('input', function (e) { S.q = e.target.value; render(); });
      $('#sort').addEventListener('change', function (e) { S.sort = e.target.value; render(); });
      document.addEventListener('hft:change', function () {
        $$('#grid .card').forEach(function (c) {
          c.querySelector('.fav').setAttribute('aria-pressed', H.cart.isWished(H.find(+c.getAttribute('data-id'))));
        });
      });
      H.onRender(render);
    }
  };
})(window.HFT);
