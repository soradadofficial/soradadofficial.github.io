import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createBkkAirport, BKK_K as K } from './scenery.js';
import { createAirliner } from './models2.js';
import { createSky, ENV } from './fx.js';
import { Path } from './path.js';
import OSM from './bkk-osm.json';

// Suvarnabhumi in depth: the airfield at one consistent scale (K units per metre), the real
// map around it, a looping simulation of flights, turnarounds and passenger flows, and a
// structure view that strips the skin off the buildings.
const $ = (s) => document.querySelector(s);
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.05, ...o });

// ---------- renderer, scene, light ----------
const renderer = new THREE.WebGLRenderer({ canvas: $('#gl'), antialias: true, logarithmicDepthBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 900 ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = innerWidth >= 900;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog('#cfe3f0', 60, 420);
const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.01, 3000);
const sky = createSky(); scene.add(sky);
{ const e = ENV.day, u = sky.material.uniforms; u.top.value.copy(e.top); u.bottom.value.copy(e.bottom); u.sunColor.value.copy(e.sun); u.sunDir.value.copy(e.sunDir).normalize(); }
scene.add(new THREE.HemisphereLight('#eaf4ff', '#7c8a66', 1.15));
const sun = new THREE.DirectionalLight('#fff6e6', 2.1);
sun.position.set(30, 60, 25); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -32, right: 32, top: 32, bottom: -32, near: 1, far: 160 }); sun.shadow.bias = -0.0004;
scene.add(sun, sun.target);
const controls = new OrbitControls(camera, renderer.domElement);
Object.assign(controls, { enableDamping: true, dampingFactor: 0.08, minDistance: 0.25, maxDistance: 140, maxPolarAngle: Math.PI * 0.49 });

// ---------- airfield (same builder as the tour, aircraft at true scale) ----------
const FREE = [11, 16, 18, 22, 23]; // stands used by the simulated flights
const field = createBkkAirport({ x: 0, z: 0, y: 0, bearing: 14.41, jetScale: K, empty: FREE });
scene.add(field);
const { stands, complex, dep } = field.userData;
{
  const mast = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.6 * K, 0.9 * K, 32 * K, 6).translate(0, 16 * K, 0), std('#e9ebee', { metalness: 0.4, roughness: 0.4 }), stands.length);
  const head = new THREE.InstancedMesh(new THREE.BoxGeometry(7 * K, 1.6 * K, 2.2 * K).translate(0, 32 * K, 0), new THREE.MeshBasicMaterial({ color: '#fff3c4', toneMapped: false }), stands.length);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), lines = [];
  stands.forEach((st, i) => {
    const fx = Math.sin(st.rot), fz = Math.cos(st.rot); // nose direction
    q.setFromAxisAngle(V(0, 1, 0), st.rot); m.compose(V(st.x + fz * 42 * K + fx * 30 * K, 0, st.z - fx * 42 * K + fz * 30 * K), q, V(1, 1, 1)); mast.setMatrixAt(i, m); head.setMatrixAt(i, m);
    lines.push(new THREE.PlaneGeometry(0.9 * K, 120 * K).rotateX(-Math.PI / 2).translate(0, 0.012, -32 * K).rotateY(st.rot).translate(st.x, 0, st.z));
  });
  mast.castShadow = true; field.add(mast, head, new THREE.Mesh(mergeGeometries(lines), new THREE.MeshBasicMaterial({ color: '#f2c230', toneMapped: false })));
}
const BLOCK = { x: 5, z: -5, w: 156, d: 146, deep: 7, top: -2, metres: 62 }; // plate in field units; the section runs from 2 m of fill down to 60 m, about 19x taller than true scale
const ground = new THREE.Mesh(new THREE.PlaneGeometry(BLOCK.w, BLOCK.d).rotateX(-Math.PI / 2), std('#b3b48c', { roughness: 1 }));
ground.position.set(BLOCK.x, -0.004, BLOCK.z); ground.receiveShadow = true; field.add(ground);
// Metres below the original ground. Depths, drains, piles and canal from research/bkk-subsoil-spec.md (sources listed there).
const STRATA = [['ทรายถม 1.5 ม. และผิวทาง', -2, 0, '#c9c4b4'], ['เปลือกดินผิวบน', 0, 2, '#dccba6'], ['ดินเหนียวอ่อนมาก สีเทาเข้ม', 2, 10, '#a9c3d8'], ['ดินเหนียวอ่อนถึงปานกลาง', 10, 15, '#c6d6e2'], ['ดินเหนียวแข็ง', 15, 25, '#ecbfa6'], ['ทรายชั้นแรก (ชั้นน้ำบาดาล)', 25, 47, '#f9e9b8'], ['ดินเหนียวปนทรายแป้ง แข็งมาก', 47, 57, '#dcbccb'], ['ทรายแน่นมาก', 57, 60, '#f1d38a']];
{
  const c = document.createElement('canvas'); c.width = 2048; c.height = 1024; const x = c.getContext('2d'), py = (m) => (m - BLOCK.top) / BLOCK.metres * c.height;
  for (const [, a, b, col] of STRATA) { x.fillStyle = col; x.fillRect(0, py(a), c.width, py(b) - py(a) + 1); }
  x.fillStyle = 'rgba(160,120,60,0.3)'; for (let i = 0; i < 1400; i++) x.fillRect((i * 733) % c.width, py(25) + (i * 197) % (py(47) - py(25)), 4, 4); // sand grains
  x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineWidth = 3; for (let u = 14; u < 1180; u += 28) { x.beginPath(); x.moveTo(u, py(-1.5)); x.lineTo(u, py(10)); x.stroke(); } // 10 m vertical drains
  x.fillStyle = '#5b6470'; for (const [u, tip, w] of [[1500, 26, 9], [1530, 26, 9], [1570, 30, 9], [1600, 30, 9], [1650, 42, 15], [1690, 42, 15], [1730, 42, 15]]) x.fillRect(u, py(-2), w, py(tip) - py(-2)); // terminal piles, tips in the first sand
  x.fillStyle = '#4f9fc4'; x.fillRect(1240, py(-2), 190, py(0.6) - py(-2)); // perimeter canal, drawn wider than its 35 m so it can be seen
  x.fillStyle = 'rgba(60,150,220,0.16)'; x.fillRect(0, py(0.75), c.width, c.height); x.strokeStyle = '#2f8fd6'; x.lineWidth = 4; x.setLineDash([22, 12]); x.beginPath(); x.moveTo(0, py(0.75)); x.lineTo(c.width, py(0.75)); x.stroke(); x.setLineDash([]);
  document.fonts.ready.then(() => {
    x.textBaseline = 'middle';
    const tag = (t, u, v, fg = '#23304a') => { x.font = '600 26px "IBM Plex Sans Thai", Tahoma, sans-serif'; const w = x.measureText(t).width; x.fillStyle = 'rgba(255,255,255,0.86)'; x.fillRect(u, v - 18, w + 20, 36); x.fillStyle = fg; x.fillText(t, u + 10, v + 2); };
    for (const [n, a, b] of STRATA) tag(a < 0 ? n : `${n} · ${a}–${b} ม.`, a < 0 ? 40 : a < 2 ? 430 : 300, py((a + b) / 2));
    tag('ระดับน้ำใต้ดิน ลึก 0.5–1 ม.', 820, py(3.6), '#1f6fb5'); tag('แผ่นระบายน้ำแนวดิ่ง (PVD) ยาว 10 ม. ระยะ 1 ม.', 700, py(7.4));
    tag('คลองระบายน้ำรอบสนามบิน กว้าง 35 ม. ลึก 2 ม.', 1180, py(4.2), '#1f6fb5'); tag('เสาเข็มอาคารผู้โดยสาร ปลาย −26, −30, −42 ม.', 1440, py(50));
    tag('แผนภาพ: ระยะแนวนอนไม่ตามมาตราส่วน', 1440, py(58.5));
    tex.needsUpdate = true;
  });
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = THREE.RepeatWrapping; tex.repeat.x = 11; // one repeat is about twice as wide as the face is deep, the canvas's own shape tex.anisotropy = 8;
  const side = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, fog: false });
  for (const [len, rot, px, pz] of [[BLOCK.w, 0, 0, BLOCK.d / 2], [BLOCK.w, Math.PI, 0, -BLOCK.d / 2], [BLOCK.d, Math.PI / 2, BLOCK.w / 2, 0], [BLOCK.d, -Math.PI / 2, -BLOCK.w / 2, 0]]) {
    const f = new THREE.Mesh(new THREE.PlaneGeometry(len, BLOCK.deep), side); f.rotation.y = rot; f.position.set(BLOCK.x + px, -BLOCK.deep / 2, BLOCK.z + pz); field.add(f);
  }
}
{ const plate = new THREE.Mesh(new THREE.PlaneGeometry(35.5, 22).rotateX(-Math.PI / 2), std('#bcd6a2', { roughness: 1 })); plate.position.set(2.25, -0.002, -8); plate.receiveShadow = true; field.add(plate); } // same bounds as inField() below
sun.target.position.copy(field.localToWorld(V(complex.x, 0, complex.z)));
sun.position.copy(sun.target.position).add(V(30, 60, 25));
// OSM metres (east', north' from the concourse centre) -> field local
const L = ([e, n], y = 0) => V(complex.x + n * K, y, complex.z + e * K);

