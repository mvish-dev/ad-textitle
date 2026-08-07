import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Motion values for smooth tracking
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Springs for trailing effect on the outer ring
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 22, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 22, mass: 0.5 })

  useEffect(() => {
    // Detect mobile/touch devices
    const checkDevice = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkDevice()

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select')
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (isMobile) return null

  // Dimension states
  const dotSize = 8
  const ringSize = hovered ? 46 : 28
  return (
    <>
      {/* Inner Filled Dot */}
      <motion.div
        className="fixed top-0 left-0 bg-[#C59D5F] rounded-full pointer-events-none z-[9999] shadow-[0_0_4px_rgba(197,157,95,0.4)]"
        style={{
          x: mouseX,
          y: mouseY,
          width: dotSize,
          height: dotSize,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
      />

      {/* Outer Hollow Ring */}
      <motion.div
        className="fixed top-0 left-0 border-[1.5px] border-[#C59D5F] rounded-full pointer-events-none z-[9998] shadow-[0_0_6px_rgba(197,157,95,0.3)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{
          width: { type: 'spring', stiffness: 350, damping: 25 },
          height: { type: 'spring', stiffness: 350, damping: 25 },
        }}
      />
    </>
  )
}

export default CustomCursor
