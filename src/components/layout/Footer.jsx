import { Link } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'

const year = new Date().getFullYear()

export default function Footer() {
  const { company, contact, social } = siteConfig

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand column */}
          <div className="footer__brand-col">
            <img
              src={`${import.meta.env.BASE_URL}assets/logos/logo-light.png`}
              alt="WPG Parking Lot Solutions and Concrete"
              className="footer__logo-img"
            />
            <div className="footer__tagline">{company.tagline}</div>

            <div className="footer__contact-item">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </div>

            <div className="footer__contact-item">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href={contact.emailHref}>{contact.email}</a>
            </div>

            <div className="footer__contact-item">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ flexShrink: 0, marginTop: 2 }}>
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{contact.address}</span>
            </div>

            {/* Social icons */}
            <div className="footer__social">
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Instagram"
              >
                {/* Instagram icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="X / Twitter"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L2.25 2.25h6.929l4.264 5.637L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <div className="footer__col-heading">Services</div>
            <Link to="/services/concrete-asphalt" className="footer__nav-link">Concrete &amp; Asphalt</Link>
            <Link to="/services/snow-ice" className="footer__nav-link">Snow &amp; Ice Solutions</Link>
            <Link to="/services/design-build" className="footer__nav-link">Design Build</Link>
          </div>

          {/* Company column */}
          <div>
            <div className="footer__col-heading">Company</div>
            <Link to="/about" className="footer__nav-link">About WPG Parking Lot Solutions</Link>
            <Link to="/contact" className="footer__nav-link">Request a Quote</Link>
          </div>

          {/* Service area column */}
          <div>
            <div className="footer__col-heading">Service Area</div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-silver)', marginBottom: 'var(--space-3)' }}>
              Proudly serving Winnipeg and surrounding communities:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {[
                'Winnipeg', 'Steinbach', 'Selkirk', 'St. Boniface', 'Transcona',
                'East Kildonan', 'West Kildonan', 'Portage la Prairie', 'Stonewall', 'Headingley',
              ].map(community => (
                <div key={community} className="footer__nav-link" style={{ width: '50%', pointerEvents: 'none', cursor: 'default' }}>
                  {community}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {year} {company.legalName}. All Rights Reserved.
          </p>
          <div className="footer__legal-links">
            <a href="#" className="footer__legal-link">Privacy Policy</a>
            <a href="#" className="footer__legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
