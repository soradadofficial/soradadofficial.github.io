/* Small shared helpers. */
(function (H) {
  'use strict';
  H.$ = function (s, c) { return (c || document).querySelector(s); };
  H.$$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  H.fmt = function (n) { return n.toLocaleString('en-US'); };
  H.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  };
  /* localStorage that never throws (private mode, blocked storage). */
  H.store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  /* anchor attributes: in-page links stay in the tab, external ones open a new tab */
  H.link = function (u) {
    return u.charAt(0) === '#' ? ' href="' + u + '"' : ' href="' + u + '" target="_blank" rel="noopener"';
  };
  H.find = function (id) { return H.data.PRODUCTS.filter(function (p) { return p.id === id; })[0]; };
  H.FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f6fb"/><path d="M40 110h120M55 90v40M145 90v40M30 100v20M170 100v20" stroke="#044394" stroke-width="8" stroke-linecap="round" fill="none"/></svg>');
  /* broken product image -> placeholder (error events do not bubble, so capture) */
  document.addEventListener('error', function (e) {
    var el = e.target;
    if (el && el.tagName === 'IMG' && el.src !== H.FALLBACK) el.src = H.FALLBACK;
  }, true);
})(window.HFT);
