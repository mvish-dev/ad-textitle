import { useEffect, useRef, useState } from 'react'
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
import pulseRing from '../components/motion/pulse-ring.json'
import SpotlightCard from '../components/ui/SpotlightCard.jsx'
import TiltedCard from '../components/ui/TiltedCard.jsx'
import CollectionsCarousel3D from '../components/motion/CollectionsCarousel3D.jsx'
import LogoLoop from '../components/motion/LogoLoop.jsx'
import { gsap, isTouchDevice, prefersReducedMotion } from '../lib/motion.js'
import Seo from '../components/common/Seo.jsx'

import colorMatchingTechnician from '../assets/images/lab/color-matching-technician.webp'
import warehouseHero from '../assets/images/manufacturing/warehouse/warehouse-hero.webp'
import weavingWorkerPlaid from '../assets/images/manufacturing/weaving/weaving-worker-plaid.webp'

import sa8000 from '../assets/images/certificates/sa8000.png'
import bci from '../assets/images/certificates/bci.png'
import amforiBsci from '../assets/images/certificates/amfori-bsci.png'
import gots from '../assets/images/certificates/gots.png'
import ocsBlended from '../assets/images/certificates/ocs-blended.png'
import oekoTexStandard100 from '../assets/images/certificates/oeko-tex-standard-100.png'
import grs from '../assets/images/certificates/grs.png'
import ics from '../assets/images/certificates/ics.png'
import ceMark from '../assets/images/certificates/ce-mark.png'
import ocs100 from '../assets/images/certificates/ocs-100.png'
import fairtrade from '../assets/images/certificates/fairtrade.png'
import iso90012015 from '../assets/images/certificates/iso-9001-2015.png'
import oekoTexMadeInGreen from '../assets/images/certificates/oeko-tex-made-in-green.png'
import nsfIsr from '../assets/images/certificates/nsf-isr.png'
import sedexSmeta from '../assets/images/certificates/sedex-smeta.png'

const TRUST_INDICATORS = [
  { icon: 'history', title: 'Established Since 1990', caption: 'Legacy & Trust' },
  { icon: 'public', title: 'Export Since 1992', caption: 'Global Reach' },
  { icon: 'verified', title: 'SA8000 & ISO 9001:2015', caption: 'Compliant' },
  { icon: 'fact_check', title: '3-Layer AQL Inspection', caption: 'Quality System' },
]

const CATEGORIES = [
  {
    title: 'Kitchen Linen',
    description: 'Aprons, mittens and kitchen sets for sophisticated culinary spaces.',
    href: '/products',
    icon: 'kitchen',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNwMAmERcdNtmtoAUEd_p2N3Oa3ieJi4SHc__8Pd3ylDKv60RTfy5EQy10YJKXg2oMzWQd8YL_GLEATGQtvS_-nQMTFRR7QoWTr3MYErLFIFzg2hvsES-4iGgjcqZPSiIlmLjph6PPfdhZ9K6MwRKFQY70-96pCBlSC86TGAOu0GeplWoHKYyXBPU8rYYHmNGXp4wWDZzHmVXm2GaZvAFja1nCHxQ6vM6xbGzt3eM48Ckuwdy6rwscTjAhvN7x3_8mpYjzi_dW9i4',
    alt: 'Top-down editorial shot of high-quality kitchen linens featuring waffle weave and herringbone textures.',
  },
  {
    title: 'Table Linen',
    description: 'Table cloths, mats, runners and chair pads for distinguished dining.',
    href: '/products',
    icon: 'dining',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80&auto=format&fit=crop',
    alt: 'Elegant table setting with fine linen, white plates and polished cutlery.',
  },
  {
    title: 'Bed Linen',
    description: 'Bed spreads, bedding, cushions, quilts and rest bedding.',
    href: '/products',
    icon: 'bed',
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80&auto=format&fit=crop',
    alt: 'Bright bedroom with a neatly made bed dressed in crisp white linen.',
  },
  {
    title: 'Living Linen',
    description: 'Curtains crafted for texture, drape and everyday living spaces.',
    href: '/products',
    icon: 'curtains',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&q=80&auto=format&fit=crop',
    alt: 'Elegant flowing curtains in a softly lit modern living room.',
  },
]

