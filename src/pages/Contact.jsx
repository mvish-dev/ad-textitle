import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import Icon from '../components/ui/Icon.jsx'
import Button from '../components/ui/Button.jsx'

function Contact() {
  const location = useLocation()
  const [message, setMessage] = useState(() => {
    const queryParams = new URLSearchParams(location.search)
    const product = queryParams.get('product')
    const category = queryParams.get('category')
    return product
      ? `Hi, I am interested in inquiring about product ${product} from the ${category || 'Home Textile'} collection. Please provide specifications, minimum order quantity, and pricing.`
      : ''
  })
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden py-16 md:py-24 pt-28 border-b border-outline-variant/30">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <span className="eyebrow">
              Global Partners
            </span>
            <h1 className="section-title mb-8 leading-tight">
              Connect with Global <em>Excellence</em>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mb-10 leading-relaxed">
              Bridging international design with vertically integrated manufacturing scale. Our global infrastructure is
              ready to support your retail expansion.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-outline-variant/30 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-label-md text-xs text-on-surface-variant font-semibold uppercase tracking-wider">AI Assistant Available</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[450px] flex items-center justify-center"
          >
            {/* World Map Graphic Background */}
            <div className="w-full h-full opacity-10 absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="relative w-full aspect-square md:aspect-auto h-full flex items-center justify-center">
              <img
                className="w-full h-full object-contain brightness-95"
                alt="Minimalist world map graphic centering on India"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJTryBEnKjTrnkY7hWkXpXOLjWNLZ-eOSuna80CHlsg0yg89Yd-4PLWy0FEShiikdo006DnWlOLulsPCzzY_B0R_8IunMMMbwE5DYJrzZrRklZ4rMmXcRzds5JHdX5Bf-tzeu5cvrpcyNF5QB69yXvHPBXQQv1ts_ONCMcG4e9lvfB4ny9I5mmf4kAJoDFsMuyR0OFAgvWffpr80oTtZ5vIxdJKhMYp86PkWIIyzquwfWm_6e6zTB8NE1Xrts32ZJaN5MOnjxFZ7E"
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Contact Grid */}
      <section className="py-section-gap-lg bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-white p-8 md:p-12 border border-outline-variant/30 rounded-2xl shadow-sm"
            >
              <h2 className="font-headline-lg text-2xl mb-8 font-semibold text-primary">Direct Inquiry</h2>
              <form
                action="mailto:senthil@adtextile.com"
                className="space-y-6"
                method="post"
                encType="text/plain"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-md text-xs text-on-surface-variant font-semibold uppercase tracking-wider block">FULL NAME</label>
                    <input
                      className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-0 px-4 py-3 text-body-md transition-all outline-none"
                      name="name"
                      placeholder="John Doe"
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-xs text-on-surface-variant font-semibold uppercase tracking-wider block">COMPANY</label>
                    <input
                      className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-0 px-4 py-3 text-body-md transition-all outline-none"
                      name="company"
                      placeholder="Global Retail Ltd."
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-xs text-on-surface-variant font-semibold uppercase tracking-wider block">YOUR MESSAGE</label>
                  <textarea
                    className="w-full bg-background border border-outline-variant/30 rounded-lg focus:border-secondary focus:ring-0 px-4 py-3 text-body-md transition-all outline-none"
                    name="message"
                    placeholder="How can we assist with your textile requirements?"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button
                  className="w-full py-4.5 bg-primary hover:bg-[#1E293B] text-white font-label-md text-xs font-semibold uppercase tracking-widest transition-all rounded-full flex items-center justify-center gap-3 cursor-pointer shadow-[0_8px_32px_rgba(15,23,42,0.15)] hover:shadow-lg hover:-translate-y-0.5"
                  type="submit"
                >
                  Send Inquiry
                  <Icon name="arrow_forward" />
                </button>
              </form>
            </motion.div>

            {/* Right: Address & Contacts */}
            <div className="lg:col-span-5 flex flex-col justify-between py-4">
              <div className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="font-label-md text-xs text-secondary uppercase mb-4 flex items-center gap-2 font-semibold tracking-wider">
                    <i className="fa-solid fa-industry text-xs" /> Our Facility
                  </h3>
                  <p className="font-headline-lg text-2xl font-semibold leading-tight mb-2 text-primary">
                    1/104, Sanjay Nagar, Erode Road
                  </p>
                  <p className="font-body-md text-xs text-on-surface-variant mb-4 leading-relaxed">
                    Athur Post, Karur – 639002, Tamil Nadu, India
                  </p>
                  <a
                    className="text-secondary font-label-md text-xs uppercase tracking-wider font-semibold flex items-center gap-2 hover:underline"
                    href="#map"
                  >
                    View on Maps <Icon name="open_in_new" className="text-sm" />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="font-label-md text-xs text-secondary uppercase mb-4 flex items-center gap-2 font-semibold tracking-wider">
                    <i className="fa-solid fa-user-tie text-xs" /> Mr. D. Senthil Kumar
                  </h3>
                  <a
                    className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors block mb-1 font-semibold"
                    href="tel:+919994399077"
                  >
                    +91 999 43 99 077
                  </a>
                  <a
                    className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors block font-semibold"
                    href="mailto:senthil@adtextile.com"
                  >
                    senthil@adtextile.com
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="font-label-md text-xs text-secondary uppercase mb-4 flex items-center gap-2 font-semibold tracking-wider">
                    <i className="fa-solid fa-user text-xs" /> Mr. S. Deepak
                  </h3>
                  <a
                    className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors block mb-1 font-semibold"
                    href="tel:+919790557077"
                  >
                    +91 97 90 55 7077
                  </a>
                  <a
                    className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors block font-semibold"
                    href="mailto:deepak@adtextile.com"
                  >
                    deepak@adtextile.com
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Information Cards */}
      <section className="py-section-gap-lg bg-[#F3F2EF]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Card 1: D. Senthil Kumar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-10 bg-white border border-outline-variant/30 rounded-xl hover:border-secondary transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-md"
            >
              <i className="fa-solid fa-user-tie text-4xl text-secondary mb-8 block" />
              <h4 className="font-headline-lg text-2xl font-semibold mb-4 text-primary">Mr. D. Senthil Kumar</h4>
              <p className="font-body-md text-xs text-on-surface-variant mb-8 flex-grow leading-relaxed">
                For sales enquiries, bulk orders, and general information, reach out directly.
              </p>
              <a
                className="font-label-md text-xs uppercase tracking-wider text-secondary flex items-center gap-2 mb-2 font-semibold hover:underline"
                href="mailto:senthil@adtextile.com"
              >
                senthil@adtextile.com <Icon name="mail" className="text-sm" />
              </a>
              <a
                className="font-label-md text-xs uppercase tracking-wider text-secondary flex items-center gap-2 font-semibold hover:underline"
                href="tel:+919994399077"
              >
                +91 999 43 99 077 <Icon name="call" className="text-sm" />
              </a>
            </motion.div>
            {/* Card 2: S. Deepak */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-10 bg-white border border-outline-variant/30 rounded-xl hover:border-secondary transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-md"
            >
              <i className="fa-solid fa-user text-4xl text-secondary mb-8 block" />
              <h4 className="font-headline-lg text-2xl font-semibold mb-4 text-primary">Mr. S. Deepak</h4>
              <p className="font-body-md text-xs text-on-surface-variant mb-8 flex-grow leading-relaxed">
                For order status, export documentation, and quality-related queries, get in touch directly.
              </p>
              <a
                className="font-label-md text-xs uppercase tracking-wider text-secondary flex items-center gap-2 mb-2 font-semibold hover:underline"
                href="mailto:deepak@adtextile.com"
              >
                deepak@adtextile.com <Icon name="mail" className="text-sm" />
              </a>
              <a
                className="font-label-md text-xs uppercase tracking-wider text-secondary flex items-center gap-2 font-semibold hover:underline"
                href="tel:+919790557077"
              >
                +91 97 90 55 7077 <Icon name="call" className="text-sm" />
              </a>
            </motion.div>
          </div>
          <div className="mt-16 p-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-lg">
                <i className="fa-regular fa-clock text-secondary text-xl" />
              </div>
              <div>
                <p className="font-label-md text-xs font-semibold uppercase tracking-wider text-primary">BUSINESS HOURS</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Monday — Friday: 09:00 AM - 06:00 PM IST</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                className="w-11 h-11 flex items-center justify-center rounded-full border border-outline-variant/30 text-on-surface-variant hover:border-secondary hover:text-secondary transition-all"
                href="mailto:senthil@adtextile.com"
              >
                <i className="fa-solid fa-envelope" />
              </a>
              <a
                className="w-11 h-11 flex items-center justify-center rounded-full border border-outline-variant/30 text-on-surface-variant hover:border-secondary hover:text-secondary transition-all"
                href="tel:+919994399077"
              >
                <i className="fa-solid fa-phone" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Map Section */}
      <section className="relative h-[480px] w-full overflow-hidden border-t border-b border-outline-variant/30 animate-fadeIn" id="map">
        <div className="w-full h-full bg-surface-dim relative overflow-hidden">
          <iframe
            title="AD Textile Location Map"
            allowFullScreen=""
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.8411189853946!2d78.03229361428843!3d10.975362458492565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2edbd75b17db%3A0xd928ababee21246!2sA.D.TEXTILE(P)LTD!5e0!3m2!1sen!2sin!4v1585297930512!5m2!1sen!2sin"
            style={{ border: 0 }}
            width="100%"
          />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary text-white py-section-gap-lg overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 hidden md:block z-0">
          <img
            className="w-full h-full object-cover scale-[1.02] brightness-50"
            alt="Indigo denim fabric texture details"
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80&auto=format&fit=crop"
          />
        </div>
        <Container className="relative z-10 text-center md:text-left text-white">
          <div className="max-w-2xl">
            <h2 className="font-display-lg text-4xl md:text-5xl leading-tight mb-8 text-white">
              Start Your Next Textile Partnership.
            </h2>
            <p className="font-body-lg text-white/70 text-[0.92rem] leading-relaxed mb-12">
              Leverage our vertical integration for your brand's growth. From fiber sourcing to finished garments, we
              offer end-to-end reliability.
            </p>
            <Button
              href="mailto:senthil@adtextile.com"
              variant="primary"
              size="lg"
              className="!bg-white !text-primary hover:!bg-secondary-fixed shadow-xl"
            >
              Inquire Now
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Contact
