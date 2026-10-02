/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* SEO: rebuilds JSON-LD (organization, navigation, products, FAQ) in the active language. */
(function (H) {
  'use strict';
  var D = H.data;

  function build() {
    var old = H.$('#ld'); if (old) old.remove();
    var faqs = H.$$('.faq details').map(function (d) {
      return { '@type': 'Question', name: d.querySelector('summary').textContent.trim(),
        acceptedAnswer: { '@type': 'Answer', text: d.querySelector('p').textContent.trim() } };
    });
    var ld = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', name: 'HomeFitTools', url: D.WWW, telephone: '+66944951811', email: 'homefittools@gmail.com' },
      { '@type': 'ItemList', name: 'Site navigation', itemListElement: D.MEGA.map(function (c, i) {
        return { '@type': 'SiteNavigationElement', position: i + 1, name: H.pick(c), url: c.url.charAt(0) === '#' ? D.WWW : c.url };
      }) },
      { '@type': 'ItemList', name: 'Benches & Racks', itemListElement: D.PRODUCTS.map(function (p, i) {
        return { '@type': 'ListItem', position: i + 1, item: { '@type': 'Product', name: H.pick({ th: p.th, en: p.en }), sku: p.code, image: p.img, url: p.url,
          description: H.state.lang === 'en' ? p.den : p.dth,
          offers: { '@type': 'Offer', priceCurrency: 'THB', price: p.price, availability: 'https://schema.org/InStock', url: p.url } } };
      }) },
      { '@type': 'FAQPage', mainEntity: faqs }
    ] };
    var s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'ld'; s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  H.sys.seo = { init: function () { H.onRender(build); } };
})(window.HFT);
