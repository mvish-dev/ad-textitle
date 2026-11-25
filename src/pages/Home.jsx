import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import Container from '../components/ui/Container.jsx'
import Icon from '../components/ui/Icon.jsx'
import LottieIcon from '../components/motion/LottieIcon.jsx'
import pulseRing from '../components/motion/pulse-ring.json'
import CollectionsCarousel3D from '../components/motion/CollectionsCarousel3D.jsx'
import LogoLoop from '../components/motion/LogoLoop.jsx'
import { gsap, prefersReducedMotion } from '../lib/motion.js'
import Seo from '../components/common/Seo.jsx'
import { PRODUCT_CATEGORIES, productCategoryPath } from '../data/products.js'


import sa8000 from '../assets/images/certificates/sa8000.png'
import bci from '../assets/images/certificates/bci.png'
import amforiBsci from '../assets/images/certificates/amfori-bsci.png'
import gots from '../assets/images/certificates/gots-logo.avif'
import ocsBlended from '../assets/images/certificates/organic-blended-content-standard-logo.avif'
import oekoTexStandard100 from '../assets/images/certificates/oeko-tex-standard-100.png'
import grs from '../assets/images/certificates/grs_logo.avif'
import ics from '../assets/images/certificates/ics.png'
import ceMark from '../assets/images/certificates/ce-mark.png'
import ocs100 from '../assets/images/certificates/ocs_100_logo.avif'
import fairtrade from '../assets/images/certificates/fairtrade.png'
import iso90012015 from '../assets/images/certificates/organization-iso-9000-iso-9001-2015-certification_logo.avif'
import oekoTexMadeInGreen from '../assets/images/certificates/oeko-tex-made-in-green.png'
import nsfIsr from '../assets/images/certificates/nsf-isr.png'
import sedexSmeta from '../assets/images/certificates/sedex-smeta.png'

import heroCushions from '../assets/images/hero/cushions-bed-linen.webp'
import heroKitchen from '../assets/images/hero/kitchen-linen-apron.webp'
import heroDining from '../assets/images/hero/printed-table-cloth-dining.webp'
import heroShell from '../assets/images/hero/shell-print-table-cloth.webp'
import heroVelvet from '../assets/images/hero/velvet-cushions-bedroom.webp'

const HERO_SLIDES = [
  {
    eyebrow: 'Cushion Covers',
    title: 'Crafted for the Global Market',
    text: 'Premium kitchen, table, bed and living linens — from raw fibre to finished textile.',
    cta: { label: 'Explore Products', to: '/products' },
    image: heroCushions,
  },
  {
    eyebrow: 'Kitchen Linen',
    title: 'Woven In-House, Shipped Worldwide',
    text: 'Aprons, oven mitts and towels made under one roof and exported since 1992.',
    cta: { label: 'Our Manufacturing', to: '/manufacturing' },
    image: heroKitchen,
  },
  {
    eyebrow: 'Table Linen',
    title: 'Quality You Can Certify',
    text: 'SA8000 & ISO 9001:2015 compliant, with 3-layer AQL inspection on every order.',
    cta: { label: 'Quality & Compliance', to: '/quality-compliance' },
    image: heroDining,
  },
  {
    eyebrow: 'Printed Table Cloths',
    title: 'Prints That Set the Table',
    text: 'Custom designs, colourways and sizes for retail and hospitality buyers.',
    cta: { label: 'Explore Products', to: '/products' },
    image: heroShell,
  },
  {
    eyebrow: 'Bed & Living',
    title: 'Comfort in Every Thread',
    text: 'Velvet, woven and printed cushion covers finished to your specification.',
    cta: { label: 'Contact Us', to: '/contact' },
    image: heroVelvet,
  },
]

const HERO_AUTOPLAY_MS = 6000

// Mirrors the Products page so every card links to a real category page.
const CATEGORIES = PRODUCT_CATEGORIES.map((category) => ({
  title: category.title,
  description: category.tagline,
  href: productCategoryPath(category),
  icon: category.icon,
  image: category.image,
  alt: category.title,
}))

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

