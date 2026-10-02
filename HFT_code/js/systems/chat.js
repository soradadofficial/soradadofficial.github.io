/* "Fit Buddy" – rule-based chat assistant (keyword intents, bilingual). Swap botReply() for a real AI API if needed. */
(function (H) {
  'use strict';
  var $ = H.$, esc = H.esc, T2 = H.T2, fmt = H.fmt;
  var chat, btn, msgs, input, ready = false, hintTimer;

  var CHIPS = [
    { th: 'ราคาเท่าไหร่', en: 'What are the prices?' },
    { th: 'แนะนำสำหรับมือใหม่', en: 'Recommend for beginners' },
    { th: 'ม้านั่งสำหรับ Olympic Barbell', en: 'Bench for Olympic barbell' },
    { th: 'ขอใบเสนอราคา', en: 'I want a quote' },
    { th: 'การรับประกัน', en: 'Warranty' },
    { th: 'ติดต่อทีมงาน', en: 'Contact the team' }
  ];

  /* ---- reply builders ---- */
  function cards(ids) {
    return '<div class="cps">' + ids.map(function (id) {
      var p = H.find(id);
      return '<button type="button" class="cp" data-p="' + id + '"><img src="' + p.img + '" alt="" width="44" height="44"><span><b>' + esc(H.pick({ th: p.th, en: p.en })) + '</b><small>' + fmt(p.price) + ' ' + esc(H.t('price.sfx')) + '</small></span></button>';
    }).join('') + '</div>';
  }
  function go(items) {
    return '<div class="cgos">' + items.map(function (i) { return '<a class="cgo" href="' + i[0] + '">' + esc(T2(i[1], i[2])) + '</a>'; }).join('') + '</div>';
  }

  var INTENTS = [
    [/สวัสดี|หวัดดี|hello|\bhi\b|hey/i, function () { return T2('สวัสดี! น้องฟิตเองนะ ถามเรื่องม้านั่ง แร็ค ราคา หรือการสั่งซื้อได้เลย 💪', 'Hi! I\'m Fit Buddy. Ask me about benches, racks, prices or how to order 💪'); }],
    [/ใบเสนอราคา|quote|สั่งซื้อ|สั่ง|order|ซื้อ|buy/i, function () { return T2('ขอใบเสนอราคาได้ที่แบบฟอร์ม ทีมงานจะติดต่อกลับ หรือดูขั้นตอนการสั่งซื้อก่อนก็ได้', 'You can request a quotation with the form and our team will get back to you, or check the ordering steps first.') + go([['#quote', 'ไปที่แบบฟอร์มขอใบเสนอราคา', 'Open the quote form'], ['#order', 'วิธีการสั่งซื้อ', 'How to order']]); }],
    [/โอน|สลิป|payment|transfer|slip|จ่าย|ชำระ/i, function () { return T2('โอนเงินแล้วแจ้งรายละเอียดและแนบสลิปได้ที่ฟอร์มแจ้งการโอนเงิน', 'After paying, send your details and slip with the payment confirmation form.') + go([['#payment', 'แจ้งการโอนเงิน', 'Confirm payment']]); }],
    [/รับประกัน|ประกัน|warranty|เคลม|claim/i, function () { return T2('สินค้ามีการรับประกันตามเงื่อนไขของผู้ผลิตและร้านค้า ระยะเวลาต่างกันตามรุ่น สอบถามทีมงานได้เลย', 'Products are covered by the manufacturer and store warranty; terms differ by model. Ask our team for details.') + go([['#warranty', 'ดูเรื่องการรับประกัน', 'Warranty info']]); }],
    [/จัดส่ง|ส่งของ|ส่งสินค้า|deliver|shipping|\bship/i, function () { return T2('ทีมงานประสานการจัดส่งถึงสถานที่ของคุณ สอบถามเงื่อนไขและค่าจัดส่งกับทีมงานได้ที่ 094 495 1811', 'We coordinate delivery to your location. Ask the team for terms and fees at 094 495 1811.'); }],
    [/ติดต่อ|เบอร์|โทร|line|ไลน์|contact|phone|email|อีเมล|เวลา|เปิด|hours|ที่ตั้ง|ร้านอยู่|แผนที่|map/i, function () { return T2('ติดต่อได้ที่ 📞 094 495 1811 · LINE @homefittools · Facebook facebook.com/homefittools · ✉️ homefittools@gmail.com เปิดทำการ 9:00 – 21:00 น.', 'Reach us at 📞 094 495 1811 · LINE @homefittools · Facebook facebook.com/homefittools · ✉️ homefittools@gmail.com. Open 9:00 – 21:00.') + go([['#contact', 'ไปที่ส่วนติดต่อ', 'Go to contact']]); }],
    [/โปร|ลดราคา|promo|discount|sale/i, function () { return T2('ตอนนี้มีโปรลดเครื่องออกกำลังกายทุกรุ่น 50% และลงทะเบียนเล่นฟิตเนสฟรี 3 วัน สอบถามรายละเอียดกับทีมงานได้เลย', 'Current promo: 50% off all fitness equipment and a free 3-day gym trial. Ask the team for details.'); }],
    [/ราคา|price|cost|เท่าไ|งบ|budget|ถูก|cheap/i, function () { return T2('สินค้าในหน้านี้ราคา 6,190 – 18,900 บาท รุ่นราคาเริ่มต้นดังนี้', 'Items on this page range from 6,190 to 18,900 THB. Entry-level options:') + cards([36, 38, 37]); }],
    [/olympic|โอลิมปิก|บาร์เบล|barbell|หนัก|heavy|แร็ค|rack/i, function () { return T2('ถ้าฝึกกับบาร์เบลหนัก แนะนำกลุ่ม Olympic ที่มีที่รองรับบาร์', 'For heavy barbell training, try the Olympic models with bar supports:') + cards([43, 41, 42]); }],
    [/ปรับ|adjust|incline|decline|มุม|angle/i, function () { return T2('รุ่นที่ปรับมุมได้ ทำท่าได้หลากหลาย', 'Adjustable models for more exercise variety:') + cards([37, 39, 42]); }],
    [/แขน|หลัง|ท้อง|เครื่อง|machine|arm|back|abs|curl/i, function () { return T2('เครื่องบริหารกล้ามเนื้อเฉพาะส่วนที่มีให้เลือก', 'Muscle-specific machines available:') + cards([44, 45, 47]); }],
    [/มือใหม่|เริ่ม|beginner|start|บ้าน|home|คอนโด|condo|เล็ก|small|แนะนำ|recommend|best|ขายดี/i, function () { return T2('สำหรับมือใหม่หรือ Home Gym แนะนำรุ่นเหล่านี้', 'For beginners or a home gym I suggest:') + cards([36, 38, 39]); }],
    [/ม้านั่ง|bench/i, function () { return T2('ม้านั่งยอดนิยมของเรา', 'Our popular benches:') + cards([36, 39, 43]); }]
  ];

  function botReply(text) {
    for (var i = 0; i < INTENTS.length; i++) if (INTENTS[i][0].test(text)) return INTENTS[i][1]();
    return T2('ขอโทษนะ น้องฟิตยังไม่เข้าใจคำถามนี้ ลองเลือกหัวข้อด้านล่าง หรือโทร 094 495 1811 ให้ทีมงานช่วยได้เลย', 'Sorry, I didn\'t catch that. Pick a topic below or call 094 495 1811 to reach the team.');
  }

  /* ---- UI ---- */
  function renderChips() {
    $('#chatChips').innerHTML = CHIPS.map(function (c, i) { return '<button type="button" data-c="' + i + '">' + esc(H.pick(c)) + '</button>'; }).join('');
  }
  function addMsg(who, html) {
    var d = document.createElement('div'); d.className = 'msg msg--' + who; d.innerHTML = html;
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; return d;
  }
  function send(text) {
    text = text.trim(); if (!text) return;
    addMsg('me', '').textContent = text;
    var typing = addMsg('bot', '<span class="dots"><i></i><i></i><i></i></span>');
    setTimeout(function () { typing.innerHTML = botReply(text); msgs.scrollTop = msgs.scrollHeight; }, 550);
  }

  var api = H.sys.chat = {
    init: function () {
      chat = $('#chat'); btn = $('#chatBtn'); msgs = $('#chatMsgs'); input = $('#chatIn');
      btn.addEventListener('click', function () { chat.hidden ? api.open() : api.close(); });
      $('#chatClose').addEventListener('click', api.close);
      $('#chatForm').addEventListener('submit', function (e) { e.preventDefault(); var v = input.value; input.value = ''; send(v); });
      $('#chatChips').addEventListener('click', function (e) { var b = e.target.closest('[data-c]'); if (b) send(H.pick(CHIPS[+b.getAttribute('data-c')])); });
      msgs.addEventListener('click', function (e) {
        var cp = e.target.closest('[data-p]'); if (cp) { H.modal.open(H.find(+cp.getAttribute('data-p')), btn); return; }
        if (e.target.closest('.cgo')) api.close();
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') api.close(); });
      hintTimer = setTimeout(function () { if (chat.hidden) $('#chatHint').classList.add('is-on'); }, 3500);
      setTimeout(function () { $('#chatHint').classList.remove('is-on'); }, 11000);
      H.onRender(function () { if (ready) renderChips(); });
    },
    open: function () {
      chat.hidden = false; btn.setAttribute('aria-expanded', 'true'); btn.classList.add('is-open'); clearTimeout(hintTimer);
      $('#chatHint').classList.remove('is-on');
      if (!ready) {
        ready = true; renderChips();
        addMsg('bot', esc(T2('สวัสดี! น้องฟิตเองนะ 💪 ช่วยเลือกม้านั่ง แร็ค หรือตอบเรื่องสั่งซื้อได้เลย', 'Hi! I\'m Fit Buddy 💪 I can help you pick a bench or rack, or answer ordering questions.')));
      }
      setTimeout(function () { input.focus(); }, 50);
    },
    close: function () { chat.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.classList.remove('is-open'); }
  };
})(window.HFT);
