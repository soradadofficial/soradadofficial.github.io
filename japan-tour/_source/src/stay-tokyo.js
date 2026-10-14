import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createSky, ENV } from './fx.js';
import { createTower as createTokyoTower, updateGlow } from './models.js';
import { RING, ATRIUM, CORRIDOR_RING, STOREYS, floorY, floorH, floorLabel, band, floorPlan, findUnit, unitsOn, viewsFor, towerView, COMPASS, TYPES, EAVE, GEO } from './akane-plan.js';
import { FACTS, SERVICES, STATIONS, SHUTTLE, AIRPORT, ONWARD, POLICY, GROUP, BREAKFAST } from './akane-info.js';

// Akane Sky Tokyo in depth: the real tower footprint at true size in Shiba Park, real neighbours
// from OpenStreetMap, Tokyo Tower at its true distance and bearing, a condo-site floor and unit
// picker, and walk-in rooms that look out at the real view. Metres; x east, z south, y up.
const $ = (s) => document.querySelector(s);
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const PHONE = innerWidth < 900, REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches || location.search.includes('instant');
gsap.ticker.lagSmoothing(0); // camera moves keep their real duration even when frames are slow
const fmt = (n) => n.toLocaleString('th-TH');

// ---------- renderer, scene, light ----------
const renderer = new THREE.WebGLRenderer({ canvas: $('#gl'), antialias: true, logarithmicDepthBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, PHONE ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.localClippingEnabled = true;
renderer.shadowMap.enabled = !PHONE;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false; // the scene is static apart from the lifts: shadows are redrawn on demand
const scene = new THREE.Scene();
scene.fog = new THREE.Fog('#c8dcea', 900, 4300);
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.45;
const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.05, 9000);
const sky = createSky(); scene.add(sky);
const hemi = new THREE.HemisphereLight('#eaf4ff', '#8a8f7a', 1.0); scene.add(hemi);
const sun = new THREE.DirectionalLight('#fff3e2', 2.3);
sun.position.set(220, 300, 160); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -260, right: 260, top: 260, bottom: -260, near: 10, far: 900 }); sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.4;
scene.add(sun, sun.target);
const controls = new OrbitControls(camera, renderer.domElement);
Object.assign(controls, { enableDamping: true, dampingFactor: 0.08, minDistance: 6, maxDistance: 1500, maxPolarAngle: Math.PI * 0.49 });

const U = { night: { value: 0 }, hot: { value: new THREE.Vector2(-99, -99) }, sel: { value: new THREE.Vector2(-99, -99) }, time: { value: 0 } };
const cut = new THREE.Plane(V(0, -1, 0), 1e6); // keeps everything below the chosen floor's ceiling
const glowTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.3, 'rgba(255,255,255,0.5)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();

// ---------- the model plate and the city around it ----------
const R = GEO.radius;
const plateTop = new THREE.MeshStandardMaterial({ color: '#e7e1d6', roughness: 0.95, transparent: true, opacity: 1 });
const plate = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 20, 160, 1), [new THREE.MeshStandardMaterial({ color: '#1a2042', roughness: 0.7 }), plateTop, new THREE.MeshBasicMaterial({ color: '#0e1330' })]);
plate.position.y = -10.02; plate.receiveShadow = true; scene.add(plate);
const rim = new THREE.Mesh(new THREE.RingGeometry(R - 0.6, R + 0.25, 160).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#ff7a5c', toneMapped: false }));
rim.position.y = 0.02; scene.add(rim);
const farGround = new THREE.Mesh(new THREE.CircleGeometry(3900, 96).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#b9c3c8', roughness: 1 }));
farGround.position.y = -20; scene.add(farGround);

// Window light for every non-hero building: a storey grid from world height, lit at random after dark.
function cityShader(m) {
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uNight = U.night;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vW; varying vec3 vWN;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
  vec4 akW = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
  akW = instanceMatrix * akW;
  #endif
  vW = (modelMatrix * akW).xyz; vWN = normalize(mat3(modelMatrix) * normal);`);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vW; varying vec3 vWN; uniform float uNight;\nfloat akH(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
  if (abs(vWN.y) < 0.5 && vW.y > 1.0) {
    float s = (abs(vWN.x) > abs(vWN.z)) ? vW.z : vW.x;
    vec2 cell = vec2(floor(s / 2.6), floor(vW.y / 3.3));
    vec2 f = vec2(fract(s / 2.6), fract(vW.y / 3.3));
    float win = step(0.18, f.x) * step(f.x, 0.82) * step(0.3, f.y) * step(f.y, 0.78);
    diffuseColor.rgb *= 1.0 - win * 0.18;
    totalEmissiveRadiance += vec3(1.0, 0.8, 0.52) * win * step(0.55, akH(cell + floor(vW.xz / 37.0))) * uNight * 1.3;
  }`);
  };
  return m;
}
const ctxMat = cityShader(new THREE.MeshStandardMaterial({ color: '#efe9df', roughness: 0.85 }));
{
  const geos = [];
  for (const [h, flat] of GEO.buildings) {
    const s = new THREE.Shape(); for (let i = 0; i < flat.length; i += 2) s[i ? 'lineTo' : 'moveTo'](flat[i], -flat[i + 1]);
    geos.push(new THREE.ExtrudeGeometry(s, { depth: h || 9, bevelEnabled: false }).rotateX(-Math.PI / 2));
  }
  const city = new THREE.Mesh(mergeGeometries(geos), ctxMat); city.castShadow = city.receiveShadow = true; scene.add(city);
}
// Beyond the plate: an illustrative low city (not real buildings, says the page note), so the window views have a horizon.
{
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const N = PHONE ? 900 : 1600, far = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), cityShader(new THREE.MeshStandardMaterial({ color: '#d9d6d0', roughness: 0.9 })), N);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  for (let i = 0; i < N; i++) {
    const r = 480 + Math.pow(rnd(), 0.7) * 2300, a = rnd() * Math.PI * 2, h = 8 + Math.pow(rnd(), 2.2) * (r < 1200 ? 70 : 45);
    q.setFromEuler(e.set(0, rnd() * 3, 0)); m.compose(V(Math.sin(a) * r, -20, Math.cos(a) * r), q, V(18 + rnd() * 30, h + 20, 16 + rnd() * 26)); far.setMatrixAt(i, m);
  }
  scene.add(far);
}

