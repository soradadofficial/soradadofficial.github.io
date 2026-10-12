import * as THREE from 'three';
import { LD } from './fx.js';

// Volumetric-looking clouds built from many soft billboard puffs.
// - cumulus: clusters of puffs with a flat base, lit tops and shaded bottoms
// - sea: a broad flat layer of puffs under the cruise altitude
// - cirrus: a few large thin streaky sheets high above
// Puffs fade out as the camera approaches so it never sits inside a blob,
// and the instances are depth-sorted back to front every few frames.

// ---------- procedural noise ----------
function hash(x, y, s) {
  let h = (x * 374761393 + y * 668265263 + s * 982451653) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function vnoise(x, y, s) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi, s), b = hash(xi + 1, yi, s), c = hash(xi, yi + 1, s), d = hash(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, s, oct = 4) {
  let f = 0, amp = 0.5, fr = 1;
  for (let i = 0; i < oct; i++) { f += amp * vnoise(x * fr, y * fr, s + i * 17); amp *= 0.5; fr *= 2.03; }
  return f;
}
const sstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// 2x2 atlas of puffs. R = lighting (lit from above), A = density.
function puffAtlas() {
  const N = 128, S = N * 2;
  const c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d');
  const img = g.createImageData(S, S);
  for (let cell = 0; cell < 4; cell++) {
    const ox = (cell % 2) * N, oy = Math.floor(cell / 2) * N;
    const blobs = [];
    const nb = 9 + cell * 2;
    for (let i = 0; i < nb; i++) {
      const a = (i / nb) * Math.PI * 2 + hash(i, cell, 3) * 0.8;
      const rr = 0.08 + hash(i, cell, 5) * 0.24;
      blobs.push({ x: 0.5 + Math.cos(a) * rr, y: 0.55 + Math.sin(a) * rr * 0.55 - 0.05, r: 0.1 + hash(i, cell, 7) * 0.13 });
    }
    blobs.push({ x: 0.5, y: 0.5, r: 0.3 });
    const dens = new Float32Array(N * N);
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const x = (i + 0.5) / N, y = (j + 0.5) / N;
      let d = 0;
      for (const b of blobs) { const q = ((x - b.x) ** 2 + (y - b.y) ** 2) / (b.r * b.r); d += Math.exp(-q * 2.2); }
      const n = fbm(x * 6, y * 6, cell * 31, 5);
      d = d * (0.5 + 1.0 * n) + (fbm(x * 15, y * 15, cell * 53 + 7, 3) - 0.5) * 0.45; // cauliflower billows
      const edge = sstep(0.5, 0.36, Math.hypot(x - 0.5, y - 0.5)); // keep inside the quad
      // flatter base
      const base = sstep(0.86, 0.7, y);
      dens[j * N + i] = d * edge * base;
    }
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const d = dens[j * N + i];
      // light: how much density lies above this pixel (toward the sun at the top)
      let above = 0;
      for (let k = 1; k <= 10; k++) { const jj = j - k * 3; if (jj >= 0) above += dens[jj * N + i]; }
      const lit = Math.min(1, Math.max(0, 1.08 - above * 0.14 + (0.5 - j / N) * 0.35));
      const a = sstep(0.3, 0.72, d) * 0.97;
      const p = ((oy + j) * S + ox + i) * 4;
      img.data[p] = lit * 255; img.data[p + 1] = lit * 255; img.data[p + 2] = lit * 255; img.data[p + 3] = a * 255;
    }
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

