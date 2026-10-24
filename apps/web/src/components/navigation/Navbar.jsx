import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Product', href: '#workspace-preview' },
  { label: 'Pricing', href: '#pricing' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  return (
    <motion.header
      role="banner"
      initial={shouldReduceMotion ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#05080f]/90 backdrop-blur-2xl border-b border-teal-500/15 shadow-[0_1px_0_rgba(45,212,191,0.08),0_8px_32px_rgba(0,0,0,0.5)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20"
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] rounded-lg"
          aria-label="Nexora AI — Home"
        >
          <div className="relative flex items-center justify-center w-9 h-9">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#06b6d4] to-[#10b981] opacity-70 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300" />
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0891b2] to-[#10b981] border border-white/20 shadow-inner">
              <Sparkles size={17} className="text-[#041316] drop-shadow" strokeWidth={2.5} />
            </div>
          </div>
          <span className="font-syne font-800 text-2xl text-white tracking-tight">
            Nexora<span className="text-[#22d3ee]">.ai</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul
          className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1.5 rounded-full backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          role="list"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="px-4 py-1.5 text-sm font-medium text-[#99f6e4]/75 hover:text-white hover:bg-white/[0.07] rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] block"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/app"
            className="text-sm font-medium text-[#99f6e4]/70 hover:text-white transition-colors duration-200 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] rounded-md"
            title="Open the dashboard preview. Sign-in is not connected yet."
          >
            Dashboard
          </Link>
          <Link
            to="/app"
            className="btn-primary text-sm px-5 py-2.5 gap-1.5"
          >
            Launch Workspace
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg text-[#99f6e4] hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] transition-colors"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <motion.div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        initial={false}
        animate={
          shouldReduceMotion
            ? { opacity: menuOpen ? 1 : 0 }
            : { height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }
        }
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden bg-[#05080f]/96 backdrop-blur-2xl border-b border-teal-500/20"
      >
        <ul className="flex flex-col px-4 py-5 gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-4 py-3 text-sm font-medium text-[#ccfbf1]/80 hover:text-white hover:bg-teal-500/08 rounded-xl transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-3 border-t border-teal-500/15 mt-2 flex flex-col gap-2.5">
            <Link
              to="/app"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center py-2.5 text-sm text-[#99f6e4] hover:text-white transition-colors"
              title="Open the dashboard preview. Sign-in is not connected yet."
            >
              Dashboard
            </Link>
            <Link
              to="/app"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center btn-primary text-sm py-3"
            >
              Launch Workspace
            </Link>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  )
}
