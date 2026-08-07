// Module-level singleton so any component (Layout's hash-scroll effect, nav
// links, magnetic buttons) can drive the smooth-scroll instance without prop
// drilling. Set by SmoothScroll on mount, cleared on unmount.
let lenisInstance = null

export const setLenis = (instance) => {
  lenisInstance = instance
}

export const getLenis = () => lenisInstance

// Scrolls to a target (selector, element, or Y offset) using Lenis when
// available, falling back to native scrolling (e.g. reduced-motion mode).
export const scrollTo = (target, options = {}) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options)
    return
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' })
    return
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth' })
}
