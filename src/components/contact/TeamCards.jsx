import { motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import Icon from '../ui/Icon.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import RevealText from '../motion/RevealText.jsx'

const TEAM_MEMBERS = [
  {
    initials: 'DS',
    name: 'Mr. D. Senthil Kumar',
    role: 'Commercial Director',
    tag: 'Sales & Contracts',
    bio: 'Responsible for global retail accounts, customized production tenders, client onboarding, and bulk supply negotiations.',
    email: 'senthil@adtextile.com',
    whatsapp: '919994399077',
  },
  {
    initials: 'SD',
    name: 'Mr. S. Deepak',
    role: 'Operations Director',
    tag: 'Exports & Quality',
    bio: 'Focuses on global shipment logistics, custom clearance documents, production tracking, and GOTS/Oeko-Tex certification compliance.',
    email: 'deepak@adtextile.com',
    whatsapp: '919790557077',
  },
]

function TeamCards() {
  return (
    <section className="py-20 md:py-28 bg-[#F3F2EF]" id="team-details">
      <Container className="space-y-16">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="eyebrow">Our Leadership</span>
          <RevealText as="h2" className="section-title text-3xl font-light text-primary">
            Direct Corporate <em className="font-serif italic font-normal text-secondary">Contacts</em>
          </RevealText>
          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
            Reach out directly to our commercial directors to align on retail volumes, pricing models, export specifications, and customs logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.email}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-outline-variant/30 rounded-2xl p-8 hover:border-secondary hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex flex-col items-start gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-secondary to-[#A8834A] text-white flex items-center justify-center font-serif text-lg font-bold shadow-md">
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-primary">{member.name}</h3>
                      <p className="text-xs text-secondary font-semibold uppercase tracking-wider mt-0.5">{member.role}</p>
                    </div>
                  </div>
                  <span className="shrink-0 bg-primary/5 text-primary text-[0.62rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                    {member.tag}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">{member.bio}</p>

                <div className="border-t border-outline-variant/20 pt-6 space-y-3">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-between text-xs font-semibold text-primary hover:text-secondary group transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Icon name="mail" className="text-base text-on-surface-variant group-hover:text-secondary" />
                      {member.email}
                    </span>
                    <Icon name="arrow_forward" className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              <div className="pt-8 flex gap-3">
                <a
                  href={`mailto:${member.email}`}
                  className="flex-1 py-3 text-center bg-primary text-white rounded-full font-label-md text-[0.7rem] uppercase font-semibold tracking-wider hover:bg-[#1E293B] transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="mail" className="text-xs" />
                  Email Desk
                </a>
                <a
                  href={`https://wa.me/${member.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 border border-emerald-500/30 text-emerald-500 rounded-full font-label-md text-xs hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2"
                  title="Connect via WhatsApp"
                >
                  <WhatsAppIcon className="text-base" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default TeamCards
