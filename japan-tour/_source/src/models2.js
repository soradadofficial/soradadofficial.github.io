import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { glowMats } from './models.js';
import { LD } from './fx.js';

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
  // swept wings with winglets
  const wing = new THREE.Shape();
  wing.moveTo(0, 0); wing.lineTo(-8.5, 17); wing.lineTo(-10.3, 17); wing.lineTo(-7.5, 0); wing.closePath();
  const wingGeo = new THREE.ExtrudeGeometry(wing, { depth: 0.5, bevelEnabled: true, bevelSize: 0.15, bevelThickness: 0.15, bevelSegments: 2 });
  for (const s of [-1, 1]) {
    const w = new THREE.Mesh(wingGeo, white);
    w.rotation.x = s * -Math.PI / 2;
    w.position.set(4, -1.0 + (s > 0 ? 0.5 : 0), 0);
    w.rotateZ(s * 0.04);
    g.add(w);
    const winglet = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.4, 0.2), purple);
    winglet.position.set(-5.6, 0.3, s * 17.2); winglet.rotation.z = 0.35; g.add(winglet);
    // engine on pylon
    const nac = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.95, 4.6, 24, 1, true), grey);
    nac.rotation.z = Math.PI / 2; nac.position.set(2.6, -2.3, s * 6.4); g.add(nac);
    const fan = new THREE.Mesh(new THREE.CircleGeometry(1.1, 24), dark);
    fan.rotation.y = Math.PI / 2; fan.position.set(4.85, -2.3, s * 6.4); g.add(fan);
    const spinner = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.7, 16), grey);
    spinner.rotation.z = -Math.PI / 2; spinner.position.set(5.1, -2.3, s * 6.4); g.add(spinner);
    const pylon = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 0.4), white);
    pylon.position.set(2.2, -1.5, s * 6.4); g.add(pylon);
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
  for (const s of [-1, 1]) { const st = new THREE.Mesh(stabGeo, white); st.rotation.x = s * -Math.PI / 2; st.position.set(-14, 0.8, 0); g.add(st); }
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
  g.add(gear);
  g.userData.gear = gear;
  g.userData.groundOffset = 4.05; // metres from origin to tyre bottom
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
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
  const body = new THREE.Mesh(new RoundedBoxGeometry(2.5, 3.2, 12, 4, 0.35), [std('#f7f4ee'), std('#f7f4ee'), std('#f7f4ee'), std('#d0ccc4'), glass, glass]);
  body.position.y = 2.0;
  g.add(body);
  for (const s of [-1, 1]) {
    const side = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 2.9), mat);
    side.position.set(s * 1.26, 2.0, 0); side.rotation.y = s * Math.PI / 2;
    g.add(side);
    const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.25), std('#1b1b1f'));
    mirror.position.set(s * 1.45, 3.0, -5.9); g.add(mirror);
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
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// ---------- Shinkansen car (N700-style long nose) ----------
export function createShinkansenCar(isEnd = false) {
  const g = new THREE.Group();
  const L = 25;
  const tex = canvasTex(1024, 128, (c, w, h) => {
    c.fillStyle = '#f7f8fa'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#1f4aa8'; c.fillRect(0, h * 0.66, w, h * 0.09);
    c.fillStyle = '#1f4aa8'; c.fillRect(0, h * 0.79, w, h * 0.03);
    c.fillStyle = '#1a2230';
    for (let x = 40; x < w - 40; x += 26) c.fillRect(x, h * 0.32, 16, h * 0.18);
  });
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3, metalness: 0.25 });
  const win = new THREE.MeshStandardMaterial({ color: '#1a2230', emissive: '#ffe2b0', emissiveIntensity: 0.05 });
  glowMats.push({ mat: win, day: 0.05, night: 1.3 });
  const body = new THREE.Mesh(new RoundedBoxGeometry(3.4, 3.6, isEnd ? L - 9 : L - 0.6, 4, 0.6), mat);
  body.position.set(0, 2.2, isEnd ? 4.5 : 0);
  g.add(body);
  if (isEnd) {
    // duckbill nose
    const prof = [];
    for (let i = 0; i <= 24; i++) { const t = i / 24; prof.push(new THREE.Vector2(Math.max(0.05, 1.75 * Math.pow(1 - t, 0.75)), t * 9.5)); }
    const nose = new THREE.Mesh(new THREE.LatheGeometry(prof, 28), std('#f7f8fa', { roughness: 0.25, metalness: 0.3 }));
    nose.scale.set(1, 1, 0.62);
    nose.rotation.x = -Math.PI / 2;
    nose.position.set(0, 1.6, -L / 2 + 9.2);
    g.add(nose);
    const cab = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), win);
    cab.scale.set(1.2, 0.6, 2.2); cab.position.set(0, 3.2, -L / 2 + 8.4); g.add(cab);
    const light = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ color: '#fff4d2' }));
    light.position.set(0, 1.2, -L / 2 - 0.2); g.add(light);
  }
  const panto = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.2, 2.4), std('#5a5f68', { metalness: 0.6 }));
  panto.position.set(0, 4.4, 2); panto.rotation.x = 0.4; g.add(panto);
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
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.1, (w * 0.85 + 7) * 0.72, 4.2, 4, 1, true), roof);
    r.rotation.y = Math.PI / 4; r.scale.set(1.15, 1, 0.95); r.position.y = y + 1.2; r.material.side = THREE.DoubleSide; g.add(r);
    // gable on the sides
    if (i % 2 === 0) {
      const gable = new THREE.Mesh(new THREE.ConeGeometry(3.5, 3, 3), roof);
      gable.rotation.z = Math.PI / 2; gable.position.set(w / 2 + 1.5, y + 0.4, 0); g.add(gable);
      const gable2 = gable.clone(); gable2.position.x *= -1; gable2.rotation.z *= -1; g.add(gable2);
    }
    y += 1.6;
  });
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 9, 5, 4, 1), roof);
  top.rotation.y = Math.PI / 4; top.position.y = y + 2.5; g.add(top);
  for (const s of [-1, 1]) {
    const fish = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2.6, 6), gold);
    fish.position.set(s * 5, y + 3.3, 0); fish.rotation.z = s * 0.6; g.add(fish);
  }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
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
  const sail = std('#f3ead8', { side: THREE.DoubleSide, roughness: 0.9 });
  for (const [x, h] of [[-4, 20], [5, 24], [13, 17]]) {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, h, 8), std('#4a3020')); mast.position.set(x, 4.5 + h / 2, 0); g.add(mast);
    for (let k = 0; k < 2; k++) {
      const s = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 6, 4), sail);
      s.scale.set(7.5 - k * 2, h * 0.32, 1); s.rotation.y = Math.PI / 2;
      s.position.set(x + 0.4, 4.5 + h * (0.35 + k * 0.36), 0); g.add(s);
    }
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.4), std('#d2283c', { side: THREE.DoubleSide }));
    flag.position.set(x - 1.2, 4.5 + h + 0.6, 0); flag.rotation.y = Math.PI / 2; g.add(flag);
  }
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

// ---------- Nara deer ----------
export function createDeerGeometry() {
  const parts = [];
  const b = new THREE.CapsuleGeometry(0.28, 0.9, 3, 8); b.rotateZ(Math.PI / 2); b.translate(0, 1.0, 0); parts.push(b);
  const n = new THREE.CylinderGeometry(0.1, 0.14, 0.6, 6); n.rotateZ(-0.6); n.translate(0.6, 1.35, 0); parts.push(n);
  const h = new THREE.SphereGeometry(0.17, 8, 6); h.scale(1.4, 1, 1); h.translate(0.8, 1.62, 0); parts.push(h);
  for (const [x, z] of [[0.45, 0.15], [0.45, -0.15], [-0.45, 0.15], [-0.45, -0.15]]) { const l = new THREE.CylinderGeometry(0.05, 0.04, 0.8, 5); l.translate(x, 0.4, z); parts.push(l); }
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
