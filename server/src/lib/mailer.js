// Two mail modes, switched by MAIL_MODE (see server/.env.example):
//   - "log":  don't send anything, just print the validated enquiry to the
//             backend terminal. Default, so the form works before SMTP exists.
//   - "smtp": send via Nodemailer using SMTP_* / MAIL_* env vars only —
//             nothing here is ever hard-coded.
import nodemailer from 'nodemailer'

let cachedTransporter = null

function getTransporter() {
  if (cachedTransporter) return cachedTransporter

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  return cachedTransporter
}

function buildSubject(enquiry) {
  const kind = enquiry.type === 'quote' ? 'Quote Request' : 'Sales Enquiry'
  return `[A D Textile Website] ${kind} from ${enquiry.name} (${enquiry.company})`
}

// Sales enquiries and quote requests route to different mailboxes
// (SALES_MAIL_TO/CC vs QUOTATION_MAIL_TO/CC) instead of one shared MAIL_TO.
function recipientsFor(enquiry) {
  return enquiry.type === 'quote'
    ? { to: process.env.QUOTATION_MAIL_TO, cc: process.env.QUOTATION_MAIL_CC }
    : { to: process.env.SALES_MAIL_TO, cc: process.env.SALES_MAIL_CC }
}

function buildText(enquiry) {
  return [
    `Type: ${enquiry.type}`,
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Company: ${enquiry.company}`,
    enquiry.phone && `Phone: ${enquiry.phone}`,
    enquiry.subject && `Subject: ${enquiry.subject}`,
    enquiry.quantity && `Target Delivery Volume: ${enquiry.quantity}`,
    enquiry.categories.length > 0 && `Product Segments: ${enquiry.categories.join(', ')}`,
    enquiry.specs && `Specifications:\n${enquiry.specs}`,
    enquiry.message && `Message:\n${enquiry.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

// Enquiry fields come straight from an anonymous website visitor, so they
// must be escaped before landing in the HTML email — this is the only thing
// standing between a submitted name/message and stored-HTML injection into
// whatever mail client renders it for sales/quotation staff.
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => HTML_ESCAPES[char])
}

function nl2br(value) {
  return escapeHtml(value).replace(/\n/g, '<br />')
}

// Table-based layout with inline styles throughout: this has to render
// consistently in Outlook's Word engine and other clients that ignore
// <style> blocks and flex/grid, so nothing here can rely on a stylesheet.
function buildHtml(enquiry) {
  const kind = enquiry.type === 'quote' ? 'Quote Request' : 'Sales Enquiry'
  const NAVY = '#0F172A'
  const GOLD = '#C59D5F'
  const BG = '#F8F7F4'
  const TEXT = '#4A4845'
  const MUTED = '#6E6A64'
  const BORDER = '#E7E4DD'

  const rows = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Company', enquiry.company],
    enquiry.phone && ['Phone', enquiry.phone],
    enquiry.subject && ['Subject', enquiry.subject],
    enquiry.quantity && ['Target Delivery Volume', enquiry.quantity],
    enquiry.categories.length > 0 && ['Product Segments', enquiry.categories.join(', ')],
  ].filter(Boolean)

  const detailRows = rows
    .map(
      ([label, value], index) => `
        <tr>
          <td style="padding:12px 20px; ${index > 0 ? `border-top:1px solid ${BORDER};` : ''} font:600 12px/1.4 Arial, sans-serif; letter-spacing:0.04em; text-transform:uppercase; color:${MUTED}; width:170px; vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:12px 20px; ${index > 0 ? `border-top:1px solid ${BORDER};` : ''} font:400 14px/1.5 Arial, sans-serif; color:${TEXT}; vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('')

  const longFields = [enquiry.specs && ['Specifications', enquiry.specs], enquiry.message && ['Message', enquiry.message]].filter(
    Boolean
  )

  const longFieldBlocks = longFields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:24px 32px 0;">
            <div style="font:600 12px/1.4 Arial, sans-serif; letter-spacing:0.04em; text-transform:uppercase; color:${MUTED}; margin-bottom:8px;">${escapeHtml(label)}</div>
            <div style="font:400 14px/1.6 Arial, sans-serif; color:${TEXT}; background:${BG}; border:1px solid ${BORDER}; border-radius:8px; padding:16px;">${nl2br(value)}</div>
          </td>
        </tr>`
    )
    .join('')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(kind)}</title>
  </head>
  <body style="margin:0; padding:0; background:${BG};">
    <span style="display:none; max-height:0; overflow:hidden; opacity:0;">
      New ${escapeHtml(kind.toLowerCase())} from ${escapeHtml(enquiry.name)} at ${escapeHtml(enquiry.company)}
    </span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:100%; background:#FFFFFF; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(15,23,42,0.08);">
            <tr>
              <td style="background:${NAVY}; padding:28px 32px; border-top:3px solid ${GOLD};">
                <img src="https://adtextile.com/logo.jpeg" alt="A D Textile" height="32" style="height:32px; display:block;" />
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 8px;">
                <span style="display:inline-block; font:600 11px/1 Arial, sans-serif; letter-spacing:0.08em; text-transform:uppercase; color:${NAVY}; background:${GOLD}22; border:1px solid ${GOLD}55; border-radius:999px; padding:6px 14px;">
                  New ${escapeHtml(kind)}
                </span>
                <h1 style="margin:16px 0 0; font:600 22px/1.3 Georgia, 'Times New Roman', serif; color:${NAVY};">
                  ${escapeHtml(enquiry.name)} · ${escapeHtml(enquiry.company)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG}; border:1px solid ${BORDER}; border-radius:8px; overflow:hidden;">
                  ${detailRows}
                </table>
              </td>
            </tr>
            ${longFieldBlocks}
            <tr>
              <td style="padding:28px 32px 32px;">
                <a href="mailto:${escapeHtml(enquiry.email)}" style="display:inline-block; background:linear-gradient(135deg, ${GOLD}, #A8834A); color:#FFFFFF; font:600 13px/1 Arial, sans-serif; letter-spacing:0.02em; text-decoration:none; padding:14px 28px; border-radius:999px;">
                  Reply to ${escapeHtml(enquiry.name.split(' ')[0] || enquiry.name)}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px; background:${NAVY};">
                <p style="margin:0; font:400 12px/1.6 Arial, sans-serif; color:#FFFFFF99;">
                  A D Textile · 1/104, Sanjay Nagar, Erode Road, Athur Post, Karur – 639002, Tamil Nadu, India<br />
                  This enquiry was submitted via the contact form on <a href="https://adtextile.com" style="color:${GOLD}; text-decoration:none;">adtextile.com</a>. Reply directly to this email to respond to the visitor.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export async function sendEnquiryEmail(enquiry) {
  const mailMode = process.env.MAIL_MODE || 'log'

  if (mailMode !== 'smtp') {
    console.log('\n----- New website enquiry (MAIL_MODE=log, no email sent) -----')
    console.log(buildText(enquiry))
    console.log('----------------------------------------------------------------\n')
    return { delivered: false, mode: 'log' }
  }

  const { to, cc } = recipientsFor(enquiry)
  const toEnvKey = enquiry.type === 'quote' ? 'QUOTATION_MAIL_TO' : 'SALES_MAIL_TO'
  const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM']
  const missing = [...required.filter((key) => !process.env[key]), ...(to ? [] : [toEnvKey])]
  if (missing.length > 0) {
    throw new Error(`MAIL_MODE=smtp but missing required env vars: ${missing.join(', ')}`)
  }

  const transporter = getTransporter()
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    cc: cc || undefined,
    replyTo: enquiry.email, // visitor's address — never used as `from`
    subject: buildSubject(enquiry),
    text: buildText(enquiry),
    html: buildHtml(enquiry),
  })

  return { delivered: true, mode: 'smtp' }
}
