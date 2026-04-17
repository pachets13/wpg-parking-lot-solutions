import { Link } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import QuoteForm from '../components/sections/QuoteForm'
import SEO from '../components/SEO'

export default function ConcreteAsphalt() {
  return (
    <>
      <SEO
        title="Concrete & Asphalt Paving — Commercial Parking Lots"
        description="Commercial asphalt paving, concrete installation, resurfacing, and crack sealing in Winnipeg. Built for Manitoba's freeze-thaw climate. Get a quote today."
        path="/services/concrete-asphalt"
      />
      <Hero
        eyebrow="Commercial Services"
        title={<>Expert Parking Lot Solutions <em>Built to Last</em></>}
        subtitle="From new asphalt paving to concrete repairs, resurfacing, and curb work — WPG Parking Lot Solutions handles every hard surface need for commercial properties in Winnipeg."
        ctaPrimary={{ label: 'Get a Quote', to: '/contact' }}
        bgImage="/assets/images/hero/hero-concrete-asphalt.jpg"
        size="full"
      />

      {/* ── Service Detail ───────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <span data-fade className="eyebrow">Concrete &amp; Asphalt</span>
            <div className="divider" />
            <h2 data-fade style={{ transitionDelay: '100ms' }} className="heading-md">
              Manitoba winters are hard on pavement. We're harder on deterioration.
            </h2>
            <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-5)' }} className="body-lg">
              Commercial parking lots and hardscapes endure constant traffic, freeze-thaw cycles,
              and chemical exposure. WPG Parking Lot Solutions provides the full spectrum of concrete and asphalt
              services your property needs — whether it's a new build, a repair, or a complete
              resurfacing project.
            </p>
          </div>

          <div className="feature-list feature-list--3col" style={{ marginTop: 'var(--space-12)' }}>
            <div className="feature-item" data-fade style={{ transitionDelay: '0ms' }}>
              <h3 className="feature-item__title">Concrete</h3>
              <p className="feature-item__body">
                Parking lots, sidewalks, curbing, and new installations. Designed
                and poured to handle Manitoba's extreme freeze-thaw cycles without
                premature cracking.
              </p>
            </div>
            <div className="feature-item" data-fade style={{ transitionDelay: '120ms' }}>
              <h3 className="feature-item__title">Asphalt</h3>
              <p className="feature-item__body">
                New paving, patch repairs, resurfacing, and crack sealing for
                commercial parking lots and private roadways. We use commercial-grade
                materials and equipment throughout.
              </p>
            </div>
            <div className="feature-item" data-fade style={{ transitionDelay: '240ms' }}>
              <h3 className="feature-item__title">&amp; More</h3>
              <p className="feature-item__body">
                Fence repairs, parking lot electrical installations, site lighting,
                and custom commercial projects. If it's exterior and commercial, ask us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Detail Image ────────────────────────────────────── */}
      <section style={{ background: 'var(--color-snow)', padding: '0' }}>
        <div data-fade style={{ borderRadius: 0, overflow: 'hidden', aspectRatio: '21/9' }}>
          <img
            src={`${import.meta.env.BASE_URL}assets/images/services/concrete-detail.jpg`}
            alt="Commercial concrete parking lot installation in Winnipeg, Manitoba"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* ── Why WPG Parking Lot Solutions ─────────────────────────────────────────── */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header">
            <span data-fade className="eyebrow">Why WPG Parking Lot Solutions</span>
            <h2 data-fade style={{ transitionDelay: '100ms' }} className="heading-md">Commercial-only focus. Accountability you can count on.</h2>
          </div>
          <div className="feature-list" style={{ marginTop: 'var(--space-8)' }}>
            {[
              {
                title: 'Commercial-Scale Equipment',
                body: 'We run equipment sized for commercial properties — not residential kits dressed up for bigger jobs.',
              },
              {
                title: 'Manitoba Climate Expertise',
                body: 'Every mix, every installation is specified for our local freeze-thaw conditions. We\'ve watched inferior work fail. We don\'t repeat it.',
              },
              {
                title: 'Single Point of Contact',
                body: 'One team, one relationship. No subcontracting the parts nobody wants to do.',
              },
              {
                title: '30+ Years of Experience',
                body: 'Our principals have been doing this for over three decades. That knowledge shows up in how we assess, plan, and execute.',
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

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="quote-form-section">
        <div className="container">
          <div className="section-header--centered">
            <span data-fade className="eyebrow eyebrow--light">Get Started</span>
            <h2 data-fade style={{ transitionDelay: '100ms', color: 'var(--color-white)' }} className="heading-md">
              Tell us about your project.
            </h2>
            <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-4)' }} className="body-lg--light">
              We'll review your needs and follow up within one business day.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  )
}
