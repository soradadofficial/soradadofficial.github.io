# VTBS Suvarnabhumi 3D Airspace View: Reference Spec

**Data cut:** AIP Thailand AIRAC AMDT 10/26, effective 01 OCT 2026. It is the current edition on 13 OCT 2026; the next AIRAC (AMDT 11/26) takes effect 29 OCT 2026 [S10]. The VTBS SID pages (AD 2-VTBS-6-1 to 6-78) and STAR pages (7-1 to 7-20) are dated 3 SEP 26 (AIRAC 2609), and AMDT 10/26 changed no VTBS page [S11]. This spec is not for navigation.

## Conventions

- **Coordinates:** decimal degrees N/E to 5 dp, converted from AIP DMS.
- **Altitudes:** ft MSL. Render `FLnnn` as nnn × 100 ft. Transition altitude is 11000 ft MSL at VTBS, at VTBD and in the Bangkok FIR. Transition level is fixed at FL130 [S2][S3][S6].
- **Bearings:** °M is magnetic as charted; °T is true. Variation is 0°42′W (2025) with annual change 0°2′E, so **°T = °M − 0.7** [S2][S17].
- **Runway configurations:** sources use "north flow" and "south flow" in opposite senses, so this spec names each configuration by its runways.
  - **Config 01/02:** RWY 01, 02L and 02R in use. Finals and climb-outs are on 015°M. STAR suffix is D, and the STAR ends with heading 195° [S15].
  - **Config 19/20:** RWY 19, 20L and 20R in use, on 195°M. STAR suffix is C, and the STAR ends with heading 015° [S16].
- **Constraint notation:**
  - `≤` means at or below, `≥` at or above, and `a–b` a window.
  - Speeds are max IAS unless the table says "cross at".
  - The above/below sense on STAR constraints comes from the IVAO file, because the AIP text extraction drops the bar symbols [S37][S15].
- **(derived):** computed from published values. Derived values are not printed in any source.
- **Source tiers:**
  - S1–S35: official AIP, AIC and AIP chart graphics.
  - S36: a third-party diff of AIP text.
  - S37–S46: simulator-community or third-party data, marked **SIM** in the source list.
  - S47–S51: live ADS-B snapshots, not archived.
  - S52: an investigation notice.

## 0. Reference points and runways

| Point | Lat | Lon | Notes | Src |
|---|---|---|---|---|
| VTBS ARP | 13.68583 | 100.74889 | 134109N 1004456E | [S2] |
| VTBD ARP (centre of the CTR and TMA) | 13.91444 | 100.60556 | 135452N 1003620E as printed in ENR 2.1. The AD 2.2 precise value is 13.91437, 100.60569 | [S1][S3] |
| BKK DVOR/DME, 117.7 MHz, CH 124X, H24 | 13.89361 | 100.59611 | About 1.4 NM SSW of the VTBD ARP. Reference point for the TMA sector radials | [S4] |
| VTBS ARP seen from VTBD ARP | — | — | 16.07 NM on 148.6°T (derived) | [S1] |

**Runways (AD 2.12)**

| RWY | THR lat | THR lon | THR elev | Bearing | Size | Src |
|---|---|---|---|---|---|---|
| 01 | 13.65670 | 100.75183 | 3.7 ft | 014.42°T | 4000 × 60 m | [S2] |
| 19 | 13.69171 | 100.76103 | 3.7 ft | 194.42°T | 4000 × 60 m | [S2] |
| 02L | 13.66518 | 100.72924 | 8 ft | 014.00°T | 4000 × 60 m | [S2] |
| 20R | 13.70019 | 100.73845 | 8 ft | 194.00°T | 4000 × 60 m | [S2] |
| 02R | 13.67128 | 100.73466 | 4.2 ft | 014.42°T | 3700 × 60 m | [S2] |
| 20L | 13.70367 | 100.74318 | 4.0 ft | 194.42°T | 3700 × 60 m | [S2] |

- **Layout (derived):**
  - 02L/20R is the west runway. 02R/20L lies 401 m east of it.
  - 01/19 is the east runway, 2597 m east of 02L and about 2.2 km east of 02R.
  - THR 02L is about 800 m south of THR 02R along the runway axis [S2].
- **Centrelines:** draw each one threshold to threshold.
  - The 02L/20R thresholds give about 014.3°T, but AD 2.12 publishes 014.00°T.
  - The RNP 02L chart prints 014.4°T.
  - This discrepancy is unresolved [S2][S29].
- **Departure end (DER):** for SIDs, the DER is the opposite threshold. This assumes no displaced threshold or stopway; AD 2.13 was not read [S2].
- **Runway use (AIC 07/25):**
  - 02L/20R is the primary arrival runway, currently non-precision.
  - 01/19 handles mixed operations.
  - 02R/20L is the primary departure runway.
  - Crews accept ILS or RNP as ATC assigns [S13].
- **Normal configuration:** Config 19/20 is used unless the tailwind exceeds 5 kt, which usually happens in winter (SIM) [S41].
- **ILS coverage:**
  - ILS CAT II serves 01, 02R, 19 and 20L.
  - **02L/20R has RNP approaches only.** Its ILS and CAT II are planned for 2027 [S12][S26][S27][S31][S32].

## 1. Airspace volumes

### 1.1 Controlled airspace

| Volume | Lateral | Lower | Upper | Class | ATS unit | Src |
|---|---|---|---|---|---|---|
| Bangkok CTR | Circle, r 35 NM, centred on VTBD ARP 13.91444, 100.60556 | GND | 11000 ft | C | Bangkok Approach, H24 | [S1] |
| Bangkok TMA | Circle, r 50 NM, same centre (concentric) | 3000 ft | FL160 | C | Bangkok Approach, H24 | [S1] |
| Suvarnabhumi ATZ | Circle, r 5 NM, centred on VTBS ARP 13.68583, 100.74889 | SFC | 2000 ft MSL | C | Suvarnabhumi Tower | [S2] |
| Don Mueang ATZ | Circle, r 5 NM, centred on VTBD ARP | Printed "2000 ft / AGL" (ambiguous) | 2000 ft | C | Don Mueang Tower | [S3] |
| Kamphaeng Saen CTR | Circle, r 25 NM, centred on KPST TACAN (CH 98) 14.08944, 99.91556 | GND | 6000 ft | C | Kamphaeng Saen Approach 134.1 / 308.6 MHz, H24 | [S1] |

- **CTR exclusions:** VT D6A, D6B, D8B, D8D and D8F [S1].
- **TMA exclusions:** the Bangkok CTR, the Kamphaeng Saen CTR, and VT D2, D6A, D6B, D8A–D8F and D47 [S1].
- **Two-tier TMA:** because the CTR is cut out, the TMA has two parts [S1]:
  - from 35 to 50 NM it runs 3000 ft–FL160;
  - inside 35 NM it runs 11000 ft–FL160, above the CTR.
- **Off-centre:** the CTR and TMA are centred on Don Mueang, not Suvarnabhumi. VTBS sits 16.1 NM SSE of the centre [S1].
- **Kamphaeng Saen CTR:**
  - It excludes the Bangkok CTR.
  - Its centre is 54.3 NM from VTBS on 297°T (derived).
  - Do not use the KPS DVOR/DME at 140956N 0995715E as its centre [S1][S4].

### 1.2 Frequencies (all H24)

| Call sign | MHz | Use | Src |
|---|---|---|---|
| Bangkok Approach | 119.1 / 122.35 / 120.3 / 124.35 / 125.2 / 133.4 (each paired with UHF 274.5) | Sectors APE 1 / APE 2 / APS 1 / APS 2 / APW / APN | [S1][S2] |
| Bangkok Approach | 125.8 | Clearance delivery for departures to adjacent aerodromes and for helicopters in the BKK CTR | [S2] |
| Emergency | 121.5 / 243.0 | — | [S2] |
| Suvarnabhumi Departure | 119.25 / 274.5 | Sector DSB | [S1][S2] |
| Suvarnabhumi Arrival | 121.1 / 274.5; 126.3 / 274.5 if instructed | Sector ARR | [S1][S2] |
| Suvarnabhumi Tower | 118.2 / 262.5 | RWY 01/19 | [S2] |
| Suvarnabhumi Tower | 119.0 | RWY 02L/20R and 02R/20L | [S2] |
| ATIS | Arrival 133.6 / 278.6; departure 127.65 | — | [S2] |
| Don Mueang Approach | 119.4 / 274.5 | Sector DDP (ENR 2.1 calls it Don Mueang Departure) | [S1][S3] |
| DAR | 133.0 | Sector DAR | [S1] |
| Don Mueang Tower | 118.1 / 236.6 | — | [S3] |

- **SIM only:**
  - IVAO uses VTBB_APP 125.200 for 3000 ft–FL160.
  - It puts VTBS arrival below 7000 ft and departure up to 6000 ft.
  - Its runway names (01L/01R/19L/19R) are outdated [S42].

### 1.3 TMA approach sectors

- **Structure:** the TMA has 10 sectors: the six approach sectors below and the four runway-configuration sectors in §1.4. The current AIP has no "Bangkok Director" call sign [S1].
- **Derived vertices:** the AIP gives these boundaries as BKK radial/DME. The vertices below were derived from the BKK DVOR position with VAR 0.7°W. Each one lands within about 0.1 NM of the 50 NM arc [S1][S4].
- **Arcs:** every arc is clockwise, radius 50 NM, centred on the VTBD ARP.
- **Vertical limits:** none are printed (see §7).

| Sector | MHz | Boundary, in order | Excludes | Src |
|---|---|---|---|---|
| APE 1 | 119.1 | ARP → R035/51.3D 14.59894, 101.09365 → arc → R100/50.3D 13.75675, 101.44729 → ARP | ARR, DAR, DSB, DDP | [S1] |
| APE 2 | 122.35 | ARP → R100/50.3D → arc → R155/49.1D 13.15646, 100.96030 → ARP | ARR, DAR, DSB, DDP | [S1] |
| APS 1 | 120.3 | ARP → R155/49.1D → arc → R193/48.7D 13.10105, 100.41871 → R250/11.8D 13.82407, 100.40678 → ARP | ARR, DAR, DSB, DDP, D47 | [S1] |
| APS 2 | 124.35 | R250/11.8D → R193/48.7D → arc → R250/49.1D 13.60329, 99.80904 → R250/11.8D | DAR, DDP, D8A, D8B, D47 | [S1] |
| APW | 125.2 | ARP → R250/49.1D → arc → R325/50.7D 14.57883, 100.08697 → ARP | DAR, DDP, D6A, D6B, D8A–D8F, D47 | [S1] |
| APN | 133.4 | ARP → R325/50.7D → arc → R035/51.3D → ARP | ARR, DAR, DSB, DDP, D2, D6A, D6B, D8C–D8F | [S1] |

### 1.4 Runway-configuration sectors

