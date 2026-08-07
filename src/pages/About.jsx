import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Icon from '../components/ui/Icon.jsx'
import Button from '../components/ui/Button.jsx'

// Import slide images
import slide1 from '../assets/img/slides/img-1.jpg'
import slide2 from '../assets/img/slides/img-2.jpg'
import slide3 from '../assets/img/slides/img-3.jpg'

// Import corporate video
import companyVideo from '../assets/videos/Our Company.mp4'

const TIMELINE = [
  {
    year: '1990',
    title: 'The Foundation',
    description:
      'AD Textile was established as a manufacturer of quality home textile products, laying the foundation for what the company is today.',
    align: 'right',
  },
  {
    year: '1992',
    title: 'First Export',
    description:
      'Began exporting our home textile products to the international market, marking the start of our journey as a global exporter.',
    align: 'left',
  },
  {
    year: 'Ongoing',
    title: 'Modern Infrastructure',
    description:
      'Continuous investment in contemporary infrastructure and modern manufacturing technology, strengthening our ability to serve international buyers.',
    align: 'right',
    small: true,
  },
  {
    year: 'Today',
    title: 'Global Standards',
    description:
      'Quality products, on-time delivery, and continuous process improvement remain at the heart of how we work, backed by well-groomed, skilled personnel.',
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

const SLIDES = [slide1, slide2, slide3]

function About() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-primary/45 z-10" />
        <img
          alt="Close-up of raw textile fibers"
          className="absolute inset-0 w-full h-full object-cover scale-[1.04]"
          src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=1800&q=85&auto=format&fit=crop"
        />
        <div className="relative z-20 text-center px-margin-mobile">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-white/90 mb-6 block">
              Established 1990
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-8">
              Legacy in <span className="italic font-normal text-secondary-fixed">Every</span> Thread.
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-section-gap-lg bg-background">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow">Our Profile</span>
            <h2 className="section-title mb-8 leading-tight">
              Quality products. On-time delivery. Continuous <em>improvement</em>.
            </h2>
            <div className="divider" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 text-on-surface/80 font-body-md space-y-6">
            <p>
              AD Textile was established in 1990 as a manufacturer of home textile products. We began exporting to the
              international market in 1992, and today we export our products to global markets, having served major
              retailers across international channels.
            </p>
            <p>
              We believe in delivering superior products and services that give our customers a competitive advantage
              through high-end fabrics, strict quality checks, and structured environmental management.
            </p>
            <div className="pt-6">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-3 bg-primary hover:bg-[#1E293B] text-white px-8 py-4 rounded-full shadow hover:scale-103 transition-all duration-300 font-semibold uppercase tracking-wider text-xs cursor-pointer border border-white/10"
              >
                <Icon name="play_circle" className="text-secondary text-xl" />
                Watch Our Story Video
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-section-gap-lg bg-white">
        <Container>
          <div className="text-center mb-16">
            <span className="eyebrow">Our Evolution</span>
            <h2 className="section-title">Milestones of <em>Progress</em></h2>
            <div className="divider mx-auto" />
          </div>
          <div className="relative space-y-24">
            {/* Native Tailwind vertical timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-outline-variant/50 hidden md:block" />

            {TIMELINE.map((event, idx) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="flex flex-col md:flex-row items-center justify-center gap-gutter relative"
              >
                {event.align === 'right' ? (
                  <>
                    <div className="w-full md:w-[45%] md:text-right">
                      {event.small ? (
                        <span className="font-label-md text-label-md uppercase tracking-widest text-secondary block mb-2 font-semibold">
                          {event.year}
                        </span>
                      ) : (
                        <span className="font-display-lg text-4xl md:text-5xl text-secondary block mb-2 font-bold">
                          {event.year}
                        </span>
                      )}
                      <h3 className="font-headline-lg text-2xl text-primary mb-4 font-semibold">{event.title}</h3>
                      <p className="font-body-md text-[0.88rem] text-on-surface-variant leading-relaxed md:ml-auto md:max-w-md">
                        {event.description}
                      </p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary border-4 border-white rounded-full hidden md:block z-10 shadow-md" />
                    <div className="w-full md:w-[45%]" />
                  </>
                ) : (
                  <>
                    <div className="w-full md:w-[45%]" />
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary border-4 border-white rounded-full hidden md:block z-10 shadow-md" />
                    <div className="w-full md:w-[45%] md:text-left">
                      {event.small ? (
                        <span className="font-label-md text-label-md uppercase tracking-widest text-secondary block mb-2 font-semibold">
                          {event.year}
                        </span>
                      ) : (
                        <span className="font-display-lg text-4xl md:text-5xl text-secondary block mb-2 font-bold">
                          {event.year}
                        </span>
                      )}
                      <h3 className="font-headline-lg text-2xl text-primary mb-4 font-semibold">{event.title}</h3>
                      <p className="font-body-md text-[0.88rem] text-on-surface-variant leading-relaxed md:max-w-md">
                        {event.description}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-section-gap-lg bg-background">
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group p-12 bg-white border border-outline-variant/30 rounded-xl hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Icon name="verified" className="text-secondary text-5xl mb-8" />
            <h3 className="font-headline-lg text-2xl text-primary mb-6 font-semibold">Our Mission</h3>
            <p className="font-body-md text-[0.88rem] text-on-surface-variant leading-relaxed">
              To manufacture products of outstanding quality that give our customers a competitive advantage through
              superior products and value. To attain higher level of efficiency through continuous training and
              empowering higher skills.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group p-12 bg-primary text-white border border-primary rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Icon name="visibility" className="text-secondary text-5xl mb-8" />
            <h3 className="font-headline-lg text-2xl text-white mb-6 font-semibold">Our Vision</h3>
            <p className="font-body-md text-[0.88rem] text-white/70 leading-relaxed">
              To manufacture textile products to international standards, to be customer focused in quality and
              design, competitive pricing by adopting latest technology and innovative methods of product
              architecture.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Our People */}
      <section className="py-section-gap-lg bg-white animate-fade-in">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-xl shadow-md border border-outline-variant/30 relative bg-surface-container-low">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide}
                  src={SLIDES[activeSlide]}
                  alt="AD Textile Facility and Production"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 py-12 lg:py-0">
            <span className="eyebrow">The Human Element</span>
            <h2 className="section-title mb-8">Our <em>People</em></h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 opacity-80 leading-relaxed">
              At AD Textile, our strength comes not just from our infrastructure, but from our skilled human
              resources. We conduct regular training programs on new technologies to keep our workforce updated, and
              it is this skilled workforce that brings the unique finishing touch to every product we make.
            </p>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-section-gap-lg bg-background">
        <Container>
          <div className="text-center mb-16">
            <span className="eyebrow">Beliefs & Values</span>
            <h2 className="section-title">Core <em>Values</em></h2>
            <div className="divider mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {CORE_VALUES.map((value, index) => (
              <div
                key={value.title}
                className={`text-center p-8 bg-white border border-outline-variant/30 rounded-xl transition-all duration-300 hover:shadow-md ${
                  index < CORE_VALUES.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''
                }`}
              >
                <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center rounded-lg mx-auto mb-6">
                  <Icon name={value.icon} className="text-3xl text-secondary" />
                </div>
                <h4 className="font-headline-lg text-xl text-primary mb-4 font-semibold">{value.title}</h4>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Environmental & CSR */}
      <section className="relative min-h-[80vh] flex items-center py-section-gap-lg overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-20 z-0">
          <img
            alt="Modern sustainable manufacturing facility"
            className="w-full h-full object-cover scale-[1.02]"
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=85&auto=format&fit=crop"
          />
        </div>
        <div className="absolute inset-0 bg-primary/60 z-10" />
        <Container className="relative z-20 max-w-4xl mx-auto text-center">
          <span className="eyebrow !text-secondary mb-8 block">
            Environmental Care &amp; CSR
          </span>
          <h2 className="font-display-lg text-4xl md:text-5xl text-white mb-10 leading-tight">
            Caring for our environment and our community.
          </h2>
          <p className="font-body-lg text-body-lg mb-12 text-white/80 leading-relaxed">
            Our environmental care program includes an Effluent Treatment Plant, a Reverse Osmosis Plant, and a
            Vibratory Shear Enhanced Process (VSEP) plant, and we use only Azo-free dyes across our dyeing
            operations. We believe industrial success is meaningless without ecological and social responsibility.
          </p>
          <div className="flex flex-wrap justify-center gap-10 mb-12">
            {ENVIRONMENTAL_PROGRAMS.map((program) => (
              <div key={program.title} className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                  <Icon name={program.icon} className="text-secondary text-2xl" />
                </div>
                <div>
                  <p className="font-bold text-[0.9rem]">{program.title}</p>
                  <p className="text-xs opacity-60 mt-0.5">{program.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/10">
            <p className="font-label-md text-xs uppercase tracking-widest text-secondary mb-6 font-semibold">
              Community Programs
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              {COMMUNITY_PROGRAMS.map((program) => (
                <div key={program.label} className="flex items-center gap-3">
                  <Icon name={program.icon} className="text-secondary text-2xl" />
                  <p className="text-xs text-white/80">{program.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-section-gap-lg bg-background text-center px-margin-mobile">
        <Container className="max-w-4xl mx-auto">
          <h2 className="font-display-lg text-display-lg-mobile md:text-headline-xl text-primary mb-8">
            Be Part of Our Journey
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
            Whether you're a global brand looking for a manufacturing partner or simply want to learn more
            about what we do, the thread starts here.
          </p>
          <div className="flex justify-center">
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
