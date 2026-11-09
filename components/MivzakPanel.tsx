import Link from 'next/link'
import type { Mivzak } from '@/lib/types'
import { formatTime } from '@/lib/utils/format'

export default function MivzakPanel({
  items,
  showAll = false,
}: {
  items: Mivzak[]
  showAll?: boolean
}) {
  if (items.length === 0) return null

  return (
    <div className="overflow-hidden rounded-3xl border border-marine/[0.07] bg-surface shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between bg-brand-gradient px-5 py-3.5 text-white">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider">En direct</span>
          <span className="font-serif text-lg font-bold leading-none">Mivzakim</span>
          <span className="font-serif text-base leading-none text-white/80" dir="rtl">
            מבזקים
          </span>
        </div>
        {!showAll && (
          <Link
            href="/mivzak"
            className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur transition-colors hover:bg-white/25"
          >
            Tout voir →
          </Link>
        )}
      </div>

      {/* Liste */}
      <ul className="divide-y divide-marine/[0.07]">
        {items.map((m) => {
          const inner = (
            <div
              className={`flex items-start gap-3 border-l-2 px-5 py-3.5 transition-colors ${
                m.urgent ? 'border-rouge/70 bg-rouge/[0.04]' : 'border-transparent'
              }`}
            >
              <span className="shrink-0 pt-0.5 font-mono text-xs font-semibold tabular-nums text-bleu">
                {formatTime(m.created_at)}
              </span>
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                  m.urgent ? 'animate-pulse-ring-rouge bg-rouge' : 'bg-mauve/60'
                }`}
              />
              <span className="min-w-0 flex-1 text-sm leading-snug text-marine">
                {m.urgent && (
                  <span className="mr-1.5 inline-flex items-center rounded bg-rouge px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white">
                    Urgent
                  </span>
                )}
                {m.texte}
              </span>
            </div>
          )
          return (
            <li key={m.id} className="group">
              {m.lien ? (
                <Link href={m.lien} className="block hover:bg-brand-gradient-soft">
                  {inner}
                  <span className="block px-5 pb-3 pl-[4.25rem] text-xs font-semibold text-bleu opacity-0 transition-opacity group-hover:opacity-100">
                    Lire »
                  </span>
                </Link>
              ) : (
                inner
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
