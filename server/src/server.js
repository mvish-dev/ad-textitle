// Local/traditional entry point (npm run dev / npm start). Loads .env, then
// starts the shared Express app with app.listen(). Not used on Vercel — see
// /api/index.js, which imports app.js directly as a serverless function.
import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`A D Textile API listening on http://localhost:${PORT} (MAIL_MODE=${process.env.MAIL_MODE || 'log'})`)
})