// ---------- landmarks ----------
const P = GEO.places;
const tokyoTower = createTokyoTower(); tokyoTower.position.set(P.tokyoTower.p[0], 0, P.tokyoTower.p[1]); scene.add(tokyoTower);
tokyoTower.traverse((o) => { if (o.isMesh) o.castShadow = true; });
// Far landmarks sit inside the sky dome, so each is brought in along its real bearing and scaled to keep its real apparent size.
const FAR_AT = 3500;
const farPos = (deg, km) => { const a = (deg * Math.PI) / 180, k = FAR_AT / (km * 1000); return { x: Math.sin(a) * FAR_AT, z: -Math.cos(a) * FAR_AT, k }; };
const skytree = (() => {
  const f = GEO.far.find((x) => x.name.includes('สกายทรี')), { x, z, k } = farPos(f.deg, f.km), g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: '#dfe7f0', roughness: 0.5, emissive: '#7fc3ff', emissiveIntensity: 0, fog: false, transparent: true, opacity: 0.8 }); // drawn without fog, as a hazy silhouette
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(4, 34, 634, 12).translate(0, 317, 0), mat));
  for (const [y, r] of [[350, 26], [450, 18]]) g.add(new THREE.Mesh(new THREE.CylinderGeometry(r, r, 18, 16).translate(0, y, 0), mat));
  g.position.set(x, -20, z); g.scale.setScalar(k); scene.add(g); g.userData.mat = mat; return g;
})();
const fuji = (() => {
  const f = GEO.far.find((x) => x.name.includes('ฟูจิ')), { x, z, k } = farPos(f.deg, f.km);
  const geo = new THREE.LatheGeometry([[17500, 0], [9000, 1400], [3200, 3100], [700, 3776], [0, 3776]].map(([r, y]) => new THREE.Vector2(r, y)), 48);
  const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: '#8fa3bf', transparent: true, opacity: 0.55, fog: false }));
  m.position.set(x, -20, z); m.scale.set(k, k, k); scene.add(m); return m;
})();
function label(text, sub, pos, { size = 0.05, color = '#f4efe6', pin = 0 } = {}) {
  const c = document.createElement('canvas'), x = c.getContext('2d'); c.width = 512; c.height = 128;
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const draw = () => {
    x.clearRect(0, 0, 512, 128); x.font = '600 40px "IBM Plex Sans Thai", Tahoma, sans-serif';
    const w = Math.min(500, Math.max(x.measureText(text).width, sub ? (x.font = '400 28px "IBM Plex Sans Thai", Tahoma, sans-serif', x.measureText(sub).width) : 0) + 36);
    x.fillStyle = 'rgba(14,19,48,0.82)'; x.beginPath(); x.roundRect((512 - w) / 2, sub ? 6 : 28, w, sub ? 116 : 72, 22); x.fill();
    x.textAlign = 'center'; x.fillStyle = color; x.font = '600 40px "IBM Plex Sans Thai", Tahoma, sans-serif'; x.fillText(text, 256, sub ? 52 : 78, 480);
    if (sub) { x.fillStyle = 'rgba(244,239,230,0.75)'; x.font = '400 28px "IBM Plex Sans Thai", Tahoma, sans-serif'; x.fillText(sub, 256, 98, 480); }
    tex.needsUpdate = true;
  };
  draw(); document.fonts.ready.then(draw);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, sizeAttenuation: false, depthTest: false, transparent: true }));
  s.scale.set(size * 4, size, 1); s.position.copy(pos); s.renderOrder = 10; s.center.set(0.5, 0); scene.add(s);
  if (pin) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, pin, 6).translate(0, pin / 2, 0), new THREE.MeshBasicMaterial({ color })); p.position.set(pos.x, 0, pos.z); scene.add(p); s.userData.pin = p; }
  return s;
}
const LABELS = [
  label('โตเกียวทาวเวอร์', '333 ม. · ห่าง 380 ม.', V(P.tokyoTower.p[0], 345, P.tokyoTower.p[1]), { color: '#ffb08f' }),
  label('วัดโซโจจิ', null, V(P.zojoji.p[0], 30, P.zojoji.p[1]), { pin: 28 }),
  label('สวนชิบะ', null, V(P.shibaPark.p[0], 16, P.shibaPark.p[1]), { pin: 14, color: '#9be7b0' }),
  label('สถานีอากาบาเนบาชิ', 'เดิน 2 นาที', V(P.akabanebashi.p[0], 26, P.akabanebashi.p[1]), { pin: 24, color: '#7fd0ff' }),
  label('สถานีชิบะโคเอ็น A4', 'เดิน 3 นาที', V(P.shibakoen.p[0], 26, P.shibakoen.p[1]), { pin: 24, color: '#7fd0ff' }),
  label('ป้ายลีมูซีนบัส', 'นาริตะ ราว 130 นาที', V(P.busStop.p[0] + 6, 9, P.busStop.p[1] + 62), { pin: 8, color: '#ffc46b', size: 0.04 }),
];
for (const f of GEO.far) {
  if (f.km < 0.5) continue;
  const a = (f.deg * Math.PI) / 180, d = Math.min(f.km * 1000, FAR_AT), y = f.name.includes('ฟูจิ') ? 150 : f.name.includes('สกายทรี') ? 280 : 90;
  const s = label(f.name, `${f.km} กม.`, V(Math.sin(a) * d, y, -Math.cos(a) * d), { size: 0.038, color: '#cfe3f0' }); s.userData.far = true; LABELS.push(s);
}

