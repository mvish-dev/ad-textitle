import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import WhatsAppIcon from './WhatsAppIcon.jsx'

const WHATSAPP_NUMBER = '919790557077'
const WHATSAPP_MESSAGE = "Hi, I'd like to enquire about AD Textile's manufacturing capabilities."
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

const CHAT_API_URL = 'https://adtextile-chatbot.vishfunfacts.workers.dev/api/chat'
const CHAT_ERROR_MESSAGE = "Sorry, I'm having trouble responding right now. Please try again."

const QUICK_QUESTIONS = [
  { label: 'Product Information', query: "Can you tell me about AD Textile's products?" },
  { label: 'Manufacturing', query: "What are AD Textile's manufacturing capabilities?" },
  { label: 'Infrastructure', query: "Tell me about AD Textile's manufacturing infrastructure." },
  { label: 'Quality', query: "What quality standards and processes does AD Textile follow?" },
  { label: 'Certifications', query: "What certifications does AD Textile have?" },
  { label: 'Contact Sales', query: "How can I contact AD Textile's sales team?" },
]

// Splits a growing SSE buffer into complete "data: ..." events (separated by
// a blank line, per the SSE spec) and whatever incomplete tail is left over
// for the next chunk. Handles both \n\n and \r\n\r\n boundaries and multiple
// `data:` lines within a single event.
function extractSSEEvents(buffer) {
  const normalized = buffer.replace(/\r\n/g, '\n')
  const parts = normalized.split('\n\n')
  const remainder = parts.pop() ?? ''
  const events = parts
    .map((part) =>
      part
        .split('\n')
        .filter((line) => line.startsWith('data:'))
        .map((line) => line.slice(5).trim())
        .join('\n')
    )
    .filter(Boolean)
  return { events, remainder }
}

// Cloudflare Workers AI streams `data: {"response":"..."}` chunks ending in
// `data: [DONE]`. Falls back to other common field names, and to the raw
// string, in case the worker's payload shape differs.
function extractDeltaText(rawData) {
  if (rawData === '[DONE]') return ''
  try {
    const parsed = JSON.parse(rawData)
    const value = parsed.response ?? parsed.text ?? parsed.content ?? parsed.delta
    return typeof value === 'string' ? value : ''
  } catch {
    return rawData
  }
}

// Same technique as MovingBorderButton: an oversized conic-gradient wedge
// spun at a constant rate behind the button, clipped to a thin ring by the
// wrapper's rounded-full + overflow-hidden. Reuses the shared
// moving-border-spin keyframe (src/index.css) instead of a new animation.
function SpinningRing() {
  return (
    <span
      className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2"
      style={{
        animation: 'moving-border-spin 3s linear infinite',
        background:
          'conic-gradient(from 0deg, transparent 0%, transparent 70%, #c7c9cc 82%, #ffffff 90%, #c7c9cc 96%, transparent 100%)',
      }}
      aria-hidden="true"
    />
  )
}

function FloatingAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const isStreamingRef = useRef(false)
  const messagesContainerRef = useRef(null)

  // Keep the panel scrolled to the newest message, including every
  // incremental chunk while the assistant reply is streaming in.
  useEffect(() => {
    const el = messagesContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const appendAssistantDelta = (delta) => {
    if (!delta) return
    setMessages((prev) => {
      const next = [...prev]
      const lastIndex = next.length - 1
      if (lastIndex >= 0 && next[lastIndex].role === 'assistant') {
        next[lastIndex] = { ...next[lastIndex], content: next[lastIndex].content + delta }
      }
      return next
    })
  }

  const replaceLastAssistantMessage = (content) => {
    setMessages((prev) => {
      const next = [...prev]
      const lastIndex = next.length - 1
      if (lastIndex >= 0 && next[lastIndex].role === 'assistant') {
        next[lastIndex] = { role: 'assistant', content }
      } else {
        next.push({ role: 'assistant', content })
      }
      return next
    })
  }

  const sendMessage = async (rawText) => {
    const text = rawText.trim()
    if (!text || isStreamingRef.current) return

    const userMessage = { role: 'user', content: text }
    const history = [...messages, userMessage]

    setMessages((prev) => [...prev, userMessage, { role: 'assistant', content: '' }])
    setInput('')
    isStreamingRef.current = true
    setIsStreaming(true)

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!response.ok || !response.body) {
        throw new Error(`Chat request failed with status ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const { events, remainder } = extractSSEEvents(buffer)
        buffer = remainder

        for (const rawData of events) {
          appendAssistantDelta(extractDeltaText(rawData))
        }
      }

      // Flush any trailing bytes/event left in the decoder or buffer once
      // the stream closes without a final blank-line separator.
      buffer += decoder.decode()
      const { events } = extractSSEEvents(`${buffer}\n\n`)
      for (const rawData of events) {
        appendAssistantDelta(extractDeltaText(rawData))
      }
    } catch {
      replaceLastAssistantMessage(CHAT_ERROR_MESSAGE)
    } finally {
      isStreamingRef.current = false
      setIsStreaming(false)
    }
  }

  const handleSend = () => {
    sendMessage(input)
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-body-md">
      {!open && (
        <div className="relative rounded-full p-[2px] overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
          <SpinningRing />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="relative z-10 w-11 h-11 bg-[#25D366] text-white rounded-full flex items-center justify-center cursor-pointer"
            aria-label="Chat with AD Textile on WhatsApp"
          >
            <WhatsAppIcon className="text-lg" />
          </a>
        </div>
      )}

      <div className="relative">
        {open && (
          <div className="absolute bottom-full right-0 mb-3 w-[380px] max-w-[90vw] h-[min(560px,calc(100vh-7rem))] flex flex-col overflow-hidden rounded-2xl border border-outline-variant/30 shadow-2xl bg-white">
            {/* Header */}
            <div className="bg-primary px-6 py-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                  <Icon name="chat_bubble" className="text-white text-lg" />
                </div>
                <div>
                  <h4 className="font-label-md text-sm text-white font-semibold">AD Textile Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] uppercase tracking-widest text-white/60">Online</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <Icon name="close" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4 bg-background"
            >
              <div className="flex items-end gap-2.5 max-w-[88%]">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Icon name="smart_toy" className="text-white text-sm" />
                </div>
                <div className="bg-white border border-outline-variant/30 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <p className="text-sm text-primary leading-relaxed">
                    Hi, I&apos;m the AD Textile Assistant. How can I help you today?
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pl-9">
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question.label}
                    type="button"
                    disabled={isStreaming}
                    onClick={() => sendMessage(question.query)}
                    className="px-4 py-2 bg-white border border-outline-variant/40 rounded-full text-xs font-medium text-primary hover:border-secondary hover:text-secondary transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {question.label}
                  </button>
                ))}
              </div>

              {messages.map((message, index) =>
                message.role === 'user' ? (
                  <div key={index} className="flex justify-end">
                    <div className="max-w-[88%] bg-primary text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex items-end gap-2.5 max-w-[88%]">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Icon name="smart_toy" className="text-white text-sm" />
                    </div>
                    <div className="bg-white border border-outline-variant/30 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                      <p className="text-sm text-primary leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-outline-variant/20 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <input
                  className="flex-1 bg-background border border-outline-variant/30 rounded-full px-4 py-3 text-sm text-primary focus:outline-none focus:border-secondary placeholder:text-on-surface-variant"
                  placeholder="Type your message..."
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
                <button
                  type="button"
                  disabled={isStreaming || !input.trim()}
                  onClick={handleSend}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-[#1E293B] transition-colors shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Icon name="send" className="text-base" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="relative rounded-full p-[2px] overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
          <SpinningRing />
          <button
            type="button"
            className="relative z-10 w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close AD Textile Assistant' : 'Open AD Textile Assistant'}
          >
            <Icon name={open ? 'close' : 'smart_toy'} className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FloatingAssistant
