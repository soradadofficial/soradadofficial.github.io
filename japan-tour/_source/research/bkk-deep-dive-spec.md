# Suvarnabhumi deep-dive: real-world reference spec

Researched and fact-checked on 13 Oct 2026. Each topic was researched from web sources and then checked by an independent pass that tried to refute every number. Wrong values were corrected and unsupported ones removed. Source keys in each section map to the URLs at the end of that section.

- **Structure and engineering**: 58 claims checked (38 confirmed, 16 corrected, 3 removed, 1 unverifiable)
- **Airfield, facilities and traffic**: 66 claims checked (47 confirmed, 14 corrected, 3 removed, 2 unverifiable)
- **Turnaround, movements and passengers**: 69 claims checked (49 confirmed, 9 corrected, 7 removed, 4 unverifiable)

---

## BKK structure: x-ray reference (terminal, concourses, SAT-1, tower)
Tags → URLs in §9; [d] derived, [i] interpretation, [u] unverified.

### 0. Frame (derived, low-med)
- Runways true 014.42° [AIP] (not 014.41°). If terminal ⟂ runways [u]: long axis 104.42°/284.42°.
- Origin = terminal OSM point 13.69134,100.75052 [MC1]; x long, y 014.42°. ARL stn (13°41′39″N 100°45′04″E [WPS]) ≈320 m N [d]; SAT-1 south [JSCE].

### 1. Terminal roof
| Item | Value |
|---|---|
| Plan | 567×210 m [ARC] (=7×81 [d]); 561×210 [WSI]; ≈570×200 [DET]; 690×2,920 ft [MM]?. Use 567 |
| Area | ≈120,000 m², 7 main bays [ASI] |
| Primary | 8 super-truss girders, 126 m span + 2×42 m cantilevers [MEI][ARC] = 210 m, at 81 m centres [ASI] |
| Truss form | 3-chord welded thick plate; flat upper chord, haunched lower chord ≈ moment curve (span + cantilevers); 2 chords compression, 1 tension [DET]; inverted triangle [i] |
| Truss weight | "eight composite 2,710-ton trusses" (each or total unclear; tagged clarification needed) [WP] [u] |
| Secondary | at 9 m centres spanning between super trusses [ASI]; trichord, 240 ft ≈73 m [MM]; 81 m span [WSI] |
| Supports | 16 frame-type steel columns [MEI][ARC]; 8 pairs, one per primary truss [DET]; "H-shaped" [AGD]; roof ≈40 m high [WSI] |
| Skylights | 848 nine-metre modules, 3.6 t; rows 9×72 m on two secondary trusses [ASI] → ≈105–106 rows [d]; N glass 95% frit, S solid, solar gain 1% [JAHN]; 40,000 m² two-tone fritted laminated glass [TEA] |
| Louvres | 1,304 × 4.5×9 m, 6.0 t [ASI]; mill-finish Al on top of structure, outside envelope, naturally ventilated [ARC] |
| Cladding | 36,000 m² solid roof/soffit panels on cantilevered frames, "continuous metal canopies" [PERM]; location [u] |
| Steel | Roof contract 8,300→9,500 t; 344 "supporting trusses" (undefined) [ASI]; terminal complex 77,000 t steel, 122,000 m³ concrete [STR-T] |
| Erection | ALFASI; rows built on launching rails from each side, launched 9 m per step; 2×63 m sections 9 m apart, closed by a skylight row; 9 months; peak 150 staff; 12 modules/day [ASI] |

**Placement [d, low]:** truss lines x = ±40.5, ±121.5, ±202.5, ±283.5 m; column pairs y = ±63 m (7.5 m outside 111 m glass line); tips ±105 m; skylight band 135 m (63+9+63 = 15×9 m; 7×72×135 = 68,040 m² ≈ 848×81 m²); louvres 1,304×40.5 = 52,812 m² ≈ rest of roof; end gardens ≈61.5 m ((567−444)/2).

### 2. Terminal façade
- Hall 444×111 m [STR-T][ARC]. Height conflict: 40 m struts [DET], 40 m glazing [JAHN]; ≈35 m [ARC]; 37.5 m building [KHL].
- Guyed vertical struts + pretensioned horizontal cables, glass point-fixed to cables [DET]; "cable truss" [MEI].
- 6,000 glazing elements 2.25×2.45 m, 34,000 m², in 9 m wide sections [KHL].
- Sobek concept/façades [EA][AR]; Permasteelisa–KAMA JV; glass Viracon, Thai-German Specialty Glass [AR].

### 3. Terminal floors
| Level | Use |
|---|---|
| B2 | ARL, 4 platforms/4 tracks [WPS] |
| B1 | ARL tickets, way to hotel [WPS] |
| APM | MTB station node 13.69143,100.75048 [MC2]; level [u] |
| L1 | buses, taxis [JSCE][CSA] |
| L2 | arrivals [CSA] |
| L3 | transit hall, lounges, restaurants [CSA] |
| L4 | departures, check-in [CSA] |
- 7 floors above ground, GFA 563,000 m² [STR-T]; 600-room hotel above ARL station [WP]. Engineers: John A. Martin Assoc., Martin/Martin, Werner Sobek [STR-T].

