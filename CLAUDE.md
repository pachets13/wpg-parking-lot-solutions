# WPG Parking Lot Solutions and Concrete — Website Project

## Quick Reference

React + Vite static site for WPG Parking Lot Solutions and Concrete (`dandlworks.ca`).
Deployable to GitHub Pages via the `gh-pages` npm script.

### Commands
```
npm install                        Install dependencies
npm run dev                        Local dev server → http://localhost:5173
npm run build                      Production build → /dist
npm run deploy                     Build + push to GitHub Pages (gh-pages branch)
UNSPLASH_ACCESS_KEY=x npm run download-images-unsplash   Download stock images via Unsplash
PEXELS_API_KEY=x npm run download-images-pexels          Download stock images via Pexels
```

### Image Download Scripts
Both scripts search for project-specific terms and save files directly into
`public/assets/images/` using the exact filenames defined in `public/assets/NOTES.md`.

- `scripts/download-images.js` — Unsplash version
- `scripts/download-images-pexels.js` — Pexels version (config block at top, logic below)

A reusable template for future projects is saved at:
`~/scripts/download-images-pexels-template.js`
To reuse: copy the template, update the three values in the CONFIG block
(`OUTPUT_DIR`, `SUBDIRS`, `DOWNLOADS`) and run with your Pexels API key.

### ⚠️ Deploy Workflow — Two Separate Steps

**Pushing to `main` does NOT update the live site.**
The live site is served from the `gh-pages` branch. Deploying is always a deliberate second step.

**To go live:**
```
# Step 1 — commit and push source changes to main (standard)
git add . && git commit -m "descriptive message" && git push origin main

# Step 2 — build and publish to GitHub Pages (separate, intentional)
npm run deploy
```

After `npm run deploy` finishes, GitHub Pages takes **1–2 minutes** to serve the new version.
Force a hard refresh (**Cmd+Shift+R**) to bypass the browser cache and see the update.

---

### Before First Deploy
1. Update `vite.config.js` → `base: '/YOUR-REPO-NAME/'` to match your GitHub repo name.
2. Open `src/components/sections/QuoteForm.jsx` and replace `YOUR_FORM_ID` with the Formspree form ID from your account at formspree.io.

---

## Folder Map

```
/
├── CLAUDE.md                   ← You are here. Root navigation + project guide.
├── index.html                  ← Vite HTML entry. Google Fonts (Inter) loaded here.
├── vite.config.js              ← Vite config. Update `base` before GH Pages deploy.
├── package.json                ← Dependencies and npm scripts.
├── .gitignore
│
├── public/
│   └── assets/                 ← Static assets served at root. See NOTES.md inside.
│       ├── images/
│       │   ├── hero/           ← Full-width hero images, one per page.
│       │   ├── services/       ← Service-specific photography.
│       │   ├── portfolio/      ← Project gallery / case study photos.
│       │   └── team/           ← Team or job site photos for About page.
│       └── logos/              ← Logo variants: logo-dark.png, logo-white.png, favicon.ico
│
├── src/
│   ├── main.jsx                ← React entry. Mounts <App /> into #root.
│   ├── App.jsx                 ← Router setup (HashRouter). Add new routes here.
│   │
│   ├── styles/
│   │   ├── variables.css       ← Design tokens: colors, type scale, spacing, shadows.
│   │   │                         Edit here to retheme the entire site.
│   │   └── global.css          ← Reset + base styles + all component/layout CSS.
│   │
│   ├── data/
│   │   ├── siteConfig.js       ← Phone, email, address, social links.
│   │   │                         SINGLE SOURCE OF TRUTH — Navbar, Footer, Contact all pull from here.
│   │   ├── services.js         ← Content for service cards and service pages.
│   │   └── testimonials.js     ← Placeholder testimonials. Swap in real ones here.
│   │
│   ├── components/
│   │   ├── layout/             ← Persistent layout wrappers (see NOTES.md inside)
│   │   │   ├── Navbar.jsx      ← Sticky nav: Services dropdown, About, Contact, Get a Quote CTA.
│   │   │   └── Footer.jsx      ← Multi-column footer: nav, contact info, social icons, legal.
│   │   │
│   │   ├── ui/                 ← Reusable primitives (see NOTES.md inside)
│   │   │   ├── Button.jsx      ← Button component. Props: variant (primary/outline/ghost), size, as.
│   │   │   └── ServiceCard.jsx ← Card for the homepage services grid.
│   │   │
│   │   └── sections/           ← Page-level section blocks (see NOTES.md inside)
│   │       ├── Hero.jsx        ← Full-width hero. Props: title, subtitle, eyebrow, ctas, bgImage, size.
│   │       ├── ServicesGrid.jsx← 3-column service cards, data-driven from services.js.
│   │       ├── QuoteForm.jsx   ← Formspree quote request form. Update FORMSPREE_ID constant here.
│   │       └── Testimonials.jsx← Testimonial cards, data-driven from testimonials.js.
│   │
│   └── pages/                  ← One file per route (see NOTES.md inside)
│       ├── Home.jsx            ← / — Full homepage.
│       ├── ConcreteAsphalt.jsx ← /services/concrete-asphalt
│       ├── SnowIce.jsx         ← /services/snow-ice — Most content-rich, key differentiator page.
│       ├── DesignBuild.jsx     ← /services/design-build
│       ├── About.jsx           ← /about
│       └── Contact.jsx         ← /contact — QuoteForm + direct contact info.
│
└── docs/
    ├── dandl-website-analysis.md ← Original site analysis. Reference for content and copy decisions.
    └── NOTES.md
```

