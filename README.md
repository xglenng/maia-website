# Maia website

Public marketing website for Maia Front Desk, by Gavakata Software LLC.

- GitHub Pages: https://xglenng.github.io/maia-website/
- Sites: https://maia-front-desk.xglenng.chatgpt.site
- App installation: https://app.maia.gavakatasoftware.com/install

## Source and publishing

`dist/index.html` and `dist/style.css` are the Sites deployment source. The root `index.html` mirrors that page with its stylesheet pointing to `dist/style.css`, for GitHub Pages configured to publish `main` / root. `.nojekyll` disables Jekyll processing.

After editing the HTML, synchronize the Pages entry point:

```sh
python3 scripts/sync-pages.py
```

A GitHub push updates GitHub Pages only. Sites publishing is separate. The Maia application runs on Render at https://app.maia.gavakatasoftware.com.
