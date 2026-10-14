// Akane Sky Tokyo: the tower's storeys, floor plates and rooms, with no three.js or DOM, so the page,
// the Blender script's numbers and the tests all share one layout. Local metres: x east, z south,
// y up from the 1F floor; origin at the tower footprint's centroid.
//
// Real data (research/hotel-deep-dive-spec.md, OSM way 87439168): the footprint ring, 33 hotel floors
// plus B1/B2, eave 99.4 m and top 104.4 m, the floor bands and what is on each floor, every room type
// with its m² and floor range, and the room counts per band (about 22 per Park floor, 21 per Panoramic
// floor, 17 on the club floors). Where each room sits on a floor is NOT published (the real plans are
// images only), so the arrangement below is a worked example that keeps those counts.
import GEO from './akane-geo.json' with { type: 'json' };

export const RING = GEO.tower.map(([x, z]) => ({ x, z }));
export const ROOM_DEPTH = 7.8, CORRIDOR = 1.8, EAVE = 99.4, TOP = 104.4;

// ---------- storeys (hotel numbering; the legal count differs, see spec 1.1) ----------
const FLOOR_H = { '-2': 10, '-1': 5, 1: 5, 2: 4, 33: 3.4 }; // B2 holds a ballroom with a 9.9 m ceiling
export const STOREYS = [-2, -1, ...Array.from({ length: 33 }, (_, i) => i + 1)];
export const floorH = (k) => FLOOR_H[k] ?? 2.9;
export function floorY(k) {
  if (k < 0) return k === -1 ? -5 : -15;
  let y = 0; for (let f = 1; f < k; f++) y += floorH(f); return y;
}
export const floorLabel = (k) => (k < 0 ? `B${-k}` : `${k}F`);
export const band = (k) => (k <= -1 ? 'base' : k === 1 ? 'lobby' : k === 2 ? 'garden' : k <= 18 ? 'park' : k <= 28 ? 'pano' : k <= 31 ? 'club' : k === 32 ? 'suite' : 'sky');

// ---------- plan geometry ----------
const sub = (a, b) => ({ x: a.x - b.x, z: a.z - b.z }), add = (a, b) => ({ x: a.x + b.x, z: a.z + b.z }), mul = (a, s) => ({ x: a.x * s, z: a.z * s });
const dot = (a, b) => a.x * b.x + a.z * b.z, len = (a) => Math.hypot(a.x, a.z), unit = (a) => mul(a, 1 / len(a));
const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t });
// outward normal of the segment a->b (the footprint contains the origin)
const outward = (a, b) => { const d = unit(sub(b, a)); let n = { x: d.z, z: -d.x }; if (dot(n, lerp(a, b, 0.5)) < 0) n = mul(n, -1); return n; };
const meet = (p, d, q, e) => { const den = d.x * e.z - d.z * e.x, t = ((q.x - p.x) * e.z - (q.z - p.z) * e.x) / den; return add(p, mul(d, t)); };
const proj = (p, a, b) => { const d = unit(sub(b, a)); return add(a, mul(d, dot(sub(p, a), d))); };
// compass bearing (0 = north, clockwise) of a direction in this frame
export const bearingOf = (n) => Math.round(((Math.atan2(n.x, -n.z) * 180) / Math.PI + 360) % 360);

