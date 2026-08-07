import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Products', to: '/products' },
  { label: 'Infrastructure', to: '/infrastructure' },
  { label: 'Story', to: '/about' },
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'Certifications', to: '/certifications' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Enforce a white navbar background on pages that have a light header background
  const isLightPage = [
    '/contact',
    '/living-linen',
    '/heritage-bed-linen',
    '/kitchen-linen',
    '/table-linen',
    '/privacy',
    '/terms'
  ].includes(location.pathname)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScrolled(false)
    }, 0)

    const handleScroll = (e) => {
      const target = e.target
      let scrollTop = 0
      if (target === document || target === window.document) {
        scrollTop = window.scrollY || document.documentElement.scrollTop
      } else if (target && typeof target.scrollTop === 'number') {
        scrollTop = target.scrollTop
      }
      setScrolled(scrollTop > 20)
    }

    window.addEventListener('scroll', handleScroll, { capture: true, passive: true })
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('scroll', handleScroll, { capture: true })
    }
  }, [location.pathname])

  const isScrolledState = scrolled || isLightPage

  const navClass = isScrolledState
    ? 'fixed w-full top-0 z-50 bg-white/96 backdrop-blur-md shadow-[0_2px_12px_rgba(15,23,42,0.07)] py-3 transition-all duration-350 ease-in-out border-b border-outline-variant/30'
    : 'fixed w-full top-0 z-50 py-5 transition-all duration-350 ease-in-out bg-transparent'

  const logoClass = isScrolledState
    ? 'font-headline-lg text-[1.55rem] font-bold tracking-tight text-primary transition-colors duration-300'
    : 'font-headline-lg text-[1.55rem] font-bold tracking-tight text-white transition-colors duration-300'

  const linkClass = ({ isActive }) => {
    const baseClass = 'relative text-[0.82rem] font-medium tracking-wider transition-colors duration-300 pb-1'
    if (isScrolledState) {
      return isActive
        ? `${baseClass} text-primary border-b-2 border-secondary`
        : `${baseClass} text-on-background/80 hover:text-primary`
    } else {
      return isActive
        ? `${baseClass} text-white border-b-2 border-secondary`
        : `${baseClass} text-white/80 hover:text-white`
    }
  }

  return (
    <>
      <nav id="navbar" className={navClass} role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          <Link className={logoClass} to="/" onClick={() => setMenuOpen(false)}>
            AD <span className="text-secondary">Textile</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="inline-block text-center font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 bg-gradient-to-br from-secondary to-[#A8834A] text-white shadow-[0_8px_32px_rgba(197,157,95,0.25)] hover:shadow-[0_14px_40px_rgba(197,157,95,0.40)] px-6 py-2.5 text-[0.78rem] tracking-wider uppercase"
              >
                Contact Us
              </Link>
            </div>

            <button
              type="button"
              className="lg:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span
                className={`block w-6 h-0.5 rounded transition-all duration-300 ${
                  isScrolledState ? 'bg-primary' : 'bg-white'
                } ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block w-6 h-0.5 rounded transition-all duration-300 ${
                  isScrolledState ? 'bg-primary' : 'bg-white'
                } ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-6 h-0.5 rounded transition-all duration-300 ${
                  isScrolledState ? 'bg-primary' : 'bg-white'
                } ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile nav Drawer */}
      <div
        className={`fixed inset-0 bg-black/60 z-[1050] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-all' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-primary z-[1100] transition-transform duration-400 ease-out p-10 flex flex-col gap-0 text-white shadow-2xl ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <button
          className="absolute top-6 right-6 bg-transparent border-none text-white text-2xl cursor-pointer"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="flex flex-col mt-12 border-t border-white/10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[1.05rem] font-medium text-white/80 border-b border-white/10 py-4 hover:text-secondary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className="mt-8 inline-block text-center font-semibold rounded-full bg-gradient-to-br from-secondary to-[#A8834A] text-white shadow-[0_8px_32px_rgba(197,157,95,0.25)] hover:shadow-[0_14px_40px_rgba(197,157,95,0.40)] px-6 py-3.5 text-[0.84rem] tracking-wider uppercase"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>
      </div>
    </>
  )
}

export default Header
