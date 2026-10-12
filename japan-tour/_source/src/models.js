import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Materials whose glow follows the time of day: { mat, day, night }
export const glowMats = [];
function glow(color, day, night, extra = {}) {
  const mat = new THREE.MeshStandardMaterial({ color: '#111', emissive: color, emissiveIntensity: day, ...extra });
  glowMats.push({ mat, day, night });
  return mat;
}
export function updateGlow(n) {
  for (const g of glowMats) g.mat.emissiveIntensity = g.day + (g.night - g.day) * n;
}

const std = (color, opts = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0.05, ...opts });

function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = m.receiveShadow = true;
  return m;
}

// ---------- Canvas textures ----------
function windowsTexture(cols, rows, litChance, warm = '#ffd9a0') {
  const c = document.createElement('canvas');
  c.width = cols * 8; c.height = rows * 12;
  const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, c.width, c.height);
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    if (Math.random() < litChance) {
      g.fillStyle = Math.random() < 0.2 ? '#bfe3ff' : warm;
      g.globalAlpha = 0.5 + Math.random() * 0.5;
      g.fillRect(x * 8 + 2, y * 12 + 3, 4, 6);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.magFilter = THREE.NearestFilter;
  return t;
}

function tatamiTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#c9c08a'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 256; i += 3) { g.fillStyle = `rgba(90,80,30,${0.05 + Math.random() * 0.06})`; g.fillRect(0, i, 256, 1); }
  g.fillStyle = '#3b3a2a';
  g.fillRect(0, 0, 256, 6); g.fillRect(0, 125, 256, 6); g.fillRect(0, 250, 256, 6);
  g.fillRect(0, 0, 6, 256); g.fillRect(125, 0, 6, 128); g.fillRect(250, 0, 6, 256); g.fillRect(64, 128, 6, 128); g.fillRect(190, 128, 6, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function shojiTexture() {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#fff3dc'; g.fillRect(0, 0, 128, 256);
  g.fillStyle = '#5a3a22';
  for (let x = 0; x <= 128; x += 32) g.fillRect(Math.min(x, 124), 0, 4, 256);
  for (let y = 0; y <= 256; y += 42) g.fillRect(0, Math.min(y, 252), 128, 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function textTexture(text, { w = 512, h = 128, font = '700 64px sans-serif', color = '#fff', bg = null } = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
  g.font = font; g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---------- Airplane ----------
export function createPlane() {
  const g = new THREE.Group();
  const white = std('#f4f6fa', { roughness: 0.35, metalness: 0.2 });
  const purple = std('#5b2d8e', { roughness: 0.4 });
  const gold = std('#d8b25a', { roughness: 0.35, metalness: 0.6 });
  const dark = std('#1d2433', { roughness: 0.3 });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 20, 24, 1, false), white);
  body.rotation.z = Math.PI / 2;
  g.add(body);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(1.5, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), white);
  nose.scale.set(1, 2.0, 1); nose.rotation.z = -Math.PI / 2; nose.position.x = 10;
  g.add(nose);
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 0.35, 7, 24), white);
  tail.rotation.z = Math.PI / 2; tail.position.set(-13.5, 0.5, 0);
  g.add(tail);
  // cockpit + window strip
  const cockpit = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.45, 2.2), dark);
  cockpit.position.set(11.2, 0.75, 0); g.add(cockpit);
  for (const s of [-1, 1]) {
    const strip = box(17, 0.28, 0.05, dark, 0.5, 0.55, s * 1.49);
    g.add(strip);
    const stripe = box(26, 0.35, 0.05, purple, -1.5, -0.25, s * 1.47);
    g.add(stripe);
    const stripe2 = box(26, 0.12, 0.05, gold, -1.5, -0.6, s * 1.46);
    g.add(stripe2);
  }
  // wings
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0); wingShape.lineTo(-5, 13); wingShape.lineTo(-7.2, 13); wingShape.lineTo(-6, 0); wingShape.closePath();
  const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.35, bevelEnabled: false });
  for (const s of [-1, 1]) {
    const w = new THREE.Mesh(wingGeo, white);
    w.rotation.x = s * Math.PI / 2;
    w.position.set(2.5, -0.6 + (s > 0 ? 0.35 : 0), 0);
    w.scale.y = 1; w.rotation.y = 0;
    w.rotation.z = 0;
    if (s < 0) { w.rotation.x = Math.PI / 2; w.position.y = -0.6; }
    else { w.rotation.x = -Math.PI / 2; w.position.y = -0.25; }
    w.rotateY(s * 0.06);
    g.add(w);
    // engine
    const eng = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.65, 3.2, 20), std('#dfe3ea', { metalness: 0.5, roughness: 0.3 }));
    eng.rotation.z = Math.PI / 2; eng.position.set(1.0, -1.5, s * 5.2); g.add(eng);
    const intake = new THREE.Mesh(new THREE.CircleGeometry(0.62, 20), dark);
    intake.rotation.y = Math.PI / 2; intake.position.set(2.62, -1.5, s * 5.2); g.add(intake);
    // nav lights at wingtips
    const light = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), new THREE.MeshBasicMaterial({ color: s > 0 ? '#3dff7a' : '#ff3048' }));
    light.position.set(-4.6, -0.4, s * 13.1);
    light.userData.blink = true;
    g.add(light);
  }
  // tail fin + stabilizers
  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0); finShape.lineTo(-4.5, 5.6); finShape.lineTo(-6.2, 5.6); finShape.lineTo(-5.2, 0); finShape.closePath();
  const fin = new THREE.Mesh(new THREE.ExtrudeGeometry(finShape, { depth: 0.3, bevelEnabled: false }), purple);
  fin.position.set(-11.5, 1.0, -0.15); g.add(fin);
  const finLogo = new THREE.Mesh(new THREE.CircleGeometry(0.9, 24), gold);
  finLogo.position.set(-15.3, 4.2, 0.17); g.add(finLogo);
  const finLogo2 = finLogo.clone(); finLogo2.position.z = -0.17; finLogo2.rotation.y = Math.PI; g.add(finLogo2);
  const stabShape = new THREE.Shape();
  stabShape.moveTo(0, 0); stabShape.lineTo(-2.5, 4.6); stabShape.lineTo(-3.8, 4.6); stabShape.lineTo(-3.6, 0); stabShape.closePath();
  const stabGeo = new THREE.ExtrudeGeometry(stabShape, { depth: 0.2, bevelEnabled: false });
  for (const s of [-1, 1]) {
    const st = new THREE.Mesh(stabGeo, white);
    st.rotation.x = s > 0 ? -Math.PI / 2 : Math.PI / 2;
    st.position.set(-13, 0.6, 0);
    g.add(st);
  }
  // beacon + landing light
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ color: '#ff4040' }));
  beacon.position.set(0, 1.6, 0); beacon.userData.blink = true; g.add(beacon);
  const landing = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), new THREE.MeshBasicMaterial({ color: '#fff7d6' }));
  landing.position.set(11.8, -0.9, 0); g.add(landing);

  // landing gear (retracts)
  const gear = new THREE.Group();
  const tire = std('#1a1a1a');
  for (const [x, z] of [[8, 0], [0.5, 1.8], [0.5, -1.8]]) {
    const leg = box(0.2, 1.4, 0.2, std('#9aa3b0'), x, -2.0, z);
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.35, 14), tire);
    wheel.rotation.x = Math.PI / 2; wheel.position.set(x, -2.6, z);
    gear.add(leg, wheel);
  }
  g.add(gear);
  g.userData.gear = gear;
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// ---------- Runway with lights ----------
export function createRunway(length, width) {
  const g = new THREE.Group();
  const asphalt = std('#2d3138', { roughness: 0.95 });
  const strip = new THREE.Mesh(new THREE.PlaneGeometry(length, width), asphalt);
  strip.rotation.x = -Math.PI / 2; strip.position.y = 0.05; strip.receiveShadow = true;
  g.add(strip);
  const paint = new THREE.MeshBasicMaterial({ color: '#e8e8e8' });
  for (let x = -length / 2 + 10; x < length / 2 - 10; x += 12) {
    const d = new THREE.Mesh(new THREE.PlaneGeometry(6, 0.5), paint);
    d.rotation.x = -Math.PI / 2; d.position.set(x, 0.07, 0); g.add(d);
  }
  // edge lights (instanced)
  const n = Math.floor(length / 8);
  const lightGeo = new THREE.SphereGeometry(0.22, 6, 6);
  const lightMat = new THREE.MeshBasicMaterial({ color: '#ffe7a8' });
  const inst = new THREE.InstancedMesh(lightGeo, lightMat, n * 2);
  const m = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    const x = -length / 2 + i * 8 + 4;
    m.makeTranslation(x, 0.25, width / 2 + 0.6); inst.setMatrixAt(i * 2, m);
    m.makeTranslation(x, 0.25, -width / 2 - 0.6); inst.setMatrixAt(i * 2 + 1, m);
  }
  g.add(inst);
  g.userData.lights = lightMat;
  return g;
}

// ---------- Terminal building ----------
export function createTerminal({ thai = false, label = 'BKK', towerX = 60 } = {}) {
  const g = new THREE.Group();
  const glass = new THREE.MeshStandardMaterial({ color: '#7fa7c9', roughness: 0.1, metalness: 0.6, emissive: '#ffcf88', emissiveIntensity: 0.05 });
  glowMats.push({ mat: glass, day: 0.05, night: 0.9 });
  const frame = std('#e9edf2', { roughness: 0.4, metalness: 0.3 });
  g.add(box(90, 9, 24, glass, 0, 4.5, 0));
  // wave roof
  const roofGeo = new THREE.CylinderGeometry(30, 30, 96, 48, 1, true, Math.PI / 2 - 0.55, 1.1);
  const roof = new THREE.Mesh(roofGeo, std(thai ? '#d9c08a' : '#f0f2f5', { side: THREE.DoubleSide, metalness: 0.4, roughness: 0.35 }));
  roof.rotation.z = Math.PI / 2; roof.rotation.y = 0; roof.position.set(0, -16.5, 0);
  roof.scale.set(1, 1, 0.92);
  g.add(roof);
  for (let x = -42; x <= 42; x += 12) g.add(box(0.6, 9, 0.6, frame, x, 4.5, 12.3));
  // jet bridges
  for (const x of [-25, 0, 25]) g.add(box(2.4, 2.6, 14, frame, x, 4, 19));
  // sign
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(22, 4), new THREE.MeshBasicMaterial({ map: textTexture(label, { font: '700 70px sans-serif', color: '#ffffff', bg: thai ? '#4c2a7a' : '#a8233a' }), toneMapped: false }));
  sign.position.set(0, 11.5, 12.4);
  g.add(sign);
  if (thai) {
    // slim gold spires as a nod to Thai roofs
    for (const x of [-40, 40]) {
      const sp = new THREE.Mesh(new THREE.ConeGeometry(1.4, 14, 4), std('#d9b25b', { metalness: 0.7, roughness: 0.3 }));
      sp.position.set(x, 16, 0); g.add(sp);
    }
  }
  // control tower
  const tower = new THREE.Group();
  tower.add(box(3.5, 30, 3.5, frame, 0, 15, 0));
  const cab = new THREE.Mesh(new THREE.CylinderGeometry(5, 3.5, 4, 12), glass);
  cab.position.y = 32; tower.add(cab);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(5.6, 5.6, 0.8, 12), frame);
  cap.position.y = 34.4; tower.add(cap);
  const bea = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), new THREE.MeshBasicMaterial({ color: '#ff3a3a' }));
  bea.position.y = 36; bea.userData.blink = true; tower.add(bea);
  tower.position.set(towerX, 0, -6);
  g.add(tower);
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

