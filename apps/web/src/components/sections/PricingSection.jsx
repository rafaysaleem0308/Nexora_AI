import { motion } from 'motion/react'
import { Check, Sparkles, ArrowRight } from 'lucide-react'

const TIERS = [
  {
    name: 'Free',
    badge: 'Explorer',
    price: '$0',
    period: 'forever',
    description: 'Essential AI capabilities for personal exploration and small creative projects.',
    popular: false,
    features: [
      'Basic AI workspace access',
      'Standard model inference velocity',
      'Limited daily AI reasoning runs',
      'Essential document & folder organization',
      'Community knowledge base support',
    ],
    cta: 'Get Started',
    ctaStyle: 'btn-ghost',
    href: '/app',
  },
  {
    name: 'Pro',
    badge: 'Most Popular',
    price: '$24',
    period: 'per month',
    description: 'Accelerated intelligence and expansive memory for creators and professionals.',
    popular: true,
    features: [
      'Higher AI usage allowance',
      'Advanced content studio & code synthesis',
      'Expanded document knowledge indexing',
      'Priority inference latency & reasoning',
      'Custom workspace workflows & templates',
      'Early access to experimental models',
    ],
    cta: 'Explore Pro',
    ctaStyle: 'btn-primary',
    href: '/app',
  },
  {
    name: 'Team',
    badge: 'Enterprise Flow',
    price: '$49',
    period: 'per user / mo',
    description: 'Shared intelligence and seamless multi-member synchronization for organizations.',
    popular: false,
    features: [
      'Shared workspace concept & team drives',
      'Collaborative real-time canvas boards',
      'Team-oriented workflows & agent handoffs',
      'Centralized administration & audit logs',
      'Custom security & access governance',
      'Dedicated technical account manager',
    ],
    cta: 'Contact Us',
    ctaStyle: 'btn-ghost',
    href: '#workspace-preview',
  },
]

export function PricingSection() {
  return (
    <section id="pricing" aria-label="Pricing" className="py-24 sm:py-32 relative overflow-hidden bg-[#05080f]/95 border-t border-teal-500/10">
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/25 bg-teal-950/30 text-xs font-semibold uppercase tracking-wider text-[#22d3ee] mb-4">
            Transparent Pricing
          </div>
          <h2 className="font-syne font-800 text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-5">
            Predictable plans for <span className="text-gradient-aurora">ambitious minds.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#ccfbf1]/80 leading-relaxed">
            Select the tier built to scale with your intellectual curiosity and production workflows.
          </p>
          <p className="mt-3 text-xs text-[#8498b5]">
            * Early access pricing. No credit card required to explore the workspace preview.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
          {TIERS.map((tier) => {
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-b from-[#0b1726] to-[#07101c] border-2 border-cyan-400/50 shadow-[0_10px_40px_rgba(6,182,212,0.2)] lg:-translate-y-2'
                    : 'bg-[#0a111e]/70 border border-teal-500/15 hover:border-cyan-400/30 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
                }`}
              >
                {/* Popular Pill */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-[#05080f] font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5">
                    <Sparkles size={13} />
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-syne font-700 text-2xl text-white">{tier.name}</h3>
                    {!tier.popular && (
                      <span className="text-xs font-semibold text-[#8498b5] bg-white/[0.04] px-3 py-1 rounded-full">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#8498b5] mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-teal-500/15">
                    <span className="font-syne font-800 text-5xl text-white tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-sm text-[#8498b5]">/ {tier.period}</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8" role="list">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-[#ccfbf1]/90">
                        <div className="w-5 h-5 rounded-full bg-cyan-950/60 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-0.5 text-[#22d3ee]">
                          <Check size={12} strokeWidth={2.5} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div>
                  <a
                    href={tier.href}
                    className={`${tier.ctaStyle} w-full text-center py-3.5 text-sm flex items-center justify-center gap-2`}
                    role="button"
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

