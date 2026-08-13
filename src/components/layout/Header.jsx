import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import MagneticButton from '../motion/MagneticButton.jsx'
import Icon from '../ui/Icon.jsx'

const NAV_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  {
    label: 'Capabilities',
    type: 'dropdown',
    items: [
      { label: 'Manufacturing', to: '/manufacturing', icon: 'precision_manufacturing' },
      { label: 'Design & Development', to: '/design-development', icon: 'design_services' },
      { label: 'Exports', to: '/exports', icon: 'public' },
    ],
  },
  { label: 'Private Label', to: '/private-label' },
  {
    label: 'Quality & Sustainability',
    type: 'dropdown',
    items: [
      { label: 'Quality & Compliance', to: '/quality-compliance', icon: 'verified' },
      { label: 'Sustainability', to: '/sustainability', icon: 'eco' },
    ],
  },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(null)
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
    const baseClass =
      'relative inline-flex items-center gap-1 text-[0.8rem] font-medium tracking-wider transition-colors duration-300 pb-1 ' +
      "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-full " +
      'after:bg-secondary after:origin-center after:transition-transform after:duration-500 ' +
      'after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100'
    const underlineState = isActive ? 'after:scale-x-100' : 'after:scale-x-0'
    if (isScrolledState) {
      return isActive
        ? `${baseClass} ${underlineState} text-primary`
        : `${baseClass} ${underlineState} text-on-background/80 hover:text-primary`
    } else {
      return isActive
        ? `${baseClass} ${underlineState} text-white`
        : `${baseClass} ${underlineState} text-white/80 hover:text-white`
    }
  }

  // Same visual treatment as linkClass, for dropdown triggers that have no
  // single destination route of their own (so can't be a NavLink).
  const isDropdownActive = (link) => link.items.some((item) => item.to === location.pathname)
  const triggerClass = (link) => {
    const baseClass =
      'relative inline-flex items-center gap-1 text-[0.8rem] font-medium tracking-wider transition-colors duration-300 pb-1 bg-transparent border-none cursor-pointer font-sans ' +
      "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-full " +
      'after:bg-secondary after:origin-center after:transition-transform after:duration-500 ' +
      'after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100'
    const underlineState = isDropdownActive(link) ? 'after:scale-x-100' : 'after:scale-x-0'
    if (isScrolledState) {
      return isDropdownActive(link)
        ? `${baseClass} ${underlineState} text-primary`
        : `${baseClass} ${underlineState} text-on-background/80 hover:text-primary`
    }
    return isDropdownActive(link)
      ? `${baseClass} ${underlineState} text-white`
      : `${baseClass} ${underlineState} text-white/80 hover:text-white`
  }

  return (
    <>
      <nav id="navbar" className={navClass} role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          <Link className={logoClass} to="/" onClick={() => setMenuOpen(false)}>
            AD <span className="text-secondary">Textile</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map((link) => {
              const hasDropdown = link.type === 'dropdown'
              return (
                <li key={link.label} className={hasDropdown ? 'relative group' : 'relative'}>
                  {link.to ? (
                    <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                      {link.label}
                    </NavLink>
                  ) : (
                    <button type="button" className={triggerClass(link)}>
                      {link.label}
                      <Icon name="expand_more" className="text-[16px] opacity-60" />
                    </button>
                  )}

                  {hasDropdown && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 -translate-y-1 pointer-events-none
                        transition-all duration-250 ease-out group-hover:opacity-100 group-hover:translate-y-0
                        group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0
                        group-focus-within:pointer-events-auto z-50"
                    >
                      <div className="w-[280px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.18)] border border-outline-variant/15 overflow-hidden">
                        <div className="h-[3px] bg-gradient-to-r from-secondary to-[#A8834A]" />
                        <div className="px-5 pt-4 pb-1">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">
                            {link.label}
                          </p>
                        </div>
                        <div className="flex flex-col px-2 pb-2">
                          {link.items.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className="group/item flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-background transition-colors duration-200"
                            >
                              <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-secondary/10 text-secondary group-hover/item:bg-secondary group-hover/item:text-white transition-colors duration-200">
                                <Icon name={item.icon} className="text-[18px]" />
                              </span>
                              <span className="text-[0.85rem] font-medium text-on-surface flex-1 group-hover/item:text-primary transition-colors duration-200">
                                {item.label}
                              </span>
                              <Icon
                                name="arrow_forward"
                                className="text-[14px] text-on-surface-variant opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

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
              onClick={() => {
                setMenuOpen((open) => !open)
                setOpenAccordion(null)
              }}
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
          {NAV_LINKS.map((link) => {
            const hasDropdown = link.type === 'dropdown'
            const isOpen = openAccordion === link.label
            return (
              <div key={link.label} className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="flex-1 text-[1.02rem] font-medium text-white/80 py-4 hover:text-secondary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="flex-1 text-[1.02rem] font-medium text-white/80 py-4">{link.label}</span>
                  )}
                  {hasDropdown && (
                    <button
                      type="button"
                      className="p-4 -mr-2 text-white/60 hover:text-secondary transition-colors cursor-pointer bg-transparent border-none"
                      aria-label={`Toggle ${link.label} submenu`}
                      aria-expanded={isOpen}
                      onClick={() => setOpenAccordion((cur) => (cur === link.label ? null : link.label))}
                    >
                      <Icon
                        name="expand_more"
                        className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </div>

                {hasDropdown && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? 'max-h-[320px] pb-4' : 'max-h-0'
                    }`}
                  >
                    <div className="flex flex-col gap-1 pl-2">
                      {link.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center gap-3 text-[0.85rem] text-white/60 hover:text-secondary transition-colors py-2"
                          onClick={() => setMenuOpen(false)}
                        >
                          <Icon name={item.icon} className="text-[16px] text-secondary/80" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
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