// The plate's six faces in ring order: two chamfered corners, three long faces, and the south tip
// (three short segments, treated as one face and given to stairs and service rooms).
const M = [
  { id: 'nw', a: 0, b: 1, kind: 'corner' }, { id: 'sw', a: 1, b: 2, kind: 'long', bays: 6 }, { id: 's', a: 2, b: 5, kind: 'core' },
  { id: 'se', a: 5, b: 6, kind: 'long', bays: 5 }, { id: 'ne', a: 6, b: 7, kind: 'corner' }, { id: 'n', a: 7, b: 0, kind: 'long', bays: 6 },
].map((m) => ({ ...m, A: RING[m.a], B: RING[m.b], n: outward(RING[m.a], RING[m.b]), dir: unit(sub(RING[m.b], RING[m.a])) }));
const inset = (d) => M.map((m, i) => { const p = M[(i + 5) % 6]; return meet(add(p.A, mul(p.n, -d)), p.dir, add(m.A, mul(m.n, -d)), m.dir); });
export const CORRIDOR_RING = inset(ROOM_DEPTH); // corridor's outer wall (inner vertex at the start of each face)
export const ATRIUM = inset(ROOM_DEPTH + CORRIDOR); // the central atrium, open B1-32F
export const FACES = M.map(({ id, kind, n }) => ({ id, kind, bearing: bearingOf(n), n }));

const area = (pts) => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p.x * q.z - q.x * p.z; }, 0)) / 2;
const centre = (pts) => mul(pts.reduce((s, p) => add(s, p), { x: 0, z: 0 }), 1 / pts.length);

// The cells every guest floor is cut into, in ring order. Long faces are split into equal bays square
// to the facade; each chamfered corner gets three cells along the chamfer, and the wedges left behind
// them, like the south tip, hold stairs and service rooms.
export const CELLS = (() => {
  const Q = CORRIDOR_RING, cells = [];
  const ends = M.map((m, i) => m.kind === 'long' ? { a: proj(Q[i], m.A, m.B), b: proj(Q[(i + 1) % 6], m.A, m.B) } : null);
  const band = (m, o0, o1) => [o0, o1, add(o1, mul(m.n, -ROOM_DEPTH)), add(o0, mul(m.n, -ROOM_DEPTH))];
  M.forEach((m, i) => {
    if (m.kind === 'long') {
      const { a, b } = ends[i];
      for (let j = 0; j < m.bays; j++) { const o0 = lerp(a, b, j / m.bays), o1 = lerp(a, b, (j + 1) / m.bays); cells.push({ face: m.id, poly: band(m, o0, o1), n: m.n, width: len(sub(o1, o0)) }); }
      return;
    }
    const p = ends[(i + 5) % 6], q = ends[(i + 1) % 6], Qa = Q[i], Qb = Q[(i + 1) % 6];
    if (m.kind === 'core') { cells.push({ face: m.id, core: true, poly: [p.b, RING[2], RING[3], RING[4], RING[5], q.a, Qb, Qa], n: m.n }); return; }
    const inA = add(m.A, mul(m.n, -ROOM_DEPTH)), inB = add(m.B, mul(m.n, -ROOM_DEPTH));
    cells.push({ face: m.id, core: true, poly: [p.b, m.A, inA, Qa], n: m.n });
    for (let j = 0; j < 3; j++) { const o0 = lerp(m.A, m.B, j / 3), o1 = lerp(m.A, m.B, (j + 1) / 3); cells.push({ face: m.id, poly: band(m, o0, o1), n: m.n, width: len(sub(o1, o0)) }); }
    cells.push({ face: m.id, core: true, poly: [inB, m.B, q.a, Qb], n: m.n });
  });
  return cells.map((c) => ({ ...c, area: area(c.poly), c: centre(c.poly), bearing: bearingOf(c.n) })).filter((c) => c.area > 1); // corner wedges come out empty on this plan
})();
const ROOMS = CELLS.filter((c) => !c.core); // 23 cells; index i -> unit number i + 1

