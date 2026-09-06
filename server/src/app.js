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

app.use(helmet())

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
app.use(express.static(distPath))

// React Router fallback
app.get('/{*splat}', (req, res, next) => {
  // Don't return React HTML for unknown API endpoints
  if (req.path.startsWith('/api/')) {
    return next()
  }

  res.sendFile(path.join(distPath, 'index.html'))
})

//
// Error handling
//
app.use(notFoundHandler)
app.use(errorHandler)

export default app