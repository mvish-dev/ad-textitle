import CapabilityPage from '../components/layout/CapabilityPage.jsx'
import Seo from '../components/common/Seo.jsx'

import weavingHero from '../assets/images/manufacturing/weaving/weaving-hero.webp'
import colorMatchingMachine from '../assets/images/lab/color-matching-machine.webp'
import checkingHero from '../assets/images/manufacturing/checking/checking-hero.webp'
import embroideryHero from '../assets/images/manufacturing/embroidery/embroidery-hero.webp'
import packingHero from '../assets/images/manufacturing/packing/packing-hero.webp'

const SECTIONS = [
  {
    id: 'oem-manufacturing',
    icon: 'precision_manufacturing',
    eyebrow: '01 / Build to Spec',
    navLabel: 'OEM Manufacturing',
    title: (
      <>
        OEM <em>Manufacturing</em>
      </>
    ),
    description:
      'We manufacture to your specification, exact fabric, construction and finish requirements executed at scale on our own looms, dyeing, embroidery and stitching lines, with your brand attached at the very end.',
    bullets: ['Manufactured to Your Spec', 'Full Vertical Integration', 'Scalable Production'],
    image: weavingHero,
    imageAlt: 'OEM production run on the weaving floor at AD Textile',
  },
  {
    id: 'odm-solutions',
    icon: 'design_services',
    eyebrow: '02 / Design-Assisted',
    navLabel: 'ODM Solutions',
    title: (
      <>
        ODM <em>Solutions</em>
      </>
    ),
    description:
      'When you need more than manufacturing, our in-house design and development team can originate product concepts for your brand, ready for your review and refinement before production begins.',
    bullets: ['In-House Concept Development', 'Buyer Review Cycles', 'Design-to-Production Continuity'],
    image: colorMatchingMachine,
    imageAlt: 'Design-assisted product development at AD Textile',
  },
  {
    id: 'private-label',
    icon: 'label',
    eyebrow: '03 / Your Brand',
    navLabel: 'Private Label',
    title: (
      <>
        Private <em>Label</em>
      </>
    ),
    description:
      'Finished products are labelled, tagged and documented under your brand, with the same 2-layer AQL inspection system and compliance documentation applied regardless of whose name is on the packaging.',
    bullets: ['Brand-Ready Labelling', 'Full Compliance Documentation', '2-Layer AQL Inspection'],
    image: checkingHero,
    imageAlt: 'Private label finishing and inspection at AD Textile',
  },
  {
    id: 'custom-designs',
    icon: 'palette',
    eyebrow: '04 / Made to Order',
    navLabel: 'Custom Designs',
    title: (
      <>
        Custom <em>Designs</em>
      </>
    ),
    description:
      'From custom weaves and dobby patterns to bespoke embroidery placements, our design studio and production floor work together to produce designs unique to your collection.',
    bullets: ['Custom Weaves & Patterns', 'Bespoke Embroidery Placement', 'Exclusive to Your Collection'],
    image: embroideryHero,
    imageAlt: 'Custom design production at AD Textile',
  },
  {
    id: 'custom-packaging',
    icon: 'inventory_2',
    eyebrow: '05 / Retail Ready',
    navLabel: 'Custom Packaging',
    title: (
      <>
        Custom <em>Packaging</em>
      </>
    ),
    description:
      "Packaging is developed to match your brand presentation, from custom-specific packing with embellishments to à la carte options, prepared to withstand the rigors of long-haul export shipping.",
    bullets: ['Brand-Matched Presentation', 'Custom & À La Carte Options', 'Export-Grade Durability'],
    image: packingHero,
    imageAlt: 'Custom packaging development at AD Textile',
  },
]

function PrivateLabel() {
  return (
    <>
      <Seo
        title="Private Label & Custom Manufacturing"
        description="From OEM production to fully custom private-label programs, AD Textile builds home textile collections that carry your brand, backed by 30+ years of vertically integrated manufacturing."
      />
      <CapabilityPage
        badge="Private Label & Custom Manufacturing"
        title="Your Brand. Our Manufacturing Scale."
        subtitle="From OEM production to fully custom private-label programs, we build home textile collections that carry your name, backed by 30+ years of vertically integrated manufacturing."
        heroLoader={() => import('../components/motion/Silk.jsx')}
        heroProps={{ color: '#8A6D3B', speed: 2.2, scale: 1.1, noiseIntensity: 1.1 }}
        sections={SECTIONS}
        closing={{
          title: 'Ready to Build Your Private Label Line?',
          text: 'Tell us about your brand and target categories, and our team will scope a manufacturing program built around your specifications.',
          ctaLabel: 'Discuss Your Program',
        }}
      />
    </>
  )
}

export default PrivateLabel
