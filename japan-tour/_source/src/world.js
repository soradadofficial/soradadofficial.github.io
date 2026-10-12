import * as THREE from 'three';
import {
  createPlane, createRunway, createTerminal, createBus, createGuide, createPerson, createTorii,
  createPagoda, createFuji, createSakuraTrees, createLanterns, createTower, createCity,
  createHotel, createRyokan, SUITE, updateGlow,
} from './models.js';
import { createSky, createClouds, createPetals, createTrail, ENV, lerpEnv, makeEnvState } from './fx.js';
import { createHoloMap } from './mapholo.js';
import { createLife } from './life.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const remap = (x, a, b) => clamp01((x - a) / (b - a));
const smoother = (x) => x * x * x * (x * (x * 6 - 15) + 10);

// Key locations in the single continuous world
export const LOC = {
  hotel: V(1782, 0, -520),
  ryokan: V(1640, 0, -770),
  pagoda: V(1610, 0, -560),
  fuji: V(1630, 0, -1150),
  tower: V(1840, 0, -230),
  lake: V(1655, 0.15, -860),
  map: V(1700, 430, -460),
  guide: V(1678, 0, -44),
};

export function createWorld() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#bcd9ee', 480, 3200);

  const sky = createSky();
  scene.add(sky);

  const hemi = new THREE.HemisphereLight('#dfefff', '#4a5a3a', 1);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight('#ffffff', 2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  sc.left = sc.bottom = -140; sc.right = sc.top = 140; sc.near = 1; sc.far = 900;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.6;
  scene.add(sun, sun.target);

  // ---------- Ground & sea ----------
  const ocean = new THREE.Mesh(new THREE.PlaneGeometry(9000, 9000), new THREE.MeshStandardMaterial({ color: '#1d4d6f', roughness: 0.18, metalness: 0.35 }));
  ocean.rotation.x = -Math.PI / 2; ocean.position.set(900, -1.5, -400);
  scene.add(ocean);

  function land(w, d, x, z, color, jitter = 0.06) {
    const geo = new THREE.PlaneGeometry(w, d, 60, 60);
    geo.rotateX(-Math.PI / 2);
    const c = new THREE.Color(color), tmp = new THREE.Color();
    const cols = new Float32Array(geo.attributes.position.count * 3);
    for (let i = 0; i < geo.attributes.position.count; i++) {
      tmp.copy(c).offsetHSL(0, 0, (Math.random() - 0.5) * jitter);
      cols.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 }));
    m.position.set(x, 0, z);
    m.receiveShadow = true;
    scene.add(m);
    return m;
  }
  land(900, 520, 120, -40, '#6d8f4c');
  land(980, 1560, 1660, -500, '#6f9256');

  // distant hills (instanced cones) on the Japan side
  {
    const geo = new THREE.ConeGeometry(1, 1, 7);
    geo.translate(0, 0.5, 0);
    const mat = new THREE.MeshStandardMaterial({ color: '#3f5f45', roughness: 1, flatShading: true });
    const n = 70;
    const inst = new THREE.InstancedMesh(geo, mat, n);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
    for (let i = 0; i < n; i++) {
      const side = i % 2 ? 1 : -1;
      const x = side > 0 ? 1960 + Math.random() * 160 : 1240 + Math.random() * 140;
      const z = -100 - Math.random() * 1100;
      const r = 30 + Math.random() * 50;
      m.compose(p.set(x, 0, z), q.setFromEuler(new THREE.Euler(0, Math.random() * 3, 0)), s.set(r, 30 + Math.random() * 70, r));
      inst.setMatrixAt(i, m);
    }
    scene.add(inst);
  }

  // ---------- Thailand: airport ----------
  const rwA = createRunway(260, 14); rwA.position.set(40, 0, 0); scene.add(rwA);
  const termA = createTerminal({ thai: true, label: 'BKK  สุวรรณภูมิ', towerX: 60 }); termA.position.set(0, 0, -40); scene.add(termA);
  // tropical trees around the Thai airport
  {
    const geo = new THREE.IcosahedronGeometry(3, 0);
    const inst = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: '#3f7a3a', flatShading: true }), 90);
    const m = new THREE.Matrix4();
    for (let i = 0; i < 90; i++) {
      const x = -250 + Math.random() * 600, z = Math.random() < 0.5 ? 30 + Math.random() * 150 : -90 - Math.random() * 180;
      m.makeScale(1 + Math.random(), 1 + Math.random() * 1.5, 1 + Math.random()).setPosition(x, 3, z);
      inst.setMatrixAt(i, m);
    }
    inst.castShadow = true;
    scene.add(inst);
  }

  // ---------- Japan: airport ----------
  const rwB = createRunway(280, 14); rwB.position.set(1590, 0, 0); scene.add(rwB);
  const termB = createTerminal({ label: 'NRT  成田', towerX: -60 }); termB.position.set(1600, 0, -40); scene.add(termB);
  const guide = createGuide(); guide.position.copy(LOC.guide); guide.rotation.y = 0.5; scene.add(guide);
  const tourists = new THREE.Group();
  ['#4b6cb7', '#f2b134', '#7a4fb5', '#3aa17e', '#d9534f', '#2b3a67'].forEach((c, i) => {
    const p = createPerson(c);
    p.position.set(LOC.guide.x - 3 - (i % 3) * 1.4, 0, LOC.guide.z + 2 + Math.floor(i / 3) * 1.4);
    p.rotation.y = Math.PI / 2;
    tourists.add(p);
  });
  scene.add(tourists);

  // ---------- Japan: road, torii tunnel, lanterns, sakura ----------
  const road = new THREE.CatmullRomCurve3([
    V(1688, 0.2, -58), V(1682, 0.2, -160), V(1682, 0.2, -250), V(1692, 0.2, -330),
    V(1700, 0.2, -420), V(1728, 0.2, -500), V(1752, 0.2, -545),
  ], false, 'centripetal');
  {
    const N = 200, W = 4.2;
    const verts = [], idx = [];
    for (let i = 0; i <= N; i++) {
      const u = i / N;
      const p = road.getPointAt(u), t = road.getTangentAt(u);
      const side = V(-t.z, 0, t.x).normalize();
      verts.push(p.x + side.x * W, 0.12, p.z + side.z * W, p.x - side.x * W, 0.12, p.z - side.z * W);
      if (i < N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setIndex(idx); geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: '#3a3d44', roughness: 0.9, side: THREE.DoubleSide }));
    mesh.receiveShadow = true;
    scene.add(mesh);
  }
  const roadU = (z) => { // find road parameter closest to a z coordinate
    let best = 0, bd = 1e9;
    for (let i = 0; i <= 400; i++) { const u = i / 400; const d = Math.abs(road.getPointAt(u).z - z); if (d < bd) { bd = d; best = u; } }
    return best;
  };
  const toriiU0 = roadU(-262), toriiU1 = roadU(-330);
  for (let u = toriiU0; u <= toriiU1; u += 0.0085) {
    const p = road.getPointAt(u), t = road.getTangentAt(u);
    const tor = createTorii(1.25, '#e2522f');
    tor.position.copy(p).setY(0);
    tor.rotation.y = Math.atan2(t.x, t.z);
    scene.add(tor);
  }
  const bigTorii = createTorii(3.2, '#d8382c');
  bigTorii.position.set(LOC.lake.x + 20, 0, LOC.lake.z - 30);
  bigTorii.rotation.y = 0.3;
  scene.add(bigTorii);

  const lanternPts = [], treePts = [];
  for (let i = 0; i <= 60; i++) {
    const u = i / 60;
    const p = road.getPointAt(u), t = road.getTangentAt(u);
    const side = V(-t.z, 0, t.x).normalize();
    if (u > toriiU0 - 0.02 && u < toriiU1 + 0.02) continue;
    if (i % 2 === 0) { lanternPts.push(p.clone().addScaledVector(side, 6).setY(0)); lanternPts.push(p.clone().addScaledVector(side, -6).setY(0)); }
    treePts.push(p.clone().addScaledVector(side, 10 + Math.random() * 4).setY(0));
    treePts.push(p.clone().addScaledVector(side, -10 - Math.random() * 4).setY(0));
  }
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2, r = 30 + Math.random() * 30;
    treePts.push(V(LOC.pagoda.x + Math.cos(a) * r, 0, LOC.pagoda.z + Math.sin(a) * r));
  }
  for (let i = 0; i < 30; i++) {
    const a = Math.random() * Math.PI * 2, r = 55 + Math.random() * 25;
    treePts.push(V(LOC.lake.x + Math.cos(a) * r, 0, LOC.lake.z + Math.sin(a) * r));
  }
  scene.add(createLanterns(lanternPts));
  scene.add(createSakuraTrees(treePts));

  // ---------- Attractions ----------
  const mound = new THREE.Mesh(new THREE.CylinderGeometry(24, 36, 10, 32), new THREE.MeshStandardMaterial({ color: '#5f8a4f', roughness: 1 }));
  mound.position.set(LOC.pagoda.x, 5, LOC.pagoda.z); mound.receiveShadow = true; scene.add(mound);
  const pagoda = createPagoda(); pagoda.position.set(LOC.pagoda.x, 10, LOC.pagoda.z); pagoda.rotation.y = 0.2; scene.add(pagoda);
  const fuji = createFuji(); fuji.position.copy(LOC.fuji); scene.add(fuji);
  const lake = new THREE.Mesh(new THREE.CircleGeometry(48, 48), new THREE.MeshStandardMaterial({ color: '#4d86a8', roughness: 0.05, metalness: 0.6 }));
  lake.rotation.x = -Math.PI / 2; lake.position.copy(LOC.lake); scene.add(lake);
  const tower = createTower(); tower.position.copy(LOC.tower); scene.add(tower);
  scene.add(createCity(V(1850, 0, -230), 80, [170, 230], [{ x: LOC.tower.x, z: LOC.tower.z, r: 18 }, { x: 1700, z: -230, r: 30 }]));

  // ---------- Stays ----------
  const hotel = createHotel(); hotel.position.copy(LOC.hotel); scene.add(hotel);
  const ryokan = createRyokan(); ryokan.position.copy(LOC.ryokan); ryokan.rotation.y = Math.PI / 2; scene.add(ryokan);
  // onsen steam
  const steam = createSteam(); steam.position.copy(ryokan.localToWorld(ryokan.userData.onsen.clone())); scene.add(steam);

  // ---------- Plane & flight ----------
  const plane = createPlane(); scene.add(plane);
  const flight = new THREE.CatmullRomCurve3([
    V(-60, 3.1, 0), V(40, 3.1, 0), V(130, 6, 0), V(260, 40, 2), V(430, 88, -20),
    V(720, 98, -60), V(1010, 98, -60), V(1250, 70, -24), V(1420, 24, 0), V(1500, 3.1, 0), V(1600, 3.1, 0),
  ], false, 'centripetal');
  const trail = createTrail(120); scene.add(trail);

  const bus = createBus(); scene.add(bus);

  // ---------- Atmosphere ----------
  const clouds = createClouds([
    { count: 120, min: [200, 18, -420], max: [1420, 52, 260], size: [30, 60] },
    { count: 16, min: [300, 150, -900], max: [1400, 220, -500], size: [60, 120], opacity: 0.6 },
    { count: 14, min: [-500, 150, -700], max: [600, 220, -250], size: [50, 110], opacity: 0.5 },
    { count: 26, min: [1300, 120, -1300], max: [2100, 180, 100], size: [50, 110], opacity: 0.55 },
  ]);
  scene.add(clouds);
  const petals = createPetals(650); scene.add(petals);

  const life = createLife(scene, { road, lake: LOC.lake, pagoda: LOC.pagoda, city: LOC.tower });
  const tag = (o, info) => { o.userData.info = info; life.pickables.push(o); };
  tag(hotel, 'hotel'); tag(ryokan, 'ryokan'); tag(pagoda, 'pagoda'); tag(fuji, 'fuji'); tag(tower, 'tokyo');
  tag(bus, 'bus'); tag(guide, 'guide'); tag(bigTorii, 'torii'); tag(plane, 'plane');

  const holo = createHoloMap(); holo.position.copy(LOC.map); scene.add(holo);

  // ---------- Animation helpers ----------
  const tmpV = new THREE.Vector3();
  function planeAt(t) {
    return smoother(remap(t, 0.055, 0.56));
  }
  function placePlane(u, time) {
    const p = flight.getPointAt(u);
    const tan = flight.getTangentAt(u);
    const tan2 = flight.getTangentAt(Math.min(1, u + 0.01));
    const yaw = Math.atan2(-tan.z, tan.x);
    const yaw2 = Math.atan2(-tan2.z, tan2.x);
    const pitch = Math.asin(THREE.MathUtils.clamp(tan.y, -1, 1));
    const bank = THREE.MathUtils.clamp((yaw2 - yaw) * 18, -0.5, 0.5);
    plane.position.copy(p);
    plane.rotation.set(bank + Math.sin(time * 0.9) * 0.02 * (p.y > 20 ? 1 : 0), yaw, pitch, 'YZX');
    plane.userData.gear.visible = p.y < 22;
    // contrail sampled along the flown path so it scrubs both ways
    if (p.y > 30) {
      const pts = [];
      for (let i = 0; i < 120; i++) {
        const uu = u - i * 0.0012;
        if (uu < 0) break;
        const q = flight.getPointAt(uu);
        if (q.y < 30) break;
        pts.push(q.add(tmpV.set(0, -0.6, 0)));
      }
      trail.userData.setPoints(pts.map((q, i) => q.clone().add(tmpV.set(-14, 0, 0).applyEuler(plane.rotation))));
    } else trail.userData.setPoints([]);
    return p;
  }
  function busAt(t) { return smoother(remap(t, 0.645, 0.93)); }
  function placeBus(u) {
    const p = road.getPointAt(u), tan = road.getTangentAt(u);
    bus.position.copy(p).setY(0);
    bus.lookAt(tmpV.copy(bus.position).sub(tan));
    return { p: bus.position.clone(), f: tan.clone().setY(0).normalize() };
  }

  // ---------- Story camera keyframes ----------
  // Each keyframe is evaluated at the current scroll time, so frames that track the
  // plane or bus move with them. Catmull-Rom across neighbours gives one continuous move.
  const ctx = { P: V(0, 0, 0), B: V(0, 0, 0), F: V(0, 0, -1) };
  const rel = (back, up, side) => () => {
    const s = V(-ctx.F.z, 0, ctx.F.x);
    return ctx.B.clone().addScaledVector(ctx.F, -back).add(V(0, up, 0)).addScaledVector(s, side);
  };
  const P = (x, y, z) => () => ctx.P.clone().add(V(x, y, z));
  const A = (x, y, z) => () => V(x, y, z);
  const KEYS = [
    { t: 0.0, pos: A(-170, 34, 120), look: A(-5, 6, -25) },
    { t: 0.045, pos: A(-95, 8, 34), look: P(0, 0, 0) },
    { t: 0.1, pos: P(-28, 5, 17), look: P(14, 1, 0) },
    { t: 0.16, pos: P(-36, 5, -22), look: P(26, 2, 0) },
    { t: 0.23, pos: P(-48, 15, 34), look: P(12, 0, 0) },
    { t: 0.31, pos: P(-6, 14, 78), look: P(22, -3, 0) },
    { t: 0.39, pos: P(-72, 28, 14), look: P(90, -16, 0) },
    { t: 0.46, pos: P(46, 6, 34), look: P(0, 0, 0) },
    { t: 0.53, pos: A(1528, 6, 42), look: P(0, 1, 0) },
    { t: 0.585, pos: A(1704, 11, -6), look: A(1678, 2.5, -46) },
    { t: 0.625, pos: A(1688, 3.4, -32), look: A(1677, 2.3, -46) },
    { t: 0.68, pos: rel(15, 6, -8), look: rel(-18, 1.5, 0) },
    { t: 0.74, pos: rel(12, 5, 5), look: rel(-25, 2, 0) },
    { t: 0.79, pos: rel(-16, 3.5, 7), look: rel(0, 1.8, 0) },
    { t: 0.85, pos: A(1628, 28, -478), look: A(1614, 42, -650) },
    { t: 0.925, pos: A(1700, 50, -640), look: A(1782, 46, -520) },
    { t: 1.0, pos: A(1738, 36, -612), look: A(1782, 44, -520) },
  ];
  const cr = (p0, p1, p2, p3, s) => {
    const s2 = s * s, s3 = s2 * s;
    return p1.clone().multiplyScalar(2)
      .add(p2.clone().sub(p0).multiplyScalar(s))
      .add(p0.clone().multiplyScalar(2).sub(p1.clone().multiplyScalar(5)).add(p2.clone().multiplyScalar(4)).sub(p3).multiplyScalar(s2))
      .add(p1.clone().multiplyScalar(3).sub(p0).sub(p2.clone().multiplyScalar(3)).add(p3).multiplyScalar(s3))
      .multiplyScalar(0.5);
  };
  function storyPose(t, out) {
    let i = 0;
    while (i < KEYS.length - 2 && t > KEYS[i + 1].t) i++;
    const k = (j) => KEYS[Math.max(0, Math.min(KEYS.length - 1, j))];
    const s = clamp01((t - KEYS[i].t) / (KEYS[i + 1].t - KEYS[i].t));
    const ks = [k(i - 1), k(i), k(i + 1), k(i + 2)];
    out.pos.copy(cr(...ks.map((x) => x.pos()), s));
    out.look.copy(cr(...ks.map((x) => x.look()), s));
    return out;
  }

  // Story time of day
  const ENV_KEYS = [[0, ENV.dawn], [0.16, ENV.day], [0.42, ENV.day], [0.53, ENV.sunset], [0.75, ENV.sunset], [0.88, ENV.dusk], [1.0, ENV.night]];
  function storyEnv(t, out) {
    let i = 0;
    while (i < ENV_KEYS.length - 2 && t > ENV_KEYS[i + 1][0]) i++;
    const [t0, a] = ENV_KEYS[i], [t1, b] = ENV_KEYS[i + 1];
    return lerpEnv(out, a, b, clamp01((t - t0) / (t1 - t0)));
  }

  // ---------- Explore targets (all inside the same world) ----------
  const suiteEye = LOC.hotel.clone().add(V(-2.5, SUITE.y + 3.9, 9.5));
  const fujiPeak = LOC.fuji.clone().add(V(0, 160, 0));
  const ryEye = ryokan.localToWorld(V(-7.6, 3.1, -1.5));
  const ryLook = V(LOC.ryokan.x - 6, 4, LOC.ryokan.z - 120);
  const tu = (toriiU0 + toriiU1) / 2;
  const toriiEye = road.getPointAt(toriiU0 + 0.004).add(V(0.6, 2.4, 0));
  const toriiLook = road.getPointAt(tu + 0.02).add(V(0, 2.6, 0));
  const EXPLORE = {
    hotel: { pos: V(1738, 36, -612), look: V(1782, 44, -520), env: ENV.night, petals: 0.5 },
    suite: { pos: suiteEye, look: suiteEye.clone().add(fujiPeak.clone().sub(suiteEye).setY(0).normalize().multiplyScalar(30)).add(V(0, 1.5, 0)), env: ENV.sunset, petals: 0 },
    ryokan: { pos: ryEye, look: ryLook, env: ENV.dusk, petals: 0.3 },
    fuji: { pos: V(1700, 46, -800), look: V(1632, 150, -1150), env: ENV.day, petals: 0.8 },
    pagoda: { pos: V(1632, 26, -488), look: V(1612, 40, -640), env: ENV.day, petals: 1 },
    torii: { pos: toriiEye, look: toriiLook, env: ENV.sunset, petals: 0.6 },
    tokyo: { pos: V(1726, 64, -70), look: V(1842, 46, -236), env: ENV.night, petals: 0 },
  };

  const BUILDER = {
    pos: LOC.map.clone().add(V(4, 500, 210)),
    look: LOC.map.clone().add(V(4, 0, 4)),
    env: ENV.night,
  };

  // ---------- Per-frame update ----------
  const env = makeEnvState();
  const blinkers = [];
  scene.traverse((o) => { if (o.userData.blink) blinkers.push(o); });
  let petalDensity = 0;
  function update({ dt, time, storyT, camera, envState, petalsTarget }) {
    sky.position.copy(camera.position);
    sky.material.uniforms.time.value = time;

    // actors driven by the story timeline
    const u = planeAt(storyT);
    ctx.P.copy(placePlane(u, time));
    const b = placeBus(busAt(storyT));
    ctx.B.copy(b.p); ctx.F.copy(b.f);
    guide.userData.update(time);

    // environment
    const e = envState || env;
    sky.material.uniforms.top.value.copy(e.top);
    sky.material.uniforms.bottom.value.copy(e.bottom);
    sky.material.uniforms.sunColor.value.copy(e.sun);
    sky.material.uniforms.sunDir.value.copy(e.sunDir);
    sky.material.uniforms.night.value = e.night;
    scene.fog.color.copy(e.fog);
    hemi.intensity = e.hemi;
    hemi.color.copy(e.top).lerp(new THREE.Color('#ffffff'), 0.6);
    sun.color.copy(e.sun); sun.intensity = e.sunI;
    sun.target.position.copy(camera.position).add(camera.getWorldDirection(tmpV).multiplyScalar(60));
    sun.position.copy(sun.target.position).addScaledVector(e.sunDir, 400);
    clouds.userData.setTint(e.cloud);
    trail.material.uniforms.strength.value = 1 - e.night * 0.6;
    updateGlow(e.night);
    rwA.userData.lights.color.setScalar(0.5 + e.night * 2.2);
    rwB.userData.lights.color.setScalar(0.5 + e.night * 2.2);

    // blink nav lights
    const on = (Math.sin(time * 6) > 0.6);
    for (const o of blinkers) o.visible = on;

    petalDensity += (petalsTarget - petalDensity) * Math.min(1, dt * 2);
    petals.userData.update(dt, time, camera.position, petalDensity);
    steam.userData.update(time);
    life.update(time, dt);
    holo.userData.update(time, camera);
  }

  return { scene, plane, life, update, storyPose, storyEnv, EXPLORE, BUILDER, holo, makeEnv: makeEnvState, japanZone: (p) => p.x > 1420 && p.y < 160 };
}

// rising steam over the onsen
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
