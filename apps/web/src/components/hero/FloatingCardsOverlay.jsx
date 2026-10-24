import { motion } from 'motion/react'

const CARDS = [
  { placement: 'left-[3%] top-[34%] sm:left-[7%] lg:left-[11%]', glow: '#06b6d4', tilt: -5, delay: 0 },
  { placement: 'right-[3%] top-[39%] sm:right-[7%] lg:right-[11%]', glow: '#10b981', tilt: 5, delay: 0.4 },
  { placement: 'left-[8%] top-[64%] sm:left-[19%] lg:left-[24%]', glow: '#22d3ee', tilt: 4, delay: 0.8, lower: true },
  { placement: 'right-[8%] top-[25%] sm:right-[19%] lg:right-[24%]', glow: '#6ee7b7', tilt: -4, delay: 1.2, lower: true },
]

function FloatingCard({ glow, tilt, delay, placement, lower }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={{ y: [0, -8, 0], rotate: [tilt, tilt + 1, tilt] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute ${placement} ${lower ? 'hidden md:block' : ''} w-28 sm:w-44 lg:w-52 aspect-[1.65] rounded-xl border border-white/15 bg-[#06171d]/75 p-2.5 sm:p-4 shadow-[0_0_28px_rgba(6,182,212,0.12)] backdrop-blur-sm`}
      style={{ boxShadow: `0 0 28px ${glow}22`, borderColor: `${glow}55` }}
    >
      <div className="h-1 w-1/2 rounded-full" style={{ backgroundColor: glow, boxShadow: `0 0 10px ${glow}` }} />
      <div className="mt-3 h-1 w-4/5 rounded-full bg-slate-300/50" />
      <div className="mt-2 h-1 w-3/5 rounded-full bg-teal-200/50" />
      <div className="mt-2 h-1 w-2/3 rounded-full bg-slate-500/60" />
      <div className="mt-3 h-2 w-8 rounded-full" style={{ backgroundColor: `${glow}88` }} />
    </motion.div>
  )
}

export function FloatingCardsOverlay() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {CARDS.map((card, index) => <FloatingCard key={index} {...card} />)}
    </div>
  )
}
