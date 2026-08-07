import { motion } from 'framer-motion'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import Footer from '../components/layout/Footer.jsx'

// Only Printing & Embroidery keeps video (framed, with a grain treatment).
// The rest use static photography with a Ken Burns zoom instead of low-quality footage.
import printingVideo from '../assets/videos/Prinitng & Embroidery.mp4'

const dyeingPhoto = 'https://images.unsplash.com/photo-1623929710342-02a8cd2dae25?w=1800&q=85&auto=format&fit=crop'
const weavingPhoto = 'https://images.unsplash.com/photo-1619043518800-7f14be467dca?w=1800&q=85&auto=format&fit=crop'
const stitchingPhoto =
  'https://plus.unsplash.com/premium_photo-1682142721713-2b076bc2b29b?w=1800&q=85&auto=format&fit=crop'
const checkingPhoto = 'https://images.unsplash.com/photo-1722963296013-8277246798ff?w=1800&q=85&auto=format&fit=crop'
const packingPhoto =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCSDmnh1m5zgpHybsgAebq6RtTbqDnmfUUA1FQdaPTT-YCZJKXHrUZoLVfU3J-ELC3JEtvugYzKmq2wI86gbtTk6g-HU3vskwoZvvvKlibCU3Gz3KN8gyagklC62wyl5uDXnmln8cZTls46a7gvD7FbmoRVfWyJTBm_J8A1qrFuiYYesnOLEvVKuFixPhZD2E36KWrPzq59paOpQu3To_mVuuReCyqJK__q0NUw4RtJqkBoUNKQgVMdcNIfG77YntV14bDYlCs4H2k'

const SIDE_NAV_ITEMS = [
  { id: 'dyeing', icon: 'format_color_fill', label: 'Dyeing' },
  { id: 'weaving', icon: 'grid_4x4', label: 'Weaving' },
  { id: 'printing', icon: 'auto_awesome', label: 'Printing & Embroidery' },
  { id: 'cutting', icon: 'content_cut', label: 'Cutting & Stitching' },
  { id: 'quality', icon: 'verified', label: 'Quality' },
  { id: 'packing', icon: 'inventory_2', label: 'Export & Packing' },
]

