import { Link } from 'react-router-dom'

const VARIANT_CLASSES = {
  primary: 'bg-gradient-to-br from-secondary to-[#A8834A] text-white shadow-[0_8px_32px_rgba(197,157,95,0.25)] hover:shadow-[0_14px_40px_rgba(197,157,95,0.40)] hover:-translate-y-0.5 rounded-full',
  secondary: 'bg-gradient-to-br from-secondary to-[#A8834A] text-white shadow-[0_8px_32px_rgba(197,157,95,0.25)] hover:shadow-[0_14px_40px_rgba(197,157,95,0.40)] hover:-translate-y-0.5 rounded-full',
  outline: 'border-2 border-current bg-transparent hover:bg-white/10 backdrop-blur-sm hover:-translate-y-0.5 rounded-full',
}

const SIZE_CLASSES = {
  md: 'px-8 py-3',
  lg: 'px-10 py-5',
}

function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const classes = `inline-block text-center font-label-md text-label-md transition-all duration-300 ease-in-out ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
