import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import MagneticButton from '../motion/MagneticButton.jsx'
import Icon from '../ui/Icon.jsx'

const NAV_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Manufacturing', to: '/manufacturing' },
  {
    label: 'Capabilities',
    type: 'mega',
    panelClassName: 'w-[min(92vw,560px)] grid-cols-2',
    groups: [
      {
        heading: 'Design & Development',
        to: '/design-development',
        items: [
          { label: 'Product Development', hash: 'product-development' },
          { label: 'Sampling', hash: 'sampling' },
          { label: 'CAD & Design', hash: 'cad-design' },
          { label: 'Embroidery Digitising', hash: 'embroidery-digitising' },
          { label: 'Colour Matching', hash: 'colour-matching' },
          { label: 'Packaging Development', hash: 'packaging-development' },
        ],
      },
      {
        heading: 'Private Label',
        to: '/private-label',
        items: [
          { label: 'OEM Manufacturing', hash: 'oem-manufacturing' },
          { label: 'ODM Solutions', hash: 'odm-solutions' },
          { label: 'Private Label', hash: 'private-label' },
          { label: 'Custom Designs', hash: 'custom-designs' },
          { label: 'Custom Packaging', hash: 'custom-packaging' },
        ],
      },
    ],
  },
  {
    label: 'Quality & Sustainability',
    type: 'mega',
    panelClassName: 'w-[min(92vw,520px)] grid-cols-2',
    groups: [
      {
        heading: 'Quality',
        to: '/quality-compliance',
        items: [
          { label: 'Quality Control', hash: 'quality-control' },
          { label: 'Testing', hash: 'testing' },
          { label: 'Certifications', hash: 'certifications' },
          { label: 'Social Compliance', hash: 'social-compliance' },
          { label: 'Product Compliance', hash: 'product-compliance' },
        ],
      },
      {
        heading: 'Sustainability',
        to: '/sustainability',
        items: [
          { label: 'Sustainable Materials', hash: 'sustainable-materials' },
          { label: 'Responsible Manufacturing', hash: 'responsible-manufacturing' },
          { label: 'Environmental Practices', hash: 'environmental-practices' },
          { label: 'Sustainability Certifications', hash: 'sustainability-certifications' },
        ],
      },
    ],
  },
  { label: 'Exports', to: '/exports' },
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

  // Same visual treatment as linkClass, for mega-menu triggers that have no
  // single destination route of their own (so can't be a NavLink).
  const isMegaActive = (link) => link.groups.some((group) => group.to === location.pathname)
  const triggerClass = (link) => {
    const baseClass =
      'relative inline-flex items-center gap-1 text-[0.8rem] font-medium tracking-wider transition-colors duration-300 pb-1 bg-transparent border-none cursor-pointer font-sans ' +
      "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-full " +
      'after:bg-secondary after:origin-center after:transition-transform after:duration-500 ' +
      'after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100'
    const underlineState = isMegaActive(link) ? 'after:scale-x-100' : 'after:scale-x-0'
    if (isScrolledState) {
      return isMegaActive(link)
        ? `${baseClass} ${underlineState} text-primary`
        : `${baseClass} ${underlineState} text-on-background/80 hover:text-primary`
    }
    return isMegaActive(link)
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
              const hasDropdown = link.type === 'mega' || link.type === 'flat'
              return (
                <li key={link.label} className={hasDropdown ? 'relative group' : 'relative'}>
                  {link.to ? (
                    <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                      {link.label}
                      {hasDropdown && <Icon name="expand_more" className="text-[16px] opacity-60" />}
                    </NavLink>
                  ) : (
                    <button type="button" className={triggerClass(link)}>
                      {link.label}
                      <Icon name="expand_more" className="text-[16px] opacity-60" />
                    </button>
                  )}

                  {link.type === 'flat' && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 -translate-y-1 pointer-events-none
                        transition-all duration-250 ease-out group-hover:opacity-100 group-hover:translate-y-0
                        group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0
                        group-focus-within:pointer-events-auto z-50"
                    >
                      <div className="min-w-[260px] bg-white rounded-xl shadow-[0_16px_40px_rgba(15,23,42,0.16)] border border-outline-variant/20 py-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.hash}
                            to={`${link.to}#${child.hash}`}
                            className="block px-5 py-2.5 text-[0.8rem] text-on-surface/80 hover:text-primary hover:bg-background transition-colors whitespace-nowrap"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {link.type === 'mega' && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 -translate-y-1 pointer-events-none
                        transition-all duration-250 ease-out group-hover:opacity-100 group-hover:translate-y-0
                        group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0
                        group-focus-within:pointer-events-auto z-50"
                    >
                      <div
                        className={`bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.18)] border border-outline-variant/20 p-8 grid gap-8 ${link.panelClassName}`}
                      >
                        {link.groups.map((group) =>
                          group.columns ? (
                            <div key={group.heading} className="col-span-3">
                              <Link
                                to={group.to}
                                className="block font-label-md text-xs uppercase tracking-widest text-primary font-bold mb-5 hover:text-secondary transition-colors"
                              >
                                {group.heading}
                              </Link>
                              <div className="grid grid-cols-3 gap-6">
                                {group.columns.map((col) => (
                                  <div key={col.heading}>
                                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold mb-2.5">
                                      {col.heading}
                                    </p>
                                    <div className="flex flex-col">
                                      {col.items.map((item) => (
                                        <Link
                                          key={item.hash}
                                          to={`${group.to}#${item.hash}`}
                                          className="text-[0.8rem] text-on-surface/80 hover:text-primary transition-colors py-1.5"
                                        >
                                          {item.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              {group.cta && (
                                <Link
                                  to={group.cta.to}
                                  className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-wider text-secondary hover:underline"
                                >
                                  {group.cta.label}
                                  <Icon name="arrow_forward" className="text-sm" />
                                </Link>
                              )}
                            </div>
                          ) : group.items ? (
                            <div key={group.heading} className="col-span-1">
                              <Link
                                to={group.to}
                                className="block font-label-md text-xs uppercase tracking-widest text-primary font-bold mb-5 hover:text-secondary transition-colors"
                              >
                                {group.heading}
                              </Link>
                              <div className="flex flex-col">
                                {group.items.map((item) => (
                                  <Link
                                    key={item.hash}
                                    to={`${group.to}#${item.hash}`}
                                    className="text-[0.8rem] text-on-surface/80 hover:text-primary transition-colors py-1.5"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div key={group.heading} className="col-span-1">
                              <Link
                                to={group.to}
                                className="block font-label-md text-xs uppercase tracking-widest text-primary font-bold mb-5 hover:text-secondary transition-colors"
                              >
                                {group.heading}
                              </Link>
                              {group.description && (
                                <p className="text-[0.78rem] text-on-surface/70 leading-relaxed">
                                  {group.description}
                                </p>
                              )}
                            </div>
                          )
                        )}
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
            const hasDropdown = link.type === 'mega' || link.type === 'flat'
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

                {link.type === 'flat' && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? 'max-h-[480px] pb-4' : 'max-h-0'
                    }`}
                  >
                    <div className="flex flex-col gap-1 pl-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.hash}
                          to={`${link.to}#${child.hash}`}
                          className="text-[0.85rem] text-white/60 hover:text-secondary transition-colors py-2"
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {link.type === 'mega' && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? 'max-h-[1200px] pb-4' : 'max-h-0'
                    }`}
                  >
                    <div className="flex flex-col gap-6 pl-2">
                      {link.groups.map((group) => (
                        <div key={group.heading}>
                          <Link
                            to={group.to}
                            className="block text-[0.8rem] font-semibold uppercase tracking-widest text-secondary mb-2"
                            onClick={() => setMenuOpen(false)}
                          >
                            {group.heading}
                          </Link>
                          {group.columns ? (
                            <div className="flex flex-col gap-3">
                              {group.columns.map((col) => (
                                <div key={col.heading}>
                                  <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-1">
                                    {col.heading}
                                  </p>
                                  <div className="flex flex-col">
                                    {col.items.map((item) => (
                                      <Link
                                        key={item.hash}
                                        to={`${group.to}#${item.hash}`}
                                        className="text-[0.85rem] text-white/60 hover:text-secondary transition-colors py-1.5"
                                        onClick={() => setMenuOpen(false)}
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : group.items ? (
                            <div className="flex flex-col">
                              {group.items.map((item) => (
                                <Link
                                  key={item.hash}
                                  to={`${group.to}#${item.hash}`}
                                  className="text-[0.85rem] text-white/60 hover:text-secondary transition-colors py-1.5"
                                  onClick={() => setMenuOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            group.description && (
                              <p className="text-[0.82rem] text-white/55 leading-relaxed">
                                {group.description}
                              </p>
                            )
                          )}
                        </div>
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
