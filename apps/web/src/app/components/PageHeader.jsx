export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h2 className="font-syne font-bold text-2xl md:text-3xl text-[#f0fdfa] tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-[#8498b5]">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
