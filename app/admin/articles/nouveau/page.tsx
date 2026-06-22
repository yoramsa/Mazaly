import { createClient } from '@/lib/supabase/server'
import { requireStaff } from '@/lib/supabase/auth'
import ArticleForm from '@/components/admin/ArticleForm'
import PageHeader from '@/components/admin/PageHeader'
import type { Categorie, Tag } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function NouvelArticle() {
  const profile = await requireStaff()
  const supabase = createClient()
  const [{ data: cats }, { data: tags }] = await Promise.all([
    supabase.from('categories').select('*').in('type', ['news', 'blog']).order('nom'),
    supabase.from('tags').select('*').order('nom'),
  ])

  return (
    <div>
      <PageHeader title="Nouvel article" />
      <ArticleForm
        categories={(cats ?? []) as Categorie[]}
        tags={(tags ?? []) as Tag[]}
        authorId={profile.id}
      />
    </div>
  )
}
