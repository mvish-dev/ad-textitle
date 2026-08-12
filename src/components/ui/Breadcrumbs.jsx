import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

function Breadcrumbs({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-on-surface-variant uppercase tracking-wider py-5 border-b border-outline-variant/10 font-sans text-left">
      <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1.5 font-semibold">
        <Icon name="home" className="text-sm shrink-0" />
        Home
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-2">
          <Icon name="chevron_right" className="text-xs text-on-surface-variant/40 shrink-0" />
          {item.to ? (
            <Link to={item.to} className="hover:text-primary transition-colors font-semibold">
              {item.label}
            </Link>
          ) : (
            <span className="text-secondary font-bold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumbs
