import { createClient } from '@/lib/supabase/server'
import AdresseForm from '@/components/admin/AdresseForm'
import PageHeader from '@/components/admin/PageHeader'
import type { Categorie } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function NouvelleAdresse() {
  const supabase = createClient()
  const { data: cats } = await supabase
    .from('categories')
    .select('*')
    .eq('type', 'adresse')
    .order('nom')

  return (
    <div>
      <PageHeader title="Nouvelle adresse" />
      <AdresseForm categories={(cats ?? []) as Categorie[]} />
    </div>
  )
}
