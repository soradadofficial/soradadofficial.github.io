/* Page behaviour: theme, language (EN/TH), reveal animations, counters, toast, easter egg. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }

  /* ---------- toast ---------- */
  var toastEl = $('#toast'), toastT;
  window.pxToast = function (msg, gold) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.toggle('gold', !!gold);
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  };

  /* ---------- theme ---------- */
  var themeIco = $('#themeIco');
  function setTheme(t, silent) {
    root.dataset.theme = t;
    if (themeIco) themeIco.textContent = t === 'dark' ? '☾' : '☀';
    var m = $('meta[name="theme-color"]'); if (m) m.content = t === 'dark' ? '#0a0e1c' : '#f2f5ff';
    if (!silent) store('sc-theme', t);
    window.dispatchEvent(new CustomEvent('themechange', { detail: t }));
  }
  var themeBtn = $('#themeBtn');
  if (themeBtn) themeBtn.addEventListener('click', function () { setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'); });
  setTheme(root.dataset.theme || 'dark', true);

  /* ---------- language ---------- */
  var TH = window.TH_DICT || {};
  var langBtn = $('#langBtn');
  function setLang(l, silent) {
    $$('[data-i18n]').forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = (l === 'th' && TH[el.dataset.i18n]) ? TH[el.dataset.i18n] : el.dataset.en;
    });
    root.lang = l;
    $$('[data-cv]').forEach(function (a) { a.href = a.dataset.cv.replace('%s', l === 'th' ? 'TH' : 'EN'); });
    if (langBtn) {
      var s = langBtn.querySelectorAll('span');
      s[0].className = l === 'en' ? 'on' : ''; s[1].className = l === 'th' ? 'on' : '';
    }
    if (!silent) store('sc-lang', l);
    window.dispatchEvent(new CustomEvent('langchange', { detail: l }));
  }
  if (langBtn) langBtn.addEventListener('click', function () { setLang(root.lang === 'th' ? 'en' : 'th'); });
  var savedLang = store('sc-lang');
  if (!savedLang) savedLang = (navigator.language || '').toLowerCase().indexOf('th') === 0 ? 'th' : 'en';
  if (savedLang === 'th') setLang('th', true); else setLang('en', true);

  /* ---------- mobile menu ---------- */
  var menuBtn = $('#menuBtn'), links = $('#links');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var o = links.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o);
    });
    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } });
  }

  /* ---------- reveal + counters ---------- */
  function countUp(el) {
    var end = parseFloat(el.dataset.count), t0 = null, dur = 1100;
    if (reduce || isNaN(end)) { el.textContent = el.dataset.count; return; }
    (function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(end * e);
      if (k < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        $$('[data-count]', e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: .12 });
    $$('.reveal').forEach(function (el) { io.observe(el); });

    var secs = $$('main section[id]'), navA = $$('.links a');
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) navA.forEach(function (a) { a.classList.toggle('act', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { spy.observe(s); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- easter egg: Konami code ---------- */
  var seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'], pos = 0;
  d.addEventListener('keydown', function (e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = (k === seq[pos]) ? pos + 1 : (k === seq[0] ? 1 : 0);
    if (pos === seq.length) {
      pos = 0; d.body.classList.add('rainbow');
      setTimeout(function () { d.body.classList.remove('rainbow'); }, 5000);
      window.pxToast('★ SECRET UNLOCKED: RAINBOW MODE ★', true);
    }
  });
})();
