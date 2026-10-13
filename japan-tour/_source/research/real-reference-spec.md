# Tour Test · Japan Journeys: real-world reference spec

Researched and fact-checked on 13 Oct 2026. Each topic was researched from web sources and then checked by a second, independent pass that tried to refute every number and coordinate. Wrong values were corrected and unsupported ones removed. Items marked *gap*, *derived* or *L* (low confidence) still need checking against imagery.

Coordinates are WGS84 decimal degrees and lengths are metres. Source keys in each section map to the URLs listed at the end of that section.

- **Suvarnabhumi Airport**: 62 claims checked (40 confirmed, 17 corrected, 4 removed, 1 unverifiable)
- **Narita Airport and the BKK→NRT flight**: 72 claims checked (39 confirmed, 26 corrected, 4 removed, 3 unverifiable)
- **Hotels and rooms**: 47 claims checked (31 confirmed, 15 corrected, 1 removed, 0 unverifiable)
- **Landmarks and vehicles**: 58 claims checked (44 confirmed, 9 corrected, 4 removed, 1 unverifiable)
- **Coach routes on real roads**: 48 claims checked (34 confirmed, 11 corrected, 1 removed, 2 unverifiable)


---

## Suvarnabhumi (BKK/VTBS): build reference (Oct 2026, fact-checked)

[Keys] map to URLs at the end. "calc" means a WGS84 geodesic computation from the cited coordinates.

**Grid:** u runs along the runway axis (014.41° true) and v across it (104.41°). Origin: the centroid of OSM terminal way 26071844, 13.69134, 100.75052 [MC1]. **ARP:** 13.68583, 100.74889, elevation 2 m, at the "midpoint between taxiways G, H, H2, H3" [AIP].

### 1. Runways [AIP AD 2.12, AIRAC 01 OCT 2026]
All three are parallel, asphalt, 60 m wide, with no arresting system. The thresholds give 014.41°/194.41° (calc). The AIP prints 014.42° (01, 02R) and 014.00° (02L).

| RWY | Pos | Len | S THR | N THR | THR elev |
|---|---|---|---|---|---|
| 02L/20R (new) | W | 4000 | 13.66517, 100.72924 | 13.70019, 100.73845 | 2 m |
| 02R/20L (ex-01L/19R) | mid | 3700 | 13.67128, 100.73466 | 13.70367, 100.74318 | 1.3/1.2 m |
| 01/19 (ex-01R/19L) | E | 4000 | 13.65670, 100.75183 | 13.69171, 100.76103 | 1.1 m |

- **Checks (calc):** the thresholds are 3999.7, 3700.2 and 4000.0 m apart. Centrelines are 2,200 m apart for 01/19 and 02R/20L [AT] and 400 m for 02R/20L and 02L/20R [AIC24].
- **Stagger along u** (calc, 01 THR = 0): 02L +300, 02R +1,100, 19 +4,000, 20R +4,300, 20L +4,800.
- **Strips:** 4120×300 (01/19, 02L/20R), 3820×300 (02R/20L). **RESA:** 240×150 (240×120 for 02L/20R). **Clearways:** 02R 1100×150, 20L 700×150, 19 550×150. No stopways.
- **Jet-blast areas:** 120×75 (01/19, 02R/20L) and 120×60 (02L/20R). Only 02R/20L is grooved [AIP]. Shoulders are not published.
- **Third runway:** Phase 1 (non-instrument) 15 Sep 2024 [AIC24]; redesignated with RNP approaches 3 Oct 2024 [SUP]; official operations 1 Nov 2024, capacity 68 → 94 flights/h [PM24]. Still non-precision [AIC25]. ILS CAT II is planned for 2027 and taxiway F13 (F south to D) for 2026 [AIC26].

### 2. Main terminal (Murphy/Jahn; Werner Sobek et al. [STR])
- **Building:** 444×111 m, 7 floors above ground. 563,000 m² across the terminal and its concourses [STR][AOT].
- **Roof:** 561×210 m on 16 supports, about 40 m up. Trusses span 126 m (main) and 81 m (secondary) [WS]. The glazing is 40 m high [JAHN].
- **AIP obstacle "Terminal Building":** 52.0 m AMSL at 13.69086, 100.75303 [AIP], i.e. u +16, v +276 (calc).
- **Axis:** 104.4°/284.4°. The centroid is 1,091 m from 01/19 and 1,109 m from 02R/20L (calc).
- **Placement: UNRESOLVED.** The derived hall and roof corners overlapped the D frontage (u −8…+34), so I deleted them. Use OSM way 26071844.
- **Levels:** 4 departures and curb; 3 airside; 2 arrivals; 1 ground transport; B rail [CRT].

### 3. Concourses A–G: an "H" with side stubs
- **Gate points** are AIP nose-wheel positions, all checked [PK2][PK3]. The concourses are 42 m wide, 3,100 m in total [WS].
- **Layout (derived):** D crossbar at u ≈ +13. East bar at v ≈ +397 (A north, C south, B east). West bar at v ≈ −413 (G north, E south, F west). The derived lengths sum to about 3,290 m, so the tips are likely overstated.

| Conc | Use [SPOT] | Gates | Runs | First → last gate | Tip (derived) | Len |
|---|---|---|---|---|---|---|
| A | dom | A1–A6 E face | N | 13.69170,100.75495 → 13.69448,100.75563 | 13.69494,100.75526 | ~480 |
| B | dom | B1–B6 | E | 13.69076,100.75551 → 13.68951,100.75643 | 13.68987,100.75691 | ~290 |
| C | intl | C1–C10 | S | 13.68913,100.75423 → 13.68668,100.75258 | 13.68622,100.75296 | ~480 |
| D | intl | D1–D8 S face | E–W | 13.69037,100.75270 → 13.69155,100.74800 | — | ~810 |
| E | intl | E1–E10 | S | 13.69095,100.74698 → 13.68851,100.74533 | 13.68804,100.74570 | ~480 |
| F | intl | F1–F6 | W | 13.69223,100.74546 → 13.69348,100.74453 | 13.69308,100.74405 | ~290 |
| G | intl | G1–G5 W face | N | 13.69378,100.74667 → 13.69637,100.74728 | 13.69658,100.74795 | ~460 |

- **Junctions (derived):** east 13.69057, 100.75411; west 13.69238, 100.74684; crossbar centre 13.69145, 100.75055.
- **Stands:** 51 contact gates, 69 remote, 120 bays [AOT].
- **Aprons:** Main 301–308 [PK3]. East 101–134 [PK2] and 201–203 [PK3], north end about 13.7054. West up to stand 525 at 13.71317, 100.74974 [PK4]. Area 887,833 m² (pre-SAT-1) [AOT].

### 4. SAT-1
- **Opening:** 28 Sep 2023 [APM]; fully open from early 2024 [WP].
- **Size:** 28 gates S101–S128, 8 of them Code F; 4 levels; 216,000 m² [HOK]. Wikipedia gives 251,400 m² [WP].
- **Layout:** odd stands on the north row, even on the south, 156 m apart. S101 (13.68188, 100.75276) to S128 (13.68278, 100.74339) [PK4] spans 1,019 m parallel to the terminal (calc).
- **Centre:** 13.68233, 100.74807, 1,044 m from the crossbar centre at 194.9° (calc).
- **APM:** underground, 1 km, about 2 min, 6 two-car trains, max 80 km/h, Siemens NeoVAL [APM]. The terminal station is at 13.69143, 100.75048 [MC3].

### 5. Control tower
- **Position:** 13.69644, 100.74958 [AIP], 574 m from the centroid on a bearing of about 350° (calc).
- **Height:** 132.2 m architectural, completed 2005 [CTBUH]. Wikipedia also says 135 m [WP]. The AIP pole top is 142.1 m AMSL [AIP], so the tip is about 140 m above ground (calc).
- **Apron towers:** East at 13.69000, 100.75447 (52.3 m AMSL). West at 13.69206, 100.74625 (51.9 m) [AIP].

