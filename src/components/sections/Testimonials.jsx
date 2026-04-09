import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  return (
    <section className="section section--light">
      <div className="container">
        <div className="section-header--centered">
          <span className="eyebrow">Client Feedback</span>
          <h2 className="heading-lg">Trusted by Winnipeg property managers.</h2>
          <p className="body-lg" style={{ marginTop: 'var(--space-4)' }}>
            Commercial properties across Winnipeg rely on WPG Parking Lot Solutions for year-round exterior maintenance.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.id} className="testimonial-card">
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
      </div>
    </section>
  )
}
