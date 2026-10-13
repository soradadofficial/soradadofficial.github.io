// Extracts simplified coastlines (Natural Earth via world-atlas, public domain)
// for Japan, nearby land and Thailand into src/geo-data.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { feature } from 'topojson-client';

const topo = JSON.parse(readFileSync('node_modules/world-atlas/countries-10m.json', 'utf8'));
const countries = feature(topo, topo.objects.countries).features;

function simplify(pts, tol) {
  if (pts.length < 4) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    let md = 0, mi = -1;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = pts[i];
      const dx = bx - ax, dy = by - ay;
      const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy || 1)));
      const d = Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
      if (d > md) { md = d; mi = i; }
    }
    if (md > tol && mi > 0) { keep[mi] = 1; stack.push([a, mi], [mi, b]); }
  }
  return pts.filter((_, i) => keep[i]).map(([x, y]) => [+x.toFixed(4), +y.toFixed(4)]);
}
function rings(f, bbox, tol, minPts = 4) {
  const g = f.geometry;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  const out = [];
  for (const poly of polys) {
    const outer = poly[0];
    const inBox = outer.some(([x, y]) => x >= bbox[0] && x <= bbox[2] && y >= bbox[1] && y <= bbox[3]);
    if (!inBox) continue;
    const s = simplify(outer, tol);
    if (s.length >= minPts) out.push(s);
  }
  return out;
}
const BOX = [92, 4, 152, 48];
const japan = countries.find((f) => f.id === '392');
const thailand = countries.find((f) => f.id === '764');
const near = countries.filter((f) => ['410', '408', '156', '643', '158', '704', '418', '116', '104', '608', '458'].includes(f.id)); // Korea S/N, China, Russia, Taiwan + Vietnam, Laos, Cambodia, Myanmar, Philippines, Malaysia under the real flight track
const data = {
  japan: rings(japan, BOX, 0.006),
  near: near.flatMap((f) => rings(f, BOX, 0.04, 8)),
  thailand: rings(thailand, [90, 0, 110, 25], 0.02, 6),
};
writeFileSync('src/geo-data.json', JSON.stringify(data));
console.log('japan rings', data.japan.length, 'pts', data.japan.reduce((s, r) => s + r.length, 0));
console.log('near rings', data.near.length, 'pts', data.near.reduce((s, r) => s + r.length, 0));
console.log('thai rings', data.thailand.length);