### 6. Taxiways, other structures, access
- **Taxiways:** B–H, J, K, T1–T19 and W/Y/Z (no "A" found). Minimum width 25 m [AIP]. The threshold entry links are unverified.
- **Obstacles (m AMSL)** [AIP]: hangar 49.5 at 13.70656, 100.76094; offices 49.5 at 13.70753, 100.75853 and 46.2 at 13.71103, 100.75836; SMR tower 46.6 at 13.68483, 100.74267.
- **Cargo terminal:** 190,000 m² [AT]. Not located.
- **Rail:** the ARL station is at 13.69430, 100.75129 [MC2], 338 m north of the centroid (calc). It is underground and integrated with the terminal; the next stop is Lat Krabang [ST]. The line runs 28.6 km to Phaya Thai [WP].
- **Roads:**
  - The elevated terminal roads connect with Motorway 7 [NAT].
  - From Bang Na: Burapha Withi Expressway, then Route 9, then Route 7. King Kaeo Road gives another link [TG].
  - Roadworks close 3 of 5 lanes in phases from 31 Aug 2026 to 7 Apr 2027 [NAT].
- **City:** 28.5 km at 283.7° to Bangkok 13.75250, 100.49417 (calc [BKK]). The AIP says "25 km East" [AIP]; AOT says about 31 km [AOT].

### 7. Northeast departure (NRT, initial track 051.1° to 35.76528, 140.38556, calc [NRT])
- **Roles:** 02R/20L is the primary departure runway, 02L/20R the primary arrival runway and 01/19 mixed; ATC allocates them in real time [AIC25].
- **Season:** north flow Oct 2022–Feb 2023 [PM22]. The spotter guide gives north Oct–Dec and south Feb–Apr [SPOT]. Model a **02R departure at 014°** (inference).
- **SIDs:** the RNAV SIDs for 02R (…1S), 20L (…1R) and 20R (…1P), SELKA included, state "NO TURN BEFORE DER" and an initial climb of 3000 ft [SID].
- **SELKA:** 14.35997, 101.99653 [OPN], 154 km at 060.9° from the ARP (calc). Its use for NRT is inference.
- **Path:** straight out on 014° past the 20L end, then right toward about 061°.

### Source keys
AIP https://aip.caat.or.th/2026-10-01-AIRAC/html/eAIP/VT-AD-2.VTBS-en-GB.html
AIC24 https://aip.caat.or.th/2024-06-28/html/eAIC/VT-eAIC-24-08-en-GB.html
SUP https://aip.caat.or.th/2024-10-03-AIRAC/html/eSUP/VT-eSUP-24-42-A-en-GB.html
AIC25 https://aip.caat.or.th/2025-08-21/html/eAIC/VT-eAIC-25-07-en-GB.html
AIC26 https://aip.caat.or.th/2025-12-18/html/eAIC/VT-eAIC-26-02-en-GB.html
PK2 https://aip.caat.or.th/2024-03-21-AIRAC/graphics/187052.pdf
PK3 https://aip.caat.or.th/2024-03-21-AIRAC/graphics/187053.pdf
PK4 https://aip.caat.or.th/2024-03-21-AIRAC/graphics/187054.pdf
SID https://aip.caat.or.th/2026-05-14-AIRAC/graphics/299128.pdf https://aip.caat.or.th/2025-10-02-AIRAC/graphics/287677.pdf https://aip.caat.or.th/2026-05-14-AIRAC/graphics/299131.pdf
OPN https://opennav.com/waypoint/TH/SELKA
PM24 https://www.pattayamail.com/thailandnews/suvarnabhumi-airport-able-to-welcome-65-million-passengers-with-its-new-runway-479345
PM22 https://www.pattayamail.com/thailandnews/planes-change-takeoff-and-landing-directions-at-bangkok-airports-during-winter-413735
SPOT https://www.spotterguide.net/planespotting/asia/thailand/bangkok-suvarn-bkk-vtbs/
WS https://www.wernersobek.com/projects/bangkok-airport/
STR https://structurae.net/en/structures/suvarnabhumi-airport-passenger-terminal-complex
JAHN https://jahn.studio/work/suvarnabhumi-airport/
AOT https://suvarnabhumi.airportthai.co.th/about-us
HOK https://hok.com/projects/view/suvarnabhumi-international-airport-midfield-satellite-concourse
WP https://en.wikipedia.org/wiki/Suvarnabhumi_Airport
APM https://en.wikipedia.org/wiki/Suvarnabhumi_Airport_Automated_People_Mover
ST https://en.wikipedia.org/wiki/Suvarnabhumi_station
CTBUH https://www.skyscrapercenter.com/building/suvarnabhumi-airport-air-traffic-control-tower/11725
AT https://www.airport-technology.com/projects/suvarnabhumi-airport/
MC1 https://mapcarta.com/W26071844 MC2 https://mapcarta.com/N6711003839 MC3 https://mapcarta.com/N13373875189
CRT https://www.chiangraitimes.com/destinations/getting-around-suvarnabhumi-airports-main-terminal/
NAT https://www.nationthailand.com/news/general/40070271
TG https://www.thaiairways.com/en/exp-my-thai/on_ground/transportation.page
BKK https://en.wikipedia.org/wiki/Bangkok
NRT https://en.wikipedia.org/wiki/Narita_International_Airport

---

## Narita (RJAA) + BKK→NRT flight: reference data (checked 13 Oct 2026)
[key] = source (end list); calc = checker's WGS84 computation.

### 1. Narita runways (WGS84)
| RWY | L×W (m) | THR lat, lon | THR elev | True brg (calc) |
|---|---|---|---|---|
| 16R | 4,000×60 [mlit] | 35.77439, 140.36829 [anf] | 130 ft [sv] | 149.5° |
| 34L | | 35.74332, 140.39074 [anf] | 139 ft [sv] | 329.5° |
| 16L | 2,500×60 [mlit] | 35.80517, 140.37817 [sv] | 135 ft [sv] | 149.5° |
| 34R | | 35.78583, 140.39217 [sv] | 141 ft [sv] | 329.5° |
- A ends [anf] match SkyVector within 8 m [sv]. Calc lengths A 4,000 m, B 2,491 m (SkyVector ±18 m). 16L is SkyVector only; [anf][oa] show the pre-2009 end.
- Magnetic hdg 157° [sv] vs 149.5° true → var ≈7.5°W (calc).
- B axis 2,505 m ENE of A; 34R abeam 16R, so B is wholly north of A (calc).
- Midpoints (calc): A 35.75886, 140.37952; B 35.79550, 140.38517. ARP 35.76533, 140.38550 [sv]; elev 41.0 m [mlit].
- Strip sizes removed (no source). 34L 750 m displaced threshold: in [oa], but [ivao] gives LDA 4,000 m; unconfirmed.

### 2. Expansion status
- **B extension:** +1,000 m north to 3,500×60 m [naa][aw]; Higashi-Kanto Expressway in a ~430 m tunnel [pac]. Was due 31 Mar 2029; now within FY2029, up to 1 year late [aw]. Land 99.5% [aw]. New north end (calc): 35.81293, 140.37255.
- **Runway C:** 3,500×45 m [naa], south of Runway B [tnC]; 2 road tunnels under it [pac]. Land 88.7% [aw]. **No opening date**; NAA *considering* expropriation [aw][nip]. Under construction [nip]; position not found.
- **New tower:** ~120 m, FY2026 budget, near first-tower site [tnT]; pin 35.76936, 140.38626 (approx.) [ssp2].

### 3. Terminals (OSM centroids, Mapcarta)
| | Centre lat, lon | Floor area | Notes |
|---|---|---|---|
| T1 | 35.76309, 140.38641 (way 117802100) [mc1] | ~464,000 m² [naa] | Station 35.76540, 140.38599 [mc2] |
| T2 | proxy: T2·3 station 35.77320, 140.38721 [mc3] | ~396,000 m² [naa] | Opened 1992 [mlit] |
| T2 sat. | 35.77552, 140.39255 (way 94054874) [mc4] | | 3 levels, 15 m [mc4] |
| T3 | 35.77836, 140.38497 (way 337493754) [mc5] | 66,000 m² in 2015 [at]; ~110,000 m² now [naa] | 4 floors, 19.95 m, ~500 m N of T2 [at] |
| T3 sat. | 35.78103, 140.38650 (way 354259287) [mc6] | | 4 levels [mc6] |
- Footprints not found; trace OSM ways.
- One-terminal plan: concept only (June 2024; phase 1 early 2030s) [decn].

