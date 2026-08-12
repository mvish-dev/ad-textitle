import { motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import MagneticButton from '../motion/MagneticButton.jsx'

const INPUT_CLASSES =
  'w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all'
const LABEL_CLASSES = 'text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block'

function EnquiryForm({ formState, onChange, onSubmit }) {
  return (
    <motion.form
      key="enquiry-form"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={LABEL_CLASSES}>Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formState.name}
            onChange={onChange}
            placeholder="John Doe"
            className={INPUT_CLASSES}
          />
        </div>
        <div className="space-y-2">
          <label className={LABEL_CLASSES}>Work Email</label>
          <input
            type="email"
            name="email"
            required
            value={formState.email}
            onChange={onChange}
            placeholder="john@retailbrands.com"
            className={INPUT_CLASSES}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={LABEL_CLASSES}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formState.phone}
            onChange={onChange}
            placeholder="+1 (555) 019-2834"
            className={INPUT_CLASSES}
          />
        </div>
        <div className="space-y-2">
          <label className={LABEL_CLASSES}>Company Name</label>
          <input
            type="text"
            name="company"
            required
            value={formState.company}
            onChange={onChange}
            placeholder="Retail Sourcing Corp"
            className={INPUT_CLASSES}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={LABEL_CLASSES}>Inquiry Subject</label>
        <select name="subject" value={formState.subject} onChange={onChange} className={INPUT_CLASSES}>
          <option value="General Partnership">General B2B Partnership</option>
          <option value="Global Distribution">Global Export & Distribution</option>
          <option value="Sustainability Compliance">Sustainability & Certifications</option>
          <option value="Other">Other General Request</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className={LABEL_CLASSES}>Your Message</label>
        <textarea
          name="message"
          required
          rows="4"
          value={formState.message}
          onChange={onChange}
          placeholder="Please provide details regarding your required sourcing setup..."
          className={`${INPUT_CLASSES} resize-none`}
        />
      </div>

      <MagneticButton className="block w-full" strength={0.1}>
        <button
          type="submit"
          className="w-full py-4 bg-primary hover:bg-[#1E293B] text-white font-label-md text-xs font-semibold uppercase tracking-widest transition-all rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Submit Enquiry
          <Icon name="arrow_forward" className="text-sm" />
        </button>
      </MagneticButton>
    </motion.form>
  )
}

export default EnquiryForm
