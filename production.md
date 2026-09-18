# A D Textile — Production Readiness Plan

**Domain:** adtextile.com (live on Hostinger, GitHub-integrated auto-deploy)
**Status:** Site is live. Products page is intentionally excluded from this plan (in progress separately).
**Stack:** Vite + React 19 (SPA) served by an Express 5 app (`server/src/server.js`) that also serves the built `dist/` and handles `/api/contact` + `/api/health`.

This plan is phased so you can work top-down: each phase is safe to ship independently, and later phases assume earlier ones are done.

---

## Phase 0 — Verify what's actually live (do this first)

Before changing anything, confirm the current state in hPanel, since the repo shows *intent* but not what's actually deployed:

- [ ] Confirm the Hostinger Node.js app's **domain binding** is `adtextile.com` (and `www.adtextile.com` if you want both to resolve).
- [ ] Confirm **Git auto-deployment** is pointed at `origin/main` of `mvish-dev/ad-textitle` and is enabled (not just linked).
- [ ] Confirm the Node.js app's **build command** is `npm run build` and **start file** is `server/src/server.js` (matches `package.json` scripts).
- [ ] Confirm **Node version** on Hostinger is ≥ 20 (`engines.node: >=20` in both `package.json` files).
- [ ] Pull the current list of **Node.js environment variables** set in hPanel and diff them against the checklist in Phase 2 below — do this by eye in hPanel, since values can't be read back via API once set.

---

## Phase 1 — Domain, DNS & SSL ✅ DONE

- [x] `adtextile.com` DNS confirmed pointed at Hostinger: apex (`@`) ALIAS → `adtextile.com.cdn.hstgr.net`, `www` CNAME → `www.adtextile.com.cdn.hstgr.net`. No leftover Vercel records.
- [x] Mail DNS confirmed for Google Workspace: MX → `smtp.google.com`, SPF (`v=spf1 include:_spf.google.com ~all`), DKIM (`google._domainkey`) all present. DMARC present but policy is `p=none` (monitor-only, not enforced) — optional future hardening, not a blocker.
- [x] SSL certificate and Force HTTPS redirect — confirmed done directly in hPanel.
- [x] Canonical host / legacy-URL redirects (`.htaccess`) — confirmed handled.

---

## Phase 2 — Environment variables (production)

Set these as **Node.js environment variables in hPanel** (never commit real values — `.env`/`server/.env` are correctly gitignored already):

| Variable | Production value | Notes |
|---|---|---|
| `CLIENT_URL` | `https://adtextile.com,https://www.adtextile.com` | Drives CORS allow-list in `server/src/app.js`. Missing/wrong = contact form silently blocked by CORS. |
| `MAIL_MODE` | `smtp` | Currently defaults to `log` (no email sent, just console output) — **this must be flipped for the live contact form to actually deliver mail.** |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | `smtp.gmail.com` / `587` / `false` / `website@adtextile.com` / Workspace App Password | `website@adtextile.com` is a Google Workspace mailbox with an App Password already generated. Set `SMTP_PASS` in hPanel from the app password directly — never commit it to git (local `server/.env` already has it and is gitignored). |
| `MAIL_FROM` | `AD Textile Website <website@adtextile.com>` | Must match `SMTP_USER` (or a verified "send as" alias on that account) or Gmail will reject/flag the send. Local `server/.env` is already updated to this. |
| `SALES_MAIL_TO` | `deepak@adtextile.com` | Both the Sales Enquiry and Quote Request forms now deliver to the same inbox, per current decision — `sales@`/`quotation@` mailboxes are no longer used as recipients. |
| `QUOTATION_MAIL_TO` | `deepak@adtextile.com` | Same as above. |
| `SALES_MAIL_CC` / `QUOTATION_MAIL_CC` | optional | e.g. CC `senthil@adtextile.com` (Commercial Director, per `TeamCards.jsx`) if he should also see incoming enquiries. |
| `PORT` | leave unset | Hostinger injects this automatically. |

