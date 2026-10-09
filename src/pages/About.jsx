import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import Container from '../components/ui/Container.jsx'
import Icon from '../components/ui/Icon.jsx'
import RevealText from '../components/motion/RevealText.jsx'
import LottieIcon from '../components/motion/LottieIcon.jsx'
import pulseRing from '../components/motion/pulse-ring.json'
import { gsap } from '../lib/motion.js'
import TiltedCard from '../components/ui/TiltedCard.jsx'
import Masonry from '../components/motion/Masonry.jsx'
import Seo from '../components/common/Seo.jsx'

// Import corporate video
import companyVideo from '../assets/videos/aboutus.mp4'

import videoPoster from '../assets/images/manufacturing/weaving/weaving-video-poster.webp'
import aerialCampusWide from '../assets/images/facility/aerial-campus-wide.webp'
import checkingFabricCutter from '../assets/images/our-people/checking-fabric-cutter.webp'
import checkingFoldingTeam from '../assets/images/our-people/checking-folding-team.webp'
import sortingFoldingGroup from '../assets/images/our-people/sorting-folding-group.webp'
import yarnDyeingProcess from '../assets/images/our-people/yarn-dyeing-process.webp'
import finishingProcessTanks from '../assets/images/our-people/finishing-process-tanks.webp'
import yarnWindingMachine from '../assets/images/our-people/yarn-winding-machine.webp'
import yarnTwistingCloseup from '../assets/images/our-people/yarn-twisting-closeup.webp'
import stitchingTeam from '../assets/images/our-people/stitching-team.webp'
import embroideryOperator from '../assets/images/our-people/embroidery-operator.webp'
import knittingNightShift from '../assets/images/our-people/knitting-night-shift.webp'
import washingMachineOperator from '../assets/images/our-people/washing-machine-operator.webp'
import weavingLoomOperator from '../assets/images/our-people/weaving-loom-operator.webp'
import windingCreelOperator from '../assets/images/our-people/winding-creel-operator.webp'

const TIMELINE = [
  {
    year: '1990',
    icon: 'flag',
    title: 'The Beginning',
    description:
      'A D Textile was established in Karur, building its foundation in textile manufacturing.',
  },
  {
    year: '1992',
    icon: 'public',
    title: 'Entering Global Markets',
    description:
      'We began exporting, taking our textile expertise to international customers.',
  },
  {
    year: '30+ Years',
    icon: 'trending_up',
    title: 'Growing with Experience',
    description:
      'Over three decades, we have expanded our manufacturing capabilities, product range and global presence while staying committed to quality and customer requirements.',
  },
  {
    year: 'Today',
    icon: 'language',
    title: 'Built for the World',
    description:
      'We combine 30+ years of textile expertise, integrated manufacturing capabilities and global market experience to deliver reliable textile solutions to customers worldwide.',
  },
]

const PEOPLE_GALLERY = [
  { id: 1, img: checkingFabricCutter, height: 760, title: 'Checking & Cutting' },
  { id: 2, img: checkingFoldingTeam, height: 560, title: 'Checking & Folding' },
  { id: 3, img: sortingFoldingGroup, height: 680, title: 'Sorting & Folding' },
  { id: 4, img: yarnDyeingProcess, height: 540, title: 'Yarn Dyeing' },
  { id: 5, img: finishingProcessTanks, height: 700, title: 'Finishing Process' },
  { id: 6, img: yarnWindingMachine, height: 600, title: 'Yarn Winding' },
  { id: 7, img: yarnTwistingCloseup, height: 620, title: 'Yarn Twisting' },
  { id: 8, img: stitchingTeam, height: 560, title: 'Stitching Team' },
  { id: 9, img: embroideryOperator, height: 700, title: 'Embroidery' },
  { id: 10, img: knittingNightShift, height: 620, title: 'Knitting' },
  { id: 11, img: washingMachineOperator, height: 560, title: 'Washing' },
  { id: 12, img: weavingLoomOperator, height: 680, title: 'Weaving' },
  { id: 13, img: windingCreelOperator, height: 600, title: 'Winding' },
]