### 4. Concourses (A–G)
- H plan: E–W 1,350 m + two N–S legs 932 m, stated 3,213 m [ITD] (sum 3,214 [d]); 3,100 m [WSI]. Width 42 m [WSI] / 40.25 m [STR-C]. Storeys [u].
- 104 identical three-chord trusses, varying depth [DET]; "five-pin arch truss girders" [MEI]. Membrane spans 27 m between trusses, alternating with glazing [DET] / between glass façades [MEI]; truss c/c not given (≤3,100/104 ≈30 m [d]). Ends, crossings, terminal joints >4,000 m² free span [DET].
- Membrane: 108 bays, 108,000 m² [HTX] / ≈110,000 m² [NXR]; ≈1,100 m² pieces, 104 typical bays, 25 m middle pieces [TNS] → arc ≈37–44 m [d].

| Layer | Spec |
|---|---|
| Outer | PTFE-glass 1,200 g/m² [NXR] |
| Middle | 6 mm PC, 7.2 kg/m², class B1, on ≈1×1 m cable net [NXR] |
| Inner | A-Tex 2500 Low E [TNS]; 280 g/m² raw/330 finished, Al ≈100 nm, ε 0.4, class A2 DIN 4102 [NXR]; Al ≤120 nm, NRC 0.89 [TNS] |
| System | 35 dB [NXR]; U 2.5 W/m²K, solar transm. 0.02 (design study) [AIVC] |
- Glass bands: 2×6 mm, frit 76%→20%, ε 0.17 [AIVC]; laminated, coated, variable frit [ARC], denser higher [JAHN].
- >110,000 m² stick curtain wall "for the bays" [PERM]; building [u].
- Hightex: 108 outer + 102 inner membranes; 108 fields in 19 months [NXR].

### 5. Climate engineering
- Radiant floor ≈150,000 m², PE-Xa at 150 mm (200 shaded), 13/19 °C, 70–80 W/m², floor ≥21 °C; air 18 °C via ≈2 m diffusers; 24 °C, 50–60% RH [UPO].
- Only lowest 2.5 m conditioned [JAHN]; under-roof air up to 50 °C, design inner surface 55 °C [AIVC].
- Ventilation −40% [TSL] ("halved" [UPO]); cooling power 60% [JAHN] / ≈50% [EA]; terminal peak 9,500 kW (design study) [AIVC].

### 6. SAT-1
- 4 storeys + 2 basements: B2 APM (4 platforms); B1 systems; GF BHS, offices; 2F arrivals; 3F departures; 4F lounges [AOT]. Shrines at E and W ends [KHS] → E–W [i].
- 216,000 m² [HOK][D103][ATS]; 215,000 m² [NACO]; 251,400 m² usable [AOT][TAT]. 28 contact stands (8 F, 20 E); 64 PLBs (24 F, 40 E) [TAT].
- Arched beams on tree columns, standing-seam metal roof; diamond ribs, timber-colour slats; solar panels [ATS][HOK].
- HOK concept, NACO functional design [NACO] (ATS credits NACO); SADC2 [ATS]; D103 with HOK, BNP, NACO [D103].
- Tunnel ≈1 km, 8 tracks: 4 APM, 2 BHS/EDS, 2 service road [AOT]; new 700 m from Phase-1 tunnel end [D103], under cross taxiways [ATS].
- APM: Siemens AirVal, 6 two-car trains, 2.80 m, 210 pax, 80 km/h, 750 V DC, 1 km, ≈2 min [WPA]; ≈3 min incl. wait [AOT].
- Expansion works 2016–17 (element unnamed): D-walls 1.0 m × 30–35 m; 413 piles Ø1.2 m; Ø1.5 m piles to 48/54/62 m [BAU].

### 7. Control tower
- 132.2 m, 2005 [CTBUH][ATT] (135 m [WP]); KONE lifts [CTBUH]. Antenna top 144.9 m elev. at 13.69644,100.74953; AD elev. 1.3 m [AIP] → ≈578 m NNW [d]. Siam Syntech–Unique Eng. + AEROTHAI, THB 574.8 m, Thales [ATT].

### 8. Gaps
Truss depth/sections; column geometry; strut spacing, cables; floor levels; concourse arch height, storeys; SAT-1 size/coords; tunnel depth; tower form. Deleted (unsourced): Aurecon, clear arrivals glass, precast frame, counter count, smoke test, ITD basements, 1,045 m APM.

