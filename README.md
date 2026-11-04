# SteveFx — offline currency converter

A phone app (PWA) with two modes:
- **Latest**: market rates, downloaded when online and saved for offline use.
- **Custom**: rates you enter yourself (e.g. what the money changer gave you), compared against market.

## Put it on GitHub Pages
1. Create a new public repo on GitHub, `SteveFx`.
2. Upload everything in this folder (keep the `icons` folder).
3. Repo **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
4. After ~1 minute it's live at `https://<your-username>.github.io/SteveFx/`.

## Install on your phone
- **iPhone (Safari)**: open the link → Share → *Add to Home Screen*.
- **Android (Chrome)**: open the link → ⋮ menu → *Install app* / *Add to Home screen*.

Open it once while online so it downloads rates. After that it works offline.

## Updating
After changing any file, bump `VERSION` in `sw.js` (e.g. `stevefx-v1` → `stevefx-v2`) so phones fetch the new version.

## Rate sources
open.er-api.com (primary) and fawazahmed0/currency-api (fallback). Both are free, need no API key, and update about once a day.
