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
    <footer className="bg-[#07101F] text-white/55 pt-20 pb-8 px-margin-mobile md:px-margin-desktop">
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-12 border-b border-white/7"
      >
        <div>
          <Link className="font-headline-lg text-[1.75rem] font-bold text-white mb-4 inline-block" to="/">
            AD <span className="text-secondary">Textile</span>
          </Link>
          <p className="text-[0.80rem] text-white/65 leading-[1.82] max-w-[30ch]">
            Manufacturing premium home textiles for global excellence since 1990. Exporting worldwide since 1992.
          </p>
          <div className="flex gap-[0.7rem] mt-6">
            <Link
              className="w-[35px] h-[35px] rounded bg-white/6 flex items-center justify-center text-white/48 text-[0.82rem] transition-all duration-300 hover:bg-secondary hover:text-white"
              to="/contact"
              aria-label="Email Us"
            >
              <Icon name="mail" className="!text-base" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-white/88 mb-2">Company</div>
          <ul className="space-y-2.5">
            <li>
              <Link className="text-[0.80rem] text-white/65 hover:text-secondary transition-colors duration-200" to="/manufacturing">
                Manufacturing
              </Link>
            </li>
            <li>
              <Link className="text-[0.80rem] text-white/65 hover:text-secondary transition-colors duration-200" to="/sustainability">
                Sustainability
              </Link>
            </li>
            <li>
              <Link className="text-[0.80rem] text-white/65 hover:text-secondary transition-colors duration-200" to="/quality-compliance">
                Quality &amp; Compliance
              </Link>
            </li>
            <li>
              <Link className="text-[0.80rem] text-white/65 hover:text-secondary transition-colors duration-200" to="/products">
                Our Products
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-white/88 mb-2">Quick Links</div>
          <ul className="space-y-2.5">
            <li>
              <Link className="text-[0.80rem] text-white/65 hover:text-secondary transition-colors duration-200" to="/manufacturing#packing">
                Export &amp; Packing
              </Link>
            </li>
            <li>
              <Link className="text-[0.80rem] text-white/65 hover:text-secondary transition-colors duration-200" to="/about">
                Company Profile
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-white/88 mb-2">Get in Touch</div>
          <ul className="space-y-3.5">
            <li className="flex gap-[0.75rem] items-start text-[0.80rem] text-white/65">
              <Icon name="location_on" className="!text-base text-secondary mt-[1px] shrink-0" />
              <span>
                1/104, Sanjay Nagar, Erode Road,
                <br />
                Athur Post, Karur – 639002,
                <br />
                Tamil Nadu, India
              </span>
            </li>
            <li className="flex gap-[0.75rem] items-start text-[0.80rem] text-white/65">
              <Icon name="mail" className="!text-base text-secondary mt-[1px] shrink-0" />
              <a className="hover:text-secondary transition-colors" href="mailto:deepak@adtextile.com">
                deepak@adtextile.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-8 pt-8 flex justify-between items-center flex-wrap gap-4">
        <p className="text-[0.73rem] text-white/65">
          © {new Date().getFullYear()} Angayeeammal Devarajan Textile Pvt. Ltd. (AD Textile). All rights reserved.
        </p>
        <div className="flex gap-[0.55rem]">
          <span className="bg-white/6 border border-white/10 rounded px-2.5 py-1 text-[0.62rem] tracking-wider text-white/62 uppercase font-semibold">SA8000</span>
          <span className="bg-white/6 border border-white/10 rounded px-2.5 py-1 text-[0.62rem] tracking-wider text-white/62 uppercase font-semibold">ISO 14001</span>
          <span className="bg-white/6 border border-white/10 rounded px-2.5 py-1 text-[0.62rem] tracking-wider text-white/62 uppercase font-semibold">OEKO-TEX</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
