import Link from 'next/link'
import Logo from './Logo'
import NewsletterForm from './NewsletterForm'

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-creme">
      {/* gradient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-bleu/20 blur-[100px]" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-mauve/20 blur-[100px]" />
      </div>

      <div className="container-page relative grid gap-12 py-16 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-creme/70">
            Le média communautaire francophone en Israël. News, blog et bonnes
            adresses au cœur de la communauté.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-or">
            Navigation
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-creme/70">
            {[
              { href: '/news', label: 'News' },
              { href: '/blog', label: 'Blog' },
              { href: '/bonnes-adresses', label: 'Bonnes adresses' },
              { href: '/a-propos', label: 'À propos' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-or"
                >
                  <span className="h-px w-3 bg-or/40 transition-all duration-300" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-or">
            Newsletter
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-creme/70">
            Recevez le meilleur de Mazaly chaque semaine.
          </p>
          <div className="mt-5">
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-5 text-center text-xs text-creme/50">
        © {new Date().getFullYear()} Mazaly. Tous droits réservés.
      </div>
    </footer>
  )
}
