import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, prefersReducedMotion } from '../../lib/motion.js'

// Scroll-triggered number count-up. `end` is the numeric target; `prefix`/
// `suffix` compose the rest of the label (e.g. end=4, suffix=" Tons/Day").
function CountUp({ end, prefix = '', suffix = '', decimals = 0, duration = 1.6, className = '', start = 'top 85%' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      if (prefersReducedMotion()) {
        el.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`
        return
      }

      const counter = { val: 0 }
      gsap.to(counter, {
        val: end,
        duration,
        ease: EASE.out,
        scrollTrigger: { trigger: el, start, once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`
        },
      })
    },
    { scope: ref, dependencies: [end, prefix, suffix, decimals, duration, start] }
  )

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default CountUp
