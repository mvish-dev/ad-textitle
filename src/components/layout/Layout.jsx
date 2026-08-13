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
      const id = hash.slice(1)
      let cancelled = false
      let rafId

      // The target route is code-split (React.lazy), so its DOM — including
      // the hash target — may not exist yet when this effect runs. Poll for
      // it (capped) instead of guessing a fixed delay that a heavier page
      // can easily outrun, leaving the scroll silently a no-op.
      const deadline = Date.now() + 4000
      const tryScroll = () => {
        if (cancelled) return
        if (document.getElementById(id) || Date.now() > deadline) {
          scrollTo(`#${id}`)
          return
        }
        rafId = requestAnimationFrame(tryScroll)
      }

      // Give the route-change transition a moment to start before polling.
      const timer = setTimeout(tryScroll, 300)
      return () => {
        cancelled = true
        clearTimeout(timer)
        if (rafId) cancelAnimationFrame(rafId)
      }
    } else {
      scrollTo(0, { immediate: true })
      return undefined
    }
  }, [pathname, hash])

  // Route content (and its page height) changes after the transition above;
  // refresh so pinned/scrubbed ScrollTriggers on the new page measure
  // against the correct layout instead of the previous route's.
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 350)
    return () => clearTimeout(timer)
  }, [pathname])

  const showFooter = pathname !== '/manufacturing'

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
