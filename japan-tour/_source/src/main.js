import * as THREE from 'three';
import { gsap } from 'gsap';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createWorld } from './world.js';
import { loadDem } from './geo.js';
import { FilmShader, lerpEnv, copyEnv, ENV } from './fx.js';
import { initStays } from './stays.js';
import { initBuilder, fillInsuranceTable } from './builder.js';
import { lineMats } from './scenery.js';

const $ = (s) => document.querySelector(s);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x) => { x = clamp01(x); return x * x * (3 - 2 * x); };
const isSmall = () => window.innerWidth < 900;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const instant = location.search.includes('instant'); // for screenshot tests

// ---------- Renderer & post FX ----------
const canvas = $('#gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', logarithmicDepthBuffer: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall() ? 1.5 : 1.75));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = !isSmall();
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const clock = new THREE.Clock();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.002, 40000);
if (location.search.includes('debug')) { window.__cam = camera; window.__r = renderer; renderer.info.autoReset = false; }
await loadDem();
const world = createWorld();
const { scene } = world;
{
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.35;
}

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
// Ambient occlusion (desktop only). GTAO assumes a linear depth buffer, so its depth
// reads are converted from the logarithmic buffer back to perspective depth.
const useAO = !isSmall() && !location.search.includes('noao');
let gtao = null;
const aoForced = location.search.includes('ao=1');
let aoOff = false, aoFrames = 0, aoStart = performance.now() + 2500;
if (useAO) {
  gtao = new GTAOPass(scene, camera, window.innerWidth, window.innerHeight);
  const fs = gtao.gtaoMaterial.fragmentShader
    .replace('vec3 getViewPosition(', `float logToPersp(float d) {
        float w = exp2(d * log2(cameraFar + 1.0)) - 1.0;
        float vz = -max(w, cameraNear);
        return ((cameraNear + vz) * cameraFar) / ((cameraFar - cameraNear) * vz);
      }
      vec3 getViewPosition(`)
    .replace('return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;', 'return logToPersp(textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING);')
    .replace('return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;', 'return logToPersp(texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING);');
  gtao.gtaoMaterial.fragmentShader = fs;
  gtao.gtaoMaterial.needsUpdate = true;
  // only opaque meshes go into the AO normal/depth pass
  gtao.overrideVisibility = function () {
    const cache = this._visibilityCache;
    this.scene.traverse((o) => {
      cache.set(o, o.visible);
      const m = o.material;
      if (o.isPoints || o.isLine || o.isSprite || o.isLine2 || (m && !Array.isArray(m) && (m.transparent || m.isShaderMaterial))) o.visible = false;
    });
  };
  gtao.blendIntensity = 0.9;
  gtao.updateGtaoMaterial({ radius: 0.5, distanceExponent: 1.5, thickness: 1, scale: 1.2, samples: 12 });
  composer.addPass(gtao);
}
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.55, 0.65, 0.82);
composer.addPass(bloom);
composer.addPass(new OutputPass());
const film = new ShaderPass(FilmShader);
composer.addPass(film);

// ---------- Page metrics ----------
const M = { storyTop: 0, storyScroll: 1, exploreTop: 0, builderTop: 0, servicesTop: 0, vh: 1 };
function measure() {
  const y = window.scrollY;
  const top = (el) => el.getBoundingClientRect().top + y;
  M.vh = window.innerHeight;
  M.storyTop = top($('#story'));
  M.storyScroll = $('#story').offsetHeight - M.vh;
  M.exploreTop = top($('#explore'));
  M.builderTop = top($('#builder'));
  M.servicesTop = top($('#services'));
}

