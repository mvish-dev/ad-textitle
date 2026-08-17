import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import { prefersReducedMotion } from '../../lib/motion.js'

const X_STEP = 52
const SPRING = { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }

function cardGeometry(diff) {
  const absDiff = Math.abs(diff)
  const dir = Math.sign(diff)
  return {
    x: `${-50 + diff * X_STEP}%`,
    y: '-50%',
    z: absDiff === 0 ? 0 : -140 - (absDiff - 1) * 120,
    rotateY: absDiff === 0 ? 0 : -dir * 34,
    scale: absDiff === 0 ? 1 : Math.max(0.62, 1 - absDiff * 0.18),
    opacity: absDiff <= 2 ? 1 - absDiff * 0.3 : 0,
  }
}

function CollectionsCarousel3D({ items, autoplayDelay = 4500 }) {
  const total = items.length
  const reduced = prefersReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const dragX = useMotionValue(0)
  const stageRotate = useTransform(dragX, [-220, 220], [9, -9])

  const goTo = (index) => setActiveIndex(((index % total) + total) % total)
  const step = (dir) => goTo(activeIndex + dir)

  useEffect(() => {
    if (reduced || isHovered || total <= 1) return undefined
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, autoplayDelay)
    return () => window.clearInterval(id)
  }, [reduced, isHovered, total, autoplayDelay])

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info
    if (offset.x < -60 || velocity.x < -450) step(1)
    else if (offset.x > 60 || velocity.x > 450) step(-1)
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative h-[360px] sm:h-[420px] md:h-[460px] lg:h-[500px] overflow-hidden"
        style={{ perspective: 1600 }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-background to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-background to-transparent z-20" />

        <motion.div
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
          style={{ transformStyle: 'preserve-3d', rotateY: reduced ? 0 : stageRotate, x: dragX }}
          drag={reduced ? false : 'x'}
          dragElastic={0.6}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {items.map((item, i) => {
            let diff = i - activeIndex
            const half = total / 2
            if (diff > half) diff -= total
            if (diff < -half) diff += total
            const isActive = diff === 0
            const geometry = cardGeometry(diff)

            return (
              <motion.div
                key={item.title}
                className="absolute top-1/2 left-1/2 w-[230px] sm:w-[280px] md:w-[310px] lg:w-[340px] xl:w-[380px] aspect-[4/5]"
                style={{ zIndex: total - Math.abs(diff), transformStyle: 'preserve-3d' }}
                animate={geometry}
                transition={SPRING}
                onClick={() => !isActive && goTo(i)}
              >
                <div
                  className={`group relative w-full h-full overflow-hidden rounded-2xl bg-white border transition-shadow duration-300 ${
                    isActive
                      ? 'shadow-[0_30px_60px_-15px_rgba(15,23,42,0.45)] border-secondary/40'
                      : 'shadow-lg border-outline-variant/30 cursor-pointer'
                  }`}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    src={item.image}
                    alt={item.alt}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A101E]/95 via-[#0A101E]/35 to-transparent" />

                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Icon name={item.icon} className="text-secondary text-lg" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7 flex flex-col">
                    <h3 className="font-serif text-lg sm:text-xl text-white font-bold mb-1.5">{item.title}</h3>
                    <p
                      className={`text-[11px] sm:text-xs text-white/70 leading-relaxed transition-all duration-300 overflow-hidden ${
                        isActive ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'
                      }`}
                    >
                      {item.description}
                    </p>
                    {isActive ? (
                      <Link
                        className="font-label-md text-[0.72rem] tracking-wider text-secondary flex items-center gap-2 hover:gap-3 transition-all uppercase font-semibold"
                        to={item.href}
                      >
                        View Collection <Icon name="arrow_right_alt" />
                      </Link>
                    ) : (
                      <span className="font-label-md text-[0.68rem] tracking-wider text-white/50 uppercase font-semibold">
                        Tap to preview
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          type="button"
          aria-label="Previous collection"
          onClick={() => step(-1)}
          className="w-11 h-11 rounded-full border border-outline-variant/40 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-colors"
        >
          <Icon name="chevron_left" />
        </button>

        <div className="flex items-center gap-2.5">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Go to ${item.title}`}
              aria-current={activeIndex === i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-7 bg-secondary' : 'w-2 bg-outline-variant hover:bg-secondary/50'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next collection"
          onClick={() => step(1)}
          className="w-11 h-11 rounded-full border border-outline-variant/40 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-colors"
        >
          <Icon name="chevron_right" />
        </button>
      </div>
    </div>
  )
}

export default CollectionsCarousel3D
