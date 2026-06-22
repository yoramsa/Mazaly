'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils/slug'
import { inputClass } from '@/components/admin/Field'
import type { Tag } from '@/lib/types'

export default function TagsManager({ tags }: { tags: Tag[] }) {
  const router = useRouter()
  const [nom, setNom] = useState('')
  const [error, setError] = useState('')

  async function add() {
    setError('')
    if (!nom) return
    const supabase = createClient()
    const { error } = await supabase.from('tags').insert({ nom, slug: slugify(nom) })
    if (error) {
      setError(error.message)
      return
    }
    setNom('')
    router.refresh()
  }

  async function remove(id: string) {
    if (!window.confirm('Supprimer ce tag ?')) return
    const supabase = createClient()
    await supabase.from('tags').delete().eq('id', id)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          className={inputClass}
          placeholder="Nouveau tag"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <button
          onClick={add}
          className="shrink-0 rounded-md bg-marine px-4 py-2 text-sm font-semibold text-creme hover:bg-bleu"
        >
          Ajouter
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="flex items-center gap-2 rounded-full border border-marine/20 bg-white px-3 py-1 text-sm text-marine"
          >
            {tag.nom}
            <button onClick={() => remove(tag.id)} className="text-red-400 hover:text-red-600">
              ×
            </button>
          </span>
        ))}
        {tags.length === 0 && <p className="text-sm text-marine/50">Aucun tag créé.</p>}
      </div>
    </div>
  )
}