| Sector | Active when | Vertices in order (the polygon closes to the first) | Vertical | Excludes | MHz | Src |
|---|---|---|---|---|---|---|
| DSB | Config 19/20 | 13.72833, 100.59056 → 13.61944, 100.99472 → 13.27361, 100.90333 → 13.39167, 100.46583 | GND–10000 ft | — | 119.25 | [S1] |
| DSB | Config 01/02 | 13.61111, 101.02778 → 14.00000, 101.13111 → 14.12250, 100.67556 → 13.70000, 100.69667 | GND–10000 ft | — | 119.25 | [S1] |
| ARR | Config 19/20 (polygon lies N of VTBS) | 14.22472, 100.74000 → 14.14944, 101.02639 → 13.57417, 100.86833 → 13.64889, 100.58250 | GND–10000 ft | DSB | 121.1 (126.3) | [S1] |
| ARR | Config 01/02 (polygon lies S of VTBS) | 13.78778, 100.62056 → 13.71278, 100.90639 → 13.13750, 100.74917 → 13.21222, 100.46361 | GND–10000 ft | DSB | 121.1 (126.3) | [S1] |
| DDP | VTBD RWY 21L/R | 13.88000, 100.64694 → 13.50639, 100.50833 → CW arc, r 25 NM about VTBD ARP → 14.00333, 100.18639 → close | GND–8000 ft | ARR, DSB, D6A, D6B, R2, R80 | 119.4 | [S1] |
| DDP | VTBD RWY 03L/R | 13.88000, 100.64694 → 14.16806, 100.26472 → CW arc, r 25 NM → 14.28806, 100.79861 → close | GND–8000 ft | ARR, DSB, D6A, D6B, R81 | 119.4 | [S1] |
| DAR | VTBD RWY 21L/R | 13.88000, 100.64694 → 14.00333, 100.18639 → CW arc, r 25 NM → 14.28750, 100.79861 → close | GND–8000 ft | ARR, D6A, D6B, R81 | 133.0 | [S1] |
| DAR | VTBD RWY 03L/R | 13.88000, 100.64694 → 13.50750, 100.50528 → CW arc, r 25 NM → 14.16806, 100.26472 → close | GND–8000 ft | DSB, D6A, D6B, R2, R80, R81 | 133.0 | [S1] |

- The DAR (21) arc end is printed 141715N, while DDP (03) is printed 141717N [S1].

### 1.5 Restricted, danger and prohibited areas

Times are as printed in the AIP.

| Area | Shape | Lower–upper | Hours | Notes | Src |
|---|---|---|---|---|---|
| VT R1 Bangkok City | Circle, r 10 NM, about 13.76500, 100.53833 | GND–3000 ft | H24 | Aircraft under ATC service are exempt. Centre is 13.17 NM on 291°T from the VTBS ARP (derived) | [S5] |
| VT R2 Chitrlada Palace | Circle, r 1 NM, about 13.76811, 100.52123 | GND–6000 ft | H24 | Royal residence | [S5] |
| VT R80 Srapathum Palace | Circle, r 1 NM, about 13.74797, 100.53220 | GND–6000 ft | H24 | — | [S5] |
| VT R81 Jakribongkot Palace | Circle, r 1 NM, about 13.94675, 100.52414 | GND–6000 ft | H24 | About 5 NM W of the VTBD ARP | [S5] |
| VT R82 Amphorn Royal Palace | Circle, r 1 NM, about 13.77264, 100.51119 | GND–6000 ft | H24 | — | [S5] |
| VT R83 Sukothai Palace (AIP spelling) | Circle, r 1 NM, about 13.78241, 100.50931 | GND–6000 ft | H24 | — | [S5] |
| VT D6A | 14.30306, 100.41694 → 14.30556, 100.67083 → 13.97222, 100.44472 → 14.08333, 100.21417 → close | GND–5000 ft | Daily 2300–1000 | RTAF high-speed combat manoeuvring. Contact Don Mueang Approach 119.4 / 262.5 | [S5] |
| VT D6B | 14.08333, 100.21417 → 13.97222, 100.44472 → 13.76778, 100.37361 → 13.77500, 100.21528 → close | GND–5000 ft | Daily 2300–1000 | Shares one edge with D6A. Same contact as D6A | [S5] |
| VT D47 Samut Sakhon | 13.78333, 100.45000 → 13.63333, 100.45000 → 13.48333, 100.35000 → (coastline) → 13.53333, 100.26667 → 13.80000, 100.18333 → close | FL120–UNL | MON–FRI 0130–0930 | Contact Bangkok Approach 124.35 / 274.5 | [S5] |
| VT D8B Ratchaburi | 13.53333, 100.26667 → (coastline westward) → 13.46833, 100.22222 → 13.43444, 100.11861 → 13.90278, 99.97194 → 13.93333, 100.18333 → 13.80000, 100.18333 → close | GND–12000 ft | MON–FRI 0000–1100 | Contact Kamphaeng Saen Approach 127.75. Excluded from both the CTR and the TMA | [S5] |

**Prohibited areas**

- No VT P area lies within 80 km of Bangkok [S5].
- **Nearest to VTBS and central Bangkok: VTP7 Sattahip.** A circle of r 4 NM about 12.64583, 100.88333, GND–UNL. Its edge is about 58.9 NM (109 km) from VTBS (derived) [S5].
- **Nearest to VTBD: VTP4 Muang Kom.** A polygon 15.11667, 100.98333 → 15.11667, 100.83333 → 14.91667, 100.83333 → 14.91667, 100.98333, GND–FL240. Its south edge is about 61.6 NM from VTBD and about 74 NM from VTBS (derived) [S5].

### 1.6 Build notes

- **Cut-outs:**
  - Subtract D6A, D6B and D8B from the CTR. D8D and D8F are not extracted.
  - Subtract the CTR, the Kamphaeng Saen CTR, D6A, D6B, D8B and D47 from the TMA. D2, D8A and D8C–D8F are not extracted [S1][S5].
- **Coastlines:** the coastline segments of D47 and D8B have no coordinates. Draw them as straight lines between the listed points, or trace a coastline dataset [S5].
- **Overlaps:** where ARR and DSB overlap, ARR excludes DSB [S1].

## 2. Arrivals (STARs)

### 2.1 Status and common rules

- **Designators:**
  - Since AIRAC 2609 (3 SEP 2026) the designators end in 2: suffix **2D** for Config 01/02 and **2C** for Config 19/20 [S36][S40].
  - The AIP STAR table maps each feeder airway to an entry fix and both STARs, for example "W1, Y1, Y2 | UBLOD | EASTE 2C | EASTE 2D" [S36].
  - The vACC's main VTBS page says "3C, 3D". That is stale [S41][S36].
- **Chart issue:**
  - The only AIP STAR charts reachable are 299109 (Config 01/02) and 299110 (Config 19/20).
  - Both are the pre-2609 issue: suffix 1, without BS422/BS423/BS522.
  - Their constraint values match the 2609 data below [S15][S16].
- **Data provenance:**
  - Route order and constraints come from the IVAO Thailand sector file, updated for AIRAC 2609 on 2026-09-12 (SIM) [S37][S39].
  - Terminal-fix coordinates come from IVAO waypoints.json (SIM); these fixes are not in ENR 4.4 [S38].
  - LEBIM is in ENR 4.4 at 13.08750, 100.47361 [S7].
- **2609 additions:**
  - BS422 and BS423 were added to the 2D STARs.
  - BS522 was added to the 2C STARs.
  - All three are sequencing points [S39][S40].
- **Rules on all STARs:**
  - Transition altitude 11000 ft.
  - Max IAS 250 kt at or below 10000 ft unless ATC authorises otherwise.
  - RNAV 1 required, with GNSS or DME/DME/IRU.
  - Radar required [S15][S16].
- **Handoff (SIM):** arrivals are handed to Bangkok Approach near FL170 [S41].

### 2.2 Entry fixes and feeders

| Entry fix | Lat | Lon | Arrivals from | Feeder fixes (airways), coordinates | Src |
|---|---|---|---|---|---|
| EASTE | 14.30967 | 101.28624 | North-east | UBLOD 14.62083, 101.43667 (W1, Y1, Y2, Y20); RUKSA 14.56417, 101.92000 (Y13) | [S38][S7][S36] |
| NORTA | 14.71879 | 100.63902 | North / Laos | ALBOS 14.74500, 101.02833 (R474); NOBER 15.27667, 100.66833 (B346, W21, W39); SEMBO 14.89972, 100.26333 (A464); BLAFF 15.27583, 100.29750 (W9, Y7, Y28) | [S38][S7][S8][S36] |
| TUMGA | 13.35417 | 101.20105 | East (Cambodia, Vietnam) | GOMES 13.40167, 101.58500 (N506, R468); ANREN 13.87000, 102.31056 (G474, L880); DULEM 13.73778, 102.23333 (M633); ALEMI 12.60722, 101.43333 (Y12); NUGPA 13.04833, 101.83306 (P629); BUT 12.66667, 101.00056 (R201); RYN 12.77861, 101.67639 (N891) | [S38][S7][S4][S36][S41] |
| WILLA | 14.40472 | 100.05982 | West (Myanmar side) | BONVO 13.73611, 99.76861 (M502); PASTO 14.00139, 99.50194 (L301); IBETO 14.17667, 99.49611 (L524); TARED 14.43889, 99.52472 (G463, P646); IGONI 14.44250, 99.90833 (L507) | [S38][S7][S36] |
| LEBIM | 13.08750 | 100.47361 | South (Gulf of Thailand) | GUTSO 12.80556, 100.58167 (A464, M751, W19); HOTEL 13.00167, 100.33000 (G458, W31, Y99); SURMA 11.85611, 100.44250 (M769, Y98) | [S7][S36] |

- **Coordinate sources:** EASTE, NORTA, TUMGA and WILLA come from SIM data only. LEBIM is the AIP value; IVAO's 13.08745, 100.47347 agrees within 1″ [S7][S38].
- **TUMGA feeders (SIM):**
  - R201 (BUT), Y12 (ALEMI), N891 (RYN) and P629 (NUGPA) route direct to TUMGA [S41].
  - The DOLNI arrivals no longer exist; DOLNI remains only as a route point [S41][S7].
  - IVAO routes the ANREN and DULEM transitions via GOMES [S37].
- **Feeder gaps:** Y20 does not appear in the AD 2 STAR table [S36]. How PASTO (L301) joins WILLA is not in the IVAO file (see §7).

**Upstream north-east feeder routes (for drawing)**

| Route | Sequence as flown | Remarks | Src |
|---|---|---|---|
| Y1 | UDN DVOR 17.38472, 102.77500 → TERCO 16.93056, 102.55222 → UBLOD → PIPOB 14.37667, 101.32056 | One-way southbound; CDR | [S9] |
| Y2 | KKN DVOR 16.47083, 102.78806 → NEMTE 16.06250, 102.48694 → UBLOD → PIPOB | One-way southbound; CDR | [S9] |
| Y13 | GRASO 15.15472, 103.78722 → PAKRI 14.86722, 102.90250 → RUKSA | One-way westbound; VTBS arrivals only | [S9] |
| R474 | VTN DVOR 18.01028, 102.54056 → LEDER 175044N 1022825E → Chum Phae (CMP) → ALBOS | Continues into the Lao AIP | [S8] |

