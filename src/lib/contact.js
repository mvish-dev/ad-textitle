// Shared contact channels, so every WhatsApp button and enquiry form on the
// site points at the same number / endpoint.

export const WHATSAPP_NUMBER = '919790557077'

export const whatsappUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

// Local dev: backend runs on its own port (server/.env -> PORT), so this
// needs to be absolute (see .env.example -> VITE_API_URL). In production
// it's unset and falls back to a same-origin relative "/api/contact".
export const API_BASE_URL = import.meta.env.VITE_API_URL || ''
