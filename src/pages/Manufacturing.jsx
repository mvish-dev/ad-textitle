import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import Footer from '../components/layout/Footer.jsx'
import ThreadPath from '../components/motion/ThreadPath.jsx'
import CountUp from '../components/motion/CountUp.jsx'
import WebGLScene from '../components/motion/WebGLScene.jsx'
import SplitTextReveal from '../components/motion/SplitTextReveal.jsx'
import AnimatedContent from '../components/motion/AnimatedContent.jsx'
import LogoLoop from '../components/motion/LogoLoop.jsx'
import DriftWall from '../components/motion/DriftWall.jsx'
import ScrollStack, { ScrollStackItem } from '../components/motion/ScrollStack.jsx'
import Carousel from '../components/motion/Carousel.jsx'
import { scrollTo } from '../lib/lenis.js'
import Seo from '../components/common/Seo.jsx'

// Every process chapter uses static photography with a Ken Burns zoom.
// Photography below is placeholder stock, standing in for client-supplied
// facility photos on the newer chapters (Knitting, Warehouse) added for the
// updated sitemap — reused from the closest existing chapter where a
// dedicated photo isn't available yet.
import processVideo from '../assets/videos/manufacture.mp4'

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

const RAIL_PATH = 'M4,0 L4,400'

const MARQUEE_ITEMS = [
  { icon: 'format_color_fill', label: 'Italian Cheese Dyeing' },
  { icon: 'grid_4x4', label: 'Somet Rapier Looms' },
  { icon: 'texture', label: 'Korean Knitting Machines' },
  { icon: 'auto_awesome', label: 'Garuda & Toshiba Embroidery' },
  { icon: 'design_services', label: '200 Jack Sewing Machines' },
  { icon: 'workspace_premium', label: 'SA8000 Certified' },
  { icon: 'eco', label: 'ISO 14001' },
  { icon: 'fact_check', label: '2-Layer AQL Inspection' },
  { icon: 'public', label: 'Exporting Since 1992' },
].map((item, i) => ({
  id: i,
  node: (
    <span className="inline-flex items-center gap-2.5 text-white/70">
      <Icon name={item.icon} className="text-secondary text-lg" />
      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] whitespace-nowrap">{item.label}</span>
    </span>
  ),
}))

const GALLERY_PHOTOS = [
  { image: dyeingPhoto, title: 'Dyeing Floor' },
  { image: weavingPhoto, title: 'Weaving Hall' },
  { image: cuttingPhoto, title: 'Cutting Room' },
  { image: checkingPhoto, title: 'Quality Inspection' },
  { image: packingPhoto, title: 'Packing Line' },
]
const GALLERY_ITEMS = Array.from({ length: 18 }, (_, i) => GALLERY_PHOTOS[i % GALLERY_PHOTOS.length])

const ASSURANCE_STEPS = [
  {
    step: '01',
    title: 'In-Line Inspection',
    description: 'Quality checks at every stage of production, not just at the end — measurement accuracy, appearance and construction verified as work moves through the floor.',
    bg: 'bg-primary',
  },
  {
    step: '02',
    title: 'Final AQL Inspection',
    description: 'A final AQL-standard inspection clears every order before dispatch, for zero-compromise quality on the pieces that leave the facility.',
    bg: 'bg-[#1e293b]',
  },
  {
    step: '03',
    title: 'Custom & À La Carte Packing',
    description: 'Exporting since 1992, we pack to each customer’s specification — from custom embellished packing to à la carte options built for long-haul shipping.',
    bg: 'bg-[#A8834A]',
  },
  {
    step: '04',
    title: 'Warehouse Consolidation',
    description: 'Organized racking and inventory tracking keep finished goods accounted for from production floor to container, ready for dispatch.',
    bg: 'bg-[#0b1220]',
  },
]

