import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Must match the GA4 ID loaded (but not configured) in index.html.
const GA_MEASUREMENT_ID = 'G-PXVKT1HEH7'
const STORAGE_KEY = 'ad-textile-cookie-consent'

function startAnalytics() {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID)
  }
}

function readStoredConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function storeConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Privacy mode / blocked storage: consent choice won't persist across
    // visits, but the current session still respects it either way.
  }
}

// Gates GA4 behind an explicit choice: index.html only loads gtag.js and
// initializes the dataLayer, it never calls `gtag('config', ...)` itself —
// that's what actually starts sending data, and only happens here, either
// immediately (a returning visitor who already accepted) or once the
// visitor clicks Accept.
function CookieConsentBanner() {
  const [visible, setVisible] = useState(() => {
    const stored = readStoredConsent()
    return stored !== 'accepted' && stored !== 'declined'
  })

  useEffect(() => {
    if (readStoredConsent() === 'accepted') {
      startAnalytics()
    }
  }, [])

  const handleAccept = () => {
    storeConsent('accepted')
    startAnalytics()
    setVisible(false)
  }

  const handleDecline = () => {
    storeConsent('declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[60] bg-primary text-white/85 border-t border-white/10 px-6 py-5 flex flex-col sm:flex-row items-center gap-4 justify-between"
    >
      <p className="text-xs sm:text-sm text-white/75 max-w-2xl text-center sm:text-left">
        We use cookies to analyze site traffic and improve your experience. See our{' '}
        <Link to="/privacy-policy" className="underline hover:text-secondary transition-colors">
          Privacy Policy
        </Link>{' '}
        for details.
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          type="button"
          onClick={handleDecline}
          className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full border border-white/20 text-white/70 hover:bg-white/5 transition-colors cursor-pointer"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-secondary text-white hover:opacity-90 transition-opacity cursor-pointer"
        >
          Accept
        </button>
      </div>
    </div>
  )
}

export default CookieConsentBanner
