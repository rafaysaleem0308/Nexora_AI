import { useState } from 'react'
import {
  FileText, FileImage, FileCode, Upload, Grid3X3, List,
  FolderOpen
} from 'lucide-react'
import { EmptyState } from '../components/EmptyState.jsx'
import { SearchField } from '../components/SearchField.jsx'
import { PageHeader } from '../components/PageHeader.jsx'

const FILE_TYPES = ['All', 'PDF', 'Image', 'Code', 'Document']

const SAMPLE_DOCS = [
  { id: 1, name: 'Q4 Product Roadmap', type: 'PDF', size: '2.4 MB', modified: '2 hours ago', status: 'indexed', pages: 12 },
  { id: 2, name: 'Market Research 2026', type: 'PDF', size: '5.1 MB', modified: 'Yesterday', status: 'indexed', pages: 34 },
  { id: 3, name: 'UI Design System', type: 'Image', size: '8.7 MB', modified: '3 days ago', status: 'indexed', pages: null },
  { id: 4, name: 'API Integration Guide', type: 'Document', size: '1.2 MB', modified: 'Last week', status: 'indexed', pages: 8 },
  { id: 5, name: 'Nexora Architecture', type: 'Code', size: '340 KB', modified: 'Last week', status: 'processing', pages: null },
  { id: 6, name: 'Team Onboarding', type: 'Document', size: '890 KB', modified: '2 weeks ago', status: 'indexed', pages: 6 },
]

const TYPE_ICONS = {
  PDF: FileText,
  Image: FileImage,
  Code: FileCode,
  Document: FileText,
}

const TYPE_COLORS = {
  PDF: 'text-[#22d3ee] bg-cyan-500/10 border-cyan-500/20',
  Image: 'text-[#10b981] bg-emerald-500/10 border-emerald-500/20',
  Code: 'text-[#6ee7b7] bg-emerald-500/10 border-emerald-500/20',
  Document: 'text-[#14b8a6] bg-teal-500/10 border-teal-500/20',
}

const STATUS_STYLES = {
  indexed: 'text-[#10b981] bg-emerald-500/10 border-emerald-500/20',
  processing: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
}

function DocumentCard({ doc, view }) {
  const Icon = TYPE_ICONS[doc.type] || FileText
  const typeStyle = TYPE_COLORS[doc.type] || TYPE_COLORS.Document
  const statusStyle = STATUS_STYLES[doc.status] || STATUS_STYLES.indexed

  if (view === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0a111e]/80 border border-[rgba(45,212,191,0.1)] hover:border-[rgba(45,212,191,0.25)] transition-all duration-200 group">
        <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border ${typeStyle}`}>
          <Icon size={16} strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#f0fdfa] truncate">{doc.name}</p>
          <p className="text-xs text-[#8498b5] mt-0.5">{doc.size} · Modified {doc.modified}</p>
        </div>
        <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wide ${statusStyle}`}>
          {doc.status}
        </span>
      </div>
    )
  }

  return (
    <div className="group flex flex-col p-4 rounded-2xl bg-[#0a111e]/80 border border-[rgba(45,212,191,0.1)] hover:border-[rgba(34,211,238,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${typeStyle}`}>
          <Icon size={18} strokeWidth={1.75} />
        </div>
      </div>
      <p className="text-sm font-medium text-[#f0fdfa] truncate mb-1">{doc.name}</p>
      <p className="text-xs text-[#8498b5] mb-3">{doc.size}{doc.pages ? ` · ${doc.pages} pages` : ''}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-[10px] text-[#8498b5]">Modified {doc.modified}</span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wide ${statusStyle}`}>
          {doc.status}
        </span>
      </div>
    </div>
  )
}

export function DocumentsPage() {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('All')
  const [view, setView] = useState('grid')
  const [uploadNotice, setUploadNotice] = useState(false)

  const filtered = SAMPLE_DOCS.filter((doc) => {
    const matchesType = activeType === 'All' || doc.type === activeType
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <div className="p-5 md:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Documents"
        subtitle="Sample data — upload and index files for AI-powered search and chat."
        action={
          <button
            type="button"
            onClick={() => setUploadNotice(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#10b981] text-[#041316] font-semibold text-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]"
          >
            <Upload size={15} />
            Upload UI preview
          </button>
        }
      />
      {uploadNotice && <div role="status" className="mb-5 rounded-xl border border-amber-300/20 bg-amber-300/5 px-4 py-3 text-xs text-amber-100">File upload is not connected yet. No files have been uploaded.</div>}

      <div className="mb-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[rgba(45,212,191,0.22)] bg-[#0a111e]/40 px-5 py-6 text-center">
        <Upload size={18} className="text-[#22d3ee] mb-2" aria-hidden="true" />
        <p className="text-sm text-[#ccfbf1]">Upload area preview</p>
        <p className="mt-1 text-xs text-[#8498b5]">Drag-and-drop and file processing are not connected yet.</p>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search documents..."
          className="sm:w-72"
        />
        <div className="flex items-center gap-2 flex-wrap">
          {FILE_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]
                ${activeType === type
                  ? 'bg-cyan-500/15 text-[#22d3ee] border border-cyan-500/25'
                  : 'text-[#8498b5] hover:text-[#ccfbf1] border border-transparent hover:border-[rgba(45,212,191,0.15)]'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-auto border border-[rgba(45,212,191,0.15)] rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setView('grid')}
            className={`p-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] ${view === 'grid' ? 'bg-cyan-500/15 text-[#22d3ee]' : 'text-[#8498b5] hover:text-white'}`}
            aria-label="Grid view"
          >
            <Grid3X3 size={15} />
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            className={`p-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] ${view === 'list' ? 'bg-cyan-500/15 text-[#22d3ee]' : 'text-[#8498b5] hover:text-white'}`}
            aria-label="List view"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Document grid/list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No documents found"
          description="Try adjusting your search or filter, or upload a new document."
        />
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} view="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} view="list" />
          ))}
        </div>
      )}
    </div>
  )
}