### 4. Control tower
- 87.3 m [tnT]; 286 ft roof / 299 ft antenna [ssp1]; MLIT total height 92.3 m [mlit]. Since 1993 [mlit].
- Position 35.77000, 140.38593 [ssp1]: single source, unverified.

### 5. Scheduled BKK→NRT (local, Oct 2026)
| Flight | Dep→Arr (+1) | Usual type |
|---|---|---|
| TG640 | 21:55→06:20 | A330-300, some A350-900 [fr640] |
| ZG52 | 23:10→07:30 | 787-8 [fc] |
| NH808 | 23:35→07:45, not daily | 787-9 [fr808] |
| VZ830 | 23:35→07:55 | 737 [fc] |
| TG642 | 23:50→08:10 | A350-900, some 787-9 [fr642][fc] |
| NH806 | 07:00→15:20 | 787-9 [tNH] |
| TG676 | 07:45→15:55 | 777-300ER [fr676] |
| JL708 | 07:55→16:05 | 787-8 [fr708] |
- Block 6h10–6h25 (calc); airborne 5h19–5h54 [fr642][fr676][fr708][fr808]. [fc] lists other timings too; check winter timetable (25 Oct).
- **Tour flight: TG642.** **Model:** 787 on 4 of 8 flights [fc] → generic **787-9**.

### 6. Route flown (FR24 ADS-B 13 Oct 2026; pts 1–19 JL708 [tJL], 20–27 NH806 [tNH])
A1 (eastbound one-way BKK–UBL) [caE] → Laos → Vietnam → ITBAM–IKELA → KAPLI (G86, eastbound one-way) [hk] → Taiwan → IGURU → Okinawa → Chiba.
| # | Point | lat, lon | Alt |
|---|---|---|---|
| 0 | VTBS ARP [caA] | 13.68583, 100.74889 | 8 ft |
| 1 | Climb | 13.90773, 101.02942 | 11,350 ft |
| 2 | ~15 km S of A1 (calc) | 14.37502, 102.40712 | FL284 |
| 3 | TOC | 14.65534, 103.24787 | FL364 |
| 4 | 10 km from UBL 15.24528, 104.86583 [caE] | 15.21383, 104.95769 | FL370 |
| 5 | 20 km past BUTRA 15.41833, 105.59611 [caE] | 15.45854, 105.77676 | FL370 |
| 6 | S Laos | 15.31490, 106.81973 | FL370 |
| 7 | S of Da Nang (inland) | 15.49235, 108.22578 | FL370 |
| 8 | 25 km from ITBAM 16.66667, 109.60167 [onI] | 16.58917, 109.38121 | FL350 |
| 9 | On ITBAM–IKELA (calc) | 17.42395, 110.62394 | FL330 |
| 10 | IKELA, no ADS-B [hk] | 18.66167, 112.24500 | – |
| 11 | | 19.85323, 114.68318 | FL410 |
| 12 | 4 km from KAPLI 21.16667, 117.50000 [hk] | 21.17452, 117.53458 | FL410 |
| 13 | Taiwan S tip (interp.) | 21.923, 120.850 | FL410 |
| 14 | Turn to ~052° | 22.01991, 121.22752 | FL410 |
| 15 | 28 km from IGURU 23.95, 124.00 [onG] | 23.80933, 123.77405 | FL410 |
| 16 | Okinawa turn | 26.21021, 127.84700 | FL410 |
| 17 | | 28.63380, 130.77316 | FL410 |
| 18 | | 31.12343, 134.34543 | FL410 |
| 19 | | 33.34190, 138.10776 | FL410 |
| 20 | TOD | 33.88651, 139.09650 | 40,925 ft |
| 21 | | 34.38524, 140.00887 | 25,875 ft |
| 22 | SE of Boso | 34.97428, 140.64681 | 11,475 ft |
| 23 | Turn N offshore | 35.09517, 140.72171 | 10,075 ft |
| 24 | Track 344° | 35.30035, 140.65332 | 7,700 ft |
| 25 | Join 34R final, ~17 NM (calc) | 35.54430, 140.56578 | 5,150 ft |
| 26 | Final | 35.65311, 140.48796 | 3,050 ft |
| 27 | THR 34R | 35.78583, 140.39217 | 141 ft |
- A1 proper runs BUNTA (16.83333, 109.39500) [onB]–LENKO–IKELA [icao1]; ITBAM–IKELA is the planned eastbound parallel (trial ~2027) [icao2].

### 7. Profile
- Great circle **4,649 km / 2,510 NM** [1flt] (calc agrees). Flown 3,046–3,076 mi = 4,902–4,950 km (+5.4–6.5%), VZ830 3,103 mi [fp]; pts 0–27 sum 4,893 km (calc). No China overflight [fp].
- Thailand 40–45 min, Laos 12, Vietnam 4–8, Taiwan ~1, Japan 11–12 [fp].
- JL708: TOC FL364 290 km from BKK (calc), FL370, FL350–330 before IKELA, then FL410 [tJL]. TG676 FL330→FL370 [tTG].
- TOD: 239 km great-circle to ARP, 286 km along track (calc).
- GS: 468–488 kt Indochina [tJL]; 531–533 kt S of Japan [tJL][tNH]; 213 kt joining final, 155 kt at threshold [tNH].

### 8. Arrival into Narita
- North-facing share FY2018–22: 51.9/54.4/57.8/49.2/54.1% [chiba]. NH806 landed 34R on 13 Oct 2026 [tNH].
- **North flow:** pts 22–25 (NH806). Gear down before crossing the Kujukuri coast (Narita rule, per a pilot) [tnG].
- Extended centrelines (calc), 5/10/15 NM:
  - 34L (35.67139, 140.44263) / (35.59944, 140.49443) / (35.52746, 140.54614)
  - 34R (35.71393, 140.44415) / (35.64200, 140.49603) / (35.57006, 140.54783)
- **South flow** 10 NM (calc): 16R (35.91816, 140.26414); 16L (35.94889, 140.27388). No track sampled.

### 9. Aircraft
| | 787-9 | A350-900 | 777-300ER |
|---|---|---|---|
| Length | 62.8 m [b787] | 66.80 m [ab] | 73.9 m [b777] |
| Span | 60.1 m [b787] | 64.75 m [ab] | 64.8 m [b777] |
| Height | 17.0 m [b787] | 17.05 m [ab] | 18.5 m [b777] |
| Fuselage | ~5.9 m [asw7] | 5.94 m [ab] | 6.19 m [asw77] |
| Sweep ¼c | 32.2° [asw7] | 31.9° [wa] | 31.64° [asw77] |
| Fan Ø | GEnx-1B 2.82 m, len 4.69 m [ge]; Trent 1000 2.84 m [ac] | Trent XWB 3.00 m [wa] | GE90-115B 3.25 m [ac] |
- 787-9 engine ground clearance 0.61–0.79 m [acap].

### 10. VTBS runways (Thai AIP 1 Oct 2026) [caA]
| RWY | L×W (m) | THR | Opposite THR | True brg |
|---|---|---|---|---|
| 01/19 | 4,000×60 | 13.65670, 100.75183 | 13.69171, 100.76103 | 014.42° |
| 02L/20R | 4,000×60 | 13.66517, 100.72924 | 13.70019, 100.73845 | 014.00° |
| 02R/20L | 3,700×60 | 13.67128, 100.73466 | 13.70367, 100.74318 | 014.42° |
- Calc lengths match ±1 m; 02L ~400 m W of 02R, 01 ~2,200 m E of 02R (calc). Turn east after take-off: inferred, not from SIDs.

