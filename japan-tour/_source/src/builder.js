import { AIRPORTS, DEPARTURES, ARRIVALS, PLACES, HOTELS, STAYS, INSURANCE, ADDONS, flightFare, distanceKm } from './data.js';
import PAIRS from './pairs.json';

const $ = (s) => document.querySelector(s);
const fmt = (n) => n.toLocaleString('th-TH');

const state = {
  dep: 'BKK', arr: 'NRT', ret: 'auto',
  picked: new Set(['tokyo', 'fuji', 'hakone', 'kyoto', 'osaka']),
  nights: 6, pax: 2,
  hotel: 'kawaguchiko', room: 'kw-deluxe', insurance: 'plus',
  addons: new Set(['wifi']),
  date: '',
};

// Visit stops nearest-first from the arrival airport.
function orderStops(arr, ids) {
  const left = ids.map((id) => PLACES.find((p) => p.id === id));
  const out = [];
  let cur = AIRPORTS[arr];
  while (left.length) {
    left.sort((a, b) => distanceKm(cur, a) - distanceKm(cur, b));
    cur = left.shift();
    out.push(cur);
  }
  return out;
}

function nearestAirport(p) {
  return ARRIVALS.map((c) => AIRPORTS[c]).sort((a, b) => distanceKm(p, a) - distanceKm(p, b))[0].code;
}

export function computePlan() {
  const stops = orderStops(state.arr, [...state.picked]);
  const last = stops.length ? stops[stops.length - 1] : AIRPORTS[state.arr];
  const ret = state.ret === 'auto' ? nearestAirport(last) : state.ret;
  const chain = [AIRPORTS[state.arr], ...stops, AIRPORTS[ret]];
  let roadKm = 0;
  for (let i = 0; i < chain.length - 1; i++) { // real driving distance where a road route exists
    const a = chain[i].id || chain[i].code, b = chain[i + 1].id || chain[i + 1].code;
    roadKm += (PAIRS[`${a}|${b}`] || PAIRS[`${b}|${a}`])?.km ?? distanceKm(chain[i], chain[i + 1]) * 1.3;
  }
  const flyKm = distanceKm(AIRPORTS[state.dep], AIRPORTS[state.arr]) + distanceKm(AIRPORTS[ret], AIRPORTS[state.dep]);
  const fare = Math.round((flightFare(state.dep, state.arr) + flightFare(state.dep, ret)) / 2 / 100) * 100;
  const hotel = STAYS.find((h) => h.id === state.hotel);
  const room = hotel.rooms.find((r) => r.id === state.room) || hotel.rooms[0];
  const ins = INSURANCE.find((i) => i.id === state.insurance);
  const rooms = Math.ceil(state.pax / room.guests);
  const lines = [
    ['ตั๋วเครื่องบินไป-กลับ', fare * state.pax],
    [`${hotel.name} · ${room.name} ${state.nights} คืน × ${rooms} ห้อง`, room.price * state.nights * rooms],
    ['รถโค้ชและไกด์', Math.round(roadKm * 4 + 1200 * (state.nights + 1)) * state.pax],
    ['ค่าเข้าชมสถานที่', stops.reduce((s, p) => s + p.price, 0) * state.pax],
  ];
  if (ins.price) lines.push([`ประกัน ${ins.name}`, ins.price * state.pax]);
  for (const a of ADDONS) if (state.addons.has(a.id)) lines.push([a.name, a.per === 'day' ? a.price * (state.nights + 1) * Math.ceil(state.pax / 2) : a.price * (a.id === 'transfer' ? 1 : state.pax)]);
  const total = lines.reduce((s, l) => s + l[1], 0);

  // Day-by-day: day 1 arrives, last day flies home, stops spread across the days between.
  const days = [];
  const nDays = state.nights + 1;
  days.push(`บิน ${state.dep} → ${state.arr} · พบไกด์ เข้าที่พัก`);
  const middle = nDays - 2;
  const perDay = middle > 0 ? Math.max(1, Math.ceil(stops.length / middle)) : stops.length;
  let k = 0;
  for (let d = 0; d < middle; d++) {
    const today = stops.slice(k, k + perDay);
    k += perDay;
    days.push(today.length ? today.map((p) => p.name).join(' · ') : 'วันอิสระ ช้อปปิ้งหรือพักผ่อน');
  }
  const rest = stops.slice(k);
  days.push(`${rest.length ? rest.map((p) => p.name).join(' · ') + ' · ' : ''}บิน ${ret} → ${state.dep}`);

  return { dep: state.dep, arr: state.arr, ret, stops: stops.map((s) => s.id), stopObjs: stops, roadKm, flyKm, lines, total, days, hotel, room, ins, pax: state.pax, nights: state.nights };
}

