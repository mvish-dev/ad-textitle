import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import ProductGallery from '../components/ui/ProductGallery.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import RevealText from '../components/motion/RevealText.jsx'

// Import slideshow images
import slide1 from '../assets/img/slides/img-1.jpg'
import slide2 from '../assets/img/slides/img-2.jpg'
import slide3 from '../assets/img/slides/img-3.jpg'

const SLIDES = [slide1, slide2, slide3]

function Products() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center pt-20 bg-primary">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeSlide}
              src={SLIDES[activeSlide]}
              alt="Premium home textiles"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 0.7, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-label-md text-label-md text-secondary bg-white/15 backdrop-blur-md px-4 py-2 mb-6 inline-block border border-secondary/30 rounded-full tracking-[0.15em] uppercase">
              Core Collections
            </span>
            <RevealText
              as="h1"
              scrollTriggered={false}
              delay={0.2}
              className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6"
            >
              Artistry in Every Thread.
            </RevealText>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
              Elevating global interiors through precision-engineered textiles and sustainable manufacturing excellence.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button href="#table" size="lg">
                Explore Collection
              </Button>
              <Button to="/infrastructure" variant="outline" size="lg" className="text-primary border-primary">
                Our Process
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumbs Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 bg-background">
        <Breadcrumbs items={[{ label: 'Products' }]} />
      </section>

      {/* Sub-Navigation / Filter */}
      <section className="sticky top-20 z-40 bg-background border-b border-outline-variant/30 py-6">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-10 overflow-x-auto no-scrollbar w-full">
            <Link
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-2 whitespace-nowrap"
              to="/table-linen"
            >
              Table Linen
            </Link>
            <Link
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-2 whitespace-nowrap"
              to="/kitchen-linen"
            >
              Kitchen Linen
            </Link>
            <Link
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-2 whitespace-nowrap"
              to="/heritage-bed-linen"
            >
              Bed Linen
            </Link>
            <Link
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-2 whitespace-nowrap"
              to="/living-linen"
            >
              Living Linen
            </Link>
          </div>
        </Container>
      </section>

      {/* Product Grid */}
      <section className="py-section-gap-lg bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Card 1: Table Linen */}
            <motion.div
              id="table"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden bg-white border border-outline-variant/30 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  alt="Sophisticated dining table set with premium linen tablecloth"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-2p1jq9B5cab5Qsu-UGCCMniPN0jfEqKzuTyZKBQG0xIof2S5LFW3NL0rhz84Lz6bAsBsM2RnS7DxNox5ZliI4fUQhxC18dr82E5_x-9yYTTASiExjEImAxE4WF79WWQ7c_6Q9CmE2QRJcWSCjoXL4n1LlYazpczVaJhQzX3LZXiTEAtEmICIucdUBaGn2VQC9V8512EMhKhuzytmUJR8i8u4K7ww4WlgLOh4vl7B3yeS_04TtK1h6Tq_c_a_6F7M5DFZunfrNIQ"
                />
              </div>
              <div className="p-8">
                <span className="font-label-md text-xs text-secondary tracking-widest uppercase mb-4 block font-semibold">
                  Table Linen
                </span>
                <h3 className="font-headline-lg text-xl mb-4 font-semibold text-primary">Refined Dining</h3>
                <p className="text-xs text-on-surface-variant mb-8 leading-relaxed">
                  Table cloths, table mats, runners, chair pads and co-ordinated sets — minimalist designs for
                  sophisticated table settings that command attention in any space.
                </p>
                <Link className="inline-flex items-center gap-2 font-label-md text-[0.78rem] tracking-wider text-secondary uppercase font-semibold group/link" to="/table-linen">
                  View Details
                  <Icon name="arrow_forward" className="transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Kitchen Linen */}
            <motion.div
              id="kitchen"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden bg-white border border-outline-variant/30 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  alt="Stacked premium linen kitchen towels on a white marble countertop"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-o8n5chBX-29oz68ZM82dAFfoy70qOr_I0WTlXhRjkqWnI5x4j66I3-PBkhcnb8YoLzBrKTTEt9Bhd2EALY__17O0cgul_C35qSQu8SAOC-d8fv_3ujI4G0H3-VtZCufe94TnVH7RkGmsxfLjsoyOmqGz75I7EZ_3EPD3zzdwdoqDBXhvN2gI1polpx4E2sVwMuXVd7-swkexEWqVg8WNrSotEP9yYVyhANofZhnGojS_eWVksdHRIw5OHUqok4Smm9dK3VUUOxQ"
                />
              </div>
              <div className="p-8">
                <span className="font-label-md text-xs text-secondary tracking-widest uppercase mb-4 block font-semibold">
                  Kitchen Linen
                </span>
                <h3 className="font-headline-lg text-xl mb-4 font-semibold text-primary">Culinary Elegance</h3>
                <p className="text-xs text-on-surface-variant mb-8 leading-relaxed">
                  Aprons, mittens and complete kitchen sets — premium textures designed for the rigors of modern
                  gastronomy and high-end hospitality.
                </p>
                <Link className="inline-flex items-center gap-2 font-label-md text-[0.78rem] tracking-wider text-secondary uppercase font-semibold group/link" to="/kitchen-linen">
                  View Details
                  <Icon name="arrow_forward" className="transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Card 3: Bed Linen */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden bg-white border border-outline-variant/30 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  alt="Luxury bed dressed in cotton linens"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0kXCzrplXjWLXtXY3-Op3woPtu-7n3T0z68FZQURBgpFHEAea5sOMsoVXQosNffaZ3qd79ucJV6uprNkW4uXLnSBWgt0gxPsRfG7J24Oz1y389mm6DYm2uqvkTGRT7-JUCLn2yOqDX5HVfNJ_E94qgHawmfjOZ_NAu6t-VbbFCh3E9o5CP9ZmwhSdVCc4Y1SVd3DUNj-WfqFiuV_d1WgCHuIx090glfyoUCwd4oF06_5FwIFMvup9H_Y5AFh8rSxpyZ_QuytwwQY"
                />
              </div>
              <div className="p-8">
                <span className="font-label-md text-xs text-secondary tracking-widest uppercase mb-4 block font-semibold">
                  Bed Linen
                </span>
                <h3 className="font-headline-lg text-xl mb-4 font-semibold text-primary">Serene Comfort</h3>
                <p className="text-xs text-on-surface-variant mb-8 leading-relaxed">
                  Bed spreads, bedding, cushions, quilts and rest bedding — luxury linens engineered for a restful,
                  refined night's sleep.
                </p>
                <Link className="inline-flex items-center gap-2 font-label-md text-[0.78rem] tracking-wider text-secondary uppercase font-semibold group/link" to="/heritage-bed-linen">
                  View Details
                  <Icon name="arrow_forward" className="transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Card 4: Living Linen */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative overflow-hidden bg-white border border-outline-variant/30 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  alt="Living room interior with tailored curtains"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFxP6dsScvxuNN7RtuRgmCwK-qjpRSr4fODNdQ2AxZViouhfOjfFIA0nOa4dVRcPhkE9dWMHLGeDeTSHfq06Hxejs-Uof3b_ZTaGE0G78ufCk2zpa93WdhUuu2A9VZoYh2kqfDl2tp3nZV-jAGK010ik5iuRN2YhLwma_cqO9QIKyzVZxfY17azDtQGF3RU-Mt4Wlof3DbPeomcwNJHRqJSjyE4SjA7YiyjLl8UEjcXBr_yil1_wGxkW3Xfi2yOFuFIi5dcrGz0rI"
                />
              </div>
              <div className="p-8">
                <span className="font-label-md text-xs text-secondary tracking-widest uppercase mb-4 block font-semibold">
                  Living Linen
                </span>
                <h3 className="font-headline-lg text-xl mb-4 font-semibold text-primary">Framed in Light</h3>
                <p className="text-xs text-on-surface-variant mb-8 leading-relaxed">
                  Precision-tailored curtains that shape light and texture across living spaces, finished to the same
                  exacting standards as every AD Textile product.
                </p>
                <Link className="inline-flex items-center gap-2 font-label-md text-[0.78rem] tracking-wider text-secondary uppercase font-semibold group/link" to="/living-linen">
                  View Details
                  <Icon name="arrow_forward" className="transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Garments (external, sister company) */}
          <div className="mt-gutter border border-dashed border-outline-variant rounded-xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-container-low/50">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center border border-outline-variant/30">
                <Icon name="checkroom" className="text-3xl text-primary" />
              </div>
              <div>
                <h3 className="font-headline-lg text-xl font-semibold text-primary">Garments</h3>
                <p className="font-body-md text-xs text-on-surface-variant">
                  Manufactured by our sister company and sold via a separate site.
                </p>
              </div>
            </div>
            <a
              className="inline-flex items-center gap-2 font-label-md text-[0.78rem] tracking-wider text-primary border-2 border-primary px-8 py-3.5 rounded-full hover:bg-primary hover:text-white transition-all font-semibold uppercase"
              href="http://adtsaral.in/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Garments — via our sister company
              <Icon name="open_in_new" className="text-[18px]" />
            </a>
          </div>
        </Container>
      </section>

      {/* Process Highlight (Bento Style) */}
      <section className="py-section-gap-lg bg-surface-container-low">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 flex flex-col justify-center">
              <span className="eyebrow">Production Flow</span>
              <h2 className="section-title mb-6">Vertical <em>Integration</em></h2>
              <div className="divider" />
              <p className="font-body-lg text-[0.88rem] text-on-surface-variant max-w-2xl mb-8 leading-relaxed mt-6">
                From raw fiber to finished product, we maintain total control over every stage of manufacturing
                in-house — dyeing, weaving, printing &amp; embroidery, cutting &amp; stitching, checking &amp;
                finishing, and packing. This ensures unparalleled consistency and adherence to global quality
                standards.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Dyeing', 'Weaving', 'Printing & Embroidery', 'Cutting & Stitching', 'Checking & Finishing', 'Packing'].map((proc) => (
                  <span key={proc} className="px-4 py-2 border border-outline-variant rounded-full text-xs font-semibold uppercase tracking-wider text-on-surface-variant bg-white">
                    {proc}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 aspect-square bg-white border border-outline-variant/30 rounded-xl flex items-center justify-center p-12 text-center group transition-all duration-300 hover:bg-primary text-primary hover:text-white hover:shadow-lg">
              <div>
                <Icon name="factory" className="text-6xl text-secondary mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="font-headline-lg text-xl mb-2 font-semibold">Smart Manufacturing</h4>
                <p className="text-xs text-on-surface-variant group-hover:text-white/80 leading-relaxed">
                  Advanced robotics paired with artisan oversight.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product Showcase Gallery */}
      <section className="py-section-gap-lg bg-background border-t border-outline-variant/30" id="catalogue">
        <Container>
          <div className="text-center mb-16">
            <span className="eyebrow">Interactive Catalogue</span>
            <h2 className="section-title">Explore Our <em>Products</em></h2>
            <div className="divider mx-auto" />
          </div>
          <ProductGallery category="ALL" />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-section-gap-lg bg-background">
        <Container className="text-center">
          <div className="border-y border-outline-variant/30 py-24">
            <h2 className="section-title mb-8">
              Ready to Partner with AD <em>Textile</em>?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
              Discuss your procurement needs with our specialist team and discover how our manufacturing scale can
              support your retail goals.
            </p>
            <Button to="/contact" size="lg">
              Schedule a Consultation
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Products
