import Link from 'next/link'

export default function SectionTitle({
  title,
  href,
  linkLabel = 'Tout voir',
}: {
  title: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="mb-6 flex items-end justify-between border-b-2 border-or pb-2">
      <h2 className="font-serif text-2xl font-bold text-marine md:text-3xl">{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-medium text-bleu hover:underline">
          {linkLabel} →
        </Link>
      )}
    </div>
  )
}
