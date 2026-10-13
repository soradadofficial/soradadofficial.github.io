import { STAYS, SECTIONS } from './data.js';

// Stays browser: pick a property, read it like a booking site, then step into any room in 3D.
// Rooms are Blender-built .glb files loaded only when opened; they sit in the world at the
// property's real location, so the view through the window is the real landscape.
const fmt = (n) => n.toLocaleString('th-TH');
const $ = (s) => document.querySelector(s);

// Simple floor plan drawn from the same layout rules the Blender script uses
function floorPlan(meta, room) {
  const { w, d, style } = meta, k = 190 / Math.max(w, d + 3), W = w * k, D = d * k, ox = (210 - W) / 2, oy = 12;
  const r = (x, y, ww, hh, cls, label = '') => `<rect class="${cls}" x="${(ox + x * k).toFixed(1)}" y="${(oy + y * k).toFixed(1)}" width="${(ww * k).toFixed(1)}" height="${(hh * k).toFixed(1)}" rx="2"/>${label ? `<text x="${(ox + (x + ww / 2) * k).toFixed(1)}" y="${(oy + (y + hh / 2) * k + 3).toFixed(1)}">${label}</text>` : ''}`;
  let s = r(0, 0, w, d, 'fp-room');
  if (style === 'western') {
    const bw = Math.min(2.7, w * 0.44), bd = Math.min(3.1, d * 0.42);
    s += r(0, 0, bw, bd, 'fp-wet', 'ห้องน้ำ') + r(w - 2.2, bd + 0.3, 2.1, Math.min(2.6, d - bd - 2.6), 'fp-bed', 'เตียง');
    s += r(0.3, d - 2.6, w * 0.5, 2.2, 'fp-zone', room.living ? 'นั่งเล่น' : 'มุมนั่ง');
    if (room.balcony) s += r(0, d, w, 1.9, 'fp-out', 'ระเบียง');
  } else if (style === 'washitsu') {
    s += r(0.2, 0.3, 2.4, 2.8, 'fp-bed', 'ฟูก') + r(w / 2 - 0.4, d / 2 - 1.4, 2.2, 1.6, 'fp-zone', 'โต๊ะน้ำชา') + r(0, d - 1.25, w, 1.25, 'fp-zone', 'เอ็นกาวะ');
    s += r(-0.3, d, w + 0.6, 2.8, 'fp-out', room.onsen ? 'ออนเซ็นส่วนตัว' : 'ระเบียงไม้');
  } else {
    const pd = Math.min(3.0, d * 0.42);
    s += r(0, 0, room.big ? w * 0.55 : w, pd, 'fp-bed', 'ยกพื้นทาทามิ') + (room.big ? r(w * 0.55, 0, w * 0.45, pd, 'fp-wet', 'อ่างไม้ฮิโนกิ') : r(w - 1.6, pd + 0.4, 1.5, 1.0, 'fp-wet', 'อ่าง'));
    s += r(0.3, d - 3, w * 0.55, 2.4, 'fp-zone', 'นั่งเล่น') + r(0, d, w, 2.6, 'fp-out', 'สวนสึโบะนิวะ');
  }
  s += `<line class="fp-win" x1="${ox}" y1="${oy + D}" x2="${ox + W}" y2="${oy + D}"/>`;
  return `<svg class="floorplan" viewBox="0 0 210 ${(oy * 2 + (d + 3) * k).toFixed(0)}" role="img" aria-label="ผังห้อง ${room.name} กว้าง ${w} เมตร ลึก ${d} เมตร">${s}<text class="fp-dim" x="105" y="9">${w.toFixed(1)} ม. × ${d.toFixed(1)} ม. · หน้าต่างด้านล่าง</text></svg>`;
}

