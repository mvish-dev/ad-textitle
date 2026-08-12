import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import Seo from '../components/common/Seo.jsx'

function NotFound() {
  return (
    <Container as="section" className="py-section-gap-lg text-center">
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist or may have moved." noindex />
      <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">404</span>
      <h1 className="font-headline-xl text-headline-xl text-primary mt-4 mb-6">Page not found</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-xl mx-auto">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button to="/" variant="primary" size="lg">
        Back to Home
      </Button>
    </Container>
  )
}

export default NotFound
