import { useMemo, useState } from 'react'
import { Activity, Briefcase, FileText, MessageSquare, TrendingUp } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PageHeader } from '../components/PageHeader.jsx'
import { StatCard } from '../components/StatCard.jsx'

const DATA = {
  '7 days': [{ day: 'Mon', chats: 8, documents: 3 }, { day: 'Tue', chats: 13, documents: 5 }, { day: 'Wed', chats: 10, documents: 2 }, { day: 'Thu', chats: 17, documents: 8 }, { day: 'Fri', chats: 14, documents: 4 }, { day: 'Sat', chats: 6, documents: 2 }, { day: 'Sun', chats: 11, documents: 5 }],
  '30 days': [{ day: 'Wk 1', chats: 42, documents: 16 }, { day: 'Wk 2', chats: 58, documents: 21 }, { day: 'Wk 3', chats: 51, documents: 18 }, { day: 'Wk 4', chats: 73, documents: 29 }],
  '90 days': [{ day: 'Aug', chats: 164, documents: 62 }, { day: 'Sep', chats: 193, documents: 76 }, { day: 'Oct', chats: 228, documents: 91 }],
}

const ChartTooltip = ({ active, payload, label }) => active && payload?.length ? <div className="rounded-xl border border-white/10 bg-[#0a111e] p-3 text-xs shadow-xl"><p className="text-white mb-2">{label} · sample</p>{payload.map((entry) => <p key={entry.dataKey} style={{ color: entry.color }} className="capitalize">{entry.dataKey}: {entry.value}</p>)}</div> : null

export function AnalyticsPage() {
  const [range, setRange] = useState('7 days')
  const data = useMemo(() => DATA[range], [range])

  return <div className="p-5 md:p-8 max-w-7xl mx-auto">
    <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#22d3ee]">Sample data · not account usage</div>
    <PageHeader title="Analytics" subtitle="A sample view of activity across a workspace." action={<label className="flex items-center gap-2 text-xs text-[#8498b5]">Date range<select aria-label="Date range" value={range} onChange={(event) => setRange(event.target.value)} className="rounded-lg border border-white/10 bg-[#0a111e] px-3 py-2 text-sm text-[#ccfbf1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"><option>7 days</option><option>30 days</option><option>90 days</option></select></label>} />
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6"><StatCard label="AI conversations" value="128" subtext="Sample · selected period" icon={MessageSquare} accent="cyan" /><StatCard label="Documents" value="47" subtext="Sample library count" icon={FileText} accent="mint" /><StatCard label="Active projects" value="6" subtext="Sample workspace count" icon={Briefcase} accent="teal" /><StatCard label="Activity trend" value="+18%" subtext="Illustrative comparison" trend="up" icon={TrendingUp} accent="cyan" /></div>
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
      <section className="xl:col-span-3 rounded-2xl border border-[rgba(45,212,191,0.12)] bg-[#0a111e]/80 p-5 md:p-6"><div className="mb-5"><h2 className="font-semibold text-[#f0fdfa]">Workspace activity</h2><p className="text-xs text-[#8498b5] mt-1">Illustrative counts for the selected period</p></div><div className="h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}><defs><linearGradient id="analyticsChats" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} /><stop offset="100%" stopColor="#22d3ee" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="rgba(45,212,191,0.08)" strokeDasharray="3 3" /><XAxis dataKey="day" tick={{ fill: '#8498b5', fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#8498b5', fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip content={<ChartTooltip />} /><Area type="monotone" dataKey="chats" stroke="#22d3ee" fill="url(#analyticsChats)" strokeWidth={2} /></AreaChart></ResponsiveContainer></div></section>
      <section className="xl:col-span-2 rounded-2xl border border-[rgba(45,212,191,0.12)] bg-[#0a111e]/80 p-5 md:p-6"><div className="mb-5"><h2 className="font-semibold text-[#f0fdfa]">AI usage</h2><p className="text-xs text-[#8498b5] mt-1">Sample requests by period</p></div><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 8, right: 0, left: -22, bottom: 0 }}><CartesianGrid stroke="rgba(45,212,191,0.08)" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="day" tick={{ fill: '#8498b5', fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: '#8498b5', fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip content={<ChartTooltip />} /><Bar dataKey="chats" fill="#10b981" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div></section>
    </div>
    <p className="mt-5 flex items-center gap-2 text-xs text-[#8498b5]"><Activity size={14} className="text-[#22d3ee]" />All charts and metrics on this page use sample values. No live analytics endpoint is connected.</p>
  </div>
}
