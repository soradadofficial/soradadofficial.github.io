# Hotel deep-dive: fact-checked stay reference spec

Date: 2026-10-13. Scope: the five demo stays. Each has a fictional name in the site but is modelled on a real building at its real location.

**Method.** One researcher worked on each property. An independent re-check then tested every claim against its source and gave each one a verdict. This spec uses only claims marked confirmed, or corrected (with the corrected value). It would leave out removed and unverifiable claims, but none came up. The raw claims and checks are in `hotel-deep-dive-verification-log.json`.

| Property | Claims | Confirmed | Corrected | Removed | Unverifiable |
|---|---|---|---|---|---|
| §1 Tokyo: The Prince Park Tower Tokyo | 87 | 81 | 6 | 0 | 0 |
| §2 Osaka: Hotel New Otani Osaka | 81 | 73 | 8 | 0 | 0 |
| §3 Kawaguchiko: Kozantei Ubuya | 101 | 95 | 6 | 0 | 0 |
| §4 Hakone: Ryuguden (+ Hanaori alternative) | 89 | 84 | 5 | 0 | 0 |
| §5 Kyoto: Machiya Residence Inn (Yumeha, Bonbori-an) | 85 | 81 | 4 | 0 | 0 |
| **Total** | **443** | **414** | **29** | **0** | **0** |

**Tags.** `[key]` points to the sources list for that property at the end. `[d]` means derived by calculation or inference. `[RRS]` means carried over from `real-reference-spec.md`, which was verified in its own Oct 2026 pass and not re-checked here. **corr.** marks a corrected value. **conflict** means the sources disagree. n/s means not stated in any source found.

**3D use.** Floor directory rows can be mapped to tower floors for highlighting. The look notes list only materials and colours that a source states. Anything else counts as a gap; do not invent it.

---

## §1 Tokyo: The Prince Park Tower Tokyo (demo stay "Akane Sky Tokyo")

### 1.1 Building facts
- Opened on 11 Apr 2005 as 東京プリンスホテル パークタワー, with 33 floors and 673 rooms [fuj][ctb]. Renamed The Prince Park Tower Tokyo in 2007 [wp].
- Site: the former Shiba golf course, on the old Taitokuin and Sugen-in Tokugawa mausoleum grounds [wp]. About 11,000 tsubo (≈36,400 m² [d]), roughly 50% green [pr16]. The former mausoleum Somon gate stands on the hotel grounds [acc].
- Architect: Noritaka Tange (Tange Associates). Builder: Kajima. Original guest-room interiors: Murano Mori Architects [wp].
- Height: CTBUH gives 104.5 m, tower GFA 91,209 m², built 2001–05 [ctb]. **Conflict:** CTBUH lists 30 floors above ground + 1 below; Wikipedia lists 104.40 m and 33F + B3 [wp]. Hotel pages refer to 33F and B2 levels. Average floor-to-floor height ≈3.16 m [RRS][d].
- A central atrium rises through almost every storey, B1–32F [wp].
- Room count **conflict:**
  - Overview page: "600+" rooms, 263 with a Tokyo Tower view [ov].
  - MICE page by band: 2F 11 / 3–18F 355 / 19–28F 210 / 29–32F 68 = 644 [mg].
  - 603 per Wikipedia and the 2016 release [wp][pr16]; 673 at opening [fuj].
- Parking: 603 spaces [wp].
- Forbes Travel Guide 2026: 4 stars [ftg].
- Address point 35.65598, 139.74625 [RRS].
- Tokyo Tower: 400 m on foot, about 10 min, from the South Entrance [acc]. Straight line 298 m at 346° (NNW) [RRS].
- Emergency: two hospitals about 600 m away (IUHW Mita, Saiseikai Central). Storage batteries cover outages [ac3].

### 1.2 Floor directory
| Floor | What is there | Hours | Src |
|---|---|---|---|
| 33F (top) | Sky Bar & Dining Stellar Garden: bar 84 seats (73 tower-side, 11 counter) + dining 116; Private Dining Brise Verte (4 rooms, 26 seats); Sky Banquet 184 m²; universal toilet beside elevator hall | Breakfast 7:00–10:30 (last entry 10:00); tea 12:00–16:30; dinner 17:00–22:00; bar 17:00–01:00; Brise Verte 12:00–15:00 / 17:30–22:00 | [sg25][sg][bv][sky][faq][ac2] |
| 32F | Premium Club Lounge 184 m² (club check-in/out); Panorama Suite, Familia Suite A/B, View Bath Suite, Tower View Suite | Lounge 7:00–22:00, reserved-seat area to 23:00 | [pcl][n29][pr16][rm] |
| 29–31F | Premium Club floors: Princess Suite, Premium King, Premium Corner King | — | [rm][r10] |
| 25F | Smoking-room floor | — | [faq] |
| 19–28F | Panoramic floors: Prince Suite, Panoramic Twin, Panoramic Corner King, Panoramic King / Jr Suite | — | [rm][pr17][RRS] |
| 11–18F | Park Suite (within the Park band) | — | [rm] |
| 3–18F | Park floors (marketed for groups); Connecting Rooms 3–10F; Universal Room 3F | — | [mg][rm] |
| 2F | Garden Floor suites A–D; Shinmei shrine hall 81 m²; Prince Shiba Park garden promenade at this level; universal toilet | — | [rm][mice][gdn][faq] |
| 1F | Front desk (left, just inside South main entrance), Bell Desk, concierge; Lobby Lounge 125 seats; THE SHOP at the Park; Boulangerie Tokyo; Abiste Plaza; Melody Line hall 80 seats; universal toilet | Lounge 10:00–20:00 wkdy, 9:00–20:00 Sat/hol (LO 19:30); THE SHOP 10:00–19:00; Boulangerie 10:00–20:00 (Sat/hol 9:00); Abiste 10:30–19:30 | [faq][ac1][ac3][ll][n29][mel] |
| B1 | Shibazakura (kaiseki) 142; Sushi Hamashiba 43; Tempura Tenshiba 34; Yakitori Torishiba 26; Youmeiden (Chinese) 150; Steakhouse Katsura 37; Main Bar Mokuren 45; Party Room 107; universal toilet + ostomate toilet near Hamashiba | Lunch 11:30–15:00 / dinner 17:00–22:00 (Torishiba dinner only; Katsura lunch Sat/hol only); Mokuren 17:00–22:30, closed Sat–Mon | [shz][ham][ten][tor][you][kat][n29][pty][ac2] |
| B2 | Spa & Fitness (onsen, 25 m pool, gym, sauna); Bowling Salon 12 lanes; Lawson S; salons (Seibu PISA, Florist HANAHAN, La Coin, Re.Ra.Ku, Thalgo, Tony Tanaka); Ballroom; Convention Hall; 7 mid + 7 small banquet rooms; wedding salon; smoking area; universal toilet | Spa 6:00–22:00 (last entry 21:30); bowling 13:00–21:00 wkdy, 11:00–20:00 Sat/hol; Lawson 7:00–23:00; PISA 10:30–18:00; wedding salon 11:00–17:00 wkdy, 9:00–17:00 Sat/hol, closed Wed | [spa][top][fac][n29][law][bal][mice][wed][faq] |
| B3 | Listed only by Wikipedia; use n/s | — | [wp] |

### 1.3 Dining
- 10 restaurants. All restaurant seating is non-smoking [ac][faq]. Restaurants add a 15% service charge; in-room dining adds 18% [sg][ird].
- Stellar Garden (33F) reopened on 3 Oct 2025, taking over the former Brise Verte dining room [sg25].
  - Breakfast: ¥4,800 adult, ¥3,000 ages 4–12.
  - Bar table charge after 17:00: ¥2,000, or ¥3,000 by the window. No charge in the dining area [sg].
- Brise Verte (33F, Western cuisine): 4 window-side private rooms. Book 3 days ahead [bv].
- Breakfast venues, both 7:00–10:30 with last order 10:00 [mor]:
  - 33F Stellar Garden: Japanese/Western buffet.
  - B1 Shibazakura: Japanese set, ¥4,500 adult / ¥2,700 child.
  - In-room: Western 6:00–11:00, Japanese 7:00–10:00. Order by 23:00 the night before.
- Club lounge (32F) breakfast: 7:00–11:00 (LO 10:30) [pcl]. Other lounge slots:
  - Light refreshments 11:00–13:00.
  - Tea 14:00–16:30.
  - Cocktails 17:30–19:30.
  - Nightcap 19:30–22:00.
- In-room dining: 6:00–23:00 [ird].
- Youmeiden: 6 private rooms, 3 enclosed (up to 30 when joined) and 3 curtained [you].
- Katsura: private room ¥5,000, semi-private ¥3,000 [kat].
- Mokuren: 18+ only, non-smoking [n29].
- Party Room (B1, corr.): private karaoke rooms (7 per the top page). Lunch 12:00–17:00, dinner 17:00–22:00 (last entry 20:00). Groups of 4+, book 4 days ahead [pty][mel].
- Melody Line (1F, corr.): 80 seats, private hire only, sound and lighting rig. Not stated to be soundproof [mel].

### 1.4 Bathing and leisure
- Spa & Fitness (B2) [spa]:
  - Facilities: natural onsen, 25 m indoor heated pool, Technogym gym, far-infrared sauna, blower bath.
  - Spring: sodium-chloride strong saline, drawn from 1,600 m below Shiba Park.
  - Guest fees: ¥5,000 all facilities, ¥3,000 per facility, gym area free.
  - Age 20+. Guests with tattoos may be partly restricted. Room robes, yukata and slippers are not allowed.
- Pool size per JTB (third party, undated): 25 × 5 × 1.4 m deep [jtb].
- Partial suspension, notice of 28 Sep 2026: poolside showers, eye-wash and gargle stations are out of use after Legionella above the standard value was found on 24 Sep 2026. Reopening date not set [leg].
- Bowling: 12 lanes, can be split into private 4-lane sections [top].
- Prince Shiba Park (2F level): promenade planted with cherry and roses, a photo spot looking up at Tokyo Tower [gdn]. Lawn garden on the tower side used for garden weddings [tabi].
- Chapel and shrine:
  - Forest Chapel: free-standing in the garden. 98 guests, 160 m², 8.6 m ceiling, 14 m aisle, pipe organ [fch].
  - Shinmei shrine hall: 56 guests, 2.9 m ceiling [shm].
  - Garden ceremony: 98 guests. Moves to the Forest Chapel if it rains [gdw].
- Lawson S: ATM, post box, stamps, copier/fax, free Wi-Fi [law].
- THE SHOP at the Park (1F): opened 1 Dec 2017. Sells original chocolates, coffee, herbal tea, wine and olive oil [pr17].

### 1.5 Rooms
| Type | m² | Beds W×L cm | Bath layout | View side | Floors | Src |
|---|---|---|---|---|---|---|
| Park Twin | 28.7 | 2× 115×203 | n/s | "Tokyo Tower Side" variant exists | 3–18 | [RRS][r32] |
| Corner King | 34.4 | 180×203 | view bath (tub by wide window) | corner | 3–18 | [r10][RRS] |
| Deluxe Twin + balcony | 38 | 2× 115×203 | n/s | "Tokyo Tower Side" variant exists | 3–18 | [RRS][r25] |
| Connecting Room + balcony (2 Deluxe Twins) | 76.0 | 4× 115×203; max 6 | n/s | n/s | 3–10 | [rm] |
| Universal Room + balcony | 38.0 | 2× 116×205, 48 cm high | tub rim 42 cm, handrail 55 cm, shower chair; bath door 820 mm | n/s | 3 | [ac2][rm] |
| Park Suite + balcony | 76.4 | n/s; max 4 | n/s | n/s | 11–18 | [rm] |
| Panoramic Twin + balcony | 38 | 2× 120×203 | n/s | n/s | 19–28 | [rm] |
| Panoramic King + balcony | 38 | 240×203 | n/s | n/s | 20–27 | [RRS] |
| Panoramic Corner King | 37.2 | n/s | view bath | corner | 19–28 | [rm][r10] |
| Panoramic Jr Suite King / Twin | 50.1 | 240×203 / 2× 120×203 | n/s | n/s | 22–27 / 19–28 | [RRS] |
| Prince Suite + balcony | 113.3 | 2× 120×203 | n/s | n/s | 19–28 | [rm] |
| Premium King + balcony | 38 | 200×203 | n/s | n/s | 29–31 | [rm] |
| Premium Corner King | 37.2 | 180×203 | view bath | Tokyo Tower side | 29–31 | [r10][RRS] |
| Princess Suite + balcony | 113.3 | n/s | n/s | Shiba Park below | 29–31 | [rm] |
| Panorama Suite | 118 | 240×203; max 5 | n/s | Mt Fuji on clear days | 32 | [rm] |
| Familia Suite A/B | 70 | 240×203; max 4 | n/s; has kitchen | n/s | 32 | [rm] |
| View Bath Suite | 70 | 240×203; max 3 | blower bath facing Tokyo | Tokyo | 32 | [rm] |
| Tower View Suite | 135 | 240×203 | bathroom has tower view | Tokyo Tower from living room, bedroom and bath | 32 | [r10][RRS] |
| Garden Suite A | 114.1 | max 6 | blower bath; Japanese-Western | n/s | 2 | [rm] |
| Garden Suite B | 91.8 | tatami + Western bedroom | n/s | n/s | 2 | [rm] |
| Garden Suite C | 76.0 | n/s | n/s | Zojoji / Shiba Park setting | 2 | [rm] |
| Garden Suite D | 72.4 | tatami | n/s | n/s | 2 | [rm] |

