import type { Metadata } from 'next'
import AdresseCard from '@/components/AdresseCard'
import SectionTitle from '@/components/SectionTitle'
import { getAdresses } from '@/lib/supabase/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Bonnes adresses',
  description:
    'Les meilleures adresses de la communauté francophone en Israël : restaurants, commerces et services.',
}

export default async function AdressesPage() {
  const adresses = await getAdresses().catch(() => [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <SectionTitle title="Bonnes adresses" />
      {adresses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adresses.map((adresse) => (
            <AdresseCard key={adresse.id} adresse={adresse} />
          ))}
        </div>
      ) : (
        <p className="text-marine/60">Aucune adresse publiée pour le moment.</p>
      )}
    </div>
  )
}