// ---------- Tour bus ----------
export function createBus() {
  const g = new THREE.Group();
  const body = std('#f6f2ea', { roughness: 0.4, metalness: 0.2 });
  const pink = std('#e6688e', { roughness: 0.4 });
  const glass = new THREE.MeshStandardMaterial({ color: '#1b2a3c', roughness: 0.1, metalness: 0.7, emissive: '#ffd59a', emissiveIntensity: 0.0 });
  glowMats.push({ mat: glass, day: 0.0, night: 0.6 });
  g.add(box(2.6, 2.8, 11, body, 0, 1.9, 0));
  g.add(box(2.64, 0.9, 11.02, glass, 0, 2.5, 0));
  g.add(box(2.66, 0.35, 11.04, pink, 0, 1.2, 0));
  g.add(box(2.5, 1.2, 0.1, glass, 0, 2.4, -5.52));
  const tire = std('#151515');
  for (const z of [-3.6, 3.4]) for (const x of [-1.25, 1.25]) {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.4, 16), tire);
    w.rotation.z = Math.PI / 2; w.position.set(x, 0.55, z); g.add(w);
  }
  const head = new THREE.MeshBasicMaterial({ color: '#fff6d8' });
  for (const x of [-0.9, 0.9]) { const h = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), head); h.position.set(x, 1.0, -5.55); g.add(h); }
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// ---------- People ----------
export function createPerson(color = '#2b3a67', skin = '#f1c9a5') {
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.9, 4, 10), std(color));
  b.position.y = 0.95; g.add(b);
  const h = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 12), std(skin));
  h.position.y = 1.86; g.add(h);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.25, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), std('#2a211c'));
  hair.position.y = 1.88; hair.rotation.x = -0.25; g.add(hair);
  for (const sd of [-1, 1]) { const a = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.62, 3, 6), std(color)); a.position.set(sd * 0.38, 1.12, 0); a.rotation.z = sd * 0.12; g.add(a); }
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

export function createGuide() {
  const g = createPerson('#e6688e');
  const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.05, 18), std('#fafafa'));
  hat.position.y = 2.02; g.add(hat);
  const crown = new THREE.Mesh(new THREE.SphereGeometry(0.23, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), std('#fafafa'));
  crown.position.y = 2.03; g.add(crown);
  const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.5, 3, 6), std('#e6688e'));
  arm.position.set(0.42, 1.5, 0); arm.rotation.z = -0.9; g.add(arm);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.4, 6), std('#c0c0c0', { metalness: 0.8 }));
  pole.position.set(0.45, 2.1, 0); g.add(pole);
  const flagGeo = new THREE.PlaneGeometry(0.9, 0.6, 10, 1);
  const flag = new THREE.Mesh(flagGeo, new THREE.MeshStandardMaterial({ color: '#ffffff', side: THREE.DoubleSide, emissive: '#e6688e', emissiveIntensity: 0.3 }));
  flag.position.set(0.92, 3.0, 0); g.add(flag);
  const dot = new THREE.Mesh(new THREE.CircleGeometry(0.16, 20), new THREE.MeshBasicMaterial({ color: '#d2283c', side: THREE.DoubleSide }));
  dot.position.set(0.92, 3.0, 0.01); g.add(dot);
  const base = flagGeo.attributes.position.array.slice();
  g.userData.update = (t) => {
    const p = flagGeo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = base[i * 3];
      p.setZ(i, Math.sin(t * 5 + x * 5) * 0.08 * (x + 0.45));
    }
    p.needsUpdate = true;
    g.rotation.y = Math.sin(t * 0.8) * 0.15;
  };
  return g;
}

