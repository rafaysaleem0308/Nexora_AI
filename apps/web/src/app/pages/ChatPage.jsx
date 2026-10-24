import { useState, useRef, useEffect } from 'react'
import {
  Send, Plus, Bot, Sparkles, Zap, FileText, Lightbulb,
  MessageSquare
} from 'lucide-react'

// ── Sample data ──────────────────────────────────────────────────────────────
const PROMPT_SUGGESTIONS = [
  { icon: Lightbulb, label: 'Brainstorm ideas', prompt: 'Help me brainstorm ideas for a new AI product feature.' },
  { icon: FileText, label: 'Summarize content', prompt: 'Summarize the key points from my latest document.' },
  { icon: Zap, label: 'Draft email', prompt: 'Write a professional follow-up email after a product demo.' },
  { icon: Sparkles, label: 'Generate content', prompt: 'Create a compelling blog post introduction about AI productivity.' },
]

const DEMO_CONVERSATIONS = [
  { id: 'c1', title: 'Q4 Product Roadmap', preview: "Let's outline the key milestones...", time: 'Today', messages: [{ id: 'm1', role: 'user', content: 'Help me outline milestones for the Q4 product roadmap.', time: '10:24 AM' }, { id: 'm2', role: 'assistant', content: 'Demo conversation: a roadmap could be organized around discovery, implementation, and launch readiness. Add owners and measurable outcomes to each milestone.', time: '10:24 AM' }] },
  { id: 'c2', title: 'Blog Post Ideas', preview: 'Here are 10 content ideas...', time: 'Yesterday', messages: [{ id: 'm3', role: 'user', content: 'Suggest a few topics for an AI productivity blog.', time: 'Yesterday' }, { id: 'm4', role: 'assistant', content: 'Sample conversation: explore practical workflow automation, responsible AI adoption, and ways teams can protect time for deep work.', time: 'Yesterday' }] },
  { id: 'c3', title: 'Email Templates', preview: "Here's a follow-up template...", time: '2 days ago', messages: [{ id: 'm5', role: 'user', content: 'Draft a friendly follow-up after a product demo.', time: '2 days ago' }, { id: 'm6', role: 'assistant', content: 'Sample conversation: thank them for their time, recap the use case they shared, and offer a clear next step.', time: '2 days ago' }] },
]

function ChatMessage({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mt-0.5
        ${isUser
          ? 'bg-gradient-to-br from-[#22d3ee] to-[#10b981] text-[#041316]'
          : 'bg-[#080d18] border border-[rgba(45,212,191,0.2)] text-[#22d3ee]'
        }`}
      >
        {isUser ? 'N' : <Bot size={16} strokeWidth={1.75} />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed
        ${isUser
          ? 'bg-gradient-to-br from-cyan-500/20 to-teal-500/15 border border-cyan-500/25 text-[#f0fdfa] rounded-tr-md'
          : 'bg-[#0a111e]/80 border border-[rgba(45,212,191,0.12)] text-[#ccfbf1] rounded-tl-md'
        }`}
      >
        {msg.content}
        {msg.typing && (
          <span className="inline-flex gap-1 ml-1 items-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 bg-[#22d3ee] rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        )}
        <p className="text-[10px] text-[#8498b5]/60 mt-1.5">{msg.time}</p>
      </div>
    </div>
  )
}

function ChatComposer({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e) => {
    setValue(e.target.value)
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = Math.min(el.scrollHeight, 160) + 'px'
    }
  }

  return (
    <div className="p-4 border-t border-[rgba(45,212,191,0.08)] bg-[#080d18]/60 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-3 bg-[#0a111e] border border-[rgba(45,212,191,0.2)] rounded-2xl p-3 focus-within:border-[rgba(34,211,238,0.4)] transition-colors">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Message Nexora AI…"
            disabled={disabled}
            className="flex-1 bg-transparent resize-none text-sm text-[#f0fdfa] placeholder-[#8498b5] outline-none leading-relaxed min-h-[24px] max-h-40 py-0.5"
            aria-label="Message input"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#22d3ee] to-[#10b981] text-[#041316] flex items-center justify-center hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"
            aria-label="Send message"
          >
            <Send size={15} strokeWidth={2.5} />
          </button>
        </div>
        <p className="text-[10px] text-[#8498b5]/60 text-center mt-2">
          Demo mode — AI responses are simulated. Press Enter to send, Shift+Enter for newline.
        </p>
      </div>
    </div>
  )
}

const DEMO_REPLY = "I'm Nexora AI in demo mode. In the full version, I'll be able to help you think, create, and work through ideas in real time. What would you like to explore?"