#### Sources
sv skyvector.com/airport/RJAA/Narita-International-Airport · anf airportnavfinder.com/airport/RJAA/ · oa raw.githubusercontent.com/davidmegginson/ourairports-data/main/runways.csv · ivao wiki.ivao.aero/en/home/atcoperations/HQAirspace/Tokyo_Narita_RJAA · mlit cab.mlit.go.jp/tcab/conditions/04_kanto/narita.pdf · naa narita-airport.jp/ja/company/airport-operation/about-layout/ · aw aviationwire.jp/?p=341194 · nip nippon.com/en/news/yjj2026040200896 · pac en.pacific.co.jp/insight/2026/04/project-story-narita-airport-vol01.html · tnC/tnT/tnG trafficnews.jp/post/{550667,620923,129753} · ssp1/2 skyscraperpage.com/{b144442,b177901} · mc1–6 mapcarta.com/{W117802100, 27445872, 27445868, Narita_Airport_Terminal_2, Narita_Airport_Terminal_3, W354259287} · at airport-technology.com/projects/terminal-3-narita-international-airport-tokyo/ · decn decn.co.jp/?p=164660 · fc flightconnections.com/flights-from-bkk-to-nrt · fr… flightradar24.com/data/flights/{tg640,tg642,tg676,jl708,nh808} · tJL/tNH/tTG data-live.flightradar24.com/clickhandler/?version=1.5&flight={4218a119,42187800,42188fd3} · fp flightpaths.com/BKK-NRT · 1flt 1flt.com/routes/vtbs-rjaa · caE/caA aip.caat.or.th/2026-10-01-AIRAC/html/eAIP/{VT-ENR-3.1,VT-AD-2.VTBS}-en-GB.html · hk ais.gov.hk/eaip_20260319/2026-03-19-000000/html/eAIP/VH-ENR-3.1-en-US.html · icao1/2 icao.int/sites/default/files/APAC/Meetings/{2023/2023%20SCSTFRG11/3-Working%20Papers/AI4-WP10-Feasibility-Study-on-Re-designation-of-ATS-Route-A1-to-Unidirectional-Route.pdf, 2026/SAIOSEACG5/Papers/A5%20WP15_Progress-Update-on-the-Establishment-of-A1-Parallel-Routes-China-and-Hong-Kong-China.pdf} · onI/onB/onG opennav.com/waypoint/{VN/ITBAM,VN/BUNTA,JP/IGURU} · chiba pref.chiba.lg.jp/taiki/press/2023/documents/siryou1.pdf · b787/b777 boeing.com/commercial/{787,777} · ab aircraft.airbus.com/en/aircraft/a350/a350-900 · acap boeing.com/content/dam/boeing/v2/airports/acaps/787_ACAP_Rev_Q.pdf · asw7/asw77 aerospaceweb.org/aircraft/jetliner/{b787,b777}/ · wa en.wikipedia.org/wiki/Airbus_A350 · ge geaerospace.com/commercial/aircraft-engines/genx · ac aerocorner.com/blog/largest-commercial-aircraft-engines/

---

