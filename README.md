# Radiant Touch — Portal

Welcome! This small, friendly front-end project is the web portal for Radiant Touch — a Lagos-based cleaning service. It's a static, responsive site built with plain HTML, CSS, and JavaScript so you can open it in any browser and see the service, testimonials, and a contact flow in action.

Why this repo exists
- Easy-to-read demo of a service landing page.
- Lightweight, accessible, and responsive design for quick iterations.

Quick start
1. Open the site: open [index.html](index.html) in your browser.
2. For local dev with auto-reload, run a simple static server (Node example):

```bash
npx http-server . -c-1 -p 8080
# then open http://localhost:8080
```

What you'll find
- **Landing page**: [index.html](index.html) — hero, services, and testimonials.
- **Styles**: [styles.css](styles.css) — responsive layout and components.
- **Behavior**: [script.js](script.js) — form handling, rating modal, and small interactions.
- **Thank you page**: [thank-you.html](thank-you.html) — shown after successful contact submission.
- **Assets**: [images/](images/) — icons and photos used across the site.

Notes for contributors
- No build step required — keep changes simple and focused.
- If you add scripts or tooling, include a `package.json` and a short run section here.

License
This project is unlicensed by default. Add a `LICENSE` file if you want to set terms.

Enjoy poking around — if you want, I can help add a live-reload setup, accessibility checks, or a small CI pipeline.
