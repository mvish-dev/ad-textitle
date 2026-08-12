import { Link } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import Seo from '../components/common/Seo.jsx'

function Terms() {
  return (
    <Container className="pt-32 pb-section-gap-lg max-w-3xl mx-auto">
      <Seo title="Terms of Service" description="The terms governing use of the AD Textile website and our manufacturing and export services." />
      <h1 className="font-headline-xl text-headline-xl text-primary mb-4">Terms of Service</h1>
      <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-12">
        Last updated: 2026
      </p>
      <div className="space-y-8 font-body-md text-body-md text-on-surface-variant">
        <p>
          These terms govern your use of this website, operated by Angayeeammal Devarajan Textile Pvt. Ltd. (&quot;AD
          Textile&quot;, &quot;we&quot;, &quot;us&quot;). By browsing this site, you agree to these terms.
        </p>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">Website content</h2>
          <p>
            Content on this site — including product descriptions, images, and company information — is provided for general
            informational purposes about our manufacturing capabilities and product range. It does not constitute a binding
            offer; all orders are subject to a separate agreement between AD Textile and the buyer.
          </p>
        </div>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">Intellectual property</h2>
          <p>
            The AD Textile name, logo, and site content are the property of Angayeeammal Devarajan Textile Pvt. Ltd. and may
            not be reproduced without permission.
          </p>
        </div>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-3">Contact us</h2>
          <p>
            Questions about these terms can be sent via our{' '}
            <Link className="text-primary underline font-semibold" to="/contact">
              Contact page
            </Link>{' '}
            or to{' '}
            <a className="text-primary underline font-semibold" href="mailto:senthil@adtextile.com">
              senthil@adtextile.com
            </a>
            .
          </p>
        </div>
        <p className="text-sm opacity-70 italic">
          This is a summary terms page. Full, legally-reviewed terms will be published here in due course.
        </p>
      </div>
    </Container>
  )
}

export default Terms