// ---------- the hero tower (Blender, real footprint) ----------
const loader = new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath('./draco/'));
const towerMats = [], lit = [];
const tower = new THREE.Group(); scene.add(tower);
function patchGlass(m) {
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, { uNight: U.night, uHot: U.hot, uSel: U.sel, uTime: U.time });
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vAk;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvAk = uv * 100.0;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec2 vAk; uniform float uNight, uTime; uniform vec2 uHot, uSel;\nfloat akH(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
  {
    float u = vAk.x, h = vAk.y, f = fract(u / 1.35);
    float mull = 1.0 - smoothstep(0.03, 0.07, min(f, 1.0 - f));
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.86, 0.88, 0.9), mull * 0.7);
    float fl = h < 9.0 ? -1.0 : floor((h - 9.0) / 2.9);
    float sill = h < 9.0 ? 1.0 : smoothstep(0.95, 1.05, mod(h - 9.0, 2.9));
    float on = h < 9.0 || h > 96.0 ? 1.0 : step(0.4, akH(vec2(floor(u / 4.2), fl)));
    totalEmissiveRadiance += vec3(1.0, 0.8, 0.55) * on * sill * (1.0 - mull) * uNight * 1.1;
    float hot = step(uHot.x, h) * step(h, uHot.y), sel = step(uSel.x, h) * step(h, uSel.y);
    totalEmissiveRadiance += vec3(1.0, 0.45, 0.32) * (hot * 0.5 + sel * (0.55 + 0.25 * sin(uTime * 3.0))) * (1.0 - mull);
  }`);
  };
}
const towerReady = new Promise((ok) => loader.load('./models/akane-tower.glb', (g) => {
  g.scene.traverse((o) => {
    if (!o.isMesh) return;
    o.castShadow = o.receiveShadow = true;
    const m = o.material;
    if (!towerMats.includes(m)) { towerMats.push(m); m.clippingPlanes = [cut]; if (m.name === 'Glass') patchGlass(m); if (m.name === 'CrownGlow') { m.emissive = new THREE.Color('#ffd9a0'); lit.push([m, 2.2]); } }
  });
  tower.add(g.scene); ok();
}, undefined, () => ok()));

// floor highlight band and the lifts in the atrium
const shapeOf = (pts, s = 1) => { const sh = new THREE.Shape(); pts.forEach((p, i) => sh[i ? 'lineTo' : 'moveTo'](p.x * s, -p.z * s)); return sh; };
const holeOf = (pts, s = 1) => { const h = new THREE.Path(); pts.forEach((p, i) => h[i ? 'lineTo' : 'moveTo'](p.x * s, -p.z * s)); return h; };
const bandMat = new THREE.MeshBasicMaterial({ color: '#ff7a5c', transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
const hotBand = new THREE.Mesh(undefined, bandMat); hotBand.visible = false; scene.add(hotBand);
function bandGeo(k) {
  const s = k < 0 ? 1.38 : 1, sh = shapeOf(RING, s * 1.035); sh.holes.push(holeOf(RING, s * 0.985));
  return new THREE.ExtrudeGeometry(sh, { depth: floorH(k) * 0.86, bevelEnabled: false }).rotateX(-Math.PI / 2);
}
const bandCache = new Map(), bandFor = (k) => { if (!bandCache.has(k)) bandCache.set(k, bandGeo(k)); return bandCache.get(k); };
const ac = ATRIUM.reduce((s, p) => ({ x: s.x + p.x / ATRIUM.length, z: s.z + p.z / ATRIUM.length }), { x: 0, z: 0 });
const lifts = [];
{
  const glass = new THREE.MeshStandardMaterial({ color: '#bfe3ff', roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.45, clippingPlanes: [cut] });
  const frame = new THREE.MeshStandardMaterial({ color: '#e8e4dc', roughness: 0.4, metalness: 0.5, emissive: '#fff1d6', emissiveIntensity: 0, clippingPlanes: [cut] });
  lit.push([frame, 0.9]);
  const car = new THREE.Group(); car.add(new THREE.Mesh(new THREE.BoxGeometry(1.67, 2.4, 2.04).translate(0, 1.2, 0), glass), new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.16, 2.16), frame), new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.16, 2.16).translate(0, 2.4, 0), frame));
  for (let b = 0; b < 2; b++) for (let i = 0; i < 4; i++) { // two groups of four observation lifts (real count and car size, spec 1.8)
    const c = car.clone(); c.position.set(ac.x - 3 + i * 2.05, 0, ac.z + (b ? 5.5 : -5.5)); c.rotation.y = b ? 0 : Math.PI;
    c.userData = { top: b ? 32 : 31, phase: (b * 4 + i) * 1.7 }; scene.add(c); lifts.push(c);
  }
}

// ---------- floor plates (drawn when a floor is chosen) ----------
const COLOR = {
  'park-twin': '#7fd0ff', 'deluxe-twin': '#58b4ef', 'corner-king': '#ffc46b', connecting: '#b9a3ff', universal: '#7dffb0', 'park-suite': '#f6b6c8',
  'pano-twin': '#a3b9ff', 'pano-king': '#8098ff', 'pano-corner': '#ffc46b', 'jr-suite': '#ffb3a0', 'prince-suite': '#ff8f7a',
  'premium-king': '#e4c6ff', 'premium-corner': '#ffc46b', 'princess-suite': '#ff7a5c',
  'tower-view-suite': '#ff7a5c', 'panorama-suite': '#ff9a6b', 'familia-suite': '#ffb37a', 'view-bath-suite': '#ffd27a',
  'garden-a': '#9be7b0', 'garden-b': '#7fd6a0', 'garden-c': '#b6efc4', 'garden-d': '#8fdcb0',
};
const zoneColor = (e) => (e.quiet ? '#5a6078' : e.lounge || e.sky ? '#ffd27a' : e.open ? '#cbbf9f' : '#e7d7c0');
const mats = new Map(), matFor = (c, o = {}) => { const key = c + JSON.stringify(o); if (!mats.has(key)) mats.set(key, new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, ...o })); return mats.get(key); };
let plateGroup = null, cellMeshes = [];
const shrink = (poly, d) => { const c = poly.reduce((s, p) => ({ x: s.x + p.x / poly.length, z: s.z + p.z / poly.length }), { x: 0, z: 0 }); return poly.map((p) => { const v = { x: p.x - c.x, z: p.z - c.z }, l = Math.hypot(v.x, v.z); return { x: p.x - (v.x / l) * d, z: p.z - (v.z / l) * d }; }); };
function smallLabel(text, pos, color = '#10142e', bg = 'rgba(255,255,255,0.85)') {
  const c = document.createElement('canvas'), x = c.getContext('2d'); c.width = 512; c.height = 64;
  x.font = '600 32px "IBM Plex Sans Thai", "IBM Plex Mono", sans-serif'; const w = Math.min(506, x.measureText(text).width + 28);
  x.fillStyle = bg; x.beginPath(); x.roundRect(256 - w / 2, 6, w, 52, 14); x.fill(); x.fillStyle = color; x.textAlign = 'center'; x.fillText(text, 256, 43, 490);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, sizeAttenuation: false, depthTest: false, transparent: true })); s.scale.set(0.144, 0.018, 1); s.position.copy(pos); s.renderOrder = 11; return s;
}
function buildPlate(k) {
  if (plateGroup) { scene.remove(plateGroup); plateGroup.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material?.map) o.material.map.dispose(); }); }
  const g = new THREE.Group(), y0 = floorY(k), s = k < 0 ? 1.38 : 1; cellMeshes = [];
  const slab = shapeOf(RING, s); if (k >= -1 && k <= 32) slab.holes.push(holeOf(ATRIUM));
  const sm = new THREE.Mesh(new THREE.ExtrudeGeometry(slab, { depth: 0.3, bevelEnabled: false }).rotateX(-Math.PI / 2), matFor('#f3eee6')); sm.position.y = y0 - 0.3; sm.receiveShadow = true; g.add(sm);
  const corr = shapeOf(CORRIDOR_RING); corr.holes.push(holeOf(ATRIUM));
  const cm = new THREE.Mesh(new THREE.ExtrudeGeometry(corr, { depth: 0.04, bevelEnabled: false }).rotateX(-Math.PI / 2), matFor('#d8c6a8')); cm.position.y = y0; g.add(cm);
  for (const e of floorPlan(k)) {
    const tall = e.type ? 1.05 : 0.1, col = e.type ? COLOR[e.type] : zoneColor(e);
    for (const poly of e.polys) {
      const m = new THREE.Mesh(new THREE.ExtrudeGeometry(shapeOf(shrink(poly, e.type ? 0.16 : 0.08)), { depth: tall, bevelEnabled: false }).rotateX(-Math.PI / 2), matFor(col, e.type && !e.free ? { transparent: true, opacity: 0.45 } : {}).clone());
      m.position.y = y0 + 0.04; m.castShadow = true; m.userData.entry = e; g.add(m); cellMeshes.push(m);
    }
    const lp = V(e.c.x, y0 + 2.2, e.c.z);
    g.add(e.type ? smallLabel(String(e.no), lp) : smallLabel(e.name.split(/[·:(]| \d/)[0].trim(), lp, '#f4efe6', 'rgba(14,19,48,0.78)'));
  }
  scene.add(g); plateGroup = g;
}

// ---------- state, camera moves ----------
const S = { mode: 'all', k: null, unit: null, room: null, night: 0, tab: 'about', filter: '' };
const POSE = { all: PHONE ? [V(200, 150, 480), V(-40, 118, -90)] : [V(235, 85, 165), V(-30, 72, -85)], tower: [V(95, 62, 150), V(-95, 115, -250)], under: [V(70, 48, 95), V(0, -9, 0)] };
let tween = null;
function fly(pos, target, dur = 1.5) {
  tween?.kill();
  const o = { t: 0 }, p0 = camera.position.clone(), t0 = controls.target.clone();
  tween = gsap.to(o, { t: 1, duration: REDUCED ? 0 : dur, ease: 'power2.inOut', onUpdate: () => { camera.position.lerpVectors(p0, pos, o.t); controls.target.lerpVectors(t0, target, o.t); } });
}
const floorPose = (k) => { const y = floorY(k), d = k < 0 ? 85 : 62; return [V(d * 0.62, y + d * 0.78, d * 0.82), V(0, y, 0)]; };
const floorAt = (y) => { if (y < 0) return y < -5 ? -2 : -1; for (const k of STOREYS) if (k > 0 && y < floorY(k) + floorH(k)) return k; return 33; };
const range = (k) => new THREE.Vector2(floorY(k), floorY(k) + floorH(k));
const BAND = { base: ['ใต้ดิน', '#9aa4b8'], lobby: ['ล็อบบี้', '#ffc46b'], garden: ['การ์เดน', '#7dffb0'], park: ['Park', '#7fd0ff'], pano: ['Panoramic', '#a3b9ff'], club: ['Premium Club', '#f6b6c8'], suite: ['สวีทและคลับเลานจ์', '#ff9a6b'], sky: ['ชั้นลอยฟ้า', '#ffd27a'] };
const USE = (k) => (k === -2 ? 'สปา ออนเซ็น สระ 25 ม. โบว์ลิ่ง' : k === -1 ? 'ห้องอาหาร 7 แห่ง บาร์' : k === 1 ? 'ล็อบบี้ เลานจ์ ร้านค้า' : k === 2 ? 'การ์เดนสวีท สวน ศาลเจ้า' : k === 33 ? 'Stellar Garden สกายบาร์' : k === 32 ? 'สวีท 5 แบบ · คลับเลานจ์' : k >= 29 ? 'Premium Club' : k >= 19 ? (k === 25 ? 'Panoramic · ชั้นสูบบุหรี่' : 'Panoramic') : 'Park');

function setHot(k) {
  if (k == null || S.room) { hotBand.visible = false; U.hot.value.set(-99, -99); } else { hotBand.geometry = bandFor(k); hotBand.position.y = floorY(k) + floorH(k) * 0.07; hotBand.visible = true; U.hot.value.copy(range(k)); }
  document.querySelectorAll('#stack button').forEach((b) => b.classList.toggle('hot', Number(b.dataset.k) === k));
}
function goFloor(k, { keepUnit = false } = {}) {
  leaveRoom(true);
  S.k = k; if (!keepUnit) S.unit = null;
  cut.constant = k < 0 ? 1e6 : floorY(k) + floorH(k) - 0.02;
  U.sel.value.copy(range(k)); buildPlate(k);
  plateTop.opacity = k < 0 ? 0.22 : 1; plateTop.depthWrite = k >= 0;
  if (!keepUnit) fly(...floorPose(k));
  setMode(null); render(); sun.shadow.needsUpdate = true; renderer.shadowMap.needsUpdate = true;
  history.replaceState(null, '', `#f${k < 0 ? 'b' + -k : k}`);
}
function overview(mode = 'all') {
  leaveRoom(true);
  S.k = null; S.unit = null; cut.constant = 1e6; U.sel.value.set(-99, -99);
  if (plateGroup) { scene.remove(plateGroup); plateGroup = null; cellMeshes = []; }
  plateTop.opacity = mode === 'under' ? 0.22 : 1; plateTop.depthWrite = mode !== 'under'; if (mode === 'under') cut.constant = floorY(3) - 0.4;
  if (mode === 'under') { buildPlate(-1); const b2 = plateGroup; plateGroup = null; buildPlate(-2); plateGroup.add(b2); }
  setMode(mode); fly(...POSE[mode]); render(); renderer.shadowMap.needsUpdate = true;
  history.replaceState(null, '', mode === 'all' ? location.pathname + location.search : `#${mode}`);
}
function setMode(mode) { S.mode = mode; document.querySelectorAll('#modes button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === mode)); }
function pickUnit(u) {
  S.unit = u; if (S.k !== u.k) goFloor(u.k, { keepUnit: true });
  for (const m of cellMeshes) { const on = m.userData.entry.no === u.no; m.material.emissive.set(on ? '#ff5a36' : '#000'); m.material.emissiveIntensity = on ? 0.9 : 0; m.scale.y = on ? 2.1 : 1; }
  const y = floorY(u.k); fly(V(u.c.x + u.n.x * 34, y + 24, u.c.z + u.n.z * 34), V(u.c.x * 0.6, y + 1, u.c.z * 0.6), 1.2);
  render(); history.replaceState(null, '', `#u${u.no}`);
}

// ---------- walk-in rooms ----------
let roomMeta = null; const roomCache = new Map();
const metaReady = fetch('./rooms/rooms.json').then((r) => r.json()).then((j) => (roomMeta = j)).catch(() => {});
const loadRoom = (id) => { if (!roomCache.has(id)) roomCache.set(id, new Promise((ok, no) => loader.load(`./rooms/${id}.glb`, (g) => ok(g.scene), undefined, no))); return roomCache.get(id); };
let yaw = 0, pitch = 0;
const facadeMid = (u) => { const pts = u.cells.flatMap((c) => [c.poly[0], c.poly[1]]); return pts.reduce((s, p) => ({ x: s.x + p.x / pts.length, z: s.z + p.z / pts.length }), { x: 0, z: 0 }); };
async function enterRoom(u) {
  await metaReady; const t = TYPES[u.type], meta = roomMeta?.[t.room]; if (!meta) return;
  const src = await loadRoom(t.room), room = src.clone(true), mid = facadeMid(u), y0 = floorY(u.k);
  room.position.set(mid.x - u.n.x * (1.3 + meta.d / 2), y0, mid.z - u.n.z * (1.3 + meta.d / 2)); room.rotation.y = Math.atan2(-u.n.x, -u.n.z);
  const lamp = new THREE.PointLight('#ffe2bf', 6, 9, 1.6); lamp.position.set(0, meta.h - 0.4, 0.6); room.add(lamp);
  room.traverse((o) => { if (o.isMesh) o.receiveShadow = true; });
  leaveRoom(true); scene.add(room); await renderer.compileAsync(room, camera, scene);
  S.room = { u, room, meta }; S.unit = u; if (plateGroup) plateGroup.visible = false;
  cut.constant = y0 + floorH(u.k); setHot(null); controls.enabled = false; tween?.kill();
  view('view'); roomNav(); render();
}
function view(sec) {
  const { room, meta } = S.room, v = meta.views[sec]; if (!v) return;
  room.updateMatrixWorld(); const eye = room.localToWorld(V(...v.eye)), look = room.localToWorld(V(...v.look));
  const d = look.clone().sub(eye).normalize();
  if (sec === 'view' && S.room.u && towerView(S.room.u.bearing)) { const tt = V(P.tokyoTower.p[0], 175, P.tokyoTower.p[1]).sub(eye).normalize(); if (tt.dot(d) > 0.55) d.copy(tt).lerp(d, 0.25).normalize(); } // frame the tower in the window
  yaw = Math.atan2(-d.x, -d.z); pitch = Math.asin(d.y);
  const from = camera.position.clone(), o = { t: 0 };
  tween = gsap.to(o, { t: 1, duration: REDUCED ? 0 : 0.9, ease: 'power2.inOut', onUpdate: () => { camera.position.lerpVectors(from, eye, o.t); aim(); } });
  document.querySelectorAll('#roomnav [data-v]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === sec));
  if (S.room.space) history.replaceState(null, '', `#${S.room.space}`);
}
const aim = () => camera.quaternion.setFromEuler(new THREE.Euler(pitch, yaw, 0, 'YXZ'));
function leaveRoom(silent) {
  if (!S.room) return;
  const space = S.room.space;
  scene.remove(S.room.room); S.room = null; controls.enabled = true; $('#roomnav').hidden = true; camera.fov = 42; camera.updateProjectionMatrix();
  if (plateGroup) plateGroup.visible = true;
  if (space) { applyNight(S.night); if (!silent) goFloor(SPACE[space].k); return; }
  if (!silent && S.unit) { cut.constant = floorY(S.unit.k) + floorH(S.unit.k) - 0.02; controls.target.set(S.unit.c.x * 0.6, floorY(S.unit.k) + 1, S.unit.c.z * 0.6); pickUnit(S.unit); }
}
function roomNav() {
  const nav = $('#roomnav'); nav.hidden = false;
  const items = S.room.space ? Object.entries(SPACE[S.room.space].views) : [['view', 'วิวหน้าต่าง'], ['bed', 'เตียง'], ['living', 'มุมนั่งเล่น'], ['bath', 'ห้องน้ำ']];
  nav.innerHTML = items.map(([v, n], i) => `<button type="button" data-v="${v}" aria-pressed="${i === 0}">${n}</button>`).join('') + `<button type="button" data-out>${S.room.space ? 'ออกไปผังชั้น' : 'ออกจากห้อง'}</button>`;
}
$('#roomnav').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.v) view(b.dataset.v); else { leaveRoom(false); } });
{ // first-person look inside a room: drag to turn, wheel to zoom
  let drag = null;
  renderer.domElement.addEventListener('pointerdown', (e) => { if (S.room) { drag = { x: e.clientX, y: e.clientY }; tween?.kill(); } });
  addEventListener('pointermove', (e) => { if (!drag || !S.room) return; yaw += (e.clientX - drag.x) * 0.004; pitch = THREE.MathUtils.clamp(pitch + (e.clientY - drag.y) * 0.004, -1.2, 1.2); drag = { x: e.clientX, y: e.clientY }; aim(); });
  addEventListener('pointerup', () => { drag = null; });
  renderer.domElement.addEventListener('wheel', (e) => { if (!S.room) return; camera.fov = THREE.MathUtils.clamp(camera.fov + Math.sign(e.deltaY) * 4, 22, 70); camera.updateProjectionMatrix(); }, { passive: true });
}

