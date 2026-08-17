import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Icon from '../components/ui/Icon.jsx'
import Button from '../components/ui/Button.jsx'
import RevealText from '../components/motion/RevealText.jsx'
import ThreadPath from '../components/motion/ThreadPath.jsx'
import WebGLScene from '../components/motion/WebGLScene.jsx'
import SpotlightCard from '../components/ui/SpotlightCard.jsx'
import TiltedCard from '../components/ui/TiltedCard.jsx'
import Masonry from '../components/motion/Masonry.jsx'
import Seo from '../components/common/Seo.jsx'

// Import corporate video
import companyVideo from '../assets/videos/aboutus.mp4'

import videoPoster from '../assets/images/manufacturing/weaving/weaving-video-poster.webp'
import aerialCampusWide from '../assets/images/facility/aerial-campus-wide.webp'
import aerialEtp from '../assets/images/facility/aerial-etp.webp'
import checkingGroupTowels from '../assets/images/manufacturing/checking/checking-group-towels.webp'
import weavingMentorTeam from '../assets/images/manufacturing/weaving/weaving-mentor-team.webp'
import weavingPortrait from '../assets/images/manufacturing/weaving/weaving-portrait.webp'
import embroideryWorkerPortrait from '../assets/images/manufacturing/embroidery/embroidery-worker-portrait.webp'
import stitchingPortrait from '../assets/images/manufacturing/stitching/stitching-portrait.webp'
import peopleYarnPrepPair from '../assets/images/people/people-yarn-prep-pair.webp'
import peopleSockTrimPortrait from '../assets/images/people/people-sock-trim-portrait.webp'

const TIMELINE = [
  {
    year: '1990',
    title: 'The Beginning',
    description:
      'AD Textile was established in Karur, building its foundation in textile manufacturing.',
    align: 'right',
  },
  {
    year: '1992',
    title: 'Entering Global Markets',
    description:
      'We began exporting, taking our textile expertise to international customers.',
    align: 'left',
  },
  {
    year: '30+ Years',
    title: 'Growing with Experience',
    description:
      'Over three decades, we have expanded our manufacturing capabilities, product range and global presence while staying committed to quality and customer requirements.',
    align: 'right',
    small: true,
  },
  {
    year: 'Today',
    title: 'Built for the World',
    description:
      'We combine 30+ years of textile expertise, integrated manufacturing capabilities and global market experience to deliver reliable textile solutions to customers worldwide.',
    align: 'left',
    small: true,
  },
]

const CORE_VALUES = [
  { icon: 'shield', title: 'Integrity', description: 'Transparent operations and ethical sourcing in every region.' },
  {
    icon: 'biotech',
    title: 'Innovation',
    description: 'Pushing the boundaries of what fabric can achieve through R&D.',
  },
  {
    icon: 'precision_manufacturing',
    title: 'Excellence',
    description: 'Uncompromising standards for durability and finish.',
  },
  {
    icon: 'diversity_3',
    title: 'Community',
    description:
      'Employment opportunities for the physically challenged, a feeding programme for around 400 blind and deaf children, and education scholarships for the needy.',
  },
]

const ENVIRONMENTAL_PROGRAMS = [
  { icon: 'water_drop', title: 'Effluent Treatment', caption: 'Plant' },
  { icon: 'filter_alt', title: 'Reverse Osmosis', caption: 'Plant' },
  { icon: 'science', title: 'VSEP', caption: 'Vibratory Shear Enhanced Process' },
  { icon: 'eco', title: 'Azo-Free Dyes', caption: 'Only' },
]

const COMMUNITY_PROGRAMS = [
  { icon: 'accessibility_new', label: 'Employment for the physically challenged' },
  { icon: 'restaurant', label: 'Feeding programme for ~400 blind & deaf children' },
  { icon: 'school', label: 'Education scholarships for the needy' },
]

