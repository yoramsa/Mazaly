import PageHeader from '@/components/PageHeader'
import { CardGridSkeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div>
      <PageHeader
        eyebrow="À lire"
        title="Le Blog"
        description="Récits, portraits et regards sur la vie francophone en Israël."
      />
      <div className="container-page pb-20">
        <CardGridSkeleton count={6} />
      </div>
    </div>
  )
}
