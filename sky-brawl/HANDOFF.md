# Sky Brawl — เอกสารส่งต่องาน

> อัปเดตล่าสุด: 11 ต.ค. 2026 · ไฟล์หลัก `index.html` ยาวประมาณ 4,500 บรรทัด
> ใช้ไฟล์นี้เป็นจุดเริ่มต้นเมื่อทำงานต่อจากบัญชีอื่น หรือส่งให้ AI ตัวใหม่อ่านก่อนลงมือ

---

## 1. ภาพรวม

**Sky Brawl** เป็นเกมต่อสู้ 3 มิติแนว GetAmped เล่นบนเว็บ (Three.js r128) ทั้งเกมอยู่ในไฟล์ HTML ไฟล์เดียว
เล่นบนมือถือได้ ไม่ต้องติดตั้ง

| ลิงก์ / ที่อยู่ | ค่า |
|---|---|
| เว็บจริง | https://soradadofficial.github.io/sky-brawl/ |
| GitHub repo | `soradadofficial/soradadofficial.github.io` · branch **`root`** · โฟลเดอร์ `sky-brawl/` |
| ไฟล์บนเครื่อง (เครื่องเดิม) | `agent-trading/sky-brawl/` |
| Supabase project | `https://dngqblfvgjdoevctsnfy.supabase.co` (Region: Singapore) |
| Google OAuth | ตั้งไว้ใน Google Cloud แล้ว, Client ID ลงท้าย `…apps.googleusercontent.com` (ไม่ต้องใช้ในโค้ด) |
| เวอร์ชันเก่าบน claude.ai | https://claude.ai/artifact/HKcupQSrXvaJeHh5qnsR9o (**ล้าหลังมาก ไม่ได้ใช้แล้ว**) |

### ไฟล์ในโฟลเดอร์ `sky-brawl/`
| ไฟล์ | หน้าที่ | อัปขึ้น GitHub? |
|---|---|---|
| `index.html` | ตัวเกมทั้งหมด (HTML + CSS + JS) | ✅ |
| `og.png` | รูปปกตอนแชร์ลิงก์ 1200×630 | ✅ |
| `config.js` | ตั้งค่าที่ปรับบ่อย: คูลดาวน์/ดาเมจ/แรงกระเด็น/ฮีลของสกิล, เปิด-ปิดอาชีพ, ตัวคูณรวม | ✅ (ไม่มีไฟล์นี้เกมก็ใช้ค่าเดิม) |
| `supabase-setup.sql` | ตาราง profiles + แชตล็อบบี้ (รันแล้ว) | ❌ รันใน Supabase เท่านั้น |
| `supabase-levels.sql` | ตาราง player_stats + ฟังก์ชัน record_match (รันแล้ว) | ❌ |
| `HANDOFF.md` | ไฟล์นี้ | ไม่จำเป็น |

---

## 2. ฟีเจอร์ที่มีตอนนี้

- **ต่อสู้:** คอมโบ 3 จังหวะ, กัน, กระโดด, เตะกลางอากาศ, กระเด็น/ล้ม/ลุก, ตกขอบ = เสียชีวิต
- **อาชีพ 27 แบบ** (รวม "ไม่ใส่") — แต่ละอาชีพมีชุด, อาวุธในมือ, **คอมโบเฉพาะ** และ **สกิลเฉพาะ** (ปุ่ม E)
  none, knight, warrior, berserker, paladin, mage, priest, necro, druid, archer, assassin, ninja, samurai, monk, bard, gunner, engineer, pony, gundam, merchant, blacksmith, hunter, wizard, crusader, alchemist, rogue, taekwon
