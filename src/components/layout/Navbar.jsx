import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const services = [
  { label: 'Concrete & Asphalt', to: '/services/concrete-asphalt' },
  { label: 'Snow & Ice Solutions', to: '/services/snow-ice' },
  { label: 'Design Build', to: '/services/design-build' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isServicesActive = services.some(s => location.pathname === s.to)

  return (
    <header>
      <nav className="navbar">
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <img
              src={`${import.meta.env.BASE_URL}assets/logos/logo-light.png`}
              alt="WPG Parking Lot Solutions and Concrete"
              className="navbar__logo-img"
            />
          </Link>

          {/* Desktop links */}
          <div className="navbar__links">
            {/* Services dropdown */}
            <div className="navbar__dropdown" ref={dropdownRef}>
              <button
                className={`navbar__dropdown-trigger${isServicesActive ? ' active' : ''}`}
                onClick={() => setDropdownOpen(o => !o)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Services
                <svg
                  className="navbar__dropdown-arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="navbar__dropdown-menu" role="menu">
                  {services.map(s => (
                    <NavLink
                      key={s.to}
                      to={s.to}
                      className="navbar__dropdown-item"
                      role="menuitem"
                    >
                      {s.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
            >
              Contact
            </NavLink>

            <Link to="/contact" className="btn btn-primary btn-sm">
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`navbar__mobile-menu${mobileOpen ? ' open' : ''}`}>
          <span className="navbar__mobile-link" style={{ color: 'var(--color-muted)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', paddingBottom: 0 }}>
            Services
          </span>
          {services.map(s => (
            <NavLink
              key={s.to}
              to={s.to}
              className="navbar__mobile-link navbar__mobile-link--sub"
            >
              {s.label}
            </NavLink>
          ))}
          <NavLink to="/about" className="navbar__mobile-link">About</NavLink>
          <NavLink to="/contact" className="navbar__mobile-link">Contact</NavLink>
          <div className="navbar__mobile-cta">
            <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
              Get a Quote
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
