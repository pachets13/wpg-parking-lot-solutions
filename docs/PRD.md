# Product Requirements Document
## WPG Parking Lot Solutions and Concrete — Website Redesign

**Version:** 1.0
**Date:** 2026-04-08
**Status:** Active
**Project directory:** `/Users/shawn/Desktop/Website-1`

---

## Table of Contents

1. [Product Summary](#1-product-summary)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [User Personas](#3-user-personas)
4. [Jobs to Be Done](#4-jobs-to-be-done)
5. [Information Architecture](#5-information-architecture)
6. [Page-Level Requirements](#6-page-level-requirements)
7. [Component Specifications](#7-component-specifications)
8. [Design System](#8-design-system)
9. [Technical Requirements](#9-technical-requirements)
10. [Phased Roadmap](#10-phased-roadmap)
11. [Out of Scope (v1)](#11-out-of-scope-v1)
12. [Open Questions](#12-open-questions)

---

## 1. Product Summary

WPG Parking Lot Solutions and Concrete is a Winnipeg-based commercial exterior property maintenance company offering three services: Concrete & Asphalt, Snow & Ice Solutions, and Design Build. The business is exclusively B2B, targeting commercial property managers and owners.

The current site (dandlworks.ca, Squarespace) has structural and functional gaps that actively reduce conversion: no working quote form, no testimonials, no portfolio, and CTAs that reference forms that don't exist. The redesign replaces it with a purpose-built React + Vite site deployed to GitHub Pages, designed to drive a single conversion action — the quote request.

**Primary conversion goal:** Quote request form submission via Formspree.
**Audience:** Commercial property managers and owners in Winnipeg, Manitoba.
**Not for:** Homeowners, residential leads, or general public browsing.

---

## 2. Goals & Success Metrics

### Business Goals

| Goal | How it maps to the site |
|------|------------------------|
| Increase qualified lead volume | Every major CTA routes to the quote form |
| Establish credibility with new commercial clients | Testimonials, trust signals, experience stats |
| Differentiate on liquid de-icing technology | Dedicated callout on homepage + full Snow & Ice page |
| Replace the broken Squarespace contact flow | Working Formspree form on Contact page and homepage |
| Support all three service lines equally | Dedicated pages per service, equal weight in nav |

### Measurable Success Metrics (v1 baseline)

| Metric | Target | How to measure |
|--------|--------|---------------|
| Quote form submission rate | > 3% of sessions | Formspree submission count vs. site visits |
| Time on Snow & Ice page | > 90 seconds avg | Google Analytics (add in v1.1) |
| Mobile bounce rate | < 55% | Google Analytics |
| Contact page visit → form submit | > 20% | Formspree + GA funnel |
| Formspree response received | 100% of submissions | Manual check of inbox |

---

## 3. User Personas

### Persona 1 — The Property Manager (Primary)

**Name:** Karen, 38
**Role:** Commercial Property Manager, manages 4–12 properties for a real estate firm or strata council
**Location:** Winnipeg, MB
**Goals:** Keep properties safe, functional, and compliant year-round. Minimize tenant complaints and liability exposure. Have reliable vendors she doesn't have to micromanage.
**Frustrations:** Vendors who don't show up, vague quotes, reactive (not proactive) winter service, dealing with three different contractors for what should be one job.
**How she finds WPG Parking Lot Solutions:** Google search ("commercial snow clearing Winnipeg"), referral from another PM, LinkedIn.
**What she needs from the site:**
- Proof that WPG Parking Lot Solutions is commercial-only and understands her context
- A fast, credible way to request a quote
- Evidence of capability (testimonials, equipment, experience)
- Clear service descriptions — no residential fluff

**Decision trigger:** "These people clearly know commercial properties. I trust them enough to make contact."

---

### Persona 2 — The Property Owner / Developer (Secondary)

**Name:** David, 52
**Role:** Owner of 1–3 commercial properties, or developer planning a new build
**Location:** Winnipeg, MB
**Goals:** Protect his asset. Minimize long-term maintenance costs through quality upfront work. Find one partner who can handle both build and ongoing care.
**Frustrations:** Contractors who build it and disappear, shoddy work that deteriorates in 2 winters, having to re-bid every season.
**What he needs from the site:**
- Confidence in technical expertise (30+ years experience, equipment quality)
- The Design Build proposition — one team, full lifecycle
- A way to start a conversation without filling out a 12-field form

**Decision trigger:** "This team builds it and maintains it. That's worth paying for."

---

### Persona 3 — The Facilities Director (Tertiary)

**Name:** Mike, 45
**Role:** Director of Facilities for a larger commercial operator (retail chain, industrial complex, healthcare)
**Location:** Winnipeg, MB
**Goals:** Standardize vendor relationships across properties. Document decisions for his organization.
**What he needs from the site:**
- Clear service scope and capability
- Professional presentation that he can show internally
- Easy path to phone or email contact for a formal conversation

**Decision trigger:** "Professional enough to present to my VP. Capable enough to handle our volume."

---

## 4. Jobs to Be Done

| When I... | I want to... | So I can... |
|-----------|-------------|-------------|
| Land on the homepage | Immediately understand what WPG Parking Lot Solutions does and who it's for | Decide if I'm in the right place |
| Learn about Snow & Ice | Understand why liquid de-icing is different | Make the case internally for a switch |
| Compare WPG Parking Lot Solutions to competitors | Find proof that they're credible (reviews, experience, years) | Justify my choice |
| Decide to make contact | Submit a quote request quickly with relevant context | Start a real conversation |
| Need to reach someone urgently | Find a phone number without searching | Call immediately |
| Revisit the site after initial contact | Confirm the company feels professional and established | Reassure myself about the decision |
| Research the Design Build service | Understand full-cycle scope vs. one-off contracting | Decide if this replaces my current multi-vendor setup |

---

## 5. Information Architecture

### Route Map

```
/ (Home)
├── /services/concrete-asphalt
├── /services/snow-ice             ← highest-value page (differentiator)
├── /services/design-build
├── /about
└── /contact                       ← primary conversion destination
```

### Navigation Structure

**Desktop top nav:**
```
[WPG Parking Lot Solutions Logo / Wordmark]    Services ▾    About    Contact    [Get a Quote] →
                              ├── Concrete & Asphalt
                              ├── Snow & Ice Solutions
                              └── Design Build
```

**Footer nav (4 columns):**
```
WPG Parking Lot Solutions Brand + contact info | Services | Company | Service Area
```

**Mobile nav:** Hamburger → full-width slide-down with all links + CTA button

### Content Hierarchy (per page)

Every page follows this hierarchy:
1. Hero (orientation + primary CTA)
2. Core content (services, story, features)
3. Trust reinforcement (testimonials, stats, differentiators)
4. Quote form or hard CTA

---

## 6. Page-Level Requirements

---

### 6.1 Home (`/`)

**Purpose:** Orient the visitor, establish credibility, route to the quote form.

**Required sections (top to bottom):**

| # | Section | Requirement |
|---|---------|-------------|
| 1 | Hero | Full-viewport. Headline "The All Season Parking Lot Experts." Two CTAs: "Get a Quote" (primary/amber) → `/contact`, "Our Services" (outline) → `/services/concrete-asphalt` |
| 2 | Trust bar | Amber strip. Four items: 30+ Years Experience, Winnipeg MB, Commercial B2B Only, Eco-Friendly Approach |
| 3 | Services grid | 3-column cards linking to each service page. Data-driven from `services.js`. |
| 4 | About teaser | Two-column: company story left, placeholder photo right. Stats row: 30+, 3, 12, 1. CTA to `/about`. |
| 5 | Snow & Ice callout | Dark section. Explains liquid de-icing advantage with 4 benefit cards. CTA to `/services/snow-ice`. |
| 6 | Testimonials | 3 cards. Placeholders until real quotes are provided. |
| 7 | Quote form | Formspree form embedded in dark section. All fields per spec in §7.4. |

**Acceptance criteria:**
- [ ] All 7 sections present and rendering
- [ ] Both hero CTAs functional
- [ ] Trust bar visible on mobile (wraps, dividers hide at < 600px)
- [ ] Services grid collapses to 1 column on mobile
- [ ] Quote form submits successfully to Formspree and shows success state
- [ ] No hardcoded contact info — all from `siteConfig.js`

---

### 6.2 Concrete & Asphalt (`/services/concrete-asphalt`)

**Purpose:** Describe hard surface services. Convert visitors researching paving/concrete.

**Required sections:**

| # | Section | Requirement |
|---|---------|-------------|
| 1 | Hero | Medium height (60vh). Headline "Expert Parking Lot Solutions Built to Last." CTA to `/contact`. |
| 2 | Service intro | Prose block. Max 760px wide. Context on Manitoba climate + scope of services. |
| 3 | 3-column feature cards | Concrete / Asphalt / & More. With amber left-border treatment. |
| 4 | Why WPG Parking Lot Solutions | 2-column feature grid. 4 items: Commercial Equipment, Manitoba Expertise, Single Contact, Experience. |
| 5 | Quote form | Same Formspree form, dark section. Service dropdown pre-selectable in future. |

---

### 6.3 Snow & Ice Solutions (`/services/snow-ice`)

**Purpose:** WPG Parking Lot Solutions's primary differentiator. Most content-rich page. Must clearly explain the liquid de-icing advantage over traditional methods.

**Required sections:**

| # | Section | Requirement |
|---|---------|-------------|
| 1 | Hero | Medium height. "Manitoba Winter, Handled." CTA to `/contact`. |
| 2 | Intro block | Max 760px. Frames winter as a system to manage, not an event to react to. |
| 3 | Liquid de-icing — dark 2-col | Left: prose explaining why traditional salt fails. Right: 4 benefit cards (Prevents Formation, Efficiency, Protects Property, Environmental). |
| 4 | Before/After comparison | Two side-by-side placeholder image slots. Labels: "A Typical Winnipeg Winter Parking Lot" vs. "A Winnipeg Winter Parking Lot Maintained by WPG Parking Lot Solutions". Swap in real photos when available. |
| 5 | Snow clearing section | 2-column feature grid. 4 items: Equipment, Coverage, Proactive, Pair with De-icing. |
| 6 | Quote form | Dark section with note about info packet. |

**Content notes:**
- Never frame competitors by name — position against "typical Winnipeg operators" and "traditional methods"
- Eco-friendly angle should appear in liquid de-icing section, not as a standalone section

---

### 6.4 Design Build (`/services/design-build`)

**Purpose:** Communicate the full-lifecycle value proposition. Target: David (owner/developer persona).

**Required sections:**

| # | Section | Requirement |
|---|---------|-------------|
| 1 | Hero | Medium height. "Design-Build Solutions for Every Parking Lot Need." CTA to `/contact`. |
| 2 | Intro | "One team. The full picture." Framing against multi-vendor coordination. |
| 3 | 4 service pillars | 2×2 feature grid: Design & Construction, Full Spectrum, Custom Features, Long-Term Maintenance. |
| 4 | One-partner advantage | Dark section. Prose explaining why accountability is better when builder = maintainer. CTA to `/contact`. |
| 5 | Quote form | Dark section. |

---

### 6.5 About (`/about`)

**Purpose:** Build trust. Humanize the company. Confirm commercial-only positioning.

**Required sections:**

| # | Section | Requirement |
|---|---------|-------------|
| 1 | Hero | Short height (40vh + padding). "Who We Are." CTA to `/contact`. |
| 2 | Company story | 2-column: prose left (founded 2023, 30+ years experience, construction roots, commercial-only), placeholder photo right (portrait or job site). |
| 3 | Values grid | 2×2 feature grid: Commercial Only, Year-Round Partnership, Eco-Friendly Practices, Accountability. |
| 4 | CTA banner | Dark strip. "Have a project in mind?" Two CTAs: "Request a Quote" (primary) + phone number (outline). |

---

### 6.6 Contact (`/contact`)

**Purpose:** Primary conversion page. Must make the quote request as frictionless as possible.

**Required sections:**

| # | Section | Requirement |
|---|---------|-------------|
| 1 | Page header | Dark background. H1 "Request a quote." Subtext with response time (1 business day). |
| 2 | 2-column layout | Form (2/3 width) left. Contact sidebar (1/3) right. |
| 3 | Quote form | Full form — all fields per §7.4. |
| 4 | Contact sidebar | Phone (large, clickable), Email (amber link), Address, Service area, "Commercial only" callout block. |

**Acceptance criteria:**
- [ ] Phone number is a `tel:` link on mobile
- [ ] Email is a `mailto:` link
- [ ] Form shows success state without page reload
- [ ] Error state shows fallback email
- [ ] "Commercial properties only" callout is visible

---

## 7. Component Specifications

### 7.1 Navbar

| Property | Spec |
|----------|------|
| Position | Sticky, `z-index: 100` |
| Height | 72px desktop |
| Background | `--color-charcoal` (#1A1A1A) |
| Logo | Text-based ("WPG Parking Lot Solutions" + "Landscaping & Concrete" subline) until real logo files provided |
| Services dropdown | Opens on click (not hover). Closes on outside click and route change. |
| Mobile breakpoint | < 900px → hide desktop links, show hamburger |
| CTA button | "Get a Quote" → `/contact`, amber primary style |
| Active state | Active route link is white; inactive links are `--color-silver` |

### 7.2 Footer

| Property | Spec |
|----------|------|
| Background | `--color-ink` (#0D0D0D) |
| Columns | 4-col desktop: Brand+contact / Services / Company / Service Area |
| Mobile | 2-col at < 900px, 1-col at < 600px |
| Contact info | Pulled from `siteConfig.js` — never hardcoded |
| Social links | Instagram, LinkedIn, X — icon buttons with hover state |
| Copyright | Dynamic year via `new Date().getFullYear()` |

### 7.3 Hero

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `title` | ReactNode | Yes | Wrap `<em>` for amber accent on words |
| `subtitle` | string | No | Renders in `--color-silver` |
| `eyebrow` | string | No | Uppercase small label above title |
| `ctaPrimary` | `{label, to}` | No | Amber filled button |
| `ctaSecondary` | `{label, to}` | No | White outline button |
| `bgImage` | string | No | Path to image in `/assets/images/hero/`. Falls back to dark gradient if omitted. |
| `size` | `'full'` \| `'medium'` \| `'short'` | No | Default: `'full'` |

Image overlay: `rgba(0,0,0,0.55)` over background image. Ensures text contrast regardless of photo.

### 7.4 QuoteForm (Formspree)

**Fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Full Name | text | Yes | |
| Company / Property Name | text | Yes | B2B context — company name is required |
| Phone | tel | Yes | |
| Email | email | Yes | |
| Service | select | Yes | Options: Concrete & Asphalt, Snow & Ice, Design Build, Multiple, Not Sure |
| Property Address | text | No | Helps WPG Parking Lot Solutions prep for the quote |
| Project Details | textarea | No | 5 rows, resizable |

**States:**
- `idle` — form ready for input
- `submitting` — button disabled, text changes to "Sending..."
- `success` — form replaced with thank-you message + phone number fallback
- `error` — inline error with direct email fallback link

**Config:** `FORMSPREE_ID` constant at top of `QuoteForm.jsx`. Replace `'YOUR_FORM_ID'` before deploy.

### 7.5 ServiceCard

Used in the `ServicesGrid` section on the homepage.

| Property | Source |
|----------|--------|
| Icon | Inline SVG, keyed by `service.id` in `ServiceCard.jsx` |
| Title | `service.title` from `services.js` |
| Description | `service.description` from `services.js` |
| Link | `service.slug` from `services.js` |
| Hover | Lifts 4px, amber border, shadow |

### 7.6 Button

| Variant | Use case | Background | Text | Border |
|---------|----------|------------|------|--------|
| `primary` | Primary CTAs on any bg | Amber `#C07800` | White | Amber |
| `outline` | Secondary CTAs on dark bg | Transparent | White | White 40% opacity → 100% on hover |
| `outline-dark` | Secondary CTAs on light bg | Transparent | Charcoal | Charcoal → inverts on hover |
| `ghost` | Inline text links | None | Amber | None |

Sizes: `sm` (12px text, 8px/20px padding), `md` default (14px, 12px/28px), `lg` (16px, 16px/36px).

---

## 8. Design System

All tokens live in `src/styles/variables.css`. This is the single file to edit for rethemes.

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-ink` | `#0D0D0D` | Darkest backgrounds (footer, page headers) |
| `--color-charcoal` | `#1A1A1A` | Navbar, dark sections, form backgrounds |
| `--color-dark-surface` | `#242424` | Cards within dark sections |
| `--color-amber` | `#C07800` | All CTAs, accents, eyebrow text, dividers |
| `--color-amber-hover` | `#D98B00` | CTA hover state |
| `--color-snow` | `#F8F7F5` | Light section backgrounds (warm off-white) |
| `--color-silver` | `#B8B8B8` | Body text on dark backgrounds |
| `--color-muted` | `#888888` | Body text on light backgrounds, labels |

### Typography

- Font: **Inter** (Google Fonts, weights 400/500/600/700/900)
- Headings: Black (900) for hero, Bold (700) for section headings
- All hero titles use `clamp()` for fluid responsive sizing

### Spacing

8px base unit. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px.
Section vertical padding: `clamp(4rem, 8vw, 6rem)` — scales with viewport.

### Layout

- Max container width: 1200px
- Container padding: `clamp(1rem, 4vw, 2rem)`
- No sidebar layouts anywhere — single column content flow

---

## 9. Technical Requirements

### Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | React 18 + Vite 5 | Component reuse, good DX, fast build |
| Routing | React Router v6, HashRouter | HashRouter is reliable for GitHub Pages without server config |
| Forms | Formspree free tier | No backend required, works on static hosting |
| Styles | Plain CSS custom properties | Editable without build tooling knowledge |
| Fonts | Google Fonts (Inter) | Free, loaded in `index.html` |
| Deployment | GitHub Pages via `gh-pages` npm package | One command: `npm run deploy` |

### Performance Requirements

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 85 |
| First Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Build size (gzipped JS) | < 100KB |
| Image file sizes | < 400KB per hero image |

Current build: 66KB gzipped JS, 4.5KB gzipped CSS. Well within targets before images are added.

### Browser Support

Modern browsers: Chrome, Firefox, Safari, Edge (last 2 major versions). No IE11.

### Accessibility

- All images require `alt` attributes
- Form inputs have associated `<label>` elements
- Color contrast: all text meets WCAG AA (4.5:1 minimum)
- Keyboard navigation: navbar dropdown and mobile menu are keyboard accessible
- Screen reader: `.sr-only` utility class available for visually hidden labels

### GitHub Pages Deployment Checklist

- [ ] Create GitHub repository
- [ ] Set `base` in `vite.config.js` to `/repo-name/`
- [ ] Run `npm run deploy`
- [ ] Enable GitHub Pages on the `gh-pages` branch in repo settings
- [ ] Verify site loads at `https://username.github.io/repo-name/`
- [ ] (Later) Point `dandlworks.ca` DNS to GitHub Pages, set `base: '/'`

---

## 10. Phased Roadmap

### Phase 1 — Current Build (v1.0) ✓

All core pages scaffolded, form wired, design system in place.

- [x] Home page (hero, trust bar, services grid, about teaser, snow callout, testimonials, form)
- [x] All 3 service pages (full content)
- [x] About page
- [x] Contact page (form + sidebar)
- [x] Navbar + Footer
- [x] Design system (variables + global CSS)
- [x] Data files (siteConfig, services, testimonials)
- [x] NOTES.md in every folder
- [x] CLAUDE.md root navigation guide
- [x] Build passing, 0 errors

**To activate Phase 1:**
- [ ] Get Formspree form ID → add to `QuoteForm.jsx`
- [ ] Set GitHub repo name → update `vite.config.js`
- [ ] Initialize git, push, run `npm run deploy`

---

### Phase 2 — Content & Trust (v1.1)

Goal: Replace all placeholders with real WPG Parking Lot Solutions content.

| Item | Description | Effort |
|------|-------------|--------|
| Real photography | Swap hero gradient placeholders with actual job-site photos | Low (drop files in `public/assets/images/`) |
| Real logo | Add `logo-dark.png` and `logo-white.png` to `public/assets/logos/` | Low |
| Real testimonials | Replace placeholder quotes in `testimonials.js` with verified client quotes | Low |
| Google Analytics | Add GA4 tracking snippet to `index.html` | Low |
| Favicon | Replace `.gitkeep` with real `favicon.ico` in `public/assets/logos/` | Low |

---

### Phase 3 — Portfolio & Social Proof (v1.2)

Goal: Give property managers visual evidence of WPG Parking Lot Solutions's work.

| Item | Description | Notes |
|------|-------------|-------|
| Portfolio gallery page | New `/portfolio` route with filterable project cards | Add `portfolio.js` data file + `Portfolio.jsx` page |
| Project case studies | Individual project pages: before/after, scope, outcome | `/portfolio/[slug]` — optional, high value |
| Service area map | Embedded map or illustrated region showing Winnipeg + surrounding area | Static image or Google Maps embed |
| Instagram feed embed | Pull latest @dl_concrete posts into homepage social section | Requires Instagram Basic Display API or third-party embed |

---

### Phase 4 — Conversion Optimization (v2.0)

Goal: Improve lead quality and reduce friction.

| Item | Description | Notes |
|------|-------------|-------|
| Multi-step quote form | Break quote form into steps (service → property → contact) to reduce abandonment | Replace QuoteForm.jsx |
| Live chat widget | Intercom or Crisp free tier — low barrier to first contact | Script tag in `index.html` |
| Seasonal landing pages | `/winter-maintenance` and `/spring-paving` for PPC campaigns | New pages + routes |
| Blog / Resources | "How to choose a commercial snow contractor in Winnipeg" — SEO content | New `/blog` route + markdown-driven posts |
| FAQ section | Answers common objections on service pages and contact page | Accordion component |

---

### Phase 5 — Infrastructure (v3.0)

Goal: Migrate off GitHub Pages as the site grows.

| Item | Notes |
|------|-------|
| Custom domain + SSL | Point `dandlworks.ca` at GitHub Pages or migrate to Netlify/Vercel |
| Switch to BrowserRouter | Replace HashRouter once custom domain is active and clean URLs are available |
| Headless CMS | Connect Contentful or Sanity for content editing without code changes |
| Client portal | Login-gated section for contract clients (job history, contacts) — long-term |

---

## 11. Out of Scope (v1)

The following will **not** be built in the current phase:

- User accounts or login
- CMS or admin interface — content is managed via direct code edits
- Pricing pages or calculators
- Blog or resource hub
- Instagram / social feed embed
- Service area map
- Portfolio / gallery
- Job listings or careers page
- Multi-language support (English only)
- PWA / offline mode

---

## 12. Open Questions

| # | Question | Owner | Priority |
|---|----------|-------|----------|
| 1 | What is the GitHub repository name? Needed to set `base` in `vite.config.js` before deploy. | Shawn | High |
| 2 | Has a Formspree account been created? What is the form ID? | Shawn | High |
| 3 | Does WPG Parking Lot Solutions have real photography available? If not, should stock photos be sourced temporarily? | Shawn / WPG Parking Lot Solutions | Medium |
| 4 | Are there any real client testimonials that can be used immediately? | Shawn / WPG Parking Lot Solutions | Medium |
| 5 | Is `dandlworks.ca` the target domain for GitHub Pages custom domain setup? | Shawn | Medium |
| 6 | Should the Privacy Policy and Terms of Service pages be built (currently linked to `#` in footer)? | Shawn | Low |
| 7 | Are there any brand guidelines (official hex codes, approved logo files) from the client? | Shawn | Low |

---

*End of PRD. This document should be updated as decisions are made and phases progress.*
