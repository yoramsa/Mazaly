import { createClient } from '@/lib/supabase/server'
import PageHeader from '@/components/admin/PageHeader'
import TagsManager from '@/components/admin/TagsManager'
import type { Tag } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminTags() {
  const supabase = createClient()
  const { data } = await supabase.from('tags').select('*').order('nom')

  return (
    <div>
      <PageHeader title="Tags" />
      <TagsManager tags={(data ?? []) as Tag[]} />
    </div>
  )
}
