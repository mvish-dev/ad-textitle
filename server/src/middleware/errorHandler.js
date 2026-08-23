export function notFoundHandler(req, res) {
  res.status(404).json({ success: false, message: 'Not found.' })
}

// Centralized error handler — must keep all 4 params (err, req, res, next)
// so Express recognizes it as error-handling middleware by arity.
export function errorHandler(err, req, res, next) {
  console.error('Unhandled API error:', err)

  const status = Number.isInteger(err.status || err.statusCode) ? err.status || err.statusCode : 500

  res.status(status).json({
    success: false,
    // Never leak stack traces, SMTP credentials, or other internals to the client.
    message: status >= 500 ? 'Something went wrong. Please try again later.' : err.message || 'Request failed.',
  })
}
