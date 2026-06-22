import Link from 'next/link'
import type { Mivzak } from '@/lib/types'

export default function MivzakTicker({ items }: { items: Mivzak[] }) {
  if (items.length === 0) return null

  // Duplicate the list so the marquee loops seamlessly
  const track = [...items, ...items]

  return (
    <div className="relative z-50 flex items-stretch overflow-hidden bg-ink text-creme">
      {/* Label */}
      <div className="relative z-10 flex shrink-0 items-center gap-2 bg-brand-gradient px-4 py-2 shadow-glow">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="text-xs font-bold uppercase tracking-wider">
          Mivzak<span className="ml-1 font-serif" dir="rtl">מבזק</span>
        </span>
      </div>

      {/* Scrolling track */}
      <div className="marquee-host relative flex-1 overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap py-2 pl-6">
          {track.map((m, i) => {
            const content = (
              <span className="inline-flex items-center gap-2 text-sm">
                <span className="text-or">{m.urgent ? '🔴' : '•'}</span>
                <span className={m.urgent ? 'font-semibold' : ''}>{m.texte}</span>
              </span>
            )
            return m.lien ? (
              <Link
                key={i}
                href={m.lien}
                className="transition-colors hover:text-or"
              >
                {content}
              </Link>
            ) : (
              <span key={i}>{content}</span>
            )
          })}
        </div>
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ink to-transparent" />
      </div>
    </div>
  )
}
