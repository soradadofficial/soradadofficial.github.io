import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { glowMats, textTexture } from './models.js';
import { LD } from './fx.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Merge every static mesh under `root` into one geometry per material (in root space) and
// remove the originals: a 50-part model becomes a handful of draw calls.
export function bakeParts(root, skip = () => false) {
  root.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(root.matrixWorld).invert(), m = new THREE.Matrix4(), by = new Map(), done = [];
  root.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh || skip(o)) return;
    m.multiplyMatrices(inv, o.matrixWorld);
    const multi = Array.isArray(o.material);
    for (const gr of multi ? o.geometry.groups : [null]) {
      let g = o.geometry.clone();
      if (!g.index) g.setIndex(Array.from({ length: g.attributes.position.count }, (_, i) => i));
      if (gr) g.setIndex(Array.from(g.index.array.slice(gr.start, gr.start + gr.count)));
      g.clearGroups();
      g = g.toNonIndexed();
      for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal' && k !== 'uv') g.deleteAttribute(k);
      if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
      if (!g.attributes.normal) g.computeVertexNormals();
      g.applyMatrix4(m);
      if (m.determinant() < 0) for (const a of Object.values(g.attributes)) { // mirrored part: restore the winding
        const n = a.itemSize, arr = a.array;
        for (let i = 0; i < arr.length; i += n * 3) for (let k = 0; k < n; k++) { const t = arr[i + n + k]; arr[i + n + k] = arr[i + 2 * n + k]; arr[i + 2 * n + k] = t; }
      }
      const mat = multi ? o.material[gr.materialIndex] : o.material;
      if (!by.has(mat)) by.set(mat, []);
      by.get(mat).push(g);
    }
    done.push(o);
  });
  for (const o of done) o.parent.remove(o);
  return [...by].map(([material, list]) => ({ material, geometry: mergeGeometries(list) }));
}
export function bakeInto(root, skip) {
  for (const { geometry, material } of bakeParts(root, skip)) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = mesh.receiveShadow = true;
    root.add(mesh);
  }
  return root;
}

// Higher-detail models, all built in metres.
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.1, ...o });

