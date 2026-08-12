import CapabilityPage from '../components/layout/CapabilityPage.jsx'

const weavingPhoto = 'https://images.unsplash.com/photo-1619043518800-7f14be467dca?w=1200&q=85&auto=format&fit=crop'
const cuttingPhoto =
  'https://plus.unsplash.com/premium_photo-1682142721713-2b076bc2b29b?w=1200&q=85&auto=format&fit=crop'
const labPhoto =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC11FYWM-cPNNt6hAn3dSIiFRt9rG_xK8xZys7IO6dqXib4fCvZsI0Uz34f9AGprZIlHXP7v-3H8u0ej4_pSo4SOLBSk5guaJ9VMoRx4_tvooHT6bqehOIf4thxNBonTKkAH97r5DCUMQ9Kxtj3dbPkf7aSjKl62Kzbo8hWY1wbvYpuO5X_HLmoXKLynuIzN2Kfx0Vtdd57cRVolnPI5EGJiILubw6nKG0V47AlPXvd2ug3cBrdE2u-zW9Jzm2LiMkuRYHFWEmwvTQ'
const checkingPhoto = 'https://images.unsplash.com/photo-1722963296013-8277246798ff?w=1200&q=85&auto=format&fit=crop'
const dyeingPhoto = 'https://images.unsplash.com/photo-1623929710342-02a8cd2dae25?w=1200&q=85&auto=format&fit=crop'
const packingPhoto =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCSDmnh1m5zgpHybsgAebq6RtTbqDnmfUUA1FQdaPTT-YCZJKXHrUZoLVfU3J-ELC3JEtvugYzKmq2wI86gbtTk6g-HU3vskwoZvvvKlibCU3Gz3KN8gyagklC62wyl5uDXnmln8cZTls46a7gvD7FbmoRVfWyJTBm_J8A1qrFuiYYesnOLEvVKuFixPhZD2E36KWrPzq59paOpQu3To_mVuuReCyqJK__q0NUw4RtJqkBoUNKQgVMdcNIfG77YntV14bDYlCs4H2k'

const SECTIONS = [
  {
    id: 'product-development',
    icon: 'lightbulb',
    eyebrow: '01 / From Concept',
    navLabel: 'Product Development',
    title: (
      <>
        Product <em>Development</em>
      </>
    ),
    description:
      'New home textile products move from concept to production-ready specification through a structured development process, drawing on our vertically integrated manufacturing to test ideas quickly against real fabric and finish.',
    bullets: ['Concept-to-Spec Workflow', 'Cross-Functional Review', 'Manufacturing-Ready Handoff'],
    image: weavingPhoto,
    imageAlt: 'Fabric development in progress at AD Textile',
  },
  {
    id: 'sampling',
    icon: 'checkroom',
    eyebrow: '02 / Proof of Concept',
    navLabel: 'Sampling',
    title: (
      <>
        <em>Sampling</em>
      </>
    ),
    description:
      'Physical samples are produced in-house so buyers can evaluate hand-feel, construction and finish before committing to a production run, with fast turnaround supported by our own cutting, embroidery and stitching lines.',
    bullets: ['In-House Sample Production', 'Fast Turnaround', 'Buyer Approval Cycles'],
    image: cuttingPhoto,
    imageAlt: 'Sample piece being cut and checked at AD Textile',
  },
  {
    id: 'cad-design',
    icon: 'design_services',
    eyebrow: '03 / Digital Design',
    navLabel: 'CAD & Design',
    title: (
      <>
        CAD &amp; <em>Design</em>
      </>
    ),
    description:
      'Our in-house design studio works in CAD to develop patterns, layouts and repeats ahead of production, giving buyers an accurate preview of scale, colourway and placement before a single meter of fabric is committed.',
    bullets: ['In-House Design Studio', 'Pattern & Repeat Development', 'Pre-Production Visualization'],
    image: labPhoto,
    imageAlt: 'Design and technical development studio at AD Textile',
  },
  {
    id: 'embroidery-digitising',
    icon: 'auto_awesome',
    eyebrow: '04 / Embellishment',
    navLabel: 'Embroidery Digitising',
    title: (
      <>
        Embroidery <em>Digitising</em>
      </>
    ),
    description:
      'Embroidery artwork is digitised in-house into stitch files tuned for our Garuda and Toshiba machines (54 heads, 10–12 thread colours), ensuring intricate designs translate accurately from concept to finished embellishment across every production run.',
    bullets: ['In-House Digitising', 'Garuda & Toshiba Ready', 'Accurate Stitch Translation'],
    image: checkingPhoto,
    imageAlt: 'Embroidery detail work at AD Textile',
  },
  {
    id: 'colour-matching',
    icon: 'palette',
    eyebrow: '05 / Precision Colour',
    navLabel: 'Colour Matching',
    title: (
      <>
        Colour <em>Matching</em>
      </>
    ),
    description:
      'Lab-dip and bulk-dye colour matching is carried out against buyer standards using spectrophotometric measurement, keeping every dye lot consistent with the approved shade across the full order quantity.',
    bullets: ['Spectrophotometric Matching', 'Lab-Dip Approval', 'Azo-Free Dyes Only'],
    image: dyeingPhoto,
    imageAlt: 'Colour matching and dye lab at AD Textile',
  },
  {
    id: 'packaging-development',
    icon: 'inventory_2',
    eyebrow: '06 / Presentation',
    navLabel: 'Packaging Development',
    title: (
      <>
        Packaging <em>Development</em>
      </>
    ),
    description:
      'Retail-ready packaging is developed alongside the product itself, from custom-specific packing with embellishments to à la carte options tailored to each client and export destination.',
    bullets: ['Custom & À La Carte Options', 'Retail-Ready Presentation', 'Export-Grade Durability'],
    image: packingPhoto,
    imageAlt: 'Packaging development at AD Textile',
  },
]

function DesignDevelopment() {
  return (
    <CapabilityPage
      badge="Design & Development"
      title="From First Sketch to Finished Fabric."
      subtitle="Our in-house design, sampling and development teams turn ideas into production-ready home textiles, backed by the same manufacturing floor that builds the final order."
      heroLoader={() => import('../components/motion/LiquidEther.jsx')}
      heroProps={{
        colors: ['#C59D5F', '#334155', '#F4E4C8'],
        autoDemo: true,
        autoSpeed: 0.4,
        autoIntensity: 1.6,
        resolution: 0.4,
      }}
      sections={SECTIONS}
      closing={{
        title: 'Have a Concept in Mind?',
        text: 'Bring us a sketch, a swatch, or just a brief — our design and development team will help shape it into a manufacturable product.',
        ctaLabel: 'Start a Development Brief',
      }}
    />
  )
}

export default DesignDevelopment