---

## Common Edits

### Change contact info (phone, email, address)
→ Edit `src/data/siteConfig.js`. One change updates Navbar, Footer, and Contact page.

### Add or edit a testimonial
→ Edit `src/data/testimonials.js`. Add an object to the array — it renders automatically.

### Swap in a real image
1. Drop the file into the correct subfolder under `public/assets/images/`
2. Follow naming conventions in `public/assets/NOTES.md`
3. Update the `bgImage` prop on the relevant `<Hero />` or `<img>` tag

### Add a new page
1. Create `src/pages/NewPage.jsx`
2. Add a `<Route>` in `src/App.jsx`
3. Add the link to `Navbar.jsx` and `Footer.jsx`

### Update the Formspree form ID
→ Open `src/components/sections/QuoteForm.jsx` and update `FORMSPREE_ID`.

---

## Brand Reference

- **Voice:** Direct, professional, confident. Written for commercial property managers — not homeowners.
- **Positioning:** "The All Season Parking Lot Experts" — year-round partner, not a seasonal vendor.
- **Primary differentiator:** Liquid de-icing technology (better, eco-friendlier than rock salt/sand).
- **Trust signals:** 30+ years experience, local Winnipeg business, eco-friendly, advanced equipment fleet.
- **Primary CTA everywhere:** "Get a Quote" → routes to `/contact`.
- **Never:** Mention residential work, DIY framing, or homeowner-oriented language.
- **Design tokens:** `src/styles/variables.css` — charcoal / white / amber accent (`#C07800`).

---

## Tech Notes

- **Router:** HashRouter — URLs render as `/#/about`. Reliable on GitHub Pages without server config.
  To upgrade to clean URLs later: swap to BrowserRouter + add a custom domain + configure GH Pages redirect.
- **Forms:** Formspree (free tier). No backend required. Form submissions arrive at the WPG Parking Lot Solutions email.
- **Fonts:** Inter via Google Fonts, loaded in `index.html`.
- **Images:** All placeholder gradients until real photography is provided. Drop-in ready.
- **Deployment:** `npm run deploy` pushes `/dist` to the `gh-pages` branch automatically.
- **Animations:** Two-mechanism system — `[data-hero-fade]` (page load keyframe) for above-fold hero content;
  `[data-fade]` (IntersectionObserver) for all scroll-triggered content. Tokens in `variables.css`
  (`--anim-duration`, `--anim-ease`, `--anim-distance`, `--stagger-sm`, `--stagger-md`). See `src/styles/NOTES.md`.
