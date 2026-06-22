import Link from 'next/link'

export default function PageHeader({
  title,
  actionHref,
  actionLabel,
}: {
  title: string
  actionHref?: string
  actionLabel?: string
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="font-serif text-2xl font-bold text-marine md:text-3xl">{title}</h1>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="rounded-md bg-marine px-4 py-2 text-sm font-semibold text-creme hover:bg-bleu"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
