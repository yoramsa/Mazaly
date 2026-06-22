import Link from 'next/link'

export default function SectionTitle({
  title,
  href,
  linkLabel = 'Tout voir',
  eyebrow,
}: {
  title: string
  href?: string
  linkLabel?: string
  eyebrow?: string
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-bleu">
            {eyebrow}
          </span>
        )}
        <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-marine md:text-[2rem]">
          <span className="h-7 w-1.5 rounded-full bg-brand-gradient" />
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1 rounded-full border border-marine/10 bg-white/70 px-4 py-1.5 text-sm font-medium text-marine backdrop-blur transition-all duration-300 hover:border-bleu/30 hover:text-bleu"
        >
          {linkLabel}
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </Link>
      )}
    </div>
  )
}
