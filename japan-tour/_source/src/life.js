import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createAirliner, createCoach, createShinkansenCar, createPirateShip, createDeerGeometry } from './models2.js';
import { MODEL_SCALE as S, toX, toZ } from './geo.js';

// Ambient motion that keeps the map alive: Shinkansen on the real Tokaido line,
// traffic and coaches on the tour road, planes around the airports, boats on the
// lakes, deer in Nara and people at the sights. Everything loops on its own clock.

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.1, ...o });
let seed = 777;
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

export function createLife(scene, w) {
  const { ground, road, rail, lakeY, LAKES, nara, fushimi, towerPos, pagodaPos } = w;
  const pickables = [];
  const updaters = [];
  const tmp = V(0, 0, 0), tan = V(0, 0, 0);

  // ---------- Shinkansen sets running both ways ----------
  const TS = S * 0.6, CARS = 8, CAR = 25 * TS, NT = 10, TRAIN_V = 1.1; // units per second
  const trains = [];
  for (let k = 0; k < NT; k++) {
    const g = new THREE.Group();
    const cars = [];
    for (let i = 0; i < CARS; i++) {
      const end = i === 0 || i === CARS - 1;
      const c = createShinkansenCar(end);
      c.scale.setScalar(TS);
      const holder = new THREE.Group();
      if (i === CARS - 1) c.rotation.y = Math.PI;
      holder.add(c);
      g.add(holder); cars.push(holder);
    }
    g.userData.info = 'train';
    scene.add(g); pickables.push(g);
    trains.push({ g, cars, dir: k % 2 ? -1 : 1, off: (k / NT) * rail.length * 2 });
  }
  const span = rail.length + CARS * CAR + 2;
  updaters.push((t) => {
    for (const tr of trains) {
      const s = (tr.off + t * TRAIN_V) % span;
      tr.cars.forEach((c, i) => {
        const along = s - i * CAR;
        const d = tr.dir > 0 ? along : rail.length - along;
        const vis = d > 0 && d < rail.length;
        c.visible = vis;
        if (!vis) return;
        rail.at(d, c.position);
        c.position.y += 0.002;
        rail.tangent(d, tan, 0.2).multiplyScalar(tr.dir);
        c.lookAt(tmp.copy(c.position).sub(tan));
      });
    }
  });

  // ---------- traffic (instanced cars) and a few more coaches on the road ----------
  const carGeo = mergeGeometries([
    new THREE.BoxGeometry(1.8, 0.8, 4.4).translate(0, 0.65, 0),
    new THREE.BoxGeometry(1.6, 0.6, 2.4).translate(0, 1.35, 0.2),
  ]).scale(S * 0.55, S * 0.55, S * 0.55);
  const NC = 900;
  const traffic = new THREE.InstancedMesh(carGeo, std('#ffffff', { roughness: 0.3, metalness: 0.5 }), NC);
  const palette = ['#e2522f', '#f2f2f2', '#2b3a67', '#f2c14e', '#1d1d22', '#7aa6d8', '#c0c4cc', '#f4f4f4', '#9a1f2c'];
  const tc = new THREE.Color();
  const cs = [];
  for (let i = 0; i < NC; i++) {
    traffic.setColorAt(i, tc.set(palette[i % palette.length]));
    cs.push({ d: rnd() * road.length, dir: i % 2 ? 1 : -1, v: 0.09 + rnd() * 0.08 });
  }
  traffic.castShadow = true;
  traffic.frustumCulled = false;
  scene.add(traffic);
  const dummy = new THREE.Object3D();
  updaters.push((t, dt) => {
    for (let i = 0; i < NC; i++) {
      const c = cs[i];
      c.d = (c.d + c.dir * c.v * dt + road.length) % road.length;
      road.at(c.d, dummy.position);
      road.tangent(c.d, tan, 0.1);
      const sx = -tan.z, sz = tan.x;
      const lane = c.dir > 0 ? -0.018 : 0.018;
      dummy.position.x += sx * lane; dummy.position.z += sz * lane;
      dummy.position.y = ground(dummy.position.x, dummy.position.z) + 0.01;
      dummy.lookAt(tmp.copy(dummy.position).addScaledVector(tan, c.dir));
      dummy.updateMatrix();
      traffic.setMatrixAt(i, dummy.matrix);
    }
    traffic.instanceMatrix.needsUpdate = true;
  });
  ['#3d8fb0', '#f2b134', '#7a4fb5', '#3aa17e', '#d9534f', '#2b3a67'].forEach((liv, i) => {
    const c = createCoach(liv);
    c.scale.setScalar(S * 0.6);
    c.userData.info = 'bus';
    scene.add(c); pickables.push(c);
    const st = { d: (i / 6) * road.length, dir: i % 2 ? 1 : -1 };
    updaters.push((t, dt) => {
      st.d = (st.d + st.dir * 0.11 * dt + road.length) % road.length;
      road.at(st.d, c.position);
      road.tangent(st.d, tan, 0.1).multiplyScalar(st.dir);
      c.position.x += -tan.z * -0.018 * st.dir; c.position.z += tan.x * -0.018 * st.dir;
      c.position.y = ground(c.position.x, c.position.z) + 0.01;
      c.lookAt(tmp.copy(c.position).sub(tan));
    });
  });

  // ---------- planes around the airports ----------
  const addPlane = (fn) => {
    const p = createAirliner();
    p.scale.setScalar(S);
    p.userData.gear.visible = false;
    p.userData.info = 'plane';
    scene.add(p); pickables.push(p);
    updaters.push((t) => fn(p, t));
  };
  const circle = (c, r, y, sp, off, bank) => (p, t) => {
    const a = t * sp + off;
    p.position.set(c.x + Math.cos(a) * r, y, c.z + Math.sin(a) * r);
    const dx = -Math.sin(a) * Math.sign(sp), dz = Math.cos(a) * Math.sign(sp);
    p.rotation.set(bank, Math.atan2(-dz, dx), 0, 'YZX');
  };
  addPlane(circle(V(120, 0, -10), 110, 38, 0.02, 0, -0.18));
  addPlane(circle(V(-60, 0, 60), 150, 44, -0.016, 2, 0.15));
  addPlane(circle(w.bkk.position, 40, 14, 0.04, 1, -0.25));
  // departures climbing out of Narita and Kansai on a loop
  for (const [apt, len, period] of [[w.nrt, 4, 38], [w.kix, 3.5, 44]]) {
    addPlane((p, t) => {
      const k = (t % period) / period;
      const dist = k * 70;
      const lx = -len / 2 + 0.6 + dist;
      const y = dist < 2.2 ? 0.081 : 0.081 + Math.pow((dist - 2.2) / 68, 1.2) * 18;
      p.position.copy(apt.userData.toWorld(lx, 0, 0)).setY(apt.position.y + y);
      p.rotation.set(0, apt.rotation.y, dist < 2.2 ? 0 : 0.14, 'YZX');
      p.userData.gear.visible = y < 1;
      p.visible = k < 0.97;
    });
  }

  // ---------- Hakone pirate ships on Lake Ashi ----------
  const ashi = LAKES.find((l) => l.name === 'ashi');
  const ashiPt = (u, v) => {
    const c = Math.cos(ashi.rot), s = Math.sin(ashi.rot);
    const a = u * ashi.a, b = v * ashi.b;
    return V(toX(ashi.lon) + a * c + b * s, lakeY('ashi'), toZ(ashi.lat) - a * s + b * c);
  };
  for (let i = 0; i < 2; i++) {
    const ship = createPirateShip();
    ship.scale.setScalar(S * 0.45);
    ship.userData.info = 'pirate';
    scene.add(ship); pickables.push(ship);
    updaters.push((t) => {
      const ph = t * 0.012 + i * 0.5;
      const v = Math.sin(ph * Math.PI * 2) * 0.72;
      const p = ashiPt(i ? 0.2 : -0.18, v);
      const q = ashiPt(i ? 0.2 : -0.18, Math.sin((ph + 0.001) * Math.PI * 2) * 0.72);
      ship.position.copy(p).add(V(0, -0.02 + Math.sin(t * 1.3 + i) * 0.003, 0));
      ship.rotation.y = Math.atan2(-(q.z - p.z), q.x - p.x);
      ship.rotation.z = Math.sin(t * 0.9 + i) * 0.02;
    });
  }

  // ---------- swan boats on Kawaguchiko ----------
  const kawa = LAKES.find((l) => l.name === 'kawaguchiko');
  for (let i = 0; i < 5; i++) {
    const b = new THREE.Group();
    const hull = new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), std('#fafafa'));
    hull.rotation.x = Math.PI; hull.scale.set(1, 0.6, 1.6); hull.position.y = 0.5; b.add(hull);
    const neck = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.16, 6, 12, Math.PI), std('#fafafa'));
    neck.position.set(0, 1.0, -1.2); neck.rotation.y = Math.PI / 2; b.add(neck);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 6), std('#f29b38'));
    beak.position.set(0, 1.55, -1.75); beak.rotation.x = -Math.PI / 2; b.add(beak);
    b.scale.setScalar(S * 1.4);
    b.userData.info = 'boat';
    scene.add(b); pickables.push(b);
    const cx = toX(kawa.lon) + 0.9 + (i % 3) * 0.35, cz = toZ(kawa.lat) - 0.25 - (i % 2) * 0.12;
    updaters.push((t) => {
      const a = t * (0.05 + i * 0.01) + i * 1.3, r = 0.08 + i * 0.03;
      b.position.set(cx + Math.cos(a) * r, lakeY('kawaguchiko') - 0.004, cz + Math.sin(a) * r);
      b.rotation.y = -a + Math.PI;
    });
  }

  // ---------- Nara deer ----------
  {
    const N = 160;
    const deer = new THREE.InstancedMesh(createDeerGeometry().scale(S * 1.1, S * 1.1, S * 1.1), std('#9b6a3f', { roughness: 0.9 }), N);
    const herd = [];
    const c = new THREE.Color();
    for (let i = 0; i < N; i++) {
      const a = rnd() * 6.28, r = Math.sqrt(rnd()) * 0.75;
      herd.push({ x: nara.x + Math.cos(a) * r, z: nara.z + Math.sin(a) * r, h: rnd() * 6.28, v: 0.004 + rnd() * 0.01, graze: rnd() * 10 });
      deer.setColorAt(i, c.set('#9b6a3f').offsetHSL(0, (rnd() - 0.5) * 0.1, (rnd() - 0.5) * 0.12));
    }
    deer.castShadow = true;
    deer.userData.info = 'nara';
    scene.add(deer); pickables.push(deer);
    updaters.push((t, dt) => {
      herd.forEach((d, i) => {
        const moving = Math.sin(t * 0.3 + d.graze) > 0.2;
        d.h += (Math.sin(t * 0.7 + i) * 0.6) * dt;
        if (moving) { d.x += Math.cos(d.h) * d.v * dt; d.z += Math.sin(d.h) * d.v * dt; }
        const dx = d.x - nara.x, dz = d.z - nara.z;
        if (dx * dx + dz * dz > 0.6) d.h = Math.atan2(-dz, -dx);
        dummy.position.set(d.x, ground(d.x, d.z), d.z);
        dummy.rotation.set(0, -d.h, moving ? 0 : 0.25);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        deer.setMatrixAt(i, dummy.matrix);
      });
      deer.instanceMatrix.needsUpdate = true;
    });
  }

  // ---------- people strolling at the sights ----------
  {
    const spots = [[pagodaPos, 0.12, 0.3], [fushimi, 0.05, 0.25], [towerPos, 0.1, 0.4], [nara, 0.2, 0.6]];
    const NP = 160;
    const geo = new THREE.CapsuleGeometry(0.28, 0.9, 3, 8).translate(0, 0.75, 0).scale(S * 0.6, S * 0.6, S * 0.6);
    const people = new THREE.InstancedMesh(geo, std('#ffffff'), NP);
    const kimono = ['#e66a8c', '#3d5aa8', '#f2b134', '#7a4fb5', '#3aa17e', '#e2522f', '#2b2b33', '#f4efe6'];
    const c = new THREE.Color();
    const ws = [];
    for (let i = 0; i < NP; i++) {
      const [cen, r0, r1] = spots[i % spots.length];
      ws.push({ c: cen, r: r0 + rnd() * (r1 - r0), a: rnd() * 6.28, s: (rnd() < 0.5 ? -1 : 1) * (0.01 + rnd() * 0.02) });
      people.setColorAt(i, c.set(kimono[i % kimono.length]));
    }
    people.castShadow = true;
    scene.add(people);
    updaters.push((t, dt) => {
      ws.forEach((p, i) => {
        p.a += p.s * dt;
        const x = p.c.x + Math.cos(p.a) * p.r, z = p.c.z + Math.sin(p.a) * p.r;
        dummy.position.set(x, ground(x, z) + Math.abs(Math.sin(t * 6 + i)) * 0.001, z);
        dummy.rotation.set(0, -p.a, 0);
        dummy.updateMatrix();
        people.setMatrixAt(i, dummy.matrix);
      });
      people.instanceMatrix.needsUpdate = true;
    });
  }

  // ---------- birds ----------
  const birdGeo = new THREE.BufferGeometry();
  birdGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, -0.3, -1, 0, 0.2, 0, 0, 0.3, 0, 0, -0.3, 0, 0, 0.3, 1, 0, 0.2], 3));
  birdGeo.computeVertexNormals();
  const birdMat = new THREE.MeshBasicMaterial({ color: '#222533', side: THREE.DoubleSide });
  const flocks = [];
  for (const [c, y] of [[pagodaPos, 0.6], [w.ashiC, 0.7], [V(toX(138.75), 0, toZ(35.51)), 0.5], [towerPos, 1.5]]) {
    const g = new THREE.Group();
    const birds = [];
    for (let i = 0; i < 7; i++) {
      const b = new THREE.Mesh(birdGeo.clone(), birdMat);
      const row = Math.ceil(i / 2), side = i % 2 ? 1 : -1;
      b.position.set(side * row * 1.6, 0, row * 1.8);
      g.add(b); birds.push(b);
    }
    g.scale.setScalar(0.012);
    scene.add(g);
    flocks.push({ g, birds, c: c.clone(), y: (c.y || ground(c.x, c.z)) + y, r: 0.5 + flocks.length * 0.1, s: 0.08, o: flocks.length * 1.7 });
  }
  updaters.push((t) => {
    for (const fl of flocks) {
      const a = t * fl.s + fl.o;
      fl.g.position.set(fl.c.x + Math.cos(a) * fl.r, fl.y + Math.sin(t * 0.4 + fl.o) * 0.03, fl.c.z + Math.sin(a) * fl.r);
      fl.g.rotation.y = -a;
      fl.birds.forEach((b, i) => {
        const flap = Math.sin(t * 9 + i * 0.7) * 0.6;
        const p = b.geometry.attributes.position;
        p.setY(1, flap); p.setY(5, flap); p.needsUpdate = true;
      });
    }
  });

  const trainPeriod = span / TRAIN_V / (NT / 2);
  return {
    pickables,
    trainNext: (t) => trainPeriod - (t % trainPeriod),
    update(t, dt) { for (const u of updaters) u(t, dt); },
  };
}
