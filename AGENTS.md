# AGENTS.md

## Cursor Cloud specific instructions

This is a static portfolio website (HTML/CSS/JS only). There are no build tools, package managers, or backend services.

### Running the site

Serve files with Python's built-in HTTP server:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080/` in a browser. The main entry point is `index.html`.

### Project structure

- `index.html` — Main portfolio (v2, particle animations)
- `indexv1.html` — Portfolio v1
- Multiple themed variants: `cyberpunk.html`, `neon.html`, `neural.html`, `terminal.html`, `vscode.html`, `glass.html`, `threejs.html`, `webgl.html`, `globe.html`, `lab.html`, `newspaper.html`, `chat.html`, `game.html`, `java.html`
- `script.js` / `scriptv2.js` — JavaScript for v1 and v2
- `styles.css` / `stylesv2.css` — CSS for v1 and v2

### Notes

- No linter, test framework, or build step exists in this repo.
- All external dependencies (Font Awesome, Google Fonts, Three.js) are loaded from CDNs — no local install needed.
- Some theme pages (e.g. `threejs.html`, `webgl.html`, `globe.html`) use Three.js from CDN for 3D effects.
