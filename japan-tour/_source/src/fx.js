import * as THREE from 'three';

// ---------- Environment presets (time of day) ----------
const C = (h) => new THREE.Color(h);
export const ENV = {
  dawn:   { top: C('#2a3768'), bottom: C('#f4b08c'), fog: C('#d9a596'), sun: C('#ffc89a'), sunI: 1.6, hemi: 0.75, night: 0.15, cloud: C('#ffd9c8'), sunDir: new THREE.Vector3(1, 0.18, -0.6) },
  day:    { top: C('#2f6fbf'), bottom: C('#bfe0f5'), fog: C('#bcd9ee'), sun: C('#fff6e8'), sunI: 2.4, hemi: 1.0, night: 0.0, cloud: C('#ffffff'), sunDir: new THREE.Vector3(0.4, 0.8, -0.4) },
  sunset: { top: C('#33296a'), bottom: C('#ff9663'), fog: C('#d98b78'), sun: C('#ffae70'), sunI: 2.0, hemi: 0.7, night: 0.2, cloud: C('#ffc2a1'), sunDir: new THREE.Vector3(-1, 0.16, 0.25) },
  golden: { top: C('#3f6aa8'), bottom: C('#ffd6a0'), fog: C('#e9cfa8'), sun: C('#ffcf8a'), sunI: 2.7, hemi: 0.85, night: 0.0, cloud: C('#fff1dc'), sunDir: new THREE.Vector3(-0.75, 0.32, 0.35) },
  dusk:   { top: C('#18204a'), bottom: C('#b87189'), fog: C('#5e4a6e'), sun: C('#ff9b8a'), sunI: 0.8, hemi: 0.45, night: 0.6, cloud: C('#c08aa0'), sunDir: new THREE.Vector3(-1, 0.06, 0.2) },
  night:  { top: C('#03061a'), bottom: C('#1c2752'), fog: C('#141b3a'), sun: C('#9fb4ff'), sunI: 0.35, hemi: 0.28, night: 1.0, cloud: C('#3a4470'), sunDir: new THREE.Vector3(0.3, 0.6, 0.4) },
};

// Log-depth chunks for custom ShaderMaterials (the renderer uses a logarithmic depth buffer)
export const LD = {
  vp: '#include <common>\n#include <logdepthbuf_pars_vertex>\n',
  v: '\n#include <logdepthbuf_vertex>\n',
  fp: '#include <logdepthbuf_pars_fragment>\n',
  f: '\n#include <logdepthbuf_fragment>\n',
};

export function makeEnvState() {
  return { top: new THREE.Color(), bottom: new THREE.Color(), fog: new THREE.Color(), sun: new THREE.Color(), sunI: 1, hemi: 1, night: 0, cloud: new THREE.Color(), sunDir: new THREE.Vector3() };
}

export function lerpEnv(out, a, b, t) {
  out.top.copy(a.top).lerp(b.top, t);
  out.bottom.copy(a.bottom).lerp(b.bottom, t);
  out.fog.copy(a.fog).lerp(b.fog, t);
  out.sun.copy(a.sun).lerp(b.sun, t);
  out.cloud.copy(a.cloud).lerp(b.cloud, t);
  out.sunI = a.sunI + (b.sunI - a.sunI) * t;
  out.hemi = a.hemi + (b.hemi - a.hemi) * t;
  out.night = a.night + (b.night - a.night) * t;
  out.sunDir.copy(a.sunDir).normalize().lerp(b.sunDir.clone().normalize(), t).normalize();
  return out;
}

export function copyEnv(out, a) { return lerpEnv(out, a, a, 0); }

