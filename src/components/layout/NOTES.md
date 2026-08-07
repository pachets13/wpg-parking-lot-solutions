# Layout Components

These components wrap every page and are always visible.

## Navbar.jsx
- Sticky at top, `z-index: 100` — stickiness is on `<header class="site-header">`, not `.navbar`
- Services dropdown opens on **hover** (desktop); 150ms close-delay buffers the gap between trigger and menu
- Click/Enter still toggles the dropdown for keyboard and touch users; `Escape` closes it
- Scroll-aware: `site-header--scrolled` class toggles at `scrollY > 20` → amber `border-bottom` fades in
- Dropdown menu is always rendered in DOM; visibility controlled via CSS opacity/transform (not conditional mount)
- Mobile: collapsible menu at < 900px; services listed flat (no nested dropdown)
- All menus close on route change via `useEffect` watching `location.pathname`
- "Get a Quote" CTA routes to `/contact` on both desktop and mobile

## Footer.jsx
- Contact info pulled from `src/data/siteConfig.js` — edit there, not here
- Social links: Instagram, LinkedIn, X — handles/URLs also in `siteConfig.js`
- Copyright year is dynamic (`new Date().getFullYear()`)
- Legal pages (Privacy, Terms) currently link to `#` — update when real pages exist
- Nav links (Services, Company columns), contact links (phone, email), and legal links all have an amber
  slide-in underline on hover — same technique as the Services dropdown items

## Adding a new top-level nav link
1. Add it to `Navbar.jsx` desktop links and mobile menu
2. Add it to `Footer.jsx` Company column if appropriate
