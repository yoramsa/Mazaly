'use client'

import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'

const links = [
  { href: '/news', label: 'News' },
  { href: '/blog', label: 'Blog' },
  { href: '/bonnes-adresses', label: 'Bonnes adresses' },
  { href: '/a-propos', label: 'À propos' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-or bg-creme">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-marine transition-colors hover:text-bleu"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-marine md:hidden"
          aria-label="Menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>
      {open && (
        <div className="border-t border-or bg-creme px-4 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-marine hover:text-bleu"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
