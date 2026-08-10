import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import RevealText from '../components/motion/RevealText.jsx'
import MagneticButton from '../components/motion/MagneticButton.jsx'
import MovingBorderButton from '../components/motion/MovingBorderButton.jsx'
import WebGLScene from '../components/motion/WebGLScene.jsx'
import LottieIcon from '../components/motion/LottieIcon.jsx'
import pulseRing from '../assets/lottie/pulse-ring.json'
import { gsap, isTouchDevice, prefersReducedMotion } from '../lib/motion.js'

const TRUST_INDICATORS = [
  { icon: 'history', title: 'Established Since 1990', caption: 'Legacy & Trust' },
  { icon: 'public', title: 'Export Since 1992', caption: 'Global Reach' },
  { icon: 'verified', title: 'SA8000 & ISO 14001', caption: 'Compliant' },
  { icon: 'fact_check', title: '5-Level Inspection', caption: 'Quality Cycle' },
]

const CATEGORIES = [
  {
    title: 'Kitchen Linen',
    description: 'Aprons, mittens and kitchen sets for sophisticated culinary spaces.',
    href: '/products#kitchen',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNwMAmERcdNtmtoAUEd_p2N3Oa3ieJi4SHc__8Pd3ylDKv60RTfy5EQy10YJKXg2oMzWQd8YL_GLEATGQtvS_-nQMTFRR7QoWTr3MYErLFIFzg2hvsES-4iGgjcqZPSiIlmLjph6PPfdhZ9K6MwRKFQY70-96pCBlSC86TGAOu0GeplWoHKYyXBPU8rYYHmNGXp4wWDZzHmVXm2GaZvAFja1nCHxQ6vM6xbGzt3eM48Ckuwdy6rwscTjAhvN7x3_8mpYjzi_dW9i4',
    alt: 'Top-down editorial shot of high-quality kitchen linens featuring waffle weave and herringbone textures.',
  },
  {
    title: 'Table Linen',
    description: 'Table cloths, mats, runners and chair pads for distinguished dining.',
    href: '/products#table',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3IJi5DTrXdm8jRPxK9wfaeZ8zb8-kfsxAqnSGjkC6HP-9kNvaTFgyyqe6TXAo_VGvnTfyI4cUYbWYe4bXbce3uUte5RxwlLlx6HSJjRPtuXI_mf2ObHY76nvLbI9w8QDB7MxkvHnbLVQfoq1wZX_LZ0boyq2l8WJ-M7SplPDLgLQNKhCMJOyDDPTGiTkBtyCtpsQkYBS7N7j4od0_Lf8svSQqiufiyZ9hfgcgIAFain-YBoQD9YFn8slG82igYHNlLQvQrwGllVU',
    alt: 'Table Linen Collection',
  },
  {
    title: 'Bed Linen',
    description: 'Bed spreads, bedding, cushions, quilts and rest bedding.',
    href: '/heritage-bed-linen',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQFfsn3ESPLeAYm6B5s-_JuPyQnDtcIj8DQYBFBGUVQkhmsR7lcVoF1AS74wKg8jv0Ejor-SFQ0dpxsAlF__TyQrWBzqEfSRXKYutWt8kw_66cJGIeVU7iOM-m3RD4Ee8m-Ahy2r8HmogQswlDIC0p7fW2IPnMr0uqCzLAd4s0AyvzX37SUHJm9Xjcr9yk90Lu0_gewpoArfeGB8Oiuf7hzC4hne8iS4cvjIXWVfxG3C6-hXZunr3-R_adB7cuelPMkvSkGbdI2mc',
    alt: 'Bed Linen Collection',
  },
  {
    title: 'Living Linen',
    description: 'Curtains crafted for texture, drape and everyday living spaces.',
    href: '/living-linen',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNwMAmERcdNtmtoAUEd_p2N3Oa3ieJi4SHc__8Pd3ylDKv60RTfy5EQy10YJKXg2oMzWQd8YL_GLEATGQtvS_-nQMTFRR7QoWTr3MYErLFIFzg2hvsES-4iGgjcqZPSiIlmLjph6PPfdhZ9K6MwRKFQY70-96pCBlSC86TGAOu0GeplWoHKYyXBPU8rYYHmNGXp4wWDZzHmVXm2GaZvAFja1nCHxQ6vM6xbGzt3eM48Ckuwdy6rwscTjAhvN7x3_8mpYjzi_dW9i4',
    alt: 'Elegant flowing curtains in a softly lit modern living room.',
  },
]

