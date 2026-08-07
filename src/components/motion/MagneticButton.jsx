import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion, isTouchDevice } from '../../lib/motion.js'

// Wraps a CTA (Button, link, etc.) so it pulls gently toward the cursor on
// hover. Used sparingly — primary CTAs only, never entire nav/grids.
function MagneticButton({ children, strength = 0.35, className = 'inline-block' }) {
  const wrapperRef = useRef(null)

  useGSAP(
    () => {
      const el = wrapperRef.current
      if (!el || prefersReducedMotion() || isTouchDevice()) return undefined

      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

      const handleMove = (e) => {
        const rect = el.getBoundingClientRect()
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength)
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength)
      }
      const handleLeave = () => {
        xTo(0)
        yTo(0)
      }

      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', handleLeave)

      return () => {
        el.removeEventListener('mousemove', handleMove)
        el.removeEventListener('mouseleave', handleLeave)
      }
    },
    { scope: wrapperRef, dependencies: [strength] }
  )

  return (
    <div ref={wrapperRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}

export default MagneticButton
