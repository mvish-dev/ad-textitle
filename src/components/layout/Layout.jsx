import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import FloatingAssistant from '../ui/FloatingAssistant.jsx'
import CustomCursor from '../ui/CustomCursor.jsx'

function Layout({ children }) {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Allow transition to finish before scrolling to hashes
      const timer = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  const showFooter = pathname !== '/infrastructure'

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden">
      <Header />
      {/* No top padding here: hero sections bleed their background behind
          the fixed nav, so each page owns its own top offset (pt-20/pt-24
          on its first section) instead of a blanket main padding. */}
      <main className="overflow-x-hidden relative min-h-screen flex flex-col">
        {children}
      </main>
      {showFooter && <Footer />}
      <FloatingAssistant />
      <CustomCursor />
    </div>
  )
}

export default Layout
