import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { glowMats, createTerminal } from './models.js';
import { createAirliner } from './models2.js';
import { MODEL_SCALE as S, PLANE_SCALE as PL, landMaterial } from './geo.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Builders for the km-scale world: roads, rail, airports, cities, forests, labels, route lines.
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.05, ...o });
let seed = 12345;
export const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

function canvasTex(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

// ---------- ribbon along a path (roads, viaduct decks) ----------
export function ribbon(path, halfW, yFn, mat, { stride = 1, uvLen = 1 } = {}) {
  const verts = [], uvs = [], idx = [];
  const n = path.pts.length;
  const t = new THREE.Vector3(), last = new THREE.Vector3(1, 0, 0);
  let k = 0;
  for (let i = 0; i < n; i += stride) {
    const p = path.pts[i];
    const a = path.pts[Math.max(0, i - 1)], b = path.pts[Math.min(n - 1, i + 1)];
    if (t.subVectors(b, a).setY(0).lengthSq() > 1e-10) { t.normalize(); last.copy(t); } else t.copy(last); // U-turns: keep the previous heading
    const sx = -t.z * halfW, sz = t.x * halfW;
    const yl = yFn(p.x + sx, p.z + sz, p), yr = yFn(p.x - sx, p.z - sz, p);
    verts.push(p.x + sx, yl, p.z + sz, p.x - sx, yr, p.z - sz);
    uvs.push(0, path.cum[i] / uvLen, 1, path.cum[i] / uvLen);
    if (k > 0) { const q = (k - 1) * 2; idx.push(q, q + 2, q + 1, q + 1, q + 2, q + 3); }
    k++;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, mat);
  m.receiveShadow = true;
  return m;
}

export function roadMaterial() {
  const tex = canvasTex(64, 256, (g, w, h) => {
    g.fillStyle = '#3b3e45'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 400; i++) { g.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`; g.fillRect(Math.random() * w, Math.random() * h, 1, 1); }
    g.fillStyle = '#d9d9d2'; g.fillRect(3, 0, 2, h); g.fillRect(w - 5, 0, 2, h);
    g.fillStyle = '#e8c35a'; g.fillRect(w / 2 - 2, 0, 1.5, h); g.fillRect(w / 2 + 0.5, 0, 1.5, h);
    g.fillStyle = '#d9d9d2'; for (let y = 0; y < h; y += 64) { g.fillRect(w * 0.27, y, 1.5, 30); g.fillRect(w * 0.73, y, 1.5, 30); }
  });
  return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
}

// ---------- elevated Shinkansen viaduct ----------
export function viaduct(path, groundAt) {
  const g = new THREE.Group();
  const deckTex = canvasTex(64, 128, (c, w, h) => {
    c.fillStyle = '#c7c9cf'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#8b8f97'; c.fillRect(0, 0, 4, h); c.fillRect(w - 4, 0, 4, h);
    c.fillStyle = '#6c625a'; c.fillRect(10, 0, 18, h); c.fillRect(36, 0, 18, h);
    c.fillStyle = '#d6d8dd'; for (const x of [13, 24, 39, 50]) c.fillRect(x, 0, 2, h);
  });
  const deck = ribbon(path, 0.075, (x, z, p) => p.y, new THREE.MeshStandardMaterial({ map: deckTex, roughness: 0.7, side: THREE.DoubleSide }), { uvLen: 0.4 });
  deck.castShadow = true;
  g.add(deck);
  // parapet walls
  const wallMat = std('#d9dbe0', { side: THREE.DoubleSide });
  for (const s of [-1, 1]) {
    const w = ribbon(path, 0.075, (x, z, p) => p.y + 0.025, wallMat);
    // offset the ribbon into a thin vertical strip by squashing: build directly instead
    w.geometry.dispose();
    const verts = [], idx = [];
    const t = new THREE.Vector3();
    path.pts.forEach((p, i) => {
      const a = path.pts[Math.max(0, i - 1)], b = path.pts[Math.min(path.pts.length - 1, i + 1)];
      t.subVectors(b, a).setY(0).normalize();
      const x = p.x - t.z * 0.075 * s, z = p.z + t.x * 0.075 * s;
      verts.push(x, p.y - 0.02, z, x, p.y + 0.028, z);
      if (i) { const q = (i - 1) * 2; idx.push(q, q + 1, q + 2, q + 1, q + 3, q + 2); }
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setIndex(idx); geo.computeVertexNormals();
    w.geometry = geo;
    g.add(w);
  }
  // piers
  const spots = [];
  for (let d = 0; d < path.length; d += 0.32) {
    const p = path.at(d), gy = groundAt(p.x, p.z);
    if (p.y - gy > 0.03 && p.y - gy < 3) spots.push([p.x, gy, p.z, p.y - gy]);
  }
  const piers = new THREE.InstancedMesh(new THREE.BoxGeometry(0.05, 1, 0.09).translate(0, 0.5, 0), std('#b9bcc3'), spots.length);
  const m = new THREE.Matrix4();
  spots.forEach(([x, y, z, h], i) => { m.makeScale(1, h, 1).setPosition(x, y - 0.05, z); piers.setMatrixAt(i, m); });
  piers.castShadow = true;
  g.add(piers);
  return g;
}

// ---------- airport (runway frame: local +x = landing / takeoff direction) ----------
export function createAirport({ x, z, y, bearing, len = 4, width = 0.9, side = 1, thai = false, label, termX = 0, parked = 3, seaPad = false }) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = Math.PI / 2 - bearing * Math.PI / 180;
  const grass = landMaterial(thai ? '#6f9a4c' : '#86a061');
  const padDepth = seaPad ? y + 1.4 : 0.2;
  const pad = new THREE.Mesh(new THREE.BoxGeometry(len + 1.2, padDepth, 5.4), [grass, grass, grass, grass, grass, grass]);
  pad.position.set(0, -padDepth / 2, side * 1.7);
  pad.receiveShadow = true;
  if (!thai) g.add(pad); // Bangkok's airfield lies directly on the flat Thai plain
  const asphalt = std('#34373d', { roughness: 0.9 });
  const flat = (w, d, mat, px, pz, py = 0.004) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
    m.rotation.x = -Math.PI / 2; m.position.set(px, py, pz); m.receiveShadow = true; g.add(m); return m;
  };
  flat(len, width, asphalt, 0, 0);
  // taxiway + apron
  flat(len - 0.6, 0.22, asphalt, 0, side * 1.0);
  for (const xx of [-len / 2 + 0.5, len / 2 - 0.5, termX]) flat(0.2, 1.0, asphalt, xx, side * 0.5, 0.003);
  flat(4.2, 1.6, std('#5d6067', { roughness: 0.9 }), termX, side * 2.0, 0.005);
  // markings
  const paint = new THREE.MeshBasicMaterial({ color: '#e9e9e4' });
  const dash = new THREE.PlaneGeometry(0.16, 0.012).rotateX(-Math.PI / 2);
  const n = Math.floor((len - 1) / 0.28);
  const dashes = new THREE.InstancedMesh(dash, paint, n + 16);
  const mm = new THREE.Matrix4();
  for (let i = 0; i < n; i++) { mm.makeTranslation(-len / 2 + 0.5 + i * 0.28, 0.008, 0); dashes.setMatrixAt(i, mm); }
  for (let k = 0; k < 16; k++) { const e = k < 8 ? -1 : 1, j = k % 8; mm.makeTranslation(e * (len / 2 - 0.12), 0.008, -width * 0.4 + j * width * 0.8 / 7); mm.multiply(new THREE.Matrix4().makeScale(0.8, 1, 2.2)); dashes.setMatrixAt(n + k, mm); }
  g.add(dashes);
  // edge + approach lights
  const lightMat = new THREE.MeshBasicMaterial({ color: '#ffe7a8', toneMapped: false });
  const lg = new THREE.SphereGeometry(0.0065, 6, 4);
  const ne = Math.floor(len / 0.12);
  const lights = new THREE.InstancedMesh(lg, lightMat, ne * 2 + 30);
  for (let i = 0; i < ne; i++) {
    mm.makeTranslation(-len / 2 + i * 0.12, 0.012, width / 2 + 0.02); lights.setMatrixAt(i * 2, mm);
    mm.makeTranslation(-len / 2 + i * 0.12, 0.012, -width / 2 - 0.02); lights.setMatrixAt(i * 2 + 1, mm);
  }
  for (let i = 0; i < 30; i++) { mm.makeTranslation(-len / 2 - 0.1 - (i % 10) * 0.09, 0.02, (Math.floor(i / 10) - 1) * 0.06); lights.setMatrixAt(ne * 2 + i, mm); }
  g.add(lights);
  g.userData.lights = lightMat;
  // terminal (front faces the runway)
  const AIR = 0.035;
  const term = createTerminal({ thai, label, towerX: thai ? 60 : -60 });
  term.scale.setScalar(AIR);
  term.position.set(termX, 0, side * 3.0);
  term.rotation.y = side > 0 ? Math.PI : 0;
  g.add(term);
  // parked jets at the gates
  const gates = [-25, 0, 25].map((gx) => termX + gx * AIR * (side > 0 ? -1 : 1));
  const jets = [];
  for (let i = 0; i < Math.min(parked, 3); i++) {
    const a = createAirliner();
    a.scale.setScalar(PL);
    a.position.set(gates[i], a.userData.groundOffset * PL, side * 2.1);
    a.rotation.y = -side * Math.PI / 2;
    a.userData.gear.visible = true;
    g.add(a); jets.push(a);
  }
  g.userData.gates = gates;
  g.userData.jets = jets;
  g.userData.toWorld = (lx, lz, ly = 0) => { g.updateMatrixWorld(true); return g.localToWorld(V(lx, ly, lz)); };
  return g;
}

// ---------- Suvarnabhumi (BKK) from its real layout ----------
// Local frame as createAirport: +x runs up runway 01 (north-north-east), +z is east.
// One local unit = 1/6 km (BKK_K units per metre), so the 4,000 m runway is 24 units long:
//   01/19    4,000 m x 60 m (east)          02R/20L  3,700 m, 2.2 km to the west (main departure runway)
//   02L/20R  4,000 m, the third runway, a further 400 m west
// Positions come from the published threshold coordinates turned into the runway axis (014.4 deg true):
// the runways are staggered, and the passenger complex (Blender model, real metres) sits midway
// between 02R and 01, level with the north end of 01/19.
export const BKK_K = 0.006;
export function createBkkAirport({ x, z, y, bearing, jetScale = PL, empty = [] }) { // empty: stand indexes left free (the airport page parks its own animated aircraft there)
  const K = BKK_K, g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = Math.PI / 2 - bearing * Math.PI / 180;
  const asphalt = std('#30333a', { roughness: 0.9 }), taxi = std('#44484f', { roughness: 0.9 }), concrete = std('#8b8e93', { roughness: 0.9 });
  const flat = (w, d, mat, px, pz, py = 0.004) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat); m.rotation.x = -Math.PI / 2; m.position.set(px, py, pz); m.receiveShadow = true; g.add(m); return m; };
  const RW = [[24, 0, 0], [22.2, 5.73, -13.2], [24, 1.78, -15.6]]; // length, centre x, z
  const CX = 10.18, CZ = -6.6;                                       // centre of the east-west concourse
  flat(6.6, 9.6, concrete, CX - 0.2, CZ, 0.002);                    // terminal apron
  flat(2.4, 7.6, concrete, CX - 6.05, CZ, 0.002);                   // SAT-1 apron
  flat(6.5, 0.22, taxi, CX + 8.2, CZ, 0.003);                       // access road from the motorway
  const paint = new THREE.MeshBasicMaterial({ color: '#e9e9e4' }), dash = new THREE.PlaneGeometry(0.3, 0.03).rotateX(-Math.PI / 2);
  const marks = [], mm = new THREE.Matrix4(), ms = new THREE.Matrix4();
  for (const [len, cx, rz] of RW) {
    flat(len, 0.36, asphalt, cx, rz, 0.005);
    for (let i = 0; i < Math.floor((len - 1.2) / 0.6); i++) marks.push(mm.makeTranslation(cx - len / 2 + 0.9 + i * 0.6, 0.008, rz).clone());
    for (const e of [-1, 1]) for (let j = 0; j < 8; j++) marks.push(mm.makeTranslation(cx + e * (len / 2 - 0.25), 0.008, rz - 0.14 + j * 0.04).multiply(ms.makeScale(0.9, 1, 0.5)).clone());
  }
  // twin parallel taxiways inside each original runway, with rapid-exit links and two cross-field taxiways
  for (const [len, cx, rz, s] of [[24, 0, 0, -1], [22.2, 5.73, -13.2, 1]]) {
    for (const o of [1.1, 1.75]) flat(len - 0.6, 0.16, taxi, cx, rz + s * o, 0.004);
    for (let k = -3; k <= 3; k++) flat(0.14, 1.75, taxi, cx + k * (len / 7), rz + s * 0.875, 0.0035);
  }
  for (const tx of [CX - 3.9, CX - 8.3]) flat(0.16, 9.7, taxi, tx, CZ, 0.0035);
  flat(0.14, 2.4, taxi, 1.78 + 9, -14.4, 0.0035); flat(0.14, 2.4, taxi, 1.78 - 9, -14.4, 0.0035);
  const dashes = new THREE.InstancedMesh(dash, paint, marks.length);
  marks.forEach((m, i) => dashes.setMatrixAt(i, m));
  g.add(dashes);
  // runway edge and approach lights on 02R, where the story flight departs
  const DEP = { x: 5.73, z: -13.2, len: 22.2 };
  const lightMat = new THREE.MeshBasicMaterial({ color: '#ffe7a8', toneMapped: false });
  const ne = 120, lights = new THREE.InstancedMesh(new THREE.SphereGeometry(0.012, 6, 4), lightMat, ne * 2 + 30);
  for (let i = 0; i < ne; i++) for (const sd of [0, 1]) { mm.makeTranslation(DEP.x - DEP.len / 2 + i * DEP.len / ne, 0.014, DEP.z + (sd ? 1 : -1) * 0.2); lights.setMatrixAt(i * 2 + sd, mm); }
  for (let i = 0; i < 30; i++) { mm.makeTranslation(DEP.x - DEP.len / 2 - 0.2 - (i % 10) * 0.16, 0.02, DEP.z + (Math.floor(i / 10) - 1) * 0.1); lights.setMatrixAt(ne * 2 + i, mm); }
  g.add(lights);
  g.userData.lights = lightMat;
  // passenger complex: model x = east, -z = north  ->  local z, local x
  const base = location.pathname.includes('/tools/') ? '/' : './';
  const holder = new THREE.Group();
  holder.position.set(CX, 0.004, CZ); holder.rotation.y = -Math.PI / 2; holder.scale.setScalar(K);
  g.add(holder);
  g.userData.ready = new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath(base + 'draco/')).loadAsync(base + 'models/suvarnabhumi.glb').then((gltf) => {
    const lod = new THREE.LOD();
    [['LOD0', 0], ['LOD1', 55]].forEach(([name, dist]) => lod.addLevel(gltf.scene.getObjectByName(name), dist));
    lod.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = o.receiveShadow = true;
      const glow = { Glass: ['#ffd9a0', 0.04, 0.9], TubeGlass: ['#7fd0ff', 0.02, 1.2] }[o.material.name];
      if (glow && !o.material.userData.glow) { o.material.userData.glow = true; o.material.emissive.set(glow[0]); o.material.emissiveIntensity = glow[1]; glowMats.push({ mat: o.material, day: glow[1], night: glow[2] }); }
    });
    holder.add(lod);
  });
  const bea = new THREE.Mesh(new THREE.SphereGeometry(4, 10, 8), new THREE.MeshBasicMaterial({ color: '#ff3a3a' }));
  bea.position.set(-231, 147, -510); bea.userData.blink = true; holder.add(bea);
  // aircraft on the stands: [east m, north m, heading] around the H
  const jets = [], stands = [];
  const stand = (e, n, rot) => {
    stands.push({ x: CX + n * K, z: CZ + e * K, rot, e, n });
    if (empty.includes(stands.length - 1)) return;
    const a = createAirliner(); a.scale.setScalar(jetScale);
    a.position.set(CX + n * K, a.userData.groundOffset * jetScale, CZ + e * K); a.rotation.y = rot;
    a.userData.gear.visible = true; g.add(a); jets.push(a);
  };
  for (const e of [-590, -250, -130, 130, 250, 590]) { stand(e, 66, Math.PI); stand(e, -66, 0); }
  for (const sx of [-1, 1]) for (const n of [-380, -220]) { stand(sx * 405 + 66, n, Math.PI / 2); stand(sx * 405 - 66, n, -Math.PI / 2); }
  for (const sx of [-1, 1]) for (const n of [150, 320]) stand(sx * (405 + 66), n, sx * Math.PI / 2);
  for (const e of [-380, -210, 210, 380]) stand(e, -1045 - 66, 0);
  g.userData.jets = jets;
  g.userData.stands = stands;
  g.userData.complex = { x: CX, z: CZ, holder };
  g.userData.dep = DEP;
  g.userData.toWorld = (lx, lz, ly = 0) => { g.updateMatrixWorld(true); return g.localToWorld(V(lx, ly, lz)); };
  return g;
}

// ---------- instanced city blocks ----------
export function createCities(list, { heightAt, landAt, avoid = [], lakeAt, roofs }) {
  const total = list.reduce((s, c) => s + c.n, 0);
  // facade tile: 4 x 4 windows; colour map (glass bands) + emissive map (lit windows at night)
  const lit = [];
  for (let k = 0; k < 16 * 4; k++) lit.push(Math.random());
  const facade = canvasTex(64, 64, (g, w, h) => {
    g.fillStyle = '#f4f1ea'; g.fillRect(0, 0, w, h);
    for (let r = 0; r < 4; r++) {
      g.fillStyle = '#d9d4ca'; g.fillRect(0, r * 16 + 13, w, 3);
      for (let c = 0; c < 4; c++) { g.fillStyle = (r + c) % 3 ? '#5f7489' : '#6d8296'; g.fillRect(c * 16 + 3, r * 16 + 3, 10, 9); }
    }
  });
  const glow = canvasTex(64, 64, (g, w, h) => {
    g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      const v = lit[r * 4 + c];
      if (v < 0.58) { g.fillStyle = v < 0.1 ? '#bfe3ff' : '#ffd9a0'; g.globalAlpha = 0.5 + v * 0.8; g.fillRect(c * 16 + 3, r * 16 + 3, 10, 9); }
    }
  });
  const TILE = 0.045; // km per facade tile (4 floors)
  const mat = new THREE.MeshStandardMaterial({ color: '#ffffff', map: facade, roughness: 0.5, metalness: 0.15, emissive: '#ffffff', emissiveMap: glow, emissiveIntensity: 0.04 });
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader.replace('#include <uv_vertex>', `#include <uv_vertex>
      #ifdef USE_INSTANCING
      vec3 isc = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
      vec2 tsc = vec2(abs(normal.x) > 0.5 ? isc.z : isc.x, isc.y) / ${TILE.toFixed(4)};
      if (abs(normal.y) > 0.5) tsc = vec2(0.0);
      #if defined(USE_MAP)
      vMapUv = uv * tsc;
      #endif
      #if defined(USE_EMISSIVEMAP)
      vEmissiveMapUv = uv * tsc;
      #endif
      #endif`);
  };
  glowMats.push({ mat, day: 0.04, night: 0.95 });
  const geo = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  const mesh = new THREE.InstancedMesh(geo, mat, total);
  // roofs: flat slabs with rooftop housings for towers, gabled roofs for houses
  const slabGeo = new THREE.BoxGeometry(1, 0.06, 1).translate(0, 0.03, 0);
  const slabs = new THREE.InstancedMesh(slabGeo, std('#8d9097', { roughness: 0.7 }), total);
  const boxGeo = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  const tops = new THREE.InstancedMesh(boxGeo, std('#b7b9bd', { roughness: 0.6 }), total);
  const gable = new THREE.CylinderGeometry(0.5, 0.5, 1, 3, 1).rotateX(-Math.PI / 2);
  {
    // flatten the prism so its base sits at y = 0 and it spans -0.5..0.5 in x
    const pos = gable.attributes.position;
    for (let i = 0; i < pos.count; i++) { const y = pos.getY(i); pos.setY(i, (y + 0.25) / 0.75); pos.setX(i, pos.getX(i) / 0.866); }
    gable.computeVertexNormals();
  }
  const roofMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.75, flatShading: true });
  const gables = new THREE.InstancedMesh(gable, roofMat, total);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = V(1, 1, 1), p = V(0, 0, 0), off = V(0, 0, 0);
  const col = new THREE.Color();
  const tones = ['#f1ede5', '#dfe3e8', '#d3d8de', '#efe7da', '#c9d1da', '#e6dccb', '#bcc6d1', '#f6f3ee', '#e9d9c6'];
  const roofTones = roofs || ['#59606e', '#6e4a3d', '#3f4a5a', '#7f858d', '#4f5f6e', '#8a5a44', '#2f3c4c', '#a8553a'];
  // street grid for the larger cities
  const streets = [];
  let i = 0, nG = 0, nT = 0, nS = 0;
  for (const c of list) {
    const rot = c.rot ?? 0, cr = Math.cos(rot), sr = Math.sin(rot);
    const SP = c.r >= 4 ? 0.8 : c.r >= 2 ? 0.5 : 0;
    if (SP) {
      for (let u = -c.r; u <= c.r; u += SP) for (let v = -c.r; v < c.r; v += SP * 0.5) {
        for (const dir of [0, 1]) {
          const lu = dir ? v : u, lv = dir ? u : v;
          if (lu * lu + lv * lv > c.r * c.r * 0.8) continue;
          const x = c.x + lu * cr - lv * sr, z = c.z + lu * sr + lv * cr;
          if (landAt(x, z) < 0.8 || (lakeAt && lakeAt(x, z))) continue;
          streets.push({ x, z, ang: rot + (dir ? 0 : Math.PI / 2), len: SP * 0.5 });
        }
      }
    }
    let placed = 0, guard = 0;
    while (placed < c.n && guard++ < c.n * 14) {
      const a = rnd() * Math.PI * 2, r = c.r * Math.sqrt(rnd());
      const x = c.x + Math.cos(a) * r * (c.sx ?? 1), z = c.z + Math.sin(a) * r * (c.sz ?? 1);
      if (landAt(x, z) < 0.8) continue;
      if (lakeAt && lakeAt(x, z)) continue;
      if (avoid.some((v) => (v.x - x) ** 2 + (v.z - z) ** 2 < v.r * v.r)) continue;
      const core = Math.exp(-(r * r) / (2 * (c.r * 0.35) ** 2));
      const tall = rnd() < 0.12 + core * 0.45;
      const big = c.maxH > 1;
      const w = tall && big ? 0.26 + rnd() * 0.3 : (big ? 0.16 + rnd() * 0.26 : 0.06 + rnd() * 0.08), d = w * (0.7 + rnd() * 0.5);
      const h = tall && big ? Math.min(0.3 + Math.pow(rnd(), 2.4) * c.maxH * (0.25 + core), Math.min(w, d) * 6) : (big ? 0.08 + rnd() * 0.26 : 0.035 + rnd() * 0.05 + (tall ? c.maxH * rnd() * 0.4 : 0));
      if (SP) {
        // keep buildings inside blocks, off the streets
        const lu = (x - c.x) * cr + (z - c.z) * sr, lv = -(x - c.x) * sr + (z - c.z) * cr;
        const fu = Math.abs(((lu % SP) + SP * 1.5) % SP - SP / 2), fv = Math.abs(((lv % SP) + SP * 1.5) % SP - SP / 2);
        const half = Math.max(w, d) * 0.6 + 0.025;
        if (SP / 2 - fu < half || SP / 2 - fv < half) continue;
      }
      const yaw = SP ? rot : (rot + (rnd() < 0.7 ? 0 : rnd() * 1.5));
      q.setFromAxisAngle(V(0, 1, 0), yaw);
      // foundation: the floor sits level at the highest corner and the walls run down to the lowest
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      let lo = Infinity, hi = -Infinity;
      for (const [ax, az] of [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]]) {
        const gy = heightAt(x + ax * w * cy + az * d * sy, z - ax * w * sy + az * d * cy);
        if (gy < lo) lo = gy; if (gy > hi) hi = gy;
      }
      if (hi - lo > 0.35) continue; // too steep to build on
      const y = hi - 0.03;
      m.compose(p.set(x, lo - 0.02, z), q, s.set(w, h + 0.03 + (y - lo + 0.02), d));
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, col.set(tones[Math.floor(rnd() * tones.length)]));
      const house = !big && h < 0.1;
      if (house) {
        m.compose(p.set(x, y + h + 0.03, z), q, s.set(w * 1.08, Math.min(w, d) * 0.45, d * 1.08));
        gables.setMatrixAt(nG, m);
        gables.setColorAt(nG, col.set(roofTones[Math.floor(rnd() * roofTones.length)]));
        nG++;
      } else {
        m.compose(p.set(x, y + h + 0.03, z), q, s.set(w * 1.02, 1, d * 1.02));
        slabs.setMatrixAt(nS++, m);
        if (rnd() < 0.7) {
          off.set((rnd() - 0.5) * w * 0.4, 0, (rnd() - 0.5) * d * 0.4).applyQuaternion(q);
          m.compose(p.set(x + off.x, y + h + 0.06, z + off.z), q, s.set(w * (0.25 + rnd() * 0.3), 0.01 + rnd() * 0.025, d * (0.25 + rnd() * 0.3)));
          tops.setMatrixAt(nT++, m);
        }
      }
      i++; placed++;
    }
  }
  mesh.count = i; gables.count = nG; slabs.count = nS; tops.count = nT;
  mesh.castShadow = mesh.receiveShadow = gables.castShadow = slabs.receiveShadow = true;
  const g = new THREE.Group();
  g.add(mesh, gables, slabs, tops);
  if (streets.length) {
    const sMat = new THREE.MeshStandardMaterial({ color: '#5a5d63', roughness: 0.9, emissive: '#ffb070', emissiveIntensity: 0 });
    glowMats.push({ mat: sMat, day: 0, night: 0.35 });
    const sGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    const sm = new THREE.InstancedMesh(sGeo, sMat, streets.length);
    streets.forEach((t, k) => {
      q.setFromAxisAngle(V(0, 1, 0), t.ang);
      m.compose(p.set(t.x, heightAt(t.x, t.z) + 0.012, t.z), q, s.set(0.05, 1, t.len + 0.05));
      sm.setMatrixAt(k, m);
    });
    sm.receiveShadow = true;
    g.add(sm);
  }
  return g;
}

