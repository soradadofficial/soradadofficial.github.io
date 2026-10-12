// Bakes real route geometry into src/routes.json. Data © OpenStreetMap contributors (ODbL).
// Roads: driving routes between the tour stops from the public OSRM demo server.
// Rail: the Tokaido Shinkansen relation from the Overpass API.
// Run: node scripts/build-routes.mjs
import { writeFileSync, readFileSync } from 'node:fs';

const STOPS = { // lon, lat
  nrt: [140.3857, 35.7648], tokyo: [139.7454, 35.6586], hakone: [139.0256, 35.2010], kawa: [138.7687, 35.4983], nagoya: [136.8816, 35.1709],
  fushimi: [135.7727, 34.9671], nara: [135.8430, 34.6850], osaka: [135.5262, 34.6873], kix: [135.2440, 34.4320],
};
const SPUR = [STOPS.kawa, [138.7700, 35.5262]]; // round the lake to the hotel on the north shore

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
const out = railOnly ? JSON.parse(readFileSync('src/routes.json', 'utf8')) : { road: {}, stops: STOPS };
const names = Object.keys(STOPS);
for (let i = 0; i < names.length - 1 && !railOnly; i++) {
  const r = await drive([STOPS[names[i]], STOPS[names[i + 1]]]);
  out.road[`${names[i]}-${names[i + 1]}`] = simplify(r.geometry.coordinates, 0.0004);
  console.log(names[i], '->', names[i + 1], (r.distance / 1000).toFixed(0), 'km', out.road[`${names[i]}-${names[i + 1]}`].length, 'pts');
  await new Promise((s) => setTimeout(s, 1200));
}
if (!railOnly) out.spur = simplify((await drive(SPUR)).geometry.coordinates, 0.0002);
console.log('spur', out.spur.length, 'pts');

// ---- Tokaido Shinkansen ----
try {
  const q = '[out:json][timeout:90];relation["route"="train"]["name"~"東海道新幹線"];out geom;';
  const r = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: 'data=' + encodeURIComponent(q), headers: { 'User-Agent': 'tour-test-demo build script', 'Content-Type': 'application/x-www-form-urlencoded' } });
  const txt = await r.text();
  if (txt[0] !== '{') throw new Error(txt.slice(0, 300).replace(/\s+/g, ' '));
  const j = JSON.parse(txt);
  const rel = j.elements.sort((a, b) => b.members.length - a.members.length)[0];
  const ways = rel.members.filter((m) => m.type === 'way' && m.geometry && m.role === '').map((m) => m.geometry.map((p) => [p.lon, p.lat]));
  // chain the member ways end to end, starting from the one nearest Tokyo station
  const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  let cur = [139.767, 35.681]; const line = []; const left = ways.slice();
  while (left.length) {
    let bi = -1, bd = Infinity, flip = false;
    left.forEach((w, i) => { const a = d2(w[0], cur), b = d2(w[w.length - 1], cur); if (a < bd) { bd = a; bi = i; flip = false; } if (b < bd) { bd = b; bi = i; flip = true; } });
    if (bd > 0.02 ** 2 && line.length) break; // gap: the rest is the other track or sidings
    const w = left.splice(bi, 1)[0]; if (flip) w.reverse();
    line.push(...w); cur = w[w.length - 1];
  }
  out.rail = simplify(line, 0.0004);
  console.log('rail', rel.tags.name, ways.length, 'ways ->', out.rail.length, 'pts, ends', out.rail[0], out.rail[out.rail.length - 1]);
} catch (e) { console.log('rail failed, keeping station spline:', e.message); }
writeFileSync('src/routes.json', JSON.stringify(out));
