import type { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez Mazaly, le média de la communauté francophone en Israël.',
}

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-marine">À propos de Mazaly</h1>
      <div className="mt-6 space-y-5 leading-relaxed text-marine/80">
        <p>
          <strong>Mazaly</strong> est le média communautaire francophone en Israël.
          Notre mission : informer, rassembler et célébrer la vie de la communauté
          francophone, du nord au sud du pays.
        </p>
        <p>
          Nous couvrons l'actualité, partageons des récits et des portraits, et
          mettons en lumière les meilleures adresses recommandées par et pour la
          communauté. Le tout, en français, gratuitement.
        </p>
        <p>
          Mazaly est une marque pensée pour durer et grandir. Au-delà du média,
          notre ambition est de tisser des liens — entre les personnes, les lieux et
          les histoires qui font la richesse de notre communauté.
        </p>
      </div>

      <div className="mosaic mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-or bg-white p-5 text-center">
          <p className="font-serif text-2xl font-bold text-bleu">News</p>
          <p className="mt-1 text-sm text-marine/60">L'actualité au quotidien</p>
        </div>
        <div className="rounded-xl border border-or bg-white p-5 text-center">
          <p className="font-serif text-2xl font-bold text-mauve">Blog</p>
          <p className="mt-1 text-sm text-marine/60">Récits et portraits</p>
        </div>
        <div className="rounded-xl border border-or bg-white p-5 text-center">
          <p className="font-serif text-2xl font-bold text-or">Adresses</p>
          <p className="mt-1 text-sm text-marine/60">Les bons plans de la communauté</p>
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-or bg-white p-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-marine">Rejoignez-nous</h2>
        <p className="mt-2 text-sm text-marine/70">
          Inscrivez-vous à notre newsletter pour ne rien manquer.
        </p>
        <div className="mx-auto mt-4 max-w-md">
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}
