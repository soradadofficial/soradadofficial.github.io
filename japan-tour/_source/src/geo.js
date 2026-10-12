import * as THREE from 'three';
import GEO from './geo-data.json';

// One world unit = 1 km on the ground. Heights are exaggerated by VERT so the
// mountains read at map scale. Man-made models use MODEL_SCALE (1 m -> 0.02 units),
// a miniature-diorama exaggeration so trains, buses and buildings stay visible.
export const VERT = 5;
export const MODEL_SCALE = 0.02;
const LON0 = 137.5, LAT0 = 35.5;
const KX = 111.32 * Math.cos(LAT0 * Math.PI / 180), KZ = 110.95;

export const toX = (lon) => (lon - LON0) * KX;
export const toZ = (lat) => -(lat - LAT0) * KZ;
export const toLon = (x) => x / KX + LON0;
export const toLat = (z) => -z / KZ + LAT0;

// Thailand sits far to the south-west; it is drawn closer than reality so the flight
// stays short ("skip between countries").
export const THAI_SHIFT = { x: 1700, z: -1250 };
export const thaiXZ = (lon, lat) => [toX(lon) + THAI_SHIFT.x, toZ(lat) + THAI_SHIFT.z];

// ---------- tiny 2D simplex noise ----------
const grad = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]];
const perm = new Uint8Array(512);
{
  let s = 1337;
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) { s = (s * 16807) % 2147483647; const j = s % (i + 1); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
}
function simplex(x, y) {
  const F2 = 0.3660254, G2 = 0.2113249;
  const s = (x + y) * F2, i = Math.floor(x + s), j = Math.floor(y + s);
  const t = (i + j) * G2, x0 = x - (i - t), y0 = y - (j - t);
  const i1 = x0 > y0 ? 1 : 0, j1 = 1 - i1;
  const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2, x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
  const ii = i & 255, jj = j & 255;
  let n = 0;
  const c = (gx, gy, dx, dy) => { let tt = 0.5 - dx * dx - dy * dy; if (tt < 0) return 0; tt *= tt; return tt * tt * (gx * dx + gy * dy); };
  let g = grad[perm[ii + perm[jj]] & 7]; n += c(g[0], g[1], x0, y0);
  g = grad[perm[ii + i1 + perm[jj + j1]] & 7]; n += c(g[0], g[1], x1, y1);
  g = grad[perm[ii + 1 + perm[jj + 1]] & 7]; n += c(g[0], g[1], x2, y2);
  return 70 * n;
}
const fbm = (x, y, oct = 5) => { let a = 0, f = 1, amp = 0.5; for (let i = 0; i < oct; i++) { a += amp * simplex(x * f, y * f); f *= 2.03; amp *= 0.5; } return a; };
const ridged = (x, y, oct = 5) => { let a = 0, f = 1, amp = 0.5; for (let i = 0; i < oct; i++) { a += amp * (1 - Math.abs(simplex(x * f, y * f))); f *= 2.1; amp *= 0.5; } return a; };

// ---------- landmark shaping (real km) ----------
const gauss = (x, z, lon, lat, r) => { const dx = x - toX(lon), dz = z - toZ(lat); return Math.exp(-(dx * dx + dz * dz) / (2 * r * r)); };
export const FUJI = { lon: 138.7274, lat: 35.3606, R: 21, H: 3.776 };
export function fujiProfile(r) { // real km above base
  if (r >= FUJI.R) return 0;
  const t = r / FUJI.R;
  return (FUJI.H - 0.9) * Math.pow(1 - t, 1.75) * (1 - 0.04 * (r < 0.35 ? 1 - r / 0.35 : 0));
}
export const LAKES = [
  { name: 'kawaguchiko', lon: 138.755, lat: 35.515, a: 3.4, b: 0.75, rot: 0.35, level: 0.833 },
  { name: 'ashi', lon: 139.0, lat: 35.215, a: 1.1, b: 3.4, rot: 0.15, level: 0.723 },
  { name: 'biwa', lon: 136.08, lat: 35.27, a: 10, b: 30, rot: -0.35, level: 0.085 },
  { name: 'yamanaka', lon: 138.87, lat: 35.415, a: 2.2, b: 0.9, rot: -0.4, level: 0.98 },
];
function inLake(x, z) {
  for (const L of LAKES) {
    const dx = x - toX(L.lon), dz = z - toZ(L.lat);
    const c = Math.cos(L.rot), s = Math.sin(L.rot);
    const u = (dx * c - dz * s) / L.a, v = (dx * s + dz * c) / L.b;
    const d = u * u + v * v;
    if (d < 1.6) return { L, d };
  }
  return null;
}

