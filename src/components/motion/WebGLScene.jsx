import { Component, Suspense, lazy, useState } from 'react'
import { prefersReducedMotion } from '../../lib/motion.js'

function detectWebGL() {
  if (prefersReducedMotion() || typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    // Release this throwaway context immediately rather than leaving it for
    // GC — otherwise every mount (React StrictMode double-invokes this) eats
    // into the browser's small per-page WebGL context budget, starving the
    // real scene the check was gating.
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return !!gl
  } catch {
    return false
  }
}

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.warn('WebGL scene failed to mount, falling back to static background.', error)
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}

// Wraps a lazily-imported react-three-fiber scene so pages can drop it
// behind hero content without: paying the three.js bundle cost on routes
// that don't use it (dynamic import), running when the OS asks for reduced
// motion, or breaking the page if WebGL isn't available. `fallback` should
// be the static image/gradient the page already renders as its base layer.
function WebGLScene({ loader, fallback = null, ...props }) {
  const [Scene] = useState(() => lazy(loader))
  const [enabled] = useState(detectWebGL)

  if (!enabled) return fallback

  return (
    <CanvasErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <Scene {...props} />
      </Suspense>
    </CanvasErrorBoundary>
  )
}

export default WebGLScene