// ---------- Explore: camera flies between targets in the same world ----------
const exploreCur = { pos: new THREE.Vector3(), look: new THREE.Vector3(), env: world.makeEnv(), petals: 0.5 };
let exploreKey = 'hotel';
{
  const e = world.EXPLORE.hotel;
  exploreCur.pos.copy(e.pos); exploreCur.look.copy(e.look); copyEnv(exploreCur.env, e.env); exploreCur.petals = e.petals;
}
let exploreTween = null;
const chapterEls = [...document.querySelectorAll('.chapter')];
const heroEl = document.querySelector('.hero');
function fadeChapters() {
  const vh = window.innerHeight;
  const hb = heroEl.getBoundingClientRect().bottom / vh;
  heroEl.style.opacity = smooth((hb - 0.4) / 0.4).toFixed(3);
  for (const el of chapterEls) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -50 || r.top > vh + 50) { if (el.style.opacity !== '0') el.style.opacity = '0'; continue; }
    const c = (r.top + r.height / 2) / vh;
    // on phones the route card owns the top of the screen: fade chapters out before they slide under it
    const topIn = isSmall() ? 0.36 : 0.02, ramp = isSmall() ? 0.14 : 0.26;
    const k = smooth(Math.min(1, Math.max(0, (c - topIn) / ramp))) * smooth(Math.min(1, Math.max(0, (0.98 - c) / 0.26)));
    el.style.opacity = k.toFixed(3);
    el.style.transform = `translateY(${((1 - k) * (c > 0.5 ? 18 : -18)).toFixed(1)}px)`;
    el.style.pointerEvents = k > 0.3 ? '' : 'none';
  }
}

let stays;
function flyPose(to) { // same flight as flyTo, without the target tabs and info card
  setFree(false);
  world.EXPLORE.__pose = to; exploreKey = '__pose';
  const toEnv = timeOverride || to.env;
  const fromPos = exploreCur.pos.clone(), fromLook = exploreCur.look.clone();
  const fromEnv = world.makeEnv(); copyEnv(fromEnv, exploreCur.env);
  const fromPetals = exploreCur.petals, dist = fromPos.distanceTo(to.pos);
  const mid = fromPos.clone().lerp(to.pos, 0.5);
  mid.y = Math.max(fromPos.y, to.pos.y) + Math.min(90, dist * 0.3);
  const q = new THREE.QuadraticBezierCurve3(fromPos, mid, to.pos.clone());
  exploreTween?.kill();
  const o = { k: 0 };
  exploreTween = gsap.to(o, {
    k: 1, duration: reduceMotion || instant ? 0.01 : 0.9 + Math.min(2.2, dist / 100), ease: 'power2.inOut',
    onUpdate: () => {
      exploreCur.pos.copy(q.getPoint(o.k));
      exploreCur.look.copy(fromLook).lerp(to.look, smooth(o.k * 1.25));
      lerpEnv(exploreCur.env, fromEnv, toEnv, o.k);
      exploreCur.petals = fromPetals + (to.petals - fromPetals) * o.k;
    },
  });
}
function flyTo(key) {
  const to = typeof key === 'object' ? key : world.EXPLORE[key]; // a named target, or a pose (stays and rooms)
  if (!to) return;
  if (typeof key === 'object') return flyPose(to);
  setFree(false);
  exploreKey = key;
  const toEnv = timeOverride || to.env;
  const fromPos = exploreCur.pos.clone(), fromLook = exploreCur.look.clone();
  const fromEnv = world.makeEnv(); copyEnv(fromEnv, exploreCur.env);
  const fromPetals = exploreCur.petals;
  const dist = fromPos.distanceTo(to.pos);
  const mid = fromPos.clone().lerp(to.pos, 0.5);
  mid.y = Math.max(fromPos.y, to.pos.y) + Math.min(90, dist * 0.3 + 0.3);
  const q = new THREE.QuadraticBezierCurve3(fromPos, mid, to.pos.clone());
  exploreTween?.kill();
  const o = { k: 0 };
  exploreTween = gsap.to(o, {
    k: 1, duration: reduceMotion || instant ? 0.01 : 1.6 + Math.min(1.8, dist / 120), ease: 'power2.inOut',
    onUpdate: () => {
      exploreCur.pos.copy(q.getPoint(o.k));
      // look leads the move slightly so the camera turns before it arrives
      exploreCur.look.copy(fromLook).lerp(to.look, smooth(o.k * 1.25));
      lerpEnv(exploreCur.env, fromEnv, toEnv, o.k);
      exploreCur.petals = fromPetals + (to.petals - fromPetals) * o.k;
    },
  });
  document.querySelectorAll('[data-target]').forEach((b) => b.setAttribute('aria-selected', b.dataset.target === key));
  stays?.close();
  renderInfo(key);
}

