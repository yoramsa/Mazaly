import type { Metadata } from 'next'
import AdresseCard from '@/components/AdresseCard'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/motion/Reveal'
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
    <div>
      <PageHeader
        eyebrow="À découvrir"
        title="Bonnes adresses"
        description="Restaurants, commerces et services recommandés par la communauté francophone en Israël."
      />
      <div className="container-page pb-20">
        {adresses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adresses.map((adresse, i) => (
              <Reveal key={adresse.id} delay={i * 0.05}>
                <AdresseCard adresse={adresse} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="surface mosaic flex flex-col items-center gap-2 px-6 py-16 text-center text-marine/55">
            <span className="text-3xl">🐟</span>
            Aucune adresse publiée pour le moment.
          </div>
        )}
      </div>
    </div>
  )
}
