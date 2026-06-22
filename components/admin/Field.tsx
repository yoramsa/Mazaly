export function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-marine">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-marine/50">{hint}</p>}
    </div>
  )
}

export const inputClass =
  'w-full rounded-md border border-marine/20 bg-white px-3 py-2 text-sm text-marine focus:border-bleu focus:outline-none'