export function ChatPage() {
  const [conversations, setConversations] = useState(DEMO_CONVERSATIONS)
  const [activeId, setActiveId] = useState('c1')
  const [messages, setMessages] = useState(DEMO_CONVERSATIONS[0].messages)
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window === 'undefined' || window.matchMedia('(min-width: 768px)').matches)
  const messagesEndRef = useRef(null)
  const activeIdRef = useRef('c1')
  const timersRef = useRef([])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => () => timersRef.current.forEach((timer) => window.clearTimeout(timer)), [])

  const startNewConversation = () => {
    const id = `c${Date.now()}`
    const newConv = { id, title: 'New Conversation', preview: '', time: 'Just now' }
    setConversations((prev) => [newConv, ...prev])
    setActiveId(id)
    activeIdRef.current = id
    setMessages([])
  }

  const handleSend = (text) => {
    const targetId = activeIdRef.current || `c${Date.now()}`
    if (!activeId) {
      setActiveId(targetId)
      activeIdRef.current = targetId
      setConversations((prev) => [{ id: targetId, title: 'New Conversation', preview: '', time: 'Just now', messages: [] }, ...prev])
    }
    const userMsg = { id: Date.now(), role: 'user', content: text, time: 'Just now' }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)
    setConversations((prev) => prev.map((conversation) => conversation.id === targetId
      ? { ...conversation, title: conversation.title === 'New Conversation' ? text.slice(0, 32) : conversation.title, preview: text.slice(0, 40), messages: [...(conversation.messages || []), userMsg] }
      : conversation))
    const timer = window.setTimeout(() => {
      setIsTyping(false)
      const assistantMsg = { id: Date.now() + 1, role: 'assistant', content: DEMO_REPLY, time: 'Just now' }
      if (activeIdRef.current === targetId) setMessages((prev) => [...prev, assistantMsg])
      setConversations((prev) => prev.map((conversation) => conversation.id === targetId
        ? { ...conversation, preview: DEMO_REPLY.slice(0, 40), messages: [...(conversation.messages || []), assistantMsg] }
        : conversation))
    }, 1500)
    timersRef.current.push(timer)
  }

  const handlePromptSuggestion = (prompt) => {
    handleSend(prompt)
  }

  const isEmpty = messages.length === 0 && !isTyping

  return (
    <div className="relative flex h-full overflow-hidden">
      {sidebarOpen && <button type="button" aria-label="Close conversation list" onClick={() => setSidebarOpen(false)} className="absolute inset-0 z-10 bg-black/55 md:hidden" />}
      {/* Conversation sidebar */}
      <aside
        inert={!sidebarOpen}
        aria-hidden={!sidebarOpen}
        className={`shrink-0 flex flex-col bg-[#080d18]/60 border-r border-[rgba(45,212,191,0.08)]
          absolute md:relative inset-y-0 left-0 z-20 md:z-auto w-64 transition-all duration-300 overflow-hidden
          ${sidebarOpen ? 'translate-x-0 md:w-64' : '-translate-x-full md:w-0 md:translate-x-0'}`}
        aria-label="Conversations"
      >
        <div className="p-3 border-b border-[rgba(45,212,191,0.08)] shrink-0">
          <button
            type="button"
            onClick={startNewConversation}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/15 to-teal-500/10 border border-cyan-500/25 text-sm font-medium text-[#22d3ee] hover:bg-cyan-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"
          >
            <Plus size={16} />
            New Conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-2 px-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              type="button"
              onClick={() => { activeIdRef.current = conv.id; setActiveId(conv.id); setMessages(conv.messages || []) }}
              className={`w-full text-left p-3 rounded-xl mb-1 group transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]
                ${activeId === conv.id
                  ? 'bg-cyan-500/10 border border-cyan-500/20'
                  : 'hover:bg-white/[0.03] border border-transparent'
                }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <p className={`text-xs font-medium truncate ${activeId === conv.id ? 'text-[#f0fdfa]' : 'text-[#ccfbf1]'}`}>
                  {conv.title}
                </p>
                <span className="text-[10px] text-[#8498b5] shrink-0 ml-1">{conv.time}</span>
              </div>
              <p className="text-[11px] text-[#8498b5] truncate">{conv.preview || 'No messages yet'}</p>
            </button>
          ))}
        </div>
      </aside>

      {/* Main chat area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Chat header */}
        <div className="h-12 shrink-0 flex items-center justify-between px-4 border-b border-[rgba(45,212,191,0.08)]">
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex items-center gap-2 text-xs text-[#8498b5] hover:text-[#ccfbf1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] rounded-md"
            aria-label={sidebarOpen ? 'Hide conversation list' : 'Show conversation list'}
          >
            <MessageSquare size={15} />
            <span className="hidden sm:inline">{sidebarOpen ? 'Hide' : 'Show'} conversations</span>
          </button>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold text-amber-400 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Demo Mode
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/15 border border-cyan-500/25 flex items-center justify-center mb-5">
                  <Bot size={28} className="text-[#22d3ee]" strokeWidth={1.5} />
                </div>
                <h3 className="font-syne font-bold text-xl text-[#f0fdfa] mb-2">How can I help you today?</h3>
                <p className="text-sm text-[#8498b5] max-w-sm mb-8">
                  Start a conversation or choose a prompt suggestion below.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {PROMPT_SUGGESTIONS.map((s) => {
                    const Icon = s.icon
                    return (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => handlePromptSuggestion(s.prompt)}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0a111e]/80 border border-[rgba(45,212,191,0.12)] hover:border-[rgba(34,211,238,0.3)] hover:bg-[#0d1829] transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"
                      >
                        <Icon size={15} className="text-[#22d3ee] shrink-0" strokeWidth={1.75} />
                        <span className="text-sm text-[#ccfbf1] font-medium">{s.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} msg={msg} />
                ))}
                {isTyping && (
                  <ChatMessage msg={{ id: 'typing', role: 'assistant', content: '', typing: true, time: '' }} />
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Composer */}
        <ChatComposer onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  )
}
