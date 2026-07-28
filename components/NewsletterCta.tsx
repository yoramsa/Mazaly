import NewsletterForm from '@/components/NewsletterForm'

/** Panneau sombre d'inscription à la newsletter, réutilisé sur l'accueil et les articles. */
export default function NewsletterCta({
  title = 'Restez connecté à la communauté',
  description = "Inscrivez-vous à la newsletter Mazaly et recevez l'essentiel de l'actualité francophone en Israël.",
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 text-center shadow-lift md:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-60 w-60 rounded-full bg-bleu/25 blur-[90px]" />
        <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full bg-mauve/25 blur-[90px]" />
      </div>
      <div className="relative mx-auto max-w-lg">
        <h2 className="font-serif text-3xl font-bold text-creme md:text-4xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-md text-creme/70">{description}</p>
        <div className="mx-auto mt-8 max-w-md text-left">
          <NewsletterForm variant="dark" />
        </div>
      </div>
    </div>
  )
}