function canvasTex(w, h, draw, srgb = true) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// ---------- Airliner: lathe fuselage with window band and livery ----------
export function createAirliner() {
  const g = new THREE.Group();
  // fuselage profile along its length (x = radius, y = position from tail to nose)
  const prof = [];
  const L = 40;
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    let r;
    if (t < 0.18) r = 0.35 + (2.05 - 0.35) * Math.pow(t / 0.18, 0.7);      // tail cone
    else if (t < 0.86) r = 2.05;                                            // barrel
    else r = 2.05 * Math.sqrt(Math.max(0, 1 - Math.pow((t - 0.86) / 0.14, 2))); // nose
    prof.push(new THREE.Vector2(Math.max(r, 0.02), t * L - L / 2));
  }
  const skin = canvasTex(1024, 256, (c, w, h) => {
    c.fillStyle = '#f5f7fa'; c.fillRect(0, 0, w, h);
    // u wraps around the body, v runs tail->nose. Livery bands near the belly line
    c.fillStyle = '#5b2d8e'; c.fillRect(0, h * 0.5, w, h * 0.06);
    c.fillStyle = '#d8b25a'; c.fillRect(0, h * 0.565, w, h * 0.015);
    c.fillStyle = '#1b2230';
    for (let i = 0; i < 64; i++) { const x = 140 + i * 12.5; if (x > w - 120) break; c.fillRect(x, h * 0.36, 6, 14); c.fillRect(x, h * 0.36 + 0, 6, 14); }
    c.fillRect(w - 95, h * 0.33, 40, 22);
  });
  skin.wrapS = THREE.RepeatWrapping;
  const lathe = new THREE.LatheGeometry(prof, 40);
  // swap uv so the texture's x runs along the plane on both sides
  const uv = lathe.attributes.uv;
  for (let i = 0; i < uv.count; i++) { const u = uv.getX(i), v = uv.getY(i); uv.setXY(i, v, Math.abs(u - 0.5) * 2); }
  const body = new THREE.Mesh(lathe, new THREE.MeshStandardMaterial({ map: skin, roughness: 0.3, metalness: 0.25 }));
  body.rotation.z = -Math.PI / 2;
  body.rotation.x = Math.PI / 2;
  g.add(body);

  const white = std('#eef1f5', { roughness: 0.35, metalness: 0.3 });
  const purple = std('#5b2d8e', { roughness: 0.4 });
  const grey = std('#c9ced6', { metalness: 0.6, roughness: 0.3 });
  const dark = std('#1d2433', { roughness: 0.3 });
  const nacMat = std('#c9ced6', { metalness: 0.6, roughness: 0.3, side: THREE.DoubleSide });
  // swept wings with winglets
  const wing = new THREE.Shape();
  wing.moveTo(0, 0); wing.lineTo(-8.5, 17); wing.lineTo(-10.3, 17); wing.lineTo(-7.5, 0); wing.closePath();
  const wingGeo = new THREE.ExtrudeGeometry(wing, { depth: 0.5, bevelEnabled: true, bevelSize: 0.15, bevelThickness: 0.15, bevelSegments: 2 });
  for (const s of [-1, 1]) {
    const w = new THREE.Mesh(wingGeo, white);
    w.rotation.x = s * -Math.PI / 2;
    w.position.set(4, s > 0 ? -1.3 : -0.8, 0);
    w.rotateZ(s * 0.04);
    g.add(w);
    const winglet = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.4, 0.2), purple);
    winglet.position.set(-5.6, 0.3, s * 17.2); winglet.rotation.z = 0.35; g.add(winglet);
    // engine on pylon
    const nac = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.95, 4.6, 24, 1, true), nacMat);
    nac.rotation.z = Math.PI / 2; nac.position.set(2.6, -2.3, s * 6.4); g.add(nac);
    const fan = new THREE.Mesh(new THREE.CircleGeometry(1.1, 24), dark);
    fan.rotation.y = Math.PI / 2; fan.position.set(4.85, -2.3, s * 6.4); g.add(fan);
    const spinner = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.7, 16), grey);
    spinner.rotation.z = -Math.PI / 2; spinner.position.set(5.1, -2.3, s * 6.4); g.add(spinner);
    const pylon = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.9, 0.4), white);
    pylon.position.set(2.0, -1.45, s * 6.4); g.add(pylon);
    const exhaust = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 16), dark);
    exhaust.rotation.z = Math.PI / 2; exhaust.position.set(-0.1, -2.3, s * 6.4); g.add(exhaust);
    const nav = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), new THREE.MeshBasicMaterial({ color: s > 0 ? '#3dff7a' : '#ff3048' }));
    nav.position.set(-6, -0.5, s * 17.3); nav.userData.blink = true; g.add(nav);
  }
  // tail
  const fin = new THREE.Shape();
  fin.moveTo(0, 0); fin.lineTo(-5.5, 7.6); fin.lineTo(-8, 7.6); fin.lineTo(-7, 0); fin.closePath();
  const finM = new THREE.Mesh(new THREE.ExtrudeGeometry(fin, { depth: 0.4, bevelEnabled: false }), purple);
  finM.position.set(-12, 1.2, -0.2); g.add(finM);
  for (const s of [-1, 1]) {
    const logo = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), std('#d8b25a', { metalness: 0.6, roughness: 0.3 }));
    logo.position.set(-16.6, 5.2, s * 0.22); if (s < 0) logo.rotation.y = Math.PI; g.add(logo);
  }
  const stab = new THREE.Shape();
  stab.moveTo(0, 0); stab.lineTo(-3.4, 6.5); stab.lineTo(-5, 6.5); stab.lineTo(-4.6, 0); stab.closePath();
  const stabGeo = new THREE.ExtrudeGeometry(stab, { depth: 0.25, bevelEnabled: false });
  for (const s of [-1, 1]) { const st = new THREE.Mesh(stabGeo, white); st.rotation.x = s * -Math.PI / 2; st.position.set(-14, s > 0 ? 0.8 : 1.05, 0); g.add(st); }
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), new THREE.MeshBasicMaterial({ color: '#ff4040' }));
  beacon.position.set(0, 2.15, 0); beacon.userData.blink = true; g.add(beacon);
  const strobe = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), new THREE.MeshBasicMaterial({ color: '#fff7d6' }));
  strobe.position.set(17, -1.2, 0); g.add(strobe);
  // gear
  const gear = new THREE.Group();
  const tire = std('#151515', { roughness: 0.9 });
  for (const [x, z] of [[14, 0], [1, 2.6], [1, -2.6]]) {
    { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.8, 8), grey); leg.position.set(x, -2.7, z); gear.add(leg); }
    for (const dz of [-0.35, 0.35]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.4, 16), tire);
      w.rotation.x = Math.PI / 2; w.position.set(x, -3.5, z + dz); gear.add(w);
    }
  }
  g.userData.gear = gear;
  g.userData.groundOffset = 4.05; // metres from origin to tyre bottom
  bakeInto(g, (o) => o.userData.blink);
  bakeInto(gear);
  g.add(gear);
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
  return g;
}

