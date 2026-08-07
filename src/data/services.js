// services.js — Content data for service cards (homepage grid) and service pages.
// To add a new service: add an object here and add a corresponding Route + Page file.

export const services = [
  {
    id: 'concrete-asphalt',
    slug: '/services/concrete-asphalt',
    title: 'Concrete & Asphalt',
    shortTitle: 'Concrete & Asphalt',
    tagline: 'Expert Parking Lot Solutions Built to Last',
    description:
      'From new asphalt paving and concrete installations to repairs, resurfacing, and curb work — we handle every hard surface need for commercial properties.',
    icon: 'concrete',
    heroImage: '/assets/images/hero/hero-concrete-asphalt.jpg',
    features: [
      {
        title: 'Concrete',
        body: 'Parking lots, sidewalks, curb repairs, new installs, and upgrades. Built to handle Manitoba\'s freeze-thaw cycles.',
      },
      {
        title: 'Asphalt',
        body: 'New paving, patching, resurfacing, and crack sealing for commercial parking lots and roadways.',
      },
      {
        title: '& More',
        body: 'Fence repairs, electrical installations for parking lots, and custom commercial projects.',
      },
    ],
  },
  {
    id: 'snow-ice',
    slug: '/services/snow-ice',
    title: 'Snow & Ice Solutions',
    shortTitle: 'Snow & Ice',
    tagline: 'Manitoba Winter, Handled.',
    description:
      'Advanced liquid de-icing technology combined with heavy-duty clearing equipment. We don\'t just react to snow — we prevent ice before it forms.',
    icon: 'snow',
    heroImage: '/assets/images/hero/hero-snow-ice.jpg',
    features: [
      {
        title: 'Liquid De-Icing',
        body: 'Pre-treatment stops ice from bonding to surfaces. More effective, longer-lasting, and far less damaging to your property than rock salt.',
      },
      {
        title: 'Snow Clearing',
        body: 'Loaders, skid steers, and plow equipment for parking lots, roadways, walkways, and entrances. Proactive and responsive.',
      },
      {
        title: 'Eco-Friendly Approach',
        body: 'Liquid de-icers minimize environmental impact — safer for your landscaping, surrounding water systems, and local wildlife.',
      },
    ],
  },
  {
    id: 'design-build',
    slug: '/services/design-build',
    title: 'Design Build',
    shortTitle: 'Design Build',
    tagline: 'Full-Cycle Parking Lot Solutions',
    description:
      'From concept and planning through construction and long-term maintenance — we manage the entire lifecycle of your commercial parking lot.',
    icon: 'design',
    heroImage: '/assets/images/hero/hero-design-build.jpg',
    features: [
      {
        title: 'Design & Construction',
        body: 'Layout planning, new builds, and full-lot revitalization. We handle permits, grading, drainage, and surface work.',
      },
      {
        title: 'Full Spectrum Services',
        body: 'Curbs, sidewalks, drainage systems, and integrated snow & ice maintenance from day one.',
      },
      {
        title: 'Custom Site Features',
        body: 'Signage, lighting, fencing, accessibility improvements, and custom amenities tailored to your property.',
      },
      {
        title: 'Long-Term Maintenance',
        body: 'Crack repairs, seal coating, regular inspections. We\'re not a one-time contractor — we\'re your ongoing property partner.',
      },
    ],
  },
]
