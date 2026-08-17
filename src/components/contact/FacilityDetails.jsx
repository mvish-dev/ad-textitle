import { motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import facilityGate from '../../assets/images/facility/facility-gate.webp'

function FacilityDetails({ copied, onCopyAddress }) {
  return (
    <div className="lg:col-span-5 space-y-12">

      {/* Facility details */}
      <motion.div
        id="factory-location"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm"
      >
        <div className="h-36 overflow-hidden">
          <img
            src={facilityGate}
            alt="AD Textile facility entrance in Karur, India"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Icon name="factory" className="text-lg" />
            </div>
            <div>
              <h3 className="text-xs text-secondary uppercase font-semibold tracking-wider">Production Facility</h3>
              <h2 className="text-primary font-bold text-lg font-serif">AD Textile Headquarters</h2>
            </div>
          </div>

          <div className="space-y-3 font-body-md text-sm border-l-2 border-secondary/35 pl-4">
            <p className="text-primary font-semibold text-base leading-snug">
              1/104, Sanjay Nagar, Erode Road
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              Athur Post, Karur – 639002,<br />
              Tamil Nadu, India
            </p>
          </div>

          <div className="pt-2 flex gap-4">
            <button
              onClick={onCopyAddress}
              className="flex-1 py-3 border border-outline-variant/50 rounded-full font-label-md text-xs uppercase tracking-wider text-primary hover:bg-slate-50 cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Icon name="content_copy" className="text-sm" />
              {copied ? 'Copied!' : 'Copy Address'}
            </button>
            <a
              href="#google-map-section"
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 rounded-full font-label-md text-xs uppercase tracking-wider text-primary text-center transition-all flex items-center justify-center gap-2"
            >
              View Map
              <Icon name="open_in_new" className="text-sm" />
            </a>
          </div>
        </div>
      </motion.div>

    </div>
  )
}

export default FacilityDetails
