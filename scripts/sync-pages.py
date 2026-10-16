from pathlib import Path

root = Path(__file__).resolve().parent.parent
html = (root / "dist/index.html").read_text()
(root / "index.html").write_text(html.replace('href="style.css"', 'href="dist/style.css"'))
