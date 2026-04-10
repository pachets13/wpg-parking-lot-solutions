import { Link } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import SEO from '../components/SEO'

export default function About() {
  return (
    <>
      <SEO
        title="About Us — 30+ Years of Commercial Expertise"
        description="WPG Parking Lot Solutions has served commercial property managers in Winnipeg since 1996. Learn about our team, values, and year-round maintenance approach."
        path="/about"
      />
      <Hero
        eyebrow="Winnipeg, Manitoba"
        title={<>Who We <em>Are</em></>}
        subtitle="Founded to bring a higher standard of care to commercial exterior properties across Winnipeg — and the experience to back it up."
        ctaPrimary={{ label: 'Get a Quote', to: '/contact' }}
        bgImage="/assets/images/hero/hero-about.jpg"
        size="full"
      />

      {/* ── Company Story ────────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'start' }}>
            <div>
              <span data-fade className="eyebrow">Our Story</span>
              <div className="divider" />
              <h2 data-fade style={{ transitionDelay: '100ms' }} className="heading-md">Built from construction and renovation roots.</h2>
              <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-5)' }} className="body-lg">
                WPG Parking Lot Solutions and Concrete was founded in 1996 — built on expertise that
                it spans more than three decades. Our principals built their careers in
                construction and renovation before turning their focus to commercial exterior
                property maintenance.
              </p>
              <p data-fade style={{ transitionDelay: '300ms', marginTop: 'var(--space-4)' }} className="body-lg">
                That background shows up in how we work. We think in systems — drainage,
                surface durability, maintenance cycles — not just in individual job scopes.
                We spec materials for longevity, not just price. And we take accountability
                seriously, because in construction, the work either holds up or it doesn't.
              </p>
              <p data-fade style={{ transitionDelay: '400ms', marginTop: 'var(--space-4)' }} className="body-lg">
                We work exclusively with commercial property managers and owners. That focus
                lets us specialize in the scale, the expectations, and the year-round demands
                of commercial properties. Residential referrals go elsewhere — by design.
              </p>
            </div>
            <div>
              {/* Placeholder — swap for real photo */}
              <div style={{
                aspectRatio: '3/4',
                background: 'linear-gradient(135deg, #2a2a2a 0%, #3d3d3d 100%)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: 'var(--color-mid)', fontSize: 'var(--text-sm)' }}>[ Team or job site photo ]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────── */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header">
            <span data-fade className="eyebrow">How We Work</span>
            <div className="divider" />
            <h2 data-fade style={{ transitionDelay: '100ms' }} className="heading-md">What drives us.</h2>
          </div>

          <div className="feature-list" style={{ marginTop: 'var(--space-10)' }}>
            {[
              {
                title: 'Commercial Only',
                body: 'We don\'t take residential work. Our equipment, our processes, and our team are built for commercial properties. That focus means better results for the clients we serve.',
              },
              {
                title: 'Year-Round Partnership',
                body: 'We\'re not here for a one-time job. We want to be your property\'s long-term maintenance partner — the team you call before problems develop.',
              },
              {
                title: 'Eco-Friendly Practices',
                body: 'From liquid de-icing technology to responsible material choices, we try to minimize the environmental footprint of the work we do.',
              },
              {
                title: 'Accountability',
                body: 'We stand behind our work. If something\'s not right, we make it right. That\'s what three-plus decades of doing this kind of work teaches you.',
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
      <section className="cta-banner">
        <div className="container">
          <h2 data-fade className="cta-banner__title">Have a project in mind?</h2>
          <p data-fade style={{ transitionDelay: '100ms' }} className="cta-banner__subtitle">
            Contact us today — we'll talk through your property's needs and put together a quote.
          </p>
          <div data-fade style={{ transitionDelay: '200ms' }} className="cta-banner__actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Request a Quote</Link>
            <a href="tel:+12047771467" className="btn btn-outline btn-lg">(204) 777-1467</a>
          </div>
        </div>
      </section>
    </>
  )
}