// ---------- Torii gate ----------
export function createTorii(scale = 1, color = '#d8382c') {
  const g = new THREE.Group();
  const red = std(color, { roughness: 0.55 });
  const black = std('#1b1b1f');
  for (const s of [-1, 1]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 6, 12), red);
    p.position.set(s * 2.4, 3, 0); g.add(p);
    g.add(box(0.8, 0.5, 0.8, black, s * 2.4, 0.25, 0));
  }
  g.add(box(6.2, 0.4, 0.45, red, 0, 4.9, 0));
  const kasagi = box(7.6, 0.45, 0.65, black, 0, 5.75, 0);
  g.add(kasagi);
  g.add(box(7.0, 0.35, 0.55, red, 0, 5.4, 0));
  g.add(box(0.35, 0.9, 0.3, red, 0, 5.0, 0));
  g.scale.setScalar(scale);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// ---------- Five-storey pagoda ----------
export function createPagoda() {
  const g = new THREE.Group();
  const red = std('#c9372c', { roughness: 0.6 });
  const roofMat = std('#2c2f38', { roughness: 0.5, metalness: 0.2 });
  const wall = std('#f1e6d2');
  let y = 0;
  g.add(box(9, 1.2, 9, std('#8d8579'), 0, 0.6, 0)); y = 1.2;
  for (let i = 0; i < 5; i++) {
    const w = 6 - i * 0.7, h = 3.0 - i * 0.15;
    g.add(box(w, h, w, wall, 0, y + h / 2, 0));
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, h, 8), red);
      col.position.set(sx * (w / 2 - 0.1), y + h / 2, sz * (w / 2 - 0.1)); g.add(col);
    }
    y += h;
    const roof = new THREE.Mesh(new THREE.ConeGeometry(w * 0.95 + 2.2, 1.6, 4, 1, true), roofMat);
    roof.rotation.y = Math.PI / 4; roof.position.y = y + 0.45;
    roof.material.side = THREE.DoubleSide;
    g.add(roof);
    y += 0.7;
  }
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.2, 6, 8), std('#c9a64a', { metalness: 0.8, roughness: 0.3 }));
  spire.position.y = y + 3; g.add(spire);
  for (let i = 0; i < 7; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.06, 6, 16), std('#c9a64a', { metalness: 0.8 }));
    ring.rotation.x = Math.PI / 2; ring.position.y = y + 1 + i * 0.55; g.add(ring);
  }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

// ---------- Mount Fuji ----------
export function createFuji(radius = 240, height = 270) {
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const r = radius * Math.pow(1 - t, 1.6) * (1 - 0.06 * Math.sin(t * 9)) + (t > 0.97 ? 0 : 6);
    pts.push(new THREE.Vector2(Math.max(r, 0.01), t * height));
  }
  pts.push(new THREE.Vector2(0.01, height - 4));
  const geo = new THREE.LatheGeometry(pts, 96);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const base = new THREE.Color('#3f5a73'), mid = new THREE.Color('#5d6f8f'), snow = new THREE.Color('#f5f8ff');
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const ang = Math.atan2(z, x);
    const ridge = Math.sin(ang * 23) * 0.5 + Math.sin(ang * 51) * 0.3;
    const snowLine = height * (0.66 + ridge * 0.04);
    const r = Math.hypot(x, z);
    // ridged gullies
    const k = 1 + ridge * 0.02 * (y / height);
    pos.setX(i, x * k); pos.setZ(i, z * k);
    if (y > snowLine) c.copy(snow);
    else if (y > snowLine - 14) c.copy(mid).lerp(snow, (y - (snowLine - 14)) / 14 * (0.5 + ridge * 0.5));
    else c.copy(base).lerp(mid, y / snowLine);
    if (r < 1) c.copy(snow);
    colors.set([c.r, c.g, c.b], i * 3);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, flatShading: false }));
  m.receiveShadow = true;
  return m;
}

// ---------- Sakura trees (instanced) ----------
export function createSakuraTrees(positions) {
  const g = new THREE.Group();
  const trunkGeo = new THREE.CylinderGeometry(0.25, 0.45, 4, 7);
  trunkGeo.translate(0, 2, 0);
  const trunks = new THREE.InstancedMesh(trunkGeo, std('#4a3328'), positions.length);
  const blobGeo = new THREE.IcosahedronGeometry(1.6, 1);
  const blobMat = new THREE.MeshStandardMaterial({ color: '#ffb6cb', roughness: 0.8, emissive: '#ff8fb0', emissiveIntensity: 0.08, flatShading: true });
  glowMats.push({ mat: blobMat, day: 0.08, night: 0.22 });
  const blobs = new THREE.InstancedMesh(blobGeo, blobMat, positions.length * 5);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
  const col = new THREE.Color();
  positions.forEach((pos, i) => {
    const sc = 0.8 + Math.random() * 0.6;
    q.setFromEuler(new THREE.Euler(0, Math.random() * 6, 0));
    m.compose(p.set(pos.x, pos.y, pos.z), q, s.setScalar(sc));
    trunks.setMatrixAt(i, m);
    for (let k = 0; k < 5; k++) {
      const a = k / 5 * Math.PI * 2 + Math.random();
      const rr = k === 0 ? 0 : 1.4 * sc;
      p.set(pos.x + Math.cos(a) * rr, pos.y + (4.2 + Math.random() * 1.4) * sc, pos.z + Math.sin(a) * rr);
      q.setFromEuler(new THREE.Euler(Math.random(), Math.random(), Math.random()));
      m.compose(p, q, s.setScalar(sc * (0.9 + Math.random() * 0.5)));
      blobs.setMatrixAt(i * 5 + k, m);
      blobs.setColorAt(i * 5 + k, col.set(['#ffc3d4', '#ffadc6', '#ffd6e2', '#f9a1bd'][Math.floor(Math.random() * 4)]));
    }
  });
  trunks.castShadow = blobs.castShadow = true;
  g.add(trunks, blobs);
  return g;
}

