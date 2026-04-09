# Assets — Naming Conventions & Structure

All static assets live here and are served from the root URL by Vite.
Reference them in code as `/assets/...` (not `./` or `../`).

---

## Image Folders

### /images/hero/
Full-width hero background images, one per page.

| Filename                     | Used by              |
|------------------------------|----------------------|
| hero-home.jpg                | Home page            |
| hero-concrete-asphalt.jpg    | Concrete & Asphalt   |
| hero-snow-ice.jpg            | Snow & Ice           |
| hero-design-build.jpg        | Design Build         |
| hero-about.jpg               | About page           |

Recommended dimensions: 1920 × 1080px minimum. Compress to < 400KB.
Format: JPEG for photos, WebP preferred if available.

### /images/services/
Service-specific photography used within page content.

| Filename                     | Used by                          |
|------------------------------|----------------------------------|
| comparison-before.jpg        | Snow & Ice page, before/after    |
| comparison-after.jpg         | Snow & Ice page, before/after    |
| equipment-snow.jpg           | Snow & Ice page                  |
| concrete-detail.jpg          | Concrete & Asphalt page          |

### /images/portfolio/
Project gallery photos for a future gallery/portfolio section.
Naming: `project-[slug]-[number].jpg` e.g. `project-ridgeway-plaza-01.jpg`

### /images/team/
Team or job-site photos for the About page.
Naming: `team-[name].jpg` or `jobsite-[location].jpg`

---

## Logos

### /logos/
| Filename         | When to use                            |
|------------------|----------------------------------------|
| logo-dark.png    | On light backgrounds (nav if redesigned) |
| logo-white.png   | On dark backgrounds (footer)           |
| favicon.ico      | Browser tab icon                       |
| favicon-192.png  | PWA / Android icon (optional)          |

Format: PNG with transparency. Do not use JPEG for logos.

---

## Swap In an Image

1. Add the file to the correct subfolder above
2. Use the exact filename from the table
3. In the relevant component, update the `bgImage` prop or `src` attribute:
   ```jsx
   <Hero bgImage="/assets/images/hero/hero-home.jpg" />
   // or
   <img src="/assets/images/services/comparison-before.jpg" alt="Before D&L" />
   ```

No code changes needed beyond that one line.
