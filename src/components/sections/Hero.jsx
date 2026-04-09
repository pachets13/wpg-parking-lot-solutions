import { Link } from 'react-router-dom'

/**
 * Hero — full-width hero section.
 *
 * Props:
 *   eyebrow      — small uppercase text above the title (optional)
 *   title        — main headline. Wrap words in <em> for amber accent color.
 *   subtitle     — supporting paragraph below the title
 *   ctaPrimary   — { label, to } for the primary (amber) CTA
 *   ctaSecondary — { label, to } for the ghost/outline CTA (optional)
 *   bgImage      — path to background image, e.g. '/assets/images/hero/hero-home.jpg'
 *                  If omitted, falls back to a dark gradient placeholder.
 *   size         — 'full' (100vh) | 'medium' (60vh) | 'short' (40vh + padding)
 */
export default function Hero({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  bgImage,
  size = 'full',
}) {
  const bgStyle = bgImage
    ? { backgroundImage: `url(${bgImage})` }
    : {}

  return (
    <section className={`hero hero--${size}`}>
      <div className="hero__bg" style={bgStyle} aria-hidden="true" />

      <div className="hero__content container">
        <div className="hero__inner">
          {eyebrow && (
            <span className="eyebrow eyebrow--light">{eyebrow}</span>
          )}

          <h1 className="hero__title">{title}</h1>

          {subtitle && (
            <p className="hero__subtitle">{subtitle}</p>
          )}

          {(ctaPrimary || ctaSecondary) && (
            <div className="hero__ctas">
              {ctaPrimary && (
                <Link to={ctaPrimary.to} className="btn btn-primary btn-lg">
                  {ctaPrimary.label}
                </Link>
              )}
              {ctaSecondary && (
                <Link to={ctaSecondary.to} className="btn btn-outline btn-lg">
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {size === 'full' && (
        <div className="hero__scroll-hint" aria-hidden="true">
          <div className="hero__scroll-line" />
        </div>
      )}
    </section>
  )
}
