import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

function TiltedCard({ children, className = '', tiltMax = 12, ...props }) {
  const cardRef = useRef(null)
  
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  
  const rotateX = useSpring(useTransform(y, [0, 1], [tiltMax, -tiltMax]), { damping: 25, stiffness: 220 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltMax, tiltMax]), { damping: 25, stiffness: 220 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const relativeX = (e.clientX - rect.left) / width
    const relativeY = (e.clientY - rect.top) / height
    x.set(relativeX)
    y.set(relativeY)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 select-none ${className}`}
      {...props}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default TiltedCard