const JOURNEY_STEPS = [
  'Raw Material',
  'Dyeing',
  'Weaving',
  'Printing',
  'Stitching',
  'Quality Control',
  'Packing',
]

const EDGE_POINTS = [
  {
    icon: 'factory',
    title: 'Modern Manufacturing',
    description: '56 automatic looms weaving up to 360cm width with double insertion.',
  },
  {
    icon: 'high_quality',
    title: 'Strict Quality',
    description: '5-level inspection cycle, verified by SGS, Texanlabs and the Textile Committee.',
  },
  {
    icon: 'school',
    title: 'Skilled Workforce',
    description: 'Regular training programs keep our people current on new techniques.',
  },
  {
    icon: 'eco',
    title: 'Environmentally Responsible',
    description: 'Effluent Treatment, Reverse Osmosis and VSEP plants, with Azo-free dyes only.',
  },
]

const INFRASTRUCTURE_HIGHLIGHTS = [
  {
    title: 'Precision Weaving Unit',
    description:
      'Equipped with 56 automatic looms weaving dobby, satin, satin-stripe and twill patterns up to 360cm width.',
    href: '/infrastructure#weaving',
    linkLabel: 'Technical Specifications',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6UIg_my9ndoQxb-vJN2giWKEECHywzzxEjsL8xRgDH9MqV1aW2r9J4AduCdEnCa-EXV5H-VetS2s4mshhPtJcYFAD3qR1Tr9E1GkwlA5VH-REXwZ9kpxeCh_JJJcUPaA7HVkya_ZQ3Iz2L4utVIITWvLdF8j_2FzNI1n-_xQE-4If9vMWPEtIqpVu7bIBRDPHacRaJRIAX4n7bNEWM99CaQo1qBZ_kver0BMePTS_DUp3ovmDbjE3fSDFvn87e1QBvOu_NzPprfs',
    alt: 'High-angle architectural shot of a state-of-the-art textile weaving facility.',
  },
  {
    title: 'Advanced Finishing Hub',
    description:
      'Rotary and manual printing with Tajima & Barudan embroidery machines (9 colors) and an in-house design studio.',
    href: '/infrastructure#printing',
    linkLabel: 'Process Overview',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGR0CkgYRw78qoYAjf-dzT5EPSS7fUmKhzhwT_lHjB23zBsEyJ6m06AjjJ3PZDRKRBoJ93LUbRKSs_0FLKxyBRLdyDvbhU0s_tMgmzonvcFdseZxhjxIve-huknqBM91Z_FmLzmPEZOTvLMZwXMy8y8GHg-YPVAIm4gODzlDpGdwUhdQkg_ztiYw5njXnUXVWIPMlThCU7D_OSaaiTuOVWtUhgbzQeX9Hl3ooXkKpAuJuZmcuU1Srnk6nlpwi0BuxXnKkwYs8LNSI',
    alt: 'Close-up of a high-speed industrial textile printer applying vibrant patterns.',
  },
]

const COMPLIANCE_MARKS = [
  { icon: 'workspace_premium', label: 'SA8000' },
  { icon: 'eco', label: 'ISO 14001' },
  { icon: 'science', label: 'TESTED BY SGS' },
  { icon: 'verified', label: 'TEXANLABS & TEXTILE COMMITTEE' },
]

