import { siteConfig } from '../data/siteConfig'
import QuoteForm from '../components/sections/QuoteForm'
import SEO from '../components/SEO'

export default function Contact() {
  const { contact } = siteConfig

  return (
    <>
      <SEO
        title="Contact Us — Request a Parking Lot Quote"
        description="Contact WPG Parking Lot Solutions in Winnipeg for a commercial parking lot quote. We respond within one business day. Serving Winnipeg, MB and surrounding area."
        path="/contact"
      />
      {/* ── Page Header ─────────────────────────────────────── */}
      <div style={{ background: 'var(--color-ink)', paddingTop: 'var(--space-24)', paddingBottom: 'var(--space-16)' }}>
        <div className="container">
          <span data-fade className="eyebrow">Let's Talk</span>
          <div className="divider" />
          <h1 data-fade style={{ transitionDelay: '100ms', color: 'var(--color-white)', maxWidth: 640 }} className="heading-xl">
            Request a quote.
          </h1>
          <p data-fade style={{ transitionDelay: '200ms', marginTop: 'var(--space-5)', maxWidth: 560 }} className="body-lg--light">
            Tell us about your property and what you need — we'll follow up within one business day.
            For urgent inquiries, call us directly.
          </p>
        </div>
      </div>

      {/* ── Form + Contact Info ──────────────────────────────── */}
      <div style={{ background: 'var(--color-charcoal)', paddingBottom: 'var(--space-24)' }}>
        <div className="container">
          <div className="contact-grid">

            {/* Form */}
            <div>
              <QuoteForm />
            </div>

            {/* Contact details sidebar */}
            <div data-fade style={{ paddingTop: 'var(--space-2)', transitionDelay: '100ms' }}>
              <h2 style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                letterSpacing: 'var(--tracking-wider)',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                marginBottom: 'var(--space-6)',
              }}>
                Or reach us directly
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>Phone</div>
                  <a href={contact.phoneHref} style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-white)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}
                    onMouseOver={e => e.target.style.color = 'var(--color-amber)'}
                    onMouseOut={e => e.target.style.color = 'var(--color-white)'}
                  >
                    {contact.phone}
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>Email</div>
                  <a href={contact.emailHref} className="contact-grid__email" style={{ fontSize: 'var(--text-base)', color: 'var(--color-amber)', textDecoration: 'none', display: 'inline-block', maxWidth: '100%' }}>
                    {contact.email}
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>Address</div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-silver)', lineHeight: 'var(--leading-relaxed)' }}>
                    {contact.address}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>Service Area</div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-silver)', lineHeight: 'var(--leading-relaxed)' }}>
                    {contact.serviceArea}
                  </p>
                </div>

                <div style={{
                  marginTop: 'var(--space-4)',
                  padding: 'var(--space-5)',
                  background: 'var(--color-dark-surface)',
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '3px solid var(--color-amber)',
                }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-white)', marginBottom: 'var(--space-2)' }}>
                    Commercial properties only.
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-silver)', lineHeight: 'var(--leading-relaxed)' }}>
                    WPG Parking Lot Solutions exclusively serves commercial property managers and owners. We do not take residential work.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
