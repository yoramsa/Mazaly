import { createClient } from '@/lib/supabase/server'
import PageHeader from '@/components/admin/PageHeader'
import CategoriesManager from '@/components/admin/CategoriesManager'
import type { Categorie } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminCategories() {
  const supabase = createClient()
  const { data } = await supabase.from('categories').select('*').order('type').order('nom')

  return (
    <div>
      <PageHeader title="Catégories" />
      <CategoriesManager categories={(data ?? []) as Categorie[]} />
    </div>
  )
}
