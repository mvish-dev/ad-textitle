// Express app configuration — no app.listen() here.
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'

import healthRouter from './routes/health.js'
import contactRouter from './routes/contact.js'
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// server/src → server → project root → dist
const distPath = path.resolve(__dirname, '../../dist')

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const app = express()

app.disable('x-powered-by')
app.set('trust proxy', 1)

// Explicit CSP: helmet's defaults would otherwise block the third-party
// origins this SPA actually loads from (Google Fonts, GA4/gtag, the Google
// Maps embed on /contact, and the chatbot's Cloudflare Worker backend).
// 'unsafe-inline' on script-src is required for the inline gtag bootstrap
// snippet in index.html; on style-src it covers React's inline style={{}}
// usage (e.g. FloatingAssistant's SpinningRing) since Tailwind's own output
// is static, hashed CSS and doesn't need it.
app.use(
  helmet({
    // Explicit (helmet defaults to the stricter "no-referrer"): this keeps
    // the referrer on same-origin navigations and on upgrades to a more
    // secure protocol, which GA4/gtag relies on for referral attribution,
    // while still stripping it on a plain downgrade or cross-origin case.
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com'],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'img-src': [
          "'self'",
          'data:',
          // TODO: drop once the Home page category images are replaced with
          // real, self-hosted product photography (see production.md).
          'https://lh3.googleusercontent.com',
          'https://images.unsplash.com',
        ],
        'connect-src': [
          "'self'",
          'https://www.google-analytics.com',
          'https://*.google-analytics.com',
          'https://www.googletagmanager.com',
          // Chatbot backend — see production.md re: moving this to an
          // adtextile.com subdomain instead of a personal workers.dev one.
          'https://adtextile-chatbot.vishfunfacts.workers.dev',
        ],
        'frame-src': ["'self'", 'https://www.google.com'],
      },
    },
  })
)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  })
)

app.use(express.json({ limit: '20kb' }))

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
})

//
// API
//
app.use('/api/health', healthRouter)
app.use('/api/contact', contactLimiter, contactRouter)

//
// React production build
//
// Cache-Control is set explicitly here rather than relying solely on
// public/.htaccess, since that file only takes effect if Hostinger serves
// this app behind Apache/LiteSpeed — if requests reach this Express process
// directly, .htaccess is never read and static assets would otherwise ship
// with no caching at all.
app.use(
  express.static(distPath, {
    setHeaders(res, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        // Vite fingerprints these filenames with a content hash, so a
        // content change always ships under a new filename.
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      } else if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
      } else {
        // Everything else under dist/ is copied verbatim from public/
        // (logo, favicon, PDF, robots.txt, sitemap.xml) and isn't
        // fingerprinted, so cache it briefly rather than forever.
        res.setHeader('Cache-Control', 'public, max-age=86400')
      }
    },
  })
)

// React Router fallback
app.get('/{*splat}', (req, res, next) => {
  // Don't return React HTML for unknown API endpoints
  if (req.path.startsWith('/api/')) {
    return next()
  }

  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
  res.sendFile(path.join(distPath, 'index.html'))
})

//
// Error handling
//
app.use(notFoundHandler)
app.use(errorHandler)

export default app