// ---------- Coach with rounded body and window band ----------
export function createCoach(livery = '#e6688e') {
  const g = new THREE.Group();
  const tex = canvasTex(512, 128, (c, w, h) => {
    c.fillStyle = '#f7f4ee'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#18222f'; c.fillRect(20, 18, w - 40, 46);
    c.fillStyle = livery; c.fillRect(0, 78, w, 14);
    c.beginPath(); c.moveTo(w * 0.55, 128); c.quadraticCurveTo(w * 0.75, 60, w, 70); c.lineTo(w, 128); c.fill();
    c.fillStyle = '#d6d2ca'; for (let i = 1; i < 9; i++) c.fillRect(20 + i * (w - 40) / 9, 18, 3, 46);
    c.font = '700 22px sans-serif'; c.fillStyle = '#2b3a67'; c.fillText('TOUR TEST', 30, 112);
  });
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.35, metalness: 0.15 });
  const glass = new THREE.MeshStandardMaterial({ color: '#16202e', emissive: '#ffd59a', emissiveIntensity: 0, roughness: 0.15, metalness: 0.5 });
  glowMats.push({ mat: glass, day: 0, night: 0.7 });
  const white = std('#f7f4ee', { roughness: 0.4 });
  const body = new THREE.Mesh(new RoundedBoxGeometry(2.5, 3.2, 12, 4, 0.35), [white, white, white, std('#3a3d42'), white, white]);
  body.position.y = 2.0;
  g.add(body);
  // windscreen (upper front), destination board, bumper; small rear window
  const ws = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.55), glass); ws.position.set(0, 2.55, -6.005); ws.rotation.y = Math.PI; g.add(ws);
  const dest = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.28), new THREE.MeshBasicMaterial({ color: '#ffb347' })); dest.position.set(0, 3.45, -6.006); dest.rotation.y = Math.PI; g.add(dest);
  const bump = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.35, 0.12), std('#2a2d33')); bump.position.set(0, 0.62, -6.02); g.add(bump);
  const rw = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.9), glass); rw.position.set(0, 2.85, 6.005); g.add(rw);
  const bumpR = bump.clone(); bumpR.position.z = 6.02; g.add(bumpR);
  for (const s of [-1, 1]) {
    const side = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 2.9), mat);
    side.position.set(s * 1.26, 2.0, 0); side.rotation.y = s * Math.PI / 2;
    g.add(side);
    const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.25), std('#1b1b1f'));
    mirror.position.set(s * 1.5, 2.8, -6.15); g.add(mirror);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.06, 0.06), std('#1b1b1f'));
    arm.position.set(s * 1.36, 3.05, -6.1); g.add(arm);
  }
  const tire = std('#141414', { roughness: 0.9 }), rim = std('#c9ced6', { metalness: 0.7, roughness: 0.3 });
  for (const z of [-3.9, 3.3, 4.6]) for (const x of [-1.15, 1.15]) {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.38, 18), tire);
    w.rotation.z = Math.PI / 2; w.position.set(x, 0.55, z); g.add(w);
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.4, 12), rim);
    r.rotation.z = Math.PI / 2; r.position.set(x * 1.01, 0.55, z); g.add(r);
  }
  const head = new THREE.MeshBasicMaterial({ color: '#fff6d8' });
  for (const x of [-0.8, 0.8]) { const h = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), head); h.position.set(x, 0.95, -6.02); g.add(h); }
  const tail = new THREE.MeshBasicMaterial({ color: '#ff2d3c' });
  for (const x of [-0.95, 0.95]) { const h = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.05), tail); h.position.set(x, 1.1, 6.02); g.add(h); }
  return bakeInto(g);
}

