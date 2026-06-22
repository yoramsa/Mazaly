import Image from 'next/image'
import Link from 'next/link'
import type { Adresse } from '@/lib/types'
import { paysFlag } from '@/lib/utils/pays'

export default function AdresseCard({ adresse }: { adresse: Adresse }) {
  const location = [adresse.ville, adresse.region].filter(Boolean).join(', ')

  return (
    <article className="group relative h-full overflow-hidden rounded-3xl border border-marine/[0.07] bg-white shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift">
      <Link href={`/bonnes-adresses/${adresse.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          {adresse.image ? (
            <Image
              src={adresse.image}
              alt={adresse.nom}
              fill
              className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.07]"
            />
          ) : (
            <div className="mosaic h-full w-full" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-marine/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {adresse.categories && (
            <span
              className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide shadow-soft backdrop-blur"
              style={{ color: adresse.categories.couleur || '#C9A84C' }}
            >
              {adresse.categories.nom}
            </span>
          )}
          {adresse.pays && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[0.7rem] font-semibold text-marine shadow-soft backdrop-blur">
              <span className="text-sm leading-none">{paysFlag(adresse.pays)}</span>
              {adresse.pays}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-lg font-bold text-marine transition-colors duration-300 group-hover:text-bleu">
            {adresse.nom}
          </h3>
          {location && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-marine/55">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-or">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {location}
            </p>
          )}
          {adresse.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-marine/65">
              {adresse.description}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}
