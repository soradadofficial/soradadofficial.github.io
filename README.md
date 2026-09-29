# Surajak Chansamrit — Pixel Resume

Static site (HTML + CSS + vanilla JS). No build step, no hosting needed.

## Publish on GitHub Pages
1. Create a repo (e.g. `resume`) and upload **everything in this folder** (keep `.nojekyll`).
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. Your site appears at `https://<username>.github.io/<repo>/` (name the repo `<username>.github.io` for the root URL).
4. After you know the URL, add it to `index.html`: `<link rel="canonical" href="...">`, `og:url`, and make `og:image` absolute
   (e.g. `https://<username>.github.io/<repo>/og-image.png`) so link previews work.

## Edit content
- Text lives in `index.html` (English). Thai is in `js/i18n-th.js` (same `data-i18n` keys).
- Game level cards: `js/stages.js`. Coins/skills: `COIN_DEF` in `js/game.js`.
- PDFs: replace files in `assets/` (keep the names).

Try it: press Start, move with ← → / A D, jump with Space, collect coins, visit every level. Konami code = secret.