const JOURNEY_STEPS = [
  {
    title: 'Raw Material',
    description: 'Premium fibres sourced and graded before they ever touch the line.',
    icon: 'grass',
  },
  {
    title: 'Dyeing',
    description: 'Imported Italian Cheese Dyeing Machines processing 3 tons of yarn a day for azo-free, colorfast results.',
    icon: 'water_drop',
  },
  {
    title: 'Weaving',
    description: 'Somet Super Excel Rapier Looms weaving terry, full terry and jacquard fabric up to 120 inches wide — one million metres a month.',
    icon: 'texture',
  },
  {
    title: 'Knitting',
    description: '50 imported Korean knitting machines producing 5 lakh pairs a month in full terry, half terry, jacquard and more.',
    icon: 'grid_view',
  },
  {
    title: 'Stitching',
    description: '200 Zuki sewing machines backed by 100 skilled and 100 semi-skilled hands finishing every seam.',
    icon: 'content_cut',
  },
  {
    title: 'Quality Control',
    description: '3-layer AQL inspection — online, quality and final checks before dispatch.',
    icon: 'fact_check',
  },
  {
    title: 'Packing',
    description: 'Export-ready packing built to protect fabric across the journey.',
    icon: 'inventory_2',
  },
  {
    title: 'Export',
    description: 'Shipped worldwide to retail and hospitality brands since 1992.',
    icon: 'shopping_bag',
  },
]

const EDGE_POINTS = [
  {
    icon: 'history',
    title: 'Established in 1990',
    description: '35+ Years of Textile Manufacturing Excellence.',
  },
  {
    icon: 'public',
    title: 'Exporting Since 1992',
    description: 'Trusted Global Export Partner for Over 30 Years.',
  },
  {
    icon: 'factory',
    title: 'Fully Integrated Manufacturing',
    description: 'Complete In-House Production Under One Roof.',
  },
  {
    icon: 'verified',
    title: 'Certified Manufacturing Facility',
    description: 'Committed to Global Quality & Compliance Standards.',
  },
  {
    icon: 'fact_check',
    title: 'End-to-End Quality Control',
    description: 'Rigorous Quality Checks at Every Production Stage.',
  },
  {
    icon: 'design_services',
    title: 'Custom Product Development',
    description: 'OEM & Private Label Solutions Tailored to Your Brand.',
  },
  {
    icon: 'trending_up',
    title: 'Scalable Production Capacity',
    description: 'Modern Infrastructure for Small to High-Volume Orders.',
  },
  {
    icon: 'local_shipping',
    title: 'Reliable On-Time Delivery',
    description: 'Consistent Quality, Timely Shipments & Long-Term Partnerships.',
  },
]

const CERTIFICATE_LOGOS = [
  { src: sa8000, alt: 'SA8000 — Social Accountability International' },
  { src: bci, alt: 'Better Cotton Initiative' },
  { src: amforiBsci, alt: 'amfori BSCI' },
  { src: gots, alt: 'GOTS — Global Organic Textile Standard' },
  { src: ocsBlended, alt: 'Organic Content Standard — Blended' },
  { src: oekoTexStandard100, alt: 'OEKO-TEX® Standard 100' },
  { src: grs, alt: 'Global Recycled Standard' },
  { src: ics, alt: 'ICS' },
  { src: ceMark, alt: 'CE Mark' },
  { src: ocs100, alt: 'Organic Content Standard — 100' },
  { src: fairtrade, alt: 'Fairtrade' },
  { src: iso90012015, alt: 'ISO 9001:2015' },
  { src: oekoTexMadeInGreen, alt: 'OEKO-TEX® Made in Green' },
  { src: nsfIsr, alt: 'NSF-ISR — AS9100 with ISO 9001' },
  { src: sedexSmeta, alt: 'Sedex / SMETA 4-Pillar' },
]

