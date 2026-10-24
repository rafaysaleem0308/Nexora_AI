import { lazy, Suspense, useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ArrowRight, Sparkles, Wand2, ShieldCheck, Cpu, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeroBackground } from './HeroBackground.jsx'
import { FloatingCardsOverlay } from './FloatingCardsOverlay.jsx'

const HeroScene = lazy(() => import('../three/HeroScene.tsx').then((module) => ({ default: module.HeroScene })))

// ─── Headline Text Transitions ───────────────────────────────────────────────

const HEADLINE_ROTATING_WORDS = [
  {
    id: 'amplified',
    display: 'Amplified by AI.',
  },
  {
    id: 'engineered',
    display: 'Engineered for Speed.',
  },
  {
    id: 'transformed',
    display: 'Transformed to Reality.',
  },
  {
    id: 'structured',
    display: (
      <>
        <span className="block whitespace-nowrap">Structured with</span>
        <span className="block whitespace-nowrap">Precision.</span>
      </>
    ),
  },
]

// Unified instant entrance animation: all hero elements load together at once
const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  // Rotating dynamic heading transition
  useEffect(() => {
    if (shouldReduceMotion) return

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HEADLINE_ROTATING_WORDS.length)
    }, 3400)

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  const mp = shouldReduceMotion
    ? {}
    : {
        variants: FADE_UP,
        initial: 'hidden',
        animate: 'visible',
      }

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#05080f]"
    >
      {/* ── Atmospheric Aurora Mint & Cyber Cyan Background ────────── */}
      <HeroBackground />

      {/* Render cards in the DOM so they appear before the WebGL scene is ready. */}
      {!shouldReduceMotion && <FloatingCardsOverlay />}

      {/* ── Integrated 3D Scene Layer (Loads once together with floating cards) ──── */}
      <motion.div
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen overflow-hidden"
      >
        <Suspense fallback={<div className="w-full h-full" style={{ minHeight: 440 }} />}>
          <HeroScene />
        </Suspense>
      </motion.div>

      {/* ── Foreground Content ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col flex-1 justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-16">

        {/* Center Copy Block */}
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">

          {/* 1. Eyebrow Badge */}
          <motion.div {...mp}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.25)] mb-8 sm:mb-10 hover:border-cyan-300/50 transition-all duration-300">
              <Sparkles size={14} className="text-[#22d3ee] animate-pulse" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gradient-aurora">
                The Next Generation AI Workspace
              </span>
            </div>
          </motion.div>

          {/* 2. Main Headline "Your ideas." */}
          <motion.h1
            {...mp}
            className="font-syne font-800 text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[94px] leading-[1.08] tracking-tight text-white mb-6 sm:mb-8"
          >
            Your ideas.{' '}
            <span className="block min-h-[1.18em] relative overflow-visible mt-1 sm:mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 35, filter: 'blur(10px)' }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -35, filter: 'blur(10px)' }
                  }
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-gradient-aurora relative"
                >
                  {HEADLINE_ROTATING_WORDS[index].display}

                  {/* Underline Radiant Mint Glow Bar */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#22d3ee] to-transparent opacity-80 blur-[0.5px] rounded-full"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-1/4 w-1/2 h-[3px] bg-[#6ee7b7] opacity-90 blur-[1px] rounded-full"
                  />
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* 3. Supporting Text */}
          <motion.p
            {...mp}
            className="text-base sm:text-xl md:text-2xl text-[#ccfbf1]/85 leading-relaxed max-w-2xl sm:max-w-3xl mb-10 sm:mb-12 font-normal"
          >
            One intelligent workspace to think clearly, create faster, and turn complex ideas into meaningful results.
          </motion.p>

          {/* 4. Dual CTA Buttons */}
          <motion.div
            {...mp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto mb-14 z-20"
          >
            <Link
              to="/app"
              className="btn-primary group w-full sm:w-auto px-9 py-4 text-base"
            >
              <span>Launch Workspace</span>
              <ArrowRight
                size={18}
                className="ml-2.5 group-hover:translate-x-1.5 transition-transform duration-300"
                aria-hidden="true"
              />
            </Link>

            <a
              href="#features"
              className="btn-ghost w-full sm:w-auto px-9 py-4 text-base"
              role="button"
            >
              <Wand2 size={17} className="mr-2 text-[#22d3ee]" />
              <span>Explore Features</span>
            </a>
          </motion.div>

          {/* 5. Social Proof Avatars & Counter */}
          <motion.div
            {...mp}
            className="flex items-center gap-4 bg-cyan-950/20 border border-teal-500/20 px-5 py-2.5 rounded-full backdrop-blur-md"
          >
            {/* Avatar Glow Stack */}
            <div className="flex -space-x-2" aria-hidden="true">
              {['#06b6d4', '#10b981', '#14b8a6', '#0284c7'].map((bg, i) => (
                <div
                  key={i}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#05080f] shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${bg}, #042f2e)`,
                  }}
                />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-[#ccfbf1]/90">
              <span className="text-white font-semibold">2,400+</span> teams building with Nexora
            </p>
          </motion.div>
        </div>

        {/* 6. Four Compact Frosted-Glass Feature Badges */}
        <div className="w-full max-w-4xl mx-auto px-4 mt-14 sm:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'Smart AI', icon: Cpu },
              { label: 'Creative Tools', icon: Sparkles },
              { label: 'Connected Workflows', icon: Layers },
              { label: 'Secure Workspace', icon: ShieldCheck },
            ].map(({ label, icon: Icon }) => (
              <motion.div
                key={label}
                {...mp}
                className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-white/[0.03] border border-teal-500/20 backdrop-blur-md text-xs sm:text-sm text-[#ccfbf1]/85 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-500/[0.08] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                <Icon size={16} className="text-[#22d3ee]" aria-hidden="true" />
                <span className="font-medium">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