- **ไอเทม:** ค้อน, ปืนพก, ลูกซอง, ระเบิด, ข้าวปั้น (ฟื้นพลัง) — **กดปุ่มโจมตีใกล้ของ = เก็บของ** (ปุ่ม R ก็ได้)
- **ด่าน 8 ด่าน:** เรือไททานิก (`titanic`), วัดไทย (`temple`), สยาม (`siam`), สนามกิลวอ (`gvg`), ฮัลโลวีน (`halloween`), คริสต์มาส (`christmas`), ทะเลสาบน้ำแข็ง (`ice`: พื้นลื่น `slip:true` เร่ง/หยุดช้า ไถลต่อ), โรงพยาบาล (`hospital`: ห้องผ่าตัดแบบเปิดด้านหน้า มีกำแพงสามด้านเป็น BLOCKS kind `edge`, แผ่นกากบาทเขียว `pads` ฟื้นพลังตอนยืน `padHeal` ต่อ 1/3 วินาที ผ่าน `healPads()`) · โหมด: ตะลุมบอน (`ffa`), ทีมตีหิน (`team`), ตีบอส (`boss`, เล่นบนด่านคริสต์มาสเสมอ)
- **โหมด:** ตะลุมบอน (`ffa`) และ ทีมตีหิน (`team`, แบบ Emperium)
- **ออฟไลน์:** เล่นกับบอทได้สูงสุด 124 ตัว, 2 คนเครื่องเดียว
- **ออนไลน์:** ห้องละสูงสุด **64 นักสู้** (คนจริง + บอทเติม), ล็อบบี้มีรายการห้อง + แชต
- **บัญชี:** เข้าเล่นแบบไม่ระบุตัวตนอัตโนมัติ, **ผูก Google** เพื่อเก็บเลเวล/ชุดข้ามเครื่อง
- **เลเวล + ตารางอันดับ** (เลเวล / ชนะ / KO) — XP คิดฝั่งเซิร์ฟเวอร์
- **แชร์:** LINE / Facebook / X / QR code (เมนู, ห้อง, หน้าสรุปผล) + รูปปก og.png
- **อื่นๆ:** แต่งตัวละครก่อนเข้าเล่นทุกครั้ง, ปรับมุมกล้อง 5 ระดับ, ปุ่มบนจอมือถือ, ล็อกเป้า (Q), โหมดออโต้, โหมดดู hitbox (X)

### ปุ่ม (ผู้เล่น 1)
| ปุ่ม | หน้าที่ |
|---|---|
| WASD / ลูกศร | เดิน |
| F (หรือ J) | ต่อย / เก็บของ |
| G, Space (หรือ K) | กระโดด |
| H (หรือ L) | กัน (กดค้าง) |
| R (หรือ U) | หยิบ / ขว้างระเบิด |
| E (หรือ I) | สกิลอาชีพ |
| Q (หรือ O) | ล็อกเป้า |
| - / = / ล้อเมาส์ | ปรับมุมกล้อง |
| X | แสดง hitbox + เฟรมดาต้า |
| Esc | เมนูพัก |

---

## 3. โครงสร้างโค้ดใน `index.html`

ค้นหาด้วยหัวข้อคอมเมนต์ `/* ---------- ชื่อส่วน ---------- */` (เรียงตามลำดับในไฟล์)

| ส่วน | ของสำคัญในส่วนนั้น |
|---|---|
| Frame data | `MOVES` (ทุกท่าเป็นข้อมูล: startup/active/recovery/dmg/kb/…), `SKILL_INFO`, `CLASS_COMBO`, `CLASS_REACH` |
| The ship / Renderer & world | `hw(x)` รูปทรงเรือ, `scene`, `camera`, `renderer`, `toon()`, `part()`, `SPH()` |
| Draw-call batching | `mergeMeshes(container, skip)`, `stageSkip()` — รวมชิ้นส่วนที่ไม่ขยับเพื่อลดภาระวาดภาพ |
| More stages / Guild war / Halloween | `STAGES = {titanic, temple, siam, gvg, halloween}` แต่ละด่านมี `inside`, `pushOut`, `obstacles`, `fallY`, `spawn`, `preview`, `fx`; ฟังก์ชัน `setStage(key)` |
| Character customization | `OUTFITS` (อาชีพ/ชุด), `LOOKS[0]` (ผู้เล่น 1), `LOOKS[1]`, `encLook/decLook`, `seededLook` (หน้าตาบอทจาก seed) |
| Models | `buildChibi()`, `buildClassWeapon()`, `buildOffhand()`, `buildGun()` |
| FX | instanced particles `emit()`, `flash()`, `RINGS/BLOBS` (วงทีม/เงาใต้เท้า), `updateGroundMarks()` |
| Game state | `G` (สถานะเกมทั้งหมด), `class Fighter`, `createFighters()`, `spawnPoint()` |
| Input / Bots / Targeting | `MAP1/MAP2/MAPALT`, `touch`, `think(b)` (AI บอท), ล็อกเป้า |
| Combat / Items | `startMove`, `checkHits` (รองรับ `sweep`), `applyHit`, `aoe`, `fireProj`, `doGrab` (คืนค่า true เมื่อเก็บได้) |
| Team stones | โหมดทีม: `makeStones`, `damageStone`, `endTeamMatch` |
| Simulation | `stepFighter`, `physics`, `tick()` (60 Hz fixed step) |
| Pose & render / HUD / Flow | `pose()`, `render()`, `buildHud()`, `beginMatch()`, `startOffline()`, `showResult()` |
| Online (PeerJS) | `PeerLobby` (ล็อบบี้สำรอง), `Net` (host คำนวณเกม, guest ส่ง input + รับ snapshot), `Net.sendEvery()` |
| Supabase | `Supa` (client + anonymous sign-in), `SupaLobby` (presence = รายการห้อง, แชต), `Lobby` (ตัวเลือกใช้ Supa ก่อน ถ้าล่มใช้ PeerLobby) |
| Levels | `Progress` (record_match), `Ranks` (ตารางอันดับ), `renderLevelChip`, `showXp` |
| Google account | `Account` (`linkGoogle`, `useExisting`, `restore`, `signOut`), `renderAccount` |
| Online UI / Customize / Wiring | `renderLobby`, `renderRoomView`, หน้าแต่งตัว, ผูกปุ่มทั้งหมด, `ensureName`, การแชร์ (`setShares`, `drawQr`) |

