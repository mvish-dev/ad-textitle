import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import Footer from '../components/layout/Footer.jsx'
import ThreadPath from '../components/motion/ThreadPath.jsx'
import CountUp from '../components/motion/CountUp.jsx'
import WebGLScene from '../components/motion/WebGLScene.jsx'
import { gsap, prefersReducedMotion } from '../lib/motion.js'
import { scrollTo } from '../lib/lenis.js'

// Only Embroidery keeps video (framed, with a grain treatment). The rest use
// static photography with a Ken Burns zoom instead of low-quality footage.
// Photography below is placeholder stock, standing in for client-supplied
// facility photos on the newer chapters (Knitting, Warehouse) added for the
// updated sitemap — reused from the closest existing chapter where a
// dedicated photo isn't available yet.
import embroideryVideo from '../assets/videos/Prinitng & Embroidery.mp4'

const dyeingPhoto = 'https://images.unsplash.com/photo-1623929710342-02a8cd2dae25?w=1800&q=85&auto=format&fit=crop'
const weavingPhoto = 'https://images.unsplash.com/photo-1619043518800-7f14be467dca?w=1800&q=85&auto=format&fit=crop'
const cuttingPhoto =
  'https://plus.unsplash.com/premium_photo-1682142721713-2b076bc2b29b?w=1800&q=85&auto=format&fit=crop'
const checkingPhoto = 'https://images.unsplash.com/photo-1722963296013-8277246798ff?w=1800&q=85&auto=format&fit=crop'
const packingPhoto =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCSDmnh1m5zgpHybsgAebq6RtTbqDnmfUUA1FQdaPTT-YCZJKXHrUZoLVfU3J-ELC3JEtvugYzKmq2wI86gbtTk6g-HU3vskwoZvvvKlibCU3Gz3KN8gyagklC62wyl5uDXnmln8cZTls46a7gvD7FbmoRVfWyJTBm_J8A1qrFuiYYesnOLEvVKuFixPhZD2E36KWrPzq59paOpQu3To_mVuuReCyqJK__q0NUw4RtJqkBoUNKQgVMdcNIfG77YntV14bDYlCs4H2k'

const SIDE_NAV_ITEMS = [
  { id: 'dyeing', icon: 'format_color_fill', label: 'Dyeing' },
  { id: 'weaving', icon: 'grid_4x4', label: 'Weaving' },
  { id: 'knitting', icon: 'texture', label: 'Knitting' },
  { id: 'cutting', icon: 'content_cut', label: 'Cutting' },
  { id: 'embroidery', icon: 'auto_awesome', label: 'Embroidery' },
  { id: 'stitching', icon: 'design_services', label: 'Stitching' },
  { id: 'checking-quality', icon: 'verified', label: 'Checking & QC' },
  { id: 'packing', icon: 'inventory_2', label: 'Packing' },
  { id: 'warehouse', icon: 'warehouse', label: 'Warehouse' },
]

// Straight vertical thread that draws top-to-bottom as the visitor moves
// through the chapters below — the same ThreadPath component used on
// Home/About/Certifications, configured as a progress rail here.
const RAIL_PATH = 'M4,0 L4,400'

