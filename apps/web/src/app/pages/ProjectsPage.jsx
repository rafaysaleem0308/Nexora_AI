import { useMemo, useState } from 'react'
import { Briefcase, CalendarDays, Check, Circle, Flag, Plus, Search, X } from 'lucide-react'
import { PageHeader } from '../components/PageHeader.jsx'
import { EmptyState } from '../components/EmptyState.jsx'

const SAMPLE_PROJECTS = [
  { id: 'p1', name: 'Nexora Dashboard', description: 'Build the next generation workspace experience.', status: 'In progress', due: 'Oct 31, 2026', priority: 'High', tasks: [{ id: 't1', title: 'Define navigation structure', done: true }, { id: 't2', title: 'Complete dashboard overview', done: true }, { id: 't3', title: 'Polish mobile layouts', done: false }] },
  { id: 'p2', name: 'AI Content Pipeline', description: 'Create a repeatable flow for drafting and reviewing content.', status: 'In progress', due: 'Nov 8, 2026', priority: 'Medium', tasks: [{ id: 't4', title: 'Map editorial workflow', done: true }, { id: 't5', title: 'Review prompt templates', done: false }] },
  { id: 'p3', name: 'API Documentation', description: 'Prepare clear integration guides for the API preview.', status: 'Planning', due: 'Nov 14, 2026', priority: 'Low', tasks: [{ id: 't6', title: 'Gather endpoint examples', done: false }, { id: 't7', title: 'Draft quick start', done: false }] },
]

