import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createAirliner } from './models2.js';
import { PLANE_SCALE as PL, landMaterial } from './geo.js';

// An airport built in code from OpenStreetMap ways ([lon, lat] lines and rings, see scripts/build-nrt.mjs):
// runways, taxiways, aprons and building footprints, at K scene units per metre like the Suvarnabhumi model.
// Local frame as createAirport: origin at the centre of the main runway, +x along it toward `ref`'s
// higher-numbered end, +z to the right of that heading. Aircraft use the world's plane scale.
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.02, ...o });

// Shortest routes along a set of polylines: points closer than `join` merge into one node.
// ponytail: same idea as the airport page's taxi graph in bkk.js; merge the two if either grows.
export function taxiGraph(lines, join, step) {
  const P = [], adj = [], cells = new Map(), C = join * 1.5;
  const node = (x, z) => {
    const cx = Math.round(x / C), cz = Math.round(z / C);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (const n of cells.get(`${cx + i},${cz + j}`) || []) if (Math.hypot(P[n][0] - x, P[n][1] - z) < join) return n;
    P.push([x, z]); adj.push([]); const k = `${cx},${cz}`; cells.set(k, [...(cells.get(k) || []), P.length - 1]); return P.length - 1;
  };
  for (const pts of lines) {
    let prev = -1;
    pts.forEach(([x, z], i) => {
      const [ax, az] = i ? pts[i - 1] : [x, z], n = i ? Math.max(1, Math.ceil(Math.hypot(x - ax, z - az) / step)) : 1;
      for (let k = 1; k <= n; k++) { const px = ax + (x - ax) * k / n, pz = az + (z - az) * k / n, id = node(px, pz); if (prev >= 0 && prev !== id) { const d = Math.hypot(P[prev][0] - px, P[prev][1] - pz); adj[prev].push([id, d]); adj[id].push([prev, d]); } prev = id; }
    });
  }
  const nearest = (x, z, ok = () => true) => { let best = -1, bd = Infinity; P.forEach((q, i) => { const d = Math.hypot(q[0] - x, q[1] - z); if (d < bd && ok(q)) { bd = d; best = i; } }); return best; };
  const route = (a, b) => {
    if (a < 0 || b < 0) return null;
    const dist = new Float64Array(P.length).fill(Infinity), from = new Int32Array(P.length).fill(-1), q = [a]; dist[a] = 0;
    for (let h = 0; h < q.length; h++) { const u = q[h]; for (const [v, d] of adj[u]) if (dist[u] + d < dist[v] - 1e-9) { dist[v] = dist[u] + d; from[v] = u; q.push(v); } }
    if (dist[b] === Infinity) return null;
    const out = []; for (let u = b; u >= 0; u = from[u]) out.push(P[u]); return out.reverse();
  };
  return { P, nearest, route };
}

const inside = ([x, z], ring) => { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [xi, zi] = ring[i], [xj, zj] = ring[j]; if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) c = !c; } return c; };

