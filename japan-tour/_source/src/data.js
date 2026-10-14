// Demo content for the tour site. Prices are illustrative only.

export const AIRPORTS = {
  BKK: { code: 'BKK', name: 'สุวรรณภูมิ กรุงเทพฯ', lon: 100.75, lat: 13.69, country: 'TH' },
  DMK: { code: 'DMK', name: 'ดอนเมือง กรุงเทพฯ', lon: 100.6, lat: 13.91, country: 'TH' },
  CNX: { code: 'CNX', name: 'เชียงใหม่', lon: 98.97, lat: 18.77, country: 'TH' },
  HKT: { code: 'HKT', name: 'ภูเก็ต', lon: 98.3, lat: 8.11, country: 'TH' },
  NRT: { code: 'NRT', name: 'นาริตะ โตเกียว', lon: 140.39, lat: 35.77, country: 'JP' },
  HND: { code: 'HND', name: 'ฮาเนดะ โตเกียว', lon: 139.78, lat: 35.55, country: 'JP' },
  KIX: { code: 'KIX', name: 'คันไซ โอซาก้า', lon: 135.24, lat: 34.43, country: 'JP' },
  NGO: { code: 'NGO', name: 'ชูบุ นาโกย่า', lon: 136.8, lat: 34.86, country: 'JP' },
  FUK: { code: 'FUK', name: 'ฟุกุโอกะ', lon: 130.45, lat: 33.59, country: 'JP' },
  CTS: { code: 'CTS', name: 'ชิโตเสะ ซัปโปโร', lon: 141.69, lat: 42.78, country: 'JP' },
};

export const DEPARTURES = ['BKK', 'DMK', 'CNX', 'HKT'];
export const ARRIVALS = ['NRT', 'HND', 'KIX', 'NGO', 'FUK', 'CTS'];

export const PLACES = [
  { id: 'tokyo', en: 'Tokyo', name: 'โตเกียว ชิบูย่า & อาซากุสะ', jp: '東京', lon: 139.69, lat: 35.69, hours: 8, price: 1200, region: 'kanto' },
  { id: 'fuji', en: 'Fuji', name: 'ภูเขาไฟฟูจิ & คาวากุจิโกะ', jp: '富士山', lon: 138.73, lat: 35.4, hours: 7, price: 1800, region: 'kanto' },
  { id: 'hakone', en: 'Hakone', name: 'ฮาโกเน่ ออนเซ็น', jp: '箱根', lon: 139.1, lat: 35.23, hours: 6, price: 2200, region: 'kanto' },
  { id: 'kyoto', en: 'Kyoto', name: 'เกียวโต ฟูชิมิอินาริ', jp: '京都', lon: 135.77, lat: 35.01, hours: 8, price: 1500, region: 'kansai' },
  { id: 'nara', en: 'Nara', name: 'นารา สวนกวาง', jp: '奈良', lon: 135.84, lat: 34.68, hours: 5, price: 900, region: 'kansai' },
  { id: 'osaka', en: 'Osaka', name: 'โอซาก้า ปราสาท & โดทงโบริ', jp: '大阪', lon: 135.5, lat: 34.69, hours: 7, price: 1300, region: 'kansai' },
  { id: 'kanazawa', en: 'Kanazawa', name: 'คานาซาว่า & ชิราคาวาโกะ', jp: '白川郷', lon: 136.9, lat: 36.26, hours: 8, price: 2100, region: 'chubu' },
  { id: 'hiroshima', en: 'Hiroshima', name: 'ฮิโรชิม่า & มิยาจิม่า', jp: '宮島', lon: 132.32, lat: 34.3, hours: 7, price: 1700, region: 'chugoku' },
  { id: 'fukuoka', en: 'Fukuoka', name: 'ฟุกุโอกะ ยาไต', jp: '福岡', lon: 130.4, lat: 33.59, hours: 5, price: 900, region: 'kyushu' },
  { id: 'sapporo', en: 'Sapporo', name: 'ซัปโปโร & โอตารุ', jp: '札幌', lon: 141.2, lat: 43.1, hours: 8, price: 1600, region: 'hokkaido' },
  { id: 'furano', en: 'Furano', name: 'ฟุราโนะ ทุ่งลาเวนเดอร์', jp: '富良野', lon: 142.38, lat: 43.34, hours: 7, price: 1900, region: 'hokkaido' },
];

