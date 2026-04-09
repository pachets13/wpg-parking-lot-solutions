import { Link } from 'react-router-dom'
import ServicesGrid from '../components/sections/ServicesGrid'
import Testimonials from '../components/sections/Testimonials'
import QuoteForm from '../components/sections/QuoteForm'
import { siteConfig } from '../data/siteConfig'

// ── Icon components (inline SVG, no dependencies) ──────────────────

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconLeaf() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 19.5c1.33-1.08 3.08-2 5.18-2 4 0 6-3.5 10-3.5 3 0 4 1 4 1V8s-1 0-6 0z" />
      <path d="M3 21c1.5-1 4.5-3 7-3" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function IconDroplet() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  )
}

function IconStar() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

// ── StarRating ──────────────────────────────────────────────────────
function StarRating({ count = 5 }) {
  return (
    <div className="star-rating">
      {Array.from({ length: count }).map((_, i) => (
        <IconStar key={i} />
      ))}
    </div>
  )
}

// ── BenefitRow ──────────────────────────────────────────────────────
function BenefitRow({ icon, title, body }) {
  return (
    <div className="benefit-row">
      <div className="benefit-row__icon">{icon}</div>
      <div>
        <div className="benefit-row__title">{title}</div>
        <div className="benefit-row__body">{body}</div>
      </div>
    </div>
  )
}

