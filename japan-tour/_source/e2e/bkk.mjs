// End-to-end check of the airport page. Needs the dev server: npm run dev, then npm run test:e2e
// (URL=http://host:port to point elsewhere). Uses the installed Chrome.
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const URL = (process.env.URL || 'http://localhost:5173') + '/bkk.html?debug';
const ORDER = ['approach', 'rollout', 'taxiIn', 'park', 'push', 'taxiOut', 'takeoff', 'away'];
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 760 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__bkk && window.__bkk.planes.every((p) => p.veh.Tug), null, { timeout: 30000 });

  // choreography: step two full loops, every aircraft keeps its phase order and its distance from the others
  const frames = await page.evaluate(() => { const out = []; for (let t = 0; t < window.__bkk.cycle * 2; t += 0.5) out.push(window.__bkk.at(t)); return out; });
  const dep = await page.evaluate(() => window.__bkk.dep);
  const onStrip = (a) => Math.abs(a.z - dep.z) < 60 && Math.abs(a.x - dep.x) < dep.len / 2; // inside the 02R runway strip
  let closest = Infinity, where = '';
  frames.forEach((f, k) => {
    const rolling = f.find((a) => a.phase === 'takeoff' && a.y < 30), crossing = f.find((a) => a.phase === 'taxiIn' && onStrip(a));
    assert.ok(!(rolling && crossing), `${crossing?.no} crosses 02R while ${rolling?.no} is on its take-off roll, t=${k / 2}`);
    f.forEach((a, i) => {
      if (k) { const was = ORDER.indexOf(frames[k - 1][i].phase), now = ORDER.indexOf(a.phase); assert.ok(now === was || now === (was + 1) % ORDER.length, `${a.no}: ${frames[k - 1][i].phase} -> ${a.phase} at t=${k / 2}`); }
      for (const b of f.slice(i + 1)) {
        if (!a.shown || !b.shown || a.y > 30 || b.y > 30) continue; // both on the ground
        const d = Math.hypot(a.x - b.x, a.z - b.z);
        if (d < closest) { closest = d; where = `${a.no} (${a.phase}) / ${b.no} (${b.phase}) at t=${k / 2}`; }
      }
    });
  });
  console.log(`closest two aircraft on the ground: ${closest.toFixed(0)} m, ${where}`);
  assert.ok(closest >= 70, 'aircraft on the ground stay at least 70 m apart (centre to centre)');

  // early release: hurry a parked flight, the button greys out and the flight reaches pushback early
  await page.evaluate(() => { const b = window.__bkk, c = b.cycle; b.T = ((b.parkAt + 4 - b.planes[0].off) % c + c) % c; }); // flight 0 is 4 s into its stand time
  await page.click('[data-follow="0"]');
  await page.waitForFunction(() => window.__bkk.planes[0].phase === 'park' && !document.querySelector('#early').disabled, null, { timeout: 60000 });
  assert.equal(await page.textContent('#early'), 'ปล่อยเครื่องก่อนเวลา');
  await page.click('#early');
  assert.equal(await page.textContent('#early'), 'กำลังเร่งงาน…');
  assert.ok(await page.isDisabled('#early'));
  await page.waitForFunction(() => window.__bkk.planes[0].phase === 'push', null, { timeout: 15000 });
  assert.deepEqual(errors, [], 'no page errors or failed requests');

  // reduced motion: the simulation starts paused
  const calm = await browser.newContext({ reducedMotion: 'reduce' }), p2 = await calm.newPage();
  await p2.goto(URL, { waitUntil: 'load' });
  await p2.waitForFunction(() => window.__bkk, null, { timeout: 30000 });
  await p2.waitForTimeout(1500);
  assert.equal(await p2.evaluate(() => window.__bkk.T), 0);
  assert.equal(await p2.getAttribute('#play', 'aria-pressed'), 'false');
  console.log('airport page: all checks passed');
} finally { await browser.close(); }
