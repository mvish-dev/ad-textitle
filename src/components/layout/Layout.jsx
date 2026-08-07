import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import SmoothScroll from './SmoothScroll.jsx'
import FloatingAssistant from '../ui/FloatingAssistant.jsx'
import CustomCursor from '../ui/CustomCursor.jsx'
import { ScrollTrigger } from '../../lib/motion.js'
import { scrollTo } from '../../lib/lenis.js'

function Layout({ children }) {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Allow transition to finish before scrolling to hashes
      const timer = setTimeout(() => {
        scrollTo(`#${hash.slice(1)}`)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      scrollTo(0, { immediate: true })
    }
  }, [pathname, hash])

  // Route content (and its page height) changes after the transition above;
  // refresh so pinned/scrubbed ScrollTriggers on the new page measure
  // against the correct layout instead of the previous route's.
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 350)
    return () => clearTimeout(timer)
  }, [pathname])

  const showFooter = pathname !== '/infrastructure'

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden">
      <SmoothScroll />
      <Header />
      {/* No top padding here: hero sections bleed their background behind
          the fixed nav, so each page owns its own top offset (pt-20/pt-24
          on its first section) instead of a blanket main padding. */}
      <main className="overflow-x-hidden relative min-h-screen flex flex-col">
        {children}
      </main>
      {showFooter && <Footer />}
      <FloatingAssistant />
      <CustomCursor />
    </div>
  )
}

export default Layout