## Reference data: 5 demo accommodations (fact-checked Oct 2026)
Coordinates are GSI address points [gsi], not centroids; snap them to OSM footprints. Bearings and distances are haversine [calc] from those points to: Fuji summit 35.36083, 138.72750 (3,776.24 m) [fuji]; Tokyo Tower ≈35.65858, 139.74543 (reproduces these figures; Wikipedia's point [tt] shifts them ≤7 m/2.3°); Osaka Castle 34.68738, 135.52584 (whole-castle point) [osc].

### (a) Akane Sky Tokyo: model on The Prince Park Tower Tokyo
- Address point 35.65598, 139.74625 [gsi]. 104.4 m, 33F + B3, Tange Urban Architecture & Design / Kajima, opened 2005 [ptw] (exact day unverified).
- 603 rooms; 590 (3–31F) renovated 2016–18. Floor bands: Garden 2F (10 rooms), Park 3–18F (318), Panoramic 19–28F (209), Premium Club 29–31F (63), 32F suites + club lounge [ptp][ptr]. 33F Sky Lounge glazed toward Tokyo Tower [tabi].
- Tokyo Tower 298 m at 346° (NNW) [calc]; article says about 320 m [tabi].

| Type [ptr] | m² | Beds W×L cm | Floors |
|---|---|---|---|
| Park Twin | 28.7 | 2× 115×203 | 3–18 |
| Corner King | 34.4 | 180×203 | 3–18 |
| Deluxe Twin + balcony | 38 | 2× 115×203 | 3–18 |
| Panoramic King + balcony | 38 | 240×203 | 20–27 |
| Panoramic Jr Suite King / Twin | 50.1 | 240×203 / 2× 120×203 | 22–27 / 19–28 |
| Premium Corner King (Tower side [tabi]) | 37.2 | 180×203 | 29–31 |
| Tower View Suite | 135 | 240×203 | 32 |

**Andaz Tokyo** (Toranomon Hills Mori Tower): 255.5 m (247 m occupied), 52F + B5, all-steel, 2014 [ctb]; Nihon Sekkei [thw]. Hotel on 47–52F + 37F, 164 rooms [bt]. Rooms 50 m² (incl. Tower View), tub in the "innermost chamber"; corner Deluxe 65 m² [hy]. Address point 35.66683, 139.74921 [gsi]; Tokyo Tower 979 m at 200° [calc].
**Janu Tokyo** (Azabudai Hills Residence A): hotel 1–13F, rooms on 6–13F, 122 rooms. Double vanity, rain shower, custom tub; Janu Suite 284 m² (519 m² when joined) [op]. Deluxe 55, City 62, Premier 65, Deluxe Suite 75, Junior Suite 96, Tower View/Corner Suite 105 m² [ja]. Address point 35.66220, 139.74179 [gsi]; Tokyo Tower 519 m at 141° [calc].

### (b) Lake Ashi ryokan
**Ryuguden**, Motohakone 139: address point 35.21181, 139.00996 [gsi]; Fuji 30.5 km at 303° [calc]. Main hall: 1938 Hamanako Hotel, moved here 1957, Phoenix-Hall model, keyaki/hinoki; no overnight guests since 2011; day-use onsen and Registered Tangible Cultural Property since 2017 [rh].

| Room [rr] | m² | Layout | Bedding |
|---|---|---|---|
| Lakeside washitsu 1–2F | 65 | 12.5-jo + 7-jo hiroen | futon 97×194 |
| Lakeside twin 3F | 65 | 12.5 + 7-jo hiroen | 2 beds 115×203 |
| Annex special room (3 rooms, 1–3F) | 95 | 13-jo + 8-jo next room, in-room onsen bath | futon 97×194 |

**Hanaori**: opened 1 Aug 2017, 154 rooms, ORIX [tv]. 2 min walk from Togendai Station; in-room open-air baths are not onsen [hn]. Rooms [ha]: Deluxe Japanese-Western + open-air bath 47.30 m², 2 semi-doubles (100–120 cm); Casual Twin 23.10 m² (open-air variant: Shigaraki tub on balcony); Universal 31.50 m².
**Gora Kadan** [yj]: 42 rooms; Standard B/C 48 m². Standard A 71 m² + 19 m² terrace/garden, hinoki bath [gka]. Matsu 71 m² + 21 m² terrace, open-air stone bath + hinoki bath, futons [gkm]. 12 rooms have an open-air bath (100% source water, not free-flowing). 120 m glass corridor.
Tatami: listings count ≥1.62 m²/jo [mec]; 8 Edo-ma jo ≈ 6 Kyo-ma jo [kb].

### (c) Kawaguchiko: model on Kozantei Ubuya
- Asakawa 10, address point 35.51326, 138.76854 [gsi]. Fuji 17.35 km at 192° (SSW), across the lake [calc]. Every room views Fuji [ub]. Natural onsen [ic].
- Rooms with open-air bath [ub]: 501 113 m² (top-floor terrace); 401 98 (tea room); Special 98; Deluxe 301 98; Deluxe 90; Superior 71; Standard 59. Washitsu + next room 56, washitsu 46 (beds). Twins 120×200. ≥5 floors (inferred).
- **Hoshinoya Fuji**: 40 concrete cabins facing south; D 39 m², F 47 m²; about 1/3 of each plan is terrace [un]. 50 m site fall, full-height Fuji windows, Azuma Architect & Associates, 2015 [dv].
- **Fuji View Hotel**: opened 1936, lakeside at 833 m [yk].

### (d) Kyoto machiya
- Lot: 3-ken frontage, long and narrow [kc] (about 5.4 m [jw]).
- Hachise tsushi-nikai (Kamigyo, Meiji): frontage 5.33 m (S), 18.47 m on a private street (E), lot 97.77 m²; actual 1F 78.92, 2F 62.71, loft 10.53 m² [hs].
- Onoya (斧屋): 5 m × 11 m, one row of three rooms: shop → zashiki/kitchen → garden → annex [wj].
- Kyo-ma: mat 6.3×3.15 shaku ≈ 1,909×954 mm; bay 6.5 shaku ≈ 1.97 m; 8-jo = 13 shaku c/c [kb].
- Floor 1.8 shaku (≈545 mm); roof 5-sun (26.6°), min 3.8 sun; tsushi front, full 2F at the rear [kc]. Measured 2F front fitting height 1,730 mm [ar].
- Hashiri-niwa on one side, hibukuro + skylight; kura at rear; omoteya-zukuri adds an entrance wing + tsuboniwa. Facade: koshi (itoya/komeya/sakaya/shimotaya), bengara (iron oxide + egoma oil), mushiko-mado, inuyarai, battari-shogi, stone footings [jw]. Ichimonji-gawara/toorihisashi: no source found.
- Machiya Residence Inn: 41–184.5 m²; Bonbori-an 54.10; Yumeha 75.97 [mr]. Yumeha (Nakagyo, Taisho era, tsuboniwa, plan image [yu]) address point 35.01014, 135.75031 [gsi].

### (e) Osaka: model on Hotel New Otani Osaka
- Shiromi 1-4-1, address point 34.69059, 135.53223 [gsi]. Opened 1 Sep 1986, 74.5 m [nw]; 18 floors, 525 rooms [ns]. 4-storey atrium [nw]. Top-floor uses unverified.
- Castle ≈685 m at 238–239° (WSW), so castle-view rooms face WSW [calc].
- Rooms [jst]: Superior 30 m² (castle or city); Deluxe Twin 30 (castle); Superior Quad 40 (castle); Luxury Jr Suite 60 (castle); Family Studio Deluxe 90 (city, cypress bath).

### Standards
- Beds: semi-single 70–<98, S 98, SD 120, D 140, Q 160, K 180; length 195 cm [ir]. Hotels 203 cm long: twin 115/120, king 180/200, Hollywood 240 [ptr]. Futon 97×194 [rr].
- Unit baths (inner mm): 1216 = 1200×1600 (0.75 tsubo), 1317, 1418, 1616 (1), 1618 (1.25), 1620, 1717, 1818 [at]. LIXIL hotel 0714 = 700×1400, 0716 = 700×1600 [lx].
- Room size by class: business 12–13, city about 25, luxury >35 m² [fk].
- Ceiling at least 2.1 m (Art. 21) [eg]; housing about 2.4 m [lv]. BRI business hotel (low confidence): 1F 4.75 + 3×3.8 = 16.15 m, ceiling 2.6 m; city hotel ceiling 2.4 m [bri]. Prince Park Tower average floor-to-floor 104.4/33 ≈ 3.16 m (derived) [ptw].
- Guard at least 1.1 m on balconies at 2F and above (Art. 126) [eg].
- Tokyo barrier-free (≥1,000 m²) [tb]: entry ≥80 cm; bath/WC ≥75 cm (room ≥15 m²) or ≥70 cm. Wheelchair rooms (≥1% if ≥50 rooms): 85/80 cm (revision summary).

### Sources
gsi https://msearch.gsi.go.jp/address-search/AddressSearch · fuji https://en.wikipedia.org/wiki/Mount_Fuji · tt https://en.wikipedia.org/wiki/Tokyo_Tower · osc https://ja.wikipedia.org/wiki/大坂城 · ptw https://ja.wikipedia.org/wiki/ザ・プリンス_パークタワー東京 · ptp https://www.princehotels.co.jp/press/2016/pdf/top_release_160707_04.pdf · ptr https://www.princehotels.co.jp/parktower/room/ · tabi https://tabi-mag.jp/towerview-parktower/ · ctb https://www.skyscrapercenter.com/building/toranomon-hills-mori-tower/12388 · thw https://en.wikipedia.org/wiki/Toranomon_Hills · bt https://www.businesstraveller.com/tried-and-tested/andaz-tokyo-toranomon-hills/ · hy https://www.hyatt.com/andaz/en-US/tyoaz-andaz-tokyo-toranomon-hills/rooms · op https://openers.jp/en/lounge/lounge_travel/9iksq · ja https://www.janu.com/janu-tokyo/accommodation · rr https://www.princehotels.co.jp/ryuguden/room/ · rh https://www.princehotels.co.jp/ryuguden/honkan_history/ · tv https://www.travelvoice.jp/20170331-86067 · hn https://www.hakonenavi.jp/feature/22210 · ha https://go-ohr.reservation.jp/ja/hotels/ohr-ashinoko-hanaori/rooms · yj https://travel.yahoo.co.jp/00001935 · gka https://www.gorakadan.com/hakone/rooms/type-a/ · gkm https://www.gorakadan.com/hakone/rooms/matsu/ · mec https://www.mec-h.com/words/detail?n=3778 · kb https://kotobank.jp/word/%E4%BA%AC%E9%96%93 · ub https://www.ubuya.co.jp/room/ · ic https://icotto.jp/hotels/188 · un https://www.uniqhotels.com/hoshinoya-fuji/ · dv https://divisare.com/projects/332797-azuma-architect-associates-studio-on-site-nacasa-partners-inc-yoshida-photo-studio-hoshinoya-fuji · yk https://www.yamanashi-kankou.jp/special/ichioshiyado/fujiviewhotel.html · kc https://www.city.kyoto.lg.jp/tokei/cmsfiles/contents/0000260/260189/04_kyoumachiyanochie.pdf · jw https://ja.wikipedia.org/wiki/京町家 · hs http://www.hachise.com/buy/66008/index.html · wj https://www.westjr.co.jp/company/info/issue/bsignal/12_vol_142/issue/01.html · ar https://www.kyoto-araki.jp/sekou/konnaie/kyomachiya/machi_gishime.html · mr https://www.kyoto-machiya-inn.com/?p=8555 · yu https://www.kyoto-machiya-inn.com/?p=12060 · nw https://ja.wikipedia.org/wiki/ホテルニューオータニ大阪 · ns https://www.northstarmeetingsgroup.com/Meeting-Event-Venues/Osaka/Convention-Hotel/Hotel-New-Otani-Osaka-p52754578 · jst https://index.japanstation.com/hotel/hotel-new-otani-osaka/ · ir https://www.irisohyama.co.jp/plusoneday/interior/340 · at https://www.athome.co.jp/contents/for-buyers/buyers-kiso/modular-bathroom/ · lx https://i4zic8-www.biz-lixil.com/s/hotel_bathroom/pdf/wet-dry.pdf · fk https://www.city.fukuoka.lg.jp/jutaku-toshi/kaihatsu/toshi/documents/high_quality_hotel_release.pdf · eg https://laws.e-gov.go.jp/law/325CO0000000338 · lv https://www.livable.co.jp/l-note/?p=22294 · bri https://www.kenken.go.jp/becc/documents/building/Definitions/modelBuilding_H28_v2.pdf · tb https://www.toshiseibi.metro.tokyo.lg.jp/bunyabetsu/machizukuri/bfree/kijun.pdf

---

## Landmark and vehicle reference data (true size, WGS84)

Units m, decimal degrees, conf H/M/L, [n] = sources. OSM/Wikidata unreachable: positions are points from Wikipedia, official pins, portals. Snap all to imagery.

### 1. Tokyo Tower
| Item | Value | conf |
|---|---|---|
| Position | 35.65861, 139.74556 [3] | M |
| Height | 333 m [1][3]; 351 m ASL [2], so ground ≈18 m ASL (derived) | H |
| Main Deck | Official 150 m, 1F–2F [1]; ja.wiki: 125 m above ground (≈150 m ASL), also "above 120 m" [2]. Model ≈120–150 m. | M |
| Top Deck | Official 250 m [1]; 249.6 m [3]; 223.55 m above ground [2] | M |
| Leg spacing | 88.0 m, leg centre to centre [2] | H |
| Structure | Steel lattice, 4 legs, ≈4,000 t [2][3] | H |
| Paint | International orange/white alternating from an orange top; 7 bands since 1986 (11 before) [2]. Derived: 4 orange + 3 white. | H / derived |
| Repaint | ≈5-yr cycle, to become 7 [2]; next projected 2026 [3], unconfirmed | L |
| FootTown | 5 storeys [2][3]; footprint/height gap | – |

### 2. Osaka Castle main keep (1931 reconstruction)
| Item | Value | conf |
|---|---|---|
| Position | 34.68738, 135.52584 [4] | M |
| Total height | 54.8 m incl. stone base and shachihoko [4][5]; MLIT says "58 m" [7] (unexplained) | H |
| Split | Tenshudai 13.3 m (from ground) + building 41.5 m [5] | M |
| Storeys | 5 tiers outside, 8 floors inside; entrance floor below the base top [4]; 8F observation deck [6] | H |
| Walls | Tiers 1–4 white plaster; tier 5 black with gold-leaf tigers and cranes [4] | H |
| Roof | Blue-green roofs with gold accents [7] | M |
| Gold | Shachihoko, onigawara, fittings, tiger reliefs re-gilded 1995–97 [6]; shachi replica on 2F [8] | M |
| Weight | 11,000 t [6]; base footprint/plan: gap | M |

### 3. Chureito Pagoda (Arakurayama Sengen Park)
- Position conflict (≈160 m): Yamanashi park pin 35.50034, 138.80013 [9]; Tripomatic pagoda POI 35.50130, 138.80148 [15], near en.wiki's 35.50119, 138.80139 [14]. Snap to imagery (L).
- Five-storey vermilion war-memorial pagoda, not a stupa [13]. Height ≈19.5 m [11][12] (M). Built 1963 [11] or 1962 [12]. Footprint: gap.
- 398 steps (Sakuya-hime stairs) from Arakura Fuji Sengen Shrine [9][10].
- Deck (renewed Feb 2022) is behind the pagoda [11], near the summit [10]; relative height gap. The classic viewpoint is private land beside the park, past a ≈5 m cliff, fenced off since late 2015 [13][14].
- Derived: Fuji summit 35.36083, 138.72750 [16] lies at 203.0°, 16.85 km from the park pin (203.2°, 17.00 km from the POI).

### 4. Hakone Shrine Heiwa-no-Torii (Lake Ashi)
- Built 1952; ryōbu-style (braced posts), standing in the lake [17]. "平和" plaque added 1964 [17], facing the lake [18]. Colour not stated in [17][18]; use imagery.
- Height, pillar spacing: gap (a blog's "18 m" not used).
- Shrine: 35.20389, 139.02556 [19] vs official map embed 35.20468, 139.02320 [20] (232 m apart). Torii is at the shore below; snap (L).

### 5. Fushimi Inari Taisha
- Shrine: 34.96722, 135.77278 [22]. Senbon Torii start coordinates: gap.
- Rōmon: 1589 [21][24]; 三間一戸 (3 bays, 1 opening), irimoya roof, cypress-bark thatch [21]; two-storey, ≈14 m tall [23] (M). Width: gap.
- Torii ≈10,000 on the mountain [21][22]; Senbon Torii ≈850 [25] (≈800 [22]) in two rows, left up, right down [25]. Senbon size 5号, pillar ≈15 cm; 10号 ≈30 cm [25]. Height, spacing: gap.
- Trails ≈4 km, ≈2 h up [22]; Inariyama summit 233 m ASL [21][22].

### 6. Nara: deer and Tōdai-ji Daibutsuden
- Sika deer (MOE): shoulder 80–90 cm, body 130–160 cm, 40–90 kg [26]. Nara Park deer reported genetically smaller; average 5-yr male 74 kg (2018) [27]. Population 1,465 (15–16 Jul 2025, record) [28].
- Daibutsuden (official, use this): 57.012 m E–W × 50.480 m N–S × 48.742 m high [29]; others: 57.5 × 50.5 × 49.1 [30], 46.8 high [31].
- Form: single storey with mokoshi (reads as 2 tiers), hipped (寄棟) roof, hon-kawara tiles, front karahafu over a viewing window [31]. 7 bays (originally 11) [29]. Completed 1709 [29]. Buddha 14.98 m on a 3.05 m pedestal [29].
- Position: 34.68917, 135.83972 [32].

### 7. Lake Ashi pirate ships
| Ship | In service | Length (official) | Beam | GT | Pax |
|---|---|---|---|---|---|
| Queen Ashinoko (gold hull) [33] | 25 Apr 2019 | ≈29 m* | 10.00 | 318 | 541 |
| Royal II [34] (interior refit, relaunched 18 Jul 2026 [36]) | 20 Mar 2013 | ≈29 m | 10.00 | 315 | 565 |
| Victory [35] (after the 18th-c. English warship Victory [39]) | 20 Mar 2007 | ≈29 m | 10.00 | 282 | 534 |

\*Press: 全長 35 m [37] vs official ≈29 m [33]; reason unverified. Vasa (from 1991) retired when Queen Ashinoko entered service [38]. Standard cabin 1F [36], special cabin, open deck [33]. Height gap.

Piers (official hakonenavi Google pins [40]):
| Pier | lat, lon |
|---|---|
| Togendai-kō | 35.23731, 138.99448 |
| Hakone-machi-kō | 35.19000, 139.02437 |
| Moto-Hakone-kō | 35.20091, 139.03054 |

Route: riders choose ports freely [41]; fixed loop order unverified. 25–35 min each way [39]. Derived straight legs: Togendai→Hakone-machi 5.92 km (152.7°), Hakone-machi→Moto-Hakone 1.34 km (24.8°), Moto-Hakone→Togendai 5.21 km (321.0°).

### 8. Lake Kawaguchiko boat
- 天晴 "Appare", in service from 4 Dec 2020, replacing the Ensoleillé (retired 3 Dec 2020) [42].
- 23.5 m, 19 GT, 120 pax, 10 kn [42]. Takeda atake-bune style: red (赤備え) hull, Takeda flag [42], crest curtain, white-wood interior [43]. Beam gap.
- Pier: 35.50425, 138.77020 (Funatsu 4034) [44]. ≈20-min loop past Unoshima [42].

### 9. N700S Shinkansen
| Item | Value |
|---|---|
| End car | 27.35 m [45][46] |
| Intermediate car | 25.00 m [45][46] |
| Width | 3.36 m [45] |
| Height | 3.60 m excl. rooftop equipment [45] |
| Nose | 10.7 m (N700A 9.62 m) [46] |
| 16-car set | 2×27.35 + 14×25 = 404.7 m (derived from [45]) |
| Livery | White, Tokaido blue stripe [46]; colour codes unsourced |
| Seats | 1,319 for 16-car sets from FY2021, 1,323 before [46] |

### 10. Japanese tour coaches
- Hino S'elega restyle on sale 20 May 2026, first body redesign in ≈20 years [47]: spoiler replaced by a gate-shaped "sharp edge roof", vertical tail lamps, garnish light orange→white, Profia headlamps [48]. A09C 360 PS, 12-speed AMT, 62 seats (HD) [47]. New dimensions unpublished.
- 2005–2026 S'elega / Isuzu Gala: 11.99 × 2.49 m, height 3.50–3.75 m [49]; HD ≈3.5 m, SHD 3.75 m [50]. The S'elega SHD was dropped for a time in Feb 2024 [50].
- Mitsubishi Fuso Aero Queen (SHD) 57 seats in 11 rows; Aero Ace (HD) 62 seats in 12 rows; 7.7 L, 8-speed AMT (Oct 2024) [51]. New models on sale Dec 2025 [52]. Wheelbase 6.00 m since 2017 [53]. Length/width: gap (Gala class size [49] as proxy, L).

### Sources
1 https://www.tokyotower.co.jp/about/ · 2 https://ja.wikipedia.org/wiki/東京タワー · 3 https://en.wikipedia.org/wiki/Tokyo_Tower · 4 https://ja.wikipedia.org/wiki/大坂城 · 5 https://shirobito.jp/article/1336 · 6 https://ja.wikipedia.org/wiki/大阪城天守閣 · 7 https://www.mlit.go.jp/tagengo-db/R1-01758.html · 8 https://muza-chan.net/japan/index.php/blog/osaka-castle-gold-decorations-travel-tip · 9 https://www.yamanashi-kankou.jp/kankou/spot/p1_4919.html · 10 https://www.yamanashi-kankou.jp/viewpoint/pub/pvp022.html · 11 https://tabi-mag.jp/yn0253/ · 12 https://watabi.org/en/articles/chureito-pagoda-guide · 13 https://ja.wikipedia.org/wiki/新倉山浅間公園 · 14 https://en.wikipedia.org/wiki/Arakurayama_Sengen_Park · 15 https://tripomatic.com/en/poi/arakura-sengen-chureito-pagoda-poi:6633949 · 16 https://en.wikipedia.org/wiki/Mount_Fuji · 17 https://hakonejinja.or.jp/hakone/keidai.html · 18 https://tabi-mag.jp/kn0640/ · 19 https://en.wikipedia.org/wiki/Hakone_Shrine · 20 https://hakonejinja.or.jp/access/ · 21 https://ja.wikipedia.org/wiki/伏見稲荷大社 · 22 https://en.wikipedia.org/wiki/Fushimi_Inari-taisha · 23 https://rurubu.jp/andmore/article/18327 · 24 https://inari.jp/en/map/spot_02/ · 25 https://naotabi.com/fushimiinaritorii/ · 26 https://www.env.go.jp/park/content/000345169.pdf · 27 https://en.wikipedia.org/wiki/Nara_Park · 28 https://www.nippon.com/ja/japan-data/h02496/ · 29 https://www.todaiji.or.jp/information/daibutsuden/ · 30 https://ja.wikipedia.org/wiki/東大寺大仏殿 · 31 https://tabi-mag.jp/na0109/ · 32 https://en.wikipedia.org/wiki/Tōdai-ji · 33 https://www.hakonenavi.jp/hakone-kankosen/queen/ · 34 https://www.hakonenavi.jp/hakone-kankosen/royal2/ · 35 https://www.hakonenavi.jp/hakone-kankosen/victory/ · 36 https://trafficnews.jp/post/682140 · 37 https://trafficnews.jp/post/596101 · 38 https://trafficnews.jp/post/83225 · 39 https://www.gltjp.com/en/directory/item/11663 · 40 https://www.hakonenavi.jp/international/en/transportation/hakone-sightseeing-cruise · 41 https://www.hakonenavi.jp/hakone-kankosen/cruise/ · 42 https://trafficnews.jp/post/101508 · 43 https://travel.watch.impress.co.jp/docs/news/1286368.html · 44 https://www.yamanashi-kankou.jp/kankou/spot/p2_2582.html · 45 https://en.wikipedia.org/wiki/N700S_Series_Shinkansen · 46 https://ja.wikipedia.org/wiki/新幹線N700S系電車 · 47 https://www.hino.co.jp/corp/news/2026/20260520-004697.shtml · 48 https://kuruma-news.jp/post/1082867 · 49 https://ja.wikid.org/いすゞ・ガーラ · 50 https://ja.wikipedia.org/wiki/日野・セレガ · 51 https://kuruma-news.jp/post/831215 · 52 https://bestcarweb.jp/busmagazine/1400467 · 53 https://ja.wikipedia.org/wiki/三菱ふそう・エアロエース

---

## Japan tour coach routes on real roads (fact-checked 2026-10-13)

**Method.** km/min: OSRM demo two-point queries [osrm] (`…/driving/{first};{last}?steps=true`), re-run 2026-10-13. Free-flow car time; coaches slower. Official in [ ].

**Fetch.** `https://router.project-osrm.org/route/v1/driving/{STRING}?overview=full&geometries=geojson&continue_straight=true&waypoints=0;{N-1}` [api]. `;` may need `%3B` (verified). Via-string km = table except NRT-Asakusa 68.9 (fixed), Tokyo-Hakone 95.6, Kyoto-Kanazawa 261.9, Hiroshima-Fukuoka 281.5, Fukuoka-FUK 7.0, Furano-CTS 125.3.

| Leg | Roads (OSRM) | km | min |
|---|---|---|---|
| NRT→Asakusa | E65 → E51 → Gaikan C3 → Keiyo Rd E14/R14 → surface | 67.9 | 62 |
| NRT→Shinjuku | E65 → E51 → Shuto Wangan B → Shuto 10 → surface | 78.7 | 69 |
| HND→Shibuya | Wangan B → C2 (Ohi→Ohashi JCT) → Shuto 3 | 21.1 | 22 |
| Shinjuku→Kawaguchiko | Shuto 4 → Chuo E20 → Otsuki JCT → E68 → R139 → R137 | 104.2 | 96 |
| Shibuya→Moto-Hakone | R246 → Tomei E1 → E85 → Seisho BP E84 → R1 | 96.1 | 95 |
| Hakone→Kawaguchiko | Susono IC → E1 → Shin-Tomei E1A → R138 Gotemba BP → E68 → R139 → R137 | 59.8 | 63 |
| Kawaguchiko→Nagoya Stn | R139 → Nishi-Fuji Rd → Shin-Tomei E1A (165.6 km) → Isewangan E1A → R1 | 262.8 | 189 |
| Nagoya→Fushimi Inari | Nagoya Expwy 5 → E23 → Shin-Meishin E1A → Kusatsu JCT → Meishin E1 → R1 → R117 → Shin-Jujo-dori | 127.8 | 116 |
| NGO→Fushimi Inari | E87 → R155/247 → R302 → Isewangan → Shin-Meishin → Meishin → Shin-Jujo-dori | 149.1 | 127 |
| Fushimi→Nara Park | Daini-Keihan corridor → Pref 22 → Keinawa E24 → R369 | 41.0 | 50 |
| Nara→Osaka Castle | R369 → R308 → Daini-Hanna E92 → R308 → Chuo-odori | 32.4 | 46 |
| Dotonbori→KIX | Hanshin 15 → R26 → Pref 34 → Hanshin 4 → E71 bridge | 44.6 | 50 |
| Kyoto→Kanazawa | Meishin E1 → Maibara JCT → Hokuriku E8 → Kanazawa-nishi | 261.7 | 211 |
| Kanazawa→Shirakawa-go | E8 → Oyabe-Tonami JCT → E41 → Shirakawa-go IC → R156 (via string) | 77.2 | 79 [70 shk] |
| Shirakawa-go→Nagoya Stn | Official: R156/158 → Shogawa IC (E41 km 98.3 [e41]) → E41 [shk]. OSRM: R156 to Mino, then E41. The old 205.8 km figure [osm-de] was to Centrair | 158.8 | 132 [135 shk] |
| Osaka→Hiroshima | **Shinkansen** 305.8 km [sanyo], Nozomi about 80 min [jg]. Coach: Chugoku → Kobe JCT → Sanyo E2, 336.6 km / 298 min | — | — |
| Hiroshima→Miyajimaguchi | R2 → West Hiroshima BP → R2. Ferry about 10 min [ferry] | 20.9 | 22 |
| Hiroshima→Tenjin | Sanyo E2 → Yamaguchi JCT → Chugoku E2A → Kanmon E2A → Kyushu E3 → R3 → Fukuoka Urban 1 | 280.4 | 224 |
| Tenjin→FUK domestic | R202 → R3 → Kuko-dori (FUK Stn 33.5973N 130.4482E [fukstn]) | 6.9 | 9 |
| HND/NRT/KIX/NGO/FUK→CTS | **flight**. Great circle (derived by haversine from this spec's points): about 821/788/1083/977/1415 km, ±2 km | — | — |
| CTS→Sapporo | Doo E5 → R36 (via string) | 50.4 | 46 |
| Sapporo→Otaru | R230 → Pref 124 → R5. Sasson Expwy vias unverified | 36.1 | 33 |
| Sapporo→Furano | Doo E5 (40.9 km) → Pref 116 → R452 → Pref 135 → R38 | 114.0 | 97 |
| Furano→CTS | R38 → R237 → Doto E38 → R337 | 125.1 | 96 |

Rail: Tokyo–Kyoto 476.3 km [tokaido]; fastest Tokyo–Shin-Osaka 2 h 21 [tokaido-ja] ("2 h 09 to Kyoto" on en.wiki's map looks outdated). Hakata 553.7 km actual [sanyo-ja]; Hiroshima 305.8 km is en.wiki only, so Hiroshima–Hakata 247.9 km is derived.

### Via strings (lon,lat)
```
NRT-Asakusa 140.387,35.7647;140.38711,35.76911;140.34225,35.77855;139.92034,35.71074;139.90856,35.70505;139.7967,35.7148
NRT-Shinjuku 140.387,35.7647;140.34225,35.77855;139.94705,35.68692;139.79512,35.6403;139.7006,35.6896
HND-Shibuya 139.786,35.549;139.77962,35.55844;139.75325,35.60647;139.69057,35.65003;139.69057,35.65311;139.7016,35.658
Tokyo-Kawaguchiko 139.7006,35.6896;139.64465,35.66792;139.57138,35.67153;139.26422,35.64259;138.93846,35.617;138.91783,35.59958;138.83469,35.50947;138.7688,35.4984
Tokyo-Hakone 139.7016,35.658;139.61809,35.62827;139.57199,35.59284;139.361,35.41953;139.13321,35.2456;139.1122,35.23412;139.05493,35.24121;139.0255,35.201
Hakone-Kawaguchiko 139.0255,35.201;138.9787,35.23091;138.91021,35.22321;138.91088,35.27351;138.86465,35.36063;138.7688,35.4984
Kawaguchiko-Nagoya 138.7688,35.4984;138.72371,35.48309;138.5868,35.32829;138.65376,35.20138;137.19317,35.044;137.00263,35.0488;136.8815,35.1709
Nagoya-Kyoto 136.8815,35.1709;136.85765,35.15761;136.81817,35.15805;136.62117,35.04239;135.95124,34.97938;135.93277,34.97083;135.79469,34.97161;135.7727,34.9671
NGO-Kyoto 136.8124,34.8584;136.81617,34.86711;136.88814,35.052;136.62806,35.03808;135.95124,34.97938;135.79469,34.97161;135.7727,34.9671
Kyoto-Nara 135.7727,34.9671;135.76064,34.96938;135.74976,34.91436;135.75213,34.8348;135.81077,34.72202;135.843,34.6851
Nara-Osaka 135.843,34.6851;135.77004,34.6846;135.63719,34.68004;135.56098,34.67858;135.5262,34.6873
Osaka-KIX 135.5013,34.6687;135.48689,34.66454;135.44783,34.55918;135.29311,34.41513;135.25584,34.44254;135.244,34.4347
Kyoto-Kanazawa 135.7588,34.9858;135.84011,34.98999;136.3208,35.31893;136.09484,35.62934;136.60385,36.56804;136.6626,36.5622
Kanazawa-Shirakawa 136.6626,36.5622;136.72543,36.60309;136.87062,36.6268;136.88734,36.52973;136.89551,36.27738;136.9064,36.2577
Hiroshima-Miyajima 132.4528,34.3925;132.42082,34.39362;132.32962,34.36142;132.31861,34.32832;132.303,34.3107
Hiroshima-Fukuoka 132.4528,34.3925;132.21422,34.23746;131.44236,34.12995;130.9525,33.97864;130.4756,33.72355;130.399,33.5911
Fukuoka-FUK 130.399,33.5911;130.41849,33.59759;130.43706,33.60132;130.4482,33.5973
CTS-Sapporo 141.6812,42.7875;141.62249,42.8081;141.55351,42.87358;141.50904,42.95378;141.35,43.0606
Sapporo-Furano 141.35,43.0606;141.42651,43.07928;141.82712,43.24221;142.01943,43.24552;142.17805,43.3804;142.34849,43.37345;142.383,43.342
Furano-CTS 142.383,43.342;142.38246,43.29192;142.40774,43.21365;142.40729,42.97768;142.17596,42.91894;141.71425,42.88082;141.70207,42.85147;141.6812,42.7875
```
NRT-Asakusa: old via 139.94453,35.68941 looped (81.7 km); removed.

### OSRM pitfalls
- **National roads beat expressways.** Defaults: CTS→Odori on R36 (45.7 km), R5 not Sasson, R156 not E41 north of Mino. Force coach roads with vias.
- **A bad via loops.** Southbound vias on CTS→Sapporo give 82.0 km, not 50.4. Use same-direction vias or `bearings`/`radiuses` [api]; check km.
- **Limits.** 1 req/s, non-commercial [demo]: ship precomputed GeoJSON. The routing.openstreetmap.de mirror matches.

### Geometry sources
- **Overpass** (untested). `highway=motorway`/`motorway_link`; `network=JP:E`+`ref` is on relations only [jpe]. Divided roads are two oneway ways; two-lane E41 [e41] may be one. Don't drape `tunnel`/`bridge` spans.
- **GSI vector tiles.** `https://cyberjapandata.gsi.go.jp/xyz/optimal_bvmap-v1/{z}/{x}/{y}.pbf`, z4–16, trial release. Credit "国土地理院最適化ベクトルタイル" [bvmap].
- **GSI DEM PNG.** x = 2^16R + 2^8G + B. If x < 2^23, h = 0.01x m; if x > 2^23, h = 0.01(x − 2^24) m. (128,0,0) means no data [dem].
- **KSJ.** N06 expressways + named IC/JCT (2024 ed., GeoJSON, CC BY 4.0 with limits, time-series non-commercial) [n06]; N02 railways incl. Shinkansen (CC BY 4.0 from 2020) [n02].
- **Credit.** "© OpenStreetMap contributors", linked to /copyright (ODbL), in a map corner [attr].

### Repo fix
`Path.fromControl` (`path.js`) splines (CatmullRom) the 30 `ROAD_WP` points (`world.js`). Use `new Path()` on raw `overview=full` vertices [api]; densify ≤50 m, heights from `H()` (`roadY`, `polygonOffset` exist); interpolate across tunnels.

### Recent changes
- **Shin-Tomei.** Shin-Hadano–Shin-Gotemba (~25 km): FY2028 or later (Takamatsu Tunnel); use Tomei [stomei].
- **Shin-Meishin.** Otsu–Joyo (25.1 km) ~2029+; Yawata-Kyotanabe–Takatsuki (10.7 km) 2030+; use Meishin [smeishin].
- **Ex-Hanshin 8 Kyoto.** Since 1 Apr 2019 it has been E89 Daini-Keihan plus a toll-free Shin-Jujo-dori [shinjujo][hanshin].
- **E41.** Complete 5 Jul 2008; 4-laning Fukubegatake PA–Shirotori IC (Wikipedia only) [e41].

### Sources
osrm https://router.project-osrm.org/route/v1/driving/ · osm-de https://routing.openstreetmap.de/routed-car/route/v1/driving/ · api https://project-osrm.org/docs/v5.24.0/api/ · demo https://github.com/Project-OSRM/osrm-backend/wiki/Demo-server · shk https://shirakawa-go.gr.jp/en/access/ · e41 https://en.wikipedia.org/wiki/T%C5%8Dkai-Hokuriku_Expressway · sanyo https://en.wikipedia.org/wiki/San%27y%C5%8D_Shinkansen · sanyo-ja https://ja.wikipedia.org/wiki/山陽新幹線 · tokaido https://en.wikipedia.org/wiki/T%C5%8Dkaid%C5%8D_Shinkansen · tokaido-ja https://ja.wikipedia.org/wiki/東海道新幹線 · jg https://www.japan-guide.com/e/e3404.html?aFROM=2157_2160 · ferry https://jr-miyajimaferry.co.jp/en/route/ · fukstn https://en.wikipedia.org/wiki/Fukuoka_Airport_Station · jpe https://wiki.openstreetmap.org/wiki/Tag:network%3DJP:E · bvmap https://github.com/gsi-cyberjapan/optimal_bvmap · dem https://maps.gsi.go.jp/development/demtile.html · n06 https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N06-2024.html · n02 https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-2024.html · attr https://osmfoundation.org/wiki/Licence/Attribution_Guidelines · stomei https://kuruma-news.jp/post/1041565 · smeishin https://kuruma-news.jp/post/1065162 · shinjujo https://ja.wikipedia.org/wiki/新十条通 · hanshin https://en.wikipedia.org/wiki/Hanshin_Expressway
