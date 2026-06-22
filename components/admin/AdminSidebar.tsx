'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Role } from '@/lib/types'

const items = [
  { href: '/admin', label: 'Tableau de bord', exact: true },
  { href: '/admin/articles', label: 'Articles' },
  { href: '/admin/mivzak', label: 'Mivzak (flashes)' },
  { href: '/admin/adresses', label: 'Bonnes adresses' },
  { href: '/admin/categories', label: 'Catégories' },
  { href: '/admin/tags', label: 'Tags' },
  { href: '/admin/publicites', label: 'Publicités' },
  { href: '/admin/newsletter', label: 'Newsletter' },
  { href: '/admin/utilisateurs', label: 'Utilisateurs', adminOnly: true },
]

export default function AdminSidebar({ role, nom }: { role: Role; nom: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/login')
    router.refresh()
  }

  return (
    <>
      {/* Barre mobile */}
      <div className="flex items-center justify-between border-b border-creme/10 bg-marine px-4 py-3 text-creme md:hidden">
        <Link href="/admin" className="font-serif text-lg font-bold">
          Mazaly Admin
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-creme/10"
          aria-label="Menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col bg-marine text-creme transition-transform duration-300 ease-premium md:static md:z-auto md:w-60 md:translate-x-0 md:border-r md:border-marine/10 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-creme/10 p-5">
          <div>
            <Link href="/admin" className="font-serif text-xl font-bold text-creme">
              Mazaly Admin
            </Link>
            <p className="mt-1 text-xs text-creme/60">{nom}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-creme/70 md:hidden"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items
            .filter((item) => !item.adminOnly || role === 'admin')
            .map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    active ? 'bg-or text-marine' : 'text-creme/80 hover:bg-creme/10'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
        </nav>

        <div className="border-t border-creme/10 p-3">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-sm text-creme/80 hover:bg-creme/10"
          >
            Voir le site
          </Link>
          <button
            onClick={logout}
            className="mt-1 block w-full rounded-md px-3 py-2 text-left text-sm text-creme/80 hover:bg-creme/10"
          >
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  )
}
