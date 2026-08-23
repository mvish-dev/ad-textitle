import { Router } from 'express'
import { validateContactPayload } from '../lib/validate.js'
import { sendEnquiryEmail } from '../lib/mailer.js'

const router = Router()

router.post('/', async (req, res) => {
  const { valid, errors, data } = validateContactPayload(req.body)

  if (!valid) {
    return res.status(400).json({
      success: false,
      message: 'Please correct the highlighted fields.',
      errors,
    })
  }

  // Express 5 forwards rejected promises to the error-handling middleware
  // automatically, so an SMTP failure here still returns a clean JSON error
  // (see middleware/errorHandler.js) instead of crashing the request.
  await sendEnquiryEmail(data)

  res.status(200).json({
    success: true,
    message: 'Thank you — your enquiry has been received. Our team will follow up shortly.',
  })
})

export default router
