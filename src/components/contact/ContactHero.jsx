import { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import Icon from '../ui/Icon.jsx'
import RevealText from '../motion/RevealText.jsx'
import ExportRouteMap from './ExportRouteMap.jsx'

function ContactHero({ isOpen, liveTime }) {
  const [isMapExpanded, setIsMapExpanded] = useState(false)
  // Hover-driven layout only makes sense for a mouse/trackpad — gating on
  // `(hover: hover)` avoids a tap on the map card leaving the panel stuck
  // expanded on touch devices, where there's no mouseleave to reset it.
  const [canHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
  )

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pb-28 border-b border-outline-variant/30 bg-gradient-to-b from-[#1E293B]/5 to-transparent">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isMapExpanded ? 0 : 1, y: 0 }}
          transition={{ duration: isMapExpanded ? 0.3 : 0.5, delay: isMapExpanded ? 0 : 0.35 }}
          className="space-y-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow bg-secondary/10 px-3 py-1 rounded-full text-[0.7rem]">
              Global Connectivity
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-outline-variant/30 shadow-xs">
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-400'}`} />
              <span className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider">
                HQ: {isOpen ? 'Open Now' : 'Closed'} ({liveTime || 'IST'})
              </span>
            </div>
          </div>

          <RevealText as="h1" scrollTriggered={false} delay={0.1} className="section-title text-4xl md:text-5xl lg:text-6xl leading-tight font-light text-primary">
            Connect with Global <br />
            <em className="font-serif italic font-normal text-secondary">Excellence</em>
          </RevealText>

          <p className="font-body-md text-on-surface-variant max-w-xl leading-relaxed text-sm md:text-base">
            Bridging international retail demands with certified, vertically integrated manufacturing. Reach our commercial coordinators or request a custom fabrication contract proposal directly below.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contact-form-section"
              className="inline-flex items-center gap-2 bg-primary hover:bg-[#1E293B] text-white font-label-md text-xs font-semibold uppercase tracking-wider py-4 px-8 rounded-full transition-all shadow-md hover:-translate-y-0.5"
            >
              Inquire Directly
              <Icon name="arrow_downward" className="text-sm" />
            </a>
            <a
              href="#factory-location"
              className="inline-flex items-center gap-2 border border-outline-variant/60 hover:border-secondary hover:text-secondary text-primary font-label-md text-xs font-semibold uppercase tracking-wider py-4 px-8 rounded-full transition-all"
            >
              Facility Location
            </a>
          </div>
        </motion.div>

        {/* Right Route Map Column — this wrapper is the grid cell and never
            itself resizes; only the absolutely-positioned card inside it
            grows. Hovering an element that resizes *itself* creates a
            feedback loop (resize moves the cursor out from under itself,
            which un-hovers it, which shrinks it back, which re-hovers it —
            an endless flicker), so the hover listener has to live on
            something whose bounding box stays fixed. */}
        <div
          onMouseEnter={() => canHover && setIsMapExpanded(true)}
          onMouseLeave={() => canHover && setIsMapExpanded(false)}
          className={`relative aspect-square lg:aspect-auto transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMapExpanded ? 'lg:h-[560px]' : 'lg:h-[480px]'}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`absolute inset-y-0 right-0 z-20 w-full rounded-2xl bg-primary shadow-2xl overflow-hidden border border-white/5 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMapExpanded ? 'lg:w-[calc(200%+3rem)]' : ''}`}
          >
            {/* Vector Styling Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 z-10">
              <div>
                <p className="text-[0.65rem] text-secondary font-semibold uppercase tracking-widest">Global Logistics Routing</p>
                <h4 className="text-white text-base font-serif italic mt-1">Karur HQ to International Ports</h4>
              </div>

              <div className="relative w-full flex-1 min-h-[140px]">
                <ExportRouteMap isExpanded={isMapExpanded} />
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4 text-[0.65rem] text-white/60 uppercase tracking-widest">
                <span>10.9754° N, 78.0323° E</span>
                <a href="#factory-location" className="inline-flex items-center gap-1.5 text-secondary font-semibold hover:text-white transition-colors">
                  Facility Details
                  <Icon name="arrow_outward" className="text-sm" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </Container>
    </section>
  )
}

export default ContactHero