// ── Home page ───────────────────────────────────────────────────────
export default function Home() {
  const { contact } = siteConfig

  return (
    <>

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <section className="hero hero--full">
        {/* Background — swap src for real photo when available */}
        <div
          className="hero__bg"
          style={{
            backgroundImage: 'url(/assets/images/hero/hero-home.jpg)',
            // Placeholder gradient removed once real photo is added above
          }}
          aria-hidden="true"
        />

        <div className="hero__content container">
          <div className="hero__inner">

            {/* Eyebrow lockup */}
            <div className="hero__eyebrow-row">
              <span className="hero__eyebrow-line" aria-hidden="true" />
              <span className="eyebrow eyebrow--light">Winnipeg, Manitoba</span>
            </div>

            {/* Headline */}
            <h1 className="hero__title">
              The All Season<br />
              <em>Parking Lot</em><br />
              Experts
            </h1>

            {/* Amber rule */}
            <div className="hero__divider-rule" aria-hidden="true" />

            {/* Subtitle */}
            <p className="hero__subtitle">
              Year-round commercial property maintenance for Winnipeg property managers
              who can't afford downtime — concrete, asphalt, and advanced snow &amp; ice management.
            </p>

            {/* CTAs */}
            <div className="hero__ctas">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get a Quote
              </Link>
              <Link to="/services/snow-ice" className="btn btn-outline btn-lg">
                Our Differentiator →
              </Link>
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero__scroll-hint" aria-hidden="true">
          <div className="hero__scroll-line" />
        </div>
      </section>


      {/* ══ TRUST BAR ═══════════════════════════════════════════════ */}
      <div className="trust-bar">
        <div className="container trust-bar__inner">
          {[
            { icon: '✦', label: '30+ Years Experience' },
            { icon: '✦', label: 'Winnipeg, Manitoba' },
            { icon: '✦', label: 'Commercial B2B Only' },
            { icon: '✦', label: 'Eco-Friendly Approach' },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-10)' }}>
              <div className="trust-bar__item">
                <span style={{ fontSize: '10px', opacity: 0.7 }}>{item.icon}</span>
                <span className="trust-bar__label">{item.label}</span>
              </div>
              {i < arr.length - 1 && <div className="trust-bar__divider" />}
            </div>
          ))}
        </div>
      </div>


      {/* ══ SERVICES ════════════════════════════════════════════════ */}
      <section className="section section--white">
        <div className="container">
          <div className="services-section-header">
            <div className="services-section-header__text">
              <span className="eyebrow">What We Do</span>
              <div className="divider" />
              <h2 className="heading-lg">
                Three disciplines.<br />One reliable partner.
              </h2>
              <p className="body-lg" style={{ marginTop: 'var(--space-4)' }}>
                WPG Parking Lot Solutions handles everything your commercial property needs, year-round —
                from fresh asphalt to a winter that stays clear.
              </p>
            </div>
            <div className="services-section-header__aside">
              <div style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                letterSpacing: 'var(--tracking-wider)',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                marginBottom: 'var(--space-2)',
              }}>
                Serving Winnipeg since
              </div>
              <div style={{
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-weight-black)',
                color: 'var(--color-border-light)',
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 1,
              }}>
                2023
              </div>
            </div>
          </div>

          {/* Service cards — from ServicesGrid data, rendered inline for layout control */}
          <ServicesGridInline />
        </div>
      </section>


      {/* ══ METRICS STRIP ═══════════════════════════════════════════ */}
      <div className="metrics-strip">
        <div className="container" style={{ padding: 0, maxWidth: '100%' }}>
          <div className="metrics-grid" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', paddingLeft: 'var(--container-padding)', paddingRight: 'var(--container-padding)' }}>
            <div className="metric-item">
              <span className="metric-value">30<sup>+</sup></span>
              <span className="metric-label">Years of industry experience behind every job</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">3</span>
              <span className="metric-label">Core service disciplines under one roof</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">12</span>
              <span className="metric-label">Months a year — not just the warm ones</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">1</span>
              <span className="metric-label">Point of contact for everything on your property</span>
            </div>
          </div>
        </div>
      </div>


      {/* ══ ABOUT TEASER ════════════════════════════════════════════ */}
      <section className="section section--white">
        <div className="container">
          <div className="about-teaser">

            <div className="about-teaser__content">
              <span className="eyebrow">Who We Are</span>
              <div className="divider" />
              <h2 className="heading-lg">
                Built on three decades of commercial expertise.
              </h2>
              <p className="body-lg" style={{ marginTop: 'var(--space-5)' }}>
                WPG Parking Lot Solutions was founded to bring a higher standard of care to commercial exterior
                properties across Winnipeg. Our principals carry 30+ years of hands-on
                construction and property maintenance experience — and a mandate to
                do the job right the first time.
              </p>
              <p className="body-lg" style={{ marginTop: 'var(--space-4)' }}>
                We work exclusively with commercial property managers and owners.
                That focus means our equipment, our processes, and our team are built
                for the scale and accountability your properties demand.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-outline-dark">
                  About WPG Parking Lot Solutions
                </Link>
                <Link to="/contact" className="btn btn-ghost">
                  Request a Quote →
                </Link>
              </div>
            </div>

            {/* Image placeholder — drop real photo into public/assets/images/team/ */}
            <div className="about-image-frame">
              <div className="about-image-placeholder">
                {/* Replace with: <img src="/assets/images/team/jobsite-01.jpg" alt="WPG Parking Lot Solutions crew on site" ... /> */}
                <span style={{ color: 'var(--color-mid)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  [ Job site photo ]
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ══ SNOW & ICE DIFFERENTIATOR ════════════════════════════════ */}
      <section className="section section--dark" style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Large decorative background text */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: '50%',
          right: '-2rem',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          fontWeight: 'var(--font-weight-black)',
          color: 'rgba(255,255,255,0.025)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          −40°
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-16)',
            alignItems: 'center',
          }}>

            {/* Left — prose */}
            <div>
              <span className="eyebrow">Our Differentiator</span>
              <div className="divider" />
              <h2 className="heading-lg" style={{ color: 'var(--color-white)' }}>
                Liquid de-icing.<br />
                Not your neighbour's<br />
                rock salt.
              </h2>
              <p className="body-lg--light" style={{ marginTop: 'var(--space-5)' }}>
                Traditional sand and salt is reactive — you're already behind once ice has
                formed. It's corrosive to your concrete and damaging to surrounding vegetation.
                Most Winnipeg operators still use it because it's cheap and familiar.
              </p>
              <p className="body-lg--light" style={{ marginTop: 'var(--space-4)' }}>
                WPG Parking Lot Solutions uses liquid de-icing technology that{' '}
                <strong style={{ color: 'var(--color-white)', fontWeight: 'var(--font-weight-semibold)' }}>
                  prevents ice from bonding
                </strong>{' '}
                in the first place. Fewer applications, longer-lasting coverage, and
                significantly less damage to the property you're responsible for.
              </p>
              <div style={{ marginTop: 'var(--space-8)' }}>
                <Link to="/services/snow-ice" className="btn btn-primary btn-lg">
                  See Snow &amp; Ice Services
                </Link>
              </div>
            </div>

            {/* Right — benefit rows with icons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <BenefitRow
                icon={<IconShield />}
                title="Prevents Ice Formation"
                body="Pre-treatment creates a barrier that stops ice from bonding to asphalt and concrete before the storm arrives."
              />
              <BenefitRow
                icon={<IconClock />}
                title="Increases Efficiency"
                body="Even, consistent coverage with fewer applications needed per season. Longer-lasting than traditional salt."
              />
              <BenefitRow
                icon={<IconDroplet />}
                title="Protects Your Property"
                body="Significantly reduces corrosion to concrete, asphalt, curbing, and metal infrastructure."
              />
              <BenefitRow
                icon={<IconLeaf />}
                title="Minimizes Environmental Impact"
                body="Safer for surrounding landscaping, nearby water systems, and local wildlife."
              />
            </div>

          </div>
        </div>
      </section>


      {/* ══ TESTIMONIALS ════════════════════════════════════════════ */}
      <section className="section section--light">
        <div className="container">

          <div className="section-header--centered">
            <span className="eyebrow">Client Feedback</span>
            <div className="divider divider--center" />
            <h2 className="heading-lg">
              Trusted by Winnipeg<br />property managers.
            </h2>
            <div className="testimonials-header-stat">
              <span>Commercial properties across Winnipeg</span>
              <span className="testimonials-header-stat__divider" />
              <span>Year-round service partnerships</span>
            </div>
          </div>

          <TestimonialsInline />

        </div>
      </section>


      {/* ══ QUOTE FORM ══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-charcoal)', paddingTop: 'var(--space-24)', paddingBottom: 'var(--space-24)' }}>
        <div className="container">

          <div style={{ maxWidth: 560 }}>
            <span className="eyebrow eyebrow--light">Get Started</span>
            <div className="divider" />
            <h2 className="heading-lg" style={{ color: 'var(--color-white)' }}>
              Request a quote.
            </h2>
            <p className="body-lg--light" style={{ marginTop: 'var(--space-4)' }}>
              Tell us about your property. We'll follow up within one business day —
              usually faster.
            </p>
          </div>

          <div className="form-section-columns">
            <QuoteForm />

            {/* Sidebar */}
            <div className="form-section-aside">
              <div className="form-aside-card">

                <div className="form-aside-item">
                  <span className="form-aside-label">Prefer to call?</span>
                  <a href={contact.phoneHref} className="form-aside-value">
                    {contact.phone}
                  </a>
                </div>

                <div className="form-aside-item">
                  <span className="form-aside-label">Email</span>
                  <a href={contact.emailHref} className="form-aside-value--amber">
                    {contact.email}
                  </a>
                </div>

                <div className="form-aside-item">
                  <span className="form-aside-label">Service Area</span>
                  <span className="form-aside-value--sm">{contact.serviceArea}</span>
                </div>

                <div style={{
                  padding: 'var(--space-4)',
                  background: 'rgba(192, 120, 0, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '3px solid var(--color-amber)',
                }}>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-silver)', lineHeight: 'var(--leading-relaxed)' }}>
                    <strong style={{ color: 'var(--color-white)', display: 'block', marginBottom: 'var(--space-1)' }}>
                      Commercial properties only.
                    </strong>
                    WPG Parking Lot Solutions exclusively serves commercial property managers and owners.
                    We do not take residential work.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

    </>
  )
}


// ── Inline versions of grid sections (allows tighter layout control) ──

import { services } from '../data/services'
import ServiceCard from '../components/ui/ServiceCard'
import { testimonials } from '../data/testimonials'

function ServicesGridInline() {
  return (
    <div className="services-grid">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}

function TestimonialsInline() {
  return (
    <div className="testimonials-grid" style={{ marginTop: 'var(--space-12)' }}>
      {testimonials.map(t => (
        <div key={t.id} className="testimonial-card">
          <StarRating />
          <p className="testimonial-card__quote">{t.quote}</p>
          <div className="testimonial-card__author">
            <span className="testimonial-card__name">{t.name}</span>
            <span className="testimonial-card__meta">{t.title} — {t.company}</span>
            {t.service && (
              <span className="testimonial-card__service-tag">{t.service}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
