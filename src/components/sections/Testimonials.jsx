import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  return (
    <section className="section section--light">
      <div className="container">
        <div className="section-header--centered">
          <span data-fade className="eyebrow">Client Feedback</span>
          <h2 data-fade style={{ transitionDelay: '100ms' }} className="heading-lg">Trusted by Winnipeg property managers.</h2>
          <p data-fade style={{ transitionDelay: '200ms' }} className="body-lg" style={{ marginTop: 'var(--space-4)' }}>
            Commercial properties across Winnipeg rely on WPG Parking Lot Solutions for year-round exterior maintenance.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={t.id} className="testimonial-card" data-fade style={{ transitionDelay: `${i * 120}ms` }}>
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
