export default function EmptyState({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={`surface mosaic flex flex-col items-center justify-center gap-2 px-6 py-14 text-center ${className}`}
    >
      <span className="text-3xl">🐟</span>
      <p className="text-marine/55">{label}</p>
    </div>
  )
}