### 9. Sources
- AIP: aip.caat.or.th/2024-07-11-AIRAC/html/eAIP/VT-AD-2.VTBS-en-GB.html
- MC1: mapcarta.com/W26071844
- MC2: mapcarta.com/N13373875189
- WPS: en.wikipedia.org/wiki/Suvarnabhumi_station
- JSCE: jsce.or.jp/e/archive/pdf/pj17.pdf
- ARC: architonic.com/en/pr/passenger-terminal-complex-suvarnabhumi-airport/20193337/
- WSI: wernersobek.com/projects/bangkok-airport/
- DET: detail.de/de_en/survarnabhumi-international-airport-bangkok-structure-and-form-finding-14977
- MM: martinmartin.com/?p=4111
- ASI: steel.org.au/resources/elibrary/resources/bangkok-international-airport-main-terminal-roof-s/?view=download
- MEI: meinhardt.com.sg/projects/suvarnabhumi-airport
- WP: en.wikipedia.org/wiki/Suvarnabhumi_Airport
- AGD: archigardener.com/?p=23455
- JAHN: jahn.studio/work/suvarnabhumi-airport/
- TEA: teascoglazingsolutions.com/
- PERM: permasteelisagroup.com/historic-project/suvarnabhumi-airport/
- STR-T: structurae.net/en/structures/suvarnabhumi-airport-passenger-terminal-complex
- STR-C: structurae.net/en/structures/suvarnabhumi-airport-concourse-building
- KHL: khl.com/news/ai090509.xml/1021125.article
- EA: e-architect.com/thailand/suvarnabhumi-airport
- AR: architecturalrecord.com/articles/8047-suvarnabhumi-airport
- CSA: csair.com/nz/en/tourguide/airport_service/airports_info/internation/18id8qnhckj30.shtml
- ITD: itd.co.th/our-capabilities-detail.php?project=78
- HTX: archiexpo.com/prod/hightex/product-58335-524139.html
- NXR: nextroom.at/data/media/med_binary/original/1154894754.pdf
- TNS: tensinet.com/index.php/projects-database/projects/3890
- AIVC: aivc.org/sites/default/files/airbase_13519.pdf
- UPO: uponor.com/de-de/r/bangkok-airport
- TSL: transsolar.com/projects/bangkok-suvarnabhumi-airport
- AOT: suvarnabhumi.airportthai.co.th/service/way-to-airport/detail/suvarnabhumi_airport_SAT-1
- TAT: tatnews.org/2023/09/suvarnabhumi-airport-to-open-new-sat-1-terminal-on-28-september-2023
- ATS: airport-technology.com/projects/suvarnabhumi-international-airport-sat-1-thailand/
- HOK: hok.com/projects/view/suvarnabhumi-international-airport-midfield-satellite-concourse
- NACO: haskoning.com/en/projects/bangkok-international-airport-new-satellite-terminal-building
- D103: d103group.com/experience/36/Suvarnabhumi-Airport-Satellite-Terminal-1
- KHS: khaosodenglish.com/life/2024/11/14/suvarnabhumis-sat-1-among-worlds-6-most-beautiful-airports/
- BAU: geotechnical-solutions.bauer.de/en/foundation-work-for-suvarnabhumi-airport-expansion-project
- CTBUH: skyscrapercenter.com/building/suvarnabhumi-airport-air-traffic-control-tower/11725
- ATT: airport-technology.com/features/feature-the-10-tallest-air-traffic-control-towers-in-the-world-4142194/
- WPA: en.wikipedia.org/wiki/Suvarnabhumi_Airport_Automated_People_Mover

---

## BKK airfield & surroundings: build data (Oct 2026)

**Frame:** origin THR 02R; *along* = m along 014.39°T (geodesic 02R→20L from AIP coordinates, WGS84; AIP lists 014.42°) [A]; *cross* = m east of 02R/20L centreline. Keys at end.

### 1. Runways [A]
| THR | lat,lon | elev | note |
|---|---|---|---|
| 02L | 13.66517,100.72925 | 2 m | 4,000×60 m, PCR 840 |
| 20R | 13.70019,100.73844 | 2 m | |
| 02R | 13.67128,100.73467 | 1.3 m | 3,700×60 m, grooved |
| 20L | 13.70367,100.74317 | 1.2 m | |
| 01 | 13.65669,100.75183 | 1.1 m | 4,000×60 m |
| 19 | 13.69172,100.76103 | 1.1 m | |
- Computed: 02L/20R 400 m W of 02R/20L (also [C8]); 01/19 2,200 m E (also [AT]); THR 02L 800 m S, THR 01 1,101 m S of THR 02R.
- Strips 300 m wide, 3,820 m (02R/20L) / 4,120 m. RESA 240 m (150 m wide; 120 m on 02L/20R). CWY 02R 1,100, 20L 700, 19 550 m, others nil.
- ARP 13.68583,100.74889 ("midpoint between TWY G, H, H2, H3"), 2 m; RFF Cat 10. AIP says 014.00° for 02L/20R; coordinates give 014.39°.

### 2. Taxiways
02L/20R → **F** (F1 N…F15) → **W/Y/Z** links across 02R/20L → **02R/20L** → **E** (E1 N…E21) → **D** (D1–D11) → aprons, cross TWY **G, H (H1–H6)** → **C** (C1–C10) → **B** (B1 N…B13) → **01/19** [A]; order inferred from 2021 taxi routes [A21] (medium).
- J, J1–J4, K, T18–T19 concrete [A]; SAT-1 role unverified.
- **F13** perimeter: extends S end of F round 02R/20L to D, 2026 [C2].
- Width min 25 m [A] (30 m in AIP 2021 [A21]). T8–T12 max Code E, span <65 m [CH]. Edge + centreline lights on all [A].
- Intersection TORA: 02R/E19 3,590; 20L/E2 3,590; 01/B12 3,890; 19/B2 3,870; 02L/F11 3,890; 20R/F2 3,900 m [A].
- Temporary routes 3 Oct 2024: dep 20R E3, cross 20L, W, F1; dep 02L E17, cross 02R, Z, F, F12; arrivals reverse via Z/E17 and W/E3 [S41].
- **Offsets not published.** F ≈ cross −200 m (midway; derived, low).
- RETs: 7 planned on 02L/20R [AT]; names not found.

