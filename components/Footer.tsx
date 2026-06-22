import Link from 'next/link'
import Logo from './Logo'
import NewsletterForm from './NewsletterForm'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-or bg-marine text-creme">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-creme/80">
            Le média communautaire francophone en Israël. News, blog et bonnes
            adresses au coeur de la communauté.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-or">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm text-creme/80">
            <li><Link href="/news" className="hover:text-or">News</Link></li>
            <li><Link href="/blog" className="hover:text-or">Blog</Link></li>
            <li><Link href="/bonnes-adresses" className="hover:text-or">Bonnes adresses</Link></li>
            <li><Link href="/a-propos" className="hover:text-or">À propos</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-or">Newsletter</h3>
          <p className="mt-4 text-sm text-creme/80">
            Recevez le meilleur de Mazaly chaque semaine.
          </p>
          <div className="mt-4">
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </div>
      <div className="border-t border-creme/15 py-4 text-center text-xs text-creme/60">
        © {new Date().getFullYear()} Mazaly. Tous droits réservés.
      </div>
    </footer>
  )
}
