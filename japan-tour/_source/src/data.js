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

export const HOTELS = [
  { id: 'business', name: 'City Smart 3★', note: 'ใกล้สถานี เดินทางสะดวก', perNight: 2200 },
  { id: 'grand', name: 'Sakura Grand 5★', note: 'ห้องสวีทวิวฟูจิ ชั้นบนสุด', perNight: 6900 },
  { id: 'ryokan', name: 'เรียวกัง ฮานามิ 4★', note: 'ห้องเสื่อทาทามิ พร้อมออนเซ็นส่วนตัว', perNight: 5400 },
];

export const ROOMS = [
  { id: 'standard', name: 'Standard Twin', mult: 1 },
  { id: 'deluxe', name: 'Deluxe Fuji View', mult: 1.35 },
  { id: 'suite', name: 'Suite / Washitsu', mult: 1.9 },
];

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