export function initStays({ world, fly, setOrbit, onSelect }) {
  const card = $('#infoCard'), tabs = $('#stayTabs');
  let current = null, meta = null;
  STAYS.forEach((s) => {
    const b = document.createElement('button');
    b.type = 'button'; b.role = 'tab'; b.dataset.stay = s.id; b.id = `stay-${s.id}`;
    b.textContent = `${s.area} · ${s.short}`;
    b.addEventListener('click', () => openStay(s.id));
    tabs.append(b);
  });
  const mark = (id) => { document.querySelectorAll('[data-target]').forEach((b) => b.setAttribute('aria-selected', 'false')); tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-selected', b.dataset.stay === id)); };
  const swap = (html) => {
    card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap', 'stay-sheet');
    card.innerHTML = '<button class="sheet-close" type="button" id="sheetClose" aria-label="ปิดหน้าที่พัก">✕</button>' + html; card.scrollTop = 0;
    document.body.classList.add('stay-open'); // phones: the sheet becomes a bottom drawer so the 3D view stays visible
    $('#sheetClose').addEventListener('click', () => { setOrbit(false); api.close(); card.innerHTML = ''; });
  };

  function openStay(id) {
    const s = STAYS.find((x) => x.id === id);
    current = s; mark(id);
    world.stays.hideRoom();
    fly(world.stays.exterior(id));
    swap(`
      <p class="jp">${s.jp}</p>
      <h3>${s.name} <span class="stars" aria-label="${s.stars} ดาว">${'★'.repeat(s.stars)}</span></h3>
      <p class="stay-meta"><span>${s.area}</span><span>คะแนนผู้เข้าพัก ${s.score}/10 (ตัวอย่าง)</span></p>
      <p class="muted">${s.text}</p>
      <ul class="tags">${s.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
      <h4>เลือกห้องพัก <small>${s.rooms.length} แบบ</small></h4>
      <div class="room-list">${s.rooms.map((r) => `
        <article class="room-row">
          <div><b>${r.name}</b><small>${r.size} ตร.ม. · ${r.bed} · สูงสุด ${r.guests} ท่าน</small><small>${r.view}</small></div>
          <div class="room-cta"><span class="price">฿${fmt(r.price)}<small>/คืน</small></span><button class="btn btn-small" type="button" data-room="${r.id}">ดูห้อง 3D</button></div>
        </article>`).join('')}</div>
      <p class="fine">ที่พักและราคาเป็นข้อมูลสมมติสำหรับเดโม ไม่ใช่โรงแรมจริง</p>`);
    card.querySelectorAll('[data-room]').forEach((b) => b.addEventListener('click', () => openRoom(s, b.dataset.room)));
  }

  async function openRoom(s, roomId) {
    const r = s.rooms.find((x) => x.id === roomId);
    swap(`<p class="jp">${s.jp}</p><h3>${r.name}</h3><p class="muted" aria-live="polite">กำลังเปิดห้อง 3 มิติ…</p>`);
    let room;
    try { room = await world.stays.room(s.id, roomId); } catch (e) { swap(`<h3>${r.name}</h3><p class="muted">โหลดห้อง 3 มิติไม่สำเร็จ ลองใหม่อีกครั้ง</p><button class="btn btn-small" type="button" id="backStay">← กลับ</button>`); $('#backStay').addEventListener('click', () => openStay(s.id)); return; }
    if (current !== s) return; // user moved on while loading
    meta = room.meta;
    const go = (sec) => { setOrbit(false); fly(room.view(sec)); card.querySelectorAll('[data-sec]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.sec === sec)); $('#secNote').textContent = r.notes?.[sec] || SECTIONS[sec].note; };
    swap(`
      <button class="link-btn" type="button" id="backStay">← ${s.name} · ห้องทั้งหมด</button>
      <h3>${r.name}</h3>
      <p class="stay-meta"><span>${r.size} ตร.ม.</span><span>${r.bed}</span><span>สูงสุด ${r.guests} ท่าน</span></p>
      <div class="seg sec-seg" role="group" aria-label="ส่วนของห้อง">${Object.entries(SECTIONS).map(([k, v]) => `<button type="button" data-sec="${k}" aria-pressed="false">${k === 'bath' && r.onsen ? 'ออนเซ็น' : v.name}</button>`).join('')}</div>
      <p class="muted" id="secNote"></p>
      <button class="btn btn-ghost btn-small" type="button" id="lookAround" aria-pressed="false">หมุนมองรอบห้องเอง</button>
      <dl class="spec">
        <div><dt>วิว</dt><dd>${r.view}</dd></div>
        <div><dt>เตียง</dt><dd>${r.bed}</dd></div>
        <div><dt>ห้องน้ำ</dt><dd>${r.bathText}</dd></div>
        <div><dt>ยกเลิก</dt><dd>${r.cancel}</dd></div>
      </dl>
      <h4>สิ่งอำนวยความสะดวก</h4>
      <ul class="amen">${r.amenities.map((a) => `<li>${a}</li>`).join('')}</ul>
      <h4>ผังห้อง</h4>
      ${floorPlan(meta, r)}
      <div class="row"><span class="price">฿${fmt(r.price)}<small>/คืน · รวมอาหารเช้า</small></span><button class="btn btn-small" type="button" id="pickRoom">เลือกห้องนี้</button></div>
      <p class="fine">ราคาและเงื่อนไขเป็นตัวอย่างสำหรับเดโม</p>`);
    $('#backStay').addEventListener('click', () => { setOrbit(false); openStay(s.id); });
    card.querySelectorAll('[data-sec]').forEach((b) => b.addEventListener('click', () => go(b.dataset.sec)));
    $('#lookAround').addEventListener('click', (e) => { const on = e.currentTarget.getAttribute('aria-pressed') !== 'true'; e.currentTarget.setAttribute('aria-pressed', on); e.currentTarget.textContent = on ? 'กลับไปมุมที่จัดไว้' : 'หมุนมองรอบห้องเอง'; setOrbit(on); });
    $('#pickRoom').addEventListener('click', () => onSelect({ hotel: s.id, room: r.id }));
    go('bed');
  }
  const api = { openStay, close() { current = null; card.classList.remove('stay-sheet'); document.body.classList.remove('stay-open'); tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-selected', 'false')); world.stays.hideRoom(); } };
  return api;
}
