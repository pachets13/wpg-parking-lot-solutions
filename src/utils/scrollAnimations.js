/**
 * scrollAnimations.js
 * Sets up a single IntersectionObserver that watches all [data-fade] elements.
 * When an element enters the viewport, adds the "in-view" class which triggers
 * the CSS transition. Each element animates only once (observer.unobserve).
 *
 * Stagger: set transitionDelay inline on elements (e.g. style={{ transitionDelay: '120ms' }}).
 * No-op if prefers-reduced-motion is set — CSS handles that side.
 */
export function initScrollAnimations() {
  const targets = document.querySelectorAll('[data-fade]:not(.in-view)')
  if (!targets.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -32px 0px',
    }
  )

  targets.forEach(el => observer.observe(el))
}
