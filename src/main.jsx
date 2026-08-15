import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Maintenance from './pages/Maintenance.jsx'

// Full-site takeover: bypasses Routes/Layout entirely (not just another
// route) so every path is unreachable while this is on, matching how
// static-site maintenance mode normally works. Toggle locally via a
// .env.local with VITE_MAINTENANCE_MODE=true (gitignored, not committed).
const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE === 'true'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {MAINTENANCE_MODE ? <Maintenance /> : <App />}
    </BrowserRouter>
  </StrictMode>,
)
