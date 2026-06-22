'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Field, inputClass } from '@/components/admin/Field'
import type { Mivzak } from '@/lib/types'

export default function MivzakManager({ mivzakim }: { mivzakim: Mivzak[] }) {
  const router = useRouter()
  const [texte, setTexte] = useState('')
  const [lien, setLien] = useState('')
  const [urgent, setUrgent] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function add() {
    setError('')
    if (!texte.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.from('mivzakim').insert({
      texte: texte.trim(),
      lien: lien.trim() || null,
      urgent,
      actif: true,
    })
    setSaving(false)
    if (error) {
      setError(error.message)
      return
    }
    setTexte('')
    setLien('')
    setUrgent(false)
    router.refresh()
  }

  async function toggle(m: Mivzak) {
    const supabase = createClient()
    await supabase.from('mivzakim').update({ actif: !m.actif }).eq('id', m.id)
    router.refresh()
  }

  async function remove(id: string) {
    if (!window.confirm('Supprimer ce flash ?')) return
    const supabase = createClient()
    await supabase.from('mivzakim').delete().eq('id', id)
    router.refresh()
  }

  return (
    <div className="space-y-8">
      {/* Formulaire d'ajout */}
      <div className="space-y-4 rounded-xl border border-marine/10 bg-white p-5">
        <Field label="Texte du flash" hint="Court et factuel. Ex : « Le ministre des Affaires étrangères en visite à Paris. »">
          <textarea
            className={`${inputClass} h-20 resize-y`}
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            placeholder="Texte du mivzak…"
          />
        </Field>
        <Field label="Lien (optionnel)" hint="Vers un article du site (/news/...) ou une source externe (https://...)">
          <input
            className={inputClass}
            value={lien}
            onChange={(e) => setLien(e.target.value)}
            placeholder="/news/mon-article ou https://…"
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-marine">
          <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
          Urgent (🔴 mis en avant)
        </label>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          onClick={add}
          disabled={saving || !texte.trim()}
          className="rounded-md bg-marine px-4 py-2 text-sm font-semibold text-creme hover:bg-bleu disabled:opacity-60"
        >
          {saving ? 'Ajout…' : 'Publier le flash'}
        </button>
      </div>

      {/* Liste */}
      <div className="space-y-2">
        {mivzakim.map((m) => (
          <div
            key={m.id}
            className={`flex items-center gap-3 rounded-lg border bg-white p-3 ${
              m.actif ? 'border-marine/10' : 'border-marine/10 opacity-50'
            }`}
          >
            <span className="text-lg">{m.urgent ? '🔴' : '•'}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-marine">{m.texte}</p>
              {m.lien && <p className="truncate text-xs text-bleu">{m.lien}</p>}
            </div>
            <button
              onClick={() => toggle(m)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                m.actif
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-marine/10 text-marine/60 hover:bg-marine/20'
              }`}
            >
              {m.actif ? 'En ligne' : 'Masqué'}
            </button>
            <button
              onClick={() => remove(m.id)}
              className="shrink-0 text-red-400 hover:text-red-600"
              aria-label="Supprimer"
            >
              ×
            </button>
          </div>
        ))}
        {mivzakim.length === 0 && (
          <p className="text-sm text-marine/50">Aucun flash pour le moment.</p>
        )}
      </div>
    </div>
  )
}
