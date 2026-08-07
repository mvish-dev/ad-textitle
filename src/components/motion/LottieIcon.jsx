import { Component, Suspense, lazy } from 'react'
import { prefersReducedMotion } from '../../lib/motion.js'

class LottieErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.warn('Lottie animation failed to render.', error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

// lottie-web is a ~300kB dependency for what's a small decorative accent, so
// it's dynamically imported here rather than pulled into every page that
// renders an icon. Only the pages that actually use LottieIcon pay for it.
const LazyLottie = lazy(() => import('lottie-react'))

// Small looping accent layered behind a static icon — adds motion without
// replacing the semantic icon itself, so the icon stays legible even if the
// animation data ever fails to load.
function LottieIcon({ animationData, className = '' }) {
  if (prefersReducedMotion()) return null

  return (
    <LottieErrorBoundary>
      <Suspense fallback={null}>
        <LazyLottie animationData={animationData} loop autoplay className={className} />
      </Suspense>
    </LottieErrorBoundary>
  )
}

export default LottieIcon
