import { Link } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import QuoteForm from '../components/sections/QuoteForm'
import SEO from '../components/SEO'

export default function SnowIce() {
  return (
    <>
      <SEO
        title="Snow & Ice Management — Winnipeg Commercial Properties"
        description="Advanced liquid de-icing and heavy-duty snow clearing for Winnipeg commercial parking lots. Proactive ice prevention — not just reactive salting. Get a quote."
        path="/services/snow-ice"
      />
      <Hero
        eyebrow="Commercial Winter Maintenance"
        title={<>Manitoba Winter, <em>Handled.</em></>}
        subtitle="Advanced liquid de-icing technology and heavy-duty clearing equipment. We don't just react to snow — we prevent ice before it forms."
        ctaPrimary={{ label: 'Get a Quote', to: '/contact' }}
        bgImage="/assets/images/hero/hero-snow-ice.jpg"
        size="full"
      />

      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <span data-fade className="eyebrow">Snow &amp; Ice Solutions</span>
            <div className="divider" />
            <h2 data-fade style={{ transitionDelay: '100ms' }} className="heading-md">
              The Snow &amp; Ice Experts
            </h2>
            <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-5)' }} className="body-lg">
              Winnipeg winters are not optional maintenance. Your tenants, your
              liability exposure, and your property all depend on a contractor who
              treats winter as a system to manage — not an event to react to.
              WPG Parking Lot Solutions brings advanced equipment and liquid de-icing technology that most
              Winnipeg operators simply don't offer.
            </p>
          </div>
        </div>
      </section>

      {/* ── Liquid De-Icing ──────────────────────────────────── */}
      <section className="section section--dark">
        <div className="container">
          <div className="two-col-grid">
            <div>
              <span data-fade className="eyebrow">Our Differentiator</span>
              <div className="divider" />
              <h2 data-fade style={{ transitionDelay: '100ms', color: 'var(--color-white)' }} className="heading-md">
                Why Choose WPG Parking Lot Solutions for Liquid De-Icing?
              </h2>
              <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-5)' }} className="body-lg--light">
                Traditional rock salt and sand is the industry default — and it's costly
                in ways most property managers don't account for. It's corrosive to
                concrete and metal, damaging to surrounding vegetation, and reactive:
                by the time you apply it, ice has already formed.
              </p>
              <p data-fade style={{ transitionDelay: '300ms', marginTop: 'var(--space-4)' }} className="body-lg--light">
                Liquid de-icing works differently. Applied before a storm,{' '}
                <strong style={{ color: 'var(--color-white)' }}>it prevents ice from bonding to the surface</strong>{' '}
                — which means less clearing time, fewer applications, and a parking lot
                that actually stays accessible.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                {
                  title: 'Prevents Ice Formation',
                  body: 'Pre-treatment creates a barrier that stops ice from bonding to asphalt and concrete before the storm arrives.',
                },
                {
                  title: 'Increases Efficiency',
                  body: 'Even, consistent coverage with fewer applications needed throughout the season. Longer-lasting than traditional salt.',
                },
                {
                  title: 'Protects Your Property',
                  body: 'Significantly reduces corrosion to concrete, asphalt, curbing, and metal infrastructure. Extends the life of your hard surfaces.',
                },
                {
                  title: 'Minimizes Environmental Impact',
                  body: 'Safer for surrounding landscaping, nearby water systems, and local wildlife. A smarter alternative to chloride saturation.',
                },
              ].map((item, i) => (
                <div key={item.title} className="feature-item feature-item--dark" data-fade style={{ transitionDelay: `${i * 120}ms` }}>
                  <h3 className="feature-item__title">{item.title}</h3>
                  <p className="feature-item__body">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison ──────────────────────────────────────── */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header--centered">
            <span data-fade className="eyebrow">The Difference</span>
            <h2 data-fade style={{ transitionDelay: '100ms' }} className="heading-md">Before and After</h2>
            <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-4)' }} className="body-lg">
              The contrast between a typical Winnipeg winter lot and one maintained by WPG Parking Lot Solutions speaks for itself.
            </p>
          </div>

          <div className="two-col-grid" style={{ gap: 'var(--space-8)', marginTop: 'var(--space-10)' }}>
            {[
              { label: 'A Typical Winnipeg Winter Parking Lot', file: 'comparison-before.png' },
              { label: 'A Winnipeg Winter Parking Lot Maintained by WPG Parking Lot Solutions', file: 'comparison-after.png' },
            ].map((item, i) => (
              <div key={item.label} data-fade style={{ transitionDelay: `${i * 200}ms` }}>
                <div style={{
                  aspectRatio: '16/9',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  marginBottom: 'var(--space-4)',
                }}>
                  <img
                    src={`${import.meta.env.BASE_URL}assets/images/services/${item.file}`}
                    alt={item.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-charcoal)', textAlign: 'center' }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Snow Clearing ────────────────────────────────────── */}
      <section className="section section--white">
        <div className="container">
          <div data-fade style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 'var(--space-12)', aspectRatio: '21/9' }}>
            <img
              src={`${import.meta.env.BASE_URL}assets/images/services/equipment-snow.jpg`}
              alt="WPG Parking Lot Solutions commercial snow clearing equipment — loader and skid steer for Winnipeg parking lots"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div style={{ maxWidth: 760 }}>
            <span data-fade className="eyebrow">Snow Clearing</span>
            <div className="divider" />
            <h2 data-fade style={{ transitionDelay: '100ms' }} className="heading-md">Why Choose WPG Parking Lot Solutions for Snow Clearing?</h2>
            <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-5)' }} className="body-lg">
              Plenty of operators in Winnipeg offer snow clearing. Fewer operate
              the heavy-duty equipment commercial properties require. WPG Parking Lot Solutions uses
              loaders, skid steers, and plow equipment designed for the scale and
              accessibility demands of commercial parking lots.
            </p>
          </div>

          <div className="feature-list" style={{ marginTop: 'var(--space-10)' }}>
            {[
              {
                title: 'Heavy-Duty Equipment',
                body: 'Loaders, skid steers, and plow trucks. We\'re not using residential gear on commercial jobs.',
              },
              {
                title: 'Comprehensive Coverage',
                body: 'Parking lots, roadways, walkways, and building entrances. Every access point your tenants and customers use.',
              },
              {
                title: 'Proactive & Responsive',
                body: 'We monitor forecasts and mobilize before events reach their worst. If conditions change, so does our response.',
              },
              {
                title: 'Pair with Liquid De-Icing',
                body: 'The best results come from combining clearing with pre-treatment. Less snow to move, better surface conditions throughout.',
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
              Let's work together.
            </h2>
            <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-4)' }} className="body-lg--light">
              Ask us for an information packet on our winter maintenance programs,
              or fill out a quote request below.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  )
}
