import type { Categorie } from '@/lib/types'
import { paysFlag } from '@/lib/utils/pays'

/**
 * Pastille catégorie colorée (couleur définie en base, avec repli par défaut).
 * Le positionnement (absolute sur une image, inline dans un header…)
 * est laissé au parent via `className`.
 */
export function CategoryBadge({
  categorie,
  fallbackColor = '#4A6FD4',
  className = '',
}: {
  categorie: Categorie
  fallbackColor?: string
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-white/85 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide shadow-soft backdrop-blur ${className}`}
      style={{ color: categorie.couleur || fallbackColor }}
    >
      {categorie.nom}
    </span>
  )
}

/** Pastille pays avec drapeau (🇫🇷 / 🇮🇱 …). */
export function PaysBadge({
  pays,
  className = '',
}: {
  pays: string
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[0.7rem] font-semibold text-marine shadow-soft backdrop-blur ${className}`}
    >
      <span className="text-sm leading-none">{paysFlag(pays)}</span>
      {pays}
    </span>
  )
}
