import * as THREE from 'three';
import {
  createGuide, createPerson, createTorii, createPagoda, createSakuraTrees, createLanterns, createTower,
  createHotel, createRyokan, SUITE, updateGlow,
} from './models.js';
import { createAirliner, createCoach, createCastle, createPirateShip, createBeacon } from './models2.js';
import { createSky, createClouds, createPetals, createTrail, ENV, lerpEnv, makeEnvState } from './fx.js';
import { VERT, MODEL_SCALE as S, toX, toZ, thaiXZ, FUJI, LAKES, buildTerrain, buildFuji, buildThailand, buildNear, lakeMeshes } from './geo.js';
import { Path, monotone, linear } from './path.js';
import {
  ribbon, roadMaterial, viaduct, createAirport, createCities, createForest, createToriiTunnel, drapedDisc,
  createLabel, routeLine, rnd,
} from './scenery.js';
import { createHoloMap } from './mapholo.js';
import { createLife } from './life.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const LL = (lon, lat, y = 0) => V(toX(lon), y, toZ(lat));
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.05, ...o });

// point lights inside metre-built models must shrink with the model
function scaleLights(group, s) {
  group.traverse((o) => { if (o.isPointLight) { o.distance *= s; o.intensity *= Math.pow(s, o.decay); } });
}

