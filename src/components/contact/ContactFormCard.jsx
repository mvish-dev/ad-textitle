import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import EnquiryForm from './EnquiryForm.jsx'
import QuoteForm from './QuoteForm.jsx'

function ContactFormCard({
  activeTab,
  onTabChange,
  formState,
  onChange,
  onToggleCategory,
  onSubmit,
  isSubmitting,
  isSubmitted,
  onResetForm,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-7 bg-white border border-outline-variant/30 rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Tab Switcher Headers */}
      <div className="flex border-b border-outline-variant/30 bg-slate-50/50 p-2 gap-2">
        <button
          type="button"
          onClick={() => onTabChange('enquiry')}
          className={`flex-1 py-4 text-center rounded-xl font-label-md text-xs font-semibold uppercase tracking-wider transition-all relative cursor-pointer ${
            activeTab === 'enquiry' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          {activeTab === 'enquiry' && (
            <motion.div
              layoutId="activeFormTab"
              className="absolute inset-0 bg-white border border-outline-variant/40 shadow-sm rounded-xl z-0"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Icon name="mail" className="text-sm" />
            Sales Enquiry
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('quote')}
          className={`flex-1 py-4 text-center rounded-xl font-label-md text-xs font-semibold uppercase tracking-wider transition-all relative cursor-pointer ${
            activeTab === 'quote' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          {activeTab === 'quote' && (
            <motion.div
              layoutId="activeFormTab"
              className="absolute inset-0 bg-white border border-outline-variant/40 shadow-sm rounded-xl z-0"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Icon name="request_quote" className="text-sm" />
            Request a Quote
          </span>
        </button>
      </div>

      {/* Form Content Area */}
      <div className="p-8 md:p-12 relative min-h-[480px]">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="submitted-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col items-center justify-center text-center py-12 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-500 animate-bounce">
                <Icon name="check_circle" className="text-3xl" />
              </div>
              <div className="space-y-2">
                <h3 className="font-headline-lg text-2xl text-primary font-bold">Proposal Request Submitted</h3>
                <p className="text-on-surface-variant text-sm max-w-sm mx-auto leading-relaxed">
                  Your coordinates have been registered. A commercial representative will review your custom specifications and follow up within 24 business hours.
                </p>
              </div>
              <div className="pt-4 flex gap-4">
                <button
                  onClick={onResetForm}
                  className="px-6 py-3 border border-outline-variant/60 rounded-full font-label-md text-xs uppercase tracking-wider text-primary hover:bg-slate-50 cursor-pointer transition-all"
                >
                  New Inquiry
                </button>
                <a
                  href="mailto:senthil@adtextile.com"
                  className="px-6 py-3 bg-primary text-white rounded-full font-label-md text-xs uppercase tracking-wider hover:bg-[#1E293B] cursor-pointer transition-all flex items-center gap-2"
                >
                  Email Directly
                  <Icon name="arrow_forward" className="text-xs" />
                </a>
              </div>
            </motion.div>
          ) : isSubmitting ? (
            <motion.div
              key="submitting-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-white/90 backdrop-blur-xs z-20 flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full border-4 border-secondary/20 border-t-secondary animate-spin" />
              <p className="font-label-md text-xs font-semibold uppercase tracking-widest text-primary">
                Processing Commercial Data...
              </p>
            </motion.div>
          ) : activeTab === 'enquiry' ? (
            <EnquiryForm formState={formState} onChange={onChange} onSubmit={onSubmit} />
          ) : (
            <QuoteForm formState={formState} onChange={onChange} onToggleCategory={onToggleCategory} onSubmit={onSubmit} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default ContactFormCard