// ---------- walk-through spaces: lobby and atrium, spa, club lounge, sky bar (blender/akane_spaces.py) ----------
const SPACE = {
  lobby: { k: 1, name: 'ล็อบบี้และโถงกลาง', short: 'ล็อบบี้และโถงกลาง', svc: /Lobby|SHOP/,
    views: { arrive: 'ทางเข้า', forest: 'แชนเดอเลียร์กระจก', atrium: 'มองขึ้นโถงกลาง', lounge: 'Lobby Lounge', desk: 'เคาน์เตอร์ต้อนรับ' },
    facts: [['เคาน์เตอร์ต้อนรับ', 'เปิด 24 ชม. อยู่ทางซ้ายเมื่อเข้าทางเข้าหลักฝั่งใต้ ตกแต่งแบบห้องหนังสือในบ้าน พนักงานพูดญี่ปุ่น อังกฤษ จีน เกาหลี'],
      ['แชนเดอเลียร์', 'งานศิลป์กระจกบานเล็กหลายร้อยชิ้นที่แขวนเป็นแชนเดอเลียร์ ในธีม “การทักทายของป่า” จากการปรับปรุงล็อบบี้ที่เสร็จเมื่อ 1 ธ.ค. 2017'],
      ['โถงกลาง', 'สูงต่อเนื่องจาก B1 ถึงชั้น 32 มีลิฟต์แก้วชมวิว 8 ตัว ห้องพักทุกชั้นเปิดออกสู่ระเบียงรอบโถง'],
      ['ทางเข้า', 'แขกที่พักกับแขกงานเลี้ยงใช้ทางเข้าแยกกัน · ซุ้มรถรับส่งอยู่ฝั่งใต้']],
    note: 'ขนาดและตำแหน่งของน้ำตก ขนาดโถงกลาง และการวางเฟอร์นิเจอร์ไม่มีข้อมูลเผยแพร่ ฉากนี้จัดวางเป็นตัวอย่างบนผังตึกจริง' },
  spa: { k: -2, name: 'Spa & Fitness · ออนเซ็นและสระ 25 ม.', short: 'ออนเซ็นและสระ', svc: /Spa|โบว์ลิ่ง/, dark: true,
    views: { pool: 'สระ 25 ม.', deck: 'เก้าอี้ริมสระ', onsen: 'ออนเซ็น', sauna: 'ซาวน่า' },
    facts: [['มีอะไรบ้าง', 'ออนเซ็นธรรมชาติ สระน้ำอุ่นในร่ม ยิม ซาวน่าอินฟราเรด และอ่างน้ำวน'], ['การแต่งกาย', 'ห้ามใส่ชุดคลุม ยูกาตะ และรองเท้าแตะของห้องพักลงมาที่สปา']],
    note: 'ผังสปาจริงไม่เผยแพร่ ตำแหน่งสระ ออนเซ็น ซาวน่า และยิมในฉากนี้เป็นการจัดวางตัวอย่าง ขนาดสระ ราคา และเวลาเปิดเป็นข้อมูลจริง' },
  lounge: { k: 32, name: 'Premium Club Lounge', short: 'คลับเลานจ์ชั้น 32', svc: /Premium Club/,
    views: { window: 'ที่นั่งริมหน้าต่าง', buffet: 'บุฟเฟต์', swing: 'ชิงช้าต้นไม้' },
    facts: [['ใครเข้าได้', 'แขกห้องชั้น Premium Club และสมาชิกระดับสูงสุดของโปรแกรมสะสมแต้มของเครือ · ช่วงค็อกเทลรับอายุ 13 ปีขึ้นไป'],
      ['สิทธิ์ชั้นคลับ', 'อาหารเช้าที่เลานจ์ ขัดรองเท้า ซักรีดลด 20% ห้องประชุมฟรี 2 ชม. · พัก 3 คืนขึ้นไปมีรถโรงแรมรับส่ง'],
      ['การออกแบบ', 'ขยายจาก 146 เป็น 184 ม² ในปี 2016 แนวหน้าต่างฝั่งทาวเวอร์กลายเป็นที่นั่ง บุฟเฟต์ย้ายไปกลางห้อง · เปิดใหม่หลังปรับปรุง 1 ต.ค. 2025 · กลางคืนแสงโตเกียวทาวเวอร์ส่องเข้ามาในห้อง']],
    note: 'ชิงช้าแบบต้นไม้และโคมกิ่งไม้มาจากธีม A Part of the Park ของห้องชั้นคลับ ในฉากนี้วางไว้เป็นตัวอย่าง ไม่มีผังเลานจ์จริงเผยแพร่' },
  sky: { k: 33, name: 'Stellar Garden · สกายบาร์', short: 'สกายบาร์ชั้น 33', svc: /Stellar/,
    views: { tower: 'ที่นั่งหันหาทาวเวอร์', bar: 'เคาน์เตอร์บาร์', room: 'ทั้งร้าน' },
    facts: [['ที่นั่ง', 'บาร์ 84 ที่นั่ง: 73 ที่นั่งหันหาโตเกียวทาวเวอร์ และเคาน์เตอร์ 11 ที่ · ห้องอาหารอีก 116 ที่นั่ง'],
      ['ตกแต่ง', 'ปรับปรุงใหม่ในธีมไม้โทนอุ่น เปิดเมื่อ 3 ต.ค. 2025'], ['ห้องส่วนตัว', 'Brise Verte 4 ห้อง 26 ที่นั่ง จองล่วงหน้า 3 วัน · Sky Banquet 184 ม² นั่งได้ 100 คน']],
    note: 'ฉากนี้แสดงโซนบาร์ฝั่งทาวเวอร์ ตำแหน่งที่นั่ง ชั้นยก และเคาน์เตอร์เป็นการจัดวางตัวอย่าง จำนวนที่นั่งเป็นข้อมูลจริง · กดปุ่มกลางคืนเพื่อดูโตเกียวทาวเวอร์เปิดไฟ' },
};
const SPACE_AT = Object.fromEntries(Object.entries(SPACE).map(([id, sp]) => [sp.k, id]));
const spaceMeta = fetch('./models/akane-spaces.json').then((r) => r.json()).catch(() => ({}));
const spaceCache = new Map();
function waterPatch(m, body) { // animated water, mirrors and glow, drawn from world position and time
  m.customProgramCacheKey = () => `akane-${m.name}`;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = U.time;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWp; varying float vTag;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvWp = (modelMatrix * vec4(transformed, 1.0)).xyz; vTag = uv.x;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
varying vec3 vWp; varying float vTag; uniform float uTime;
float akCaus(vec2 p, float t) { float c = sin(p.x * 1.7 + t * 1.1 + sin(p.y * 1.3 + t * 0.7) * 1.5) + sin(p.y * 1.9 - t * 0.9 + sin(p.x * 1.1 - t * 0.6) * 1.5); return pow(1.0 - abs(c) * 0.5, 6.0); }`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>\n{ ${body} }`);
  };
}
const WATER = {
  PoolTile: 'totalEmissiveRadiance += vec3(0.55, 0.92, 1.0) * akCaus(vWp.xz * 1.4, uTime) * 0.5;',
  PoolWater: 'float c = akCaus(vWp.xz * 2.3 + 3.0, uTime * 1.3); totalEmissiveRadiance += vec3(0.8, 1.0, 1.0) * c * 0.18; diffuseColor.a = mix(diffuseColor.a, 0.75, c * 0.5);',
  OnsenWater: 'float c = akCaus(vWp.xz * 3.0, uTime * 0.6); totalEmissiveRadiance += vec3(1.0, 0.95, 0.8) * c * 0.08;',
  FallWater: 'float s = fract(vWp.y * 0.9 + uTime * 1.6 + fract(sin(floor((vWp.x + vWp.z) * 9.0) * 91.7) * 4375.5) * 7.0); float k = smoothstep(0.0, 0.35, s) * (1.0 - smoothstep(0.35, 1.0, s)); totalEmissiveRadiance += vec3(0.85, 0.95, 1.0) * k * 0.7; diffuseColor.a *= 0.65 + 0.35 * k;',
  Mirror: 'totalEmissiveRadiance += vec3(1.0, 0.97, 0.9) * pow(max(0.0, sin(uTime * 1.3 + vTag * 61.0)), 48.0) * 2.4;',
};
function prepSpace(root, meta) {
  root.traverse((o) => {
    if (!o.isMesh) return; o.receiveShadow = true;
    const m = o.material; if (WATER[m.name]) waterPatch(m, WATER[m.name]);
    if (m.name === 'Mirror') m.envMapIntensity = 2.4;
    if (m.transparent) m.depthWrite = false;
  });
  const lamp = new THREE.PointLight('#ffe2bf', 10, 26, 1.4); lamp.position.set(...meta.lamp); root.add(lamp);
  root.userData.forest = root.getObjectByName('Forest');
  if (meta.steam) { // steam over the onsen: a few soft puffs rising and fading
    const n = 36, pos = new Float32Array(n * 3), base = new THREE.Vector3(...meta.steam);
    for (let i = 0; i < n; i++) pos.set([base.x + (Math.random() - 0.5) * 5, base.y + Math.random() * 2, base.z + (Math.random() - 0.5) * 2.6], i * 3);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const steam = new THREE.Points(g, new THREE.PointsMaterial({ map: glowTex, size: 1.6, transparent: true, opacity: 0.16, depthWrite: false, color: '#ffffff' }));
    steam.userData.base = base; root.add(steam); root.userData.steam = steam;
  }
  return root;
}
function animateSpace(u, t, dt) {
  if (u.forest) u.forest.rotation.y = Math.sin(t * 0.21) * 0.02; // the mirrors sway a little, so their glints travel
  if (u.steam) {
    const a = u.steam.geometry.attributes.position, b = u.steam.userData.base;
    for (let i = 0; i < a.count; i++) { let y = a.getY(i) + dt * 0.35; if (y > b.y + 2.2) y = b.y; a.setY(i, y); a.setX(i, a.getX(i) + Math.sin(t + i) * dt * 0.05); }
    a.needsUpdate = true;
  }
}
const loadSpace = (id, meta) => { if (!spaceCache.has(id)) spaceCache.set(id, new Promise((ok, no) => loader.load(`./models/akane-${id}.glb`, (g) => ok(prepSpace(g.scene, meta)), undefined, no))); return spaceCache.get(id); };
async function enterSpace(id, sec) {
  const sp = SPACE[id], meta = (await spaceMeta)[id]; if (!sp || !meta) return;
  if (S.room?.space === id) { view(sec || Object.keys(sp.views)[0]); return; }
  const room = await loadSpace(id, meta).catch(() => null); if (!room) return;
  leaveRoom(true);
  if (S.k !== sp.k) { S.k = sp.k; if (plateGroup) { scene.remove(plateGroup); plateGroup = null; cellMeshes = []; } }
  room.position.set(0, floorY(sp.k) + (sp.k === 1 ? 0.02 : 0), 0); // the lobby floor sits just above the ground plate
  scene.add(room); await renderer.compileAsync(room, camera, scene);
  S.room = { space: id, room, meta, u: null }; S.unit = null; setMode(null);
  if (plateGroup) plateGroup.visible = false;
  cut.constant = id === 'lobby' ? 1e6 : floorY(sp.k) + floorH(sp.k); setHot(null); U.sel.value.set(-99, -99);
  controls.enabled = false; tween?.kill(); camera.fov = 55; camera.updateProjectionMatrix();
  if (sp.dark) { hemi.intensity = 0.3; sun.intensity = 0; scene.environmentIntensity = 0.3; } // underground: only its own lights
  view(sec || Object.keys(sp.views)[0]); tween?.progress(1); roomNav(); render(); renderer.shadowMap.needsUpdate = true;
}
function cardSpace(id) {
  const sp = SPACE[id], rows = SERVICES.filter(([n, k]) => k === sp.k && sp.svc.test(n));
  card.innerHTML = `<h2>${floorLabel(sp.k)} · เดินชมแบบ 3 มิติ</h2><h3>${sp.name}</h3>
    <ul class="list">${rows.map(([n, , h, note]) => `<li><span>${n}</span><small>${h}<br>${note}</small></li>`).join('')}</ul>
    <dl>${sp.facts.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
    <p class="muted small" style="margin:8px 0 0">${sp.note}</p>
    <p class="muted small" style="margin:6px 0 0">ลากเพื่อหันมอง เลือกจุดชมจากแถบปุ่ม</p>
    <div class="row"><button type="button" data-go="${sp.k}">← ผังชั้น ${floorLabel(sp.k)}</button><button type="button" data-home>ภาพรวม</button></div>`;
}

