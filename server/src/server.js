// Entry point for both local dev (npm run dev / npm start) and production
// (Hostinger Node.js hosting runs this file directly). Loads .env for local
// dev; in production the host injects env vars directly, so dotnev/config
// finding no .env file there is expected and harmless.
import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 5000

// Surface otherwise-silent crashes in the runtime logs instead of the
// process dying with no explanation — this app has no state worth
// preserving through a crash, so exiting and letting the host restart it
// is safer than continuing in an unknown state.
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason)
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
  process.exit(1)
})

app.listen(PORT, () => {
  console.log(`A D Textile API listening on http://localhost:${PORT} (MAIL_MODE=${process.env.MAIL_MODE || 'log'})`)
})
