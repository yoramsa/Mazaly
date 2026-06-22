import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { requireStaff } from '@/lib/supabase/auth'
import ArticleForm from '@/components/admin/ArticleForm'
import PageHeader from '@/components/admin/PageHeader'
import type { Article, Categorie, Tag } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function EditArticle({
  params,
}: {
  params: { id: string }
}) {
  const profile = await requireStaff()
  const supabase = createClient()

  const [{ data: article }, { data: cats }, { data: tags }, { data: artTags }] =
    await Promise.all([
      supabase.from('articles').select('*').eq('id', params.id).single(),
      supabase.from('categories').select('*').in('type', ['news', 'blog']).order('nom'),
      supabase.from('tags').select('*').order('nom'),
      supabase.from('articles_tags').select('tag_id').eq('article_id', params.id),
    ])

  if (!article) notFound()

  const selectedTagIds = (artTags ?? []).map((t) => t.tag_id as string)

  return (
    <div>
      <PageHeader title="Modifier l'article" />
      <ArticleForm
        article={article as Article}
        categories={(cats ?? []) as Categorie[]}
        tags={(tags ?? []) as Tag[]}
        selectedTagIds={selectedTagIds}
        authorId={article.auteur_id ?? profile.id}
      />
    </div>
  )
}