### 2.3 Config 01/02 STARs (suffix 2D)

These apply when RWY 01/02L/02R is in use.

- Every table row takes its order and constraint from [S37] and its coordinates from [S38], unless the row says otherwise.
- The **AIP** column reads "yes" when the same value is printed on the pre-2609 chart 299109 [S15].
- Every 2D STAR ends at ENKAA or BOGAS. Aircraft then fly heading 195° and expect radar vectors [S15].

**EASTE2D** (from the north-east). Transitions: RUKSA, UBLOD [S37].

| # | Fix | Lat | Lon | Constraint | AIP |
|---|---|---|---|---|---|
| 1 | EASTE | 14.30967 | 101.28624 | ≤FL180, ≤280 kt | yes |
| 2 | BS417 | 14.12406 | 101.13000 | — | |
| 3 | BS416 | 13.97699 | 101.00646 | ≤FL130, ≤250 kt | yes |
| 4 | MUMUP | 13.83396 | 100.88652 | — | |
| 5 | BS415 | 13.74807 | 100.86298 | ≥11000 ft | yes |
| 6 | BS411 | 13.66216 | 100.83945 | ≤220 kt | |
| 7 | BS422 | 13.56420 | 100.81265 | — (new in 2609 [S40]) | |
| 8 | BS410 | 13.46624 | 100.78587 | — | |
| 9 | ENKAA | 13.38546 | 100.76372 | ≥3000 ft, then HDG 195° | yes |

- Printed legs: EASTE→BS417 220° 14.3 NM; BS417→BS416 220° 11.4 NM; BS416→MUMUP 220° 11.0 NM [S15].

**LEBIM2D** (from the south). Transitions: GUTSO, HOTEL, SURMA [S37].

| # | Fix | Lat | Lon | Constraint | AIP |
|---|---|---|---|---|---|
| 1 | LEBIM | 13.08750 [S7] | 100.47361 [S7] | ≤FL180, ≤280 kt | yes |
| 2 | MENUT | 13.21906 | 100.64170 | ≤FL140 | yes |
| 3 | ISRAM | 13.41804 | 100.89668 | ≤250 kt | |
| 4 | BS423 | 13.53387 | 100.92836 | — (new in 2609 [S40]) | |
| 5 | BS412 | 13.63182 | 100.95520 | ≥11000 ft | yes |
| 6 | BS411 | 13.66216 | 100.83945 | ≤220 kt | |
| 7 | BS422 | 13.56420 | 100.81265 | — | |
| 8 | BS410 | 13.46624 | 100.78587 | — | |
| 9 | ENKAA | 13.38546 | 100.76372 | ≥3000 ft, then HDG 195° | yes |

- Printed legs: LEBIM→MENUT 052° 12.6 NM; MENUT→ISRAM 052° (051.4°T) 19.1 NM [S15].
- BS423 splits the former ISRAM→BS412 leg (016°, 13.3 NM) [S15][S39].

**NORTA2D** (from the north and Laos). Transitions: ALBOS, BLAFF, NOBER, SEMBO [S37].

| # | Fix | Lat | Lon | Constraint | AIP |
|---|---|---|---|---|---|
| 1 | NORTA | 14.71879 | 100.63902 | ≤FL220, ≤280 kt | yes |
| 2 | IRTIS | 14.43884 | 100.72519 | — | |
| 3 | LAVAT | 14.23195 | 100.74821 | ≥FL160 | yes |
| 4 | BS421 | 14.11977 | 100.76070 | ≤250 kt | |
| 5 | BS420 | 13.92535 | 100.70916 | ≥11000 ft | yes |
| 6 | BS419 | 13.71106 | 100.65247 | 7000–9000 ft, ≤220 kt | yes |
| 7 | BS418 | 13.51318 | 100.60024 | — | |
| 8 | BOGAS | 13.43213 | 100.57888 | ≥4000 ft, then HDG 195° | yes |

- Printed legs: NORTA→IRTIS 164° 17.5 NM; IRTIS→LAVAT 175° 12.4 NM; LAVAT→BS421 175° 6.7 NM [S15].

**TUMGA2D** (from the east). Transitions: ALEMI, ANREN, BUT, DULEM, GOMES, NUGPA, RYN [S37].

| # | Fix | Lat | Lon | Constraint | AIP |
|---|---|---|---|---|---|
| 1 | TUMGA | 13.35417 | 101.20105 | ≤FL180, ≤280 kt | yes |
| 2 | BS414 | 13.57098 | 101.18655 | ≤250 kt | |
| 3 | BS413 | 13.61445 | 101.02133 | — | |
| 4 | BS412 | 13.63182 | 100.95520 | ≥11000 ft | yes |
| 5 | BS411 | 13.66216 | 100.83945 | ≤220 kt | |
| 6 | BS422 | 13.56420 | 100.81265 | — | |
| 7 | BS410 | 13.46624 | 100.78587 | — | |
| 8 | ENKAA | 13.38546 | 100.76372 | ≥3000 ft, then HDG 195° | yes |

**WILLA2D** (from the west). Transitions: BONVO, IBETO, IGONI, TARED [S37].

| # | Fix | Lat | Lon | Constraint | AIP |
|---|---|---|---|---|---|
| 1 | WILLA | 14.40472 | 100.05982 | ≤FL220, ≤280 kt | yes |
| 2 | NIMEG | 14.35688 | 100.25129 | — | |
| 3 | ISDEX | 14.28402 | 100.54161 | — | |
| 4 | LAVAT | 14.23195 | 100.74821 | ≥FL160 | yes |
| 5 | BS421 | 14.11977 | 100.76070 | ≤250 kt | |
| 6 | BS420 | 13.92535 | 100.70916 | ≥11000 ft | yes |
| 7 | BS419 | 13.71106 | 100.65247 | 7000–9000 ft, ≤220 kt | yes |
| 8 | BS418 | 13.51318 | 100.60024 | — | |
| 9 | BOGAS | 13.43213 | 100.57888 | ≥4000 ft, then HDG 195° | yes |

- Printed legs: WILLA→NIMEG 105° 11.5 NM; NIMEG→ISDEX 105° 17.5 NM; ISDEX→LAVAT 105° 12.4 NM [S15].

### 2.4 Config 19/20 STARs (suffix 2C)

These apply when RWY 19/20L/20R is in use.

- Every table row takes its order and constraint from [S37] and its coordinates from [S38], unless the row says otherwise.
- The **AIP** column reads "yes" when the same value is printed on the pre-2609 chart 299110 [S16].
- Every 2C STAR ends at ESGEN or ATKIN. Aircraft then fly heading 015° and expect radar vectors [S16].

**EASTE2C**. Transitions: RUKSA, UBLOD [S37].

| # | Fix | Lat | Lon | Constraint | AIP |
|---|---|---|---|---|---|
| 1 | EASTE | 14.30967 | 101.28624 | ≤FL180, ≤280 kt | yes |
| 2 | SOVKI | 14.05814 | 101.07216 | 11000 ft–FL140, ≤250 kt | yes |
| 3 | TERIB | 13.96601 | 101.04684 | — (holding fix, §2.5) | |
| 4 | BS507 | 13.88361 | 101.02422 | — | |
| 5 | BS505 | 13.80368 | 101.00228 | — | |
| 6 | MUMUP | 13.83396 | 100.88652 | ≤220 kt | yes |
| 7 | BS501 | 13.91385 | 100.90841 | — | |
| 8 | ESGEN | 13.99626 | 100.93104 | ≥5000 ft, then HDG 015° | yes |

- Printed leg: EASTE→SOVKI 220° (219.7°T) 19.5 NM [S16].

**LEBIM2C**. Transitions: GUTSO, HOTEL, SURMA [S37].

| # | Fix | Lat | Lon | Constraint | AIP |
|---|---|---|---|---|---|
| 1 | LEBIM | 13.08750 [S7] | 100.47361 [S7] | ≤FL180, ≤280 kt | yes |
| 2 | SAGAP | 13.26724 | 100.60350 | ≤FL140 | yes |
| 3 | BS521 | 13.42216 | 100.71543 | ≥11000 ft | |
| 4 | DUDER | 13.55151 | 100.80918 | ≤250 kt | |
| 5 | BS520 | 13.62523 | 100.82934 | 9000–11000 ft | |
| 6 | MUMUP | 13.83396 | 100.88652 | ≤220 kt | yes |
| 7 | BS501 | 13.91385 | 100.90841 | — | |
| 8 | ESGEN | 13.99626 | 100.93104 | ≥5000 ft, then HDG 015° | yes |

- Printed legs: LEBIM→SAGAP 036° 13.2 NM; SAGAP→BS521 036° 11.3 NM; BS521→DUDER 036° 9.5 NM [S16].

**NORTA2C**. Transitions: ALBOS, BLAFF, NOBER, SEMBO [S37].

| # | Fix | Lat | Lon | Constraint | AIP |
|---|---|---|---|---|---|
| 1 | NORTA | 14.71879 | 100.63902 | ≤FL180, ≤280 kt (FL180 here; FL220 on the 2D STAR) | yes |
| 2 | BS519 | 14.57681 | 100.68274 | ≥FL160 | yes |
| 3 | BS518 | 14.44696 | 100.72269 | ≤250 kt | |
| 4 | MEPIN | 14.25139 | 100.67111 | ≥11000 ft | yes |
| 5 | BS522 | 14.12258 | 100.63720 | — (new in 2609 [S40]) | |
| 6 | BS515 | 13.99376 | 100.60334 | ≥9000 ft, ≤220 kt | yes |
| 7 | BS514 | 13.96345 | 100.71925 | — | |
| 8 | ATKIN | 14.04447 | 100.74072 | ≥6000 ft, then HDG 015° | yes |

- Printed legs: NORTA→BS519 164° 8.9 NM; BS519→BS518 164° 8.1 NM; BS518→MEPIN 195° (194.4°T) 12.1 NM [S16].
- BS522 splits the former 16.0 NM MEPIN→BS515 leg into two 8.0 NM legs [S39].

**TUMGA2C**. Transitions: ALEMI, ANREN, BUT, DULEM, GOMES, NUGPA, RYN [S37].

| # | Fix | Lat | Lon | Constraint | AIP |
|---|---|---|---|---|---|
| 1 | TUMGA | 13.35417 | 101.20105 | ≤FL180, ≤280 kt | yes |
| 2 | ISRAM | 13.41804 | 100.89668 | ≥11000 ft | |
| 3 | DUDER | 13.55151 | 100.80918 | ≤250 kt | |
| 4 | BS520 | 13.62523 | 100.82934 | 9000–11000 ft | |
| 5 | MUMUP | 13.83396 | 100.88652 | ≤220 kt | yes |
| 6 | BS501 | 13.91385 | 100.90841 | — | |
| 7 | ESGEN | 13.99626 | 100.93104 | ≥5000 ft, then HDG 015° | yes |

