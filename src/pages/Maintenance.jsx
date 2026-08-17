import Icon from '../components/ui/Icon.jsx'
import Seo from '../components/common/Seo.jsx'

// Standalone full-site takeover — deliberately does not use Layout (no
// header/footer/nav), since maintenance mode means every other route is
// meant to be unreachable too. Gated behind VITE_MAINTENANCE_MODE in
// main.jsx, which renders this instead of <App/> entirely.
function Maintenance() {
  return (
    <div className="min-h-screen w-full bg-primary text-white flex flex-col items-center justify-center px-6 text-center">
      <Seo title="Under Maintenance" description="AD Textile is undergoing scheduled maintenance." noindex />
      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-8">
        <Icon name="construction" className="text-3xl text-secondary" />
      </div>
      <span className="font-label-md text-xs font-semibold uppercase tracking-widest text-secondary mb-5 block">
        Scheduled Maintenance
      </span>
      <h1 className="font-headline-xl text-[clamp(2rem,1.6rem+2vw,3.5rem)] font-bold mb-6 max-w-2xl">
        We'll Be Back <em className="italic text-secondary">Soon</em>
      </h1>
      <p className="font-body-md text-white/70 text-base max-w-md mb-10 leading-relaxed">
        We're performing scheduled maintenance to improve your experience. Please check back shortly.
      </p>
      <div className="flex flex-col items-center gap-2 text-sm text-white/60">
        <span className="uppercase tracking-widest text-xs font-semibold text-white/50">
          For urgent inquiries
        </span>
        <a href="mailto:deepak@adtextile.com" className="hover:text-secondary transition-colors">
          deepak@adtextile.com
        </a>
      </div>
    </div>
  )
}

export default Maintenance