const CERTIFICATION_ITEMS = [
  { id: 1, icon: 'workspace_premium', title: 'SA8000', description: 'Social accountability certification covering fair labour practices across our facility.' },
  { id: 2, icon: 'eco', title: 'ISO 14001', description: 'Environmental management system certification for responsible manufacturing.' },
  { id: 3, icon: 'science', title: 'Azo-Free Dyes', description: 'Every dye lot screened azo-free — safe for skin contact and export compliance.' },
  { id: 4, icon: 'fact_check', title: '2-Layer AQL Inspection', description: 'In-line plus final AQL-standard inspection on every order before dispatch.' },
  { id: 5, icon: 'water_drop', title: 'Effluent Treatment', description: 'ETP, Reverse Osmosis and VSEP plants treat process water before discharge.' },
]

// Consistent "chapter" chrome (eyebrow, title, copy, alternating media panel)
// shared by all nine process stages — each stage supplies its own stat
// tiles / checklist / badge as children. Every reveal is a plain
// scroll-into-view animation (no pin, no scrub), so a stage is never stuck
// hidden at initial paint the way the previous pinned timeline could be.
function Chapter({ id, num, eyebrow, title, description, media, reverse, children }) {
  return (
    <section id={id} className="mfg-chapter relative w-full py-20 md:py-28 scroll-mt-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <AnimatedContent direction="horizontal" reverse={reverse} distance={60} className={reverse ? 'md:order-2' : ''}>
          <span className="eyebrow mb-4 block">
            {num} / {eyebrow}
          </span>
          <h2 className="section-title mb-6">{title}</h2>
          <p className="font-body-md text-[0.9rem] text-on-surface-variant mb-10 max-w-lg leading-relaxed">
            {description}
          </p>
          {children}
        </AnimatedContent>
        <AnimatedContent direction="vertical" distance={50} className={reverse ? 'md:order-1' : ''}>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/20 bg-surface-container-low">
            {media}
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}

function StatTile({ icon, label, sub }) {
  return (
    <div className="p-5 bg-white border border-outline-variant/20 rounded-xl shadow-sm">
      <Icon name={icon} className="text-secondary mb-3 text-2xl block" />
      <p className="font-label-md text-xs font-semibold uppercase tracking-wider text-primary">{label}</p>
      <p className="text-[11px] text-on-surface-variant mt-1">{sub}</p>
    </div>
  )
}

function Manufacturing() {
  const journeyRef = useRef(null)
  const [activeChapter, setActiveChapter] = useState(SIDE_NAV_ITEMS[0].id)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  useEffect(() => {
    const sections = SIDE_NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
        setActiveChapter(topMost.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    scrollTo(`#${id}`)
  }

  return (
    <div className="relative">
      <Seo
        title="Manufacturing Capabilities"
        description="From dyeing and weaving to stitching, checking and packing, explore AD Textile's fully integrated manufacturing process across every production chapter."
      />

      {/* Hero */}
      <section className="relative h-screen min-h-[640px] w-full flex items-end overflow-hidden bg-primary text-white">
        <WebGLScene
          loader={() => import('../components/motion/Threads.jsx')}
          className="absolute inset-0"
          color={[0.773, 0.616, 0.373]}
          amplitude={1.3}
          distance={0.25}
          enableMouseInteraction
          fallback={<div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1e293b] to-primary" />}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/10 pointer-events-none" />
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-20 md:pb-28">
          <span className="eyebrow !text-secondary mb-5 block">Manufacturing Capabilities</span>
          <SplitTextReveal
            tag="h1"
            text="From Fibre to Finished Product"
            splitType="words"
            delay={40}
            duration={1}
            textAlign="left"
            className="font-headline-xl text-white text-[clamp(2.2rem,1.7rem+3vw,4.75rem)] leading-[1.08] font-bold mb-8 max-w-4xl"
          />
          <p className="font-body-md text-white/75 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Nine fully integrated production stages — dyeing, weaving, knitting, cutting, embroidery, stitching,
            checking, packing and warehousing — under one roof in Karur, India.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button to="#dyeing" variant="primary" size="lg">
              Explore The Process
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Request A Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Looping capability marquee */}
      <section className="bg-primary py-6 border-y border-white/10 overflow-hidden">
        <LogoLoop
          logos={MARQUEE_ITEMS}
          speed={55}
          gap={56}
          logoHeight={20}
          fadeOut
          fadeOutColor="#0F172A"
          ariaLabel="Manufacturing capabilities and certifications"
        />
      </section>

      {/* SideNavBar — progress rail highlighted via IntersectionObserver */}
      <aside className="fixed left-6 xl:left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 items-center bg-transparent hidden md:flex">
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
              className="group relative flex flex-col items-center z-10 bg-[#F8F7F4]/85 backdrop-blur-sm rounded-full p-1.5 border border-outline-variant/30"
            >
              <a
                className={`transition-all duration-300 scale-100 hover:scale-125 cursor-pointer flex items-center justify-center ${
                  isActive ? 'text-secondary scale-115' : 'text-on-surface-variant hover:text-primary'
                }`}
                href={`#${item.id}`}
                title={item.label}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                <Icon name={item.icon} className="text-lg" />
              </a>
              <span className="absolute left-11 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] uppercase tracking-wider px-3 py-1.5 whitespace-nowrap rounded font-semibold pointer-events-none">
                {item.label}
              </span>
            </div>
          )
        })}
      </aside>

      <main className="w-full bg-background">
        {/* Watch Our Process — video trailer */}
        <section className="w-full bg-background py-20 md:py-28">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="eyebrow mb-4 block">See It In Motion</span>
              <h2 className="section-title mb-4">
                Watch Our <em>Process</em>
              </h2>
              <p className="text-on-surface-variant text-sm">
                A tour through the AD Textile facility, from dyeing and weaving to finishing and dispatch.
              </p>
            </div>
            <div
              onClick={() => setIsVideoModalOpen(true)}
              className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/20 bg-primary cursor-pointer group"
            >
              <img
                src={weavingPhoto}
                alt="AD Textile manufacturing facility"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-75"
              />
              <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
                <div className="w-20 h-20 rounded-full bg-white/10 group-hover:bg-secondary/90 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/20 group-hover:border-transparent transition-all duration-300">
                  <Icon name="play_arrow" className="text-4xl translate-x-0.5" />
                </div>
                <span className="font-label-md text-xs font-semibold uppercase tracking-widest drop-shadow-md">
                  Watch The Full Tour
                </span>
              </div>
            </div>
          </div>
        </section>

        <div ref={journeyRef} className="relative">
          <Chapter
            id="dyeing"
            num="01"
            eyebrow="Coloration"
            title={<>Precision <em>Color</em> Science</>}
            description="Our in-house dyeing facility features imported Italian Cheese Dyeing Machines, ensuring superior dye penetration, exceptional colour fastness, and consistent quality across a wide variety of yarn types and blends."
            media={<img src={dyeingPhoto} alt="Azo-free dye vats at AD Textile" className="absolute inset-0 w-full h-full object-cover kenburns" />}
          >
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              <StatTile icon="format_color_fill" label="Italian Cheese Dyeing" sub="Imported Machines" />
              <StatTile icon="monitoring" label="3 Tons/Day" sub="Daily Production Capacity" />
            </div>
          </Chapter>

          <Chapter
            id="weaving"
            num="02"
            eyebrow="Structural Integrity"
            title="The Architecture of Fabric"
            description="Our in-house weaving facility is equipped with Somet Super Excel Rapier Looms, enabling the production of premium woven fabrics with exceptional precision, consistency, and durability across a wide range of yarn counts."
            media={<img src={weavingPhoto} alt="Automatic weaving looms at AD Textile" className="absolute inset-0 w-full h-full object-cover kenburns" />}
            reverse
          >
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              <StatTile icon="precision_manufacturing" label="Somet Rapier Looms" sub="Super Excel Series" />
              <StatTile icon="speed" label="1M Metres/Month" sub="Production Capacity" />
            </div>
          </Chapter>

          <Chapter
            id="knitting"
            num="03"
            eyebrow="Loop Formation"
            title={<>Precision in Every <em>Loop</em></>}
            description="Our advanced knitting facility is equipped with 50 imported Korean Single Cylinder Knitting Machines, producing Full Terry, Half Terry, Plain, Jacquard and Lurex knitted products — from infant baby socks to football socks — supported by a fully integrated composite unit for linking, washing, setting and ironing."
            media={<img src={weavingPhoto} alt="Knitted fabric structures at AD Textile" className="absolute inset-0 w-full h-full object-cover kenburns" />}
          >
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              <StatTile icon="texture" label="50 Knitting Machines" sub="Imported Korean, Single Cylinder" />
              <StatTile icon="tune" label="5 Lakh Pairs/Month" sub="Production Capacity" />
            </div>
          </Chapter>

          <Chapter
            id="cutting"
            num="04"
            eyebrow="Precision"
            title={<em>Cutting</em>}
            description="Our in-house cutting facility is designed to deliver precision, consistency and efficiency across every production run. Using advanced cutting techniques and skilled workmanship, we ensure accurate pattern cutting, uniform dimensions, and minimal material wastage — a strong foundation for high-quality finished products."
            media={<img src={cuttingPhoto} alt="Precision fabric cutting at AD Textile" className="absolute inset-0 w-full h-full object-cover kenburns" />}
            reverse
          >
            <div className="flex flex-wrap gap-4">
              <Button to="/contact" variant="primary">Get In Touch</Button>
              <Button to="/contact" variant="outline" className="text-primary border-primary">Request Details</Button>
            </div>
          </Chapter>

          <Chapter
            id="embroidery"
            num="05"
            eyebrow="Embellishment"
            title={<em>Embroidery</em>}
            description="Our advanced embroidery facility is equipped with Garuda and Toshiba embroidery machines, featuring 54 embroidery heads supporting 10 to 12 thread colours, dedicated sampling capabilities, and precision digitising — delivering intricate, premium designs across our home textile ranges."
            media={<img src={checkingPhoto} alt="Embroidery detailing at AD Textile" className="absolute inset-0 w-full h-full object-cover kenburns" />}
          >
            <ul className="space-y-3">
              {['Garuda & Toshiba, 54 Heads (10–12 Colours)', 'Precision Digitising', 'Dedicated Sampling Capabilities'].map((label) => (
                <li key={label} className="flex items-center gap-4">
                  <Icon name="check_circle" className="text-secondary text-xl" />
                  <span className="font-label-md text-xs uppercase tracking-wider text-primary font-semibold">{label}</span>
                </li>
              ))}
            </ul>
          </Chapter>

          <Chapter
            id="stitching"
            num="06"
            eyebrow="Construction"
            title={<em>Stitching</em>}
            description="Our advanced stitching facility runs 200 Jack sewing machines on the production floor, supported by a skilled workforce of 100 skilled and 100 semi-skilled professionals specialising in garment and sock linking operations — converting cut and embroidered panels into finished, quality-checked pieces at high volume."
            media={<img src={cuttingPhoto} alt="Stitching production line at AD Textile" className="absolute inset-0 w-full h-full object-cover kenburns" />}
            reverse
          >
            <div className="flex flex-wrap gap-4">
              <Button to="/contact" variant="primary">Get In Touch</Button>
              <Button to="/contact" variant="outline" className="text-primary border-primary">Request Details</Button>
            </div>
          </Chapter>

          <Chapter
            id="checking-quality"
            num="07"
            eyebrow="Assurance"
            title={<>Checking &amp; Quality <em>Control</em></>}
            description="Our dedicated Quality Control team follows a comprehensive 2-layer inspection system to ensure every product meets the highest standards of quality and accuracy — evaluated for measurement accuracy, appearance, and packing at every stage."
            media={<img src={checkingPhoto} alt="Quality inspection and finishing at AD Textile" className="absolute inset-0 w-full h-full object-cover kenburns" />}
          >
            <div className="space-y-5">
              {[
                { n: '01', title: 'In-Line Inspection', sub: 'Layer 1: quality checks at every stage of production, not just at the end.' },
                { n: '02', title: 'Final AQL Inspection', sub: 'Layer 2: final AQL-standard inspection before dispatch, for zero-compromise quality.' },
              ].map((row) => (
                <div key={row.n} className="flex items-start gap-5">
                  <div className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-white shrink-0 font-bold text-sm shadow-md">
                    {row.n}
                  </div>
                  <div>
                    <p className="font-label-md text-sm uppercase tracking-widest text-primary font-semibold mb-1">{row.title}</p>
                    <p className="text-xs text-on-surface-variant">{row.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </Chapter>

          <Chapter
            id="packing"
            num="08"
            eyebrow="Fulfilment"
            title={<em>Packing</em>}
            description="AD Textile has been exporting since 1992. We offer packing in various types as per customer requirements — from custom-specific packing with embellishments to à la carte packing tailored to each client's needs — every shipment is prepared to withstand the rigors of long-haul shipping."
            media={<img src={packingPhoto} alt="Export packing operations at AD Textile" className="absolute inset-0 w-full h-full object-cover kenburns" />}
            reverse
          >
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              <StatTile icon="calendar_month" label="1992" sub="Exporting Since" />
              <StatTile icon="inventory_2" label="Custom & À La Carte" sub="Packing Options" />
            </div>
          </Chapter>

          <Chapter
            id="warehouse"
            num="09"
            eyebrow="Storage & Fulfilment"
            title="Warehouse"
            description="Our warehouse manages raw material storage, work-in-progress staging and finished-goods consolidation ahead of dispatch, with organized racking and inventory tracking that keeps every order accounted for from production floor to container."
            media={<img src={packingPhoto} alt="Warehouse and finished-goods storage at AD Textile" className="absolute inset-0 w-full h-full object-cover kenburns" />}
          >
            <div className="space-y-3">
              {['Organized Racking & Inventory Tracking', 'Finished-Goods Consolidation for Dispatch'].map((label) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-px bg-secondary" />
                  <span className="font-label-md text-xs uppercase tracking-wider font-semibold text-primary">{label}</span>
                </div>
              ))}
            </div>
          </Chapter>
        </div>

        {/* Facility gallery — drifting photo wall */}
        <section className="relative h-[560px] md:h-[720px] w-full overflow-hidden bg-[#0b1220]">
          <DriftWall
            items={GALLERY_ITEMS}
            columns={6}
            tileWidth={190}
            tileHeight={128}
            gap={16}
            speed={28}
            overlayColor="#0F172A"
            parallax={0.5}
            pauseOnHover
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <span className="eyebrow !text-secondary mb-4">Inside The Facility</span>
            <h2 className="section-title !text-white max-w-2xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              A Living Look at the <em>Production Floor</em>
            </h2>
          </div>
        </section>

        {/* Quality assurance journey — scroll-stacked cards */}
        <section className="w-full bg-background py-24 md:py-32">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="eyebrow mb-4 block">Assurance</span>
              <h2 className="section-title mb-4">
                Every Order, <em>Verified</em> Twice
              </h2>
              <p className="text-on-surface-variant text-sm">Scroll inside the panel to step through the journey from floor to container.</p>
            </div>
            <div className="h-[520px] rounded-[32px] border border-outline-variant/20 shadow-[0_20px_60px_rgba(15,23,42,0.1)] overflow-hidden">
              <ScrollStack itemDistance={60} itemStackDistance={24} baseScale={0.9} rotationAmount={0.5} blurAmount={1}>
                {ASSURANCE_STEPS.map((item) => (
                  <ScrollStackItem key={item.step} itemClassName={`${item.bg} text-white flex items-center`}>
                    <div className="flex items-center gap-8 w-full">
                      <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-full bg-white/10 border border-white/20 font-headline-lg text-2xl font-bold">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-headline-lg text-2xl mb-2">{item.title}</p>
                        <p className="text-sm text-white/70 leading-relaxed max-w-xl">{item.description}</p>
                      </div>
                    </div>
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </div>
          </div>
        </section>

        {/* Certifications & standards carousel */}
        <section className="w-full bg-primary py-24 md:py-28">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center">
            <span className="eyebrow !text-secondary mb-4">Certified & Compliant</span>
            <h2 className="section-title !text-white mb-12 text-center">Standards We Hold Ourselves To</h2>
            <Carousel items={CERTIFICATION_ITEMS} baseWidth={300} autoplay autoplayDelay={3500} pauseOnHover loop />
          </div>
        </section>

        {/* Stats & Footer CTA */}
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

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setIsVideoModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden z-10 shadow-2xl aspect-video border border-white/10"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white/80 hover:text-white transition-all cursor-pointer z-20 border border-white/10"
                aria-label="Close video"
              >
                <Icon name="close" className="text-xl" />
              </button>
              <video src={processVideo} controls autoPlay className="w-full h-full object-contain" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Manufacturing
