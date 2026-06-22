import type { Metadata } from 'next'
import AdressesExplorer from '@/components/AdressesExplorer'
import PageHeader from '@/components/PageHeader'
import { getAdresses } from '@/lib/supabase/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Bonnes adresses',
  description:
    'Les meilleures adresses de la communauté francophone en Israël et en France : restaurants, commerces et services.',
}

export default async function AdressesPage() {
  const adresses = await getAdresses().catch(() => [])

  return (
    <div>
      <PageHeader
        eyebrow="À découvrir"
        title="Bonnes adresses"
        description="Restaurants, commerces et services recommandés par la communauté francophone — en Israël comme en France. Filtrez par pays."
      />
      <div className="container-page pb-20">
        <AdressesExplorer adresses={adresses} />
      </div>
    </div>
  )
}
