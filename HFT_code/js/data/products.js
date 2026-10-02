/* Product catalogue (images are hot-linked from the original shop). */
(function (H) {
  'use strict';
  var BASE = 'https://www.homefittools.com/media/catalog/product/cache/';
  var P = BASE + '812c38f0843fe58c4f573be87c790fc8/';
  var PL = 'https://www.homefittools.com/products/weighttraining/fitness-equipment/bench/';

  var PRODUCTS = [
    { id: 36, code: 'FGX36', type: 'bench', price: 6190, img: P + 'f/l/flat-bench-hft-1036-new.webp', url: PL + 'flat-bench-e1036.html',
      th: 'ม้านั่งออกกำลังกายแบบราบ (Flat Bench) HFT-FGX36', en: 'Flat Bench HFT-FGX36',
      dth: 'ม้านั่งแบบราบ สำหรับท่า Bench Press และงานดัมเบล เหมาะกับผู้เริ่มต้นและ Home Gym', den: 'A flat bench for bench press and dumbbell work. Great for beginners and home gyms.' },
    { id: 37, code: 'FGX37', type: 'bench', price: 10900, img: P + 'h/f/hft-3037.jpg', url: PL + 'adjustable-decline-bench-e1037.html',
      th: 'ม้านั่งออกกำลังกายปรับระดับ ลาดลง (Adjustable Decline Bench) HFT-FGX37', en: 'Adjustable Decline Bench HFT-FGX37',
      dth: 'ม้านั่งปรับระดับมุม รองรับท่า Decline และการฝึกหลากหลายท่า', den: 'An adjustable-angle bench supporting decline work and a wide range of exercises.' },
    { id: 38, code: 'FGX38', type: 'bench', price: 6900, img: P + 'e/3/e3038.webp', url: PL + 'multi-purpose-bench-e3038.html',
      th: 'ม้านั่งออกกำลังกายอเนกประสงค์ (Multi-Purpose Bench) HFT-FGX38', en: 'Multi-Purpose Bench HFT-FGX38',
      dth: 'ม้านั่งอเนกประสงค์ ปรับใช้ได้หลายท่าฝึก คุ้มค่าสำหรับใช้งานในบ้าน', den: 'A versatile bench for many exercises. Great value for home use.' },
    { id: 39, code: 'FGX39', type: 'bench', hot: true, price: 12900, img: BASE + 'c4218f1997800f206b38e4323d8d1cf4/s/u/super-bench-hft-fgx39_1.png', url: PL + 'super-bench-e1039.html',
      th: 'ม้านั่งออกกำลังกายซุปเปอร์เบนช์ (Super Bench) HFT-FGX39', en: 'Super Bench HFT-FGX39',
      dth: 'ม้านั่งรุ่นแนะนำ โครงสร้างแข็งแรง ปรับมุมได้ ใช้งานได้ทั้งบ้านและฟิตเนส', den: 'Our featured bench: sturdy frame, adjustable angles, suited to home and gym.' },
    { id: 41, code: 'FGX41', type: 'bench', price: 15900, img: P + 'e/3/e3041.webp', url: PL + 'olympic-decline-bench-e3041.html',
      th: 'ม้านั่งโอลิมปิก ลาดลง (Olympic Decline Bench) HFT-FGX41', en: 'Olympic Decline Bench HFT-FGX41',
      dth: 'ม้านั่ง Olympic แบบ Decline สำหรับฝึก Barbell อย่างปลอดภัย', den: 'An Olympic decline bench for safe barbell training.' },
    { id: 42, code: 'FGX42', type: 'bench', price: 18900, img: P + 'h/f/hft-3042.jpg', url: PL + 'olympic-incline-bench-e1042.html',
      th: 'ม้านั่งโอลิมปิก ลาดเอียงขึ้น (Olympic Incline Bench) HFT-FGX42', en: 'Olympic Incline Bench HFT-FGX42',
      dth: 'ม้านั่ง Olympic แบบ Incline สำหรับฝึกกล้ามเนื้ออกส่วนบนด้วย Barbell', den: 'An Olympic incline bench for upper-chest barbell work.' },
    { id: 43, code: 'FGX43', type: 'bench', hot: true, price: 14900, img: P + 'e/3/e3043.webp', url: PL + 'olympic-bench-e3043.html',
      th: 'ม้านั่งโอลิมปิก (Olympic Bench) HFT-FGX43', en: 'Olympic Bench HFT-FGX43',
      dth: 'ม้านั่ง Olympic พร้อมแร็ครองรับบาร์เบล เหมาะกับผู้ฝึกจริงจัง', den: 'An Olympic bench with bar supports, built for serious lifters.' },
    { id: 44, code: 'FGX44', type: 'machine', price: 12900, img: P + 'h/f/hft-3044.jpg', url: PL + 'seated-preacher-curl-e1044.html',
      th: 'เครื่องบริหารกล้ามเนื้อแขน นั่งพรีชเชอร์เคิร์ล (Seated Preacher Curl) HFT-FGX44', en: 'Seated Preacher Curl (arm machine) HFT-FGX44',
      dth: 'เครื่องเน้นกล้ามเนื้อแขนหน้า ท่านั่ง Preacher Curl', den: 'A seated preacher curl machine that targets the biceps.' },
    { id: 45, code: 'FGX45', type: 'machine', price: 12900, img: P + 'h/f/hft-3045.jpg', url: PL + 'back-extension-e1045.html',
      th: 'เครื่องบริหารกล้ามเนื้อหลัง แบ็คเอ็กซ์เทนชัน (Back Extension) HFT-FGX45', en: 'Back Extension (back machine) HFT-FGX45',
      dth: 'เครื่องบริหารกล้ามเนื้อหลังส่วนล่างและแกนกลางลำตัว', den: 'Trains the lower back and core.' },
    { id: 47, code: 'FGX47', type: 'machine', price: 15900, img: P + 'e/3/e3047.webp', url: PL + 'vertical-kness-up-dip-hft-3047.html',
      th: 'เครื่องบริหารหน้าท้อง ยกเข่า/ดิป แนวตั้ง (Vertical Knee Up/Dip) HFT-FGX47', en: 'Vertical Knee Up / Dip (abs machine) HFT-FGX47',
      dth: 'เครื่องยกเข่าและ Dip สำหรับกล้ามเนื้อหน้าท้องและแขนหลัง', den: 'A knee-raise and dip station for abs and triceps.' }
  ];

  H.data.PRODUCTS = PRODUCTS;
})(window.HFT);
