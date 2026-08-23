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
  return `[AD Textile Website] ${kind} from ${enquiry.name} (${enquiry.company})`
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
  })

  return { delivered: true, mode: 'smtp' }
}
