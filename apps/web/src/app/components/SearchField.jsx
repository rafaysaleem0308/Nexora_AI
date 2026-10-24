import { Search, X } from 'lucide-react'

export function SearchField({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search size={15} className="absolute left-3 text-[#8498b5] pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2 bg-[#0a111e] border border-[rgba(45,212,191,0.15)] rounded-xl text-sm text-[#f0fdfa] placeholder-[#8498b5] focus-visible:outline-none focus-visible:border-[rgba(34,211,238,0.4)] focus-visible:ring-1 focus-visible:ring-[rgba(34,211,238,0.2)] transition-colors"
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 text-[#8498b5] hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}
