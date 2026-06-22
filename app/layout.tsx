import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Mazaly — Le média de la communauté francophone en Israël',
    template: '%s | Mazaly',
  },
  description:
    'Mazaly, le média communautaire francophone en Israël : actualités, blog, bonnes adresses et vie de la communauté.',
  openGraph: {
    title: 'Mazaly',
    description:
      'Le média de la communauté francophone en Israël : news, blog et bonnes adresses.',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
