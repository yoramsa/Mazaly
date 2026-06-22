'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils/slug'
import { inputClass } from '@/components/admin/Field'
import type { Categorie } from '@/lib/types'

export default function CategoriesManager({ categories }: { categories: Categorie[] }) {
  const router = useRouter()
  const [nom, setNom] = useState('')
  const [type, setType] = useState('news')
  const [couleur, setCouleur] = useState('#4A6FD4')
  const [error, setError] = useState('')

  async function add() {
    setError('')
    if (!nom) return
    const supabase = createClient()
    const { error } = await supabase.from('categories').insert({
      nom,
      slug: slugify(nom),
      type,
      couleur,
    })
    if (error) {
      setError(error.message)
      return
    }
    setNom('')
    router.refresh()
  }

  async function remove(id: string) {
    if (!window.confirm('Supprimer cette catégorie ?')) return
    const supabase = createClient()
    await supabase.from('categories').delete().eq('id', id)
    router.refresh()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="overflow-hidden rounded-xl border border-marine/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-marine/10 bg-creme text-xs uppercase text-marine/60">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Couleur</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-marine/5 last:border-0">
                <td className="px-4 py-3 font-medium text-marine">{c.nom}</td>
                <td className="px-4 py-3 text-marine/70">{c.type}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-block h-4 w-8 rounded"
                    style={{ backgroundColor: c.couleur || '#ccc' }}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => remove(c.id)}
                    className="text-xs font-medium text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-marine/50">
                  Aucune catégorie.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 rounded-xl border border-marine/10 bg-white p-4">
        <h2 className="font-serif text-lg font-bold text-marine">Ajouter</h2>
        <input
          className={inputClass}
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <select className={inputClass} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="news">News</option>
          <option value="blog">Blog</option>
          <option value="adresse">Adresse</option>
        </select>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={couleur}
            onChange={(e) => setCouleur(e.target.value)}
            className="h-9 w-12 rounded border border-marine/20"
          />
          <span className="text-sm text-marine/60">{couleur}</span>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          onClick={add}
          className="w-full rounded-md bg-marine px-4 py-2 text-sm font-semibold text-creme hover:bg-bleu"
        >
          Ajouter la catégorie
        </button>
      </div>
    </div>
  )
}
