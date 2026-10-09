import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, EASE } from '../../lib/motion.js'
import Icon from '../ui/Icon.jsx'

function Footer() {
  const gridRef = useRef(null)

  useGSAP(
    () => {
      if (!gridRef.current) return
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: 'top 90%', once: true },
      })
    },
    { scope: gridRef }
  )

  return (
    <footer className="bg-[#07101F] text-white/55 pt-14 pb-6 px-margin-mobile md:px-margin-desktop">
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] gap-10 max-w-container-max mx-auto pb-6 border-b border-white/7"
      >
        <div>
          <Link className="mb-4 inline-flex" to="/">
            <img src="/footer-logo.webp" alt="A D Textile" className="h-12 w-auto" />
          </Link>
          <p className="text-[0.9rem] text-white/65 leading-[1.82] max-w-[34ch]">
            Manufacturing premium home textiles for global excellence since 1990. Exporting worldwide since 1992.
          </p>
          <div className="flex gap-[0.7rem] mt-4">
            <Link
              className="w-[35px] h-[35px] rounded bg-white/6 flex items-center justify-center text-white/48 text-[0.82rem] transition-all duration-300 hover:bg-secondary hover:text-white"
              to="/contact"
              aria-label="Email Us"
            >
              <Icon name="mail" className="!text-base" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-[0.8rem] font-semibold tracking-[0.16em] uppercase text-white/88 mb-1">Company</div>
          <ul className="space-y-2.5">
            <li>
              <Link className="text-[0.9rem] text-white/65 hover:text-secondary transition-colors duration-200" to="/manufacturing">
                Manufacturing
              </Link>
            </li>
            <li>
              <Link className="text-[0.9rem] text-white/65 hover:text-secondary transition-colors duration-200" to="/quality-compliance">
                Quality &amp; Compliance
              </Link>
            </li>
            <li>
              <Link className="text-[0.9rem] text-white/65 hover:text-secondary transition-colors duration-200" to="/products">
                Our Products
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-[0.8rem] font-semibold tracking-[0.16em] uppercase text-white/88 mb-1">Quick Links</div>
          <ul className="space-y-2.5">
            <li>
              <Link className="text-[0.9rem] text-white/65 hover:text-secondary transition-colors duration-200" to="/manufacturing#packing">
                Export &amp; Packing
              </Link>
            </li>
            <li>
              <a
                className="text-[0.9rem] text-white/65 hover:text-secondary transition-colors duration-200"
                href="/company-profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Company Profile
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-[0.8rem] font-semibold tracking-[0.16em] uppercase text-white/88 mb-1">Get in Touch</div>
          <ul className="space-y-3.5">
            <li className="flex gap-[0.75rem] items-start text-[0.9rem] text-white/65">
              <Icon name="location_on" className="!text-base text-secondary mt-[1px] shrink-0" />
              <span>
                1/104, Sanjay Nagar, Erode Road,
                <br />
                Athur Post, Karur – 639002,
                <br />
                Tamil Nadu, India
              </span>
            </li>
            <li className="flex gap-[0.75rem] items-start text-[0.9rem] text-white/65">
              <Icon name="mail" className="!text-base text-secondary mt-[1px] shrink-0" />
              <a className="hover:text-secondary transition-colors" href="mailto:deepak@adtextile.com">
                deepak@adtextile.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-container-max mx-auto pt-5 flex justify-between items-center flex-wrap gap-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8rem] text-white/65">
          <p>© {new Date().getFullYear()} Angayeeammal Devarajan Textile Pvt. Ltd. (A D Textile). All rights reserved.</p>
          <Link className="hover:text-secondary transition-colors duration-200" to="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="hover:text-secondary transition-colors duration-200" to="/privacy-policy#terms-of-service">
            Terms of Service
          </Link>
        </div>
        <div className="flex gap-[0.55rem]">
          <span className="bg-white/6 border border-white/10 rounded px-2.5 py-1 text-[0.68rem] tracking-wider text-white/62 uppercase font-semibold">SA8000</span>
          <span className="bg-white/6 border border-white/10 rounded px-2.5 py-1 text-[0.68rem] tracking-wider text-white/62 uppercase font-semibold">ISO 9001:2015</span>
          <span className="bg-white/6 border border-white/10 rounded px-2.5 py-1 text-[0.68rem] tracking-wider text-white/62 uppercase font-semibold">OEKO-TEX</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
