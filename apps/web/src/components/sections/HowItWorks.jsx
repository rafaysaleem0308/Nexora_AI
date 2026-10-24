import { motion } from 'motion/react'
import { UploadCloud, Cpu, CheckCircle2 } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    title: 'Bring your ideas',
    description: 'Start with a question, a document, or a project.',
    icon: UploadCloud,
    detail: 'Import research, upload raw notes, or initiate a new strategic stream from any format.',
    accentFrom: '#06b6d4',
    accentTo: '#0891b2',
  },
  {
    step: '02',
    title: 'Work with intelligence',
    description: 'Use AI to explore, organize, and refine your thinking.',
    icon: Cpu,
    detail: 'Synthesize complex domains, uncover hidden connections, and generate structured outlines in seconds.',
    accentFrom: '#22d3ee',
    accentTo: '#14b8a6',
  },
  {
    step: '03',
    title: 'Move forward with clarity',
    description: 'Turn insights into content, decisions, and completed work.',
    icon: CheckCircle2,
    detail: 'Export polished artifacts, deploy automations, and share results directly with your team.',
    accentFrom: '#14b8a6',
    accentTo: '#10b981',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-label="How it works" className="py-28 sm:py-36 relative overflow-hidden bg-[#040710]">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />

      {/* Ambient glow */}
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/[0.05] to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-950/25 text-xs font-semibold uppercase tracking-widest text-[#22d3ee] mb-5">
            Workflow Architecture
          </div>
          <h2 className="font-syne font-800 text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-5">
            Engineered for{' '}
            <span className="text-gradient-aurora">frictionless momentum.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8498b5] leading-relaxed">
            Move seamlessly from abstract concepts to polished outcomes in three streamlined phases.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Horizontal connector line on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[3.25rem] left-[calc(16.66%+3rem)] right-[calc(16.66%+3rem)] h-px z-0"
            style={{
              background: 'linear-gradient(90deg, rgba(6,182,212,0.15), rgba(34,211,238,0.45), rgba(16,185,129,0.15))',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5 }}
                  className="group relative rounded-3xl p-8 sm:p-10 bg-[#09101e]/70 border border-teal-500/12 backdrop-blur-xl hover:border-cyan-400/30 hover:bg-[#0c1520]/80 transition-all duration-400 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(6,182,212,0.08)] overflow-hidden"
                >
                  {/* Corner glow */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${step.accentFrom}22, transparent 70%)` }}
                  />

                  {/* Step number badge + icon row */}
                  <div className="flex items-center justify-between mb-10">
                    {/* Circular step icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${step.accentFrom}33, ${step.accentTo}22)`,
                      }}
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.75}
                        style={{ color: step.accentFrom }}
                      />
                    </div>

                    {/* Big step number */}
                    <span
                      className="font-syne font-800 text-5xl sm:text-6xl leading-none tabular-nums select-none"
                      style={{
                        background: `linear-gradient(135deg, ${step.accentFrom}55, ${step.accentTo}22)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-syne font-700 text-2xl sm:text-[1.65rem] text-white mb-2.5 group-hover:text-[#f0fdfa] transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-base font-medium mb-3" style={{ color: step.accentFrom + 'cc' }}>
                      {step.description}
                    </p>
                    <p className="text-sm text-[#8498b5] leading-relaxed group-hover:text-[#a0b4c8] transition-colors">
                      {step.detail}
                    </p>
                  </div>

                  {/* Bottom connector dot for desktop */}
                  {idx < STEPS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute top-[3.25rem] -right-4 w-8 h-px z-20"
                      style={{ background: `linear-gradient(90deg, ${step.accentFrom}88, transparent)` }}
                    />
                  )}

                  {/* Phase label */}
                  <div className="mt-8 pt-6 border-t border-teal-500/10">
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: step.accentFrom + '99' }}
                    >
                      Phase {step.step}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
