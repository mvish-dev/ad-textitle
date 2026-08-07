import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/motion.js'
import { setLenis } from '../../lib/lenis.js'

// Drives the whole site's scroll. Mounted once in Layout so it persists
// across route changes; ScrollTrigger-based animations on any page read from
// this single Lenis instance instead of the raw scroll event.
function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}

export default SmoothScroll