// ---------- instanced forests ----------
export function createForest(spots, cell = 16) {
  // open cones and a faceted crown: half the triangles of the old trees
  const coneGeo = mergeGeometries([
    new THREE.ConeGeometry(0.42, 0.75, 7, 1, true).translate(0, 0.62, 0),
    new THREE.ConeGeometry(0.33, 0.55, 7, 1, true).translate(0, 0.95, 0),
  ]);
  const blobGeo = new THREE.DodecahedronGeometry(0.5, 0).scale(1, 0.85, 1).translate(0, 0.62, 0);
  const trunkGeo = new THREE.CylinderGeometry(0.06, 0.09, 0.4, 5, 1, true).translate(0, 0.2, 0);
  const mats = { conif: std('#3f7a48', { flatShading: true, roughness: 0.95, side: THREE.DoubleSide }), broad: std('#6c9c46', { flatShading: true, roughness: 0.95 }), trunk: std('#5a4030', { roughness: 0.95 }) };
  const base = { conif: new THREE.Color('#3f7a48'), broad: new THREE.Color('#6c9c46'), trunk: new THREE.Color('#5a4030') };
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = V(1, 1, 1), p = V(0, 0, 0), c = new THREE.Color();
  const mk = (geo, list, key) => {
    const im = new THREE.InstancedMesh(geo, mats[key], list.length);
    list.forEach((t, i) => {
      q.setFromAxisAngle(V(0, 1, 0), t.r * 6.28);
      m.compose(p.set(t.x, t.y - 0.01, t.z), q, sc.set(t.s, t.s * (0.9 + t.r * 0.4), t.s));
      im.setMatrixAt(i, m);
      im.setColorAt(i, c.copy(base[key]).offsetHSL((t.r - 0.5) * 0.07, (t.r - 0.5) * 0.2, (t.r - 0.5) * 0.16));
    });
    im.castShadow = key !== 'trunk'; im.receiveShadow = true;
    im.computeBoundingSphere(); // per-area batches are culled when off screen
    return im;
  };
  const buckets = new Map();
  for (const t of spots) { const k = Math.floor(t.x / cell) + ',' + Math.floor(t.z / cell); if (!buckets.has(k)) buckets.set(k, []); buckets.get(k).push(t); }
  const g = new THREE.Group();
  for (const list of buckets.values()) {
    const conif = list.filter((t) => t.kind === 0), broad = list.filter((t) => t.kind === 1);
    if (conif.length) g.add(mk(coneGeo, conif, 'conif'));
    if (broad.length) g.add(mk(blobGeo, broad, 'broad'));
    g.add(mk(trunkGeo, list, 'trunk'));
  }
  g.userData.count = spots.length;
  return g;
}

