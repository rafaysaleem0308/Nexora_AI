export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
          <Icon size={28} className="text-[#22d3ee]" strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#f0fdfa] mb-2">{title}</h3>
      {description && <p className="text-sm text-[#8498b5] max-w-sm mb-6">{description}</p>}
      {action && action}
    </div>
  )
}
