# Resume Quest — DOOM-style 3D Resume (Surajak Chansamrit)

A first-person, raycast 3D "dungeon" version of the resume — challenging yet cute.
Same content as the pixel-art site, but a separate build so you can compare the two.
Pure HTML/CSS/JS, no build step, no image assets, no hosting needed (GitHub Pages).

## Play
| Action | Keys |
|---|---|
| Move | `W A S D` / arrow ↑↓ |
| Turn | mouse (click the screen) / `←` `→` / `Q` `E` |
| Fire | `Space` / click |
| Pause | `Esc` |
| Mobile | on-screen joystick + FIRE button |

- **Cute mode**: friendly bugs, health regenerates. **Doom mode**: fast bugs, no regen.
- 7 rooms = 7 career stages; read the terminals, collect 14 skill orbs, beat the boss.
- Prefer plain text? Press "skip to resume" or scroll — the full resume is below the game (SEO-friendly).
- EN / TH toggle in the nav. Cheat for the curious: type `iddqd`.

## Deploy on GitHub Pages
Keep both sites side by side — choose one:

**A) Separate repo (cleanest)** — create repo `resume-doom`, upload everything in this folder
(index.html at repo root) → Settings → Pages → Deploy from branch `main` / root.
URL: `https://<user>.github.io/resume-doom/`

**B) Subfolder of the existing site** — copy this folder into the original repo as `doom/`
→ `https://<user>.github.io/doom/` (original stays at the root).

`.nojekyll` is included. Replace `<user>` and URLs in `index.html` (canonical / og:url / JSON-LD) after deploying.

## Customize
Content comes from the generator data (jobs, skills, stats); edit `index.html` text directly, Thai strings in `js/i18n-th.js`,
rooms in `js/stages.js`, difficulty in `MODES` at the top of `js/game.js`.