### ระบบออนไลน์ทำงานยังไง
1. **ล็อบบี้:** Supabase Realtime channel `skybrawl-lobby` — แต่ละแท็บ `track({nm, room})` → ทุกคนเห็นรายการห้องจาก presence
2. **ตัวแมตช์:** PeerJS (WebRTC) แบบเครื่องคุยกันตรง — host สร้าง peer id `skybrawl-v1-<code>`, guest ต่อเข้ามา
3. host คำนวณเกมทั้งหมด → ส่ง snapshot (`hostSend`) 10–30 ครั้ง/วินาที ตามจำนวน guest; guest ส่งเฉพาะ input (`sendInput`)
4. ลิงก์เชิญ: `?room=<code>` (รองรับ `#<code>` แบบเก่าด้วย)
5. ⚠️ host ต้องเปิดแท็บค้างไว้; ห้องที่มีคนจริงเยอะต้องใช้เน็ตอัปโหลดแรง (63 guest ≈ 21 Mbps)

### Supabase (ตาราง + สิทธิ์)
| ตาราง / ฟังก์ชัน | ใครทำอะไรได้ |
|---|---|
| `profiles` (id, name, look) | ผู้เล่นที่ล็อกอินอ่านได้ทุกแถว, เขียน/แก้ได้เฉพาะของตัวเอง |
| `lobby_messages` | อ่านได้ทุกคนที่ล็อกอิน, ส่งได้ในชื่อตัวเอง, ≤120 ตัวอักษร, ≤1 ข้อความ/วินาที (trigger) |
| `player_stats` (xp, level, matches, wins, kos) | **อ่านได้อย่างเดียว** — เขียนผ่าน `record_match()` เท่านั้น |
| `record_match(p_place, p_players, p_kos, p_dmg, p_online)` | เซิร์ฟเวอร์คิด XP เอง: 20 + KO×5 + ชนะ 40 / Top3 20 + จำนวนคู่แข่ง (≤32), เพดาน 200, ออนไลน์ ×1.5, บันทึกได้ 1 แมตช์/30 วิ |

- สูตรเลเวล: เลเวล L เริ่มที่ `50 × (L−1)²` XP (Lv2=50, Lv5=800, Lv10=4,050)
- ตั้งค่าใน Supabase ที่เปิดไว้แล้ว: Anonymous sign-ins ✅, Google provider ✅, Manual linking ✅, Site URL = `https://soradadofficial.github.io/sky-brawl/`, Redirect URLs มี `https://soradadofficial.github.io/sky-brawl/**` และ `http://localhost:8765/**`
- **anon key** อยู่ใน `index.html` (`SUPA_KEY`) — ใส่ในหน้าเว็บได้ปลอดภัย; **ห้ามใส่ `service_role` key ในไฟล์หรือส่งให้ใครเด็ดขาด**

---

## 4. วิธีทำงานต่อ (สำคัญ)