export function createOsmAirport({ osm, ref, K, y, toWorldXZ, ground, parked = 18, label }) {
  // main runway: its two ends fix the frame
  const rw = osm.runways.find((r) => r.ref === ref);
  const ends = [rw.p[0], rw.p[rw.p.length - 1]].sort((a, b) => a[1] - b[1]); // south end first: the higher-numbered end is north here
  const lat0 = (ends[0][1] + ends[1][1]) / 2, lon0 = (ends[0][0] + ends[1][0]) / 2;
  const MX = 111320 * Math.cos(lat0 * Math.PI / 180), MY = 110574;
  const de = (ends[1][0] - ends[0][0]) * MX, dn = (ends[1][1] - ends[0][1]) * MY, hdg = Math.atan2(de, dn), len = Math.hypot(de, dn) * K;
  const L = ([lon, lat]) => { const e = (lon - lon0) * MX, n = (lat - lat0) * MY; return [(e * Math.sin(hdg) + n * Math.cos(hdg)) * K, (e * Math.cos(hdg) - n * Math.sin(hdg)) * K]; };
  const g = new THREE.Group(), c = toWorldXZ(lon0, lat0);
  g.position.set(c.x, y, c.z); g.rotation.y = Math.PI / 2 - hdg;
  const loc = { runways: osm.runways.map((r) => ({ ...r, p: r.p.map(L) })), taxiways: osm.taxiways.map((t) => t.p.map(L)), aprons: osm.aprons.map((a) => a.map(L)), buildings: osm.buildings.map((b) => ({ ...b, p: b.p.map(L) })) };
  // the plate: everything the airport uses plus a margin, laid flat over the terrain
  const core = [...loc.runways.flatMap((r) => r.p), ...loc.aprons.flat(), ...loc.buildings.filter((b) => b.k === 'terminal').flatMap((b) => b.p)];
  const pad = { x0: Math.min(...core.map((q) => q[0])) - 400 * K, x1: Math.max(...core.map((q) => q[0])) + 400 * K, z0: Math.min(...core.map((q) => q[1])) - 400 * K, z1: Math.max(...core.map((q) => q[1])) + 400 * K };
  g.updateMatrixWorld(true);
  let lo = Infinity;
  for (let i = 0; i <= 8; i++) for (let j = 0; j <= 8; j++) { const w = g.localToWorld(V(pad.x0 + (pad.x1 - pad.x0) * i / 8, 0, pad.z0 + (pad.z1 - pad.z0) * j / 8)); lo = Math.min(lo, ground(w.x, w.z)); }
  const depth = y - lo + 0.3, grass = landMaterial('#8fae6a');
  const plate = new THREE.Mesh(new THREE.BoxGeometry(pad.x1 - pad.x0, depth, pad.z1 - pad.z0), grass); plate.position.set((pad.x0 + pad.x1) / 2, -depth / 2, (pad.z0 + pad.z1) / 2); plate.receiveShadow = true; g.add(plate);
  const strip = (pts, half, h) => { // flat ribbon along a polyline
    const pos = [], idx = [];
    pts.forEach(([x, z], i) => { const [ax, az] = pts[Math.max(0, i - 1)], [bx, bz] = pts[Math.min(pts.length - 1, i + 1)], l = Math.hypot(bx - ax, bz - az) || 1, sx = -(bz - az) / l * half, sz = (bx - ax) / l * half; pos.push(x + sx, h, z + sz, x - sx, h, z - sz); if (i) { const q = (i - 1) * 2; idx.push(q, q + 2, q + 1, q + 1, q + 2, q + 3); } });
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals(); return geo;
  };
  const shape = (ring, h) => new THREE.ShapeGeometry(new THREE.Shape(ring.map(([x, z]) => new THREE.Vector2(x, -z)))).rotateX(-Math.PI / 2).translate(0, h, 0);
  const add = (geos, mat, shadow = false) => { if (!geos.length) return; const m = new THREE.Mesh(mergeGeometries(geos.map((q) => (q.index ? q.toNonIndexed() : q))), mat); m.receiveShadow = true; m.castShadow = shadow; g.add(m); };
  add(loc.aprons.map((a) => shape(a, 0.004)), std('#a3a5aa'));
  add(loc.taxiways.map((t) => strip(t, 12 * K, 0.006)), std('#55585e'));
  add(loc.taxiways.map((t) => strip(t, 0.5 * K, 0.0072)), new THREE.MeshBasicMaterial({ color: '#e8c33a' }));
  add(loc.runways.map((r) => strip(r.p, (r.w || 60) / 2 * K, 0.008)), std('#2f3237', { roughness: 0.9 }));
  // runway paint: centreline dashes and threshold bars
  const paint = [];
  for (const r of loc.runways) {
    const [a, b] = [r.p[0], r.p[r.p.length - 1]], d = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / d, uz = (b[1] - a[1]) / d;
    for (let s = 180 * K; s < d - 180 * K; s += 60 * K) paint.push(strip([[a[0] + ux * s, a[1] + uz * s], [a[0] + ux * (s + 30 * K), a[1] + uz * (s + 30 * K)]], 0.45 * K, 0.009));
    for (const [e, f] of [[a, 1], [b, -1]]) for (let k = -6; k <= 6; k++) { if (!k) continue; const ox = -uz * k * 4 * K, oz = ux * k * 4 * K; paint.push(strip([[e[0] + ux * f * 10 * K + ox, e[1] + uz * f * 10 * K + oz], [e[0] + ux * f * 55 * K + ox, e[1] + uz * f * 55 * K + oz]], 0.9 * K, 0.009)); }
  }
  add(paint, new THREE.MeshBasicMaterial({ color: '#eeeeea' }));
  // buildings: extruded footprints; terminals white with a pale roof, the rest concrete
  const walls = { terminal: [], other: [] };
  for (const b of loc.buildings) {
    const term = b.k === 'terminal', h = (b.h || (term ? 26 : b.k === 'hangar' ? 32 : 14)) * K;
    walls[term ? 'terminal' : 'other'].push(new THREE.ExtrudeGeometry(new THREE.Shape(b.p.map(([x, z]) => new THREE.Vector2(x, -z))), { depth: h, bevelEnabled: false }).rotateX(-Math.PI / 2));
  }
  add(walls.terminal, std('#c9d0d6', { roughness: 0.75 }), true); // not pure white: the scene's bloom would wash it out
  add(walls.other, std('#bdb9b0'), true);
  // aircraft parked nose-in along the airside faces of the terminals, where an apron lies in front
  const terminals = loc.buildings.filter((b) => b.k === 'terminal'), slots = [];
  for (const t of terminals) {
    const ring = t.p, cx = ring.reduce((s, q) => s + q[0], 0) / ring.length, cz = ring.reduce((s, q) => s + q[1], 0) / ring.length;
    for (let i = 0; i < ring.length - 1; i++) {
      const [ax, az] = ring[i], [bx, bz] = ring[i + 1], d = Math.hypot(bx - ax, bz - az); if (d < 80 * K) continue;
      let nx = -(bz - az) / d, nz = (bx - ax) / d; if ((ax - cx) * nx + (az - cz) * nz < 0) { nx = -nx; nz = -nz; } // outward normal
      for (let s = 45 * K; s < d - 45 * K; s += 78 * K) {
        const px = ax + (bx - ax) * s / d + nx * 42 * K, pz = az + (bz - az) * s / d + nz * 42 * K;
        if (loc.aprons.some((a) => inside([px, pz], a)) && !slots.some((o) => Math.hypot(o.x - px, o.z - pz) < 70 * K)) slots.push({ x: px, z: pz, nx, nz, term: t.name });
      }
    }
  }
  const jets = [];
  slots.slice(0, parked).forEach((s, i) => {
    if (i % 3 === 2) return; // some stands empty
    const a = createAirliner(); a.scale.setScalar(PL); a.position.set(s.x, a.userData.groundOffset * PL, s.z); a.rotation.y = Math.atan2(s.nz, -s.nx); a.userData.gear.visible = true; a.userData.slot = s;
    g.add(a); jets.push(a);
  });
  const nav = taxiGraph([...loc.taxiways, ...loc.runways.map((r) => r.p)], 12 * K, 40 * K);
  const lights = new THREE.MeshBasicMaterial({ color: '#ffe7a8', toneMapped: false }); // kept for the night colour hook shared with the other airports
  Object.assign(g.userData, { len, pad, slots, jets, nav, lights, label, local: L, toWorld: (lx, lz, ly = 0) => { g.updateMatrixWorld(true); return g.localToWorld(V(lx, ly, lz)); } });
  return g;
}

