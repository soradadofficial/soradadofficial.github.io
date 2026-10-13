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

test('tower floors: units fill every bay once on both sides, with unique room numbers', async () => {
  const { STAYS } = await import('../src/data.js'), { unitsOn } = await import('../src/stays.js');
  for (const [id, tower] of [['tokyo', { n: 30, bays: 14, first: 3 }], ['osaka', { n: 17, bays: 12, first: 3 }]]) {
    const stay = STAYS.find((s) => s.id === id), seen = new Set();
    for (let k = 0; k < tower.n; k++) {
      const units = unitsOn(stay, tower, k);
      for (const side of [-1, 1]) {
        const row = units.filter((u) => u.side === side);
        assert.equal(row.reduce((n, u) => n + u.bays, 0), tower.bays, `${id} floor ${k} side ${side} fills the facade`);
        row.reduce((next, u) => { assert.equal(u.bay, next, `${id} floor ${k}: no gap or overlap`); return next + u.bays; }, 0);
      }
      for (const u of units) { assert.ok(u.room, 'every unit has a room type'); assert.ok(!seen.has(u.no), `room number ${u.no} is unique`); seen.add(u.no); }
    }
  }
});
