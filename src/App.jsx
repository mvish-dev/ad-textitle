import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout.jsx'
import AnimatedPage from './components/layout/AnimatedPage.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const Manufacturing = lazy(() => import('./pages/Manufacturing.jsx'))
const DesignDevelopment = lazy(() => import('./pages/DesignDevelopment.jsx'))
const PrivateLabel = lazy(() => import('./pages/PrivateLabel.jsx'))
const QualityCompliance = lazy(() => import('./pages/QualityCompliance.jsx'))
const Sustainability = lazy(() => import('./pages/Sustainability.jsx'))
const Exports = lazy(() => import('./pages/Exports.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const LivingLinen = lazy(() => import('./pages/LivingLinen.jsx'))
const HeritageBedLinen = lazy(() => import('./pages/HeritageBedLinen.jsx'))
const KitchenLinen = lazy(() => import('./pages/KitchenLinen.jsx'))
const TableLinen = lazy(() => import('./pages/TableLinen.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes location={location} key={location.pathname}>
            <Route index element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="about" element={<AnimatedPage><About /></AnimatedPage>} />
            <Route path="products" element={<AnimatedPage><Products /></AnimatedPage>} />
            <Route path="manufacturing" element={<AnimatedPage><Manufacturing /></AnimatedPage>} />
            <Route path="design-development" element={<AnimatedPage><DesignDevelopment /></AnimatedPage>} />
            <Route path="private-label" element={<AnimatedPage><PrivateLabel /></AnimatedPage>} />
            <Route path="quality-compliance" element={<AnimatedPage><QualityCompliance /></AnimatedPage>} />
            <Route path="sustainability" element={<AnimatedPage><Sustainability /></AnimatedPage>} />
            <Route path="exports" element={<AnimatedPage><Exports /></AnimatedPage>} />
            <Route path="contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
            <Route path="living-linen" element={<AnimatedPage><LivingLinen /></AnimatedPage>} />
            <Route path="heritage-bed-linen" element={<AnimatedPage><HeritageBedLinen /></AnimatedPage>} />
            <Route path="kitchen-linen" element={<AnimatedPage><KitchenLinen /></AnimatedPage>} />
            <Route path="table-linen" element={<AnimatedPage><TableLinen /></AnimatedPage>} />
            <Route path="privacy" element={<AnimatedPage><Privacy /></AnimatedPage>} />
            <Route path="terms" element={<AnimatedPage><Terms /></AnimatedPage>} />
            <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Layout>
  )
}

export default App
