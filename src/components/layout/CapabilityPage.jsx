import { motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import RevealText from '../motion/RevealText.jsx'
import WebGLScene from '../motion/WebGLScene.jsx'

// Shared template for the newer sitemap sections (Design & Development,
// Private Label & Custom Manufacturing, Exports) that don't yet have
// client-authored page designs of their own. Mirrors the visual language
// already used elsewhere on the site (dark WebGL hero, alternating
// image/text sections, closing CTA) without the heavier pinned
// scrollytelling used on Manufacturing — these pages are placeholder
// content and don't warrant that build cost yet.
function CapabilityPage({ badge, title, subtitle, heroLoader, heroProps, sections, closing }) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden pt-20 bg-primary">
        <div className="absolute inset-0 z-0">
          <WebGLScene
            loader={heroLoader}
            className="absolute inset-0"
            fallback={<div className="absolute inset-0 bg-primary" />}
            {...heroProps}
          />
          <div className="absolute inset-0 bg-primary/45" />
        </div>
        <Container className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl bg-primary/80 backdrop-blur-md p-10 md:p-12 text-white border-l-4 border-secondary rounded-r-2xl"
          >
            <span className="font-label-md text-secondary uppercase tracking-[0.2em] mb-4 block">{badge}</span>
            <RevealText
              as="h1"
              scrollTriggered={false}
              delay={0.2}
              className="font-display-lg text-display-lg-mobile md:text-5xl leading-tight mb-8"
            >
              {title}
            </RevealText>
            <p className="font-body-lg text-body-lg text-white/80 max-w-xl">{subtitle}</p>
          </motion.div>
        </Container>
      </section>

      {/* Sticky sub-nav */}
      <section className="sticky top-20 z-40 bg-background border-b border-outline-variant/30 py-6">
        <Container className="flex gap-10 overflow-x-auto no-scrollbar w-full">
          {sections.map((section) => (
            <a
              key={section.id}
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-2 whitespace-nowrap"
              href={`#${section.id}`}
            >
              {section.navLabel || section.title}
            </a>
          ))}
        </Container>
      </section>

      {/* Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-section-gap-lg ${index % 2 === 0 ? 'bg-background' : 'bg-white'}`}
        >
          <Container className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div
              className={`lg:col-span-5 relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-xl shadow-md border border-outline-variant/30 relative bg-surface-container-low hidden lg:block">
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover kenburns"
                />
                <div className="absolute inset-0 bg-primary/15" />
              </div>
            </div>
            <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}>
              <div className="w-14 h-14 bg-secondary/10 flex items-center justify-center rounded-lg mb-6">
                <Icon name={section.icon} className="text-3xl text-secondary" />
              </div>
              <span className="eyebrow">{section.eyebrow}</span>
              <h2 className="section-title mb-6">{section.title}</h2>
              <p className="font-body-lg text-[0.92rem] text-on-surface-variant leading-relaxed mb-8">
                {section.description}
              </p>
              {section.bullets && (
                <ul className="space-y-4">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-4">
                      <Icon name="check_circle" className="text-secondary text-xl shrink-0" />
                      <span className="font-label-md text-xs uppercase tracking-wider text-primary font-semibold">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Container>
        </section>
      ))}

      {/* Closing CTA */}
      <section className="py-section-gap-lg bg-primary text-white overflow-hidden relative">
        <Container className="relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display-lg text-4xl md:text-5xl leading-tight mb-8 text-white">{closing.title}</h2>
            <p className="font-body-lg text-white/70 text-[0.92rem] leading-relaxed mb-12">{closing.text}</p>
            <Button to="/contact" size="lg" className="!bg-white !text-primary hover:!bg-secondary-fixed shadow-xl">
              {closing.ctaLabel || 'Contact Us'}
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default CapabilityPage
