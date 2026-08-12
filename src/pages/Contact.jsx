import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Icon from '../components/ui/Icon.jsx'
import Button from '../components/ui/Button.jsx'
import RevealText from '../components/motion/RevealText.jsx'
import MagneticButton from '../components/motion/MagneticButton.jsx'
import WebGLScene from '../components/motion/WebGLScene.jsx'

const MAP_MARKERS = [
  { id: 'hq', label: 'Karur HQ, India', top: '56%', left: '68%', detail: 'Primary Vertically Integrated Mill & Headquarters', type: 'hq' },
  { id: 'eu', label: 'European Market Link', top: '34%', left: '49%', detail: 'Frankfurt & Rotterdam major container paths', type: 'export' },
  { id: 'na', label: 'North American Market Link', top: '36%', left: '22%', detail: 'East Coast retail warehousing integrations', type: 'export' },
]

function Contact() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('enquiry') // 'enquiry' | 'quote'
  const [liveTime, setLiveTime] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  const [hoveredMarker, setHoveredMarker] = useState(null)
  
  // Clipboard copy state
  const [copied, setCopied] = useState(false)

  // Form states
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General Partnership',
    message: '',
    categories: [],
    quantity: '1,000 - 5,000 pcs',
    specs: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Initialize message from query params (e.g. from product details)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const product = queryParams.get('product')
    const category = queryParams.get('category')
    if (product) {
      setFormState((prev) => ({
        ...prev,
        subject: 'Product Sourcing Quote',
        message: `Hi, I am interested in inquiring about product "${product}" from the "${category || 'Home Textile'}" collection. Please provide manufacturing specifications, pricing tiers, and minimum order quantity.`,
      }))
      setActiveTab('quote') // Switch to request quote directly if linking a product
    }
  }, [location])

  // Live India Time & Availability tracker
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      const formatter = new Intl.DateTimeFormat('en-US', options)
      setLiveTime(formatter.format(new Date()))

      // Open Mon-Fri 9:00 AM - 6:00 PM IST
      const indiaDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
      const day = indiaDate.getDay() // 0 = Sunday, 6 = Saturday
      const hours = indiaDate.getHours()
      const isWeekday = day >= 1 && day <= 5
      const isWorkingHours = hours >= 9 && hours < 18
      setIsOpen(isWeekday && isWorkingHours)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('1/104, Sanjay Nagar, Erode Road, Athur Post, Karur - 639002, Tamil Nadu, India')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const toggleCategory = (cat) => {
    setFormState((prev) => {
      const alreadySelected = prev.categories.includes(cat)
      if (alreadySelected) {
        return { ...prev, categories: prev.categories.filter((c) => c !== cat) }
      } else {
        return { ...prev, categories: [...prev.categories, cat] }
      }
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate luxury API response / notification hook
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1800)
  }

  const resetForm = () => {
    setFormState({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: 'General Partnership',
      message: '',
      categories: [],
      quantity: '1,000 - 5,000 pcs',
      specs: '',
    })
    setIsSubmitted(false)
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pb-28 border-b border-outline-variant/30 bg-gradient-to-b from-[#1E293B]/5 to-transparent">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 z-10 space-y-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow bg-secondary/10 px-3 py-1 rounded-full text-[0.7rem]">
                Global Connectivity
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-outline-variant/30 shadow-xs">
                <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-400'}`} />
                <span className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider">
                  HQ: {isOpen ? 'Open Now' : 'Closed'} ({liveTime || 'IST'})
                </span>
              </div>
            </div>

            <RevealText as="h1" scrollTriggered={false} delay={0.1} className="section-title text-4xl md:text-5xl lg:text-6xl leading-tight font-light text-primary">
              Connect with Global <br />
              <em className="font-serif italic font-normal text-secondary">Excellence</em>
            </RevealText>

            <p className="font-body-md text-on-surface-variant max-w-xl leading-relaxed text-sm md:text-base">
              Bridging international retail demands with certified, vertically integrated manufacturing. Reach our commercial coordinators or request a custom fabrication contract proposal directly below.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact-form-section"
                className="inline-flex items-center gap-2 bg-primary hover:bg-[#1E293B] text-white font-label-md text-xs font-semibold uppercase tracking-wider py-4 px-8 rounded-full transition-all shadow-md hover:-translate-y-0.5"
              >
                Inquire Directly
                <Icon name="arrow_downward" className="text-sm" />
              </a>
              <a
                href="#factory-location"
                className="inline-flex items-center gap-2 border border-outline-variant/60 hover:border-secondary hover:text-secondary text-primary font-label-md text-xs font-semibold uppercase tracking-wider py-4 px-8 rounded-full transition-all"
              >
                Facility Location
              </a>
            </div>
          </motion.div>

          {/* Right Map Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative aspect-video sm:aspect-square lg:aspect-auto lg:h-[480px] rounded-2xl bg-primary shadow-2xl overflow-hidden border border-white/5"
          >
            {/* Ambient Background Glow (WebGL Orb fallback) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
              <WebGLScene
                loader={() => import('../components/motion/Orb.jsx')}
                className="absolute inset-0"
                hue={35}
                hoverIntensity={0.2}
                backgroundColor="#0F172A"
              />
            </div>

            {/* Vector Styling Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
              <div>
                <p className="text-[0.65rem] text-secondary font-semibold uppercase tracking-widest">Global Logistics Routing</p>
                <h4 className="text-white text-base font-serif italic mt-1">Karur HQ to International Ports</h4>
              </div>

              {/* Styled Interactive SVG Map Overlay */}
              <div className="relative w-full h-[260px] my-auto">
                <svg viewBox="0 0 800 400" className="w-full h-full text-white/5">
                  {/* Stylized world grid dots */}
                  <g fill="rgba(255,255,255,0.06)">
                    {/* North America representation */}
                    <circle cx="150" cy="120" r="25" />
                    <circle cx="180" cy="150" r="35" />
                    <circle cx="210" cy="180" r="15" />
                    {/* Europe representation */}
                    <circle cx="420" cy="100" r="20" />
                    <circle cx="450" cy="120" r="30" />
                    <circle cx="480" cy="140" r="20" />
                    {/* Asia representation */}
                    <circle cx="600" cy="120" r="25" />
                    <circle cx="650" cy="160" r="40" />
                    <circle cx="700" cy="190" r="20" />
                    {/* India representation */}
                    <circle cx="580" cy="220" r="15" fill="rgba(197,157,95,0.2)" />
                  </g>

                  {/* Route Paths */}
                  {/* Karur to EU */}
                  <path
                    d="M 580,220 Q 500,160 450,120"
                    fill="none"
                    stroke="var(--color-secondary)"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    className="opacity-70"
                  />
                  {/* Karur to US East */}
                  <path
                    d="M 580,220 Q 380,100 180,150"
                    fill="none"
                    stroke="var(--color-secondary)"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    className="opacity-70"
                  />

                  {/* Pulsing marker links */}
                  {MAP_MARKERS.map((marker) => {
                    const isActive = hoveredMarker === marker.id
                    return (
                      <g
                        key={marker.id}
                        onMouseEnter={() => setHoveredMarker(marker.id)}
                        onMouseLeave={() => setHoveredMarker(null)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={marker.left}
                          cy={marker.top}
                          r={marker.type === 'hq' ? '8' : '5'}
                          className={`fill-secondary ${marker.type === 'hq' ? 'animate-pulse' : ''}`}
                        />
                        <circle
                          cx={marker.left}
                          cy={marker.top}
                          r={marker.type === 'hq' ? '18' : '12'}
                          className="fill-transparent stroke-secondary/40 stroke-[1.5px] animate-ping"
                        />
                      </g>
                    )
                  })}
                </svg>

                {/* Floating Map Labels */}
                {MAP_MARKERS.map((marker) => (
                  <div
                    key={marker.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ top: marker.top, left: marker.left }}
                  >
                    {hoveredMarker === marker.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: -35, scale: 1 }}
                        className="bg-white text-primary p-3 rounded-lg shadow-xl border border-secondary/20 z-50 w-52 text-left"
                      >
                        <p className="text-[0.7rem] font-bold text-secondary uppercase tracking-wider">
                          {marker.type === 'hq' ? 'Global Headquarters' : 'Export Lane Destination'}
                        </p>
                        <p className="text-xs font-semibold text-primary mt-0.5">{marker.label}</p>
                        <p className="text-[0.65rem] text-on-surface-variant mt-1 leading-normal">{marker.detail}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4 text-[0.65rem] text-white/50 uppercase tracking-widest font-mono">
                <span>COORD: 10.9754° N, 78.0323° E</span>
                <span>VERTICALLY INTEGRATED SCALE</span>
              </div>
            </div>
          </motion.div>

        </Container>
      </section>

      {/* Main Dual-Form & Details Grid Section */}
      <section className="py-20 md:py-28" id="contact-form-section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Dual Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-white border border-outline-variant/30 rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Tab Switcher Headers */}
              <div className="flex border-b border-outline-variant/30 bg-slate-50/50 p-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('enquiry')
                    resetForm()
                  }}
                  className={`flex-1 py-4 text-center rounded-xl font-label-md text-xs font-semibold uppercase tracking-wider transition-all relative cursor-pointer ${
                    activeTab === 'enquiry' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {activeTab === 'enquiry' && (
                    <motion.div
                      layoutId="activeFormTab"
                      className="absolute inset-0 bg-white border border-outline-variant/40 shadow-sm rounded-xl z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Icon name="mail" className="text-sm" />
                    Sales Enquiry
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('quote')
                    resetForm()
                  }}
                  className={`flex-1 py-4 text-center rounded-xl font-label-md text-xs font-semibold uppercase tracking-wider transition-all relative cursor-pointer ${
                    activeTab === 'quote' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {activeTab === 'quote' && (
                    <motion.div
                      layoutId="activeFormTab"
                      className="absolute inset-0 bg-white border border-outline-variant/40 shadow-sm rounded-xl z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Icon name="request_quote" className="text-sm" />
                    Request a Quote
                  </span>
                </button>
              </div>

              {/* Form Content Area */}
              <div className="p-8 md:p-12 relative min-h-[480px]">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="submitted-state"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-500 animate-bounce">
                        <Icon name="check_circle" className="text-3xl" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-headline-lg text-2xl text-primary font-bold">Proposal Request Submitted</h3>
                        <p className="text-on-surface-variant text-sm max-w-sm mx-auto leading-relaxed">
                          Your coordinates have been registered. A commercial representative will review your custom specifications and follow up within 24 business hours.
                        </p>
                      </div>
                      <div className="pt-4 flex gap-4">
                        <button
                          onClick={resetForm}
                          className="px-6 py-3 border border-outline-variant/60 rounded-full font-label-md text-xs uppercase tracking-wider text-primary hover:bg-slate-50 cursor-pointer transition-all"
                        >
                          New Inquiry
                        </button>
                        <a
                          href="mailto:senthil@adtextile.com"
                          className="px-6 py-3 bg-primary text-white rounded-full font-label-md text-xs uppercase tracking-wider hover:bg-[#1E293B] cursor-pointer transition-all flex items-center gap-2"
                        >
                          Email Directly
                          <Icon name="arrow_forward" className="text-xs" />
                        </a>
                      </div>
                    </motion.div>
                  ) : isSubmitting ? (
                    <motion.div
                      key="submitting-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-white/90 backdrop-blur-xs z-20 flex flex-col items-center justify-center space-y-4"
                    >
                      <div className="w-12 h-12 rounded-full border-4 border-secondary/20 border-t-secondary animate-spin" />
                      <p className="font-label-md text-xs font-semibold uppercase tracking-widest text-primary">
                        Processing Commercial Data...
                      </p>
                    </motion.div>
                  ) : activeTab === 'enquiry' ? (
                    <motion.form
                      key="enquiry-form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleFormSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Work Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleInputChange}
                            placeholder="john@retailbrands.com"
                            className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 019-2834"
                            className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Company Name</label>
                          <input
                            type="text"
                            name="company"
                            required
                            value={formState.company}
                            onChange={handleInputChange}
                            placeholder="Retail Sourcing Corp"
                            className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Inquiry Subject</label>
                        <select
                          name="subject"
                          value={formState.subject}
                          onChange={handleInputChange}
                          className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all"
                        >
                          <option value="General Partnership">General B2B Partnership</option>
                          <option value="Global Distribution">Global Export & Distribution</option>
                          <option value="Sustainability Compliance">Sustainability & Certifications</option>
                          <option value="Other">Other General Request</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Your Message</label>
                        <textarea
                          name="message"
                          required
                          rows="4"
                          value={formState.message}
                          onChange={handleInputChange}
                          placeholder="Please provide details regarding your required sourcing setup..."
                          className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all resize-none"
                        />
                      </div>

                      <MagneticButton className="block w-full" strength={0.1}>
                        <button
                          type="submit"
                          className="w-full py-4 bg-primary hover:bg-[#1E293B] text-white font-label-md text-xs font-semibold uppercase tracking-widest transition-all rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                          Submit Enquiry
                          <Icon name="arrow_forward" className="text-sm" />
                        </button>
                      </MagneticButton>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="quote-form"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleFormSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleInputChange}
                            placeholder="Jane Smith"
                            className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Work Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleInputChange}
                            placeholder="j.smith@nordicdesign.com"
                            className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Company Name</label>
                          <input
                            type="text"
                            name="company"
                            required
                            value={formState.company}
                            onChange={handleInputChange}
                            placeholder="Nordic Design Group AB"
                            className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Target Delivery Volume</label>
                          <select
                            name="quantity"
                            value={formState.quantity}
                            onChange={handleInputChange}
                            className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all"
                          >
                            <option value="500 - 1,000 pcs">500 - 1,000 pcs (MOQ Tier)</option>
                            <option value="1,000 - 5,000 pcs">1,000 - 5,000 pcs</option>
                            <option value="5,000 - 10,000 pcs">5,000 - 10,000 pcs</option>
                            <option value="10,000+ pcs">10,000+ pcs (Enterprise Scale)</option>
                          </select>
                        </div>
                      </div>

                      {/* Product categories choice */}
                      <div className="space-y-2.5">
                        <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Product Segments Required</label>
                        <div className="flex flex-wrap gap-2.5">
                          {['Bed Linen', 'Kitchen Linen', 'Table Linen', 'Living Linen', 'Custom Fabric'].map((cat) => {
                            const isSelected = formState.categories.includes(cat)
                            return (
                              <button
                                type="button"
                                key={cat}
                                onClick={() => toggleCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-secondary/15 text-secondary border-secondary'
                                    : 'bg-background text-on-surface-variant border-outline-variant/40 hover:border-secondary'
                                }`}
                              >
                                {cat}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Custom Specifications / Fiber Blend</label>
                        <textarea
                          name="specs"
                          rows="3"
                          value={formState.specs}
                          onChange={handleInputChange}
                          placeholder="Enter requirements like Thread Count (TC), Azo-free dyeing requests, custom printing, GOTS certificates needed, etc."
                          className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block">Message (Optional)</label>
                        <textarea
                          name="message"
                          rows="2"
                          value={formState.message}
                          onChange={handleInputChange}
                          placeholder="Any details about timeline, delivery location, port of loading etc."
                          className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-secondary hover:bg-[#A8834A] text-white font-label-md text-xs font-semibold uppercase tracking-widest transition-all rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:-translate-y-0.5"
                      >
                        Request Quote Proposal
                        <Icon name="arrow_forward" className="text-sm" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Side: Factory Address & Location details */}
            <div className="lg:col-span-5 space-y-12">
              
              {/* Facility details */}
              <motion.div
                id="factory-location"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-outline-variant/30 rounded-2xl p-8 shadow-sm space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <i className="fa-solid fa-industry text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xs text-secondary uppercase font-semibold tracking-wider">Production Facility</h3>
                    <h2 className="text-primary font-bold text-lg font-serif">AD Textile Headquarters</h2>
                  </div>
                </div>

                <div className="space-y-3 font-body-md text-sm border-l-2 border-secondary/35 pl-4">
                  <p className="text-primary font-semibold text-base leading-snug">
                    1/104, Sanjay Nagar, Erode Road
                  </p>
                  <p className="text-on-surface-variant leading-relaxed">
                    Athur Post, Karur – 639002,<br />
                    Tamil Nadu, India
                  </p>
                </div>

                <div className="pt-2 flex gap-4">
                  <button
                    onClick={handleCopyAddress}
                    className="flex-1 py-3 border border-outline-variant/50 rounded-full font-label-md text-xs uppercase tracking-wider text-primary hover:bg-slate-50 cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <Icon name="content_copy" className="text-sm" />
                    {copied ? 'Copied!' : 'Copy Address'}
                  </button>
                  <a
                    href="#google-map-section"
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 rounded-full font-label-md text-xs uppercase tracking-wider text-primary text-center transition-all flex items-center justify-center gap-2"
                  >
                    View Map
                    <Icon name="open_in_new" className="text-sm" />
                  </a>
                </div>
              </motion.div>

              {/* Working Hours Info Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white border border-outline-variant/30 rounded-2xl p-8 shadow-sm space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <i className="fa-regular fa-clock text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xs text-secondary uppercase font-semibold tracking-wider">Business Timings</h3>
                    <h2 className="text-primary font-bold text-lg font-serif">Hours of Operations</h2>
                  </div>
                </div>

                <div className="space-y-3 font-body-md text-xs text-on-surface-variant">
                  <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                    <span className="font-semibold text-primary">Monday — Friday</span>
                    <span>09:00 AM – 06:00 PM IST</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                    <span className="font-semibold text-primary">Saturday</span>
                    <span>09:00 AM – 01:00 PM IST (Half Day)</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="font-semibold text-primary">Sunday</span>
                    <span className="text-rose-400 font-semibold">Closed</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-outline-variant/20 p-4 rounded-xl flex items-center gap-3.5">
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-400'}`} />
                  <div>
                    <p className="text-xs font-semibold text-primary leading-tight">
                      {isOpen ? 'Commercial desk is currently open' : 'Commercial desk is currently closed'}
                    </p>
                    <p className="text-[0.7rem] text-on-surface-variant mt-0.5">
                      Responding live in Karur, India (UTC +5:30)
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </Container>
      </section>

      {/* Team Profile Cards Section (Contact Details) */}
      <section className="py-20 md:py-28 bg-[#F3F2EF]" id="team-details">
        <Container className="space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="eyebrow">Our Leadership</span>
            <RevealText as="h2" className="section-title text-3xl font-light text-primary">
              Direct Corporate <em className="font-serif italic font-normal text-secondary">Contacts</em>
            </RevealText>
            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Reach out directly to our commercial directors to align on retail volumes, pricing models, export specifications, and customs logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Card 1: D. Senthil Kumar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-outline-variant/30 rounded-2xl p-8 hover:border-secondary hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-[#A8834A] text-white flex items-center justify-center font-serif text-lg font-bold shadow-md">
                      DS
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-primary">Mr. D. Senthil Kumar</h3>
                      <p className="text-xs text-secondary font-semibold uppercase tracking-wider mt-0.5">Commercial Director</p>
                    </div>
                  </div>
                  <span className="bg-primary/5 text-primary text-[0.62rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                    Sales & Contracts
                  </span>
                </div>

                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Responsible for global retail accounts, customized production tenders, client onboarding, and bulk supply negotiations.
                </p>

                <div className="border-t border-outline-variant/20 pt-6 space-y-3">
                  <a
                    href="mailto:senthil@adtextile.com"
                    className="flex items-center justify-between text-xs font-semibold text-primary hover:text-secondary group transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Icon name="mail" className="text-base text-on-surface-variant group-hover:text-secondary" />
                      senthil@adtextile.com
                    </span>
                    <Icon name="arrow_forward" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="tel:+919994399077"
                    className="flex items-center justify-between text-xs font-semibold text-primary hover:text-secondary group transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Icon name="call" className="text-base text-on-surface-variant group-hover:text-secondary" />
                      +91 999 43 99 077
                    </span>
                    <Icon name="arrow_forward" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              <div className="pt-8 flex gap-3">
                <a
                  href="mailto:senthil@adtextile.com"
                  className="flex-1 py-3 text-center bg-primary text-white rounded-full font-label-md text-[0.7rem] uppercase font-semibold tracking-wider hover:bg-[#1E293B] transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="mail" className="text-xs" />
                  Email Desk
                </a>
                <a
                  href="https://wa.me/919994399077"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 border border-emerald-500/30 text-emerald-500 rounded-full font-label-md text-xs hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2"
                  title="Connect via WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp text-base" />
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Card 2: S. Deepak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-outline-variant/30 rounded-2xl p-8 hover:border-secondary hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-[#A8834A] text-white flex items-center justify-center font-serif text-lg font-bold shadow-md">
                      SD
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-primary">Mr. S. Deepak</h3>
                      <p className="text-xs text-secondary font-semibold uppercase tracking-wider mt-0.5">Operations Director</p>
                    </div>
                  </div>
                  <span className="bg-primary/5 text-primary text-[0.62rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                    Exports & Quality
                  </span>
                </div>

                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                  Focuses on global shipment logistics, custom clearance documents, production tracking, and GOTS/Oeko-Tex certification compliance.
                </p>

                <div className="border-t border-outline-variant/20 pt-6 space-y-3">
                  <a
                    href="mailto:deepak@adtextile.com"
                    className="flex items-center justify-between text-xs font-semibold text-primary hover:text-secondary group transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Icon name="mail" className="text-base text-on-surface-variant group-hover:text-secondary" />
                      deepak@adtextile.com
                    </span>
                    <Icon name="arrow_forward" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="tel:+919790557077"
                    className="flex items-center justify-between text-xs font-semibold text-primary hover:text-secondary group transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Icon name="call" className="text-base text-on-surface-variant group-hover:text-secondary" />
                      +91 97 90 55 7077
                    </span>
                    <Icon name="arrow_forward" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              <div className="pt-8 flex gap-3">
                <a
                  href="mailto:deepak@adtextile.com"
                  className="flex-1 py-3 text-center bg-primary text-white rounded-full font-label-md text-[0.7rem] uppercase font-semibold tracking-wider hover:bg-[#1E293B] transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="mail" className="text-xs" />
                  Email Desk
                </a>
                <a
                  href="https://wa.me/919790557077"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 border border-emerald-500/30 text-emerald-500 rounded-full font-label-md text-xs hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2"
                  title="Connect via WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp text-base" />
                  WhatsApp
                </a>
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* Interactive Google Map Section */}
      <section className="w-full relative h-[480px] bg-slate-100 border-t border-b border-outline-variant/30 scroll-mt-20 overflow-hidden" id="google-map-section">
        <iframe
          title="AD Textile Location Map"
          allowFullScreen=""
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.8411189853946!2d78.03229361428843!3d10.975362458492565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2edbd75b17db%3A0xd928ababee21246!2sA.D.TEXTILE(P)LTD!5e0!3m2!1sen!2sin!4v1585297930512!5m2!1sen!2sin"
          style={{ border: 0, filter: 'grayscale(0.15) contrast(1.05)' }}
          width="100%"
        />

        {/* Floating Detail Card inside the map */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-start">
          <Container className="w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="pointer-events-auto bg-primary text-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-xs md:max-w-sm ml-4 md:ml-0 border border-white/10"
            >
              <div className="space-y-4">
                <span className="text-[0.62rem] text-secondary font-bold uppercase tracking-widest block">Main Headquarters</span>
                <h4 className="font-serif font-semibold text-lg text-white">A.D. Textile (P) Ltd</h4>
                <p className="text-xs text-white/70 leading-relaxed font-body-md">
                  Karur Erode main highway, Athur Post, Karur region, Tamil Nadu, India. Major hub for global cotton spinning & textile export weaving.
                </p>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                  <a
                    href="https://maps.google.com/?q=A.D.TEXTILE(P)LTD"
                    target="_blank"
                    rel="noreferrer"
                    className="text-secondary font-bold hover:underline flex items-center gap-1.5"
                  >
                    Navigate in Maps
                    <Icon name="open_in_new" className="text-xs" />
                  </a>
                  <span className="text-white/40">Open 09:00 - 18:00</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </div>
      </section>

      {/* Premium Footer CTA (Final Message) */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-15 pointer-events-none z-0">
          <img
            className="w-full h-full object-cover scale-105 brightness-50"
            alt="Premium fabric weaving textures"
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80&auto=format&fit=crop"
          />
        </div>
        
        <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 text-center md:text-left">
            <span className="eyebrow text-secondary">Start Sourcing</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
              Scale Your Next Textile Partnership with <br />
              <span className="italic text-secondary font-serif">Absolute Reliability</span>
            </h2>
            <p className="font-body-md text-white/70 max-w-2xl leading-relaxed text-sm md:text-base">
              From organic fiber selection and custom printing to international logistics, our vertical integration guarantees pricing consistency, absolute quality, and scalable supply.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <MagneticButton strength={0.15}>
              <a
                href="#contact-form-section"
                className="inline-block py-5 px-10 bg-white hover:bg-secondary-fixed text-primary hover:text-primary font-label-md text-xs font-semibold uppercase tracking-widest rounded-full shadow-2xl hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] transition-all cursor-pointer text-center whitespace-nowrap"
              >
                Request Custom Proposal
              </a>
            </MagneticButton>
          </div>
        </Container>

        {/* Global Compliance Certifications */}
        <div className="mt-16 pt-8 border-t border-white/5 relative z-10">
          <Container className="flex flex-wrap justify-center md:justify-between items-center gap-8 text-[0.62rem] text-white/40 uppercase tracking-widest">
            <div className="flex gap-8">
              <span>● OEKO-TEX® CERTIFIED</span>
              <span>● GOTS CERTIFIED</span>
              <span>● ISO 9001:2015 COMPLIANT</span>
              <span>● SOCIAL AUDIT COMPLIANT</span>
            </div>
            <div>
              <span>© {new Date().getFullYear()} AD Textile Pvt Ltd.</span>
            </div>
          </Container>
        </div>
      </section>
    </div>
  )
}

export default Contact
