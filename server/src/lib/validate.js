// Field-level validation for POST /api/contact. Mirrors the two forms in
// src/components/contact/{EnquiryForm,QuoteForm}.jsx exactly: `type`
// (derived from the Contact page's activeTab, see src/pages/Contact.jsx)
// selects which required-field rules apply, since the two forms share one
// submit handler and formState shape but differ in what's required.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LIMITS = {
  name: 120,
  email: 254,
  phone: 30,
  company: 150,
  subject: 150,
  message: 5000,
  quantity: 100,
  specs: 3000,
  category: 50,
}

const MAX_CATEGORIES = 10

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function trimOrEmpty(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function validateContactPayload(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, errors: { _global: 'Request body must be a JSON object.' } }
  }

  const errors = {}
  const type = body.type === 'quote' ? 'quote' : 'enquiry'

  const name = trimOrEmpty(body.name)
  const email = trimOrEmpty(body.email)
  const company = trimOrEmpty(body.company)
  const phone = trimOrEmpty(body.phone)
  const message = trimOrEmpty(body.message)

  if (!isNonEmptyString(name)) errors.name = 'Full name is required.'
  else if (name.length > LIMITS.name) errors.name = `Full name must be under ${LIMITS.name} characters.`

  if (!isNonEmptyString(email)) errors.email = 'Email is required.'
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'

  if (!isNonEmptyString(company)) errors.company = 'Company name is required.'
  else if (company.length > LIMITS.company) errors.company = `Company name must be under ${LIMITS.company} characters.`

  if (phone.length > LIMITS.phone) errors.phone = `Phone number must be under ${LIMITS.phone} characters.`

  const data = { type, name, email, company, phone, message: '', subject: '', quantity: '', specs: '', categories: [] }

  if (type === 'enquiry') {
    // EnquiryForm.jsx: subject (select, always has a value) + message (required textarea).
    const subject = trimOrEmpty(body.subject)
    if (subject.length > LIMITS.subject) errors.subject = `Subject must be under ${LIMITS.subject} characters.`

    if (!isNonEmptyString(message)) errors.message = 'Message is required.'
    else if (message.length > LIMITS.message) errors.message = `Message must be under ${LIMITS.message} characters.`

    data.subject = subject
    data.message = message
  } else {
    // QuoteForm.jsx: quantity (select) + categories (multi-select chips) + specs, message both optional.
    const quantity = trimOrEmpty(body.quantity)
    const specs = trimOrEmpty(body.specs)
    const categories = Array.isArray(body.categories)
      ? body.categories.filter((c) => typeof c === 'string').map((c) => c.trim()).filter(Boolean)
      : []

    if (message.length > LIMITS.message) errors.message = `Message must be under ${LIMITS.message} characters.`
    if (quantity.length > LIMITS.quantity) errors.quantity = `Quantity must be under ${LIMITS.quantity} characters.`
    if (specs.length > LIMITS.specs) errors.specs = `Specifications must be under ${LIMITS.specs} characters.`
    if (categories.length > MAX_CATEGORIES) errors.categories = `Select at most ${MAX_CATEGORIES} categories.`
    else if (categories.some((c) => c.length > LIMITS.category)) errors.categories = 'One or more category values are too long.'

    data.message = message
    data.quantity = quantity
    data.specs = specs
    data.categories = categories
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors }
  }

  return { valid: true, data }
}