const INFO = {
  hotel: { jp: 'さくらグランド', title: 'Sakura Grand Hotel 5★', text: 'โรงแรมหรูใกล้สถานี ล็อบบี้ไม้สไตล์ญี่ปุ่นร่วมสมัย ห้องชั้นบนหันหน้าเข้าหาภูเขาไฟฟูจิ', list: ['อาหารเช้าบุฟเฟต์ญี่ปุ่นและนานาชาติ', 'ออนเซ็นและสปาบนดาดฟ้า', 'เดิน 5 นาทีถึงสถานี'], price: 'เริ่ม ฿6,900 / คืน', action: { hotel: 'kawaguchiko' }, cta: 'เลือกโรงแรมนี้' },
  suite: { jp: '富士ビュースイート', title: 'ห้องสวีทวิวฟูจิ', text: 'ตอนนี้คุณอยู่ในห้องนี้ ลองขยับเมาส์เพื่อมองรอบ ๆ ห้องขนาด 82 ตร.ม. กระจกจากพื้นถึงเพดานรับวิวฟูจิตอนพระอาทิตย์ตก', list: ['เตียงคิงไซซ์และมุมนั่งเล่น', 'อ่างแช่ตัวริมหน้าต่าง', 'ชั้นบนสุด เช็คอินเลานจ์ส่วนตัว'], price: 'เริ่ม ฿13,100 / คืน', action: { hotel: 'kawaguchiko', room: 'kw-sky' }, cta: 'เลือกห้องนี้' },
  ryokan: { jp: '旅館 花見', title: 'เรียวกัง ฮานามิ · ห้องทาทามิ', text: 'ห้องแบบญี่ปุ่นปูเสื่อทาทามิ นอนฟูก เสิร์ฟอาหารไคเซกิถึงห้อง และมีบ่อออนเซ็นส่วนตัวที่ระเบียง', list: ['ชุดยูกาตะสำหรับทุกท่าน', 'ดินเนอร์ไคเซกิ 9 คอร์ส', 'ออนเซ็นส่วนตัวมองเห็นทะเลสาบ'], price: 'เริ่ม ฿5,400 / คืน', action: { hotel: 'hakone', room: 'hk-onsen' }, cta: 'เลือกเรียวกังนี้' },
  fuji: { jp: '富士山', title: 'ภูเขาไฟฟูจิ', text: 'สูง 3,776 เมตร ภูเขาที่สูงที่สุดในญี่ปุ่น ชมจากริมทะเลสาบคาวากุจิโกะ หรือขึ้นไปถึงสถานีชั้น 5', list: ['ทะเลสาบคาวากุจิโกะ', 'สถานีชั้น 5 (ตามฤดูกาล)', 'หมู่บ้านโอชิโนะฮักไก'], price: 'ค่าเข้าชม ฿1,800 / ท่าน', action: { place: 'fuji' }, cta: 'เพิ่มเข้าทริป' },
  pagoda: { jp: '忠霊塔', title: 'เจดีย์ชูเรโตะ', text: 'เจดีย์ห้าชั้นในสวนอาราคุระยามะ มุมถ่ายรูปฟูจิกับซากุระที่โด่งดังที่สุด เดินขึ้นบันได 398 ขั้น', list: ['ซากุระบานปลายมีนาคมถึงเมษายน', 'ใบไม้แดงช่วงพฤศจิกายน', 'จุดชมวิวยามเช้าคนน้อย'], price: 'รวมในทริปฟูจิ', action: { place: 'fuji' }, cta: 'เพิ่มเข้าทริป' },
  torii: { jp: '千本鳥居', title: 'อุโมงค์โทริอิ', text: 'ซุ้มประตูสีชาดนับพันต้นเรียงต่อกันขึ้นเขา ที่ศาลเจ้าฟูชิมิอินาริ เกียวโต', list: ['เปิด 24 ชั่วโมง ไม่มีค่าเข้า', 'แนะนำช่วงเช้าก่อน 8 โมง', 'เดินเต็มเส้นทางประมาณ 2 ชั่วโมง'], price: 'รวมในทริปเกียวโต', action: { place: 'kyoto' }, cta: 'เพิ่มเข้าทริป' },
  train: { jp: '新幹線', title: 'ชินคันเซ็น', text: 'รถไฟหัวกระสุนวิ่งบนทางยกระดับผ่านฉากนี้ทุกไม่กี่นาที ความเร็วสูงสุด 320 กม./ชม. โตเกียวถึงเกียวโตใน 2 ชั่วโมง 15 นาที', list: ['ใช้ JR Pass ได้บางขบวน', 'มีที่วางกระเป๋าใหญ่ต้องจองล่วงหน้า', 'ซื้อเบนโตะสถานีไปกินบนรถ'], price: 'JR Pass 7 วัน ฿11,500', action: { addon: 'jrpass' }, cta: 'เพิ่ม JR Pass' },
  bus: { jp: '観光バス', title: 'รถโค้ชนำเที่ยว', text: 'รถโค้ช 40 ที่นั่งพาไปทุกจุดในทริป มี WiFi ที่ชาร์จ USB และน้ำดื่มเย็น', list: ['คนขับมีใบอนุญาตท่องเที่ยว', 'จอดพักทุก 2 ชั่วโมง', 'ที่เก็บกระเป๋าใต้ท้องรถ'], price: 'รวมในแพ็กเกจ', action: { addon: 'transfer' }, cta: 'เพิ่มรถรับส่งส่วนตัว' },
  plane: { jp: '航空機', title: 'เที่ยวบิน BKK ↔ ญี่ปุ่น', text: 'บินตรงทุกวัน เลือกลงได้ทั้งนาริตะ ฮาเนดะ คันไซ ชูบุ ฟุกุโอกะ และชิโตเสะ', list: ['กระเป๋าโหลด 30 กก.', 'เลือกที่นั่งกลุ่มฟรี', 'อาหารร้อนบนเครื่อง'], price: 'เริ่ม ฿14,900 ไป-กลับ', action: {}, cta: 'จัดเที่ยวบิน' },
  boat: { jp: 'スワンボート', title: 'เรือหงส์ริมทะเลสาบ', text: 'ปั่นเรือหงส์ชมภูเขาไฟฟูจิสะท้อนผิวน้ำ ทะเลสาบคาวากุจิโกะ', list: ['30 นาที ต่อรอบ', 'นั่งได้ 2–3 คน', 'เปิด 9:00–17:00'], price: '฿450 / ลำ', action: { place: 'fuji' }, cta: 'เพิ่มเข้าทริป' },
  guide: { jp: 'ガイド', title: 'ไกด์มิกิ', text: 'ไกด์คนไทยที่อยู่ญี่ปุ่นมา 8 ปี ถือธงสีชมพูรอรับที่สนามบินและดูแลตลอดทริป', list: ['พูดไทย ญี่ปุ่น อังกฤษ', 'แชตได้ 24 ชั่วโมง', 'แนะนำร้านอาหารท้องถิ่น'], price: 'รวมในแพ็กเกจ', action: {}, cta: 'จัดทัวร์กับไกด์มิกิ' },
  castle: { jp: '大阪城', title: 'ปราสาทโอซาก้า', text: 'ปราสาทหลังคาเขียวขอบทองกลางสวนนิชิโนะมารุ ล้อมด้วยคูน้ำและกำแพงหิน ชมซากุระกว่า 600 ต้นช่วงต้นเมษายน', list: ['พิพิธภัณฑ์ 8 ชั้นในตัวปราสาท', 'ล่องเรือโกซะบุเนะรอบคูน้ำ', 'ต่อด้วยโดทงโบริยามค่ำ'], price: 'ค่าเข้าชม ฿1,300 / ท่าน', action: { place: 'osaka' }, cta: 'เพิ่มเข้าทริป' },
  nara: { jp: '奈良公園', title: 'สวนกวางนารา', text: 'กวางกว่า 1,000 ตัวเดินเล่นอิสระรอบวัดโทไดจิ วิหารไม้ที่ประดิษฐานพระใหญ่ ซื้อขนมเซมเบ้ให้กวางได้', list: ['วัดโทไดจิและพระใหญ่', 'ขนมกวาง 200 เยน', 'ห่างเกียวโต 45 นาที'], price: 'ค่าเข้าชม ฿900 / ท่าน', action: { place: 'nara' }, cta: 'เพิ่มเข้าทริป' },
  pirate: { jp: '箱根海賊船', title: 'เรือโจรสลัดทะเลสาบอาชิ', text: 'ล่องทะเลสาบอาชิด้วยเรือสไตล์โจรสลัด ผ่านโทริอิกลางน้ำของศาลเจ้าฮาโกเน่ วันฟ้าใสเห็นฟูจิด้านหลัง', list: ['ล่อง 25 นาที', 'รวมใน Hakone Free Pass', 'ต่อกระเช้าโอวาคุดานิ'], price: 'รวมในทริปฮาโกเน่', action: { place: 'hakone' }, cta: 'เพิ่มเข้าทริป' },
  tokyo: { jp: '東京', title: 'โตเกียวยามค่ำคืน', text: 'โตเกียวทาวเวอร์สีส้มกับแสงไฟเมือง ต่อด้วยทางม้าลายชิบูย่าและวัดเซนโซจิในอาซากุสะ', list: ['จุดชมวิวชิบูย่าสกาย', 'ตลาดปลาสึกิจิ', 'ช้อปปิ้งกินซ่าและฮาราจูกุ'], price: 'ค่าเข้าชม ฿1,200 / ท่าน', action: { place: 'tokyo' }, cta: 'เพิ่มเข้าทริป' },
};
let builder;
function renderInfo(key) {
  const i = INFO[key];
  stays?.close(); // another card replaces the stay sheet: its floor and unit lights go too
  const card = $('#infoCard');
  card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap');
  card.innerHTML = `
    <p class="jp">${i.jp}</p>
    <h3>${i.title}</h3>
    <p class="muted">${i.text}</p>
    <ul>${i.list.map((x) => `<li>${x}</li>`).join('')}</ul>
    <div class="row"><span class="price">${i.price}</span><button class="btn btn-small" type="button" id="addTrip">${i.cta}</button></div>`;
  $('#addTrip').addEventListener('click', () => {
    builder.apply(i.action);
    scrollToY(M.builderTop + 2);
  });
}