function opt(v, label) { const o = document.createElement('option'); o.value = v; o.textContent = label; return o; }

export function initBuilder({ onChange, onSimulate }) {
  const dep = $('#dep'), arr = $('#arr'), ret = $('#ret'), room = $('#room');
  DEPARTURES.forEach((c) => dep.append(opt(c, `${c} · ${AIRPORTS[c].name}`)));
  ARRIVALS.forEach((c) => arr.append(opt(c, `${c} · ${AIRPORTS[c].name}`)));
  ret.append(opt('auto', 'อัตโนมัติ (ใกล้จุดสุดท้าย)'));
  ARRIVALS.forEach((c) => ret.append(opt(c, `${c} · ${AIRPORTS[c].name}`)));
  const d = new Date(); d.setDate(d.getDate() + 45);
  state.date = d.toISOString().slice(0, 10);
  $('#date').value = state.date;
  $('#date').min = new Date().toISOString().slice(0, 10);

  const places = $('#places');
  PLACES.forEach((p) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.dataset.id = p.id; b.id = `place-${p.id}`;
    b.innerHTML = `<span class="ord"></span>${p.name.split(' ')[0]}<span class="jp">${p.jp}</span>`;
    b.title = p.name;
    b.addEventListener('click', () => { state.picked.has(p.id) ? state.picked.delete(p.id) : state.picked.add(p.id); render(); });
    places.append(b);
  });
  const hotels = $('#hotels');
  HOTELS.forEach((h) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'opt'; b.dataset.id = h.id; b.id = `hotel-${h.id}`;
    b.innerHTML = `<span>${h.name}<small>${h.note}</small></span><span class="price">฿${fmt(h.perNight)}/คืน</span>`;
    b.addEventListener('click', () => { state.hotel = h.id; state.room = ''; render(); });
    hotels.append(b);
  });
  const insurance = $('#insurance');
  INSURANCE.forEach((i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.id = i.id; b.id = `ins-${i.id}`;
    b.innerHTML = `${i.name}<small>${i.price ? '฿' + fmt(i.price) : '—'}</small>`;
    b.addEventListener('click', () => { state.insurance = i.id; render(); });
    insurance.append(b);
  });
  const addons = $('#addons');
  ADDONS.forEach((a) => {
    const l = document.createElement('label');
    l.innerHTML = `<input type="checkbox" id="addon-${a.id}" ${state.addons.has(a.id) ? 'checked' : ''}> ${a.name}<span class="price">฿${fmt(a.price)}${a.per === 'day' ? '/วัน' : ''}</span>`;
    l.querySelector('input').addEventListener('change', (e) => { e.target.checked ? state.addons.add(a.id) : state.addons.delete(a.id); render(); });
    addons.append(l);
  });

  dep.value = state.dep; arr.value = state.arr; ret.value = state.ret; room.value = state.room;
  dep.addEventListener('change', () => { state.dep = dep.value; render(); });
  arr.addEventListener('change', () => { state.arr = arr.value; render(); });
  ret.addEventListener('change', () => { state.ret = ret.value; render(); });
  room.addEventListener('change', () => { state.room = room.value; render(); });
  $('#date').addEventListener('change', (e) => { state.date = e.target.value; render(); });
  $('#nights').addEventListener('input', (e) => { state.nights = +e.target.value; $('#nightsOut').textContent = state.nights; render(); });
  const pax = $('#pax');
  const setPax = (v) => { state.pax = Math.max(1, Math.min(30, v || 1)); pax.value = state.pax; render(); };
  pax.addEventListener('change', () => setPax(+pax.value));
  document.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => setPax(state.pax + +b.dataset.step)));
  $('#builderForm').addEventListener('submit', (e) => e.preventDefault());

  function render() {
    const plan = computePlan();
    places.querySelectorAll('.chip').forEach((c) => {
      const on = state.picked.has(c.dataset.id);
      c.setAttribute('aria-pressed', on);
      c.querySelector('.ord').textContent = on ? plan.stops.indexOf(c.dataset.id) + 1 : '';
      c.querySelector('.ord').hidden = !on;
    });
    $('#stopCount').textContent = `${state.picked.size} แห่ง`;
    hotels.querySelectorAll('.opt').forEach((b) => b.setAttribute('aria-pressed', b.dataset.id === state.hotel));
    // room types belong to the chosen property
    if (room.dataset.stay !== state.hotel) {
      room.dataset.stay = state.hotel; room.replaceChildren();
      plan.hotel.rooms.forEach((r) => room.append(opt(r.id, `${r.name} · ${r.size} ตร.ม. · ฿${fmt(r.price)}/คืน`)));
    }
    state.room = plan.room.id; room.value = state.room;
    insurance.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.id === state.insurance));

    const start = state.date ? new Date(state.date) : new Date();
    const dayLabel = (i) => { const x = new Date(start); x.setDate(x.getDate() + i); return x.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }); };
    $('#summary').innerHTML = `
      <p class="eyebrow">เส้นทางของคุณ</p>
      <p class="route-line"><span class="fly">${plan.dep} ✈ ${plan.arr}</span> → ${plan.stopObjs.map((p) => `<b>${p.jp}</b>`).join(' → ') || '<span class="muted">เลือกสถานที่</span>'} → <span class="fly">${plan.ret} ✈ ${plan.dep}</span></p>
      <div class="legend"><span><i style="background:#7fe3ff"></i>ขาไป</span><span><i style="background:#ff8fb8"></i>รถทัวร์</span><span><i style="background:#ffd27a"></i>ขากลับ</span></div>
      <dl class="stats">
        <div><dt>บินรวม</dt><dd>${fmt(Math.round(plan.flyKm))} กม.</dd></div>
        <div><dt>นั่งรถรวม</dt><dd>${fmt(Math.round(plan.roadKm))} กม.</dd></div>
        <div><dt>ระยะเวลา</dt><dd>${plan.nights + 1} วัน ${plan.nights} คืน</dd></div>
      </dl>
      <ol class="days">${plan.days.map((d, i) => `<li><span>${dayLabel(i)}</span>${d}</li>`).join('')}</ol>
      <div class="breakdown">${plan.lines.map(([n, v]) => `<div><span>${n}</span><span>฿${fmt(Math.round(v))}</span></div>`).join('')}</div>
      <div class="total"><span>รวม ${plan.pax} ท่าน</span><strong>฿${fmt(Math.round(plan.total))}</strong></div>
      <button class="btn btn-ghost" type="button" id="simBtn">▶ จำลองเส้นทาง</button>
      <button class="btn" type="button" id="bookBtn">ยืนยันการจอง (เดโม)</button>`;
    $('#bookBtn').addEventListener('click', () => openBooking(plan));
    $('#simBtn').addEventListener('click', () => onSimulate(plan));
    onChange(plan);
  }

  function openBooking(plan) {
    const ref = 'CV-JP-' + String(Math.floor(10000 + Math.random() * 89999));
    $('#bookBody').innerHTML = `
      <p>หมายเลขการจอง</p><p class="ref">${ref}</p>
      <p>${plan.dep} ✈ ${plan.arr} · ${plan.stopObjs.length} สถานที่ · ${plan.hotel.name} · ประกัน ${plan.ins.name}</p>
      <p>ยอดรวม <b>฿${fmt(Math.round(plan.total))}</b> สำหรับ ${plan.pax} ท่าน</p>`;
    $('#boRef').textContent = ref;
    const dlg = $('#bookDialog');
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }

  render();

  return {
    // Called from the explore cards: add a place or stay to the trip.
    apply(action) {
      if (action.place) state.picked.add(action.place);
      if (action.hotel) { state.hotel = action.hotel; state.room = action.room || ''; }
      if (action.addon) { state.addons.add(action.addon); const cb = document.getElementById(`addon-${action.addon}`); if (cb) cb.checked = true; }
      render();
    },
  };
}

export function fillInsuranceTable() {
  const rows = [['ค่ารักษาพยาบาล', 'medical'], ['กระเป๋าสูญหาย', 'luggage'], ['เที่ยวบินล่าช้า', 'delay'], ['เบี้ยต่อท่าน', 'price']];
  const plans = INSURANCE.filter((i) => i.id !== 'none');
  document.querySelector('#insTable tbody').innerHTML = rows.map(([label, k]) => `<tr><th scope="row">${label}</th>${plans.map((p) => `<td>${k === 'price' ? '฿' + fmt(p.price) : p[k]}</td>`).join('')}</tr>`).join('');
}
