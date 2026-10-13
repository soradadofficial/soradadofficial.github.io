// Bakes real route geometry into src/routes.json. Data © OpenStreetMap contributors (ODbL).
// Roads: driving routes between the tour stops from the public OSRM demo server.
// Rail: the Tokaido Shinkansen relation from the Overpass API.
// Run: node scripts/build-routes.mjs
import { writeFileSync, readFileSync } from 'node:fs';

const STOPS = { // lon, lat. Points sit on the expressway or main road beside each stop, so the route does not dive into side streets and back
  nrt: [140.3857, 35.7648], tokyo: [139.7513, 35.6556], hakone: [139.0256, 35.2010], kawa: [138.7687, 35.4983], nagoya: [136.8000, 35.3000],
  fushimi: [135.7727, 34.9671], nara: [135.8430, 34.6850], osaka: [135.5262, 34.6873], kix: [135.2440, 34.4320],
};
const SPUR = [STOPS.kawa, [138.7700, 35.5262]]; // round the lake to the hotel on the north shore

// Drop out-and-back spurs and loops: where the route returns to within ~80 m of a point it
// passed less than 6 km of driving earlier, cut the excursion out.
function unloop(pts) {
  const out = [], KX = Math.cos(35 * Math.PI / 180);
  const d = (a, b) => Math.hypot((a[0] - b[0]) * KX, a[1] - b[1]) * 111;
  const run = [0];
  for (const p of pts) {
    let cut = -1;
    for (let i = out.length - 12; i >= 0 && run[out.length - 1] - run[i] < 6; i--) if (d(out[i], p) < 0.08) { cut = i; break; }
    if (cut >= 0) { out.length = cut + 1; run.length = cut + 1; }
    if (out.length) run.push(run[run.length - 1] + d(out[out.length - 1], p));
    out.push(p);
  }
  return out;
}
function simplify(pts, tol) { // Douglas-Peucker in degrees
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
  return pts.filter((_, i) => keep[i]).map(([x, y]) => [+x.toFixed(5), +y.toFixed(5)]);
}
async function drive(coords) {
  const url = `https://router.project-osrm.org/route/v1/driving/${coords.map((c) => c.join(',')).join(';')}?overview=full&geometries=geojson`;
  const r = await fetch(url, { headers: { 'User-Agent': 'tour-test-demo build script' } });
  const j = await r.json();
  if (j.code !== 'Ok') throw new Error('OSRM ' + j.code);
  return j.routes[0];
}
const railOnly = !!process.env.RAIL_ONLY;
const out = JSON.parse(readFileSync('src/routes.json', 'utf8')); // keep whatever is not rebuilt this run (ROAD_ONLY=1 / RAIL_ONLY=1)
if (!railOnly) { out.road = {}; out.stops = STOPS; }
const names = Object.keys(STOPS);
for (let i = 0; i < names.length - 1 && !railOnly; i++) {
  const r = await drive([STOPS[names[i]], STOPS[names[i + 1]]]);
  out.road[`${names[i]}-${names[i + 1]}`] = simplify(unloop(r.geometry.coordinates), 0.0012); // ~120 m: keeps the line of the road, drops hairpin jitter the map cannot show
  console.log(names[i], '->', names[i + 1], (r.distance / 1000).toFixed(0), 'km', out.road[`${names[i]}-${names[i + 1]}`].length, 'pts');
  await new Promise((s) => setTimeout(s, 1200));
}
if (!railOnly) out.spur = simplify(unloop((await drive(SPUR)).geometry.coordinates), 0.0006);
console.log('spur', out.spur.length, 'pts');

// ---- Tokaido Shinkansen ----
if (!process.env.ROAD_ONLY)
// All high-speed track pieces between Tokyo and Shin-Osaka (both tracks, thousands of short
// ways). Rather than stitching them, bin every track point by its position along the
// station-to-station guide line and average each bin: that yields the ordered centreline.
try {
  const STN = [[139.767, 35.681], [139.617, 35.507], [139.155, 35.256], [139.077, 35.104], [138.911, 35.126], [138.389, 34.972], [137.735, 34.704], [137.382, 34.763], [136.882, 35.171], [136.69, 35.316], [136.29, 35.315], [135.758, 34.985], [135.5, 34.733]];
  const ways = [];
  for (const b of [[34.6, 135.4, 35.5, 136.6], [34.6, 136.6, 35.5, 137.8], [34.6, 137.8, 35.5, 139.0], [34.9, 139.0, 35.8, 139.9]]) {
    const q = `[out:json][timeout:60];way["railway"="rail"]["highspeed"="yes"]["name"~"東海道新幹線"](${b.join(',')});out geom;`;
    let got = null;
    for (const host of ['https://overpass.private.coffee/api/interpreter', 'https://overpass-api.de/api/interpreter', 'https://maps.mail.ru/osm/tools/overpass/api/interpreter']) {
      try {
        const r = await fetch(host, { method: 'POST', body: 'data=' + encodeURIComponent(q), headers: { 'User-Agent': 'tour-test-demo build script', 'Content-Type': 'application/x-www-form-urlencoded' }, signal: AbortSignal.timeout(90000) });
        const t = await r.text();
        if (t[0] === '{') { got = JSON.parse(t).elements; break; }
      } catch { /* try the next mirror */ }
    }
    if (!got) throw new Error('no Overpass mirror answered for ' + b.join(','));
    ways.push(...got.filter((w) => !w.tags.service)); // skip depot and siding tracks
  }
  const KX = Math.cos(35.2 * Math.PI / 180), cum = [0];
  for (let i = 1; i < STN.length; i++) cum.push(cum[i - 1] + Math.hypot((STN[i][0] - STN[i - 1][0]) * KX, STN[i][1] - STN[i - 1][1]));
  const BIN = 0.004, bins = new Map(); // ~400 m
  const add = (lon, lat) => {
    let best = Infinity, at = 0;
    for (let i = 0; i < STN.length - 1; i++) {
      const ax = STN[i][0] * KX, ay = STN[i][1], dx = STN[i + 1][0] * KX - ax, dy = STN[i + 1][1] - ay;
      const t = Math.max(0, Math.min(1, ((lon * KX - ax) * dx + (lat - ay) * dy) / (dx * dx + dy * dy)));
      const d = Math.hypot(lon * KX - ax - t * dx, lat - ay - t * dy);
      if (d < best) { best = d; at = cum[i] + t * (cum[i + 1] - cum[i]); }
    }
    if (best > 0.12) return;
    const k = Math.round(at / BIN), e = bins.get(k) || [0, 0, 0];
    e[0] += lon; e[1] += lat; e[2]++; bins.set(k, e);
  };
  for (const w of ways) for (let i = 0; i < w.geometry.length - 1; i++) {
    const a = w.geometry[i], b = w.geometry[i + 1], n = Math.max(1, Math.ceil(Math.hypot((b.lon - a.lon) * KX, b.lat - a.lat) / 0.001));
    for (let k = 0; k <= n; k++) add(a.lon + (b.lon - a.lon) * k / n, a.lat + (b.lat - a.lat) * k / n);
  }
  const line = [...bins].sort((a, b) => a[0] - b[0]).map(([, e]) => [e[0] / e[2], e[1] / e[2]]);
  out.rail = simplify(line, 0.0004);
  console.log('rail', ways.length, 'ways ->', line.length, 'bins ->', out.rail.length, 'pts, ends', out.rail[0], out.rail[out.rail.length - 1]);
} catch (e) { console.log('rail failed, keeping what is baked:', e.message); }
writeFileSync('src/routes.json', JSON.stringify(out));
