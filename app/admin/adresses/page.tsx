import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PageHeader from '@/components/admin/PageHeader'
import DeleteButton from '@/components/admin/DeleteButton'
import type { Adresse } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminAdresses() {
  const supabase = createClient()
  const { data } = await supabase
    .from('adresses')
    .select('*, categories(*)')
    .order('created_at', { ascending: false })
  const adresses = (data ?? []) as Adresse[]

  return (
    <div>
      <PageHeader
        title="Bonnes adresses"
        actionHref="/admin/adresses/nouvelle"
        actionLabel="Nouvelle adresse"
      />
      <div className="overflow-hidden rounded-xl border border-marine/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-marine/10 bg-creme text-xs uppercase text-marine/60">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Ville</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {adresses.map((a) => (
              <tr key={a.id} className="border-b border-marine/5 last:border-0">
                <td className="px-4 py-3 font-medium text-marine">
                  <Link href={`/admin/adresses/${a.id}`} className="hover:text-bleu">
                    {a.nom}
                  </Link>
                </td>
                <td className="px-4 py-3 text-marine/70">{a.categories?.nom ?? '—'}</td>
                <td className="px-4 py-3 text-marine/70">{a.ville ?? '—'}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      a.statut === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {a.statut === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <DeleteButton table="adresses" id={a.id} />
                </td>
              </tr>
            ))}
            {adresses.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-marine/50">
                  Aucune adresse pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