// ---------- terrain ----------
export function buildTerrain({ cell = 3, patches = [] } = {}) {
  const lon0 = 128.6, lon1 = 146.4, lat0 = 30.6, lat1 = 45.8;
  const x0 = toX(lon0), x1 = toX(lon1), z0 = toZ(lat1), z1 = toZ(lat0);
  const cols = Math.round((x1 - x0) / cell) + 1, rows = Math.round((z1 - z0) / cell) + 1;

  // rasterize coastlines into a land mask
  const cv = document.createElement('canvas');
  cv.width = cols; cv.height = rows;
  const g = cv.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, cols, rows);
  g.fillStyle = '#fff';
  for (const ring of [...GEO.japan, ...GEO.near]) {
    g.beginPath();
    ring.forEach(([lo, la], i) => { const px = (toX(lo) - x0) / cell, py = (toZ(la) - z0) / cell; i ? g.lineTo(px, py) : g.moveTo(px, py); });
    g.closePath(); g.fill();
  }
  const img = g.getImageData(0, 0, cols, rows).data;
  const N = cols * rows;
  const mask = new Float32Array(N);
  for (let i = 0; i < N; i++) mask[i] = img[i * 4] / 255;
  const blur = (src, r) => { // separable box blur, twice
    let a = Float32Array.from(src), b = new Float32Array(N);
    for (let pass = 0; pass < 2; pass++) {
      for (let y = 0; y < rows; y++) { let acc = 0; for (let x = -r; x <= r; x++) acc += a[y * cols + Math.min(cols - 1, Math.max(0, x))]; for (let x = 0; x < cols; x++) { b[y * cols + x] = acc / (2 * r + 1); acc += a[y * cols + Math.min(cols - 1, x + r + 1)] - a[y * cols + Math.max(0, x - r)]; } }
      for (let x = 0; x < cols; x++) { let acc = 0; for (let y = -r; y <= r; y++) acc += b[Math.min(rows - 1, Math.max(0, y)) * cols + x]; for (let y = 0; y < rows; y++) { a[y * cols + x] = acc / (2 * r + 1); acc += b[Math.min(rows - 1, y + r + 1) * cols + x] - b[Math.max(0, y - r) * cols + x]; } }
    }
    return a;
  };
  const near = blur(mask, Math.max(1, Math.round(4 / cell)));
  const inland = blur(mask, Math.max(2, Math.round(28 / cell)));

  const base = new Float32Array(N);    // without Fuji (the Fuji mesh drapes on it)
  const realKm = new Float32Array(N);  // with Fuji, for tree line
  const colKm = new Float32Array(N);
  const rawH = (x, z, inl, nr) => {
    let h = Math.pow(inl, 1.25) * (0.15 + 1.35 * Math.pow(ridged(x / 70, z / 70), 2.2)) + 0.12 * nr * (fbm(x / 18, z / 18) + 0.5);
    // Japanese Alps
    const ax = x - toX(137.65), az = z - toZ(36.15);
    h += 2.0 * Math.exp(-(ax * ax) / (2 * 28 * 28) - (az * az) / (2 * 75 * 75)) * (0.6 + 0.6 * ridged(x / 25, z / 25)) * inl;
    // plains and basins where the cities are
    const plain = Math.max(gauss(x, z, 139.75, 35.95, 48), gauss(x, z, 136.85, 35.22, 24), gauss(x, z, 135.5, 34.68, 16), gauss(x, z, 135.76, 35.0, 5), gauss(x, z, 135.82, 34.62, 6), gauss(x, z, 140.3, 35.75, 14));
    h *= 1 - 0.93 * plain;
    // Hakone volcano with its caldera, Fuji foothills
    h += 0.85 * gauss(x, z, 139.02, 35.23, 7.5) - 0.35 * gauss(x, z, 139.01, 35.22, 2.4);
    h += 0.75 * gauss(x, z, 138.73, 35.4, 14);
    return h;
  };
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const k = j * cols + i, x = x0 + i * cell, z = z0 + j * cell;
    const m = mask[k];
    let h = rawH(x, z, inland[k], near[k]);
    const lake = inLake(x, z);
    if (lake && lake.d < 1) h = lake.L.level - 0.04;
    else if (lake) h = Math.max(h, lake.L.level + 0.01 * (lake.d - 1));
    const land = THREE.MathUtils.smoothstep(m, 0.3, 0.62);
    const fuji = fujiProfile(Math.hypot(x - toX(FUJI.lon), z - toZ(FUJI.lat)));
    realKm[k] = (h + fuji) * land;
    colKm[k] = h * land;
    base[k] = h * land * VERT - (1 - land) * 1.2;
  }

  // Exact height on the rendered triangles (PlaneGeometry splits each cell along the b-d diagonal)
  const sampleGrid = (arr, gx0, gz0, gc, gcols, grows, x, z) => {
    const fx = (x - gx0) / gc, fz = (z - gz0) / gc;
    const i = Math.max(0, Math.min(gcols - 2, Math.floor(fx))), j = Math.max(0, Math.min(grows - 2, Math.floor(fz)));
    const tx = Math.min(1, Math.max(0, fx - i)), tz = Math.min(1, Math.max(0, fz - j));
    const A = arr[j * gcols + i], D = arr[j * gcols + i + 1], B = arr[(j + 1) * gcols + i], Cc = arr[(j + 1) * gcols + i + 1];
    if (tx + tz <= 1) return A + (D - A) * tx + (B - A) * tz;
    return Cc + (B - Cc) * (1 - tx) + (D - Cc) * (1 - tz);
  };
  const sample = (arr, x, z) => sampleGrid(arr, x0, z0, cell, cols, rows, x, z);
  const coarseBase = (x, z) => sample(base, x, z);

  // ---------- colours ----------
  const C = (h) => new THREE.Color(h);
  const sand = C('#d8c9a0'), lowGreen = C('#7fa35a'), field = C('#9bb66a'), forest = C('#3f6b3c'), darkForest = C('#2e5233'), rock = C('#8a8478'), snow = C('#f4f7fb'), seabed = C('#2a5a78'), city = C('#97948b'), shore = C('#b9b08a');
  const colorFor = (x, z, km, m, out) => {
    const n = fbm(x / 9, z / 9, 3);
    if (m < 0.35) out.copy(seabed).lerp(sand, Math.max(0, (m - 0.15) * 3));
    else if (km < 0.03) out.copy(sand).lerp(field, THREE.MathUtils.smoothstep(km, 0.0, 0.03));
    else if (km < 0.35) out.copy(field).lerp(lowGreen, 0.5 + n * 0.5);
    else if (km < 1.2) out.copy(lowGreen).lerp(forest, THREE.MathUtils.smoothstep(km, 0.35, 1.0)).lerp(darkForest, Math.max(0, n) * 0.6);
    else if (km < 2.2) out.copy(forest).lerp(rock, THREE.MathUtils.smoothstep(km, 1.4, 2.2));
    else out.copy(rock).lerp(snow, THREE.MathUtils.smoothstep(km, 2.3 + n * 0.3, 2.7));
    out.lerp(city, urbanW(x, z) * 0.6 * (1 - THREE.MathUtils.smoothstep(km, 0.95, 1.3)) * (m > 0.5 ? 1 : 0));
    return out;
  };
  const detail = detailTexture();
  const terrainMat = new THREE.MeshStandardMaterial({ vertexColors: true, map: detail, roughness: 0.95, metalness: 0 });

  // ---------- high-resolution patches (lakes, shrine hills) cut into the coarse grid ----------
  const patchData = [];
  for (const P of patches) {
    const i0 = Math.max(0, Math.floor((toX(P.lon0) - x0) / cell)), i1 = Math.min(cols - 1, Math.ceil((toX(P.lon1) - x0) / cell));
    const j0 = Math.max(0, Math.floor((toZ(P.lat1) - z0) / cell)), j1 = Math.min(rows - 1, Math.ceil((toZ(P.lat0) - z0) / cell));
    const k = P.k || 16, pc = cell / k;
    const pcols = (i1 - i0) * k + 1, prows = (j1 - j0) * k + 1;
    const px0 = x0 + i0 * cell, pz0 = z0 + j0 * cell, px1 = x0 + i1 * cell, pz1 = z0 + j1 * cell;
    const ph = new Float32Array(pcols * prows), pkm = new Float32Array(pcols * prows), pm = new Float32Array(pcols * prows);
    for (let j = 0; j < prows; j++) for (let i = 0; i < pcols; i++) {
      const x = px0 + i * pc, z = pz0 + j * pc, q = j * pcols + i;
      let h = coarseBase(x, z);
      const m = sample(mask, x, z);
      const edge = Math.min(x - px0, px1 - x, z - pz0, pz1 - z);
      const fade = THREE.MathUtils.smoothstep(edge, 0, 1.6);
      // local relief
      h += (fbm(x / 1.4, z / 1.4, 4) * 0.09 + ridged(x / 3.2, z / 3.2, 3) * 0.05 - 0.04) * VERT * fade * (P.relief ?? 1) * THREE.MathUtils.smoothstep(m, 0.6, 0.9);
      const lake = inLake(x, z);
      if (lake) {
        const lv = lake.L.level * VERT;
        if (lake.d < 1) h = lv - 0.06 - 0.25 * (1 - lake.d);
        else h = lv + 0.025 + (Math.max(h, lv + 0.025) - lv - 0.025) * THREE.MathUtils.smoothstep(lake.d, 1, 1.6);
      }
      ph[q] = h;
      pm[q] = m;
      pkm[q] = h / VERT;
    }
    patchData.push({ px0, pz0, px1, pz1, pc, pcols, prows, ph, pkm, pm, i0, i1, j0, j1 });
  }
  const inPatch = (x, z) => { for (const P of patchData) if (x >= P.px0 && x <= P.px1 && z >= P.pz0 && z <= P.pz1) return P; return null; };

  const fcx = toX(FUJI.lon), fcz = toZ(FUJI.lat);
  const baseAt = (x, z) => { const P = inPatch(x, z); return P ? sampleGrid(P.ph, P.px0, P.pz0, P.pc, P.pcols, P.prows, x, z) : coarseBase(x, z); };
  const fujiAt = (x, z) => { const r = Math.hypot(x - fcx, z - fcz); return r < FUJI.R ? fujiProfile(r) * VERT - (r < 0.4 ? 0.12 * VERT * (1 - r / 0.4) : 0) : 0; };
  const heightAt = (x, z) => baseAt(x, z) + fujiAt(x, z);
  const landAt = (x, z) => sample(mask, x, z);
  const kmAt = (x, z) => baseAt(x, z) / VERT + fujiAt(x, z) / VERT;

  // coarse mesh
  const geo = new THREE.PlaneGeometry(x1 - x0, z1 - z0, cols - 1, rows - 1);
  geo.rotateX(-Math.PI / 2);
  geo.translate((x0 + x1) / 2, 0, (z0 + z1) / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const col = new THREE.Color();
  for (let k = 0; k < pos.count; k++) {
    const i = k % cols, j = Math.floor(k / cols);
    pos.setY(k, base[k]);
    colorFor(x0 + i * cell, z0 + j * cell, colKm[k], mask[k], col);
    colors[k * 3] = col.r; colors[k * 3 + 1] = col.g; colors[k * 3 + 2] = col.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  if (patchData.length) {
    const idx = geo.index.array, out = [];
    for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
      if (patchData.some((P) => i >= P.i0 && i < P.i1 && j >= P.j0 && j < P.j1)) continue;
      const q = (j * (cols - 1) + i) * 6;
      for (let t = 0; t < 6; t++) out.push(idx[q + t]);
    }
    geo.setIndex(out);
  }
  geo.computeVertexNormals();
  detail.repeat.set((x1 - x0) / 1.6, (z1 - z0) / 1.6);
  const mesh = new THREE.Mesh(geo, terrainMat);
  mesh.receiveShadow = true;
  for (const P of patchData) {
    const pg = new THREE.PlaneGeometry(P.px1 - P.px0, P.pz1 - P.pz0, P.pcols - 1, P.prows - 1);
    pg.rotateX(-Math.PI / 2);
    pg.translate((P.px0 + P.px1) / 2, 0, (P.pz0 + P.pz1) / 2);
    const pp = pg.attributes.position, pcol = new Float32Array(pp.count * 3);
    const uv = pg.attributes.uv;
    for (let k = 0; k < pp.count; k++) {
      const i = k % P.pcols, j = Math.floor(k / P.pcols);
      const x = P.px0 + i * P.pc, z = P.pz0 + j * P.pc;
      pp.setY(k, P.ph[k]);
      colorFor(x, z, P.pkm[k], P.pm[k], col);
      const lake = inLake(x, z);
      if (lake && lake.d < 1.15) col.lerp(shore, 0.6);
      pcol[k * 3] = col.r; pcol[k * 3 + 1] = col.g; pcol[k * 3 + 2] = col.b;
      // continue the coarse uv so the detail texture lines up
      uv.setXY(k, (x - x0) / (x1 - x0), 1 - (z - z0) / (z1 - z0));
    }
    pg.setAttribute('color', new THREE.BufferAttribute(pcol, 3));
    pg.computeVertexNormals();
    const pm = new THREE.Mesh(pg, terrainMat);
    pm.receiveShadow = true;
    mesh.add(pm);
  }
  return { mesh, heightAt, baseAt, landAt, kmAt, urbanAt: (x, z) => urbanW(x, z), bounds: { x0, x1, z0, z1 } };
}