**Important nuance:** `VITE_MAINTENANCE_MODE` and `VITE_API_URL` are **Vite build-time** variables (baked into the bundle at `vite build`, not read at runtime). If you ever need to flip maintenance mode on/off in production, setting the env var in hPanel is not enough by itself — it must be set *before* the next build/deploy runs, and a redeploy is required to take effect. Document this for whoever operates the site day-to-day.

- [x] Google Workspace **App Password** for `website@adtextile.com` already generated — needs to be set as `SMTP_PASS` in hPanel.
- [ ] Confirm `deepak@adtextile.com` is actively monitored — it's now the single destination for *both* Sales Enquiry and Quote Request submissions.
- [ ] After setting `MAIL_MODE=smtp`, submit both the Sales Enquiry and Quote Request forms live and confirm real emails arrive at `deepak@adtextile.com` (check spam folder first time).
- [ ] Set up SPF, DKIM, and DMARC DNS records for `adtextile.com` if not already present — Google Workspace domains usually have SPF/DKIM configured by default at signup, but worth confirming via [mail-tester.com](https://mail-tester.com) with a real test send, since a missing record here is a common cause of enquiries silently landing in spam.

---

## Phase 3 — Security hardening

- [x] Added an explicit **Content-Security-Policy** in `server/src/app.js` (helmet's default directives + explicit allowances for Google Fonts, GA4/gtag, the Google Maps embed on `/contact`, and the chatbot's Worker backend). Ships on the next deploy — after it's live, browse the site with devtools console open and check for CSP violation warnings, since a missed origin will silently break that feature rather than error loudly.
- [ ] The CSP's `img-src` currently allowlists `lh3.googleusercontent.com` and `images.unsplash.com` only because the Home page category cards hotlink real images from there (see Phase 7 below). Once those are replaced with self-hosted photos, remove both from the CSP to tighten it.
- [ ] The CSP's `connect-src` allowlists `adtextile-chatbot.vishfunfacts.workers.dev` (see Phase 7/9 below on that dependency) — revisit if/when the chatbot backend moves to an adtextile.com subdomain.
- [ ] Confirm `trust proxy` (currently `1`) matches Hostinger's actual proxy depth in front of the Node app — if it's wrong, `express-rate-limit` and any IP-based logic will key off the wrong IP (either the proxy's IP for everyone, or a spoofable client-supplied header).
- [ ] Contact form rate limit is 10 req/15min per IP — reasonable default, but confirm it isn't so tight that a shared-office IP (common for B2B textile buyers submitting quotes) gets locked out. Consider raising slightly if you see false-positive complaints.
- [ ] `express.json({ limit: '20kb' })` — fine for form payloads; no action needed, just confirming it's intentional.
- [ ] No secrets found committed to git (`server/.env`, `.env`, `.env.local` are all properly gitignored, and `git ls-files` confirms only the `.example` templates are tracked). Keep it that way — never `git add -A` in this repo.

---

## Phase 4 — SEO & discoverability

- [x] `robots.txt` and `sitemap.xml` both correctly reference `https://adtextile.com` — matches the live domain already, no change needed.
- [x] `og:image` / `twitter:image` in `index.html` changed from relative (`/logo.jpeg`) to absolute (`https://adtextile.com/logo.jpeg`) — social scrapers (Facebook/LinkedIn/X) require absolute URLs to reliably render a preview card.
- [x] Added `url` and `logo` to the JSON-LD `Organization` schema in `index.html`.
- [x] JSON-LD `telephone` added (`+919790557077`, the mobile handset given — no landline/general company line exists). `sameAs` skipped — no social/LinkedIn profiles exist for the company.
- [x] `og:image` share card confirmed fine as-is (current logo-sized image) — no dedicated 1200×630 graphic needed.
- [ ] **Action needed from you (outside this codebase):** submit the sitemap to **Google Search Console** and **Bing Webmaster Tools**, and verify domain ownership on both — this happens in their web consoles, not in code, so I can't do it directly.
- [x] Since this is a client-rendered SPA with no prerendering/SSR, non-JS crawlers (some social scrapers, older bots) only ever see the static `index.html` head — known, accepted tradeoff per existing code comments, not a bug.
- [ ] `sitemap.xml` `lastmod` dates are static (`2026-08-17`) — low priority; update when content changes, or drop the tag if you won't maintain it.

---

## Phase 5 — Analytics & monitoring

- [x] GA4 tag updated to the correct production property `G-PXVKT1HEH7` in `index.html` (was `G-TM2EEXVJJC`). Confirm real-time events show up in GA4 once this is deployed and you browse the live site.
- [x] Added a basic cookie-consent banner (`src/components/common/CookieConsentBanner.jsx`, wired into `Layout.jsx`). GA4 is now gated behind it: `index.html` only loads `gtag.js` and initializes the dataLayer — the actual `gtag('config', 'G-PXVKT1HEH7')` call that starts sending data happens only after the visitor clicks Accept (or immediately on return visits if they'd already accepted, via `localStorage`). Decline records the choice and never fires GA. After deploy, verify: (1) no GA network requests fire before a choice is made, (2) Accept starts sending real-time events, (3) Decline persists across a page reload.
- [x] Error tracking (Sentry, etc.) — reviewed, **not needed for now** per decision; relying on manual monitoring and user reports.
- [ ] `/api/health` endpoint exists and is unauthenticated — set up an uptime monitor (UptimeRobot, Hostinger's own monitoring, etc.) polling it every few minutes so you get alerted on downtime instead of finding out from a customer. This is an external account setup, not something doable from the codebase.
- [ ] No server-side request logging beyond `console.error` on failures — acceptable for current traffic scale, but confirm Hostinger's Node.js runtime logs are actually being retained/viewable so you can debug a production issue if one occurs.
- [x] Ran `npm audit` / `npm audit fix` — fixed 2 of 3 flagged issues (`browserslist`, `baseline-browser-mapping`, both build-time-only tooling, not shipped to the browser). One remains: **`d3-color` (high, ReDoS)**, a transitive dependency of `react-simple-maps` (used by the Contact page's export route map) via `d3-zoom`/`d3-transition`, pinned by `react-simple-maps@3.0.0` with no compatible fix available yet. Reviewed and accepted as low real-world risk: the vulnerable code path parses color strings, and every color value passed through it in this app is a hardcoded value in our own source, never user input — not exploitable here. Revisit if `react-simple-maps` ships an update.
- [x] Chatbot backend (`https://adtextile-chatbot.vishfunfacts.workers.dev/api/chat`) runs on a separate Cloudflare Worker outside Hostinger/adtextile.com — reviewed, **no issue**, ownership/hosting confirmed fine as-is.

---

## Phase 6 — Performance

- [x] Regardless of whether `public/.htaccess` is actually honored by Hostinger's Node.js hosting (Apache-in-front vs. direct-to-Node is still unconfirmed), `server/src/app.js` now sets the same caching/security intent itself so it's correct either way: `express.static` sets `Cache-Control: public, max-age=31536000, immutable` for hashed `assets/*` files, `max-age=0, must-revalidate` for `index.html` (both the static one and the SPA-fallback route), and a 1-day cache for everything else copied verbatim from `public/`. Also added an explicit `Referrer-Policy: strict-origin-when-cross-origin` via helmet (its default is the stricter `no-referrer`, which would have broken GA4 referral attribution). Verified locally: headers confirmed correct via `curl -I` against a built `dist/`.
- [x] Recent commits already converted certificate images to AVIF — good, spot-checked, no issue there.
- [x] **`src/assets/images/backup-pool/` — 895MB across 96 unused raw JPEGs, was tracked in git.** Confirmed nothing in `src` imports/references any file under this path. Per your decision, untracked it now (`git rm -r --cached`, files kept on disk) and added it to `.gitignore` — future commits/deploys won't include it. Note: this doesn't shrink existing `.git` history (those blobs are already in past commits); a full history purge (`git filter-repo`/BFG + force-push) would do that but is a separate, disruptive, coordinated operation you explicitly deferred.
- [ ] Run a Lighthouse pass against the live production URL (not localhost) once these changes are deployed, and address anything scoring poorly on LCP/CLS — 3D/GSAP-heavy home pages are common culprits for slow LCP. Requires the live URL, so this is a post-deploy check on your end.
- [ ] Confirm HTTP/2 or HTTP/3 is enabled on the Hostinger plan (usually automatic, but worth a quick check via browser devtools' protocol column) — also a live-site check.
- [ ] (Noted, not a launch blocker) The build already warns that a few JS chunks are large (`Silk-*.js` ~885KB, `index-*.js` ~578KB gzip 195KB, `index.es-*.js` ~316KB) — mostly the 3D/animation libraries (three.js, GSAP). Lazy-loading already splits per-route; further splitting would be a deliberate follow-up optimization, not something to change reflexively here.

---

## Phase 7 — Content & legal accuracy

- [x] `TeamCards.jsx` phone numbers and emails cross-checked against `Footer.jsx` and `knowledge.ts` — all three agree (`senthil@`/`919994399077`, `deepak@`/`919790557077`). No issue.
- [ ] **Needs your eyes:** `public/company-profile.pdf` (linked from the footer) — couldn't render/inspect it in this environment (no PDF renderer available here). Please confirm it's the current version.
- [x] Reviewed `PrivacyPolicy.jsx` against what the Site actually does today: it already correctly described GA4, the chatbot, WhatsApp, Google Fonts and Hostinger hosting in detail. Updated it to also mention the new Accept/Decline cookie-consent banner (Phase 5) under "Cookies & Analytics", since GA4 no longer runs unconditionally — it's gated behind that choice now. Bumped "Last updated" to September 18, 2026 to reflect this and the other changes made today.
- [x] Reviewed `knowledge.ts` (chatbot knowledge base) for accuracy — it already explicitly tells the assistant the product catalogue "is currently being rebuilt" and to direct pricing/spec questions to the commercial team rather than inventing details, so it's already correctly hedged against the pending Products page. Contact details in it match `TeamCards.jsx`/`Footer.jsx`. No changes needed.
- [x] Home page category images (Kitchen/Table/Bed/Living Linen cards) currently hotlink `images.unsplash.com` / `lh3.googleusercontent.com` — reviewed, **no issue**, intentionally deferred alongside the Products page work.

---

## Phase 8 — Deployment process hygiene

- [x] Confirmed: direct-to-`main` deploy on every push is the intended workflow, no staging branch — this is deliberate, not a gap.
- [x] `dist/` is gitignored and rebuilt on Hostinger via `npm run build`, which is a single chained script (`vite build && npm --prefix server install --omit=dev`) — since the earlier env-var change already triggered a successful build/deploy, this is confirmed working end-to-end as one step. No separate action needed.
- [ ] **Needs your confirmation (hPanel-specific, can't check via API access given to me):** does Hostinger automatically restart the Node.js process if it crashes? `server/src/server.js` deliberately calls `process.exit(1)` on an unhandled rejection or uncaught exception (see the comment there) — that's safe *only if* the host restarts the process afterward. If it doesn't auto-restart, a single unexpected crash would take the whole site down until someone manually restarts it in hPanel. Worth a quick check in Hostinger's Node.js app settings/docs, or a deliberate test if you're comfortable doing so.

---

## Explicitly out of scope for this phase

- **Products page** — excluded per your instruction, being handled separately.
- Anything requiring new features/design work not already scaffolded in the codebase.

---

### Suggested order of attack

1. Phase 0 (verify current state) → Phase 1 (DNS/SSL) → Phase 2 (env vars, get the contact form actually sending mail — this is the highest-impact gap right now, since `MAIL_MODE` defaults to `log`).
2. Phase 3 (security) and Phase 4 (SEO) can happen in parallel once Phase 2 is done.
3. Phase 5 (monitoring) before you stop actively watching the site closely.
4. Phase 6 (performance) and Phase 7 (content accuracy) as polish.
5. Phase 8 (process hygiene) once things are stable, so future changes ship safely.
