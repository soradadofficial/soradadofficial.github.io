import * as THREE from 'three';
import { AIRPORTS, PLACES, COASTS } from './data.js';
import { textTexture } from './models.js';

const K = 6;
export function proj(lon, lat, y = 0) {
  return new THREE.Vector3((lon - 122) * K, y, -(lat - 28) * K);
}

const routeVert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;
const routeFrag = `
  uniform vec3 color; uniform float time; uniform float speed; uniform float reveal;
  varying vec2 vUv;
  void main(){
    if (vUv.x > reveal) discard;
    float dash = smoothstep(0.35, 0.5, fract(vUv.x*28.0 - time*speed)) * smoothstep(1.0, 0.85, fract(vUv.x*28.0 - time*speed));
    float edge = 1.0 - abs(vUv.y - 0.5)*2.0;
    float a = (0.35 + dash*0.9) * (0.4 + edge*0.6);
    gl_FragColor = vec4(color * (0.55 + dash*0.8), a*0.85);
  }`;

function routeMaterial(color, speed = 1) {
  return new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: { color: { value: new THREE.Color(color) }, time: { value: 0 }, speed: { value: speed }, reveal: { value: 0 } },
    vertexShader: routeVert, fragmentShader: routeFrag, toneMapped: false,
  });
}

function label(text, sub, color) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const g = c.getContext('2d');
  g.font = '700 54px "IBM Plex Sans Thai", sans-serif';
  g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.shadowColor = color; g.shadowBlur = 16;
  g.fillText(text, 256, sub ? 46 : 64);
  if (sub) { g.font = '400 34px sans-serif'; g.globalAlpha = 0.75; g.fillText(sub, 256, 98); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false, fog: false }));
  s.scale.set(84, 21, 1);
  return s;
}

