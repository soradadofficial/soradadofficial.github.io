// Akane Sky Tokyo layout: real footprint, storeys and room counts stay consistent.
import test from 'node:test';
import assert from 'node:assert/strict';
import { RING, CELLS, ATRIUM, STOREYS, floorY, floorH, unitsOn, floorPlan, findUnit, viewsFor, towerView, TYPES, EAVE, GEO } from '../src/akane-plan.js';

const area = (pts) => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p.x * q.z - q.x * p.z; }, 0)) / 2;

test('footprint is the OSM outline (about 1,772 m²) and the storeys reach the 99.4 m eave', () => {
  assert.ok(Math.abs(area(RING) - 1772) < 5);
  assert.equal(STOREYS.length, 35);
  assert.ok(Math.abs(floorY(33) + floorH(33) - EAVE) < 0.01);
  for (let k = 2; k <= 33; k++) assert.ok(Math.abs(floorY(k) - floorY(k - 1) - floorH(k - 1)) < 1e-9);
});

test('cells, corridor and atrium fill the plate without overlap', () => {
  const sum = CELLS.reduce((s, c) => s + c.area, 0) + area(ATRIUM);
  assert.ok(sum < area(RING) && sum > area(RING) * 0.85, `cells+atrium ${sum}`);
});

test('room counts per floor follow the real bands (about 22 / 21 / 17-20)', () => {
  for (let k = 3; k <= 18; k++) assert.equal(unitsOn(k).length, 22);
  for (let k = 19; k <= 28; k++) assert.equal(unitsOn(k).length, 21);
  for (let k = 29; k <= 31; k++) assert.equal(unitsOn(k).length, 20);
  assert.equal(unitsOn(32).length, 5);
  for (const k of [-2, -1, 1, 33]) assert.equal(unitsOn(k).length, 0);
});

test('every room type sits only inside its real floor range', () => {
  for (let k = 2; k <= 32; k++) for (const u of unitsOn(k)) {
    const [a, b = a] = TYPES[u.type].floors.split('–').map(Number);
    assert.ok(k >= a && k <= b, `${u.type} on ${k}F, real ${TYPES[u.type].floors}`);
  }
});

test('no cell is used twice on a floor, and unit numbers resolve', () => {
  for (const k of STOREYS) { const seen = new Set(); for (const e of floorPlan(k)) for (const c of e.cells) { assert.ok(!seen.has(c), `${k}F cell ${c}`); seen.add(c); } }
  assert.equal(findUnit(2501).type, 'pano-corner');
});

test('views come from real bearings: north rooms see Tokyo Tower, south-west rooms see Fuji', () => {
  assert.equal(GEO.far[0].deg, 337);
  assert.ok(towerView(8) && towerView(307) && !towerView(127));
  assert.ok(viewsFor(249).some((v) => v.name.includes('ฟูจิ')));
});

test('walk-through spaces: four scenes on their real floors, each with views and a model', async () => {
  const { readFileSync, existsSync } = await import('node:fs');
  const meta = JSON.parse(readFileSync(new URL('../public/models/akane-spaces.json', import.meta.url)));
  assert.deepEqual(Object.fromEntries(Object.entries(meta).map(([id, m]) => [id, m.k])), { lobby: 1, spa: -2, lounge: 32, sky: 33 });
  for (const [id, m] of Object.entries(meta)) {
    assert.ok(existsSync(new URL(`../public/models/akane-${id}.glb`, import.meta.url)), id);
    assert.ok(Object.keys(m.views).length >= 3, id);
    for (const v of Object.values(m.views)) assert.ok(v.eye.length === 3 && v.look.length === 3);
  }
  assert.ok(meta.sky.seats >= 73 && meta.sky.seats <= 84, 'sky bar seats near the real 84');
});