function Infrastructure() {
  return (
    <div className="relative">
      {/* SideNavBar (Progress Tracker) */}
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6 items-center bg-transparent hidden md:flex">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-primary/20 z-0" />
        {SIDE_NAV_ITEMS.map((item) => (
          <div key={item.id} className="group relative flex flex-col items-center z-10 bg-[#F8F7F4]/80 backdrop-blur-sm rounded-full p-2 border border-outline-variant/30">
            <a
              className="text-on-surface-variant hover:text-primary transition-all duration-300 scale-100 hover:scale-125 cursor-pointer flex items-center justify-center"
              href={`#${item.id}`}
              title={item.label}
            >
              <Icon name={item.icon} className="text-xl" />
            </a>
            <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] uppercase tracking-wider px-3 py-1.5 whitespace-nowrap rounded font-semibold">
              {item.label}
            </span>
          </div>
        ))}
      </aside>

      <main className="snap-y snap-mandatory overflow-y-auto h-screen w-full bg-background">
        {/* Section 1: Dyeing */}
        <section className="snap-start snap-always h-screen w-full relative" id="dyeing">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
            <div className="flex flex-col justify-center px-margin-mobile md:px-margin-desktop bg-primary text-white">
              <span className="eyebrow !text-secondary mb-4">
                01 / Coloration
              </span>
              <h2 className="section-title !text-white mb-6">Eco-Conscious <em>Color</em> Science</h2>
              <p className="font-body-md text-[0.88rem] text-white/80 mb-12 max-w-lg leading-relaxed">
                AD Textile is an eco-friendly organization that uses only Azo-free dyes across its dyeing operations.
                Quality is maintained through wet and dry rubbing tests alongside light-fastness standards at every
                stage.
              </p>
              <div className="grid grid-cols-2 gap-6 max-w-lg">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-secondary transition-all">
                  <Icon name="format_color_fill" className="text-secondary mb-3 text-3xl block" />
                  <p className="font-label-md text-sm font-semibold uppercase tracking-wider text-white">Azo-Free Dyes</p>
                  <p className="text-xs text-white/50 mt-1">Eco-Friendly Standard</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-secondary transition-all">
                  <Icon name="monitoring" className="text-secondary mb-3 text-3xl block" />
                  <p className="font-label-md text-sm font-semibold uppercase tracking-wider text-white">4 Tons/Day</p>
                  <p className="text-xs text-white/50 mt-1">Installed Capacity</p>
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

        {/* Section 2: Weaving */}
        <section className="snap-start snap-always h-screen w-full relative" id="weaving">
          <div className="absolute inset-0 z-0 bg-primary overflow-hidden">
            <img
              src={weavingPhoto}
              alt="Automatic weaving looms at AD Textile"
              className="w-full h-full object-cover opacity-45 brightness-75 kenburns"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-end pb-24">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-primary/85 backdrop-blur-md p-10 md:p-12 border border-white/10 rounded-2xl max-w-4xl text-white shadow-xl"
            >
              <span className="eyebrow !text-secondary mb-4 block">
                02 / Structural Integrity
              </span>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="font-headline-xl text-3xl mb-4 leading-tight">The Architecture of Fabric</h2>
                  <p className="font-body-md text-[0.88rem] text-white/80 leading-relaxed">
                    Our modern weaving unit is equipped with 56 automatic Repair looms. The loom shed weaves dobby,
                    satin, satin-striped, and twill patterns, with the capacity to produce fabric up to 360cm in width
                    using double insertion.
                  </p>
                </div>
                <div className="flex flex-col justify-end gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-secondary" />
                    <span className="font-label-md text-xs uppercase tracking-wider font-semibold text-white/90">
                      56 Automatic Repair Looms
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-secondary" />
                    <span className="font-label-md text-xs uppercase tracking-wider font-semibold text-white/90">
                      Up to 360cm Width, Double Insertion
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Printing & Embroidery */}
        <section className="snap-start snap-always h-screen w-full relative" id="printing">
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-3/5 h-1/2 md:h-full relative overflow-hidden bg-surface-container-low film-grain">
              <video
                src={printingVideo}
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
              <span className="eyebrow mb-4 block">
                03 / Embellishment
              </span>
              <h2 className="section-title mb-6">Printing &amp; <em>Embroidery</em></h2>
              <p className="font-body-md text-[0.88rem] text-on-surface-variant mb-8 leading-relaxed">
                Our rotary and manual printing facilities produce a wide range of designs and patterns. Intricate
                embroidery is achieved using imported Tajima and Barudan machines, complemented by an in-house design
                studio for exclusive designs.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <Icon name="check_circle" className="text-secondary text-xl" />
                  <span className="font-label-md text-xs uppercase tracking-wider text-primary font-semibold">
                    Rotary &amp; Manual Printing
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Icon name="check_circle" className="text-secondary text-xl" />
                  <span className="font-label-md text-xs uppercase tracking-wider text-primary font-semibold">
                    Tajima &amp; Barudan Embroidery (9 Colors)
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Icon name="check_circle" className="text-secondary text-xl" />
                  <span className="font-label-md text-xs uppercase tracking-wider text-primary font-semibold">
                    In-House Design Studio
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Cutting & Stitching */}
        <section className="snap-start snap-always h-screen w-full relative" id="cutting">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-5 text-primary">
              <span className="eyebrow mb-4">
                04 / Precision
              </span>
              <h2 className="section-title mb-6">Cutting &amp; <em>Stitching</em></h2>
              <p className="font-body-md text-[0.88rem] text-on-surface-variant mb-12 leading-relaxed">
                Cutting and stitching demand precision, ensured by an efficient, trained and skilled workforce managed
                by experienced supervisors. Production runs on Juki and Brother sewing machines throughout.
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
                src={stitchingPhoto}
                alt="Juki and Brother sewing machines at AD Textile"
                className="absolute inset-0 w-full h-full object-cover kenburns"
              />
            </div>
          </div>
        </section>

        {/* Section 5: Quality */}
        <section className="snap-start snap-always h-screen w-full relative" id="quality">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              <span className="eyebrow mb-4 block">
                05 / Assurance
              </span>
              <h2 className="section-title mb-6">The Standard of <em>Excellence</em></h2>
              <p className="font-body-lg text-[0.95rem] text-on-surface-variant mb-12 leading-relaxed">
                Quality control is part of every process at AD Textile. Our modern laboratory carries out various tests
                at every stage of production, following a 5-level inspection cycle — testified by reports from SGS,
                Texanlabs, Textile Committee, and other competent authorities.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0F172A] text-white shrink-0 font-bold shadow-md">
                    01
                  </div>
                  <div>
                    <p className="font-label-md text-sm uppercase tracking-widest text-primary font-semibold mb-1">Visual Inspection</p>
                    <p className="text-xs text-on-surface-variant">
                      Multi-stage assessment across our 5-level inspection cycle.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0F172A] text-white shrink-0 font-bold shadow-md">
                    02
                  </div>
                  <div>
                    <p className="font-label-md text-sm uppercase tracking-widest text-primary font-semibold mb-1">Lab Certification</p>
                    <p className="text-xs text-on-surface-variant">
                      Tested and certified by SGS, Texanlabs &amp; Textile Committee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Export & Packing */}
        <section className="snap-start snap-always h-screen w-full relative" id="packing">
          <div className="absolute inset-0 z-0 opacity-15 bg-primary overflow-hidden">
            <img
              src={packingPhoto}
              alt="Export packing operations at AD Textile"
              className="w-full h-full object-cover brightness-50 kenburns"
            />
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-center items-center text-center text-primary">
            <span className="eyebrow mb-4 block">
              06 / Fulfilment
            </span>
            <h2 className="section-title mb-8 max-w-4xl">Export &amp; <em>Packing</em></h2>
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

        {/* Section 7: Stats & Footer CTA */}
        <section className="snap-start snap-always h-screen w-full relative flex flex-col justify-center" id="cta">
          <div className="max-w-container-max px-margin-mobile md:px-margin-desktop w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter text-center border-y border-outline-variant/30 py-20 bg-white rounded-2xl shadow-sm">
              <div className="py-4">
                <p className="font-headline-xl text-4xl font-bold text-primary mb-2">56</p>
                <p className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Automatic Looms
                </p>
              </div>
              <div className="py-4 border-t md:border-t-0 md:border-x border-outline-variant/30">
                <p className="font-headline-xl text-4xl font-bold text-primary mb-2">4 Tons/Day</p>
                <p className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Dyeing Capacity
                </p>
              </div>
              <div className="py-4 border-t md:border-t-0 md:border-r border-outline-variant/30">
                <p className="font-headline-xl text-4xl font-bold text-primary mb-2">5-Level</p>
                <p className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Quality Inspection
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

        {/* Section 8: Footer */}
        <section className="snap-start h-auto w-full relative">
          <Footer />
        </section>
      </main>
    </div>
  )
}

export default Infrastructure
