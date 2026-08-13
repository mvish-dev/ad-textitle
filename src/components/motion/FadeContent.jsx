import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '../../lib/motion.js'

// ReactBits' FadeContent, adapted to the project's shared gsap/ScrollTrigger
// singleton (lib/motion.js). A blur+opacity scroll-in reveal — Design &
// Development's "transition" flavor, distinct from Manufacturing's
// AnimatedContent (which slides/scales instead of blurring).
function FadeContent({
  children,
  blur = false,
  duration = 1000,
  ease = 'power2.out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = '',
  ...props
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const startPct = (1 - threshold) * 100
    const seconds = (val) => (val > 10 ? val / 1000 : val)

    gsap.set(el, {
      autoAlpha: initialOpacity,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
      willChange: 'opacity, filter, transform',
    })

    const tl = gsap.timeline({ paused: true, delay: seconds(delay) })
    tl.to(el, { autoAlpha: 1, filter: 'blur(0px)', duration: seconds(duration), ease })

    const st = ScrollTrigger.create({
      trigger: el,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play(),
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [blur, duration, ease, delay, threshold, initialOpacity])

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
}

export default FadeContent
