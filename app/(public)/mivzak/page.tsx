import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import MivzakPanel from '@/components/MivzakPanel'
import { getMivzakim } from '@/lib/supabase/queries'

export const revalidate = 30

export const metadata: Metadata = {
  title: 'Mivzakim',
  description: 'Les flashes info de la communauté francophone en Israël.',
}

export default async function MivzakPage() {
  const items = await getMivzakim(50).catch(() => [])

  return (
    <div>
      <PageHeader
        eyebrow="En continu"
        title="Mivzakim — flashes info"
        description="Toute l'actualité en bref, mise à jour en continu."
      />
      <div className="container-page max-w-3xl pb-20">
        {items.length > 0 ? (
          <MivzakPanel items={items} showAll />
        ) : (
          <div className="surface mosaic flex flex-col items-center gap-2 px-6 py-16 text-center text-marine/55">
            <span className="text-3xl">📡</span>
            Aucun flash pour le moment.
          </div>
        )}
      </div>
    </div>
  )
}
