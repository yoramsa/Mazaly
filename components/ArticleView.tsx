import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/types'
import { formatDate } from '@/lib/utils/format'
import NewsletterForm from '@/components/NewsletterForm'
import ViewCounter from '@/components/ViewCounter'

export default function ArticleView({ article }: { article: Article }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <ViewCounter slug={article.slug} />
      {article.categories && (
        <span
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: article.categories.couleur || '#4A6FD4' }}
        >
          {article.categories.nom}
        </span>
      )}
      <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-marine md:text-4xl">
        {article.titre}
      </h1>
      <div className="mt-3 flex items-center gap-3 text-sm text-marine/60">
        {article.profiles?.nom && <span>Par {article.profiles.nom}</span>}
        <span>{formatDate(article.published_at || article.created_at)}</span>
        <span>{article.vues} vues</span>
      </div>

      {article.image_cover && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src={article.image_cover}
            alt={article.titre}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {article.extrait && (
        <p className="mt-6 border-l-4 border-or pl-4 font-serif text-lg italic text-marine/80">
          {article.extrait}
        </p>
      )}

      <div
        className="richtext mt-8"
        dangerouslySetInnerHTML={{ __html: article.contenu || '' }}
      />

      <div className="mosaic mt-12 rounded-xl border border-or bg-white p-6 text-center">
        <h2 className="font-serif text-xl font-bold text-marine">
          Ne manquez rien de Mazaly
        </h2>
        <p className="mt-2 text-sm text-marine/70">
          Recevez nos meilleurs articles directement dans votre boîte mail.
        </p>
        <div className="mx-auto mt-4 max-w-md">
          <NewsletterForm />
        </div>
      </div>

      <div className="mt-8">
        <Link href="/news" className="text-sm font-medium text-bleu hover:underline">
          ← Retour aux actualités
        </Link>
      </div>
    </article>
  )
}