// ---------- Sky dome ----------
export function createSky() {
  const geo = new THREE.SphereGeometry(4000, 32, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      top: { value: new THREE.Color() },
      bottom: { value: new THREE.Color() },
      sunColor: { value: new THREE.Color() },
      sunDir: { value: new THREE.Vector3(0, 1, 0) },
      night: { value: 0 },
      time: { value: 0 },
    },
    vertexShader: /* glsl */`
      varying vec3 vDir;
      void main(){
        vDir = normalize(position);
        vec4 p = modelViewMatrix * vec4(position,1.0);
        gl_Position = projectionMatrix * p;
        gl_Position.z = gl_Position.w; // keep at far plane
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 top; uniform vec3 bottom; uniform vec3 sunColor; uniform vec3 sunDir;
      uniform float night; uniform float time;
      varying vec3 vDir;
      float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,45.164)))*43758.5453); }
      void main(){
        float h = clamp(vDir.y*1.25+0.12, 0.0, 1.0);
        vec3 col = mix(bottom, top, pow(h, 0.7));
        float d = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
        col += sunColor * (pow(d, 600.0)*3.0 + pow(d, 12.0)*0.35) * (1.0 - night*0.7);
        // stars
        vec3 q = floor(vDir*420.0);
        float s = step(0.9975, hash(q));
        float tw = 0.6 + 0.4*sin(time*2.0 + hash(q+1.0)*40.0);
        col += vec3(s*tw) * night * smoothstep(0.0, 0.25, vDir.y);
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  return mesh;
}

// ---------- Soft cloud sprites ----------
function cloudTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  for (let i = 0; i < 14; i++) {
    const x = 40 + Math.random() * 48, y = 50 + Math.random() * 28, r = 14 + Math.random() * 22;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function createClouds(regions) {
  const group = new THREE.Group();
  const tex = cloudTexture();
  const mats = [];
  for (const r of regions) {
    for (let i = 0; i < r.count; i++) {
      const m = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: r.opacity ?? 0.9, fog: true });
      mats.push(m);
      const s = new THREE.Sprite(m);
      const sc = r.size[0] + Math.random() * (r.size[1] - r.size[0]);
      s.scale.set(sc * 1.8, sc, 1);
      s.position.set(
        r.min[0] + Math.random() * (r.max[0] - r.min[0]),
        r.min[1] + Math.random() * (r.max[1] - r.min[1]),
        r.min[2] + Math.random() * (r.max[2] - r.min[2])
      );
      group.add(s);
    }
  }
  group.userData.setTint = (color) => mats.forEach((m) => m.color.copy(color));
  return group;
}

// ---------- Falling sakura petals around the camera ----------
export function createPetals(count = 700) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.08, 0.05, 0.1, 0.16, 0.0, 0.22);
  shape.bezierCurveTo(-0.1, 0.16, -0.08, 0.05, 0, 0);
  const geo = new THREE.ShapeGeometry(shape, 4);
  geo.center();
  const mat = new THREE.MeshBasicMaterial({ color: '#ffc4d6', side: THREE.DoubleSide, transparent: true, opacity: 0.95, fog: false });
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  mesh.frustumCulled = false;
  const data = [];
  const R = 36;
  for (let i = 0; i < count; i++) {
    data.push({
      p: new THREE.Vector3((Math.random() - 0.5) * R * 2, (Math.random() - 0.5) * R, (Math.random() - 0.5) * R * 2),
      v: 0.6 + Math.random() * 1.0,
      r: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
      w: Math.random() * 6,
      s: 0.6 + Math.random() * 1.1,
    });
  }
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const tones = ['#ffd1df', '#ffb7cc', '#ffe6ee', '#f7a6c0'];
  for (let i = 0; i < count; i++) mesh.setColorAt(i, color.set(tones[i % tones.length]));
  let anchor = new THREE.Vector3();
  mesh.userData.update = (dt, time, camPos, density, scale = 1) => {
    mesh.visible = density > 0.01;
    mat.opacity = 0.95 * Math.min(1, density);
    if (!mesh.visible) return;
    anchor.copy(camPos);
    for (let i = 0; i < count; i++) {
      const d = data[i];
      d.p.y -= d.v * dt * 1.4;
      d.p.x += Math.sin(time * 0.7 + d.w) * dt * 1.2 + dt * 0.8;
      d.p.z += Math.cos(time * 0.5 + d.w) * dt * 0.6;
      // wrap inside a box that travels with the camera
      for (const k of ['x', 'z']) {
        if (d.p[k] > R) d.p[k] -= R * 2; else if (d.p[k] < -R) d.p[k] += R * 2;
      }
      if (d.p.y < -R / 2) d.p.y += R;
      d.r.x += dt * d.v; d.r.y += dt * 0.7;
      dummy.position.set(anchor.x + d.p.x * scale, anchor.y + d.p.y * scale, anchor.z + d.p.z * scale);
      dummy.rotation.copy(d.r);
      const sc = d.s * scale * (i / count < density ? 1 : 0);
      dummy.scale.setScalar(sc);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  };
  return mesh;
}

// ---------- Contrail behind the plane ----------
export function createTrail(max = 160, size = 1) {
  const positions = new Float32Array(max * 3);
  const alphas = new Float32Array(max);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { color: { value: new THREE.Color('#ffffff') }, strength: { value: 1 }, size: { value: size } },
    vertexShader: LD.vp + `uniform float size; attribute float alpha; varying float vA; void main(){ vA = alpha; vec4 mv = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*mv; gl_PointSize = (6.0 + 10.0*alpha) * size * (900.0 / -mv.z);` + LD.v + `}`,
    fragmentShader: LD.fp + `uniform vec3 color; uniform float strength; varying float vA; void main(){ vec2 c = gl_PointCoord-0.5; float d = 1.0 - smoothstep(0.0,0.5,length(c)); gl_FragColor = vec4(color, d*vA*0.55*strength);` + LD.f + `}`,
  });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  let n = 0;
  pts.userData.push = (v) => {
    // shift and insert newest at 0
    positions.copyWithin(3, 0, (max - 1) * 3);
    positions[0] = v.x; positions[1] = v.y; positions[2] = v.z;
    n = Math.min(max, n + 1);
    for (let i = 0; i < max; i++) alphas[i] = i < n ? 1 - i / max : 0;
    geo.attributes.position.needsUpdate = true;
    geo.attributes.alpha.needsUpdate = true;
  };
  pts.userData.setPoints = (arr) => {
    for (let i = 0; i < max; i++) {
      const v = arr[i];
      if (v) { positions[i * 3] = v.x; positions[i * 3 + 1] = v.y; positions[i * 3 + 2] = v.z; alphas[i] = 1 - i / arr.length; }
      else alphas[i] = 0;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.alpha.needsUpdate = true;
  };
  pts.userData.reset = () => { n = 0; alphas.fill(0); geo.attributes.alpha.needsUpdate = true; };
  return pts;
}

// ---------- Vignette + grain + subtle chromatic shift ----------
export const FilmShader = {
  uniforms: { tDiffuse: { value: null }, time: { value: 0 }, vignette: { value: 0.9 }, grain: { value: 0.035 }, grade: { value: 1 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float time; uniform float vignette; uniform float grain; uniform float grade;
    varying vec2 vUv;
    float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898,78.233)))*43758.5453); }
    void main(){
      vec2 uv = vUv;
      vec2 c = uv - 0.5;
      float r2 = dot(c,c);
      vec2 off = c * r2 * 0.012;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + off).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - off).b;
      // warm grade: cool lifted shadows, warm highlights
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      vec3 graded = col + vec3(-0.006, 0.004, 0.022) * (1.0 - smoothstep(0.0, 0.35, l));
      graded = mix(graded, graded * vec3(1.06, 1.0, 0.9), smoothstep(0.45, 1.0, l));
      graded = mix(vec3(l), graded, 1.06);
      col = mix(col, graded, grade);
      col *= mix(1.0, smoothstep(0.85, 0.15, r2*1.6), vignette);
      col += (rand(uv*vec2(1000.0) + time) - 0.5) * grain;
      gl_FragColor = vec4(col, 1.0);
    }`,
};