- Printed legs: TUMGA→ISRAM 283° (282.1°T) 18.2 NM; ISRAM→DUDER 328° 9.5 NM [S16].

**WILLA2C**. Transitions: BONVO, IBETO, IGONI, TARED, held as separate transition records [S37].

| # | Fix | Lat | Lon | Constraint | AIP |
|---|---|---|---|---|---|
| 1 | WILLA | 14.40472 | 100.05982 | ≤FL180, ≤280 kt | yes |
| 2 | BAROK | 14.37175 | 100.19184 | — | |
| 3 | BS517 | 14.33488 | 100.33912 | FL140–FL150 | yes |
| 4 | BS516 | 14.30187 | 100.47061 | ≤250 kt | |
| 5 | MEPIN | 14.25139 | 100.67111 | ≥11000 ft | yes |
| 6 | BS522 | 14.12258 | 100.63720 | — | |
| 7 | BS515 | 13.99376 | 100.60334 | ≥9000 ft, ≤220 kt | yes |
| 8 | BS514 | 13.96345 | 100.71925 | — | |
| 9 | ATKIN | 14.04447 | 100.74072 | ≥6000 ft, then HDG 015° | yes |

- Printed legs: WILLA→BAROK 105° 7.9 NM; BAROK→BS517 105° 8.9 NM; BS516→MEPIN 105° 12.1 NM [S16].

### 2.5 Arrival holds

| Fix | Lat | Lon | Inbound °M (°T, derived) | Turns | Minimum | Speed | Course pair printed on | Src |
|---|---|---|---|---|---|---|---|---|
| EASTE | 14.30967 | 101.28624 | 248 (247.3) | Left (inferred) | FL140 | 280 kt per IVAO, probably the STAR fix limit | Both charts (068/248) | [S15][S16][S37] |
| NORTA | 14.71879 | 100.63902 | 180 (179.3) | Right (inferred) | FL140 | 280 kt (IVAO) | Both charts (180/360) | [S15][S16][S37] |
| TUMGA | 13.35417 | 101.20105 | 283 (282.3) | Right (inferred) | FL140 | 280 kt (IVAO) | Both charts (103/283) | [S15][S16][S37] |
| WILLA | 14.40472 | 100.05982 | 105 (104.3) | Right (inferred) | FL140 | 280 kt (IVAO) | Config 01/02 chart only (105/285) | [S15][S37] |
| LEBIM | 13.08750 | 100.47361 | 360 (359.3) | Left (inferred) | FL140 | 280 kt (IVAO) | Both charts (360/180) | [S15][S16][S37] |
| TERIB | 13.96601 | 101.04684 | 196, probable (195.3) | Not stated | 7000 ft | ≤250 kt | Config 19/20 chart (016/196) | [S16][S37] |

- **What the AIP text shows:** "MNM FL 140 / Holding" five times on the Config 01/02 chart, and on the Config 19/20 chart "HOLDING MNM FL140" labels plus one "Holding MNM 7000". The text does not say which course pair belongs to which fix; the fix assignments come from IVAO [S15][S16][S37].
- **Turn directions** are inferred from the side of the IVAO racetrack drawings. For example, the IVAO TUMGA racetrack has 3.8 NM straight legs, with its centroid 1.0 NM right of the inbound course. The drawn NORTA inbound is 182.9°T and the drawn LEBIM inbound is 1.4°T, both slightly off their labels [S37].
- **TERIB:**
  - IVAO labels it "105° INBOUND", but its drawn legs are 014.9°/194.9°T.
  - TERIB also lies on the 196°M EASTE2C track.
  - The 105° label is almost certainly an error [S16][S37].
- **Maximum holding level:** none found in the chart text [S15][S16].
- The missed-approach holds GUXAR and OBDIP are in §4.9.

### 2.6 After the STAR

- **Open STARs:** after the last fix, aircraft keep the charted heading and expect vectors. They do not begin an approach without ATC clearance [S15][S16][S41].
- **Downwind geometry of the STAR end fixes** (positions derived) [S43][S15][S16]:

| Fix | Lat | Lon | Constraint | Position | Then |
|---|---|---|---|---|---|
| ENKAA | 13.38546 | 100.76372 | ≥3000 ft | 15.6 NM S of THR 01, 4.7 NM E of its centreline | HDG 195° (Config 01/02) |
| BOGAS | 13.43213 | 100.57888 | ≥4000 ft | 15.7 NM S of THR 02L, 5.1 NM W | HDG 195° (Config 01/02) |
| ESGEN | 13.99626 | 100.93104 | ≥5000 ft | 20.2 NM N of THR 19, 5.0 NM E | HDG 015° (Config 19/20) |
| ATKIN | 14.04447 | 100.74072 | ≥6000 ft | 20.1 NM N of THR 20R, 4.9 NM W | HDG 015° (Config 19/20) |

- In effect, each STAR's last legs and the charted heading form a downwind about 5 NM either side of the parallel finals. §5 shows the flown base and intercept.

## 3. Departures (SIDs)

### 3.1 Chart set

| RWY | Jet suffix | Jet charts (main / inset) | Propeller suffix | Propeller chart | Src |
|---|---|---|---|---|---|
| 01 | K | 299143 / 299144 | U | 299126 | [S20][S21][S25] |
| 02L | F | 299141 / 299142 | Q | 299127 | [S23][S25] |
| 02R | H | 299138 / 299139 | S | 299128 | [S17][S18][S25] |
| 19 | J | 299136 / 299137 | T | 299129 | [S22][S25] |
| 20L | G | 299134 / 299135 | R | 299130 | [S19][S25] |
| 20R | E | 299132 / 299133 | P | 299131 | [S24][S25] |

- **Designator format:** end fix + number + suffix, e.g. SELKA1H.
- **Jet SIDs:**
  - 20 per runway, all with the same 20 end fixes.
  - The number is 1, except NOBER2x and SEMBO2x [S17][S19].
- **Propeller SIDs:**
  - 14 per runway, all numbered 1.
  - They add BLAFF and HOTEL and drop BONVO, HHN, OLVUK, PASTO, TARED, UKERA, UGUVO and VANKO [S25].
- **Chart currency:** pages 6-1 to 6-78 are dated 3 SEP 26 [S11].

### 3.2 Common rules

| Item | Jet SIDs | Propeller SIDs | Src |
|---|---|---|---|
| Initial climb clearance | 6000 ft or as directed by ATC | 3000 ft or as directed by ATC | [S17][S19][S25] |
| Turn | No turn before DER | No turn before DER | [S19][S25] |
| Speed | Max IAS 250 kt at or below 10000 ft unless ATC authorises | Same 250 kt limit. "MAX IAS 180 KT (PROPELLER)" is also printed as a label at PS010 (01/02 charts, with "3000") and at PS190 (19/20 charts), probably a fix constraint | [S17][S25] |
| Navigation | RNAV 1; GNSS or DME/DME/IRU; advise ATC if unable to comply | Same | [S17][S19] |
| Climb | Plan for the climb as depicted; ATC issues the actual climb clearance | Same | [S19] |
| Transition altitude | 11000 ft | 11000 ft | [S17][S19] |

### 3.3 Minimum climb gradients (jet SIDs)

All of these apply until passing FL140, "for airspace restriction only" [S17].

| Runways | 340 ft/NM (5.6%) required for | All other SIDs | Src |
|---|---|---|---|
| 01, 02L, 02R | BUT, DOSBU, GOMES, KASNI, LIPLI, REGOS, RYN, SELKA | 243 ft/NM (4.0%) | [S17][S20][S23] |
| 20L, 20R | DOSBU, GOMES, LIPLI, RYN, SELKA | 304 ft/NM (5.0%) | [S19][S24] |
| 19 | BUT, DOSBU, GOMES, HHN, KASNI, LIPLI, REGOS, RYN, SELKA, UKERA, VANKO | 255 ft/NM (4.2%) | [S22] |

- On 20L, the chart's rate table converts 5.0% to 380/506/760/1013/1266/1519 ft/min across its ground-speed columns [S19].

### 3.4 SID end fixes (clockwise from north)

**What is published and ordered for every jet SID:** DER → runway track with no turn before the DER → unpublished terminal fixes → end fix → airway. The fix-by-fix sequence of individual SIDs could not be extracted (§7). An approximate SELKA1H trace is under Unverified.

| End fix | Lat | Lon | Airways | From VTBS ARP (derived, approx.) | Jet | Prop | Src |
|---|---|---|---|---|---|---|---|
| NOBER | 15.27667 | 100.66833 | B346, W21, W39 | 357°T, 96 NM | NOBER2x | NOBER1x | [S7] |
| ALBOS | 14.74500 | 101.02833 | R474 | 014°T, 66 NM | yes | yes | [S7] |
| SELKA | 14.33889 | 101.88639 | A1, Y14 | 059°T, 77 NM | yes | yes | [S7] |
| LIPLI | 14.17444 | 101.96556 | Y16 | 068°T, 77 NM | yes | yes | [S7] |
| DOSBU | 13.87778 | 101.83389 | G474, L880 | 080°T, 64 NM | yes | yes | [S7] |
| GOMES | 13.40167 | 101.58500 | B204, N506, R468 | 109°T, 52 NM | yes | yes | [S7] |
| RYN (Rayong DVOR/DME 112.5 MHz, CH 72X) | 12.77861 | 101.67639 | — | 135°T, 77 NM | yes | yes | [S4] |
| BUT (U-Tapao DVOR/DME 110.8 MHz, CH 45X) | 12.66667 | 101.00056 | — | 166°T, 63 NM | yes | yes | [S4] |
| KASNI | 13.08056 | 100.67833 | M757 | 186°T, 37 NM | yes | yes | [S7] |
| REGOS | 12.00194 | 100.58167 | A464, M751, W19, W32, W42 | 186°T, 102 NM | yes | yes | [S7] |
| UKERA | 12.03528 | 100.01944 | G458, W31 | 203°T, 108 NM | yes | no | [S7] |
| HOTEL | 13.00167 | 100.33000 | G458, W31, Y99 | 211°T, 48 NM | no | yes | [S7] |
| HHN (Hua Hin DVOR/DME 113.3 MHz, CH 80X) | 12.63444 | 99.95111 | — | 216°T, 78 NM | yes | no | [S4] |
| VANKO | 12.58639 | 99.76056 | Y8 | 221°T, 88 NM | yes | no | [S7] |
| BONVO | 13.73611 | 99.76861 | M502 | 273°T, 57 NM | yes | no | [S7] |
| PASTO | 14.00139 | 99.50194 | L301 | 285°T, 75 NM | yes | no | [S7] |
| TARED | 14.43889 | 99.52472 | G463, P646 | 302°T, 84 NM | yes | no | [S7] |
| NUNLI | 14.85750 | 99.38444 | L507 | 312°T, 106 NM | yes | yes | [S7] |
| OLVUK | 14.65778 | 100.21111 | Y26 | 332°T, 66 NM | yes | no | [S7] |
| SEMBO | 14.89972 | 100.26333 | A464 | 339°T, 78 NM | SEMBO2x | SEMBO1x | [S7] |
| UGUVO | 15.14306 | 100.19472 | Y27 | 340°T, 93 NM | yes | no | [S7] |
| BLAFF | 15.27583 | 100.29750 | W9, Y7, Y28 | 345°T, 99 NM | no | yes | [S7] |

