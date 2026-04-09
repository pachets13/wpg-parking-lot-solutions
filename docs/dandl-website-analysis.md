# WPG Parking Lot Solutions and Concrete — Website Analysis
> Reference document for Claude Code. Describes the current website's structure, content, and design patterns before a redesign is planned and built.

---

## 1. Overview

- **URL:** https://www.dandlworks.ca/
- **Platform:** Squarespace
- **Business Type:** Commercial exterior property maintenance (B2B)
- **Service Area:** Winnipeg, Manitoba and surrounding area
- **Target Audience:** Commercial property managers and owners
- **Contact:** (204) 777-1467 | info@dandlworks.ca
- **Address:** 26 Don Valley Parkway, Sunnyside, Manitoba, R5R 0C9

---

## 2. Site Map

```
/ (Home)
├── /concrete-asphalt       (Service page)
├── /snow-ice               (Service page)
├── /design-build           (Service page)
├── /about
├── /contact
├── /terms-of-service
└── /privacy-policy
```

Navigation groups the three service pages under a **"Services" dropdown folder** in the top nav. All other pages are top-level nav items.

---

## 3. Page-by-Page Breakdown

---

### 3.1 Home (`/`)

**Purpose:** Introduction to the brand and gateway to service pages.

**Sections (top to bottom):**

1. **Hero**
   - Headline: *"The All Season Parking Lot Experts"*
   - CTA button: "Learn more" → links to `/about`

2. **Our Services (3-column card grid)**
   - Concrete and Asphalt → `/concrete-asphalt`
   - Snow and Ice Maintenance → `/snow-ice`
   - Custom Solutions → `/design-build`
   - Each card has a short description and a "Learn more" link

3. **Brand Vision / About Teaser**
   - Short paragraph about serving commercial properties across Winnipeg
   - Highlights: year-round service, 30+ years experience, professionalism
   - CTA: "Learn more" → `/about`

4. **Social Media Section**
   - Three image tiles linking to Instagram, LinkedIn, and X/Twitter
   - Instagram: @dl_concrete
   - LinkedIn: WPG Parking Lot Solutions and Concrete company page
   - X/Twitter: @dandlworks

5. **Contact Form (embedded)**
   - Headline: *"Contact Us"*
   - Short description inviting inquiries
   - Squarespace native form (fields not fully visible in source)

6. **Footer**
   - Logo (white transparent version)
   - Phone number
   - Email
   - Company description blurb (same across all pages)
   - Physical address
   - Footer links: Asphalt Services, Terms of Service, Request a Quote, About, Privacy Policy, Snow Services
   - Copyright: © 2025 D and L Landscaping Ltd. All Rights Reserved.

---

### 3.2 Concrete & Asphalt (`/concrete-asphalt`)

**Purpose:** Describes paving and concrete services.

**Sections:**

1. **Hero Image** — Full-width photo of a parking lot

2. **Service Description Block**
   - Headline: *"Expert Parking Lot Solutions Built to Last"*
   - Three sub-sections with bold headers:
     - **Concrete** — Parking lots, sidewalks, curb repairs, new installs and upgrades
     - **Asphalt** — New paving, repairs, resurfacing for commercial properties
     - **& More** — Fence repairs, electrical installations for parking lots, custom projects

3. **Contact CTA**
   - Headline: *"Contact us."*
   - Subtext: *"Let's work together to achieve your parking lot goals today!"*
   - Email address displayed

4. **Footer** (same as all pages)

---

### 3.3 Snow & Ice Solutions (`/snow-ice`)

**Purpose:** Describes winter maintenance services. This is the most detailed and content-rich service page — clearly the primary differentiator.

**Sections:**

1. **Hero Image** — Photo of winter parking lot operations

2. **Page Headline:** *"THE SNOW & ICE EXPERTS"*
   - Opening paragraph emphasizing Manitoba winter challenges and WPG Parking Lot Solutions's advanced approach

3. **Liquid De-Icing Section**
   - Headline: *"Why Choose WPG Parking Lot Solutions for Liquid De-Icing?"*
   - Intro framing traditional rock salt/sand as damaging and inferior
   - **4 bullet benefits:**
     - Prevents Ice Formation (pre-treatment stops bonding)
     - Increases Efficiency (even coverage, longer lasting, fewer applications)
     - Protects Your Property (reduces corrosion)
     - Minimizes Environmental Impact (safer for landscaping, water, wildlife)
   - **Two side-by-side comparison images:**
     - "A Typical Winnipeg Winter Parking Lot" (before)
     - "A Winnipeg Winter Parking Lot Maintained by WPG Parking Lot Solutions" (after)

4. **Snow Clearing Section**
   - Headline: *"Why Choose WPG Parking Lot Solutions for Snow Clearing?"*
   - Positions competitors as using outdated methods
   - **4 bullet benefits:**
     - Heavy-Duty Equipment (loaders, skid steers, plows)
     - Comprehensive Coverage (parking lots, roadways, walkways, entrances)
     - Proactive & Responsive Service
     - Pair with Liquid De-Icing (upsell prompt)
   - Additional equipment photo

5. **Contact CTA**
   - *"Let's work together."*
   - Prompts contact for info packet

4. **Footer** (same as all pages)

---