### กฎข้อแรก: ดึงไฟล์จาก GitHub มาเทียบก่อนแก้ทุกครั้ง
เจ้าของเกมแก้ไฟล์บน GitHub เองด้วย (เคยเพิ่มด่าน GvG, ฮาโลวีน, โหมดทีม, อาชีพเพิ่ม ฯลฯ ด้วยตัวเอง)
```bash
curl -sSL -o remote-index.html "https://raw.githubusercontent.com/soradadofficial/soradadofficial.github.io/root/sky-brawl/index.html"
```
แล้ว diff กับไฟล์บนเครื่อง ถ้าต่างกัน ให้ใช้ไฟล์จาก GitHub เป็นตัวตั้ง

### วิธีแก้โค้ดที่ปลอดภัย
- ไฟล์ใหญ่มาก → แก้แบบ "หาข้อความเดิมแล้วแทนที่" โดย**ต้องเจอข้อความนั้นครบตามจำนวนที่คาด** ถ้าไม่เจอให้หยุด (กันแก้ผิดที่)
- หลังแก้ ตรวจไวยากรณ์ JS:
  ```bash
  awk '/<script>/{f=1;next}/<\/script>/{f=0}f' index.html > chk.js && node --check chk.js
  ```
- ทำตามสไตล์เดิม: ท่าใหม่ → เพิ่มใน `MOVES`; อาชีพใหม่ → เพิ่มใน `OUTFITS` + `SKILL_INFO` + `CLASS_COMBO` + `sk_<class>`; ด่านใหม่ → เพิ่มใน `STAGES` (ของที่ขยับได้ต้องเก็บไว้ใน `group.userData` ไม่งั้นจะถูก `mergeMeshes` รวมจนขยับไม่ได้)

### ทดสอบบนเครื่อง
```bash
python -m http.server 8765 --directory sky-brawl
```
เปิด http://localhost:8765 (Supabase อนุญาต localhost:8765 ไว้แล้ว)
- ทดสอบออนไลน์: เปิด 2 แท็บ — แท็บที่อยู่ข้างหลังจะหยุดทำงาน ต้องสลับไปมา
- เทคนิคทดสอบอัตโนมัติ: ชั่วคราวเติม `window.__SB = {G, tick, ...};` ต่อท้าย `requestAnimationFrame(loop);` แล้วเรียก `tick()` ตรงๆ — **ลบออกก่อนอัปทุกครั้ง**

### Gotchas ที่เคยเจอ
- ตัวละครที่ `ctrl: 'none'` ยังอ่านคีย์บอร์ดอยู่ → ถ้าจะให้ยืนนิ่งตอนทดสอบใช้ `ctrl: 'net'` + `peer: ''`
- `InstancedMesh.setColorAt` สร้างบัฟเฟอร์ตาม `count` ปัจจุบัน → ตั้งสีให้ครบก่อนค่อยตั้ง `count = 0`
- ตัวเลือก `.ctabs .tab` ต้องจำกัดด้วย `#custom` (หน้าแต่งตัว) ไม่งั้นไปจับแท็บตารางอันดับด้วย
- `Net.adv()` ต้องเช็ก `!this.peer` — ตอนออกจากห้อง การปิดการเชื่อมต่อเคยทำให้ห้องเด้งกลับเข้ารายการ
- Facebook ตัด `#fragment` ทิ้ง → ลิงก์ห้องต้องเป็น `?room=`
- หลัง OAuth ถ้าไปโผล่ `localhost:3000` = Site URL ใน Supabase ผิด

