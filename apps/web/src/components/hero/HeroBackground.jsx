import { motion, useReducedMotion } from 'motion/react'

/**
 * HeroBackground
 *
 * Static aurora background with subtle dark vignette.
 */
export function HeroBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
    >
      {/* ── CSS Poster / Cosmic Fallback Background ──────────────────── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'radial-gradient(ellipse 90% 65% at 50% 35%, #08212b 0%, #061118 50%, #05080f 100%)',
        }}
      />

      {/* ── Layer 1: Dark Obsidian Tint ─────────────────────────────── */}
      <div className="absolute inset-0 bg-[#05080f]/70" />

      {/* ── Layer 2: Aurora Mint & Cyan Glow Centers ─────────────────── */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[500px] rounded-full blur-[140px] opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, #0e7490 40%, transparent 70%)',
        }}
      />

      <div
        className="absolute bottom-1/3 -left-32 w-[550px] h-[550px] rounded-full blur-[160px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #10b981 0%, #047857 40%, transparent 70%)',
        }}
      />

      <div
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #14b8a6 0%, #0f766e 40%, transparent 70%)',
        }}
      />

      {/* ── Layer 3: Vignette & Edge Shadow ─────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 110% 85% at 50% 50%, transparent 25%, rgba(5, 8, 15, 0.88) 100%)',
        }}
      />

      {/* ── Layer 4: Smooth Top & Bottom Blend ───────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-36"
        style={{
          background: 'linear-gradient(to bottom, #05080f 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{
          background: 'linear-gradient(to top, #05080f 0%, transparent 100%)',
        }}
      />
    </motion.div>
  )
}