// ---------- instanced Fushimi-style torii tunnel ----------
export function createToriiTunnel(path, d0, d1, spacing, scale, yAt) {
  const pillars = [];
  for (const s of [-1, 1]) pillars.push(new THREE.CylinderGeometry(0.26, 0.3, 5.6, 10).translate(s * 1.9, 2.8, 0));
  pillars.push(new THREE.BoxGeometry(5.0, 0.36, 0.36).translate(0, 4.6, 0));
  pillars.push(new THREE.BoxGeometry(6.0, 0.34, 0.5).translate(0, 5.25, 0));
  const red = mergeGeometries(pillars);
  const black = mergeGeometries([
    new THREE.BoxGeometry(6.6, 0.32, 0.62).translate(0, 5.58, 0),
    ...[-1, 1].map((s) => new THREE.BoxGeometry(0.7, 0.5, 0.7).translate(s * 1.9, 0.25, 0)),
  ]);
  const n = Math.floor((d1 - d0) / spacing);
  const redMat = std('#e2522f', { roughness: 0.5, emissive: '#7a1a08', emissiveIntensity: 0.15 });
  const ri = new THREE.InstancedMesh(red, redMat, n), bi = new THREE.InstancedMesh(black, std('#1d1c20'), n);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = V(scale, scale, scale), t = V(0, 0, 0);
  for (let i = 0; i < n; i++) {
    const d = d0 + i * spacing;
    const p = path.at(d), tan = path.tangent(d, t);
    q.setFromAxisAngle(V(0, 1, 0), Math.atan2(tan.x, tan.z));
    m.compose(V(p.x, yAt(p.x, p.z) - 0.004, p.z), q, s);
    ri.setMatrixAt(i, m); bi.setMatrixAt(i, m);
  }
  ri.castShadow = bi.castShadow = true;
  const g = new THREE.Group();
  g.add(ri, bi);
  return g;
}