### กำแพง / ชั้นยืน (BLOCKS), บอส, ฮีลเพื่อน
- ด่านไหนจะมีกำแพงหรือชั้นยืน: ใส่ `blocks:[{x, z, hx, hz, h}]` ใน `STAGES` (hx/hz = ครึ่งความกว้าง) สูง ≤ 1.8 กระโดดขึ้นไปยืนได้, สูงกว่านั้นเป็นกำแพง; ฟิสิกส์ (`physics`), กระสุน, ระเบิด, จุดเกิด, ไอเทม และบอทเดินเลี่ยง (`steerAroundObstacles`) รองรับให้แล้ว ต้องสร้างโมเดลในฟังก์ชัน build ของด่านให้ตรงตำแหน่งเอง
- โหมด `boss` (`MODE_KEYS[2]`, `stageFor()` บังคับด่าน `christmas`) → `G.raid` = โหมดช่วยกันตีบอส ด่านคริสต์มาสในโหมดอื่นเล่นปกติไม่มีบอส, ทุกคน `side = 0` (ตีกันเองไม่เข้า), บอสอยู่ใน `G.boss` (`makeBoss`, `stepBoss`, `damageBoss`, `endRaid`), ท่าบอส: ทุบพื้น (ยืนบนชั้นหรือกระโดดหลบได้), ปาหิมะ (กำแพงบังได้), หมุนตัวตอนคลั่ง (<30%)
- สถานะผิดปกติ: `f.chill` = แช่แข็ง (นักเวทน้ำแข็ง `frost`, ท่า `sk_frost` มี `freeze`), `f.shock` = ชา (นักเวทสายฟ้า `volt`, `sk_volt` → `chainLightning`, มี `shock`) ใส่ `freeze`/`shock` ในท่าไหนก็ได้ผลเหมือนกัน (`applyHit` → `freezeF`/`shockF`) ส่งให้ guest ทาง flags 32/64 ใน `encF`
- อาชีพใหม่: นักดาบปีศาจ `demon` (ฟันแล้วปล่อย `darkWave` กระสุนทะลุ `pierce` กว้าง `b.rad`), ตำรวจอวกาศ `spacecop` (ดาบเลเซอร์ สกิลกระสุน `saber` บินกลับหาเจ้าของ `b.back`), ทหาร `soldier` (ระเบิด `throwGrenade` = bomb ชนิด `grenade`, ท่ามี `grenade:N` = ขว้างทุก N เฟรม)
- นักเวทน้ำแข็งใช้ `iceStorm` → พื้นที่ใน `G.zones` (`stepZones` ฝั่ง host, `zoneFx` วาดทั้งสองฝั่ง, ส่งให้ guest ใน `sn.zn`)
- สีชุดอาชีพ: `look.oc` = ลำดับใน `OUTFIT_TINTS` (0 = สีเดิม) `buildChibi` ทาสีใหม่เฉพาะชิ้นที่ชุดอาชีพสร้าง (`recolor`) ส่งเป็นช่องที่ 8 ของ `encLook`
- ห้องออนไลน์: `config.js` → `online.maxPlayers` / `maxHumans` (`ONLINE_MAX`, `ONLINE_HUMANS`, สูงสุด 124)
- HUD มือถือแนวนอน: `@media (max-height:520px)` ย่อทุกอย่าง ปุ่มเมนูเรียงแถวเดียว (`#hudBtns`) รายชื่อนักสู้ (`#board`) พับไว้ แตะหัวเพื่อเปิด
- ออนไลน์: host ส่งสถานะบอสใน snapshot `sn.bs`, ผลแข่ง raid ส่งเป็น win = -20 (ชนะ) / -21 (แพ้)
- ฮีล: `groupHeal` (นักบวช, รัศมี 7) และ `healOne` (อาชีพใหม่ `acolyte`, ฮีลเพื่อนเลือดน้อยสุดในระยะ 10) มีผลเฉพาะ `ally()` + ตัวเอง; บอทใช้เมื่อ `wantsHeal()`

### ปรับค่าเกมด้วย `config.js` (ไม่ต้องแก้ index.html)
- แก้ตัวเลขใน `config.js` แล้วอัปขึ้น GitHub ไว้ข้าง `index.html` → รีเฟรชเกมก็ได้ค่าใหม่
- `global` ตัวคูณรวม (skillCooldown / skillDamage / skillKnockback), `classes` เปิด-ปิดอาชีพ (`false` = ปิด), `skills.<อาชีพ>` = `cd` (วินาที), `dmg`, `kb`, `heal`
- ค่าที่ไม่ใส่ = ใช้ค่าในเกม, ค่าผิด = ข้ามพร้อมเตือนใน Console ขึ้นต้น `[config.js]`, ไฟล์พังหรือหาย = เกมใช้ค่าเดิมทั้งหมด
- ในโค้ด: `applyConfig()` อยู่ต่อจาก `OUTFIT_K`; อาชีพที่เปิดอยู่คือ `ON_K` / `CLASS_ON` (บอทสุ่ม, หน้าแต่งตัว, `setLook` ใช้ชุดนี้)
- สกิลมือปืนกับวิศวกรใช้ข้อมูลกระสุน `RAPID_SHOT` / `TURRET_SHOT` แทน `MOVES.sk_*`
- เพิ่มอาชีพใหม่แล้วอยากให้ปรับใน config ได้: ใส่บรรทัดใน `classes` และ `skills` ของ `config.js` ด้วย

