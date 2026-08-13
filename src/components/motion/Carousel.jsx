import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Icon from '../ui/Icon.jsx'

const DRAG_BUFFER = 0
const VELOCITY_THRESHOLD = 500
const GAP = 16
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 }

function CarouselItem({ item, index, itemWidth, trackItemOffset, x, transition }) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset]
  const outputRange = [90, 0, -90]
  const rotateY = useTransform(x, range, outputRange, { clamp: false })

  return (
    <motion.div
      className="relative shrink-0 flex flex-col items-start justify-between bg-primary border border-white/10 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ width: itemWidth, height: '100%', rotateY }}
      transition={transition}
    >
      <div className="mb-2 p-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/15">
          <Icon name={item.icon} className="text-secondary text-2xl" />
        </span>
      </div>
      <div className="p-5 pt-0">
        <div className="mb-1 font-label-md text-sm font-bold uppercase tracking-wider text-white">{item.title}</div>
        <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}

function Carousel({ items, baseWidth = 300, autoplay = false, autoplayDelay = 3000, pauseOnHover = false, loop = false }) {
  const containerPadding = 16
  const itemWidth = baseWidth - containerPadding * 2
  const trackItemOffset = itemWidth + GAP
  const itemsForRender = useMemo(() => {
    if (!loop) return items
    if (items.length === 0) return []
    return [items[items.length - 1], ...items, items[0]]
  }, [items, loop])

  const [position, setPosition] = useState(loop ? 1 : 0)
  const x = useMotionValue(-(loop ? 1 : 0) * trackItemOffset)
  const [isHovered, setIsHovered] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const containerRef = useRef(null)
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current
      const handleMouseEnter = () => setIsHovered(true)
      const handleMouseLeave = () => setIsHovered(false)
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
    return undefined
  }, [pauseOnHover])

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined
    if (pauseOnHover && isHovered) return undefined

    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1))
    }, autoplayDelay)

    return () => clearInterval(timer)
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length])

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS

  const handleAnimationStart = () => setIsAnimating(true)

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false)
      return
    }
    const lastCloneIndex = itemsForRender.length - 1

    if (position === lastCloneIndex) {
      setIsJumping(true)
      setPosition(1)
      x.set(-1 * trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }

    if (position === 0) {
      setIsJumping(true)
      setPosition(items.length)
      x.set(-items.length * trackItemOffset)
      requestAnimationFrame(() => {
        setIsJumping(false)
        setIsAnimating(false)
      })
      return
    }

    setIsAnimating(false)
  }

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0

    if (direction === 0) return

    setPosition((prev) => {
      const next = prev + direction
      const max = itemsForRender.length - 1
      return Math.max(0, Math.min(next, max))
    })
  }

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      }

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1)

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden p-4 rounded-[28px] border border-outline-variant/20 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
      style={{ width: `${baseWidth}px` }}
    >
      <motion.div
        className="flex"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>
      <div className="flex w-full justify-center">
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.button
              type="button"
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index}
              className={`h-2 w-2 rounded-full cursor-pointer border-0 p-0 appearance-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                activeIndex === index ? 'bg-secondary' : 'bg-outline-variant'
              }`}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