const PEOPLE_GALLERY = [
  { id: 1, img: checkingGroupTowels, height: 760, title: 'Checking & Folding' },
  { id: 2, img: weavingMentorTeam, height: 560, title: 'Weaving Team' },
  { id: 3, img: weavingPortrait, height: 680, title: 'Weaving Floor' },
  { id: 4, img: embroideryWorkerPortrait, height: 540, title: 'Embroidery' },
  { id: 5, img: stitchingPortrait, height: 620, title: 'Stitching' },
  { id: 6, img: peopleYarnPrepPair, height: 600, title: 'Yarn Preparation' },
  { id: 7, img: peopleSockTrimPortrait, height: 700, title: 'Finishing' },
]

function About() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const timelineRef = useRef(null)
  
  // Real-time active scroll tracker for timeline elements
  const [activeMilestone, setActiveMilestone] = useState('')
  const milestoneRefs = useRef({})

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.55 // Target activation height: center-ish of screen
      let currentActive = ''
      let minDistance = Infinity

      Object.entries(milestoneRefs.current).forEach(([year, element]) => {
        if (!element) return
        const rect = element.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const distance = Math.abs(elementCenter - threshold)

        // Select the element closest to the center line that is within active viewport range
        if (distance < minDistance && rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2) {
          minDistance = distance
          currentActive = year
        }
      })

      if (currentActive) {
        setActiveMilestone(currentActive)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Trigger initially to capture starting position
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Seo
        title="About Us"
        description="AD Textile is a textile manufacturing and export company from Karur, India, with decades of experience in the textile industry — combining product knowledge, skilled craftsmanship and modern manufacturing practices."
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 to-transparent z-10" />
        <WebGLScene
          loader={() => import('../components/motion/Particles.jsx')}
          className="absolute inset-0"
          fallback={<div className="absolute inset-0 bg-primary" />}
          particleColors={['#C59D5F', '#F4E4C8', '#ffffff']}
          particleCount={260}
          particleSpread={11}
          speed={0.08}
          particleBaseSize={90}
          alphaParticles
          disableRotation={false}
        />
        
        <div className="relative z-20 text-center px-margin-mobile w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-primary/60 backdrop-blur-md border border-white/10 p-12 md:p-16 rounded-2xl shadow-2xl space-y-6 max-w-2xl mx-auto"
          >
            <span className="font-label-md text-xs uppercase tracking-[0.25em] text-secondary mb-2 block font-semibold">
              Established 1990
            </span>
            <RevealText
              as="h1"
              scrollTriggered={false}
              delay={0.2}
              className="font-display-lg text-display-lg-mobile md:text-5xl text-white leading-tight font-light"
            >
              Rooted in Textiles. Built for <span className="italic font-normal text-secondary">the World</span>.
            </RevealText>
            <div className="w-24 h-[1.5px] bg-secondary mx-auto mt-4" />
          </motion.div>
        </div>
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
                AD Textile is a textile manufacturing and export company from Karur, India, with decades of
                experience in the textile industry.
              </p>
              <p>
                Built on strong textile expertise, we manufacture and export home textiles and textile products,
                combining product knowledge, skilled craftsmanship and modern manufacturing practices.
              </p>
              <p>
                Our focus is simple — quality products, reliable execution and long-term global partnerships.
              </p>
            </div>
          </div>

          {/* Right Video Trigger Card */}
          <div className="lg:col-span-6 flex justify-center">
            <TiltedCard tiltMax={8} className="w-full max-w-lg">
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-outline-variant/35 bg-primary cursor-pointer group"
              >
                {/* Fallback image as backdrop */}
                <img
                  src={videoPoster}
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
          </div>

        </Container>
      </section>

      {/* Milestones Scroll Timeline Section */}
      <section className="py-24 bg-white" id="journey" ref={timelineRef}>
        <Container>
          <div className="text-center mb-20 space-y-4 max-w-lg mx-auto">
            <span className="eyebrow">Our Journey</span>
            <RevealText as="h2" className="section-title text-3xl font-light text-primary leading-tight">
              From Textile Roots to <em className="italic text-secondary font-normal font-serif">Global Reach</em>
            </RevealText>
            <div className="divider mx-auto" />
          </div>

          <div className="relative space-y-20 md:space-y-24">
            
            {/* Thread Path Line */}
            <ThreadPath
              d="M4,0 L4,1000"
              viewBox="0 0 8 1000"
              trigger={timelineRef}
              start="top 65%"
              end="bottom 50%"
              scrub={0.6}
              strokeWidth={3}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] h-full text-secondary hidden md:block opacity-60"
            />

            {TIMELINE.map((event) => {
              const isActive = activeMilestone === event.year
              return (
                <motion.div
                  key={event.year}
                  ref={(el) => {
                    milestoneRefs.current[event.year] = el
                  }}
                  className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative"
                >
                  {event.align === 'right' ? (
                    <>
                      {/* Left: Card content */}
                      <div className="w-full md:w-[45%] md:text-right transition-all duration-300">
                        <SpotlightCard
                          className={`p-8 rounded-2xl border transition-all duration-500 text-left ${
                            isActive
                              ? 'bg-slate-50/80 border-secondary shadow-lg scale-103'
                              : 'bg-background/40 border-outline-variant/20 opacity-70'
                          }`}
                        >
                          <span
                            className={`font-display-lg text-4xl md:text-5xl block mb-2 font-bold tracking-tight transition-all duration-300 ${
                              isActive ? 'text-secondary drop-shadow-[0_2px_8px_rgba(197,157,95,0.2)]' : 'text-slate-300'
                            }`}
                          >
                            {event.year}
                          </span>
                          <h3 className="font-serif text-xl font-bold text-primary mb-3">{event.title}</h3>
                          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                            {event.description}
                          </p>
                        </SpotlightCard>
                      </div>

                      {/* Timeline Central Node */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full hidden md:block z-20 shadow-md border-4 border-white transition-all duration-300 ${
                          isActive ? 'bg-secondary scale-130' : 'bg-primary'
                        }`}
                      />
                      
                      {/* Right empty spacer */}
                      <div className="w-full md:w-[45%] hidden md:block" />
                    </>
                  ) : (
                    <>
                      {/* Left empty spacer */}
                      <div className="w-full md:w-[45%] hidden md:block" />

                      {/* Timeline Central Node */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full hidden md:block z-20 shadow-md border-4 border-white transition-all duration-300 ${
                          isActive ? 'bg-secondary scale-130' : 'bg-primary'
                        }`}
                      />

                      {/* Right: Card content */}
                      <div className="w-full md:w-[45%] md:text-left transition-all duration-300">
                        <SpotlightCard
                          className={`p-8 rounded-2xl border transition-all duration-500 text-left ${
                            isActive
                              ? 'bg-slate-50/80 border-secondary shadow-lg scale-103'
                              : 'bg-background/40 border-outline-variant/20 opacity-70'
                          }`}
                        >
                          <span
                            className={`font-display-lg text-4xl md:text-5xl block mb-2 font-bold tracking-tight transition-all duration-300 ${
                              isActive ? 'text-secondary drop-shadow-[0_2px_8px_rgba(197,157,95,0.2)]' : 'text-slate-300'
                            }`}
                          >
                            {event.year}
                          </span>
                          <h3 className="font-serif text-xl font-bold text-primary mb-3">{event.title}</h3>
                          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                            {event.description}
                          </p>
                        </SpotlightCard>
                      </div>
                    </>
                  )}
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Manufacturing Strength Section */}
      <section className="py-24 bg-background" id="manufacturing-strength">
        <Container>
          <div className="text-center mb-16 space-y-4 max-w-xl mx-auto">
            <span className="eyebrow">What We're Built On</span>
            <h2 className="section-title text-3xl font-light text-primary">Our Manufacturing <em className="italic text-secondary font-normal font-serif">Strength</em></h2>
            <div className="divider mx-auto" />
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Every product we ship is backed by manufacturing we own end to end — no subcontracted stages, no hand-offs between unrelated factories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: 'factory',
                title: 'Vertically Integrated',
                description: 'Dyeing, weaving, embroidery, cutting, stitching and packing, all under one roof.',
              },
              {
                icon: 'grid_4x4',
                title: 'Somet Rapier Looms',
                description: 'Weaving 1 million metres of premium fabric every month.',
              },
              {
                icon: 'format_color_fill',
                title: '3 Tons/Day Dyeing',
                description: 'Italian Cheese Dyeing Machines, for superior dye penetration and colour fastness.',
              },
              {
                icon: 'verified',
                title: '3-Layer AQL Inspection',
                description: 'In-line checks, first-stage quality check and a final AQL-standard inspection before dispatch.',
              },
            ].map((item) => (
              <SpotlightCard
                key={item.title}
                className="bg-white border border-outline-variant/30 rounded-2xl p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-secondary/10 flex items-center justify-center rounded-xl mb-6">
                  <Icon name={item.icon} className="text-2xl text-secondary" />
                </div>
                <h4 className="font-serif text-lg text-primary mb-3 font-semibold leading-tight">{item.title}</h4>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">{item.description}</p>
              </SpotlightCard>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button to="/manufacturing" variant="outline" className="text-primary border-primary">
              See Our Manufacturing Process
            </Button>
          </div>
        </Container>
      </section>

      {/* Facility From Above */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <img
          src={aerialCampusWide}
          alt="Aerial view of the AD Textile manufacturing campus in Karur, India"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/15 to-primary/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-end text-center pb-16 px-6">
          <span className="eyebrow !text-secondary mb-4 block">From Above</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight max-w-2xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            One Facility, <em className="italic text-secondary font-serif font-normal">Fully Integrated</em>
          </h2>
          <p className="font-body-md text-white/80 text-sm md:text-base max-w-xl mt-4">
            Karur, Tamil Nadu — since 1990. Every stage of production, under one roof.
          </p>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-24 bg-primary text-white overflow-hidden" id="global-reach">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="eyebrow bg-secondary/15 px-3 py-1 rounded-full text-[0.68rem] text-secondary tracking-widest uppercase">
              Beyond Our Borders
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
              Our Global <em className="italic text-secondary font-serif font-normal">Reach</em>
            </h2>
            <div className="font-body-md text-white/70 leading-relaxed text-sm md:text-base space-y-4">
              <p>
                Since 1992, we have been exporting textile products to the USA, building over three decades of
                experience in serving one of the world&apos;s largest textile markets.
              </p>
              <p>
                Our long-standing export experience has given us a strong understanding of international quality
                standards, buyer requirements and global supply expectations.
              </p>
              <p>
                Today, we continue to build on this experience as we expand our reach across the USA, UK, Europe
                and other international markets.
              </p>
            </div>
            <div className="pt-2">
              <Button to="/contact" variant="secondary">
                Talk to Our Team
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {[
              { year: '1992', label: 'Exporting Since' },
              { year: 'Global', label: 'Retail Markets Served' },
              { year: '1990', label: 'Manufacturing Since' },
              { year: 'Direct', label: 'Buyer Relationships' },
            ].map((stat) => (
              <SpotlightCard
                key={stat.label}
                spotlightColor="rgba(255, 255, 255, 0.08)"
                className="p-6 bg-white/5 border border-white/10 rounded-2xl"
              >
                <p className="font-serif text-2xl md:text-3xl font-bold text-white mb-1.5">{stat.year}</p>
                <p className="text-[0.65rem] uppercase tracking-widest text-white/50 font-semibold leading-normal">
                  {stat.label}
                </p>
              </SpotlightCard>
            ))}
          </div>

        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-background">
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <SpotlightCard className="bg-white border border-outline-variant/30 rounded-2xl p-10 md:p-12 h-full shadow-sm hover:shadow-md transition-all space-y-6">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Icon name="verified" className="text-2xl" />
              </div>
              <h3 className="font-serif text-2xl text-primary font-bold">Our Mission</h3>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                To create high-quality home textile products through fully integrated manufacturing, continuous
                innovation, ethical business practices, and exceptional customer service — helping our partners
                succeed in global markets.
              </p>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <SpotlightCard
              spotlightColor="rgba(255, 255, 255, 0.08)"
              className="bg-primary text-white border border-white/5 rounded-2xl p-10 md:p-12 h-full shadow-lg hover:shadow-xl transition-all space-y-6"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
                <Icon name="visibility" className="text-2xl" />
              </div>
              <h3 className="font-serif text-2xl text-white font-bold">Our Vision</h3>
              <p className="font-body-md text-xs md:text-sm text-white/70 leading-relaxed">
                To become the preferred global manufacturing partner for premium home textile brands by delivering
                excellence, innovation, and sustainable value.
              </p>
            </SpotlightCard>
          </motion.div>

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
              At AD Textile, our strength comes not just from our infrastructure, but from our skilled human resources. We conduct regular training programs on new technologies to keep our workforce updated, and it is this skilled workforce that brings the unique finishing touch to every product we make.
            </p>
          </div>

          <div className="h-[560px] md:h-[680px]">
            <Masonry items={PEOPLE_GALLERY} animateFrom="bottom" scaleOnHover hoverScale={0.97} blurToFocus />
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-background">
        <Container>
          <div className="text-center mb-16 space-y-4 max-w-xl mx-auto">
            <span className="eyebrow">Beliefs & Values</span>
            <h2 className="section-title text-3xl font-light text-primary">Core <em className="italic text-secondary font-normal font-serif">Values</em></h2>
            <div className="divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((value) => (
              <SpotlightCard
                key={value.title}
                className="bg-white border border-outline-variant/30 rounded-2xl p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-secondary/10 flex items-center justify-center rounded-xl mb-6">
                  <Icon name={value.icon} className="text-2xl text-secondary" />
                </div>
                <h4 className="font-serif text-lg text-primary mb-3 font-semibold leading-tight">{value.title}</h4>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">{value.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Environmental & CSR Section */}
      <section className="relative min-h-[85vh] flex items-center py-24 overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-15 z-0 pointer-events-none">
          <img
            alt="Aerial view of AD Textile's Effluent Treatment Plant"
            className="w-full h-full object-cover scale-[1.03]"
            src={aerialEtp}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary to-primary/90 z-10" />

        <Container className="relative z-20 max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <span className="eyebrow bg-secondary/15 px-3 py-1 rounded-full text-[0.68rem] text-secondary tracking-widest uppercase inline-block">
              Environmental Care &amp; CSR
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight max-w-2xl mx-auto">
              Caring for our environment and our <em className="italic text-secondary font-serif font-normal">community</em>.
            </h2>
            <div className="w-20 h-[1.5px] bg-secondary mx-auto mt-4" />
          </div>

          <p className="font-body-md text-white/80 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            Our environmental care program includes an Effluent Treatment Plant, a Reverse Osmosis Plant, and a Vibratory Shear Enhanced Process (VSEP) plant, and we use only Azo-free dyes across our dyeing operations. We believe industrial success is meaningless without ecological and social responsibility.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 text-left">
            {ENVIRONMENTAL_PROGRAMS.map((program) => (
              <SpotlightCard
                key={program.title}
                spotlightColor="rgba(255, 255, 255, 0.06)"
                className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <Icon name={program.icon} className="text-secondary text-xl" />
                </div>
                <div>
                  <p className="font-bold text-xs text-white leading-normal">{program.title}</p>
                  <p className="text-[0.65rem] opacity-60 mt-0.5 leading-normal">{program.caption}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 space-y-6">
            <p className="font-label-md text-xs uppercase tracking-widest text-secondary font-bold">
              Community Programs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {COMMUNITY_PROGRAMS.map((program) => (
                <div key={program.label} className="flex items-center gap-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <Icon name={program.icon} className="text-secondary text-xl shrink-0" />
                  <p className="text-[0.7rem] text-white/80 leading-normal">{program.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background text-center">
        <Container className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-primary leading-tight">
            Be Part of Our <em className="italic text-secondary font-serif font-normal">Journey</em>
          </h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed text-sm md:text-base max-w-xl mx-auto">
            Whether you're a global brand looking for a manufacturing partner or simply want to learn more about what we do, the thread starts here.
          </p>
          <div className="pt-2">
            <Button to="/contact" size="lg">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setIsVideoModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden z-10 shadow-2xl aspect-video border border-white/10"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white/80 hover:text-white transition-all cursor-pointer z-20 border border-white/10"
                aria-label="Close video"
              >
                <Icon name="close" className="text-xl" />
              </button>
              <video
                src={companyVideo}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default About