- **SELKA position:**
  - OpenNav lists SELKA at 14.35997, 101.99653, about 6.5 NM away on 079°T.
  - The cause of the difference is unknown.
  - The AIP position has not changed since at least AIRAC 12/20 (5 NOV 2020), so **use the AIP value** [S7][S14][S45].

### 3.5 North-east exits: A1 and Y14

**A1**

| # | Point | Lat | Lon | Notes | Src |
|---|---|---|---|---|---|
| 1 | BKK DVOR/DME | 13.89361 | 100.59611 | — | [S4][S8] |
| 2 | ROBKA | 14.17861 | 101.41889 | Not a current SID end fix | [S8] |
| 3 | SELKA | 14.33889 | 101.88639 | SID end fix. To TOPER: 071°M, 54.0 NM | [S8] |
| 4 | TOPER | 14.63556 | 102.76056 | — | [S8] |
| 5 | SANOT | 14.85944 | 103.43000 | — | [S8] |
| 6 | PASAT | 14.95750 | 103.79056 | — | [S8] |
| 7 | VENPO | 15.11250 | 104.36722 | — | [S8] |
| 8 | UBL DVOR | 15.24528 | 104.86583 | — | [S8] |
| 9 | POTEV | 15.36472 | 105.36833 | — | [S8] |
| 10 | BUTRA | 15.41833 | 105.59611 | — | [S8] |

- **A1 limits:**
  - BKK–UBL: eastbound only, upper FL460, lower 7500 ft, MFA 8000 ft, Class A.
  - UBL–BUTRA: upper FL460, lower 9500 ft, MFA 10000 ft, Class A [S8].
- **Y14:**
  - SELKA → KRT (Khorat DVOR/DME) at 14.91722, 102.13972.
  - 024°M, 38.0 NM, one-way northbound.
  - FL205–FL460, MFA FL210, Class A [S9].

### 3.6 Fix labels printed on the charts

The order of these fixes is not resolved, and the at/above/below sense of each altitude is unknown.

- **02R jet (299138 and inset 299139):**
  - BS133 11000; BS132 10000 and 8000 (likely a window); ASANI 8000; SAMVA 10000; BUTBI 10000.
  - BS134 FL140; BS124/SUSVU FL160; BS125 FL160; OBMAR FL160; POTEP FL200.
  - BS137 FL150; whether FL140 also belongs to BS137 is uncertain, because "NOBER FL150 FL140" also appears.
  - The inset shows the initial fixes BS129–BS135, ASANI, SAMVA, SUPIS and BUTBI [S17][S18].
- **20L jet (299134):** BS928 10000; BS941 10000; GUGOT 10000; LELIS FL120; KABUT FL140; BS929 FL160; BS933/BS942 FL160; BS938 FL180; BS930 (SABIS) FL180 [S19].
- **01 jet inset (299144):** "MAX IAS 220 KT" and "700" next to BS120. Which legs they apply to, and what "700" means, is unknown [S21].

### 3.7 Other departure notes

- **Noise abatement:** the only source is Boeing's page with 2011 airport data. It requires thrust reduction at 1500 ft AGL and acceleration at 3000 ft AGL, with no preferential runways. It is outdated, and the current AD 2.21 was not read [S46].
- **Initial climb (SIM):** the vACC gives 6000 ft as the standard initial climb for all departures. That holds for jet SIDs but not propeller SIDs, which use 3000 ft [S41][S25].
- **Observed:** 02R departures climbed straight out on a track of about 015° (§5) [S51].

## 4. Approaches

### 4.1 Common parameters

- **Final track:** 015°M (014.4°T) for 01/02L/02R and 195°M (194.4°T) for 19/20L/20R [S26][S31].
- **On all 10 charts:**
  - GP or VPA 3.0° (5.2%), with RDH 50 ft.
  - FAF/FAP at 1600 ft, 4.9 NM from the threshold [S26]–[S35].
- **Minima:** published as OCA (OCH); no DA is published [S27].
- **Path height (derived):** height ≈ THR elevation + 50 + 318 × d ft, with d in NM from the threshold. This reproduces the RNP 02R profile (4 NM 1320, 3 NM 1005, 2 NM 690 ft) within about 10 ft [S30].

| RWY | Procedure | Chart | Navaid | Src |
|---|---|---|---|---|
| 01 | ILS or LOC Z RWY01 (CAT II) | 299116 | LOC ISES 110.1 MHz, DME CH 38X | [S26] |
| 01 | RNP RWY01 | 299120 | — | [S28] |
| 02L | RNP RWY02L (the only 02L approach) | 299121 | — | [S29] |
| 02R | ILS or LOC Z RWY02R (CAT II) | 299117 | LOC ISWS (AIP ident I-SWS) 109.1 MHz, DME CH 28X | [S27][S2] |
| 02R | RNP RWY02R | 299122 | — | [S30] |
| 19 | ILS or LOC Z RWY19 (CAT II) | 307017 | LOC ISEN 110.5 MHz, DME CH 42X | [S31] |
| 19 | RNP RWY19 | 307019 | — | [S33] |
| 20L | ILS or LOC Z RWY20L (CAT II) | 307018 | LOC ISWN 109.5 MHz, DME CH 32X | [S32][S2] |
| 20L | RNP RWY20L | 307020 | — | [S34] |
| 20R | RNP RWY20R (the only 20R approach) | 307021 | — | [S35] |

- **Antennas (AD 2.19):**
  - LOC 02R at 13.70619, 100.74383.
  - GP 02R (331.4 MHz) at 13.67436, 100.73433.
  - LOC 20L at 13.66875, 100.73397.
  - The LOC 02R service volume extends to 25 DME, not below 2500 ft AMSL [S2].
- **Chart series:** the 3070xx north-end charts have been in force since AIRAC 2026-07-09 [S31][S32].

### 4.2 RWY 01: ILS or LOC Z (CAT II) and RNP

| Fix | Role | Lat | Lon | NM from THR | DME | Alt (ft) | Speed | Src |
|---|---|---|---|---|---|---|---|---|
| REPEN | IAF | 13.40539 | 100.68587 | 15.6 (derived) | — | 3000 | ≤220 kt | [S26][S43] |
| RUPUX | IF | 13.48646 | 100.70713 | 10.5 | 12.8D ISES | 2000 | Cross at 180 kt | [S26][S43] |
| BS690 | FAF/FAP | 13.57774 | 100.73111 | 4.9 | 7.2D | 1600 | Cross 150–160 kt | [S26][S38] |
| BS691 | SDF | 13.60839 | 100.73914 | 3.0 | 5.3D | 1000 | — | [S26][S38] |
| BS692 = THR 01 | MAPt (RNP) | 13.65670 | 100.75183 | 0 | — | THR 3.7 | — | [S28][S2] |

- **LOC-only step-downs:** 7D 1540 ft, 6D 1225 ft, 5D 910 ft, 4D 590 ft [S26].
- **RNP RWY01:** same fixes; VPA 3.0° (5.2%), RDH 50 ft [S28].
- **Missed approach:**
  - Chart text: "At MAPt, climb to DE001, then turn right to BS301, climb up to 3000 FT at BS306, then turn right and proceed to GUXAR at minimum 4000 FT and hold."
  - MAPt→DE001 is 015° (014.4°T), 2.2 NM.
  - BS301 has max 210 kt. BS301→BS306 is 105°, 8.8 NM. BS306→GUXAR is 195°, 16.6 NM.
  - LOC only: no turn before the MAPt [S26].
  - CIFP codes "climb up to 3000 ft at BS306" as at or below 3000 ft [S44].
- **Simultaneous operations:** authorised with RWY 02L or 02R [S28].

### 4.3 RWY 02L: RNP only

| Fix | Role | Lat | Lon | NM from THR | Alt (ft) | Speed | Src |
|---|---|---|---|---|---|---|---|
| BATEM | IAF | 13.41115 | 100.66255 | 15.7 (derived; 4.6 NM before ABVER) | 4000 | ≤220 kt | [S29][S38] |
| ABVER | IF | 13.48554 | 100.68207 | 11.1 | 3000 | Cross at 180 kt | [S29][S38] |
| BS670 | FAF | 13.58621 | 100.70852 | 4.9 | 1600 | Cross 150–160 kt | [S29][S38] |
| BS671 = THR 02L | MAPt | 13.66518 | 100.72924 | 0 | THR 8 | — | [S29][S2] |

- **Vertical path:** VPA 3.0° (5.2%), RDH 50 ft. Baro-VNAV is not authorised below +15°C. The chart is marked "CHANGE: PDR" [S29].
- **Missed approach:** the same loop as 02R (§4.4), starting from DE02L [S29].
- **Simultaneous operations:** authorised with RWY 01 [S29].

### 4.4 RWY 02R: ILS or LOC Z (CAT II) and RNP

| Fix | Role | Lat | Lon | NM from THR | DME | Alt (ft) | Speed | Src |
|---|---|---|---|---|---|---|---|---|
| LASAM | IAF | 13.41024 | 100.66614 | 16.2 (derived) | — | 4000 | ≤220 kt | [S27][S43] |
| LOSDO | IF | 13.49131 | 100.68741 | 11.1 | 13.3D ISWS | 3000 | Cross at 180 kt | [S27][S43] |
| BS680 | FAF/FAP | 13.59190 | 100.71384 | 4.9 | 7.1D | 1600 | Cross 150–160 kt | [S27][S38] |
| BS681 = THR 02R | MAPt (RNP) | 13.67128 | 100.73466 | 0 | — | THR 4.2 | — | [S30][S2] |

- **RNP 02R profile:** FAF 1600; 4 NM 1320; 3 NM 1005; 2 NM 690; 1.8 NM 620 ft [S30].
- **ILS Z 02R minima (OCA/OCH):**
  - CAT I 250 (246) ft applies only to aircraft able to climb at 5% (304 ft/NM) in the missed approach until 1000 ft.
  - CAT II 150 (146) ft applies only with a 4% (243 ft/NM) climb.
  - The box also prints 530 (526) and 310 (306), which are the standard-gradient CAT I and CAT II values; the exact pairing is not legible.
  - LOC 370 (366) ft. Circling 800 (792) / 900 (892) ft [S27].
- **Missed approach (02R and 02L):**
  - Chart text: "At MAPt, climb to DE02R [or DE02L], then turn left to BS302, turn right to BS303, turn right to BS304, turn right to BS305, then turn right to BS306 at minimum 4000 FT, then proceed to GUXAR and hold."
  - BS302 has max 210 kt.
  - Legs: 359°; 015° 5.6 NM; 091° 11.3 NM; 150° 7.4 NM; 195° 9.0 NM; then 195° 16.6 NM to GUXAR. **This is a clockwise loop** [S27][S29][S38].
