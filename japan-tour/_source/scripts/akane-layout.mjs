// Writes blender/akane_layout.json from src/akane-plan.js, so the Blender tower uses the same
// footprint, storeys and room bays as the page. Run: node scripts/akane-layout.mjs
import { writeFileSync } from 'node:fs';
import { RING, CELLS, STOREYS, floorY, floorH, EAVE, TOP, GEO } from '../src/akane-plan.js';

const r = (v) => Math.round(v * 100) / 100;
const fins = [], seen = new Set();
for (const c of CELLS) if (!c.core) for (const p of [c.poly[0], c.poly[1]]) {
  const key = `${Math.round(p.x * 2)},${Math.round(p.z * 2)}`; if (seen.has(key)) continue; seen.add(key);
  fins.push([r(p.x), r(p.z), r(c.n.x), r(c.n.z)]);
}
const floors = STOREYS.filter((k) => k > 0).map((k) => [k, r(floorY(k)), floorH(k)]);
writeFileSync(new URL('../blender/akane_layout.json', import.meta.url), JSON.stringify({ ring: RING.map((p) => [p.x, p.z]), porch: GEO.porch, fins, floors, eave: EAVE, top: TOP }));
console.log('fins', fins.length, 'floors', floors.length);
