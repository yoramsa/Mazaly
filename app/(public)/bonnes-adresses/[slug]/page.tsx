import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAdresseBySlug } from '@/lib/supabase/queries'
import { CategoryBadge, PaysBadge } from '@/components/ui/Badge'
import { MapPinIcon } from '@/components/ui/icons'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const adresse = await getAdresseBySlug(params.slug).catch(() => null)
  if (!adresse) return { title: 'Adresse introuvable' }
  return {
    title: adresse.nom,
    description: adresse.description || undefined,
    openGraph: {
      title: adresse.nom,
      description: adresse.description || undefined,
      images: adresse.image ? [adresse.image] : undefined,
    },
  }
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-marine/10 py-3 last:border-0">
      <span className="text-xs uppercase tracking-wide text-marine/45">{label}</span>
      <span className="text-sm font-medium text-marine">{value}</span>
    </div>
  )
}

export default async function AdressePage({
  params,
}: {
  params: { slug: string }
}) {
  const adresse = await getAdresseBySlug(params.slug).catch(() => null)
  if (!adresse) notFound()

  const galerie = adresse.images?.filter(Boolean) ?? []
  const location = [adresse.ville, adresse.region].filter(Boolean).join(', ')
  const mapsQuery = encodeURIComponent(
    [adresse.nom, adresse.ville, adresse.pays].filter(Boolean).join(', '),
  )
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
  const hasContact = Boolean(
    adresse.adresse ||
      adresse.telephone ||
      adresse.horaires ||
      adresse.prix_moyen ||
      adresse.site_web ||
      adresse.instagram ||
      adresse.email,
  )

  return (
    <div className="container-page max-w-5xl py-12">
      <Link
        href="/bonnes-adresses"
        className="inline-flex items-center gap-1 text-sm font-medium text-marine/60 transition-colors hover:text-bleu"
      >
        ← Bonnes adresses
      </Link>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {adresse.categories && (
          <CategoryBadge categorie={adresse.categories} fallbackColor="#C9A84C" />
        )}
        {adresse.pays && <PaysBadge pays={adresse.pays} />}
      </div>

      <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-marine md:text-5xl">
        {adresse.nom}
      </h1>
      {location && (
        <p className="mt-2 flex items-center gap-1.5 text-marine/60">
          <MapPinIcon size={16} className="text-or" />
          {location}
        </p>
      )}

      {adresse.image && (
        <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-3xl shadow-card">
          <Image src={adresse.image} alt={adresse.nom} fill priority className="object-cover" />
        </div>
      )}

      <div className="mt-9 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          {adresse.description && (
            <p className="whitespace-pre-line text-lg leading-relaxed text-marine/80">
              {adresse.description}
            </p>
          )}

          {galerie.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {galerie.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-2xl shadow-soft">
                  <Image src={src} alt={`${adresse.nom} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="surface h-fit p-6">
          <h2 className="font-serif text-lg font-bold text-marine">Informations</h2>

          <div className="mt-2">
            {adresse.ville && <InfoRow label="Ville" value={adresse.ville} />}
            {adresse.region && <InfoRow label="Région" value={adresse.region} />}
            {adresse.pays && <InfoRow label="Pays" value={adresse.pays} />}
            {adresse.adresse && <InfoRow label="Adresse" value={adresse.adresse} />}
            {adresse.telephone && <InfoRow label="Téléphone" value={adresse.telephone} />}
            {adresse.horaires && <InfoRow label="Horaires" value={adresse.horaires} />}
            {adresse.prix_moyen && <InfoRow label="Prix moyen" value={adresse.prix_moyen} />}
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5 w-full"
          >
            <MapPinIcon size={16} />
            Voir sur Google Maps
          </a>

          {(adresse.site_web || adresse.instagram || adresse.email) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {adresse.site_web && (
                <a
                  href={adresse.site_web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-bleu px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Site web
                </a>
              )}
              {adresse.instagram && (
                <a
                  href={adresse.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-mauve px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Instagram
                </a>
              )}
              {adresse.email && (
                <a
                  href={`mailto:${adresse.email}`}
                  className="rounded-full border border-marine/15 px-4 py-2 text-xs font-semibold text-marine transition-colors hover:bg-creme"
                >
                  Email
                </a>
              )}
            </div>
          )}

          {!hasContact && (
            <p className="mt-4 text-xs leading-relaxed text-marine/50">
              Coordonnées détaillées à venir. Utilisez Google Maps pour localiser ce lieu.
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}
