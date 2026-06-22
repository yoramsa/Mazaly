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
    <article className="group relative h-full overflow-hidden rounded-3xl border border-marine/[0.07] bg-white shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift">
      <Link href={`${basePath}/${article.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          {article.image_cover ? (
            <Image
              src={article.image_cover}
              alt={article.titre}
              fill
              className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.07]"
            />
          ) : (
            <div className="mosaic h-full w-full" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-marine/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {article.categories && (
            <span
              className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide shadow-soft backdrop-blur"
              style={{ color: article.categories.couleur || '#4A6FD4' }}
            >
              {article.categories.nom}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-serif text-base font-bold leading-snug text-marine transition-colors duration-300 group-hover:text-bleu">
            {article.titre}
          </h3>
          {article.extrait && (
            <p className="mt-1.5 line-clamp-2 text-[0.8rem] leading-relaxed text-marine/60">
              {article.extrait}
            </p>
          )}
          <div className="mt-auto flex items-center justify-between pt-3">
            <p className="text-[0.7rem] text-marine/45">
              {formatDate(article.published_at || article.created_at)}
            </p>
            <span className="-translate-x-1 text-xs font-medium text-bleu opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Lire →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