// ---------- Shinkansen car (N700-style long nose) ----------
// Nose cross-sections: t = 0 at the body joint, 1 at the tip. Returns the point at
// angle a (0 = side, PI/2 = roof) so the nose skin and the cab glass share one shape.
const NOSE_L = 9.5;
function nosePoint(t, a, out, grow = 0) {
  const k = Math.cos(t * Math.PI / 2);
  const tip = t > 0.9 ? Math.sqrt(Math.max(0, 1 - ((t - 0.9) / 0.1) ** 2)) : 1; // blunt rounded bill
  const w = (0.3 + 1.4 * Math.pow(k, 0.42)) * tip + grow; // stays wide: duck-bill
  const yb = 0.4 + 0.12 * t * t;
  const h = (0.4 + 3.2 * Math.pow(k, 1.15)) * tip + grow; // roof sweeps down early
  const e = 0.32 + 0.5 * Math.min(1, t / 0.5);         // rounded box -> oval
  const c = Math.cos(a), sn = Math.sin(a);
  return out.set(w * Math.sign(c) * Math.pow(Math.abs(c), e), yb + h / 2 + (h / 2) * Math.sign(sn) * Math.pow(Math.abs(sn), e), -t * NOSE_L);
}
function noseGeometry(t0, t1, a0, a1, nt, na, grow = 0) {
  const pos = [], uv = [], idx = [], v = new THREE.Vector3();
  for (let i = 0; i <= nt; i++) for (let j = 0; j <= na; j++) {
    nosePoint(t0 + (t1 - t0) * (i / nt), a0 + (a1 - a0) * (j / na), v, grow);
    pos.push(v.x, v.y, v.z); uv.push(i / nt, (v.y - 0.4) / 3.6); // v by height: livery stripe runs into the nose
  }
  for (let i = 0; i < nt; i++) for (let j = 0; j < na; j++) {
    const p = i * (na + 1) + j;
    idx.push(p, p + na + 1, p + 1, p + 1, p + na + 1, p + na + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}
let trainParts; // shared by every car: 80 cars on the map
function shinkansenParts() {
  if (trainParts) return trainParts;
  const livery = (c, w, h) => {
    c.fillStyle = '#f7f8fa'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#1f4aa8'; c.fillRect(0, h * 0.66, w, h * 0.09); c.fillRect(0, h * 0.79, w, h * 0.03);
  };
  const side = (n) => canvasTex(1024, 128, (c, w, h) => {
    livery(c, w, h);
    c.fillStyle = '#1a2230';
    const step = (w - 150) / n;
    for (let i = 0; i < n; i++) c.fillRect(75 + i * step + step * 0.2, h * 0.3, step * 0.6, h * 0.15);
    c.fillStyle = '#c9ced6'; // doors at both ends
    for (const x of [28, w - 62]) { c.fillRect(x, h * 0.2, 34, h * 0.68); c.fillStyle = '#1a2230'; c.fillRect(x + 9, h * 0.28, 16, h * 0.17); c.fillStyle = '#c9ced6'; }
  });
  const skin = { roughness: 0.3, metalness: 0.25 };
  const win = new THREE.MeshStandardMaterial({ color: '#1a2230', emissive: '#ffe2b0', emissiveIntensity: 0.05, roughness: 0.2, metalness: 0.4 });
  glowMats.push({ mat: win, day: 0.05, night: 1.3 });
  trainParts = {
    mid: new THREE.MeshStandardMaterial({ map: side(17), ...skin }),
    end: new THREE.MeshStandardMaterial({ map: side(10), ...skin }),
    nose: new THREE.MeshStandardMaterial({ map: canvasTex(8, 128, livery), ...skin }),
    plain: new THREE.MeshStandardMaterial({ color: '#f2f4f7', ...skin }),
    under: std('#3a3e45', { roughness: 0.8 }),
    win,
    noseGeo: noseGeometry(0, 1, 0, Math.PI * 2, 30, 40),
    cabGeo: noseGeometry(0.2, 0.4, Math.PI * 0.2, Math.PI * 0.8, 8, 14, 0.03),
    lampGeo: noseGeometry(0.62, 0.7, -0.05, 0.3, 2, 4, 0.03),
  };
  return trainParts;
}
export function createShinkansenCar(isEnd = false) {
  const g = new THREE.Group();
  const L = 25, P = shinkansenParts();
  const bodyL = isEnd ? L - NOSE_L : L - 0.6;
  const m = isEnd ? P.end : P.mid;
  const body = new THREE.Mesh(new RoundedBoxGeometry(3.4, 3.6, bodyL, 4, 0.6), [m, m, P.plain, P.under, P.plain, P.plain]);
  body.position.set(0, 2.2, isEnd ? NOSE_L / 2 : 0);
  g.add(body);
  // bogies and underfloor equipment between them
  for (const z of [-1, 1]) {
    const bz = isEnd && z < 0 ? -L / 2 + NOSE_L + 2.2 : z * (L / 2 - 4);
    const bogie = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.55, 3.4), P.under); bogie.position.set(0, 0.28, bz); g.add(bogie);
  }
  const skirt = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.4, isEnd ? 5 : 11), P.under); skirt.position.set(0, 0.42, isEnd ? 4.5 : 0); g.add(skirt);
  if (isEnd) {
    // lofted nose: starts 0.7 m inside the full body section so there is no seam
    const z0 = -L / 2 + NOSE_L + 0.7;
    const nose = new THREE.Mesh(P.noseGeo, P.nose); nose.position.z = z0; g.add(nose);
    const cab = new THREE.Mesh(P.cabGeo, P.win); cab.position.z = z0; g.add(cab);
    const lampMat = new THREE.MeshBasicMaterial({ color: '#fff4d2' });
    for (const s of [-1, 1]) { const l = new THREE.Mesh(P.lampGeo, lampMat); l.scale.x = s; l.position.z = z0; g.add(l); }
  } else {
    const pm = std('#5a5f68', { metalness: 0.6 });
    const pBase = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.22, 1.4), pm); pBase.position.set(0, 4.08, 2); g.add(pBase);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.7), pm); arm.position.set(0, 4.5, 1.8); arm.rotation.x = -0.5; g.add(arm);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.12), pm); shoe.position.set(0, 4.88, 1.08); g.add(shoe);
  }
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  g.userData.length = L;
  return g;
}

