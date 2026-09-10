import { motion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import RevealText from '../components/motion/RevealText.jsx'
import WebGLScene from '../components/motion/WebGLScene.jsx'
import LogoLoop from '../components/motion/LogoLoop.jsx'
import Seo from '../components/common/Seo.jsx'

import checkingInline from '../assets/images/manufacturing/checking/checking-inline.webp'
import checkingDetail from '../assets/images/manufacturing/checking/checking-detail.webp'
import checkingFinalAql from '../assets/images/manufacturing/checking/checking-final-aql.webp'

import sa8000 from '../assets/images/certificates/sa8000.png'
import bci from '../assets/images/certificates/bci.png'
import amforiBsci from '../assets/images/certificates/amfori-bsci.png'
import gots from '../assets/images/certificates/gots-logo.avif'
import ocsBlended from '../assets/images/certificates/organic-blended-content-standard-logo.avif'
import oekoTexStandard100 from '../assets/images/certificates/oeko-tex-standard-100.png'
import grs from '../assets/images/certificates/grs_logo.avif'
import ics from '../assets/images/certificates/ics.png'
import ceMark from '../assets/images/certificates/ce-mark.png'
import ocs100 from '../assets/images/certificates/ocs_100_logo.avif'
import fairtrade from '../assets/images/certificates/fairtrade.png'
import iso90012015 from '../assets/images/certificates/organization-iso-9000-iso-9001-2015-certification_logo.avif'
import oekoTexMadeInGreen from '../assets/images/certificates/oeko-tex-made-in-green.png'
import nsfIsr from '../assets/images/certificates/nsf-isr.png'
import sedexSmeta from '../assets/images/certificates/sedex-smeta.png'

const VERIFICATION_STEPS = [
  {
    layer: 'Layer 1',
    title: 'Online Inspection',
    image: checkingInline,
    alt: 'Online in-line inspection during production',
  },
  {
    layer: 'Layer 2',
    title: 'Quality Inspection',
    image: checkingDetail,
    alt: 'Quality inspection review of finished output',
  },
  {
    layer: 'Layer 3',
    title: 'Final AQL Inspection',
    image: checkingFinalAql,
    alt: 'Final AQL-standard inspection before dispatch',
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
  { src: sa8000, alt: 'SA8000 — Social Accountability International', name: 'SA8000' },
  { src: bci, alt: 'Better Cotton Initiative', name: 'BCI' },
  { src: amforiBsci, alt: 'amfori BSCI', name: 'amfori BSCI' },
  { src: gots, alt: 'GOTS — Global Organic Textile Standard', name: 'GOTS' },
  { src: ocsBlended, alt: 'Organic Content Standard — Blended', name: 'OCS Blended' },
  { src: oekoTexStandard100, alt: 'OEKO-TEX® Standard 100', name: 'OEKO-TEX® 100' },
  { src: grs, alt: 'Global Recycled Standard', name: 'GRS' },
  { src: ics, alt: 'ICS', name: 'ICS' },
  { src: ceMark, alt: 'CE Mark', name: 'CE Mark' },
  { src: ocs100, alt: 'Organic Content Standard — 100', name: 'OCS 100' },
  { src: fairtrade, alt: 'Fairtrade', name: 'Fairtrade' },
  { src: iso90012015, alt: 'ISO 9001:2015', name: 'ISO 9001:2015' },
  { src: oekoTexMadeInGreen, alt: 'OEKO-TEX® Made in Green', name: 'OEKO-TEX® Green' },
  { src: nsfIsr, alt: 'NSF-ISR — AS9100 with ISO 9001', name: 'NSF-ISR' },
  { src: sedexSmeta, alt: 'Sedex / SMETA 4-Pillar', name: 'SEDEX / SMETA' },
]

const CERTIFICATE_DETAILS = [
  {
    logo: gots,
    name: 'GOTS',
    category: 'Global Organic Textile Standard',
    description:
      'Internationally recognized, GOTS certifies organic textiles from raw material harvesting through environmentally and socially responsible manufacturing and labelling — offering trusted assurance to consumers.',
  },
  {
    logo: ocs100,
    name: 'OCS 100',
    category: 'Organic Content Standard',
    description:
      'Organic Content Standard 100 applies to products containing 95–100% organic material. It verifies the presence and amount of organic content and tracks its flow from source to finished product.',
  },
  {
    logo: ocsBlended,
    name: 'OCS Blended',
    category: 'Organic Content Standard',
    description:
      'Organic Content Standard Blended applies to products containing 5–100% organic material, verifying the presence and percentage of organic content and tracking the raw material to the finished product.',
  },
  {
    logo: grs,
    name: 'GRS',
    category: 'Global Recycled Standard',
    description:
      'An international, voluntary standard that certifies recycled content, verifies chain of custody, and confirms responsible social, environmental and chemical practices in production.',
  },
  {
    logo: oekoTexStandard100,
    name: 'OEKO-TEX®',
    category: 'Product Safety',
    description:
      'STANDARD 100 by OEKO-TEX® is the most trusted label for textiles tested for harmful substances — confirming our fabrics are safe for skin contact, from yarn to finished product.',
  },
  {
    logo: sedexSmeta,
    name: 'SEDEX',
    category: 'Responsible Sourcing',
    description:
      'Sedex membership and SMETA 4-Pillar certification, supporting transparent sharing of labour standards, health & safety, environmental and business ethics data across our supply chain.',
  },
  {
    logo: sa8000,
    name: 'SA8000',
    category: 'Social Accountability',
    description:
      'Social Accountability International certification covering fair wages, workplace safety, and the prohibition of forced or child labour across our facility.',
  },
  {
    logo: iso90012015,
    name: 'ISO 9001:2015',
    category: 'Quality Management',
    description:
      'Certification of our quality management system — consistent process control, documentation and continuous improvement applied across every stage of production.',
  },
  {
    logo: amforiBsci,
    name: 'amfori BSCI',
    category: 'Social Compliance',
    description:
      'Business Social Compliance Initiative membership, supporting continuous improvement in labour and social conditions across our supply chain.',
  },
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
  return (
    <>
      <Seo
        title="Quality & Compliance"
        description="A D Textile maintains quality and compliance across every stage of production — from raw materials to finished products, meeting buyer specifications and international requirements."
      />
      {/* Hero Section */}
      <section className="relative min-h-[max(80vh,600px)] flex items-center overflow-hidden pt-20 pb-12 bg-primary">
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
              className="font-display-lg text-[clamp(1.7rem,8.5vw,2.5rem)] md:text-5xl leading-tight mb-8"
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

      {/* Quality Verification */}
      <section className="py-section-gap-lg bg-background" id="quality-control">
        <Container>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="eyebrow">Quality Control</span>
            <h2 className="section-title">Verified at <em>Every Stage</em></h2>
            <div className="divider mx-auto" />
            <p className="text-on-surface-variant font-body-lg mt-6 leading-relaxed">
              A 3-layer inspection system checks every order from the production floor through to final dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {VERIFICATION_STEPS.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={step.image}
                    alt={step.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent p-6 pt-16">
                  <span className="font-label-md text-[0.65rem] uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
                    {step.layer}
                  </span>
                  <h3 className="font-headline-lg text-xl text-white font-semibold">{step.title}</h3>
                </div>
              </motion.div>
            ))}
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
                Our certifications and industry standards include ISO, OEKO-TEX®, SEDEX/SMETA, GOTS and amfori BSCI,
                supporting our commitment to quality, responsible sourcing and compliance. OEKO-TEX® STANDARD 100
                specifically addresses harmful-substance testing in textiles.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
            {CERTIFICATE_DETAILS.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.05 }}
                className="group border border-outline-variant/30 rounded-xl p-10 hover:border-secondary transition-all duration-300 flex flex-col h-full bg-white shadow-sm hover:shadow-md"
              >
                <div className="mb-8">
                  <div className="w-28 h-28 mb-6 flex items-center justify-center">
                    <img
                      src={cert.logo}
                      alt={cert.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h4 className="font-headline-lg text-2xl mb-2 font-semibold text-primary">{cert.name}</h4>
                  <span className="font-label-md text-xs text-on-surface-variant tracking-widest uppercase block font-semibold">
                    {cert.category}
                  </span>
                </div>
                <p className="font-body-md text-xs text-on-surface-variant flex-grow leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="bg-white border border-outline-variant/30 rounded-2xl py-14 overflow-hidden">
            <LogoLoop
              logos={CERTIFICATE_LOGOS}
              speed={45}
              gap={80}
              logoHeight={96}
              fadeOut
              fadeOutColor="#FFFFFF"
              pauseOnHover
              ariaLabel="Certification and compliance logos"
              renderItem={(item) => (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-[var(--logoloop-logoHeight)] w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              )}
            />
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
