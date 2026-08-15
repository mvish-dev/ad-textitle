import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText, EASE, prefersReducedMotion } from '../../lib/motion.js'

// Line-by-line "rises out of a mask" heading reveal, used on every
// redesigned page's hero/section titles for a consistent entrance language.
function RevealText({
  as: Tag = 'h1',
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
  start = 'top 85%',
  scrollTriggered = true,
  ...props
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return undefined

      const split = SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true })

      const tween = gsap.from(split.lines, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        ease: EASE.out,
        stagger,
        delay,
        scrollTrigger: scrollTriggered ? { trigger: el, start, once: true } : undefined,
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        split.revert()
      }
    },
    // `children` is deliberately excluded: it's a JSX tree that gets a new
    // object identity on every parent re-render even when the rendered text
    // hasn't changed. Keeping it here meant any unrelated parent re-render
    // (e.g. a page with a per-second clock tick) would kill and restart this
    // tween before it could finish, leaving the heading stuck mid-reveal.
    // SplitText reads straight from the live DOM on mount, so it already
    // reflects whatever `children` was rendered — no dependency needed. If a
    // caller genuinely needs to replay the reveal for new text without
    // unmounting, give that instance a `key` instead.
    { scope: ref, dependencies: [delay, stagger, start, scrollTriggered] }
  )

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}

export default RevealText