// Five stand-out stays along the route. All fictional (demo names and prices) at real locations.
const C = { free: 'ยกเลิกฟรีก่อนเข้าพัก 3 วัน', flex: 'ยกเลิกฟรีก่อนเข้าพัก 7 วัน หลังจากนั้นคิด 1 คืน', strict: 'ยกเลิกฟรีก่อนเข้าพัก 14 วัน (ห้องจำนวนจำกัด)' };
const A = { wifi: 'WiFi ความเร็วสูง', bf: 'อาหารเช้าบุฟเฟต์', kaiseki: 'อาหารค่ำไคเซกิเสิร์ฟในห้อง', jbf: 'อาหารเช้าแบบญี่ปุ่น', ac: 'เครื่องปรับอากาศ/ฮีตเตอร์', tv: 'สมาร์ตทีวี 55 นิ้ว', tub: 'อ่างอาบน้ำแยกฝักบัว', rain: 'ฝักบัวเรนชาวเวอร์', yukata: 'ชุดยูกาตะและรองเท้าเกี๊ยะ', tea: 'ชุดชงชาเขียว', coffee: 'เครื่องชงกาแฟแคปซูล', minibar: 'มินิบาร์', safe: 'ตู้นิรภัย', lounge: 'สิทธิ์เข้าเลานจ์ชั้นบน', onsen: 'อ่างออนเซ็นส่วนตัวกลางแจ้ง', pubonsen: 'ออนเซ็นรวมของที่พัก', balcony: 'ระเบียงส่วนตัว', garden: 'สวนส่วนตัว', hinoki: 'อ่างไม้ฮิโนกิ', kitchen: 'ครัวเล็กพร้อมอุปกรณ์', washer: 'เครื่องซักผ้า', desk: 'โต๊ะทำงาน', butler: 'บริการบัตเลอร์', pickup: 'รถรับส่งสถานี', bike: 'จักรยานให้ยืม' };
export const STAYS = [
  {
    id: 'tokyo', area: 'โตเกียว', short: 'ตึกสูงวิวทาวเวอร์', name: 'Akane Sky Tokyo', jp: '茜スカイ東京', stars: 5, score: 9.2, lon: 139.745, lat: 35.659,
    note: 'ห้องกระจกสูงจรดเพดาน วิวโตเกียวทาวเวอร์', text: 'โรงแรมตึกสูงย่านมินาโตะ ผนังกระจกจรดเพดานทุกห้อง ห้องฝั่งหน้าตึกหันเข้าหาโตเกียวทาวเวอร์ เดินถึงสถานีได้ในไม่กี่นาที เหมาะเป็นคืนแรกหลังลงเครื่อง',
    highlights: ['วิวโตเกียวทาวเวอร์', 'สกายบาร์ชั้นบนสุด', 'ใกล้สถานีรถไฟ', 'ไกด์ไทยรับที่ล็อบบี้'],
    rooms: [
      { id: 'tk-deluxe', name: 'Deluxe King', size: 32, bed: 'เตียงคิง 1 เตียง', guests: 2, view: 'วิวเมืองย่านมินาโตะ', bathText: 'อ่างอาบน้ำ ผนังกระจกเห็นห้องนอน', price: 5900, cancel: C.free, amenities: [A.wifi, A.bf, A.tub, A.tv, A.coffee, A.safe, A.desk] },
      { id: 'tk-twin', name: 'Premier Twin', size: 38, bed: 'เตียงเดี่ยว 2 เตียง', guests: 2, view: 'วิวโตเกียวทาวเวอร์เต็มบาน', bathText: 'อ่างอาบน้ำ ผนังกระจก', price: 6800, cancel: C.free, amenities: [A.wifi, A.bf, A.tub, A.tv, A.coffee, A.minibar, A.safe] },
      { id: 'tk-corner', name: 'Corner Suite', size: 68, bed: 'เตียงคิง 1 เตียง + โซฟา', guests: 3, living: true, view: 'วิวมุม 2 ด้าน ทาวเวอร์และอ่าวโตเกียว', bathText: 'อ่างอาบน้ำแยกฝักบัว อ่างล้างหน้าคู่', price: 11500, cancel: C.flex, amenities: [A.wifi, A.bf, A.lounge, A.tub, A.rain, A.tv, A.coffee, A.minibar, A.desk] },
      { id: 'tk-sky', name: 'Sky Suite', size: 110, bed: 'เตียงคิง 1 เตียง + ห้องนั่งเล่น', guests: 4, living: true, view: 'พาโนรามาโตเกียวจากชั้นสูงสุด', bathText: 'อ่างอาบน้ำริมหน้าต่าง เรนชาวเวอร์', price: 19800, cancel: C.strict, amenities: [A.wifi, A.bf, A.lounge, A.butler, A.tub, A.rain, A.tv, A.coffee, A.minibar, A.desk] },
    ],
  },
  {
    id: 'hakone', area: 'ฮาโกเนะ', short: 'เรียวกังริมทะเลสาบ', name: 'เรียวกัง ฮานามิ ทะเลสาบอาชิ', jp: '旅館 花見', stars: 4, score: 9.4, lon: 139.026, lat: 35.203,
    note: 'ห้องเสื่อทาทามิ พร้อมออนเซ็นส่วนตัว', text: 'เรียวกังไม้ริมทะเลสาบอาชิ ข้างโทริอิกลางน้ำ ห้องปูเสื่อทาทามิ นอนฟูก เสิร์ฟไคเซกิในห้อง ห้องระดับบนมีอ่างออนเซ็นไม้บนระเบียงส่วนตัว',
    highlights: ['ออนเซ็นส่วนตัวกลางแจ้ง', 'อาหารไคเซกิ', 'ริมทะเลสาบอาชิ', 'เห็นโทริอิกลางน้ำ'],
    rooms: [
      { id: 'hk-washitsu', name: 'ห้องญี่ปุ่น 10 เสื่อ', size: 34, bed: 'ฟูกญี่ปุ่น 2 ชุด', guests: 3, view: 'วิวสวนและทะเลสาบ', bathText: 'ห้องน้ำในตัว ใช้ออนเซ็นรวมของที่พัก', price: 6400, cancel: C.free, amenities: [A.wifi, A.jbf, A.kaiseki, A.pubonsen, A.yukata, A.tea, A.ac] },
      { id: 'hk-onsen', name: 'ห้องญี่ปุ่นพร้อมออนเซ็นส่วนตัว', size: 52, bed: 'ฟูกญี่ปุ่น 2 ชุด', guests: 3, onsen: true, view: 'วิวทะเลสาบอาชิจากอ่างออนเซ็น', bathText: 'อ่างไม้ฮิโนกิกลางแจ้ง น้ำแร่ธรรมชาติ', price: 9800, cancel: C.flex, amenities: [A.wifi, A.jbf, A.kaiseki, A.onsen, A.pubonsen, A.yukata, A.tea, A.ac] },
      { id: 'hk-wayo', name: 'ห้องญี่ปุ่นผสมตะวันตก', size: 64, bed: 'เตียงเตี้ย 2 เตียง', guests: 4, onsen: true, view: 'วิวทะเลสาบและภูเขา', bathText: 'อ่างออนเซ็นไม้กลางแจ้ง', price: 12500, cancel: C.flex, amenities: [A.wifi, A.jbf, A.kaiseki, A.onsen, A.pubonsen, A.yukata, A.tea, A.ac, A.tv] },
      { id: 'hk-hanare', name: 'เรือนแยก ฮานาเระ', size: 95, bed: 'เตียงเตี้ย 2 เตียง + ห้องนั่งเล่น', guests: 4, onsen: true, living: true, view: 'สวนส่วนตัวและทะเลสาบ', bathText: 'บ่อหินออนเซ็นขนาดใหญ่กลางแจ้ง', price: 21000, cancel: C.strict, amenities: [A.wifi, A.jbf, A.kaiseki, A.onsen, A.garden, A.butler, A.yukata, A.tea, A.ac, A.tv] },
    ],
  },
  {
    id: 'kawaguchiko', area: 'คาวากุจิโกะ', short: 'รีสอร์ตวิวฟูจิ', name: 'Sakura Grand Kawaguchiko', jp: 'さくらグランド河口湖', stars: 5, score: 9.5, lon: 138.77, lat: 35.52,
    note: 'ทุกห้องหันเข้าหาภูเขาไฟฟูจิ', text: 'รีสอร์ตริมฝั่งเหนือของทะเลสาบคาวากุจิโกะ ทุกห้องหันเข้าหาฟูจิ ห้องระดับบนมีระเบียงและอ่างออนเซ็นส่วนตัว ชมฟูจิสะท้อนน้ำยามเช้าได้จากเตียง',
    highlights: ['วิวฟูจิจากทุกห้อง', 'ระเบียงส่วนตัว', 'ออนเซ็นบนดาดฟ้า', 'ริมทะเลสาบ'],
    rooms: [
      { id: 'kw-superior', name: 'Superior Twin', size: 36, bed: 'เตียงเดี่ยว 2 เตียง', guests: 2, view: 'วิวฟูจิและทะเลสาบ', bathText: 'อ่างอาบน้ำ ผนังกระจก', price: 4900, cancel: C.free, amenities: [A.wifi, A.bf, A.pubonsen, A.tub, A.tv, A.coffee, A.safe] },
      { id: 'kw-deluxe', name: 'Deluxe Fuji View', size: 45, bed: 'เตียงคิง 1 เตียง', guests: 2, balcony: true, view: 'วิวฟูจิเต็มบานจากระเบียง', bathText: 'อ่างอาบน้ำ ผนังกระจก', price: 6900, cancel: C.free, amenities: [A.wifi, A.bf, A.balcony, A.pubonsen, A.tub, A.tv, A.coffee, A.minibar] },
      { id: 'kw-onsen', name: 'Onsen Suite', size: 72, bed: 'เตียงคิง 1 เตียง + โซฟา', guests: 3, balcony: true, onsen: true, living: true, view: 'วิวฟูจิจากอ่างออนเซ็นบนระเบียง', bathText: 'อ่างออนเซ็นไม้บนระเบียง เรนชาวเวอร์', price: 11900, cancel: C.flex, amenities: [A.wifi, A.bf, A.onsen, A.balcony, A.rain, A.tv, A.coffee, A.minibar, A.yukata] },
      { id: 'kw-sky', name: 'Fuji Sky Suite', size: 120, bed: 'เตียงคิง 1 เตียง + ห้องนั่งเล่น', guests: 4, balcony: true, onsen: true, living: true, view: 'พาโนรามาฟูจิและทะเลสาบจากชั้นบนสุด', bathText: 'อ่างออนเซ็นบนระเบียง เรนชาวเวอร์', price: 18500, cancel: C.strict, amenities: [A.wifi, A.bf, A.onsen, A.balcony, A.butler, A.lounge, A.rain, A.tv, A.coffee, A.minibar] },
    ],
  },
  {
    id: 'kyoto', area: 'เกียวโต', short: 'บ้านไม้มาจิยะ', name: 'Machiya Tsumugi Kyoto', jp: '町家 つむぎ', stars: 4, score: 9.3, lon: 135.778, lat: 35.0,
    note: 'บ้านไม้โบราณ มีสวนเล็กส่วนตัว', text: 'บ้านไม้มาจิยะอายุร้อยปีย่านฮิกาชิยามะ ปรับปรุงใหม่ทั้งหลัง พื้นไม้เข้ม คานเปลือย ระแนงไม้หน้าบ้าน และสวนสึโบะนิวะเล็ก ๆ พร้อมตะเกียงหิน',
    highlights: ['บ้านไม้ดั้งเดิม', 'สวนสึโบะนิวะส่วนตัว', 'อ่างไม้ฮิโนกิ', 'เดินถึงย่านกิออน'],
    rooms: [
      { id: 'ky-kura', name: 'ห้องคุระ', size: 28, bed: 'ฟูกญี่ปุ่น 1 ชุดบนยกพื้นทาทามิ', guests: 2, view: 'สวนสึโบะนิวะ', bathText: 'อ่างไม้ฮิโนกิ', price: 5200, cancel: C.free, amenities: [A.wifi, A.jbf, A.hinoki, A.garden, A.yukata, A.tea, A.ac, A.bike] },
      { id: 'ky-niwa', name: 'ห้องนิวะ วิวสวน', size: 42, bed: 'ฟูกญี่ปุ่น 2 ชุดบนยกพื้นทาทามิ', guests: 3, living: true, view: 'สวนสึโบะนิวะและต้นเมเปิล', bathText: 'อ่างไม้ฮิโนกิ', price: 7400, cancel: C.flex, amenities: [A.wifi, A.jbf, A.hinoki, A.garden, A.yukata, A.tea, A.ac, A.bike, A.coffee] },
      { id: 'ky-maisonette', name: 'เหมาทั้งหลัง', size: 75, bed: 'ฟูกญี่ปุ่น 2 ชุด + โซฟา', guests: 5, living: true, big: true, view: 'สวนสึโบะนิวะเต็มหน้ากว้าง', bathText: 'ห้องอาบน้ำอ่างไม้ฮิโนกิขนาดใหญ่', price: 12800, cancel: C.strict, amenities: [A.wifi, A.jbf, A.hinoki, A.garden, A.kitchen, A.washer, A.yukata, A.tea, A.ac, A.bike] },
    ],
  },
  {
    id: 'osaka', area: 'โอซาก้า', short: 'วิวปราสาท', name: 'Kinjo View Osaka', jp: '金城ビュー大阪', stars: 4, score: 8.9, lon: 135.526, lat: 34.687,
    note: 'วิวปราสาทโอซาก้า คุ้มค่า ใกล้สถานี', text: 'โรงแรมริมสวนปราสาทโอซาก้า ห้องฝั่งปราสาทมองเห็นหอคอยหลังคาเขียวและคูน้ำ ราคาคุ้มค่า เดินทางไปโดทงโบริและคันไซได้สะดวก',
    highlights: ['วิวปราสาทโอซาก้า', 'ห้องครอบครัว 4 ท่าน', 'ใกล้สถานี', 'คืนสุดท้ายก่อนบินกลับ'],
    rooms: [
      { id: 'os-standard', name: 'Standard Queen', size: 26, bed: 'เตียงควีน 1 เตียง', guests: 2, view: 'วิวเมือง', bathText: 'อ่างอาบน้ำ', price: 3200, cancel: C.free, amenities: [A.wifi, A.bf, A.tub, A.tv, A.safe, A.desk] },
      { id: 'os-castle', name: 'Castle View King', size: 34, bed: 'เตียงคิง 1 เตียง', guests: 2, view: 'วิวปราสาทโอซาก้า', bathText: 'อ่างอาบน้ำ ผนังกระจก', price: 4300, cancel: C.free, amenities: [A.wifi, A.bf, A.tub, A.tv, A.coffee, A.safe, A.desk] },
      { id: 'os-family', name: 'Family Room', size: 48, bed: 'เตียงใหญ่ 2 เตียง', guests: 4, view: 'วิวปราสาทและสวน', bathText: 'อ่างอาบน้ำ', price: 5900, cancel: C.free, amenities: [A.wifi, A.bf, A.tub, A.tv, A.coffee, A.safe, A.washer] },
      { id: 'os-suite', name: 'Castle Suite', size: 78, bed: 'เตียงคิง 1 เตียง + ห้องนั่งเล่น', guests: 3, living: true, view: 'วิวปราสาทเต็มบานจากห้องนั่งเล่น', bathText: 'อ่างอาบน้ำแยกฝักบัว', price: 9400, cancel: C.flex, amenities: [A.wifi, A.bf, A.lounge, A.tub, A.rain, A.tv, A.coffee, A.minibar, A.desk] },
    ],
  },
];
export const SECTIONS = {
  bed: { name: 'ห้องนอน', note: 'พื้นที่นอน เตียงและมุมหัวเตียง' },
  bath: { name: 'ห้องน้ำ', note: 'ห้องน้ำและอ่างอาบน้ำของห้องนี้' },
  living: { name: 'นั่งเล่น', note: 'มุมนั่งเล่นและโต๊ะ' },
  view: { name: 'วิวจากห้อง', note: 'วิวจริงจากหน้าต่าง ณ ตำแหน่งที่พัก ลองเปลี่ยนเวลาในฉากเป็นเย็นหรือกลางคืนได้' },
};
// kept for the tour builder's list of properties
export const HOTELS = STAYS.map((s) => ({ id: s.id, name: `${s.name} ${s.stars}★`, note: `${s.area} · ${s.note}`, perNight: Math.min(...s.rooms.map((r) => r.price)) }));

