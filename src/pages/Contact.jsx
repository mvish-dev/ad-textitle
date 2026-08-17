import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import MagneticButton from '../components/motion/MagneticButton.jsx'
import Seo from '../components/common/Seo.jsx'
import ContactHero from '../components/contact/ContactHero.jsx'
import ContactFormCard from '../components/contact/ContactFormCard.jsx'
import FacilityDetails from '../components/contact/FacilityDetails.jsx'
import TeamCards from '../components/contact/TeamCards.jsx'
import LocationMap from '../components/contact/LocationMap.jsx'
import weavingWorkerPlaid from '../assets/images/manufacturing/weaving/weaving-worker-plaid.webp'

const DEFAULT_FORM_STATE = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: 'General Partnership',
  message: '',
  categories: [],
  quantity: '1,000 - 5,000 pcs',
  specs: '',
}

// Pre-fills the enquiry form from a "?product=...&category=..." link (e.g.
// from a product gallery "Enquire" button). Read once at mount via a lazy
// useState initializer instead of an effect, since it only needs to reflect
// the URL at the moment this page mounts.
function getInitialFormState(search) {
  const product = new URLSearchParams(search).get('product')
  if (!product) return DEFAULT_FORM_STATE
  const category = new URLSearchParams(search).get('category')
  return {
    ...DEFAULT_FORM_STATE,
    subject: 'Product Sourcing Quote',
    message: `Hi, I am interested in inquiring about product "${product}" from the "${category || 'Home Textile'}" collection. Please provide manufacturing specifications, pricing tiers, and minimum order quantity.`,
  }
}

function Contact() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() =>
    new URLSearchParams(location.search).get('product') ? 'quote' : 'enquiry'
  )
  const [copied, setCopied] = useState(false)

  const [formState, setFormState] = useState(() => getInitialFormState(location.search))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasSubmitError, setHasSubmitError] = useState(false)

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
    setHasSubmitError(false)

    // No backend is wired up yet, so the one connectivity failure we can
    // genuinely surface is the browser itself being offline — everything
    // else below is a simulated success. Swapping in a real endpoint later
    // is a matter of replacing the setTimeout with a fetch(...).catch(() =>
    // setHasSubmitError(true)) using this same shape.
    if (!navigator.onLine) {
      setHasSubmitError(true)
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1800)
  }

  const retrySubmit = () => {
    setHasSubmitError(false)
  }

  const resetForm = () => {
    setFormState(DEFAULT_FORM_STATE)
    setIsSubmitted(false)
    setHasSubmitError(false)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    resetForm()
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Seo
        title="Contact Us"
        description="Get in touch with AD Textile's commercial team in Karur, India. Request a manufacturing quote, sourcing enquiry, or visit our vertically integrated production facility."
      />

      <ContactHero />

      {/* Main Dual-Form & Details Grid Section */}
      <section className="py-20 md:py-28" id="contact-form-section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <ContactFormCard
              activeTab={activeTab}
              onTabChange={handleTabChange}
              formState={formState}
              onChange={handleInputChange}
              onToggleCategory={toggleCategory}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
              hasSubmitError={hasSubmitError}
              onRetry={retrySubmit}
              onResetForm={resetForm}
            />
            <FacilityDetails copied={copied} onCopyAddress={handleCopyAddress} />
          </div>
        </Container>
      </section>

      <TeamCards />
      <LocationMap />

      {/* Premium Footer CTA (Final Message) */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-15 pointer-events-none z-0">
          <img
            className="w-full h-full object-cover scale-105 brightness-50"
            alt="Premium fabric weaving textures"
            src={weavingWorkerPlaid}
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
          <Container className="flex flex-wrap justify-center md:justify-between items-center gap-8 text-[0.62rem] text-white/60 uppercase tracking-widest">
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
