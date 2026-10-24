import { useState } from 'react'
import {
  Wand2, FileText, Mail, Megaphone, BookOpen,
  Sparkles, Copy, RefreshCw, Download, Zap
} from 'lucide-react'
import { PageHeader } from '../components/PageHeader.jsx'

// ── Sample data ───────────────────────────────────────────────────────────────
const CONTENT_TYPES = [
  { id: 'blog', label: 'Blog Post', icon: BookOpen, description: 'Long-form articles and thought leadership', accent: 'cyan' },
  { id: 'email', label: 'Email', icon: Mail, description: 'Newsletters, outreach, and follow-ups', accent: 'mint' },
  { id: 'social', label: 'Social Post', icon: Megaphone, description: 'Engaging posts for LinkedIn, Twitter & more', accent: 'teal' },
  { id: 'summary', label: 'Summary', icon: FileText, description: 'Condense documents and research', accent: 'cyan' },
  { id: 'brainstorm', label: 'Brainstorm', icon: Sparkles, description: 'Explore ideas and possibilities', accent: 'teal' },
]

const RECENT_OUTPUTS = [
  { id: 1, type: 'Blog Post', title: 'The Future of AI in the Workplace', words: 820, created: '1 hr ago' },
  { id: 2, type: 'Email', title: 'Follow-Up After Product Demo', words: 210, created: '3 hrs ago' },
  { id: 3, type: 'Social Post', title: 'Announcing Nexora Phase 4 Launch', words: 95, created: 'Yesterday' },
]

const DEMO_OUTPUT = `# The Future of AI in the Workplace

Artificial intelligence is no longer a distant concept — it's reshaping how teams collaborate, make decisions, and deliver value every day.

## Key Trends to Watch

**1. Intelligent Automation**
Repetitive tasks are increasingly handled by AI, freeing up knowledge workers to focus on creative and strategic work.

**2. Augmented Decision-Making**
AI surfaces insights from vast datasets in seconds, helping leaders make faster, more informed choices.

**3. Personalized Workflows**
Tools adapt to individual working styles, suggesting next steps and flagging what matters most.

---

*This is a sample output generated in demo mode. Connect the AI backend to generate real content.*`

const accentMap = {
  cyan: 'border-cyan-500/25 bg-cyan-500/10 text-[#22d3ee] hover:border-cyan-400/45',
  mint: 'border-emerald-500/25 bg-emerald-500/10 text-[#10b981] hover:border-emerald-400/45',
  teal: 'border-teal-500/25 bg-teal-500/10 text-[#14b8a6] hover:border-teal-400/45',
}

