import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import ArticleCard from '@/components/ArticleCard'
import AdresseCard from '@/components/AdresseCard'
import SectionTitle from '@/components/SectionTitle'
import NewsletterForm from '@/components/NewsletterForm'
import PubBanner from '@/components/PubBanner'
import MivzakPanel from '@/components/MivzakPanel'
import Reveal from '@/components/motion/Reveal'
import {
  getFeaturedArticles,
  getArticlesByType,
  getFeaturedAdresses,
  getMivzakim,
} from '@/lib/supabase/queries'

export const revalidate = 60

export default async function HomePage() {
  const [featured, news, blog, adresses, mivzakim] = await Promise.all([
    getFeaturedArticles(3).catch(() => []),
    getArticlesByType('news', 6).catch(() => []),
    getArticlesByType('blog', 4).catch(() => []),
    getFeaturedAdresses(6).catch(() => []),
    getMivzakim(6).catch(() => []),
  ])

  const hero = featured[0]
  const secondary = featured.slice(1, 3)

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-10%] top-[-20%] h-[34rem] w-[34rem] rounded-full bg-bleu/20 blur-[120px]" />
          <div className="absolute left-[-10%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-mauve/20 blur-[120px]" />
        </div>

        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
              Communauté francophone · Israël
            </span>
            <h1 className="mt-5 font-serif text-3xl font-bold leading-[1.12] tracking-tight text-marine sm:text-4xl md:text-5xl">
              Le média de la <span className="text-gradient">communauté</span> francophone en Israël
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-marine/65 md:text-lg">
              Actualités, articles de fond et bonnes adresses, sélectionnés pour
              celles et ceux qui font vivre la francophonie en Israël.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/news" className="btn-primary">
                Découvrir les news
              </Link>
              <Link href="/bonnes-adresses" className="btn-ghost">
                Bonnes adresses
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <div className="absolute inset-6 rounded-[2.5rem] bg-brand-gradient opacity-90 blur-2xl" />
              <div className="glass relative flex h-full w-full items-center justify-center rounded-[2.5rem] shadow-lift">
                <Image
                  src="/mazaly-icon.png"
                  alt="Mazaly"
                  width={300}
                  height={300}
                  priority
                  className="w-3/5 animate-float drop-shadow-[0_20px_40px_rgba(74,111,212,0.35)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-page pb-16">
        {/* ===== MIVZAKIM ===== */}
        {mivzakim.length > 0 && (
          <Reveal as="section" className="mb-16">
            <MivzakPanel items={mivzakim} />
          </Reveal>
        )}

        {/* ===== BONNES ADRESSES (À découvrir) ===== */}
        <Reveal as="section" className="mb-20">
          <SectionTitle title="Bonnes adresses" href="/bonnes-adresses" eyebrow="À découvrir" />
          {adresses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {adresses.map((adresse, i) => (
                <Reveal key={adresse.id} delay={i * 0.06}>
                  <AdresseCard adresse={adresse} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState label="Aucune adresse pour le moment." />
          )}
        </Reveal>

        {/* ===== À LA UNE ===== */}
        {hero && (
          <Reveal as="section" className="mb-20">
            <SectionTitle title="À la une" eyebrow="En ce moment" />
            <div className="grid gap-6 md:grid-cols-2">
              <Link
                href={`/news/${hero.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-marine shadow-card transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[16/11]">
                  {hero.image_cover ? (
                    <Image
                      src={hero.image_cover}
                      alt={hero.titre}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                    />
                  ) : (
                    <div className="mosaic h-full w-full" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 p-7">
                  <span className="eyebrow border-white/20 bg-white/10 text-or">
                    À la une
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-bold leading-snug text-creme md:text-3xl">
                    {hero.titre}
                  </h3>
                  {hero.extrait && (
                    <p className="mt-2 line-clamp-2 max-w-lg text-sm text-creme/75">
                      {hero.extrait}
                    </p>
                  )}
                </div>
              </Link>

              <div className="grid gap-6">
                {secondary.map((article) => (
                  <ArticleCard key={article.id} article={article} basePath="/news" />
                ))}
                {secondary.length === 0 && (
                  <div className="surface mosaic flex items-center justify-center p-10 text-center text-marine/45">
                    Bientôt de nouveaux articles à la une.
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        )}

        {/* ===== NEWS ===== */}
        <Reveal as="section" className="mb-20">
          <SectionTitle title="News" href="/news" eyebrow="Actualités" />
          {news.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((article, i) => (
                <Reveal key={article.id} delay={i * 0.06}>
                  <ArticleCard article={article} basePath="/news" />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState label="Aucune actualité pour le moment." />
          )}
        </Reveal>

        <section className="mb-20">
          <Suspense fallback={null}>
            <PubBanner emplacement="home" />
          </Suspense>
        </section>

        {/* ===== BLOG ===== */}
        <Reveal as="section" className="mb-20">
          <SectionTitle title="Le Blog" href="/blog" eyebrow="À lire" />
          {blog.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {blog.map((article, i) => (
                <Reveal key={article.id} delay={i * 0.06}>
                  <ArticleCard article={article} basePath="/blog" />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState label="Aucun article de blog pour le moment." />
          )}
        </Reveal>

        {/* ===== NEWSLETTER ===== */}
        <Reveal as="section">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 text-center shadow-lift md:px-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-0 h-60 w-60 rounded-full bg-bleu/25 blur-[90px]" />
              <div className="absolute right-1/4 bottom-0 h-60 w-60 rounded-full bg-mauve/25 blur-[90px]" />
            </div>
            <div className="relative mx-auto max-w-lg">
              <h2 className="font-serif text-3xl font-bold text-creme md:text-4xl">
                Restez connecté à la communauté
              </h2>
              <p className="mx-auto mt-3 max-w-md text-creme/70">
                Inscrivez-vous à la newsletter Mazaly et recevez l'essentiel de
                l'actualité francophone en Israël.
              </p>
              <div className="mx-auto mt-8 max-w-md text-left">
                <NewsletterForm variant="dark" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="surface mosaic flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <span className="text-3xl">🐟</span>
      <p className="text-marine/55">{label}</p>
    </div>
  )
}
