// Bakes Narita (RJAA) from OpenStreetMap into src/nrt-osm.json for the main story's landing scene:
// runways, taxiways, aprons, terminal and other airport buildings, as [lon, lat] rings and lines.
// Data © OpenStreetMap contributors (ODbL). Run: node scripts/build-nrt.mjs
import { writeFileSync } from 'node:fs';
import { tile, ways } from './osm-tiles.mjs';

const BOX = { s: 35.735, w: 140.355, n: 35.81, e: 140.415 }, STEP = 0.025;
for (let lat = BOX.s; lat < BOX.n - 1e-6; lat += STEP) for (let lon = BOX.w; lon < BOX.e - 1e-6; lon += STEP) { await tile(lon, lat, Math.min(lon + STEP, BOX.e), Math.min(lat + STEP, BOX.n)); process.stdout.write('.'); }
const r6 = (v) => Math.round(v * 1e6) / 1e6, pts = (w) => w.geometry.map((q) => [r6(q.lon), r6(q.lat)]);
const inBox = (w) => w.geometry.some((q) => q.lat > BOX.s && q.lat < BOX.n && q.lon > BOX.w && q.lon < BOX.e);
const out = { runways: [], taxiways: [], aprons: [], buildings: [] };
for (const w of ways.values()) {
  if (w.geometry.length < 2 || !inBox(w)) continue;
  const t = w.tags, k = t.aeroway;
  if (k === 'runway') out.runways.push({ ref: t.ref, w: +t.width || 60, p: pts(w) });
  else if (k === 'taxiway') out.taxiways.push({ ref: t.ref, p: pts(w) });
  else if (k === 'apron') out.aprons.push(pts(w));
  else if (k === 'terminal' || k === 'hangar' || (t.building && (k || /airport|terminal|hangar|transportation|office|hotel|parking|warehouse/.test(t.building) || t.name))) {
    const p = pts(w), xs = p.map((q) => q[0]), ys = p.map((q) => q[1]);
    if ((Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys)) < 4e-7 && k !== 'terminal') continue; // skip small sheds
    out.buildings.push({ k: k || t.building, name: t['name:en'] || t.name, h: +t.height || (t['building:levels'] ? +t['building:levels'] * 4 : undefined), p });
  }
}
writeFileSync('src/nrt-osm.json', JSON.stringify(out));
console.log('\nrunways', out.runways.map((r) => r.ref).join(' '), '| taxiways', out.taxiways.length, '| aprons', out.aprons.length, '| buildings', out.buildings.length);
console.log('names', [...new Set(out.buildings.map((b) => b.name).filter(Boolean))].slice(0, 30).join(' | '));