- Standard kit (Park Twin): TV, free wired and Wi-Fi internet, minibar, fridge, kettle, coffee maker, safe, humidifier/air purifier, iron, heated washlet, dryer, robe, nightgown, slippers, standard toiletry set [r32].
- Premium Club extras (corr.): BOSE Bluetooth speaker, universal adapter, portable charger, scale, bath pillow, body lotion, comb, mouthwash, nail file. No ReFa [r10].
- Premium Club perks: free lounge breakfast, shoe shine, 20% off laundry, 2 h free meeting room. For 3+ nights: hotel car and free-time check-in [r10][pcl].
- Lounge access: Premium Club Floor guests and Seibu Prince Global Rewards Diamond members. Ages 13+ only from cocktail time. The lounge reopened on 1 Oct 2025 after renovation [pcl2][pcl].
- Loan items (limited stock): trouser press, Blu-ray/DVD player, voltage converter, bed guard, shower chair, kimono hanger. Laptop ¥2,200/day [rent].

### 1.6 Access
| Station | Line | Exit | Walk | Src |
|---|---|---|---|---|
| Akabanebashi | Toei Oedo | Akabanebashi exit | 2 min | [wac] |
| Shibakoen | Toei Mita | A4 | 3 min | [wac] |
| Daimon | Toei Asakusa / Oedo | A6 | 9 min | [wac] |
| Hamamatsucho | JR / Tokyo Monorail | north exit | 12 min | [wac] |

- Walking route from Daimon or Hamamatsucho (corr.) [dmn][hmc]:
  1. Pass the red Daimon gate and cross the Zojoji intersection.
  2. Turn LEFT in front of the Sangedatsumon.
  3. After about 80 m, turn right beside the red Somon gate (hotel sign).
  4. Keep right at the Y-junction to the Southeast Entrance, the hotel entrance.
  The East Entrance (banquets) is on the left just before the rotary.
- Free shuttle from Hamamatsucho [sht][acc][wac][faq]:
  - Pickup: north exit, turn left, wait by the red post box.
  - About every 10 min, no reservations, 41 seats. Also serves Tokyo Prince Hotel. Timetable valid from 1 Aug 2026.
  - FAQ ride time: about 20 min.
- Onward rail times [acc]:
  - From Hamamatsucho: Tokyo 6 min, Akihabara 7, Ueno 9.
  - From Daimon: Higashi-Ginza 3, Asakusa 14, Oshiage 18.
  - From Akabanebashi: Roppongi 4.

**Airport bus and airport transfers**

| Airport | Mode | Time | Cost / notes | Src |
|---|---|---|---|---|
| Narita | Limousine bus | about 130 min | ¥3,600 adult / ¥1,800 child | [acc] |
| Haneda | Limousine bus | — | currently suspended | [acc] |
| Haneda | Monorail to Hamamatsucho + 12 min walk | about 25 min | ¥490 | [wac] |
| Haneda | Keikyu to Daimon + 9 min walk | about 40 min | ¥570 | [wac] |
| Haneda | Taxi via Shiba-koen ramp | about 15 min | about 16 km, about ¥6,000 | [wac] |
| Narita | Keisei Access Express to Daimon + 9 min walk | about 90 min | ¥1,330 | [wac] |
| Narita | Taxi | about 90 min | about ¥26,000 | [wac] |
| Narita | Car | about 80 min | — | [wac] |

- Limousine bus stop: "ザ・プリンスパークタワー東京", map point 35.655413, 139.747081 [lim].
  - Narita routes: Shiba/Shiodome/Toyosu/Takeshiba/Odaiba/Ariake [acc], and Hibiya/Ginza [lim].
- By car: Tokyo Station 4 km, about 10 min [wac]. Shuto Shiba-koen ramp about 1 km [jtb].

### 1.7 Policies
- **Check-in/out:**
  - Check-in 15:00, check-out 12:00. Premium Club guests and Diamond members check in at the 32F lounge [faq].
  - Late check-out: to 15:00 costs 1/3 of the room rate; to 18:00, 1/2; after 18:00, a full night.
  - Early check-in costs one extra night [faq].
- **Front desk:** 24 h. Languages: JP/EN/ZH/KO [got].
- **Payment:** cash, Visa, JCB, Mastercard, Amex, UnionPay, Alipay [got].
- **Breakfast:** see 1.3.
- **Children:**
  - Up to age 5 may share a bed, max 2 per room. Age 6+ pays the adult rate.
  - Minors staying alone need a parental consent form [faq].
- **Smoking:** 25F is the smoking-room floor. Smoking area on B2. All restaurant seats are non-smoking [faq].
- **Wi-Fi:** free in rooms, wired and wireless [r32].
- **Parking:**
  - ¥500 per 30 min (8:00–20:00); ¥100 per 60 min overnight.
  - Weekday same-day cap ¥6,000 until midnight. No cap on weekends or holidays.
  - Hotel guests ¥3,000 per night [prk].
  - Ticketless plate recognition [prk2].
- **Accessibility:** wheelchair-priority elevator [ac][ac2]. Front counter 105 cm high, luggage shelf 60 cm [ac1].

### 1.8 Group-tour handling
- **Coach parking:** not published. Car park is a flat type with a 2.1 m height limit. Large vehicles must contact the hotel in advance [faq].
- **Car park A:** just inside the Southeast Entrance, 60 m from the front desk.
  - A bay diagram of 350 × 409 × 266 cm sits under the general parking heading. Ask about accessible bays (corr.) [ac1].
  - Terra Charge EV chargers near bays A5–A6: 24 h, ¥500/h plus parking [tch].
- **Entrances:**
  - Southeast Entrance: hotel guests. East Entrance: banquets [dmn].
  - South main entrance: automatic door 158 cm wide, at the top of a gentle slope about 60 m long [ac1].
- **Elevators:** door 95 × 210 cm; car 167 cm wide × 204 cm deep; 1,600 kg [ac1].
- **Group check-in:** no group desk is published.
  - The Park floors (3–18F) are marketed for group travel, MICE and training; some rooms take 4 guests.
  - Garden Floor rooms take up to 6 [mg]. Connecting Rooms take up to 6 [rm].
  - Distance from the front desk: 12 m to the elevator, then 13 m to the Universal Room [ac2].
- **Baggage:** 1F Bell Desk, including before check-in. Parcels go to the front desk marked with guest name and arrival date; no food or drink [faq].
- **Banquet inventory (corr.):** 18 rooms [mice].
  - B2 (16 rooms):
    - Ballroom and Convention Hall: each 342–2,394 m², 7 spans, 9.9 m ceiling.
    - 7 mid rooms: 175–207 m², 4.0 m ceiling.
    - 7 small rooms: 100 m², 3.0 m ceiling.
  - 2F: Shinmei, 81 m².
  - 33F: Sky Banquet, 184 m², 3.0 m ceiling. Seats 100 at dinner, 120 buffet, 180 theatre [sky].
  - Ballroom per its own page: 2,394 m², 10 m ceiling, 3,600 theatre [bal].

### 1.9 Look notes (modelling and texturing)
- **Exterior facade:** material and colour n/s; see gaps. The central atrium runs B1–32F [wp].
- **1F lobby:**
  - Renovated by AB Concept; built by Takashimaya Space Create; fully reopened 1 Dec 2017 [pr17].
  - Separate arrival routes for hotel guests and banquet guests.
  - Reception styled like a home study. Park Lounge in wood grain. Entrance artwork on the theme 森の挨拶 [pr17].
  - Centrepiece "Forest Greeting" by Hirotoshi Sawada: hundreds of small hanging mirrors that act as a chandelier [hm].
- **Lobby Lounge:** curved bay-window seats facing a waterfall and Tokyo Tower [ll].
- **Club floors (29–31F):** theme "A Part of the Park": earth tones, wood floors, branch-like fixtures, a hanging chair like a tree swing. US$22.5M renovation by AB Concept (corr.: no named designers) [hm].
- **Panoramic floors (19–28F):** light-blue palette [hm]. Concept "Panoramic Horizon", with beds and desks turned to the windows. Renovated 30 Jun–15 Sep 2017 [pr17].
- **Club lounge:**
  - 2016 enlargement 146 → 184 m². The window zone facing Tokyo Tower became seating; the buffet moved to the centre [pr16].
  - Views: Tokyo Tower, Skytree and Rainbow Bridge. At night the tower lights tint the room [pcl].
- **33F Stellar Garden:** refitted on a warm-wood theme [sg25].
- **B1 and B2 details:**
  - Shibazakura: water channel through the room [shz].
  - Youmeiden: high ceiling [you].
  - Ballroom: Baccarat chandeliers [bal].

### 1.10 Gaps
- Facade material and colours: no official, architectural or press source. Use imagery and mark it unverified.
- Totals conflict:
  - Rooms: 603, 644 (MICE bands), 673 (opening) and "600+".
  - Height and storeys: 104.4 m with 33F+B3, or 104.5 m with 30+1. A 2005 magazine gives 99.9 m.
- Coach or large-bus parking, coach drop-off bay, group check-in desk and group baggage procedure: not published.
- Bath layout per room type (separate shower, double basin, WC separation): n/s. Floor plans exist only as images.
- Convention Hall shares the Ballroom's figures on the MICE page, which may be a copy error.
- Bowling fees, photo studio floor, spa layout, lobby atrium size and waterfall size or location: n/s.
- Airport bus and access conflicts:
  - The operator's Dec 2025 PDF marks the stop as from-airport only, while the stop page and FAQ list both directions.
  - Narita time: 130 min (access page) vs about 100 min / ¥3,200 (older wedding page).
- Onarimon Station walking time and Hamamatsucho exit details: n/s for this hotel.
- Hours conflicts: THE SHOP 11:00–19:00 on the facility page vs 10:00–19:00 in the notice. Boulangerie 10:00–19:00 vs 10:00–20:00.
- The FAQ's lounge breakfast price of ¥7,000 applies only to companions in the club lounge.

---

## §2 Osaka: Hotel New Otani Osaka (demo Osaka tower stay)

### 2.1 Building facts
- Address: 1-4-1 Shiromi, Chuo-ku, Osaka 540-8578. TEL 06-6941-1111, FAX 06-6941-9769 [oi][acc]. Address point 34.69059, 135.53223 [RRS].
- Opened 1 Sep 1986; 40th anniversary in Sep 2026 [pr40]. Height 74.5 m [RRS].
- Floors: 18 above ground. Guest rooms are on 5–17F. 18F, the top floor, holds dining and banquet rooms [ig]. Parking on B1–B2 [acc].
- Site (corr.): the hotel sits in one corner of a ~47,500 m² site, the largest of OBP's five superblocks. New Otani leases it in bulk from the owner, Sumitomo Life [wp].
- A pedestrian deck links the hotel to OBP Castle Tower, the Sumitomo Life OBP Shiromi Building and Sumitomo Life OBP Plaza (Izumi Hall). Several 1F entrances besides the main one [wp].
- Rooms (**conflict**):
  - The guide states 525. Its per-type table sums to 490 [ig].
  - Jalan: 525 = 522 Western + 2 Japanese + 1 Japanese-Western. Singles 111, doubles 85, twins 276, suites 50 [jal].
- 18 event venues, from 59 m² for 20 to 2,380 m² for 1,370 seated [oi].
- Universal Studios Japan alliance hotel; sells Studio Passes [en].
- Osaka Castle ≈685 m at 238–239° (WSW), so castle-view rooms face WSW [RRS][d].

### 2.2 Floor directory
| Floor | What is there | Hours | Src |
|---|---|---|---|
| 18F (top) | SAKURA (French, 66 seats, 2 private rooms); Teppan Grill Keyaki (35, 1 private room, castle view); Sky Lounge The Four Seasons (80); banquet Sunset 125 m² and Rainbow 88 m² (pairing inferred); universal toilet; diaper table by SAKURA | SAKURA 11:30–14:30, 17:00–21:00 (LO 20:00), closed Tue except holidays; Keyaki 11:30–14:30, 17:00–21:30 (LO 20:30); Four Seasons 12:00–16:00, 17:00–23:00 (LO 22:30) | [ig][sak][kei][4s][bfr][cw] |
| 15–17F | Executive floors with Gold Key service: Deluxe Twin; Executive Suite (17F) | — | [ig][dt][es][gk] |
| 11–13F | Executive Junior Suite | — | [ejs] |
| 9–14F | Superior Double | — | [sd] |
| 7–8F | Deluxe Connecting "Rikyu" (2 rooms) | — | [tw] |
| 5–14F | Superior floors: Superior Twin 5–14F; Superior Large Twin 5–13F | — | [ig][st][lt] |
| 6F | Pigeon Kids Park (childcare, book ahead); nursing room, diaper changing | Bookings weekdays 9–17 | [fsq] |
| 4F | Fitness club: indoor pool, BLACK GYM, athletic gym, aerobics studio, Finnish sauna + cold bath, jacuzzi, esthetic, massage, lounge; outdoor THE BOTANICAL POOL (summer); Amsu New Otani Clinic | Club wkdy 7:00–10:00 + 12:00–22:00, Sat/hol 7:00–20:00, last entry 1 h before close; pool season ended 23 Sep 2026 | [fsq][clb][cex][crx][pool][mn] |
| 3F | TAIKAN EN (Shanghai, 108); Sushi Kenzan (34); Kagairo (Japanese, 96); Fujio (sukiyaki/shabu, 38); Kushi & Wine Mikan (16); Yakiniku Jojoen Yugentei | TAIKAN EN 11:30–14:30, 17:00–21:30; Kenzan 11:30–14:00, 17:00–21:00; Kagairo 11:30–15:00, 17:00–22:00, closed Wed/Thu; Fujio 11:30–14:30, 17:00–21:30; Mikan dinner Thu–Sun/hol 17:00–22:00, lunch Sun; Yugentei n/s | [tk][ken][kag][fuj][mik][rl] |
| 2F | Banquet hall Hooh 2,380 m² + foyer ~73 m; 8 small banquet rooms; dedicated Hooh entrance; smoking areas (right of main entrance; by New York/Swan room) | — | [hoo][nk][fr] |
| 1F (lobby, atrium base) | All Day Dining SATSUKI (100, or 120 per guide); Atrium Lobby Lounge SATSUKI LOUNGE under skylight (110 JP / 88 EN); Main Bar CASTLE (70); Patisserie SATSUKI; business center | SATSUKI 7:00–22:00 (LO 21:30); lounge from 11:00; CASTLE 17:00–24:00, closed Mon/Tue; patisserie 10:00–20:00; business center 10:00–18:00 | [sat][ig][sl][sle][cas][ps][fen] |
| B1F | Kappo Isshin (14 counter + 8 table); Soba/Udon NAKAJIMA (33); 7 banquet rooms (Iris 216, Wisteria 216, Cattleya 193, Primrose 193, Cosmos 66, Lilac 66, Bellflower 66 m²) + 223 m² lobby; universal toilet; diaper table by elevators | Isshin lunch Sat/Sun 11:30–14:30, dinner 17:00–21:00, closed Mon; NAKAJIMA 11:00–14:00, closed Mon | [iss][nak][ig][bfr][cw] |
| B1–B2 | Car park, 500 spaces | ¥600 / 30 min | [acc][fen] |