// Feeds the hero's advantages marquee.
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
  const [heroSlide, setHeroSlide] = useState(0)
  const journeySectionRef = useRef(null)
  const journeyListRef = useRef(null)
  const journeyRailTrackRef = useRef(null)
  const journeyRailFillRef = useRef(null)
  // Below lg the next step only peeks in from the edge, so reveal each one
  // as soon as any of it is on screen — otherwise the peeking step stays
  // invisible until it's well into view.
  const [journeyRevealAmount] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches ? 0.4 : 0
  )

  // Autoplay the hero carousel. Keyed on the current slide so a manual
  // arrow click restarts the countdown instead of jumping again right away.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const timer = setTimeout(() => setHeroSlide((i) => (i + 1) % HERO_SLIDES.length), HERO_AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [heroSlide])

  const stepHero = (dir) => setHeroSlide((i) => (i + dir + HERO_SLIDES.length) % HERO_SLIDES.length)
  const activeHero = HERO_SLIDES[heroSlide]

  useGSAP(
    () => {
      const section = journeySectionRef.current
      const list = journeyListRef.current
      const track = journeyRailTrackRef.current
      const fill = journeyRailFillRef.current
      if (!section || !list || !track || !fill) return undefined

      const nodes = gsap.utils.toArray(list.querySelectorAll('.journey-step-node'))
      if (!nodes.length) return undefined
      const bubbles = nodes.map((node) => node.querySelector('.step-indicator-bubble'))

      // The rail runs from the first bubble's center to the last one's, not
      // the list's full width — the last step's text column extends past its
      // bubble, so a full-width rail would dangle beyond "Export". Measured
      // via offsetLeft/offsetTop (true layout position), which ignore the
      // Framer Motion `initial` y-offset not-yet-revealed nodes still carry.
      const syncRail = () => {
        const first = bubbles[0]
        const last = bubbles[bubbles.length - 1]
        const start = first.parentElement.offsetLeft + first.offsetLeft + first.offsetWidth / 2
        const end = last.parentElement.offsetLeft + last.offsetLeft + last.offsetWidth / 2
        const top = first.parentElement.offsetTop + first.offsetTop + first.offsetHeight / 2
        for (const rail of [track, fill]) {
          rail.style.left = `${start}px`
          rail.style.width = `${end - start}px`
          rail.style.top = `${top}px`
        }
      }
      syncRail()
      window.addEventListener('resize', syncRail)

      const mm = gsap.matchMedia()

      // Pin the section and translate the row sideways as the page scrolls
      // vertically (phones included), so the journey reads left-to-right.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const distance = () => Math.max(0, list.scrollWidth - window.innerWidth)

        gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(bubbles, {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(197, 157, 95, 0.2)',
          boxShadow: 'none',
          scale: 1,
        })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        tl.to(list, { x: () => -distance(), duration: 1 }, 0)
        tl.to(fill, { scaleX: 1, duration: 1 }, 0)

        // Each node lights up as the fill reaches it, and stays lit — a
        // completed-steps-accumulate progress metaphor rather than a single
        // travelling highlight.
        nodes.forEach((node, index) => {
          const progress = nodes.length > 1 ? index / (nodes.length - 1) : 0
          const icon = node.querySelector('.step-indicator-icon')
          tl.to(
            bubbles[index],
            {
              backgroundColor: '#C59D5F',
              borderColor: '#C59D5F',
              boxShadow: '0 0 28px rgba(197, 157, 95, 0.55)',
              scale: 1.1,
              duration: 0.06,
            },
            progress * 0.94
          )
          tl.to(icon, { color: '#0F172A', duration: 0.06 }, progress * 0.94)
        })
      })

      // Reduced motion: the row is a native swipeable scroller, so the rail
      // is simply shown complete.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(fill, { scaleX: 1 })
      })

      return () => {
        mm.revert()
        window.removeEventListener('resize', syncRail)
      }
    },
    { scope: journeySectionRef }
  )

  return (
    <>
      <Seo description="A D Textile manufactures premium kitchen, table, bed and living linen for global retail brands. Vertically integrated, SA8000 & ISO 9001:2015 compliant, exporting since 1992." />
      {/* Hero Section */}
      {/* Sized to the small viewport height so the advantages marquee at the
          bottom is visible on first load, without scrolling. */}
      <section className="relative min-h-[100svh] flex flex-col bg-primary text-white overflow-hidden pt-24">
        {/* Slide backdrops are stacked and cross-faded so every image is
            already decoded by the time it's shown. */}
        {HERO_SLIDES.map((slide, i) => {
          const isActive = i === heroSlide
          return (
            <img
              key={slide.image}
              src={slide.image}
              alt=""
              aria-hidden="true"
              width={2000}
              height={1125}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              className={`absolute inset-0 z-0 w-full h-full object-cover ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
              style={{ transition: prefersReducedMotion() ? 'none' : 'opacity 1.2s ease, transform 7s ease-out' }}
            />
          )
        })}

        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0A101E]/85 via-[#0A101E]/45 to-[#0A101E]/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 z-10 pointer-events-none bg-gradient-to-t from-[#0A101E]/70 to-transparent" />

        <Container className="relative z-20 w-full flex-1 flex items-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroSlide}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-[640px] space-y-4"
            >
              <span className="eyebrow !text-secondary">{activeHero.eyebrow}</span>
              <h1 className="font-display-lg text-white font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                {activeHero.title}
              </h1>
              <p className="font-body-md text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-[520px]">
                {activeHero.text}
              </p>
              <div className="pt-2">
                <Link
                  to={activeHero.cta.to}
                  className="inline-flex items-center gap-2 rounded-md border border-white/60 bg-white/10 backdrop-blur-sm px-7 py-3 font-label-md text-[0.8rem] font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-white hover:text-primary"
                >
                  {activeHero.cta.label} <Icon name="arrow_right_alt" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </Container>

        <Container className="relative z-20 w-full flex items-center justify-end gap-5 pb-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => stepHero(-1)}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
            >
              <Icon name="chevron_left" />
            </button>
            <button
              type="button"
              onClick={() => stepHero(1)}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
            >
              <Icon name="chevron_right" />
            </button>
          </div>
          <p className="font-label-md text-white leading-none" aria-live="polite">
            <span className="text-3xl md:text-4xl font-bold">{String(heroSlide + 1).padStart(2, '0')}</span>
            <span className="text-white/60 text-base md:text-lg"> / {String(HERO_SLIDES.length).padStart(2, '0')}</span>
          </p>
        </Container>

        {/* Advantages marquee — reuses the "Why Choose Us" card titles. A
            mask (rather than LogoLoop's solid-colour fadeOut) softens the
            edges, since the photo behind it isn't one flat colour. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-20 border-t border-white/10 bg-primary/40 backdrop-blur-sm py-3"
        >
          <LogoLoop
            logos={EDGE_POINTS}
            speed={45}
            gap={20}
            logoHeight={14}
            pauseOnHover
            ariaLabel="Why choose A D Textile"
            style={{
              maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
            }}
            renderItem={(point) => (
              <span className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2">
                <Icon name={point.icon} className="text-secondary text-lg" />
                <span className="font-label-md text-[0.78rem] font-semibold uppercase tracking-wider text-white">
                  {point.title}
                </span>
              </span>
            )}
          />
        </motion.div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-10 md:py-12 bg-background">
        <Container>
          <h2 className="section-title text-3xl font-light text-primary text-center mb-6">
            Explore Our <em className="italic text-secondary font-normal font-serif">Catalogue</em>
          </h2>
          <CollectionsCarousel3D items={CATEGORIES} />
        </Container>
      </section>

      {/* Manufacturing Journey Timeline Section. The plain block wrapper
          matters: pages render inside a flex column, and GSAP disables
          pinSpacing when the pin's parent is a flex container, which would
          let the next section scroll up over the pinned row. */}
      <div>
      <section
        ref={journeySectionRef}
        className="py-24 motion-safe:py-0 motion-safe:pt-24 motion-safe:h-svh motion-safe:flex motion-safe:flex-col motion-safe:justify-center bg-primary text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-radial-gradient from-secondary/5 to-transparent pointer-events-none" />
        <Container>
          <div className="text-center mb-14 lg:mb-16 space-y-4">
            <span className="eyebrow !text-secondary">Operations Tour</span>
            <h2 className="section-title !text-white text-3xl font-light">Vertically Integrated <em className="italic text-secondary font-normal font-serif">Journey</em></h2>
            <div className="divider mx-auto" />
          </div>
        </Container>

        {/* GSAP pins the section and translates the row itself as the page
            scrolls, so overflow stays hidden. With reduced motion it's a
            native swipeable row instead. */}
        <div className="no-scrollbar motion-reduce:overflow-x-auto motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:scroll-pl-margin-mobile motion-reduce:md:scroll-pl-margin-desktop">
          <div
            ref={journeyListRef}
            className="relative flex w-max gap-8 lg:gap-12 px-margin-mobile md:px-margin-desktop lg:px-[max(64px,calc((100vw-1280px)/2+64px))]"
          >
            {/* Rail track — position and width are set in JS to span bubble centers */}
            <div ref={journeyRailTrackRef} className="absolute h-px bg-white/10" />
            {/* Rail fill — scrubbed with scroll via GSAP */}
            <div
              ref={journeyRailFillRef}
              className="absolute h-px bg-gradient-to-r from-secondary via-secondary to-secondary/20"
            />

            {JOURNEY_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: journeyRevealAmount }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="journey-step-node relative w-[260px] md:w-[300px] shrink-0 snap-start"
              >
                <div className="step-indicator-bubble relative w-12 h-12 md:w-14 md:h-14 mb-6 rounded-full bg-white/5 border border-secondary/20 flex items-center justify-center z-10">
                  <LottieIcon animationData={pulseRing} className="absolute inset-0 w-full h-full opacity-50" />
                  <Icon name={step.icon} className="step-indicator-icon relative text-secondary text-xl md:text-2xl" />
                </div>

                <span className="block text-[10px] font-mono tracking-[0.3em] text-secondary/70 uppercase mb-2">
                  Step {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="step-label-title font-serif text-xl md:text-2xl text-white font-bold mb-2">
                  {step.title}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* Certifications Marquee */}
      <section className="py-20 bg-white">
        <Container className="text-center space-y-12">
          <p className="font-label-md text-xs text-on-surface-variant tracking-[0.25em] uppercase font-bold">
            Certifications
          </p>

          <div className="border-t border-b border-outline-variant/20 py-10">
            <LogoLoop
              logos={CERTIFICATE_LOGOS}
              speed={40}
              gap={80}
              logoHeight={112}
              fadeOut
              fadeOutColor="#ffffff"
              pauseOnHover
              ariaLabel="Certification and compliance logos"
            />
          </div>
        </Container>
      </section>
    </>
  )
}

export default Home
