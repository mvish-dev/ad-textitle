import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import useOnlineStatus from '../../hooks/useOnlineStatus.js'

// Global connectivity indicator. Rendered by Header as the first child of
// its fixed nav wrapper — animating its own height (rather than being
// independently `fixed`) means it pushes the nav row down when it appears
// instead of overlapping it.
function OfflineBanner() {
  const isOnline = useOnlineStatus()

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden bg-primary text-white shrink-0"
          role="status"
        >
          <div className="py-2.5 px-4 flex items-center justify-center gap-2.5">
            <Icon name="wifi_off" className="text-secondary text-base" />
            <span className="font-label-md text-xs font-semibold uppercase tracking-wider">
              You're offline — check your internet connection.
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OfflineBanner