---

### เสียง (Web Audio สังเคราะห์สด — ไม่มีไฟล์เสียง)
- โค้ดอยู่หัวข้อ `/* ---------- Sound … */` ก่อนตาราง `MOVES`: `makeKit(ctx)` (ตัวสร้างเสียง `T` = โทน, `N` = นอยส์), `SFX_R` (สูตรเสียงทุกตัว: `gap` ห่างกันขั้นต่ำกี่ ms, `v` ความดัง, `dur`, `prio` ข้ามเพดาน 26 เสียง, `ui` เล่นนอกแมตช์ได้), `MUS_TRK` + `musicStep()` (เพลงวน 2 แบบ `battle`/`menu`), `Sfx` (`play(name, pos, vol)`, `move`, `proj`, `banner`, `result`, `cycle`)
- เบราว์เซอร์ให้เล่นเสียงได้หลังผู้ใช้แตะ/กดครั้งแรกเท่านั้น → `unlock()` ผูกกับ pointerdown/keydown/touchend; แท็บถูกซ่อนจะ `suspend()` เอง
- เสียงมีตำแหน่ง: ยิ่งไกลจากตัวผู้เล่น (ไม่มีตัวเอง = จุดกล้องมอง) ยิ่งเบา ไกลเกิน 34 ช่องไม่ดัง และแพนซ้าย/ขวาตามตำแหน่งบนจอ; เล่นพร้อมกันได้สูงสุด 26 เสียง กันห้อง 124 คนดังเละ
- จุดที่เรียกเสียง: `startMove` (ฟาด/สกิล), `applyHit` (ต่อย/โดนแรง/กัน/กันแตก/KO), `fireGun` / `fireProj` (ยิง), `explodeFx` (ระเบิด), `splash` (ตกน้ำ), `doGrab` (เก็บของ), `popup(..., 'heal')` (ฮีล), กระโดด/ล้ม, `banner()` (นับถอยหลัง, LEVEL UP), `showResult` (ชนะ/แพ้), บอสหิมะ; **ผู้เล่นออนไลน์ที่เป็น guest** ไม่ได้คำนวณเกมเอง จึงมีจุดเรียกเสียงแยกใน `Net.applySnap` (พลังลด → เสียงโดนตี, ท่าเปลี่ยน → เสียงฟาด, กระสุนใหม่, ไอเทมหาย, KO)
- ปุ่ม "เสียง" ในเมนูหลักและเมนูพัก วนโหมด เปิดทั้งหมด → เฉพาะเอฟเฟกต์ → ปิด (จำใน localStorage `skybrawl.sound`); ค่าเริ่มต้นของคนที่ยังไม่เคยกดตั้งได้ที่ `config.js` → `sound: { volume, effects, music }`
- เพิ่มเสียงใหม่: เติมใน `SFX_R` แล้วเรียก `Sfx.play('ชื่อ', ตำแหน่ง)`; ทดสอบแบบไม่ต้องฟังได้ด้วย `OfflineAudioContext` (วัด peak/rms/NaN) ดูวิธีในประวัติแชต
- iPhone: สวิตช์ปิดเสียง (silent switch) ที่ข้างเครื่องจะปิดเสียงเกมด้วย

## 5. ข้อจำกัดที่รู้อยู่แล้ว

