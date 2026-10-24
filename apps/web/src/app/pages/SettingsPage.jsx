import { useState } from 'react'
import { Bell, Check, Eye, Palette, RotateCcw, Sparkles, UserRound, Wand2 } from 'lucide-react'
import { PageHeader } from '../components/PageHeader.jsx'

function SettingToggle({ label, description, checked, onChange }) {
  return <label className="flex items-center justify-between gap-4 py-4 border-b border-white/[0.06] last:border-0 cursor-pointer"><span><span className="block text-sm text-[#ccfbf1]">{label}</span><span className="block text-xs text-[#8498b5] mt-1">{description}</span></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]" /></label>
}

function SettingsGroup({ icon: Icon, title, children, compact }) {
  return <section className={`rounded-2xl border border-[rgba(45,212,191,0.12)] bg-[#0a111e]/80 ${compact ? 'p-4' : 'p-5 md:p-6'}`}><div className="flex items-center gap-2.5 mb-2"><Icon size={16} className="text-[#22d3ee]" /><h2 className="text-sm font-semibold text-[#f0fdfa]">{title}</h2></div>{children}</section>
}

const DEFAULTS = { productUpdates: true, weeklySummary: false, compact: false, suggestions: true, startPage: 'Overview', responseStyle: 'Balanced' }

export function SettingsPage() {
  const [settings, setSettings] = useState(DEFAULTS)
  const [displayName, setDisplayName] = useState('Nexora User')
  const [saved, setSaved] = useState(false)
  const update = (key, value) => { setSettings((current) => ({ ...current, [key]: value })); setSaved(false) }

  return <div className="p-5 md:p-8 max-w-4xl mx-auto">
    <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#22d3ee]">Local preview · not synced</div>
    <PageHeader title="Settings" subtitle="Adjust workspace preferences for this browser preview." />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <SettingsGroup compact={settings.compact} icon={UserRound} title="Profile"><label htmlFor="display-name" className="block text-xs text-[#8498b5] mb-2 mt-4">Display name</label><input id="display-name" value={displayName} onChange={(event) => { setDisplayName(event.target.value); setSaved(false) }} maxLength={60} className="w-full rounded-xl border border-white/10 bg-[#05080f] px-3 py-2.5 text-sm text-[#f0fdfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]" /><p className="mt-2 text-xs text-[#8498b5]">Profile changes are kept only in the current page session.</p></SettingsGroup>
      <SettingsGroup compact={settings.compact} icon={Palette} title="Appearance"><SettingToggle label="Compact density" description="Tighten spacing in these settings panels." checked={settings.compact} onChange={(value) => update('compact', value)} /><label className="flex items-center justify-between gap-4 pt-4"><span><span className="block text-sm text-[#ccfbf1]">Color theme</span><span className="block text-xs text-[#8498b5] mt-1">Cyber Mint · default theme</span></span><span className="text-xs text-[#8498b5] border border-white/10 rounded-lg px-2.5 py-1.5">Dark</span></label></SettingsGroup>
      <SettingsGroup compact={settings.compact} icon={Bell} title="Notifications"><SettingToggle label="Product updates" description="Local preview preference; no notifications are sent." checked={settings.productUpdates} onChange={(value) => update('productUpdates', value)} /><SettingToggle label="Weekly summary" description="Local preview preference; summaries are not sent." checked={settings.weeklySummary} onChange={(value) => update('weeklySummary', value)} /></SettingsGroup>
      <SettingsGroup compact={settings.compact} icon={Eye} title="Workspace preferences"><label className="block text-xs text-[#8498b5] mb-2 mt-4" htmlFor="start-page">Default start page</label><select id="start-page" value={settings.startPage} onChange={(event) => update('startPage', event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#05080f] px-3 py-2.5 text-sm text-[#f0fdfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"><option>Overview</option><option>AI Chat</option><option>Projects</option></select><p className="mt-2 text-xs text-[#8498b5]">Selection preview only; the dashboard still opens to Overview.</p></SettingsGroup>
      <SettingsGroup compact={settings.compact} icon={Wand2} title="AI preferences"><SettingToggle label="Prompt suggestions" description="Local preference only; chat isn’t connected to this setting." checked={settings.suggestions} onChange={(value) => update('suggestions', value)} /><label className="block text-xs text-[#8498b5] mb-2 mt-4" htmlFor="response-style">Default response style</label><select id="response-style" value={settings.responseStyle} onChange={(event) => update('responseStyle', event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#05080f] px-3 py-2.5 text-sm text-[#f0fdfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"><option>Balanced</option><option>Concise</option><option>Detailed</option></select><p className="mt-2 text-xs text-[#8498b5]">Style selection is a local preview; no AI service is connected.</p></SettingsGroup>
      <div className={`rounded-2xl border border-[rgba(45,212,191,0.12)] bg-[#0a111e]/80 ${settings.compact ? 'p-4' : 'p-5 md:p-6'}`}><div className="flex items-center gap-2.5 mb-2"><Sparkles size={16} className="text-[#22d3ee]" /><h2 className="text-sm font-semibold text-[#f0fdfa]">Workspace</h2></div><p className="text-xs leading-relaxed text-[#8498b5] mt-4">This dashboard is a local UI preview. Profile, appearance, and notification choices are not sent to a server or saved between visits.</p></div>
    </div>
    <div className="flex items-center justify-end gap-3 mt-6"><button type="button" onClick={() => { setSettings(DEFAULTS); setDisplayName('Nexora User'); setSaved(false) }} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-[#8498b5] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"><RotateCcw size={14} />Reset</button><button type="button" onClick={() => setSaved(true)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#10b981] px-4 py-2.5 text-sm font-semibold text-[#041316] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]">{saved ? <Check size={15} /> : null}{saved ? 'Preview updated' : 'Apply locally'}</button></div>
  </div>
}