### 3. Stands (nose-wheel stop [P1][P2][P3])
- **148** = MTB 120 [AOT]: 51 contact (A1–6, B1–6, C1–10, D1–8, E1–10, F1–6, G1–5) + 69 remote (101–130, 201–203, 301–308, 401–403, 501–525); + SAT-1 28 contact S101–S128, 8 Code F + 20 Code E [SAT]; NAC 120+28 [N]. MARS L/R at S111–S118 [P3] (= Code F stands, inferred).
- Maintenance 131–134 (THAI); GA 124–129, 521–525 [P3].
- NAC W26: 6 MTB contact stands up to A380 (medium), 2 VIP-only; max 4 A380 at MTB at once; 13 stands closed Oct 2026–Mar 2027 [N]. 2006: 5 A380 gates "with 3 bridges" [ATS]. Hydrant pits 119 [BF][TR].

| row | from → to | pitch (computed) |
|---|---|---|
| SAT-1 N S101→S127 | 13.68188,100.75276 → 13.68413,100.74378 (284.4°) | E 72.3–72.6 m; F 87.5 m |
| SAT-1 S S102→S128 | 13.68052,100.75236 → 13.68278,100.74339 | rows 156 m apart |
| C2→C10 | 13.68936,100.75329 → 13.68668,100.75258 | 76.5 m |
| E1→E9 / E2→E10 | 13.69095,100.74698→13.68826,100.74632 / 13.69119,100.74604→13.68851,100.74533 | 76.5 m; rows 105 m apart |
| D1→D8 | 13.69037,100.75270 → 13.69155,100.74800 | 525 m |
| 101→114 | 13.69512,100.75578 → 13.70414,100.75824 | 78 m |
| 115→130 | 13.69224,100.75740 → 13.70460,100.76034 | 78 m, gaps after 118, 123 |
| 506→525 (cross +430) | 13.69921,100.74613 → 13.71317,100.74974 | 85 m, 77–78 m after 522 |
| 401→403 (cross +395) | 13.69076,100.74355 → 13.68939,100.74319 | 78 m |
- Apron 887,833 m² (pre-SAT-1) [AOT]; SAT-1 apron >260,000 m² [TT].

### 4. Fuel
- **BAFS depot** 63 rai (100,800 m²), E side, crossed by Khlong Nong Ngu Hao; **6 Jet A-1 tanks** (5 cone-roof, 1 IFR), ~90 ML [BF] (mean 15,000 m³, derived); tank T-2306 15,000 m³ [KH].
- Hydrant pumps conflict: BAFS 10 / 4,540 m³/h, also 11×454 m³/h [BF]; TARCO 8 [TR].
- Pin "Fuel Hydrant Station" 13.68826,100.77396 [BC], ~1.45 km E of 01/19 (computed; medium).
- **Hydrant (TARCO)**: twin 24″ feeder, 24/16/12/6″, 9.5–12.5 bar, 119 pits, 139 ESD [TR].
- Fleet: BAFS 42 dispensers + refuellers 2×65, 40, 35 kL; ASIG 10 + 2×35 kL [A]. BAFS high-flow 3,800 L/min [BF]; e-dispenser 3,400 L/min [AP].
- Supply: 30 km jet pipeline serving BKK/DMK [GW]; routes not found.

### 5. Cargo, MRO, support (north)
- Cargo handlers: THAI, WFS-PG (BFS) [A].
- THAI cargo (design): site 624,000 m²; intl bldg 4 storeys, 1,226,000 t/yr; domestic 15,000 m², 119,800 t/yr [DEC]. BFS 55,370 m², 550,000 t/yr [WF].
- OSM: customs 13.70989,100.75244 [M3]; Free Zone jct 13.71391,100.75241 [M7]; Mail Centre 13.71407,100.74955 [M6]; THAI OPC 13.71056,100.75863 [M4]; Catering 13.71363,100.76127 [M5]. Freighter apron = 506–525 (inferred).
- **THAI hangar** 270 m span, 24,300 m² (~90 m deep, derived), 9,500 t roof lifted ~30 m, 3 A380 [ATH]. AIP "Hangar Building" 49.5 m at 13.70656,100.76094; "Office Building" 46.2 m at 13.71103,100.75836 (60 m from OPC pin) and 49.5 m at 13.70753,100.75853 [A].

### 6. Water, land, flood
- 22,000 rai [AOT] = 35.2 km². THR elev 1.1–2 m [A].
- **Dike 23.5 km**, 3.5 m high, crest 3 m, base 37 m, to +2.27 m MSL [TP].
- **6 ponds** 4.7 M m³ [TP] (2011: 3.2–4 M m³, 2 m deep [PM]). Canals drawn to −1.6 m MSL [TP] (2011: −1.25 m [PM]). Perimeter canal 35 × 2 m [PM].
- **2 pump stations** (S side, E and W), 4×2 m³/s each, 6 running = 12 m³/s [TP]. Pond positions: gap.

