import { createClient } from '@/lib/supabase/server'
import NewsletterExport from '@/components/admin/NewsletterExport'
import { formatDateShort } from '@/lib/utils/format'
import type { Newsletter } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminNewsletter() {
  const supabase = createClient()
  const { data } = await supabase
    .from('newsletters')
    .select('*')
    .order('created_at', { ascending: false })
  const abonnes = (data ?? []) as Newsletter[]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-marine md:text-3xl">Newsletter</h1>
          <p className="mt-1 text-sm text-marine/60">{abonnes.length} abonné(s)</p>
        </div>
        <NewsletterExport abonnes={abonnes} />
      </div>

      <div className="overflow-hidden rounded-xl border border-marine/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-marine/10 bg-creme text-xs uppercase text-marine/60">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Inscrit le</th>
            </tr>
          </thead>
          <tbody>
            {abonnes.map((a) => (
              <tr key={a.id} className="border-b border-marine/5 last:border-0">
                <td className="px-4 py-3 font-medium text-marine">{a.email}</td>
                <td className="px-4 py-3 text-marine/70">{a.nom ?? '—'}</td>
                <td className="px-4 py-3 text-marine/70">{a.actif ? 'Actif' : 'Inactif'}</td>
                <td className="px-4 py-3 text-marine/60">{formatDateShort(a.created_at)}</td>
              </tr>
            ))}
            {abonnes.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-marine/50">
                  Aucun abonné pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
