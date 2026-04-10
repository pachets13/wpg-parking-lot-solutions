import Hero from '../components/sections/Hero'
import QuoteForm from '../components/sections/QuoteForm'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function DesignBuild() {
  return (
    <>
      <SEO
        title="Design-Build Parking Lot Solutions — Winnipeg"
        description="Full-lifecycle parking lot services in Winnipeg: design, grading, paving, drainage, and long-term maintenance. One team, one partner, zero coordination gaps."
        path="/services/design-build"
      />
      <Hero
        eyebrow="Commercial Services"
        title={<>Design-Build Solutions for <em>Every Parking Lot Need</em></>}
        subtitle="From concept and planning through construction and long-term maintenance — WPG Parking Lot Solutions manages the entire lifecycle of your commercial parking lot."
        ctaPrimary={{ label: 'Get a Quote', to: '/contact' }}
        bgImage="/assets/images/hero/hero-design-build.jpg"
        size="full"
      />

      {/* ── Intro ───────────────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <span data-fade className="eyebrow">Design Build</span>
            <div className="divider" />
            <h2 data-fade style={{ transitionDelay: '100ms' }} className="heading-md">One team. The full picture.</h2>
            <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-5)' }} className="body-lg">
              Most contractors handle one piece of the puzzle. WPG Parking Lot Solutions can take your parking
              lot from an initial design consultation through grading, drainage, paving,
              feature installation, and into an ongoing maintenance relationship. No handoffs,
              no coordination gaps — one accountable team from day one.
            </p>
          </div>

          <div className="feature-list" style={{ marginTop: 'var(--space-12)' }}>
            {[
              {
                title: 'Comprehensive Parking Lot Design & Construction',
                body: 'Layout planning, site grading, drainage engineering, new builds, and full-lot revitalization projects. We\'ve done it all, and we spec everything for Manitoba conditions.',
              },
              {
                title: 'Beyond Asphalt: Full Spectrum Services',
                body: 'Curbing, sidewalks, integrated drainage, and from day one, a winter maintenance plan. We think about how your lot performs in February, not just July.',
              },
              {
                title: 'Custom Site Features & Amenities',
                body: 'Curbs, signage, lighting installations, fencing, accessibility improvements, and custom site features tailored to your property\'s operational needs.',
              },
              {
                title: 'Long-Term Maintenance & Ongoing Support',
                body: 'Crack repairs, seal coating, seasonal inspections, and snow & ice management. We\'re not here for one project — we\'re here to be your ongoing property partner.',
              },
            ].map((item, i) => (
              <div key={item.title} className="feature-item" data-fade style={{ transitionDelay: `${i * 120}ms` }}>
                <h3 className="feature-item__title">{item.title}</h3>
                <p className="feature-item__body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why One Partner ─────────────────────────────────── */}
      <section className="section section--dark">
        <div className="container">
          <div style={{ maxWidth: 720 }}>
            <span data-fade className="eyebrow">The Advantage</span>
            <div className="divider" />
            <h2 data-fade style={{ transitionDelay: '100ms', color: 'var(--color-white)' }} className="heading-md">
              Why one design-build partner changes everything.
            </h2>
            <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-5)' }} className="body-lg--light">
              When you hire separate contractors for design, construction, and maintenance,
              you absorb the coordination risk. Each team optimizes for their piece — and
              nobody owns the outcome.
            </p>
            <p data-fade style={{ transitionDelay: '300ms', marginTop: 'var(--space-4)' }} className="body-lg--light">
              With WPG Parking Lot Solutions as your design-build partner, the people who build it are the people
              who maintain it. We have every reason to build it right, because we'll be back
              every season to take care of it.
            </p>
            <div data-fade style={{ transitionDelay: '400ms', marginTop: 'var(--space-8)' }}>
              <Link to="/contact" className="btn btn-primary btn-lg">Contact Us Today</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Portfolio Image ─────────────────────────────────── */}
      <section style={{ background: 'var(--color-ink)', padding: '0' }}>
        <div style={{ aspectRatio: '21/9', overflow: 'hidden' }}>
          <img
            src={`${import.meta.env.BASE_URL}assets/images/services/design-build-2.png`}
            alt="Completed commercial concrete parking lot project by WPG Parking Lot Solutions in Winnipeg"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* ── CTA Form ────────────────────────────────────────── */}
      <section className="quote-form-section">
        <div className="container">
          <div className="section-header--centered">
            <span data-fade className="eyebrow eyebrow--light">Get Started</span>
            <h2 data-fade style={{ transitionDelay: '100ms', color: 'var(--color-white)' }} className="heading-md">
              Tell us about your project.
            </h2>
            <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-4)' }} className="body-lg--light">
              Whether you're planning a new lot or revitalizing an existing one,
              we'd like to hear what you're working with.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  )
}