// The real map round an airport model (roads, rail, canals, ponds, buildings) from a baked OSM file in the
// airport's own metres ([east', north'] as scripts/build-bkk.mjs writes them), kept within `radius` scene units.
export function addOsmSurroundings(group, osm, toLocal, K, radius) {
  const near = (pts) => pts.some(([x, z]) => Math.hypot(x, z) < radius);
  const line = (p) => p.map(toLocal), parts = { road: [], minor: [], rail: [], water: [], house: [] };
  const strip = (pts, half, h) => {
    const pos = [], idx = [];
    pts.forEach(([x, z], i) => { const [ax, az] = pts[Math.max(0, i - 1)], [bx, bz] = pts[Math.min(pts.length - 1, i + 1)], l = Math.hypot(bx - ax, bz - az) || 1, sx = -(bz - az) / l * half, sz = (bx - ax) / l * half; pos.push(x + sx, h, z + sz, x - sx, h, z - sz); if (i) { const q = (i - 1) * 2; idx.push(q, q + 2, q + 1, q + 1, q + 2, q + 3); } });
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals(); return geo.toNonIndexed();
  };
  const W = { motorway: 14, trunk: 11, primary: 9, secondary: 7, tertiary: 6 };
  for (const r of osm.roads || []) { const p = line(r.p); if (!near(p) || /service|unclassified/.test(r.k)) continue; const major = /motorway|trunk|primary/.test(r.k); (major ? parts.road : parts.minor).push(strip(p, (W[r.k.replace('-l', '')] || 5) * K, r.up ? 0.03 : 0.004)); }
  for (const r of osm.rail || []) { const p = line(r.p); if (!r.tun && near(p)) parts.rail.push(strip(p, 3 * K, r.up ? 0.05 : 0.006)); }
  for (const w of osm.water || []) {
    const p = line(w.p); if (!near(p)) continue;
    parts.water.push(w.line ? strip(p, 9 * K, 0.003) : new THREE.ShapeGeometry(new THREE.Shape(p.map(([x, z]) => new THREE.Vector2(x, -z)))).rotateX(-Math.PI / 2).translate(0, 0.003, 0).toNonIndexed());
  }
  for (const b of osm.buildings || []) {
    const p = line(b.p); if (b.k === 'terminal' || !near(p)) continue;
    parts.house.push(new THREE.ExtrudeGeometry(new THREE.Shape(p.map(([x, z]) => new THREE.Vector2(x, -z))), { depth: (b.h || (b.lv ? b.lv * 3.6 : b.k === 'hangar' ? 22 : 9)) * K, bevelEnabled: false }).rotateX(-Math.PI / 2).toNonIndexed());
  }
  const mats = { road: std('#f1efe8', { roughness: 0.7 }), minor: std('#d3d0c7'), rail: std('#6f7f95', { roughness: 0.6 }), water: std('#4f9fc4', { roughness: 0.25, metalness: 0.2 }), house: std('#eeebe4') };
  for (const [k, geos] of Object.entries(parts)) if (geos.length) { const m = new THREE.Mesh(mergeGeometries(geos.map((q) => { for (const a of Object.keys(q.attributes)) if (a !== 'position' && a !== 'normal') q.deleteAttribute(a); return q; })), mats[k]); m.receiveShadow = true; m.castShadow = k === 'house'; group.add(m); }
}
