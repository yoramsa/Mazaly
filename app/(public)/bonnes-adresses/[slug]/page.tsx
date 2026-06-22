import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAdresseBySlug } from '@/lib/supabase/queries'

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
    <div className="flex flex-col border-b border-marine/10 py-2">
      <span className="text-xs uppercase tracking-wide text-marine/50">{label}</span>
      <span className="text-sm text-marine">{value}</span>
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {adresse.categories && (
        <span
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: adresse.categories.couleur || '#C9A84C' }}
        >
          {adresse.categories.nom}
        </span>
      )}
      <h1 className="mt-2 font-serif text-3xl font-bold text-marine md:text-4xl">
        {adresse.nom}
      </h1>
      <p className="mt-1 text-marine/60">
        {[adresse.ville, adresse.region].filter(Boolean).join(', ')}
      </p>

      {adresse.image && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl">
          <Image src={adresse.image} alt={adresse.nom} fill priority className="object-cover" />
        </div>
      )}

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          {adresse.description && (
            <p className="whitespace-pre-line leading-relaxed text-marine/80">
              {adresse.description}
            </p>
          )}

          {galerie.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {galerie.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image src={src} alt={`${adresse.nom} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="rounded-xl border border-or bg-white p-5">
          <h2 className="font-serif text-lg font-bold text-marine">Informations</h2>
          <div className="mt-3">
            {adresse.adresse && <InfoRow label="Adresse" value={adresse.adresse} />}
            {adresse.telephone && <InfoRow label="Téléphone" value={adresse.telephone} />}
            {adresse.horaires && <InfoRow label="Horaires" value={adresse.horaires} />}
            {adresse.prix_moyen && <InfoRow label="Prix moyen" value={adresse.prix_moyen} />}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {adresse.site_web && (
              <a
                href={adresse.site_web}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-bleu px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
              >
                Site web
              </a>
            )}
            {adresse.instagram && (
              <a
                href={adresse.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-mauve px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
              >
                Instagram
              </a>
            )}
            {adresse.email && (
              <a
                href={`mailto:${adresse.email}`}
                className="rounded-md border border-marine/20 px-3 py-2 text-xs font-semibold text-marine hover:bg-creme"
              >
                Email
              </a>
            )}
          </div>
        </aside>
      </div>

      <div className="mt-10">
        <Link href="/bonnes-adresses" className="text-sm font-medium text-bleu hover:underline">
          ← Retour aux bonnes adresses
        </Link>
      </div>
    </div>
  )
}