### 7. Access
- **ARL** station underground, 4 tracks, 13.6942,100.7511 [WS]; rises to viaduct to Lat Krabang 13.72762,100.74861 [WL], ~3.7 km N (computed); 28.6 km, 160 km/h top [WA].
- **APM** MTB 13.69143,100.75048 [M1] – SAT-1 13.68249,100.74822 [M2] (1.02 km); tunnel ~1 km, 8 lanes (4 APM); 210 pax/train; ~3 min incl. wait [SAT].
- Motorway 7: Thap Chang km 6.60, Lat Krabang km 20.80 [WM]. Alignment: gap.
- Car parks: Z2+3 5,572; Z6+7 1,355; long-term 1,341; Z4 357; Z5 445 [PK].
- **Hotel** Hyatt Regency from 1 Feb 2025 (ex-Novotel) [OM]; 612 rooms, 2 square 5-storey blocks, 10.5 ha, 2,800 m² lobby, 300 m tunnel walkway [HE]; ≈13.69759,100.75191 (low) [EV].

### 8. Heights (AIP elevation AMSL) [A]
Tower pole 142.1 m (13.69644,100.74958) · Terminal Building 52.0 (13.69086,100.75303) · E apron twr 52.3 (13.69000,100.75447) · W apron twr 51.9 (13.69206,100.74625) · SMR 46.6 (13.68483,100.74267) · SSR 51.4 (13.69717,100.77103) · PSR 47.8 (13.68969,100.77033) · Met tower 21.5 (13.69067,100.73378).

### 9. Traffic
- **2025**: 370,823 mvts (≈1,016/day), 62,902,183 pax (≈172,300/day), 1,529,033 t; intl 75.1%. Codes C 66.2%, D 7.0%, E 25.1%, F 1.7%. TG 23.0%, PG 9.4%, Thai VietJet 9.1%, Thai AirAsia 4.2% [AR].
- **FY2026 Oct–Aug**: 346,905 mvts (≈1,036/day) [NT].
- Peak hour 2025: 72 (1st), 66 (30th), medium [AR]. Declared W26 **85 ARR/DEP/h** [N]; 68/h before runway 3, 94/h target [IQ].
- NAC pax/h 9,300 and 8,400; arr/dep mapping unclear [N].
- 02L/20R mainly landings [IQ][AT], 02R/20L take-offs (plan) [AT]; runway nearest stand [IQ]. TWR 118.2 (01/19), 119.0 (02R/20L, 02L/20R) [CH]. Simultaneous independent approaches/departures (19 & 20L/20R or 01 & 02L/02R) trialled Oct–Dec 2024 [S50]; status now unverified.
- Night closures 19:00–23:29 UTC (02:00–06:29 local next day): Mon/Thu 01/19, Tue/Fri 02R/20L, Wed/Sat 02L/20R [N].
- NAC: 30 min stand buffer between arriving and departing aircraft (not a turnaround time); max ground 12 h; check-in closes STD−40 min [N].

### 10. GSE
- Handlers: THAI, BFS (Bangkok Airways + WFS) [AV]. BKK fleet counts not found; 2006: THAI >600 units at DMK +~33% (≈800, derived), BFS 700+ [AV].

