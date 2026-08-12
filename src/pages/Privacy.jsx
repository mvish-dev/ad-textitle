import { Link } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import Seo from '../components/common/Seo.jsx'

function Privacy() {
  return (
    <Container className="pt-32 pb-section-gap-lg max-w-3xl mx-auto">
      <Seo title="Privacy Policy" description="How AD Textile collects, uses and protects the information you share with us through this website." />
      <h1 className="font-headline-xl text-headline-xl text-primary mb-4">Privacy Policy</h1>
      <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-12">
        Last updated: 2026
      </p>
      <div className="space-y-8 font-body-md text-body-md text-on-surface-variant">
        <p>
          Angayeeammal Devarajan Textile Pvt. Ltd. (&quot;AD Textile&quot;, &quot;we&quot;, &quot;us&quot;) respects your
          privacy. This page explains, in brief, how information you share with us through this website is handled.
        </p>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">Information we collect</h2>
          <p>
            When you contact us through the enquiry form or by email, we collect the details you choose to provide — such
            as your name, company, email address, and message — solely to respond to your enquiry.
          </p>
        </div>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">How we use it</h2>
          <p>
            Information submitted through this site is used only to respond to your enquiry and to communicate with you
            about our products and services. We do not sell or rent your information to third parties.
          </p>
        </div>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">Contact us</h2>
          <p>
            If you have questions about this policy, please reach out via our{' '}
            <Link className="text-primary underline font-semibold" to="/contact">
              Contact page
            </Link>{' '}
            or email{' '}
            <a className="text-primary underline font-semibold" href="mailto:senthil@adtextile.com">
              senthil@adtextile.com
            </a>
            .
          </p>
        </div>
        <p className="text-sm opacity-70 italic">
          This is a summary policy. A full, legally-reviewed privacy policy will be published here in due course.
        </p>
      </div>
    </Container>
  )
}

export default Privacy
