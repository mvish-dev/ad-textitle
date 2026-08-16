import { motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import Icon from '../ui/Icon.jsx'

function LocationMap() {
  return (
    <section className="w-full relative h-[480px] bg-slate-100 border-t border-b border-outline-variant/30 scroll-mt-20 overflow-hidden" id="google-map-section">
      <iframe
        title="AD Textile Location Map"
        allowFullScreen=""
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.8411189853946!2d78.03229361428843!3d10.975362458492565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2edbd75b17db%3A0xd928ababee21246!2sA.D.TEXTILE(P)LTD!5e0!3m2!1sen!2sin!4v1585297930512!5m2!1sen!2sin"
        style={{ border: 0, filter: 'grayscale(0.15) contrast(1.05)' }}
        width="100%"
      />

      {/* Floating Detail Card inside the map */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-start">
        <Container className="w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="pointer-events-auto bg-primary text-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-xs md:max-w-sm ml-4 md:ml-0 border border-white/10"
          >
            <div className="space-y-4">
              <span className="text-[0.62rem] text-secondary font-bold uppercase tracking-widest block">Main Headquarters</span>
              <h4 className="font-serif font-semibold text-lg text-white">A.D. Textile (P) Ltd</h4>
              <p className="text-xs text-white/70 leading-relaxed font-body-md">
                1/104, Sanjay Nagar, Erode Road, Athur Post, Karur &ndash; 639002, Tamil Nadu, India.
              </p>
              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                <a
                  href="https://maps.google.com/?q=A.D.TEXTILE(P)LTD"
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary font-bold hover:underline flex items-center gap-1.5"
                >
                  Navigate in Maps
                  <Icon name="open_in_new" className="text-xs" />
                </a>
                <span className="text-white/60">Open 09:00 - 18:00</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  )
}

export default LocationMap
