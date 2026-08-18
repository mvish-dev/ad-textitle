import { useRef } from 'react'
import { motion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import RevealText from '../components/motion/RevealText.jsx'
import ThreadPath from '../components/motion/ThreadPath.jsx'
import WebGLScene from '../components/motion/WebGLScene.jsx'
import LogoLoop from '../components/motion/LogoLoop.jsx'
import Seo from '../components/common/Seo.jsx'

import checkingInline from '../assets/images/manufacturing/checking/checking-inline.webp'
import checkingDetail from '../assets/images/manufacturing/checking/checking-detail.webp'
import checkingFinalAql from '../assets/images/manufacturing/checking/checking-final-aql.webp'
import colorMatchingTechnician from '../assets/images/lab/color-matching-technician.webp'

import sa8000 from '../assets/images/certificates/sa8000.png'
import bci from '../assets/images/certificates/bci.png'
import amforiBsci from '../assets/images/certificates/amfori-bsci.png'
import gots from '../assets/images/certificates/gots.png'
import ocsBlended from '../assets/images/certificates/ocs-blended.png'
import oekoTexStandard100 from '../assets/images/certificates/oeko-tex-standard-100.png'
import grs from '../assets/images/certificates/grs.png'
import ics from '../assets/images/certificates/ics.png'
import ceMark from '../assets/images/certificates/ce-mark.png'
import ocs100 from '../assets/images/certificates/ocs-100.png'
import fairtrade from '../assets/images/certificates/fairtrade.png'
import iso90012015 from '../assets/images/certificates/iso-9001-2015.png'
import oekoTexMadeInGreen from '../assets/images/certificates/oeko-tex-made-in-green.png'
import nsfIsr from '../assets/images/certificates/nsf-isr.png'
import sedexSmeta from '../assets/images/certificates/sedex-smeta.png'

const INSPECTION_STEPS = [
  {
    levels: 'LAYER 1 · IN-LINE',
    title: 'In-Line Inspection',
    description:
      'Quality checks happen at every stage of production — not just at the end — across weaving, dyeing, knitting, cutting, embroidery and stitching, so issues are caught and corrected as they happen.',
    image: checkingInline,
    alt: 'In-Line Production Inspection',
    align: 'right',
  },
  {
    levels: 'LAYER 2 · FIRST-STAGE QC',
    title: 'First-Stage Quality Check',
    description:
      'A first-stage quality check reviews every order after in-line production, catching issues early and before the product moves to final inspection.',
    image: checkingDetail,
    alt: 'First-Stage Quality Check',
    align: 'left',
  },
  {
    levels: 'LAYER 3 · FINAL AQL',
    title: 'Final AQL Inspection',
    description:
      'Every order undergoes a final AQL-standard inspection before dispatch, with each product evaluated for measurement accuracy, appearance, and packing — ensuring zero-compromise quality in every batch.',
    image: checkingFinalAql,
    alt: 'Final AQL-Standard Inspection Before Dispatch',
    align: 'right',
  },
]

const TESTING_PRACTICES = [
  {
    num: '01',
    icon: 'wb_sunny',
    title: 'Light-Fastness Testing',
    description:
      'Dyed fabric is checked for resistance to fading under light exposure, one of the light-fastness standards applied to every dyeing batch.',
  },
  {
    num: '02',
    icon: 'palette',
    title: 'Wet & Dry Rubbing',
    description:
      'Color transfer is checked under both wet and dry rubbing conditions, in line with the wet, dry rubbing and light-fastness standards applied in our dyeing unit.',
  },
  {
    num: '03',
    icon: 'straighten',
    title: 'Dimensional Checks',
    description:
      'Fabric dimensions and structural integrity are checked throughout weaving and finishing as part of our multi-parameter inspection process.',
  },
  {
    num: '04',
    icon: 'science',
    title: 'Azo-Free Dye Verification',
    description:
      'Every dyeing batch uses Azo-free dyes only, verified through the same 3-layer inspection system — in-line checks, first-stage quality check and final AQL-standard clearance — applied across production.',
  },
]

const SOCIAL_PROGRAMS = [
  { icon: 'gavel', label: 'Fair wages and lawful working hours across all facilities' },
  { icon: 'health_and_safety', label: 'Workplace safety and prohibition of forced or child labor' },
  { icon: 'accessibility_new', label: 'Employment opportunities for the physically challenged' },
  { icon: 'volunteer_activism', label: 'A feeding programme for around 400 blind and deaf children' },
  { icon: 'school', label: 'Education scholarships for the needy' },
]

const CERTIFICATE_LOGOS = [
  { src: sa8000, alt: 'SA8000 — Social Accountability International' },
  { src: bci, alt: 'Better Cotton Initiative' },
  { src: amforiBsci, alt: 'amfori BSCI' },
  { src: gots, alt: 'GOTS — Global Organic Textile Standard' },
  { src: ocsBlended, alt: 'Organic Content Standard — Blended' },
  { src: oekoTexStandard100, alt: 'OEKO-TEX® Standard 100' },
  { src: grs, alt: 'Global Recycled Standard' },
  { src: ics, alt: 'ICS' },
  { src: ceMark, alt: 'CE Mark' },
  { src: ocs100, alt: 'Organic Content Standard — 100' },
  { src: fairtrade, alt: 'Fairtrade' },
  { src: iso90012015, alt: 'ISO 9001:2015' },
  { src: oekoTexMadeInGreen, alt: 'OEKO-TEX® Made in Green' },
  { src: nsfIsr, alt: 'NSF-ISR — AS9100 with ISO 9001' },
  { src: sedexSmeta, alt: 'Sedex / SMETA 4-Pillar' },
]

const PRODUCT_COMPLIANCE_POINTS = [
  {
    icon: 'eco',
    title: 'Azo-Free Dyes Only',
    description: 'Every dyeing batch is restricted to Azo-free dyes, in conformance with governing-body norms.',
  },
  {
    icon: 'shield',
    title: 'Restricted Substances',
    description: 'Products are manufactured to keep within restricted-substance limits expected by global retailers.',
  },
  {
    icon: 'family_restroom',
    title: 'Safe for Everyday Use',
    description: 'Finishing processes are chosen to keep fabric safe for skin contact across every product line.',
  },
  {
    icon: 'verified_user',
    title: 'OEKO-TEX Aligned',
    description: 'Product-level compliance practices are aligned with OEKO-TEX expectations for home textiles.',
  },
]

function QualityCompliance() {
  const timelineRef = useRef(null)

  return (
    <>
      <Seo
        title="Quality & Compliance"
        description="AD Textile maintains quality and compliance across every stage of production — from raw materials to finished products, meeting buyer specifications and international requirements."
      />
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden pt-20 bg-primary">
        <div className="absolute inset-0 z-0">
          <WebGLScene
            loader={() => import('../components/motion/Lightfall.jsx')}
            className="absolute inset-0"
            fallback={<div className="absolute inset-0 bg-primary" />}
            colors={['#F4E4C8', '#C59D5F', '#8A6D3B']}
            backgroundColor="#0F172A"
            speed={0.55}
            streakCount={3}
            glow={1.3}
            density={0.5}
            zoom={3.4}
            backgroundGlow={0.35}
          />
          <div className="absolute inset-0 bg-primary/40" />
        </div>
        <Container className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl bg-primary/80 backdrop-blur-md p-10 md:p-12 text-white border-l-4 border-secondary rounded-r-2xl"
          >
            <span className="font-label-md text-secondary uppercase tracking-[0.2em] mb-4 block">
              Quality &amp; Compliance
            </span>
            <RevealText
              as="h1"
              scrollTriggered={false}
              delay={0.2}
              className="font-display-lg text-display-lg-mobile md:text-5xl leading-tight mb-8"
            >
              Quality. Consistency. Compliance.
            </RevealText>
            <p className="font-body-lg text-body-lg text-white/80 mb-8 max-w-xl">
              We maintain quality and compliance across every stage of production — from raw materials to finished
              products. Our integrated manufacturing capabilities help us deliver consistent quality while meeting
              buyer specifications and international requirements.
            </p>
            <div className="flex gap-4">
              <Button href="#certifications" variant="secondary">
                View Certificates
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Quality Control */}
      <section className="py-section-gap-lg bg-background overflow-hidden" id="quality-control">
        <Container>
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <span className="eyebrow">Quality Control</span>
            <h2 className="section-title">The Journey of <em>Quality</em></h2>
            <div className="divider mx-auto" />
            <p className="text-on-surface-variant font-body-lg mt-6 leading-relaxed">
              Quality checks are integrated throughout production to ensure consistency in fabric, colour,
              dimensions, stitching, workmanship and finishing.
            </p>
          </div>

          <div ref={timelineRef} className="relative space-y-24 md:space-y-32">
            <ThreadPath
              d="M4,0 L4,1000"
              viewBox="0 0 8 1000"
              trigger={timelineRef}
              start="top 75%"
              end="bottom 45%"
              scrub={0.6}
              strokeWidth={4}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] h-full text-secondary hidden md:block"
            />

            {INSPECTION_STEPS.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 relative"
              >
                {step.align === 'right' ? (
                  <>
                    <div className="w-full md:w-[45%] md:text-right md:pr-8 order-2 md:order-1">
                      <span className="font-label-md text-xs tracking-widest text-secondary uppercase font-semibold mb-2 block">{step.levels}</span>
                      <h3 className="font-headline-lg text-2xl text-primary mb-4 font-semibold">{step.title}</h3>
                      <p className="text-on-surface-variant font-body-md text-xs leading-relaxed">{step.description}</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white z-10 shadow-lg ring-8 ring-secondary/10 hidden md:block order-2" />
                    <div className="w-full md:w-[45%] md:pl-8 order-1 md:order-3">
                      <img
                        className="w-full aspect-video object-cover rounded-xl border border-outline-variant/30 hover:scale-[1.02] transition-transform duration-500 shadow-sm"
                        alt={step.alt}
                        src={step.image}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full md:w-[45%] md:pr-8 order-1">
                      <img
                        className="w-full aspect-video object-cover rounded-xl border border-outline-variant/30 hover:scale-[1.02] transition-transform duration-500 shadow-sm"
                        alt={step.alt}
                        src={step.image}
                      />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white z-10 shadow-lg ring-8 ring-secondary/10 hidden md:block order-2" />
                    <div className="w-full md:w-[45%] md:pl-8 order-2 md:order-3">
                      <span className="font-label-md text-xs tracking-widest text-secondary uppercase font-semibold mb-2 block">{step.levels}</span>
                      <h3 className="font-headline-lg text-2xl text-primary mb-4 font-semibold">{step.title}</h3>
                      <p className="text-on-surface-variant font-body-md text-xs leading-relaxed">{step.description}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testing */}
      <section className="py-section-gap-lg bg-[#0F172A] text-white" id="testing">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-4 bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl flex flex-col justify-center">
              <span className="eyebrow !text-secondary mb-4">Laboratory</span>
              <h2 className="font-headline-xl text-3xl mb-6">Rigorous Testing Practices</h2>
              <p className="text-white/70 text-xs leading-relaxed">
                Products are tested according to product specifications, buyer requirements and applicable market
                standards.
              </p>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {TESTING_PRACTICES.map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-secondary transition-all"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center rounded-lg">
                      <Icon name={item.icon} className="text-2xl text-secondary" />
                    </div>
                    <span className="font-display-lg text-4xl text-white/15 font-bold">{item.num}</span>
                  </div>
                  <h5 className="font-headline-lg text-lg mb-2 text-white font-semibold">{item.title}</h5>
                  <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Laboratory & Inspection (supporting detail for Testing) */}
      <section className="py-section-gap-lg bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="eyebrow">Instrumentation</span>
              <h2 className="section-title mb-8">Precision-First <em>Facilities</em></h2>
              <p className="text-on-surface-variant font-body-lg mb-8 leading-relaxed">
                Our primary testing laboratory is equipped with the latest European and American instrumentation, manned
                by a team of specialist textile engineers and PhD-level researchers.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-secondary shadow-sm">
                    <Icon name="biotech" className="text-xl" />
                  </div>
                  <span className="font-body-md text-xs font-semibold text-primary uppercase tracking-wider">Spectrophotometric Color Matching</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-secondary shadow-sm">
                    <Icon name="texture" className="text-xl" />
                  </div>
                  <span className="font-body-md text-xs font-semibold text-primary uppercase tracking-wider">Pilling &amp; Abrasion Resistance Testers</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-secondary shadow-sm">
                    <Icon name="air" className="text-xl" />
                  </div>
                  <span className="font-body-md text-xs font-semibold text-primary uppercase tracking-wider">Air Permeability &amp; Moisture Management</span>
                </li>
              </ul>
            </div>
            <div className="relative group cursor-crosshair hidden md:block">
              <img
                className="w-full aspect-[4/5] object-cover rounded-2xl border border-outline-variant/30 shadow-lg group-hover:scale-[1.01] transition-transform duration-700"
                alt="Laboratory technician performing colour-matching tests at AD Textile"
                src={colorMatchingTechnician}
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary p-8 text-white rounded-xl shadow-lg max-w-xs">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-white/80 mb-2">Quality Assurance</p>
                <p className="font-headline-lg text-2xl font-bold text-white">3-Layer AQL Inspection</p>
                <p className="text-[10px] mt-2 text-white/70 italic leading-relaxed">In-Line + First-Stage + Final Dispatch Clearance</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-section-gap-lg bg-white" id="certifications">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="eyebrow">Certificates</span>
              <h2 className="section-title mb-6">Global <em>Standards</em></h2>
              <p className="text-on-surface-variant font-body-lg leading-relaxed">
                Our certifications and industry standards include ISO, OEKO-TEX®, SEDEX, C-TPAT and ZDHC,
                supporting our commitment to quality, responsible sourcing and compliance. OEKO-TEX® STANDARD 100
                specifically addresses harmful-substance testing in textiles.
              </p>
            </div>
          </div>
          <div className="mb-16 bg-background border border-outline-variant/30 rounded-2xl py-14 overflow-hidden">
            <LogoLoop
              logos={CERTIFICATE_LOGOS}
              speed={45}
              gap={80}
              logoHeight={96}
              fadeOut
              fadeOutColor="#F8F7F4"
              pauseOnHover
              ariaLabel="Certification and compliance logos"
            />
          </div>
          {/* Icon placeholders below — swap for the client-provided certificate images once received. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* ISO 14001 */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group border border-outline-variant/30 rounded-xl p-10 hover:border-secondary transition-all duration-300 flex flex-col h-full bg-background shadow-sm hover:shadow-md"
            >
              <div className="mb-8">
                <div className="w-14 h-14 bg-secondary/15 rounded-lg flex items-center justify-center mb-6">
                  <Icon name="eco" className="text-3xl text-secondary" />
                </div>
                <h4 className="font-headline-lg text-2xl mb-2 font-semibold text-primary">ISO 14001</h4>
                <span className="font-label-md text-xs text-on-surface-variant tracking-widest uppercase block font-semibold">
                  Environmental Management
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mb-10 flex-grow leading-relaxed">
                Our commitment to structured environmental management, supported by our Effluent Treatment Plant,
                Reverse Osmosis Plant, VSEP plant, and Azo-free dyeing practices.
              </p>
              <Button to="/contact" variant="outline" className="text-primary border-primary self-start">
                Request Documentation
              </Button>
            </motion.div>
            {/* ISO 9001:2015 */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group border border-outline-variant/30 rounded-xl p-10 hover:border-secondary transition-all duration-300 flex flex-col h-full bg-background shadow-sm hover:shadow-md"
            >
              <div className="mb-8">
                <div className="w-14 h-14 bg-secondary/15 rounded-lg flex items-center justify-center mb-6">
                  <Icon name="workspace_premium" className="text-3xl text-secondary" />
                </div>
                <h4 className="font-headline-lg text-2xl mb-2 font-semibold text-primary">ISO 9001:2015</h4>
                <span className="font-label-md text-xs text-on-surface-variant tracking-widest uppercase block font-semibold">
                  Quality Management
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mb-10 flex-grow leading-relaxed">
                Certification of our quality management system — consistent process control, documentation and
                continuous improvement applied across every stage of production.
              </p>
              <Button to="/contact" variant="outline" className="text-primary border-primary self-start">
                Request Documentation
              </Button>
            </motion.div>
            {/* OEKO-TEX */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group border border-outline-variant/30 rounded-xl p-10 hover:border-secondary transition-all duration-300 flex flex-col h-full bg-background shadow-sm hover:shadow-md"
            >
              <div className="mb-8">
                <div className="w-14 h-14 bg-secondary/15 rounded-lg flex items-center justify-center mb-6">
                  <Icon name="science" className="text-3xl text-secondary" />
                </div>
                <h4 className="font-headline-lg text-2xl mb-2 font-semibold text-primary">OEKO-TEX&reg; STANDARD 100</h4>
                <span className="font-label-md text-xs text-on-surface-variant tracking-widest uppercase block font-semibold">
                  Product Safety
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mb-10 flex-grow leading-relaxed">
                OEKO-TEX® STANDARD 100 specifically addresses harmful-substance testing in textiles — confirming our
                fabrics are safe for skin contact, from yarn to finished product.
              </p>
              <Button to="/contact" variant="outline" className="text-primary border-primary self-start">
                Request Documentation
              </Button>
            </motion.div>
            {/* SEDEX */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="group border border-outline-variant/30 rounded-xl p-10 hover:border-secondary transition-all duration-300 flex flex-col h-full bg-background shadow-sm hover:shadow-md"
            >
              <div className="mb-8">
                <div className="w-14 h-14 bg-secondary/15 rounded-lg flex items-center justify-center mb-6">
                  <Icon name="handshake" className="text-3xl text-secondary" />
                </div>
                <h4 className="font-headline-lg text-2xl mb-2 font-semibold text-primary">SEDEX</h4>
                <span className="font-label-md text-xs text-on-surface-variant tracking-widest uppercase block font-semibold">
                  Responsible Sourcing
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mb-10 flex-grow leading-relaxed">
                Supplier Ethical Data Exchange membership, supporting transparent sharing of labour standards,
                health &amp; safety, environmental and business ethics data across our supply chain.
              </p>
              <Button to="/contact" variant="outline" className="text-primary border-primary self-start">
                Request Documentation
              </Button>
            </motion.div>
            {/* C-TPAT */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group border border-outline-variant/30 rounded-xl p-10 hover:border-secondary transition-all duration-300 flex flex-col h-full bg-background shadow-sm hover:shadow-md"
            >
              <div className="mb-8">
                <div className="w-14 h-14 bg-secondary/15 rounded-lg flex items-center justify-center mb-6">
                  <Icon name="security" className="text-3xl text-secondary" />
                </div>
                <h4 className="font-headline-lg text-2xl mb-2 font-semibold text-primary">C-TPAT</h4>
                <span className="font-label-md text-xs text-on-surface-variant tracking-widest uppercase block font-semibold">
                  Supply Chain Security
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mb-10 flex-grow leading-relaxed">
                Customs-Trade Partnership Against Terrorism alignment, supporting secure and compliant import and
                export processes for our US-bound shipments.
              </p>
              <Button to="/contact" variant="outline" className="text-primary border-primary self-start">
                Request Documentation
              </Button>
            </motion.div>
            {/* ZDHC */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group border border-outline-variant/30 rounded-xl p-10 hover:border-secondary transition-all duration-300 flex flex-col h-full bg-background shadow-sm hover:shadow-md"
            >
              <div className="mb-8">
                <div className="w-14 h-14 bg-secondary/15 rounded-lg flex items-center justify-center mb-6">
                  <Icon name="water_drop" className="text-3xl text-secondary" />
                </div>
                <h4 className="font-headline-lg text-2xl mb-2 font-semibold text-primary">ZDHC</h4>
                <span className="font-label-md text-xs text-on-surface-variant tracking-widest uppercase block font-semibold">
                  Chemical Management
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mb-10 flex-grow leading-relaxed">
                ZDHC promotes safer chemical management and responsible production practices across the textile
                supply chain.
              </p>
              <Button to="/contact" variant="outline" className="text-primary border-primary self-start">
                Request Documentation
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Social Compliance */}
      <section className="py-section-gap-lg bg-background" id="social-compliance">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="eyebrow">People First</span>
            <h2 className="section-title">Social <em>Compliance</em></h2>
            <div className="divider mx-auto" />
            <p className="font-body-lg text-[0.95rem] text-on-surface-variant leading-relaxed mt-6">
              We are committed to safe working conditions, employee welfare, ethical practices and responsible
              workplace standards.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-gutter">
            {SOCIAL_PROGRAMS.map((program) => (
              <motion.div
                key={program.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center gap-4 p-6 bg-white border border-outline-variant/30 rounded-xl shadow-sm"
              >
                <div className="w-14 h-14 bg-secondary/15 rounded-full flex items-center justify-center">
                  <Icon name={program.icon} className="text-3xl text-secondary" />
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{program.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Product Compliance */}
      <section className="py-section-gap-lg bg-white" id="product-compliance">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="eyebrow">At the Product Level</span>
            <h2 className="section-title">Product <em>Compliance</em></h2>
            <div className="divider mx-auto" />
            <p className="font-body-lg text-[0.95rem] text-on-surface-variant leading-relaxed mt-6">
              We work with buyers to meet product specifications, labelling, testing, packaging and market-specific
              compliance requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {PRODUCT_COMPLIANCE_POINTS.map((point, index) => (
              <div
                key={point.title}
                className={`text-center p-8 bg-background border border-outline-variant/30 rounded-xl transition-all duration-300 hover:shadow-md ${
                  index < PRODUCT_COMPLIANCE_POINTS.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''
                }`}
              >
                <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center rounded-lg mx-auto mb-6">
                  <Icon name={point.icon} className="text-3xl text-secondary" />
                </div>
                <h4 className="font-headline-lg text-xl text-primary mb-4 font-semibold">{point.title}</h4>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Documentation CTA */}
      <section className="py-section-gap-lg bg-surface-container">
        <Container>
          <div className="bg-primary rounded-2xl p-16 flex flex-col md:flex-row justify-between items-center gap-12 text-white shadow-lg">
            <div className="max-w-2xl">
              <h2 className="font-headline-xl text-3xl mb-4 leading-tight text-white">Need Documentation?</h2>
              <p className="text-white/80 text-[0.88rem] leading-relaxed">
                Need certification documentation for a specific order? Contact our export team and we'll provide the
                relevant reports directly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto shrink-0">
              <Button to="/contact" variant="primary" className="!bg-white !text-primary flex items-center gap-3">
                <Icon name="mail" />
                Contact Export Team
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default QualityCompliance
