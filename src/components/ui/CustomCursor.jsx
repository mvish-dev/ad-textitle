import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [label, setLabel] = useState('')
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
      const labelSource = target.closest?.('[data-cursor-label]')

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        labelSource
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }

      setLabel(labelSource ? labelSource.dataset.cursorLabel : '')
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
  const ringSize = label ? 64 : hovered ? 46 : 28
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
          opacity: label ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
      />

      {/* Outer Hollow Ring, doubling as a contextual "View"/"Drag" label when
          hovering elements tagged with data-cursor-label */}
      <motion.div
        className={`fixed top-0 left-0 border-[1.5px] border-[#C59D5F] rounded-full pointer-events-none z-[9998] shadow-[0_0_6px_rgba(197,157,95,0.3)] flex items-center justify-center ${
          label ? 'bg-primary/90' : ''
        }`}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: 1,
        }}
        transition={{
          width: { type: 'spring', stiffness: 350, damping: 25 },
          height: { type: 'spring', stiffness: 350, damping: 25 },
        }}
      >
        {label && (
          <span className="text-[9px] font-semibold uppercase tracking-wider text-white whitespace-nowrap">
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}

export default CustomCursor