### 3.4 Design Build (`/design-build`)

**Purpose:** Describes end-to-end project management services for commercial parking lots.

**Sections:**

1. **Hero Image** — Aerial/overhead parking lot photo

2. **Page Headline:** *"DESIGN-BUILD Solutions For All Your Parking Lot Needs"*
   - Intro paragraph about full-cycle service from design through maintenance

3. **Four Service Pillars (text blocks):**
   - **Comprehensive Parking Lot Design & Construction** — Layout planning, new builds, revitalization
   - **Beyond Asphalt: Full Spectrum Services** — Curbs, sidewalks, drainage, snow/ice maintenance
   - **Custom Site Features & Amenities** — Curbs, signage, lighting, fencing
   - **Long-Term Maintenance & Ongoing Support** — Crack repairs, seal coating, inspections; framed as ongoing partnership

4. **CTA Button:** "Contact us today" → `/contact`

5. **Footer** (same as all pages)

---

### 3.5 About (`/about`)

**Purpose:** Company background and trust-building.

**Sections:**

1. **Headline:** *"Who We Are"*

2. **Company Story Paragraph**
   - Founded: 2023
   - Experience: 30+ years (principals/team background)
   - Origin: Built from construction and renovation roots, expanded to commercial exterior care
   - Differentiator mentioned: eco-friendly liquid de-icing
   - Equipment: state-of-the-art fleet

3. **Mission Statement Framing**
   - Driven by excellence and customer satisfaction
   - Goal: expert care that keeps property functioning year-round

4. **Photo** — Full-width image (appears to be a construction/property scene)

5. **Contact CTA Block**
   - *"Have a project in mind? Contact us today..."*

6. **Footer** (same as all pages)

---

### 3.6 Contact (`/contact`)

**Purpose:** Primary conversion page.

**Sections:**

1. **Headline:** *"Contact Us"*
2. **Short intro paragraph**
3. **Email address** displayed as a mailto link: info@dandlworks.ca
4. **Full-width image** (appears to be a construction/equipment scene)
5. **Footer** (same as all pages)

> **Note:** Despite the homepage referencing a contact form and CTA buttons across pages saying "Request a Quote," the actual `/contact` page only shows an email address and an image. No embedded form, no phone number displayed, and no quote form is present on this page specifically.

---

### 3.7 Terms of Service & Privacy Policy

- Standard Squarespace-generated legal pages
- No unique branding or content of note
- Linked in the footer

---

## 4. Navigation Structure

**Top Navigation (desktop):**
```
[Logo]    Services ▾    About    Contact
                ├── Concrete & Asphalt
                ├── Snow & Ice Solutions
                └── Design Build
```

**Footer Navigation:**
- Asphalt Services
- Terms of Service
- Request a Quote
- About
- Privacy Policy
- Snow Services

---

## 5. Design & Visual Language

### Colors
- **Primary:** Dark/charcoal grey (used heavily in logo and backgrounds)
- **Secondary:** White (logo variant, text on dark backgrounds)
- **Accent:** Not clearly defined — minimal use of a standout accent color

### Typography
- Squarespace default fonts — mix of sans-serif headings and body text
- Headlines use uppercase or sentence case depending on page
- Body copy is clean and readable, left-aligned or centered

### Logo
- Two versions: grey transparent (used on light backgrounds in nav) and white transparent (used on dark backgrounds in footer)
- Format: PNG with transparency

### Imagery
- Heavy use of full-width hero images at the top of each page
- Real job-site and equipment photography (not all stock)
- Snow & Ice page uses before/after comparison images — the most visually strategic use of imagery on the site
- Social section on homepage uses lifestyle/abstract images as link tiles

### Layout Patterns
- Single-column content flow on most pages
- Homepage uses a 3-column card grid for services
- No sidebar content anywhere
- Heavy use of section breaks with alternating background tones

---

## 6. Content Tone & Messaging

- **Voice:** Direct, professional, confident — written for commercial property managers
- **Positioning:** "All season parking lot experts" — year-round partner, not just a seasonal vendor
- **Key Differentiator Messaging:** Liquid de-icing technology over traditional sand/salt
- **Trust Signals:** 30+ years experience, advanced equipment fleet, eco-friendly approach, local Winnipeg business
- **CTAs used across site:** "Learn more," "Contact us," "Request a Quote," "Let's work together"

---

## 7. Functional Notes & Gaps

| Element | Current State |
|---|---|
| Contact form | Present on homepage only; `/contact` page has no form |
| Quote request | Referenced in footer and CTAs but no dedicated form exists |
| Portfolio/Gallery | None — no project photos or case studies |
| Testimonials/Reviews | None present anywhere on the site |
| Blog/Resources | None |
| Pricing | Not disclosed anywhere |
| Service area map | No map or geographic visual |
| Mobile navigation | Hamburger menu (Squarespace default) |
| Social feeds | Linked but not embedded |
| Analytics/tracking | Unknown — standard Squarespace |

---

## 8. Social Presence

| Platform | Handle/Link |
|---|---|
| Instagram | @dl_concrete |
| LinkedIn | WPG Parking Lot Solutions and Concrete (company page) |
| X / Twitter | @dandlworks |

---

*End of analysis. This document is intended as a reference for understanding the existing site before designing and building a new version.*
