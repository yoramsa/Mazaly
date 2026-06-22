import Image from 'next/image'
import Link from 'next/link'
import type { Adresse } from '@/lib/types'

export default function AdresseCard({ adresse }: { adresse: Adresse }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-marine/10 bg-white transition-shadow hover:shadow-md">
      <Link href={`/bonnes-adresses/${adresse.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-creme">
          {adresse.image ? (
            <Image
              src={adresse.image}
              alt={adresse.nom}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="mosaic h-full w-full" />
          )}
        </div>
        <div className="p-4">
          {adresse.categories && (
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: adresse.categories.couleur || '#C9A84C' }}
            >
              {adresse.categories.nom}
            </span>
          )}
          <h3 className="mt-1 font-serif text-lg font-bold text-marine group-hover:text-bleu">
            {adresse.nom}
          </h3>
          <p className="mt-1 text-sm text-marine/60">
            {[adresse.ville, adresse.region].filter(Boolean).join(', ')}
          </p>
          {adresse.description && (
            <p className="mt-2 line-clamp-2 text-sm text-marine/70">{adresse.description}</p>
          )}
        </div>
      </Link>
    </article>
  )
}
