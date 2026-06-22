'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { formatDateShort } from '@/lib/utils/format'
import type { Profile, Role } from '@/lib/types'

const ROLES: Role[] = ['lecteur', 'redacteur', 'admin']

export default function UsersManager({ profiles }: { profiles: Profile[] }) {
  const router = useRouter()
  const [pending, setPending] = useState<string | null>(null)

  async function changeRole(id: string, role: Role) {
    setPending(id)
    const supabase = createClient()
    await supabase.from('profiles').update({ role }).eq('id', id)
    setPending(null)
    router.refresh()
  }

  return (
    <div className="overflow-hidden rounded-xl border border-marine/10 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-marine/10 bg-creme text-xs uppercase text-marine/60">
          <tr>
            <th className="px-4 py-3">Nom</th>
            <th className="px-4 py-3">Rôle</th>
            <th className="px-4 py-3">Inscrit le</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((p) => (
            <tr key={p.id} className="border-b border-marine/5 last:border-0">
              <td className="px-4 py-3 font-medium text-marine">{p.nom || 'Sans nom'}</td>
              <td className="px-4 py-3">
                <select
                  value={p.role}
                  disabled={pending === p.id}
                  onChange={(e) => changeRole(p.id, e.target.value as Role)}
                  className="rounded-md border border-marine/20 bg-white px-2 py-1 text-sm focus:border-bleu focus:outline-none"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 text-marine/60">{formatDateShort(p.created_at)}</td>
            </tr>
          ))}
          {profiles.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-8 text-center text-marine/50">
                Aucun profil.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
