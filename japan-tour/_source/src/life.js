import * as THREE from 'three';
import { createPlane, glowMats } from './models.js';

// Ambient motion that keeps the world alive: bullet train, traffic, walkers,
// boats, birds and planes circling overhead. Everything loops on its own clock.

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.1, ...o });

export function createLife(scene, { road, lake, pagoda, city }) {
  const pickables = [];
  const updaters = [];

  // ---------- Shinkansen on an elevated viaduct ----------
  const track = new THREE.CatmullRomCurve3([
    V(1440, 9, 420), V(1440, 9, 0), V(1442, 9, -520), V(1484, 9, -662), V(1600, 9, -700), V(2000, 9, -705), V(2400, 9, -705),
  ], false, 'centripetal');
  const trackLen = track.getLength();
  {
    // deck ribbon
    const N = 300, W = 3.2, verts = [], idx = [];
    for (let i = 0; i <= N; i++) {
      const u = i / N, p = track.getPointAt(u), t = track.getTangentAt(u);
      const s = V(-t.z, 0, t.x).normalize();
      verts.push(p.x + s.x * W, p.y - 0.5, p.z + s.z * W, p.x - s.x * W, p.y - 0.5, p.z - s.z * W);
      if (i < N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setIndex(idx); geo.computeVertexNormals();
    const deck = new THREE.Mesh(geo, std('#c9ccd3', { side: THREE.DoubleSide, roughness: 0.8 }));
    deck.receiveShadow = true;
    scene.add(deck);
    // piers
    const n = Math.floor(trackLen / 16);
    const piers = new THREE.InstancedMesh(new THREE.BoxGeometry(1.6, 1, 1.6).translate(0, 0.5, 0), std('#b5b8bf'), n);
    const m = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
      const p = track.getPointAt(i / n);
      m.makeScale(1, p.y - 0.8 + 2, 1).setPosition(p.x, -2, p.z);
      piers.setMatrixAt(i, m);
    }
    piers.castShadow = true;
    scene.add(piers);
  }
  const train = new THREE.Group();
  const cars = [];
  const white = std('#f6f7f9', { roughness: 0.3, metalness: 0.3 });
  const blue = std('#1f4aa8');
  const win = new THREE.MeshStandardMaterial({ color: '#16202e', emissive: '#ffe2b0', emissiveIntensity: 0.05, roughness: 0.2 });
  glowMats.push({ mat: win, day: 0.05, night: 1.4 });
  const CAR_L = 15, NCARS = 8;
  for (let i = 0; i < NCARS; i++) {
    const c = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(3, 3.2, CAR_L - 0.6), white);
    body.position.y = 2; c.add(body);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.35, CAR_L - 0.6), blue);
    stripe.position.y = 1.2; c.add(stripe);
    const w = new THREE.Mesh(new THREE.BoxGeometry(3.06, 0.6, CAR_L - 2), win);
    w.position.y = 2.6; c.add(w);
    if (i === 0 || i === NCARS - 1) {
      const nose = new THREE.Mesh(new THREE.SphereGeometry(1.5, 16, 12), white);
      nose.scale.set(1, 1.05, 3.6);
      nose.position.set(0, 1.9, (i === 0 ? -1 : 1) * (CAR_L / 2 + 1.6));
      c.add(nose);
      const light = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), new THREE.MeshBasicMaterial({ color: '#fff4d2' }));
      light.position.set(0, 1.4, (i === 0 ? -1 : 1) * (CAR_L / 2 + 6.6));
      c.add(light);
    }
    c.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    train.add(c); cars.push(c);
  }
  train.userData.info = 'train';
  scene.add(train);
  pickables.push(train);
  const TRAIN_PERIOD = 46; // seconds per run
  const tmp = new THREE.Vector3();
  updaters.push((t) => {
    const head = (t % TRAIN_PERIOD) / TRAIN_PERIOD;
    cars.forEach((c, i) => {
      const u = Math.max(0, Math.min(1, head - (i * CAR_L) / trackLen));
      const p = track.getPointAt(u), tan = track.getTangentAt(u);
      c.position.copy(p).setY(p.y - 0.2);
      c.lookAt(tmp.copy(c.position).sub(tan));
      c.visible = head - (i * CAR_L) / trackLen > 0 && head < 0.995;
    });
  });

  // ---------- Traffic along the tour road ----------
  const NC = 14;
  const carGeo = new THREE.BoxGeometry(1.8, 1.3, 3.8).translate(0, 0.9, 0);
  const traffic = new THREE.InstancedMesh(carGeo, std('#ffffff', { roughness: 0.35, metalness: 0.4 }), NC);
  const palette = ['#e2522f', '#f2f2f2', '#2b3a67', '#f2c14e', '#1d1d22', '#7aa6d8', '#c0c4cc'];
  const tc = new THREE.Color();
  const carState = [];
  for (let i = 0; i < NC; i++) {
    traffic.setColorAt(i, tc.set(palette[i % palette.length]));
    carState.push({ u: Math.random(), dir: i % 2 ? 1 : -1, speed: 0.012 + Math.random() * 0.01 });
  }
  traffic.castShadow = true;
  scene.add(traffic);
  const dummy = new THREE.Object3D();
  updaters.push((t, dt) => {
    carState.forEach((c, i) => {
      c.u = (c.u + c.dir * c.speed * dt + 1) % 1;
      const p = road.getPointAt(c.u), tan = road.getTangentAt(c.u);
      const side = V(-tan.z, 0, tan.x).normalize().multiplyScalar(c.dir > 0 ? 1.9 : -1.9);
      dummy.position.copy(p).add(side).setY(0.15);
      dummy.lookAt(tmp.copy(dummy.position).addScaledVector(tan, c.dir));
      dummy.updateMatrix();
      traffic.setMatrixAt(i, dummy.matrix);
    });
    traffic.instanceMatrix.needsUpdate = true;
  });

  // ---------- People strolling ----------
  const NP = 46;
  const personGeo = new THREE.CapsuleGeometry(0.28, 0.8, 3, 8).translate(0, 0.7, 0);
  const people = new THREE.InstancedMesh(personGeo, std('#ffffff'), NP);
  const walkers = [];
  const kimono = ['#e66a8c', '#3d5aa8', '#f2b134', '#7a4fb5', '#3aa17e', '#e2522f', '#2b2b33', '#f4efe6'];
  for (let i = 0; i < NP; i++) {
    people.setColorAt(i, tc.set(kimono[i % kimono.length]));
    const group = i % 3;
    if (group === 0) walkers.push({ c: pagoda, r: 39 + Math.random() * 5, a: Math.random() * 6, s: (Math.random() < 0.5 ? -1 : 1) * (0.05 + Math.random() * 0.05), y: 0 });
    else if (group === 1) walkers.push({ c: lake, r: 52 + Math.random() * 4, a: Math.random() * 6, s: (Math.random() < 0.5 ? -1 : 1) * (0.03 + Math.random() * 0.03), y: 0 });
    else walkers.push({ c: city, r: 21 + Math.random() * 6, a: Math.random() * 6, s: (Math.random() < 0.5 ? -1 : 1) * (0.02 + Math.random() * 0.02), y: 0 });
  }
  people.castShadow = true;
  scene.add(people);
  updaters.push((t, dt) => {
    walkers.forEach((w, i) => {
      w.a += w.s * dt;
      dummy.position.set(w.c.x + Math.cos(w.a) * w.r, Math.abs(Math.sin(t * 6 + i)) * 0.12, w.c.z + Math.sin(w.a) * w.r);
      dummy.rotation.set(0, -w.a + (w.s > 0 ? 0 : Math.PI), 0);
      dummy.updateMatrix();
      people.setMatrixAt(i, dummy.matrix);
    });
    people.instanceMatrix.needsUpdate = true;
  });

  // ---------- Swan boats on the lake ----------
  for (let i = 0; i < 3; i++) {
    const b = new THREE.Group();
    const hull = new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), std('#fafafa'));
    hull.rotation.x = Math.PI; hull.scale.set(1, 0.6, 1.6); hull.position.y = 0.5; b.add(hull);
    const neck = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.16, 6, 12, Math.PI), std('#fafafa'));
    neck.position.set(0, 1.0, -1.2); neck.rotation.y = Math.PI / 2; b.add(neck);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 6), std('#f29b38'));
    beak.position.set(0, 1.55, -1.75); beak.rotation.x = -Math.PI / 2; b.add(beak);
    b.userData.info = 'boat';
    scene.add(b); pickables.push(b);
    const r = 14 + i * 9, sp = 0.12 - i * 0.025, off = i * 2.1;
    updaters.push((t) => {
      const a = t * sp + off;
      b.position.set(lake.x + Math.cos(a) * r, 0.1 + Math.sin(t * 2 + i) * 0.06, lake.z + Math.sin(a) * r);
      b.rotation.y = -a + Math.PI;
    });
  }

  // ---------- Bird flocks ----------
  const birdGeo = new THREE.BufferGeometry();
  birdGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, -0.3, -1, 0, 0.2, 0, 0, 0.3, 0, 0, -0.3, 0, 0, 0.3, 1, 0, 0.2], 3));
  birdGeo.computeVertexNormals();
  const birdMat = new THREE.MeshBasicMaterial({ color: '#222533', side: THREE.DoubleSide });
  const flocks = [];
  for (let f = 0; f < 4; f++) {
    const g = new THREE.Group();
    const birds = [];
    for (let i = 0; i < 7; i++) {
      const b = new THREE.Mesh(birdGeo.clone(), birdMat);
      const row = Math.ceil(i / 2), side = i % 2 ? 1 : -1;
      b.position.set(side * row * 1.6, 0, row * 1.8);
      b.scale.setScalar(0.9);
      g.add(b); birds.push(b);
    }
    scene.add(g);
    flocks.push({ g, birds, c: V(1640 + f * 60, 45 + f * 12, -300 - f * 150), r: 90 + f * 40, s: 0.06 + f * 0.015, o: f * 1.7 });
  }
  updaters.push((t) => {
    for (const fl of flocks) {
      const a = t * fl.s + fl.o;
      fl.g.position.set(fl.c.x + Math.cos(a) * fl.r, fl.c.y + Math.sin(t * 0.4 + fl.o) * 4, fl.c.z + Math.sin(a) * fl.r);
      fl.g.rotation.y = -a;
      fl.birds.forEach((b, i) => {
        const flap = Math.sin(t * 9 + i * 0.7) * 0.6;
        const p = b.geometry.attributes.position;
        p.setY(1, flap); p.setY(5, flap); p.needsUpdate = true;
      });
    }
  });

  // ---------- Planes circling over Japan and Thailand ----------
  const ambient = [
    { c: V(1650, 200, -350), r: 700, s: 0.035, o: 0, bank: 0.28 },
    { c: V(1650, 260, -500), r: 900, s: -0.025, o: 2, bank: -0.22 },
    { c: V(40, 160, -60), r: 520, s: 0.04, o: 1, bank: 0.3 },
  ];
  for (const a of ambient) {
    const p = createPlane();
    p.userData.gear.visible = false;
    p.scale.setScalar(0.9);
    p.userData.info = 'plane';
    scene.add(p); pickables.push(p);
    updaters.push((t) => {
      const ang = t * a.s + a.o;
      p.position.set(a.c.x + Math.cos(ang) * a.r, a.c.y, a.c.z + Math.sin(ang) * a.r);
      const dx = -Math.sin(ang) * Math.sign(a.s), dz = Math.cos(ang) * Math.sign(a.s);
      p.rotation.set(a.bank, Math.atan2(-dz, dx), 0, 'YZX');
    });
  }

  // ---------- Hotel & tower beacons pulse ----------
  return {
    pickables,
    trainNext: (t) => TRAIN_PERIOD - (t % TRAIN_PERIOD),
    update(t, dt) { for (const u of updaters) u(t, dt); },
  };
}