// Mottled canopy / field texture tiled over the terrain for close-up detail
function detailTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#e8e8e8'; g.fillRect(0, 0, 256, 256);
  let s = 7;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  // field patches
  for (let i = 0; i < 70; i++) {
    const v = 200 + Math.floor(rnd() * 55);
    g.fillStyle = `rgb(${v},${v},${v})`;
    g.save(); g.translate(rnd() * 256, rnd() * 256); g.rotate(rnd() * 0.5 - 0.25);
    g.fillRect(-15, -10, 18 + rnd() * 30, 12 + rnd() * 24); g.restore();
  }
  // canopy speckle
  for (let i = 0; i < 2600; i++) {
    const v = 150 + Math.floor(rnd() * 90);
    g.fillStyle = `rgba(${v},${v},${v},0.55)`;
    g.beginPath(); g.arc(rnd() * 256, rnd() * 256, 0.8 + rnd() * 2.4, 0, 7); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export const urbanW = (x, z) => Math.max(gauss(x, z, 139.72, 35.69, 13), gauss(x, z, 139.62, 35.47, 6), gauss(x, z, 135.5, 34.69, 8), gauss(x, z, 136.9, 35.17, 6), gauss(x, z, 135.77, 35.01, 3));

// Detailed Fuji cone draped on the base terrain
export function buildFuji(baseAt) {
  const cx = toX(FUJI.lon), cz = toZ(FUJI.lat);
  const RS = 96, RR = 70;
  const verts = [], cols = [], idx = [];
  const snow = new THREE.Color('#f5f8ff'), rock = new THREE.Color('#4a3c37'), forest = new THREE.Color('#355c3a'), darkF = new THREE.Color('#2a4a30'), col = new THREE.Color();
  for (let r = 0; r <= RR; r++) {
    const rr = Math.pow(r / RR, 1.25) * FUJI.R;
    for (let a = 0; a < RS; a++) {
      const ang = a / RS * Math.PI * 2;
      const gully = Math.sin(ang * 21) * 0.5 + Math.sin(ang * 47 + 1) * 0.3;
      const x = cx + Math.cos(ang) * rr, z = cz + Math.sin(ang) * rr;
      const km = fujiProfile(rr) * (1 - 0.03 * gully * (rr / FUJI.R)) - (rr < 0.4 ? 0.12 * (1 - rr / 0.4) : 0);
      const y = baseAt(x, z) + km * VERT + 0.06;
      verts.push(x, y, z);
      const total = km + 0.9;
      const snowLine = 2.75 + gully * 0.18;
      if (total > snowLine) col.copy(snow);
      else if (total > snowLine - 0.25) col.copy(rock).lerp(snow, (total - snowLine + 0.25) / 0.25 * (0.4 + 0.3 * gully + 0.3));
      else if (total > 2.5) col.copy(rock);
      else col.copy(forest).lerp(darkF, THREE.MathUtils.smoothstep(total, 1.2, 1.9)).lerp(rock, THREE.MathUtils.smoothstep(total, 2.15, 2.5));
      cols.push(col.r, col.g, col.b);
    }
  }
  for (let r = 0; r < RR; r++) for (let a = 0; a < RS; a++) {
    const A = r * RS + a, B = r * RS + (a + 1) % RS, Cc = (r + 1) * RS + a, D = (r + 1) * RS + (a + 1) % RS;
    idx.push(A, B, Cc, B, D, Cc);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  geo.setIndex(idx); geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85 }));
  m.receiveShadow = true; m.castShadow = true;
  return m;
}