// ---------- Stone lanterns along a path (instanced) ----------
export function createLanterns(points) {
  const g = new THREE.Group();
  const postGeo = mergeGeometries([
    new THREE.BoxGeometry(0.6, 0.3, 0.6).translate(0, 0.15, 0),
    new THREE.CylinderGeometry(0.15, 0.15, 1.2, 6).translate(0, 0.9, 0),
    new THREE.ConeGeometry(0.6, 0.45, 4).rotateY(Math.PI / 4).translate(0, 2.15, 0),
  ]);
  const posts = new THREE.InstancedMesh(postGeo, std('#8f8a80'), points.length);
  const lampMat = glow('#ffb45c', 0.1, 1.5);
  const lamps = new THREE.InstancedMesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), lampMat, points.length);
  const m = new THREE.Matrix4();
  points.forEach((p, i) => {
    m.makeTranslation(p.x, p.y, p.z); posts.setMatrixAt(i, m);
    m.makeTranslation(p.x, p.y + 1.72, p.z); lamps.setMatrixAt(i, m);
  });
  g.add(posts, lamps);
  return g;
}

// ---------- Tokyo-style lattice tower + city ----------
export function createTower() {
  // Built in metres (333 m tall): four flared legs, ring beams and X-bracing per face,
  // main deck at 150 m, top deck at 250 m, antenna above. Orange/white aviation bands.
  const g = new THREE.Group();
  const red = new THREE.MeshStandardMaterial({ color: '#e8502a', roughness: 0.5, emissive: '#ff6a1c', emissiveIntensity: 0 });
  const white = new THREE.MeshStandardMaterial({ color: '#f4f2ee', roughness: 0.5, emissive: '#ffb060', emissiveIntensity: 0 });
  glowMats.push({ mat: red, day: 0, night: 1.6 }, { mat: white, day: 0, night: 1.1 });
  const parts = [[], []];
  const up = new THREE.Vector3(0, 1, 0), d = new THREE.Vector3(), q = new THREE.Quaternion(), m = new THREE.Matrix4(), one = new THREE.Vector3(1, 1, 1);
  const beam = (a, b, th, band) => {
    d.subVectors(b, a); const len = d.length();
    const geo = new THREE.BoxGeometry(th, len, th);
    q.setFromUnitVectors(up, d.normalize());
    geo.applyMatrix4(m.compose(a.clone().add(b).multiplyScalar(0.5), q, one));
    parts[band].push(geo);
  };
  const half = (y) => 38 * Math.exp(-2.4 * y / 250) + 1.5;
  const ys = [0, 34, 62, 86, 107, 126, 143, 158, 172, 186, 199, 211, 222, 232, 241, 250];
  const corner = (y, i) => { const r = half(y); return new THREE.Vector3(i === 0 || i === 3 ? -r : r, y, i < 2 ? -r : r); };
  for (let l = 0; l < ys.length - 1; l++) {
    const band = (l >> 1) % 2, y0 = ys[l], y1 = ys[l + 1];
    for (let i = 0; i < 4; i++) {
      const a0 = corner(y0, i), a1 = corner(y1, i), b0 = corner(y0, (i + 1) % 4), b1 = corner(y1, (i + 1) % 4);
      beam(a0, a1, l < 2 ? 3 : 2.2, band);
      beam(a1, b1, 1.2, band);
      if (l === 0) { // open arch between the feet
        const mid = a1.clone().add(b1).multiplyScalar(0.5);
        beam(a0.clone().lerp(a1, 0.45), mid, 1.4, band); beam(b0.clone().lerp(b1, 0.45), mid, 1.4, band);
      } else { beam(a0, b1, 0.9, band); beam(b0, a1, 0.9, band); }
    }
  }
  // antenna mast, banded
  for (let k = 0; k < 4; k++) {
    const y0 = 256 + k * 19.25, r0 = 3 - k * 0.65, r1 = 3 - (k + 1) * 0.65;
    parts[k % 2].push(new THREE.CylinderGeometry(r1, r0, 19.25, 4).rotateY(Math.PI / 4).translate(0, y0 + 9.6, 0));
  }
  g.add(new THREE.Mesh(mergeGeometries(parts[0]), red), new THREE.Mesh(mergeGeometries(parts[1]), white));
  // decks with a dark window band, and the FootTown building under the legs
  const glass = glow('#ffd9a0', 0.05, 1.8, { color: '#1b2430', roughness: 0.2, metalness: 0.5 });
  const deck = (y, w, h) => { g.add(box(w, h, w, white, 0, y, 0)); g.add(box(w + 0.3, h * 0.45, w + 0.3, glass, 0, y + h * 0.05, 0)); g.add(box(w + 1.2, 0.8, w + 1.2, white, 0, y + h / 2, 0)); };
  deck(150, 30, 11);
  deck(252, 13, 7);
  g.add(box(50, 20, 50, std('#d8d4cc', { roughness: 0.6 }), 0, 10, 0));
  g.add(box(50.3, 2.2, 50.3, glass, 0, 13, 0)); g.add(box(50.3, 2.2, 50.3, glass, 0, 7, 0));
  return g;
}