// ---------- room types (real names, m², beds, floors; prices and availability are samples) ----------
export const TYPES = {
  'park-twin': { name: 'Park Twin', th: 'ห้องทวินชั้นพาร์ก', m2: 28.7, bed: 'เตียงเดี่ยว 2 เตียง 115×203 ซม.', guests: 2, floors: '3–18', room: 'tk-deluxe', price: 6200, note: 'มีแบบฝั่งโตเกียวทาวเวอร์' },
  'deluxe-twin': { name: 'Deluxe Twin', th: 'ห้องดีลักซ์ทวิน มีระเบียง', m2: 38, bed: 'เตียงเดี่ยว 2 เตียง 115×203 ซม.', guests: 3, floors: '3–18', room: 'tk-twin', price: 7400, balcony: true, note: 'มีแบบฝั่งโตเกียวทาวเวอร์' },
  'corner-king': { name: 'Corner King', th: 'ห้องมุม เตียงคิง', m2: 34.4, bed: 'เตียงคิง 180×203 ซม.', guests: 2, floors: '3–18', room: 'tk-corner', price: 8600, bath: 'อ่างอาบน้ำริมหน้าต่างกว้าง' },
  connecting: { name: 'Connecting Room', th: 'ห้องเชื่อมต่อ (ดีลักซ์ทวิน 2 ห้อง)', m2: 76, bed: 'เตียงเดี่ยว 4 เตียง', guests: 6, floors: '3–10', room: 'tk-twin', price: 14800, balcony: true, note: 'เหมาะกับครอบครัวและกรุ๊ป' },
  universal: { name: 'Universal Room', th: 'ห้องสำหรับผู้ใช้วีลแชร์', m2: 38, bed: 'เตียง 2 เตียง 116×205 ซม. สูง 48 ซม.', guests: 2, floors: '3', room: 'tk-twin', price: 7400, balcony: true, bath: 'ขอบอ่าง 42 ซม. ราวจับ 55 ซม. เก้าอี้อาบน้ำ ประตู 82 ซม.' },
  'park-suite': { name: 'Park Suite', th: 'พาร์กสวีท มีระเบียง', m2: 76.4, bed: 'พักได้ 4 คน', guests: 4, floors: '11–18', room: 'tk-sky', price: 16800, balcony: true },
  'pano-twin': { name: 'Panoramic Twin', th: 'ห้องทวินชั้นพาโนรามิก มีระเบียง', m2: 38, bed: 'เตียงเดี่ยว 2 เตียง 120×203 ซม.', guests: 2, floors: '19–28', room: 'tk-twin', price: 8900, balcony: true, note: 'เตียงและโต๊ะหันเข้าหน้าต่าง' },
  'pano-king': { name: 'Panoramic King', th: 'ห้องคิงชั้นพาโนรามิก มีระเบียง', m2: 38, bed: 'เตียงคิง 240×203 ซม.', guests: 2, floors: '20–27', room: 'tk-deluxe', price: 9200, balcony: true, note: 'เตียงและโต๊ะหันเข้าหน้าต่าง' },
  'pano-corner': { name: 'Panoramic Corner King', th: 'ห้องมุมชั้นพาโนรามิก', m2: 37.2, bed: 'เตียงคิง', guests: 2, floors: '19–28', room: 'tk-corner', price: 10400, bath: 'อ่างอาบน้ำริมหน้าต่าง' },
  'jr-suite': { name: 'Panoramic Jr Suite', th: 'จูเนียร์สวีทชั้นพาโนรามิก', m2: 50.1, bed: 'เตียงคิง 240×203 หรือเตียงเดี่ยว 2 เตียง', guests: 3, floors: '19–28', room: 'tk-corner', price: 13500 },
  'prince-suite': { name: 'Prince Suite', th: 'ปรินซ์สวีท มีระเบียง', m2: 113.3, bed: 'เตียงเดี่ยว 2 เตียง 120×203 ซม.', guests: 4, floors: '19–28', room: 'tk-sky', price: 32000, balcony: true },
  'premium-king': { name: 'Premium King', th: 'ห้องพรีเมียมคิง ชั้นคลับ มีระเบียง', m2: 38, bed: 'เตียงคิง 200×203 ซม.', guests: 2, floors: '29–31', room: 'tk-deluxe', price: 12800, balcony: true, club: true },
  'premium-corner': { name: 'Premium Corner King', th: 'ห้องมุมพรีเมียม ฝั่งโตเกียวทาวเวอร์', m2: 37.2, bed: 'เตียงคิง 180×203 ซม.', guests: 2, floors: '29–31', room: 'tk-corner', price: 14200, club: true, bath: 'อ่างอาบน้ำริมหน้าต่าง' },
  'princess-suite': { name: 'Princess Suite', th: 'ปรินเซสสวีท มีระเบียง', m2: 113.3, bed: 'ห้องนอนและห้องนั่งเล่นแยก', guests: 4, floors: '29–31', room: 'tk-sky', price: 38000, balcony: true, club: true, note: 'มองลงเห็นสวนชิบะ' },
  'tower-view-suite': { name: 'Tower View Suite', th: 'ทาวเวอร์วิวสวีท', m2: 135, bed: 'เตียงคิง 240×203 ซม.', guests: 3, floors: '32', room: 'tk-sky', price: 68000, club: true, note: 'เห็นโตเกียวทาวเวอร์จากห้องนั่งเล่น ห้องนอน และห้องน้ำ' },
  'panorama-suite': { name: 'Panorama Suite', th: 'พาโนรามาสวีท', m2: 118, bed: 'เตียงคิง 240×203 ซม. พักได้ 5 คน', guests: 5, floors: '32', room: 'tk-sky', price: 52000, club: true, note: 'เห็นภูเขาไฟฟูจิในวันฟ้าใส' },
  'familia-suite': { name: 'Familia Suite', th: 'แฟมิเลียสวีท มีครัว', m2: 70, bed: 'เตียงคิง 240×203 ซม. พักได้ 4 คน', guests: 4, floors: '32', room: 'tk-sky', price: 26000, club: true },
  'view-bath-suite': { name: 'View Bath Suite', th: 'วิวบาธสวีท', m2: 70, bed: 'เตียงคิง 240×203 ซม. พักได้ 3 คน', guests: 3, floors: '32', room: 'tk-corner', price: 29000, club: true, bath: 'อ่างน้ำวนหันออกวิวเมือง' },
  'garden-a': { name: 'Garden Suite A', th: 'การ์เดนสวีท A ญี่ปุ่นผสมตะวันตก', m2: 114.1, bed: 'พักได้ 6 คน', guests: 6, floors: '2', room: 'tk-sky', price: 36000, bath: 'อ่างน้ำวน' },
  'garden-b': { name: 'Garden Suite B', th: 'การ์เดนสวีท B ห้องเสื่อตาตามิและห้องนอน', m2: 91.8, bed: 'ห้องตาตามิ + เตียง', guests: 5, floors: '2', room: 'tk-sky', price: 32000 },
  'garden-c': { name: 'Garden Suite C', th: 'การ์เดนสวีท C', m2: 76, bed: 'พักได้ 4 คน', guests: 4, floors: '2', room: 'tk-sky', price: 29000, note: 'บรรยากาศวัดโซโจจิและสวนชิบะ' },
  'garden-d': { name: 'Garden Suite D', th: 'การ์เดนสวีท D ห้องตาตามิ', m2: 72.4, bed: 'ห้องตาตามิ', guests: 4, floors: '2', room: 'tk-sky', price: 28000 },
};