// ---------- Osaka Castle ----------
export function createCastle() {
  const g = new THREE.Group();
  const stone = std('#8e8778', { roughness: 0.95 });
  const wall = std('#f4f1ea', { roughness: 0.6 });
  const roof = std('#3f8f7d', { roughness: 0.45, metalness: 0.2 });
  const gold = std('#e3b44c', { metalness: 0.85, roughness: 0.25 });
  // battered stone base
  const base = new THREE.Mesh(new THREE.CylinderGeometry(26, 34, 18, 4, 1), stone);
  base.rotation.y = Math.PI / 4; base.position.y = 9; g.add(base);
  let y = 18;
  const tiers = [[34, 7], [29, 6.5], [24, 6], [20, 5.5], [16, 5.5]];
  tiers.forEach(([w, h], i) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, w * 0.85), wall);
    b.position.y = y + h / 2; g.add(b);
    const band = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 0.8, w * 0.85 + 0.2), gold);
    band.position.y = y + h - 1.2; g.add(band);
    y += h;
    const r = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.5, (w * 0.85 + 7) * 0.72, 3.2, 4, 1), roof);
    r.rotation.y = Math.PI / 4; r.scale.set(1.15, 1, 0.95); r.position.y = y + 0.7; g.add(r);
    // gable on the sides
    if (i % 2 === 0) {
      for (const sx of [-1, 1]) { // triangular dormer gable, ridge running out from the wall
        const gable = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 5, 3).rotateZ(Math.PI / 2).rotateX(-Math.PI / 2), roof);
        gable.position.set(sx * (w / 2 + 1), y + 1.2, 0); g.add(gable);
        const face = new THREE.Mesh(new THREE.CircleGeometry(2.6, 3).rotateZ(Math.PI / 2).rotateY(sx * Math.PI / 2), wall);
        face.position.set(sx * (w / 2 + 3.52), y + 0.9, 0); g.add(face);
      }
    }
    y += 1.6;
  });
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 9, 5, 4, 1), roof);
  top.rotation.y = Math.PI / 4; top.position.y = y + 2.5; g.add(top);
  for (const s of [-1, 1]) {
    const fish = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2.6, 6), gold);
    fish.position.set(s * 5, y + 3.3, 0); fish.rotation.z = s * 0.6; g.add(fish);
  }
  return bakeInto(g);
}

// ---------- Hakone sightseeing "pirate ship" ----------
export function createPirateShip() {
  const g = new THREE.Group();
  const hullShape = new THREE.Shape();
  hullShape.moveTo(-17, 2); hullShape.lineTo(-15, -2); hullShape.lineTo(14, -2); hullShape.quadraticCurveTo(19, 0, 21, 4); hullShape.lineTo(-17, 4); hullShape.closePath();
  const hull = new THREE.Mesh(new THREE.ExtrudeGeometry(hullShape, { depth: 8, bevelEnabled: true, bevelSize: 0.6, bevelThickness: 0.8 }), std('#7a1f24'));
  hull.position.z = -4; g.add(hull);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(34, 0.4, 8.6), std('#a07548'));
  deck.position.set(1, 4.3, 0); g.add(deck);
  const gold = std('#d9b45a', { metalness: 0.7, roughness: 0.3 });
  const trim = new THREE.Mesh(new THREE.BoxGeometry(36, 0.5, 9.2), gold); trim.position.set(1, 3.6, 0); g.add(trim);
  const castle = new THREE.Mesh(new THREE.BoxGeometry(7, 4, 8.2), std('#5a2a20')); castle.position.set(-13, 6.5, 0); g.add(castle);
  const sail = std('#f3ead8', { side: THREE.DoubleSide, roughness: 0.9 }), wood = std('#4a3020');
  const sprit = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 9, 6), wood);
  sprit.rotation.z = -Math.PI / 2 + 0.3; sprit.position.set(23, 5.6, 0); g.add(sprit);
  for (const z of [-4.2, 4.2]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(34, 1, 0.25), gold); rail.position.set(1, 4.9, z); g.add(rail); }
  for (const z of [-4.12, 4.12]) for (let i = 0; i < 3; i++) { const wdw = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.3), std('#f6d98a', { side: THREE.DoubleSide })); wdw.position.set(-15 + i * 2, 6.7, z); g.add(wdw); }
  for (const [x, h] of [[-4, 20], [5, 24], [13, 17]]) {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, h, 8), wood); mast.position.set(x, 4.5 + h / 2, 0); g.add(mast);
    for (let k = 0; k < 2; k++) {
      const sg = new THREE.PlaneGeometry(1, 1, 8, 6), sp = sg.attributes.position;
      for (let i = 0; i < sp.count; i++) sp.setZ(i, 0.16 * Math.cos(sp.getX(i) * Math.PI) * Math.cos(sp.getY(i) * Math.PI * 0.9)); // wind belly
      sg.computeVertexNormals();
      const sw = 9 - k * 2, sy = 4.5 + h * (0.35 + k * 0.36);
      const s = new THREE.Mesh(sg, sail);
      s.scale.set(sw, h * 0.32, sw); s.rotation.y = Math.PI / 2;
      s.position.set(x + 0.45, sy, 0); g.add(s);
      const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, sw + 1, 6), wood);
      yard.rotation.x = Math.PI / 2; yard.position.set(x + 0.4, sy + h * 0.16, 0); g.add(yard);
    }
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.4), std('#d2283c', { side: THREE.DoubleSide }));
    flag.position.set(x - 1.2, 4.5 + h + 0.6, 0); flag.rotation.y = Math.PI / 2; g.add(flag);
  }
  return bakeInto(g);
}

