import { Component } from 'react'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import Seo from './Seo.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled error in route content:', error, info)
  }

  // Route changes (a new resetKey) mean the crashing content has already
  // been swapped out, so recover automatically instead of leaving the user
  // stuck on the fallback until a manual reload.
  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null })
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <Container as="section" className="py-section-gap-lg text-center">
        <Seo title="Something Went Wrong" description="An unexpected error occurred." noindex />
        <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Error</span>
        <h1 className="font-headline-xl text-headline-xl text-primary mt-4 mb-6">Something Went Wrong</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-xl mx-auto">
          We hit an unexpected error loading this page. Reloading usually fixes it — if it keeps happening, head back
          to the homepage.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => window.location.reload()} variant="primary" size="lg">
            Reload Page
          </Button>
          <Button to="/" variant="outline" size="lg" className="text-primary border-primary">
            Back to Home
          </Button>
        </div>
        {import.meta.env.DEV && this.state.error && (
          <pre className="mt-10 max-w-2xl mx-auto text-left text-xs text-error bg-error-container/40 border border-error/30 rounded-lg p-4 overflow-auto">
            {this.state.error.message}
            {'\n'}
            {this.state.error.stack}
          </pre>
        )}
      </Container>
    )
  }
}

export default ErrorBoundary
