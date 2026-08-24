import { motion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import WebGLScene from '../components/motion/WebGLScene.jsx'
import Seo from '../components/common/Seo.jsx'

import aerialEtp from '../assets/images/facility/aerial-etp.webp'
import aerialCampusWide from '../assets/images/facility/aerial-campus-wide.webp'
import dyeingYarnMacro from '../assets/images/manufacturing/dyeing/dyeing-yarn-macro.webp'

const envCarePhoto = aerialEtp
const resourcePhoto = dyeingYarnMacro

function Sustainability() {
  return (
    <>
      <Seo
        title="Sustainability"
        description="AD Textile's approach to practical sustainability — across materials, manufacturing processes, chemical management and resource use."
      />
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] flex items-end pb-32 pt-20 bg-primary">
        <div className="absolute inset-0 z-0 bg-primary">
          <WebGLScene
            loader={() => import('../components/motion/LightRays.jsx')}
            className="absolute inset-0"
            fallback={<div className="absolute inset-0 bg-primary" />}
            raysOrigin="top-center"
            raysColor="#F4E4C8"
            raysSpeed={1.1}
            lightSpread={0.9}
            rayLength={1.8}
            fadeDistance={1.1}
            saturation={0.85}
            followMouse
            mouseInfluence={0.12}
            noiseAmount={0.05}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        </div>
        <Container className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl bg-primary/80 backdrop-blur-md p-10 md:p-12 inline-block border-l-4 border-secondary text-white rounded-r-2xl"
          >
            <span className="font-label-md text-label-md uppercase tracking-[0.15em] text-secondary mb-4 block">
              Our Responsibility
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-5xl mb-6 leading-tight">
              Responsible Manufacturing. Better Choices.
            </h1>
            <p className="font-body-lg text-body-lg text-white/80 max-w-xl">
              We focus on practical sustainability across materials, manufacturing processes, chemical management
              and resource use.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Sustainable Materials */}
      <section className="py-section-gap-lg bg-background" id="sustainable-materials">
        <Container>
          <div className="grid grid-cols-1 gap-gutter mb-16">
            <div>
              <span className="eyebrow">Eco Stewardship</span>
              <h2 className="section-title mb-6">Sustainable <em>Materials</em></h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                We work with materials including cotton, bamboo and other customer-specified or suitable
                sustainable options, depending on product requirements.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-10 rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="mb-10">
                <Icon name="eco" className="text-5xl text-secondary mb-6 block" />
                <h3 className="font-headline-lg text-2xl text-primary mb-4 font-semibold">Azo-Free Dyeing</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  We use only Azo-free dyes across all of our dyeing processes, in conformance with governing-body
                  norms — safe for the skin and safe for the water.
                </p>
              </div>
              <div className="h-1 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-10 rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="mb-10">
                <Icon name="grass" className="text-5xl text-secondary mb-6 block" />
                <h3 className="font-headline-lg text-2xl text-primary mb-4 font-semibold">Responsible Fiber Sourcing</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Raw material is checked before it ever reaches the production floor, so only suitable, quality
                  fiber moves into weaving, dyeing and finishing.
                </p>
              </div>
              <div className="h-1 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Responsible Manufacturing */}
      <section className="py-section-gap-lg bg-white border-t border-outline-variant/20" id="responsible-manufacturing">
        <Container>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="eyebrow">Process Responsibility</span>
            <h2 className="section-title">Responsible <em>Manufacturing</em></h2>
            <div className="divider mx-auto" />
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 leading-relaxed">
              Our integrated knitting, weaving, dyeing, stitching and packing capabilities provide greater control
              over quality, processes and resource use.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-background p-10 rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="mb-10">
                <Icon name="water_damage" className="text-5xl text-secondary mb-6 block" />
                <h3 className="font-headline-lg text-2xl text-primary mb-4 font-semibold">Effluent Treatment</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Our on-site Effluent Treatment Plant ensures process effluents are properly treated before discharge,
                  keeping our operations environmentally responsible.
                </p>
              </div>
              <div className="h-1 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-background p-10 rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="mb-10">
                <Icon name="rebase" className="text-5xl text-secondary mb-6 block" />
                <h3 className="font-headline-lg text-2xl text-primary mb-4 font-semibold">RO &amp; Water Recycling</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  A dedicated Reverse Osmosis Plant, paired with a Vibratory Shear Enhanced Process (VSEP) plant, forms
                  the backbone of our water treatment and recycling system.
                </p>
              </div>
              <div className="h-1 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Environmental Practices */}
      <section className="py-section-gap-lg bg-background" id="environmental-practices">
        <Container>
          <div className="text-center mb-16">
            <span className="eyebrow">Operations in Detail</span>
            <h2 className="section-title">Environmental <em>Practices</em></h2>
            <div className="divider mx-auto" />
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 leading-relaxed max-w-2xl mx-auto">
              We focus on responsible chemical management, resource efficiency, waste reduction and improved
              production practices.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Environmental Care */}
            <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div className="aspect-video relative overflow-hidden">
                <img src={envCarePhoto} alt="Environmental care at AD Textile" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover kenburns" />
              </div>
              <div className="p-6">
                <h4 className="font-headline-lg text-lg font-semibold text-primary mb-2">Environmental Care</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  State-of-the-art Water Treatment, Reverse Osmosis, and VSEP systems ensuring zero hazardous waste discharge.
                </p>
              </div>
            </div>

            {/* Resource Management */}
            <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div className="aspect-video relative overflow-hidden">
                <img src={resourcePhoto} alt="Resource management at AD Textile" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover kenburns" />
              </div>
              <div className="p-6">
                <h4 className="font-headline-lg text-lg font-semibold text-primary mb-2">Resource Management</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Energy efficiency, raw material sourcing, and eco-certified production operations.
                </p>
              </div>
            </div>
          </div>

          {/* CSR Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-outline-variant/30 rounded-2xl p-12 max-w-4xl mx-auto shadow-sm mt-gutter"
          >
            <h3 className="font-headline-lg text-2xl text-primary mb-6 text-center font-semibold">
              Our Corporate Social Responsibility
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant text-center max-w-2xl mx-auto mb-10 leading-relaxed">
              As a corporate entity in compliance with SA8000 and ISO 9001:2015 standards, we extend our responsibility
              beyond the factory floor into the communities we operate in.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-secondary/15 rounded-full flex items-center justify-center">
                  <Icon name="accessibility_new" className="text-3xl text-secondary" />
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Employment opportunities for the physically challenged
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-secondary/15 rounded-full flex items-center justify-center">
                  <Icon name="volunteer_activism" className="text-3xl text-secondary" />
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  A feeding programme for around 400 blind and deaf children
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-secondary/15 rounded-full flex items-center justify-center">
                  <Icon name="school" className="text-3xl text-secondary" />
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Education scholarships for the needy
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Sustainability Standards */}
      <section className="py-section-gap-lg bg-white" id="sustainability-standards">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="eyebrow">Global Standards</span>
            <h2 className="section-title">Sustainability <em>Standards</em></h2>
            <div className="divider mx-auto" />
            <p className="font-body-lg text-[0.95rem] text-on-surface-variant leading-relaxed mt-6">
              Our sustainability framework is supported by standards and initiatives including OEKO-TEX® and the
              Global Recycled Standard (GRS), which verifies recycled content and tracks it through the supply
              chain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-background p-10 rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="mb-10">
                <Icon name="science" className="text-5xl text-secondary mb-6 block" />
                <h3 className="font-headline-lg text-2xl text-primary mb-4 font-semibold">OEKO-TEX&reg;</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Independent testing confirming our fabrics are free from harmful substances at every processing
                  stage, from yarn to finished product, so what reaches the end consumer is safe for skin contact.
                </p>
              </div>
              <div className="h-1 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-background p-10 rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="mb-10">
                <Icon name="recycling" className="text-5xl text-secondary mb-6 block" />
                <h3 className="font-headline-lg text-2xl text-primary mb-4 font-semibold">GRS</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Global Recycled Standard certification verifies recycled content and tracks it through the supply
                  chain, alongside responsible social, environmental and chemical practices.
                </p>
              </div>
              <div className="h-1 w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Image Callout / Process */}
      <section className="h-[600px] relative overflow-hidden flex items-center bg-primary">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover scale-[1.02]"
            alt="Aerial view of the AD Textile manufacturing campus"
            src={aerialCampusWide}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-primary/50" />
        </div>
        <Container className="relative z-10 w-full text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8 text-white">Transparency in Every Thread.</h2>
            <Button to="/contact" size="lg" className="uppercase tracking-widest hover:scale-105">
              Learn More — Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Sustainability
