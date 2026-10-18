import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import RevealText from '../components/motion/RevealText.jsx'
import CategoryNav from '../components/products/CategoryNav.jsx'
import ProductMedia from '../components/products/ProductMedia.jsx'
import ProductModal from '../components/products/ProductModal.jsx'
import Seo from '../components/common/Seo.jsx'
import NotFound from './NotFound.jsx'
import { getProductCategory } from '../data/products.js'

const VALUE_POINTS = [
  { icon: 'tune', text: 'Custom sizes, colours, designs & packaging to your brief' },
  { icon: 'factory', text: 'Dyeing, weaving, knitting & stitching under one roof' },
  { icon: 'eco', text: 'Certified organic, recycled & sustainable material options' },
  { icon: 'fact_check', text: '3-layer AQL inspection on every order' },
  { icon: 'public', text: 'Export-ready production — exporting since 1992' },
  { icon: 'workspace_premium', text: 'SA8000 & ISO 9001:2015 compliant facility' },
]

const WOVEN_PATTERN = {
  backgroundImage:
    'repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 12px), repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 12px)',
}

// Image + name card. On hover (or keyboard focus) a dark overlay slides in
// with the description and a "View Products" button; the whole card is the
// button, so a tap on touch screens opens the popup directly.
function SubcategoryCard({ sub, index, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`View ${sub.name} products`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col w-full text-left bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_44px_rgba(15,23,42,0.18)] transition-shadow duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProductMedia image={sub.image} icon={sub.icon} alt={sub.name} />
        {sub.sustainable && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50/95 border border-emerald-700/20 px-2.5 py-1 rounded-full">
            <Icon name="eco" className="text-sm" />
            Sustainable
          </span>
        )}
      </div>
      <div className="px-5 py-4 bg-surface-container-low text-center">
        <h3 className="font-headline-lg text-xl font-semibold text-primary">{sub.name}</h3>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center bg-[#0A101E]/75 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="translate-y-3 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
          <h3 className="font-headline-lg text-2xl font-semibold text-white">{sub.name}</h3>
          <span className="block h-[2px] w-24 mx-auto my-4 bg-secondary" />
          <p className="text-[0.88rem] text-white/85 leading-relaxed max-w-xs mx-auto">{sub.description}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-secondary to-[#A8834A] px-6 py-2.5 text-[0.75rem] font-semibold uppercase tracking-wider text-white shadow-lg translate-y-3 transition-transform duration-300 delay-75 group-hover:translate-y-0 group-focus-visible:translate-y-0">
          View Products
          <Icon name="arrow_forward" className="text-base" />
        </span>
      </div>
    </motion.button>
  )
}

function ProductCategory() {
  const { categoryId } = useParams()
  const category = getProductCategory(categoryId)
  const [activeSub, setActiveSub] = useState(null)
  const closeModal = useCallback(() => setActiveSub(null), [])

  if (!category) return <NotFound />

  const heroImage = category.largeImage || category.image

  return (
    <>
      <Seo title={category.title} description={`${category.tagline} ${category.description}`} />

      {/* Hero — shorter than full-screen so the category circles below peek in. */}
      <section className="relative min-h-[75svh] flex flex-col bg-primary text-white overflow-hidden pt-24">
        {heroImage ? (
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 z-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 z-0 opacity-[0.05]" style={WOVEN_PATTERN} />
            <Icon
              name={category.icon}
              className="absolute z-0 -right-10 md:right-[6%] top-1/2 -translate-y-1/2 text-[18rem] md:text-[26rem] leading-none text-secondary/10 select-none"
            />
          </>
        )}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0A101E]/85 via-[#0A101E]/45 to-transparent" />

        <Container className="relative z-20 w-full flex-1 flex items-center py-10">
          <div className="max-w-3xl">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 mb-6 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-secondary hover:text-white transition-colors"
            >
              <Icon name="arrow_back" className="text-base" />
              All Products
            </Link>
            <RevealText
              as="h1"
              scrollTriggered={false}
              delay={0.15}
              className="font-display-lg text-white font-medium text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            >
              {category.title}
            </RevealText>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-body-md text-white/80 text-base md:text-lg leading-relaxed max-w-xl"
            >
              {category.tagline}
            </motion.p>
          </div>
        </Container>
      </section>

      <CategoryNav activeId={category.id} />

      {/* Intro */}
      <section className="pt-16 md:pt-20 pb-10 bg-background">
        <Container className="max-w-3xl mx-auto text-center">
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">{category.description}</p>
        </Container>
      </section>

      {/* Sub-categories */}
      <section className="pb-section-gap-lg bg-background">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {category.subcategories.map((sub, index) => (
              <SubcategoryCard key={sub.name} sub={sub} index={index} onOpen={() => setActiveSub(sub)} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why A D Textile */}
      <section className="py-section-gap-lg bg-primary text-white border-b border-white/10">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow !text-secondary mb-4 block">Why A D Textile</span>
            <h2 className="section-title !text-white mb-6">
              Made for <em>Retail Programmes</em>
            </h2>
            <Button to="/contact" size="lg">
              Request a Quote
            </Button>
          </div>
          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUE_POINTS.map((point, i) => (
              <motion.li
                key={point.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex items-start gap-3 p-5 rounded-xl bg-white/[0.04] border border-white/10"
              >
                <Icon name={point.icon} className="text-secondary text-2xl shrink-0" />
                <span className="text-[0.88rem] text-white/80 leading-relaxed">{point.text}</span>
              </motion.li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Rendered at <body> level so the page-transition transform on the
          route wrapper can't break the popup's fixed positioning. */}
      {createPortal(
        <AnimatePresence>
          {activeSub && (
            <ProductModal key={activeSub.name} category={category} subcategory={activeSub} onClose={closeModal} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default ProductCategory