// ---------- the real map around the airport (OpenStreetMap) ----------
function strip(pts, halfW, y) { // flat ribbon along a polyline, no smoothing: the road as surveyed
  const pos = [], idx = [];
  pts.forEach((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const tx = b.x - a.x, tz = b.z - a.z, l = Math.hypot(tx, tz) || 1, sx = -tz / l * halfW, sz = tx / l * halfW;
    pos.push(p.x + sx, y, p.z + sz, p.x - sx, y, p.z - sz);
    if (i) { const q = (i - 1) * 2; idx.push(q, q + 2, q + 1, q + 1, q + 2, q + 3); }
  });
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); return g;
}
const merged = (geos, mat, shadow = false) => { if (!geos.length) return null; const m = new THREE.Mesh(mergeGeometries(geos.map((g) => { g.computeVertexNormals(); for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal') g.deleteAttribute(k); return g.index ? g.toNonIndexed() : g; })), mat); m.receiveShadow = true; m.castShadow = shadow; field.add(m); return m; };
const mapLayer = new THREE.Group(); field.add(mapLayer);
const flags = []; // [sprite, pole] pairs, faded out when the camera is low
{
  const W = { motorway: 14, trunk: 11, primary: 9, secondary: 7, tertiary: 6, 'motorway-l': 6, 'trunk-l': 5, 'primary-l': 5, 'secondary-l': 4, service: 3.5, unclassified: 4 };
  const big = [], small = [], lit = [];
  for (const r of OSM.roads || []) {
    const pts = r.p.map((q) => L(q)), major = /motorway|trunk|primary/.test(r.k);
    (major ? big : small).push(strip(pts, (W[r.k] || 4) * K, (r.up ? 0.05 : 0.006) + (major ? 0.002 : 0)));
    if (major && !r.k.endsWith('-l')) for (let i = 0; i < pts.length; i += 3) lit.push(pts[i]);
  }
  merged(big, std('#f4f2ec', { roughness: 0.7 }));
  merged(small, std('#d9d6cd', { roughness: 0.8 }));
  const lamps = new THREE.InstancedMesh(new THREE.SphereGeometry(0.01, 6, 4), new THREE.MeshBasicMaterial({ color: '#ff5a4a', toneMapped: false }), lit.length);
  const m = new THREE.Matrix4(); lit.forEach((p, i) => lamps.setMatrixAt(i, m.makeTranslation(p.x, 0.07, p.z))); field.add(lamps);
  merged((OSM.rail || []).filter((r) => !r.tun).map((r) => strip(r.p.map((q) => L(q)), 3 * K, r.up ? 0.09 : 0.012)), std('#6f7f95', { roughness: 0.6 }));
  // water: canals as ribbons, ponds as filled outlines
  const wat = [];
  for (const w of OSM.water || []) {
    if (w.line) wat.push(strip(w.p.map((q) => L(q)), 9 * K, 0.004));
    else { const sh = new THREE.Shape(w.p.map(([e, n]) => new THREE.Vector2(complex.x + n * K, -(complex.z + e * K)))); wat.push(new THREE.ShapeGeometry(sh).rotateX(-Math.PI / 2).translate(0, 0.004, 0)); }
  }
  merged(wat, std('#4f9fc4', { roughness: 0.25, metalness: 0.2 }));
  // buildings: extruded footprints; hangars and terminals get their real names on the info cards
  const walls = [];
  for (const b of OSM.buildings || []) {
    if (b.k === 'terminal') continue; // the passenger complex is the detailed model
    const h = (b.h || (b.lv ? b.lv * 3.6 : b.k === 'hangar' ? 22 : 9)) * K;
    const sh = new THREE.Shape(b.p.map(([e, n]) => new THREE.Vector2(complex.x + n * K, -(complex.z + e * K))));
    walls.push(new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: false }).rotateX(-Math.PI / 2));
  }
  const wallMat = std('#f3f1ec', { roughness: 0.75 });
  wallMat.onBeforeCompile = (sh) => { // window bands by storey and bay on the walls, darker flat roofs
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vW; varying vec3 vN;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvW = (modelMatrix * vec4(position, 1.0)).xyz; vN = normal;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vW; varying vec3 vN;').replace('#include <color_fragment>', `#include <color_fragment>
      if (vN.y < 0.5) { float fl = fract(vW.y / ${(3.6 * K).toFixed(5)}), bay = fract((vW.x + vW.z) / ${(6 * K).toFixed(5)});
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.30, 0.40, 0.50), step(0.3, fl) * step(fl, 0.8) * step(0.18, bay) * 0.8); }
      else diffuseColor.rgb *= 0.86;`);
  };
  merged(walls, wallMat, true);
  // name flags on poles, as on a museum model: blue for canals, yellow for main roads (longest named ones)
  const flag = (text, at, bg, fg) => {
    const c = document.createElement('canvas'), x = c.getContext('2d'); x.font = '600 44px "IBM Plex Sans Thai", Tahoma, sans-serif';
    c.width = Math.ceil(x.measureText(text).width) + 40; c.height = 72;
    x.fillStyle = bg; x.fillRect(0, 0, c.width, c.height); x.font = '600 44px "IBM Plex Sans Thai", Tahoma, sans-serif'; x.fillStyle = fg; x.textBaseline = 'middle'; x.fillText(text, 20, 38);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, toneMapped: false, transparent: true })); sp.center.set(0, 0); sp.scale.set(1.1 * c.width / c.height, 1.1, 1); sp.position.set(at.x, 1.25, at.z);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.25, 5), std('#f4f2ec')); pole.position.set(at.x, 0.625, at.z); pole.material.transparent = true; field.add(sp, pole); flags.push([sp, pole]);
  };
  const longest = (list, n) => { // per name: total length and the middle of its longest piece
    const by = new Map();
    for (const w of list) { if (!w.name) continue; let l = 0; for (let i = 1; i < w.p.length; i++) l += Math.hypot(w.p[i][0] - w.p[i - 1][0], w.p[i][1] - w.p[i - 1][1]); const e = by.get(w.name) || { name: w.name, sum: 0, best: 0 }; e.sum += l; if (l > e.best) { e.best = l; e.at = w.p[w.p.length >> 1]; } by.set(w.name, e); }
    const named = (e) => /สำโรง|บางโฉลง/.test(e.name) ? 1 : 0; // the canals the museum model labels come first
    return [...by.values()].sort((a, b) => named(b) - named(a) || b.sum - a.sum).slice(0, n);
  };
  document.fonts.ready.then(() => {
    for (const w of longest((OSM.water || []).filter((w) => w.line), 10)) flag(w.name, L(w.at), '#1f6fb5', '#ffffff');
    const ring = longest((OSM.water || []).filter((w) => w.line && !w.name && Math.hypot(...w.p[w.p.length >> 1]) < 4500).map((w) => ({ ...w, name: String(w.p[0]) })), 1)[0];
    if (ring) flag('คลองระบายน้ำรอบสนามบิน (กว้าง 35 ม.)', L(ring.at), '#1f6fb5', '#ffffff');
    for (const r of longest((OSM.roads || []).filter((r) => /motorway|trunk|primary/.test(r.k) && !r.k.endsWith('-l')), 7)) flag(r.name, L(r.at), '#f2c230', '#2a2410');
  });
}
// villages and trees outside the fence, as on a scale model
{
  const inField = (x, z) => x > -15.5 && x < 20 && z > -19 && z < 3;
  let s = 99; const rnd = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const tree = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.07, 0), std('#417d4c', { flatShading: true, roughness: 0.95 }), 5200);
  const roof = new THREE.InstancedMesh(new THREE.BoxGeometry(0.16, 0.07, 0.12), std('#ffffff', { roughness: 0.8 }), 2600);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), c = new THREE.Color(); let nt = 0, nr = 0;
  const tones = ['#c2643f', '#b5583a', '#8f9aa6', '#d9d4c8', '#7f5a48', '#a54c35'];
  for (let i = 0; i < 9000 && nt < 5200; i++) { const x = -70 + rnd() * 150, z = -75 + rnd() * 140; if (inField(x, z)) continue; const sc = 0.7 + rnd() * 1.1; m.compose(V(x, 0.07 * sc, z), q, V(sc, sc * (0.8 + rnd() * 0.5), sc)); tree.setMatrixAt(nt, m); tree.setColorAt(nt++, c.set('#417d4c').offsetHSL((rnd() - 0.5) * 0.05, 0, (rnd() - 0.5) * 0.14)); }
  for (let k = 0; k < 60; k++) { const cx = -65 + rnd() * 140, cz = -70 + rnd() * 130; for (let i = 0; i < 44 && nr < 2600; i++) { const x = cx + (rnd() - 0.5) * 5, z = cz + (rnd() - 0.5) * 5; if (inField(x, z)) continue; q.setFromAxisAngle(V(0, 1, 0), rnd() * 3); m.compose(V(x, 0.035, z), q, V(0.7 + rnd(), 1, 0.7 + rnd())); roof.setMatrixAt(nr, m); roof.setColorAt(nr++, c.set(tones[Math.floor(rnd() * tones.length)])); } }
  tree.count = nt; roof.count = nr; tree.castShadow = roof.castShadow = true; field.add(tree, roof);
}

// ---------- structure view: fade the skin, keep the steel ----------
const SKIN = ['Roof', 'Glass', 'Membrane', 'TubeGlass', 'Dark'];
let skins = [];
field.userData.ready.then(() => { complex.holder.traverse((o) => { if (o.isMesh && SKIN.includes(o.material.name)) { o.material.transparent = true; skins.push(o.material); } }); setLayer(layer); });

// ---------- simulated operations ----------
const ops = new THREE.Group(); field.add(ops);
const GO = 4.05 * K; // aircraft origin above the ground
const TW_E = -1.75, TW_W = dep.z + 1.75, XT = complex.x - 3.9; // inner taxiway east, inner taxiway west, cross-field taxiway
const curve = (pts, step = 0.05) => Path.fromControl(pts.map(([x, z, y = GO]) => V(x, y, z)), step);
const FLIGHTS = [
  { no: 'TT 642', route: 'โตเกียว NRT', from: 'เชียงใหม่ CNX', stand: 23 }, { no: 'TT 318', route: 'โอซาก้า KIX', from: 'ภูเก็ต HKT', stand: 22 },
  { no: 'TT 205', route: 'โซล ICN', from: 'สิงคโปร์ SIN', stand: 18 }, { no: 'TT 771', route: 'ฮ่องกง HKG', from: 'นาโกย่า NGO', stand: 16 }, { no: 'TT 096', route: 'ไทเป TPE', from: 'ฟุกุโอกะ FUK', stand: 11 },
];
const PH = [['approach', 16], ['rollout', 9], ['taxiIn', 22], ['park', 48], ['push', 9], ['taxiOut', 36], ['takeoff', 15], ['away', 5]];
const CYCLE = PH.reduce((s, p) => s + p[1], 0);
const STATUS = { approach: 'กำลังร่อนลง', rollout: 'ลงจอดแล้ว', taxiIn: 'แท็กซี่เข้าหลุมจอด', park: 'จอดที่หลุมจอด', push: 'ดันถอย', taxiOut: 'แท็กซี่ไปทางวิ่ง 02R', takeoff: 'ขึ้นบิน', away: 'ออกเดินทางแล้ว' };
const STEPS = [['ต่อสะพานเทียบ', 0, 4], ['ผู้โดยสารขาเข้าลงเครื่อง', 3, 15], ['ขนกระเป๋าลง–ขึ้น', 5, 34], ['เติมน้ำมันจากท่อใต้ลานจอด', 7, 30], ['ขนอาหารและทำความสะอาด', 9, 28], ['ผู้โดยสารขาออกขึ้นเครื่อง', 29, 43], ['ถอดสะพาน ต่อรถดันถอย', 43, 48]];
const gse = {};
const loader = new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath('./draco/'));
const gseReady = loader.loadAsync('./models/gse.glb').then((g) => { for (const n of ['Tug', 'Dispenser', 'Catering', 'BaggageTug', 'Cart', 'Bus']) gse[n] = g.scene.getObjectByName(n); });
const dotGeo = new THREE.SphereGeometry(0.011, 6, 5);
const dots = new THREE.InstancedMesh(dotGeo, new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }), FLIGHTS.length * 36);
dots.frustumCulled = false; ops.add(dots);
const planes = FLIGHTS.map((f, i) => {
  const s = stands[f.stand], nose = V(Math.cos(s.rot), 0, -Math.sin(s.rot)); // unit vector the parked aircraft points along
  const g = createAirliner(); g.scale.setScalar(K); g.traverse((o) => { if (o.isMesh) o.castShadow = true; }); ops.add(g);
  const apron = [s.x - nose.x * 0.75, s.z - nose.z * 0.75]; // just behind the stand, on the apron taxilane
  const arr = curve([[-44, 0.2, 8], [-28, 0.1, 3.2], [-14, 0, 0.5], [-9.6, 0], [0, 0], [2.6, -0.15], [3.43, -1.0], [4.4, TW_E], [Math.min(s.x - 1.2, apron[0] - 0.8), TW_E], [apron[0] - 0.45, (TW_E + apron[1]) / 2], apron, [s.x, s.z]]);
  const split = [arr.closest(V(-9.6, 0, 0)), arr.closest(V(2.0, 0, 0))];
  const pushEnd = [s.x + 0.75, (TW_E + apron[1]) / 2]; // stops on the apron taxilane, clear of arrivals on the inner taxiway
  const push = curve([[s.x, s.z], [s.x - nose.x * 0.5, s.z - nose.z * 0.5], [(apron[0] + pushEnd[0]) / 2 + 0.1, (apron[1] + pushEnd[1]) / 2], pushEnd]);
  const out = curve([pushEnd, [pushEnd[0] + Math.sign(XT - pushEnd[0]) * 0.7, TW_E], [XT + 0.7, TW_E], [XT, TW_E - 0.6], [XT, TW_W + 0.6], [XT - 0.6, TW_W], [dep.x - dep.len / 2 + 1.4, TW_W], [dep.x - dep.len / 2 + 0.5, TW_W - 0.7], [dep.x - dep.len / 2 + 0.55, dep.z - 0.02], [dep.x - dep.len / 2 + 1.2, dep.z]]);
  const tko = curve([[dep.x - dep.len / 2 + 1.2, dep.z], [dep.x + 1, dep.z], [dep.x + 4.5, dep.z, GO + 0.06], [dep.x + 12, dep.z + 0.4, 2.2], [dep.x + 30, dep.z + 6, 7.5], [dep.x + 46, dep.z + 16, 11]]);
  // service point frame at the stand, in metres: +x along the nose, +z to the aircraft's right
  const bay = new THREE.Group(); bay.position.set(s.x, 0, s.z); bay.rotation.y = s.rot; bay.scale.setScalar(K); ops.add(bay);
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 3.4).translate(0.5, 0, 0), std('#eef1f4', { roughness: 0.4 })); bridge.position.set(40, 5, -9); bridge.rotation.y = -0.25; bay.add(bridge);
  const hose = new THREE.Line(new THREE.BufferGeometry().setFromPoints([V(-2, 0.2, 14), V(-2, 3, 9)]), new THREE.LineBasicMaterial({ color: '#ffc46b' })); bay.add(hose);
  const pit = new THREE.Mesh(new THREE.CircleGeometry(1.1, 16).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#ffc46b' })); pit.position.set(-2, 0.15, 14); bay.add(pit);
  const veh = {};
  gseReady.then(() => {
    const add = (n, k = n) => { veh[k] = gse[n].clone(); bay.add(veh[k]); };
    add('Dispenser'); add('Catering'); add('BaggageTug'); add('Cart', 'Cart1'); add('Cart', 'Cart2'); add('Tug');
  });
  // passenger route: aircraft door -> concourse -> junction -> link to the terminal -> kerb
  const legZ = complex.z + Math.sign(s.e) * 405 * K, onBar = Math.abs(s.e) > 500;
  const walk = curve([[s.x + nose.x * 0.12, s.z + nose.z * 0.12, 0.17], onBar ? [complex.x, s.z, 0.17] : [s.x, legZ, 0.17], [complex.x, legZ, 0.17], [complex.x, complex.z, 0.17], [complex.x + 1.6, complex.z, 0.17], [complex.x + 2.13, complex.z, 0.22], [complex.x + 2.75, complex.z, 0.1]], 0.03);
  return { f, g, s, bay, bridge, hose, pit, veh, walk, off: i * (CYCLE / FLIGHTS.length) + 30, phase: 'park', pt: 0, paths: { arr, split, push, out, tko } };
});
// hydrant main: fuel farm -> under the apron -> each simulated stand (schematic route)
const hydrant = new THREE.Group(); ops.add(hydrant);
{
  field.updateMatrixWorld(true);
  const farm = V(complex.x + 4.6, 0, 0.9), pts = [];
  for (const p of planes) { const pit = p.bay.localToWorld(V(-2, 0, 14)); field.worldToLocal(pit); pts.push(farm.clone().setY(0.012), V(pit.x, 0.012, farm.z), V(pit.x, 0.012, farm.z), V(pit.x, 0.012, pit.z)); }
  const ln = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineDashedMaterial({ color: '#ffc46b', dashSize: 0.12, gapSize: 0.08 })); ln.computeLineDistances(); hydrant.add(ln);
  for (let i = 0; i < 6; i++) { const t = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.09, 20), std('#f1f1ee', { metalness: 0.3, roughness: 0.4 })); t.position.set(farm.x + (i % 3) * 0.27, 0.045, farm.z + Math.floor(i / 3) * 0.27); t.castShadow = true; hydrant.add(t); }
}
const tmp = V(0, 0, 0), tan = V(0, 0, 0), dm = new THREE.Matrix4(), col = new THREE.Color();
const ease = (u) => u * u * (3 - 2 * u);
const lerp = (a, b, u) => a + (b - a) * Math.min(1, Math.max(0, u));
function place(p, path, d, back = false) {
  path.at(d, p.g.position); path.tangent(d, tan, 0.12);
  if (back) tan.negate();
  p.g.rotation.set(0, Math.atan2(-tan.z, tan.x), Math.asin(Math.max(-1, Math.min(1, tan.y))) * (back ? -1 : 1), 'YZX');
}
const PAX = 180, FUEL_RATE = 650; // simulated: passengers per flight, litres per second through the dispenser
const tally = { landed: 0, departed: 0, pax: 0, fuel: 0 };
let counting = false; // off while the clock is being set by hand
const fuelling = (p) => p.phase === 'park' && p.pt >= 7 && p.pt < 30;
const stepNow = (p) => p.phase === 'park' ? [...STEPS].reverse().find(([, a, b]) => p.pt >= a && p.pt < b) : null;
// Hurry one flight: its own clock runs 6x until it reaches the wanted phase, so the crew finish what they are doing first.
// ponytail: the other flights keep their slots, so a hurried flight can close up on one ahead; add slot swapping if that matters.
function hurry(p) { if (p.phase === 'park') p.rush = 'push'; else if (['takeoff', 'away', 'approach'].includes(p.phase)) p.rush = 'rollout'; }
const canHurry = (p) => !planes.some((q) => q.rush) && (p.phase === 'park' ? p.pt < 40 : ['takeoff', 'away'].includes(p.phase));
function stepOps(T) {
  let di = 0;
  planes.forEach((p) => {
    let t = (T + p.off) % CYCLE, name = '';
    const was = p.phase;
    for (const [n, dur] of PH) { if (t < dur) { name = n; p.pt = t; p.pu = t / dur; break; } t -= dur; }
    p.phase = name;
    if (counting && was !== name) { if (name === 'rollout') { tally.landed++; tally.pax += PAX; } else if (name === 'away') { tally.departed++; tally.pax += PAX; } }
    const { arr, split, push, out, tko } = p.paths, u = p.pu;
    p.g.visible = name !== 'away';
    p.g.userData.gear.visible = !(name === 'takeoff' && u > 0.55) && !(name === 'approach' && u < 0.35);
    if (name === 'approach') place(p, arr, split[0] * u);
    else if (name === 'rollout') place(p, arr, split[0] + (split[1] - split[0]) * (1 - (1 - u) * (1 - u)));
    else if (name === 'taxiIn') place(p, arr, split[1] + (arr.length - split[1]) * ease(u));
    else if (name === 'park') { p.g.position.set(p.s.x, GO, p.s.z); p.g.rotation.set(0, p.s.rot, 0); }
    else if (name === 'push') place(p, push, push.length * ease(u), true);
    else if (name === 'taxiOut') place(p, out, out.length * ease(u));
    else if (name === 'takeoff') place(p, tko, tko.length * u * u);
    // turnaround at the stand (seconds into the park phase)
    const s = name === 'park' ? p.pt : -1, on = (a, b) => s >= a && s < b;
    p.bridge.scale.x = lerp(1, 27, name === 'park' ? Math.min(s / 3, (48 - s) / 4) : 0);
    p.hose.visible = p.pit.visible = on(7, 30);
    const v = p.veh;
    if (v.Tug) {
      const park = (o, x, z, rot, show, k = 1) => { o.visible = show > 0.01; o.position.set(lerp(x - 70, x, show), 0, lerp(z + 40 * k, z, show)); o.rotation.y = rot; };
      park(v.Dispenser, -2, 15, Math.PI, Math.min((s - 5) / 3, (32 - s) / 3));
      park(v.Catering, -11, 9, Math.PI, Math.min((s - 7) / 3, (30 - s) / 3));
      const shuttle = s < 0 ? 0 : 0.5 + 0.5 * Math.sin(s * 0.5); // baggage train runs between the hold and the sorting hall
      park(v.BaggageTug, 6 + shuttle * 26, -9 - shuttle * 12, Math.PI / 2, on(5, 34) ? 1 : 0, -1);
      park(v.Cart1, 2.5 + shuttle * 26, -9 - shuttle * 12, Math.PI / 2, on(5, 34) ? 1 : 0, -1);
      park(v.Cart2, -1 + shuttle * 26, -9 - shuttle * 12, Math.PI / 2, on(5, 34) ? 1 : 0, -1);
      const tug = Math.min(1, (s - 42) / 3); // tractor couples to the nose gear just before pushback
      v.Tug.visible = tug > 0.01; v.Tug.position.set(lerp(60, 25, tug), 0, 0); v.Tug.rotation.y = -Math.PI / 2;
    }
    // passengers: arrivals walk out (blue), departures walk in (pink)
    const flow = on(3, 15) ? 1 : on(29, 43) ? -1 : 0;
    for (let k = 0; k < 36; k++, di++) {
      if (!flow || layer === 'structure') { dm.makeScale(0, 0, 0); dots.setMatrixAt(di, dm); continue; }
      const w = ((s * 0.035 * flow + k / 36) % 1 + 1) % 1;
      p.walk.at(w * p.walk.length, tmp);
      dm.makeTranslation(tmp.x, tmp.y + 0.01 * Math.sin(k * 2.4), tmp.z); dots.setMatrixAt(di, dm);
      dots.setColorAt(di, col.set(flow > 0 ? '#7fd0ff' : '#f6b6c8'));
    }
  });
  dots.instanceMatrix.needsUpdate = true; if (dots.instanceColor) dots.instanceColor.needsUpdate = true;
}

// ---------- parts of the airport: camera presets and fact cards ----------
const PARTS = [
  { id: 'all', name: 'ทั้งสนามบิน', eye: [-13, 15, 9], at: [5, 0, -7.5], title: 'ท่าอากาศยานสุวรรณภูมิ', text: 'ทางวิ่งขนานสามเส้นวางเหลื่อมกัน อาคารผู้โดยสารอยู่กึ่งกลางระหว่างทางวิ่ง 02R/20L กับ 01/19 เปิดใช้ทางวิ่งเส้นที่สามเมื่อ 1 พ.ย. 2024', facts: [['ทางวิ่ง', '01/19 และ 02L/20R 4,000 ม. · 02R/20L 3,700 ม.'], ['ความกว้าง', '60 ม.'], ['ทิศทางวิ่ง', '014°/194° จริง'], ['ความจุทางวิ่ง', '94 เที่ยวบิน/ชม. (เดิม 68)'], ['ความสูงสนามบิน', '1.5 ม. จากระดับน้ำทะเล']], src: 'Wikipedia · AIP ประเทศไทย' },
  { id: 'mtb', name: 'อาคารหลัก', eye: [15.6, 1.5, -2.2], at: [12.3, 0.15, -6.6], title: 'อาคารผู้โดยสารหลัก', text: 'ห้องโถงกระจกขนาดใหญ่ใต้หลังคาบานเกล็ดที่ลอยอยู่เหนืออาคาร ออกแบบโดย Murphy/Jahn Architects ตอนสร้างเสร็จเป็นอาคารผู้โดยสารที่สร้างในเฟสเดียวที่ใหญ่ที่สุดในโลก', facts: [['ขนาดอาคาร', '444 × 111 ม. · 7 ชั้น'], ['พื้นที่ใช้สอย', '563,000 ตร.ม.'], ['ความจุเดิม', '45 ล้านคน/ปี']], src: 'Structurae · Wikipedia' },
  { id: 'truss', name: 'โครงถักหลังคา', eye: [13.9, 0.55, -4.1], at: [12.4, 0.22, -6.2], layer: 'structure', title: 'หลังคาและโครงถักหลัก', text: 'หลังคาทั้งผืนวางบนโครงถักเหล็กประกอบขนาดใหญ่ 8 ชุด ยื่นออกสองด้านแบบคานยื่นเป็นรูปคลื่น ทำให้ห้องโถงผู้โดยสารไม่ต้องมีเสากลางอาคาร โหมดโครงสร้างจะลอกหลังคาและกระจกให้เห็นโครงเหล็ก', facts: [['ขนาดหลังคา', '561–567 × 210 ม.'], ['โครงถักหลัก', '8 ชุด ชุดละ 2,710 ตัน'], ['จุดรองรับ', 'เสาคู่ 16 ตำแหน่ง']], src: 'Wikipedia · Werner Sobek (วิศวกรโครงสร้าง)' },
  { id: 'tube', name: 'คองคอร์ส', eye: [9.2, 0.5, -2.2], at: [10.2, 0.1, -4.2], title: 'อาคารเทียบเครื่องบิน', text: 'ท่อหน้าตัดโค้งยาวต่อเนื่อง โครงเป็นโครงถักโค้งแบบห้าจุดหมุน คลุมด้วยผ้าใบโปร่งแสงสลับช่องกระจก แนวตะวันออก–ตะวันตกตัดกับขาเหนือ–ใต้สองแนวที่จุดต่อ', facts: [['ความยาวรวม', '3,213 ม.'], ['แนวตะวันออก–ตก', '1,350 ม.'], ['ขาเหนือ–ใต้', '932 ม. × 2'], ['ระยะระหว่างผนังกระจก', '27 ม.'], ['หลุมจอดประชิดอาคาร', '51']], src: 'Italian-Thai Development · Wikipedia' },
  { id: 'stand', name: 'หลุมจอด', eye: [13.1, 0.45, -2.6], at: [12.1, 0.04, -3.77], layer: 'ops', title: 'การบริการภาคพื้นที่หลุมจอด', text: 'ระหว่างจอด เครื่องบินถูกบริการพร้อมกันหลายอย่าง: สะพานเทียบรับ–ส่งผู้โดยสาร รถจ่ายน้ำมันสูบจากหัวจ่ายใต้ลานจอด รถอาหารยกตู้ขึ้นระดับประตู และขบวนรถกระเป๋า ก่อนรถดันถอยจะดันเครื่องออก', facts: [['เติมน้ำมัน', 'ระบบท่อใต้ลานจอด (hydrant)'], ['ลำดับเวลา', 'แบบจำลองโดยประมาณ']], tag: 'จำลอง', src: 'ลำดับงานทั่วไปของการบริการภาคพื้น ไม่ใช่ข้อมูลปฏิบัติการของสนามบิน' },
  { id: 'rwy', name: 'ทางวิ่ง 02R', eye: [-9, 1.6, -15.6], at: [-3, 0, -13.2], layer: 'ops', title: 'ทางวิ่ง 02R/20L', text: 'ทางวิ่งเส้นกลาง ใช้เป็นทางวิ่งขาออกหลัก เครื่องบินจำลองแท็กซี่ข้ามสนามมาเข้าแถวที่หัวทางวิ่งแล้ววิ่งขึ้นไปทางเหนือ', facts: [['ความยาว', '3,700 ม.'], ['ระยะจาก 02L/20R', '400 ม.'], ['ระยะจาก 01/19', '2,200 ม.']], src: 'AIP ประเทศไทย' },
  { id: 'twr', name: 'หอบังคับการ', eye: [14.9, 1.3, -9.9], at: [13.24, 0.55, -7.99], title: 'หอบังคับการบิน', text: 'ตั้งอยู่ฝั่งผู้โดยสารขาเข้าเมือง ทางเหนือค่อนตะวันตกของอาคารหลัก เคยเป็นหอบังคับการบินแบบตั้งอิสระที่สูงที่สุดในโลกช่วงปี 2006–2014', facts: [['ความสูง', '132.2 ม.']], src: 'Wikipedia' },
  { id: 'sat', name: 'SAT-1', eye: [1.2, 1.5, -2.4], at: [3.9, 0.1, -6.6], title: 'อาคารเทียบเครื่องบินรองหลังที่ 1', text: 'อาคารกลางสนามทางใต้ของอาคารหลัก เชื่อมกันด้วยรถไฟฟ้าไร้คนขับในอุโมงค์ใต้ลานจอด เพิ่มความจุของสนามบินเป็น 60 ล้านคนต่อปี', facts: [['พื้นที่', '251,400 ตร.ม.'], ['หลุมจอด', '28 (8 หลุมรองรับ A380/747-8)'], ['ความยาว', 'ราว 1,019 ม.']], src: 'Wikipedia · OpenStreetMap' },
  { id: 'soil', name: 'ชั้นดิน', eye: [5, 0.5, 81.5], at: [5, -3.5, 68], title: 'หน้าตัดชั้นดินใต้สนามบิน', text: 'สนามบินสร้างบนหนองงูเห่าเดิม ซึ่งเป็นดินเหนียวอ่อนมากหนาราว 8 ม. จึงต้องปรับปรุงดินก่อนสร้างทางวิ่ง: ปูทรายหนา 1.5 ม. ระหว่างแผ่นใยสังเคราะห์สองชั้น ปักแผ่นระบายน้ำแนวดิ่ง (PVD) แล้วถมดินกดทับไว้ 6–11 เดือนให้ดินทรุดตัวล่วงหน้า อาคารผู้โดยสารตั้งบนเสาเข็มที่ปลายหยั่งถึงชั้นทราย', facts: [['ดินเหนียวอ่อนมาก', 'ลึก 2–10 ม. · ความชื้น 92–95%'], ['PVD', 'ยาว 10 ม. ระยะ 1 ม. ตารางสี่เหลี่ยม'], ['ดินถมกดทับ', 'สูง 3.8–4.2 ม. นาน 6–11 เดือน'], ['ทางวิ่งเส้นที่ 3', 'PVD รวมกว่า 8,000 กม. ทรุดตัวราว 0.70 ม.'], ['เสาเข็มอาคาร', '25,437 ต้น ปลาย −26 ถึง −42 ม.'], ['เสาหลังคาแต่ละต้น', 'รับน้ำหนักถึง 15,000 ตัน'], ['ลานจอด', 'แผ่นคอนกรีตหนา 450 มม.'], ['คันกั้นน้ำ', 'ยาว 23.5 กม. สูง 3.5 ม.'], ['บ่อพักน้ำ', '6 บ่อ ลึกราว 2 ม.'], ['มาตราส่วนแนวดิ่ง', 'ขยายราว 19 เท่า']], tag: 'แผนภาพ', src: 'Fellenius 2009 (ASCE) · SEAGS–AGSSEA Journal · AIP ประเทศไทย · JSCE · รายการเต็มใน research/bkk-subsoil-spec.md · บางแหล่งระบุดินเหนียวแข็งลึกถึง 30 ม.' },
  { id: 'map', name: 'พื้นที่รอบข้าง', eye: [4, 46, 26], at: [8, 0, -8], title: 'ถนน คลอง และอาคารรอบสนามบิน', text: 'ถนนที่ใช้งานจริง ทางขับ ลานจอด คลอง ทางรถไฟ และผังอาคารรอบสนามบินวาดจากข้อมูล OpenStreetMap ตามพิกัดจริง ถนนสายหลักเป็นเส้นขาวมีจุดไฟ สถานีแอร์พอร์ตเรลลิงก์อยู่ใต้อาคารหลัก', facts: [['แอร์พอร์ตเรลลิงก์', '28.6 กม. ถึงพญาไท'], ['ระยะจากใจกลางเมือง', 'ราว 25 กม.']], src: '© OpenStreetMap contributors (ODbL) · Wikipedia' },
];
let layer = 'overview';
const LAYERS = [['overview', 'ภาพรวม'], ['structure', 'โครงสร้าง'], ['ops', 'การทำงาน']];
function setLayer(id) {
  layer = id;
  document.querySelectorAll('#layers button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.id === id));
  for (const m of skins) { m.opacity = id === 'structure' ? 0.1 : 1; m.depthWrite = id !== 'structure'; }
  hydrant.visible = id !== 'structure';
}
function goto(id) {
  const p = PARTS.find((x) => x.id === id);
  document.querySelectorAll('#parts button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.id === id));
  if (p.layer) setLayer(p.layer);
  const eye = field.localToWorld(V(...p.eye)), at = field.localToWorld(V(...p.at));
  focus = null;
  gsap.to(camera.position, { x: eye.x, y: eye.y, z: eye.z, duration: 1.6, ease: 'power2.inOut' });
  gsap.to(controls.target, { x: at.x, y: at.y, z: at.z, duration: 1.6, ease: 'power2.inOut' });
  $('#card').innerHTML = `${p.tag ? `<span class="tag">${p.tag}</span>` : ''}<h3>${p.title}</h3><p>${p.text}</p><dl>${p.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl><p class="src">ที่มา: ${p.src}</p>`;
}
LAYERS.forEach(([id, name]) => { const b = document.createElement('button'); b.type = 'button'; b.dataset.id = id; b.textContent = name; b.addEventListener('click', () => setLayer(id)); $('#layers').append(b); });
PARTS.forEach((p) => { const b = document.createElement('button'); b.type = 'button'; b.dataset.id = p.id; b.textContent = p.name; b.addEventListener('click', () => goto(p.id)); $('#parts').append(b); });

// ---------- flight board, turnaround steps, clock ----------
let focus = null, focusIdx = 0, followFresh = false, speed = 1, T = 0;
let playing = !matchMedia('(prefers-reduced-motion: reduce)').matches; // starts paused for people who ask for less motion
$('#play').setAttribute('aria-pressed', playing); $('#play').textContent = playing ? 'หยุดชั่วคราว' : 'เล่นต่อ';
$('#early').addEventListener('click', () => { const p = planes[focusIdx]; if (canHurry(p)) { hurry(p); hud(); } });
$('#board').innerHTML = FLIGHTS.map((f, i) => `<tr data-i="${i}"><td>${f.no}</td><td class="rt"></td><td class="st"></td><td><button type="button" data-follow="${i}" aria-label="ตามดูเที่ยวบิน ${f.no}">ตามดู</button></td></tr>`).join('');
document.querySelectorAll('[data-follow]').forEach((b) => b.addEventListener('click', () => { focusIdx = +b.dataset.follow; focus = planes[focusIdx]; followFresh = true; gsap.killTweensOf(camera.position); gsap.killTweensOf(controls.target); setLayer('ops'); document.querySelectorAll('#parts button').forEach((x) => x.setAttribute('aria-pressed', 'false')); }));
[1, 4, 12].forEach((v) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = v + '×'; b.setAttribute('aria-pressed', v === 1); b.addEventListener('click', () => { speed = v; document.querySelectorAll('#speed button').forEach((x) => x.setAttribute('aria-pressed', x === b)); }); $('#speed').append(b); });
$('#play').addEventListener('click', (e) => { playing = !playing; e.currentTarget.setAttribute('aria-pressed', playing); e.currentTarget.textContent = playing ? 'หยุดชั่วคราว' : 'เล่นต่อ'; });
function hud() {
  planes.forEach((p, i) => {
    const row = $(`#board tr[data-i="${i}"]`), inbound = ['approach', 'rollout', 'taxiIn'].includes(p.phase);
    row.dataset.focus = i === focusIdx;
    row.querySelector('.rt').textContent = inbound ? `จาก ${p.f.from}` : `ไป ${p.f.route}`;
    row.querySelector('.st').textContent = STATUS[p.phase];
  });
  const p = planes[focusIdx], s = p.phase === 'park' ? p.pt : p.phase === 'push' ? 99 : -1;
  const now = stepNow(p);
  $('#focusName').textContent = `${p.f.no} · ${now ? `${now[0]} (${STEPS.indexOf(now) + 1}/${STEPS.length})` : STATUS[p.phase]}`;
  const air = ['takeoff', 'away', 'approach'].includes(p.phase);
  $('#early').textContent = p.rush ? 'กำลังเร่งงาน…' : air ? 'เรียกเครื่องลง' : 'ปล่อยเครื่องก่อนเวลา'; $('#early').disabled = !canHurry(p);
  $('#tally').textContent = `ลงจอด ${tally.landed} · ออกเดินทาง ${tally.departed} · ผู้โดยสาร ${tally.pax.toLocaleString('th-TH')} คน · น้ำมัน ${Math.round(tally.fuel).toLocaleString('th-TH')} ล.`;
  $('#busy').value = planes.reduce((n, q) => n + (q.phase === 'park' ? STEPS.filter(([, a, b]) => q.pt >= a && q.pt < b).length : 0), 0);
  $('#steps').innerHTML = STEPS.map(([n, a, b]) => `<li class="${s >= b ? 'done' : s >= a ? 'now' : ''}"><i></i>${n}<small>${a}–${b}</small></li>`).join('');
  const mm = Math.floor(T / 60) % 60, hh = (6 + Math.floor(T / 3600)) % 24;
  $('#clock').textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

// ---------- loop ----------
const fit = () => { // on phones the panels fill the lower half, so the view centre moves up into the free area
  renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight;
  if (innerWidth < 900) camera.setViewOffset(innerWidth, innerHeight, 0, innerHeight * 0.24, innerWidth, innerHeight); else camera.clearViewOffset();
  camera.updateProjectionMatrix();
};
addEventListener('resize', fit); fit();
const clock = new THREE.Clock();
let hudT = 0;
function frame() {
  const dt = Math.min(0.05, clock.getDelta());
  const sim = playing ? dt * speed : 0; // one simulated second per real second at 1x
  T += sim;
  for (const p of planes) { if (p.rush) { if (p.phase === p.rush) p.rush = null; else p.off += sim * 5; } if (fuelling(p)) tally.fuel += sim * (p.rush ? 6 : 1) * FUEL_RATE; }
  counting = sim > 0; stepOps(T); counting = false;
  // map labels: shown from above, gone in low close-ups
  for (const [sp, pole] of flags) { const o = THREE.MathUtils.smoothstep(camera.position.y, 2.5, 6); sp.material.opacity = pole.material.opacity = o; sp.visible = pole.visible = o > 0.02; }
  if (focus && focus.g.visible) { // chase the chosen flight; the user can still orbit and zoom around it
    focus.g.getWorldPosition(tmp); const d = camera.position.distanceTo(tmp);
    camera.position.add(tmp.clone().sub(controls.target)); controls.target.copy(tmp);
    if (d > 2.2 || followFresh) { camera.position.lerp(tmp.clone().add(V(-0.55, 0.32, 0.7)), followFresh ? 1 : 0.05); followFresh = false; }
  }
  controls.update();
  sky.position.copy(camera.position);
  if ((hudT += dt) > 0.25) { hudT = 0; hud(); }
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
camera.position.copy(field.localToWorld(V(-30, 40, 24))); controls.target.copy(field.localToWorld(V(6, 0, -7)));
goto('all'); hud(); frame();
if (location.search.includes('debug')) window.__bkk = { planes, field, camera, controls, goto, setLayer, tally, set T(v) { T = v; }, get T() { return T; },
  // test hook: where every aircraft is at a given time, in metres on the airfield
  at(t) { stepOps(t); const r = planes.map((p) => ({ no: p.f.no, phase: p.phase, shown: p.g.visible, x: p.g.position.x / K, y: p.g.position.y / K, z: p.g.position.z / K })); stepOps(T); return r; } };
