'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/news', label: 'News' },
  { href: '/mivzak', label: 'Mivzak' },
  { href: '/blog', label: 'Blog' },
  { href: '/bonnes-adresses', label: 'Bonnes adresses' },
  { href: '/a-propos', label: 'À propos' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-500 ease-premium ${
          scrolled
            ? 'glass border-b border-marine/[0.06] shadow-soft'
            : 'border-b border-transparent bg-creme/40 backdrop-blur-sm'
        }`}
      >
        <nav
          className={`container-page flex items-center justify-between transition-all duration-500 ease-premium ${
            scrolled ? 'py-2.5' : 'py-3.5'
          }`}
        >
          <Logo size={scrolled ? 34 : 40} />

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-marine/70 transition-colors duration-200 hover:text-marine"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-gradient-soft"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={active ? 'text-marine' : ''}>{link.label}</span>
                  <span
                    className={`pointer-events-none absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-bleu transition-transform duration-300 ease-premium group-hover:scale-x-100 ${
                      active ? 'scale-x-0' : ''
                    }`}
                  />
                </Link>
              )
            })}
            <ThemeToggle className="ml-2" />
            <Link href="/news" className="btn-primary ml-1">
              Lire les news
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-marine/10 bg-surface/70 text-marine backdrop-blur transition-colors hover:bg-surface"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
            >
              <div className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                    open ? 'top-1.5 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                    open ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                    open ? 'top-1.5 -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 bg-creme md:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              <nav className="space-y-2">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="block font-serif text-4xl font-bold leading-tight text-marine transition-colors hover:text-bleu"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: 0.06 * links.length, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <Link href="/news" className="btn-primary w-full py-3.5 text-base">
                  Lire les news
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