function Home() {
  const journeySectionRef = useRef(null)
  const journeyTrackRef = useRef(null)
  const journeyPathRef = useRef(null)

  useGSAP(
    () => {
      const section = journeySectionRef.current
      const track = journeyTrackRef.current
      const path = journeyPathRef.current
      if (!section || !track || !path || prefersReducedMotion()) return undefined

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

        const getScrollDistance = () => Math.max(0, track.scrollWidth - section.offsetWidth)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollDistance() + section.offsetWidth * 0.4}`,
            scrub: 1,
            pin: true,
            // `<main>` (this section's parent, in Layout.jsx) is `flex
            // flex-col`. GSAP silently disables pinSpacing by default for
            // any pinned element whose parent is display:flex, since it
            // can't always safely reserve extra space in a flex layout —
            // without forcing it back on here, no scroll room gets
            // reserved for the pin at all, so the next section slides up
            // and collides with this one while it's still pinned.
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        })

        tl.to(track, { x: () => -getScrollDistance(), ease: 'none' }, 0).to(
          path,
          { strokeDashoffset: 0, ease: 'none' },
          0
        )

        return () => {}
      })

      return () => mm.revert()
    },
    { scope: journeySectionRef }
  )

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[600px] py-32 md:py-40 flex items-center bg-primary text-white overflow-hidden">
        {/* Ferrofluid WebGL background — degrades to a static navy/gold
            radial gradient if WebGL is unavailable. Mouse interaction is
            disabled on touch devices since there's no hover to react to. */}
        <WebGLScene
          loader={() => import('../components/motion/Ferrofluid.jsx')}
          className="absolute inset-0 z-0"
          fallback={
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  'radial-gradient(120% 120% at 25% 20%, #1e293b 0%, #0F172A 55%, #080b14 100%)',
              }}
            />
          }
          colors={['#334155', '#C59D5F', '#F4E4C8']}
          speed={0.45}
          scale={1.8}
          turbulence={1.1}
          fluidity={0.12}
          rimWidth={0.24}
          sharpness={2.3}
          shimmer={1.4}
          glow={2.1}
          flowDirection="up"
          mouseInteraction={!isTouchDevice()}
          mouseStrength={0.9}
          mouseRadius={0.4}
        />

        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(60% 75% at 50% 50%, rgba(10,16,30,0.82) 0%, rgba(10,16,30,0.58) 45%, rgba(10,16,30,0.3) 72%, rgba(10,16,30,0.5) 100%)',
          }}
        />

        <Container className="relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-[900px] mx-auto text-center flex flex-col items-center"
          >
            <div
              className="flex items-center justify-center gap-3 text-secondary uppercase font-body-md mb-7"
              style={{ fontSize: '0.66rem', letterSpacing: '0.32em', fontWeight: '600' }}
            >
              <span className="w-[26px] h-[1px] bg-secondary" />
              <span>Est. 1990 · Karur, India</span>
              <span className="w-[26px] h-[1px] bg-secondary" />
            </div>

            <RevealText
              as="h1"
              scrollTriggered={false}
              delay={0.35}
              className="font-display-lg text-white font-semibold"
              style={{
                fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)',
                lineHeight: '1.08',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 24px rgba(0,0,0,0.55)',
              }}
            >
              Premium Home Textiles
            </RevealText>

            <p
              className="font-body-md text-white/85 mt-4 mb-10 font-light max-w-[620px]"
              style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)', letterSpacing: '0.01em' }}
            >
              Crafted for the Global Market. From raw fibre to finished textile, we deliver premium kitchen,
              table, bed and living linens engineered for global retailers and hospitality brands.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8">
              <MagneticButton>
                <MovingBorderButton to="/products" size="md">
                  Explore Products <Icon name="arrow_right_alt" />
                </MovingBorderButton>
              </MagneticButton>
              <Link
                to="/about"
                className="font-label-md text-[0.78rem] tracking-wider text-white/80 hover:text-white uppercase border-b border-transparent hover:border-white/50 transition-all pb-1"
              >
                Discover Our Story
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Trust Indicators */}
      <section className="bg-primary border-t border-b border-white/5 py-8">
        <Container className="flex flex-wrap justify-between items-center gap-gutter">
          {TRUST_INDICATORS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4 text-white"
            >
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-lg border border-white/10 shrink-0">
                <Icon name={item.icon} className="text-secondary text-2xl" />
              </div>
              <div>
                <p className="font-label-md text-label-md text-white font-semibold">{item.title}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </Container>
      </section>

      {/* Featured Collections */}
      <section className="py-section-gap-lg bg-background">
        <Container>
          <div className="mb-16">
            <span className="eyebrow">Our Curation</span>
            <h2 className="section-title">Core Textile <em>Collections</em></h2>
            <div className="divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-white shadow-sm border border-outline-variant/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  src={category.image}
                  alt={category.alt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A101E]/90 to-transparent flex flex-col justify-end p-8">
                  <h3 className="font-headline-lg text-xl text-white mb-2 font-semibold">{category.title}</h3>
                  <p className="text-xs text-white/70 mb-6 leading-relaxed">{category.description}</p>
                  <Link
                    className="font-label-md text-[0.78rem] tracking-wider text-secondary flex items-center gap-2 group-hover:gap-3 transition-all uppercase font-semibold"
                    to={category.href}
                  >
                    View Collection <Icon name="arrow_right_alt" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Manufacturing Journey Timeline — pinned horizontal scroll on desktop,
          the connecting thread drawing in lockstep with the steps sliding by. */}
      <section ref={journeySectionRef} className="py-section-gap-lg bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-secondary/5 to-transparent pointer-events-none" />
        <Container>
          <div className="text-center mb-20">
            <span className="eyebrow !text-secondary">Operations Tour</span>
            <h2 className="section-title !text-white">Vertical Integrated <em>Journey</em></h2>
            <div className="divider mx-auto" />
          </div>
        </Container>
        <div className={`relative overflow-x-auto no-scrollbar ${prefersReducedMotion() ? '' : 'lg:overflow-hidden'}`}>
          <div
            ref={journeyTrackRef}
            className="flex items-start gap-16 lg:gap-20 px-8 md:px-margin-desktop w-max relative pb-4"
          >
            <svg
              className="absolute top-[28px] left-8 h-[2px] z-0 hidden lg:block overflow-visible"
              style={{ width: 'calc(100% - 4rem)' }}
              viewBox="0 0 1000 2"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path ref={journeyPathRef} d="M0,1 L1000,1" stroke="#C59D5F" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>

            {JOURNEY_STEPS.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="w-[168px] shrink-0 flex flex-col items-center text-center group relative z-10"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 border border-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:border-secondary transition-all duration-300 group-hover:shadow-[0_0_0_8px_rgba(197,157,95,0.12)]">
                  <span className="font-label-md text-secondary group-hover:text-white transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="font-label-md text-[0.78rem] mb-2 text-white/80 group-hover:text-secondary transition-colors font-semibold uppercase tracking-wider">
                  {step}
                </h4>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: JOURNEY_STEPS.length * 0.08 }}
              className="w-[168px] shrink-0 flex flex-col items-center text-center group relative z-10"
            >
              <div className="w-14 h-14 rounded-full bg-secondary border border-secondary flex items-center justify-center mb-6 text-white group-hover:shadow-[0_0_0_8px_rgba(197,157,95,0.12)] transition-shadow duration-300">
                <Icon name="shopping_bag" className="text-xl" />
              </div>
              <h4 className="font-label-md text-[0.78rem] mb-2 text-secondary font-semibold uppercase tracking-wider">
                Export
              </h4>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="py-section-gap-lg bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow">Why Choose Us</span>
              <h2 className="section-title mb-8 leading-tight">
                The Competitive <em>Edge</em> of AD Textile
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
                We leverage cutting-edge technology and human expertise to maintain our position as a global leader
                in textile manufacturing.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {EDGE_POINTS.map((point) => (
                  <div key={point.title} className="bg-white rounded-lg p-6 border border-outline-variant/20 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="relative w-11 h-11 mb-4">
                      <LottieIcon animationData={pulseRing} className="absolute inset-0 w-full h-full" />
                      <Icon name={point.icon} className="relative text-secondary text-4xl" />
                    </div>
                    <h4 className="font-label-md text-primary mb-2 font-semibold text-[0.9rem] uppercase tracking-wider">{point.title}</h4>
                    <p className="text-on-surface-variant text-xs leading-relaxed">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
              <div className="aspect-square bg-surface-container rounded-xl overflow-hidden shadow-md">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARFtteGVwzYDGHiEgurv8EAU_EzBuunFFXNWLp8BkYbHDjxBmqSt523srXCWOGHRSSDj3QTeEEc2lkiqe3CM3esjFPhg1qmkFNp3zd8i0UOvitKop9KPbSNwhOwwwhdN0GhFjzNtoazLp2s5SekX4WxW05VW8vSAkmGetEaovNeb-ejgZYPQCCacMm7zMBA3whWTjRpDiyhUZ2U1OD6dCbgwpJK4iuTm7jFMHv2eh4gdxLG7SO6KQI3MmhGGdPKSeHVBf_bPISpAs"
                  alt="Laboratory textile quality tests"
                />
              </div>
              <div className="aspect-square bg-surface-container rounded-xl overflow-hidden shadow-md translate-y-12">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaPzkMYakqybdMpIenotQSzoUBPrEdqnHvuGDxNJHMuxvflBtNEovCiQeWsGu02GBUU41DOyfx_RnQgU8pN3BSu5cuRGAlozLilf-4U0aQtIluzYK_IvBF4UwIGlxtw5GX0BhIpEsoF6ngv60rGEfKxqEm67niqwNuspjxEgKYD3-190qpis4QX3Zi3EigKxEKh-3Lx8MlaWbMKNAvQNzxkflrOgPLR9Jd5IsMHSNva4Mt-FYXvWLctWRKEPzzO1jrsuEH0MlC8n8"
                  alt="Warehouse of packaged fabrics"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Infrastructure */}
      <section className="py-section-gap-lg bg-surface-container-low">
        <Container>
          <div className="text-center mb-16">
            <span className="eyebrow">Manufacturing Scale</span>
            <h2 className="section-title">World-Class <em>Infrastructure</em></h2>
            <div className="divider mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {INFRASTRUCTURE_HIGHLIGHTS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden bg-white border border-outline-variant/30 rounded-xl p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={item.image}
                    alt={item.alt}
                  />
                </div>
                <h3 className="font-headline-lg text-2xl text-primary mb-4 font-semibold">{item.title}</h3>
                <p className="font-body-md text-on-surface-variant text-[0.88rem] mb-6 leading-relaxed">{item.description}</p>
                <Link
                  className="inline-flex items-center gap-2 text-secondary font-label-md text-xs font-semibold tracking-wider uppercase border-b-2 border-transparent hover:border-secondary pb-1 transition-all"
                  to={item.href}
                >
                  {item.linkLabel} <Icon name="arrow_right_alt" />
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Global Quality/Certifications */}
      <section className="py-16 border-t border-b border-outline-variant/30 bg-white">
        <Container className="text-center">
          <p className="font-label-md text-xs text-on-surface-variant mb-12 tracking-[0.2em] uppercase font-semibold">
            Compliance &amp; Testing
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-70">
            {COMPLIANCE_MARKS.map((mark) => (
              <div key={mark.label} className="flex flex-col items-center hover:opacity-100 transition-opacity duration-300">
                <Icon name={mark.icon} className="text-5xl mb-2 text-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{mark.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Community & CSR Highlight */}
      <section className="py-section-gap-lg bg-surface-container-low text-primary overflow-hidden">
        <Container className="relative">
          <div className="max-w-3xl">
            <Icon name="diversity_3" className="text-secondary text-6xl mb-8" />
            <h2 className="font-headline-lg text-3xl mb-6">Committed to the community we grow with</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              As a corporate entity in compliance with SA8000 and ISO 14001 standards, we extend our commitment
              beyond the factory floor — offering employment opportunities for the physically challenged, running a
              feeding programme for around 400 blind and deaf children, and providing education scholarships for the
              needy.
            </p>
            <Link className="inline-flex items-center gap-2 text-secondary font-semibold border-b-2 border-transparent hover:border-secondary pb-1 transition-all uppercase tracking-wider text-xs" to="/sustainability">
              Learn more about our sustainability commitments <Icon name="arrow_right_alt" />
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Banner */}
      <section className="py-section-gap-sm bg-background">
        <Container>
          <div className="bg-primary rounded-2xl p-16 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-lg">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 max-w-xl text-white">
              <h2 className="font-display-lg-mobile text-[1.9rem] md:text-3xl text-white mb-6">
                Let&apos;s Build Your Next Textile Collection
              </h2>
              <p className="font-body-lg text-[0.88rem] text-white/80 leading-relaxed">
                Connect with our export department for personalized manufacturing solutions and global partnership
                opportunities.
              </p>
            </div>
            <MagneticButton className="inline-block relative z-10">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                className="!bg-white !text-primary px-12 py-6 hover:!bg-secondary-fixed shadow-xl"
              >
                Contact Us
              </Button>
            </MagneticButton>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Home