- **Simultaneous operations:** authorised with RWY 01 [S27][S30].

### 4.5 RWY 19: ILS or LOC Z (CAT II) and RNP

| Fix | Role | Lat | Lon | NM from THR | DME | Alt (ft) | Speed | Src |
|---|---|---|---|---|---|---|---|---|
| LETMA | IAF | 14.01611 | 100.84642 | 20.1 (derived) | — | 4000 | ≤220 kt | [S31][S43] |
| LAVOG | **IF** | 13.93505 | 100.82506 | 15.0 | 17.3D ISEN | 2500 | — | [S31][S43] |
| LOTMU | Step-down | 13.85400 | 100.80372 | 10.0 | 12.3D | 2000 | Cross at 180 kt | [S31][S43] |
| BS790 | FAF/FAP | 13.77067 | 100.78179 | 4.9 | 7.2D | 1600 | Cross 150–160 kt | [S31][S38] |
| BS791 = THR 19 | MAPt (LOC/RNP) | 13.69171 | 100.76103 | 0 | — | THR 3.7 | — | [S31][S33][S2] |

- **Chart change:** "CHANGE: IF ALT." means LAVOG moved from 3000 ft to 2500 ft (the previous chart was 299118). The CIFP still codes LOTMU as the IF; the chart governs [S31][S44].
- **RNP RWY19:** same fixes [S33].
- **Missed approach:**
  - Chart text: "At MAPt, climb to DE019, then turn left to BS604, turn left climb up to 4000 FT at BS605, then turn left and proceed to OBDIP at minimum 5000 FT and hold."
  - BS604 has max 210 kt. BS605 is coded at or below 4000 ft.
  - Legs: about 148°, then 059°, then 014° [S31][S33][S44].

### 4.6 RWY 20L: ILS or LOC Z (CAT II) and RNP

| Fix | Role | Lat | Lon | NM from THR | DME | Alt (ft) | Speed | Src |
|---|---|---|---|---|---|---|---|---|
| REGIR | IAF | 14.02158 | 100.82687 | 19.7 (derived) | — | 5000 | ≤220 kt | [S32][S43] |
| RUMAD | **IF** | 13.94052 | 100.80550 | 14.6 | 16.8D ISWN | 3500 | — | [S32][S43] |
| REVMO | Step-down | 13.88021 | 100.78962 | 10.9 | 13.1D | 3000 | Cross at 180 kt | [S32][S43] |
| BS780 | FAF/FAP | 13.78309 | 100.76407 | 4.9 | 7.1D | 1600 | Cross 150–160 kt | [S32][S38] |
| BS781 = THR 20L | MAPt (RNP) | 13.70367 | 100.74318 | 0 | — | THR 4.0 | — | [S34][S2] |

- **Chart change:** "CHANGE: IF ALT." means RUMAD moved from 4000 ft to 3500 ft (the previous chart was 299119) [S32].
- **ILS Z 20L minima (OCA/OCH):**
  - CAT I 204 (200) ft and CAT II 130 (126) ft apply only with a 5% (304 ft/NM) missed-approach climb until 1000 ft.
  - The box also prints 290 (286), 220 (216) and 750 (746), which are the standard CAT I, CAT II and LOC values; the pairing is not legible.
  - Circling 800 (792) / 900 (892) ft [S32].
- **RNP 20L minima:** LNAV/VNAV 600 (596) ft; LNAV 750 (746) ft [S34].
- **Missed approach (20L and 20R):**
  - Chart text: "At MAPt, climb to DE20L [or DE20R], then turn right to BS601, turn left to BS602 and climb up to 3000 FT, turn left to BS603, turn left to BS605 at minimum 5000 FT, then proceed to OBDIP at minimum 5000 FT and hold."
  - BS602 has max 210 kt. BS602 and BS603 are coded at or below 3000 ft.
  - Legs: BS601→BS602 180°, 3.0 NM; BS602→BS603 104°; BS603→BS605 014°. **This is an anticlockwise loop** [S32][S35][S44].
- **Simultaneous operations:** authorised with RWY 19 [S34].

### 4.7 RWY 20R: RNP only

| Fix | Role | Lat | Lon | NM from THR | Alt (ft) | Speed | Src |
|---|---|---|---|---|---|---|---|
| RUPED | IAF | 14.02330 | 100.82350 | 20.0 | 5000 | ≤220 kt | [S35][S43] |
| ANORU | **IF** | 13.94225 | 100.80214 | 15.0 | 3500 | — | [S35][S38] |
| OSEVA | Step-down | 13.87657 | 100.78484 | 10.9 | 3000 | Cross at 180 kt | [S35][S43] |
| BS770 | FAF | 13.77914 | 100.75921 | 4.9 | 1600 | Cross 150–160 kt | [S35][S38] |
| BS771 = THR 20R | MAPt | 13.70019 | 100.73845 | 0 | THR 8 | — | [S35][S2] |

- **Vertical path:** VPA 3.0°, RDH 50 ft [S35].
- **Minima:** LNAV/VNAV 600 (592) ft; LNAV 750 (742) ft; circling 800 (792) / 900 (892) ft [S35].
- **Missed approach:** as 20L (§4.6) [S35].
- **Simultaneous operations:** authorised with RWY 19 [S35].

### 4.8 Missed-approach fixes (SIM coordinates)

The legs agree with the AIP chart tracks and distances [S38][S29][S35].

| Fix | Lat | Lon | Used by |
|---|---|---|---|
| BS301 | 13.74307 | 100.83074 | RWY 01 |
| BS302 | 13.86898 | 100.73360 | 02L, 02R |
| BS303 | 13.95919 | 100.75734 | 02L, 02R |
| BS304 | 13.95771 | 100.95163 | 02L, 02R |
| BS305 | 13.85127 | 101.01552 | 02L, 02R |
| BS306 | 13.70588 | 100.97683 | 01, 02L, 02R |
| BS601 | 13.55199 | 100.61578 | 20L, 20R |
| BS602 | 13.50178 | 100.61544 | 20L, 20R |
| BS603 | 13.42969 | 100.90337 | 20L, 20R |
| BS604 | 13.60666 | 100.78207 | 19 |
| BS605 | 13.72096 | 100.98097 | 19, 20L, 20R |

- The departure-end fixes DE001, DE02L, DE02R, DE019, DE20L and DE20R have no AIP coordinates (§7).

### 4.9 Missed-approach holds

| Fix | Lat | Lon | From ARP (derived) | Inbound °M (°T) | Turns | Min | Legs / speed | Config | Src |
|---|---|---|---|---|---|---|---|---|---|
| GUXAR | 13.43694 | 100.90537 | 17.5 NM, 149°T | 195 (194.3) | Left (CIFP only) | 4000 ft | 1 min, ≤230 kt | 01/02 | [S26][S27][S44] |
| OBDIP | 13.88437 | 101.02459 | 20.0 NM, 053°T | 015 (014.3) | Right (CIFP only) | 5000 ft | 1 min, ≤230 kt | 19/20 | [S31][S32][S44] |

- OBDIP lies about 0.05 NM from BS507 [S38].
- At 230 kt a 1-minute leg is about 3.8 NM (derived).

### 4.10 Simultaneous approaches and altitude stagger

**Rules**

- Simultaneous independent operations are authorised for RWY 01 with 02L or 02R, and for RWY 19 with 20L or 20R [S28][S29][S30][S34][S35].
- LNAV procedures are not authorised during simultaneous operations [S28].
- After radar vectoring, RNP requires FD/AP track guidance [S28].

| RWY | Fix at 10–11 NM | Alt | IF, where different | IAF | Src |
|---|---|---|---|---|---|
| 01 | RUPUX (IF) | 2000 | — | REPEN 3000 | [S26] |
| 02L | ABVER (IF) | 3000 | — | BATEM 4000 | [S29] |
| 02R | LOSDO (IF) | 3000 | — | LASAM 4000 | [S27] |
| 19 | LOTMU | 2000 | LAVOG 2500 | LETMA 4000 | [S31] |
| 20L | REVMO | 3000 | RUMAD 3500 | REGIR 5000 | [S32] |
| 20R | OSEVA | 3000 | ANORU 3500 | RUPED 5000 | [S35] |

- **Stagger:** 01/19 is the east runway, not the middle one. At 10–11 NM its approaches run 1000 ft below the 02/20 pair [S2][S28].

### 4.11 Speeds

| Point | Limit | Src |
|---|---|---|
| IAF | Max IAS 220 kt | [S26]–[S35] |
| 180 kt crossing | At the IF on 01/02L/02R (RUPUX, ABVER, LOSDO). On 19/20L/20R it is at the 10–11 NM step-down (LOTMU, REVMO, OSEVA), not the IF | [S26][S27][S29][S31][S32][S35] |
| FAF | Cross between 150 and 160 kt | [S29] |
| First missed-approach turn fix | Max 210 kt: BS301, BS302, BS604; BS602 on 20L/20R | [S26][S27][S44] |
| Missed-approach holds | 1 min, max 230 kt | [S26][S31] |
| STAR | Max 250 kt at or below 10000 ft | [S15][S16] |

## 5. Real flown patterns

### 5.1 Observed 2026-10-13, 12:58:15–13:02:21Z

- **Configuration:** Config 01/02, with arrivals landing on 01 and 02L and departures from 02R [S47]–[S51].
- **Data type:** live snapshot data, not archived.
- **Altitudes:** as reported by ADS-B.
- **Tracks:** "trk" is the true ground track.

**JST29, landing 02L. East downwind, then base, then intercept** [S47]

| UTC | Lat | Lon | Alt | Trk | Note |
|---|---|---|---|---|---|
| 12:58:15 | 13.43963 | 100.78053 | 6275 | 194 | East downwind: 12.2 NM S and 4.9 NM E of the RWY 01 centreline |
| 12:59:45 | 13.38181 | 100.72960 | 5050 | 281 | Right turn to base about 16 NM S (snapshot not re-opened by the checker) |
| 13:00:35 | 13.40188 | 100.68314 | 4300 | 301 | Crossing the RWY 01 extended centreline (not re-opened) |
| 13:01:21 | 13.44008 | 100.66990 | 3700 | 014 | Established on the 02L centreline, 13.9 NM. It joined about 15 NM out at about 4100 ft, near BATEM |
| 13:02:21 | 13.49162 | 100.68368 | 2950 | — | 10.75 NM out, 0.06 NM off the centreline |

**QTR826, landing 01. West downwind, then base, then intercept at the IF** [S48]

| UTC | Lat | Lon | Alt | Trk | Note |
|---|---|---|---|---|---|
| 12:58:15 | 13.50625 | 100.59766 | 2075 | 192 | West downwind: 11.1 NM S and 5.15 NM W of the 02L centreline. Selected heading 110 |
| 13:00:17 | 13.48494 | 100.68482 | 2075 | 086 | Base, crossing the 02L extended centreline |
| 13:00:50 | 13.49289 | 100.70810 | 2050 | 035 | Joining the RWY 01 final at 10.2 NM, close to RUPUX (IF 2000 ft, 10.5 NM) |
| 13:02:21 | 13.55988 | 100.72640 | 1900 | 014 | 6.0 NM out |