// ---------- disc of ground draped on the terrain (lawns, plazas, moats) ----------
export function drapedDisc(cx, cz, r, heightAt, mat, lift = 0.006, seg = 40) {
  const geo = new THREE.CircleGeometry(r, seg, 0, Math.PI * 2);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setY(i, heightAt(cx + pos.getX(i), cz + pos.getZ(i)) + lift);
  geo.translate(cx, 0, cz);
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, mat);
  m.receiveShadow = true;
  return m;
}

// ---------- labels that keep a fixed on-screen size ----------
export function createLabel(text, sub = '', color = '#ffffff') {
  const c = document.createElement('canvas');
  c.width = 640; c.height = 200;
  const g = c.getContext('2d');
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '600 56px "IBM Plex Sans Thai", sans-serif';
  const w = Math.max(g.measureText(text).width, sub ? (g.font = '400 34px "IBM Plex Sans Thai", sans-serif', g.measureText(sub).width) : 0) + 70;
  g.fillStyle = 'rgba(13,19,48,0.62)';
  const x0 = 320 - w / 2, y0 = sub ? 26 : 50, h = sub ? 124 : 84;
  g.beginPath(); g.roundRect(x0, y0, w, h, 26); g.fill();
  g.strokeStyle = 'rgba(244,239,230,0.25)'; g.lineWidth = 2; g.stroke();
  g.fillStyle = color; g.font = '600 52px "IBM Plex Sans Thai", sans-serif';
  g.fillText(text, 320, sub ? 66 : 92);
  if (sub) { g.font = '400 32px "IBM Plex Sans Thai", sans-serif'; g.fillStyle = 'rgba(244,239,230,0.75)'; g.fillText(sub, 320, 118); }
  // stem
  g.fillStyle = 'rgba(244,239,230,0.8)'; g.fillRect(318, y0 + h, 4, 200 - y0 - h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, depthTest: false, sizeAttenuation: false, toneMapped: false, fog: false });
  const s = new THREE.Sprite(mat);
  s.center.set(0.5, 0);
  s.scale.set(0.16, 0.05, 1);
  s.renderOrder = 20;
  return s;
}

