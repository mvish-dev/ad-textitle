import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout.jsx'
import AnimatedPage from './components/layout/AnimatedPage.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import Infrastructure from './pages/Infrastructure.jsx'
import Sustainability from './pages/Sustainability.jsx'
import Certifications from './pages/Certifications.jsx'
import Contact from './pages/Contact.jsx'
import LivingLinen from './pages/LivingLinen.jsx'
import HeritageBedLinen from './pages/HeritageBedLinen.jsx'
import KitchenLinen from './pages/KitchenLinen.jsx'
import TableLinen from './pages/TableLinen.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="about" element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="products" element={<AnimatedPage><Products /></AnimatedPage>} />
          <Route path="infrastructure" element={<AnimatedPage><Infrastructure /></AnimatedPage>} />
          <Route path="sustainability" element={<AnimatedPage><Sustainability /></AnimatedPage>} />
          <Route path="certifications" element={<AnimatedPage><Certifications /></AnimatedPage>} />
          <Route path="contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
          <Route path="living-linen" element={<AnimatedPage><LivingLinen /></AnimatedPage>} />
          <Route path="heritage-bed-linen" element={<AnimatedPage><HeritageBedLinen /></AnimatedPage>} />
          <Route path="kitchen-linen" element={<AnimatedPage><KitchenLinen /></AnimatedPage>} />
          <Route path="table-linen" element={<AnimatedPage><TableLinen /></AnimatedPage>} />
          <Route path="privacy" element={<AnimatedPage><Privacy /></AnimatedPage>} />
          <Route path="terms" element={<AnimatedPage><Terms /></AnimatedPage>} />
          <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App
