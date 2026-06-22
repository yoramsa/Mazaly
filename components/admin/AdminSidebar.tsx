'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/login')
    router.refresh()
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-marine/10 bg-marine text-creme">
      <div className="border-b border-creme/10 p-5">
        <Link href="/admin" className="font-serif text-xl font-bold text-creme">
          Mazaly Admin
        </Link>
        <p className="mt-1 text-xs text-creme/60">{nom}</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
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
  )
}
