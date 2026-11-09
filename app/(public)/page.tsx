import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import ArticleCard from '@/components/ArticleCard'
import AdresseCard from '@/components/AdresseCard'
import SectionTitle from '@/components/SectionTitle'
import CommunityCta from '@/components/CommunityCta'
import EmptyState from '@/components/ui/EmptyState'
import PubBanner from '@/components/PubBanner'
import MivzakPanel from '@/components/MivzakPanel'
import Reveal from '@/components/motion/Reveal'
import MeshBlobs from '@/components/motion/MeshBlobs'
import WordReveal from '@/components/motion/WordReveal'
import MagneticButton from '@/components/motion/MagneticButton'
import HeroVisual from '@/components/HeroVisual'
import { CategoryBadge } from '@/components/ui/Badge'
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
        <MeshBlobs />

        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
              Communauté francophone · Israël
            </span>
            <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-marine sm:text-5xl md:text-6xl">
              <WordReveal
                text="Le média de la communauté francophone en Israël"
                gradientWords={['communauté']}
                delay={0.1}
              />
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-marine/65 md:text-lg">
              Actualités, articles de fond et bonnes adresses, sélectionnés pour
              celles et ceux qui font vivre la francophonie en Israël.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <Link href="/news" className="btn-primary">
                  Découvrir les news
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/bonnes-adresses" className="btn-ghost">
                  Bonnes adresses
                </Link>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <HeroVisual />
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
            <div className="no-scrollbar -mx-5 flex snap-x-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
              {adresses.map((adresse, i) => (
                <Reveal
                  key={adresse.id}
                  delay={i * 0.06}
                  className="w-[78vw] shrink-0 snap-start sm:w-auto"
                >
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
                      className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-110 group-hover:translate-x-[1.5%] group-hover:-translate-y-[1.5%]"
                    />
                  ) : (
                    <div className="mosaic h-full w-full" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="eyebrow border-white/20 bg-white/10 text-or">
                      À la une
                    </span>
                    {hero.categories && (
                      <CategoryBadge categorie={hero.categories} className="border border-white/20 !bg-white/10 !text-creme" />
                    )}
                  </div>
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

        {/* ===== REJOINDRE MAZALY ===== */}
        <Reveal as="section">
          <CommunityCta showPhone />
        </Reveal>
      </div>
    </div>
  )
}
