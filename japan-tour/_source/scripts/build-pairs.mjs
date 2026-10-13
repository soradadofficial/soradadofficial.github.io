// Bakes real driving routes between every pair of tour stops and arrival airports into
// src/pairs.json, for the tour builder and its route simulation.
// Data © OpenStreetMap contributors (ODbL), routed by the public OSRM demo server.
// Hokkaido has no road link to the other islands worth driving on a tour: those legs are
// left out and the site shows them as a domestic flight. Run: node scripts/build-pairs.mjs
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { AIRPORTS, ARRIVALS, PLACES } from '../src/data.js';

const nodes = [...PLACES.map((p) => ({ id: p.id, lon: p.lon, lat: p.lat, hokkaido: p.region === 'hokkaido' })), ...ARRIVALS.map((c) => ({ id: c, lon: AIRPORTS[c].lon, lat: AIRPORTS[c].lat, hokkaido: c === 'CTS' }))];
function simplify(pts, tol) {
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
  return pts.filter((_, i) => keep[i]).map(([x, y]) => [+x.toFixed(3), +y.toFixed(3)]);
}
const out = existsSync('src/pairs.json') ? JSON.parse(readFileSync('src/pairs.json', 'utf8')) : {};
let n = 0;
for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
  const a = nodes[i], b = nodes[j], key = `${a.id}|${b.id}`;
  if (a.hokkaido !== b.hokkaido || out[key]) continue;
  try {
    const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=simplified&geometries=geojson`, { headers: { 'User-Agent': 'tour-test-demo build script' } });
    const j2 = await r.json();
    if (j2.code !== 'Ok') throw new Error(j2.code);
    out[key] = { km: Math.round(j2.routes[0].distance / 1000), pts: simplify(j2.routes[0].geometry.coordinates, 0.006) };
    n++;
    if (n % 10 === 0) { console.log(n, key, out[key].km, 'km', out[key].pts.length, 'pts'); writeFileSync('src/pairs.json', JSON.stringify(out)); }
  } catch (e) { console.log('skip', key, e.message); }
  await new Promise((s) => setTimeout(s, 1100));
}
writeFileSync('src/pairs.json', JSON.stringify(out));
console.log('pairs', Object.keys(out).length);
