import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import Container from '../components/ui/Container.jsx'
import WebGLScene from '../components/motion/WebGLScene.jsx'
import BlurText from '../components/motion/BlurText.jsx'
import FadeContent from '../components/motion/FadeContent.jsx'
import CurvedLoop from '../components/motion/CurvedLoop.jsx'
import CardSwap, { Card } from '../components/motion/CardSwap.jsx'
import Seo from '../components/common/Seo.jsx'

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
    title: <em>Sampling</em>,
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

const LOOP_TEXT = SECTIONS.map((s) => s.navLabel.toUpperCase()).join('  •  ') + '  •  '

function DesignDevelopment() {
  return (
    <div className="relative">
      <Seo
        title="Design & Development"
        description="Our in-house design, sampling and development teams turn ideas into production-ready home textiles, backed by the same manufacturing floor that builds the final order."
      />

      {/* Hero */}
      <section className="relative h-screen min-h-[640px] w-full flex items-center overflow-hidden bg-primary text-white">
        <WebGLScene
          loader={() => import('../components/motion/Aurora.jsx')}
          className="absolute inset-0"
          colorStops={['#A8834A', '#F4E4C8', '#C59D5F']}
          amplitude={1.6}
          blend={0.65}
          fallback={<div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1e293b] to-primary" />}
        />
        <div className="absolute inset-0 bg-primary/35 pointer-events-none" />
        <Container className="relative z-10 w-full">
          <div className="text-center max-w-3xl mx-auto">
            <span className="eyebrow !text-secondary mb-5 block">Design &amp; Development</span>
            <BlurText
              tag="h1"
              text="From First Sketch to Finished Fabric"
              animateBy="words"
              direction="top"
              delay={90}
              className="!justify-center font-headline-xl text-white text-[clamp(2.1rem,1.6rem+2.6vw,4rem)] leading-[1.1] font-bold mb-8"
            />
            <p className="font-body-md text-white/75 text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Our in-house design, sampling and development teams turn ideas into production-ready home textiles,
              backed by the same manufacturing floor that builds the final order.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button to="#product-development" variant="primary" size="lg">
                See The Process
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                Start A Development Brief
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Looping arc banner */}
      <section className="bg-background py-8 md:py-10 border-y border-outline-variant/20 overflow-hidden">
        <CurvedLoop marqueeText={LOOP_TEXT} speed={1.4} curveAmount={140} className="fill-primary" interactive={false} />
      </section>

      <main className="w-full bg-background">
        {SECTIONS.map((section, index) => {
          const reverse = index % 2 === 1
          return (
            <section key={section.id} id={section.id} className="relative w-full py-20 md:py-28 scroll-mt-24">
              <Container className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                <FadeContent duration={900} threshold={0.15} className={reverse ? 'md:order-2' : ''}>
                  <div className="w-14 h-14 bg-secondary/10 flex items-center justify-center rounded-xl mb-6">
                    <Icon name={section.icon} className="text-2xl text-secondary" />
                  </div>
                  <span className="eyebrow mb-4 block">{section.eyebrow}</span>
                  <h2 className="section-title mb-6">{section.title}</h2>
                  <p className="font-body-md text-[0.9rem] text-on-surface-variant mb-8 max-w-lg leading-relaxed">
                    {section.description}
                  </p>
                  {section.bullets && (
                    <ul className="space-y-4">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-4">
                          <Icon name="check_circle" className="text-secondary text-xl shrink-0" />
                          <span className="font-label-md text-xs uppercase tracking-wider text-primary font-semibold">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </FadeContent>
                <FadeContent duration={900} delay={150} threshold={0.15} blur className={reverse ? 'md:order-1' : ''}>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/20 bg-surface-container-low">
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover kenburns"
                    />
                  </div>
                </FadeContent>
              </Container>
            </section>
          )
        })}

        {/* Process at a glance — auto-cycling card stack */}
        <section className="relative w-full py-24 md:py-32 bg-primary text-white">
          <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="eyebrow !text-secondary mb-4 block">Our Process</span>
              <h2 className="section-title !text-white mb-6">
                Six Steps, <em>One Studio</em>
              </h2>
              <p className="font-body-md text-[0.9rem] text-white/70 leading-relaxed max-w-lg">
                Every development brief moves through the same in-house chain — from first sketch to
                retail-ready packaging — without ever leaving our facility in Karur.
              </p>
            </div>
            <div className="relative h-[460px] md:h-[520px] overflow-hidden">
              <CardSwap width={300} height={200} cardDistance={40} verticalDistance={48} delay={3200} pauseOnHover skewAmount={4}>
                {SECTIONS.map((section) => (
                  <Card key={section.id} className="relative overflow-hidden">
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col justify-end p-6">
                      <Icon name={section.icon} className="text-secondary text-2xl mb-2" />
                      <p className="font-label-md text-sm font-bold uppercase tracking-wider text-white">
                        {section.navLabel}
                      </p>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </Container>
        </section>

        {/* Closing CTA */}
        <section className="py-section-gap-lg bg-background relative overflow-hidden">
          <Container className="relative z-10 text-center">
            <div className="max-w-2xl mx-auto">
              <span className="eyebrow mb-4 block">Get Started</span>
              <h2 className="section-title mb-8">Have a Concept in Mind?</h2>
              <p className="font-body-lg text-on-surface-variant text-[0.92rem] leading-relaxed mb-12">
                Bring us a sketch, a swatch, or just a brief — our design and development team will help shape
                it into a manufacturable product.
              </p>
              <Button to="/contact" size="lg">
                Start a Development Brief
              </Button>
            </div>
          </Container>
        </section>
      </main>
    </div>
  )
}

export default DesignDevelopment