// ---------- Builder ----------
let lastPlanKey = '';
const simHud = $('#simHud');
builder = initBuilder({
  onSimulate: (plan) => {
    const h = world.holo.userData;
    if (h.sim) return h.stopSim();
    h.simulate(plan, clock.elapsedTime, (text, i, n) => {
      simHud.hidden = text === null;
      document.body.classList.toggle('simulating', text !== null); // panels step back so the map is visible
      if (text !== null) { simHud.innerHTML = `<span>ขั้นที่ ${i + 1}/${n}</span><b>${text}</b><button class="btn btn-small btn-ghost" type="button">■ หยุดจำลอง</button>`; simHud.querySelector('button').addEventListener('click', () => h.stopSim()); }
      const b = document.getElementById('simBtn'); if (b) b.textContent = text === null ? '▶ จำลองเส้นทาง' : '■ หยุดจำลอง';
    });
  },
  onChange: (plan) => {
    const k = [plan.dep, plan.arr, plan.ret, ...plan.stops].join(',');
    if (k !== lastPlanKey) { lastPlanKey = k; world.holo.userData.setRoute(plan, clock.elapsedTime); }
  },
});
fillInsuranceTable();

// ---------- Time of day override for the explore view ----------
let timeOverride = null;
function setTime(key) {
  timeOverride = key === 'auto' ? null : ENV[key];
  document.querySelectorAll('[data-time]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.time === key));
  const fromEnv = world.makeEnv(); copyEnv(fromEnv, exploreCur.env);
  const to = timeOverride || world.EXPLORE[exploreKey].env;
  const o = { k: 0 };
  gsap.to(o, { k: 1, duration: instant ? 0.01 : 1.4, ease: 'sine.inOut', onUpdate: () => lerpEnv(exploreCur.env, fromEnv, to, o.k) });
}
document.querySelectorAll('[data-time]').forEach((b) => b.addEventListener('click', () => setTime(b.dataset.time)));

// ---------- Free orbit (drag to rotate, wheel to zoom) ----------
const orbitEl = $('#orbit');
const controls = new OrbitControls(camera, orbitEl);
controls.enabled = false;
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 0.05;
controls.maxDistance = 220;
controls.maxPolarAngle = Math.PI * 0.49;
let free = false;
function setFree(on) {
  if (on === free) return;
  free = on;
  $('#freeBtn').setAttribute('aria-pressed', on);
  $('#freeBtn').textContent = on ? 'ออกจากโหมดหมุน' : 'หมุนดูรอบ ๆ แบบอิสระ';
  $('#freeHint').textContent = on ? 'ลากเพื่อหมุน · ลากสองนิ้วหรือคลิกขวาเพื่อเลื่อน · ล้อเมาส์เพื่อซูม · กด Esc เพื่อออก' : 'คลิกที่โรงแรม รถไฟ รถบัส หรือเครื่องบินในฉาก เพื่อดูข้อมูล';
  orbitEl.hidden = !on;
  controls.enabled = on;
  if (on) {
    exploreTween?.kill();
    controls.target.copy(exploreCur.look);
    camera.position.copy(exploreCur.pos);
    controls.update();
  } else {
    // continue from wherever the user left the camera, no jump
    exploreCur.pos.copy(camera.position);
    exploreCur.look.copy(controls.target);
  }
}
$('#freeBtn').addEventListener('click', () => setFree(!free));
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setFree(false); });

