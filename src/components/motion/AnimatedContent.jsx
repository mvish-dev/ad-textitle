import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '../../lib/motion.js'

// ReactBits' AnimatedContent, adapted to the project's shared gsap/
// ScrollTrigger singleton (lib/motion.js). Generic scroll-in reveal for
// cards/media — always sets the element visible on mount (only opacity/
// transform animate), so nothing gets stuck hidden pre-scroll.
function AnimatedContent({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = '',
  ...props
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    let scrollerTarget = container || null
    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget)
    }

    const axis = direction === 'horizontal' ? 'x' : 'y'
    const offset = reverse ? -distance : distance
    const startPct = (1 - threshold) * 100

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible',
    })

    const tl = gsap.timeline({ paused: true, delay })
    tl.to(el, { [axis]: 0, scale: 1, opacity: 1, duration, ease })

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play(),
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [container, distance, direction, reverse, duration, ease, initialOpacity, animateOpacity, scale, threshold, delay])

  return (
    <div ref={ref} className={`invisible ${className}`} {...props}>
      {children}
    </div>
  )
}

export default AnimatedContent