**Keys** (https://): A aip.caat.or.th/2026-05-14-AIRAC/html/eAIP/VT-AD-2.VTBS-en-GB.html · A21 aip.caat.or.th/2021-03-25-AIRAC/html/eAIP/VT-AD-2.VTBS-en-GB.html · P1/P2/P3 aip.caat.or.th/2023-11-30-AIRAC/graphics/187052.pdf /187053.pdf /187054.pdf · CH aip.caat.or.th/2024-11-28-AIRAC/graphics/256159.pdf · C8 aip.caat.or.th/2024-06-28/html/eAIC/VT-eAIC-24-08-en-GB.html · C2 aip.caat.or.th/2025-12-18/html/eAIC/VT-eAIC-26-02-en-GB.html · S41 aip.caat.or.th/2024-10-02/html/eSUP/VT-eSUP-24-41-A-en-GB.html · S50 aip.caat.or.th/2024-10-31-AIRAC/html/eSUP/VT-eSUP-24-50-A-en-GB.html · N www.caat.or.th/wp-content/uploads/2026/06/BKK_NAC_W26_Rev.01.pdf · AOT suvarnabhumi.airportthai.co.th/about-us · SAT suvarnabhumi.airportthai.co.th/service/way-to-airport/detail/suvarnabhumi_airport_SAT-1 · PK suvarnabhumi.airportthai.co.th/service/way-to-airport/detail/753 · TT www.traveltrendstoday.in/thailands-suvarnabhumi-airport-opens-new-sat-1-terminal · AR www.airportthai.co.th/wp-content/uploads/2026/06/ANNUAL-REPORT-2025.pdf · NT www.nationthailand.com/business/economy/40071612 · IQ www.infoquest.co.th/?p=440834 · AT www.airport-technology.com/projects/suvarnabhumi-airport/ · BF www.bafsthai.com/en/businesses/aviation-business · BC www.bafsthai.com/en/contact · TR www.tarco.co.th/en/knowledge-zone.php · KH kaohoon.com/?p=453721 · AP thearabianpost.com/bafs-introduces-aseans-first-high-flow-ev-hydrant-dispenser-for-enhanced-performance/ · GW www.gem.wiki/Bangkok-Bang_Pa-In_Products_Pipeline · WF www.wfs.aero/wp-content/uploads/2022/08/WFS-Partner-Profile-Bangkok-Flight-Services.pdf · DEC dec.co.th/?p=52 · ATH www.asiatraveltips.com/travelnews04/2110-Maintenance.shtml · ATS www.asiatraveltips.com/SuvarnabhumiAirportBangkok.shtml · TP www.thaipost.net/main/detail/118927 · PM www.pattayamail.com/thailandnews/suvarnabhumi-airport-confident-of-its-flooding-prevention-system-7661 · WS en.wikipedia.org/wiki/Suvarnabhumi_station · WL en.wikipedia.org/wiki/Lat_Krabang_station · WA en.wikipedia.org/wiki/Airport_Rail_Link_(Bangkok) · WM en.wikipedia.org/wiki/Motorway_7_(Thailand) · OM onemileatatime.com/news/hyatt-regency-bangkok-airport/ · HE www.hotelexecutive.com/newswire/204/novotel-suvarnabhumi-airport-hotel-opens · EV www.exoticvoyages.com/hotel/hyatt-regency-bangkok-suvarnabhumi-airport-43313.html · AV www.aviationpros.com/home/article/10382289/golden-opportunity-in-the-golden-land · M1–M7 mapcarta.com/ N13373875189, N13373875190, W155971314, W404295669, W1254573938, W1254572192, N11662615143

---

## BKK ops animation data: turnaround, movements, passengers
Conf H/M/L; der. = derived; x aft of nose, y + right, z up (m); [Key] = URL at end.

### 1. Turnaround at a contact gate
#### A350-900: full servicing 62 min, minimum 34 min [AC] (H)
AC = Airbus "A350-900 Preliminary Data", Rev. Dec 2012. 315 pax (48J/267Y); bridges L1+L2, position + door 2 min; deplane 25, board 15 pax/min/door, +4 min headcount. 2 container + 1 belt loader, 2.5 min; LD3 off/on 1.2/1.4 min, pallet 2.4/2.8, bulk 9.2/10.5 min/t; fwd 4 PMC+8 LD3, aft 4 PMC+4 LD3, bulk 1 t. Fuel 81,000 L, 2 nozzles, 50 psi, dispenser 3 min. Catering truck 1 R1 (10 FSTE) then R2 (7), truck 2 R4 (25); 1.5 min/FSTE; set-up 5, removal 3. Water 1,060 L; toilets; 2x90 kVA GPU; 2 PCA.

Der. timeline (L; GSE from t0). Only chain closing at 62: R4 catering 5+37.5+3 = 45.5, then boarding 10.5 + 4 + 2.
| Task | min |
|---|---|
| Bridges / deplane | 0-2 / 2-8.3 |
| Catering R4 (critical); R1 then R2 | 0-45.5; 0-23, 23-41.5 |
| Cleaning | 8.3-45.5 |
| Fwd hold off/on | 2.5-21.7 / 21.7-44.1 |
| Aft hold off/on | 2.5-16.9 / 16.9-33.7 |
| Bulk off/on | 2.5-11.7 / 11.7-22.2 |
| Fuel at 3,400 L/min [BAFS] | 0-3 set-up, 3-26.8, off 29.8 |
| Board / headcount / doors+bridges | 45.5-56 / 56-60 / 60-62 |

A350-900 points [AC]: refuel couplings x 32.57, y ±15.83, z 5.50, RH standard, LH optional (H); refuel panel x 36.30 CL, z 2.18; water x 50.2; waste x 52.21 CL, z 3.69; electrical x 6.63. Doors (label mapping inferred, L): 1-4 at 6.85/18.85/37.93/52.55; fwd cargo 11.69, aft 47.30, bulk 49.99. Fuel 138,000 L in the 2012 AC; Airbus now lists max 166,488 L [AB].

#### 787-9 service points [ACAP] (H)
| Item | x | y | z |
|---|---|---|---|
| Doors 1/2/3/4 L+R | 6.30/18.36/35.43/49.66 | | |
| Fwd / aft cargo (R) | 11.00 / 43.31 | + | |
| Bulk (L) | 47.75 | - | |
| Fuel connector, LH only, 2 ports | 30.5 | -14.8 | 5.4 |
| Fuel vents | 37.6 | ±23.7 | 6.6 |
| Potable water | 22.4 | -1.1 | 2.3 |
| Lav panel | 49.9 | 0 | 2.5 |
| GPU fwd x2 / mid-aft | 5.9 / 33.3 | -1.4 / -1.6 | 2.5 / 2.2 |
| Cond. air x2 | 24.7 | ±0.7 | 2.0 |
Fuel 126,429 L (sec 2.1.2; 126,205 L in 5.4.4). Holds 20 + 16 LD3, bulk 11.4 m3; 290 seats (28J/262Y). Sills (L; ACAP 2.3.2 letters unlabelled, mapped by order): doors 1-4 4.24-4.80, 4.42-4.80, 4.62-4.88, 4.70-5.08; fwd cargo 2.34-2.82, aft 2.69-3.02, bulk 2.74-3.05.
Parking (der., M): bridges 1L+2L; hydrant dispenser LH wing; container loaders R fwd/aft; belt loader L bulk; lav truck CL x 49.9; water truck left x 22.4; tug at nose gear. 787 catering side unverified.

#### 787-9 loop (der., L)
145 pax/door: deplane 5.8, board 9.7 + 4 min. Fuel ~6 h: 2.5 L/pax/100 km x 294 seats x 920 km/h [LH] = 6,760 L/h, trip ~40,500 L, block ~45,000 L. Pumping 13 min at 3,400 L/min (BAFS unit announced for BKK end-2023) or 35 min at 1,300 L/min (older unit, DMK) [BAFS]; aircraft acceptance rate unknown. Holds: fwd 24 + 28, aft 19 + 22 min. 787 example: ~2 h turn, fuelling from ~1 h before departure, door shut 7 min before [TPG]. Thai: check-in closes 40 min, gate opens 75 and closes 10 min before STD [TG]. A-CDM (eSUP A17/24): TOBT from EOBT-120; TSAT issued TOBT-40; call for start/push at TSAT ±5 min [CDM].

### 2. Aircraft movement
| Parameter | Value | Conf |
|---|---|---|
| Taxi straight | avoid >30 kt (15.4 m/s) [TAX]; animate 15-20 kt (der.) | M/L |
| Taxi turns | 8-12 kt (old FCTM text, removed); operator max 10 kt [TAX] | M |
| RET | 93 km/h (50 kt), 30 deg, R >= 550 m [RET] | H |
| Approach | PAPI 3 deg, all six ends; MEHT 63.82 ft (19.45 m) [AIP] | H |
| Descent at 150 kt GS | ~800 ft/min (4.0 m/s), der. | H |
| 787-9 Vapp | 153 kt at MLW 192.8 t [ARC] | H |
| Aim point | 400 m from THR, LDA >= 2,400 m [AIM] | H |
| Landing roll (der.) | touchdown ~400 m; 1.5-2.3 m/s2 to 50 kt; exit 1,500-2,050 m; ROT 40-50 s | L |
| Arrivals | H-H 4 NM, H-M 5 NM [WT] = 96 / 120 s at 150 kt (der.) | H |
| Departures | 2 min M/L behind H [WT] | H |
| BKK W26 | 85 movements/h; RWY 01/19 shut Mon+Thu 1900-2329 UTC [NAC] | H |
| 787-9 VR | 172 kt near MTOW, flap 5 [LHR] | M |
| TO distance | B788 3,100 m [B788]; 787-9 223.8 t, full thrust: accel-go 2,354 m [AAIB] | M |
| TO roll (der.) | 1.6 m/s2, liftoff 180 kt at ~2,700 m, 58 s | L |
| Rotation | 2-3 deg/s, liftoff 8-9 deg, 10 deg in 3-5 s (767) [767]; 787-9 ~2 deg/s [LHR] | M |
| Climb | B788 190 kt, 2,700 ft/min [B788] = ~8 deg (der.) | M/L |
| Push / GSE | "slow"; GSE at walking speed in ERA [GOSM]; ~1 m/s (der.) | L |

#### Thresholds [AIP] (THR-THR 3,700/4,000/4,000 m, 014.41) and der. aim points
| THR | lat,lon | Aim (der.) |
|---|---|---|
| 02R | 13.67128,100.73466 | 13.67478,100.73558 |
| 20L | 13.70367,100.74318 | 13.70017,100.74226 |
| 01 | 13.65670,100.75183 | 13.66020,100.75275 |
| 19 | 13.69171,100.76103 | 13.68821,100.76011 |
| 02L | 13.66517,100.72924 | 13.66868,100.73016 |
| 20R | 13.70019,100.73845 | 13.69669,100.73753 |
AIP lists 02L/20R as 014.00 (coords give 014.41). THR elev 1.1-1.3 m; 02L/20R 2 m. TORA 3,700 (02R/20L), else 4,000; TODA 02R 4,800, 20L 4,400, 19 4,550 [AIP].

### 3. Passenger flows
- Levels: B rail link; 1 taxis (between doors 4 and 7), buses; 2 arrivals; 3 shops, lounges; 4 check-in, outbound immigration [TIG] (M).
- Check-in: Thai domestic rows B/C [TG]; 302 counters allocated at 70 pax per counter (no time unit given), open 3 h, close 40 min before STD; 196 kiosks, 50 bag drops [NAC] (H).
- Departures: check-in, security, passport [TIG]. Passport Zone 2 on west side of L4 [TGO].
- Declared peak: 9,300 dep (7,140 int / 2,160 dom), 8,400 arr (6,200 / 2,200) pax/h [NAC] (M; labels mapped by sums).
- Arrivals: gates on L2 [JAL]; walk to passport 10-15 min [TIG] (L); ~1 min/pax at desk, ~15 min queue, landing to exit ~40 min (Nov 2022) [PBS]. Belts 18 int + 4 dom, active 60 / 40 min from landing [NAC].
- Transfer: airside; counters L3 [JAL]. MCT: int'l >= 120, dom 60-90, int'l-dom 150-180 min [MCT]; BKK to DMK >= 3 h 30 min [JAL].
- Walking (US data): 1.34 m/s; belt 0.63, combined 1.64 [APEX].
- SAT-1: S101-S128 [CHART]; 8 Code F + 20 Code E; 3F dep, 2F arr/transfer, B2 APM, 4 platforms; ~1 km; ~3 min incl. wait; 210 pax/train [SAT]. 6 two-car trains, 3,590 pphpd, ~2 min ride, 3 min headway, 80 km/h max (not reached) [WAPM].
- Main terminal 51 contact + 69 remote = 120 (older figure) [AOT]; W26: 13 stands shut for taxilane works [NAC].

### 4. Boarding bridges (generic Jetway) [JW]
- 3-tunnel: retracted 13.07-21.80 m, extended 23.94-45.76 m; 2-tunnel A2 12.45-21.9 / 17.07-33.8 m.
- Drive 0-0.30 m/s; lift 1.10 m/min; cab 125 deg (92.5 ccw/32.5 cw) at 145 deg/min; rotunda ±87.5 deg; opening 1.32 x 2.31 m; cab 3.10 m wide.
- Docking: auto to 0.5 m, then manual [GOSM]; Airbus: 2 min incl. door [AC].

### Gaps
Turn-chart bars, 787 GSE layout, A350 door labels, check-in rows; fuel acceptance rate; water/lav and push times; RET positions; ILS GP/RDH; taxi times; gate distances; BKK bridge data; 787-9 TOFL/climb.

### Sources
AC https://skybrary.aero/sites/default/files/bookshelf/2374.pdf
AB https://aircraft.airbus.com/en/aircraft/a350/a350-900
ACAP https://www.boeing.com/content/dam/boeing/v2/airports/acaps/787_ACAP_Rev_Q.pdf
ARC https://www.boeing.com/content/dam/boeing/boeingdotcom/commercial/airports/faqs/arcandapproachspeeds.pdf
BAFS https://insideoilandgas.com/?p=1754
LH https://lufthansagroup.com/en/themes/boeing-787-9.html
TPG https://thepointsguy.com/airline/the-aircraft-turnaround-what-goes-on-between-flights/
TG https://thaiairways.com/en_LA/plan/airport_info/Thailand/Suvarnabhumi_BKK.page
CDM https://aip.caat.or.th/2024-03-21-AIRAC/html/eSUP/VT-eSUP-24-17-A-en-GB.html
AIP https://aip.caat.or.th/2026-08-06-AIRAC/html/eAIP/VT-AD-2.VTBS-en-GB.html
NAC https://www.caat.or.th/wp-content/uploads/2026/06/BKK_NAC_W26_Rev.01.pdf
TAX https://www.atsb.gov.au/node/4241
767 https://www.atsb.gov.au/node/4116
RET https://www.icao.int/sites/default/files/APAC/Meetings/2020/2020%20AOPSG4/3-Working%20Papers/WP23%2C%20AI%204%20-%20RET%20Design.pdf
WT https://skybrary.aero/articles/mitigation-wake-turbulence-hazard
AIM https://thewisepilot.com/?p=61223
B788 https://skybrary.aero/aircraft/b788
LHR https://skybrary.aero/accidents-and-incidents/b789-london-heathrow-uk-2020
AAIB https://assets.publishing.service.gov.uk/media/5f5a3188e90e072076fd47c2/Boeing_787-9_G-CKWC_12-18.pdf
GOSM https://www.changiairport.com/content/dam/cacorp/documents/airside/GOSM.pdf
TIG https://thailandinsiderguide.com/en/getting-around/transportation/suvarnabhumi-airport-bkk/
TGO https://www.thailand.go.th/guide-book-detail/suvarnabhumi-airport-bkk-has-scheduled-the-installation-of-a-new-automatic-channel-for-passport-screening-system-and-equipment-to-replace-the-existing-model
PBS https://www.thaipbs.or.th/news/content/321917
JAL https://jal.co.jp/jp/en/inter/airport/bkk/transit
MCT https://suvarnabhumi.airportthai.co.th/service/transportation/detail/1288
APEX https://apex.aero/articles/moving-walkways-helping-hindering-passenger-flow-airports/
CHART https://aip.caat.or.th/2024-03-21-AIRAC/graphics/187051.pdf
SAT https://suvarnabhumi.airportthai.co.th/service/way-to-airport/detail/suvarnabhumi_airport_SAT-1
WAPM https://en.wikipedia.org/wiki/Suvarnabhumi_Airport_Automated_People_Mover
AOT https://suvarnabhumi.airportthai.co.th/about-us
JW https://oshkoshaerotech.com/hubfs/images/Corrugated_Sell-Sheet_2025.2-1.pdf?hsLang=en
