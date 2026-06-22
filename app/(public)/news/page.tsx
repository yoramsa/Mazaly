import type { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import SectionTitle from '@/components/SectionTitle'
import { getArticlesByType } from '@/lib/supabase/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'News',
  description: "L'actualité de la communauté francophone en Israël.",
}

export default async function NewsPage() {
  const articles = await getArticlesByType('news').catch(() => [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <SectionTitle title="Toute l'actualité" />
      {articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} basePath="/news" />
          ))}
        </div>
      ) : (
        <p className="text-marine/60">Aucune actualité publiée pour le moment.</p>
      )}
    </div>
  )
}
