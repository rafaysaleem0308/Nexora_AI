import { motion } from 'motion/react'
import {
  MessageSquare,
  FileText,
  Kanban,
  Sparkles,
  Send,
  CheckCircle2,
  TrendingUp,
  Activity,
  Code2,
  Zap,
  Brain,
  Lock,
} from 'lucide-react'

const TRUST_BADGES = [
  { icon: Zap, label: 'Sub-50ms Latency' },
  { icon: Brain, label: 'Context Retention' },
  { icon: Lock, label: 'SOC 2 Ready' },
  { icon: TrendingUp, label: '48% Output ↑' },
]

export function ProductShowcase() {
  return (
    <section id="workspace-preview" aria-label="Product Showcase" className="py-28 sm:py-36 relative overflow-hidden bg-[#05080f]">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />

      {/* Background Radial Glow Aura */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-cyan-500/8 via-teal-500/8 to-emerald-500/8 rounded-full blur-[180px] pointer-events-none"
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-950/25 text-xs font-semibold uppercase tracking-widest text-[#6ee7b7] mb-5">
            Product Experience
          </div>
          <h2 className="font-syne font-800 text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-5">
            Designed for <span className="text-gradient-aurora">deep work.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8498b5] leading-relaxed">
            Experience an interface crafted to eliminate noise and magnify intellectual clarity.
          </p>
        </div>

        {/* Trust badge strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-teal-500/15 text-xs text-[#8498b5] backdrop-blur-sm"
            >
              <Icon size={13} className="text-[#22d3ee]" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Dashboard Mockup Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] border border-teal-500/20 bg-[#070d18]/95 shadow-[0_32px_80px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl overflow-hidden"
        >
          {/* Outer glow ring */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[2rem] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 80px rgba(6,182,212,0.04)' }}
          />

          {/* Top Browser / Window Bar */}
          <div className="px-5 sm:px-6 py-4 border-b border-teal-500/12 bg-[#060c14]/90 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/60 hover:bg-rose-400 transition-colors cursor-default" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60 hover:bg-amber-400 transition-colors cursor-default" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60 hover:bg-emerald-400 transition-colors cursor-default" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-xs text-[#8498b5] font-mono max-w-sm w-full justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse shrink-0" />
                <span>nexora.ai/workspace/intel-core</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6ee7b7] shrink-0">
              <Sparkles size={13} />
              <span className="hidden sm:inline font-medium">Preview Mode</span>
            </div>
          </div>

          {/* Main Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">

            {/* Left Micro-Sidebar (2 columns on lg) */}
            <div className="hidden lg:flex lg:col-span-2 border-r border-teal-500/08 p-5 flex-col justify-between bg-[#050b14]/70">
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 px-1.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-emerald-400 flex items-center justify-center text-[#05080f] font-bold text-xs shadow-sm">
                    N
                  </div>
                  <span className="font-syne font-700 text-sm text-white">Nexora AI</span>
                </div>

                <nav className="space-y-0.5" aria-label="Workspace navigation">
                  {[
                    { label: 'Conversations', icon: MessageSquare, active: true },
                    { label: 'Documents', icon: FileText, active: false },
                    { label: 'Projects', icon: Kanban, active: false },
                    { label: 'Studio', icon: Code2, active: false },
                  ].map(({ label, icon: Icon, active }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-default ${
                        active
                          ? 'bg-cyan-500/12 text-[#22d3ee] border border-cyan-400/20'
                          : 'text-[#8498b5] hover:text-[#ccfbf1] hover:bg-white/[0.03]'
                      }`}
                    >
                      <Icon size={15} strokeWidth={active ? 2 : 1.75} />
                      <span>{label}</span>
                    </div>
                  ))}
                </nav>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#080f1c] border border-teal-500/12">
                <div className="flex items-center gap-2 text-xs text-[#6ee7b7] font-semibold mb-1.5">
                  <Activity size={13} />
                  <span>Model Latency</span>
                </div>
                <p className="text-[11px] text-[#8498b5] font-mono">42ms · Optimal</p>
                <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[15%] rounded-full bg-gradient-to-r from-[#22d3ee] to-[#10b981]" />
                </div>
              </div>
            </div>

            {/* Center: AI Conversation Stage (6 columns on lg) */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-teal-500/08">
              <div>
                {/* Workspace Greeting & Status */}
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-teal-500/08">
                  <div>
                    <h4 className="font-syne font-700 text-base sm:text-lg text-white mb-0.5">
                      Good morning, Alex
                    </h4>
                    <p className="text-xs text-[#8498b5]">Workspace active · 3 agents synchronized</p>
                  </div>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-[#22d3ee] font-medium shrink-0">
                    GPT-5 Omni
                  </span>
                </div>

                {/* Simulated Chat Dialogue */}
                <div className="space-y-5">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-sm p-3.5 rounded-2xl rounded-tr-sm bg-gradient-to-br from-cyan-950/60 to-teal-950/40 border border-cyan-500/20 text-xs sm:text-[0.8125rem] text-[#e0f7f4] shadow-sm leading-relaxed">
                      Synthesize the Q4 product roadmap. Isolate high-impact initiatives and suggest optimal milestone velocity.
                    </div>
                  </div>

                  {/* AI Response Card */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-emerald-400 flex items-center justify-center text-[#05080f] shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                      <Sparkles size={15} />
                    </div>
                    <div className="max-w-sm p-4 rounded-2xl rounded-tl-sm bg-[#080f1c]/90 border border-teal-500/18 text-xs sm:text-[0.8125rem] text-[#ccfbf1] space-y-3 leading-relaxed">
                      <p className="font-semibold text-white text-sm">
                        Q4 Roadmap — Priority Breakdown
                      </p>
                      <div className="space-y-1.5">
                        {[
                          '1. Real-time Semantic Indexing (Alpha)',
                          '2. Context Memory Window — 128k tokens',
                          '3. Automated Workflow Artifact Generation',
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-2 text-[#6ee7b7]">
                            <CheckCircle2 size={13} className="shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/50 border border-white/[0.04] font-mono text-[11px] text-[#22d3ee]">
                        // Projected velocity: +34% output efficiency
                      </div>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex items-center gap-2 pl-11">
                    <div className="flex gap-1 px-3 py-2 rounded-full bg-[#080f1c]/80 border border-teal-500/12">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]/60 animate-bounce"
                          style={{ animationDelay: `${delay}s` }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#8498b5]">Nexora is thinking…</span>
                  </div>
                </div>
              </div>

              {/* Input Bar */}
              <div className="mt-6 pt-5 border-t border-teal-500/08">
                <div className="relative flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="Ask Nexora to draft documentation or restructure sprint..."
                    className="flex-1 bg-[#060c14] border border-teal-500/15 rounded-2xl px-4 py-3.5 text-xs text-[#8498b5] focus:outline-none cursor-default pr-14 placeholder-[#8498b5]"
                  />
                  <button
                    type="button"
                    aria-label="Send query"
                    className="absolute right-2 p-2.5 rounded-xl bg-gradient-to-br from-[#22d3ee] to-[#10b981] text-[#05080f] hover:opacity-90 transition-opacity shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Workspace Analytics & Documents (4 columns on lg) */}
            <div className="lg:col-span-4 p-6 sm:p-8 space-y-5 bg-[#050b13]/50">
              {/* Productivity Analytics Card */}
              <div className="p-5 rounded-2xl bg-[#07101c]/80 border border-teal-500/12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <TrendingUp size={14} className="text-[#22d3ee]" />
                    <span>Weekly Output Velocity</span>
                  </div>
                  <span className="text-xs font-bold text-[#6ee7b7] bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded-full">+48%</span>
                </div>
                {/* SVG Sparkline Graph */}
                <div className="h-14 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 200 56" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="cyanMintGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                      <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,50 Q30,45 60,30 T120,18 T160,8 T200,3 L200,56 L0,56 Z"
                      fill="url(#fillGrad)"
                    />
                    <path
                      d="M0,50 Q30,45 60,30 T120,18 T160,8 T200,3"
                      fill="none"
                      stroke="url(#cyanMintGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Data point */}
                    <circle cx="200" cy="3" r="3.5" fill="#10b981" />
                  </svg>
                </div>
              </div>

              {/* Recent Knowledge Documents */}
              <div className="p-5 rounded-2xl bg-[#07101c]/80 border border-teal-500/12 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-white">Recent Knowledge Bases</span>
                  <span className="text-[#22d3ee] cursor-default hover:underline text-[11px]">View All</span>
                </div>
                {[
                  { name: 'System_Architecture_v2.md', tag: 'Technical', time: '12m' },
                  { name: 'Growth_Strategy_2026.pdf', tag: 'Strategy', time: '1h' },
                  { name: 'Brand_Identity_Guidelines.docx', tag: 'Design', time: '3h' },
                ].map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs hover:border-cyan-400/25 hover:bg-cyan-500/[0.03] transition-all cursor-default"
                  >
                    <div className="flex items-center gap-2.5 truncate min-w-0">
                      <FileText size={13} className="text-[#22d3ee] shrink-0" />
                      <span className="text-[#ccfbf1]/80 truncate">{doc.name}</span>
                    </div>
                    <span className="text-[10px] text-[#8498b5] shrink-0 ml-2 font-mono">{doc.time}</span>
                  </div>
                ))}
              </div>

              {/* Sprint Status */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/25 to-emerald-950/15 border border-teal-500/18 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Sprint Alpha</p>
                    <p className="text-[11px] text-[#8498b5] mt-0.5">84% Completed · On Track</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#6ee7b7] bg-emerald-950/60 border border-emerald-500/25 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                    Live
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#22d3ee] to-[#10b981]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '84%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Footer Preview Notice */}
          <div className="px-6 py-3.5 border-t border-teal-500/08 bg-[#040912]/90 flex items-center justify-between text-[11px] text-[#8498b5]">
            <span>Nexora AI Interactive Workspace Preview</span>
            <span className="text-[#22d3ee]/60">Real-time capabilities rolling out in Phase 4</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