export function createCity(center, count = 70, spread = [120, 200], avoid = []) {
  const g = new THREE.Group();
  const geo = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  const tex = windowsTexture(16, 40, 0.55);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  const mat = new THREE.MeshStandardMaterial({ color: '#4c5670', roughness: 0.6, metalness: 0.3, emissive: '#ffffff', emissiveMap: tex, emissiveIntensity: 0.05 });
  glowMats.push({ mat, day: 0.05, night: 1.4 });
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
  let i = 0, guard = 0;
  while (i < count && guard++ < 2000) {
    const x = center.x + (Math.random() - 0.5) * spread[0];
    const z = center.z + (Math.random() - 0.5) * spread[1];
    if (avoid.some((a) => Math.hypot(a.x - x, a.z - z) < a.r)) continue;
    const h = 8 + Math.pow(Math.random(), 2) * 45;
    m.compose(p.set(x, 0, z), q, s.set(6 + Math.random() * 8, h, 6 + Math.random() * 8));
    mesh.setMatrixAt(i++, m);
  }
  mesh.count = i;
  mesh.castShadow = mesh.receiveShadow = true;
  g.add(mesh);
  return g;
}

// ---------- Hotel tower with a fully furnished Fuji-view suite on top ----------
export const SUITE = { x: 0, y: 70, z: 0, w: 26, d: 22, h: 8 }; // relative to hotel origin