// ---------- Nara deer ----------
export function createDeerGeometry() {
  const parts = [];
  // barrel body, deeper at the chest than at the haunch
  const b = new THREE.CapsuleGeometry(0.2, 0.62, 4, 10); b.rotateZ(Math.PI / 2);
  { const p = b.attributes.position; for (let i = 0; i < p.count; i++) { const k = 1 + 0.18 * p.getX(i) / 0.51; p.setY(i, p.getY(i) * k * 1.1); p.setZ(i, p.getZ(i) * (0.9 + 0.1 * k)); } }
  b.computeVertexNormals(); b.translate(0, 0.7, 0); parts.push(b);
  const n = new THREE.CylinderGeometry(0.07, 0.13, 0.38, 8); n.rotateZ(-0.5); n.translate(0.52, 0.93, 0); parts.push(n);
  const h = new THREE.SphereGeometry(0.1, 10, 8); h.scale(1.25, 1, 0.95); h.translate(0.63, 1.12, 0); parts.push(h);
  const sn = new THREE.CylinderGeometry(0.045, 0.075, 0.2, 8); sn.rotateZ(-Math.PI / 2 - 0.25); sn.translate(0.79, 1.07, 0); parts.push(sn);
  for (const z of [-1, 1]) { const e = new THREE.ConeGeometry(0.04, 0.15, 5); e.scale(1, 1, 0.5); e.rotateX(z * 0.7); e.rotateZ(0.4); e.translate(0.56, 1.24, z * 0.1); parts.push(e); }
  const tail = new THREE.SphereGeometry(0.06, 6, 5); tail.scale(1, 1.3, 1); tail.translate(-0.53, 0.8, 0); parts.push(tail);
  for (const [x, z, lean] of [[0.36, 0.1, 0.04], [0.36, -0.1, 0.04], [-0.4, 0.1, -0.1], [-0.4, -0.1, -0.1]]) {
    const th = new THREE.CylinderGeometry(0.075, 0.04, 0.32, 6); th.rotateZ(lean); th.translate(x, 0.47, z); parts.push(th);
    const sh = new THREE.CylinderGeometry(0.035, 0.028, 0.34, 6); sh.translate(x + lean * 0.3, 0.17, z); parts.push(sh);
  }
  return mergeAll(parts);
}
function mergeAll(geos) {
  // minimal merge (positions + normals) to avoid an extra import
  let n = 0; geos.forEach((g) => { g.deleteAttribute('uv'); if (g.index) n += g.index.count; else n += g.attributes.position.count; });
  const geo = new THREE.BufferGeometry();
  const pos = [], nor = [];
  for (const g of geos) {
    const ng = g.index ? g.toNonIndexed() : g;
    pos.push(...ng.attributes.position.array); nor.push(...ng.attributes.normal.array);
  }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  return geo;
}

