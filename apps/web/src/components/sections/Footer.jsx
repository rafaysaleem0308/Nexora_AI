import { Sparkles, Globe, Terminal, Share2, ArrowUpRight } from 'lucide-react'

const FOOTER_LINKS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Workspace Preview', href: '#workspace-preview' },
      { label: 'Open Dashboard', href: '/app' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'System Architecture', href: '#' },
      { label: 'Community', href: '#' },
    ],
  },
  {
    heading: 'Security & Trust',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Security Governance', href: '#' },
      { label: 'Compliance', href: '#' },
    ],
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer role="contentinfo" className="relative border-t border-teal-500/12 bg-[#030508] py-16 sm:py-20 text-[#8498b5] overflow-hidden">
      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-32 bg-teal-500/[0.03] blur-[80px] rounded-full pointer-events-none"
      />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">

          {/* Brand Info (2 columns on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <a href="/" className="flex items-center gap-2.5 text-white w-fit group">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#06b6d4] to-[#10b981] opacity-60 blur-sm group-hover:opacity-90 group-hover:blur-md transition-all duration-300" />
                <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0891b2] to-[#10b981] flex items-center justify-center text-[#041316] shadow-sm border border-white/15">
                  <Sparkles size={15} strokeWidth={2.5} />
                </div>
              </div>
              <span className="font-syne font-800 text-xl tracking-tight">
                Nexora<span className="text-[#22d3ee]">.ai</span>
              </span>
            </a>
            <p className="text-sm text-[#8498b5] max-w-xs leading-relaxed">
              One intelligent workspace to think clearly, create faster, and turn complex ideas into meaningful results.
            </p>

            {/* System status */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[#10b981] font-medium">All systems operational</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { icon: Globe, label: 'Global Network', href: '#' },
                { icon: Terminal, label: 'Developer CLI', href: '#' },
                { icon: Share2, label: 'Share Workspace', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-[#8498b5] hover:text-[#22d3ee] hover:border-cyan-400/35 hover:bg-cyan-500/[0.06] transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Link Columns */}
          {FOOTER_LINKS.map(({ heading, links }) => (
            <div key={heading} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/80 font-syne">{heading}</h4>
              <ul className="space-y-2.5 text-sm" role="list">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-center gap-1.5 text-[#8498b5] hover:text-white transition-colors duration-200"
                    >
                      <span>{label}</span>
                      {href === '#' && (
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-60 transition-opacity -mt-0.5" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-7 border-t border-teal-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8498b5]">
          <p>© {currentYear} Nexora AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="text-[#8498b5]/60">Obsidian & Aurora Edition</span>
            <span className="font-mono text-[#8498b5]/40">v1.0.0-phase3</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
