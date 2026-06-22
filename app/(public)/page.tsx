import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import ArticleCard from '@/components/ArticleCard'
import AdresseCard from '@/components/AdresseCard'
import SectionTitle from '@/components/SectionTitle'
import NewsletterForm from '@/components/NewsletterForm'
import PubBanner from '@/components/PubBanner'
import {
  getFeaturedArticles,
  getArticlesByType,
  getFeaturedAdresses,
} from '@/lib/supabase/queries'

export const revalidate = 60

export default async function HomePage() {
  const [featured, news, blog, adresses] = await Promise.all([
    getFeaturedArticles(3).catch(() => []),
    getArticlesByType('news', 6).catch(() => []),
    getArticlesByType('blog', 4).catch(() => []),
    getFeaturedAdresses(6).catch(() => []),
  ])

  const hero = featured[0]
  const secondary = featured.slice(1, 3)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {hero ? (
        <section className="grid gap-6 md:grid-cols-2">
          <Link
            href={`/news/${hero.slug}`}
            className="group relative overflow-hidden rounded-xl bg-marine"
          >
            <div className="relative aspect-[16/10]">
              {hero.image_cover ? (
                <Image
                  src={hero.image_cover}
                  alt={hero.titre}
                  fill
                  priority
                  className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="mosaic h-full w-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-marine via-marine/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-or">
                À la une
              </span>
              <h1 className="mt-2 font-serif text-2xl font-bold text-creme md:text-3xl">
                {hero.titre}
              </h1>
              {hero.extrait && (
                <p className="mt-2 line-clamp-2 text-sm text-creme/80">{hero.extrait}</p>
              )}
            </div>
          </Link>
          <div className="grid gap-6">
            {secondary.map((article) => (
              <ArticleCard key={article.id} article={article} basePath="/news" />
            ))}
            {secondary.length === 0 && (
              <div className="mosaic flex items-center justify-center rounded-xl border border-or p-10 text-center text-marine/50">
                Bientôt de nouveaux articles à la une.
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="mosaic rounded-xl border border-or p-12 text-center">
          <h1 className="font-serif text-3xl font-bold text-marine">
            Bienvenue sur Mazaly
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-marine/70">
            Le média de la communauté francophone en Israël. Les premiers contenus
            arrivent très bientôt.
          </p>
        </section>
      )}

      <section className="mt-14">
        <SectionTitle title="News" href="/news" />
        {news.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <ArticleCard key={article.id} article={article} basePath="/news" />
            ))}
          </div>
        ) : (
          <p className="text-marine/60">Aucune actualité pour le moment.</p>
        )}
      </section>

      <section className="my-12">
        <Suspense fallback={null}>
          <PubBanner emplacement="home" />
        </Suspense>
      </section>

      <section className="mt-6">
        <SectionTitle title="Le Blog" href="/blog" />
        {blog.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {blog.map((article) => (
              <ArticleCard key={article.id} article={article} basePath="/blog" />
            ))}
          </div>
        ) : (
          <p className="text-marine/60">Aucun article de blog pour le moment.</p>
        )}
      </section>

      <section className="mt-14">
        <SectionTitle title="Bonnes adresses" href="/bonnes-adresses" />
        {adresses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adresses.map((adresse) => (
              <AdresseCard key={adresse.id} adresse={adresse} />
            ))}
          </div>
        ) : (
          <p className="text-marine/60">Aucune adresse pour le moment.</p>
        )}
      </section>

      <section className="mosaic mt-16 rounded-xl border border-or bg-white p-8 text-center md:p-12">
        <h2 className="font-serif text-2xl font-bold text-marine md:text-3xl">
          Restez connecté à la communauté
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-marine/70">
          Inscrivez-vous à la newsletter Mazaly pour recevoir l'essentiel de
          l'actualité francophone en Israël.
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
