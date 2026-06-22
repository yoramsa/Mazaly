import { createClient } from '@/lib/supabase/server'
import PageHeader from '@/components/admin/PageHeader'
import MivzakManager from '@/components/admin/MivzakManager'
import type { Mivzak } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminMivzak() {
  const supabase = createClient()
  const { data } = await supabase
    .from('mivzakim')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader title="Mivzak — flashes info" />
      <MivzakManager mivzakim={(data ?? []) as Mivzak[]} />
    </div>
  )
}
