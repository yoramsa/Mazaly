import type { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import PageHeader from '@/components/PageHeader'
import EmptyState from '@/components/ui/EmptyState'
import Reveal from '@/components/motion/Reveal'
import { getArticlesByType } from '@/lib/supabase/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'News',
  description: "L'actualité de la communauté francophone en Israël.",
}

export default async function NewsPage() {
  const articles = await getArticlesByType('news').catch(() => [])

  return (
    <div>
      <PageHeader
        eyebrow="Actualités"
        title="Toute l'actualité"
        description="L'essentiel de l'actualité de la communauté francophone en Israël, en continu."
      />
      <div className="container-page pb-20">
        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <Reveal key={article.id} delay={i * 0.05}>
                <ArticleCard article={article} basePath="/news" />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState label="Aucune actualité publiée pour le moment." />
        )}
      </div>
    </div>
  )
}