// ---------- Glowing destination beacon (light pillar + ring) ----------
export function createBeacon(color = '#7dffb0') {
  const g = new THREE.Group();
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false, toneMapped: false,
    uniforms: { color: { value: new THREE.Color(color) }, time: { value: 0 }, opacity: { value: 1 } },
    vertexShader: LD.vp + 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);' + LD.v + '}',
    fragmentShader: LD.fp + 'uniform vec3 color; uniform float time; uniform float opacity; varying vec2 vUv; void main(){ float a = pow(1.0 - vUv.y, 1.6) * (0.6 + 0.4*sin(time*3.0 + vUv.y*12.0)); gl_FragColor = vec4(color*1.6, a*opacity);' + LD.f + '}',
  });
  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1, 20, 1, true).translate(0, 0.5, 0), mat);
  g.add(pillar);
  const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, depthWrite: false, toneMapped: false, fog: false, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.8, 1.0, 40).rotateX(-Math.PI / 2), ringMat);
  g.add(ring);
  g.userData.update = (t, size) => {
    mat.uniforms.time.value = t;
    pillar.scale.set(size * 0.25, size * 12, size * 0.25);
    const k = (t * 0.6) % 1;
    ring.scale.setScalar(size * (0.6 + k * 1.8));
    ringMat.opacity = 0.9 * (1 - k);
  };
  g.userData.setOpacity = (o) => { mat.uniforms.opacity.value = o; ring.visible = o > 0.05; pillar.visible = o > 0.02; };
  return g;
}