**THA047, landing 01. Intercept from the east** [S49]

| UTC | Lat | Lon | Alt | Trk | Note |
|---|---|---|---|---|---|
| 12:58:15 | 13.47855 | 100.71215 | 3500 | 335 | 10.9 NM out, 0.42 NM E of the centreline. MCP altitude 2000 |
| 12:58:52 | 13.51094 | 100.71371 | 2725 | 013 | Established, 9.0 NM (not re-opened) |
| 13:00:17 | — | — | 1525 | — | On the RWY 01 centreline |
| 13:02:21 | 13.65857 | 100.75234 | 50 | — | Over THR 01 |

**THA137 (runway not observed) and AIC2304. High west downwind** [S50]

| Flight | UTC | Lat | Lon | Alt | Trk | Note |
|---|---|---|---|---|---|---|
| THA137 | 12:58:15 | 13.57961 | 100.60841 | 7325 | 199 | 5.6 NM W of the 02L centreline |
| THA137 | 13:00:50 | 13.42446 | 100.56615 | 5375 | 164 | — |
| THA137 | 13:01:21 | 13.40057 | 100.58085 | 4850 | 123 | Left base, about 16–17 NM S |
| THA137 | 13:02:21 | 13.42104 | 100.62771 | 3875 | 048 | Intercept heading, 2.2 NM W of the 02L centreline at 15.7 NM |
| AIC2304 | 13:01:21 | 13.69232 | 100.64778 | 9725 | 194 | West downwind, 5.0 NM W, abeam the thresholds |

**Departures and landings** [S51]

- **TVJ2106:**
  - At 13:00:50 it was at 13.70088, 100.74256, 350 ft, track 015, exactly on the 02R centreline.
  - At 13:00:17 it was still rolling.
- **HVN606 and TVJ344:** also on the 02R centreline, 0.01–0.03 NM off it.
- **UEA2867:** touched down on RWY 01 at 13:00:17.

### 5.2 Pattern summary (derived from §5.1)

- **Downwinds:** southbound, about 5 NM either side of the parallel finals: east of 01 and west of 02L. This matches ENKAA (4.7 NM E), BOGAS (5.1 NM W) and the heading 195° instruction [S15][S43][S47]–[S50].
- **Base turns:** about 15–17 NM south of the thresholds.
- **Intercepts:**
  - RWY 01 traffic joins near 10 NM at about 2000 ft (QTR826, THA047).
  - 02L traffic joins at 14–15 NM at about 3700–4100 ft (JST29).
  - This matches the 2000/3000 ft stagger [S26][S29][S47]–[S49].
- **Crossing flows:**
  - Traffic for 02L from the east downwind crosses above the RWY 01 extended centreline (JST29 at about 4300 ft).
  - Traffic for 01 from the west downwind crosses the 02L extended centreline low (QTR826 at 2075 ft) [S47][S48].
- **Departures:** straight out on 02R on about 015° [S51].

### 5.3 Config 19/20 example

- **Serious incident (no track data):** on 25 Jan 2025 Sky Angkor A321 XU-723 was cleared to land on 20R but intercepted the 20L final. The two runways are about 400 m apart [S52][S2].
- No Config 19/20 ADS-B tracks were obtained.

## 6. What to draw first

**Scene: Config 01/02.** It matches the live data in §5 and has the most verified approach detail.

**Correction to the brief: there is no "02L ILS".** RWY 02L has only an RNP approach; its ILS is planned for 2027 [S12][S29]. Draw the RNP RWY02L. Its 3.0° VPA looks the same as a glideslope. Pair it with the ILS Z RWY01 to show the parallel finals and the altitude stagger.

| # | Layer | Data | Accuracy flags |
|---|---|---|---|
| 1 | Six thresholds, three runway strips, VTBS ATZ (r 5 NM, SFC–2000 ft) | §0, §1.1 | — |
| 2 | Bangkok CTR (r 35 NM, GND–11000 ft) and two-tier TMA (35–50 NM ring 3000 ft–FL160; inner cap 11000 ft–FL160), **centred on the VTBD ARP** | §1.1 | Do not centre these on VTBS. VTBS sits 16.1 NM SSE of the centre |
| 3 | Config 01/02 DSB (north of VTBS) and ARR (south of VTBS), GND–10000 ft, faint | §1.4 | — |
| 4 | **EASTE2D** (EASTE → … → ENKAA), its feeders Y1/Y2 via UBLOD and Y13 via RUKSA, and the EASTE hold (≥FL140, inbound 247.3°T, left turns) | §2.2, §2.3, §2.5 | Terminal-fix coordinates are SIM. The hold turn direction is inferred |
| 5 | Heading-195° downwind beyond ENKAA, then base and the 02L join, drawn as JST29's observed track | §2.6, §5.1 | Label it "typical vectored path", not a procedure |
| 6 | Finals: **RNP RWY02L** (BATEM 4000 → ABVER 3000 → BS670 1600 → THR) and **ILS Z RWY01** (REPEN 3000 → RUPUX 2000 → BS690 1600 → BS691 1000 → THR) | §4.2, §4.3 | Do not label 02L as ILS |
| 7 | 02L/02R missed approach: clockwise loop BS302 → BS306 → GUXAR, plus the GUXAR hold | §4.4, §4.8, §4.9 | The GUXAR turn direction comes from CIFP only |
| 8 | 02R departure to the north-east: runway-track climb from the DER (THR 20L) on 014.4°T, initial climb 6000 ft; end fix SELKA (AIP); then A1 east to UBL/BUTRA and Y14 north to KRT | §3.2, §3.4, §3.5 | The middle of the route is unpublished. If a continuous line is needed, use the dashed approximate trace in U2/U3. That this is the Japan exit is unverified (U1) |
| 9 (optional) | VT R1 (r 10 NM, GND–3000 ft), the palace R-areas, D6A/D6B | §1.5 | — |

**Display guidance (not from sources)**

- **STAR profiles:** at constrained fixes, use the constraint value, taking the midpoint for a window. Interpolate linearly between fixes. Treat this as a display convention, not a flown profile.
- **Real traffic is higher than the constraints near the STAR end.** For example, JST29 was at 6275 ft where ENKAA only requires ≥3000 ft. For realism, use the §5 altitudes on the final segments.
- **Glide path:** draw it with h ≈ THR elevation + 50 + 318 × d ft (§4.1).

**Build hints for smooth rendering (not from sources)**

- **Static geometry:** all airspace and procedure geometry is static. Build it once at load, merged into a few meshes or line batches. Animate only aircraft markers, trails and shader effects.
- **Arcs:** sampling at 2° (180 segments per full circle) looks smooth at TMA scale.
- **Projection:** use a local tangent-plane projection centred on the VTBS ARP.
- **Vertical exaggeration:** apply ×4 to ×6. FL160 is only about 2.6 NM against a 50 NM radius (derived), so at true scale the volumes read as flat discs.

## 7. Gaps

- **Terminology:** sources use "north/south flow" in opposite senses. This spec uses Config 01/02 and Config 19/20 throughout.
- **Chart index:**
  - VTBS AD 2.20–2.24 could not be read: the fetch truncates at AD 2.19 and the PDF failed.
  - Chart graphic IDs were found by scanning and assumed current; they were not checked against AD 2.24.
  - Local rules (AD 2.20) and noise abatement (AD 2.21) are unknown; the only noise source is the 2011 Boeing page.
- **STARs:**
  - The 3 SEP 26 (2C/2D) charts were not found.
  - The 2C/2D route order is SIM, cross-checked against pre-2609 AIP constraint values and leg labels.
  - Feeder-to-entry-fix transition legs are listed only as fixes; whether each is direct, and any constraints on it, are unknown.
  - How PASTO (L301) joins WILLA is unknown.
- **Fix coordinates:**
  - All terminal fixes are SIM only: STAR fixes, BS3xx/4xx/5xx/6xx/7xx, approach IAF/IF/step-down fixes and missed-approach fixes.
  - None appear in ENR 4.4, and none are printed as text on the charts.
  - The hnamtang navdata still carries pre-change IF altitudes (RUPUX 2500, LOSDO 3500).
- **Holds:**
  - Entry-hold and TERIB turn directions are inferred from IVAO drawings; GUXAR and OBDIP directions come from CIFP navdata.
  - No maximum holding level was found.
  - Entry-hold leg length or time is unknown, and the 280 kt figure is an IVAO annotation.
  - The TERIB inbound course is unresolved; 196° is probable.
- **SIDs:**
  - Fix sequences and path terminators were not found.
  - Coordinates were not found for BS120, BS124–BS138, BS928–BS943, ASANI, SAMVA, SUPIS, BUTBI, SUSVU, POTEP, OBMAR, TUPKA, TEMPO, ANRIP, NOKUK, SABIS, RIVDU, UPMUT, GUGOT, LELIS and KABUT.
  - The at/above/below sense of the altitude labels is unknown.
  - The initial turn direction after the 20L DER is unknown.
  - No real BKK–Japan filed route was found.
- **Airspace:**
  - The approach sectors have no printed vertical limits, and their vertices are derived.
  - The VTBD ATZ vertical limit is ambiguous.
  - D2, D8A and D8C–D8F were not extracted. The ENR 5.1 summary gives their upper limits: D8A FL460, D8C 9000 ft, D8D 6000 ft, D8E 8000 ft, D8F 6000 ft. D2 Lop Buri is GND–6000 ft, with its south edge about 14.61N, roughly 100 km north of VTBS.
  - The D47 and D8B coastline segments have no coordinates.
  - The U-Tapao and Hua Hin TMAs are not covered.
- **Approaches:**
  - The ILS 01/19 LOC and GP positions and the 20L GP position were not retrieved.
  - ILS 01 and 19 minima, and the RNP minima for 01/02L/02R/19, were not extracted.
  - Some minima-to-label pairings are not legible.
  - The DE fixes have no AIP coordinates. SIM data puts DE20R at THR 02L, which suggests each DE fix is the opposite threshold; this is unconfirmed.
  - The "20 NM" label at REPEN is not understood.
  - The 02L final track is 014.4°T on the chart but 014.00°T in AD 2.12.
- **Live evidence:**
  - It is one four-minute snapshot series, Config 01/02 only, with no Config 19/20 tracks.
  - The landing runway for THA137 was not observed.
  - Several intermediate points were not re-opened by the checker.
- **Navaids:**
  - SVB DVOR/DME status conflicts between sources: AD 2.19 still lists it; AIC 02/26 says it has been suspended since 2023, with return planned for 2029; SUP A24/26 (3 SEP 2026) suspends it until further notice.
  - The effect on procedures and the radio-failure pages were not read.
- **Currency:**
  - AIC 02/26 may have been superseded; this was not checked.
  - AIRAC 29 OCT 2026 may change any of the above.
