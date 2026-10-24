import { Link } from 'react-router-dom'
import {
  MessageSquare, Wand2, FolderPlus, Zap, FileText,
  Briefcase, Clock, ArrowRight
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { StatCard } from '../components/StatCard.jsx'

// ── Sample data (clearly labeled) ──────────────────────────────────────────
const ACTIVITY_DATA = [
  { day: 'Mon', chats: 4, docs: 2, tasks: 3 },
  { day: 'Tue', chats: 7, docs: 5, tasks: 6 },
  { day: 'Wed', chats: 5, docs: 3, tasks: 4 },
  { day: 'Thu', chats: 9, docs: 7, tasks: 8 },
  { day: 'Fri', chats: 12, docs: 6, tasks: 10 },
  { day: 'Sat', chats: 3, docs: 1, tasks: 2 },
  { day: 'Sun', chats: 6, docs: 4, tasks: 5 },
]

const RECENT_ACTIVITY = [
  { id: 1, type: 'chat', label: 'AI Chat session', detail: 'Discussed Q4 product roadmap', time: '2 min ago', icon: MessageSquare, color: 'text-[#22d3ee]' },
  { id: 2, type: 'doc', label: 'Document uploaded', detail: 'market-research-2026.pdf', time: '18 min ago', icon: FileText, color: 'text-[#10b981]' },
  { id: 3, type: 'studio', label: 'Content generated', detail: 'Blog outline: "The Future of AI"', time: '1 hr ago', icon: Wand2, color: 'text-[#14b8a6]' },
  { id: 4, type: 'project', label: 'Task completed', detail: 'Nexora Dashboard — Phase 3', time: '3 hr ago', icon: Briefcase, color: 'text-[#6ee7b7]' },
]

const RECENT_PROJECTS = [
  { id: 1, title: 'Nexora Dashboard', status: 'active', progress: 72, tasks: 14, color: '#22d3ee' },
  { id: 2, title: 'AI Content Pipeline', status: 'active', progress: 45, tasks: 8, color: '#10b981' },
  { id: 3, title: 'API Documentation', status: 'review', progress: 90, tasks: 5, color: '#14b8a6' },
]

const QUICK_ACTIONS = [
  { label: 'Start AI Conversation', description: 'Chat with your AI assistant', icon: MessageSquare, to: '/app/chat', accent: 'cyan' },
  { label: 'Create Content', description: 'Generate blog posts, emails & more', icon: Wand2, to: '/app/studio', accent: 'mint' },
  { label: 'Add Document', description: 'Upload and index files', icon: FolderPlus, to: '/app/documents', accent: 'teal' },
]

const accentStyles = {
  cyan: 'from-cyan-500/15 to-transparent border-cyan-500/25 hover:border-cyan-400/45 text-[#22d3ee]',
  mint: 'from-emerald-500/15 to-transparent border-emerald-500/25 hover:border-emerald-400/45 text-[#10b981]',
  teal: 'from-teal-500/15 to-transparent border-teal-500/25 hover:border-teal-400/45 text-[#14b8a6]',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0d1829] border border-[rgba(45,212,191,0.2)] rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-[#ccfbf1] mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-[#8498b5] capitalize">{p.dataKey}:</span>
          <span className="text-[#f0fdfa] font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function DashboardPage() {
  return (
    <div className="p-5 md:p-8 max-w-7xl mx-auto">
      {/* Welcome header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#22d3ee] mb-2">
          <Zap size={12} />
          <span>Sample Data — Demo Workspace</span>
        </div>
        <h2 className="font-syne font-bold text-3xl md:text-4xl text-[#f0fdfa] mb-2 tracking-tight">
          Welcome to your workspace
        </h2>
        <p className="text-[#8498b5] text-base">
          Your ideas, projects, and AI-powered workflows in one place.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="AI Conversations" value="128" subtext="This month" trend="up" trendValue="+24% vs last month" icon={MessageSquare} accent="cyan" />
        <StatCard label="Documents" value="47" subtext="3 recently added" trend="up" trendValue="+8 this week" icon={FileText} accent="mint" />
        <StatCard label="Active Projects" value="6" subtext="2 due this week" icon={Briefcase} accent="teal" />
        <StatCard label="Content Created" value="34" subtext="Pieces generated" trend="up" trendValue="+12 this week" icon={Wand2} accent="cyan" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon
          const styles = accentStyles[action.accent]
          const textColor = styles.match(/text-\[([^\]]+)\]/)?.[0] ?? 'text-[#22d3ee]'
          return (
            <Link
              key={action.label}
              to={action.to}
              className={`group relative flex flex-col gap-3 p-5 rounded-2xl bg-gradient-to-br ${styles} border bg-[#0a111e]/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-[#080d18] border border-current/20 transition-all duration-300 ${textColor}`}>
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#f0fdfa] mb-0.5">{action.label}</p>
                <p className="text-xs text-[#8498b5]">{action.description}</p>
              </div>
              <ArrowRight size={14} className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-60 transition-opacity text-[#8498b5]" />
            </Link>
          )
        })}
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity chart */}
        <div className="lg:col-span-2 rounded-2xl bg-[#0a111e]/80 border border-[rgba(45,212,191,0.12)] p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-[#f0fdfa] text-base">Activity Overview</h3>
              <p className="text-xs text-[#8498b5] mt-0.5">Last 7 days — sample data</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#8498b5]">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#22d3ee]" />Chats</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#10b981]" />Docs</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#14b8a6]" />Tasks</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={ACTIVITY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorChats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,212,191,0.07)" />
              <XAxis dataKey="day" tick={{ fill: '#8498b5', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8498b5', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="chats" stroke="#22d3ee" strokeWidth={2} fill="url(#colorChats)" />
              <Area type="monotone" dataKey="docs" stroke="#10b981" strokeWidth={2} fill="url(#colorDocs)" />
              <Area type="monotone" dataKey="tasks" stroke="#14b8a6" strokeWidth={2} fill="url(#colorTasks)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent activity */}
        <div className="rounded-2xl bg-[#0a111e]/80 border border-[rgba(45,212,191,0.12)] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#f0fdfa] text-base">Recent Activity</h3>
            <Clock size={15} className="text-[#8498b5]" />
          </div>
          <ul className="flex flex-col gap-3">
            {RECENT_ACTIVITY.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id} className="flex items-start gap-3 group">
                  <div className={`shrink-0 w-8 h-8 rounded-xl bg-[#080d18] border border-[rgba(45,212,191,0.12)] flex items-center justify-center ${item.color} mt-0.5 group-hover:border-opacity-40 transition-colors`}>
                    <Icon size={14} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#ccfbf1] truncate">{item.label}</p>
                    <p className="text-xs text-[#8498b5] truncate">{item.detail}</p>
                    <p className="text-[10px] text-[#8498b5]/60 mt-0.5">{item.time}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Recent projects */}
      <div className="rounded-2xl bg-[#0a111e]/80 border border-[rgba(45,212,191,0.12)] p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-[#f0fdfa] text-base">Recent Projects</h3>
          <Link to="/app/projects" className="text-xs text-[#22d3ee] hover:text-[#6ee7b7] transition-colors flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {RECENT_PROJECTS.map((project) => (
            <div key={project.id} className="p-4 rounded-xl bg-[#080d18]/60 border border-[rgba(45,212,191,0.1)] hover:border-[rgba(45,212,191,0.25)] transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-[#f0fdfa] truncate">{project.title}</h4>
                <span
                  className="shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                  style={{ color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}30` }}
                >
                  {project.status}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#8498b5]">{project.tasks} tasks</span>
                <span className="text-xs font-medium" style={{ color: project.color }}>{project.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#0a111e] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%`, background: `linear-gradient(90deg, ${project.color}, ${project.color}aa)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