// ---------- Suvarnabhumi (BKK): louvred canopy on trusses, glass hall, elliptical concourse tube, tower ----------
// Built in metres; front (airside) faces +z, gates at x = -25, 0, 25 like the generic terminal.
export function createSuvarnabhumi(label = 'BKK') {
  const g = new THREE.Group();
  const steel = std('#eef1f4', { roughness: 0.4, metalness: 0.35 });
  const dark = std('#39424d', { roughness: 0.6, metalness: 0.3 });
  // curtain wall: blue glass with a fine mullion grid, lit warm from inside at night
  const wallTex = canvasTex(256, 64, (c, w, h) => {
    const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#9cc7e2'); gr.addColorStop(1, '#4f86ad');
    c.fillStyle = gr; c.fillRect(0, 0, w, h);
    c.fillStyle = 'rgba(255,255,255,0.75)';
    for (let x = 0; x < w; x += 16) c.fillRect(x, 0, 1.5, h);
    for (let y = 0; y < h; y += 16) c.fillRect(0, y, w, 1.2);
  });
  wallTex.wrapS = THREE.RepeatWrapping; wallTex.repeat.set(4, 1);
  const glass = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.08, metalness: 0.65, emissive: '#ffd9a0', emissiveMap: wallTex, emissiveIntensity: 0.04 });
  glowMats.push({ mat: glass, day: 0.04, night: 0.9 });
  // canopy: white louvres with glazed strips
  const roofTex = canvasTex(256, 64, (c, w, h) => {
    c.fillStyle = '#f3f5f7'; c.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 8) { c.fillStyle = '#c9d2da'; c.fillRect(x, 0, 2, h); }
    c.fillStyle = '#7fb0cf'; for (let x = 28; x < w; x += 32) c.fillRect(x, 6, 4, h - 12);
  });
  const roofMat = new THREE.MeshStandardMaterial({ map: roofTex, roughness: 0.45, metalness: 0.3 });
  // concourse skin: white membrane bays alternating with glass bays; the glass glows blue at night
  const bays = (glassCol, membrane) => canvasTex(64, 256, (c, w, h) => {
    c.fillStyle = membrane; c.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 32) { c.fillStyle = glassCol; c.fillRect(0, y + 4, w, 12); c.fillStyle = membrane === '#000' ? '#000' : '#cfd6dc'; c.fillRect(0, y + 3, w, 1.5); c.fillRect(0, y + 16, w, 1.5); }
  });
  const skinTex = bays('#5d9bc4', '#f6f7f8'), skinGlow = bays('#7fd0ff', '#000');
  for (const t of [skinTex, skinGlow]) { t.wrapT = THREE.RepeatWrapping; t.repeat.set(1, 3); }
  const skin = new THREE.MeshStandardMaterial({ map: skinTex, roughness: 0.3, metalness: 0.3, emissive: '#ffffff', emissiveMap: skinGlow, emissiveIntensity: 0.02, side: THREE.DoubleSide });
  glowMats.push({ mat: skin, day: 0.02, night: 1.2 });

  // main hall and the floating canopy on eight truss frames
  const hall = new THREE.Mesh(new RoundedBoxGeometry(94, 12, 20, 3, 1.2), glass); hall.position.set(0, 6, -6); g.add(hall);
  const canopy = new THREE.Mesh(new RoundedBoxGeometry(112, 1.4, 36, 3, 0.6), [steel, steel, roofMat, dark, steel, steel]); canopy.position.set(0, 18, -5); g.add(canopy);
  for (let x = -49; x <= 49; x += 14) {
    const beam = new THREE.Mesh(new RoundedBoxGeometry(1, 1.8, 34, 2, 0.3), steel); beam.position.set(x, 16.6, -5); g.add(beam);
    for (const sz of [-1, 1]) { // legs lean outward like the real super-trusses
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.85, 17, 12), steel);
      leg.position.set(x, 8.2, -5 + sz * 14.5); leg.rotation.x = sz * 0.1; g.add(leg);
    }
  }
  // concourse: half-ellipse tube along the apron with glazed end walls
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 124, 40, 1, true, 0, Math.PI), skin);
  tube.rotation.z = Math.PI / 2; tube.rotation.y = Math.PI / 2; tube.scale.set(8.5, 1, 7);
  const tubeG = new THREE.Group(); tubeG.add(tube); tubeG.rotation.y = Math.PI / 2; tubeG.position.set(0, 0, 11); g.add(tubeG);
  for (const sx of [-1, 1]) {
    const cap = new THREE.Mesh(new THREE.CircleGeometry(1, 24, 0, Math.PI), glass);
    cap.scale.set(7, 8.5, 1); cap.rotation.y = sx * Math.PI / 2; cap.position.set(sx * 62, 0, 11); g.add(cap);
  }
  for (let x = -60; x <= 60; x += 10) { // steel ribs over the skin
    const rib = new THREE.Mesh(new THREE.TorusGeometry(1, 0.035, 6, 28, Math.PI), steel);
    rib.scale.set(7.15, 8.7, 7.15); rib.rotation.y = Math.PI / 2; rib.position.set(x, 0, 11); g.add(rib);
  }
  // jet bridges
  for (const x of [-25, 0, 25]) {
    const br = new THREE.Mesh(new RoundedBoxGeometry(2.6, 2.6, 10, 3, 0.5), steel); br.position.set(x, 4.2, 20.5); g.add(br);
    const win = new THREE.Mesh(new THREE.BoxGeometry(2.66, 0.9, 8.4), glass); win.position.set(x, 4.5, 20.5); g.add(win);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 3, 10), dark); leg.position.set(x, 1.5, 24.5); g.add(leg);
  }
  // sign on the hall front, above the concourse
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(24, 3.6), new THREE.MeshBasicMaterial({ map: textTexture(label, { font: '700 66px sans-serif', color: '#ffffff', bg: '#4c2a7a' }), toneMapped: false }));
  sign.position.set(0, 14.6, 4.2); g.add(sign);
  // gilded Thai pavilion roofs at both ends of the landside
  const gold = std('#d9b25b', { metalness: 0.75, roughness: 0.3 });
  for (const sx of [-1, 1]) {
    const sala = new THREE.Group();
    for (let k = 0; k < 3; k++) {
      const r = new THREE.Mesh(new THREE.ConeGeometry(4.6 - k * 1.2, 2.6, 4, 4), gold);
      const rp = r.geometry.attributes.position; // concave sweep of a Thai roof
      for (let i = 0; i < rp.count; i++) { const t = 1 - (rp.getY(i) + 1.3) / 2.6, f = 1 - 0.28 * Math.sin(t * Math.PI); rp.setX(i, rp.getX(i) * f); rp.setZ(i, rp.getZ(i) * f); }
      r.geometry.computeVertexNormals();
      r.rotation.y = Math.PI / 4; r.position.y = 4.3 + k * 1.9; sala.add(r);
    }
    const fin = new THREE.Mesh(new THREE.ConeGeometry(0.25, 4, 8), gold); fin.position.y = 10.6; sala.add(fin);
    const base = new THREE.Mesh(new RoundedBoxGeometry(6, 3, 6, 2, 0.3), std('#f4efe4')); base.position.y = 1.5; sala.add(base);
    sala.position.set(sx * 62, 0, -6); g.add(sala);
  }
  // control tower: slender flared shaft, glazed cab under a domed cap
  const lathe = (pts, mat) => new THREE.Mesh(new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 36), mat);
  const tower = new THREE.Group();
  tower.add(lathe([[3.4, 0], [2.6, 6], [2.0, 20], [1.8, 40], [2.0, 47], [3.2, 50.5], [5.2, 52.5]], steel));
  tower.add(lathe([[5.2, 52.5], [6.2, 54], [6.4, 56.5], [5.6, 58.5]], glass));
  tower.add(lathe([[5.9, 58.5], [5.4, 59.6], [3.6, 60.8], [0.01, 61.4]], steel));
  tower.add(lathe([[6.6, 52.2], [6.6, 52.8]], dark));
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.18, 7, 8), dark); mast.position.y = 64.5; tower.add(mast);
  const bea = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), new THREE.MeshBasicMaterial({ color: '#ff3a3a' }));
  bea.position.y = 68.2; bea.userData.blink = true; tower.add(bea);
  tower.position.set(70, 0, 6);
  g.add(tower);
  return bakeInto(g, (o) => o.userData.blink || o.material.isMeshBasicMaterial);
}
