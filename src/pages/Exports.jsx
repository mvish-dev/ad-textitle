import { motion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import RevealText from '../components/motion/RevealText.jsx'
import WebGLScene from '../components/motion/WebGLScene.jsx'
import SpotlightCard from '../components/ui/SpotlightCard.jsx'
import TiltedCard from '../components/ui/TiltedCard.jsx'
import Seo from '../components/common/Seo.jsx'

const weavingPhoto = 'https://images.unsplash.com/photo-1619043518800-7f14be467dca?w=1200&q=85&auto=format&fit=crop'
const dyeingPhoto = 'https://images.unsplash.com/photo-1623929710342-02a8cd2dae25?w=1200&q=85&auto=format&fit=crop'
const packingPhoto =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCSDmnh1m5zgpHybsgAebq6RtTbqDnmfUUA1FQdaPTT-YCZJKXHrUZoLVfU3J-ELC3JEtvugYzKmq2wI86gbtTk6g-HU3vskwoZvvvKlibCU3Gz3KN8gyagklC62wyl5uDXnmln8cZTls46a7gvD7FbmoRVfWyJTBm_J8A1qrFuiYYesnOLEvVKuFixPhZD2E36KWrPzq59paOpQu3To_mVuuReCyqJK__q0NUw4RtJqkBoUNKQgVMdcNIfG77YntV14bDYlCs4H2k'
const checkingPhoto = 'https://images.unsplash.com/photo-1722963296013-8277246798ff?w=1200&q=85&auto=format&fit=crop'

const SECTIONS = [
  {
    id: 'global-markets',
    icon: 'public',
    eyebrow: '01 / Since 1992',
    navLabel: 'Global Markets',
    title: (
      <>
        Global <em>Markets</em>
      </>
    ),
    description:
      'AD Textile has exported home textiles internationally since 1992, serving major retailers across global markets with consistent quality and reliable delivery, order after order.',
    bullets: ['Exporting Since 1992', 'International Retail Clients', 'Consistent Repeat Orders'],
    image: weavingPhoto,
    imageAlt: 'Production destined for international markets at AD Textile',
  },
  {
    id: 'export-capabilities',
    icon: 'local_shipping',
    eyebrow: '02 / End to End',
    navLabel: 'Export Capabilities',
    title: (
      <>
        Export <em>Capabilities</em>
      </>
    ),
    description:
      'Documentation, compliance certification and logistics coordination are handled in-house, so buyers deal with a single point of contact from purchase order through to goods landed at destination.',
    bullets: ['In-House Documentation', 'Compliance Certification', 'Single Point of Contact'],
    image: dyeingPhoto,
    imageAlt: 'Export-ready production at AD Textile',
  },
  {
    id: 'production-capacity',
    icon: 'factory',
    eyebrow: '03 / At Scale',
    navLabel: 'Production & Capacity',
    title: (
      <>
        Production &amp; <em>Capacity</em>
      </>
    ),
    description:
      'Vertically integrated manufacturing — Somet Rapier looms weaving 1 million metres a month, 3 tons/day of dyeing capacity, and dedicated knitting, embroidery and stitching lines — gives us the throughput to support both large repeat programs and smaller specialist orders.',
    bullets: ['1M Metres/Month Weaving', '3 Tons/Day Dyeing Capacity', 'Flexible Order Volumes'],
    image: checkingPhoto,
    imageAlt: 'Manufacturing capacity at AD Textile',
  },
  {
    id: 'container-loading',
    icon: 'inventory_2',
    eyebrow: '04 / Dispatch',
    navLabel: 'Container Loading',
    title: (
      <>
        Container <em>Loading</em>
      </>
    ),
    description:
      'Finished goods are packed and loaded to withstand long-haul shipping, with packing plans built around container utilisation so every shipment travels efficiently and arrives intact.',
    bullets: ['Shipment-Ready Packing', 'Optimised Container Utilisation', 'Damage-Resistant Loading'],
    image: packingPhoto,
    imageAlt: 'Container loading and export packing at AD Textile',
  },
  {
    id: 'international-buyer-support',
    icon: 'support_agent',
    eyebrow: '05 / Partnership',
    navLabel: 'International Buyer Support',
    title: (
      <>
        International Buyer <em>Support</em>
      </>
    ),
    description:
      'From first inquiry through to post-shipment documentation, our export team supports international buyers directly, coordinating sampling, compliance paperwork and delivery timelines across time zones.',
    bullets: ['Direct Export Team Contact', 'Sampling & Documentation Support', 'Cross-Time-Zone Coordination'],
    image: checkingPhoto,
    imageAlt: 'Export team supporting an international buyer inquiry',
  },
]

function Exports() {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <Seo
        title="Exports"
        description="Exporting home textiles worldwide since 1992. Explore AD Textile's global markets, production capacity, container loading and international buyer support."
      />

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[650px] flex items-center overflow-hidden pt-24 bg-primary text-white">
        <div className="absolute inset-0 z-0">
          <WebGLScene
            loader={() => import('../components/motion/LightRays.jsx')}
            className="absolute inset-0"
            fallback={<div className="absolute inset-0 bg-primary" />}
            raysOrigin="top-center"
            raysColor="#F4E4C8"
            raysSpeed={1.1}
            lightSpread={0.9}
            rayLength={1.8}
            fadeDistance={1.1}
            saturation={0.85}
            followMouse={true}
            mouseInfluence={0.12}
            noiseAmount={0.05}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        </div>

        <Container className="relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 bg-primary/70 backdrop-blur-md p-10 md:p-12 text-white border border-white/10 rounded-2xl shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="eyebrow bg-secondary/15 px-3 py-1 rounded-full text-[0.68rem] text-secondary tracking-widest uppercase">
                  Exports
                </span>
                <span className="text-[0.68rem] font-bold text-white/50 tracking-widest uppercase font-mono">
                  Established 1992
                </span>
              </div>

              <RevealText
                as="h1"
                scrollTriggered={false}
                delay={0.2}
                className="font-display-lg text-display-lg-mobile md:text-5xl leading-tight text-white font-light"
              >
                Manufacturing India.<br />
                <span className="italic text-secondary font-serif font-normal">Delivering Worldwide.</span>
              </RevealText>

              <p className="font-body-md text-white/80 max-w-xl leading-relaxed text-sm md:text-base">
                Exporting home textiles since 1992, with the production capacity, compliance documentation and export logistics to support retail programs across international markets.
              </p>

              <div className="pt-4 flex gap-4">
                <a
                  href="#global-markets"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-[#A8834A] text-white font-label-md text-xs font-semibold uppercase tracking-wider py-4 px-8 rounded-full transition-all shadow-md"
                >
                  Explore Capabilities
                  <Icon name="arrow_downward" className="text-sm" />
                </a>
              </div>
            </motion.div>

            {/* Right Hero Capacity Ticker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 grid grid-cols-2 gap-4 text-white"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-xl space-y-2">
                <span className="text-[0.68rem] font-bold text-secondary uppercase tracking-widest font-mono">WEAVING</span>
                <h3 className="text-3xl font-serif italic text-white leading-none">1.0 M</h3>
                <p className="text-[0.68rem] text-white/50 leading-tight">Metres of fabric woven monthly</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-xl space-y-2">
                <span className="text-[0.68rem] font-bold text-secondary uppercase tracking-widest font-mono">DYEING</span>
                <h3 className="text-3xl font-serif italic text-white leading-none">3 Tons</h3>
                <p className="text-[0.68rem] text-white/50 leading-tight">Fabric dyeing capacity per day</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-xl space-y-2 col-span-2">
                <span className="text-[0.68rem] font-bold text-secondary uppercase tracking-widest font-mono">INTEGRATION</span>
                <h3 className="text-xl font-serif text-white">Full Vertical Control</h3>
                <p className="text-[0.68rem] text-white/50 leading-relaxed">
                  Direct oversight from dyeing and weaving to stitching, loading and dispatch logistics.
                </p>
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* Capabilities Sections */}
      {SECTIONS.map((section, index) => {
        const isEven = index % 2 === 0
        return (
          <section
            key={section.id}
            id={section.id}
            className={`py-24 border-b border-outline-variant/20 relative overflow-hidden ${
              isEven ? 'bg-background' : 'bg-white'
            }`}
          >
            {/* Visual background index label */}
            <div className="absolute right-12 top-12 select-none pointer-events-none opacity-[0.03] font-serif text-[12rem] text-primary leading-none font-bold">
              {String(index + 1).padStart(2, '0')}
            </div>

            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Image Tilted Card Column */}
                <div className={`lg:col-span-5 relative ${isEven ? '' : 'lg:order-2'}`}>
                  <TiltedCard tiltMax={8} className="w-full">
                    <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] overflow-hidden rounded-2xl shadow-xl border border-outline-variant/30 relative bg-surface-container-low">
                      <img
                        src={section.image}
                        alt={section.imageAlt}
                        className="absolute inset-0 w-full h-full object-cover kenburns"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                    </div>
                  </TiltedCard>
                </div>

                {/* Text Spotlight Card Column */}
                <div className={`lg:col-span-7 ${isEven ? '' : 'lg:order-1'}`}>
                  <SpotlightCard className="bg-white/40 backdrop-blur-xs border border-outline-variant/20 p-8 md:p-10 rounded-2xl shadow-sm">
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-xl text-secondary">
                          <Icon name={section.icon} className="text-2xl" />
                        </div>
                        <span className="eyebrow text-secondary font-semibold uppercase tracking-widest text-[0.68rem]">
                          {section.eyebrow}
                        </span>
                      </div>

                      <h2 className="section-title text-3xl font-light text-primary leading-tight font-serif">
                        {section.title}
                      </h2>

                      <p className="font-body-md text-on-surface-variant leading-relaxed text-sm md:text-base">
                        {section.description}
                      </p>

                      {section.bullets && (
                        <div className="pt-4 border-t border-outline-variant/20">
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {section.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mt-0.5 shrink-0">
                                  <Icon name="check" className="text-[0.62rem]" />
                                </div>
                                <span className="font-label-md text-xs uppercase tracking-wider text-primary font-semibold">
                                  {bullet}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                  </SpotlightCard>
                </div>

              </div>
            </Container>
          </section>
        )
      })}

      {/* Shipping Quick Reference Log */}
      <section className="py-16 bg-[#F3F2EF] border-b border-outline-variant/25">
        <Container className="space-y-8">
          <div className="text-center space-y-2">
            <span className="eyebrow text-secondary">Logistic Portals</span>
            <h3 className="text-primary font-serif font-semibold text-xl">Average Landed Transit Durations</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-xs flex flex-col justify-between">
              <span className="text-[0.62rem] font-bold text-on-surface-variant uppercase tracking-widest">EUROPE PORTALS</span>
              <h4 className="text-lg font-bold text-primary mt-2">Rotterdam / Hamburg</h4>
              <span className="text-xs font-semibold text-secondary mt-1">~18 Days Transit</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-xs flex flex-col justify-between">
              <span className="text-[0.62rem] font-bold text-on-surface-variant uppercase tracking-widest">US EAST COAST</span>
              <h4 className="text-lg font-bold text-primary mt-2">New York / Savannah</h4>
              <span className="text-xs font-semibold text-secondary mt-1">~21 Days Transit</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-xs flex flex-col justify-between">
              <span className="text-[0.62rem] font-bold text-on-surface-variant uppercase tracking-widest">MIDDLE EAST</span>
              <h4 className="text-lg font-bold text-primary mt-2">Jebel Ali, Dubai</h4>
              <span className="text-xs font-semibold text-secondary mt-1">~6 Days Transit</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-xs flex flex-col justify-between">
              <span className="text-[0.62rem] font-bold text-on-surface-variant uppercase tracking-widest">EAST ASIA</span>
              <h4 className="text-lg font-bold text-primary mt-2">Singapore / Tokyo</h4>
              <span className="text-xs font-semibold text-secondary mt-1">~12 Days Transit</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-15 pointer-events-none z-0">
          <img
            className="w-full h-full object-cover scale-105 brightness-50"
            alt="Denim weaving logistics texture"
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80&auto=format&fit=crop"
          />
        </div>

        <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 text-center md:text-left">
            <span className="eyebrow text-secondary">Export Sourcing</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
              Sourcing for an <br />
              <span className="italic text-secondary font-serif font-normal">International Retail Program?</span>
            </h2>
            <p className="font-body-md text-white/70 max-w-2xl leading-relaxed text-sm md:text-base">
              Tell us your markets, volumes and timelines — our export team will scope how AD Textile's capacity fits your buying calendar.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <Button
              to="/contact?product=export_program"
              variant="primary"
              size="lg"
              className="!bg-white !text-primary hover:!bg-secondary-fixed shadow-2xl hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] transition-all cursor-pointer whitespace-nowrap"
            >
              Talk to Our Export Team
            </Button>
          </div>
        </Container>

        {/* Accreditations Banner */}
        <div className="mt-16 pt-8 border-t border-white/5 relative z-10">
          <Container className="flex flex-wrap justify-center md:justify-between items-center gap-8 text-[0.62rem] text-white/60 uppercase tracking-widest">
            <div className="flex gap-8">
              <span>● OEKO-TEX® CERTIFIED</span>
              <span>● GOTS CERTIFIED</span>
              <span>● ISO 9001:2015 COMPLIANT</span>
              <span>● SOCIAL AUDIT COMPLIANT</span>
            </div>
            <div>
              <span>© {new Date().getFullYear()} AD Textile Pvt Ltd.</span>
            </div>
          </Container>
        </div>
      </section>

    </div>
  )
}

export default Exports