// ---------- which cell holds what on each floor (example arrangement, real counts) ----------
// Unit numbers in ring order: 1-3 NW corner, 4-9 SW face, 10-14 SE face, 15-17 NE corner, 18-23 N face (east to west).
const Z = (name, cells, extra = {}) => ({ zone: true, name, cells, ...extra });
const span = (type, cells) => ({ type, cells });
function plan(k) {
  const b = band(k), out = [], take = new Set();
  const put = (e) => { e.cells.forEach((c) => take.add(c)); out.push(e); };
  const rest = (fn) => { for (let c = 1; c <= 23; c++) if (!take.has(c)) put(span(fn(c), [c])); };
  if (b === 'park') {
    put(span(k <= 10 ? 'connecting' : 'park-suite', k <= 10 ? [10, 11] : [13, 14]));
    if (k === 3) put(span('universal', [4]));
    for (const c of [1, 3, 15, 17]) put(span('corner-king', [c]));
    rest((c) => (c % 2 ? 'park-twin' : 'deluxe-twin'));
  } else if (b === 'pano') {
    put(span('prince-suite', [4, 5, 6])); put(span('jr-suite', [14]));
    for (const c of [1, 3, 15, 17]) put(span('pano-corner', [c]));
    rest((c) => (k >= 20 && k <= 27 && c % 2 === 0 ? 'pano-king' : 'pano-twin'));
  } else if (b === 'club') {
    put(span('princess-suite', [10, 11, 12])); put(span('premium-corner', [1])); put(span('premium-corner', [3]));
    put(Z('ห้องพักพนักงานคลับและห้องเก็บของ', [16], { quiet: true }));
    rest(() => 'premium-king');
  } else if (b === 'suite') {
    put(span('tower-view-suite', [1, 2, 3])); put(span('panorama-suite', [4, 5, 6]));
    put({ ...span('familia-suite', [7, 8]), tag: 'A' }); put({ ...span('familia-suite', [10, 11]), tag: 'B' });
    put(span('view-bath-suite', [15, 16]));
    put(Z('Premium Club Lounge 184 ม² · เช็กอินชั้นคลับ', [18, 19, 20, 21, 22, 23], { hours: '07:00–22:00 (โซนที่นั่งจองถึง 23:00)', lounge: true }));
    put(Z('ห้องประชุมและส่วนบริการของคลับ (ไม่มีข้อมูลผัง)', [9, 12, 13, 14, 17], { quiet: true }));
  } else if (b === 'sky') {
    put(Z('Stellar Garden บาร์ 84 ที่นั่ง (73 ที่นั่งฝั่งทาวเวอร์)', [18, 19, 20, 21, 22, 23, 1, 2, 3], { hours: 'บาร์ 17:00–01:00', sky: true }));
    put(Z('Stellar Garden ห้องอาหาร 116 ที่นั่ง', [4, 5, 6, 7, 8, 9], { hours: 'อาหารเช้า 07:00–10:30 · น้ำชา 12:00–16:30 · มื้อค่ำ 17:00–22:00' }));
    put(Z('Brise Verte ห้องอาหารส่วนตัว 4 ห้อง 26 ที่นั่ง', [15, 16, 17], { hours: '12:00–15:00 / 17:30–22:00' }));
    put(Z('Sky Banquet 184 ม²', [10, 11, 12, 13, 14]));
  } else if (b === 'garden') {
    put(span('garden-a', [4, 5, 6])); put(span('garden-b', [7, 8])); put(span('garden-d', [10, 11])); put(span('garden-c', [15, 16]));
    put(Z('ห้องพิธีศาลเจ้าชินเมย์ 81 ม²', [18, 19])); put(Z('ทางเดินสวน Prince Shiba Park (ระดับชั้น 2)', [20, 21, 22, 23, 1, 2, 3], { open: true }));
    put(Z('ห้องจัดเลี้ยงและทางเดิน', [9, 12, 13, 14, 17], { quiet: true }));
  } else if (b === 'lobby') {
    put(Z('Lobby Lounge 125 ที่นั่ง หันหาน้ำตกและโตเกียวทาวเวอร์', [18, 19, 20, 21, 22], { hours: 'จ–ศ 10:00–20:00 · ส/นักขัตฯ 09:00–20:00' }));
    put(Z('Melody Line ห้องจัดงาน 80 ที่นั่ง', [4, 5, 6])); put(Z('ทางเข้าหลักฝั่งใต้ และเคาน์เตอร์ต้อนรับ 24 ชม.', [9, 10], { desk: true }));
    put(Z('THE SHOP at the Park · Boulangerie Tokyo · Abiste', [11, 12, 13, 14], { hours: '10:00–19:00 / 10:00–20:00 / 10:30–19:30' }));
    put(Z('โถงต้อนรับ Forest Greeting', [23, 1, 2, 3, 7, 8, 15, 16, 17], { open: true }));
  } else if (k === -1) {
    put(Z('ชิบะซากุระ (ไคเซกิ) · ซูชิฮามาชิบะ · เทมปุระเท็นชิบะ', [1, 2, 3, 4, 5, 6, 7, 8, 9], { hours: '11:30–15:00 / 17:00–22:00' }));
    put(Z('โยเมเด็น (อาหารจีน) · สเต๊กเฮาส์คัตสึระ', [10, 11, 12, 13, 14]));
    put(Z('ยากิโทริโทริชิบะ · บาร์โมคุเร็น · ปาร์ตี้รูม', [15, 16, 17, 18, 19, 20, 21, 22, 23], { hours: 'โมคุเร็น 17:00–22:30 ปิด ส–จ' }));
  } else {
    put(Z('Spa & Fitness: ออนเซ็นธรรมชาติ สระว่ายน้ำ 25 ม. ซาวน่า ยิม', [18, 19, 20, 21, 22, 23, 1, 2, 3], { hours: '06:00–22:00 (เข้าครั้งสุดท้าย 21:30)' }));
    put(Z('โบว์ลิ่ง 12 เลน · Lawson · ร้านบริการ', [4, 5, 6, 7, 8, 9], { hours: 'โบว์ลิ่ง จ–ศ 13:00–21:00 · Lawson 07:00–23:00' }));
    put(Z('Ballroom และ Convention Hall 2,394 ม² เพดาน 9.9 ม.', [10, 11, 12, 13, 14, 15, 16, 17]));
  }
  return out;
}

