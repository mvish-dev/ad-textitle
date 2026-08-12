import { motion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import RevealText from '../components/motion/RevealText.jsx'
import WebGLScene from '../components/motion/WebGLScene.jsx'
import Seo from '../components/common/Seo.jsx'

const PREVIEW_CATEGORIES = [
  { icon: 'countertops', label: 'Kitchen Linen' },
  { icon: 'dining', label: 'Table Linen' },
  { icon: 'bed', label: 'Bed Linen' },
  { icon: 'curtains_closed', label: 'Living Linen' },
]

function Products() {
  return (
    <>
      <Seo
        title="Products"
        description="Explore AD Textile's kitchen, table, bed and living linen manufacturing categories. Contact our team directly for specifications, MOQs and lead times."
      />
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center pt-20 bg-primary">
        <div className="absolute inset-0 z-0">
          <WebGLScene
            loader={() => import('../components/motion/Silk.jsx')}
            className="absolute inset-0"
            fallback={<div className="absolute inset-0 bg-primary" />}
            color="#8A6D3B"
            speed={2.2}
            scale={1.1}
            noiseIntensity={1.1}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-label-md text-label-md text-secondary bg-white/15 backdrop-blur-md px-4 py-2 mb-6 inline-block border border-secondary/30 rounded-full tracking-[0.15em] uppercase">
              Under Development
            </span>
            <RevealText
              as="h1"
              scrollTriggered={false}
              delay={0.2}
              className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6"
            >
              Our New Catalogue is Coming Soon.
            </RevealText>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
              We're rebuilding our product showcase to better reflect the full breadth of what we manufacture.
              In the meantime, our team is ready to discuss your requirements directly.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button to="/contact" size="lg">
                Enquire About Products
              </Button>
              <Button to="/manufacturing" variant="outline" size="lg" className="text-primary border-primary">
                See Our Manufacturing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumbs Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 bg-background">
        <Breadcrumbs items={[{ label: 'Products' }]} />
      </section>

      {/* Coming Soon Detail */}
      <section className="py-section-gap-lg bg-background">
        <Container className="max-w-4xl mx-auto text-center">
          <span className="eyebrow">What to Expect</span>
          <h2 className="section-title mb-8">A Catalogue Worthy of <em>Our Craft</em></h2>
          <div className="divider mx-auto mb-8" />
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            AD Textile manufactures across kitchen linen, table linen, bed linen and living linen categories,
            alongside garments produced by our sister company. Our refreshed product catalogue will present
            these collections with the detail global buyers expect — specifications, minimum order quantities
            and lead times included. Until then, reach out directly and our team will walk you through what we
            currently offer.
          </p>
        </Container>
      </section>

      {/* Category Preview */}
      <section className="py-section-gap-lg bg-white border-t border-b border-outline-variant/20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {PREVIEW_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex flex-col items-center text-center gap-4 p-8 bg-background border border-outline-variant/30 rounded-xl"
              >
                <div className="w-14 h-14 bg-secondary/10 flex items-center justify-center rounded-lg">
                  <Icon name={category.icon} className="text-3xl text-secondary" />
                </div>
                <p className="font-label-md text-xs uppercase tracking-widest text-primary font-semibold">
                  {category.label}
                </p>
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  Coming Soon
                </span>
              </motion.div>
            ))}
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

      {/* CTA Section */}
      <section className="py-section-gap-lg bg-background">
        <Container className="text-center">
          <div className="border-y border-outline-variant/30 py-24">
            <h2 className="section-title mb-8">
              Ready to Partner with AD <em>Textile</em>?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
              Discuss your procurement needs with our specialist team and discover how our manufacturing scale can
              support your retail goals — no catalogue required.
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
