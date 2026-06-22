import type { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/motion/Reveal'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez Mazaly, le média de la communauté francophone en Israël.',
}

const pillars = [
  { label: 'News', desc: "L'actualité au quotidien", color: 'text-bleu' },
  { label: 'Blog', desc: 'Récits et portraits', color: 'text-mauve' },
  { label: 'Adresses', desc: 'Les bons plans de la communauté', color: 'text-or' },
]

export default function AProposPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Notre histoire"
        title="À propos de Mazaly"
        description="Informer, rassembler et célébrer la vie de la communauté francophone en Israël."
      />

      <div className="container-page pb-20">
        <Reveal as="section" className="surface mx-auto max-w-3xl p-8 md:p-10">
          <div className="space-y-5 text-lg leading-relaxed text-marine/80">
            <p>
              <strong className="text-marine">Mazaly</strong> est le média communautaire
              francophone en Israël. Notre mission : informer, rassembler et célébrer la
              vie de la communauté francophone, du nord au sud du pays.
            </p>
            <p>
              Nous couvrons l'actualité, partageons des récits et des portraits, et
              mettons en lumière les meilleures adresses recommandées par et pour la
              communauté. Le tout, en français, gratuitement.
            </p>
            <p>
              Mazaly est une marque pensée pour durer et grandir. Au-delà du média, notre
              ambition est de tisser des liens — entre les personnes, les lieux et les
              histoires qui font la richesse de notre communauté.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08}>
              <div className="surface flex h-full flex-col items-center justify-center p-6 text-center transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift">
                <p className={`font-serif text-2xl font-bold ${p.color}`}>{p.label}</p>
                <p className="mt-1 text-sm text-marine/60">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="section" className="mx-auto mt-14 max-w-2xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-12 text-center shadow-lift md:px-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/4 top-0 h-52 w-52 rounded-full bg-bleu/25 blur-[90px]" />
              <div className="absolute right-1/4 bottom-0 h-52 w-52 rounded-full bg-mauve/25 blur-[90px]" />
            </div>
            <div className="relative">
              <h2 className="font-serif text-3xl font-bold text-creme">Rejoignez-nous</h2>
              <p className="mt-2 text-creme/70">
                Inscrivez-vous à notre newsletter pour ne rien manquer.
              </p>
              <div className="mx-auto mt-6 max-w-md text-left">
                <NewsletterForm variant="dark" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
