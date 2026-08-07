import { motion } from 'framer-motion'

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  )
}

export default AnimatedPage
