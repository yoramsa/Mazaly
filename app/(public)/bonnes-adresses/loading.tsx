import PageHeader from '@/components/PageHeader'
import { CardGridSkeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div>
      <PageHeader
        eyebrow="À découvrir"
        title="Bonnes adresses"
        description="Restaurants, commerces et services recommandés par la communauté francophone — en Israël comme en France. Filtrez par pays."
      />
      <div className="container-page pb-20">
        <CardGridSkeleton count={6} />
      </div>
    </div>
  )
}
