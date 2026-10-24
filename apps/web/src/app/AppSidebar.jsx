import { NavLink, Link } from 'react-router-dom'
import {
  LayoutDashboard, MessageSquare, FolderOpen, Wand2,
  Briefcase, BarChart2, Settings, Sparkles, X, ChevronRight
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/app/chat', label: 'AI Chat', icon: MessageSquare },
  { to: '/app/documents', label: 'Documents', icon: FolderOpen },
  { to: '/app/studio', label: 'Content Studio', icon: Wand2 },
  { to: '/app/projects', label: 'Projects', icon: Briefcase },
  { to: '/app/analytics', label: 'Analytics', icon: BarChart2 },
]

const BOTTOM_ITEMS = [
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

function NavItem({ item }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
          isActive
            ? 'bg-cyan-500/10 text-[#22d3ee] border border-cyan-500/25 shadow-[0_0_12px_rgba(34,211,238,0.08)]'
            : 'text-[#8498b5] hover:text-[#ccfbf1] hover:bg-white/[0.04] border border-transparent'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span
              aria-hidden="true"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#22d3ee] rounded-r-full"
            />
          )}
          <Icon size={17} strokeWidth={isActive ? 2 : 1.75} className="shrink-0" />
          <span>{item.label}</span>
          {isActive && (
            <ChevronRight size={13} className="ml-auto opacity-50" />
          )}
        </>
      )}
    </NavLink>
  )
}

export function AppSidebar({ open, onClose }) {
  return (
    <>
      {/* Sidebar */}
      <aside
        role="navigation"
        aria-label="Application navigation"
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 flex flex-col
          bg-[#080d18] border-r border-[rgba(45,212,191,0.1)]
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-[rgba(45,212,191,0.08)] shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] rounded-lg"
            aria-label="Nexora AI — Home"
          >
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-[#06b6d4] to-[#10b981] opacity-70 blur-sm group-hover:opacity-100 transition-all duration-300" />
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0891b2] to-[#10b981] border border-white/20">
                <Sparkles size={14} className="text-[#041316]" strokeWidth={2.5} />
              </div>
            </div>
            <span className="font-syne font-bold text-xl text-white tracking-tight">
              Nexora<span className="text-[#22d3ee]">.ai</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-[#8498b5] hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable nav */}
        <div className="flex flex-col flex-1 overflow-y-auto py-4 px-3 gap-1">
          {/* Main nav */}
          <nav aria-label="Main" className="flex flex-col gap-0.5">
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#8498b5]/60">
              Workspace
            </p>
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>

          {/* Divider */}
          <div className="my-3 h-px bg-gradient-to-r from-transparent via-[rgba(45,212,191,0.15)] to-transparent" />

          {/* Bottom nav */}
          <nav aria-label="Account" className="flex flex-col gap-0.5">
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#8498b5]/60">
              Account
            </p>
            {BOTTOM_ITEMS.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>
        </div>

        {/* User profile area */}
        <div className="shrink-0 p-3 border-t border-[rgba(45,212,191,0.08)]">
          <Link to="/app/settings" onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#10b981] flex items-center justify-center text-[#041316] font-bold text-sm shrink-0">
              N
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#f0fdfa] truncate">Nexora User</p>
              <p className="text-xs text-[#8498b5] truncate">Pro Plan</p>
            </div>
            <Settings size={14} className="text-[#8498b5] group-hover:text-[#ccfbf1] transition-colors shrink-0" />
          </Link>
        </div>
      </aside>
    </>
  )
}
