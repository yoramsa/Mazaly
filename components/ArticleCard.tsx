import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/types'
import { formatDate } from '@/lib/utils/format'

export default function ArticleCard({
  article,
  basePath,
}: {
  article: Article
  basePath: string
}) {
  return (
    <article className="group overflow-hidden rounded-lg border border-marine/10 bg-white transition-shadow hover:shadow-md">
      <Link href={`${basePath}/${article.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-creme">
          {article.image_cover ? (
            <Image
              src={article.image_cover}
              alt={article.titre}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="mosaic h-full w-full" />
          )}
        </div>
        <div className="p-4">
          {article.categories && (
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: article.categories.couleur || '#4A6FD4' }}
            >
              {article.categories.nom}
            </span>
          )}
          <h3 className="mt-1 font-serif text-lg font-bold leading-snug text-marine group-hover:text-bleu">
            {article.titre}
          </h3>
          {article.extrait && (
            <p className="mt-2 line-clamp-2 text-sm text-marine/70">{article.extrait}</p>
          )}
          <p className="mt-3 text-xs text-marine/50">
            {formatDate(article.published_at || article.created_at)}
          </p>
        </div>
      </Link>
    </article>
  )
}
