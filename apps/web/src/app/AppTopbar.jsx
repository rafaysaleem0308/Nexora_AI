import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Menu, Search, Bell, ChevronRight, Home, X } from 'lucide-react'

const PAGE_META = {
  '/app': { title: 'Overview', breadcrumb: [] },
  '/app/chat': { title: 'AI Chat', breadcrumb: ['Workspace'] },
  '/app/documents': { title: 'Documents', breadcrumb: ['Workspace'] },
  '/app/studio': { title: 'Content Studio', breadcrumb: ['Workspace'] },
  '/app/projects': { title: 'Projects', breadcrumb: ['Workspace'] },
  '/app/analytics': { title: 'Analytics', breadcrumb: ['Workspace'] },
  '/app/settings': { title: 'Settings', breadcrumb: ['Account'] },
}

export function AppTopbar({ onMenuClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  const meta = PAGE_META[location.pathname] ?? { title: 'Dashboard', breadcrumb: [] }
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [openPanel, setOpenPanel] = useState(null)
  const searchPages = Object.entries(PAGE_META)
    .map(([path, page]) => ({ path, title: page.title }))
    .filter((page) => page.title.toLowerCase().includes(searchQuery.trim().toLowerCase()))

  const goToPage = (path) => {
    navigate(path)
    setSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <header className="h-14 shrink-0 flex items-center gap-3 px-4 md:px-6 border-b border-[rgba(45,212,191,0.08)] bg-[#080d18]/80 backdrop-blur-xl z-10">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onMenuClick}
        className="md:hidden p-1.5 rounded-lg text-[#8498b5] hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] transition-colors shrink-0"
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <Link to="/app" className="text-[#8498b5] hover:text-[#ccfbf1] transition-colors shrink-0" aria-label="Dashboard home">
          <Home size={14} />
        </Link>
        {meta.breadcrumb.map((crumb) => (
          <span key={crumb} className="flex items-center gap-1.5 text-[#8498b5]">
            <ChevronRight size={12} />
            <span className="text-xs">{crumb}</span>
          </span>
        ))}
        {meta.breadcrumb.length > 0 && (
          <ChevronRight size={12} className="text-[#8498b5]" />
        )}
        <h1 className="text-sm font-semibold text-[#f0fdfa] truncate">{meta.title}</h1>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 relative">
        {searchOpen ? (
          <div className="flex items-center gap-2 bg-[#0a111e] border border-[rgba(45,212,191,0.2)] rounded-lg px-2 sm:px-3 py-1.5">
            <Search size={14} className="text-[#8498b5] shrink-0" />
            <input
              type="search"
              placeholder="Search workspace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="bg-transparent text-sm text-[#f0fdfa] placeholder-[#8498b5] outline-none w-28 sm:w-48 md:w-64"
              aria-label="Search workspace"
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchOpen(false)
                if (e.key === 'Enter' && searchPages[0]) goToPage(searchPages[0].path)
              }}
            />
            <button
              type="button"
              onClick={() => { setSearchOpen(false); setSearchQuery('') }}
              className="text-[#8498b5] hover:text-white transition-colors"
              aria-label="Close search"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#8498b5] hover:text-[#ccfbf1] hover:bg-white/[0.04] border border-transparent hover:border-[rgba(45,212,191,0.15)] text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"
            aria-label="Open search"
          >
            <Search size={15} />
            <span className="hidden sm:inline text-xs">Search</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] border border-white/[0.08] text-[#8498b5]">
              ⌘K
            </kbd>
          </button>
        )}

        {searchOpen && searchQuery.trim() && (
          <div className="absolute top-full right-24 sm:right-28 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-xl border border-[rgba(45,212,191,0.18)] bg-[#0a111e] p-2 shadow-2xl z-30">
            <p className="px-2 py-1 text-[10px] uppercase tracking-widest text-[#8498b5]">Dashboard pages</p>
            {searchPages.length ? searchPages.map((page) => <button key={page.path} type="button" onClick={() => goToPage(page.path)} className="w-full rounded-lg px-2 py-2 text-left text-sm text-[#ccfbf1] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]">{page.title}</button>) : <p className="px-2 py-2 text-xs text-[#8498b5]">No matching pages.</p>}
          </div>
        )}

        {/* Notifications */}
        <div className="relative">
          <button type="button" onClick={() => setOpenPanel(openPanel === 'notifications' ? null : 'notifications')} className="relative p-1.5 rounded-lg text-[#8498b5] hover:text-white hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] transition-colors" aria-label="Open sample notifications" aria-expanded={openPanel === 'notifications'}>
            <Bell size={18} /><span aria-hidden="true" className="absolute top-1 right-1 w-2 h-2 bg-[#22d3ee] rounded-full shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
          </button>
          {openPanel === 'notifications' && <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-[rgba(45,212,191,0.18)] bg-[#0a111e] p-4 shadow-2xl z-30"><p className="text-sm font-semibold text-[#f0fdfa]">Notifications</p><p className="mt-1 text-[10px] uppercase tracking-widest text-[#22d3ee]">Sample preview</p><p className="mt-3 text-xs leading-relaxed text-[#8498b5]">You’re all caught up. Live notifications are not connected yet.</p></div>}
        </div>

        {/* Profile avatar */}
        <div className="relative">
          <button type="button" onClick={() => setOpenPanel(openPanel === 'profile' ? null : 'profile')} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#10b981] flex items-center justify-center text-[#041316] font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] hover:opacity-90 transition-opacity" aria-label="Open profile menu" aria-expanded={openPanel === 'profile'}>N</button>
          {openPanel === 'profile' && <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[rgba(45,212,191,0.18)] bg-[#0a111e] p-2 shadow-2xl z-30"><p className="px-2 py-2 text-xs text-[#8498b5]">Nexora User · local preview</p><Link to="/app/settings" onClick={() => setOpenPanel(null)} className="block rounded-lg px-2 py-2 text-sm text-[#ccfbf1] hover:bg-white/[0.05]">Settings</Link><Link to="/" className="block rounded-lg px-2 py-2 text-sm text-[#ccfbf1] hover:bg-white/[0.05]">Public website</Link></div>}
        </div>
      </div>
    </header>
  )
}
