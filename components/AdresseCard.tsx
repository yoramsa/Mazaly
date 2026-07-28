import Image from 'next/image'
import Link from 'next/link'
import type { Adresse } from '@/lib/types'
import { CategoryBadge, PaysBadge } from '@/components/ui/Badge'
import { MapPinIcon } from '@/components/ui/icons'

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
            <CategoryBadge
              categorie={adresse.categories}
              fallbackColor="#C9A84C"
              className="absolute left-3 top-3"
            />
          )}
          {adresse.pays && <PaysBadge pays={adresse.pays} className="absolute right-3 top-3" />}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-serif text-base font-bold text-marine transition-colors duration-300 group-hover:text-bleu">
            {adresse.nom}
          </h3>
          {location && (
            <p className="mt-1 flex items-center gap-1.5 text-[0.8rem] text-marine/55">
              <MapPinIcon size={13} className="text-or" />
              {location}
            </p>
          )}
          {adresse.description && (
            <p className="mt-1.5 line-clamp-2 text-[0.8rem] leading-relaxed text-marine/60">
              {adresse.description}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}
