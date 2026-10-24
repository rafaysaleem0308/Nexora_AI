import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function StatCard({ label, value, subtext, trend, trendValue, icon: Icon, accent = 'cyan' }) {
  const accentMap = {
    cyan: { text: 'text-[#22d3ee]', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'rgba(34,211,238,0.08)' },
    mint: { text: 'text-[#10b981]', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'rgba(16,185,129,0.08)' },
    teal: { text: 'text-[#14b8a6]', bg: 'bg-teal-500/10', border: 'border-teal-500/20', glow: 'rgba(20,184,166,0.08)' },
  }
  const colors = accentMap[accent] ?? accentMap.cyan

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-[#10b981]' : trend === 'down' ? 'text-red-400' : 'text-[#8498b5]'

  return (
    <div
      className={`relative rounded-2xl p-5 bg-[#0a111e]/80 border ${colors.border} backdrop-blur-sm transition-all duration-300 hover:border-opacity-60 overflow-hidden`}
      style={{ boxShadow: `0 4px 24px ${colors.glow}` }}
    >
      {/* Background glow */}
      <div aria-hidden="true" className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-40 ${colors.bg}`} />
      
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[#8498b5] uppercase tracking-wider mb-2">{label}</p>
          <p className={`text-2xl font-bold font-syne tracking-tight ${colors.text}`}>{value}</p>
          {subtext && <p className="mt-1.5 text-xs text-[#8498b5]">{subtext}</p>}
          {trendValue && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trendColor}`}>
              <TrendIcon size={12} />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`shrink-0 w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
            <Icon size={18} className={colors.text} strokeWidth={1.75} />
          </div>
        )}
      </div>
    </div>
  )
}
