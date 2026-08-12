import { motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'

const INPUT_CLASSES =
  'w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-3 text-sm outline-none transition-all'
const LABEL_CLASSES = 'text-[0.68rem] text-on-surface-variant font-semibold uppercase tracking-wider block'

const PRODUCT_CATEGORIES = ['Bed Linen', 'Kitchen Linen', 'Table Linen', 'Living Linen', 'Custom Fabric']

function QuoteForm({ formState, onChange, onToggleCategory, onSubmit }) {
  return (
    <motion.form
      key="quote-form"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
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
            placeholder="Jane Smith"
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
            placeholder="j.smith@nordicdesign.com"
            className={INPUT_CLASSES}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className={LABEL_CLASSES}>Company Name</label>
          <input
            type="text"
            name="company"
            required
            value={formState.company}
            onChange={onChange}
            placeholder="Nordic Design Group AB"
            className={INPUT_CLASSES}
          />
        </div>
        <div className="space-y-2">
          <label className={LABEL_CLASSES}>Target Delivery Volume</label>
          <select name="quantity" value={formState.quantity} onChange={onChange} className={INPUT_CLASSES}>
            <option value="500 - 1,000 pcs">500 - 1,000 pcs (MOQ Tier)</option>
            <option value="1,000 - 5,000 pcs">1,000 - 5,000 pcs</option>
            <option value="5,000 - 10,000 pcs">5,000 - 10,000 pcs</option>
            <option value="10,000+ pcs">10,000+ pcs (Enterprise Scale)</option>
          </select>
        </div>
      </div>

      {/* Product categories choice */}
      <div className="space-y-2.5">
        <label className={LABEL_CLASSES}>Product Segments Required</label>
        <div className="flex flex-wrap gap-2.5">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = formState.categories.includes(cat)
            return (
              <button
                type="button"
                key={cat}
                onClick={() => onToggleCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-secondary/15 text-secondary border-secondary'
                    : 'bg-background text-on-surface-variant border-outline-variant/40 hover:border-secondary'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className={LABEL_CLASSES}>Custom Specifications / Fiber Blend</label>
        <textarea
          name="specs"
          rows="3"
          value={formState.specs}
          onChange={onChange}
          placeholder="Enter requirements like Thread Count (TC), Azo-free dyeing requests, custom printing, GOTS certificates needed, etc."
          className={`${INPUT_CLASSES} resize-none`}
        />
      </div>

      <div className="space-y-2">
        <label className={LABEL_CLASSES}>Message (Optional)</label>
        <textarea
          name="message"
          rows="2"
          value={formState.message}
          onChange={onChange}
          placeholder="Any details about timeline, delivery location, port of loading etc."
          className={`${INPUT_CLASSES} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-secondary hover:bg-[#A8834A] text-white font-label-md text-xs font-semibold uppercase tracking-widest transition-all rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:-translate-y-0.5"
      >
        Request Quote Proposal
        <Icon name="arrow_forward" className="text-sm" />
      </button>
    </motion.form>
  )
}

export default QuoteForm
