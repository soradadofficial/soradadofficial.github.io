// Bakes the real map around Suvarnabhumi into src/bkk-osm.json for the airport page:
// roads in use (motorways to service roads), runways/taxiways/aprons, building footprints,
// railways and water. Data © OpenStreetMap contributors (ODbL), via the OpenStreetMap API.
// Coordinates are metres in the terminal's own axes: [east', north'] from the centre of the
// east-west concourse, turned by the runway heading (014.41 deg true). Run: node scripts/build-bkk.mjs
import { writeFileSync } from 'node:fs';

const C = { lat: 13.691475, lon: 100.750475 }, HDG = 14.41 * Math.PI / 180;
const MX = 111320 * Math.cos(C.lat * Math.PI / 180), MY = 110574;
const local = (lon, lat) => {
  const e = (lon - C.lon) * MX, n = (lat - C.lat) * MY;
  return [Math.round(e * Math.cos(HDG) - n * Math.sin(HDG)), Math.round(n * Math.cos(HDG) + e * Math.sin(HDG))];
};
// The public Overpass mirrors time out too often, so this reads the OpenStreetMap API's own
// map call in small tiles (one request a second), splitting a tile that holds too many nodes.
const ways = new Map();
async function tile(w, s, e, n, depth = 0) {
  const r = await fetch(`https://api.openstreetmap.org/api/0.6/map.json?bbox=${w.toFixed(4)},${s.toFixed(4)},${e.toFixed(4)},${n.toFixed(4)}`, { headers: { 'User-Agent': 'tour-test-demo build script' }, signal: AbortSignal.timeout(120000) });
  if (r.status === 400 && depth < 3) { const mx = (w + e) / 2, my = (s + n) / 2; for (const [a, b, c, d] of [[w, s, mx, my], [mx, s, e, my], [w, my, mx, n], [mx, my, e, n]]) await tile(a, b, c, d, depth + 1); return; }
  if (!r.ok) throw new Error('OSM API ' + r.status);
  const nodes = new Map();
  const { elements } = await r.json();
  for (const el of elements) if (el.type === 'node') nodes.set(el.id, el);
  for (const el of elements) if (el.type === 'way' && el.tags && !ways.has(el.id)) ways.set(el.id, { tags: el.tags, geometry: el.nodes.map((id) => nodes.get(id)).filter(Boolean) });
  await new Promise((r) => setTimeout(r, 1000));
}
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop(); let md = 0, mi = -1;
    const [ax, ay] = pts[a], dx = pts[b][0] - ax, dy = pts[b][1] - ay, len = dx * dx + dy * dy || 1;
    for (let i = a + 1; i < b; i++) {
      const t = Math.max(0, Math.min(1, ((pts[i][0] - ax) * dx + (pts[i][1] - ay) * dy) / len));
      const d = Math.hypot(pts[i][0] - ax - t * dx, pts[i][1] - ay - t * dy);
      if (d > md) { md = d; mi = i; }
    }
    if (md > tol) { keep[mi] = 1; stack.push([a, mi], [mi, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const geom = (w, tol) => simplify(w.geometry.map((p) => local(p.lon, p.lat)), tol);
const len = (pts) => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
const BOX = { s: 13.615, w: 100.655, n: 13.765, e: 100.845 }, FIELD = { s: 13.640, w: 100.705, n: 13.725, e: 100.785 }, STEP = 0.03;
for (let lat = BOX.s; lat < BOX.n - 1e-6; lat += STEP) for (let lon = BOX.w; lon < BOX.e - 1e-6; lon += STEP) { await tile(lon, lat, Math.min(lon + STEP, BOX.e), Math.min(lat + STEP, BOX.n)); process.stdout.write('.'); }
const all = [...ways.values()].filter((w) => w.geometry.length > 1);
const inField = (w) => w.geometry.some((p) => p.lat > FIELD.s && p.lat < FIELD.n && p.lon > FIELD.w && p.lon < FIELD.e);
console.log(' ways', all.length);
const out = { centre: C, heading: 14.41, roads: [], aero: [], aprons: [], buildings: [], rail: [], water: [] };

const roads = all.filter((w) => /^(motorway|trunk|primary|secondary|tertiary)(_link)?$/.test(w.tags.highway) || (/^(service|unclassified)$/.test(w.tags.highway) && inField(w)));
for (const w of roads) {
  const k = w.tags.highway, minor = /service|unclassified|residential/.test(k);
  const pts = geom(w, minor ? 4 : 6);
  if (minor && len(pts) < 180) continue; // drop driveways and parking aisles
  out.roads.push({ k: k.replace('_link', '-l'), up: w.tags.bridge || +w.tags.layer > 0 ? 1 : 0, name: w.tags.name || w.tags['name:en'] || w.tags.ref || undefined, p: pts });
}
console.log('roads', out.roads.length);
const aero = all.filter((w) => w.tags.aeroway && inField(w));
for (const w of aero) {
  const k = w.tags.aeroway;
  if (k === 'runway' || k === 'taxiway' || k === 'taxilane') out.aero.push({ k, ref: w.tags.ref, w: +w.tags.width || undefined, p: geom(w, 3) });
  else if (k === 'apron') out.aprons.push(geom(w, 6));
  else if (k === 'terminal' || k === 'hangar') out.buildings.push({ k, name: w.tags['name:en'] || w.tags.name, h: +w.tags.height || undefined, lv: +w.tags['building:levels'] || undefined, p: geom(w, 3) });
}
console.log('aero', out.aero.length, 'aprons', out.aprons.length);
const bld = all.filter((w) => w.tags.building && inField(w));
for (const w of bld) {
  if (w.tags.aeroway) continue;
  const p = geom(w, 3), xs = p.map((q) => q[0]), ys = p.map((q) => q[1]);
  if ((Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys)) < 900) continue; // keep buildings of some size
  out.buildings.push({ k: w.tags.building, name: w.tags['name:en'] || w.tags.name, h: +w.tags.height || undefined, lv: +w.tags['building:levels'] || undefined, p });
}
console.log('buildings', out.buildings.length);
const misc = all.filter((w) => /^(rail|light_rail|subway)$/.test(w.tags.railway) || /^(canal|river)$/.test(w.tags.waterway) || (w.tags.natural === 'water' && inField(w)));
for (const w of misc) {
  if (w.tags.railway) out.rail.push({ up: w.tags.bridge ? 1 : 0, tun: w.tags.tunnel ? 1 : 0, name: w.tags['name:en'] || w.tags.name, p: geom(w, 6) });
  else if (w.tags.waterway) out.water.push({ line: 1, name: w.tags.name || undefined, p: geom(w, 8) });
  else { const p = geom(w, 6); if (len(p) > 300) out.water.push({ p }); }
}
console.log('rail', out.rail.length, 'water', out.water.length);
writeFileSync('src/bkk-osm.json', JSON.stringify(out));
console.log('names', [...new Set(out.buildings.map((b) => b.name).filter(Boolean))].slice(0, 40).join(' | '));
