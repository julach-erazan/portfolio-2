import { useEffect, useRef, useState } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'
import { Store } from '@tanstack/store'

const WEBHOOK_URL =
  'https://julach-earzan.app.n8n.cloud/webhook/166a2a41-e816-429e-9a74-90e81078298d'

type Role = 'me' | 'you'
interface Message {
  id: number
  role: Role
  text: string
}

const GREETING: Message = {
  id: 0,
  role: 'me',
  text: "Hey there! 👋 I'm Julach Earzan — a Software Engineer. Feel free to leave me a message and I'll get back to you by email. You can also reach me directly at jesrilanka@gmail.com.",
}

// Export store so the "Hire Me" header button can open this
export const showResumeAssistant = new Store(false)

export default function ResumeAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Sync with header "Hire Me" store
  useEffect(() => {
    const sub = showResumeAssistant.subscribe(() => {
      setIsOpen(showResumeAssistant.state)
    })
    return () => sub.unsubscribe()
  }, [])

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleToggle = () => {
    const next = !isOpen
    setIsOpen(next)
    showResumeAssistant.setState(() => next)
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isSending || sent) return

    const userMsg: Message = { id: Date.now(), role: 'you', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsSending(true)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const reply: Message = {
        id: Date.now() + 1,
        role: 'me',
        text: "Thank you for reaching out! 🚀 I've received your message and will get back to you as soon as possible.",
      }
      setMessages((prev) => [...prev, reply])
      setSent(true)
    } catch {
      const errMsg: Message = {
        id: Date.now() + 1,
        role: 'me',
        text: 'Oops, something went wrong. Please email me directly at jesrilanka@gmail.com.',
      }
      setMessages((prev) => [...prev, errMsg])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      {/* Floating toggle button — always visible at bottom-right */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed bottom-5 right-5 z-[200] w-13 h-13 rounded-full bg-primary shadow-[0_0_24px_rgba(55,147,255,0.45)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[199] md:inset-auto md:bottom-20 md:right-5 md:w-[380px] md:h-[480px] flex flex-col rounded-none md:rounded-3xl overflow-hidden shadow-2xl border-0 md:border border-blue-500/20 backdrop-blur-xl bg-slate-900/97">
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-blue-500/10 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="relative flex items-center gap-3 p-4 border-b border-white/10 pr-14 md:pr-4">
            <div className="w-9 h-9 rounded-2xl bg-linear-to-br from-primary via-purple-500 to-slate-600 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0 text-white font-bold text-sm">
              JE
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-100 text-sm leading-tight truncate">
                Julach Earzan
              </p>
              <p className="text-[11px] text-[#a8e6cf]">Software Engineer · Let's talk</p>
            </div>
            {/* Mobile close in header */}
            <button
              onClick={handleToggle}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 md:hidden text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.role === 'you' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {msg.role === 'me' && (
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-primary via-purple-500 to-slate-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mb-0.5">
                    JE
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'me'
                      ? 'bg-slate-800/80 text-slate-100 rounded-bl-sm'
                      : 'bg-primary/90 text-white rounded-br-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-linear-to-br from-primary via-purple-500 to-slate-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                  JE
                </div>
                <div className="bg-slate-800/80 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 bg-slate-900/60">
            {sent ? (
              <p className="text-center text-[#a8e6cf] text-xs py-2 font-medium">
                ✓ Message sent — I'll be in touch soon!
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  void handleSend()
                }}
                className="relative"
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  disabled={isSending}
                  rows={1}
                  className="w-full rounded-2xl border border-white/10 bg-slate-800/60 pl-4 pr-12 py-3 text-sm text-slate-100 placeholder-slate-400/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent resize-none overflow-hidden disabled:opacity-50 transition-all"
                  style={{ minHeight: '46px', maxHeight: '96px' }}
                  onInput={(e) => {
                    const t = e.target as HTMLTextAreaElement
                    t.style.height = 'auto'
                    t.style.height = Math.min(t.scrollHeight, 96) + 'px'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && input.trim() && !isSending) {
                      e.preventDefault()
                      void handleSend()
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary text-white disabled:opacity-30 transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
