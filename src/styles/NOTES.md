# Styles

## variables.css
All design tokens as CSS custom properties. **Edit this file to retheme the site.**
Key groups: Colors, Typography, Spacing, Layout, Radius, Shadows, Transitions.

## global.css
Imports variables.css, then defines:
- Reset (box-sizing, margins, base typography)
- Layout utilities (`.container`, `.section`, `.section--dark` etc.)
- Typography utilities (`.eyebrow`, `.heading-xl/lg/md/sm`, `.body-lg`)
- All component and section styles (Navbar, Footer, Hero, Cards, Form, etc.)

## CSS architecture decision
Plain CSS classes (no CSS Modules, no styled-components).
Tradeoff: slightly more global namespace risk, but much easier to read and edit
without build tool knowledge. Given content changes are done via direct code edits,
this is the right call for this project.

## Brand colors (quick ref)
- Charcoal (dark bg): `#1A1A1A`
- Ink (darkest bg): `#0D0D0D`
- Amber (accent/CTAs): `#C07800`
- Snow (light section bg): `#F8F7F5`
- All others: see `variables.css`

## Animation tokens (variables.css)
A dedicated token group controls all entrance animations — edit here to adjust sitewide:
- `--anim-duration` (600ms) — fade-in duration for both load and scroll animations
- `--anim-ease` (cubic-bezier(0.16, 1, 0.3, 1)) — snappy spring ease-out for entrances
- `--anim-distance` (24px) — translateY lift distance (unified across hero and scroll fades)
- `--stagger-sm` (100ms) — text cascade interval: eyebrow → heading → body → CTA
- `--stagger-md` (120ms) — grid/card reveal interval: service cards, feature lists, metrics

## Scroll animation system (global.css)
Two entrance mechanisms, both sharing the tokens above:
- `[data-hero-fade]` — fires on page load via `hero-enter` keyframe; stagger via inline `animationDelay`
- `[data-fade]` — fires on scroll via IntersectionObserver (threshold: 8%, rootMargin: -32px);
  stagger via inline `transitionDelay`. Observer logic is in `src/utils/scrollAnimations.js`.
Both respect `prefers-reduced-motion` — all animations disabled for users who request it.

## Hover underline pattern
Used on: Navbar Services dropdown items (`.navbar__dropdown-item`), Footer nav links
(`.footer__nav-link`), Footer contact links (`.footer__contact-item a`), Footer legal links
(`.footer__legal-link`).
Technique: `::after` pseudo-element, `scaleX(0→1)`, `transform-origin: left`,
`450ms cubic-bezier(0.4, 0, 0.2, 1)`, `var(--color-amber)`, 1px height.
Requires `position: relative` on the parent element.
