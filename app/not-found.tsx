import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mosaic flex min-h-screen flex-col items-center justify-center bg-creme px-4 text-center">
      <p className="font-serif text-6xl font-bold text-or">404</p>
      <h1 className="mt-4 font-serif text-2xl font-bold text-marine">
        Page introuvable
      </h1>
      <p className="mt-2 text-marine/60">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-marine px-5 py-2 text-sm font-semibold text-creme hover:bg-bleu"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}
