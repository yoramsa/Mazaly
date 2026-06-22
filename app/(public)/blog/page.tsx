import type { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import SectionTitle from '@/components/SectionTitle'
import { getArticlesByType } from '@/lib/supabase/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Récits, portraits et regards sur la vie francophone en Israël.',
}

export default async function BlogPage() {
  const articles = await getArticlesByType('blog').catch(() => [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <SectionTitle title="Le Blog" />
      {articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} basePath="/blog" />
          ))}
        </div>
      ) : (
        <p className="text-marine/60">Aucun article publié pour le moment.</p>
      )}
    </div>
  )
}