function ProjectCard({ project, onToggleTask }) {
  const completed = project.tasks.filter((task) => task.done).length
  const progress = project.tasks.length ? Math.round((completed / project.tasks.length) * 100) : 0
  const priorityStyle = { High: 'text-rose-300 bg-rose-400/10 border-rose-300/20', Medium: 'text-amber-200 bg-amber-400/10 border-amber-300/20', Low: 'text-[#8498b5] bg-white/[0.04] border-white/10' }

  return (
    <article className="rounded-2xl bg-[#0a111e]/80 border border-[rgba(45,212,191,0.12)] p-5 flex flex-col min-w-0">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#22d3ee] shrink-0"><Briefcase size={18} /></div>
        <div className="min-w-0 flex-1"><h3 className="font-semibold text-[#f0fdfa] truncate">{project.name}</h3><p className="text-xs text-[#8498b5] mt-1">{project.description}</p></div>
      </div>
      <div className="flex items-center gap-2 flex-wrap mt-5">
        <span className="text-[10px] px-2 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-[#22d3ee]">{project.status}</span>
        <span className={`text-[10px] px-2 py-1 rounded-full border ${priorityStyle[project.priority]}`}><Flag size={10} className="inline mr-1" />{project.priority} priority</span>
        <span className="text-[10px] text-[#8498b5] ml-auto flex items-center gap-1"><CalendarDays size={11} />{project.due}</span>
      </div>
      <div className="mt-5">
        <div className="flex justify-between text-xs mb-2"><span className="text-[#8498b5]">Progress</span><span className="text-[#ccfbf1]">{progress}%</span></div>
        <div className="h-1.5 rounded-full bg-[#05080f] overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[#22d3ee] to-[#10b981] transition-all" style={{ width: `${progress}%` }} /></div>
      </div>
      <div className="mt-5 pt-4 border-t border-white/[0.06]">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8498b5] mb-2">Tasks ({completed}/{project.tasks.length})</p>
        <ul className="space-y-1">
          {project.tasks.map((task) => (
            <li key={task.id}>
              <button type="button" onClick={() => onToggleTask(project.id, task.id)} className="w-full flex items-center gap-2 py-1.5 text-left text-xs text-[#ccfbf1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] rounded">
                {task.done ? <Check size={14} className="text-[#10b981] shrink-0" /> : <Circle size={14} className="text-[#8498b5] shrink-0" />}
                <span className={task.done ? 'line-through text-[#8498b5]' : ''}>{task.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function ProjectsPage() {
  const [projects, setProjects] = useState(SAMPLE_PROJECTS)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const filtered = useMemo(() => projects.filter((project) => {
    const matchesQuery = `${project.name} ${project.description}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (status === 'All' || project.status === status)
  }), [projects, query, status])

  const toggleTask = (projectId, taskId) => setProjects((current) => current.map((project) => project.id === projectId
    ? { ...project, tasks: project.tasks.map((task) => task.id === taskId ? { ...task, done: !task.done } : task) }
    : project))

  const createProject = (event) => {
    event.preventDefault()
    if (!name.trim()) return
    setProjects((current) => [{ id: `local-${Date.now()}`, name: name.trim(), description: description.trim() || 'New project added in this preview.', status: 'Planning', due: 'No date set', priority: 'Medium', tasks: [] }, ...current])
    setName('')
    setDescription('')
    setModalOpen(false)
  }

  return (
    <div className="p-5 md:p-8 max-w-7xl mx-auto">
      <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#22d3ee]">Sample projects · changes stay in this tab</div>
      <PageHeader title="Projects" subtitle="Keep priorities, tasks, and progress in one clear workspace." action={<button type="button" onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#10b981] px-4 py-2 text-sm font-semibold text-[#041316] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"><Plus size={16} />New project</button>} />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <label className="relative flex-1 sm:max-w-sm"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8498b5]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects..." aria-label="Search projects" className="w-full rounded-xl border border-[rgba(45,212,191,0.15)] bg-[#0a111e]/80 pl-9 pr-3 py-2.5 text-sm text-[#f0fdfa] placeholder-[#8498b5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]" /></label>
        <label className="sr-only" htmlFor="project-status">Filter projects by status</label><select id="project-status" value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-[rgba(45,212,191,0.15)] bg-[#0a111e] px-3 py-2.5 text-sm text-[#ccfbf1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"><option>All</option><option>In progress</option><option>Planning</option></select>
      </div>

      {filtered.length ? <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">{filtered.map((project) => <ProjectCard key={project.id} project={project} onToggleTask={toggleTask} />)}</div> : <EmptyState icon={Briefcase} title="No projects found" description="Try another search or create a project to get started." action={<button type="button" onClick={() => setModalOpen(true)} className="rounded-xl border border-cyan-400/25 px-4 py-2 text-sm text-[#22d3ee] hover:bg-cyan-400/10">Create project</button>} />}

      {modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false) }}>
        <form role="dialog" aria-modal="true" aria-labelledby="new-project-title" onSubmit={createProject} className="w-full max-w-md rounded-2xl border border-[rgba(45,212,191,0.2)] bg-[#0a111e] p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-5"><h2 id="new-project-title" className="text-lg font-semibold text-[#f0fdfa]">Create project</h2><button type="button" onClick={() => setModalOpen(false)} aria-label="Close dialog" className="rounded-lg p-1.5 text-[#8498b5] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"><X size={18} /></button></div>
          <p className="text-xs text-[#8498b5] mb-4">Preview only. This project will not be saved after you leave or refresh.</p>
          <label className="block text-xs text-[#ccfbf1] mb-1.5" htmlFor="project-name">Project name</label><input id="project-name" autoFocus required maxLength={80} value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#05080f] px-3 py-2.5 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]" />
          <label className="block text-xs text-[#ccfbf1] mt-4 mb-1.5" htmlFor="project-description">Description</label><textarea id="project-description" rows={3} maxLength={240} value={description} onChange={(event) => setDescription(event.target.value)} className="w-full resize-y rounded-xl border border-white/10 bg-[#05080f] px-3 py-2.5 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]" />
          <div className="flex justify-end gap-2 mt-6"><button type="button" onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2 text-sm text-[#8498b5] hover:text-white">Cancel</button><button type="submit" className="rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#10b981] px-4 py-2 text-sm font-semibold text-[#041316]">Add project</button></div>
        </form>
      </div>}
    </div>
  )
}
