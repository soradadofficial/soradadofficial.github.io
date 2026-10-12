import * as THREE from 'three';
import { AIRPORTS, PLACES } from './data.js';
import { toX, toZ } from './geo.js';
import { routeLine, createLabel } from './scenery.js';

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
  const draped = (p, q) => {
    const out = [];
    const d = p.distanceTo(q), n = Math.max(8, Math.ceil(d / 3));
    const nx = -(q.z - p.z) / d, nz = (q.x - p.x) / d;
    for (let i = 0; i <= n; i++) {
      const t = i / n, bend = Math.sin(t * Math.PI) * d * 0.06;
      const x = p.x + (q.x - p.x) * t + nx * bend, z = p.z + (q.z - p.z) * t + nz * bend;
      out.push(new THREE.Vector3(x, Math.max(0.05, ground(x, z)) + 1.2, z));
    }
    return out;
  };

  let revealStart = 0;
  function setRoute(plan, now) {
    clearRoutes();
    revealStart = now;
    for (const m of Object.values(markers)) m.userData.active = false;
    const a = posOf(AIRPORTS[plan.dep]), b = posOf(AIRPORTS[plan.arr]), c = posOf(AIRPORTS[plan.ret]);
    addRoute(arc(a, b, a.distanceTo(b) * 0.1 + 20, 120), '#7fe3ff', 3, 1.0);
    addRoute(arc(c, a, c.distanceTo(a) * 0.07 + 20, 120), '#ffd27a', 2.5, 0.8);
    const stops = [b, ...plan.stops.map((id) => posOf(PLACES.find((x) => x.id === id))), c];
    const pts = [];
    for (let i = 0; i < stops.length - 1; i++) { const seg = draped(stops[i], stops[i + 1]); if (i) seg.shift(); pts.push(...seg); }
    if (pts.length > 1) addRoute(pts, '#ff8fb8', 3, 1.4);
    for (const id of [plan.dep, plan.arr, plan.ret, ...plan.stops]) if (markers[id]) markers[id].userData.active = true;
  }

  function update(t, camera, weight = 1) {
    g.visible = weight > 0.02;
    if (!g.visible) return;
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

  g.userData = { setRoute, update, markers };
  return g;
}