- **กันโกงไม่ 100%:** ผลแข่งคำนวณบนเครื่อง host/ผู้เล่น → แต่งผลได้ แต่ XP ถูกจำกัดเพดาน/ความถี่ฝั่งเซิร์ฟเวอร์แล้ว ถ้าจะกันจริงต้องมีเซิร์ฟเวอร์เกม
- **ห้องคนจริงเยอะ** ขึ้นกับเน็ตอัปโหลดของ host
- **การต่อเข้าห้อง:** ลองต่อตรง (WebRTC) ก่อน ถ้าไม่ติดใน 12 วินาที จะสลับไปส่งข้อมูลผ่าน Supabase Realtime เอง (`Relay` / `RelayConn` ใน index.html, ช่อง `sbr-<รหัสห้อง>` และ `sbr-<รหัสห้อง>-<id ผู้เล่น>`) ผู้เล่นทางนี้ได้ภาพ 10 ครั้ง/วินาที ใช้ราว 35 ข้อความ/วินาที แพ็กฟรีได้ 100 ข้อความ/วินาทีทั้งโปรเจกต์ และ 2 ล้านข้อความ/เดือน จึงจำกัดไว้ 3 คนต่อห้อง (`config.js` → `network.relayMax`, `supaRelay`)
- **TURN relay:** ไม่มี TURN สาธารณะในโค้ดแล้ว (บัญชี Open Relay แบบแชร์ใช้ไม่ได้แล้ว) ใส่ของตัวเองได้ใน `config.js` → `network.rmsKey` (คีย์ pk_live ของ Metered) / `turnApi` / `iceServers`
- **ยังไม่มีตัวกรองคำหยาบ / ปุ่มรายงาน** ทั้งชื่อและแชต
- **ชื่อ "กันดั้ม" / "โพนี่"** เป็นเครื่องหมายการค้าของบริษัทอื่น — ถ้าเกมเริ่มดังหรือหารายได้ ควรเปลี่ยนชื่อ/ดีไซน์
- หน้าล็อกอิน Google แสดงโดเมน `…supabase.co` (ถ้าอยากให้ขึ้นชื่อเว็บต้องใช้ custom domain แบบเสียเงิน)
- ข้อมูลทดสอบที่อาจค้างใน Supabase: บัญชี "HostTest" ในตารางอันดับ (id `2eeee655-d003-4131-92ac-6df943187d27`) และข้อความทดสอบในแชต ลบได้ใน SQL Editor

## 6. งานที่วางแผนไว้ (เรียงตามความสำคัญ)

1. **ตัวกรองคำหยาบ + ปุ่มรายงาน/ปิดเสียงผู้เล่น** (ชื่อ + แชต) — ก่อนเปิดให้คนแปลกหน้าเล่นเยอะๆ
2. **ของรางวัลตามเลเวล** เช่น ปลดล็อกชุดพิเศษที่ Lv.5/10/20
3. **คลิปไฮไลต์อัตโนมัติ** (อัด 10 วินาทีล่าสุดตอน KO แล้วแชร์ TikTok/Reels) + การ์ดผลแข่งเป็นรูป
4. **PWA** ให้กดเพิ่มลงหน้าจอมือถือได้
5. **เซิร์ฟเวอร์เกมจริง** (แนะนำ Cloudflare Durable Objects / PartyKit หรือ Colyseus) สำหรับห้อง 64–124 คนจริงและกันโกงเต็มรูปแบบ — ใช้บัญชี Supabase เดิมต่อได้
6. โหมดใหม่: Battle Royale เรือค่อยๆ จม, บอสใหญ่ vs คนดูสตรีม, กิจกรรมตามเทศกาล (สงกรานต์, ลอยกระทง)

---

## 7. ข้อความสั้นสำหรับเริ่มคุยกับ AI ตัวใหม่

> ผมกำลังทำเกม Sky Brawl (เกมต่อสู้ 3D บนเว็บ ไฟล์เดียว `index.html`, Three.js r128, PeerJS, Supabase)
> โปรดอ่าน `sky-brawl/HANDOFF.md` ก่อน แล้วดึงไฟล์ล่าสุดจาก GitHub มาเทียบกับไฟล์บนเครื่องก่อนแก้อะไร
> แก้แบบหาข้อความเดิมแล้วแทนที่ ตรวจ `node --check` หลังแก้ และทดสอบที่ http://localhost:8765 ก่อนให้ผมอัปขึ้น GitHub
> งานต่อไปที่อยากทำคือ: ______