export const INSURANCE = [
  { id: 'none', name: 'ไม่ซื้อ', price: 0, medical: '-', luggage: '-', delay: '-' },
  { id: 'basic', name: 'Basic', price: 390, medical: '1 ล้านบาท', luggage: '10,000 บาท', delay: '2,000 บาท' },
  { id: 'plus', name: 'Plus', price: 690, medical: '3 ล้านบาท', luggage: '30,000 บาท', delay: '5,000 บาท' },
  { id: 'premium', name: 'Premium', price: 1190, medical: '5 ล้านบาท', luggage: '60,000 บาท', delay: '10,000 บาท' },
];

export const ADDONS = [
  { id: 'wifi', name: 'Pocket WiFi / eSIM', price: 120, per: 'day' },
  { id: 'jrpass', name: 'JR Pass 7 วัน', price: 11500, per: 'trip' },
  { id: 'transfer', name: 'รถรับส่งสนามบินส่วนตัว', price: 2800, per: 'trip' },
  { id: 'kimono', name: 'เช่าชุดกิโมโน + ช่างภาพ', price: 1900, per: 'trip' },
];

// Base round-trip fare by rough distance, THB per person.
export function flightFare(dep, arr) {
  const a = AIRPORTS[dep], b = AIRPORTS[arr];
  const d = Math.hypot(a.lon - b.lon, a.lat - b.lat);
  return Math.round((9000 + d * 220) / 100) * 100;
}

