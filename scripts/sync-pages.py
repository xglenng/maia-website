from pathlib import Path

root = Path(__file__).resolve().parent.parent
html = (root / "dist/index.html").read_text()
html = html.replace('href="style.css"', 'href="dist/style.css"')
html = html.replace('src="demo.js"', 'src="dist/demo.js"')
html = html.replace('href="images/', 'href="dist/images/').replace('src="images/', 'src="dist/images/')
(root / "index.html").write_text(html)