## แปลงร่าง (มนุษย์หมาป่า / เทมเมอร์) + แต่งตัวจากล็อบบี้ (2026-10-12)
- คลาสใหม่ `werewolf`, `tamer` (ต่อท้าย `OUTFITS` เพื่อไม่ให้เลข index ของ look ที่เซฟไว้เลื่อน) ท่าปกติ `ww1-3` / `tm1-3` (แส้ของเทมเมอร์อยู่ใน `buildClassWeapon`)
- `FORM_INFO[cls]` = {secs, scale, speed, atk, moves, stop, reach}; สกิล `sk_werewolf`/`sk_tamer` (มี `form:true`, `fire:startForm`) ตั้ง `f.formT` (เฟรม) ระหว่างแปลงร่าง `attackKey()` คืนท่าของร่างนั้น (`wf1-3` ตะปบวงกว้าง `sweep` rad 2.8–3.4 / `dg1` พ่นไฟ `breath:true`)
- `dg1` ไม่ใช้ `checkHits` แต่ `breathTick()` (host เท่านั้น) ตีทุกคนในรูปกรวย (`range`, `arc`, ทุก `tick` เฟรม) + หินทีม + บอส; เอฟเฟกต์ไฟ/ฟ้าวาดจาก `formMoveFx()` ในฟังก์ชัน `pose` ทุกเครื่อง
- โมเดลร่างเป็นชิ้นส่วนสวมทับตัวเดิม (`attachForm`: หัว/ลำตัว/แขน/ขา/ปีก/หาง) ซ่อนไว้จน `formT>0`, ตัวใหญ่ขึ้นด้วย `root.scale` (`poseForm`), เนื่องจากอยู่ใต้ `tilt` ต้อง attach หลัง `mergeMeshes` ทุกอันใน `buildChibi`
- ออนไลน์: บิต 128 ใน flags ของ `Net.encF` = กำลังแปลงร่าง guest ตั้ง `formT=30` และยิง `formFx`/`endForm` ตอนบิตเปลี่ยน
- config.js: `classes.werewolf/tamer`, `skills.werewolf/tamer` มี `form` (วินาทีที่แปลงร่าง) เพิ่มจาก cd/dmg/kb โดย dmg/kb ของสกิลจะถูกคัดลอกไปที่ท่าของร่าง (`MOVES.wf*`/`dg1`, คูณด้วย `fmul`/`kbmul` ถ้ามี) ผ่าน `FORM_INFO[k].moves`
- เสียงใหม่ `howl`, `roar`, `claw`, `flame` และ `m.snd` ในท่า = เล่นเสียงนี้แทนเสียงเริ่มท่าปกติ (`Sfx.move`)
- แต่งตัวจากล็อบบี้/ห้อง: ปุ่ม `#lobbyCust`, `#roomCust` → `customizeFromOnline()` เปิด `#custom` (class `single` ซ่อนแท็บ P1/P2) กด "บันทึก" กลับไปล็อบบี้/ห้อง แล้วเรียก `Net.lookChanged()` (host = `refreshSlots`, guest = ส่ง presence `nm`+`lk`); รายชื่อนักสู้ในห้องแสดงป้ายอาชีพ

## ชาแมน + แลนเซอร์ (2026-10-12)
- `shaman`: ท่า `sm1-3` (ไม้เท้าวิญญาณ, `sm3` ระเบิดวิญญาณ `aoe`) สกิล `sk_shaman` → `summonGhost(f)` ผีนักดาบอยู่ใน `G.ghosts` (แบบเดียวกับ `G.turrets`) host เดินด้วย `stepGhosts()` ไล่ศัตรูใกล้สุดในรัศมี 16 จากชาแมน (หรือบอส) ฟันทุก `GHOST_INFO.every` เฟรมด้วย `ghostSlash()` = `GHOST_SLASH` วงหน้า + คลื่นดำ `dark` ทะลุแบบนักดาบปีศาจ; หายเมื่อครบ `GHOST_INFO.secs` หรือชาแมนตาย/เรียกตัวใหม่
- ออนไลน์: snapshot `gh:[id,x,z,rot,sw]` (`sw` = เฟรมตั้งแต่เริ่มฟัน, -1 = ไม่ฟัน) ท่าฟัน/แฟลชวาดใน `animGhosts()` (เรียกจาก `render()` ทุกเครื่อง)
- config: `skills.shaman` dmg/kb = ฟันของผี (`GHOST_SLASH`), `life` = วินาทีที่ผีอยู่
- `lancer`: หอก (`buildClassWeapon`) ท่า `ln1-2` ปกติ, `ln3` แทงทะลวงเป็นแนวยาว 5; สกิล `sk_lancer` (anim `jab`) ใช้ `lance:true` → `lanceTick()` (host) ตีทุกคนในแถบยาว `len` กว้าง `wid` ทุก `tick` เฟรม ครั้งสุดท้ายกระเด็น (kb×3.5); เอฟเฟกต์ `lanceFx()` ใน `pose`
- เสียงใหม่ `spirit`, `lance`
