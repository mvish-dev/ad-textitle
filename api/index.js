// Vercel serverless entry point. An Express app is itself a valid (req, res)
// handler, so the exact same app used locally by server/src/server.js is
// reused here unchanged — no separate serverless-specific routing logic.
// vercel.json rewrites every "/api/(.*)" request to this one function, and
// Express's own router (mounted on /api/health and /api/contact inside
// app.js) does the rest, matching on the original request path.
//
// Required Vercel Project → Settings → Environment Variables (Production
// and Preview) — see server/.env.example for the full reference list:
//   CLIENT_URL   the deployed frontend origin(s), comma-separated if more
//                than one (e.g. the *.vercel.app URL plus a custom domain).
//                Needed for CORS even though frontend + API share one
//                deployment, because browsers still send an Origin header.
//   MAIL_MODE    "log" (default/safe) or "smtp" once real credentials exist.
//   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
//   MAIL_FROM, SALES_MAIL_TO, SALES_MAIL_CC, QUOTATION_MAIL_TO, QUOTATION_MAIL_CC
// PORT is NOT used on Vercel — the platform manages the listener.
import app from '../server/src/app.js'

export default app
