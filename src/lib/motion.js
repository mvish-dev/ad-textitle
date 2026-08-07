import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, Draggable)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

// Shared easing/duration tokens so every page moves to the same rhythm.
export const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
}

export const STAGGER = 0.08

export { gsap, ScrollTrigger, SplitText, Flip, Draggable }
