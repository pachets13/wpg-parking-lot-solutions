# Layout Components

These components wrap every page and are always visible.

## Navbar.jsx
- Sticky at top, `z-index: 100`
- Services dropdown (desktop) / collapsible mobile menu (< 900px)
- All menus close on route change via `useEffect` watching `location.pathname`
- "Get a Quote" CTA routes to `/contact` on both desktop and mobile
- Logo is text-based placeholder until `public/assets/logos/` has real files

## Footer.jsx
- Contact info pulled from `src/data/siteConfig.js` — edit there, not here
- Social links: Instagram, LinkedIn, X — handles/URLs also in `siteConfig.js`
- Copyright year is dynamic (`new Date().getFullYear()`)
- Legal pages (Privacy, Terms) currently link to `#` — update when real pages exist

## Adding a new top-level nav link
1. Add it to `Navbar.jsx` desktop links and mobile menu
2. Add it to `Footer.jsx` Company column if appropriate
