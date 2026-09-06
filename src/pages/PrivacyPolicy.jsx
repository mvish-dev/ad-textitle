import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import Seo from '../components/common/Seo.jsx'

const LAST_UPDATED = 'August 17, 2026'

const TOC_ITEMS = [
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use-information', label: 'How We Use Information' },
  { id: 'cookies-and-analytics', label: 'Cookies & Analytics' },
  { id: 'third-party-services', label: 'Third-Party Services' },
  { id: 'how-we-share-information', label: 'How We Share Information' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'your-rights', label: 'Your Rights & Choices' },
  { id: 'childrens-privacy', label: "Children's Privacy" },
  { id: 'international-transfers', label: 'International Data Transfers' },
  { id: 'policy-changes', label: 'Changes to This Policy' },
  { id: 'terms-of-service', label: 'Terms of Service' },
]

function Section({ id, title, children }) {
  return (
    <div id={id} className="scroll-mt-28">
      <h3 className="font-headline-lg text-xl md:text-2xl text-primary font-semibold mb-4">{title}</h3>
      <div className="font-body-md text-sm md:text-[0.95rem] text-on-surface-variant leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  )
}

function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy & Terms of Service"
        description="How A D Textile collects, uses and protects the information you share with us, and the terms that govern use of this website."
      />

      {/* Page Header — static, no motion/WebGL by design */}
      <section className="pt-32 pb-14 md:pb-16 bg-background border-b border-outline-variant/20">
        <Container>
          <span className="eyebrow">Legal</span>
          <h1 className="section-title mt-4 mb-5">
            Privacy Policy &amp; <em>Terms of Service</em>
          </h1>
          <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            This page explains what information A D Textile collects when you use this website, how it's used, and
            the terms that apply to your use of the site.
          </p>
          <p className="font-label-md text-[0.68rem] text-on-surface-variant/70 uppercase tracking-widest mt-6">
            Last updated: {LAST_UPDATED}
          </p>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-1">
          <Breadcrumbs items={[{ label: 'Privacy Policy & Terms' }]} />
        </Container>
      </section>

      <section className="pt-10 pb-section-gap-lg bg-background">
        <Container className="max-w-3xl mx-auto">
          {/* Table of contents */}
          <nav aria-label="Table of contents" className="mb-16 p-8 bg-white border border-outline-variant/30 rounded-2xl">
            <h2 className="font-label-md text-xs uppercase tracking-widest text-secondary font-semibold mb-5">
              On This Page
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-on-surface-variant hover:text-secondary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Privacy Policy */}
          <div id="privacy-policy" className="scroll-mt-28">
            <span className="eyebrow">Part 1</span>
            <h2 className="font-headline-xl text-2xl md:text-3xl text-primary font-semibold mt-2 mb-10">
              Privacy Policy
            </h2>

            <div className="space-y-12">
              <Section id="information-we-collect" title="1. Information We Collect">
                <p>
                  Angayeeammal Devarajan Textile Pvt. Ltd. ("A D Textile", "we", "us", "our") collects information in
                  the following ways when you use adtextile.com (the "Site"):
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-primary">Enquiry &amp; quote forms.</strong> When you submit our Contact
                    page forms, we collect your full name, work email, phone number, company name, and the details
                    of your enquiry — including, for quote requests, target order volume, product categories and
                    custom specifications you provide.
                  </li>
                  <li>
                    <strong className="text-primary">AI chat assistant.</strong> If you use the chat widget in the
                    corner of the Site, the messages you type are sent to our chat service so a response can be
                    generated. See <a href="#third-party-services" className="text-secondary hover:underline">Third-Party Services</a> below.
                  </li>
                  <li>
                    <strong className="text-primary">Usage data.</strong> We use Google Analytics to understand how
                    visitors use the Site — pages viewed, general location (country/city level), device and browser
                    type, and referring site. This is collected automatically via cookies and similar technologies.
                    See <a href="#cookies-and-analytics" className="text-secondary hover:underline">Cookies &amp; Analytics</a>.
                  </li>
                </ul>
                <p>
                  We do not operate a customer account system or an online store on this Site, so we do not collect
                  passwords or payment card details here.
                </p>
              </Section>

              <Section id="how-we-use-information" title="2. How We Use Information">
                <ul className="list-disc pl-5 space-y-2">
                  <li>To respond to enquiries, quote requests, and questions sent through our forms, chat widget, email or WhatsApp.</li>
                  <li>To prepare quotations, samples and order documentation once a sourcing conversation begins.</li>
                  <li>To understand how the Site is used, so we can improve its content and performance.</li>
                  <li>To meet legal, accounting, export-compliance and regulatory obligations.</li>
                </ul>
                <p>We do not use the information you submit for automated decision-making that produces legal or similarly significant effects, and we do not sell your personal information.</p>
              </Section>

              <Section id="cookies-and-analytics" title="3. Cookies & Analytics">
                <p>
                  The Site uses Google Analytics (Google tag / gtag.js) to measure traffic and usage. Google
                  Analytics sets cookies in your browser to distinguish visitors and sessions. This information is
                  processed by Google in aggregate/anonymised form to generate reports for us; we do not use it to
                  identify you individually.
                </p>
                <p>
                  You can control or disable cookies through your browser settings, or use a browser extension such
                  as Google's Analytics Opt-out Browser Add-on. Blocking cookies may affect some non-essential
                  features of the Site but will not prevent you from browsing it or submitting an enquiry.
                </p>
              </Section>

              <Section id="third-party-services" title="4. Third-Party Services">
                <p>The Site relies on a small number of third-party services to operate:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-primary">Google Analytics</strong> (Google LLC) — traffic and usage
                    measurement, described above.
                  </li>
                  <li>
                    <strong className="text-primary">AI chat assistant</strong> — messages you send through the chat
                    widget are transmitted to a chat service we operate on Cloudflare's infrastructure to generate a
                    reply. Please avoid sharing sensitive personal information (such as financial or ID details)
                    through the chat widget.
                  </li>
                  <li>
                    <strong className="text-primary">WhatsApp</strong> — the WhatsApp button on the Site opens a
                    chat with our sales team via WhatsApp (operated by WhatsApp Ireland Limited / Meta). Conversations
                    started this way are subject to WhatsApp's own privacy policy and terms, not this one.
                  </li>
                  <li>
                    <strong className="text-primary">Google Fonts</strong> — typefaces used on the Site are loaded
                    from Google's font servers.
                  </li>
                  <li>
                    <strong className="text-primary">Hosting.</strong> The Site is hosted on Hostinger's infrastructure,
                    which may process standard connection metadata (such as IP address) to serve pages to you.
                  </li>
                </ul>
              </Section>

              <Section id="how-we-share-information" title="5. How We Share Information">
                <p>
                  We do not sell or rent your personal information. We share it only: with the third-party service
                  providers described above, to the extent needed to operate the Site and respond to your enquiry;
                  with our own staff who handle sourcing, export documentation and accounts, on a need-to-know basis;
                  and where required to comply with a legal obligation, court order, or governmental request.
                </p>
              </Section>

              <Section id="data-retention" title="6. Data Retention">
                <p>
                  Enquiry and quote-request details are kept for as long as reasonably necessary to progress a
                  sourcing conversation and for a period afterwards to support order history, accounting and
                  export-compliance records. Analytics data is retained according to Google Analytics' standard
                  retention settings. You may ask us to delete your enquiry details at any time — see
                  {' '}<a href="#your-rights" className="text-secondary hover:underline">Your Rights &amp; Choices</a>.
                </p>
              </Section>

              <Section id="data-security" title="7. Data Security">
                <p>
                  We take reasonable technical and organisational measures to protect the information submitted
                  through this Site. No method of transmission over the internet is completely secure, so while we
                  work to protect your information, we cannot guarantee its absolute security.
                </p>
              </Section>

              <Section id="your-rights" title="8. Your Rights & Choices">
                <p>Depending on where you're located, you may have the right to ask us to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Confirm what personal information we hold about you and provide a copy of it.</li>
                  <li>Correct inaccurate or incomplete information.</li>
                  <li>Delete information you've submitted to us, where we're not required to keep it for a legal or accounting reason.</li>
                  <li>Withdraw consent for marketing communications, where applicable.</li>
                </ul>
                <p>
                  To exercise any of these, email us at{' '}
                  <a href="mailto:deepak@adtextile.com" className="text-secondary hover:underline">
                    deepak@adtextile.com
                  </a>{' '}
                  and we'll respond within a reasonable time.
                </p>
              </Section>

              <Section id="childrens-privacy" title="9. Children's Privacy">
                <p>
                  This Site is intended for business use by manufacturers, brands, importers and their
                  representatives. It is not directed at children, and we do not knowingly collect personal
                  information from anyone under 18.
                </p>
              </Section>

              <Section id="international-transfers" title="10. International Data Transfers">
                <p>
                  We are based in Karur, Tamil Nadu, India, and the information you submit is primarily processed
                  there. Because we use international service providers (such as Google and Cloudflare, described
                  above), your information may be processed in other countries, including countries whose data
                  protection laws differ from those of your home country.
                </p>
              </Section>

              <Section id="policy-changes" title="11. Changes to This Policy">
                <p>
                  We may update this policy from time to time to reflect changes to the Site or how we handle
                  information. The "Last updated" date at the top of this page shows when it was last revised.
                  Continued use of the Site after an update means you accept the revised policy.
                </p>
              </Section>
            </div>
          </div>

          {/* Terms of Service */}
          <div id="terms-of-service" className="scroll-mt-28 mt-24 pt-16 border-t border-outline-variant/30">
            <span className="eyebrow">Part 2</span>
            <h2 className="font-headline-xl text-2xl md:text-3xl text-primary font-semibold mt-2 mb-10">
              Terms of Service
            </h2>

            <div className="space-y-12">
              <Section id="acceptance-of-terms" title="1. Acceptance of Terms">
                <p>
                  By accessing or using adtextile.com, you agree to these Terms of Service. If you do not agree,
                  please do not use the Site. These terms apply to browsing the Site and to enquiries submitted
                  through it; any resulting supply agreement, purchase order or export contract will be governed by
                  its own separately agreed terms.
                </p>
              </Section>

              <Section id="use-of-site" title="2. Use of This Website">
                <p>You agree to use the Site only for lawful purposes, and not to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Attempt to gain unauthorised access to the Site, its chat service, or any related system.</li>
                  <li>Interfere with the Site's normal operation, including through excessive automated requests.</li>
                  <li>Submit false, misleading or fraudulent information through our forms or chat widget.</li>
                  <li>Use content from the Site to misrepresent A D Textile or its products.</li>
                </ul>
              </Section>

              <Section id="intellectual-property" title="3. Intellectual Property">
                <p>
                  The text, photography, videos, logos and design of this Site are owned by A D Textile or licensed
                  to us, and are protected by applicable intellectual property laws. You may view and share pages of
                  the Site for legitimate business evaluation of A D Textile as a manufacturing partner, but may not
                  otherwise copy, reproduce or redistribute Site content without our prior written permission.
                </p>
              </Section>

              <Section id="product-information" title="4. Product Information & Quotes">
                <p>
                  Product descriptions, capabilities, certifications and imagery on the Site are provided for
                  general information. Specifications, minimum order quantities, lead times and pricing discussed
                  through an enquiry, quote form or chat conversation are indicative and subject to confirmation —
                  they do not constitute a binding offer until confirmed in writing (for example, in a signed
                  proforma invoice or purchase order) by an authorised representative of A D Textile.
                </p>
              </Section>

              <Section id="no-warranties" title="5. No Warranties">
                <p>
                  The Site is provided "as is". While we try to keep its content accurate and up to date, we make no
                  warranty that the Site will be uninterrupted, error-free, or that its content is complete or
                  current at all times.
                </p>
              </Section>

              <Section id="limitation-of-liability" title="6. Limitation of Liability">
                <p>
                  To the fullest extent permitted by law, A D Textile is not liable for any indirect, incidental or
                  consequential loss arising from your use of, or inability to use, this Site. This does not limit
                  any liability that cannot be excluded under applicable law, or any liability arising under a
                  separately signed supply or export agreement.
                </p>
              </Section>

              <Section id="third-party-links" title="7. Third-Party Links & Services">
                <p>
                  The Site links out to third-party services such as WhatsApp and Google Maps. We aren't responsible
                  for the content, privacy practices, or terms of any third-party site or service you reach through
                  these links.
                </p>
              </Section>

              <Section id="governing-law" title="8. Governing Law & Jurisdiction">
                <p>
                  These terms are governed by the laws of India. Any dispute arising from your use of this Site will
                  be subject to the exclusive jurisdiction of the courts having jurisdiction over Karur, Tamil Nadu,
                  India.
                </p>
              </Section>

              <Section id="terms-changes" title="9. Changes to These Terms">
                <p>
                  We may revise these terms from time to time. The version published on this page at the time you
                  use the Site is the version that applies.
                </p>
              </Section>

              <Section id="contact" title="10. Contact Us">
                <p>
                  Questions about this Privacy Policy or these Terms of Service can be sent to{' '}
                  <a href="mailto:deepak@adtextile.com" className="text-secondary hover:underline">
                    deepak@adtextile.com
                  </a>{' '}
                  or to our facility address: 1/104, Sanjay Nagar, Erode Road, Athur Post, Karur – 639002, Tamil
                  Nadu, India.
                </p>
              </Section>
            </div>
          </div>

          {/* Contact callout */}
          <div className="mt-20 p-8 md:p-10 bg-primary rounded-2xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="font-headline-lg text-xl font-semibold mb-2 text-white">Questions about your data?</h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                Reach out to our team directly and we'll get back to you.
              </p>
            </div>
            <Button to="/contact" variant="primary" className="!bg-white !text-primary shrink-0">
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default PrivacyPolicy