function About() {
  const [isVideoActive, setIsVideoActive] = useState(false)
  const videoRef = useRef(null)
  const timelineRef = useRef(null)
  const timelineListRef = useRef(null)
  const timelineRailTrackRef = useRef(null)
  const timelineRailFillRef = useRef(null)

  // Pause the inline story video once its card scrolls out of view
  useEffect(() => {
    const video = videoRef.current
    if (!isVideoActive || !video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) video.pause()
      },
      { threshold: 0.25 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [isVideoActive])

  // Horizontal milestone rail, styled after the Home journey row. On desktop
  // the section pins and the row slides sideways as the page scrolls.
  useGSAP(
    () => {
      const section = timelineRef.current
      const list = timelineListRef.current
      const track = timelineRailTrackRef.current
      const fill = timelineRailFillRef.current
      if (!section || !list || !track || !fill) return undefined

      const nodes = gsap.utils.toArray(list.querySelectorAll('.milestone-node'))
      if (!nodes.length) return undefined
      const bubbles = nodes.map((node) => node.querySelector('.milestone-bubble'))

      // Rail spans first bubble center to last bubble center
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

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(bubbles, { backgroundColor: '#ffffff', borderColor: 'rgba(197, 157, 95, 0.3)', boxShadow: 'none', scale: 1 })

        // Three milestones fit in view at a time, so the row overflows by one;
        // the scroll length is padded so the reveal doesn't feel rushed.
        const distance = () => Math.max(0, list.scrollWidth - window.innerWidth)
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(distance(), window.innerHeight * 0.8)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        tl.to(list, { x: () => -distance(), duration: 1 }, 0)
        tl.to(fill, { scaleX: 1, duration: 1 }, 0)

        // Each milestone lights up as the fill reaches it, and stays lit
        nodes.forEach((node, index) => {
          const progress = nodes.length > 1 ? index / (nodes.length - 1) : 0
          const icon = node.querySelector('.milestone-icon')
          tl.to(
            bubbles[index],
            {
              backgroundColor: '#C59D5F',
              borderColor: '#C59D5F',
              boxShadow: '0 0 24px rgba(197, 157, 95, 0.45)',
              scale: 1.1,
              duration: 0.06,
            },
            progress * 0.94
          )
          tl.to(icon, { color: '#ffffff', duration: 0.06 }, progress * 0.94)
        })
      })

      // Mobile / reduced motion: native swipeable row, rail shown complete
      mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
        gsap.set(fill, { scaleX: 1 })
      })

      return () => {
        mm.revert()
        window.removeEventListener('resize', syncRail)
      }
    },
    { scope: timelineRef }
  )

  return (
    <>
      <Seo
        title="About Us"
        description="A D Textile is a textile manufacturing and export company from Karur, India, with decades of experience in the textile industry — combining product knowledge, skilled craftsmanship and modern manufacturing practices."
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary">
        <img
          src={aerialCampusWide}
          width={1920}
          height={1080}
          alt="Aerial view of the A D Textile manufacturing campus in Karur, India"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/15 to-primary/40 z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 h-full w-full flex flex-col items-center justify-end text-center pb-16 md:pb-20 px-6"
        >
          <span className="eyebrow !text-secondary mb-4 block">Established in 1990</span>
          <RevealText
            as="h1"
            scrollTriggered={false}
            delay={0.2}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight max-w-3xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            Rooted in Textiles. Built for <em className="italic text-secondary font-serif font-normal">the World</em>.
          </RevealText>
          <p className="font-body-md text-white/80 text-sm md:text-base max-w-xl mt-4">
            Karur, Tamil Nadu — every stage of production, under one roof.
          </p>
        </motion.div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-background">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="eyebrow bg-secondary/10 px-3 py-1 rounded-full text-[0.7rem] inline-block">
              Our Profile
            </span>
            <div className="divider" />
            <div className="text-on-surface/80 font-body-md text-sm md:text-base space-y-5 leading-relaxed pt-2">
              <p>
                A D Textile is a vertical textile manufacturing and export company from Karur, India with decades of
                experience in the textile industry.
              </p>
              <p>
                Built on strong textile expertise, we manufacture and export home textiles and textile products
                combining product knowledge, skilled craftsmanship and modern manufacturing practices.
              </p>
              <p>
                Our focus is simple — quality products, reliable execution and long-term global partnerships.
              </p>
            </div>
          </div>

          {/* Right Video Trigger Card */}
          <div className="lg:col-span-6 flex justify-center">
            {isVideoActive ? (
              <div className="w-full max-w-lg">
                <div className="aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-outline-variant/35 bg-black">
                  <video
                    ref={videoRef}
                    src={companyVideo}
                    poster={videoPoster}
                    controls
                    autoPlay
                    playsInline
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              </div>
            ) : (
            <TiltedCard tiltMax={8} className="w-full max-w-lg">
              <div
                onClick={() => setIsVideoActive(true)}
                className="aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-outline-variant/35 bg-primary cursor-pointer group"
              >
                {/* Fallback image as backdrop */}
                <img
                  src={videoPoster}
                  width={1280}
                  height={720}
                  alt="Corporate facility"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-75"
                />
                
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all duration-300 z-10" />

                {/* Animated Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white gap-4">
                  <div className="w-20 h-20 rounded-full bg-white/10 group-hover:bg-secondary/90 backdrop-blur-md flex items-center justify-center text-white group-hover:text-white transition-all duration-300 shadow-xl border border-white/20 group-hover:border-transparent">
                    <Icon name="play_arrow" className="text-4xl translate-x-0.5" />
                  </div>
                  <span className="font-label-md text-xs font-semibold uppercase tracking-widest text-white drop-shadow-md">
                    Watch Our Story
                  </span>
                </div>
              </div>
            </TiltedCard>
            )}
          </div>

        </Container>
      </section>

      {/* Milestones Timeline Section — horizontal row, styled after the Home journey.
          The plain block wrapper keeps GSAP pinSpacing working inside the
          page's flex column (same as Home). */}
      <div>
      <section
        className="pt-24 pb-32 lg:pt-24 lg:pb-36 lg:h-screen lg:flex lg:flex-col lg:justify-center bg-white overflow-hidden"
        id="journey"
        ref={timelineRef}
      >
        <Container>
          <div className="text-center mb-14 lg:mb-16 space-y-4 max-w-lg mx-auto">
            <span className="eyebrow">Our Journey</span>
            <RevealText as="h2" className="section-title text-3xl font-light text-primary leading-tight">
              From Textile Roots to <em className="italic text-secondary font-normal font-serif">Global Reach</em>
            </RevealText>
            <div className="divider mx-auto" />
          </div>
        </Container>

        {/* Below lg this is a native swipeable row; on lg+ three milestones
            fill the container width and GSAP slides the row to reveal the rest. */}
        <div className="overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory scroll-pl-margin-mobile md:scroll-pl-margin-desktop lg:snap-none">
          <div
            ref={timelineListRef}
            className="relative flex w-max gap-8 lg:gap-12 px-margin-mobile md:px-margin-desktop lg:px-[max(64px,calc((100vw-1280px)/2+64px))]"
          >
            {/* Rail track — position and width are set in JS to span bubble centers */}
            <div ref={timelineRailTrackRef} className="absolute h-px bg-primary/10" />
            {/* Rail fill — scrubbed with scroll via GSAP */}
            <div
              ref={timelineRailFillRef}
              className="absolute h-px bg-gradient-to-r from-secondary via-secondary to-secondary/20"
            />

            {TIMELINE.map((event) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="milestone-node relative w-[260px] md:w-[300px] lg:w-[calc((min(100vw,1280px)-224px)/3)] shrink-0 snap-start"
              >
                <div className="milestone-bubble relative w-12 h-12 md:w-14 md:h-14 mb-6 rounded-full bg-white border border-secondary/30 flex items-center justify-center z-10">
                  <LottieIcon animationData={pulseRing} className="absolute inset-0 w-full h-full opacity-50" />
                  <Icon name={event.icon} className="milestone-icon relative text-secondary text-xl md:text-2xl" />
                </div>

                <span className="block font-display-lg text-3xl md:text-4xl font-bold tracking-tight text-secondary mb-2">
                  {event.year}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-primary font-bold mb-2">{event.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* Mission & Vision Section */}
      <section className="pt-16 md:pt-20 pb-24 md:pb-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-secondary/5 to-transparent pointer-events-none" />
        <Container className="relative">
          <div className="text-center mb-20 space-y-4 max-w-xl mx-auto">
            <span className="eyebrow">What Drives Us</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight">
              Vision <em className="italic text-secondary font-normal font-serif">&amp; Mission</em>
            </h2>
            <div className="divider mx-auto" />
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2">
            {/* Vertical divider — desktop only */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary/40 to-transparent -translate-x-1/2" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative pb-14 md:pb-0 md:pr-14 border-b md:border-b-0 border-white/10 space-y-5"
            >
              <span
                aria-hidden="true"
                className="absolute -top-2 right-0 font-serif text-[6rem] md:text-[8rem] leading-none text-white/[0.05] pointer-events-none select-none"
              >
                01
              </span>
              <div className="relative space-y-2.5">
                <span className="block font-label-md text-[0.7rem] uppercase tracking-[0.25em] text-secondary font-bold">
                  Our Mission
                </span>
                <div className="w-8 h-[2px] bg-secondary/50 rounded-full" />
              </div>
              <p className="relative font-serif text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                To create high-quality home textile products through fully integrated manufacturing, continuous
                innovation, ethical business practices, and exceptional customer service — helping our partners
                succeed in global markets.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative pt-14 md:pt-0 md:pl-14 space-y-5"
            >
              <span
                aria-hidden="true"
                className="absolute -top-2 right-0 font-serif text-[6rem] md:text-[8rem] leading-none text-white/[0.05] pointer-events-none select-none"
              >
                02
              </span>
              <div className="relative space-y-2.5">
                <span className="block font-label-md text-[0.7rem] uppercase tracking-[0.25em] text-secondary font-bold">
                  Our Vision
                </span>
                <div className="w-8 h-[2px] bg-secondary/50 rounded-full" />
              </div>
              <p className="relative font-serif text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                To become the preferred global manufacturing partner for premium home textile brands by delivering
                excellence, innovation, and sustainable value.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Our People */}
      <section className="py-24 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="eyebrow bg-secondary/10 px-3 py-1 rounded-full text-[0.7rem] inline-block">
              The Human Element
            </span>
            <h2 className="section-title text-3xl font-light text-primary leading-tight font-serif">
              Our <em className="italic text-secondary font-normal font-serif">People</em>
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed text-sm md:text-base">
              At A D Textile, our strength comes not just from our infrastructure, but from our skilled human resources. We conduct regular training programs on new technologies to keep our workforce updated, and it is this skilled workforce that brings the unique finishing touch to every product we make.
            </p>
          </div>

          <div className="min-h-[400px]">
            <Masonry items={PEOPLE_GALLERY} animateFrom="bottom" scaleOnHover hoverScale={0.97} blurToFocus />
          </div>
        </Container>
      </section>
    </>
  )
}

export default About
