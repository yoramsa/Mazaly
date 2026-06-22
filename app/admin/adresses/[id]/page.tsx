import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdresseForm from '@/components/admin/AdresseForm'
import PageHeader from '@/components/admin/PageHeader'
import type { Adresse, Categorie } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function EditAdresse({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient()
  const [{ data: adresse }, { data: cats }] = await Promise.all([
    supabase.from('adresses').select('*').eq('id', params.id).single(),
    supabase.from('categories').select('*').eq('type', 'adresse').order('nom'),
  ])

  if (!adresse) notFound()

  return (
    <div>
      <PageHeader title="Modifier l'adresse" />
      <AdresseForm adresse={adresse as Adresse} categories={(cats ?? []) as Categorie[]} />
    </div>
  )
}
