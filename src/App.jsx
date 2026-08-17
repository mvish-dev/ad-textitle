import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout.jsx'
import AnimatedPage from './components/layout/AnimatedPage.jsx'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const Manufacturing = lazy(() => import('./pages/Manufacturing.jsx'))
const QualityCompliance = lazy(() => import('./pages/QualityCompliance.jsx'))
const Sustainability = lazy(() => import('./pages/Sustainability.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Dev-only crash trigger for manually verifying the ErrorBoundary fallback.
// import.meta.env.DEV is statically replaced at build time, so this route
// (and this component) are dead-code-eliminated from production builds.
function ThrowTestError() {
  throw new Error('Test error triggered from /__error-test')
}

function App() {
  const location = useLocation()

  return (
    <Layout>
      <ErrorBoundary resetKey={location.pathname}>
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes location={location} key={location.pathname}>
              <Route index element={<AnimatedPage><Home /></AnimatedPage>} />
              <Route path="about" element={<AnimatedPage><About /></AnimatedPage>} />
              <Route path="products" element={<AnimatedPage><Products /></AnimatedPage>} />
              <Route path="manufacturing" element={<AnimatedPage><Manufacturing /></AnimatedPage>} />
              <Route path="quality-compliance" element={<AnimatedPage><QualityCompliance /></AnimatedPage>} />
              <Route path="sustainability" element={<AnimatedPage><Sustainability /></AnimatedPage>} />
              <Route path="contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
              <Route path="living-linen" element={<Navigate to="/products" replace />} />
              <Route path="heritage-bed-linen" element={<Navigate to="/products" replace />} />
              <Route path="kitchen-linen" element={<Navigate to="/products" replace />} />
              <Route path="table-linen" element={<Navigate to="/products" replace />} />
              {import.meta.env.DEV && (
                <Route path="__error-test" element={<AnimatedPage><ThrowTestError /></AnimatedPage>} />
              )}
              <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </ErrorBoundary>
    </Layout>
  )
}

export default App
