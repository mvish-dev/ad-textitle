// Express app configuration — no app.listen() here. Local dev calls
// app.listen() from server.js; the Vercel deployment imports this same app
// directly into /api/index.js, since an Express app is a valid (req, res)
// handler on its own. Keeping the app itself listen-agnostic lets both
// environments share identical routing, validation and security middleware.
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import healthRouter from './routes/health.js'
import contactRouter from './routes/contact.js'
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js'

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const app = express()

app.disable('x-powered-by')
app.set('trust proxy', 1) // correct req.ip / rate-limit behavior behind Vercel's proxy

app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      // Requests with no Origin header (same-origin navigation, curl, the
      // Vercel edge itself) are allowed; browser cross-origin requests must
      // match CLIENT_URL.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
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
  message: { success: false, message: 'Too many requests. Please try again later.' },
})

app.use('/api/health', healthRouter)
app.use('/api/contact', contactLimiter, contactRouter)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
