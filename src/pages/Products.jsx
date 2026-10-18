import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import RevealText from '../components/motion/RevealText.jsx'
import LogoLoop from '../components/motion/LogoLoop.jsx'
import ProductMedia from '../components/products/ProductMedia.jsx'
import Seo from '../components/common/Seo.jsx'
import { PRODUCT_CATEGORIES, productCategoryPath } from '../data/products.js'

// Placeholder Unsplash stock imagery (like the Home hero) — swap in a client photo.
const HERO_IMAGE = 'https://images.unsplash.com/photo-1638598125618-6095d93581a9?w=2000&q=80&auto=format&fit=crop'

const CAPABILITIES = [
  {
    icon: 'design_services',
    title: 'Design & Development',
    text: 'Our dedicated sampling team develops ranges to your brief — from colour and construction to trims and packaging — with rapid sample turnaround so every programme is ready for retail.',
  },
  {
    icon: 'texture',
    title: 'Materials & Constructions',
    list: [
      'Cotton & Organic Cotton',
      'Recycled & Bamboo Blends',
      'Yarn-Dyed & Printed',
      'Terry, Waffle & Jacquard Weaves',
      'Knitted & Embroidered Finishes',
    ],
  },
  {
    icon: 'eco',
    title: 'Sustainable Product Solutions',
    list: [
      'GOTS, OCS, GRS & BCI Certified Materials',
      'OEKO-TEX® STANDARD 100',
      'Bamboo-Based Performance Range',
      'SA8000 & ISO 9001:2015 Compliant',
    ],
  },
]

const MARQUEE_MASK = 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)'

function CategoryCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
    >
      <Link
        to={productCategoryPath(category)}
        className="group flex flex-col h-full bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <ProductMedia image={category.image} icon={category.icon} alt={category.title} size="sm" />
          <span className="absolute top-3 left-3 font-headline-lg text-xs font-semibold text-primary bg-white/90 backdrop-blur px-2.5 py-0.5 rounded-full">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="flex flex-col flex-1 items-center text-center px-5 py-5 md:px-6">
          <h3 className="font-label-md text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-primary mb-1.5">
            {category.title}
          </h3>
          <p className="text-[0.8rem] text-on-surface-variant leading-relaxed mb-4">{category.tagline}</p>
          <ul className="flex flex-wrap justify-center gap-1.5 mb-5">
            {category.subcategories.map((sub) => (
              <li
                key={sub.name}
                className={`text-[0.7rem] font-medium px-2.5 py-0.5 rounded-full border ${
                  sub.sustainable
                    ? 'border-emerald-700/25 bg-emerald-50 text-emerald-800'
                    : 'border-outline-variant/50 bg-background text-on-surface-variant'
                }`}
              >
                {sub.name}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-1.5 rounded-full border border-secondary px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-wider text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
            Explore All
            <Icon name="arrow_forward" className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function Products() {
  return (
    <>
      <Seo
        title="Products"
        description="Explore A D Textile's product range — Kitchen & Dining, Living & Decor, Kids & Nursery, Outdoor & Lifestyle and Performance Knitwear, including a sustainable bamboo range."
      />

      {/* Hero — sized to the small viewport height (like Home) so the
          category marquee at the bottom is visible without scrolling. */}
      <section className="relative min-h-[100svh] flex flex-col bg-primary text-white overflow-hidden pt-24">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0A101E]/85 via-[#0A101E]/55 to-[#0A101E]/20" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 z-10 pointer-events-none bg-gradient-to-t from-[#0A101E]/70 to-transparent" />

        <Container className="relative z-20 w-full flex-1 flex items-center py-8">
          <RevealText
            as="h1"
            scrollTriggered={false}
            delay={0.15}
            className="font-display-lg text-white font-medium text-4xl sm:text-5xl lg:text-7xl leading-[1.05] max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
          >
            Home Textiles, Made to Be Lived In
          </RevealText>
        </Container>

        {/* Category marquee — every pill links to that category's page. Only
            the first LogoLoop copy is tabbable; the rest are visual repeats.
            Solid gold (vs. Home's translucent navy) to set this page apart. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-20 bg-gradient-to-r from-secondary to-[#A8834A] shadow-[0_-8px_32px_rgba(10,16,30,0.35)] py-3"
        >
          <LogoLoop
            logos={PRODUCT_CATEGORIES}
            speed={45}
            gap={20}
            logoHeight={14}
            pauseOnHover
            ariaLabel="Product categories"
            style={{ maskImage: MARQUEE_MASK, WebkitMaskImage: MARQUEE_MASK }}
            renderItem={(category, key) => (
              <Link
                to={productCategoryPath(category)}
                tabIndex={key.startsWith('0-') ? undefined : -1}
                className="group/pill inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-primary/20 bg-white/20 px-5 py-2 text-primary transition-colors hover:bg-primary hover:border-primary hover:text-white"
              >
                <Icon name={category.icon} className="text-lg text-primary transition-colors group-hover/pill:text-secondary" />
                <span className="font-label-md text-[0.78rem] font-semibold uppercase tracking-wider">
                  {category.title}
                </span>
              </Link>
            )}
          />
        </motion.div>
      </section>

      {/* Category overview */}
      <section className="py-section-gap-lg bg-background">
        <Container>
          <div className="text-center mb-14">
            <span className="eyebrow">Product Categories</span>
            <h2 className="section-title mt-3">
              Explore Our <em>Range</em>
            </h2>
            <div className="divider mx-auto" />
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Enquiry CTA + Garments (external, sister company), side by side */}
      <section className="pb-section-gap-lg bg-background">
        <Container className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          <div className="lg:col-span-3 flex flex-col justify-center p-8 md:p-12 bg-white border border-outline-variant/30 rounded-2xl">
            <h2 className="section-title mb-5">
              Looking for a Specific <em>Product</em>?
            </h2>
            <p className="font-body-md text-[0.95rem] text-on-surface-variant leading-relaxed mb-8 max-w-xl">
              Share your requirement — construction, size, colourway or certification — and our team will come back
              with specifications, MOQs and lead times.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button to="/contact">Request a Quote</Button>
              <Button to="/manufacturing" variant="outline" className="text-primary border-primary">
                See Our Manufacturing
              </Button>
            </div>
          </div>

          <a
            href="http://adtsaral.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group lg:col-span-2 relative flex flex-col justify-between gap-8 p-8 md:p-12 rounded-2xl bg-primary text-white overflow-hidden"
          >
            <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-secondary/15 blur-2xl pointer-events-none" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-6">
                <Icon name="checkroom" className="text-3xl text-secondary" />
              </div>
              <span className="eyebrow !text-secondary mb-2 block">Sister Company</span>
              <h3 className="font-headline-lg text-2xl font-semibold mb-3">Garments</h3>
              <p className="text-[0.88rem] text-white/70 leading-relaxed">
                Manufactured by our sister company and sold via a separate site.
              </p>
            </div>
            <span className="relative inline-flex items-center gap-2 font-label-md text-[0.75rem] font-semibold uppercase tracking-wider text-secondary">
              Visit Our Sister Company
              <Icon
                name="open_in_new"
                className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </a>
        </Container>
      </section>

      {/* Capabilities — last section before the footer */}
      <section className="py-section-gap-lg bg-primary text-white border-b border-white/10">
        <Container>
          <div className="text-center mb-14">
            <span className="eyebrow !text-secondary">Behind Every Product</span>
            <h2 className="section-title !text-white mt-3">
              Capability You Can <em>Build On</em>
            </h2>
            <div className="divider mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAPABILITIES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <Icon name={item.icon} className="text-secondary text-3xl mb-5 block" />
                <h3 className="font-headline-lg text-xl font-semibold mb-4">{item.title}</h3>
                {item.text && <p className="text-[0.88rem] text-white/70 leading-relaxed">{item.text}</p>}
                {item.list && (
                  <ul className="space-y-2.5">
                    {item.list.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[0.88rem] text-white/75">
                        <Icon name="check" className="text-secondary text-base mt-0.5 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

export default Products
