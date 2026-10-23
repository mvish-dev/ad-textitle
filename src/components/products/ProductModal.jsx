import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import { getLenis } from '../../lib/lenis.js'
import { API_BASE_URL, whatsappUrl } from '../../lib/contact.js'

const INPUT_CLASSES =
  'w-full bg-background border border-outline-variant/40 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all'
const LABEL_CLASSES = 'text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block mb-1.5'

// A sub-category's products are its `children`; until the client supplies
// them, the sub-category itself is shown as the single product.
function getProducts(subcategory) {
  if (subcategory.children.length > 0) {
    return subcategory.children.map((child) => ({ name: child.name, image: child.largeImage || child.image }))
  }
  return [{ name: subcategory.name, image: subcategory.largeImage || subcategory.image }]
}

function EnquiryView({ category, subcategory, product, onBack, onClose }) {
  const productLabel = product.name === subcategory.name ? product.name : `${subcategory.name} — ${product.name}`
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: `Hi, I'm interested in ${productLabel} from your ${category.title} range. Please share specifications, MOQs and lead times.`,
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return
    if (!navigator.onLine) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    try {
      // Same endpoint + "enquiry" payload shape as the Contact page form
      // (server/src/lib/validate.js).
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'enquiry',
          ...form,
          subject: `Product Enquiry: ${category.title} / ${productLabel}`,
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.success) throw new Error(result?.message || 'Submission failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-5 px-6 py-16 md:py-24">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600">
          <Icon name="check_circle" className="text-3xl" />
        </div>
        <h3 className="font-headline-lg text-2xl font-semibold text-primary">Enquiry Sent</h3>
        <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
          Thank you — our team will get back to you about {productLabel} within one business day.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 px-8 py-3 rounded-full bg-primary text-white font-label-md text-xs font-semibold uppercase tracking-wider hover:bg-[#1E293B] transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <div className="px-6 py-6 md:px-10 md:py-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 mb-5 text-[0.72rem] font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
      >
        <Icon name="arrow_back" className="text-base" />
        Back to Product
      </button>

      <div className="flex items-center gap-4 mb-6 pr-10">
        {product.image && (
          <img src={product.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0 border border-outline-variant/30" />
        )}
        <div>
          <span className="eyebrow block mb-1">{category.title}</span>
          <h3 className="font-headline-lg text-xl md:text-2xl font-semibold text-primary leading-tight">
            Enquire About {productLabel}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pe-name" className={LABEL_CLASSES}>Full Name *</label>
            <input id="pe-name" name="name" required value={form.name} onChange={handleChange} className={INPUT_CLASSES} />
          </div>
          <div>
            <label htmlFor="pe-email" className={LABEL_CLASSES}>Work Email *</label>
            <input id="pe-email" type="email" name="email" required value={form.email} onChange={handleChange} className={INPUT_CLASSES} />
          </div>
          <div>
            <label htmlFor="pe-phone" className={LABEL_CLASSES}>Phone</label>
            <input id="pe-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} className={INPUT_CLASSES} />
          </div>
          <div>
            <label htmlFor="pe-company" className={LABEL_CLASSES}>Company *</label>
            <input id="pe-company" name="company" required value={form.company} onChange={handleChange} className={INPUT_CLASSES} />
          </div>
        </div>
        <div>
          <label htmlFor="pe-message" className={LABEL_CLASSES}>Message *</label>
          <textarea
            id="pe-message"
            name="message"
            required
            rows={4}
            value={form.message}
            onChange={handleChange}
            className={`${INPUT_CLASSES} resize-none`}
          />
        </div>

        {status === 'error' && (
          <p className="flex items-center gap-2 text-sm text-error" role="alert">
            <Icon name="error_outline" className="text-base" />
            We couldn&apos;t send your enquiry. Check your connection and try again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-3.5 rounded-full bg-gradient-to-br from-secondary to-[#A8834A] text-white font-label-md text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(197,157,95,0.3)] hover:shadow-[0_12px_32px_rgba(197,157,95,0.45)] transition-shadow disabled:opacity-70 cursor-pointer"
        >
          {status === 'submitting' ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <Icon name="arrow_forward" className="text-sm" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}

// "View Products" popup: one product image at a time with its name below,
// plus Enquire (swaps to an inline enquiry form) and WhatsApp buttons.
// Rendered by the caller inside a portal + AnimatePresence.
function ProductModal({ category, subcategory, onClose }) {
  const products = getProducts(subcategory)
  const [index, setIndex] = useState(0)
  const [view, setView] = useState('gallery') // gallery | enquiry
  const closeRef = useRef(null)
  const product = products[index]
  const hasMany = products.length > 1

  const step = (dir) => setIndex((i) => (i + dir + products.length) % products.length)

  // Natural aspect ratio of each photo, so the frame can match it exactly
  // (whole image, no crop, no empty bands). Also preloads the gallery.
  const [ratios, setRatios] = useState({})
  useEffect(() => {
    products.forEach(({ image }) => {
      if (!image) return
      const img = new Image()
      img.onload = () => setRatios((r) => ({ ...r, [image]: img.naturalWidth / img.naturalHeight }))
      img.src = image
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcategory])
  const ratio = ratios[product.image] ?? 4 / 3

  // Lock page scroll (Lenis + native) while open, and wire Esc / arrow keys.
  useEffect(() => {
    const lenis = getLenis()
    lenis?.stop()
    const { overflow } = document.documentElement.style
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.documentElement.style.overflow = overflow
      lenis?.start()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (view === 'gallery' && products.length > 1) {
        if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % products.length)
        if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + products.length) % products.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, view, products.length])

  const whatsappMessage = `Hi, I'd like to enquire about ${
    product.name === subcategory.name ? product.name : `${subcategory.name} — ${product.name}`
  } from your ${category.title} range.`

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#0A101E]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${subcategory.name} products`}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        data-lenis-prevent
        className={`relative z-10 max-h-[94vh] overflow-y-auto bg-white rounded-2xl shadow-2xl ${
          view === 'gallery' ? 'w-fit' : 'w-full max-w-4xl'
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-3 right-3 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            view === 'gallery'
              ? 'bg-black/45 text-white hover:bg-black/70 backdrop-blur'
              : 'bg-surface-container-low text-primary hover:bg-outline-variant/40'
          }`}
        >
          <Icon name="close" className="text-xl" />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          {view === 'gallery' ? (
            <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {/* Image stage: sized to the photo's own aspect ratio (capped by
                  viewport height and width), so it shows whole and fills the frame. */}
              <div
                className="relative bg-surface-container-low overflow-hidden transition-[width] duration-300 ease-out"
                style={{ width: `min(calc(100vw - 3rem), 64rem, calc(62vh * ${ratio}))`, aspectRatio: ratio }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={product.image || index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name={subcategory.icon} className="text-7xl text-secondary/60" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {hasMany && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous product"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 text-primary shadow-md flex items-center justify-center hover:bg-secondary hover:text-white transition-colors cursor-pointer"
                    >
                      <Icon name="chevron_left" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next product"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 text-primary shadow-md flex items-center justify-center hover:bg-secondary hover:text-white transition-colors cursor-pointer"
                    >
                      <Icon name="chevron_right" />
                    </button>
                    <div className="absolute bottom-3 inset-x-0 z-10 flex justify-center gap-1.5">
                      {products.map((p, i) => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => setIndex(i)}
                          aria-label={`Show ${p.name}`}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${i === index ? 'w-6 bg-secondary' : 'w-1.5 bg-white/80'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Name + actions */}
              {/* w-0 min-w-full: the bar takes the image's width instead of
                  widening the popup, and wraps when it doesn't fit. */}
              <div className="w-0 min-w-full flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 py-5 md:px-8">
                <div className="min-w-0 flex-1 basis-56">
                  <span className="eyebrow block mb-1">
                    {category.title}
                    {product.name !== subcategory.name && ` · ${subcategory.name}`}
                    {hasMany && ` · ${index + 1} / ${products.length}`}
                  </span>
                  <h3 className="font-headline-lg text-xl md:text-2xl font-semibold text-primary truncate">{product.name}</h3>
                </div>
                <div className="flex gap-3 shrink-0 max-sm:w-full">
                  <button
                    type="button"
                    onClick={() => setView('enquiry')}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-br from-secondary to-[#A8834A] text-white font-label-md text-[0.72rem] font-semibold uppercase tracking-wider shadow-[0_8px_24px_rgba(197,157,95,0.3)] hover:shadow-[0_12px_32px_rgba(197,157,95,0.45)] transition-shadow cursor-pointer"
                  >
                    <Icon name="mail" className="text-base" />
                    Enquire Now
                  </button>
                  <a
                    href={whatsappUrl(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-label-md text-[0.72rem] font-semibold uppercase tracking-wider hover:bg-[#1EBE5A] transition-colors"
                  >
                    <WhatsAppIcon className="text-base" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="enquiry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <EnquiryView
                category={category}
                subcategory={subcategory}
                product={product}
                onBack={() => setView('gallery')}
                onClose={onClose}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default ProductModal