function Manufacturing() {
  const journeyRef = useRef(null)
  const [activeChapter, setActiveChapter] = useState(SIDE_NAV_ITEMS[0].id)

  useGSAP(() => {
    if (prefersReducedMotion()) return undefined

    const mm = gsap.matchMedia()

    // Below the `md` breakpoint the side-nav rail is hidden anyway (matches
    // the original layout), so chapters just stack and reveal normally —
    // no pinning, no scrub, nothing to fight a small viewport for.
    mm.add('(min-width: 768px)', () => {
      const chapters = gsap.utils.toArray('.mfg-chapter')

      chapters.forEach((section, i) => {
        const inner = section.querySelector('.chapter-inner')
        if (!inner) return

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=100%',
              scrub: 1,
              pin: true,
              pinSpacing: true,
              onToggle: (self) => {
                if (self.isActive) setActiveChapter(SIDE_NAV_ITEMS[i].id)
              },
            },
          })
          .fromTo(inner, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' })
          .to(inner, { autoAlpha: 1, y: 0, duration: 0.4 })
          .to(inner, { autoAlpha: 0, y: -60, duration: 0.3, ease: 'power2.in' })
      })

      return () => {
        // matchMedia handles reverting the tweens/triggers created above
      }
    })

    return () => mm.revert()
  }, { scope: journeyRef })

  const handleNavClick = (e, id) => {
    e.preventDefault()
    scrollTo(`#${id}`)
  }

  return (
    <div className="relative">
      {/* SideNavBar — now a live progress rail, not just a static list */}
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-5 items-center bg-transparent hidden md:flex">
        <ThreadPath
          d={RAIL_PATH}
          viewBox="0 0 8 400"
          trigger={journeyRef}
          start="top top"
          end="bottom bottom"
          scrub={0.5}
          strokeWidth={4}
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 h-full w-[2px] text-secondary/70 z-0"
        />
        {SIDE_NAV_ITEMS.map((item) => {
          const isActive = activeChapter === item.id
          return (
            <div
              key={item.id}
              className="group relative flex flex-col items-center z-10 bg-[#F8F7F4]/80 backdrop-blur-sm rounded-full p-2 border border-outline-variant/30"
            >
              <a
                className={`transition-all duration-300 scale-100 hover:scale-125 cursor-pointer flex items-center justify-center ${
                  isActive ? 'text-secondary scale-115' : 'text-on-surface-variant hover:text-primary'
                }`}
                href={`#${item.id}`}
                title={item.label}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                <Icon name={item.icon} className="text-xl" />
              </a>
              <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] uppercase tracking-wider px-3 py-1.5 whitespace-nowrap rounded font-semibold">
                {item.label}
              </span>
            </div>
          )
        })}
      </aside>

      <main className="w-full bg-background">
        <div ref={journeyRef} className="relative">
          {/* Chapter 1: Dyeing */}
          <section className="mfg-chapter h-screen w-full relative overflow-hidden" id="dyeing">
            <div className="chapter-inner grid grid-cols-1 md:grid-cols-2 h-full w-full">
              <div className="relative flex flex-col justify-center px-margin-mobile md:px-margin-desktop bg-primary text-white overflow-hidden">
                <WebGLScene
                  loader={() => import('../components/motion/LiquidEther.jsx')}
                  className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none"
                  colors={['#C59D5F', '#334155', '#F4E4C8']}
                  autoDemo
                  autoSpeed={0.4}
                  autoIntensity={1.6}
                  resolution={0.4}
                />
                <div className="relative z-10">
                  <span className="eyebrow !text-secondary mb-4">01 / Coloration</span>
                  <h2 className="section-title !text-white mb-6">
                    Precision <em>Color</em> Science
                  </h2>
                  <p className="font-body-md text-[0.88rem] text-white/80 mb-12 max-w-lg leading-relaxed">
                    Our in-house dyeing facility features imported Italian Cheese Dyeing Machines, ensuring superior
                    dye penetration, exceptional colour fastness, and consistent quality across a wide variety of
                    yarn types and blends.
                  </p>
                  <div className="grid grid-cols-2 gap-6 max-w-lg">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-secondary transition-all">
                      <Icon name="format_color_fill" className="text-secondary mb-3 text-3xl block" />
                      <p className="font-label-md text-sm font-semibold uppercase tracking-wider text-white">Italian Cheese Dyeing</p>
                      <p className="text-xs text-white/50 mt-1">Imported Machines</p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-secondary transition-all">
                      <Icon name="monitoring" className="text-secondary mb-3 text-3xl block" />
                      <p className="font-label-md text-sm font-semibold uppercase tracking-wider text-white">3 Tons/Day</p>
                      <p className="text-xs text-white/50 mt-1">Daily Production Capacity</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group overflow-hidden h-full hidden md:block bg-surface-container-low">
                <img
                  src={dyeingPhoto}
                  alt="Azo-free dye vats at AD Textile"
                  className="absolute inset-0 w-full h-full object-cover kenburns"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </section>

          {/* Chapter 2: Weaving */}
          <section className="mfg-chapter h-screen w-full relative" id="weaving">
            <div className="absolute inset-0 z-0 bg-primary overflow-hidden">
              <img
                src={weavingPhoto}
                alt="Automatic weaving looms at AD Textile"
                className="w-full h-full object-cover opacity-45 brightness-75 kenburns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            </div>
            <div className="chapter-inner relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-end pb-24">
              <div className="bg-primary/85 backdrop-blur-md p-10 md:p-12 border border-white/10 rounded-2xl max-w-4xl text-white shadow-xl">
                <span className="eyebrow !text-secondary mb-4 block">02 / Structural Integrity</span>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="font-headline-xl text-3xl mb-4 leading-tight">The Architecture of Fabric</h2>
                    <p className="font-body-md text-[0.88rem] text-white/80 leading-relaxed">
                      Our in-house weaving facility is equipped with Somet Super Excel Rapier Looms, enabling the
                      production of premium woven fabrics with exceptional precision, consistency, and durability
                      across a wide range of yarn counts.
                    </p>
                  </div>
                  <div className="flex flex-col justify-end gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px bg-secondary" />
                      <span className="font-label-md text-xs uppercase tracking-wider font-semibold text-white/90">
                        Somet Super Excel Rapier Looms
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px bg-secondary" />
                      <span className="font-label-md text-xs uppercase tracking-wider font-semibold text-white/90">
                        1 Million Metres / Month
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 3: Knitting */}
          <section className="mfg-chapter h-screen w-full relative overflow-hidden" id="knitting">
            <div className="chapter-inner grid grid-cols-1 md:grid-cols-2 h-full w-full">
              <div className="relative order-2 md:order-1 group overflow-hidden h-full hidden md:block bg-surface-container-low">
                <img
                  src={weavingPhoto}
                  alt="Knitted fabric structures at AD Textile"
                  className="absolute inset-0 w-full h-full object-cover kenburns"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="relative order-1 md:order-2 flex flex-col justify-center px-margin-mobile md:px-margin-desktop bg-primary text-white">
                <span className="eyebrow !text-secondary mb-4">03 / Loop Formation</span>
                <h2 className="section-title !text-white mb-6">
                  Precision in Every <em>Loop</em>
                </h2>
                <p className="font-body-md text-[0.88rem] text-white/80 mb-12 max-w-lg leading-relaxed">
                  Our advanced knitting facility is equipped with 50 imported Korean Single Cylinder Knitting
                  Machines, producing Full Terry, Half Terry, Plain, Jacquard and Lurex knitted products — from
                  infant baby socks to football socks — supported by a fully integrated composite unit for linking,
                  washing, setting and ironing.
                </p>
                <div className="grid grid-cols-2 gap-6 max-w-lg">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-secondary transition-all">
                    <Icon name="texture" className="text-secondary mb-3 text-3xl block" />
                    <p className="font-label-md text-sm font-semibold uppercase tracking-wider text-white">50 Knitting Machines</p>
                    <p className="text-xs text-white/50 mt-1">Imported Korean, Single Cylinder</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-secondary transition-all">
                    <Icon name="tune" className="text-secondary mb-3 text-3xl block" />
                    <p className="font-label-md text-sm font-semibold uppercase tracking-wider text-white">5 Lakh Pairs/Month</p>
                    <p className="text-xs text-white/50 mt-1">Production Capacity</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 4: Cutting */}
          <section className="mfg-chapter h-screen w-full relative" id="cutting">
            <div className="chapter-inner max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
              <div className="md:col-span-5 text-primary">
                <span className="eyebrow mb-4">04 / Precision</span>
                <h2 className="section-title mb-6">
                  <em>Cutting</em>
                </h2>
                <p className="font-body-md text-[0.88rem] text-on-surface-variant mb-12 leading-relaxed">
                  Our in-house cutting facility is designed to deliver precision, consistency and efficiency across
                  every production run. Using advanced cutting techniques and skilled workmanship, we ensure accurate
                  pattern cutting, uniform dimensions, and minimal material wastage — a strong foundation for
                  high-quality finished products.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button to="/contact" variant="primary">
                    Get In Touch
                  </Button>
                  <Button to="/contact" variant="outline" className="text-primary border-primary">
                    Request Details
                  </Button>
                </div>
              </div>
              <div className="md:col-span-7 aspect-[4/3] rounded-2xl border border-outline-variant/20 shadow-lg hidden md:block overflow-hidden bg-surface-container-low relative">
                <img
                  src={cuttingPhoto}
                  alt="Precision fabric cutting at AD Textile"
                  className="absolute inset-0 w-full h-full object-cover kenburns"
                />
              </div>
            </div>
          </section>

          {/* Chapter 5: Embroidery */}
          <section className="mfg-chapter h-screen w-full relative" id="embroidery">
            <div className="chapter-inner flex flex-col md:flex-row h-full">
              <div className="w-full md:w-3/5 h-1/2 md:h-full relative overflow-hidden bg-surface-container-low film-grain">
                <video
                  src={embroideryVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8s] scale-102 hover:scale-105 grayscale-[30%] contrast-105 brightness-95 saturate-75"
                  poster="https://lh3.googleusercontent.com/aida-public/AB6AXuACyn2DW5X1P7CxfLYcOcwjvlBdHP0An0-NRtuj3qMA-DNRjbTfhqQglskD6I0BdFlwqpEcPASh-LXz9Xjz5UCVLrJkbQnNMeB8knb5QZJM5-YB3cwWB4Tjt3RV3fRknGSbuQns4smdWsBq1NTXGMl77Wvn0gOFzZn-O0TzBNkilGgZeHhrpUtOIXUcmZNDZQHyzW8AcgyQOxRPrXjsheUJVF6I4NPE7BPJ2PflbUc37OrXX3kTvju73qDQlzNZYd8RFwx6SG-yZoI"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_80px_30px_rgba(15,23,42,0.35)] pointer-events-none" />
              </div>
              <div className="w-full md:w-2/5 flex flex-col justify-center p-10 md:p-16 bg-white border-l border-outline-variant/20">
                <span className="eyebrow mb-4 block">05 / Embellishment</span>
                <h2 className="section-title mb-6">
                  <em>Embroidery</em>
                </h2>
                <p className="font-body-md text-[0.88rem] text-on-surface-variant mb-8 leading-relaxed">
                  Our advanced embroidery facility is equipped with Garuda and Toshiba embroidery machines,
                  featuring 54 embroidery heads supporting 10 to 12 thread colours, dedicated sampling capabilities,
                  and precision digitising — delivering intricate, premium designs across our home textile ranges.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <Icon name="check_circle" className="text-secondary text-xl" />
                    <span className="font-label-md text-xs uppercase tracking-wider text-primary font-semibold">
                      Garuda &amp; Toshiba, 54 Heads (10–12 Colours)
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Icon name="check_circle" className="text-secondary text-xl" />
                    <span className="font-label-md text-xs uppercase tracking-wider text-primary font-semibold">
                      Precision Digitising
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Icon name="check_circle" className="text-secondary text-xl" />
                    <span className="font-label-md text-xs uppercase tracking-wider text-primary font-semibold">
                      Dedicated Sampling Capabilities
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Chapter 6: Stitching */}
          <section className="mfg-chapter h-screen w-full relative" id="stitching">
            <div className="chapter-inner max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
              <div className="md:col-span-7 aspect-[4/3] rounded-2xl border border-outline-variant/20 shadow-lg hidden md:block overflow-hidden bg-surface-container-low relative order-2 md:order-1">
                <img
                  src={cuttingPhoto}
                  alt="Stitching production line at AD Textile"
                  className="absolute inset-0 w-full h-full object-cover kenburns"
                />
              </div>
              <div className="md:col-span-5 text-primary order-1 md:order-2">
                <span className="eyebrow mb-4">06 / Construction</span>
                <h2 className="section-title mb-6">
                  <em>Stitching</em>
                </h2>
                <p className="font-body-md text-[0.88rem] text-on-surface-variant mb-12 leading-relaxed">
                  Our advanced stitching facility runs 200 Jack sewing machines on the production floor, supported by
                  a skilled workforce of 100 skilled and 100 semi-skilled professionals specialising in garment and
                  sock linking operations — converting cut and embroidered panels into finished, quality-checked
                  pieces at high volume.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button to="/contact" variant="primary">
                    Get In Touch
                  </Button>
                  <Button to="/contact" variant="outline" className="text-primary border-primary">
                    Request Details
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 7: Checking & Quality Control */}
          <section className="mfg-chapter h-screen w-full relative" id="checking-quality">
            <div className="chapter-inner max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative hidden lg:block">
                <div className="w-full aspect-square border-[16px] border-white shadow-xl rounded-2xl overflow-hidden bg-surface-container-low relative">
                  <img
                    src={checkingPhoto}
                    alt="Quality inspection and finishing at AD Textile"
                    className="absolute inset-0 w-full h-full object-cover kenburns"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-secondary px-8 py-6 text-white rounded-xl shadow-lg max-w-[240px] z-10">
                  <p className="font-headline-xl text-3xl font-bold text-white">Zero</p>
                  <p className="font-label-md text-xs uppercase tracking-widest font-semibold text-white/90 mt-1">Defect Target</p>
                </div>
              </div>
              <div>
                <span className="eyebrow mb-4 block">07 / Assurance</span>
                <h2 className="section-title mb-6">
                  Checking &amp; Quality <em>Control</em>
                </h2>
                <p className="font-body-lg text-[0.95rem] text-on-surface-variant mb-12 leading-relaxed">
                  Our dedicated Quality Control team follows a comprehensive 2-layer inspection system to ensure every
                  product meets the highest standards of quality and accuracy — evaluated for measurement accuracy,
                  appearance, and packing at every stage.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0F172A] text-white shrink-0 font-bold shadow-md">
                      01
                    </div>
                    <div>
                      <p className="font-label-md text-sm uppercase tracking-widest text-primary font-semibold mb-1">In-Line Inspection</p>
                      <p className="text-xs text-on-surface-variant">
                        Layer 1: quality checks at every stage of production, not just at the end.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0F172A] text-white shrink-0 font-bold shadow-md">
                      02
                    </div>
                    <div>
                      <p className="font-label-md text-sm uppercase tracking-widest text-primary font-semibold mb-1">Final AQL Inspection</p>
                      <p className="text-xs text-on-surface-variant">
                        Layer 2: final AQL-standard inspection before dispatch, for zero-compromise quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 8: Packing */}
          <section className="mfg-chapter h-screen w-full relative" id="packing">
            <div className="absolute inset-0 z-0 opacity-15 bg-primary overflow-hidden">
              <img
                src={packingPhoto}
                alt="Export packing operations at AD Textile"
                className="w-full h-full object-cover brightness-50 kenburns"
              />
            </div>
            <div className="chapter-inner relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-center items-center text-center text-primary">
              <span className="eyebrow mb-4 block">08 / Fulfilment</span>
              <h2 className="section-title mb-8 max-w-4xl">
                <em>Packing</em>
              </h2>
              <p className="font-body-lg text-[0.95rem] text-on-surface-variant max-w-3xl mb-12 leading-relaxed">
                AD Textile has been exporting since 1992. We offer packing in various types as per customer requirements —
                from custom-specific packing with embellishments to à la carte packing tailored to each client's needs —
                every shipment is prepared to withstand the rigors of long-haul shipping.
              </p>
              <div className="flex flex-wrap justify-center gap-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mb-4">
                    <Icon name="calendar_month" className="text-secondary text-3xl" />
                  </div>
                  <p className="font-headline-lg text-2xl font-bold text-primary">1992</p>
                  <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mt-1">
                    Exporting Since
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mb-4">
                    <Icon name="inventory_2" className="text-secondary text-3xl" />
                  </div>
                  <p className="font-headline-lg text-2xl font-bold text-primary">Custom &amp; À La Carte</p>
                  <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold mt-1">
                    Packing Options
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 9: Warehouse */}
          <section className="mfg-chapter h-screen w-full relative" id="warehouse">
            <div className="absolute inset-0 z-0 bg-primary overflow-hidden">
              <img
                src={packingPhoto}
                alt="Warehouse and finished-goods storage at AD Textile"
                className="w-full h-full object-cover opacity-40 brightness-75 kenburns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            </div>
            <div className="chapter-inner relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-end pb-24">
              <div className="bg-primary/85 backdrop-blur-md p-10 md:p-12 border border-white/10 rounded-2xl max-w-4xl text-white shadow-xl">
                <span className="eyebrow !text-secondary mb-4 block">09 / Storage &amp; Fulfilment</span>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="font-headline-xl text-3xl mb-4 leading-tight">Warehouse</h2>
                    <p className="font-body-md text-[0.88rem] text-white/80 leading-relaxed">
                      Our warehouse manages raw material storage, work-in-progress staging and finished-goods
                      consolidation ahead of dispatch, with organized racking and inventory tracking that keeps every
                      order accounted for from production floor to container.
                    </p>
                  </div>
                  <div className="flex flex-col justify-end gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px bg-secondary" />
                      <span className="font-label-md text-xs uppercase tracking-wider font-semibold text-white/90">
                        Organized Racking &amp; Inventory Tracking
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px bg-secondary" />
                      <span className="font-label-md text-xs uppercase tracking-wider font-semibold text-white/90">
                        Finished-Goods Consolidation for Dispatch
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Stats & Footer CTA — arrives naturally after the pinned journey, not pinned itself */}
        <section className="w-full relative flex flex-col justify-center py-section-gap-lg" id="cta">
          <div className="max-w-container-max px-margin-mobile md:px-margin-desktop w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter text-center border-y border-outline-variant/30 py-20 bg-white rounded-2xl shadow-sm">
              <div className="py-4">
                <p className="font-headline-xl text-4xl font-bold text-primary mb-2">
                  <CountUp end={1} suffix="M" />
                </p>
                <p className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Metres/Month Weaving
                </p>
              </div>
              <div className="py-4 border-t md:border-t-0 md:border-x border-outline-variant/30">
                <p className="font-headline-xl text-4xl font-bold text-primary mb-2">
                  <CountUp end={3} suffix=" Tons/Day" />
                </p>
                <p className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Dyeing Capacity
                </p>
              </div>
              <div className="py-4 border-t md:border-t-0 md:border-r border-outline-variant/30">
                <p className="font-headline-xl text-4xl font-bold text-primary mb-2">
                  <CountUp end={2} suffix="-Layer" />
                </p>
                <p className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  AQL Quality Inspection
                </p>
              </div>
              <div className="py-4 border-t md:border-t-0">
                <p className="font-headline-xl text-2xl font-bold text-primary mb-2">SA8000 &amp; ISO 14001</p>
                <p className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Compliant
                </p>
              </div>
            </div>
            <div className="mt-16 text-center">
              <h2 className="section-title mb-10">Ready to scale your production?</h2>
              <Button to="/contact" size="lg" className="uppercase tracking-widest hover:scale-105">
                Inquire Now
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}

export default Manufacturing
