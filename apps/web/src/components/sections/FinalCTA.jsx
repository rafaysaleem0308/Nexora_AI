import { motion } from 'motion/react'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const STATS = [
  { value: '2,400+', label: 'Teams building' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 50ms', label: 'Avg latency' },
  { value: 'SOC 2', label: 'Compliant' },
]

export function FinalCTA() {
  return (
    <section aria-label="Call to Action" className="py-28 sm:py-36 relative overflow-hidden bg-[#040710]">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />

      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-cyan-500/12 via-teal-500/10 to-emerald-500/12 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Floating particle dots */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { cx: '10%', cy: '20%', r: 1.5, op: 0.4 },
          { cx: '85%', cy: '15%', r: 2, op: 0.3 },
          { cx: '92%', cy: '70%', r: 1, op: 0.5 },
          { cx: '5%', cy: '75%', r: 1.5, op: 0.35 },
          { cx: '50%', cy: '5%', r: 1, op: 0.25 },
          { cx: '72%', cy: '90%', r: 2, op: 0.3 },
        ].map(({ cx, cy, r, op }, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#22d3ee] animate-pulse"
            style={{
              left: cx,
              top: cy,
              width: r * 2,
              height: r * 2,
              opacity: op,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] p-10 sm:p-16 lg:p-20 text-center bg-gradient-to-b from-[#0a1526]/95 to-[#060e1b]/95 border border-teal-500/20 shadow-[0_32px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl overflow-hidden max-w-5xl mx-auto"
        >
          {/* Inner glow rings */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/8 rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[2rem] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 80px rgba(6,182,212,0.04)' }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Stars / rating row */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-[#22d3ee] fill-[#22d3ee]" />
              ))}
              <span className="ml-2 text-xs text-[#8498b5] font-medium">Loved by 2,400+ teams</span>
            </div>

            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/25 bg-teal-950/40 text-xs font-semibold uppercase tracking-widest text-[#22d3ee] mb-6">
              <Sparkles size={13} className="text-[#6ee7b7]" />
              <span>Begin Your Flow</span>
            </div>

            {/* Headline */}
            <h2 className="font-syne font-800 text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-5">
              Your next breakthrough{' '}
              <span className="text-gradient-aurora">starts here.</span>
            </h2>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-[#8498b5] leading-relaxed mb-10 max-w-xl mx-auto">
              Give your ideas a workspace built for what&apos;s next. No credit card required.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="/app"
                className="btn-primary w-full sm:w-auto px-9 py-4 text-base gap-2"
              >
                <span>Launch Workspace</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#pricing"
                className="btn-ghost w-full sm:w-auto px-9 py-4 text-base"
                role="button"
              >
                View Pricing
              </a>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-10 border-t border-teal-500/12">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-syne font-800 text-2xl sm:text-3xl text-white tracking-tight">{value}</p>
                  <p className="text-xs text-[#8498b5] mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
