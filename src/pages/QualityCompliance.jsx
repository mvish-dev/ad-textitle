import { motion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Icon from '../components/ui/Icon.jsx'
import LogoLoop from '../components/motion/LogoLoop.jsx'
import Seo from '../components/common/Seo.jsx'

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
      {/* Certifications — first section now that the hero is gone, so it
          clears the fixed header and carries the page's h1. */}
      <section className="pt-28 md:pt-32 pb-10 md:pb-20 bg-white" id="certifications">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div className="max-w-xl">
              <span className="eyebrow">Certificates</span>
              <h1 className="section-title mb-3">Global <em>Standards</em></h1>
              <p className="text-on-surface-variant font-body-lg leading-relaxed">
                Our certifications and industry standards include ISO, OEKO-TEX®, SEDEX/SMETA, GOTS and amfori BSCI,
                supporting our commitment to quality, responsible sourcing and compliance. OEKO-TEX® STANDARD 100
                specifically addresses harmful-substance testing in textiles.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8">
            {CERTIFICATE_DETAILS.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.05 }}
                className="group border border-outline-variant/30 rounded-xl p-5 md:p-6 hover:border-secondary transition-all duration-300 flex flex-col h-full bg-white shadow-sm hover:shadow-md"
              >
                <div className="mb-4">
                  <div className="w-28 h-28 mb-3 flex items-center justify-center">
                    <img
                      src={cert.logo}
                      width={112}
                      height={112}
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
          <div className="bg-white border border-outline-variant/30 rounded-2xl py-7 overflow-hidden">
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
                    width={128}
                    height={128}
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
      <section className="py-10 md:py-20 bg-background" id="social-compliance">
        <Container>
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <span className="eyebrow">People First</span>
            <h2 className="section-title">Social <em>Compliance</em></h2>
            <div className="divider mx-auto" />
            <p className="font-body-lg text-[0.95rem] text-on-surface-variant leading-relaxed mt-3">
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
                className="flex flex-col items-center text-center gap-2 p-4 bg-white border border-outline-variant/30 rounded-xl shadow-sm"
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
      <section className="py-10 md:py-20 bg-white" id="product-compliance">
        <Container>
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <span className="eyebrow">At the Product Level</span>
            <h2 className="section-title">Product <em>Compliance</em></h2>
            <div className="divider mx-auto" />
            <p className="font-body-lg text-[0.95rem] text-on-surface-variant leading-relaxed mt-3">
              We work with buyers to meet product specifications, labelling, testing, packaging and market-specific
              compliance requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {PRODUCT_COMPLIANCE_POINTS.map((point, index) => (
              <div
                key={point.title}
                className={`text-center p-4 md:p-5 bg-background border border-outline-variant/30 rounded-xl transition-all duration-300 hover:shadow-md ${
                  index < PRODUCT_COMPLIANCE_POINTS.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''
                }`}
              >
                <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center rounded-lg mx-auto mb-3">
                  <Icon name={point.icon} className="text-3xl text-secondary" />
                </div>
                <h4 className="font-headline-lg text-xl text-primary mb-2 font-semibold">{point.title}</h4>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

    </>
  )
}

export default QualityCompliance
