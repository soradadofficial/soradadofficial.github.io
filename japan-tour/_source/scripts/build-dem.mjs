// Bakes real elevation into src/dem/*.png from AWS Terrain Tiles (Terrarium encoding;
// data: SRTM / GSI Japan and others, see https://github.com/tilezen/joerd/blob/master/docs/attribution.md).
// Each output is a lon/lat grid, metres packed as R*256+G. Run: node scripts/build-dem.mjs
import { PNG } from 'pngjs';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';

const REGIONS = [
  { name: 'japan', lon0: 128.6, lon1: 146.4, lat0: 30.6, lat1: 45.8, step: 0.025, zoom: 7, quant: 4 },
  { name: 'fuji', lon0: 138.45, lon1: 139.2, lat0: 35.08, lat1: 35.62, step: 0.002, zoom: 10, quant: 1 },
  { name: 'kyoto', lon0: 135.68, lon1: 135.9, lat0: 34.9, lat1: 35.05, step: 0.002, zoom: 10, quant: 1 },
];
mkdirSync('scripts/.tiles', { recursive: true });
mkdirSync('src/dem', { recursive: true });
const cache = new Map();
async function tile(z, x, y) {
  const key = `${z}_${x}_${y}`;
  if (cache.has(key)) return cache.get(key);
  const f = `scripts/.tiles/${key}.png`;
  if (!existsSync(f)) {
    const r = await fetch(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`);
    if (!r.ok) throw new Error(`tile ${key}: ${r.status}`);
    writeFileSync(f, Buffer.from(await r.arrayBuffer()));
  }
  const png = PNG.sync.read(readFileSync(f));
  cache.set(key, png);
  return png;
}
const px = (z, lon) => (lon + 180) / 360 * 256 * 2 ** z;
const py = (z, lat) => { const s = Math.sin(lat * Math.PI / 180); return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * 256 * 2 ** z; };
async function metres(z, lon, lat) { // bilinear in tile pixel space
  const fx = px(z, lon) - 0.5, fy = py(z, lat) - 0.5, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
  const s = async (x, y) => { const t = await tile(z, x >> 8, y >> 8), i = ((y & 255) * 256 + (x & 255)) * 4; return t.data[i] * 256 + t.data[i + 1] + t.data[i + 2] / 256 - 32768; };
  const a = await s(x0, y0), b = await s(x0 + 1, y0), c = await s(x0, y0 + 1), d = await s(x0 + 1, y0 + 1);
  return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty;
}
const meta = {};
for (const R of REGIONS) {
  const cols = Math.round((R.lon1 - R.lon0) / R.step) + 1, rows = Math.round((R.lat1 - R.lat0) / R.step) + 1;
  const out = new PNG({ width: cols, height: rows, colorType: 2 });
  let max = 0;
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const m = await metres(R.zoom, R.lon0 + i * R.step, R.lat1 - j * R.step); // row 0 = north
    const v = Math.max(0, Math.round(m / R.quant) * R.quant);
    max = Math.max(max, v);
    const k = (j * cols + i) * 4;
    out.data[k] = v >> 8; out.data[k + 1] = v & 255; out.data[k + 2] = 0; out.data[k + 3] = 255;
  }
  const buf = PNG.sync.write(out, { colorType: 2, deflateLevel: 9 });
  writeFileSync(`src/dem/${R.name}.png`, buf);
  meta[R.name] = { lon0: R.lon0, lat1: R.lat1, step: R.step, cols, rows };
  console.log(R.name, cols, 'x', rows, (buf.length / 1024).toFixed(0) + ' KB', 'max', max, 'm');
}
writeFileSync('src/dem/meta.json', JSON.stringify(meta));
for (const [n, lon, lat] of [['kawaguchiko', 138.755, 35.515], ['ashi', 139.0, 35.215], ['biwa', 136.08, 35.27], ['yamanaka', 138.87, 35.415], ['fuji top', 138.7274, 35.3606]])
  console.log(n, (await metres(10, lon, lat)).toFixed(0), 'm');
