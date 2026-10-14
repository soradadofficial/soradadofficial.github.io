import { STAYS, SECTIONS } from './data.js';
import { DETAIL } from './stay-detail.js';

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

// Sample unit layout for the tower stays: which room type sits where on each floor. Estimated, for the demo:
// suites take the top floors and the corners, view rooms face the landmark, standard rooms face the city.
const LAYOUT = {
  tokyo: { face: ['ฝั่งโตเกียวทาวเวอร์', 'ฝั่งเมือง'], top: ['tk-sky', 2, 3], corner: ['tk-corner', 14, 2], front: 'tk-twin', back: 'tk-deluxe', cityView: 'วิวเมืองย่านมินาโตะ ห้องฝั่งนี้หันหลังให้โตเกียวทาวเวอร์' },
  osaka: { face: ['ฝั่งปราสาทโอซาก้า', 'ฝั่งเมือง'], top: ['os-suite', 1, 3], corner: ['os-family', 0, 2], front: 'os-castle', back: 'os-standard', cityView: 'วิวเมืองย่านบิสซิเนสพาร์ก ห้องฝั่งนี้หันหลังให้ปราสาท' },
};
const seed = (id) => [...id].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 1000003, 7);
const hash = (a, b, c) => { let h = (a * 73856093) ^ (b * 19349663) ^ (c * 83492791); h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
export function unitsOn(stay, tower, k) { // every unit on storey k (0 = lowest guest floor), in order along the facade, both sides
  const L = LAYOUT[stay.id], floor = tower.first + k, out = [], room = (id) => stay.rooms.find((r) => r.id === id);
  [-1, 1].forEach((side, si) => {
    const add = (id, bay, bays) => out.push({ k, floor, side, bay, bays, room: room(id), facing: L.face[si] });
    if (k >= tower.n - L.top[1]) { for (let b = 0, w; b < tower.bays; b += w) { w = tower.bays - b < 2 * L.top[2] ? tower.bays - b : L.top[2]; add(L.top[0], b, w); } return; } // suite floors: the last suite takes the bays left over
    const c = k >= L.corner[1] ? L.corner[2] : 0;
    if (c) add(L.corner[0], 0, c);
    for (let b = c; b < tower.bays - c; b++) add(side < 0 ? L.front : L.back, b, 1);
    if (c) add(L.corner[0], tower.bays - c, c);
  });
  out.forEach((u, i) => { u.no = floor * 100 + i + 1; u.free = hash(seed(stay.id), floor, i) > 0.38; }); // availability is made up for the demo
  return out;
}

export function sampleUnit(stay, tower, roomId) { // nearest floor to three quarters up that has this type, a free unit if there is one
  const D = Math.round((tower.n - 1) * 0.75);
  for (let d = 0; d < tower.n; d++) for (const k of d ? [D + d, D - d] : [D]) {
    if (k < 0 || k >= tower.n) continue;
    const us = unitsOn(stay, tower, k).filter((u) => u.room.id === roomId);
    if (us.length) return us.find((u) => u.free) || us[0];
  }
  return undefined;
}

export function initStays({ world, fly, setOrbit, onSelect }) {
  const card = $('#infoCard'), tabs = $('#stayTabs');
  let current = null, meta = null, pick = { k: null, type: '', u: null }, preT = 0; // pick: floor, room-type filter and unit number chosen on a tower
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
    $('#sheetClose').addEventListener('click', () => { const out = world.stays.hasRoom() && current; setOrbit(false); api.close(); card.innerHTML = ''; if (out) fly(world.stays.exterior(out.id)); }); // closing inside a room flies back out to the building
  };

  function openStay(id, keepFloor = false) { // keepFloor: coming back from a room to the floor it is on
    const s = STAYS.find((x) => x.id === id);
    if (current !== s || !keepFloor) pick = { k: null, type: '', u: null };
    current = s; mark(id);
    clearTimeout(preT); preT = setTimeout(() => world.stays.preload(id, s.rooms.map((r) => r.id)), 2400); // after the fly settles: the rooms load and compile while the sheet is read
    world.stays.hideRoom(); world.stays.showFloor(id, null);
    if (!keepFloor || pick.k == null) fly(world.stays.exterior(id));
    swap(`
      <p class="jp">${s.jp}</p>
      <h3>${s.name} <span class="stars" aria-label="${s.stars} ดาว">${'★'.repeat(s.stars)}</span></h3>
      <p class="stay-meta"><span>${s.area}</span><span>คะแนนผู้เข้าพัก ${s.score}/10 (ตัวอย่าง)</span></p>
      <p class="muted">${s.text}</p>
      <ul class="tags">${s.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
      ${s.id === 'tokyo' ? '<a class="text-link" href="./stay-tokyo.html">เปิดหน้าตึกแบบเจาะลึก: เลือกชั้น ดูผังห้อง และวิวจริงจากหน้าต่าง →</a>' : ''}
      <h4>เลือกห้องพัก <small>${s.rooms.length} แบบ</small></h4>
      <div class="room-list">${s.rooms.map((r) => `
        <article class="room-row">
          <div><b>${r.name}</b><small>${r.size} ตร.ม. · ${r.bed} · สูงสุด ${r.guests} ท่าน</small><small>${r.view}</small></div>
          <div class="room-cta"><span class="price">฿${fmt(r.price)}<small>/คืน</small></span><button class="btn btn-small" type="button" data-room="${r.id}">ดูห้อง 3D</button></div>
        </article>`).join('')}</div>
      ${world.stays.tower(id) ? '<h4>เลือกชั้นและห้องบนตึก</h4><div id="towerPick"></div>' : ''}
      ${deep(s)}
      <p class="fine">ที่พักและราคาเป็นข้อมูลสมมติสำหรับเดโม ไม่ใช่โรงแรมจริง</p>`);
    card.querySelectorAll('[data-room]').forEach((b) => b.addEventListener('click', () => { // on a tower the sample room is a real unit of that type, so the window faces the right way
      const T = world.stays.tower(id), u = T && sampleUnit(s, T, b.dataset.room);
      if (u) pick = { k: u.k, type: '', u: u.no };
      openRoom(s, b.dataset.room, u);
    }));
    if (world.stays.tower(id)) towerPick(s);
    if (keepFloor && pick.k != null) { const b = $('#towerPick'); card.scrollTop += b.getBoundingClientRect().top - card.getBoundingClientRect().top - 12; } // back from a room: open at the floor plan
    card.querySelectorAll('[data-fk]').forEach((b) => b.addEventListener('click', () => { // a facility lights its storey on the tower
      const T = world.stays.tower(id), k = b.dataset.fk === 'roof' ? T.n : +b.dataset.fk;
      pick.k = pick.u = null; world.stays.showFloor(id, k); fly(world.stays.floorView(id, Math.max(0, Math.min(T.n - 1, k))));
    }));
  }

  // The in-depth part of a property sheet, in sections that open one at a time (native <details>).
  function deep(s) {
    const d = DETAIL[s.id], T = world.stays.tower(s.id), kv = (rows) => `<dl class="spec">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`, li = (a) => `<ul class="deep-list">${a.map((x) => `<li>${x}</li>`).join('')}</ul>`;
    const sec = (title, body, open = false) => `<details class="deep" ${open ? 'open' : ''}><summary>${title}</summary>${body}</details>`;
    let building = d.built;
    if (T) { // counted from the same layout the unit picker draws
      const units = Array.from({ length: T.n }, (_, k) => unitsOn(s, T, k)).flat();
      building = [['ชั้นห้องพัก', `${T.n} ชั้น (ชั้น ${T.first}–${T.first + T.n - 1}) เหนือโพเดียม 2 ชั้น`], ['ความสูงโดยประมาณ', `${Math.round(10 + T.n * T.fh + 6)} ม. ตามโมเดล`], ['จำนวนห้อง', `${units.length} ห้อง · ${s.rooms.map((r) => `${r.name} ${units.filter((u) => u.room === r).length}`).join(' · ')}`], ...d.built];
    }
    const min = Math.min(...s.rooms.map((r) => r.price)), max = Math.max(...s.rooms.map((r) => r.price));
    return `<h4>ข้อมูลเชิงลึกของที่พัก</h4>
      ${sec('ภาพรวมและอาคาร', kv([['เช็คอิน / เช็คเอาต์', `${d.times.in} / ${d.times.out}`], ['แผนกต้อนรับ', d.times.desk], ['ช่วงราคา', `฿${fmt(min)}–${fmt(max)} ต่อคืน`], ...building]), true)}
      ${sec('สิ่งอำนวยความสะดวก', `<div class="fac">${d.facilities.map((f) => `<article><b>${f.name}</b><p>${f.text}</p>${T && f.k != null ? `<button class="link-btn" type="button" data-fk="${f.k}">ดูตำแหน่งบนตึก</button>` : ''}</article>`).join('')}</div>`)}
      ${sec('อาหารและเครื่องดื่ม', li(d.dining))}
      ${sec('การเดินทาง', kv(d.access))}
      ${sec('บริการสำหรับกรุ๊ปทัวร์', li(d.tour))}
      ${sec('นโยบายที่พัก', kv(d.policy))}
      ${sec('การเข้าถึงสำหรับทุกคน', li(d.access4all))}
      ${sec('เปรียบเทียบห้องทุกแบบ', `<div class="cmp-wrap"><table class="cmp"><thead><tr><th>ห้อง</th><th>ตร.ม.</th><th>ท่าน</th><th>เตียง</th><th>วิว</th><th>ยกเลิก</th><th>฿/คืน</th></tr></thead><tbody>${s.rooms.map((r) => `<tr><th>${r.name}</th><td>${r.size}</td><td>${r.guests}</td><td>${r.bed}</td><td>${r.view}</td><td>${r.cancel}</td><td>${fmt(r.price)}</td></tr>`).join('')}</tbody></table></div>`)}`;
  }

  // Tower stays: pick a floor (it lights up on the building), then a unit on that floor (it lights up where it sits).
  // The plan is drawn as seen by the floor camera on the landmark side: that facade on top, left and right as on screen.
  function towerPick(s, keepView = false) {
    const T = world.stays.tower(s.id), box = $('#towerPick'), L = LAYOUT[s.id];
    const match = (u) => u.free && (!pick.type || u.room.id === pick.type);
    const floors = Array.from({ length: T.n }, (_, i) => T.n - 1 - i); // top floor first, like a lift panel
    const count = (k) => unitsOn(s, T, k).filter(match).length;
    if (pick.k != null && !count(pick.k)) { // the filter left nothing on the chosen floor: go to the nearest floor that has some
      pick.k = floors.filter(count).sort((a, b) => Math.abs(a - pick.k) - Math.abs(b - pick.k))[0] ?? null; pick.u = null; keepView = false;
    }
    const units = pick.k == null ? [] : unitsOn(s, T, pick.k);
    const chosen = () => units.find((u) => u.no === pick.u && match(u)) || null;
    if (!chosen()) pick.u = null;
    // a redraw keeps the rail where it was scrolled and the keyboard focus where it was
    const rail0 = box.querySelector('.floor-rail'), railAt = rail0 && [rail0.scrollTop, rail0.scrollLeft];
    const f = document.activeElement, refocus = f && box.contains(f) ? (f.id ? `#${f.id}` : f.dataset.k ? `[data-k="${f.dataset.k}"]` : f.dataset.no ? `[data-no="${f.dataset.no}"]` : null) : null;
    const cell = (u) => `<button type="button" class="unit" data-no="${u.no}" style="grid-column: ${T.bays - u.bay - u.bays + 1} / span ${u.bays}; --c: var(--u-${s.rooms.indexOf(u.room)})" ${match(u) ? '' : 'disabled'} aria-pressed="${u.no === pick.u}" aria-label="ห้อง ${u.no} ${u.room.name} ${u.facing} ${u.free ? 'ว่าง' : 'ไม่ว่าง'}">${u.no % 100}</button>`;
    const row = (side) => `<div class="plan-row">${units.filter((u) => u.side === side).sort((a, b) => b.bay - a.bay).map(cell).join('')}</div>`;
    box.innerHTML = `
      <label class="pick-filter">ประเภทห้อง <select id="typeSel"><option value="">ทุกประเภท</option>${s.rooms.map((r) => `<option value="${r.id}" ${pick.type === r.id ? 'selected' : ''}>${r.name} · ${r.size} ตร.ม.</option>`).join('')}</select></label>
      <div class="pick">
        <div class="floor-rail" role="group" aria-label="ชั้น">${floors.map((k) => { const n = count(k); return `<button type="button" data-k="${k}" aria-pressed="${pick.k === k}" ${n ? '' : 'disabled'}><b>${T.first + k}</b><small>${n} ห้อง</small></button>`; }).join('')}</div>
        <div class="floor-plan">${pick.k == null ? '<p class="muted">ชี้หรือแตะที่ชั้น ชั้นนั้นจะสว่างขึ้นบนตึก เลือกชั้นเพื่อดูผังห้อง</p>' : `
          <p class="plan-side">▲ ${L.face[0]}</p>
          <div class="plan-scroll" style="--bays: ${T.bays}">${row(-1)}<div class="plan-core">ทางเดินและลิฟต์</div>${row(1)}</div>
          <p class="plan-side">▼ ${L.face[1]}</p>
          <p class="muted" id="unitTip" aria-live="polite"></p>
          <button class="btn btn-small" type="button" id="enterUnit" hidden></button>`}
        </div>
      </div>
      <p class="fine">ผังชั้น เลขห้อง ห้องว่าง และราคาเป็นตัวอย่างสำหรับเดโม ความสูงชั้นราว ${T.fh} ม. ตามโมเดล</p>`;
    const rail = box.querySelector('.floor-rail'), tip = $('#unitTip'), go = $('#enterUnit');
    if (railAt) [rail.scrollTop, rail.scrollLeft] = railAt;
    else { const sel = rail.querySelector('[aria-pressed="true"]'); if (sel) { rail.scrollTop = sel.offsetTop - (rail.clientHeight - sel.offsetHeight) / 2; rail.scrollLeft = sel.offsetLeft - (rail.clientWidth - sel.offsetWidth) / 2; } }
    if (refocus) box.querySelector(refocus)?.focus({ preventScroll: true });
    const say = (u) => { if (tip) tip.textContent = u ? `ห้อง ${u.no} · ${u.room.name} · ${u.room.size} ตร.ม. · ${u.facing} · ${!u.free ? 'ไม่ว่าง' : match(u) ? `฿${fmt(u.room.price)}/คืน` : 'ไม่ตรงประเภทที่เลือก'}` : `ชั้น ${T.first + pick.k} · ชี้หรือแตะที่ห้องเพื่อดูตำแหน่งบนตึก`; };
    const rest = () => { world.stays.showFloor(s.id, pick.k); world.stays.showUnit(s.id, chosen()); if (pick.k != null) say(chosen()); }; // pointer or focus left: back to what is chosen
    const enter = (u) => { go.hidden = false; go.textContent = `เข้าไปดูห้อง ${u.no}`; go.onclick = () => openRoom(s, u.room.id, u); };
    $('#typeSel').addEventListener('change', (e) => { pick.type = e.target.value; towerPick(s, true); });
    rail.querySelectorAll('[data-k]').forEach((b) => {
      const k = +b.dataset.k, light = () => world.stays.showFloor(s.id, k);
      b.addEventListener('pointerenter', light); b.addEventListener('focus', light);
      b.addEventListener('pointerleave', rest); b.addEventListener('blur', rest);
      b.addEventListener('click', () => { pick.k = k; pick.u = null; towerPick(s); });
    });
    box.querySelectorAll('.unit').forEach((b) => {
      const u = units.find((x) => x.no === +b.dataset.no);
      const show = () => { world.stays.showUnit(s.id, u); say(u); };
      b.addEventListener('pointerenter', show); b.addEventListener('focus', show);
      b.addEventListener('pointerleave', rest); b.addEventListener('blur', rest);
      b.addEventListener('click', () => { // first tap picks the unit and turns the camera to its side of the tower; the button below goes in
        pick.u = u.no; box.querySelectorAll('.unit').forEach((x) => x.setAttribute('aria-pressed', x === b)); rest(); enter(u);
        fly(world.stays.floorView(s.id, u.k, u.side));
      });
    });
    rest();
    if (chosen()) enter(chosen());
    if (pick.k != null && !keepView) fly(world.stays.floorView(s.id, pick.k, chosen()?.side ?? -1));
  }

  async function openRoom(s, roomId, unit) {
    const r = s.rooms.find((x) => x.id === roomId), away = unit && unit.side > 0 ? LAYOUT[s.id].cityView : null; // city-side units look away from the landmark
    swap(`<p class="jp">${s.jp}</p><h3>${r.name}</h3><p class="muted" aria-live="polite">กำลังเปิดห้อง 3 มิติ…</p>`);
    let room;
    world.stays.showFloor(s.id, null);
    try { room = await world.stays.room(s.id, roomId, unit); } catch (e) { swap(`<h3>${r.name}</h3><p class="muted">โหลดห้อง 3 มิติไม่สำเร็จ ลองใหม่อีกครั้ง</p><button class="btn btn-small" type="button" id="backStay">← กลับ</button>`); $('#backStay').addEventListener('click', () => openStay(s.id)); return; }
    if (current !== s) return; // user moved on while loading
    meta = room.meta;
    const go = (sec) => { setOrbit(false); const la = $('#lookAround'); if (la) { la.setAttribute('aria-pressed', 'false'); la.textContent = 'หมุนมองรอบห้องเอง'; } fly(room.view(sec)); card.querySelectorAll('[data-sec]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.sec === sec)); $('#secNote').textContent = sec === 'view' && away ? `${away} · ${SECTIONS.view.note}` : r.notes?.[sec] || SECTIONS[sec].note; };
    swap(`
      <nav class="crumbs" aria-label="ตำแหน่ง"><button class="link-btn" type="button" id="backStay">${s.name}</button>${unit ? ` › <button class="link-btn" type="button" id="backFloor">ชั้น ${unit.floor}</button> › <span>ห้อง ${unit.no}</span>` : ' › <span>ห้องตัวอย่าง</span>'}</nav>
      <h3>${r.name}${unit ? ` <small>ห้อง ${unit.no} · ${unit.facing}</small>` : ''}</h3>
      <p class="stay-meta"><span>${r.size} ตร.ม.</span><span>${r.bed}</span><span>สูงสุด ${r.guests} ท่าน</span></p>
      <div class="seg sec-seg" role="group" aria-label="ส่วนของห้อง">${Object.entries(SECTIONS).map(([k, v]) => `<button type="button" data-sec="${k}" aria-pressed="false">${k === 'bath' && r.onsen ? 'ออนเซ็น' : v.name}</button>`).join('')}</div>
      <p class="muted" id="secNote"></p>
      <button class="btn btn-ghost btn-small" type="button" id="lookAround" aria-pressed="false">หมุนมองรอบห้องเอง</button>
      <dl class="spec">
        <div><dt>วิว</dt><dd>${away || r.view}</dd></div>
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
    $('#backStay').addEventListener('click', () => { setOrbit(false); pick.k = null; openStay(s.id); });
    $('#backFloor')?.addEventListener('click', () => { setOrbit(false); openStay(s.id, true); });
    card.querySelectorAll('[data-sec]').forEach((b) => b.addEventListener('click', () => go(b.dataset.sec)));
    $('#lookAround').addEventListener('click', (e) => { const on = e.currentTarget.getAttribute('aria-pressed') !== 'true'; e.currentTarget.setAttribute('aria-pressed', on); e.currentTarget.textContent = on ? 'กลับไปมุมที่จัดไว้' : 'หมุนมองรอบห้องเอง'; setOrbit(on); });
    $('#pickRoom').addEventListener('click', () => onSelect({ hotel: s.id, room: r.id }));
    go('bed');
  }
  const api = { openStay, leaveRoom() { if (current && world.stays.hasRoom()) { setOrbit(false); openStay(current.id, true); } }, close() { current = null; card.classList.remove('stay-sheet'); document.body.classList.remove('stay-open'); tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-selected', 'false')); world.stays.hideRoom(); world.stays.showFloor('tokyo', null); } };
  return api;
}
