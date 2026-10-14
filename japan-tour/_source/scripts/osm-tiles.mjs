// The public Overpass mirrors time out too often, so this reads the OpenStreetMap API's own
// map call in small tiles (one request a second), splitting a tile that holds too many nodes.
export const ways = new Map();
export async function tile(w, s, e, n, depth = 0) {
  const r = await fetch(`https://api.openstreetmap.org/api/0.6/map.json?bbox=${w.toFixed(4)},${s.toFixed(4)},${e.toFixed(4)},${n.toFixed(4)}`, { headers: { 'User-Agent': 'tour-test-demo build script' }, signal: AbortSignal.timeout(120000) });
  if (r.status === 400 && depth < 3) { const mx = (w + e) / 2, my = (s + n) / 2; for (const [a, b, c, d] of [[w, s, mx, my], [mx, s, e, my], [w, my, mx, n], [mx, my, e, n]]) await tile(a, b, c, d, depth + 1); return; }
  if (!r.ok) throw new Error('OSM API ' + r.status);
  const nodes = new Map();
  const { elements } = await r.json();
  for (const el of elements) if (el.type === 'node') nodes.set(el.id, el);
  for (const el of elements) if (el.type === 'way' && el.tags && !ways.has(el.id)) ways.set(el.id, { tags: el.tags, geometry: el.nodes.map((id) => nodes.get(id)).filter(Boolean) });
  await new Promise((r) => setTimeout(r, 1000));
}