// Thailand as a flat landmass (only seen at the start of the flight)
export function buildThailand() {
  const g = new THREE.Group();
  for (const ring of GEO.thailand) {
    const shape = new THREE.Shape(ring.map(([lo, la]) => { const [x, z] = thaiXZ(lo, la); return new THREE.Vector2(x, -z); }));
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.6, bevelEnabled: false });
    geo.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: '#6f9a4c', roughness: 0.95 }));
    m.position.y = -0.55;
    m.receiveShadow = true;
    g.add(m);
  }
  return g;
}

// Neighbouring coasts as flat land, so the map does not end at the terrain grid's edge
export function buildNear() {
  const shapes = GEO.near.map((ring) => new THREE.Shape(ring.map(([lo, la]) => new THREE.Vector2(toX(lo), -toZ(la)))));
  const geo = new THREE.ShapeGeometry(shapes, 2);
  geo.rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: '#7a9b55', roughness: 1 }));
  m.position.y = -0.06;
  m.receiveShadow = true;
  return m;
}

export function lakeMeshes(heightAt) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: '#3f7fa6', roughness: 0.08, metalness: 0.5 });
  for (const L of LAKES) {
    const geo = new THREE.CircleGeometry(1, 48);
    geo.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(geo, mat);
    m.scale.set(L.a * 1.04, 1, L.b * 1.04);
    m.rotation.y = L.rot;
    m.position.set(toX(L.lon), L.level * VERT + 0.01, toZ(L.lat));
    m.userData.lake = L.name;
    g.add(m);
  }
  return g;
}
