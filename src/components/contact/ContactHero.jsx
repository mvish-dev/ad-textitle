import { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import Icon from '../ui/Icon.jsx'
import RevealText from '../motion/RevealText.jsx'
import WebGLScene from '../motion/WebGLScene.jsx'

const MAP_MARKERS = [
  { id: 'hq', label: 'Karur HQ, India', top: '56%', left: '68%', detail: 'Primary Vertically Integrated Mill & Headquarters', type: 'hq' },
  { id: 'eu', label: 'European Market Link', top: '34%', left: '49%', detail: 'Frankfurt & Rotterdam major container paths', type: 'export' },
  { id: 'na', label: 'North American Market Link', top: '36%', left: '22%', detail: 'East Coast retail warehousing integrations', type: 'export' },
]

function ContactHero({ isOpen, liveTime }) {
  const [hoveredMarker, setHoveredMarker] = useState(null)

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pb-28 border-b border-outline-variant/30 bg-gradient-to-b from-[#1E293B]/5 to-transparent">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 z-10 space-y-6"
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

        {/* Right Map Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 relative aspect-video sm:aspect-square lg:aspect-auto lg:h-[480px] rounded-2xl bg-primary shadow-2xl overflow-hidden border border-white/5"
        >
          {/* Ambient Background Glow (WebGL Orb fallback) */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <WebGLScene
              loader={() => import('../motion/Orb.jsx')}
              className="absolute inset-0"
              hue={35}
              hoverIntensity={0.2}
              backgroundColor="#0F172A"
            />
          </div>

          {/* Vector Styling Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none opacity-40" />

          <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
            <div>
              <p className="text-[0.65rem] text-secondary font-semibold uppercase tracking-widest">Global Logistics Routing</p>
              <h4 className="text-white text-base font-serif italic mt-1">Karur HQ to International Ports</h4>
            </div>

            {/* Styled Interactive SVG Map Overlay */}
            <div className="relative w-full h-[260px] my-auto">
              <svg viewBox="0 0 800 400" className="w-full h-full text-white/5">
                {/* Stylized world grid dots */}
                <g fill="rgba(255,255,255,0.06)">
                  {/* North America representation */}
                  <circle cx="150" cy="120" r="25" />
                  <circle cx="180" cy="150" r="35" />
                  <circle cx="210" cy="180" r="15" />
                  {/* Europe representation */}
                  <circle cx="420" cy="100" r="20" />
                  <circle cx="450" cy="120" r="30" />
                  <circle cx="480" cy="140" r="20" />
                  {/* Asia representation */}
                  <circle cx="600" cy="120" r="25" />
                  <circle cx="650" cy="160" r="40" />
                  <circle cx="700" cy="190" r="20" />
                  {/* India representation */}
                  <circle cx="580" cy="220" r="15" fill="rgba(197,157,95,0.2)" />
                </g>

                {/* Route Paths */}
                {/* Karur to EU */}
                <path
                  d="M 580,220 Q 500,160 450,120"
                  fill="none"
                  stroke="var(--color-secondary)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  className="opacity-70"
                />
                {/* Karur to US East */}
                <path
                  d="M 580,220 Q 380,100 180,150"
                  fill="none"
                  stroke="var(--color-secondary)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  className="opacity-70"
                />

                {/* Pulsing marker links */}
                {MAP_MARKERS.map((marker) => (
                  <g
                    key={marker.id}
                    onMouseEnter={() => setHoveredMarker(marker.id)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={marker.left}
                      cy={marker.top}
                      r={marker.type === 'hq' ? '8' : '5'}
                      className={`fill-secondary ${marker.type === 'hq' ? 'animate-pulse' : ''}`}
                    />
                    <circle
                      cx={marker.left}
                      cy={marker.top}
                      r={marker.type === 'hq' ? '18' : '12'}
                      className="fill-transparent stroke-secondary/40 stroke-[1.5px] animate-ping"
                    />
                  </g>
                ))}
              </svg>

              {/* Floating Map Labels */}
              {MAP_MARKERS.map((marker) => (
                <div
                  key={marker.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ top: marker.top, left: marker.left }}
                >
                  {hoveredMarker === marker.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -35, scale: 1 }}
                      className="bg-white text-primary p-3 rounded-lg shadow-xl border border-secondary/20 z-50 w-52 text-left"
                    >
                      <p className="text-[0.7rem] font-bold text-secondary uppercase tracking-wider">
                        {marker.type === 'hq' ? 'Global Headquarters' : 'Export Lane Destination'}
                      </p>
                      <p className="text-xs font-semibold text-primary mt-0.5">{marker.label}</p>
                      <p className="text-[0.65rem] text-on-surface-variant mt-1 leading-normal">{marker.detail}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-4 text-[0.65rem] text-white/50 uppercase tracking-widest font-mono">
              <span>COORD: 10.9754° N, 78.0323° E</span>
              <span>VERTICALLY INTEGRATED SCALE</span>
            </div>
          </div>
        </motion.div>

      </Container>
    </section>
  )
}

export default ContactHero