The atrium is four storeys (1F–4F), lit by natural light, at the centre of the low-rise block behind the main entrance [wp][oi].

### 2.3 Dining
- All restaurant seats are non-smoking.
- SAKURA and Keyaki: no shorts, beach sandals or similar casual wear (corr.) [fr].
- Breakfast "Wellness Morning" buffet at SATSUKI 1F, 7:00–10:00 [bf]:
  - ¥5,520 adult, ¥3,910 club member, ¥3,105 ages 4–12. Service included.
  - Live omelet and Sanuki udon stations.
- Room-service breakfast 6:00–11:00, plus service charge [bf]:
  - Continental ¥3,000, Healthy ¥4,100, American/Japanese ¥4,800.
- Private rooms:
  - SAKURA: Le Château 6–12 and La Seine 6–18, ¥6,600 each [sak].
  - TAIKAN EN: 4 rooms for 6–20 [tk].
  - Keyaki: 1 room [kei].
- Fujio uses Kuroge Wagyu [fuj]. Mikan serves skewers and creative Osaka cuisine [mik].
- Tenant restaurants: Kenzan, Kagairo, Fujio, Yugentei [ken][kag][fuj][rl].
- Dietary requests (corr.): vegan, vegetarian and halal handled case by case; allergies handled as far as possible. Ask in advance [fr].
- Children's seating: only SATSUKI is stated to have high chairs and children's tableware [cw].

### 2.4 Bathing and leisure
- No onsen. 4F fitness club [fsq][clb][cex][crx][bg]:
  - Indoor pool 20 × 5.5 × 1.15 m; air 32°C, water 30°C [cex].
  - BLACK GYM (corr.): 18 Life Fitness machine types, 25 units (13 strength, 12 cardio) [bg].
  - Finnish sauna with cold bath, jacuzzi, members' lounge. Esthetic and massage cost extra [crx].
  - Guest fee ¥3,850, ¥2,750 for New Otani Club members, ¥1,650 in the 7:00–10:00 slot [fsq].
  - Age 18+, except special periods and the summer outdoor pool [clb].
  - Tennis: 2 outdoor omni-sand courts. Guests ¥1,650/h per person; junior-high age and up [cex].
- THE BOTANICAL POOL (4F outdoor) [pool]:
  - 2026 season: day pool 9:00–17:00 on set days from 4 Jul to 13 Sep. Night pool 18:30–22:00 from 4 Jul to 23 Sep, 18+ only, booking required.
  - Non-guest prices: day ¥10,000 weekday / ¥17,000 weekend; night ¥6,000–8,000.
  - Guest prices: day ¥5,000–6,000, night ¥4,000.
  - Day pool was guests-only 8–16 Aug. Closed now.
- PLAZA CHATEAU arcade: about 28 shops. New Otani Shop 10:00–18:00 sells original goods, wine and Osaka souvenirs. Arcade floor n/s [pc][s9].
- Weddings: Sky Chapel "Brilliant Eyes" (~70 guests); Art Chapel "Angel's Eye" (~100); in-hotel shrine (~35). Floors n/s [wc].
- Amsu New Otani Clinic, 4F [mn].

