import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleView from '@/components/ArticleView'
import { getArticleBySlug } from '@/lib/supabase/queries'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug).catch(() => null)
  if (!article) return { title: 'Article introuvable' }
  return {
    title: article.titre,
    description: article.extrait || undefined,
    openGraph: {
      title: article.titre,
      description: article.extrait || undefined,
      images: article.image_cover ? [article.image_cover] : undefined,
      type: 'article',
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = await getArticleBySlug(params.slug).catch(() => null)
  if (!article) notFound()
  return <ArticleView article={article} />
}
