/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
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

  /* ---- specs (from the original shop's product cards): size mm, weight kg, steel thickness mm, max load kg ---- */
  var SPEC = {
    36: ['1350 × 760 × 430', 30, 250], 37: ['1620 × 760 × 810', 61, 250], 38: ['1170 × 760 × 820', 30, 250],
    39: ['1620 × 760 × 810', 61, 250], 41: ['2060 × 1780 × 1090', 110, 250], 42: ['2010 × 1780 × 1400', 127, 250],
    43: ['1730 × 1780 × 1220', 82, 250], 44: ['1320 × 840 × 970', 55, 250], 45: ['1220 × 860 × 960', 57, 250],
    47: ['1270 × 710 × 1600', 86, 250]
  };
  PRODUCTS.forEach(function (p) {
    var s = SPEC[p.id]; p.spec = { dims: s[0], kg: s[1], steel: 2.5, load: s[2] };
  });

  /* ---- pages 2-5 of the reference catalogue ----
     [id, code, type, price, image path, page slug (null = quote only), size, kg, max load kg, Thai name, English name, badge] */
  var MORE = [
    [101, 'FGX50', 'rack', 20900, 'e/3/e3050.webp', 'squat-rack-hft-3050.html', '1850 × 1730 × 1800', 128, null, 'แร็คสควอทมัลติฟังก์ชัน (Squat Rack) HFT-FGX50', 'Multi-function Squat Rack HFT-FGX50'],
    [102, 'FGX51', 'bench', 19900, 'e/3/e3051.webp', 'olympic-seated-bench-hft-3051.html', '1550 × 1780 × 1800', 140, 250, 'ม้านั่งออกกำลังกายพร้อมแร็ค (Olympic Seated Bench) HFT-FGX51', 'Olympic Seated Bench with rack HFT-FGX51'],
    [103, 'FGX53', 'rack', 10900, 'e/3/e3053.webp', 'handle-rack-hft-3053.html', '940 × 760 × 1040', 61, 250, 'แร็ควางบาร์เบล (Handle Rack) HFT-FGX53', 'Barbell Storage Handle Rack HFT-FGX53'],
    [104, 'FID', 'bench', 23000, 'f/i/fid-banch-press.webp', null, null, null, null, 'ม้านั่งบาร์เบลปรับระดับ (FID Bench Press)', 'FID Bench Press (adjustable barbell bench)'],
    [105, 'FGX70', 'machine', 14900, 'a/b/abdominal-trainer-fgx70-black.webp', null, '1540 × 920 × 1030', 68, null, 'เครื่องบริหารหน้าท้อง (Abdominal Trainer) FGX70', 'Abdominal Trainer FGX70'],
    [106, 'FGX71', 'machine', 15900, 's/t/stretch-trainer-fgx71-silve.webp', null, '1430 × 530 × 1210', 52, null, 'ม้านั่งยืดกล้ามเนื้อ (Stretch Trainer) HFT-FGX71', 'Stretch Trainer HFT-FGX71'],
    [107, 'FFE71', 'bench', 24900, 'd/9/d971-black-olympic-incline-bench-ffe71.webp', null, '1250 × 1880 × 1600', 117, null, 'ม้านั่งโอลิมปิก Incline เกรด Commercial (Olympic Incline Bench) FFE71', 'Commercial Olympic Incline Bench FFE71'],
    [108, 'FFE72', 'bench', 21900, 'd/9/d972-black-olympic-bench-ffe72.webp', null, '1250 × 1630 × 1350', 130, null, 'ม้านั่งโอลิมปิก เกรด Commercial (Olympic Bench) FFE72', 'Commercial Olympic Bench FFE72'],
    [109, 'FFE73', 'bench', 24900, 'd/9/d973-black-olympic-decline-bench-ffe73.webp', null, '1250 × 1890 × 1320', 108, null, 'ม้านั่งโอลิมปิก Decline เกรด Commercial (Olympic Decline Bench) FFE73', 'Commercial Olympic Decline Bench FFE73'],
    [110, 'FFE74', 'bench', 25900, 'd/9/d974-black-olympic-military-bench-ffe74.webp', null, '1240 × 1350 × 1870', 122, null, 'ม้านั่ง Military Press เกรด Commercial (Olympic Military Bench) FFE74', 'Commercial Olympic Military Bench FFE74'],
    [111, 'FFE75', 'machine', 14900, 'd/9/d975-black-back-extension-ffe75.webp', null, '1200 × 760 × 770', 48, null, 'เครื่องบริหารหลังส่วนล่าง (Back Extension) FFE75', 'Commercial Back Extension FFE75'],
    [112, 'FFE76', 'machine', 18900, 'd/9/d976-black-seated-preacher-curl-ffe76.webp', null, '1060 × 790 × 1100', 63, null, 'ม้านั่งบริหารไบเซปส์ Preacher (Seated Preacher Curl) FFE76', 'Commercial Seated Preacher Curl FFE76'],
    [113, 'FFE77', 'bench', 18900, 'd/9/d977-black-adjustable-decline-bench-ffe77.webp', null, '1850 × 550 × 930', 65, null, 'ม้านั่ง Decline ปรับระดับได้ (Adjustable Decline Bench) FFE77', 'Commercial Adjustable Decline Bench FFE77'],
    [114, 'FFE78', 'bench', 18900, 'd/9/d978-black-super-bench-ffe78.webp', null, '1350 × 520 × 460', 46, null, 'ม้านั่งฟิตเนสปรับระดับ 8 ระดับ (Super Bench) FFE78', '8-position Commercial Super Bench FFE78'],
    [115, 'FER02', 'rack', 21900, 'a/8/a802-black-bench-press-rack-fer02.webp', null, null, 106, null, 'ราวม้านั่ง Bench Press (Bench Press Rack) FER02', 'Commercial Bench Press Rack FER02'],
    [116, 'FER03', 'rack', 34900, 'a/8/a803-black-powerlifting-combo-rack-fer03.webp', null, '2080 × 1770 × 1350', 163, null, 'ราว Powerlifting ครบชุด Squat + Bench Press (Combo Rack) FER03', 'Powerlifting Combo Rack (Squat + Bench) FER03'],
    [117, 'DDJ40', 'bench', 8900, 'm/a/main-flat-bench-ddj40.webp', null, '1340 × 560 × 430', 24.5, null, 'ม้านั่งฟิตเนสแบบเรียบ (Flat Bench) DDJ40', 'Commercial Flat Bench DDJ40'],
    [118, 'DDJ41', 'bench', 21900, 'm/a/main-adjustable-abdominal-bench-ddj41.webp', null, '1710 × 880 × 840', 60, null, 'ม้านั่งซิทอัพปรับองศาได้ (Adjustable Abdominal Bench) DDJ41', 'Commercial Adjustable Abdominal Bench DDJ41'],
    [119, 'DDJ42', 'machine', 27900, 'm/a/main-abdominal-machine-ddj42.webp', null, '1670 × 1370 × 1240', 116, null, 'เครื่องบริหารหน้าท้อง (Abdominal Machine) DDJ42', 'Commercial Abdominal Machine DDJ42'],
    [120, 'DDJ43', 'bench', 17900, 'm/a/main-adjustable-bench-ddj43.webp', null, '1520 × 440 × 730', 53.5, null, 'ม้านั่งปรับระดับ (Adjustable Bench) DDJ43', 'Commercial Adjustable Bench DDJ43'],
    [121, 'DDJ44', 'machine', 18900, 'm/a/main-seated-preacher-curl-ddj44.webp', null, '1310 × 960 × 810', 55, null, 'ม้านั่งฝึกกล้ามแขนหน้า (Seated Preacher Curl) DDJ44', 'Commercial Seated Preacher Curl DDJ44'],
    [122, 'DDJ45', 'machine', 23900, 'm/a/main-back-extension-ddj45.webp', null, '1600 × 750 × 950', 69, null, 'เครื่องฝึกหลังล่าง (Back Extension) DDJ45', 'Commercial Back Extension DDJ45'],
    [123, 'DDJ46', 'bench', 25900, 'f/l/flat-olympic-bench-ddj46.webp', null, '1950 × 1550 × 1810', 87, null, 'ม้านั่งโอลิมปิก Bench Press (Flat Olympic Bench) DDJ46', 'Flat Olympic Bench DDJ46'],
    [124, 'DDJ47', 'bench', 26900, 'i/n/incline-olympic-bench-ddj47.webp', null, '2220 × 1480 × 1800', 95, null, 'ม้านั่งโอลิมปิกปรับองศา Incline (Incline Olympic Bench) DDJ47', 'Incline Olympic Bench DDJ47'],
    [125, 'DDJ48', 'bench', 26900, 'o/l/olympic-decline-bench-ddj48.webp', null, '2350 × 1360 × 1800', 111.5, null, 'ม้านั่งโอลิมปิก Decline (Olympic Decline Bench) DDJ48', 'Olympic Decline Bench DDJ48'],
    [126, 'DDJ49', 'rack', 29900, 's/q/squat-rack-ddj49.webp', null, '1830 × 1930 × 1220', 121, null, 'แร็คสควอทอิสระ (Squat Rack) DDJ49', 'Free-standing Squat Rack DDJ49'],
    [127, 'DVD36', 'bench', 5900, 'f/l/flat-bench-dvd36.webp', null, '1420 × 570 × 430', 36, null, 'ม้านั่งยกน้ำหนักแบบเรียบ (Flat Bench) DVD36', 'Commercial Flat Bench DVD36'],
    [128, 'DVD37', 'bench', 13900, 'a/d/adjustable-abdominal-bench-dvd37.webp', null, '1660 × 670 × 770', 48, null, 'ม้านั่งฝึกหน้าท้องปรับระดับได้ (Adjustable Abdominal Bench) DVD37', 'Commercial Adjustable Abdominal Bench DVD37'],
    [129, 'DVD38', 'bench', 6900, 'm/u/multi-purpose-bench-dvd38.webp', null, '1200 × 670 × 840', 28, null, 'ม้านั่งออกกำลังกายอเนกประสงค์ (Multi-Purpose Bench) DVD38', 'Commercial Multi-Purpose Bench DVD38'],
    [130, 'DVD39', 'bench', 12900, 's/u/super-bench-dvd39.webp', null, '1400 × 670 × 440', 45, null, 'ม้านั่งเวทอเนกประสงค์ (Super Bench) DVD39', 'Commercial Super Bench DVD39'],
    [131, 'DVD41', 'bench', 18900, 'o/l/olympic-decline-bench-dvd41.webp', null, '2060 × 1660 × 1220', 78, null, 'ม้านั่ง Bench Press Decline (Olympic Decline Bench) DVD41', 'Olympic Decline Bench DVD41'],
    [132, 'DVD42', 'bench', 17900, 'o/l/olympic-incline-bench-dvd42.webp', null, '1980 × 1660 × 1400', 82, null, 'ม้านั่ง Bench Press Incline (Olympic Incline Bench) DVD42', 'Olympic Incline Bench DVD42'],
    [133, 'DVD43', 'bench', 15900, 'o/l/olympic-flat-bench-dvd43.webp', null, '1670 × 1660 × 1230', 61, null, 'ม้านั่ง Bench Press แบบเรียบ (Olympic Flat Bench) DVD43', 'Olympic Flat Bench DVD43'],
    [134, 'DVD44', 'machine', 12900, 's/e/seated-preacher-curl-dvd44.webp', null, '1340 × 780 × 940', 46, null, 'ม้านั่งฝึกไบเซปแบบนั่ง (Seated Preacher Curl) DVD44', 'Commercial Seated Preacher Curl DVD44'],
    [135, 'DVD45', 'machine', 13900, 'b/a/back-extension-dvd45.webp', null, '1130 × 920 × 750', 45, null, 'ม้านั่งฝึกหลังล่าง (Back Extension) DVD45', 'Commercial Back Extension DVD45'],
    [136, 'DVD47', 'machine', 22900, 'v/e/vertical-knees-up-dip-dvd47.webp', null, '1170 × 750 × 1600', 69, null, 'เครื่องฝึกหน้าท้องและแขนแบบแขวน (Vertical Knees Up / Dip) DVD47', 'Commercial Vertical Knees Up / Dip DVD47'],
    [137, 'DVD50', 'rack', 24900, 's/q/squat-rack-dvd50.webp', null, '1780 × 1680 × 1790', 95, null, 'แร็คสควอท (Squat Rack) DVD50', 'Commercial Squat Rack DVD50'],
    [138, 'DVD86', 'bench', 27900, 'f/l/flat-incline-decline-bench-press-dvd86.webp', null, '1040 × 1770 × 1390', 140, null, 'ม้านั่งเวทปรับองศา Flat / Incline / Decline (Bench Press) DVD86', 'Flat / Incline / Decline Bench Press DVD86']
  ];

  var KIND = {
    bench: ['ม้านั่งออกกำลังกาย', 'weight bench'], rack: ['แร็ค', 'rack'], machine: ['เครื่องบริหารกล้ามเนื้อ', 'muscle machine']
  };
  MORE.forEach(function (r) {
    var spec = { dims: r[6], kg: r[7], steel: 2.5, load: r[8] };
    PRODUCTS.push({
      id: r[0], code: r[1], type: r[2], price: r[3], img: P + r[4], url: r[5] ? PL + r[5] : null,
      th: r[9], en: r[10], spec: spec,
      dth: KIND[r[2]][0] + 'ระดับฟิตเนส ' + (r[6] ? 'ขนาด ' + r[6] + ' มม. ' : '') + (r[7] ? 'น้ำหนักเครื่อง ' + r[7] + ' กก. ' : '') + 'เหล็กหนาถึง 2.5 มม.' + (r[8] ? ' รับน้ำหนักถึง ' + r[8] + ' กก.' : ''),
      den: 'A gym-grade ' + KIND[r[2]][1] + '. ' + (r[6] ? 'Size ' + r[6] + ' mm. ' : '') + (r[7] ? 'Weight ' + r[7] + ' kg. ' : '') + 'Steel up to 2.5 mm thick.' + (r[8] ? ' Max load ' + r[8] + ' kg.' : '')
    });
  });

  H.data.PRODUCTS = PRODUCTS;
})(window.HFT);
