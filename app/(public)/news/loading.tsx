import PageHeader from '@/components/PageHeader'
import { CardGridSkeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div>
      <PageHeader
        eyebrow="Actualités"
        title="Toute l'actualité"
        description="L'essentiel de l'actualité de la communauté francophone en Israël, en continu."
      />
      <div className="container-page pb-20">
        <CardGridSkeleton count={6} />
      </div>
    </div>
  )
}