// Great-circle distance in km.
export function distanceKm(a, b) {
  const R = 6371, toR = Math.PI / 180;
  const dLat = (b.lat - a.lat) * toR, dLon = (b.lon - a.lon) * toR;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Rough coastlines (lon, lat) for the hologram map.
export const COASTS = {
  hokkaido: [[141.2,41.8],[140.0,41.4],[139.9,42.3],[140.5,43.2],[141.4,43.3],[141.7,44.3],[141.9,45.4],[142.9,44.7],[144.3,44.1],[145.3,44.3],[145.8,43.4],[145.2,43.0],[143.9,42.9],[143.3,42.0],[142.0,42.5]],
  honshu: [[141.4,41.4],[141.5,40.5],[142.0,39.6],[141.6,38.4],[141.0,38.2],[141.0,37.0],[140.8,36.0],[140.8,35.7],[140.4,35.2],[139.8,34.9],[139.7,35.3],[139.1,35.1],[138.8,34.6],[138.2,34.6],[137.3,34.6],[136.9,34.3],[136.0,33.5],[135.4,33.6],[135.1,34.3],[134.2,34.6],[133.0,34.4],[132.1,33.9],[130.9,34.0],[131.2,34.5],[132.4,35.4],[133.3,35.6],[134.4,35.6],[135.4,35.6],[136.0,35.9],[136.7,36.9],[137.3,36.8],[137.4,37.5],[138.5,37.4],[139.4,38.1],[139.9,39.0],[140.0,40.2],[140.3,41.2]],
  shikoku: [[132.5,33.2],[133.0,32.7],[133.7,33.5],[134.3,33.3],[134.7,33.8],[134.6,34.2],[133.6,34.4],[132.9,34.1],[132.0,33.9]],
  kyushu: [[129.8,33.4],[130.4,33.9],[131.0,33.9],[131.7,33.3],[131.9,32.6],[131.4,31.4],[130.7,31.0],[130.2,31.3],[130.4,32.1],[130.0,32.8],[129.6,33.0]],
  thailand: [[97.5,18.5],[99.0,20.4],[100.5,20.3],[101.2,19.5],[102.1,18.2],[103.5,18.3],[104.8,17.0],[105.6,15.7],[105.2,14.3],[102.5,13.6],[102.4,12.2],[100.9,12.7],[100.0,13.5],[99.1,10.5],[99.6,9.0],[100.4,7.4],[101.0,6.8],[100.2,6.4],[98.5,8.0],[98.3,9.2],[98.7,10.6],[99.2,12.0],[98.5,13.2],[98.2,15.1],[97.4,16.8]],
};
