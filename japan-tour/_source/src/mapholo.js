import * as THREE from 'three';
import { AIRPORTS, PLACES } from './data.js';
import { toX, toZ } from './geo.js';
import { routeLine, createLabel } from './scenery.js';
import PAIRS from './pairs.json';

// Builder overlay drawn on the real terrain: glowing pins at airports and sights,
// flight arcs and a draped road route that reveal when the plan changes.
export function createHoloMap({ ground, thaiXZ }) {
  const g = new THREE.Group();
  const posOf = (o) => {
    if (o.country === 'TH') { const [x, z] = thaiXZ(o.lon, o.lat); return new THREE.Vector3(x, 0.06, z); }
    const x = toX(o.lon), z = toZ(o.lat);
    return new THREE.Vector3(x, Math.max(0.05, ground(x, z)), z);
  };

  const pinGeo = new THREE.CylinderGeometry(2.2, 0.4, 16, 12).translate(0, 8, 0);
  const ringGeo = new THREE.RingGeometry(5, 7, 40).rotateX(-Math.PI / 2);
  const markers = {};
  const addMarker = (id, o, color, text, sub) => {
    const m = new THREE.Group();
    m.position.copy(posOf(o));
    const pin = new THREE.Mesh(pinGeo, new THREE.MeshBasicMaterial({ color, toneMapped: false, fog: false, transparent: true }));
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, depthWrite: false, toneMapped: false, fog: false, side: THREE.DoubleSide }));
    ring.position.y = 0.5;
    const l = createLabel(text, sub, color);
    l.scale.set(0.12, 0.0375, 1);
    l.position.y = 18;
    m.add(pin, ring, l);
    m.userData = { pin, ring, label: l, active: false };
    g.add(m);
    markers[id] = m;
  };
  for (const a of Object.values(AIRPORTS)) addMarker(a.code, a, a.country === 'TH' ? '#ffd27a' : '#ffffff', a.code, a.name.split(' ')[0]);
  for (const p of PLACES) addMarker(p.id, p, '#ff9ec0', p.name.split(' ')[0], p.jp);

  const routes = new THREE.Group();
  g.add(routes);
  const comets = [];
  const dotTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, '#fff'); gr.addColorStop(0.3, 'rgba(255,255,255,0.8)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();

  function clearRoutes() {
    routes.children.slice().forEach((c) => { c.geometry?.dispose(); routes.remove(c); });
    comets.length = 0;
  }
  function addRoute(pts, color, width, speed) {
    const glow = routeLine(pts, color, width * 2.6, 0.25);
    const line = routeLine(pts, color, width, 1);
    line.material.dashed = false;
    routes.add(glow, line);
    const comet = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTex, color, transparent: true, depthWrite: false, depthTest: false, sizeAttenuation: false, toneMapped: false, fog: false, blending: THREE.AdditiveBlending }));
    comet.scale.set(0.03, 0.03, 1);
    comet.renderOrder = 22;
    routes.add(comet);
    const cum = [0];
    for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1]));
    comets.push({ pts, cum, comet, lines: [glow, line], speed, offset: Math.random() });
  }
  const arc = (p, q, lift, n = 80) => {
    const out = [];
    for (let i = 0; i <= n; i++) { const t = i / n; const v = p.clone().lerp(q, t); v.y += Math.sin(t * Math.PI) * lift; out.push(v); }
    return out;
  };

  // real driving route between two stops (baked from OpenStreetMap), or null where there is none
  const roadBetween = (a, b) => {
    const fwd = PAIRS[`${a}|${b}`], rev = PAIRS[`${b}|${a}`], r = fwd || rev;
    if (!r) return null;
    const pts = r.pts.map(([lo, la]) => { const x = toX(lo), z = toZ(la); return new THREE.Vector3(x, Math.max(0.05, ground(x, z)) + 1.2, z); });
    return fwd ? pts : pts.reverse();
  };
  let revealStart = 0, legs = null, sim = null;
  const walker = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTex, color: '#ffffff', transparent: true, depthWrite: false, depthTest: false, sizeAttenuation: false, toneMapped: false, fog: false, blending: THREE.AdditiveBlending }));
  walker.scale.set(0.06, 0.06, 1); walker.renderOrder = 23; walker.visible = false; g.add(walker);
  const along = (pts, u) => { // point at fraction u of a polyline
    const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1]));
    const d = u * cum[cum.length - 1]; let i = 0; while (i < cum.length - 2 && cum[i + 1] < d) i++;
    return pts[i].clone().lerp(pts[i + 1], Math.min(1, Math.max(0, (d - cum[i]) / Math.max(1e-6, cum[i + 1] - cum[i]))));
  };
  const endSim = () => { if (sim) { sim.say(null); sim = null; walker.visible = false; } };
  // Play the trip leg by leg: flight in, each road leg with a pause at the stop, flight home.
  // `say(text, i, n)` receives the caption for the current step, and null when it ends.
  function simulate(plan, now, say) {
    if (!legs) return;
    const nDays = plan.nights + 1, middle = Math.max(1, nDays - 2), perDay = Math.max(1, Math.ceil(plan.stopObjs.length / middle));
    const dayOf = (k) => Math.min(nDays - 1, 2 + Math.floor(k / perDay));
    const steps = [{ pts: legs.out, dur: 5, off: [0, 620, 480], text: `วันที่ 1 · บิน ${plan.dep} → ${plan.arr} · เข้าพัก ${plan.hotel.name}` }];
    legs.road.forEach((pts, k) => {
      const stop = plan.stopObjs[k];
      const fly = legs.hops[k], how = fly ? 'บินภายในประเทศไป' : 'รถโค้ชไป';
      steps.push({ pts, dur: fly ? 4.2 : 3.6, hold: stop ? 1.6 : 0.4, off: fly ? [0, 420, 380] : [0, 150, 170], text: stop ? `วันที่ ${dayOf(k)} · ${how} ${stop.name}` : `วันที่ ${nDays} · ${fly ? 'บินไป' : 'ไป'}สนามบิน ${plan.ret}` });
    });
    steps.push({ pts: legs.back, dur: 5, off: [0, 620, 480], text: `วันที่ ${nDays} · บิน ${plan.ret} → ${plan.dep} กลับบ้าน` });
    sim = { steps, i: -1, t0: now, say, pos: new THREE.Vector3(), look: new THREE.Vector3(), started: false };
  }
  function stepSim(t) {
    let s = sim.steps[sim.i];
    if (!s || t - sim.t0 > s.dur + (s.hold || 0)) {
      sim.i++; sim.t0 = t; s = sim.steps[sim.i];
      if (!s) return endSim();
      sim.say(s.text, sim.i, sim.steps.length);
    }
    const u = Math.min(1, (t - sim.t0) / s.dur), e = u * u * (3 - 2 * u), p = along(s.pts, e);
    walker.visible = true; walker.position.copy(p);
    const want = p.clone().add(new THREE.Vector3(...s.off));
    if (!sim.started) { sim.pos.copy(want); sim.look.copy(p); sim.started = true; }
    sim.pos.lerp(want, 0.04); sim.look.lerp(p, 0.06); // calm follow: the camera eases after the marker
  }
  function setRoute(plan, now) {
    endSim();
    clearRoutes();
    revealStart = now;
    for (const m of Object.values(markers)) m.userData.active = false;
    const a = posOf(AIRPORTS[plan.dep]), b = posOf(AIRPORTS[plan.arr]), c = posOf(AIRPORTS[plan.ret]);
    addRoute(arc(a, b, a.distanceTo(b) * 0.1 + 20, 120), '#7fe3ff', 3, 1.0);
    addRoute(arc(c, a, c.distanceTo(a) * 0.07 + 20, 120), '#ffd27a', 2.5, 0.8);
    const stops = [b, ...plan.stops.map((id) => posOf(PLACES.find((x) => x.id === id))), c];
    const ids = [plan.arr, ...plan.stops, plan.ret];
    const pts = [], road = [], hops = [];
    for (let i = 0; i < stops.length - 1; i++) {
      const real = roadBetween(ids[i], ids[i + 1]);
      if (real) { real[0].copy(stops[i]).setY(real[0].y); real[real.length - 1].copy(stops[i + 1]).setY(real[real.length - 1].y); }
      const seg = real || arc(stops[i], stops[i + 1], stops[i].distanceTo(stops[i + 1]) * 0.08 + 12, 60); // no road (Hokkaido): domestic flight
      hops.push(!real); road.push(seg.slice());
      if (real) { if (pts.length) seg.shift(); pts.push(...seg); } else { if (pts.length > 1) addRoute(pts.splice(0), '#ff8fb8', 3, 1.4); addRoute(seg, '#b9a6ff', 2.5, 1.0); }
    }
    legs = null;
    legs = { out: arc(a, b, a.distanceTo(b) * 0.1 + 20, 120), back: arc(c, a, c.distanceTo(a) * 0.07 + 20, 120), road, hops };
    if (pts.length > 1) addRoute(pts, '#ff8fb8', 3, 1.4);
    for (const id of [plan.dep, plan.arr, plan.ret, ...plan.stops]) if (markers[id]) markers[id].userData.active = true;
  }

  function update(t, camera, weight = 1) {
    g.visible = weight > 0.02;
    if (!g.visible) return endSim();
    if (sim) stepSim(t);
    const rv = Math.min(1, (t - revealStart) / 1.8);
    for (const c of comets) {
      const total = c.cum[c.cum.length - 1];
      const shown = Math.max(1, Math.round((c.pts.length - 1) * rv));
      c.lines.forEach((l) => { l.geometry.instanceCount = shown; });
      c.lines[0].material.opacity = 0.25 * weight; c.lines[1].material.opacity = weight;
      const u = rv < 1 ? rv : (t * 0.1 * c.speed + c.offset) % 1;
      const d = u * total;
      let i = 0; while (i < c.cum.length - 2 && c.cum[i + 1] < d) i++;
      const k = (d - c.cum[i]) / Math.max(1e-6, c.cum[i + 1] - c.cum[i]);
      c.comet.position.copy(c.pts[i]).lerp(c.pts[i + 1], Math.min(1, Math.max(0, k)));
      c.comet.material.opacity = weight;
    }
    for (const m of Object.values(markers)) {
      const u = m.userData;
      u.pin.material.opacity = (u.active ? 1 : 0.35) * weight;
      u.label.material.opacity += ((u.active ? 1 : 0.0) * weight - u.label.material.opacity) * 0.1;
      u.label.visible = u.label.material.opacity > 0.02;
      const s = u.active ? 1 + ((t * 0.8 + m.position.x * 0.01) % 1) * 2.2 : 1;
      u.ring.scale.setScalar(s);
      u.ring.material.opacity = (u.active ? 1 - (s - 1) / 2.2 : 0.2) * weight;
    }
  }

  g.userData = { setRoute, update, markers, simulate, stopSim: endSim, get sim() { return sim; } };
  return g;
}