export function StudioPage() {
  const [selectedType, setSelectedType] = useState('blog')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('Professional')
  const [length, setLength] = useState('Standard')
  const [generating, setGenerating] = useState(false)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!topic.trim()) return
    setGenerating(true)
    setOutput('')
    setTimeout(() => {
      setGenerating(false)
      setOutput(DEMO_OUTPUT)
    }, 1800)
  }

  const handleCopy = () => {
    navigator.clipboard?.writeText(output).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }).catch(() => setCopied(false))
  }

  return (
    <div className="p-5 md:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Content Studio"
        subtitle="Sample data — AI-powered content generation for any format or tone."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left panel — controls */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Content type selector */}
          <div className="rounded-2xl bg-[#0a111e]/80 border border-[rgba(45,212,191,0.12)] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8498b5] mb-4">Content Type</p>
            <div className="grid grid-cols-2 gap-2">
              {CONTENT_TYPES.map((ct) => {
                const Icon = ct.icon
                const styles = accentMap[ct.accent]
                const isActive = selectedType === ct.id
                return (
                  <button
                    key={ct.id}
                    type="button"
                    onClick={() => setSelectedType(ct.id)}
                    className={`flex flex-col items-start gap-2 p-3 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]
                      ${isActive ? styles : 'border-[rgba(45,212,191,0.1)] text-[#8498b5] hover:border-[rgba(45,212,191,0.25)] hover:text-[#ccfbf1]'}`}
                  >
                    <Icon size={16} strokeWidth={1.75} />
                    <span className="text-xs font-medium">{ct.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Topic input */}
          <div className="rounded-2xl bg-[#0a111e]/80 border border-[rgba(45,212,191,0.12)] p-5">
            <label className="block text-xs font-semibold uppercase tracking-widest text-[#8498b5] mb-3" htmlFor="studio-topic">
              Topic or Prompt
            </label>
            <textarea
              id="studio-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={4}
              placeholder="Describe what you want to create…"
              className="w-full bg-[#080d18] border border-[rgba(45,212,191,0.15)] rounded-xl px-4 py-3 text-sm text-[#f0fdfa] placeholder-[#8498b5] resize-none focus-visible:outline-none focus-visible:border-[rgba(34,211,238,0.4)] transition-colors"
            />
            <div className="mt-3">
              <label className="block text-xs text-[#8498b5] mb-2" htmlFor="studio-tone">Tone</label>
              <select
                id="studio-tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-[#080d18] border border-[rgba(45,212,191,0.15)] rounded-xl px-3 py-2 text-sm text-[#f0fdfa] focus-visible:outline-none focus-visible:border-[rgba(34,211,238,0.4)] transition-colors"
              >
                {['Professional', 'Casual', 'Persuasive', 'Informative', 'Witty'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="mt-3">
              <label className="block text-xs text-[#8498b5] mb-2" htmlFor="studio-length">Output length</label>
              <select id="studio-length" value={length} onChange={(e) => setLength(e.target.value)} className="w-full bg-[#080d18] border border-[rgba(45,212,191,0.15)] rounded-xl px-3 py-2 text-sm text-[#f0fdfa] focus-visible:outline-none focus-visible:border-[rgba(34,211,238,0.4)] transition-colors">
                {['Short', 'Standard', 'Detailed'].map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
          </div>

          {/* Generate button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!topic.trim() || generating}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#10b981] text-[#041316] font-semibold text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"
          >
            {generating ? (
              <>
                <RefreshCw size={15} className="animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles size={15} />
                Generate Content
              </>
            )}
          </button>

          {/* Recent outputs */}
          <div className="rounded-2xl bg-[#0a111e]/80 border border-[rgba(45,212,191,0.12)] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8498b5] mb-4">Recent Outputs</p>
            <ul className="flex flex-col gap-2">
              {RECENT_OUTPUTS.map((item) => (
                <li key={item.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer">
                  <Wand2 size={14} className="text-[#22d3ee] shrink-0 mt-0.5" strokeWidth={1.75} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#ccfbf1] truncate">{item.title}</p>
                    <p className="text-[10px] text-[#8498b5]">{item.type} · {item.words} words · {item.created}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right panel — output */}
        <div className="lg:col-span-3 rounded-2xl bg-[#0a111e]/80 border border-[rgba(45,212,191,0.12)] flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(45,212,191,0.08)]">
            <div className="flex items-center gap-2">
              <Wand2 size={15} className="text-[#22d3ee]" strokeWidth={1.75} />
              <span className="text-sm font-semibold text-[#f0fdfa]">Output</span>
            </div>
            {output && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#8498b5] hover:text-white hover:bg-white/5 border border-transparent hover:border-[rgba(45,212,191,0.15)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"
                >
                  <Copy size={13} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#8498b5] hover:text-white hover:bg-white/5 border border-transparent hover:border-[rgba(45,212,191,0.15)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"
                >
                  <RefreshCw size={13} />
                  Regenerate
                </button>
                <button type="button" onClick={() => setOutput('')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#8498b5] hover:text-white hover:bg-white/5 border border-transparent hover:border-[rgba(45,212,191,0.15)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]">Clear</button>
              </div>
            )}
          </div>
          <div className="flex-1 p-5 overflow-y-auto">
            {generating ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <Sparkles size={20} className="text-[#22d3ee] animate-pulse" />
                </div>
                <p className="text-sm text-[#8498b5]">Generating your content…</p>
              </div>
            ) : output ? (
              <pre className="text-sm text-[#ccfbf1] leading-relaxed whitespace-pre-wrap font-sans">{output}</pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-12 h-12 rounded-2xl bg-[#080d18] border border-[rgba(45,212,191,0.12)] flex items-center justify-center mb-4">
                  <Zap size={20} className="text-[#8498b5]" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-[#f0fdfa] mb-1">Ready to generate</p>
                <p className="text-xs text-[#8498b5]">Select a content type, enter a topic, and hit Generate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