// ---------- picking ----------
const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
function hit(e) {
  const r = renderer.domElement.getBoundingClientRect(); ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ptr, camera);
  if (S.k !== null && cellMeshes.length) { const h = ray.intersectObjects(cellMeshes, false)[0]; if (h) return { entry: h.object.userData.entry }; }
  const h = ray.intersectObject(tower, true).find((i) => i.point.y < cut.constant); return h ? { k: floorAt(h.point.y - 0.05) } : null;
}
const tip = $('#tip');
renderer.domElement.addEventListener('pointermove', (e) => {
  if (S.room || e.pointerType === 'touch') return;
  const h = hit(e);
  if (h?.entry) { const en = h.entry; tip.textContent = en.type ? `${en.no} · ${TYPES[en.type].name} · ${TYPES[en.type].m2} ม²${en.free ? '' : ' · ไม่ว่าง (ตัวอย่าง)'}` : en.name; }
  else if (h) tip.textContent = `${floorLabel(h.k)} · ${USE(h.k)}`;
  tip.hidden = !h; if (h) { tip.style.left = `${e.clientX}px`; tip.style.top = `${e.clientY}px`; }
  setHot(h && !h.entry ? h.k : null); renderer.domElement.style.cursor = h ? 'pointer' : '';
});
let down = null;
renderer.domElement.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
renderer.domElement.addEventListener('pointerup', (e) => {
  if (!down || S.room || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
  const h = hit(e); if (!h) return;
  if (h.entry?.type) pickUnit(h.entry); else if (h.k != null && h.k !== S.k) goFloor(h.k);
});

// ---------- panels ----------
const stack = $('#stack');
{
  const groups = [['ชั้นลอยฟ้าและสวีท', [33, 32]], ['Premium Club', [31, 30, 29]], ['Panoramic', [28, 27, 26, 25, 24, 23, 22, 21, 20, 19]], ['Park', [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3]], ['สวนและล็อบบี้', [2, 1]], ['ใต้ดิน', [-1, -2]]];
  stack.innerHTML = groups.map(([g, ks]) => `<div class="grp">${g}</div>` + ks.map((k) => `<button type="button" data-k="${k}" aria-pressed="false"><b>${floorLabel(k)}</b><i style="background:${BAND[band(k)][1]}"></i><span>${USE(k)}</span></button>`).join('')).join('');
  stack.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) goFloor(Number(b.dataset.k)); });
  stack.addEventListener('pointerover', (e) => { const b = e.target.closest('button'); if (b && !S.room) setHot(Number(b.dataset.k)); });
  stack.addEventListener('pointerleave', () => setHot(null));
}
$('#modes').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) overview(b.dataset.mode); });
const card = $('#card');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function svgPlan(k) {
  const plan = floorPlan(k), pts = (poly) => poly.map((p) => `${p.x.toFixed(2)},${p.z.toFixed(2)}`).join(' ');
  const tw = GEO.far[0].deg * (Math.PI / 180), tx = Math.sin(tw) * 27, tz = -Math.cos(tw) * 27;
  let s = `<svg class="plan" viewBox="-31 -31 62 62" role="img" aria-label="ผังชั้น ${floorLabel(k)} ทิศเหนืออยู่ด้านบน"><polygon points="${pts(RING)}" fill="rgba(244,239,230,0.08)" stroke="rgba(244,239,230,0.35)" stroke-width="0.3"/>`;
  s += `<polygon points="${pts(ATRIUM)}" fill="rgba(127,208,255,0.1)" stroke="rgba(127,208,255,0.4)" stroke-width="0.2"/><text x="${ac.x}" y="${ac.z + 0.6}" text-anchor="middle" style="fill:var(--teal);font-size:2px">${k <= 32 ? 'โถงกลาง · ลิฟต์แก้ว 8 ตัว' : ''}</text>`;
  for (const e of plan) {
    const dim = S.filter && e.type !== S.filter ? ' dim' : '', on = S.unit?.no === e.no && e.type ? ' on' : '';
    s += `<g class="${e.type ? '' : 'zone'}">` + e.polys.map((p) => `<polygon class="cell${e.type && !e.free ? ' busy' : ''}${dim}${on}" ${e.type ? `data-no="${e.no}" tabindex="0" role="button" aria-label="ห้อง ${e.no} ${TYPES[e.type].name} ${TYPES[e.type].m2} ตารางเมตร${e.free ? '' : ' ไม่ว่าง'}"` : ''} points="${pts(shrink(p, 0.12))}" fill="${e.type ? COLOR[e.type] : zoneColor(e)}"/>`).join('');
    s += `<text x="${e.c.x.toFixed(1)}" y="${(e.c.z + 0.7).toFixed(1)}" text-anchor="middle">${e.type ? e.no % 100 : ''}</text></g>`;
  }
  s += `<line x1="0" y1="0" x2="${tx.toFixed(1)}" y2="${tz.toFixed(1)}" stroke="#ff7a5c" stroke-width="0.35" stroke-dasharray="1 0.8"/><text x="${(tx * 1.02).toFixed(1)}" y="${(tz * 1.02 - 1).toFixed(1)}" text-anchor="middle" style="fill:#ff7a5c;font-size:2.2px">โตเกียวทาวเวอร์</text>`;
  return s + '<text x="27" y="-27" text-anchor="middle" style="fill:var(--washi);font-size:2.6px">N ↑</text></svg>';
}
function cardFloor(k) {
  const units = unitsOn(k), plan = floorPlan(k), zones = plan.filter((e) => e.zone && !e.quiet), types = [...new Set(units.map((u) => u.type))];
  const free = units.filter((u) => u.free).length;
  card.innerHTML = `<h2>${BAND[band(k)][0]} · ระดับ ${Math.round(floorY(k))} ม.</h2><h3>${floorLabel(k)} · ${USE(k)}</h3>
    ${SPACE_AT[k] ? `<div class="row" style="margin:4px 0 8px"><button type="button" class="primary" data-space="${SPACE_AT[k]}">เดินชม${SPACE[SPACE_AT[k]].short}แบบ 3 มิติ</button></div>` : ''}
    ${units.length ? `<p class="muted small">${units.length} ห้องบนชั้นนี้ · ว่าง ${free} ห้อง (ตัวอย่าง) · แตะห้องบนผังหรือบนตึก</p>
      <label class="small muted">ประเภทห้อง <select id="flt" style="font:inherit;color:var(--washi);background:rgba(255,255,255,0.06);border:1px solid var(--line);border-radius:10px;min-height:36px;color-scheme:dark"><option value="">ทั้งหมด</option>${types.map((t) => `<option value="${t}"${S.filter === t ? ' selected' : ''}>${TYPES[t].name} · ${TYPES[t].m2} ม²</option>`).join('')}</select></label>` : ''}
    ${svgPlan(k)}
    ${units.length ? `<div class="legend">${types.map((t) => `<span><i style="background:${COLOR[t]}"></i>${TYPES[t].name}</span>`).join('')}<span><i style="background:#888;opacity:.4"></i>ไม่ว่าง</span></div>` : ''}
    ${zones.length ? `<ul class="list" style="margin-top:8px">${zones.map((z) => `<li><span>${esc(z.name)}</span><small>${z.hours || ''}</small></li>`).join('')}</ul>` : ''}
    <p class="muted small" style="margin:8px 0 0">${k === 25 ? 'ชั้น 25 เป็นชั้นห้องสูบบุหรี่ · ' : ''}${units.length ? 'ประเภท ขนาด และช่วงชั้นของห้องเป็นข้อมูลจริง ตำแหน่งห้องบนชั้นเป็นการจัดวางตัวอย่าง' : 'ตำแหน่งโซนบนชั้นเป็นการจัดวางโดยประมาณ'}</p>
    <div class="row"><button type="button" data-go="${Math.min(33, k === -1 ? 1 : k + 1)}" ${k === 33 ? 'disabled' : ''}>ชั้นบน ↑</button><button type="button" data-go="${k === 1 ? -1 : Math.max(-2, k - 1)}" ${k === -2 ? 'disabled' : ''}>ชั้นล่าง ↓</button><button type="button" data-home>ภาพรวม</button></div>`;
  $('#flt')?.addEventListener('change', (e) => { S.filter = e.target.value; cardFloor(k); });
}
function cardUnit(u) {
  const t = TYPES[u.type], views = viewsFor(u.bearing, u.k), tv = towerView(u.bearing);
  card.innerHTML = `<h2>${floorLabel(u.k)} · ห้อง ${u.no}${u.tag ? ` · ${u.tag}` : ''}</h2><h3>${t.name}</h3><p class="muted" style="margin:0 0 6px">${t.th}</p>
    <span class="tag ${u.free ? 'ok' : 'no'}">${u.free ? 'ว่าง' : 'ไม่ว่าง'} (ตัวอย่าง)</span>${tv ? '<span class="tag ak">เห็นโตเกียวทาวเวอร์</span>' : ''}${t.balcony ? '<span class="tag">มีระเบียง</span>' : ''}${t.club ? '<span class="tag">Premium Club</span>' : ''}${u.smoking ? '<span class="tag no">ชั้นสูบบุหรี่</span>' : ''}
    <dl><div><dt>ขนาด</dt><dd>${t.m2} ม²</dd></div><div><dt>เตียง</dt><dd>${t.bed}</dd></div><div><dt>พักได้</dt><dd>${t.guests} คน</dd></div>
      <div><dt>ความสูง</dt><dd>${floorLabel(u.k)} · ราว ${Math.round(floorY(u.k))} ม. จากพื้น</dd></div><div><dt>หน้าต่างหันไป</dt><dd>ทิศ${COMPASS(u.bearing)} (${u.bearing}°)</dd></div>
      <div><dt>มองเห็น</dt><dd><div class="views">${views.length ? views.map((v) => `<span class="tag no">${v.name} · ${v.km} กม.</span>`).join('') : 'วิวเมืองรอบสวนชิบะ'}</div></dd></div>
      <div><dt>ห้องน้ำ</dt><dd>${t.bath || 'ไม่มีข้อมูลผังห้องน้ำที่เผยแพร่'}</dd></div><div><dt>ช่วงชั้นจริง</dt><dd>ชั้น ${t.floors}</dd></div></dl>
    ${t.note ? `<p class="small" style="margin:8px 0 0">${t.note}</p>` : ''}
    <div class="row"><span class="price">฿${fmt(t.price)} <small>/ คืน · ราคาตัวอย่าง</small></span></div>
    <div class="row"><button type="button" class="primary" data-walk>เดินเข้าห้อง 3 มิติ</button><button type="button" data-book ${u.free ? '' : 'disabled'}>จองตัวอย่าง</button><button type="button" data-go="${u.k}">← ผังชั้น</button></div>
    <p class="muted small" style="margin:8px 0 0">ห้อง 3 มิติเป็นแบบจำลองตัวอย่างของประเภทห้องนี้ วิวนอกหน้าต่างวางตามทิศและระยะจริง</p>`;
}
function cardBook(u) {
  const t = TYPES[u.type], d = new Date(Date.now() + 30 * 864e5), iso = (x) => x.toISOString().slice(0, 10), out = new Date(d.getTime() + 2 * 864e5);
  card.innerHTML = `<h2>จองตัวอย่าง · ไม่ใช่การจองจริง</h2><h3>${t.name} · ห้อง ${u.no}</h3>
    <form class="book" id="book"><div class="two"><label>เช็กอิน (15:00)<input type="date" name="in" value="${iso(d)}" required></label><label>เช็กเอาต์ (12:00)<input type="date" name="out" value="${iso(out)}" required></label></div>
      <div class="two"><label>ผู้ใหญ่<select name="ad">${Array.from({ length: t.guests }, (_, i) => `<option${i === 1 ? ' selected' : ''}>${i + 1}</option>`).join('')}</select></label><label>เด็ก 4–12 ปี<select name="ch">${[0, 1, 2].map((n) => `<option>${n}</option>`).join('')}</select></label></div>
      <label class="chk"><input type="checkbox" name="bf" checked> อาหารเช้าบุฟเฟต์ Stellar Garden ชั้น 33</label>
      <label class="chk"><input type="checkbox" name="bus"> รับจากนาริตะด้วยลีมูซีนบัส (ราว 130 นาที)</label>
      <div class="sum" id="sum"></div>
      <div class="row" style="margin:0"><button type="submit" class="primary">ยืนยันการจองตัวอย่าง</button><button type="button" data-unit="${u.no}">ย้อนกลับ</button></div></form>
    <div id="done"></div>`;
  const f = $('#book'), sum = () => {
    const fd = new FormData(f), n = Math.max(1, Math.round((new Date(fd.get('out')) - new Date(fd.get('in'))) / 864e5) || 1), ad = Number(fd.get('ad')), ch = Number(fd.get('ch'));
    const yen = (fd.get('bf') ? n * (ad * BREAKFAST.adult + ch * BREAKFAST.child) : 0) + (fd.get('bus') ? ad * 3600 + ch * 1800 : 0);
    $('#sum').innerHTML = `<div><span>ห้อง ${n} คืน × ฿${fmt(t.price)}</span><span class="mono">฿${fmt(n * t.price)}</span></div>${yen ? `<div><span>อาหารเช้าและรถสนามบิน (ราคาจริง ชำระที่โรงแรม)</span><span class="mono">¥${fmt(yen)}</span></div>` : ''}<div class="tot"><span>รวมค่าห้อง (ตัวอย่าง)</span><span>฿${fmt(n * t.price)}</span></div><span class="muted small">เช็กเอาต์ช้าถึง 15:00 คิด 1/3 ของค่าห้อง · ถึง 18:00 คิดครึ่งหนึ่ง</span>`;
  };
  f.addEventListener('input', sum); sum();
  f.addEventListener('submit', (e) => { e.preventDefault(); const code = `AKS-${(u.no * 7919 + f.in.value.replace(/-/g, '') % 9973).toString(36).toUpperCase().slice(-5)}`; $('#done').innerHTML = `<div class="ok-box" style="margin-top:10px">จองตัวอย่างสำเร็จ รหัส ${code}<br><span class="small">นี่เป็นการสาธิต ไม่มีการจองหรือชำระเงินจริง</span></div>`; });
}
function cardOverview() {
  const tabs = [['about', 'ภาพรวม'], ['svc', 'บริการและเวลาเปิด'], ['go', 'การเดินทาง'], ['pol', 'นโยบาย'], ['grp', 'กรุ๊ปทัวร์']];
  const bodies = {
    about: `<div class="facts">${FACTS.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join('')}</div>
      <p class="small" style="margin:0 0 6px">ตึกผังสามเหลี่ยมตัดมุม กว้างราว 52 ม. ตั้งอยู่บนที่ดินเดิมของสนามกอล์ฟชิบะ มีสวนราวครึ่งหนึ่งของพื้นที่ ห้องพักเรียงรอบโถงกลางที่สูงตั้งแต่ B1 ถึงชั้น 32 มีลิฟต์แก้วชมวิว 8 ตัว ห้องฝั่งเหนือและมุมตะวันตกเฉียงเหนือหันหาโตเกียวทาวเวอร์</p>
      <p class="muted small" style="margin:0">ชี้ที่ตึกหรือแถบชั้นด้านซ้ายเพื่อให้ชั้นสว่าง แตะเพื่อเปิดผังชั้น แล้วเลือกห้องเพื่อเดินเข้าไปดู</p>
      <h4 class="small" style="margin:12px 0 0">เดินชมแบบ 3 มิติ</h4><div class="row" style="margin-top:6px">${Object.entries(SPACE).map(([id, sp]) => `<button type="button" data-space="${id}">${sp.short}</button>`).join('')}</div>`,
    svc: `<ul class="list">${SERVICES.map(([n, k, h, note]) => { const sp = Object.keys(SPACE).find((id) => SPACE[id].k === k && SPACE[id].svc.test(n)); return `<li><span>${n}</span><button type="button" class="go" data-${sp ? `space="${sp}"` : `go="${k}"`}>${sp ? '3 มิติ' : floorLabel(k)}</button><small>${h}<br>${note}</small></li>`; }).join('')}</ul>`,
    go: `${accessMap()}<table class="t"><thead><tr><th>สถานี</th><th>สาย</th><th>ทางออก</th><th>เดิน</th></tr></thead><tbody>${STATIONS.map(([a, b, c, d]) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td><td class="mono">${d} นาที</td></tr>`).join('')}</tbody></table>
      <p class="small">${SHUTTLE}</p><table class="t"><thead><tr><th>สนามบิน</th><th>วิธี</th><th>เวลา</th><th>ราคา</th></tr></thead><tbody>${AIRPORT.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table><p class="muted small">${ONWARD}</p>`,
    pol: `<dl>${POLICY.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>`,
    grp: `<dl>${GROUP.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl><p class="muted small" style="margin:8px 0 0">ข้อมูลจากหน้าเว็บของโรงแรมจริง ทัวร์ควรยืนยันที่จอดรถบัสและการเช็กอินกรุ๊ปกับโรงแรมล่วงหน้า</p>`,
  };
  card.innerHTML = `<h2>ที่พักตัวอย่างในโตเกียว</h2><h3>Akane Sky Tokyo</h3><p class="muted small" style="margin:0">มินาโตะ · สวนชิบะ · ข้างวัดโซโจจิและโตเกียวทาวเวอร์</p>
    <div class="tabs" role="tablist">${tabs.map(([id, n]) => `<button type="button" role="tab" data-tab="${id}" aria-selected="${S.tab === id}" aria-pressed="${S.tab === id}">${n}</button>`).join('')}</div>${bodies[S.tab]}`;
}
function accessMap() { // OSM footprints within the plate, the tower, the stations and the walking times
  const B = GEO.buildings.map(([, f]) => `<polygon points="${f.map((v) => v.toFixed(0)).join(' ').replace(/(\S+) (\S+)( |$)/g, '$1,$2 ')}"/>`).join('');
  const dot = (p, c, t, dy = -10) => `<circle cx="${p[0]}" cy="${p[1]}" r="9" fill="${c}"/><text x="${p[0]}" y="${p[1] + dy}" text-anchor="middle">${t}</text>`;
  const ham = GEO.far.find((f) => f.name === 'ฮามามัตสึโจ');
  return `<svg class="plan" viewBox="-440 -440 880 880" role="img" aria-label="แผนที่รอบที่พัก ทิศเหนืออยู่ด้านบน" style="font:500 26px var(--f-body)"><circle r="432" fill="rgba(244,239,230,0.05)" stroke="rgba(244,239,230,0.2)"/>
    <g fill="rgba(244,239,230,0.28)">${B}</g><polygon points="${RING.map((p) => `${p.x},${p.z}`).join(' ')}" fill="#ff7a5c"/>
    <g fill="#f4efe6">${dot(P.tokyoTower.p, '#ffb08f', 'โตเกียวทาวเวอร์')}${dot(P.akabanebashi.p, '#7fd0ff', 'อากาบาเนบาชิ 2 นาที')}${dot(P.shibakoen.p, '#7fd0ff', 'ชิบะโคเอ็น 3 นาที', 34)}${dot(P.zojoji.p, '#ffc46b', 'โซโจจิ')}<text x="0" y="62" text-anchor="middle" style="fill:#ff7a5c">Akane Sky</text></g>
    <text x="300" y="${-Math.cos((ham.deg * Math.PI) / 180) * 300 + 120}" text-anchor="middle" style="fill:var(--dim);font-size:22px">ไดมง 9 · ฮามามัตสึโจ 12 นาที →</text>
    <line x1="-410" y1="410" x2="-310" y2="410" stroke="#f4efe6" stroke-width="3"/><text x="-360" y="398" text-anchor="middle" style="fill:var(--dim);font-size:20px">100 ม.</text><text x="400" y="-400" style="fill:#f4efe6">N↑</text></svg>`;
}
card.addEventListener('click', (e) => {
  const b = e.target.closest('button, [data-no]'); if (!b) return;
  if (b.dataset.tab) { S.tab = b.dataset.tab; cardOverview(); return; }
  if (b.dataset.space) { b.disabled = true; b.textContent = 'กำลังเปิดฉาก…'; enterSpace(b.dataset.space); return; }
  if (b.dataset.no) { pickUnit(findUnit(Number(b.dataset.no))); return; }
  if (b.dataset.go !== undefined) { goFloor(Number(b.dataset.go)); return; }
  if (b.dataset.home !== undefined) { overview('all'); return; }
  if (b.dataset.walk !== undefined && S.unit) { b.disabled = true; b.textContent = 'กำลังเปิดห้อง…'; enterRoom(S.unit); return; }
  if (b.dataset.book !== undefined && S.unit) { cardBook(S.unit); return; }
  if (b.dataset.unit) pickUnit(findUnit(Number(b.dataset.unit)));
});
card.addEventListener('keydown', (e) => { const c = e.target.closest('[data-no]'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pickUnit(findUnit(Number(c.dataset.no))); } });
function render() {
  document.body.classList.toggle('inside', !!S.room);
  if (S.room?.space) cardSpace(S.room.space); else if (S.unit) cardUnit(S.unit); else if (S.k !== null) cardFloor(S.k); else cardOverview();
  document.querySelectorAll('#stack button').forEach((b) => b.setAttribute('aria-pressed', Number(b.dataset.k) === S.k));
  $('#where').textContent = S.room?.space ? `${floorLabel(SPACE[S.room.space].k)} · ${SPACE[S.room.space].name}` : S.room ? `ในห้อง ${S.unit.no} · ${TYPES[S.unit.type].name}` : S.unit ? `${floorLabel(S.unit.k)} · ห้อง ${S.unit.no}` : S.k !== null ? `${floorLabel(S.k)} · ${USE(S.k)}` : S.mode === 'under' ? 'ใต้ดิน B1–B2' : 'ภาพรวม';
}

// ---------- day and night ----------
const DAY = ENV.day, NIGHT = ENV.night, FOG_DAY = new THREE.Color('#c8dcea');
function applyNight(n) {
  S.night = n; U.night.value = n; const u = sky.material.uniforms;
  u.top.value.lerpColors(DAY.top, NIGHT.top, n); u.bottom.value.lerpColors(DAY.bottom, NIGHT.bottom, n); u.sunColor.value.lerpColors(DAY.sun, NIGHT.sun, n); if (u.night) u.night.value = n;
  u.sunDir.value.copy(DAY.sunDir).normalize();
  scene.fog.color.copy(FOG_DAY).lerp(NIGHT.fog, n); hemi.intensity = 1.0 - 0.72 * n; sun.intensity = 2.3 - 2.0 * n; sun.color.set('#fff3e2').lerp(NIGHT.sun, n);
  scene.environmentIntensity = 0.45 - 0.3 * n; updateGlow(n); skytree.userData.mat.emissiveIntensity = n * 1.4; fuji.visible = n < 0.5;
  for (const [m, k] of lit) m.emissiveIntensity = n * k;
  farGround.material.color.set('#b9c3c8').lerp(new THREE.Color('#151a33'), n);
}
$('#night').addEventListener('click', (e) => { const on = e.currentTarget.getAttribute('aria-pressed') !== 'true'; e.currentTarget.setAttribute('aria-pressed', on); e.currentTarget.textContent = on ? 'กลางวัน' : 'กลางคืน'; const o = { n: S.night }; gsap.to(o, { n: on ? 1 : 0, duration: REDUCED ? 0 : 1.8, ease: 'power1.inOut', onUpdate: () => applyNight(o.n) }); });

// ---------- loop ----------
const fit = () => {
  renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight;
  if (innerWidth < 900) camera.setViewOffset(innerWidth, innerHeight, 0, innerHeight * 0.26, innerWidth, innerHeight); else camera.clearViewOffset();
  camera.updateProjectionMatrix();
};
addEventListener('resize', fit); fit();
const clock = new THREE.Clock();
let slow = 0, last = 0;
function frame() {
  const raw = clock.getDelta(), dt = Math.min(0.05, raw), t = (U.time.value += dt);
  for (const c of lifts) { // each lift rides between B1 and its top stop, easing in and out with pauses
    const span = floorY(c.userData.top) - floorY(-1), p = 0.5 - 0.5 * Math.cos(((t * 0.045 + c.userData.phase * 0.13) % 1) * Math.PI * 2);
    c.position.y = floorY(-1) + p * span;
  }
  if (!S.room) controls.update(); else if (S.room.space) animateSpace(S.room.room.userData, t, dt);
  sky.position.copy(camera.position);
  for (const s of LABELS) { const v = S.room ? !!s.userData.far && !S.room.space : S.k === null; s.visible = v; if (s.userData.pin) s.userData.pin.visible = v; }
  slow = raw > 0.024 ? slow + raw : 0; if (slow > 2 && renderer.getPixelRatio() > 1) { renderer.setPixelRatio(Math.max(1, renderer.getPixelRatio() - 0.25)); slow = 0; }
  if (S.k !== null && t - last > 0.5) { last = t; renderer.shadowMap.needsUpdate = true; } // floor plates and lifts move under the cut: refresh shadows twice a second
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
camera.position.copy(POSE.all[0]).multiplyScalar(1.35); controls.target.copy(POSE.all[1]);
applyNight(0); render();
Promise.all([towerReady, document.fonts.ready]).then(async () => {
  hotBand.geometry = bandFor(20); hotBand.visible = true; await renderer.compileAsync(scene, camera); hotBand.visible = false;
}).catch(() => {}).finally(() => {
  renderer.shadowMap.needsUpdate = true; $('#veil').classList.add('gone'); frame();
  const h = location.hash.slice(1), m = /^u(\d{3,4})$/.exec(h), f = /^f(b?)(\d+)$/.exec(h);
  if (m && findUnit(Number(m[1]))) pickUnit(findUnit(Number(m[1]))); else if (SPACE[h]) enterSpace(h); else if (f) goFloor(f[1] ? -Number(f[2]) : Number(f[2])); else if (POSE[h]) overview(h); else fly(...POSE.all, 2.2);
});
if (location.search.includes('debug')) window.__akane = { renderer, scene, camera, controls, S, goFloor, pickUnit, enterRoom, enterSpace, leaveRoom, view, overview, applyNight, findUnit, tower };
