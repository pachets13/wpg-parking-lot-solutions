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
