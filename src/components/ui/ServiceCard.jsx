import { Link } from 'react-router-dom'

// Icon SVGs keyed by service id
const icons = {
  'concrete-asphalt': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8h10M7 12h6" />
    </svg>
  ),
  'snow-ice': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 7l-5-5-5 5" />
      <path d="M17 17l-5 5-5-5" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M7 7l-5 5 5 5" />
      <path d="M17 7l5 5-5 5" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  'design-build': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
}

export default function ServiceCard({ service, fadeDelay = 0 }) {
  return (
    <Link to={service.slug} className="service-card" data-fade style={{ transitionDelay: `${fadeDelay}ms` }}>
      <div className="service-card__icon">
        {icons[service.id]}
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__description">{service.description}</p>
      <span className="service-card__cta">
        Learn more
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </span>
    </Link>
  )
}