export function createHotel() {
  const g = new THREE.Group();
  const H = SUITE.y;
  const tex = windowsTexture(12, 36, 0.6);
  // daytime facade: pale stone with dark glazing on the same grid as the lit-window map
  const dc = document.createElement('canvas'); dc.width = 12 * 8; dc.height = 36 * 12;
  const dg = dc.getContext('2d'); dg.fillStyle = '#e6e3dc'; dg.fillRect(0, 0, dc.width, dc.height);
  dg.fillStyle = '#33465c'; for (let y = 0; y < 36; y++) for (let x = 0; x < 12; x++) dg.fillRect(x * 8 + 1, y * 12 + 3, 6, 6);
  const day = new THREE.CanvasTexture(dc); day.colorSpace = THREE.SRGBColorSpace; day.magFilter = THREE.NearestFilter;
  const facade = new THREE.MeshStandardMaterial({ map: day, roughness: 0.45, metalness: 0.15, emissive: '#ffffff', emissiveMap: tex, emissiveIntensity: 0.05 });
  glowMats.push({ mat: facade, day: 0.05, night: 1.6 });
  const body = box(SUITE.w + 4, H, SUITE.d + 2, facade, 0, H / 2, 0);
  g.add(body);
  const trim = std('#c9a64a', { metalness: 0.8, roughness: 0.3 });
  g.add(box(SUITE.w + 5, 0.6, SUITE.d + 3, trim, 0, H, 0));
  for (const x of [-1, 1]) for (const z of [-1, 1]) g.add(box(1.6, H, 1.6, std('#f2efe8'), x * (SUITE.w / 2 + 2), H / 2, z * (SUITE.d / 2 + 1)));
  // podium + entrance canopy
  g.add(box(44, 8, 34, std('#eceae4'), 0, 4, 2));
  g.add(box(14, 0.5, 6, trim, 0, 6.5, -19));
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(26, 4.4), new THREE.MeshBasicMaterial({ map: textTexture('SAKURA GRAND', { font: '600 62px serif', color: '#ffe3ec' }), transparent: true, toneMapped: false }));
  sign.position.set(0, H - 6, -(SUITE.d / 2 + 1.05)); sign.rotation.y = Math.PI;
  g.add(sign);

  // ---- suite interior (glass wall faces -z, toward Mt Fuji) ----
  const s = new THREE.Group();
  s.position.y = H + 0.3;
  const W = SUITE.w, D = SUITE.d, R = SUITE.h;
  const wood = std('#8a5a3c', { roughness: 0.6 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), std('#b98a63', { roughness: 0.5 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; s.add(floor);
  const rug = new THREE.Mesh(new THREE.PlaneGeometry(10, 7), std('#e8dccb', { roughness: 1 }));
  rug.rotation.x = -Math.PI / 2; rug.position.set(-4, 0.02, -3); s.add(rug);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, D), std('#f1ece4'));
  ceil.rotation.x = Math.PI / 2; ceil.position.y = R; s.add(ceil);
  const wallMat = std('#efe7dc', { side: THREE.DoubleSide });
  s.add(box(W, R, 0.3, wallMat, 0, R / 2, D / 2));
  s.add(box(0.3, R, D, wallMat, -W / 2, R / 2, 0));
  s.add(box(0.3, R, D, wallMat, W / 2, R / 2, 0));
  // feature wall with wooden slats behind the bed
  for (let i = 0; i < 20; i++) s.add(box(0.25, R - 0.4, 0.2, wood, 2 + i * 0.5, R / 2, D / 2 - 0.25));
  // glass wall with mullions
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(W, R), new THREE.MeshPhysicalMaterial({ color: '#cfe6ff', transmission: 0.0, transparent: true, opacity: 0.08, roughness: 0.3, metalness: 0.0, specularIntensity: 0.12, side: THREE.DoubleSide, depthWrite: false }));
  glass.position.set(0, R / 2, -D / 2); s.add(glass);
  for (let x = -W / 2; x <= W / 2; x += 6.5) s.add(box(0.15, R, 0.15, trim, x, R / 2, -D / 2));
  // bed
  const bed = new THREE.Group();
  bed.add(box(7, 0.9, 8, wood, 0, 0.45, 0));
  bed.add(box(6.8, 0.6, 7.6, std('#fbfaf6'), 0, 1.15, -0.1));
  bed.add(box(6.9, 0.25, 3.2, std('#c76b88'), 0, 1.5, -2.2));
  for (const x of [-1.8, 1.8]) bed.add(box(2.6, 0.5, 1.2, std('#ffffff'), x, 1.65, 3.0));
  bed.add(box(7.6, 3.4, 0.4, std('#5b3a2a'), 0, 1.7, 3.9));
  bed.position.set(6, 0, 5.5);
  s.add(bed);
  for (const x of [1.4, 10.6]) {
    s.add(box(1.6, 1.2, 1.6, wood, x, 0.6, 9));
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.6, 1.0, 16), glow('#ffd9a0', 1.2, 2.4));
    lamp.position.set(x, 1.8, 9); s.add(lamp);
  }
  // lounge: sofa, coffee table, plant, art
  const sofa = new THREE.Group();
  sofa.add(box(7, 0.9, 2.6, std('#3f4f6b'), 0, 0.45, 0));
  sofa.add(box(7, 1.6, 0.6, std('#3f4f6b'), 0, 1.1, 1.1));
  for (const x of [-3.3, 3.3]) sofa.add(box(0.5, 1.3, 2.6, std('#3f4f6b'), x, 0.85, 0));
  sofa.position.set(-6, 0, 0.5); sofa.rotation.y = Math.PI;
  sofa.rotation.y = 0; s.add(sofa);
  s.add(box(3.6, 0.5, 2, std('#2a2a2e', { metalness: 0.4, roughness: 0.3 }), -6, 0.55, -3.2));
  const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.2, 0.7, 12), std('#e6e0d6')); vase.position.set(-6, 1.15, -3.2); s.add(vase);
  const twig = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), std('#ffb6cb', { flatShading: true })); twig.position.set(-6, 1.8, -3.2); s.add(twig);
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.55, 1.2, 14), std('#2f2f33')); pot.position.set(-11.5, 0.6, -8.5); s.add(pot);
  const leaves = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 1), std('#4f7a4a', { flatShading: true })); leaves.position.set(-11.5, 2.6, -8.5); s.add(leaves);
  const art = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 3), new THREE.MeshBasicMaterial({ map: textTexture('富士', { w: 256, h: 170, font: '700 110px serif', color: '#2a2a2a', bg: '#f2ead8' }) }));
  art.position.set(-W / 2 + 0.2, 4.4, 2); art.rotation.y = Math.PI / 2; s.add(art);
  // cove lighting strip
  const cove = new THREE.Mesh(new THREE.BoxGeometry(W - 1, 0.1, 0.3), glow('#ffd2a0', 1.5, 2.5));
  cove.position.set(0, R - 0.3, D / 2 - 0.5); s.add(cove);
  const pl = new THREE.PointLight('#ffd6a8', 30, 30, 1.6);
  pl.position.set(0, R - 1.5, 2); s.add(pl);
  s.traverse((o) => { if (o.isMesh) o.receiveShadow = true; });
  g.add(s);
  // roof slab above suite
  g.add(box(W + 5, 0.8, D + 3, std('#2d3038'), 0, H + R + 0.7, 0));
  const crown = box(W + 5.4, 0.25, D + 3.4, glow('#ff9ab8', 0.3, 2.2), 0, H + R + 1.2, 0);
  g.add(crown);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// ---------- Ryokan with an open washitsu room (open side faces +x) ----------
