import CapabilityPage from '../components/layout/CapabilityPage.jsx'

const weavingPhoto = 'https://images.unsplash.com/photo-1619043518800-7f14be467dca?w=1200&q=85&auto=format&fit=crop'
const dyeingPhoto = 'https://images.unsplash.com/photo-1623929710342-02a8cd2dae25?w=1200&q=85&auto=format&fit=crop'
const packingPhoto =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCSDmnh1m5zgpHybsgAebq6RtTbqDnmfUUA1FQdaPTT-YCZJKXHrUZoLVfU3J-ELC3JEtvugYzKmq2wI86gbtTk6g-HU3vskwoZvvvKlibCU3Gz3KN8gyagklC62wyl5uDXnmln8cZTls46a7gvD7FbmoRVfWyJTBm_J8A1qrFuiYYesnOLEvVKuFixPhZD2E36KWrPzq59paOpQu3To_mVuuReCyqJK__q0NUw4RtJqkBoUNKQgVMdcNIfG77YntV14bDYlCs4H2k'
const checkingPhoto = 'https://images.unsplash.com/photo-1722963296013-8277246798ff?w=1200&q=85&auto=format&fit=crop'

const SECTIONS = [
  {
    id: 'global-markets',
    icon: 'public',
    eyebrow: '01 / Since 1992',
    navLabel: 'Global Markets',
    title: (
      <>
        Global <em>Markets</em>
      </>
    ),
    description:
      'AD Textile has exported home textiles internationally since 1992, serving major retailers across global markets with consistent quality and reliable delivery, order after order.',
    bullets: ['Exporting Since 1992', 'International Retail Clients', 'Consistent Repeat Orders'],
    image: weavingPhoto,
    imageAlt: 'Production destined for international markets at AD Textile',
  },
  {
    id: 'export-capabilities',
    icon: 'local_shipping',
    eyebrow: '02 / End to End',
    navLabel: 'Export Capabilities',
    title: (
      <>
        Export <em>Capabilities</em>
      </>
    ),
    description:
      'Documentation, compliance certification and logistics coordination are handled in-house, so buyers deal with a single point of contact from purchase order through to goods landed at destination.',
    bullets: ['In-House Documentation', 'Compliance Certification', 'Single Point of Contact'],
    image: dyeingPhoto,
    imageAlt: 'Export-ready production at AD Textile',
  },
  {
    id: 'production-capacity',
    icon: 'factory',
    eyebrow: '03 / At Scale',
    navLabel: 'Production & Capacity',
    title: (
      <>
        Production &amp; <em>Capacity</em>
      </>
    ),
    description:
      'Vertically integrated manufacturing — Somet Rapier looms weaving 1 million metres a month, 3 tons/day of dyeing capacity, and dedicated knitting, embroidery and stitching lines — gives us the throughput to support both large repeat programs and smaller specialist orders.',
    bullets: ['1M Metres/Month Weaving', '3 Tons/Day Dyeing Capacity', 'Flexible Order Volumes'],
    image: checkingPhoto,
    imageAlt: 'Manufacturing capacity at AD Textile',
  },
  {
    id: 'container-loading',
    icon: 'inventory_2',
    eyebrow: '04 / Dispatch',
    navLabel: 'Container Loading',
    title: (
      <>
        Container <em>Loading</em>
      </>
    ),
    description:
      'Finished goods are packed and loaded to withstand long-haul shipping, with packing plans built around container utilisation so every shipment travels efficiently and arrives intact.',
    bullets: ['Shipment-Ready Packing', 'Optimised Container Utilisation', 'Damage-Resistant Loading'],
    image: packingPhoto,
    imageAlt: 'Container loading and export packing at AD Textile',
  },
  {
    id: 'international-buyer-support',
    icon: 'support_agent',
    eyebrow: '05 / Partnership',
    navLabel: 'International Buyer Support',
    title: (
      <>
        International Buyer <em>Support</em>
      </>
    ),
    description:
      'From first inquiry through to post-shipment documentation, our export team supports international buyers directly, coordinating sampling, compliance paperwork and delivery timelines across time zones.',
    bullets: ['Direct Export Team Contact', 'Sampling & Documentation Support', 'Cross-Time-Zone Coordination'],
    image: checkingPhoto,
    imageAlt: 'Export team supporting an international buyer inquiry',
  },
]

function Exports() {
  return (
    <CapabilityPage
      badge="Exports"
      title="Manufacturing India. Delivering Worldwide."
      subtitle="Exporting home textiles since 1992, with the production capacity, compliance documentation and export logistics to support retail programs across international markets."
      heroLoader={() => import('../components/motion/LightRays.jsx')}
      heroProps={{
        raysOrigin: 'top-center',
        raysColor: '#F4E4C8',
        raysSpeed: 1.1,
        lightSpread: 0.9,
        rayLength: 1.8,
        fadeDistance: 1.1,
        saturation: 0.85,
        followMouse: true,
        mouseInfluence: 0.12,
        noiseAmount: 0.05,
      }}
      sections={SECTIONS}
      closing={{
        title: 'Sourcing for an International Retail Program?',
        text: "Tell us your markets, volumes and timelines — our export team will scope how AD Textile's capacity fits your buying calendar.",
        ctaLabel: 'Talk to Our Export Team',
      }}
    />
  )
}

export default Exports