- **Other:**
  - The OpenNav SELKA position is about 6.5 NM off the AIP value, cause unknown.
  - The VT R1 "Congested Area" wording was not verified verbatim.

## Unverified

These claims could not be verified. Do not draw them as fact.

- **U1. Japan-bound SID (claim sids-23).**
  - The claim is that the north-east and Japan exit is SELKA1x (SELKA1H from 02R). This is an inference only; no filed BKK–Japan route was found.
  - LIPLI1x is an equally plausible eastbound exit, because ENR 3.3 Y16 runs Bangkok–UPKUP–LIPLI–XIKMA–PEKBA–BUTRA and is also one-way eastbound.
  - The IVAO wiki (outdated) maps A1 to the historic ROBKA 3G/3H/3J/3K SIDs [S9][S17][S42].
- **U2. 02R jet leg labels (claim sids-24).**
  - The inset prints 015° (014.4°T) legs of 6.7, 5.6, 5.3 and 3.5 NM; which leg belongs to which SID is unknown. It also prints 314° 9.4 NM, 280° 10.0 NM and 091° (090.4°T) 11.3 NM.
  - The main chart prints 062° (061.1°T) 60.7 NM to SELKA, 072° (071.3°T) 61.0 NM to LIPLI and 089° (087.9°T) 50.2 NM to DOSBU.
  - A closure check suggests about 8.8–9.1 NM on 014.4°T from the DER, then a right turn onto 090.4°T [S17][S18].
- **U3. Derived 02R branch fix (claim sids-25).**
  - A fix common to SELKA1H, LIPLI1H and DOSBU1H lies at about 13.850, 100.973 (great-circle back-solution from the three AIP end fixes, agreeing within about 0.2 NM). Its name is unknown; BS133 is a candidate.
  - Approximate SELKA1H trace:
    - start at DER 02R, 13.70367, 100.74318;
    - fly about 9 NM on 014.4°T to about 13.846–13.851, 100.781–100.782;
    - fly 090.4°T for 11.3 NM to about 13.850, 100.973;
    - fly 061.1°T for 60.7 NM to SELKA, 14.33889, 101.88639 [S17][S18][S7].
- **U4. RWY 01 eastbound (claim sids-26).**
  - The inset prints a "091° 9.9 NM (090.1°T)" leg.
  - With an assumed 9.5 NM on 014.4°T from the DER, this leg ends about 0.2 NM from the U3 fix.
  - The inset also shows 004° 5.8 NM and 054° 8.9 NM legs, so the path may not be one straight segment [S21].
- **U5. 20L eastbound fan (claim sids-27).**
  - The chart prints "091° 13.4NM (090.3°T)" near BS943.
  - From a derived common fix at about 13.753, 101.232, legs run 048° (047.4°T) 51.8 NM to SELKA (SELKA1G), 060° (059.5°T) 49.7 NM to LIPLI and 079° (077.9°T) 36.0 NM to DOSBU.
  - The path from DER 20L to that fix is unknown [S19].

## Sources

1. [S1] AIP Thailand ENR 2.1 FIR, UIR, TMA, CTR, AIRAC AMDT 10/26 — https://aip.caat.or.th/2026-10-01-AIRAC/html/eAIP/VT-ENR-2.1-en-GB.html
2. [S2] AIP Thailand AD 2 VTBS (AD 2.2, 2.12, 2.17, 2.18, 2.19) — https://aip.caat.or.th/2026-10-01-AIRAC/html/eAIP/VT-AD-2.VTBS-en-GB.html
3. [S3] AIP Thailand AD 2 VTBD — https://aip.caat.or.th/2026-10-01-AIRAC/html/eAIP/VT-AD-2.VTBD-en-GB.html
4. [S4] AIP Thailand ENR 4.1 Radio navigation aids — https://aip.caat.or.th/2026-10-01-AIRAC/html/eAIP/VT-ENR-4.1-en-GB.html ; https://aip.caat.or.th/2026-10-01-AIRAC/pdf/VT-ENR-4.1-en-GB.pdf
5. [S5] AIP Thailand ENR 5.1 Prohibited, restricted and danger areas — https://aip.caat.or.th/2026-10-01-AIRAC/html/eAIP/VT-ENR-5.1-en-GB.html
6. [S6] AIP Thailand ENR 1.7 Altimeter setting procedures — https://aip.caat.or.th/2026-10-01-AIRAC/html/eAIP/VT-ENR-1.7-en-GB.html
7. [S7] AIP Thailand ENR 4.4 Significant points (page dated 3 SEP 26) — https://aip.caat.or.th/2026-10-01-AIRAC/pdf/VT-ENR-4.4-en-GB.pdf
8. [S8] AIP Thailand ENR 3.1 ATS routes — https://aip.caat.or.th/2026-10-01-AIRAC/pdf/VT-ENR-3.1-en-GB.pdf
9. [S9] AIP Thailand ENR 3.3 RNAV routes — https://aip.caat.or.th/2026-10-01-AIRAC/pdf/VT-ENR-3.3-en-GB.pdf
10. [S10] AIP Thailand cover, AIRAC AIP AMDT 10/26 — https://aip.caat.or.th/2026-10-01-AIRAC/html/VT-cover-en-GB.html
11. [S11] AIRAC AIP AMDT 10/26, including the GEN 0.4 checklist — https://aip.caat.or.th/2026-10-01-AIRAC/pdf/VT-amdt-en-GB.pdf
12. [S12] AIC 02/26 — https://aip.caat.or.th/2025-12-18/html/eAIC/VT-eAIC-26-02-en-GB.html
13. [S13] AIC 07/25 — https://aip.caat.or.th/2025-08-21/html/eAIC/VT-eAIC-25-07-en-GB.html
14. [S14] AIP Thailand ENR 4.4, AIRAC 05 NOV 2020 (historical) — https://aip.caat.or.th/2020-11-05-AIRAC/pdf/VT-ENR-4.4-en-GB.pdf
15. [S15] STAR RNAV RWY01/02L/02R, graphic 299109 (pre-2609 issue) — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299109.pdf
16. [S16] STAR RNAV RWY19/20L/20R, graphic 299110 (pre-2609 issue) — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299110.pdf
17. [S17] SID RNAV RWY02R (jet), main chart 299138 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299138.pdf
18. [S18] SID RNAV RWY02R (jet), inset 299139 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299139.pdf
19. [S19] SID RNAV RWY20L (jet), 299134 (inset 299135) — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299134.pdf
20. [S20] SID RNAV RWY01 (jet), main chart 299143 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299143.pdf
21. [S21] SID RNAV RWY01 (jet), inset 299144 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299144.pdf
22. [S22] SID RNAV RWY19 (jet), 299136 (inset 299137) — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299136.pdf
23. [S23] SID RNAV RWY02L (jet), 299141 (inset 299142) — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299141.pdf
24. [S24] SID RNAV RWY20R (jet), 299132 (inset 299133) — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299132.pdf
25. [S25] SID RNAV propeller charts 299126 (01), 299127 (02L), 299128 (02R), 299129 (19), 299130 (20L), 299131 (20R) — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299126.pdf … https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299131.pdf
26. [S26] ILS or LOC Z RWY01, 299116 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299116.pdf
27. [S27] ILS or LOC Z RWY02R, 299117 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299117.pdf
28. [S28] RNP RWY01, 299120 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299120.pdf
29. [S29] RNP RWY02L, 299121 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299121.pdf
30. [S30] RNP RWY02R, 299122 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/299122.pdf
31. [S31] ILS or LOC Z RWY19, 307017 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/307017.pdf
32. [S32] ILS or LOC Z RWY20L, 307018 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/307018.pdf
33. [S33] RNP RWY19, 307019 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/307019.pdf
34. [S34] RNP RWY20L, 307020 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/307020.pdf
35. [S35] RNP RWY20R, 307021 — https://aip.caat.or.th/2026-10-01-AIRAC/graphics/307021.pdf
36. [S36] Third-party bot diff of the AIP VTBS AD 2 STAR table (GitHub Spidersqdn/FLIGHT #8) — https://github.com/Spidersqdn/FLIGHT/issues/8
37. [S37] SIM: IVAO Thailand sector file VTBS.str — https://raw.githubusercontent.com/ivaoth/sector-file/master/data/aurora/VTBS.str
38. [S38] SIM: IVAO Thailand waypoints.json — https://raw.githubusercontent.com/ivaoth/sector-file/master/data/generated/waypoints.json
39. [S39] SIM: IVAO Thailand commit 1840705 (AIRAC 2609 update) — https://github.com/ivaoth/sector-file/commit/1840705c85bf76487fc7cd0476b4efa634741e0c
40. [S40] SIM: VATSIM Thailand vACC, Changes to VTBS procedures on 3 September 2026 — https://wiki.vacc-tha.org/books/pilot-briefings-charts/page/changes-to-suvarnabhumi-vtbs-procedures-on-3-september-2026
41. [S41] SIM: VATSIM Thailand vACC, VTBS Suvarnabhumi Airport — https://wiki.vacc-tha.org/books/pilot-briefings-charts/page/vtbs-suvarnabhumi-airport
42. [S42] SIM: IVAO Thailand wiki, VTBS (outdated) — https://wiki.ivao.aero/en/home/divisions/th/atc/aerodrome/vtbs
43. [S43] SIM: hnamtang flight-planning-tool VTBS.txt — https://github.com/hnamtang/flight-planning-tool/blob/main/data/airports/VTBS.txt
44. [S44] SIM: X-Plane 12 CIFP VTBS.dat (fcooper94/worldflight-planning) — https://raw.githubusercontent.com/fcooper94/worldflight-planning/main/data/XP12/CIFP/VTBS.dat
45. [S45] Third party: OpenNav, SELKA — https://opennav.com/waypoint/TH/SELKA
46. [S46] Third party: Boeing airport noise information, Suvarnabhumi (2011 data) — https://www.boeing.com/resources/boeingdotcom/commercial/noise/suvarnabhumi.html
47. [S47] Live ADS-B: adsb.lol point 13.50/100.66/29 — https://api.adsb.lol/v2/point/13.50/100.66/29
48. [S48] Live ADS-B: adsb.lol point 13.56/100.71/26 — https://api.adsb.lol/v2/point/13.56/100.71/26
49. [S49] Live ADS-B: adsb.lol point 13.69/100.75/35 — https://api.adsb.lol/v2/point/13.69/100.75/35
50. [S50] Live ADS-B: adsb.lol point 13.51/100.67/24 — https://api.adsb.lol/v2/point/13.51/100.67/24
51. [S51] Live ADS-B: adsb.lol point 13.52/100.68/28 — https://api.adsb.lol/v2/point/13.52/100.68/28
52. [S52] BEA notified event: A321 XU-723, Suvarnabhumi, 25 Jan 2025 — https://bea.aero/en/investigation-reports/notified-events/detail/serious-incident-to-the-airbus-a321-registered-xu-723-operated-by-sky-angkor-airlines-on-25-01-2025-at-suvarnabhumi-ad/