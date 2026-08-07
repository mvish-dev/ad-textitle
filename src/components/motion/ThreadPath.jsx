import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/motion.js'

// The site's recurring "thread" motif: an SVG path that draws itself
// (stroke-dashoffset) in sync with scroll. Reused for the Home journey
// timeline, the About/Certifications milestone timelines, and the
// Infrastructure chapter rail — one component, one visual language.
function ThreadPath({
  d,
  viewBox = '0 0 100 100',
  className = '',
  strokeWidth = 2,
  trigger,
  start = 'top 80%',
  end = 'bottom 60%',
  scrub = 1,
  containerAnimation,
  preserveAspectRatio = 'none',
}) {
  const containerRef = useRef(null)
  const pathRef = useRef(null)

  useGSAP(
    () => {
      const path = pathRef.current
      if (!path) return
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

      const triggerEl = (trigger && 'current' in trigger ? trigger.current : trigger) || containerRef.current

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerEl,
          start,
          end,
          scrub,
          containerAnimation,
        },
      })
    },
    { scope: containerRef, dependencies: [d, start, end, scrub, containerAnimation] }
  )

  return (
    <svg
      ref={containerRef}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      aria-hidden="true"
    >
      <path ref={pathRef} d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export default ThreadPath