function Home() {
  const heroSectionRef = useRef(null)
  const [heroInView, setHeroInView] = useState(true)
  const journeySectionRef = useRef(null)
  const journeyListRef = useRef(null)
  const journeyRailTrackRef = useRef(null)
  const journeyRailFillRef = useRef(null)

  // The hero's WebGL shader scene renders every animation frame at full
  // cost — pause it once it's scrolled out of view instead of paying for
  // it (and competing with Lenis/ScrollTrigger for the same frame budget)
  // for the entire time the user is on the page.
  useEffect(() => {
    const el = heroSectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      const list = journeyListRef.current
      const track = journeyRailTrackRef.current
      const fill = journeyRailFillRef.current
      if (!list || !track || !fill) return undefined

      const nodes = gsap.utils.toArray(list.querySelectorAll('.journey-step-node'))
      if (!nodes.length) return undefined

      // The rail must stop at the last bubble's center, not the bottom of
      // the list — the last step's own title/description text extends
      // below its bubble, so sizing the rail to the container's full
      // height leaves it dangling past "Export" with nothing there.
      // Measured via offsetTop (true layout position) rather than
      // getBoundingClientRect, since not-yet-revealed nodes still carry
      // Framer Motion's `initial` y-offset transform, which would throw
      // off a rect-based measurement taken before they scroll into view.
      const lastBubble = nodes[nodes.length - 1].querySelector('.step-indicator-bubble')
      const offsetTopWithin = (el, ancestor) => {
        let top = 0
        let node = el
        while (node && node !== ancestor) {
          top += node.offsetTop
          node = node.offsetParent
        }
        return top
      }
      const syncRailLength = () => {
        const length = offsetTopWithin(lastBubble, list) + lastBubble.offsetHeight / 2
        track.style.height = `${length}px`
        fill.style.height = `${length}px`
      }
      syncRailLength()
      window.addEventListener('resize', syncRailLength)

      if (prefersReducedMotion()) {
        gsap.set(fill, { scaleY: 1 })
        return () => window.removeEventListener('resize', syncRailLength)
      }

      gsap.set(fill, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(
        nodes.map((node) => node.querySelector('.step-indicator-bubble')),
        { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(197, 157, 95, 0.2)', boxShadow: 'none', scale: 1 }
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: list,
          start: 'top 75%',
          end: 'bottom 65%',
          scrub: 0.6,
        },
      })

      // Rail fill grows downward in step with scroll
      tl.to(fill, { scaleY: 1, ease: 'none' }, 0)

      // Each node lights up as the fill reaches it, and stays lit — a
      // completed-steps-accumulate progress metaphor rather than a single
      // travelling highlight.
      nodes.forEach((node, index) => {
        const progress = nodes.length > 1 ? index / (nodes.length - 1) : 0
        const bubble = node.querySelector('.step-indicator-bubble')
        const icon = node.querySelector('.step-indicator-icon')

        tl.to(
          bubble,
          {
            backgroundColor: '#C59D5F',
            borderColor: '#C59D5F',
            boxShadow: '0 0 28px rgba(197, 157, 95, 0.55)',
            scale: 1.1,
            duration: 0.15,
          },
          progress * 0.94
        )
        tl.to(icon, { color: '#0F172A', duration: 0.15 }, progress * 0.94)
      })

      return () => window.removeEventListener('resize', syncRailLength)
    },
    { scope: journeySectionRef }
  )

  return (
    <>
      <Seo description="A D Textile manufactures premium kitchen, table, bed and living linen for global retail brands. Vertically integrated, SA8000 & ISO 9001:2015 compliant, exporting since 1992." />
      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative min-h-screen flex items-center bg-primary text-white overflow-hidden pt-20">

        {/* WebGL Scene Backdrop */}
        <WebGLScene
          loader={() => import('../components/motion/Ferrofluid.jsx')}
          paused={!heroInView}
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
              Crafted for the Global Market.
            </RevealText>

            <p className="font-body-md text-white/90 font-light max-w-[620px] text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
              From raw fibre to finished textile, we combine craftsmanship, manufacturing expertise and end-to-end control to create premium kitchen, table, bed and living linens trusted by global retailers and hospitality brands.
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-4 space-y-5">
              <span className="eyebrow">Our Curation</span>
              <h2 className="section-title text-3xl font-light text-primary">Core Textile <em className="italic text-secondary font-normal font-serif">Collections</em></h2>
              <div className="divider" />
              <p className="font-body-md text-on-surface-variant leading-relaxed text-sm md:text-base max-w-sm">
                Four cornerstone categories, one standard of craft — kitchen, table, bed and living linens engineered for texture, drape and everyday durability.
              </p>
              <Link
                className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline uppercase tracking-wider text-xs pt-1"
                to="/products"
              >
                View All Products <Icon name="arrow_right_alt" />
              </Link>
            </div>

            <div className="lg:col-span-8">
              <CollectionsCarousel3D items={CATEGORIES} />
            </div>
          </div>
        </Container>
      </section>

      {/* Manufacturing Journey Timeline Section */}
      <section ref={journeySectionRef} className="py-24 lg:py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-secondary/5 to-transparent pointer-events-none" />
        <Container>
          <div className="text-center mb-20 space-y-4">
            <span className="eyebrow !text-secondary">Operations Tour</span>
            <h2 className="section-title !text-white text-3xl font-light">Vertically Integrated <em className="italic text-secondary font-normal font-serif">Journey</em></h2>
            <div className="divider mx-auto" />
          </div>

          <div ref={journeyListRef} className="relative max-w-4xl mx-auto">
            {/* Rail track — height is set in JS to stop exactly at the last bubble's center */}
            <div
              ref={journeyRailTrackRef}
              className="absolute left-6 lg:left-1/2 top-0 w-px bg-white/10 lg:-translate-x-1/2"
            />
            {/* Rail fill — scrubbed with scroll via GSAP */}
            <div
              ref={journeyRailFillRef}
              className="absolute left-6 lg:left-1/2 top-0 w-px bg-gradient-to-b from-secondary via-secondary to-secondary/20 lg:-translate-x-1/2"
            />

            <div className="space-y-14 lg:space-y-20">
              {JOURNEY_STEPS.map((step, index) => {
                const isRight = index % 2 === 1
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="journey-step-node relative"
                  >
                    <div className="step-indicator-bubble absolute left-6 lg:left-1/2 top-0 -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-secondary/20 flex items-center justify-center z-10">
                      <LottieIcon animationData={pulseRing} className="absolute inset-0 w-full h-full opacity-50" />
                      <Icon name={step.icon} className="step-indicator-icon relative text-secondary text-xl md:text-2xl" />
                    </div>

                    <div
                      className={`pl-20 lg:pl-0 lg:w-[calc(50%-2.5rem)] ${
                        isRight ? 'lg:ml-auto lg:text-left' : 'lg:mr-auto lg:text-right'
                      }`}
                    >
                      <span className="block text-[10px] font-mono tracking-[0.3em] text-secondary/70 uppercase mb-2">
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                      <h4 className="step-label-title font-serif text-xl md:text-2xl text-white font-bold mb-2">
                        {step.title}
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us & Competitive Edge Section */}
      <section className="pt-24 pb-36 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="eyebrow">Why Choose Us</span>
                <h2 className="section-title text-3xl font-light text-primary leading-tight mt-3">
                  The Competitive <em className="italic text-secondary font-normal font-serif">Edge</em> of A D Textile
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
                    src={colorMatchingTechnician}
                    alt="Laboratory technician performing colour-matching tests at A D Textile"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </TiltedCard>

              <TiltedCard tiltMax={6} className="w-full translate-y-12">
                <div className="aspect-square bg-surface-container rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    src={warehouseHero}
                    alt="Warehouse of packaged, export-ready fabrics at A D Textile"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </TiltedCard>
            </div>

          </div>
        </Container>
      </section>

      {/* Compliance & Testing Certificate Marquee */}
      <section className="py-20 bg-white">
        <Container className="text-center space-y-12">
          <p className="font-label-md text-xs text-on-surface-variant tracking-[0.25em] uppercase font-bold">
            Compliance &amp; Testing
          </p>

          <div className="border-t border-b border-outline-variant/20 py-10">
            <LogoLoop
              logos={CERTIFICATE_LOGOS}
              speed={40}
              gap={64}
              logoHeight={64}
              fadeOut
              fadeOutColor="#ffffff"
              pauseOnHover
              ariaLabel="Certification and compliance logos"
            />
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
                src={weavingWorkerPlaid}
                loading="lazy"
                decoding="async"
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
