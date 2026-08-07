# Section Components

Larger, page-level blocks that are either reused across pages or contain their own data fetching/state.

## Hero.jsx
- Used on every page as the top section
- `bgImage` prop: pass a path like `/assets/images/hero/hero-home.jpg`
  If no `bgImage` is provided, falls back to a dark charcoal gradient (intentional placeholder)
- `size`: `full` (100vh, homepage) | `medium` (60vh, service pages) | `short` (40vh + padding, About)
- Wrap words in `<em>` tags within the `title` prop to apply amber accent color

## ServicesGrid.jsx
- Purely data-driven from `src/data/services.js`
- No props needed — just drop `<ServicesGrid />` onto a page

## QuoteForm.jsx
- Formspree integration — update `FORMSPREE_ID` constant at the top of the file
- Handles its own form state and submission status internally
- On success: shows a thank-you message (no page reload)
- On error: shows a fallback message with direct email link
- Fields: Name, Company, Phone, Email, Service (dropdown), Property Address, Message
- The `<form>` element has `data-fade` — it animates in as one unit on every page it appears

## Testimonials.jsx
- Data-driven from `src/data/testimonials.js`
- No props needed — add entries to the data file to update the section
