/* ใช้สำหรับสมัครงาน Homefittools เท่านั้น (For Homefittools job application only) */
/* Navigation data: mega menu, footer sitemap, category grid, search keywords. */
(function (H) {
  'use strict';
  var WWW = 'https://www.homefittools.com/';
  var ALLP = WWW + 'products.html';
  var K = { /* [thai, english, url] */
    treadmill: ['ลู่วิ่งไฟฟ้า', 'Treadmill', ALLP],
    elliptical: ['เครื่องเดินวงรี', 'Elliptical', ALLP],
    stair: ['เครื่องเดินชัน เครื่องเดินบันได', 'Stair Climber', ALLP],
    mat: ['แผ่นยางปูพื้น', 'Floor Mat', ALLP],
    spin: ['จักรยานสปิน', 'Spin Bike', ALLP],
    rehab: ['จักรยานกายภาพบำบัด', 'Rehabilitation Bike', ALLP],
    bw: ['ออกกำลังกายด้วยน้ำหนักตัว', 'Bodyweight', ALLP],
    abs: ['สร้างกล้ามหน้าท้อง', 'Build Abs', ALLP],
    yoga: ['โยคะ', 'Yoga', ALLP],
    pilates: ['พิลาทิส', 'Pilates', ALLP],
    db: ['ดัมเบล', 'Dumbbell', ALLP],
    dbrack: ['ชั้นวางดัมเบล', 'Dumbbell Rack', ALLP],
    bench: ['ม้านั่งออกกำลังกาย', 'Weight Bench', '#products'],
    setb: ['ชุดม้านั่งพร้อมดัมเบล', 'Bench + Dumbbell Set', ALLP],
    bb: ['บาร์เบล', 'Barbell', ALLP],
    bbrack: ['แร็คบาร์เบล', 'Barbell Rack', ALLP],
    plate: ['แผ่นน้ำหนัก', 'Weight Plate', ALLP],
    pl: ['พาวเวอร์ลิฟติ้ง', 'Powerlifting', ALLP],
    multi: ['โฮมมัลติยิม', 'Home Multi Gym', ALLP],
    smith: ['สมิทธ์แมชชีน', 'Smith Machine', ALLP],
    fit: ['อุปกรณ์ฟิตเนส', 'Fitness Equipment', WWW + 'products/weighttraining/fitness-equipment.html'],
    jj: ['เสื่อยิวยิตสู', 'Jiu Jitsu Mats', ALLP],
    bag: ['กระสอบทราย', 'Punching Bag', ALLP],
    acc: ['อุปกรณ์เสริม', 'Accessories', ALLP],
    caliper: ['เครื่องวัดไขมัน (คาลิเปอร์)', 'Body Fat Caliper', ALLP],
    mug: ['แก้วชงอัตโนมัติ', 'Auto Stirring Mug', ALLP]
  };
  var WT = [K.db, K.dbrack, K.bench, K.setb, K.bb, K.bbrack, K.plate, K.pl, K.multi, K.smith, K.fit];

  var MEGA = [
    { e: '🏃', th: 'เครื่อง CARDIO', en: 'Cardio Machines', url: ALLP, kids: [K.treadmill, K.elliptical, K.stair] },
    { e: '🟦', th: 'Fitness Floor', en: 'Fitness Floor', url: ALLP, kids: [K.mat] },
    { e: '🏋️', th: 'WEIGHT TRAINING', en: 'WEIGHT TRAINING', url: WWW + 'products/weighttraining.html', kids: WT },
    { e: '🤸', th: 'BODYWEIGHT', en: 'BODYWEIGHT', url: ALLP, kids: [K.bw, K.abs, K.yoga, K.pilates] },
    { e: '🧊', th: 'Ice Bath อ่างน้ำแข็ง', en: 'Ice Bath', url: ALLP },
    { e: '🚴', th: 'จักรยานออกกำลังกาย', en: 'Exercise Bikes', url: ALLP, kids: [K.spin, K.rehab] },
    { e: '⚫', th: 'อุปกรณ์สำหรับ Hyrox (Hyrox Equipment)', en: 'Hyrox Equipment', url: ALLP },
    { e: '🔔', th: 'Functional Training', en: 'Functional Training', url: ALLP },
    { e: '🥊', th: 'Combat Sports Equipment', en: 'Combat Sports Equipment', url: ALLP, kids: [K.jj, K.bag] },
    { e: '🕹️', th: 'Innodigym', en: 'Innodigym', url: ALLP },
    { e: '🔴', th: 'Red Light Therapy', en: 'Red Light Therapy', url: ALLP },
    { e: '🧖', th: 'SAUNA', en: 'SAUNA', url: ALLP },
    { e: '🫧', th: 'Hyperbaric Oxygen Chamber', en: 'Hyperbaric Oxygen Chamber', url: ALLP }
  ];

  var FOOT = [
    { th: 'BODYWEIGHT', en: 'BODYWEIGHT', kids: [K.bw, K.abs, K.yoga, K.pilates] },
    { th: 'FUNCTIONAL TRAINING', en: 'FUNCTIONAL TRAINING', kids: [] },
    { th: 'WEIGHT TRAINING', en: 'WEIGHT TRAINING', kids: WT },
    { th: 'CARDIO', en: 'CARDIO', kids: [K.spin, K.rehab, K.elliptical, K.treadmill] },
    { th: 'FITNESS MAT', en: 'FITNESS MAT', kids: [K.mat] },
    { th: 'COMBAT SPORTS', en: 'COMBAT SPORTS', kids: [K.jj, K.bag] },
    { th: 'OTHER', en: 'OTHER', kids: [K.acc, K.caliper, K.mug] }
  ];

  var ALLCATS = [
    ['🏋️', 'Dumbbell', 'ดัมเบล'], ['🛋️', 'Exercise Bench', 'ม้านั่งออกกำลังกาย'], ['🚴', 'Exercise Bike', 'จักรยานออกกำลังกาย'],
    ['🏃', 'Treadmill', 'ลู่วิ่งไฟฟ้า'], ['🌀', 'Elliptical', 'เครื่องเดินวงรี'], ['🏠', 'Home Gym', 'ชุดโฮมยิม'],
    ['🔩', 'Olympic barbell', 'บาร์เบล'], ['⚙️', 'Weight Plate', 'แผ่นน้ำหนัก'], ['🟩', 'Floor Mat', 'แผ่นยางปูพื้น'],
    ['🥊', 'Boxing Equipment', 'อุปกรณ์มวย'], ['🧘', 'Pilates Machine', 'เครื่องพิลาทิส'], ['🏢', 'Commercial grade', 'สินค้าเกรดยิม']
  ];

  var KW = [
    { th: 'ม้านั่งออกกำลังกาย', en: 'weight bench' }, { th: 'แร็คยกน้ำหนัก', en: 'lifting rack' },
    { th: 'ม้านั่งปรับระดับ', en: 'adjustable bench' }, { th: 'Olympic Bench', en: 'Olympic Bench' },
    { th: 'Home Gym คอนโด', en: 'condo home gym' }, { th: 'เครื่องบริหารหน้าท้อง', en: 'abs machine' }
  ];

  H.data.WWW = WWW; H.data.ALLP = ALLP;
  H.data.MEGA = MEGA; H.data.FOOT = FOOT; H.data.ALLCATS = ALLCATS; H.data.KW = KW;
})(window.HFT);