// ---------- Stays: property sheets and walk-in rooms ----------
stays = initStays({
  world,
  fly: flyPose,
  setOrbit: (on) => { controls.minDistance = on ? 0.004 : 0.05; setFree(on); },
  onSelect: (action) => { builder.apply(action); scrollToY(M.builderTop + 2); },
});
world.stays.warm = (o) => renderer.compileAsync(o, camera, scene).catch(() => {}); // shaders for a room build in parallel, not on the frame it opens
if (location.search.includes('debug')) window.__stays = stays;

// ---------- Click objects in the scene ----------
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
function pick(x, y) {
  ndc.set(x / window.innerWidth * 2 - 1, -(y / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const hit = raycaster.intersectObjects(world.life.pickables, true)[0];
  if (!hit) return null;
  let o = hit.object;
  while (o && !o.userData.info) o = o.parent;
  return o?.userData.info || null;
}
const inExplore = () => weNow > 0.9 && wbNow < 0.1;
const overUI = (el) => el.closest && el.closest('.panel, .nav, button, a, input, select, label, dialog');
let downAt = null;
window.addEventListener('pointerdown', (e) => { downAt = [e.clientX, e.clientY]; });
window.addEventListener('pointerup', (e) => {
  if (!downAt || !inExplore() || overUI(e.target) || world.stays.hasRoom()) return; // inside a walk-in room the scene behind the window is not clickable
  const moved = Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]);
  downAt = null;
  if (moved > 6) return;
  const key = pick(e.clientX, e.clientY);
  if (!key) return;
  if (world.EXPLORE[key] && !free) flyTo(key);
  else renderInfo(key);
});
let lastHover = 0;
window.addEventListener('pointermove', (e) => {
  const now = performance.now();
  if (now - lastHover < 120) return;
  lastHover = now;
  document.body.classList.toggle('picking', inExplore() && !overUI(e.target) && !!pick(e.clientX, e.clientY));
});

