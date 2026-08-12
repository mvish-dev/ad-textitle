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
import SpotlightCard from '../components/ui/SpotlightCard.jsx'
import TiltedCard from '../components/ui/TiltedCard.jsx'
import { gsap, isTouchDevice, prefersReducedMotion } from '../lib/motion.js'
import Seo from '../components/common/Seo.jsx'

const TRUST_INDICATORS = [
  { icon: 'history', title: 'Established Since 1990', caption: 'Legacy & Trust' },
  { icon: 'public', title: 'Export Since 1992', caption: 'Global Reach' },
  { icon: 'verified', title: 'SA8000 & ISO 14001', caption: 'Compliant' },
  { icon: 'fact_check', title: '2-Layer AQL Inspection', caption: 'Quality System' },
]

const CATEGORIES = [
  {
    title: 'Kitchen Linen',
    description: 'Aprons, mittens and kitchen sets for sophisticated culinary spaces.',
    href: '/products',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNwMAmERcdNtmtoAUEd_p2N3Oa3ieJi4SHc__8Pd3ylDKv60RTfy5EQy10YJKXg2oMzWQd8YL_GLEATGQtvS_-nQMTFRR7QoWTr3MYErLFIFzg2hvsES-4iGgjcqZPSiIlmLjph6PPfdhZ9K6MwRKFQY70-96pCBlSC86TGAOu0GeplWoHKYyXBPU8rYYHmNGXp4wWDZzHmVXm2GaZvAFja1nCHxQ6vM6xbGzt3eM48Ckuwdy6rwscTjAhvN7x3_8mpYjzi_dW9i4',
    alt: 'Top-down editorial shot of high-quality kitchen linens featuring waffle weave and herringbone textures.',
  },
  {
    title: 'Table Linen',
    description: 'Table cloths, mats, runners and chair pads for distinguished dining.',
    href: '/products',
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
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&q=80&auto=format&fit=crop',
    alt: 'Elegant flowing curtains in a softly lit modern living room.',
  },
]

const JOURNEY_STEPS = [
  'Raw Material',
  'Dyeing',
  'Weaving',
  'Knitting',
  'Stitching',
  'Quality Control',
  'Packing',
]

const EDGE_POINTS = [
  {
    icon: 'factory',
    title: 'Modern Manufacturing',
    description: 'Somet Rapier looms weaving 1 million metres of fabric every month.',
  },
  {
    icon: 'high_quality',
    title: 'Strict Quality',
    description: '2-layer inspection system — in-line checks plus a final AQL-standard clearance.',
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
      'Somet Super Excel Rapier Looms weaving 1 million metres of premium fabric every month.',
    href: '/manufacturing#weaving',
    linkLabel: 'Technical Specifications',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6UIg_my9ndoQxb-vJN2giWKEECHywzzxEjsL8xRgDH9MqV1aW2r9J4AduCdEnCa-EXV5H-VetS2s4mshhPtJcYFAD3qR1Tr9E1GkwlA5VH-REXwZ9kpxeCh_JJJcUPaA7HVkya_ZQ3Iz2L4utVIITWvLdF8j_2FzNI1n-_xQE-4If9vMWPEtIqpVu7bIBRDPHacRaJRIAX4n7bNEWM99CaQo1qBZ_kver0BMePTS_DUp3ovmDbjE3fSDFvn87e1QBvOu_NzPprfs',
    alt: 'High-angle architectural shot of a state-of-the-art textile weaving facility.',
  },
  {
    title: 'Advanced Finishing Hub',
    description:
      'Garuda and Toshiba embroidery machines with 54 heads (10–12 thread colours) and precision digitising.',
    href: '/manufacturing#embroidery',
    linkLabel: 'Process Overview',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGR0CkgYRw78qoYAjf-dzT5EPSS7fUmKhzhwT_lHjB23zBsEyJ6m06AjjJ3PZDRKRBoJ93LUbRKSs_0FLKxyBRLdyDvbhU0s_tMgmzonvcFdseZxhjxIve-huknqBM91Z_FmLzmPEZOTvLMZwXMy8y8GHg-YPVAIm4gODzlDpGdwUhdQkg_ztiYw5njXnUXVWIPMlThCU7D_OSaaiTuOVWtUhgbzQeX9Hl3ooXkKpAuJuZmcuU1Srnk6nlpwi0BuxXnKkwYs8LNSI',
    alt: 'Close-up of a high-speed industrial textile printer applying vibrant patterns.',
  },
]

