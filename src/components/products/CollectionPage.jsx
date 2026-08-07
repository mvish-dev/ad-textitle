import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import ProductGallery from '../ui/ProductGallery.jsx'
import RevealText from '../motion/RevealText.jsx'
import { gsap } from '../../lib/motion.js'
import { COLLECTIONS, COLLECTIONS_META, COLLECTION_ORDER } from '../../data/productCollections.js'

const GALLERY_ANCHOR = 'collection-gallery'

function CollectionPage({ collectionKey }) {
  const scrollRef = useRef(null)
  const heroImageRef = useRef(null)
  const config = COLLECTIONS[collectionKey]
  const contactHref = `/contact?category=${encodeURIComponent(config.contactCategory)}`
  const relatedCollections = COLLECTION_ORDER.filter((code) => code !== config.category).map(
    (code) => COLLECTIONS_META[code]
  )

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  useGSAP(
    () => {
      if (!heroImageRef.current) return
      gsap.fromTo(
        heroImageRef.current,
        { clipPath: 'inset(0 0 0 100%)' },
        { clipPath: 'inset(0 0 0 0%)', duration: 1.1, ease: 'power3.inOut', delay: 0.1 }
      )
    },
    { dependencies: [collectionKey] }
  )

  return (
    <>
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden min-h-[80vh] pt-20 bg-background text-left">
        <div ref={heroImageRef} className="relative overflow-hidden group">
          <img
            className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-105"
            alt={config.hero.imageAlt}
            src={config.hero.image}
          />
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>
        <div className="flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-16 bg-[#F8F7F4] border-l border-outline-variant/20">
          <span className="eyebrow mb-4">{config.hero.eyebrow}</span>
          <RevealText as="h1" scrollTriggered={false} delay={0.3} className="font-display-lg text-display-lg-mobile md:text-5xl mb-8 leading-tight">
            {config.hero.title} <em>{config.hero.titleAccent}</em>
          </RevealText>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-xl leading-relaxed">
            {config.hero.description}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button to={contactHref} variant="primary" size="lg">
              Request Quote
            </Button>
            <Button to={contactHref} variant="outline" size="lg" className="text-primary border-primary">
              Request Catalogue
            </Button>
            <a
              href={`#${GALLERY_ANCHOR}`}
              className="inline-flex items-center gap-2 font-label-md text-xs uppercase tracking-wider text-secondary font-semibold hover:gap-3 transition-all ml-2"
            >
              Browse Products
              <Icon name="arrow_downward" className="text-base" />
            </a>
          </div>
        </div>
      </section>

      {/* Products Gallery Display — surfaced right after the hero so it's never buried */}
      <section className="py-section-gap-lg bg-background border-t border-b border-outline-variant/20" id={GALLERY_ANCHOR}>
        <Container>
          <div className="text-center mb-16">
            <span className="eyebrow">{config.gallery.eyebrow}</span>
            <h2 className="section-title">
              {config.gallery.title} <em>{config.gallery.titleAccent}</em>
            </h2>
            <div className="divider mx-auto" />
          </div>
          <ProductGallery category={config.category} />
        </Container>
      </section>

      {/* Offerings icon grid (Kitchen / Table / Heritage) */}
      {config.offerings && (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-lg bg-white text-left">
          <div className="mb-12 max-w-2xl">
            <span className="eyebrow">{config.offerings.eyebrow}</span>
            <h2 className="section-title mb-4">
              {config.offerings.title} <em>{config.offerings.titleAccent}</em>
            </h2>
            <p className="font-body-lg text-[0.95rem] text-on-surface-variant leading-relaxed">
              {config.offerings.description}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {config.offerings.items.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-8 bg-[#F3F2EF] border border-outline-variant/30 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md text-center"
              >
                <Icon name={item.icon} className="text-4xl text-secondary mb-4 block" />
                <h3 className="font-label-md text-xs uppercase tracking-wider text-primary font-semibold">{item.label}</h3>
              </motion.div>
            ))}
          </div>
          {config.offerings.footnote && (
            <p className="mt-10 font-body-md text-xs text-on-surface-variant">
              {config.offerings.footnote}{' '}
              <Link className="text-secondary font-semibold hover:underline" to="/contact">
                Contact our team
              </Link>{' '}
              for a full specification sheet tailored to your order.
            </p>
          )}
        </section>
      )}

      {/* Process focus cards (Living Linen) */}
      {config.focus && (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-lg bg-white">
          <div className="mb-12 max-w-2xl">
            <span className="eyebrow">{config.focus.eyebrow}</span>
            <h2 className="section-title mb-4">
              {config.focus.title} <em>{config.focus.titleAccent}</em>
            </h2>
            <p className="font-body-lg text-[0.95rem] text-on-surface-variant leading-relaxed">{config.focus.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {config.focus.cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-10 bg-[#F3F2EF] border border-outline-variant/30 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md"
              >
                <Icon name={card.icon} className="text-4xl text-secondary mb-6 block" />
                <h3 className="font-headline-lg text-xl mb-3 font-semibold text-primary">{card.title}</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
          {config.focus.footnote && (
            <p className="mt-10 font-body-md text-xs text-on-surface-variant">
              {config.focus.footnote}{' '}
              <Link className="text-secondary font-semibold hover:underline" to="/contact">
                Contact our team
              </Link>{' '}
              for a full specification sheet tailored to your project.
            </p>
          )}
        </section>
      )}

      {/* Features Section */}
      <section className="bg-[#0F172A] py-section-gap-lg text-white overflow-hidden text-left">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {config.features.map((feature) => (
              <div key={feature.title} className="space-y-4">
                <Icon name={feature.icon} className="text-4xl text-secondary" />
                <h4 className="font-headline-lg text-lg font-semibold">{feature.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Manufacturing Integrity (Heritage / Living) */}
      {config.integrity && (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-lg bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
            <div>
              <span className="eyebrow">{config.integrity.eyebrow}</span>
              <h2 className="section-title mb-8">
                {config.integrity.title} <em>{config.integrity.titleAccent}</em>
              </h2>
              <div className="space-y-10">
                {config.integrity.blocks.map((block) => (
                  <div key={block.heading}>
                    <h5 className="font-label-md text-xs uppercase tracking-widest font-semibold text-secondary mb-3">
                      {block.heading}
                    </h5>
                    <p className="font-body-lg text-[0.88rem] leading-relaxed text-on-surface-variant mb-4">
                      {block.description}
                    </p>
                    {block.tags && (
                      <div className="flex gap-4">
                        {block.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#F3F2EF] px-4 py-2 text-xs font-semibold rounded-lg text-primary uppercase tracking-wider border border-outline-variant/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div>
                  <h5 className="font-label-md text-xs uppercase tracking-widest font-semibold text-secondary mb-4">
                    {config.integrity.applicationsHeading}
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                    {config.integrity.applications.map((app) => (
                      <div
                        key={app.title}
                        className="p-6 border border-outline-variant/30 rounded-xl bg-background shadow-sm hover:border-secondary transition-all"
                      >
                        <h6 className="font-headline-lg text-sm uppercase tracking-wider font-semibold text-primary mb-2">
                          {app.title}
                        </h6>
                        <p className="text-on-surface-variant text-[11px] leading-relaxed">{app.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-outline-variant/30 shadow-md hidden lg:block">
              <img className="w-full h-full object-cover" alt={config.integrity.image.alt} src={config.integrity.image.src} />
            </div>
          </div>
        </section>
      )}

      {/* Related Products Carousel */}
      <section className="bg-[#F3F2EF] py-section-gap-sm text-left">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="eyebrow">Curation</span>
              <h2 className="section-title">
                Extend the <em>Experience</em>
              </h2>
            </div>
            <div className="flex gap-4">
              <button
                className="p-3 border border-outline-variant/30 rounded-full hover:bg-white text-primary transition-colors cursor-pointer"
                onClick={() => handleScroll('left')}
                aria-label="Scroll left"
              >
                <Icon name="west" />
              </button>
              <button
                className="p-3 border border-outline-variant/30 rounded-full hover:bg-white text-primary transition-colors cursor-pointer"
                onClick={() => handleScroll('right')}
                aria-label="Scroll right"
              >
                <Icon name="east" />
              </button>
            </div>
          </div>
          <div
            ref={scrollRef}
            data-cursor-label="Drag"
            className="flex gap-gutter overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8"
          >
            {relatedCollections.map((related) => (
              <div key={related.slug} className="min-w-[320px] md:min-w-[420px] snap-start group">
                <div className="aspect-video overflow-hidden rounded-xl mb-6 relative shadow-sm">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={related.label}
                    src={related.thumbnail}
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                </div>
                <h3 className="font-headline-lg text-lg mb-2 text-primary font-semibold">{related.label}</h3>
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">{related.blurb}</p>
                <Link
                  className="font-label-md text-xs uppercase tracking-wider text-secondary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                  to={`/${related.slug}`}
                >
                  View Collection <Icon name="arrow_forward" className="text-[18px]" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Floating Inquiry Trigger */}
      <div className="fixed bottom-8 right-8 z-40">
        <Link
          className="flex items-center gap-3 bg-primary hover:bg-[#1E293B] text-white px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 group"
          to={contactHref}
        >
          <Icon name="send" className="text-secondary" />
          <span className="font-label-md text-xs font-semibold uppercase tracking-wider">Inquire Now</span>
        </Link>
      </div>
    </>
  )
}

export default CollectionPage
