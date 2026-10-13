// Data and pure-logic checks. Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PNG } from 'pngjs';
import { AIRPORTS, distanceKm, flightFare } from '../src/data.js';

const meta = JSON.parse(readFileSync('src/dem/meta.json', 'utf8'));
const routes = JSON.parse(readFileSync('src/routes.json', 'utf8'));
const metres = (name, lon, lat) => {
  const g = meta[name], png = PNG.sync.read(readFileSync(`src/dem/${name}.png`));
  const i = Math.round((lon - g.lon0) / g.step), j = Math.round((g.lat1 - lat) / g.step), k = (j * png.width + i) * 4;
  return png.data[k] * 256 + png.data[k + 1];
};
const lengthKm = (pts) => pts.slice(1).reduce((s, p, i) => s + distanceKm({ lon: pts[i][0], lat: pts[i][1] }, { lon: p[0], lat: p[1] }), 0);

test('elevation: Fuji summit, lake levels and open sea', () => {
  const top = metres('fuji', 138.7274, 35.3606);
  assert.ok(top > 3600 && top < 3800, `Fuji summit ${top} m`);
  assert.ok(Math.abs(metres('fuji', 139.0, 35.215) - 719) < 15, 'Lake Ashi surface');
  assert.equal(metres('japan', 141.5, 33.0), 0, 'Pacific is sea level');
  assert.ok(metres('japan', 137.65, 36.3) > 1500, 'Japanese Alps are high');
});

test('distances and fares', () => {
  const d = distanceKm(AIRPORTS.BKK, AIRPORTS.NRT);
  assert.ok(d > 4500 && d < 4800, `BKK-NRT ${d} km`);
  assert.equal(distanceKm(AIRPORTS.NRT, AIRPORTS.NRT), 0);
  assert.ok(flightFare('BKK', 'NRT') > 0);
});

test('tour road: every leg joins the next and the total is plausible', () => {
  const legs = Object.values(routes.road);
  for (let i = 0; i < legs.length - 1; i++) {
    const a = legs[i][legs[i].length - 1], b = legs[i + 1][0];
    assert.ok(Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.01, `leg ${i} joins leg ${i + 1}`);
  }
  const total = legs.reduce((s, l) => s + lengthKm(l), 0);
  assert.ok(total > 650 && total < 850, `road ${total.toFixed(0)} km`);
});

test('Shinkansen track runs Tokyo to Shin-Osaka without jumps', () => {
  const r = routes.rail;
  assert.ok(Math.hypot(r[0][0] - 139.767, r[0][1] - 35.681) < 0.02, 'starts at Tokyo');
  assert.ok(Math.hypot(r.at(-1)[0] - 135.5, r.at(-1)[1] - 34.733) < 0.02, 'ends at Shin-Osaka');
  for (let i = 1; i < r.length; i++) assert.ok(Math.hypot(r[i][0] - r[i - 1][0], r[i][1] - r[i - 1][1]) < 0.2, `no gap at ${i}`);
  const km = lengthKm(r);
  assert.ok(km > 480 && km < 540, `rail ${km.toFixed(0)} km (real line: 515 km)`);
});
