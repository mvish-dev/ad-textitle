import { Link } from 'react-router-dom'

const SIZE_CLASSES = {
  md: 'px-8 py-3',
  lg: 'px-10 py-5',
}

// A softly-rounded gold button with a thin highlight that chases around its
// edge. The highlight is a conic-gradient wedge on a large square spun at a
// constant rate behind the button; clipped to a 1px ring by the solid fill
// on top, so only the border shows it. Projected onto the button's near-
// rectangular outline, that constant rotation reads as fast movement
// through the corners and a slow drift across the flat mid-edges — the
// "fast at the corners, slow at the middle" motion this was built to match,
// with no per-frame JS.
//
// Same call signature as Button.jsx (to/href/onClick) so it can drop in
// anywhere a CTA is needed.
function MovingBorderButton({ to, href, size = 'md', className = '', children, ...props }) {
  const contentClasses = `relative z-10 flex items-center justify-center gap-2 w-full h-full rounded-lg bg-gradient-to-br from-secondary to-[#A8834A] text-white font-label-md text-label-md ${SIZE_CLASSES[size]} transition-transform duration-300 group-hover:-translate-y-0.5`

  const highlight = (
    <span
      className="absolute left-1/2 top-1/2 aspect-square w-[240%] -translate-x-1/2 -translate-y-1/2"
      style={{
        animation: 'moving-border-spin 3s linear infinite',
        background:
          'conic-gradient(from 0deg, transparent 0%, transparent 76%, #FFF7E8 87%, #ffffff 90%, #FFF7E8 93%, transparent 100%)',
      }}
      aria-hidden="true"
    />
  )

  const wrapperClasses = `group relative inline-block rounded-lg p-px overflow-hidden shadow-[0_8px_32px_rgba(197,157,95,0.25)] hover:shadow-[0_14px_40px_rgba(197,157,95,0.40)] transition-shadow duration-300 ${className}`

  if (to) {
    return (
      <Link to={to} className={wrapperClasses} {...props}>
        {highlight}
        <span className={contentClasses}>{children}</span>
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={wrapperClasses} {...props}>
        {highlight}
        <span className={contentClasses}>{children}</span>
      </a>
    )
  }

  return (
    <button type="button" className={wrapperClasses} {...props}>
      {highlight}
      <span className={contentClasses}>{children}</span>
    </button>
  )
}

export default MovingBorderButton
