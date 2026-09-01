import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MagneticButton from '../motion/MagneticButton.jsx'
import Icon from '../ui/Icon.jsx'
import OfflineBanner from '../common/OfflineBanner.jsx'

// Flat list of top-level nav items, shared as-is between the desktop bar
// and the mobile drawer.
const NAV_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Manufacturing', to: '/manufacturing' },
  { label: 'Quality & Compliance', to: '/quality-compliance' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Enforce a white navbar background on pages that have a light header background
  const isLightPage = ['/contact'].includes(location.pathname)

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

  // Positioning (fixed/top/z) lives on the wrapper around <nav> below, not
  // here, so OfflineBanner can sit above the nav row as a stacked flex
  // sibling inside that single fixed box — two independent fixed elements
  // would otherwise overlap instead of one pushing the other down.
  const navClass = isScrolledState
    ? 'w-full bg-white/96 backdrop-blur-md shadow-[0_2px_12px_rgba(15,23,42,0.07)] py-3 transition-all duration-350 ease-in-out border-b border-outline-variant/30'
    : 'w-full py-5 transition-all duration-350 ease-in-out bg-transparent'

  const logoClass = isScrolledState
    ? 'font-headline-lg text-[1.55rem] font-bold tracking-tight text-primary transition-colors duration-300'
    : 'font-headline-lg text-[1.55rem] font-bold tracking-tight text-white transition-colors duration-300'

  // Shared hover/active underline treatment for every top-level nav link.
  const isLinkActive = (item) => item.to === location.pathname
  const linkClass = (item) => {
    const baseClass =
      'relative inline-flex items-center text-[0.8rem] font-medium tracking-wider transition-colors duration-300 pb-1 ' +
      "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-full " +
      'after:bg-secondary after:origin-center after:transition-transform after:duration-500 ' +
      'after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100'
    const underlineState = isLinkActive(item) ? 'after:scale-x-100' : 'after:scale-x-0'
    if (isScrolledState) {
      return isLinkActive(item)
        ? `${baseClass} ${underlineState} text-primary`
        : `${baseClass} ${underlineState} text-on-background/80 hover:text-primary`
    }
    return isLinkActive(item)
      ? `${baseClass} ${underlineState} text-white`
      : `${baseClass} ${underlineState} text-white/80 hover:text-white`
  }

  return (
    <>
      <div className="fixed w-full top-0 z-50">
        <OfflineBanner />
        <nav id="navbar" className={navClass} role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          <Link className={logoClass} to="/" onClick={() => setMenuOpen(false)}>
            AD <span className="text-secondary">Textile</span>
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className={linkClass(link)}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <MagneticButton strength={0.25}>
                <Link
                  to="/contact"
                  className="inline-block text-center font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 bg-gradient-to-br from-secondary to-[#A8834A] text-white shadow-[0_8px_32px_rgba(197,157,95,0.25)] hover:shadow-[0_14px_40px_rgba(197,157,95,0.40)] px-6 py-2.5 text-[0.78rem] tracking-wider uppercase"
                >
                  Contact Us
                </Link>
              </MagneticButton>
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
      </div>

      {/* Mobile nav Drawer */}
      <div
        className={`fixed inset-0 bg-black/60 z-[1050] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-all' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 w-[320px] h-full bg-primary z-[1100] transition-transform duration-400 ease-out flex flex-col text-white shadow-2xl overflow-y-auto ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="p-10 pb-0">
          <button
            className="absolute top-6 right-6 bg-transparent border-none text-white text-2xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="flex flex-col mt-12 px-10 border-t border-white/10">
          {NAV_LINKS.map((link) => (
            <div key={link.to} className="border-b border-white/10">
              <Link
                to={link.to}
                className="block text-[1.02rem] font-medium text-white/80 py-4 hover:text-secondary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        <Link
          to="/contact"
          className="mx-10 mt-8 mb-10 inline-block text-center font-semibold rounded-full bg-gradient-to-br from-secondary to-[#A8834A] text-white shadow-[0_8px_32px_rgba(197,157,95,0.25)] hover:shadow-[0_14px_40px_rgba(197,157,95,0.40)] px-6 py-3.5 text-[0.84rem] tracking-wider uppercase"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>
      </div>
    </>
  )
}

export default Header