const COMPLIANCE_MARKS = [
  { icon: 'workspace_premium', label: 'SA8000' },
  { icon: 'eco', label: 'ISO 14001' },
  { icon: 'fact_check', label: '2-LAYER AQL INSPECTION' },
  { icon: 'verified', label: 'CERTIFIED MANUFACTURING FACILITY' },
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
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        })

        // Core translation and path draw
        tl.to(track, { x: () => -getScrollDistance(), ease: 'none' }, 0)
        tl.to(path, { strokeDashoffset: 0, ease: 'none' }, 0)

        // Active node highlight scrubbing on horizontal timeline
        const stepElements = track.querySelectorAll('.journey-step-node')
        stepElements.forEach((el, index) => {
          const relativeProgress = index / (stepElements.length - 1)
          
          tl.to(el.querySelector('.step-indicator-bubble'), {
            backgroundColor: '#C59D5F',
            borderColor: '#C59D5F',
            color: '#FFFFFF',
            boxShadow: '0 0 24px rgba(197, 157, 95, 0.65)',
            scale: 1.25,
            duration: 0.15,
          }, relativeProgress * 0.8)

          tl.to(el.querySelector('.step-label-title'), {
            color: '#C59D5F',
            scale: 1.05,
            duration: 0.15,
          }, relativeProgress * 0.8)

          if (index > 0) {
            tl.to(stepElements[index - 1].querySelector('.step-indicator-bubble'), {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(197, 157, 95, 0.2)',
              color: '#C59D5F',
              boxShadow: 'none',
              scale: 1.0,
              duration: 0.15,
            }, relativeProgress * 0.8)

            tl.to(stepElements[index - 1].querySelector('.step-label-title'), {
              color: 'rgba(255, 255, 255, 0.8)',
              scale: 1.0,
              duration: 0.15,
            }, relativeProgress * 0.8)
          }
        })

        return () => {}
      })

      return () => mm.revert()
    },
    { scope: journeySectionRef }
  )

  return (
    <>
      <Seo description="AD Textile manufactures premium kitchen, table, bed and living linen for global retail brands. Vertically integrated, SA8000 & ISO 14001 compliant, exporting since 1992." />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-primary text-white overflow-hidden pt-20">
        
        {/* WebGL Scene Backdrop */}
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
              'radial-gradient(60% 75% at 50% 50%, rgba(10,16,30,0.85) 0%, rgba(10,16,30,0.6) 45%, rgba(10,16,30,0.3) 72%, rgba(10,16,30,0.55) 100%)',
          }}
        />

        <Container className="relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-[900px] mx-auto text-center flex flex-col items-center space-y-6"
          >
            <div className="flex items-center justify-center gap-3 text-secondary uppercase font-body-md" style={{ fontSize: '0.66rem', letterSpacing: '0.32em', fontWeight: '600' }}>
              <span className="w-[26px] h-[1px] bg-secondary" />
              <span>Est. 1990 · Karur, India</span>
              <span className="w-[26px] h-[1px] bg-secondary" />
            </div>

            <RevealText
              as="h1"
              scrollTriggered={false}
              delay={0.3}
              className="font-display-lg text-white font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
            >
              Premium Home Textiles
            </RevealText>

            <p className="font-body-md text-white/90 font-light max-w-[620px] text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
              Crafted for the Global Market. From raw fibre to finished textile, we deliver premium kitchen, table, bed and living linens engineered for global retailers and hospitality brands.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
              <MagneticButton>
                <MovingBorderButton to="/products" size="md">
                  Explore Products <Icon name="arrow_right_alt" />
                </MovingBorderButton>
              </MagneticButton>
              <Link
                to="/about"
                className="font-label-md text-[0.78rem] tracking-widest text-white/80 hover:text-white uppercase border-b border-transparent hover:border-white/50 transition-all pb-1 font-semibold"
              >
                Discover Our Story
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Trust Indicators Section */}
      <section className="bg-primary border-t border-b border-white/5 py-10">
        <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_INDICATORS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4 text-white"
            >
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-xl border border-white/10 shrink-0">
                <Icon name={item.icon} className="text-secondary text-2xl" />
              </div>
              <div>
                <p className="font-label-md text-sm text-white font-semibold">{item.title}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/60 mt-0.5">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </Container>
      </section>

      {/* Featured Collections Section */}
      <section className="py-24 bg-background">
        <Container>
          <div className="mb-16 space-y-4">
            <span className="eyebrow">Our Curation</span>
            <h2 className="section-title text-3xl font-light text-primary">Core Textile <em className="italic text-secondary font-normal font-serif">Collections</em></h2>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => (
              <TiltedCard key={category.title} tiltMax={8}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-md border border-outline-variant/30 transition-all duration-300">
                  <img
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    src={category.image}
                    alt={category.alt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A101E]/95 via-[#0A101E]/40 to-transparent flex flex-col justify-end p-8">
                    <h3 className="font-serif text-xl text-white mb-2 font-bold">{category.title}</h3>
                    <p className="text-xs text-white/70 mb-5 leading-relaxed">{category.description}</p>
                    <Link
                      className="font-label-md text-[0.72rem] tracking-wider text-secondary flex items-center gap-2 group-hover:gap-3 transition-all uppercase font-semibold"
                      to={category.href}
                    >
                      View Collection <Icon name="arrow_right_alt" />
                    </Link>
                  </div>
                </div>
              </TiltedCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Manufacturing Journey Timeline Section */}
      <section ref={journeySectionRef} className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-secondary/5 to-transparent pointer-events-none" />
        <Container>
          <div className="text-center mb-20 space-y-4">
            <span className="eyebrow !text-secondary">Operations Tour</span>
            <h2 className="section-title !text-white text-3xl font-light">Vertical Integrated <em className="italic text-secondary font-normal font-serif">Journey</em></h2>
            <div className="divider mx-auto" />
          </div>
        </Container>

        <div className={`relative overflow-x-auto no-scrollbar ${prefersReducedMotion() ? '' : 'lg:overflow-hidden'}`}>
          <div
            ref={journeyTrackRef}
            className="flex items-start gap-16 lg:gap-20 px-8 md:px-margin-desktop w-max relative pb-6"
          >
            {/* Timeline thread line drawing */}
            <svg
              className="absolute top-[28px] left-8 h-[2px] z-0 hidden lg:block overflow-visible"
              style={{ width: 'calc(100% - 4rem)' }}
              viewBox="0 0 1000 2"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path ref={journeyPathRef} d="M0,1 L1000,1" stroke="#C59D5F" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>

            {JOURNEY_STEPS.map((step, index) => (
              <div
                key={step}
                className="journey-step-node w-[168px] shrink-0 flex flex-col items-center text-center group relative z-10 transition-all duration-300"
              >
                <div className="step-indicator-bubble w-14 h-14 rounded-full bg-white/5 border border-secondary/20 flex items-center justify-center mb-6 transition-all duration-300 font-label-md text-secondary">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="step-label-title font-label-md text-xs mb-2 text-white/80 transition-all font-semibold uppercase tracking-wider">
                  {step}
                </h4>
              </div>
            ))}

            <div className="journey-step-node w-[168px] shrink-0 flex flex-col items-center text-center group relative z-10 transition-all duration-300">
              <div className="step-indicator-bubble w-14 h-14 rounded-full bg-secondary border border-secondary flex items-center justify-center mb-6 text-white font-label-md">
                <Icon name="shopping_bag" className="text-xl" />
              </div>
              <h4 className="step-label-title font-label-md text-xs mb-2 text-secondary font-semibold uppercase tracking-wider">
                Export
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Competitive Edge Section */}
      <section className="pt-24 pb-36 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="eyebrow">Why Choose Us</span>
                <h2 className="section-title text-3xl font-light text-primary leading-tight mt-3">
                  The Competitive <em className="italic text-secondary font-normal font-serif">Edge</em> of AD Textile
                </h2>
                <p className="font-body-md text-on-surface-variant max-w-xl leading-relaxed mt-4 text-sm md:text-base">
                  We leverage cutting-edge technology and human expertise to maintain our position as a global leader in textile manufacturing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {EDGE_POINTS.map((point) => (
                  <SpotlightCard
                    key={point.title}
                    className="bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                  >
                    <div className="relative w-11 h-11 mb-4 flex items-center justify-center">
                      <LottieIcon animationData={pulseRing} className="absolute inset-0 w-full h-full opacity-60" />
                      <Icon name={point.icon} className="relative text-secondary text-2xl" />
                    </div>
                    <h4 className="font-label-md text-primary mb-2 font-semibold text-[0.82rem] uppercase tracking-wider">
                      {point.title}
                    </h4>
                    <p className="text-on-surface-variant text-xs leading-relaxed">
                      {point.description}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-6 relative">
              <TiltedCard tiltMax={6} className="w-full">
                <div className="aspect-square bg-surface-container rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuARFtteGVwzYDGHiEgurv8EAU_EzBuunFFXNWLp8BkYbHDjxBmqSt523srXCWOGHRSSDj3QTeEEc2lkiqe3CM3esjFPhg1qmkFNp3zd8i0UOvitKop9KPbSNwhOwwwhdN0GhFjzNtoazLp2s5SekX4WxW05VW8vSAkmGetEaovNeb-ejgZYPQCCacMm7zMBA3whWTjRpDiyhUZ2U1OD6dCbgwpJK4iuTm7jFMHv2eh4gdxLG7SO6KQI3MmhGGdPKSeHVBf_bPISpAs"
                    alt="Laboratory textile quality tests"
                  />
                </div>
              </TiltedCard>

              <TiltedCard tiltMax={6} className="w-full translate-y-12">
                <div className="aspect-square bg-surface-container rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaPzkMYakqybdMpIenotQSzoUBPrEdqnHvuGDxNJHMuxvflBtNEovCiQeWsGu02GBUU41DOyfx_RnQgU8pN3BSu5cuRGAlozLilf-4U0aQtIluzYK_IvBF4UwIGlxtw5GX0BhIpEsoF6ngv60rGEfKxqEm67niqwNuspjxEgKYD3-190qpis4QX3Zi3EigKxEKh-3Lx8MlaWbMKNAvQNzxkflrOgPLR9Jd5IsMHSNva4Mt-FYXvWLctWRKEPzzO1jrsuEH0MlC8n8"
                    alt="Warehouse of packaged fabrics"
                  />
                </div>
              </TiltedCard>
            </div>

          </div>
        </Container>
      </section>

      {/* World-Class Infrastructure Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-outline-variant/20">
        <Container>
          <div className="text-center mb-16 space-y-4">
            <span className="eyebrow">Manufacturing Scale</span>
            <h2 className="section-title text-3xl font-light text-primary">World-Class <em className="italic text-secondary font-normal font-serif">Infrastructure</em></h2>
            <div className="divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INFRASTRUCTURE_HIGHLIGHTS.map((item) => (
              <SpotlightCard
                key={item.title}
                className="bg-white border border-outline-variant/30 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <TiltedCard tiltMax={4}>
                    <div className="aspect-[16/10] overflow-hidden rounded-xl border border-outline-variant/20 shadow-xs">
                      <img
                        className="w-full h-full object-cover"
                        src={item.image}
                        alt={item.alt}
                      />
                    </div>
                  </TiltedCard>
                  
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl text-primary font-bold">{item.title}</h3>
                    <p className="font-body-md text-on-surface-variant text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-outline-variant/20">
                  <Link
                    className="inline-flex items-center gap-2 text-secondary font-label-md text-xs font-semibold tracking-wider uppercase hover:text-primary transition-colors"
                    to={item.href}
                  >
                    {item.linkLabel} <Icon name="arrow_right_alt" />
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Compliance & Testing Infinite Scroll Marquee */}
      <section className="py-20 bg-white">
        <Container className="text-center space-y-12">
          <p className="font-label-md text-xs text-on-surface-variant tracking-[0.25em] uppercase font-bold">
            Compliance &amp; Testing
          </p>

          <div className="w-full overflow-hidden relative py-6 border-t border-b border-outline-variant/20">
            {/* Fade overlays - keeping horizontal borders crisp by staying inside top-px/bottom-px */}
            <div className="absolute left-0 top-px bottom-px w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-px bottom-px w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-max animate-marquee gap-16 select-none">
              {[...COMPLIANCE_MARKS, ...COMPLIANCE_MARKS, ...COMPLIANCE_MARKS].map((mark, i) => (
                <div key={i} className="flex flex-col items-center justify-center shrink-0 min-w-[220px]">
                  <Icon name={mark.icon} className="text-4xl mb-2.5 text-secondary" />
                  <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary font-mono">
                    {mark.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Community & CSR Highlight Section */}
      <section className="py-24 bg-slate-50 text-primary border-t border-outline-variant/20">
        <Container>
          <div className="max-w-4xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Icon name="diversity_3" className="text-3xl" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-primary leading-tight">
              Committed to the <em className="italic text-secondary font-normal font-serif">community</em> we grow with
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed text-sm md:text-base max-w-3xl">
              As a corporate entity in compliance with SA8000 and ISO 14001 standards, we extend our commitment beyond the factory floor — offering employment opportunities for the physically challenged, running a feeding programme for around 400 blind and deaf children, and providing education scholarships for the needy.
            </p>
            <div className="pt-2">
              <Link className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline uppercase tracking-wider text-xs" to="/sustainability">
                Learn more about our sustainability commitments <Icon name="arrow_right_alt" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Banner Section */}
      <section className="py-20 bg-background">
        <Container>
          <div className="bg-primary rounded-2xl p-16 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none z-0">
              <img
                className="w-full h-full object-cover scale-105"
                alt="Weaving background"
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80&auto=format&fit=crop"
              />
            </div>
            
            <div className="relative z-10 max-w-xl text-white space-y-4">
              <span className="eyebrow text-secondary">Ready to Connect</span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight">
                Let&apos;s Build Your Next <br />
                <span className="italic text-secondary font-serif font-normal">Textile Collection</span>
              </h2>
              <p className="font-body-md text-white/70 text-xs md:text-sm leading-relaxed max-w-md">
                Connect with our export department for personalized manufacturing solutions and global partnership opportunities.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <MagneticButton>
                <Button
                  to="/contact"
                  variant="primary"
                  size="lg"
                  className="!bg-white !text-primary hover:!bg-secondary-fixed shadow-2xl font-bold"
                >
                  Contact Us
                </Button>
              </MagneticButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Home