function cirrusTexture() {
  const W = 256, H = 128;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  const img = g.createImageData(W, H);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const x = i / W, y = j / H;
    const warp = fbm(x * 3, y * 3, 9, 3) * 0.6;
    const streak = fbm(x * 2.5 + warp, y * 22 + warp * 6, 41, 5);
    const mask = sstep(0.5, 0.2, Math.abs(x - 0.5)) * sstep(0.5, 0.25, Math.abs(y - 0.5));
    const a = sstep(0.42, 0.85, streak) * mask;
    const p = (j * W + i) * 4;
    img.data[p] = img.data[p + 1] = img.data[p + 2] = 255; img.data[p + 3] = a * 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

const puffVert = `
${LD.vp}
#include <fog_pars_vertex>
attribute vec3 iPos;
attribute vec4 iData;   // size, squash, shade, rotation
attribute float iAlpha;
uniform vec3 uSunDir;
varying vec2 vUv, vQ;
varying vec3 vSunV;
varying float vShade, vAlpha, vSun;
void main() {
  vQ = position.xy * 2.0;
  vSunV = normalize((viewMatrix * vec4(normalize(uSunDir), 0.0)).xyz);
  vec4 mv = modelViewMatrix * vec4(iPos, 1.0);
  float size = iData.x;
  float rot = (fract(iData.w) - 0.5) * 0.7;
  float c = cos(rot), s = sin(rot);
  vec2 q = position.xy;
  q = vec2(q.x * c - q.y * s, q.x * s + q.y * c);
  mv.xy += q * vec2(size, size * iData.y);
  float dist = -mv.z;
  // fade when the camera gets close so it never sits inside a puff
  float nearF = smoothstep(size * 0.9, size * 2.6, dist);
  vAlpha = iAlpha * nearF;
  vShade = iData.z;
  float cell = floor(iData.w);
  vUv = (uv + vec2(mod(cell, 2.0), floor(cell / 2.0))) * 0.5;
  vec3 wdir = normalize(iPos - cameraPosition);
  vSun = pow(max(dot(wdir, normalize(uSunDir)), 0.0), 6.0);
  vec4 mvPosition = mv;
  gl_Position = projectionMatrix * mv;
  vFogDepth = dist;
  ${LD.v}
}`;
const puffFrag = `
${LD.fp}
#include <common>
#include <fog_pars_fragment>
uniform sampler2D uTex;
uniform vec3 uLit, uShadow, uSun;
uniform float uOpacity;
varying vec2 vUv, vQ;
varying vec3 vSunV;
varying float vShade, vAlpha, vSun;
void main() {
  vec4 t = texture2D(uTex, vUv);
  float a = t.a * vAlpha * uOpacity;
  if (a < 0.004) discard;
  vec3 n = normalize(vec3(vQ, sqrt(max(0.05, 1.0 - dot(vQ, vQ)))));
  float sph = clamp(dot(n, vSunV) * 0.5 + 0.5, 0.0, 1.0);
  float lit = clamp(t.r * 0.55 + sph * 0.4 + vShade * 0.5 - 0.32, 0.0, 1.0);
  lit = lit * lit * (3.0 - 2.0 * lit);
  vec3 col = mix(uShadow, uLit, lit);
  // silver lining when looking toward the sun: thin edges glow
  col += uSun * vSun * (1.0 - t.a) * 0.5;
  gl_FragColor = vec4(col, a);
  ${LD.f}
  #include <fog_fragment>
}`;

const cirrusVert = `
${LD.vp}
#include <fog_pars_vertex>
varying vec2 vUv;
varying float vNear;
uniform float uNear;
void main() {
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vNear = smoothstep(uNear * 0.3, uNear, abs(wp.y - cameraPosition.y));
  gl_Position = projectionMatrix * mv;
  vFogDepth = -mv.z;
  ${LD.v}
}`;
const cirrusFrag = `
${LD.fp}
#include <common>
#include <fog_pars_fragment>
uniform sampler2D uTex;
uniform vec3 uLit;
uniform float uOpacity;
varying vec2 vUv;
varying float vNear;
void main() {
  float a = texture2D(uTex, vUv).a * uOpacity * vNear;
  if (a < 0.003) discard;
  gl_FragColor = vec4(uLit, a);
  ${LD.f}
  #include <fog_fragment>
}`;

// spec: { cumulus: [{min, max, count, size:[a,b], puffs:[a,b]}], sea: [{center, halfW, halfL, dir, y, count, size}], cirrus: [{min,max,count,size}] }
export function createCloudField(spec, groundAt = () => 0) {
  const group = new THREE.Group();
  const puffs = [];
  const rnd = (() => { let s = 1234567; return () => ((s = Math.imul(s ^ (s >>> 15), 2246822507) + 0x9e3779b9 | 0) >>> 0) / 4294967296; })();
  const R = (a, b) => a + rnd() * (b - a);

  for (const r of spec.cumulus || []) {
    for (let c = 0; c < r.count; c++) {
      const cx = R(r.min[0], r.max[0]), cz = R(r.min[2], r.max[2]);
      const size = R(r.size[0], r.size[1]);
      let base = R(r.min[1], r.max[1]);
      // keep the base clear of terrain under the cluster footprint
      let gmax = -1e9;
      for (let k = 0; k < 9; k++) gmax = Math.max(gmax, groundAt(cx + (k % 3 - 1) * size, cz + (Math.floor(k / 3) - 1) * size));
      base = Math.max(base, gmax + size * 0.5 + 0.4);
      const n = Math.round(R(r.puffs[0], r.puffs[1]));
      const op = r.opacity ?? 1;
      for (let i = 0; i < n; i++) {
        const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd());
        const h = Math.pow(rnd(), 1.4) * (1 - rr * 0.55);
        const ps = size * R(0.6, 0.95) * (1 - rr * 0.35); // big enough to overlap into one mass
        puffs.push({
          p: new THREE.Vector3(cx + Math.cos(a) * rr * size * 1.1, base + h * size * 0.7 + ps * 0.3, cz + Math.sin(a) * rr * size * 0.8),
          size: ps, squash: R(0.75, 0.95), shade: Math.min(1, h * 1.3 + 0.1), rot: Math.floor(rnd() * 4) + R(0.1, 0.9), alpha: op * R(0.75, 1),
        });
      }
    }
  }
  for (const s of spec.sea || []) {
    const dir = s.dir.clone().setY(0).normalize(), side = new THREE.Vector3(-dir.z, 0, dir.x);
    for (let i = 0; i < s.count * 0.55; i++) {
      const u = R(-1, 1), v = R(-1, 1);
      const taper = s.taper ? s.taper(u) : 1;
      if (rnd() > taper) continue;
      const edge = 1 - Math.pow(Math.abs(v), 6);
      if (rnd() > edge) continue;
      const p = s.center.clone().addScaledVector(dir, u * s.halfL).addScaledVector(side, v * s.halfW);
      p.y = s.y + R(-1, 1) * s.thick;
      const size = R(s.size[0], s.size[1]), al = (s.opacity ?? 0.95) * R(0.8, 1);
      puffs.push({ p, size, squash: R(0.5, 0.65), shade: 0.3, rot: Math.floor(rnd() * 4) + R(0.1, 0.9), alpha: al });
      const kids = 2 + Math.floor(rnd() * 3);
      for (let k = 0; k < kids; k++) {
        const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * size * 0.42, ks = size * R(0.3, 0.55), lift = R(0.12, 0.4);
        puffs.push({ p: new THREE.Vector3(p.x + Math.cos(a) * rr, p.y + lift * size, p.z + Math.sin(a) * rr), size: ks, squash: R(0.75, 0.95), shade: Math.min(1, 0.55 + lift * 1.2), rot: Math.floor(rnd() * 4) + R(0.1, 0.9), alpha: al });
      }
    }
  }

  const N = puffs.length;
  const quad = new THREE.PlaneGeometry(1, 1);
  const geo = new THREE.InstancedBufferGeometry();
  geo.index = quad.index;
  geo.setAttribute('position', quad.attributes.position);
  geo.setAttribute('uv', quad.attributes.uv);
  const aPos = new Float32Array(N * 3), aData = new Float32Array(N * 4), aAlpha = new Float32Array(N);
  geo.setAttribute('iPos', new THREE.InstancedBufferAttribute(aPos, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('iData', new THREE.InstancedBufferAttribute(aData, 4).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('iAlpha', new THREE.InstancedBufferAttribute(aAlpha, 1).setUsage(THREE.DynamicDrawUsage));
  geo.instanceCount = N;
  const uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
    uTex: { value: puffAtlas() }, uLit: { value: new THREE.Color('#ffffff') }, uShadow: { value: new THREE.Color('#9aa8bd') },
    uSun: { value: new THREE.Color('#ffd9a8') }, uSunDir: { value: new THREE.Vector3(0, 1, 0) }, uOpacity: { value: 1 },
  }]);
  const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: puffVert, fragmentShader: puffFrag, transparent: true, depthWrite: false, fog: true });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = 5;
  group.add(mesh);

  // ---------- cirrus ----------
  const cirrusMats = [];
  const ctex = cirrusTexture();
  for (const r of spec.cirrus || []) {
    for (let i = 0; i < r.count; i++) {
      const m = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uTex: { value: ctex }, uLit: { value: new THREE.Color('#fff') }, uOpacity: { value: r.opacity ?? 0.4 }, uNear: { value: 12 } }]),
        vertexShader: cirrusVert, fragmentShader: cirrusFrag, transparent: true, depthWrite: false, fog: true, side: THREE.DoubleSide,
      });
      m.userData.base = r.opacity ?? 0.4;
      cirrusMats.push(m);
      const sz = R(r.size[0], r.size[1]);
      const q = new THREE.Mesh(new THREE.PlaneGeometry(sz * 2.2, sz).rotateX(-Math.PI / 2), m);
      q.position.set(R(r.min[0], r.max[0]), R(r.min[1], r.max[1]), R(r.min[2], r.max[2]));
      q.rotation.y = R(-0.5, 0.5) + 0.6;
      q.renderOrder = 4;
      group.add(q);
    }
  }

  // ---------- sorting ----------
  const order = new Uint32Array(N).map((_, i) => i);
  const dist = new Float32Array(N);
  const last = new THREE.Vector3(1e9, 0, 0);
  let frame = 0;
  function writeSorted(cam) {
    for (let i = 0; i < N; i++) dist[i] = puffs[i].p.distanceToSquared(cam);
    order.sort((a, b) => dist[b] - dist[a]);
    for (let k = 0; k < N; k++) {
      const q = puffs[order[k]];
      aPos[k * 3] = q.p.x; aPos[k * 3 + 1] = q.p.y; aPos[k * 3 + 2] = q.p.z;
      aData[k * 4] = q.size; aData[k * 4 + 1] = q.squash; aData[k * 4 + 2] = q.shade; aData[k * 4 + 3] = q.rot;
      aAlpha[k] = q.alpha;
    }
    geo.attributes.iPos.needsUpdate = geo.attributes.iData.needsUpdate = geo.attributes.iAlpha.needsUpdate = true;
  }

  const tmp = new THREE.Color();
  group.userData = {
    count: N,
    setEnv(e) {
      // lit side: cloud tint pushed toward the sun colour; shadow: cool fog-sky blend
      uniforms.uLit.value.copy(e.cloud).lerp(e.sun, 0.25 * (1 - e.night)).multiplyScalar(0.9);
      tmp.copy(e.fog).lerp(e.top, 0.45).multiplyScalar(0.68 - e.night * 0.2);
      uniforms.uShadow.value.copy(tmp).lerp(e.cloud, 0.25);
      uniforms.uSun.value.copy(e.sun).multiplyScalar(0.55 * Math.min(1.2, e.sunI / 2) * (1 - e.night * 0.85));
      uniforms.uSunDir.value.copy(e.sunDir);
      uniforms.uOpacity.value = 1 - e.night * 0.25;
      for (const m of cirrusMats) { m.uniforms.uLit.value.copy(uniforms.uLit.value).lerp(e.sun, 0.3 * (1 - e.night)); m.uniforms.uOpacity.value = m.userData.base * (1 - e.night * 0.5); }
    },
    update(cam) {
      frame++;
      if (last.distanceToSquared(cam) > 0.0004 || frame % 30 === 0) {
        if (frame % 3 === 0 || last.distanceToSquared(cam) > 25) { writeSorted(cam); last.copy(cam); }
      }
    },
  };
  writeSorted(new THREE.Vector3());
  return group;
}