// ---------- Live HUD ----------
setInterval(() => {
  const jst = new Date(Date.now() + 9 * 3600e3);
  $('#hudClock').textContent = jst.toISOString().slice(11, 16);
  const s = Math.ceil(world.life.trainNext(clock.elapsedTime));
  $('#hudTrain').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}, 250);

// ---------- Navigation ----------
function scrollToY(y) {
  window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
}
document.querySelectorAll('[data-jump]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  const id = a.dataset.jump;
  const y = id === 'top' ? 0 : id === 'story' ? M.storyTop + M.storyScroll * 0.1 : id === 'explore' ? M.exploreTop + 2 : id === 'builder' ? M.builderTop + 2 : M.servicesTop + M.vh * 0.2;
  scrollToY(y);
}));
document.querySelectorAll('[data-jump-t]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); scrollToY(M.storyTop + M.storyScroll * +a.dataset.jumpT); }));
document.querySelectorAll('[data-explore]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); scrollToY(M.exploreTop + 2); flyTo(a.dataset.explore); }));
document.querySelectorAll('[data-target]').forEach((b) => b.addEventListener('click', () => flyTo(b.dataset.target)));
const railItems = [...document.querySelectorAll('#rail li')];
railItems.forEach((li) => li.addEventListener('click', () => scrollToY(M.storyTop + M.storyScroll * +li.dataset.t)));

// ---------- Pointer parallax ----------
const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
window.addEventListener('pointermove', (e) => { pointer.x = e.clientX / window.innerWidth * 2 - 1; pointer.y = e.clientY / window.innerHeight * 2 - 1; });

// ---------- Story leg panel + flight/bus HUD ----------
const legPanel = $('#legPanel'), tripHud = $('#tripHud');
let lastLeg = -1;
function updateStoryHud(t, weight) {
  const heroGone = heroEl.getBoundingClientRect().bottom < window.innerHeight * 0.18;
  const show = weight > 0.6 && heroGone && t > 0.015 && t < 0.995;
  legPanel.classList.toggle('show', show);
  tripHud.classList.toggle('show', show);
  if (!show) return;
  const i = world.storyInfo(t);
  if (i.index !== lastLeg) {
    lastLeg = i.index;
    const L = i.leg;
    legPanel.innerHTML = `
      <p class="leg-step">ช่วงที่ ${i.index + 1} / ${i.count}</p>
      <h3>${L.title}</h3>
      <p class="leg-sub">${L.sub}</p>
      <dl class="leg-stats">${L.stats.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <ol class="leg-dots">${Array.from({ length: i.count }, (_, k) => `<li class="${k < i.index ? 'done' : k === i.index ? 'now' : ''}"></li>`).join('')}</ol>`;
    legPanel.classList.remove('swap'); void legPanel.offsetWidth; legPanel.classList.add('swap');
  }
  $('#hudAltL').textContent = i.altLabel;
  $('#hudAlt').textContent = i.alt;
  $('#hudSpeed').textContent = i.speed;
  $('#hudRemain').textContent = i.remain;
  $('#hudTime').textContent = i.time;
  $('#hudZone').textContent = `${i.zone} · วันที่ ${i.day}`;
}

// ---------- Main loop ----------
let smoothScroll = window.scrollY;
const storyPose = { pos: new THREE.Vector3(), look: new THREE.Vector3() };
const envStory = world.makeEnv(), envMix = world.makeEnv();
const pos = new THREE.Vector3(), look = new THREE.Vector3();
const camPos = new THREE.Vector3(), camLook = new THREE.Vector3();
let first = true;
let weNow = 0, wbNow = 0;
const navLinks = [...document.querySelectorAll('.nav-links a')];
const rail = $('.rail');

function frame() {
  const dt = Math.min(0.05, clock.getDelta());
  const time = clock.elapsedTime;
  // inertial scroll so the camera glides instead of stepping
  smoothScroll += (window.scrollY - smoothScroll) * (instant ? 1 : 1 - Math.exp(-dt * (reduceMotion ? 30 : 5)));
  const y = smoothScroll;

  const storyT = clamp01((y - M.storyTop) / M.storyScroll);
  let we = smooth((y - (M.exploreTop - M.vh)) / M.vh);
  let wb = smooth((y - (M.builderTop - M.vh)) / M.vh);
  if (world.stays.hasRoom()) { // walk-in rooms are metres wide in world units: a sliver of story or builder pose would put the camera outside the room
    if (we > 0.6 && wb < 0.4) { we = 1; wb = 0; } else stays.leaveRoom(); // scrolled well away: back to the property sheet
  }
  weNow = we; wbNow = wb;
  world.stays.showGlows(we > 0.5 && wb < 0.5);
  if (free && (we < 0.9 || wb > 0.1)) setFree(false);

  world.storyPose(storyT, storyPose);
  world.storyEnv(storyT, envStory);

  const B = world.BUILDER;
  const narrow = camera.aspect < 0.9;
  const simCam = world.holo.userData.sim?.started ? world.holo.userData.sim : null; // route simulation follows its marker
  const bPos = simCam ? simCam.pos : narrow ? B.posNarrow : B.pos;
  const bLook = simCam ? simCam.look : narrow ? B.lookNarrow : B.look;
  const drift = simCam ? new THREE.Vector3() : new THREE.Vector3(Math.sin(time * 0.12) * 18, 0, Math.cos(time * 0.1) * 14);

  pos.copy(storyPose.pos).lerp(exploreCur.pos, we).lerp(bPos.clone().add(drift), wb);
  look.copy(storyPose.look).lerp(exploreCur.look, we).lerp(bLook, wb);
  lerpEnv(envMix, envStory, exploreCur.env, we);
  lerpEnv(envMix, envMix, B.env, wb);

  // parallax
  pointer.sx += (pointer.x - pointer.sx) * dt * 3;
  pointer.sy += (pointer.y - pointer.sy) * dt * 3;
  const dir = look.clone().sub(pos).normalize();
  const right = dir.clone().cross(THREE.Object3D.DEFAULT_UP).normalize();
  const up = right.clone().cross(dir).normalize();
  const inRoom = we > 0.5 && wb < 0.5 && (exploreKey === 'suite' || exploreKey === 'ryokan');
  const D = pos.distanceTo(look);
  const lookAmp = Math.min(D, 40) * (inRoom ? 0.12 : 0.05), posAmp = inRoom ? 0.004 : D * 0.012;
  look.addScaledVector(right, pointer.sx * lookAmp).addScaledVector(up, -pointer.sy * lookAmp * 0.5);
  pos.addScaledVector(right, pointer.sx * posAmp).addScaledVector(up, -pointer.sy * posAmp * 0.6);

  { const gy = world.groundAt(pos.x, pos.z) + 0.03; if (pos.y < gy) pos.y = gy; }
  if (free) {
    controls.update();
    camPos.copy(camera.position); camLook.copy(controls.target);
  } else {
    if (first || instant) { camPos.copy(pos); camLook.copy(look); first = false; }
    camPos.lerp(pos, 1 - Math.exp(-dt * 4.5)); // glide: quick scrolls do not jerk the view
    camLook.lerp(look, 1 - Math.exp(-dt * 4.5));
    camera.position.copy(camPos);
    camera.lookAt(camLook);
  }
  camera.fov = narrow ? 62 : 50;
  camera.updateProjectionMatrix();

  const petalsStory = world.japanZone(camera.position) && storyT > 0.55 ? 1 : 0;
  const petalsTarget = (petalsStory * (1 - we) + exploreCur.petals * we) * (1 - wb);
  const storyWeight = (1 - we) * (1 - wb);
  world.update({ dt, time, storyT, camera, look: camLook, envState: envMix, petalsTarget, storyWeight, builderWeight: wb });
  if (gtao) {
    // drop AO if this device can't hold ~24 fps with it (unless ?ao forces it)
    if (!aoForced && !aoOff) { aoFrames++; const el = performance.now() - aoStart; if (el > 3500) { if (aoFrames / (el / 1000) < 24) aoOff = true; aoStart = performance.now(); aoFrames = 0; } }
    const d = camera.position.distanceTo(camLook);
    gtao.updateGtaoMaterial({ radius: THREE.MathUtils.clamp(d * 0.05, 0.01, 30), thickness: THREE.MathUtils.clamp(d * 0.08, 0.02, 60) });
    gtao.enabled = !aoOff && wb < 0.98 && d < 120;
  }
  updateStoryHud(storyT, storyWeight);
  fadeChapters();
  bloom.strength = 0.45 + envMix.night * 0.55;
  scene.environmentIntensity = 0.12 + (1 - envMix.night) * 0.3;
  film.uniforms.time.value = time;

  composer.render();

  // UI state
  let cur = -1;
  railItems.forEach((li, i) => { if (storyT >= +li.dataset.t - 0.02) cur = i; });
  railItems.forEach((li, i) => { li.classList.toggle('on', i === cur); li.classList.toggle('passed', i < cur); });
  rail.classList.toggle('hidden', we > 0.4 || storyT < 0.01);
  const sec = y + M.vh * 0.5 < M.exploreTop ? 'story' : y + M.vh * 0.5 < M.builderTop ? 'explore' : y + M.vh * 0.5 < M.servicesTop ? 'builder' : 'services';
  navLinks.forEach((a) => a.classList.toggle('on', a.dataset.jump === sec));

  requestAnimationFrame(frame);
}

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  for (const m of lineMats) m.resolution.set(w, h);
  measure();
}
window.addEventListener('resize', resize);

renderInfo('hotel');
document.querySelector('[data-target="hotel"]')?.setAttribute('aria-selected', 'true');
resize();
requestAnimationFrame(frame);
const reveal = () => setTimeout(() => $('#veil').classList.add('gone'), 500);
(document.fonts?.ready || Promise.resolve()).then(() => { measure(); reveal(); });
