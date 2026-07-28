import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/types'
import { formatDate, readingTimeMinutes } from '@/lib/utils/format'
import { CategoryBadge } from '@/components/ui/Badge'
import { CalendarIcon, ClockIcon, EyeIcon, PenIcon } from '@/components/ui/icons'
import ArticleCard from '@/components/ArticleCard'
import NewsletterCta from '@/components/NewsletterCta'
import SectionTitle from '@/components/SectionTitle'
import ShareBar from '@/components/ShareBar'
import ViewCounter from '@/components/ViewCounter'
import Reveal from '@/components/motion/Reveal'

type ArticleViewProps = {
  article: Article
  /** Section d'origine : détermine le lien retour et les liens des articles liés. */
  basePath?: '/news' | '/blog'
  backLabel?: string
  related?: Article[]
}

export default function ArticleView({
  article,
  basePath = '/news',
  backLabel = 'Toutes les actualités',
  related = [],
}: ArticleViewProps) {
  const minutes = readingTimeMinutes(article.contenu)

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[-20%] h-80 w-80 rounded-full bg-bleu/15 blur-[110px]" />
        <div className="absolute left-[-8%] top-[15%] h-72 w-72 rounded-full bg-mauve/15 blur-[110px]" />
      </div>

      <ViewCounter slug={article.slug} />

      <article className="container-page max-w-4xl pb-16 pt-10">
        {/* ===== En-tête ===== */}
        <Reveal>
          <Link
            href={basePath}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-marine/55 transition-colors hover:text-bleu"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
            {backLabel}
          </Link>

          <header className="mt-6">
            {article.categories && (
              <CategoryBadge categorie={article.categories} className="border border-marine/10" />
            )}
            <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.15] tracking-tight text-marine sm:text-4xl md:text-[2.75rem]">
              {article.titre}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-marine/55">
              {article.profiles?.nom && (
                <span className="inline-flex items-center gap-1.5">
                  <PenIcon size={14} className="text-or" />
                  {article.profiles.nom}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <CalendarIcon size={14} className="text-or" />
                {formatDate(article.published_at || article.created_at)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon size={14} className="text-or" />
                {minutes} min de lecture
              </span>
              <span className="inline-flex items-center gap-1.5">
                <EyeIcon size={14} className="text-or" />
                {article.vues} vues
              </span>
            </div>
          </header>
        </Reveal>

        {/* ===== Couverture ===== */}
        {article.image_cover && (
          <Reveal delay={0.1}>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[2rem] shadow-card">
              <Image
                src={article.image_cover}
                alt={article.titre}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-marine/10" />
            </div>
          </Reveal>
        )}

        {/* ===== Chapô ===== */}
        {article.extrait && (
          <Reveal delay={0.15}>
            <p className="mt-8 border-l-4 border-or pl-5 font-serif text-lg italic leading-relaxed text-marine/75 md:text-xl">
              {article.extrait}
            </p>
          </Reveal>
        )}

        {/* ===== Contenu ===== */}
        <div
          className="richtext mt-8"
          dangerouslySetInnerHTML={{ __html: article.contenu || '' }}
        />

        {/* ===== Partage ===== */}
        <div className="mt-10 border-t border-marine/10 pt-6">
          <ShareBar title={article.titre} />
        </div>

        {/* ===== Newsletter ===== */}
        <div className="mt-14">
          <NewsletterCta
            title="Ne manquez rien de Mazaly"
            description="Recevez nos meilleurs articles directement dans votre boîte mail, chaque semaine."
          />
        </div>
      </article>

      {/* ===== À lire aussi ===== */}
      {related.length > 0 && (
        <div className="container-page pb-20">
          <Reveal as="section">
            <SectionTitle title="À lire aussi" href={basePath} eyebrow="Pour continuer" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((a, i) => (
                <Reveal key={a.id} delay={i * 0.06}>
                  <ArticleCard article={a} basePath={basePath} />
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      )}
    </div>
  )
}
