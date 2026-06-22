import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/supabase/auth'
import PageHeader from '@/components/admin/PageHeader'
import UsersManager from '@/components/admin/UsersManager'
import type { Profile } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminUtilisateurs() {
  await requireAdmin()
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader title="Utilisateurs" />
      <p className="mb-4 text-sm text-marine/60">
        Les comptes sont créés manuellement dans Supabase. Gérez ici les rôles.
      </p>
      <UsersManager profiles={(data ?? []) as Profile[]} />
    </div>
  )
}
