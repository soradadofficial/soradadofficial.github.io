import * as THREE from 'three';

// Dense polyline with arc-length lookup. All routes (flight, road, rail) use it so
// positions are driven by real distances in km.
export class Path {
  constructor(points) {
    this.pts = points;
    this.cum = new Float32Array(points.length);
    for (let i = 1; i < points.length; i++) this.cum[i] = this.cum[i - 1] + points[i].distanceTo(points[i - 1]);
    this.length = this.cum[points.length - 1];
  }

  // Smooth XZ curve through control points, sampled every `step` km; y from yFn(x, z, i)
  static fromControl(ctrl, step, yFn, type = 'centripetal') {
    const flat = ctrl.map((p) => new THREE.Vector3(p.x, p.y ?? 0, p.z));
    const curve = new THREE.CatmullRomCurve3(flat, false, type);
    curve.arcLengthDivisions = Math.max(200, Math.ceil(curve.getLength() / step) * 2);
    const n = Math.max(2, Math.ceil(curve.getLength() / step));
    const pts = curve.getSpacedPoints(n);
    if (yFn) pts.forEach((p, i) => { p.y = yFn(p.x, p.z, p, i / n); });
    return new Path(pts);
  }

  index(d) {
    d = Math.min(this.length, Math.max(0, d));
    let lo = 0, hi = this.pts.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (this.cum[m] <= d) lo = m; else hi = m; }
    return lo;
  }

  at(d, out = new THREE.Vector3()) {
    d = Math.min(this.length, Math.max(0, d));
    const i = this.index(d);
    const j = Math.min(this.pts.length - 1, i + 1);
    const seg = this.cum[j] - this.cum[i] || 1;
    return out.copy(this.pts[i]).lerp(this.pts[j], (d - this.cum[i]) / seg);
  }

  tangent(d, out = new THREE.Vector3(), span = 0.15) {
    const a = this.at(Math.max(0, d - span), _a), b = this.at(Math.min(this.length, d + span), _b);
    out.subVectors(b, a);
    if (out.lengthSq() < 1e-12) out.set(1, 0, 0);
    return out.normalize();
  }

  // distance along the path of the sample closest to p (XZ)
  closest(p) {
    let best = 0, bd = Infinity;
    for (let i = 0; i < this.pts.length; i++) {
      const q = this.pts[i], dd = (q.x - p.x) ** 2 + (q.z - p.z) ** 2;
      if (dd < bd) { bd = dd; best = i; }
    }
    return this.cum[best];
  }

  // points between two distances, for drawing a progressive route
  slice(d0, d1, maxPts = 4000) {
    const out = [];
    const i0 = this.index(d0), i1 = this.index(d1);
    const stride = Math.max(1, Math.ceil((i1 - i0) / maxPts));
    out.push(this.at(d0));
    for (let i = i0 + 1; i <= i1; i += stride) out.push(this.pts[i].clone());
    out.push(this.at(d1));
    return out;
  }
}
const _a = new THREE.Vector3(), _b = new THREE.Vector3();

// Monotone cubic (PCHIP) through [t, value] keys: smooth speed, no overshoot, holds stay put.
export function monotone(keys) {
  const n = keys.length;
  const xs = keys.map((k) => k[0]), ys = keys.map((k) => k[1]);
  const d = [], m = new Array(n).fill(0);
  for (let i = 0; i < n - 1; i++) d.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] * d[i] <= 0) m[i] = 0;
    else { const w1 = 2 * (xs[i + 1] - xs[i]) + (xs[i] - xs[i - 1]), w2 = (xs[i + 1] - xs[i]) + 2 * (xs[i] - xs[i - 1]); m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]); }
  }
  return (x) => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    let i = 0;
    while (x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i], t = (x - xs[i]) / h, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1];
  };
}

// Piecewise-linear lookup over [t, value] keys
export function linear(keys) {
  return (x) => {
    if (x <= keys[0][0]) return keys[0][1];
    for (let i = 0; i < keys.length - 1; i++) {
      const [t0, v0] = keys[i], [t1, v1] = keys[i + 1];
      if (x <= t1) return v0 + (v1 - v0) * ((x - t0) / (t1 - t0 || 1));
    }
    return keys[keys.length - 1][1];
  };
}