// small deterministic hash for the sample availability
const hash = (a, b) => { let h = (a * 73856093) ^ (b * 19349663); h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };

// Everything on floor k: rooms (units) and named zones, each with its cells' polygons.
export function floorPlan(k) {
  return plan(k).map((e) => {
    const cells = e.cells.map((c) => ROOMS[c - 1]);
    const no = e.type ? k * 100 + e.cells[0] : null;
    const n = cells.reduce((s, c) => add(s, c.n), { x: 0, z: 0 }), dirN = unit(n);
    const u = { ...e, k, no, cells, polys: cells.map((c) => c.poly), area: cells.reduce((s, c) => s + c.area, 0), c: centre(cells.map((c) => c.c)), n: dirN, bearing: bearingOf(dirN) };
    if (e.type) { u.t = TYPES[e.type]; u.free = hash(k, e.cells[0]) > 0.34; u.smoking = k === 25; }
    return u;
  });
}
export const unitsOn = (k) => floorPlan(k).filter((u) => u.type);
export function findUnit(no) { const k = Math.floor(no / 100); return unitsOn(k).find((u) => u.no === no) || null; }

// What a room on face bearing `deg` looks at: the real places within 55° either side, nearest first.
export function viewsFor(deg, k = 20) {
  const diff = (a) => Math.abs(((a - deg + 540) % 360) - 180);
  return GEO.far.filter((f) => diff(f.deg) <= 55 && !(f.km > 5 && k < 8)).sort((a, b) => diff(a.deg) - diff(b.deg)).map((f) => ({ ...f, off: diff(f.deg) }));
}
export const towerView = (deg) => viewsFor(deg).some((f) => f.name === 'โตเกียวทาวเวอร์' && f.off <= 50);
export const COMPASS = (deg) => ['เหนือ', 'ตะวันออกเฉียงเหนือ', 'ตะวันออก', 'ตะวันออกเฉียงใต้', 'ใต้', 'ตะวันตกเฉียงใต้', 'ตะวันตก', 'ตะวันตกเฉียงเหนือ'][Math.round(deg / 45) % 8];
export { GEO };
