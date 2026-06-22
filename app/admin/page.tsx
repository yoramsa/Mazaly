import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

async function getStats() {
  const supabase = createClient()
  const [articles, vues, adresses, abonnes, drafts] = await Promise.all([
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('statut', 'published'),
    supabase.from('articles').select('vues'),
    supabase.from('adresses').select('id', { count: 'exact', head: true }).eq('statut', 'published'),
    supabase.from('newsletters').select('id', { count: 'exact', head: true }).eq('actif', true),
    supabase.from('articles').select('id', { count: 'exact', head: true }).eq('statut', 'draft'),
  ])

  const totalVues = (vues.data ?? []).reduce((sum, a) => sum + (a.vues || 0), 0)

  return {
    articles: articles.count ?? 0,
    vues: totalVues,
    adresses: adresses.count ?? 0,
    abonnes: abonnes.count ?? 0,
    drafts: drafts.count ?? 0,
  }
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl border border-marine/10 bg-white p-5">
      <p className="text-sm text-marine/60">{label}</p>
      <p className="mt-2 font-serif text-3xl font-bold" style={{ color }}>
        {value.toLocaleString('fr-FR')}
      </p>
    </div>
  )
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-marine">Tableau de bord</h1>
      <p className="mt-1 text-marine/60">Vue d'ensemble de Mazaly.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Articles publiés" value={stats.articles} color="#4A6FD4" />
        <StatCard label="Vues totales" value={stats.vues} color="#7B5EA7" />
        <StatCard label="Bonnes adresses" value={stats.adresses} color="#C9A84C" />
        <StatCard label="Abonnés newsletter" value={stats.abonnes} color="#1B2B6B" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/articles/nouveau"
          className="rounded-xl border border-or bg-white p-6 transition-shadow hover:shadow-md"
        >
          <h2 className="font-serif text-xl font-bold text-marine">Nouvel article</h2>
          <p className="mt-1 text-sm text-marine/60">
            Rédiger un article News ou Blog. {stats.drafts} brouillon(s) en cours.
          </p>
        </Link>
        <Link
          href="/admin/adresses/nouvelle"
          className="rounded-xl border border-or bg-white p-6 transition-shadow hover:shadow-md"
        >
          <h2 className="font-serif text-xl font-bold text-marine">Nouvelle adresse</h2>
          <p className="mt-1 text-sm text-marine/60">Ajouter une bonne adresse au répertoire.</p>
        </Link>
      </div>
    </div>
  )
}