export function createRyokan() {
  const g = new THREE.Group();
  const wood = std('#6b4430', { roughness: 0.7 });
  const darkWood = std('#3a2418', { roughness: 0.7 });
  const W = 18, D = 14, H = 4.2, base = 1.2;
  g.add(box(W + 2, base, D + 2, std('#8a8378'), 0, base / 2, 0));
  const engawa = box(2.4, 0.2, D + 2, wood, W / 2 + 1.2, base + 0.1, 0);
  g.add(engawa);
  const tat = tatamiTexture();
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshStandardMaterial({ map: tat, roughness: 0.9 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = base + 0.02; floor.receiveShadow = true; g.add(floor);
  const sh = shojiTexture();
  const shojiMat = new THREE.MeshStandardMaterial({ map: sh, emissive: '#ffcf8a', emissiveMap: sh, emissiveIntensity: 0.1, side: THREE.DoubleSide });
  glowMats.push({ mat: shojiMat, day: 0.1, night: 1.1 });
  // back wall and sides
  g.add(box(0.2, H, D, shojiMat, -W / 2, base + H / 2, 0));
  g.add(box(W, H, 0.2, shojiMat, 0, base + H / 2, -D / 2));
  g.add(box(W, H, 0.2, shojiMat, 0, base + H / 2, D / 2));
  // posts
  for (const [x, z] of [[-W / 2, -D / 2], [-W / 2, D / 2], [W / 2, -D / 2], [W / 2, D / 2], [W / 2, 0], [0, -D / 2], [0, D / 2]]) g.add(box(0.35, H, 0.35, darkWood, x, base + H / 2, z));
  // ceiling
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, D), std('#a07a55'));
  ceil.rotation.x = Math.PI / 2; ceil.position.y = base + H; g.add(ceil);
  // tokonoma with hanging scroll + ikebana
  g.add(box(0.6, 0.3, 5, darkWood, -W / 2 + 0.6, base + 0.15, -3.2));
  const scroll = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.6), new THREE.MeshBasicMaterial({ map: textTexture('一期一会', { w: 128, h: 300, font: '700 40px serif', color: '#1a1a1a', bg: '#f3ead6' }) }));
  scroll.position.set(-W / 2 + 0.15, base + 2.4, -3.2); scroll.rotation.y = Math.PI / 2; g.add(scroll);
  // low table + zabuton
  g.add(box(3.6, 0.15, 2.2, darkWood, 1, base + 0.75, 0));
  for (const [x, z] of [[1, 1.4], [1, -1.4], [-1.4, 0], [3.4, 0]]) {
    g.add(box(0.2, 0.6, 0.2, darkWood, 1 + (x - 1) * 0.0, base + 0.35, 0));
    g.add(box(1.2, 0.18, 1.2, std('#7d2f3c'), x, base + 0.1, z));
  }
  // tea set
  const pot = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 10), std('#2b3a2a')); pot.position.set(1, base + 1.05, 0); g.add(pot);
  // futon
  g.add(box(2.4, 0.3, 5, std('#fbf7ef'), -5, base + 0.15, 3.6));
  g.add(box(2.4, 0.15, 3.2, std('#5c78a8'), -5, base + 0.38, 2.7));
  g.add(box(1.4, 0.3, 0.7, std('#ffffff'), -5, base + 0.4, 5.6));
  // andon lamp
  const andon = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.4, 0.7), glow('#ffcf8a', 0.6, 3));
  andon.position.set(-2.8, base + 0.7, 5.5); g.add(andon);
  const pl = new THREE.PointLight('#ffc68a', 18, 20, 1.6); pl.position.set(0, base + 3, 0); g.add(pl);
  // hip roof
  const roofMat = std('#474c56', { side: THREE.DoubleSide, roughness: 0.55 });
  const hip = (w, d, h, y, x = 0, z = 0) => {
    const geo = new THREE.ConeGeometry(Math.SQRT1_2 * Math.max(w, d), h, 4, 1, true).rotateY(Math.PI / 4);
    const m = new THREE.Mesh(geo, roofMat);
    m.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d));
    m.position.set(x, y + h / 2, z); g.add(m);
    g.add(box(w * 0.98, 0.35, d * 0.98, darkWood, x, y + 0.1, z)); // fascia board
  };
  hip(W + 3.4, D + 3.4, 4.2, base + H);
  // two-storey annex behind the guest room, with its own roof and lit shoji
  const AW = 14, AD = D + 6, AH = 7.5, AX = -W / 2 - AW / 2 - 1.5;
  g.add(box(AW, AH, AD, shojiMat, AX, base + AH / 2, 0));
  for (const z of [-AD / 2, AD / 2]) for (const x of [AX - AW / 2, AX + AW / 2]) g.add(box(0.4, AH, 0.4, darkWood, x, base + AH / 2, z));
  g.add(box(AW + 0.6, 0.4, AD + 0.6, darkWood, AX, base + AH * 0.5, 0)); // floor band
  hip(AW + 3, AD + 3, 4.6, base + AH, AX, 0);
  g.add(box(AW + 6, base, AD + 2, std('#8a8378'), AX, base / 2, 0));
  // private onsen on the deck
  const onsen = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 0.8, 24), std('#7d776c'));
  onsen.position.set(W / 2 + 5, 0.4, -3); g.add(onsen);
  const water = new THREE.Mesh(new THREE.CircleGeometry(2.1, 24), new THREE.MeshStandardMaterial({ color: '#6fb6c9', roughness: 0.05, metalness: 0.3, emissive: '#3a8aa0', emissiveIntensity: 0.3 }));
  water.rotation.x = -Math.PI / 2; water.position.set(W / 2 + 5, 0.82, -3); g.add(water);
  g.userData.onsen = water.position.clone();
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

export { textTexture };
