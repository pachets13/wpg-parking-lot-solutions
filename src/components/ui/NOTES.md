# UI Primitives

Small, reusable components with no business logic.

## Button.jsx
- Props: `variant`, `size`, `as`, `to`, `href`, `className`
- variant: `primary` (amber filled) | `outline` (white border, for dark bg) | `outline-dark` (dark border, for light bg) | `ghost` (text only)
- size: `sm` | `md` (default) | `lg`
- as: `button` (default) | `link` (react-router Link, needs `to`) | `a` (anchor, needs `href`)
- All button styles are defined in `src/styles/global.css` under `/* ── Button ──`

## ServiceCard.jsx
- Used in `ServicesGrid.jsx` on the homepage
- Data shape must match the objects in `src/data/services.js`
- Icons are inline SVG keyed by `service.id` — to add an icon for a new service, add an entry to the `icons` object inside the file
