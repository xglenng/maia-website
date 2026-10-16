# Maia website

Public marketing website for Maia Front Desk, by Gavakata Software LLC.

- GitHub Pages: https://xglenng.github.io/maia-website/
- Sites: https://maia-front-desk.xglenng.chatgpt.site
- App installation: https://maia-front-desk-production.up.railway.app/install

## Source and publishing

`dist/index.html` and `dist/style.css` are the Sites deployment source. The root `index.html` mirrors that page with its stylesheet pointing to `dist/style.css`, for GitHub Pages configured to publish `main` / root. `.nojekyll` disables Jekyll processing.

After editing the HTML, synchronize the Pages entry point:

```sh
python3 scripts/sync-pages.py
```

A GitHub push updates GitHub Pages only. Sites publishing is separate. The Maia application and API remain hosted on Railway.
