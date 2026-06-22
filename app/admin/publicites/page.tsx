import { createClient } from '@/lib/supabase/server'
import PageHeader from '@/components/admin/PageHeader'
import PublicitesManager from '@/components/admin/PublicitesManager'
import type { Publicite } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminPublicites() {
  const supabase = createClient()
  const { data } = await supabase
    .from('publicites')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader title="Publicités" />
      <PublicitesManager publicites={(data ?? []) as Publicite[]} />
    </div>
  )
}
