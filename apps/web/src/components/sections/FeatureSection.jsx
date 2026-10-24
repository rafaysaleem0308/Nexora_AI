import { motion } from 'motion/react'
import { Bot, FileSearch, Sparkles, LayoutGrid, ArrowUpRight } from 'lucide-react'

const FEATURES = [
  {
    icon: Bot,
    title: 'AI Conversation',
    tag: 'Intelligence',
    description:
      'Explore ideas, solve problems, and work through complex questions with a context-aware intelligent assistant that retains the full arc of your session.',
    metrics: 'Context-aware reasoning',
    stat: '10× faster',
    statLabel: 'decision velocity',
    accent: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-[#22d3ee]',
    tagColor: 'text-[#22d3ee] bg-cyan-950/40 border-cyan-500/25',
  },
  {
    icon: FileSearch,
    title: 'Document Intelligence',
    tag: 'Knowledge',
    description:
      'Turn scattered documents and raw notes into a living, searchable knowledge layer that surfaces the right context the moment you need it.',
    metrics: 'Semantic search indexing',
    stat: '128k',
    statLabel: 'token context window',
    accent: 'from-teal-500/20 to-teal-500/5',
    iconColor: 'text-[#14b8a6]',
    tagColor: 'text-[#14b8a6] bg-teal-950/40 border-teal-500/25',
  },
  {
    icon: Sparkles,
    title: 'AI Content Studio',
    tag: 'Creation',
    description:
      'Transform rough ideas into structured drafts, polished summaries, and production-ready content across any format or voice.',
    metrics: 'Multi-modal generation',
    stat: '60 sec',
    statLabel: 'from idea to draft',
    accent: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-[#10b981]',
    tagColor: 'text-[#10b981] bg-emerald-950/40 border-emerald-500/25',
  },
  {
    icon: LayoutGrid,
    title: 'Project Workspace',
    tag: 'Workflow',
    description:
      'Keep projects, tasks, and AI-assisted workflows organized in one connected space — from kick-off to shipped artifact.',
    metrics: 'Live collaborative boards',
    stat: '3 agents',
    statLabel: 'in sync, real-time',
    accent: 'from-cyan-500/15 to-emerald-500/10',
    iconColor: 'text-[#6ee7b7]',
    tagColor: 'text-[#6ee7b7] bg-emerald-950/40 border-emerald-500/25',
  },
]

export function FeatureSection() {
  return (
    <section id="features" aria-label="Features" className="py-28 sm:py-36 relative overflow-hidden bg-[#05080f]">
      {/* Background Subtle Gradient Blobs */}
      <div aria-hidden="true" className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[160px] pointer-events-none -translate-y-1/2" />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      {/* Top divider line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/25 bg-teal-950/25 text-xs font-semibold uppercase tracking-widest text-[#22d3ee] mb-5">
            Core Capabilities
          </div>
          <h2 className="font-syne font-800 text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-5">
            Everything you need to{' '}
            <span className="text-gradient-aurora">think beyond.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8498b5] leading-relaxed">
            Bring your ideas, knowledge, and creative workflows into one intelligent workspace.
          </p>
        </div>

        {/* Features 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {FEATURES.map((feat) => {
            const Icon = feat.icon
            return (
              <motion.article
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="group relative rounded-3xl p-8 sm:p-10 bg-[#0a111e]/60 border border-teal-500/12 backdrop-blur-xl hover:border-cyan-400/35 hover:bg-[#0c1520]/80 transition-all duration-400 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(6,182,212,0.1)] flex flex-col justify-between overflow-hidden"
              >
                {/* Hover Gradient Sweep */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-br ${feat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl`}
                />

                {/* Top-right decorative corner glow */}
                <div
                  aria-hidden="true"
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl bg-cyan-400/5 group-hover:bg-cyan-400/10 transition-all duration-500 pointer-events-none"
                />

                <div className="relative z-10">
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#080f1c] border border-teal-500/20 flex items-center justify-center group-hover:border-cyan-400/40 group-hover:scale-105 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.4)] shrink-0">
                      <Icon size={24} strokeWidth={1.75} className={feat.iconColor} />
                    </div>
                    <span className={`text-[11px] font-semibold border px-3 py-1 rounded-full uppercase tracking-widest ${feat.tagColor}`}>
                      {feat.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-syne font-700 text-2xl sm:text-[1.65rem] text-white mb-3.5 group-hover:text-[#f0fdfa] transition-colors leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-[#8498b5] group-hover:text-[#a0b4c8] text-sm sm:text-[0.9375rem] leading-relaxed transition-colors">
                    {feat.description}
                  </p>
                </div>

                {/* Card Bottom Meta */}
                <div className="relative z-10 pt-7 mt-7 border-t border-teal-500/10 flex items-center justify-between">
                  {/* Stat chip */}
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-syne font-700 text-lg text-white">{feat.stat}</span>
                    <span className="text-xs text-[#8498b5]">{feat.statLabel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#22d3ee]/60 group-hover:text-[#22d3ee] transition-colors">
                    <span className="hidden sm:inline">{feat.metrics}</span>
                    <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-all duration-300">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