### 2.5 Rooms
| Type | m² | Beds | Bath layout | View side | Floors | Src |
|---|---|---|---|---|---|---|
| Superior Twin | 30 | 2× 120 cm wide; max 2 | n/s | Castle View (WSW [RRS]) or Town View | 5–14 | [st] |
| Superior Double | 30 | 180 cm | n/s | Castle (seen from bedroom window) or Town | 9–14 | [sd] |
| Superior Large Twin/Double | 40 | 1–4 guests | n/s | n/s | 5–13 | [ig][lt] |
| Single | 20–24 | n/s | n/s | n/s | n/s | [ig] |
| Deluxe Twin | 30 | 2× 120×200; max 2 | n/s | n/s | 15–17 | [dt] |
| Executive Junior Suite | 60 | 120×2 / 180; max 3 | double basin, overhead shower; separate living room | Osaka Castle keep | 11–13 | [ejs] |
| Executive Suite | 70 | 120 cm; max 2 | n/s | Osaka Castle | 17 | [es] |
| Executive Heritage Suite | 110 (~80 + 30) | max 6 | n/s | faces castle keep head-on | n/s | [pr40] |
| Deluxe Connecting "Rikyu" | 90 | 6 beds; 6–7 guests | hinoki bath (hotel's first) | n/s | 7–8 | [tw] |

- Counts by type (hotel guide) [ig]:
  - Superior Twin/Double 30 m² ×228; Superior Large 40 m² ×63; Single ×92; Superior Junior Suite 60 m² ×16.
  - Executive Twin/Double ×46; Executive Large ×17; Luxury Junior Suite ×10; Suites 70–244 m² ×18.
- Executive Junior Suite: refitted in a Sen no Rikyu wabi-sabi design [pr62]; on sale from 4 Feb 2026 [jal].
- Executive Heritage Suite (corr.) [pr40]:
  - A fan-shaped main room of about 80 m², joined by an inner door to a 30 m² second bedroom.
  - Design draws on the Toyotomi Hideyoshi era. Stays began 2 Jul 2026.
- Rikyu: stays began 13 Jul 2024 [tw]. This name replaces "Family Studio Deluxe" in RRS. "Superior Large Twin" replaces "Superior Quad".
- Standard kit [st]:
  - Fixed: high-speed internet, 2 phone lines, fridge, dryer, pyjamas.
  - On loan: iron, humidifier, buckwheat pillow, Blu-ray/DVD player.
- Gold Key (Executive floors and suites) [gk]:
  - Welcome drink 8:30–20:30; morning coffee or tea 6:00–10:00.
  - Free fitness 7:00–10:00; one Four Seasons drink 17:00–19:00.
  - 24 h shoe shine; 10% off at selected restaurants.

### 2.6 Access
| Station | Line | Exit | Walk | Src |
|---|---|---|---|---|
| Osakajokoen | JR Osaka Loop Line | n/s | ~3 min | [wac] |
| Osaka Business Park (N21) | Osaka Metro Nagahori Tsurumi-ryokuchi | Exit 1 | ~3 min | [wac] |
| Kyobashi | several lines | n/s | ~8 min | [wac] |

**Airport bus and airport transfers**

- KIX by hotel Osaka Bus (corr.) [bus]:

  | Direction | Stop | Run 1 | Run 2 |
  |---|---|---|---|
  | To KIX | Leaves hotel | 8:10 | 10:10 |
  | To KIX | DOTON PLAZA | 8:35 | 10:35 |
  | To KIX | KIX T1 | 9:35 | 11:35 |
  | To KIX | KIX T2 | 9:46 | 11:46 |
  | From KIX | Leaves T2 | 15:17 | 17:07 |
  | From KIX | Leaves T1 | 15:30 | 17:20 |
  | From KIX | Arrives hotel | 16:44 | 18:34 |

  Adult ¥1,800, child ¥900, about 100 min. Tickets at the front desk or on board by IC card.
- KIX by rail (corr.), door-to-door totals [acc]:
  - Haruka to Tennoji + Loop Line: about 60 min.
  - Nankai rapi:t to Shin-Imamiya + Loop Line: about 70 min.
  - Kanku Rapid: about 75 min.
  - Taxi: 54.3 km, about 60 min.
- Itami: limousine bus from stop 9 to Harbis Osaka or Osaka Marubiru, then the JR Loop Line (outer loop) to Osakajokoen. About 50 min, ¥820 [acc].
- Other Osaka Bus routes [bus]:
  - To Kyoto: leaves 8:55; Kyoto Station Hachijo 10:35, Kiyomizu-Gojo 10:50, Gion-Shijo 10:55. ¥1,100 / ¥1,300. No advance booking.
  - To Osaka Station: leaves 7:30, ¥210 adult. Returns 16:45.
- By car [acc]:
  - Hanshin Expwy Higashi-Osaka Line: Hoenzaka ramp (eastbound) 1.6 km, ~5 min; Morinomiya ramp (westbound) 2.6 km, ~8 min.
  - Taxi fares: Umeda ¥2,600 (15 min), Namba ¥2,800 (20 min), Shin-Osaka ¥4,500 (25 min), USJ ¥7,000 (25 min).

### 2.7 Policies
- **Check-in/out** [fsq]:
  - Check-in 15:00, check-out 12:00 (varies by plan).
  - Front-desk check-in until 24:00; arrivals after that must notify the hotel.
  - Late check-out is possible for a fee.
- **Cancellation:** 10% two days before, 20% the day before, 80% on the day, 100% no-show [fsq].
- **Breakfast:** see 2.3.
- **Children** [fsq][fr]:
  - Up to elementary age: free when sharing a bed (up to the number of adults), no breakfast.
  - Extra bed ¥7,590. Cot for infants under 1.
  - Under-18s need a guardian consent form.
  - SAKURA, Keyaki and Mikan admit elementary age and up. Younger children may use the SAKURA and Keyaki private rooms.
- **Smoking:**
  - Smoking or non-smoking rooms on request only, not guaranteed. Heated and e-cigarettes banned in non-smoking rooms [fsq].
  - Smoking areas on 2F [fr].
- **Wi-Fi:** free [fsq].
- **Pets:** not allowed, no boarding [fsq].
- **Parking:** ¥600 per 30 min. Staying guests ¥2,000 per night (an older wedding page shows ¥1,200) [fen][acc].
- **Accessibility** [bfr]:
  - Step-free main entrance. Wheelchair-friendly elevator buttons and doors.
  - Barrier-free rooms: wide doors, step-free bath with sliding door, low basin, grab bars, powered reclining bed.
  - Universal toilets on B1F and 18F.
  - Free wheelchair loan in limited numbers; book ahead. Magnetic writing boards and a light-signal alert device for hearing-impaired guests.
  - Restaurant wheelchair access n/s (corr.).

### 2.8 Group-tour handling
- **Coach parking or drop-off:** not published. Car park B1–B2 has 500 spaces [acc]. Hooh has its own 2F entrance and dedicated parking [hoo].
- **Group check-in:** not published.
  - Banquet/MICE sales: +81-6-6949-3223 [ban].
  - Room reservations: 06-6949-3232 [fsq].
- **Baggage:** Bell Captain Desk holds bags before check-in and after check-out. Bags shipped ahead must be prepaid to the front desk, marked with check-in date and guest name. No valuables, dangerous goods or cash-on-delivery [fsq].
- **Group dining** [hoo]:
  - Hooh seats 1,370 at dinner; 3,000 standing; 1,600 school; 3,100 theatre.
  - Splits by soundproof walls into I 590, II 450, III 610 and S 675 m².
- **Dietary:** see 2.3 (corr.) [fr][cw].
- **No group cancellation table.**

### 2.9 Look notes (modelling and texturing)
- **Atrium:** four storeys (1F–4F), natural light, skylight over SATSUKI LOUNGE [wp][oi][sle].
- **Hooh:**
  - Foyer about 73 m long [nk]. The lobby space doubles for art exhibitions [hoo].
  - Soundproof sliding partition walls [hoo].
- **Chapels** [wc]:
  - Sky Chapel: stained glass, large windows over Osaka Castle Park.
  - Angel's Eye: murals by copperplate artist Yoko Yamamoto.
- **Suites:**
  - Executive Junior Suite: Sen no Rikyu wabi-sabi theme [pr62].
  - Heritage Suite: fan-shaped main room, Hideyoshi-era motifs [pr40].
  - Rikyu: hinoki bath [tw].
- **Outdoor pool (4F):** faces Osaka Castle [fp] and the greenery of Castle Park [pool].
- **Facade:** cladding material and colour n/s; see gaps.

### 2.10 Gaps
- Not found:
  - Facade material and colour.
  - Architect, contractor, structure type, GFA.
  - Number of basement levels (only B1–B2 parking is confirmed).
- Official floor map and the facility, pool and room-list pages returned server errors, so floor-by-floor coverage is partial.
- Floors n/s:
  - PLAZA CHATEAU, beauty salon, both chapels, shrine.
  - Tennis courts (likely the 4F podium roof, unverified).
  - Front desk (1F likely).
- Main entrance level unclear: 1F per the EN FAQ, but the smoking areas are described relative to it on 2F. There may be entrances at deck and street level.
- Outdoor pool dimensions and atrium height or plan size: n/s.
- Coach parking, tour-bus drop-off, group check-in procedure and group cancellation terms: not published.
- Hours not found: Yakiniku Jojoen Yugentei (ikyu gives about 11:30–15:00 / 17:00–21:30 and 141 seats, unverified). Closed days for TAIKAN EN, Kenzan, Fujio.
- Source conflicts:
  - Rooms: 525 stated vs 490 by type.
  - Seats: SATSUKI 100/120; SATSUKI LOUNGE 110/88.
  - Guest parking: ¥2,000 vs ¥1,200.
- Accessible room count, floors and door widths: n/s.
- Heritage Suite floor: n/s.
- Hotel bus boarding point: n/s. The standard KATE limousine does not appear to stop at the hotel.
- Walking route from JR Osakajokoen: not documented beyond "3 min".
- Views: only Keyaki states an Osaka Castle view among the 18F venues.

---

## §3 Kawaguchiko: Kozantei Ubuya (demo Kawaguchiko stay, every room facing Mt Fuji)

### 3.1 Building facts
- **Operator:** Ubuya Co., Ltd. (株式会社うぶや), renamed from 株式会社湖山亭うぶや in 2019 [co].
- **History** [co]:
  - 1945: Sanyagasaki campground. 1948: Sanyagasaki Hotel.
  - 1986: renamed Kozantei Ubuya; Ai-kan (藍館) rebuilt.
  - 1993: Akane-kan (茜館) rebuilt.
  - 2000: bath building Midori (碧).
  - 2009: Ai-kan rebuilt again.
- **Wings:** current notices say West Building (西館) and East Building (東館). How these map to Ai-kan and Akane-kan is n/s [ev973].
- **Rooms:** 51 per Jalan, JTB, Yahoo and Tabelog [jal][jtb]. **Conflict:** Oyster says 52 rooms on 4 floors [oys]. The official site gives no count.
- **Floors:**
  - Room 501 is on the top floor, with a Fuji-facing terrace [rm]. A 2016 article puts the top-grade suite on 5F [ic16]. So at least 5 floors [d].
  - Wheelchair elevator; count n/s [jtb].
- **Staff:** about 90 (55 men, 35 women; undated) [pref].
- **Location:**
  - Asakawa 10; address point 35.51326, 138.76854 [RRS].
  - Fuji summit 17.35 km at 192° (SSW), across the lake [RRS].
  - Driving landmark: Kawaguchiko Ohashi bridge [jtb]. About 390 m ENE of the bridge midpoint, on the north shore of the eastern basin [d].
- **Closures and works:**
  - Whole inn closed 13–17 Jan 2025 [ev931].
  - Norovirus suspension 21–23 Mar 2025; dining reopened at dinner on 26 Mar 2025 [ev954].
  - Bookings for 1 Sep–30 Nov 2025 suspended for renovation; scope unpublished [ev960].
  - West Building AC units replaced 6–20 Apr 2026, so no heating or cooling in West rooms during works [ev973].
  - Operating as of Sep 2026 [exp]. No regular closing days (as of 16 Oct 2024) [yk].
- **Award (corr.):** 第48回 "100 Best Hotels and Ryokan Chosen by Professionals", overall and hospitality categories. That is the 2023 edition, announced 11 Dec 2022 [ic24][ryo].

### 3.2 Floor directory
| Floor | What is there | Hours | Src |
|---|---|---|---|
| 5F (top) | Room 501 (top-floor terrace, wood deck, open-air bath); women's baths 4–5F (2016 article) | Baths 15:00–24:00 / 5:00–10:00 | [rm][ic16][on] |
| 4F | Room 401 Special Room with tea room [d from room no.]; women's baths (2016: 4–5F; 2026 review: 3–4F) | as above | [rm][ic16][4t] |
| 3F | Room 301 Deluxe [d from room no.]; men's baths (2–3F); women's baths 3F (2026 review) | as above; sauna 15:00–21:00 | [rm][ic16][4t][on] |
| 2F | Glass-walled main dining room (2016 name "Dining Hyakkei"); lounge 一会; smoking room (Relux: 24 h); men's baths | Dinner seatings 18:00 / 19:00 | [4t][ic16][pref][rlx][jtb] |
| 1F | Ubuya shrine 木花の社 (Konohanasakuya-hime); Japanese restaurant with Sharaku and Utamaro ukiyo-e | — | [sty][4t] |
| Floor n/s | Lobby and front desk (sofas facing Japanese garden); dining venues 富士 and 祝; gift shop; self photo studio; library salon; relaxation spot; table-tennis lounge; massage chairs | — | [t101][qa][sty][exp][yk] |

Bath floors **conflict:** 2016 articles give men 2–3F, women 4–5F. A May 2026 review gives men 2F+3F, women 3F+4F. Floor numbering may differ between the bath building and the guest wings.

### 3.3 Dining
- Venues: dinner and breakfast are both served at 食事処「富士」 and 「祝」 [qa].
- Dinner: two seatings at 18:00 or 19:00, first come first served [jtb]. Last start 19:00. Late guests get no meal and no refund [qa].
- Current dinners: only the buffet and the house tsuyu-shabu course [cui].
  - Tsuyu-shabu: house tsuyu-dashi instead of ponzu, white leek, noodles to finish [cui].
  - The tempura course (Fuji-view counter + tables) and the meat kaiseki (wagyu steak on a ceramic plate) are described but not served [cui].
- Buffet (corr.): live kitchen where chefs finish dishes in front of guests. The wagyu meat-sushi upgrade belongs to the kaiseki course, not the buffet [pdf].
- Breakfast: buffet per a JTB plan whose campaign ended 30 Jun 2023 [tour]. Breakfast hours: n/s.
- No lunch [qa].
- Private rooms for 2, 4 or 6 [tab].
- 2016: the 2F dining room was "Dining Hyakkei"; some plans guaranteed a window seat [ic16].
- Allergies: low-allergen menus for egg, milk, wheat and soy. 7 days' notice. Not guaranteed allergen-free [qa].
- Celebration cakes (whole or Fuji-shaped), flowers, messages: 3 days' notice [qa].

### 3.4 Bathing and leisure
- **Fuji no Yu (富士のゆ):** the only onsen bath. In-room baths are not onsen [qa].
  - Spring: calcium-sodium chloride-sulfate, weakly alkaline, hypotonic, high temperature [on].
  - Diluted, heated and recirculated/filtered; not free-flowing [jal].
- **Bath types:** large indoor bath, open-air bath, reclining bath (寝湯), lukewarm seated bath (座湯), combined circuit bath (めぐり湯), sauna [on].
  - Sauna: Finnish-style herbal [ic16].
  - 2016: 6 bath types per side, including jacuzzi [ic16].
- **Layout:** 1 indoor + 1 open-air bath per sex; open-air baths swap by time; no private bath [jal]. 2016: two-storey baths with vaulted ceiling and fog-free windows facing lake and Fuji [t101].
- **Hours:** 15:00–24:00 and 5:00–10:00. Sauna 15:00–21:00 [on].
- Chilled Fuji spring water, filtered through lava, to drink at the baths [on].
- **Rules:**
  - Bath tax ¥150 per adult per night [yh].
  - Tattoos: barred in principle; allowed if covered by two 10 × 10 cm stickers from the front desk [enqa].
  - Children may use the opposite-sex bath up to preschool age. Baby-changing table in the changing room [qa].
  - No day-use bathing [qa].
- **Lounge (corr.):** window-filling Fuji and lake views. お茶しながら富士 is a caption, not its name; the prefecture's profile calls it 談話ラウンジ「一会」 [sty][pref]. 2F per reviews [4t]. Early arrivals may use it before check-in [exp].
- **Other facilities:**
  - Massage chairs facing Fuji, any time during the stay [sty]. Paid massage [jal].
  - Table-tennis lounge: mini table, ping-pong hockey, wall-rally ranking (enter at the front desk) [sty][exp].
  - Self photo studio with professional equipment and Fuji costumes [exp].
  - Gift shop [sty]. Library salon, relaxation spot [yk].

### 3.5 Rooms
| Type | m² | Beds | Bath layout | View side | Floors | Src |
|---|---|---|---|---|---|---|
| 501 (top-floor suite) | 113 | twin 120×200; 2–6 guests | private open-air bath (not onsen) | Fuji (SSW) from top-floor terrace | 5 [d] | [RRS][rm][ic16] |
| 401 Special + tea room | 98 | 2–6 | open-air bath; tea room + indoor tea garden | Fuji beyond tea garden | 4 [d] | [RRS][rm] |
| Special Room | 98 | 2–6 | open-air bath | Fuji | n/s | [RRS][rm] |
| Deluxe 301 | 98 | 2–6 | open-air bath | Fuji | 3 [d] | [RRS][rm] |
| Deluxe | 90 | 2–6 | open-air bath | Fuji | n/s | [RRS][rm] |
| Superior | 71 | 2–6 | open-air bath | Fuji | n/s | [RRS][rm] |
| Standard | 59 | 2–4 | open-air bath | Fuji | n/s | [RRS][rm] |
| Japanese room + next room | 56 | 2–6 | n/s | Fuji | n/s | [RRS][rm] |
| Japanese room (beds) | 46 | 2–4 | n/s | Fuji | n/s | [RRS][rm] |

- 9 room types, all in pure Japanese style, each with a Fuji and lake view [ic24]. Every room views Fuji [RRS]. Rooms 501, 401 and 301 can only be booked online [rm].
- **Kit:**
  - Down duvet, yukata, toothbrush, dryer, bidet toilet, empty fridge. No pyjamas or bathrobes [jal].
  - Flat TV, minibar, safe, kettle with tea set, free Wi-Fi, floor-to-ceiling windows [oys].
- **House wear (corr.):** original samue (2016). Not stated as adults-only; yukata are still listed [ic16][jal]. Child samue from 90 cm [qa].

### 3.6 Access
| Station / stop | Line | Exit | Time | Src |
|---|---|---|---|---|
| Kawaguchiko | Fujikyu Line terminus (via JR Chuo Line to Otsuki) | n/s | taxi ~10 min; 1,650 m | [acc][tab][yha] |
| 湖山亭うぶや前 (bus stop) | Fujikyu bus from Kawaguchiko Stn, toward Kofu | at door | ~11 min ride, 0 min walk | [jtb] |

- **Inn shuttle (corr.)** [qa]:
  - Pickup from Kawaguchiko Station 15:00–18:00: phone on arrival. No set times; nearby sights can also be served. Fee n/s.
  - English pages conflict: 14:30–18:00 [enacc].
  - Drop-off 8:30–11:00 every 30 min, to Kawaguchiko Station or an unnamed museum [qa].
- **Highway bus:**
  - Busta Shinjuku → Kawaguchiko: ~1 h 45, ¥2,200. About every 10 min in the morning, about hourly in the afternoon (Feb 2026) [gl].
  - Shinjuku West Exit: ~1 h 50; booking required [yha].
- **Airport bus:** Haneda → Kawaguchiko Station ~2 h 10, booking required [yha]. Narita: n/s.
- **From Nagoya or Osaka:** Shinkansen to Mishima, then Fujikyu bus [yha].
- **By car:**
  - Kawaguchiko IC is about 3.5 km away [acc].
  - JTB route: R139 ~2 km (6 min), then the Kawaguchiko-Fuji prefectural road ~2 km (7 min) [jtb].
- **Parking:** 50 spaces, free, first come [ich][yk]. **Conflict:** Yahoo says 40 outdoor [yha].

### 3.7 Policies
- **Check-in/out:** check-in 15:00–18:00 (phone if later); check-out 11:00 [qa]. Some older sources give 14:00.
- **Cancellation:** 10% from 21 to 4 days before; 100% from 3 days before. The plan's own terms take precedence [qa].
- **Breakfast:** buffet; hours n/s (see 3.3).
- **Children:** ages 0–2 free with no meals or bedding; ages 3–6 pay 50%; elementary pupils 70% [qa].
- **Smoking:** the whole property is non-smoking, including balconies and dining. Smoking room only [qa]; on 2F, open 24 h per Relux [rlx].
- **Wi-Fi:** free in all rooms [oys]. Internet listed [yk].
- **Pets:** no. Day-use bathing: no [qa].
- **Cards:** VISA, JCB, AMEX, Diners, UC, Nicos [jtb]. OTAs add Mastercard.
- **Booking (corr.):** no explicit best-rate guarantee. A 2024 notice warns about unauthorised overseas booking sites [ev934].
- **Accessibility:**
  - JTB lists: wheelchair toilet, wheelchair parking, tactile paving, braille signs, emergency voice-call device, sign-language and written help, alarm-lamp rooms [jtb].
  - 3 wheelchairs on loan [qa]. Auto doors, AED, English support [yk].
  - **Conflict:** Yahoo marks barrier-free as not available [yh].

### 3.8 Group-tour handling
- **No banquet rooms** for group dining [enqa]. Parties of 10 or more are seated across several venues [jtb]. Tabelog lists exclusive hire for 50+; probably outdated (last edited 2024) [tab].
- **Coach parking:** n/s. Car parking 50 free (conflict: 40) [ich][yha].
- **Group check-in:** procedure n/s. Check-in on lobby sofas facing the Japanese garden, with matcha and sweets (2016) [t101].
- **Baggage:** n/s.
- **Arrival:** the station shuttle runs on call, with no fixed times [qa].

### 3.9 Look notes (modelling and texturing)
- **Interiors:** wooden-slat sliding doors, shoji paper, wood floors, tatami areas, black-wood furniture, neutral palette, sofas along floor-to-ceiling windows [oys].
- **Lobby:** windows onto a Japanese garden [t101][oys].
- **Top-floor suite:** wide wooden deck and an open-air bath facing Fuji [ic16][rm].
- **Baths:** two-storey vaulted ceiling, fog-free windows to lake and Fuji [t101].
- **Dining:** 2F dining room is glass-walled. The 1F Japanese restaurant has Sharaku and Utamaro ukiyo-e [4t].
- **Orientation:** all guest rooms face Fuji to the SSW across the lake [RRS].
- **Facade and structure:** n/s; see gaps.

### 3.10 Gaps
- Floors:
  - Floor count per wing and for the Midori bath building: n/s. No official floor map. Oyster says 4 floors; room 501 suggests 5.
  - How West and East map to Ai-kan and Akane-kan: n/s.
  - Floors n/s for: lobby, gift shop, photo studio, library salon, table-tennis lounge, and the 富士 and 祝 dining venues.
- Baths: floors conflict (2016 vs 2026). Swap times n/s.
- Breakfast hours: n/s. "Dining Hyakkei" may have been renamed since 2016.
- Rooms:
  - Count per type and the floor of each type (except 301/401/501 by number): n/s.
  - Room-bath materials and tatami counts: n/s. Trip101 (2016) gives 10 tatami for a standard washitsu.
  - Whether some rooms still sleep on futons: unclear. The official list shows twin beds in every type.
- Facade, structure, architect, contractor: n/s.
- Parking: coach parking n/s. Car counts conflict (50/40). Oyster's "covered lot" is unverified.
- Group handling: no banquet rooms (official) vs 50+ exclusive hire (Tabelog).
- Shuttle: museum not named; hours 14:30 vs 15:00.
- Outcome of the Sep–Nov 2025 renovation: n/s.
- Accessibility conflicts. No dedicated accessible room found.
- Check-in time: 15:00 official vs 14:00 in older sources.
- Kaiseki is described but not served.

---

## §4 Hakone: Ryuguden (primary) and Hakone Ashinoko Hanaori (alternative) (demo Lake Ashi ryokan stay)

### 4A Ryuguden (Prince Hotels, Motohakone 139)

#### 4A.1 Building facts
- **Location:** address point 35.21181, 139.00996. Fuji 30.5 km at 303° [RRS].
- **Lodging:** in the Annex (別館), 24 rooms on 1F–3F [r01][r02][r03][p17][engr].
  - The Annex opened in 1990, per 2018 travel media; room URLs still use /room/shinkan/ [aso].
- **Main Hall (本館) history:**
  - 1 Mar 1938: built as the Hamanako Hotel by Tobishima-gumi (Shigeru Tobishima) [tk][p17]. All rooms Western with beds; French cuisine. Closed after about 1.5 years because of the war [hist].
  - Moved to Lake Ashi: about 5 months to dismantle; freight car to Atami; mountain roads; over a year to rebuild with miyadaiku (temple carpenters). Exterior kept; all rooms converted to tatami [hist].
  - 1 Jul 1957: opened as the Hakone Prince Hotel annex "Ryuguden" [p17][hist].
  - 1974–76: major renovation [aso].
  - Overnight stays ended in 2011 [hist]; fully out of use from 2012 [p17].
  - From Nov 2016: seismic strengthening and renewal works. Registration recommended Mar 2017; Registered Tangible Cultural Property from Jul 2017 [tk].
  - 22 Jul 2017: reopened as the day-use spa 絶景日帰り温泉 龍宮殿本館 [p17].
- **Design:** modelled on the Byodo-in Phoenix Hall; keyaki and hinoki [hist].
- **Notable guests:** 1957 Nehru and Adenauer; 1964 the then Crown Prince and Princess; 2003 Japan–UK summit [hist].
- **Annex equipment works:** 31 Aug–18 Sep 2026, 11:00–14:00; completed [kj].

#### 4A.2 Floor directory
| Building / floor | What is there | Hours | Src |
|---|---|---|---|
| Annex 3F | Lakeside twin rooms; special rooms (spread over 1–3F) | — | [r03][r02] |
| Annex 2F | Guest restaurant お食事処「鳳凰の間」 (staying guests only); connecting passage to Main Hall | Dinner 18:00 / 19:00; breakfast 8:00 / 8:30 / 9:00 | [enr][hou][bp][fac] |
| Annex 1–2F | Lakeside washitsu rooms (EN site: 1–3F; conflict) | — | [r01][engr] |
| Annex 1F | Public baths 明神 / 明星: indoor only, karesansui view | 14:00–01:00 / 05:00–10:00 | [on][bp][fac][enb] |
| Main Hall 1F | Day-spa baths: 夢殿 (men) / 胡蝶 (women); lockers 102 men / 108 women | Overnight guests 06:00–20:00, free (06:00–08:00 guests only); day visitors from 09:00 wkdy / 08:00 wknd, last entry 19:00 | [on][ho][bp] |
| Main Hall, floor n/s | Restaurant 富士 (tatami hall, chair seating); lounges 聚楽 (mixed) and 夕霧 (women only); relaxation room; private rooms 紅梅, 初音, 若菜, 夕月; massage room わくわく | 富士 lunch 11:30–15:00 (LO 14:30) from 1 Jul 2026; massage closed Wed | [fj26][fjt][lk][ms] |
| Building and floor n/s | Banquet: 鳳凰の間 138 jo; 2 mid halls of 32.5 jo; meeting room 117 m²; karaoke 橘; shop; Annex-guest lounge (former bar, 2017) | Karaoke 14:00–22:00; shop 08:00–20:00 | [ban][fac][p17] |

#### 4A.3 Dining
- **Guest restaurant 鳳凰の間 (Annex 2F)** [hou][enr][bp]:
  - Chair seating, no private rooms, non-smoking.
  - Yukata and slippers allowed. Guests cannot choose their table area.
- **Dinner** (choose time at check-in) [hou]:
  - 胡蝶懐石 (standard): order by noon on the day.
  - 富士懐石 (premium): order 5 days ahead.
- **Breakfast:** 湖畔の朝ごはん, Japanese set. Choose time after dinner [hou][bp].
- **Drinks:** 15% service charge. 30+ alcoholic drinks, including Hakone and Odawara sake. No all-you-can-drink option (corr.) [hou].
- **Allergies:** 8 items only (shrimp, crab, walnut, wheat, buckwheat, egg, milk, peanut). Notify by the day before check-in [bp].
- **Main Hall 富士:** group lunch for 10+, 11:30–13:00, book 10 days ahead [fj26].

#### 4A.4 Bathing and leisure
- **Annex baths (1F)** [on][bp][fac][enb]:
  - 1 indoor bath per side. No open-air bath, sauna or cold bath.
  - Showers: 10 men's, 7 women's. Both baths look onto a karesansui garden.
  - The men's and women's sides swap regularly, so names are not tied to one sex.
  - No phones or photos. No tattoos or swimwear.
- **Main Hall baths (1F)** [on][st]:
  - 夢殿 (men): 1 indoor bath, 2 open-air baths (one roofed and semi-open), cold bath, Finnish sauna, 9 showers.
  - 胡蝶 (women): 1 indoor bath, 1 open-air bath, steam sauna, 18 showers.
  - A roofless men's open-air bath opened Apr 2022. Using the roofed one on rainy days is a suggestion only (corr.).
- **Route:** Annex guests reach the Main Hall baths through the Annex 2F passage. Bring your own towel and locker key [fac].
- **Spring:** Takokawa Onsen (蛸川温泉), first tapped 1987, the newest of Hakone's 17 springs [on].
  - Type **conflict:** 単純温泉 [on] vs calcium-sodium sulfate/chloride [ho][enb].
- **Special-room tub:** in-room onsen tub, 1,450 × 1,200 × 550 mm, usable at any time [on].
- **Day-visitor fees** (weekday / weekend-holiday) [ho]:
  - Adult ¥2,300 / ¥2,600.
  - Elementary ¥1,300 / ¥1,600.
  - Preschool, age 3+: ¥700 / ¥1,000.
- **Bath rules:** no mixed bathing from age 7 or 120 cm. Children under 3 or not yet toilet-trained may not use the Main Hall baths [ho].
- **Private rooms** (3 h blocks; no bath, no futons; weekday / weekend price) [lk]:
  - 紅梅 and 初音: 8 jo, 4 people, ¥7,000 / ¥7,700.
  - 若菜: 10 jo, 6 people, ¥8,000 / ¥8,800.
  - 夕月: 8 + 12 jo, 12 people, ¥15,000 / ¥16,500.
- **Massage わくわく:** closed Wednesdays. Extra closures on 17 Jul, 28 Nov and 19 Dec 2026 [ms].
- **Karaoke 橘:** ¥7,000/h per room, up to 10 people [fac].
- **Shop:** yosegi marquetry and souvenirs [fac].

#### 4A.5 Rooms
| Type | m² | Beds | Bath layout | View side | Floors | Src |
|---|---|---|---|---|---|---|
| Lakeside washitsu | 65 (12.5-jo main room + 7-jo veranda) | futons 97×194 ×5; max 5 | n/s | lake (some 1F rooms partly blocked by trees) | 1–2 (EN: 1–3) | [r01][engr] |
| Lakeside twin | 65 | 2× 115×203, 27.5 cm high, airweave; max 2 | n/s | lake | 3 | [r03] |
| Special room with in-room onsen (3 rooms) | 95 (13 jo + 8-jo next room) | futons 97×194; max 5 | in-room onsen tub 1,450×1,200×550 mm | Mt Fuji + lake from every room | 1–3 | [r02][on][RRS] |

- Fuji lies at 303° (WNW) [RRS]. The EN site says all 24 rooms view the lake and Fuji. The JP pages promise a Fuji view only for the special rooms [engr][r02].
- **Kit, all types:** fridge (stocked), heated bidet, TV (terrestrial, BS1, BS2), free high-speed internet, capsule coffee maker, yukata, toothbrush, hairbrush, dryer, skincare sets. No safe or kettle listed [r01].
- **Special rooms:** Iugen toiletries, humidifier/air purifier [r02].
- Guests cannot request a specific room [r01].

#### 4A.6 Access
| Stop | Line | Walk | Src |
|---|---|---|---|
| 龍宮殿前 | Izu Hakone Bus toward Hakone-en, from Hakone-Yumoto or Odawara (~1 h) | 1 min | [hn887] |
| 絶景日帰り温泉 龍宮殿本館 | Free Ashinoko loop bus, hourly 11:00–19:00; boards at Moto-Hakone opposite the Izuhakone Railway info office (corr.) | 1 min | [acc][map] |
| Hakone-en | Odakyu highway bus from Shinjuku Expressway Bus Terminal (~2 h 25, ¥2,200); also Komagatake Ropeway | 5 min | [acc] |

- **Hotel shuttle** from Odawara Station West Exit: free, overnight guests only, ~50 min, booking required [acc].
  - From 1 Sep 2025: leaves the hotel 10:30, 13:00, 15:15; leaves Odawara 11:45, 14:00, 16:15 [sb].
  - Shared with The Prince Hakone Lake Ashinoko. Web booking opens 6 months ahead and closes at noon 2 days before. Max 4 per booking. Guests carry their own baggage [map].
- **Airport bus:** n/s.
- **Taxi and car:** taxi from Odawara Station ~40 min. Car from Tomei Atsugi IC ~52 km, ~60 min (2017 data) [p17].
- **Nearby transport** [acc]:
  - Komagatake Ropeway: 1,783 m, ~7 min to the summit.
  - Togendai: ~15 min by car.
  - Hakone-en port: 10 min walk.
  - Loop bus to Moto-Hakone port (pirate ships): ~20 min.
- **Hakone Freepass:**
  - Ryuguden benefit: 10% off, scope n/s (corr.) [hn887].
  - Coverage omits Izu Hakone Bus and the Komagatake Ropeway. From Shinjuku: 2 days ¥7,100, 3 days ¥7,500 [ofp].
- **Walks from the ryokan:** The Prince Hakone Lake Ashinoko 5 min; Hakone-en ~5 min; Kuzuryu Shrine and Hakuryu Shrine ~20 min each [acc].
- **NINJA BUS "Water Spider":** amphibious bus from beside the Hakone-en Aquarium [nb].
  - Normal season: adult ¥2,500, hotel guests ¥2,000. Busy season: ¥2,700 / ¥2,200.
  - Runs 9:30–17:00; last departure 16:20.

#### 4A.7 Policies
- **Check-in/out:** from 1 Apr 2026, check-in 15:00 and check-out 11:00 (was 14:00 / 10:00) [cot][bp]. The EN about-us page still shows the old times [abt].
- **Breakfast:** 8:00 / 8:30 / 9:00 (see 4A.3).
- **Children** [faq][rent]:
  - Ages 3–6 pay a ¥1,650 facility fee. Children's bedding ¥3,300 and children's meals are extra, at any age.
  - Loans: children's yukata (S–LLL), baby bath, diaper pail.
- **Smoking:** all 24 rooms are smoking rooms. On request the hotel deodorizes the room and removes the ashtray [faq]. The restaurant is non-smoking [hou].
- **Wi-Fi:** free in rooms and the lobby [abt].
- **Cards:** Prince, VISA, JCB, AMEX, UC, DC, Diners, NICOS, Saison [abt].
- **Tattoos:** barred from the onsen [faq].
- **Accessibility:** rental wheelchairs and slopes [abt][rent].

#### 4A.8 Group-tour handling
- **Coach parking:** n/s. Hotel parking: 34 free spaces + 4 EV chargers [acc]. **Conflict:** media list 100 free spaces for the day spa, possibly a different lot [wk].
- **Banquet (corr.)** [ban]:
  - 鳳凰の間: 138 jo, 96 dining, protruding stage.
  - 2 mid halls: 32.5 jo, 26 dining each, horigotatsu seating.
  - Meeting room: 117 m² (13.0 × 9.0 m); theatre 80, school 40–60, dining 60, hollow square 36.
- **Group lunch:** at 富士, 10+ people, booked 10 days ahead [fj26].
- **Group check-in:** procedure n/s.
- **Baggage:** shuttle passengers carry their own. Hakone-Yumoto carry service suggested [map].
- **Capacity:** 24 rooms, each max 5 (twins max 2) [r01][r03].

#### 4A.9 Look notes (modelling and texturing)
- **Main Hall exterior:** pure Japanese style, wing corridors spreading left and right, gracefully curved roof (type not named). Modelled on the Phoenix Hall; keyaki and hinoki [hist].
- **Main Hall interior:** nail-less staircase hall by miyadaiku; chandelier in the entrance lobby; tatami rest area; tatami dining hall with high ceilings [st].
- **Women's bath wing:** 450 m², jutting toward Lake Ashi [tk].
- **Annex baths:** view onto a karesansui garden [fac].
- **Annex exterior:** n/s.

#### 4A.10 Gaps
- Annex: floor count (at least 3), structure, lobby location: n/s. The 1990 opening year comes only from media.
- Main Hall: floor count, roof type, registration number, total floor area: n/s.
- Rooms per type (besides the 3 special rooms): n/s.
- Elevator and barrier-free route in the Annex: not officially confirmed.
- Coach parking: n/s. Parking counts conflict: 34 / 100 / 38 (2018).
- Banquet hall vs restaurant: both named 鳳凰の間; whether they are the same room is n/s. Banquet building and floor: n/s.
- Kaiseki prices and contents: images only.
- Conflicts: spring type; Main Hall closure year (2011 vs 2012); washitsu floors (1–2F vs 1–3F).
- Airport bus: n/s.

### 4B Hakone Ashinoko Hanaori (ORIX, Togendai), alternative

#### 4B.1 Building facts
- **Structure:** B1 + 3 floors above ground. Site ~20,000 m², GFA ~10,000 m², 154 rooms. Opened 1 Aug 2017 by ORIX Real Estate [kan].
- **Planning:** National Park Class II special zone. Approved as a rebuild of a seminar house that held a ryokan licence. ORIX's first new-build ryokan [tv].
- **Layout:** a separate shared building holds the lobby, restaurant and large bath. Rooms with open-air baths are some distance from it [hsr].
- **Rooms (2017):** about 80% have a terrace and about 30% a private open-air bath, across 6 room types [aa].
- **Elevation:** over 700 m, cooler than the foothills [hn22].
- **Closure:** after check-out on 12 Jan 2027 until 21 Jan 2027. Reopens 22 Jan 2027 with 15:00 check-in [hcl].

#### 4B.2 Floor directory
| Floor | What is there | Hours | Src |
|---|---|---|---|
| Shared building, floor n/s | Lobby with lobby café; water-basin terrace with circular sofa; foot-bath counter | — | [tv] |
| Shared building, floor n/s | Buffet 季しかり | Dinner 17:30–21:30 (LO 21:00); breakfast 07:00–09:30 (LO 09:00) | [hdn][hbf] |
| Shared building, floor n/s | Tanayu public baths (garden-view and lake-view sides); 2 private baths | 05:00–10:00 / 15:00–24:00; private 15:00–22:00 / 07:00–09:30 | [hsp][hks] |
| Room wings, floors n/s | Rooms with and without open-air baths | — | [hsr] |

#### 4B.3 Dining
- **Dinner** at 季しかり: buffet with 5 live-cooking stations. Free-flow soft drinks and alcohol at no extra charge (summer 2026 menu page) [hdn].
- **Breakfast** at 季しかり: Japanese and Western menus, 2 smoothies [hbf].
- **Lobby café** serves drinks to the foot-bath counter [tv].

#### 4B.4 Bathing and leisure
- **Tanayu (棚湯)** [hsp]:
  - Garden-view and lake-view sides, swapped between men and women.
  - Spring: Motohakone Onsen, calcium-magnesium-sodium sulfate/bicarbonate.
  - Heated and diluted; not free-flowing.
  - Bath tax ¥150 per adult per night (under-12s exempt).
- **Design:** tubs step down in 50 cm tiers. Also a herbal bath, milky bubble bath, outdoor lying bath and sauna (2017) [tv].
- **Private baths:** 2 semi-open-air onsen baths, ¥3,000 per 40 min, booking required [hks].
- **In-room baths:** not onsen [hsr][hn22].

#### 4B.5 Rooms
| Type | m² | Beds | Bath layout | View side | Floors | Src |
|---|---|---|---|---|---|---|
| Standard + open-air bath | 31.5 | 2× 110×200; max 2 | ceramic tub on terrace (not onsen) | n/s | n/s | [hsr] |
| Universal Room | 31.5 | 2× 110×200; max 2 | n/s; wheelchair access to terrace | n/s | n/s | [hur] |
| Japanese-Western Deluxe + open-air bath | 47.3 | 2× 120×200 + sofa bed; max 5 | open-air bath (not onsen) | n/s | n/s | [hdx] |
| Casual Twin | 23.10 | n/s | Shigaraki tub on balcony in the open-air variant | n/s | n/s | [RRS] |

- All rooms are non-smoking. Kettle and safe in rooms [hur]. Coffee machine in the Deluxe [hdx].

#### 4B.6 Access
- **Togendai:** Hakone Ropeway and sightseeing-cruise pier, about 2 min on foot [hn22].
  - Route: from the ropeway exit, or up the escalator from the pier. Pass the bus stop, cross at the crosswalk, pass the car park and the gazebo, then walk up a short path to the entrance [hac].
- **Bus:** Izu Hakone Bus J line toward Kojiri/Hakone-en, from Odawara East Exit and Hakone-Yumoto [hac].
- **Gora shuttle** from 1 Oct 2026; the Odawara shuttle ended 30 Sep 2026 [hsh]:
  - Free, guests only, no booking. About 20 min each way.
  - Gora stop: Gora 1300-12, about 350 m (3 min) from Gora Station.
  - Leaves the hotel 9:30, 10:30, 11:30, 14:30, 15:30, 16:30. Leaves Gora 10:00, 11:00, 12:00, 15:00, 16:00, 17:00.
- **Airport bus:** n/s.

#### 4B.7 Policies
- **Check-in/out** [hinf]:
  - Check-in from 15:00, check-out by 10:00.
  - Late check-out to 12:00 for ¥2,000.
  - Front desk staffed 24 h.
- **Wi-Fi:** free throughout [hinf].
- **Minors:** if all guests are under 18, each needs a guardian consent form [hinf].
- **Smoking:** all rooms non-smoking [hur].
- **Breakfast:** see 4B.3. Children's rates: n/s.

#### 4B.8 Group-tour handling
- **Parking:** 100+ cars, free, no booking. Microbuses and larger vehicles must be arranged in advance. EV 200 V/16 A spaces for staying guests, booked with the room [hinf].
- **Group check-in:** procedure n/s. **Baggage:** n/s.

#### 4B.9 Look notes (modelling and texturing)
- **Lobby:** a lot of wood; carpet evoking Hakone yosegi marquetry [tv].
- **Terrace:** outdoor water-basin terrace that seems to run on into Lake Ashi, with a circular sofa in the middle and a foot-bath counter beside it [tv].
- **Baths:** tanayu tubs stepped in 50 cm tiers, so the view changes with bathing height [tv].
- **Terraces:** about 80% of rooms have one [aa].

#### 4B.10 Gaps
- Floor-by-floor layout, room count per type, tatami areas, Fuji visibility from rooms: n/s.
- Coach parking beyond "arrange microbuses in advance": n/s.
- Architect or designer: n/s.
- Autumn 2026 dinner hours: check, since the page found is the summer menu.

---

## §5 Kyoto: Machiya Residence Inn, Yumeha and Bonbori-an (demo Kyoto machiya stay)

### 5.1 Building facts
- **Operator:** MACHIYA INNS & HOTELS (Machiya Residence Inn) [our][home].
  - Running since 2010; 80+ properties in Kyoto, Kanazawa and Takayama [our].
  - Homepage (corr.): 60+ private machiya in Kyoto, also 50+ elsewhere on the page. Ruikou, Wakaba and Orie are labelled "Newly Opened"; no months given [home].
- **Kyo-machiya (Kyoto City definition):** wooden, traditional construction, built before 1950 [lf].
  - About 40,000 remain and about 800 are lost each year. Machiya ordinance enacted Nov 2017 [lf].
- **Reference model house** (Kyoto City-backed guide, 2020) [ren]:
  - c.1930, two storeys.
  - 4.7 m frontage (~2.5 ken) × 10.9 m deep (~5.5 ken); 82.58 m².
  - A single row of three rooms.
- **Structure:** columns on foundation stones (ishiba-date); earth walls over bamboo lattice; exposed columns (shinkabe) [ren].
- **Yumeha** (Nakagyo):
  - Address: 339-2 Sanbo-Inokuma-cho Minamigumi, Nakagyo-ku, Kyoto 604-8314 [yen]. Address point 35.01014, 135.75031 [RRS].
  - Age: over 110 years (JP page) [yjp]; "over 100 years, Taisho era" (EN page) [yen].
  - Unagi-no-nedoko plan: narrow frontage, long deep house. Two floors, with bedrooms and toilets on both [yen].
  - 75.97 m² [RRS]. Max 6 [yjp].
- **Bonbori-an** (Higashiyama):
  - Address: 東山区下河原通八坂塔之前下る八坂上町374番地10, on Shimogawara-dori just south of the Yasaka Pagoda [bjal]. EN form: 374-10 Yasaka Kamimachi, 605-0827 [bjal].
  - Two storeys: dining kitchen, washitsu, Western room, 2 beds, 2 futon sets, 2 toilets, washbasin, bath, tsuboniwa. 54 m² [brk]; 54.10 m² [RRS]. Max 4 [ben].
  - Adjoins the neighbouring house, so sound carries more than usual. A shared wall is not stated (corr.) [brs].
  - Licence: 京都市指令保医セ第252号 (OTA only) [bb].

### 5.2 Floor directory
| Unit / floor | What is there | Hours | Src |
|---|---|---|---|
| Yumeha 2F | Western bedroom (desk, 2 single beds); tatami bedroom (futons for 2, neighbourhood view, blackout shades, AC with heating, storage); toilet with bidet | — | [yjp][yen] |
| Yumeha 1F | Living-dining room (table for 6, 55-inch TV, floor heating); kitchen; bath and washroom facing tsuboniwa; toilet with bidet; Western bedroom (double bed); central tsuboniwa | Check-in 15:00–19:00; check-out 10:00 | [yjp][yen] |
| Bonbori-an 2F | Western bedroom (2 twin beds, plank ceiling following roof slope); Japanese tatami bedroom (2 futon sets) | — | [ben][bjal] |
| Bonbori-an, floor n/s | Living-dining room (ajiro ceiling, glass wall to tsuboniwa); kitchen; bath (goemon-style tub) and separate washbasin; 2 toilets | Check-in 15:00–19:00 (some plans 17:00–19:00); check-out 10:00 | [bjal][bjp][ben] |
| Welcome Desk (off-site): Kyomai Bldg 1F, east corner | Registration for every guest, accommodation tax, door code, luggage storage | 10:00–19:00 | [cia][hci] |

### 5.3 Dining
- **Meals:** not included [ci]. Breakfast available as an optional extra [feat].
- **Yumeha kitchen** [yen][yjp]:
  - IH hob, fridge, microwave with oven function, kettle, rice cooker.
  - Cookware and tableware for 6.
  - Single-use oil, salt, pepper and soy sauce.
- **Bonbori-an kitchen** [ben]:
  - IH hob, microwave, toaster, kettle, rice cooker.
  - Cookware and tableware.
  - Operator's own pour-over coffee, plus green and black tea.
- **Near Yumeha:**
  - Kyoto Sanjo-kai arcade, about 800 m long (Senbon-Sanjo to Horikawa-Sanjo), about 180 shops; began in 1914 with 72 shops [sk].
  - Nishiki Market 1.6 km (straight line) [sky1].

### 5.4 Bathing and leisure
- **Bathrooms:** no onsen at either house.
  - Yumeha: soaking tub overlooking the courtyard, overhead waterfall shower. Tub material n/s [yen].
  - Bonbori-an: deep goemon-style cauldron tub with garden view, rainfall shower, separate washbasin, bidet toilet [bjp][ben].
- **Equipment:**
  - Yumeha: floor heating in the 1F living-dining room [yjp]; 55-inch TV with streaming apps; washer-dryer with detergent and a steamer [yen].
  - Bonbori-an: floor heating, AC, humidifier, air purifier, fridge, safe, washing machine, iron and board, free Wi-Fi [bjp].
- **Add-ons:** kimono rental, private tours, luggage delivery, taxi booking. Each house has a mobile phone for guest services [feat].
- **Near Yumeha:**
  - Nijo Castle and Shinsen-en: each about 5 min on foot [yen].
  - Straight-line distances: Sanjo-dori 0.1 km, Shinsen-en 0.4, Nijo Castle 0.4, Kyoto International Manga Museum 1.1, Kyoto Gyoen 1.7 [sky1].
  - Nijo Castle [nwp][njo]:
    - 275,000 m²; one of the 17 Historic Monuments of Ancient Kyoto; built 1601–1626.
    - Entry 8:45–16:00, closes 17:00. Closed 29–31 Dec.
    - Ninomaru Palace also closed on Tuesdays in Jan, Jul, Aug and Dec, and on 26–28 Dec and 1–3 Jan.
    - Ninomaru Palace repair plan announced 27 Feb 2026.
  - Shinsen-en: laid out in 794 as the Heian-kyo imperial garden; now a Shingon temple and national historic site. The 863 goryo-e held here is the origin of the Gion Festival [shn].
- **Near Bonbori-an:**
  - Hokan-ji (Yasaka Pagoda) 70 m, Yasaka Koshin-do 80 m, Ninenzaka 130 m, Kiyomizu-dera 560 m [trp].
  - Kodai-ji 0.3 km, Kennin-ji 0.4, Yasui Konpira-gu 0.5, Yasaka Shrine 0.6, Hanamikoji 0.8 [sky2].
  - Yasaka Pagoda: five-storey wooden pagoda, ~46 m, rebuilt in 1440 by Ashikaga Yoshinori, Important Cultural Property [glt].

### 5.5 Rooms
| Unit / room | m² | Beds | Bath layout | View side | Floors | Src |
|---|---|---|---|---|---|---|
| Yumeha (whole house) | 75.97 | 3 bedrooms (2 Western): 1 double, 2 single, 2 futons; max 6 | 1 bathroom (soaking tub + waterfall shower, faces tsuboniwa); 2 WC with bidets (1F and 2F) | Bath and living room face the central tsuboniwa | 1–2 | [RRS][yen][yjp] |
| Yumeha 1F bedroom | n/s | double | — | n/s | 1 | [yjp] |
| Yumeha 2F Western bedroom | n/s | 2 single + desk | — | n/s | 2 | [yjp] |
| Yumeha 2F tatami bedroom | n/s (jo n/s) | futons for 2 | — | neighbourhood | 2 | [yen] |
| Bonbori-an (whole house) | 54.10 (54 per Rakuten) | 2 bedrooms: 2 single, 2 futons; max 4 | 1 bathroom (goemon-style tub + rainfall shower, separate basin); 2 WC | Living room and bath face tsuboniwa | 2 storeys | [RRS][brk][ben][bjp] |
| Bonbori-an 2F Western bedroom | n/s | 2 twin | — | n/s | 2 | [ben][bjal] |
| Bonbori-an 2F tatami bedroom | n/s (jo n/s) | 2 futon sets | — | n/s | 2 | [ben] |

### 5.6 Access
**Yumeha**

| Stop | Line | Exit | Walk | Src |
|---|---|---|---|---|
| Nijojo-mae | Kyoto City Subway | Exit 1 | ~5 min (400 m) | [yjp] |
| Horikawa-Oike | City bus stop | — | ~2 min | [yjp] |

- Taxi from the Kyoto Station Central Exit stand: ~3.5 km, ~13 min [yjp].
- Sanjo-kai arcade: Senbon-Sanjo end ~3 min from Nijo Station; Horikawa-Sanjo end ~5 min from Nijojo-mae [sk].

**Bonbori-an**

| Stop | Line | Exit | Walk | Src |
|---|---|---|---|---|
| Kiyomizu-michi | City Bus 86, 100, 106, 110, 206 | — | 4 min | [brs] |
| Gion-Shijo | Keihan Line | n/s | 19 min (aggregator) | [lj] |

- Yasaka Pagoda: 1 min on foot [bjp].
- Taxi from Kyoto Station Central Exit: ~3 km, ~12 min [bjp].
- Approach: from the Yasaka Pagoda, turn into a quiet residential alley and follow a stone path to a wooden koshi door [ben]. Taxi note: narrow back alley, gentle downhill, steps [bjal].
- Parking: none on site; coin parking within 3 min [brs].

**Welcome Desk**
- 685-2 Higashishiokoji-cho, Shimogyo-ku 600-8216, on the Kyoto Tower (north) side, ~3 min from Kyoto Station Central Exit [hci].
- Kyomai Bldg 1F, east corner (Ryokan Kyomai Inn), about 200 m east along Shiokoji-dori. Tel 075-708-6907 [cia].

**Airport bus:** n/s.

### 5.7 Policies
- **Check-in/out:**
  - Yumeha: 15:00–19:00 (may vary by plan); check-out 10:00. Arrivals after 19:00 must notify the host [yen].
  - Bonbori-an: 15:00–19:00 (some plans 17:00–19:00); check-out 10:00 [bjp].
  - Early check-in is not guaranteed and costs ¥3,000/h. Late check-out may cost extra. Lock the door on leaving [ci].
- **Operation:**
  - One group per day; no staff on site.
  - Staff reachable by email and phone 10:00–19:00; 24 h emergency line [yen].
  - Housekeeping only for stays of 4+ nights.
  - Bookable stays of 1–15 nights, up to 8 months ahead [yen].
- **Breakfast:** none included; optional add-on [ci][feat].
- **Children and bedding:**
  - Bedding is set for the number of guests booked. Changes at least 2 days ahead [yen].
  - Up to 2 children aged 5 and under share bedding [yen][ben], free when co-sleeping [ben].
  - Bonbori-an provides no sleepwear [ben].
  - Main guest must be 18+ (OTA) [trp].
- **Smoking:**
  - Yumeha is non-smoking [yjp].
  - Bonbori-an: the whole property is non-smoking, courtyard included, and open flames are banned [brs].
  - No smoking at any unit [ci].
- **Wi-Fi:** Bonbori-an free [bjp]. Yumeha n/s.
- **House rules:**
  - No parties or loud shouting; keep noise low [ci].
  - OTA rules: quiet after 21:00, no pets [trp]; shoes off, no elevator, contactless check-out [tik].
- **Cancellation (Bonbori-an via Rakuten)** [brs]:
  - Free until day 22 before arrival.
  - 30% from day 21; 50% from day 14.
  - 100% from day 2, on the day, and for no-shows.
- **Kyoto accommodation tax**, per person per night by room rate, from 1 Mar 2026 [ci][tax]:

  | Room rate (yen) | Tax (yen) |
  |---|---|
  | under 6,000 | 200 |
  | 6,000–19,999 | 400 |
  | 20,000–49,999 | 1,000 (was 500) |
  | 50,000–99,999 | 4,000 (was 1,000) |
  | 100,000 and over | 10,000 |

- **Kyoto City machiya-inn rules:**
  - One guest room; the whole building used by guests; one group of 9 or fewer.
  - Staff based within about 10 min. ID check, headcount and key handover face to face [chk].
  - Staff within about 800 m by road (~10 min walk), required for all facilities from 1 Apr 2020 [fly].

### 5.8 Group-tour handling
- **Capacity (corr.):** max 9 guests per house [p12168][p8257].
  - Ruikou: 184 m² main house, 4 bedrooms, 9 guests.
  - Waren Bettei: 125.07 m², 4 bedrooms, 9 guests.
  - Choya Chawanzaka: up to 9 guests.
  - Larger groups split across houses.
- **Paired houses:** for groups up to 8, the operator suggests also booking the machiya next to Hinaya Gojo Ichi [p12056].
- **Group check-in** at the Welcome Desk:
  - Kyoto City requires every guest to check in in person [ci].
  - Staff copy every passport. One representative fills in one registration card. Each guest pays the accommodation tax. The house keypad door code is then issued [hci].
  - The houses have no front desk or staff [hci].
- **Luggage (corr.)** [ci][hci]:
  - Free storage at the desk, 10:00–19:00.
  - Paid delivery to the house if bags reach the desk by 15:00. Bags are placed inside; no one needs to be home.
  - Return service on check-out day: book at least 1 day ahead. Bags go from the house to the desk and are collected there 16:00–19:00.
  - Forwarding: ¥3,100 (next hotel) to ¥6,100 (Okinawa airport) per bag, tax included.
- **SELECT MACHIYA houses:** luggage delivery, yukata, welcome amenities. A free Kyoto Station shuttle with a drink set is offered; which houses get it is n/s [home].
- **Coach access:** no parking at the houses. The Bonbori-an lane is narrow, sloping and stepped [brs][bjal].

### 5.9 Look notes (modelling and texturing)
- **Kyoto City machiya form** [chk]:
  - 3 storeys or fewer, detached or terraced, eaves-side (hirairi) roof to the street.
  - Toori-niwa earthen passage with the hibukuro void above it.
  - Tsuboniwa or okuniwa garden.
  - Toori-hisashi street eave.
  - Traditional lattices: mushiko-mado, Kyo-goshi.
- **Street eave and windows** [ren]:
  - The toori-hisashi shelters a fold-down battari-shogi bench in a semi-public zone.
  - Mushiko-mado are upper-floor lattice windows plastered with earth or lime against fire.
- **Roof** [nip]:
  - Straight "ichimonji" edge in dark grey kawara.
  - Neighbouring eaves overlap at uneven heights.
  - Clay Shoki figures on several hundred roofs.
- **Inuyarai:** curved bamboo or wood strips at the base of the facade, protecting the wall from mud and water [p11575].
- **Walls:** earth plaster over bamboo lattice, with exposed columns [ren].
- **Mushiko-mado on these units:** the operator names only Sumire-an as having them, not Yumeha or Bonbori-an. Do not add them to either unit as confirmed [p11924].
- **Yumeha:** original wooden beams exposed across the living-dining ceiling. A central tsuboniwa is visible from the living-dining room and the bath [yen].
- **Bonbori-an:**
  - Approach: alley and stone path to a wooden koshi lattice door [ben].
  - Living-dining room: ajiro wickerwork ceiling, as in tea rooms; fully glazed wall onto the tsuboniwa [bjal].
  - 2F Western bedroom: high wooden plank ceiling following the roof slope, indirect lighting, paper lantern [ben][bjal].
  - 2F tatami room: koshibari paper on the lower walls; bamboo ceiling in a go-board grid [ben].

### 5.10 Gaps
- Tatami jo counts for both units appear only in floor-plan images that could not be fetched. Open them by hand:
  - https://www.kyoto-machiya-inn.com/en/wp-content/uploads/2026/03/yumeha-scaled.jpg
  - https://www.kyoto-machiya-inn.com/en/wp-content/uploads/2023/05/bonbori_en-scaled.jpg?ver=1
- Not stated:
  - Room-by-room sizes.
  - Doma, hashiri-niwa and hibukuro at either unit; use the generic Kyoto City elements instead.
  - Yumeha facade (koshi type, inuyarai, mushiko-mado, entrance).
  - Bath material at either unit.
  - Bonbori-an's age and which floor holds its living room, kitchen and bath.
  - Yumeha's opening date as an inn. Photo uploads in Feb–Apr 2026 suggest it is recent (inference only).
- Source conflicts:
  - Bonbori-an: Jalan lists 1 double bed and no washitsu. LIVE JAPAN lists a walk-in shower with no tub. Trip.com gives 50 m². Use the official page.
  - Yumeha check-out: the JP booking page shows 00:00. Use 10:00.
  - Booking window: 8 months (unit pages) vs 6 months (?p=8716).
  - Operator size: 40+, 45+, 50+, 60+ (Kyoto) and 80+ (all cities).
  - Bonbori-an distances: Trip.com and Skyticket differ (Hokan-ji 70 m vs 0.2 km; Kiyomizu-dera 560 m vs 0.7 km).
  - Nijo Castle start date: 1601 in the text vs 1603 commonly cited; infobox 1624. UNESCO year (1994) not confirmed.
- Shoe rule and quiet hours come only from OTAs.
- How the operator meets Kyoto City's 800 m staff rule with a station-area desk is not documented; do not infer.
- Bonbori-an rail walking time: only the aggregator's 19 min to Gion-Shijo.
- Bonbori-an GSI coordinate: not fetched (network blocked).
- Airport bus to either unit: not researched.

---

## Sources

### §1 Tokyo
fuj https://www.fujisan.co.jp/product/796/b/64723/ · wp https://ja.wikipedia.org/wiki/ザ・プリンス_パークタワー東京 · ctb https://www.skyscrapercenter.com/building/the-prince-park-tower-tokyo/25694 · pr16 https://www.princehotels.co.jp/press/2016/pdf/top_release_160707_04.pdf · ov https://www.princehotels.co.jp/parktower/overview · ftg https://www.princehotels.co.jp/parktower/contents/forbes_travel_guide/ · faq https://www.princehotels.co.jp/parktower/faq/ · ac https://www.princehotels.co.jp/parktower/accessibility/ · ac1 https://www.princehotels.co.jp/parktower/accessibility/2-1/ · ac2 https://www.princehotels.co.jp/parktower/accessibility/2-2/ · ac3 https://www.princehotels.co.jp/parktower/accessibility/2-3/ · pcl https://www.princehotels.co.jp/parktower/facility/contents/premium-club-lounge/ · pcl2 https://www.princehotels.co.jp/parktower/facility/premium_club_lounge · spa https://www.princehotels.co.jp/parktower/facility/spa_fitness · leg https://www.princehotels.co.jp/file.jsp?id=505209 · jtb https://www.jtb.co.jp/kokunai_hotel/htl/4013015/ · top https://www.princehotels.co.jp/parktower/ · fac https://www.princehotels.co.jp/parktower/facility/ · law https://www.princehotels.co.jp/parktower/facility/lawson-s · n29 https://www.princehotels.co.jp/file.jsp?id=474316 · pr17 https://www.princehotels.co.jp/press/2017/pdf/top_release_171129_03.pdf · bal https://www.princehotels.co.jp/parktower/banquet/ballroom/ · mice https://www.princehotels.co.jp/tokyo-mice-city/parktower/banquet.html · mg https://www.princehotels.co.jp/tokyo-mice-city/parktower/guest.html · sky https://www.princehotels.co.jp/parktower/banquet/sky_banquet/ · fch https://www.princehotels.co.jp/parktower/wedding/ceremony/forest.html · shm https://www.princehotels.co.jp/parktower/wedding/ceremony/shinmei.html · gdw https://www.princehotels.co.jp/parktower/wedding/ceremony/garden.html · wed https://www.princehotels.co.jp/parktower/wedding/ · wac https://www.princehotels.co.jp/parktower/wedding/access/ · pty https://www.princehotels.co.jp/parktower/restaurant/partyroom · mel https://www.princehotels.co.jp/parktower/restaurant/melodyline/ · sg25 https://www.princehotels.co.jp/file.jsp?id=488320 · sg https://www.princehotels.co.jp/parktower/restaurant/stellargarden · bv https://www.princehotels.co.jp/parktower/restaurant/briseverte · ll https://www.princehotels.co.jp/parktower/restaurant/lobbylounge · shz https://www.princehotels.co.jp/parktower/restaurant/shibazakura · ham https://www.princehotels.co.jp/parktower/restaurant/hamashiba · ten https://www.princehotels.co.jp/parktower/restaurant/tenshiba · tor https://www.princehotels.co.jp/parktower/restaurant/torishiba · you https://www.princehotels.co.jp/parktower/restaurant/youmeiden · kat https://www.princehotels.co.jp/parktower/restaurant/katsura · mor https://www.princehotels.co.jp/parktower/facility/morning/ · ird https://www.princehotels.co.jp/parktower/restaurant/inroomdining · dmn https://www.princehotels.co.jp/file.jsp?id=484034 · hmc https://www.princehotels.co.jp/file.jsp?id=484031 · sht https://www.princehotels.co.jp/file.jsp?id=520229 · acc https://www.princehotels.co.jp/parktower/access/ · lim https://www.limousinebus.co.jp/ja/busstop/detail/ThePrinceParkTowerTokyo/ · prk https://www.princehotels.co.jp/file.jsp?id=303642 · prk2 https://www.princehotels.co.jp/file.jsp?id=373372 · tch https://www.princehotels.co.jp/parktower/facility/terracharge/ · got https://www.gotokyo.org/jp/spot/845/index.html · rm https://www.princehotels.co.jp/parktower/room/ · r10 https://www.princehotels.co.jp/parktower/room/room10.html · r25 https://www.princehotels.co.jp/parktower/room/room25.html · r32 https://www.princehotels.co.jp/parktower/room/room32.html · rent https://www.princehotels.co.jp/parktower/informations/rental · hm https://www.hotelmanagement.net/renovations/how-shiba-park-tokyo-japan-influenced-22-5m-renovation-prince-park-tower-tokyo · gdn https://www.princehotels.co.jp/parktower/facility/outside-garden · tabi https://tabi-mag.jp/towerview-parktower/ · RRS real-reference-spec.md §(a)

### §2 Osaka
ig https://www.newotani.co.jp/fileadmin/res/osaka/banquet/information-guide.pdf · jal https://www.jalan.net/yad335522/ · acc https://www.newotani.co.jp/osaka/access/ · wp https://ja.wikipedia.org/wiki/ホテルニューオータニ大阪 · pr40 https://prtimes.jp/main/html/rd/p/000003768.000014571.html · sle https://www.newotani.co.jp/en/osaka/restaurant/satsukilounge/ · oi https://osaka-info.jp/en/spot/hotel-new-otani-osaka/ · hoo https://www.newotani.co.jp/osaka/banquet/hall/hooh/ · fsq https://www.newotani.co.jp/osaka/faq/stay/ · cex https://www.newotani.co.jp/osaka/facility/club-exercise/ · crx https://www.newotani.co.jp/osaka/facility/club-relaxation/ · clb https://www.newotani.co.jp/osaka/facility/club/ · bg https://www.newotani.co.jp/osaka/facility/club/black-gym/ · pool https://prtimes.jp/main/html/rd/p/000003692.000014571.html · mn https://medicalnote.jp/hospitals/53191 · fen https://www.newotani.co.jp/en/osaka/faq/other01/ · pc https://plaza.newotani.co.jp/topics/info/eigyoujikannhennkou/ · s9 https://plaza.newotani.co.jp/shop/shop-9/ · wc https://www.newotani.co.jp/osaka/wedding/ceremony/ · sak https://www.newotani.co.jp/osaka/restaurant/sakura/ · kei https://www.newotani.co.jp/osaka/restaurant/keyaki/ · 4s https://www.newotani.co.jp/osaka/restaurant/4seasons/ · sat https://www.newotani.co.jp/osaka/restaurant/satsuki/ · bf https://www.newotani.co.jp/osaka/breakfast/ · sl https://www.newotani.co.jp/osaka/restaurant/satsukilounge/ · cas https://www.newotani.co.jp/osaka/restaurant/castle/ · ps https://www.newotani.co.jp/osaka/restaurant/p-satsuki/ · tk https://www.newotani.co.jp/en/osaka/restaurant/taikanen/ · ken https://www.newotani.co.jp/osaka/restaurant/kenzan/ · kag https://www.newotani.co.jp/osaka/restaurant/kagairo/ · fuj https://www.newotani.co.jp/osaka/restaurant/fujio/ · mik https://www.newotani.co.jp/osaka/restaurant/mikan/ · rl https://www.newotani.co.jp/en/osaka/restaurant/ · iss https://www.newotani.co.jp/osaka/restaurant/isshin/ · nak https://www.newotani.co.jp/osaka/restaurant/nakajima/ · fr https://www.newotani.co.jp/osaka/faq/restaurant/ · st https://www.newotani.co.jp/osaka/stay/room/s-twin-castle/ · sd https://www.newotani.co.jp/osaka/stay/room/s-double/ · dt https://www.newotani.co.jp/osaka/stay/room/d-twin-castle/ · lt https://www.newotani.co.jp/osaka/stay/room/l-twin-castle/ · ejs https://www.newotani.co.jp/osaka/stay/room/e-junior-suite/ · pr62 https://prtimes.jp/main/html/rd/p/000003662.000014571.html · es https://www.newotani.co.jp/osaka/stay/room/exective-suite/ · tw https://travel.watch.impress.co.jp/docs/news/1596573.html · gk https://www.newotani.co.jp/en/osaka/promotions/gold-key/ · wac https://www.newotani.co.jp/osaka/wedding/access/ · bus https://www.newotani.co.jp/osaka/event/bus-terminal/ · en https://www.newotani.co.jp/en/osaka/ · bfr https://www.newotani.co.jp/osaka/stay/guide/barrierfree/ · nk https://www.nikkan.co.jp/releases/view/92255 · fp https://www.fashion-press.net/news/148425 · ban https://www.newotani.co.jp/en/osaka/banquet/ · cw https://www.newotani.co.jp/cn/osaka/facility/children-are-welcome · RRS real-reference-spec.md §(e)

### §3 Kawaguchiko
co https://www.ubuya.co.jp/company/ · ev973 https://www.ubuya.co.jp/event/973/ · jal https://www.jalan.net/yad310215/ · jtb https://www.jtb.co.jp/kokunai-hotel/htl/4258007/ · oys https://www.oyster.com/chubu/hotels/kozantei-ubuya/ · rm https://www.ubuya.co.jp/room/ · ic16 https://icotto.jp/presses/4999 · pref https://www.pref.yamanashi.jp/smartphone/rosei-koy/kigyo-navi/company/company-102.html · on https://www.ubuya.co.jp/onsen/ · qa https://www.ubuya.co.jp/qa/ · t101 https://trip101.com/article/kozantei-ubuya-an-inn-where-you-can-enjoy-mt-fuji-an-onsen-and-a-gourmet-meal · 4t https://4travel.jp/dm_hotel-10046281 · sty https://www.ubuya.co.jp/stay/ · exp https://www.ubuya.co.jp/experience/ · yk https://www.yamanashi-kankou.jp/kankou/stay/p4_2059.html · rlx https://rlx.jp/26619/ · yh https://travel.yahoo.co.jp/00000821/ · yha https://travel.yahoo.co.jp/00000821/access/ · cui https://www.ubuya.co.jp/cuisine/ · pdf https://www.ubuya.co.jp/cuisine/pdf/course.pdf · tab https://tabelog.com/yamanashi/A1903/A190303/19005600/ · tour https://www.tour.ne.jp/j_hotel/2955/ · ev954 https://www.ubuya.co.jp/event/954/ · acc https://www.ubuya.co.jp/access/ · enacc https://www.ubuya.co.jp/en/access/ · gl https://www.gltjp.com/en/article/item/21018/ · ich https://icotto.jp/hotels/188 · enqa https://www.ubuya.co.jp/en/qa/ · ev934 https://www.ubuya.co.jp/event/934/ · ic24 https://icotto.jp/presses/8880 · ev960 https://www.ubuya.co.jp/event/960/ · ev931 https://www.ubuya.co.jp/event/931/ · ryo https://www.ryoko-net.co.jp/?p=112323 · RRS real-reference-spec.md §(c)

### §4 Hakone
Ryuguden: r01 https://www.princehotels.co.jp/ryuguden/room/shinkan/room01.html · r02 https://www.princehotels.co.jp/ryuguden/room/shinkan/room02.html · r03 https://www.princehotels.co.jp/ryuguden/room/shinkan/room03.html · p17 https://www.princehotels.co.jp/press/2017/pdf/top_release_170721_01.pdf · engr https://www.princehotels.com/ryuguden/guest-rooms/ · aso https://www.asoview.com/note/1212/ · tk https://toyokeizai.net/articles/-/186936?display=b · hist https://www.princehotels.co.jp/ryuguden/honkan_history/ · st https://san-tatsu.jp/articles/191870/ · kj https://www.princehotels.co.jp/ryuguden/informations/kouji_2026 · on https://www.princehotels.co.jp/ryuguden/onsen/ · bp https://www.princehotels.co.jp/ryuguden/plan/basicplan · fac https://www.princehotels.co.jp/ryuguden/facility/ · enb https://www.princehotels.com/ryuguden/facilities/indoor-public-bath/ · ho https://www.princehotels.co.jp/ryuguden/facility/honkan_onsen/ · lk https://www.princehotels.co.jp/ryuguden/honkan/lounge_koshitsu/ · ms https://www.princehotels.co.jp/ryuguden/informations/massage2026 · ban https://www.princehotels.co.jp/ryuguden/facility/banquet/ · fj26 https://www.princehotels.co.jp/ryuguden/restaurant/fujinoma2026 · fjt https://www.princehotels.co.jp/ryuguden/informations/fujinoma_change_of_time · hou https://www.princehotels.co.jp/ryuguden/restaurant/houounoma/ · enr https://www.princehotels.com/ryuguden/restaurants/ · faq https://www.princehotels.com/ryuguden/news/frequently-asked-questions/ · cot https://www.princehotels.co.jp/ryuguden/informations/change_of_time · abt https://www.princehotels.com/ryuguden/about-us/ · rent https://www.princehotels.co.jp/ryuguden/informations/rental2026/ · acc https://www.princehotels.co.jp/ryuguden/access/ · sb https://www.princehotels.co.jp/ryuguden/informations/shuttlebus_henkou202509 · map https://www.princehotels.com/ryuguden/map-direction/ · hn887 https://www.hakonenavi.jp/spot/887 · ofp https://odakyu-global.com/passes/hakone-freepass/ · wk https://summer.walkerplus.com/odekake/detail/ar0314s464164/map.html · nb https://www.princehotels.co.jp/ryuguden/facility/ninjabus/ · RRS real-reference-spec.md §(b)

Hanaori: kan https://www.kanaloco.jp/news/economy/entry-16507.html · tv https://www.travelvoice.jp/20170806-94239 · hsr https://ashinoko-hanaori.orixhotelsandresorts.com/contents/standard-room-bath/?lang=ja · hsp https://ashinoko-hanaori.orixhotelsandresorts.com/contents/hotspring/?lang=ja · hks https://ashinoko-hanaori.orixhotelsandresorts.com/contents/kashikiri/?lang=ja · hdn https://ashinoko-hanaori.orixhotelsandresorts.com/contents/contents-10340/ · hbf https://ashinoko-hanaori.orixhotelsandresorts.com/contents/breakfast/ · hinf https://ashinoko-hanaori.orixhotelsandresorts.com/information/?lang=ja · hsh https://ashinoko-hanaori.orixhotelsandresorts.com/news/10593/?lang=ja · hcl https://ashinoko-hanaori.orixhotelsandresorts.com/news/10947/?lang=ja · hac https://ashinoko-hanaori.orixhotelsandresorts.com/access/ · hur https://ashinoko-hanaori.orixhotelsandresorts.com/contents/universal-room/?lang=ja · hdx https://ashinoko-hanaori.orixhotelsandresorts.com/contents/deluxe-room-bath/?lang=ja · aa https://news.allabout.co.jp/articles/o/21682/ · hn22 https://www.hakonenavi.jp/feature/22210 · RRS real-reference-spec.md §(b)

### §5 Kyoto
yen https://www.kyoto-machiya-inn.com/accommodations/yumeha/ · yjp https://go-machiyainnsandhotels.reservation.jp/ja/hotels/yumeha · sky1 https://skyticket.jp/hotel/detail/property_1863343/ · sk https://www.city.kyoto.lg.jp/kotsu/cmsfiles/contents/0000288/288826/off_8_s.pdf · shn https://www.city.kyoto.lg.jp/nakagyo/cmsfiles/contents/0000318/318222/04kyogyo.pdf · nwp https://en.wikipedia.org/wiki/Nij%C5%8D_Castle · njo https://nijo-jocastle.city.kyoto.lg.jp/ · tik https://www.tiket.com/en-us/homes/japan/yumeha-machiya-house-903001773238611705 · bjal https://www.jalan.net/yad371844/ · brk https://hotel.travel.rakuten.co.jp/hotelinfo/plan/165622 · brs https://travel.rakuten.co.jp/HOTEL/165622/165622_std.html · ben https://www.kyoto-machiya-inn.com/accommodations/bonbori/ · bjp https://go-machiyainnsandhotels.reservation.jp/ja/hotels/bonbori · lj https://livejapan.com/en/in-kansai/in-pref-kyoto/in-gion_kawaramachi_kiyomizu-dera-temple/spot-lj0026487/ · trp https://www.trip.com/hotels/kyoto-hotel-detail-11541150/bonbori-an-machiya-house/ · sky2 https://skyticket.jp/hotel/detail/property_10317/ · glt https://www.gltjp.com/ja/directory/item/17413/ · bb https://www.bedandbreakfast.eu/en/a/OctOTLtRpRCY/bonbori-an-machiya-house · hci https://www.kyoto-machiya-inn.com/how-to-check-in/ · cia https://www.machiya-inn-japan.com/files/ci_access.pdf · ci https://www.machiya-inn-japan.com/checkin/?p=1 · tax https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000345/345893/daijindoui_houdouhappyou.pdf · our https://www.kyoto-machiya-inn.com/about/our-story/ · home https://www.kyoto-machiya-inn.com/ · feat https://kyoto-machiya-inn.com/about/features · p12168 https://www.kyoto-machiya-inn.com/?p=12168 · p8257 https://www.kyoto-machiya-inn.com/?p=8257 · p12056 https://www.kyoto-machiya-inn.com/?p=12056 · chk https://www.city.kyoto.lg.jp/hokenfukushi/cmsfiles/contents/0000258/258490/kyomachiyachecksheet.pdf · fly https://www.city.kyoto.lg.jp/hokenfukushi/cmsfiles/contents/0000258/258482/020401tirashi.pdf · lf https://kyomachiya.city.kyoto.lg.jp/wp-content/uploads/2022/01/leaflet.pdf · ren https://kyoto-machisen.jp/renovation/img/Renovating_Kyoto_Machiya.pdf · nip https://nippon.com/en/guide-to-japan/gu900011 · p11575 https://www.kyoto-machiya-inn.com/?p=11575 · p11924 https://www.kyoto-machiya-inn.com/?p=11924 · RRS real-reference-spec.md §(d)
