# Data

Static content and configuration files. No API calls — all data is local.

## siteConfig.js
Single source of truth for contact info and social links.
Imported by: Navbar, Footer, Contact page.
**Change phone/email/address here only.**

## services.js
Array of service objects. Used by:
- `ServicesGrid.jsx` (homepage cards)
- `ServiceCard.jsx` (individual cards)
- Potentially service page breadcrumbs or related service suggestions in the future

Each service object shape:
```js
{
  id: string,          // used as key and for icon lookup in ServiceCard
  slug: string,        // route path, e.g. '/services/snow-ice'
  title: string,       // full display title
  shortTitle: string,  // abbreviated for nav/footer
  tagline: string,     // hero subtitle
  description: string, // card description (2-3 sentences)
  icon: string,        // key for icon lookup
  heroImage: string,   // path in public/assets/images/hero/
  features: [{ title, body }]  // used on service detail pages
}
```

## testimonials.js
Array of testimonial objects. Used by `Testimonials.jsx`.
Replace placeholder entries with real client quotes when available.
The `service` field renders as a tag on the card — optional but recommended.
