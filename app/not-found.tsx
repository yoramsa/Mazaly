import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-creme px-4 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[10%] top-[10%] h-72 w-72 rounded-full bg-bleu/15 blur-[110px]" />
        <div className="absolute bottom-[10%] left-[10%] h-72 w-72 rounded-full bg-mauve/15 blur-[110px]" />
      </div>

      <div className="relative">
        <p className="font-serif text-7xl font-bold text-gradient md:text-8xl">404</p>
        <h1 className="mt-5 font-serif text-2xl font-bold text-marine md:text-3xl">
          Page introuvable
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-marine/60">
          Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour
          continuer votre lecture.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            Retour à l'accueil
          </Link>
          <Link href="/news" className="btn-ghost">
            Voir les news
          </Link>
        </div>
      </div>
    </div>
  )
}
