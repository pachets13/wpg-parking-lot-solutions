import { services } from '../../data/services'
import ServiceCard from '../ui/ServiceCard'

export default function ServicesGrid() {
  return (
    <section className="section section--white">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">What We Do</span>
          <h2 className="heading-lg">Three core services.<br />One reliable partner.</h2>
          <p className="body-lg" style={{ marginTop: 'var(--space-4)' }}>
            WPG Parking Lot Solutions handles everything your commercial property needs, year-round —
            from fresh asphalt to a winter that stays clear.
          </p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