// ---------- glowing route line (screen-space width) ----------
export const lineMats = [];
export function routeLine(points, color, width, opacity = 1) {
  const geo = new LineGeometry();
  const arr = [];
  for (const p of points) arr.push(p.x, p.y, p.z);
  geo.setPositions(arr);
  const mat = new LineMaterial({ color, linewidth: width, transparent: true, opacity, depthWrite: false, toneMapped: false, fog: false, blending: THREE.AdditiveBlending });
  lineMats.push(mat);
  const line = new Line2(geo, mat);
  line.computeLineDistances();
  line.frustumCulled = false;
  line.renderOrder = 6;
  line.userData.segments = points.length - 1;
  return line;
}
export function setLinePoints(line, points) {
  const arr = [];
  for (const p of points) arr.push(p.x, p.y, p.z);
  line.geometry.dispose();
  line.geometry = new LineGeometry();
  line.geometry.setPositions(arr);
  line.userData.segments = points.length - 1;
}

// ---------- water with analytic ripples (world-space, fades with distance) ----------
export const waterTime = { value: 0 };
export function waterMaterial(color, { roughness = 0.12, metalness = 0.35, freq = 1, amp = 0.22 } = {}) {
  const mat = new THREE.MeshStandardMaterial({ color, roughness, metalness });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uWTime = waterTime;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;\nuniform float uWTime;')
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
      {
        vec2 p = vWPos.xz * ${freq.toFixed(3)};
        float t = uWTime;
        vec2 g = vec2(0.0);
        g += vec2(0.8, 0.6) * cos(dot(p, vec2(0.8, 0.6)) * 9.0 + t * 1.3) * 1.0;
        g += vec2(-0.5, 0.86) * cos(dot(p, vec2(-0.5, 0.86)) * 15.0 + t * 1.9) * 0.7;
        g += vec2(0.95, -0.3) * cos(dot(p, vec2(0.95, -0.3)) * 27.0 - t * 2.4) * 0.45;
        g += vec2(0.2, 0.98) * cos(dot(p, vec2(0.2, 0.98)) * 46.0 + t * 3.1) * 0.3;
        float fade = 1.0 / (1.0 + length(vWPos - cameraPosition) * 0.08);
        vec3 nw = normalize(vec3(-g.x * ${amp.toFixed(3)} * fade, 1.0, -g.y * ${amp.toFixed(3)} * fade));
        normal = normalize((viewMatrix * vec4(nw, 0.0)).xyz);
      }`);
  };
  return mat;
}
