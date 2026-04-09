import { Link } from 'react-router-dom'

/**
 * Button — reusable button/link component.
 *
 * Props:
 *   variant  — 'primary' | 'outline' | 'outline-dark' | 'ghost'  (default: 'primary')
 *   size     — 'sm' | 'md' | 'lg'                                 (default: 'md')
 *   as       — 'button' | 'a' | 'link'                           (default: 'button')
 *   to       — path for internal Link (when as='link')
 *   href     — URL for external anchor (when as='a')
 *   className — additional CSS classes
 *   ...rest  — passed to the underlying element
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  to,
  href,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size !== 'md' ? `btn-${size}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (as === 'link' && to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (as === 'a') {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