export function createWorld() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#bcd9ee', 50, 2000);
  const sky = createSky();
  scene.add(sky);

  const hemi = new THREE.HemisphereLight('#dfefff', '#4a5a3a', 1);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight('#ffffff', 2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0003;
  scene.add(sun, sun.target);

  // ---------- terrain, water ----------
  const T = buildTerrain({
    cell: 2,
    patches: [
      { lon0: 138.66, lon1: 138.88, lat0: 35.43, lat1: 35.56, k: 16, relief: 0.35 }, // Kawaguchiko + Chureito
      { lon0: 138.95, lon1: 139.10, lat0: 35.16, lat1: 35.29, k: 16 }, // Hakone / Lake Ashi
      { lon0: 135.72, lon1: 135.86, lat0: 34.93, lat1: 35.01, k: 12 }, // Fushimi Inari hill
    ],
  });
  const H = T.heightAt;
  T.mesh.traverse((o) => { o.castShadow = true; });
  scene.add(T.mesh);
  const fujiMesh = buildFuji(T.baseAt);
  scene.add(fujiMesh);
  scene.add(lakeMeshes());
  scene.add(buildThailand());
  scene.add(buildNear());
  const ocean = new THREE.Mesh(new THREE.PlaneGeometry(16000, 16000), new THREE.MeshStandardMaterial({ color: '#1f5677', roughness: 0.42, metalness: 0.12 }));
  ocean.rotation.x = -Math.PI / 2; ocean.position.set(-600, -0.1, 300);
  ocean.receiveShadow = true;
  scene.add(ocean);

  const lakeAt = (x, z, lim = 1.0) => {
    for (const L of LAKES) {
      const dx = x - toX(L.lon), dz = z - toZ(L.lat), c = Math.cos(L.rot), s = Math.sin(L.rot);
      const u = (dx * c - dz * s) / L.a, v = (dx * s + dz * c) / L.b;
      if (u * u + v * v < lim) return L;
    }
    return null;
  };
  const lakeY = (name) => LAKES.find((l) => l.name === name).level * VERT + 0.012;
  const ground = (x, z) => Math.max(H(x, z), -0.05);
  const onGround = (v, lift = 0) => { v.y = ground(v.x, v.z) + lift; return v; };

  // spatial hash of road/rail points so buildings and trees keep clear
  const hash = new Map();
  const hkey = (x, z) => `${Math.floor(x * 2)},${Math.floor(z * 2)}`;
  const addClear = (path) => { for (const p of path.pts) { const k = hkey(p.x, p.z); if (!hash.has(k)) hash.set(k, []); hash.get(k).push(p); } };
  const nearRoute = (x, z, r) => {
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
      const list = hash.get(`${Math.floor(x * 2) + i},${Math.floor(z * 2) + j}`);
      if (list) for (const p of list) if ((p.x - x) ** 2 + (p.z - z) ** 2 < r * r) return true;
    }
    return false;
  };

  // ---------- airports ----------
  const [bx, bz] = thaiXZ(100.75, 13.69);
  const bkk = createAirport({ x: bx, z: bz, y: 0.055, bearing: 15, len: 4, side: 1, thai: true, label: 'BKK  สุวรรณภูมิ', termX: -0.9, parked: 3 });
  scene.add(bkk);
  const nrtC = LL(140.386, 35.765);
  const nrtY = Math.max(H(nrtC.x, nrtC.z), 0.05) + 0.01;
  const NRT_LEN = 4;
  const nrt = createAirport({ x: nrtC.x, z: nrtC.z, y: nrtY, bearing: 337, len: NRT_LEN, side: 1, label: 'NRT  成田', termX: 0.4, parked: 3 });
  // free the middle gate for our flight
  nrt.remove(nrt.userData.jets[1]);
  scene.add(nrt);
  const kixC = LL(135.24, 34.43);
  const kixLand = T.landAt(kixC.x, kixC.z) > 0.6;
  const kix = createAirport({ x: kixC.x, z: kixC.z, y: kixLand ? H(kixC.x, kixC.z) + 0.01 : 0.06, bearing: 236, len: 3.5, side: -1, label: 'KIX  関西', termX: 0, parked: 3, seaPad: !kixLand });
  scene.add(kix);
  const jets = [...bkk.userData.jets, ...nrt.userData.jets.filter((j) => j.parent), ...kix.userData.jets];

  // ---------- story flight path ----------
  const plane = createAirliner();
  plane.scale.setScalar(S);
  scene.add(plane);
  const GO = plane.userData.groundOffset * S;
  const bw = (lx, lz, ly = 0) => bkk.userData.toWorld(lx, lz, ly);
  const nw = (lx, lz, ly = 0) => nrt.userData.toWorld(lx, lz, ly);
  const B0 = V(bx, 0, bz);
  const brg = (deg, km, y) => { const r = deg * Math.PI / 180; return V(B0.x + Math.sin(r) * km, y, B0.z - Math.cos(r) * km); };
  const gyB = 0.055 + GO, gyN = nrtY + GO;
  const apDir = V(Math.sin(337 * Math.PI / 180), 0, -Math.cos(337 * Math.PI / 180));
  const thrN = nw(-NRT_LEN / 2 + 0.35, 0);
  const J1 = V(120, 40, 228);
  const cruiseA = brg(52, 200, 40);
  const W = {
    start: bw(-1.65, 0, GO), roll: bw(-0.6, 0, GO), lift: bw(0.7, 0, GO + 0.03), climb1: bw(3.4, 0, GO + 0.5), climb2: bw(9, 0, GO + 2.4),
    turn: brg(24, 32, 9), climb3: brg(40, 85, 22), cruiseA, cruiseB: cruiseA.clone().lerp(J1, 0.4).setY(45), cruiseC: cruiseA.clone().lerp(J1, 0.75).setY(45),
    J1, J1b: V(225, 30, 176), J2: V(280, 15, 86), IF: thrN.clone().addScaledVector(apDir, -48).setY(nrtY + 6.5), FAF: thrN.clone().addScaledVector(apDir, -20).setY(nrtY + 2.4),
    thr: thrN.clone().setY(gyN + 0.06), touch: nw(-NRT_LEN / 2 + 1.0, 0, GO), roll2: nw(NRT_LEN / 2 - 0.9, 0, GO),
    tx1: nw(NRT_LEN / 2 - 0.45, 0.42, GO), tx2: nw(NRT_LEN / 2 - 0.62, 1.0, GO), tx3: nw(0.85, 1.05, GO), tx4: nw(0.4, 1.45, GO), gate: nw(0.4, 1.95, GO),
  };
  W.start.y = W.roll.y = gyB; W.lift.y = gyB + 0.03;
  W.touch.y = W.roll2.y = W.tx1.y = W.tx2.y = W.tx3.y = W.tx4.y = W.gate.y = gyN;
  const flight = Path.fromControl(Object.values(W), 0.08, (x, z, p) => p.y);
  const FD = Object.fromEntries(Object.entries(W).map(([k, v]) => [k, flight.closest(v)]));
  FD.start = 0; FD.gate = flight.length;
  const planeDist = monotone([
    [0, FD.start], [0.06, FD.start], [0.125, FD.lift], [0.2, FD.climb3], [0.415, FD.J1], [0.44, FD.J1b], [0.465, FD.J2], [0.505, FD.thr], [0.522, FD.roll2 - 1.2], [0.536, FD.roll2], [0.552, FD.gate], [1, FD.gate],
  ]);
  const trail = createTrail(140, 0.05); scene.add(trail);

  // ---------- tour road ----------
  const curb = nw(0.4, 3.85);
  const ROAD_WP = [
    [curb.x, curb.z], [140.2, 35.72], [139.95, 35.68], [139.75, 35.68], [139.62, 35.55], [139.45, 35.45], [139.25, 35.33], [139.1, 35.26], [138.95, 35.30],
    [138.93, 35.40], [138.86, 35.47], [138.77, 35.50], [138.62, 35.25], [138.40, 35.05], [138.0, 34.82], [137.7, 34.75], [137.40, 34.80], [137.10, 35.02],
    [136.906, 35.181], [136.6, 35.3], [136.3, 35.25], [136.0, 35.05], [135.85, 34.98], [135.772, 34.967], [135.80, 34.85], [135.84, 34.685], [135.7, 34.67],
    [135.526, 34.687], [135.40, 34.55], [135.24, 34.43],
  ].map(([a, b], i) => (i === 0 ? V(a, 0, b) : LL(a, b)));
  ROAD_WP[ROAD_WP.length - 1] = kix.userData.toWorld(0, -3.9);
  ROAD_WP[23] = LL(135.765, 34.962); // stop just west of the shrine gate
  const roadY = (x, z) => Math.max(H(x, z), 0.03) + 0.014;
  const road = Path.fromControl(ROAD_WP, 0.18, (x, z) => roadY(x, z));
  const roadMat = roadMaterial();
  scene.add(ribbon(road, 0.07, roadY, roadMat, { uvLen: 0.6 }));
  addClear(road);
  const RD = (i) => road.closest(ROAD_WP[i]);
  const RDT = { nrt: 0, tokyo: RD(3), hakone: RD(7), kawa: RD(11), nagoya: RD(18), fushimi: RD(23), nara: RD(25), osaka: RD(27), kix: road.length };

  // hotel on the north shore of Kawaguchiko, suite glass facing Fuji
  const hotelPos = LL(138.77, 35.52);
  while (lakeAt(hotelPos.x, hotelPos.z, 1.35)) hotelPos.z -= 0.1;
  hotelPos.z -= 0.45;
  onGround(hotelPos);
  const fujiTop = V(toX(FUJI.lon), 0, toZ(FUJI.lat)); fujiTop.y = H(fujiTop.x, fujiTop.z);
  // spur from the Kawaguchiko junction round the east end of the lake to the hotel
  const spurWP = [LL(138.77, 35.50), LL(138.792, 35.496), LL(138.815, 35.507), LL(138.812, 35.524), V(hotelPos.x + 1.6, 0, hotelPos.z - 0.9), V(hotelPos.x + 0.2, 0, hotelPos.z - 0.75)];
  const spur = Path.fromControl(spurWP, 0.12, roadY);
  scene.add(ribbon(spur, 0.06, roadY, roadMat, { uvLen: 0.6 }));
  addClear(spur);
  // bus story route = road to Kawaguchiko + spur
  const busPts = road.slice(0, RDT.kawa).concat(spur.pts.slice(1));
  const busPath = new Path(busPts);
  const BD = { tokyo: RDT.tokyo, hakone: RDT.hakone, kawa: RDT.kawa, hotel: busPath.length };

  // ---------- Shinkansen (Tokaido) ----------
  const STN = [
    ['Tokyo', 139.767, 35.681], ['Shin-Yokohama', 139.617, 35.507], ['Odawara', 139.155, 35.256], ['Atami', 139.077, 35.104], ['Mishima', 138.911, 35.126],
    ['Shizuoka', 138.389, 34.972], ['Hamamatsu', 137.735, 34.704], ['Toyohashi', 137.382, 34.763], ['Nagoya', 136.882, 35.171], ['Gifu-Hashima', 136.69, 35.316],
    ['Maibara', 136.29, 35.315], ['Kyoto', 135.758, 34.985], ['Shin-Osaka', 135.5, 34.733],
  ];
  const railRaw = Path.fromControl(STN.map(([, a, b]) => LL(a, b)), 0.25, (x, z) => H(x, z));
  {
    const ys = railRaw.pts.map((p) => p.y), n = ys.length, K = 14;
    railRaw.pts.forEach((p, i) => {
      let s = 0, c = 0;
      for (let j = Math.max(0, i - K); j <= Math.min(n - 1, i + K); j++) { s += ys[j]; c++; }
      let y = Math.max(s / c, 0.05) + 0.16;
      const g = ys[i];
      if (g > y - 0.08 && g < y + 0.35) y = g + 0.08;
      p.y = y;
    });
  }
  const rail = new Path(railRaw.pts);
  scene.add(viaduct(rail, ground));
  addClear(rail);

  // ---------- landmarks ----------
  const pickTag = [];
  const tag = (o, info) => { o.userData.info = info; pickTag.push(o); };

  // Tokyo Tower + city
  const towerPos = onGround(LL(139.745, 35.659));
  const tower = createTower();
  tower.scale.setScalar(S * 333 / 112);
  tower.position.copy(towerPos);
  scene.add(tower);
  const nara = onGround(LL(135.843, 34.685));
  const castlePos = onGround(LL(135.526, 34.687));
  const fushimi = onGround(LL(135.772, 34.967));
  const pagodaPos = onGround(LL(138.801, 35.501));
  const ryokanPos = onGround(LL(139.03, 35.235));
  const ashiC = LL(139.0, 35.215, lakeY('ashi'));

  const cityList = [
    { x: toX(139.73), z: toZ(35.68), r: 15, n: 2600, maxH: 2.2 },
    { x: toX(139.63), z: toZ(35.46), r: 6, n: 520, maxH: 1.4 },
    { x: toX(140.31), z: toZ(35.78), r: 2.2, n: 110, maxH: 0.4 },
    { x: toX(139.15), z: toZ(35.26), r: 2, n: 110, maxH: 0.5 },
    { x: toX(138.93), z: toZ(35.30), r: 2, n: 90, maxH: 0.4 },
    { x: toX(138.81), z: toZ(35.48), r: 2.2, n: 90, maxH: 0.3 },
    { x: toX(138.76), z: toZ(35.512), r: 1.6, n: 70, maxH: 0.4 },
    { x: toX(138.39), z: toZ(34.975), r: 4, n: 300, maxH: 1.2 },
    { x: toX(137.73), z: toZ(34.71), r: 4, n: 280, maxH: 1.4 },
    { x: toX(137.38), z: toZ(34.765), r: 3, n: 170, maxH: 0.8 },
    { x: toX(136.9), z: toZ(35.17), r: 9, n: 1300, maxH: 1.6 },
    { x: toX(135.76), z: toZ(35.0), r: 5, n: 750, maxH: 0.9 },
    { x: toX(135.5), z: toZ(34.69), r: 9, n: 1600, maxH: 1.6 },
    { x: toX(135.81), z: toZ(34.68), r: 2.4, n: 200, maxH: 0.5 },
  ];
  const avoid = [
    { x: towerPos.x, z: towerPos.z, r: 1.3 }, { x: nrtC.x, z: nrtC.z, r: 5, tree: 1.15 }, { x: pagodaPos.x, z: pagodaPos.z, r: 0.9 }, { x: hotelPos.x, z: hotelPos.z, r: 1.4 },
    { x: castlePos.x, z: castlePos.z, r: 1.1 }, { x: nara.x + 0.3, z: nara.z, r: 1.2 }, { x: fushimi.x + 0.6, z: fushimi.z, r: 1.1 }, { x: ryokanPos.x, z: ryokanPos.z, r: 0.6 },
  ];
  const cities = createCities(cityList, { heightAt: ground, landAt: (x, z) => (nearRoute(x, z, 0.22) ? 0 : T.landAt(x, z)), avoid, lakeAt });
  scene.add(cities);

  // forests
  const trees = [];
  const plant = (x, z, size = 1) => {
    if (T.landAt(x, z) < 0.85 || lakeAt(x, z, 1.2) || T.urbanAt(x, z) > 0.32) return;
    const km = T.kmAt(x, z) + (Math.hypot(x - fujiTop.x, z - fujiTop.z) < FUJI.R ? 0 : 0);
    const fr = Math.hypot(x - fujiTop.x, z - fujiTop.z);
    if (fr < 9) return; // above the tree line on Fuji
    if (km > 2.3 || nearRoute(x, z, 0.13)) return;
    if (avoid.some((v) => (v.x - x) ** 2 + (v.z - z) ** 2 < (v.r * (v.tree ?? 0.6)) ** 2)) return;
    const r = rnd();
    trees.push({ x, z, y: H(x, z), s: (0.08 + r * 0.1) * size, r, kind: km > 0.35 || r < 0.45 ? 0 : 1 });
  };
  const scatter = (c, r, n, size) => { for (let i = 0; i < n; i++) { const a = rnd() * 6.283, d = r * Math.sqrt(rnd()); plant(c.x + Math.cos(a) * d, c.z + Math.sin(a) * d, size); } };
  scatter(LL(139.03, 35.24), 9, 4200);
  scatter(LL(138.8, 35.45), 15, 6000);
  scatter(pagodaPos, 1.0, 500);
  scatter(nrtC, 8, 1400);
  scatter(LL(135.79, 34.966), 2.0, 1000);
  scatter(LL(135.85, 34.686), 1.8, 700);
  for (let d = 0; d < road.length; d += 0.35) {
    const p = road.at(d), t = road.tangent(d);
    for (const s of [-1, 1]) { const off = 0.25 + rnd() * 1.4; plant(p.x - t.z * off * s, p.z + t.x * off * s); }
  }
  for (let i = 0; i < 900; i++) { const a = rnd() * 6.283, d = 2 + rnd() * 9; trees.push({ x: bx + Math.cos(a) * d, z: bz + Math.sin(a) * d * 0.7 + 3, y: 0.05, s: 0.12 + rnd() * 0.1, r: rnd(), kind: 1 }); }
  const forest = createForest(trees.filter((t) => !(Math.abs(t.x - bx) < 4 && Math.abs(t.z - bz) < 4.5 && t.y < 0.1)));
  scene.add(forest);

  // Fushimi Inari: shrine hall + torii tunnel up the hill
  const fushiPath = Path.fromControl([V(fushimi.x + 0.12, 0, fushimi.z), V(fushimi.x + 0.45, 0, fushimi.z - 0.05), V(fushimi.x + 0.75, 0, fushimi.z + 0.12), V(fushimi.x + 1.05, 0, fushimi.z + 0.05), V(fushimi.x + 1.35, 0, fushimi.z + 0.2)], 0.01, (x, z) => ground(x, z));
  scene.add(createToriiTunnel(fushiPath, 0.05, fushiPath.length, 0.026, S * 1.25, ground));
  const shrine = new THREE.Group();
  {
    const red = std('#e2522f', { roughness: 0.55 }), roofM = std('#3a3d46', { roughness: 0.5 }), white = std('#f3eee4');
    const hall = new THREE.Mesh(new THREE.BoxGeometry(24, 9, 16).translate(0, 5.5, 0), white); shrine.add(hall);
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(28, 1.2, 20).translate(0, 0.6, 0), std('#9b958b')); shrine.add(plinth);
    for (let i = -2; i <= 2; i++) for (const s of [-1, 1]) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 9, 8).translate(i * 5.5, 5.5, s * 8), red); shrine.add(c); }
    const roof = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 21, 7, 4, 1).rotateY(Math.PI / 4).translate(0, 13.5, 0), roofM); roof.scale.set(1.25, 1, 0.85); shrine.add(roof);
    const gate = createTorii(2.2, '#e2522f'); gate.position.set(-24, 0, 0); gate.rotation.y = Math.PI / 2; shrine.add(gate);
    shrine.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    shrine.scale.setScalar(S * 1.2);
    shrine.position.copy(fushimi);
  }
  scene.add(shrine);

  // Hakone: torii standing in Lake Ashi, ryokan above the shore
  const toriiPos = LL(139.025, 35.205);
  {
    const dir = toriiPos.clone().sub(V(ashiC.x, 0, ashiC.z)).setY(0);
    const full = dir.length(); dir.normalize();
    let k = full;
    while (k > 0 && !lakeAt(ashiC.x + dir.x * k, ashiC.z + dir.z * k, 0.9)) k -= 0.02;
    toriiPos.set(ashiC.x + dir.x * k, lakeY('ashi') - 0.01, ashiC.z + dir.z * k);
  }
  const ashiTorii = createTorii(1.9, '#d8382c');
  ashiTorii.scale.multiplyScalar(S);
  ashiTorii.position.copy(toriiPos);
  ashiTorii.rotation.y = Math.atan2(toriiPos.x - ashiC.x, toriiPos.z - ashiC.z);
  scene.add(ashiTorii);
  const ryokan = createRyokan();
  ryokan.scale.setScalar(S * 1.6);
  scaleLights(ryokan, S * 1.6);
  ryokan.position.copy(ryokanPos);
  ryokan.rotation.y = Math.atan2(-(ashiC.z - ryokanPos.z), ashiC.x - ryokanPos.x);
  scene.add(ryokan);
  const steam = createSteam(); steam.scale.setScalar(S * 1.6); scene.add(steam);
  ryokan.updateMatrixWorld(true);
  steam.position.copy(ryokan.localToWorld(ryokan.userData.onsen.clone()));

  // Chureito pagoda on its terrace
  const pagoda = new THREE.Group();
  {
    const p = createPagoda();
    const terrace = new THREE.Mesh(new THREE.BoxGeometry(22, 4, 22).translate(0, -1.6, 0), std('#8e877b', { roughness: 1 }));
    terrace.receiveShadow = true;
    pagoda.add(terrace, p);
    pagoda.scale.setScalar(S * 2.2);
    pagoda.position.copy(pagodaPos);
    pagoda.rotation.y = 0.35;
  }
  scene.add(pagoda);

  // Sakura Grand hotel
  const hotel = createHotel();
  const HS = S * 1.25;
  hotel.scale.setScalar(HS);
  scaleLights(hotel, HS);
  hotel.position.copy(hotelPos);
  hotel.rotation.y = Math.atan2(-(fujiTop.x - hotelPos.x), -(fujiTop.z - hotelPos.z));
  scene.add(hotel);
  hotel.updateMatrixWorld(true);

  // Osaka castle with moat
  const castle = createCastle();
  castle.scale.setScalar(S * 1.15);
  castle.position.copy(castlePos).add(V(0, 0.02, 0));
  castle.rotation.y = 0.2;
  scene.add(castle);
  scene.add(drapedDisc(castlePos.x, castlePos.z, 0.75, ground, std('#7fa860', { roughness: 1 }), 0.004));
  {
    const moat = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.9, 48).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#3f7a8f', roughness: 0.1, metalness: 0.4 }));
    moat.position.set(castlePos.x, ground(castlePos.x, castlePos.z) + 0.006, castlePos.z);
    scene.add(moat);
  }

  // Nara: great hall and its lawn
  const naraHall = new THREE.Group();
  {
    const wood = std('#6b3d2a'), wall = std('#efe6d6'), roofM = std('#3b3f47', { roughness: 0.5 }), gold = std('#d8b25a', { metalness: 0.8, roughness: 0.3 });
    naraHall.add(new THREE.Mesh(new THREE.BoxGeometry(62, 2, 54).translate(0, 1, 0), std('#a8a196')));
    naraHall.add(new THREE.Mesh(new THREE.BoxGeometry(56, 20, 48).translate(0, 12, 0), wall));
    for (let i = -3; i <= 3; i++) naraHall.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 20, 1.6).translate(i * 8, 12, 24.2), wood));
    const r1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 46, 12, 4).rotateY(Math.PI / 4).translate(0, 27, 0), roofM); r1.scale.set(1.2, 1, 1.0); naraHall.add(r1);
    const r2 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 34, 12, 4).rotateY(Math.PI / 4).translate(0, 40, 0), roofM); r2.scale.set(1.25, 1, 0.9); naraHall.add(r2);
    for (const s of [-1, 1]) naraHall.add(new THREE.Mesh(new THREE.ConeGeometry(1.2, 4, 6).translate(s * 22, 46, 0), gold));
    naraHall.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    naraHall.scale.setScalar(S);
    naraHall.position.copy(nara).add(V(0.25, 0, -0.35));
    onGround(naraHall.position);
  }
  scene.add(naraHall);
  const naraLawn = V(nara.x + 0.2, 0, nara.z + 0.15);
  scene.add(drapedDisc(naraLawn.x, naraLawn.z, 0.85, ground, std('#86ad5f', { roughness: 1 }), 0.004));
  scene.add(drapedDisc(towerPos.x, towerPos.z, 0.5, ground, std('#7fa860', { roughness: 1 }), 0.004));

  // sakura and lanterns (models built in metres, so place in a scaled group)
  const SK = S * 1.5;
  const sak = [];
  const ring = (c, r0, r1, n) => { for (let i = 0; i < n; i++) { const a = rnd() * 6.283, d = r0 + rnd() * (r1 - r0); const x = c.x + Math.cos(a) * d, z = c.z + Math.sin(a) * d; if (!lakeAt(x, z, 1.05) && !nearRoute(x, z, 0.08)) sak.push(V(x / SK, H(x, z) / SK - 0.3, z / SK)); } };
  ring(pagodaPos, 0.25, 0.9, 70);
  ring(hotelPos, 0.5, 1.0, 26);
  ring(toriiPos, 0.15, 0.6, 24);
  ring(fushimi, 0.25, 0.7, 26);
  ring(castlePos, 0.35, 0.72, 40);
  ring(naraLawn.clone().add(V(0.5, 0, -0.4)), 0.1, 0.45, 18);
  ring(towerPos, 0.15, 0.48, 18);
  ring(LL(138.755, 35.508), 0.5, 2.6, 60);
  const sakura = createSakuraTrees(sak);
  sakura.scale.setScalar(SK);
  scene.add(sakura);
  const lan = [];
  for (let d = 0.02; d < 0.6; d += 0.04) for (const s of [-1, 1]) { const p = spur.at(spur.length - d), t = spur.tangent(spur.length - d); const x = p.x - t.z * 0.07 * s, z = p.z + t.x * 0.07 * s; lan.push(V(x / SK, ground(x, z) / SK, z / SK)); }
  for (let d = 0; d < 0.05; d += 0.01) for (const s of [-1, 1]) { const x = fushimi.x - 0.05 - d * 4, z = fushimi.z + s * 0.06; lan.push(V(x / SK, ground(x, z) / SK, z / SK)); }
  const lanterns = createLanterns(lan);
  lanterns.scale.setScalar(SK);
  scene.add(lanterns);

  // guide and group at the Narita curb, coach waiting
  const PS = S * 1.4;
  const guidePos = nw(0.52, 3.68);
  onGround(guidePos);
  const guide = createGuide(); guide.scale.setScalar(PS); guide.position.copy(guidePos); scene.add(guide);
  const tourists = new THREE.Group();
  ['#4b6cb7', '#f2b134', '#7a4fb5', '#3aa17e', '#d9534f', '#2b3a67', '#e2799b', '#3d8fb0'].forEach((c, i) => {
    const p = createPerson(c);
    p.scale.setScalar(PS);
    p.position.copy(nw(0.6 + (i % 4) * 0.04, 3.6 - Math.floor(i / 4) * 0.045));
    onGround(p.position);
    p.lookAt(guidePos.x, p.position.y, guidePos.z);
    tourists.add(p);
  });
  scene.add(tourists);
  const bus = createCoach('#e6688e');
  bus.scale.setScalar(S);
  scene.add(bus);

  // ---------- atmosphere ----------
  const regions = [{ count: 50, min: [bx - 70, 5, bz - 90], max: [bx + 120, 12, bz + 40], size: [3, 9] }];
  for (let k = 0; k <= 16; k++) {
    const p = flight.at(FD.climb3 + (FD.J2 - FD.climb3) * k / 16);
    regions.push({ count: 16, min: [p.x - 60, 7, p.z - 60], max: [p.x + 60, 17, p.z + 60], size: [8, 20] });
  }
  regions.push({ count: 40, min: [-350, 48, -500], max: [450, 62, 250], size: [25, 60], opacity: 0.35 });
  regions.push({ count: 14, min: [60, 22, -40], max: [180, 27, 60], size: [5, 10], opacity: 0.6 });
  const clouds = createClouds(regions);
  scene.add(clouds);
  const petals = createPetals(650); scene.add(petals);

  // ---------- labels ----------
  const labels = [];
  const label = (text, sub, pos, near, far, cond = null) => { const l = createLabel(text, sub); l.position.copy(pos); l.userData = { near, far, cond }; scene.add(l); labels.push(l); return l; };
  label('สุวรรณภูมิ', 'BKK · กรุงเทพฯ', V(bx, 1.2, bz), 4, 5000, (c) => c.position.y > 300 || c.position.distanceTo(V(bx, 0, bz)) < 80);
  label('นาริตะ', 'NRT · 成田', nrtC.clone().setY(nrtY + 1.2), 7, 5000, (c) => c.position.y > 300 || c.position.distanceTo(nrtC) < 80);
  label('โตเกียว', '東京', towerPos.clone().add(V(0, 7.5, 0)), 9, 140);
  label('ฮาโกเน่', '箱根 · ทะเลสาบอาชิ', V(ashiC.x, ashiC.y + 2.5, ashiC.z), 6, 90);
  label('ภูเขาไฟฟูจิ', '富士山 · 3,776 ม.', fujiTop.clone().add(V(0, 1.5, 0)), 10, 260);
  label('คาวากุจิโกะ', '河口湖', LL(138.75, 35.515, lakeY('kawaguchiko') + 1.5), 5, 60);
  label('เกียวโต', '京都 · ฟูชิมิอินาริ', fushimi.clone().add(V(0, 2, 0)), 4, 120);
  label('นารา', '奈良', nara.clone().add(V(0, 1.5, 0)), 4, 120);
  label('โอซาก้า', '大阪城', castlePos.clone().add(V(0, 2.5, 0)), 4, 120);
  label('นาโกย่า', '名古屋', LL(136.9, 35.17, 3), 8, 120);
  label('คันไซ', 'KIX · 関西', kix.position.clone().add(V(0, 1.2, 0)), 6, 120);

  // ---------- story route lines and destination beacon ----------
  const flightPts = flight.slice(0, flight.length, 900).map((p) => p.clone().add(V(0, 0.02, 0)));
  const flightAll = routeLine(flightPts, '#ffffff', 1.5, 0.28);
  const flightProg = routeLine(flightPts, '#ffd27a', 4, 1);
  const busLinePts = busPath.slice(0, busPath.length, 3000).map((p) => p.clone().add(V(0, 0.025, 0)));
  const busAll = routeLine(busLinePts, '#ffffff', 1.5, 0.35);
  const busProg = routeLine(busLinePts, '#7dffb0', 4, 1);
  scene.add(flightAll, flightProg, busAll, busProg);
  // precompute distance at each line point for fast lookup
  const cumOf = (pts) => { const c = [0]; for (let i = 1; i < pts.length; i++) c.push(c[i - 1] + pts[i].distanceTo(pts[i - 1])); return c; };
  const flightCum = cumOf(flightPts), busCum = cumOf(busLinePts);
  const countUpTo = (cum, d) => { let lo = 0, hi = cum.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (cum[m] <= d) lo = m; else hi = m; } return lo; };
  const beacon = createBeacon('#7dffb0');
  scene.add(beacon);
  const planeDot = createLabelDot('#ffd27a');
  scene.add(planeDot);

  // ---------- life ----------
  const life = createLife(scene, { H, ground, road, RDT, rail, STN, lakeAt, lakeY, LAKES, ashiC, nara: naraLawn, fushimi, towerPos, pagodaPos, nrt, kix, bkk, flight, hotelPos });
  tag(hotel, 'hotel'); tag(ryokan, 'ryokan'); tag(pagoda, 'pagoda'); tag(fujiMesh, 'fuji'); tag(tower, 'tokyo');
  tag(bus, 'bus'); tag(guide, 'guide'); tag(ashiTorii, 'torii'); tag(shrine, 'torii'); tag(plane, 'plane'); tag(castle, 'castle'); tag(naraHall, 'nara');
  jets.forEach((j) => tag(j, 'plane'));
  life.pickables.push(...pickTag);

  const holo = createHoloMap({ H, ground, thaiXZ });
  scene.add(holo);

  // ---------- actors on the timeline ----------
  const tmpV = V(0, 0, 0), tmpT = V(0, 0, 0), up = V(0, 1, 0);
  let lastYaw = 0;
  function placePlane(d) {
    const p = flight.at(d), tan = flight.tangent(d, tmpT, 0.25);
    const ahead = flight.tangent(Math.min(flight.length, d + 6), V(0, 0, 0), 0.25);
    const yaw = Math.atan2(-tan.z, tan.x), yaw2 = Math.atan2(-ahead.z, ahead.x);
    let dy = yaw2 - yaw; while (dy > Math.PI) dy -= 2 * Math.PI; while (dy < -Math.PI) dy += 2 * Math.PI;
    const airborne = p.y - (d < FD.climb3 ? gyB : gyN) > 0.15;
    const pitch = Math.asin(THREE.MathUtils.clamp(tan.y, -1, 1)) + (airborne ? 0.02 : 0);
    plane.position.copy(p);
    plane.rotation.set(airborne ? THREE.MathUtils.clamp(dy * 1.6, -0.45, 0.45) : 0, yaw, pitch, 'YZX');
    plane.userData.gear.visible = p.y - Math.max(0, H(p.x, p.z)) < 3 || d > FD.FAF;
    lastYaw = yaw;
    // contrail at altitude
    if (p.y > 20) {
      const pts = [];
      for (let i = 0; i < 140; i++) { const q = flight.at(d - 0.6 - i * 0.12); if (q.y < 20) break; pts.push(q.clone().add(V(0, -0.02, 0))); }
      trail.userData.setPoints(pts);
    } else trail.userData.setPoints([]);
    return p;
  }
  function placeBus(d) {
    const p = busPath.at(d), tan = busPath.tangent(d, tmpT, 0.12);
    const side = V(-tan.z, 0, tan.x).normalize();
    bus.position.copy(p).addScaledVector(side, -0.03);
    bus.position.y = roadY(bus.position.x, bus.position.z) - 0.004;
    bus.lookAt(tmpV.copy(bus.position).sub(V(tan.x, tan.y * 0.6, tan.z)));
    return { p: bus.position.clone(), f: V(tan.x, 0, tan.z).normalize() };
  }
  const busDist = monotone([[0, 0], [0.592, 0], [0.655, BD.tokyo - 2.2], [0.672, BD.tokyo], [0.71, BD.tokyo], [0.785, BD.hakone], [0.83, BD.hakone + 1], [0.888, BD.kawa - 1.5], [0.905, BD.kawa + 1.2], [0.94, BD.hotel], [1, BD.hotel]]);

  // ---------- story camera ----------
  const ctx = { P: V(0, 0, 0), PF: V(1, 0, 0), B: V(0, 0, 0), BF: V(0, 0, -1) };
  const PR = (back, upY, side) => () => { const r = V(-ctx.PF.z, 0, ctx.PF.x); return ctx.P.clone().addScaledVector(ctx.PF, -back).add(V(0, upY, 0)).addScaledVector(r, side); };
  const BR = (back, upY, side) => () => { const r = V(-ctx.BF.z, 0, ctx.BF.x); return ctx.B.clone().addScaledVector(ctx.BF, -back).add(V(0, upY, 0)).addScaledVector(r, side); };
  const A = (v) => () => v.clone();
  const mixF = (a, b, k) => () => a().lerp(b(), k);
  const ashiTop = V(ashiC.x, ashiC.y, ashiC.z);
  const routeMid = V((bx + nrtC.x) / 2, 0, (bz + nrtC.z) / 2);
  const toFuji = (from) => fujiTop.clone().add(V(0, 3, 0)).sub(from).setY(0).normalize();
  const pf = toFuji(pagodaPos);
  const pagodaEye = pagodaPos.clone().addScaledVector(pf, -1.6).add(V(-pf.z * 0.5, 0.3, pf.x * 0.5));
  const pagodaLook = pagodaPos.clone().add(V(0, 0.5, 0)).lerp(fujiTop.clone().add(V(0, -3.5, 0)), 0.05);
  const fujiLook = fujiTop.clone().add(V(0, -3.5, 0));
  const suiteEye = hotel.localToWorld(V(-2.5, SUITE.y + 1.5, -3));
  const suiteLook = suiteEye.clone().lerp(fujiTop.clone().add(V(0, -4.5, 0)), 0.4);
  const hotelEye = hotel.localToWorld(V(-62, 40, -128));
  const hotelLook = hotel.localToWorld(V(0, 34, 0));
  const ryEye = ryokan.localToWorld(V(-7.6, 3.1, -1.5));
  const ryLook = ryokan.localToWorld(V(60, -6, -8));
  const toLake = V(ashiC.x - toriiPos.x, 0, ashiC.z - toriiPos.z).normalize();
  const toriiEye = V(toriiPos.x, toriiPos.y, toriiPos.z).addScaledVector(toLake, 2.1).add(V(-toLake.z * 0.7, 0.45, toLake.x * 0.7));
  const fushiEye = fushiPath.at(0.02).add(V(0, 0.065, 0));
  const fushiLook = fushiPath.at(0.32).add(V(0, 0.05, 0));
  const nrtGateEye = nw(1.6, 0.85, 0.55), nrtGateLook = nw(0.4, 2.0, 0.12);
  const guideEye = nw(0.9, 4.0, 0.16), guideLook = guidePos.clone().add(V(-0.05, 0.03, 0));
  const KEYS = [
    { t: 0.0, pos: A(bw(-4.6, -2.4, 1.3)), look: A(bw(-1.0, 1.1, 0.1)) },
    { t: 0.045, pos: PR(1.7, 0.32, -1.25), look: PR(-0.3, 0.06, 0) },
    { t: 0.1, pos: PR(2.3, 0.42, 1.3), look: PR(-3, 0.1, 0) },
    { t: 0.155, pos: PR(3.2, 0.9, -1.9), look: PR(-3, 0, 0) },
    { t: 0.205, pos: PR(4.5, 1.6, 2.6), look: PR(-5, 0, 0) },
    { t: 0.26, pos: PR(9, 3.5, -7), look: PR(-8, -1, 0) },
    { t: 0.33, pos: A(routeMid.clone().add(V(-150, 2100, 1650))), look: A(routeMid.clone().add(V(60, 0, -80))) },
    { t: 0.4, pos: PR(6, 2.2, 4.5), look: PR(-60, -12, 0) },
    { t: 0.455, pos: PR(3.6, 1.1, -2.6), look: PR(-14, -3, 0) },
    { t: 0.5, pos: A(nw(-NRT_LEN / 2 + 0.3, -1.25, 0.55)), look: PR(0, 0, 0) },
    { t: 0.527, pos: PR(1.9, 0.33, 1.35), look: PR(-0.6, 0.02, 0) },
    { t: 0.556, pos: A(nrtGateEye), look: A(nrtGateLook) },
    { t: 0.588, pos: A(guideEye), look: A(guideLook) },
    { t: 0.615, pos: BR(0.6, 0.22, 0.38), look: BR(-0.8, 0.03, 0) },
    { t: 0.645, pos: BR(1.9, 1.3, -0.5), look: BR(-3, 0, 0) },
    { t: 0.675, pos: A(towerPos.clone().add(V(6.5, 3.6, 8))), look: A(towerPos.clone().add(V(0, 3.2, 0))) },
    { t: 0.705, pos: A(towerPos.clone().add(V(-4.6, 2.2, -2.6))), look: A(towerPos.clone().add(V(0, 4.2, 0))) },
    { t: 0.737, pos: BR(1.3, 0.55, 0.85), look: BR(-3, 0.1, 0) },
    { t: 0.765, pos: A(ashiTop.clone().add(V(7, 8, 10))), look: A(ashiTop.clone().add(V(0, 0, -1))) },
    { t: 0.795, pos: A(toriiEye), look: A(V(toriiPos.x, toriiPos.y + 0.12, toriiPos.z).addScaledVector(toLake, -0.2)) },
    { t: 0.818, pos: A(ryokan.localToWorld(V(30, 24, 22))), look: A(ryokan.localToWorld(V(0, 2, 0))) },
    { t: 0.85, pos: BR(1.4, 0.6, -0.9), look: mixF(BR(-3, 0, 0), A(fujiLook), 0.6) },
    { t: 0.878, pos: A(pagodaEye), look: A(pagodaLook) },
    { t: 0.905, pos: A(LL(138.765, 35.545, 0).setY(H(toX(138.765), toZ(35.545)) + 1.6)), look: A(fujiLook) },
    { t: 0.935, pos: BR(0.9, 0.38, 0.6), look: A(hotelLook) },
    { t: 0.965, pos: A(hotel.localToWorld(V(-30, 40, -55))), look: A(hotel.localToWorld(V(0, 16, 0))) },
    { t: 1.0, pos: A(suiteEye), look: A(suiteLook) },
  ];
  const cr = (p0, p1, p2, p3, s) => {
    const s2 = s * s, s3 = s2 * s;
    return p1.clone().multiplyScalar(2)
      .add(p2.clone().sub(p0).multiplyScalar(s))
      .add(p0.clone().multiplyScalar(2).sub(p1.clone().multiplyScalar(5)).add(p2.clone().multiplyScalar(4)).sub(p3).multiplyScalar(s2))
      .add(p1.clone().multiplyScalar(3).sub(p0).sub(p2.clone().multiplyScalar(3)).add(p3).multiplyScalar(s3))
      .multiplyScalar(0.5);
  };
  // Positions far apart (flight overview) use a log-space blend so the pull-out stays smooth
  function storyPose(t, out) {
    setActors(t);
    let i = 0;
    while (i < KEYS.length - 2 && t > KEYS[i + 1].t) i++;
    const k = (j) => KEYS[Math.max(0, Math.min(KEYS.length - 1, j))];
    const s = clamp01((t - KEYS[i].t) / (KEYS[i + 1].t - KEYS[i].t));
    const ks = [k(i - 1), k(i), k(i + 1), k(i + 2)];
    const P4 = ks.map((x) => x.pos()), L4 = ks.map((x) => x.look());
    // avoid huge overshoot when neighbours are thousands of km apart
    const far = P4[1].distanceTo(P4[2]) > 300 || P4[0].distanceTo(P4[1]) > 300 || P4[2].distanceTo(P4[3]) > 300;
    if (far) {
      const e = s * s * (3 - 2 * s);
      // orbit-style blend: interpolate the look point, then the offset from it in log-distance
      const la = L4[1], lb = L4[2];
      out.look.copy(la).lerp(lb, e);
      const oa = P4[1].clone().sub(la), ob = P4[2].clone().sub(lb);
      const da = oa.length(), db = ob.length();
      const dir = oa.normalize().lerp(ob.normalize(), e).normalize();
      out.pos.copy(out.look).addScaledVector(dir, Math.exp(Math.log(da) + (Math.log(db) - Math.log(da)) * e));
    } else {
      out.pos.copy(cr(...P4, s));
      out.look.copy(cr(...L4, s));
    }
    const gy = ground(out.pos.x, out.pos.z) + 0.035;
    if (out.pos.y < gy) out.pos.y = gy;
    return out;
  }
  let actorsT = -1;
  function setActors(t) {
    if (t === actorsT) return;
    actorsT = t;
    const d = planeDist(t);
    ctx.P.copy(placePlane(d));
    ctx.PF.set(Math.cos(lastYaw), 0, -Math.sin(lastYaw));
    const b = placeBus(busDist(t));
    ctx.B.copy(b.p); ctx.BF.copy(b.f);
    actors.planeD = d; actors.busD = busDist(t);
  }
  const actors = { planeD: 0, busD: 0 };

  // story time of day
  const ENV_KEYS = [[0, ENV.dawn], [0.1, ENV.day], [0.45, ENV.day], [0.55, ENV.golden], [0.7, ENV.sunset], [0.722, ENV.day], [0.8, ENV.day], [0.86, ENV.golden], [0.915, ENV.sunset], [0.95, ENV.dusk], [1.0, ENV.night]];
  function storyEnv(t, out) {
    let i = 0;
    while (i < ENV_KEYS.length - 2 && t > ENV_KEYS[i + 1][0]) i++;
    const [t0, a] = ENV_KEYS[i], [t1, b] = ENV_KEYS[i + 1];
    return lerpEnv(out, a, b, clamp01((t - t0) / (t1 - t0)));
  }

  // ---------- legs for the HUD ----------
  const roadKm = (a, b) => Math.round(b - a);
  const LEGS = [
    { t0: 0, t1: 0.06, kind: 'ground', title: 'สนามบินสุวรรณภูมิ', sub: 'เช็คอินกลุ่ม · เกต D4', dest: bkk.position, stats: [['เที่ยวบิน', 'CV 101'], ['ขึ้นเครื่อง', '07:15'], ['ผู้เดินทาง', '24 ท่าน']] },
    { t0: 0.06, t1: 0.552, kind: 'flight', title: 'กรุงเทพฯ → โตเกียว', sub: 'BKK ✈ NRT · บินตรง', dest: nw(0.4, 1.95), stats: [['ระยะทาง', '4,600 กม.'], ['เวลาบิน', '6 ชม. 10 น.'], ['เครื่องบิน', 'Wide-body'], ['ระดับบิน', '37,000 ฟุต']] },
    { t0: 0.552, t1: 0.62, kind: 'ground', title: 'พบไกด์ที่นาริตะ', sub: 'ประตูขาออก B · ธงสีชมพู', dest: guidePos, stats: [['ไกด์', 'มิกิ'], ['ภาษา', 'ไทย · ญี่ปุ่น'], ['รถ', 'โค้ช 40 ที่นั่ง']] },
    { t0: 0.62, t1: 0.722, kind: 'bus', title: 'นาริตะ → โตเกียว', sub: 'ทางด่วน Higashi-Kanto', d0: 0, d1: BD.tokyo, dest: busPath.at(BD.tokyo), stats: [['ระยะทาง', `${roadKm(0, BD.tokyo)} กม.`], ['เวลา', '~1 ชม. 10 น.'], ['แวะ', 'โตเกียวทาวเวอร์']] },
    { t0: 0.722, t1: 0.83, kind: 'bus', title: 'โตเกียว → ฮาโกเน่', sub: 'ทางด่วนโทเม · ทะเลสาบอาชิ', d0: BD.tokyo, d1: BD.hakone, dest: busPath.at(BD.hakone), stats: [['ระยะทาง', `${roadKm(BD.tokyo, BD.hakone)} กม.`], ['เวลา', '~1 ชม. 45 น.'], ['แวะ', 'เรือโจรสลัด · เรียวกัง']] },
    { t0: 0.83, t1: 0.92, kind: 'bus', title: 'ฮาโกเน่ → คาวากุจิโกะ', sub: 'เลียบตีนเขาฟูจิ', d0: BD.hakone, d1: BD.kawa, dest: busPath.at(BD.kawa), stats: [['ระยะทาง', `${roadKm(BD.hakone, BD.kawa)} กม.`], ['เวลา', '~1 ชม. 10 น.'], ['แวะ', 'เจดีย์ชูเรโตะ']] },
    { t0: 0.92, t1: 1.01, kind: 'bus', title: 'เช็คอิน Sakura Grand', sub: 'ริมทะเลสาบคาวากุจิโกะ', d0: BD.kawa, d1: BD.hotel, dest: hotelPos, stats: [['ห้อง', 'สวีทวิวฟูจิ'], ['ชั้น', 'บนสุด'], ['อาหารเย็น', 'ไคเซกิ 19:30']] },
  ];
  const planeSpeed = linear([[0.06, 0], [0.09, 60], [0.125, 290], [0.16, 560], [0.2, 820], [0.24, 905], [0.42, 905], [0.465, 560], [0.5, 270], [0.508, 250], [0.522, 120], [0.536, 30], [0.552, 0]]);
  const clockJST = linear([[0, 520], [0.06, 560], [0.125, 585], [0.2, 610], [0.46, 920], [0.508, 955], [0.552, 965], [0.59, 1010], [0.62, 1025], [0.672, 1085], [0.72, 1120], [0.722, 1440 + 540], [0.785, 1440 + 640], [0.83, 1440 + 810], [0.905, 1440 + 1030], [0.94, 1440 + 1070], [1, 1440 + 1180]]);
  let busSpeed = 0;
  function storyInfo(t) {
    setActors(t);
    const li = Math.max(0, LEGS.findIndex((l) => t >= l.t0 && t < l.t1));
    const leg = LEGS[li];
    const jst = clockJST(t);
    const thai = t < 0.33;
    const mins = Math.round(thai ? jst - 120 : jst) % 1440;
    const day = jst >= 1440 ? 2 : 1;
    const time = `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
    let alt, speed, remain, altLabel = 'ความสูง';
    if (leg.kind === 'flight') {
      const p = plane.position, gy = actors.planeD < FD.climb3 ? gyB : gyN;
      alt = `${(Math.round(clamp01((p.y - gy) / 45) * 37000 / 100) * 100).toLocaleString('en-US')} ฟุต`;
      speed = `${Math.round(planeSpeed(t))} กม./ชม.`;
      remain = `${Math.round(4600 * (1 - clamp01(actors.planeD / FD.touch))).toLocaleString('en-US')} กม.`;
    } else if (leg.kind === 'bus' && t >= 0.592) {
      const dd = actors.busD;
      busSpeed = Math.abs(busDist(t + 0.0015) - busDist(t - 0.0015)) / 0.003 * 0.085;
      const elev = Math.max(0, (bus.position.y) / VERT * 1000);
      alt = `${Math.round(elev)} ม.`; altLabel = 'ระดับถนน';
      speed = `${Math.round(Math.min(100, busSpeed))} กม./ชม.`;
      remain = `${Math.max(0, leg.d1 - dd).toFixed(1)} กม.`;
    } else {
      alt = leg === LEGS[0] ? '2 ม.' : `${Math.round(nrtY / VERT * 1000)} ม.`;
      speed = '0 กม./ชม.'; remain = '—';
    }
    return { index: li, count: LEGS.length, leg, alt, altLabel, speed, remain, time, zone: thai ? 'เวลาไทย' : 'เวลาญี่ปุ่น', day };
  }

  // ---------- explore targets ----------
  const castleEye = castlePos.clone().add(V(1.5, 0.95, 1.9)), castleLook = castlePos.clone().add(V(0, 0.55, 0));
  const naraEye = naraLawn.clone().add(V(-0.7, 0, 2.3)); onGround(naraEye, 0.42);
  const naraLook = naraHall.position.clone().add(V(0, 0.35, 0));
  const EXPLORE = {
    hotel: { pos: hotelEye, look: hotelLook, env: ENV.dusk, petals: 0.5 },
    suite: { pos: suiteEye, look: suiteLook, env: ENV.day, petals: 0 },
    ryokan: { pos: ryEye, look: ryLook, env: ENV.dusk, petals: 0.3 },
    fuji: { pos: LL(138.9, 35.47, 0).add(V(0, ground(toX(138.9), toZ(35.47)) + 7, 0)), look: fujiLook, env: ENV.golden, petals: 0.6 },
    pagoda: { pos: pagodaEye, look: pagodaLook, env: ENV.day, petals: 1 },
    torii: { pos: fushiEye, look: fushiLook, env: ENV.golden, petals: 0.5 },
    tokyo: { pos: towerPos.clone().add(V(7, 4.2, 9)), look: towerPos.clone().add(V(0, 3.4, 0)), env: ENV.night, petals: 0 },
    castle: { pos: castleEye, look: castleLook, env: ENV.golden, petals: 0.8 },
    nara: { pos: naraEye, look: naraLook, env: ENV.day, petals: 0.4 },
  };
  const jcen = V(40, 0, -170);
  const BUILDER = {
    pos: jcen.clone().add(V(0, 1450, 900)), look: jcen.clone(),
    posNarrow: jcen.clone().add(V(-60, 2500, 700)), lookNarrow: jcen.clone().add(V(-60, 0, -150)),
    env: ENV.night,
  };

  // ---------- per-frame update ----------
  const env = makeEnvState();
  const blinkers = [];
  scene.traverse((o) => { if (o.userData.blink) blinkers.push(o); });
  let petalDensity = 0;
  const white = new THREE.Color('#ffffff');
  function update({ dt, time, storyT, camera, look, envState, petalsTarget, storyWeight = 1, builderWeight = 0 }) {
    setActors(storyT);
    sky.position.copy(camera.position);
    sky.material.uniforms.time.value = time;
    guide.userData.update(time);

    const camDist = Math.max(0.02, camera.position.distanceTo(look));
    const camH = Math.max(0.02, camera.position.y - ground(camera.position.x, camera.position.z));
    const scale = Math.max(camDist, camH * 0.7);

    const e = envState || env;
    sky.material.uniforms.top.value.copy(e.top);
    sky.material.uniforms.bottom.value.copy(e.bottom);
    sky.material.uniforms.sunColor.value.copy(e.sun);
    sky.material.uniforms.sunDir.value.copy(e.sunDir);
    sky.material.uniforms.night.value = e.night;
    // fog scales with how high / far the camera is
    scene.fog.color.copy(e.fog);
    scene.fog.near = scale * 3;
    scene.fog.far = Math.min(12000, scale * 55 + 40 + camH * 12);
    hemi.intensity = e.hemi;
    hemi.color.copy(e.top).lerp(white, 0.6);
    sun.color.copy(e.sun); sun.intensity = e.sunI;
    // shadow frustum follows what the camera looks at
    const ext = THREE.MathUtils.clamp(scale * 1.3, 0.4, 600);
    sun.target.position.copy(look);
    sun.position.copy(look).addScaledVector(e.sunDir, ext * 4);
    const sc = sun.shadow.camera;
    sc.left = sc.bottom = -ext; sc.right = sc.top = ext; sc.near = ext * 0.5; sc.far = ext * 9;
    sc.updateProjectionMatrix();
    sun.shadow.normalBias = ext * 0.004;
    sun.castShadow = scale < 70;
    clouds.userData.setTint(e.cloud);
    trail.material.uniforms.strength.value = 1 - e.night * 0.6;
    updateGlow(e.night);
    for (const a of [bkk, nrt, kix]) a.userData.lights.color.setScalar(0.5 + e.night * 2.2);

    const on = Math.sin(time * 6) > 0.6;
    for (const o of blinkers) o.visible = on;

    petalDensity += (petalsTarget - petalDensity) * Math.min(1, dt * 2);
    petals.userData.update(dt, time, camera.position, petalDensity, THREE.MathUtils.clamp(camDist / 45, 0.002, 1.5));
    steam.userData.update(time);
    life.update(time, dt, camera);
    holo.userData.update(time, camera, builderWeight);

    // route lines: progress follows the plane / bus
    const fw = storyWeight * (1 - smooth(0.58, 0.64, storyT)) * smooth(0.055, 0.08, storyT);
    flightAll.material.opacity = 0.28 * fw; flightProg.material.opacity = fw;
    flightAll.visible = flightProg.visible = fw > 0.01;
    flightProg.geometry.instanceCount = Math.max(1, countUpTo(flightCum, actors.planeD));
    const bwgt = storyWeight * smooth(0.585, 0.62, storyT) * (1 - smooth(0.945, 0.975, storyT));
    busAll.material.opacity = 0.35 * bwgt; busProg.material.opacity = bwgt;
    busAll.visible = busProg.visible = bwgt > 0.01;
    busProg.geometry.instanceCount = Math.max(1, countUpTo(busCum, actors.busD));
    for (const m of [flightAll, flightProg, busAll, busProg]) m.material.dashOffset = -time;

    // destination beacon
    const info = LEGS.find((l) => storyT >= l.t0 && storyT < l.t1) || LEGS[LEGS.length - 1];
    beacon.position.copy(info.dest);
    beacon.position.y = ground(info.dest.x, info.dest.z);
    const bDist = camera.position.distanceTo(beacon.position);
    const bOp = storyWeight * smooth(0.04, 0.08, storyT) * (1 - smooth(0.96, 0.99, storyT)) * smooth(0.12, 0.6, bDist / Math.max(0.3, scale));
    beacon.visible = bOp > 0.02;
    beacon.userData.setOpacity(bOp);
    beacon.userData.update(time, THREE.MathUtils.clamp(bDist * 0.018, 0.03, 50));

    // plane marker when the camera is far away
    const pDist = camera.position.distanceTo(plane.position);
    planeDot.position.copy(plane.position);
    planeDot.material.opacity = storyWeight * smooth(25, 90, pDist);
    planeDot.visible = planeDot.material.opacity > 0.02;

    // labels fade in by distance band
    for (const l of labels) {
      const d = camera.position.distanceTo(l.position);
      const k = smooth(l.userData.near, l.userData.near * 1.8, d) * (1 - smooth(l.userData.far * 0.7, l.userData.far, d)) * (l.userData.cond && !l.userData.cond(camera) ? 0 : 1);
      l.material.opacity = k * (storyWeight * 0.9 + 0.1 * (1 - storyWeight)) * (1 - 0.6 * (1 - storyWeight));
      l.visible = l.material.opacity > 0.02;
    }
  }

  if (location.search.includes('debug')) window.__world = { V, pagoda, scene, fujiMesh, terrain: T.mesh, hotel, hotelEye, hotelLook, suiteEye, toriiPos, ashiC, pagodaPos, fujiTop, H, KEYS };
  return {
    scene, plane, life, update, storyPose, storyEnv, storyInfo, EXPLORE, BUILDER, holo, makeEnv: makeEnvState,
    japanZone: (p) => p.x > -400 && p.z < 400 && p.y < 40,
  };
}

// glowing dot that keeps a fixed screen size
function createLabelDot(color) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.25, color); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, depthTest: false, sizeAttenuation: false, toneMapped: false, fog: false, blending: THREE.AdditiveBlending }));
  s.scale.set(0.035, 0.035, 1);
  s.renderOrder = 21;
  return s;
}

// rising steam over the onsen (built in metres)
function createSteam() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,0.5)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  const grp = new THREE.Group();
  const puffs = [];
  for (let i = 0; i < 14; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.4 }));
    s.userData.o = Math.random();
    grp.add(s); puffs.push(s);
  }
  grp.userData.update = (t) => {
    for (const s of puffs) {
      const k = (t * 0.15 + s.userData.o) % 1;
      s.position.set(Math.sin(k * 6 + s.userData.o * 9) * 0.8, 1 + k * 5, Math.cos(k * 5) * 0.6);
      s.scale.setScalar(1.5 + k * 3);
      s.material.opacity = 0.35 * Math.sin(k * Math.PI);
    }
  };
  return grp;
}