export function createHoloMap() {
  const g = new THREE.Group();
  const cyan = new THREE.Color('#7fe3ff');

  // base disc: grid, rings and radial fade
  const baseMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    uniforms: { time: { value: 0 }, color: { value: cyan }, fade: { value: 1 } },
    vertexShader: routeVert,
    fragmentShader: `
      uniform float time; uniform vec3 color; uniform float fade; varying vec2 vUv;
      void main(){
        vec2 p = (vUv-0.5)*2.0; float r = length(p);
        vec2 gp = abs(fract(vUv*36.0)-0.5);
        float grid = smoothstep(0.47, 0.5, max(gp.x, gp.y));
        float ring = smoothstep(0.012, 0.0, abs(fract(r*4.0 - time*0.15)-0.5)-0.49);
        float sweep = pow(max(0.0, cos(atan(p.y,p.x) - time*0.6)), 40.0);
        float a = (grid*0.10 + ring*0.16 + sweep*0.14 + 0.025) * smoothstep(1.0, 0.6, r);
        gl_FragColor = vec4(color, a*fade);
      }`,
  });
  // opaque night-blue backing so the world below doesn't show through the map
  const backing = new THREE.Mesh(new THREE.CircleGeometry(196, 96), new THREE.MeshBasicMaterial({ color: '#070c26', fog: false }));
  backing.rotation.x = -Math.PI / 2; backing.position.set(20, -0.5, -20);
  backing.renderOrder = -2;
  g.add(backing);
  const rim = new THREE.Mesh(new THREE.RingGeometry(195, 197.5, 128), new THREE.MeshBasicMaterial({ color: '#7fe3ff', transparent: true, opacity: 0.6, fog: false, side: THREE.DoubleSide }));
  rim.rotation.x = -Math.PI / 2; rim.position.set(20, -0.3, -20);
  g.add(rim);
  const base = new THREE.Mesh(new THREE.PlaneGeometry(380, 380), baseMat);
  base.rotation.x = -Math.PI / 2;
  base.renderOrder = -1;
  base.position.set(20, 0, -20);
  g.add(base);

  // coastlines
  const fillMat = new THREE.MeshBasicMaterial({ color: '#2aa6d6', transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: false });
  const lineMat = new THREE.LineBasicMaterial({ color: '#c8f7ff', fog: false, toneMapped: false });
  for (const [name, pts] of Object.entries(COASTS)) {
    const shape = new THREE.Shape(pts.map(([lo, la]) => new THREE.Vector2((lo - 122) * K, (la - 28) * K)));
    const fill = new THREE.Mesh(new THREE.ShapeGeometry(shape), fillMat.clone());
    if (name === 'thailand') fill.material.color.set('#c9a64a');
    fill.rotation.x = -Math.PI / 2; fill.position.y = 0.3;
    g.add(fill);
    const lp = pts.map(([lo, la]) => proj(lo, la, 0.6));
    const line = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(lp), lineMat);
    g.add(line);
    // extruded glow wall
    const wallGeo = new THREE.BufferGeometry();
    const verts = [];
    for (let i = 0; i < lp.length; i++) {
      const a = lp[i], b = lp[(i + 1) % lp.length];
      verts.push(a.x, 0, a.z, b.x, 0, b.z, b.x, 5, b.z, a.x, 0, a.z, b.x, 5, b.z, a.x, 5, a.z);
    }
    wallGeo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    const wall = new THREE.Mesh(wallGeo, new THREE.MeshBasicMaterial({ color: name === 'thailand' ? '#f2cf74' : '#4fd8ff', transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
    g.add(wall);
  }

  // markers
  const pinGeo = new THREE.CylinderGeometry(0.9, 0.2, 4, 10).translate(0, 2, 0);
  const ringGeo = new THREE.RingGeometry(1.4, 2.0, 32).rotateX(-Math.PI / 2);
  const markers = {};
  const addMarker = (id, lon, lat, color, text, sub) => {
    const m = new THREE.Group();
    m.position.copy(proj(lon, lat, 0.8));
    const pin = new THREE.Mesh(pinGeo, new THREE.MeshBasicMaterial({ color, toneMapped: false, fog: false }));
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, depthWrite: false, toneMapped: false, fog: false }));
    const l = label(text, sub, color);
    l.position.y = 16;
    m.add(pin, ring, l);
    m.userData = { pin, ring, label: l, color: new THREE.Color(color), active: false };
    g.add(m);
    markers[id] = m;
  };
  for (const a of Object.values(AIRPORTS)) addMarker(a.code, a.lon, a.lat, a.country === 'TH' ? '#ffd27a' : '#ffffff', a.code);
  for (const p of PLACES) addMarker(p.id, p.lon, p.lat, '#ff9ec0', p.en);

  const routes = new THREE.Group();
  g.add(routes);
  const comets = [];

  function clearRoutes() {
    routes.children.slice().forEach((c) => { c.geometry?.dispose(); c.material?.dispose?.(); routes.remove(c); });
    comets.length = 0;
  }

  function addTube(curve, color, radius, speed) {
    const mat = routeMaterial(color, speed);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 160, radius, 8, false), mat);
    tube.frustumCulled = false;
    routes.add(tube);
    const comet = new THREE.Mesh(new THREE.SphereGeometry(radius * 2.0, 12, 12), new THREE.MeshBasicMaterial({ color, toneMapped: false, fog: false }));
    comet.scale.multiplyScalar(1);
    routes.add(comet);
    comets.push({ curve, comet, mat, speed: 0.12 * speed, offset: Math.random() });
    return mat;
  }

  let revealStart = 0;
  function setRoute(plan, now) {
    clearRoutes();
    revealStart = now;
    for (const m of Object.values(markers)) {
      m.userData.active = false;
    }
    const dep = AIRPORTS[plan.dep], arr = AIRPORTS[plan.arr], ret = AIRPORTS[plan.ret];
    const a = proj(dep.lon, dep.lat, 1), b = proj(arr.lon, arr.lat, 1), c = proj(ret.lon, ret.lat, 1);
    const arc = (p, q, lift, side) => {
      const mid = p.clone().add(q).multiplyScalar(0.5);
      mid.y += lift;
      mid.z += side;
      return new THREE.QuadraticBezierCurve3(p, mid, q);
    };
    const d1 = a.distanceTo(b), d2 = c.distanceTo(a);
    addTube(arc(a, b, d1 * 0.16, -8), '#7fe3ff', 0.55, 1.2);
    addTube(arc(c, a, d2 * 0.11, 14), '#ffd27a', 0.45, 0.9);
    const stops = [b, ...plan.stops.map((id) => { const p = PLACES.find((x) => x.id === id); return proj(p.lon, p.lat, 1.6); }), c];
    if (stops.length >= 2) {
      const pts = [];
      for (let i = 0; i < stops.length - 1; i++) {
        const p = stops[i], q = stops[i + 1];
        pts.push(p);
        // gentle bend so the road reads as ground travel
        const mid = p.clone().lerp(q, 0.5);
        mid.x += (q.z - p.z) * 0.08; mid.z -= (q.x - p.x) * 0.08; mid.y = 1.6;
        pts.push(mid);
      }
      pts.push(stops[stops.length - 1]);
      addTube(new THREE.CatmullRomCurve3(pts, false, 'centripetal'), '#ff8fb8', 0.45, 1.6);
    }
    for (const id of [plan.dep, plan.arr, plan.ret, ...plan.stops]) if (markers[id]) markers[id].userData.active = true;
  }

  function update(t, camera) {
    baseMat.uniforms.time.value = t;
    const rv = Math.min(1, (t - revealStart) / 1.6);
    for (const c of comets) {
      c.mat.uniforms.time.value = t;
      c.mat.uniforms.reveal.value = rv;
      const u = rv < 1 ? rv : (t * c.speed + c.offset) % 1;
      c.comet.position.copy(c.curve.getPoint(u));
    }
    for (const m of Object.values(markers)) {
      const u = m.userData;
      const target = u.active ? 1 : 0.35;
      u.pin.material.opacity = target;
      u.pin.material.transparent = true;
      u.label.material.opacity += ((u.active ? 1 : 0) - u.label.material.opacity) * 0.1;
      const s = u.active ? 1 + ((t * 0.8 + m.position.x * 0.01) % 1) * 2.2 : 1;
      u.ring.scale.setScalar(s);
      u.ring.material.opacity = u.active ? 1 - (s - 1) / 2.2 : 0.2;
    }
  }

  g.userData = { setRoute, update, markers };
  return g;
}
