'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Field, inputClass } from '@/components/admin/Field'
import ImageUpload from '@/components/admin/ImageUpload'
import type { Publicite } from '@/lib/types'

const EMPLACEMENTS = [
  { value: 'home', label: 'Accueil' },
  { value: 'article', label: 'Article' },
  { value: 'sidebar', label: 'Barre latérale' },
]

export default function PublicitesManager({ publicites }: { publicites: Publicite[] }) {
  const router = useRouter()
  const [titre, setTitre] = useState('')
  const [lien, setLien] = useState('')
  const [emplacement, setEmplacement] = useState('home')
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function add() {
    setError('')
    if (!image || !lien) {
      setError('Image et lien requis.')
      return
    }
    const supabase = createClient()
    const { error } = await supabase.from('publicites').insert({
      titre: titre || null,
      image,
      lien,
      emplacement,
      date_debut: dateDebut || null,
      date_fin: dateFin || null,
      actif: true,
    })
    if (error) {
      setError(error.message)
      return
    }
    setTitre('')
    setLien('')
    setImage(null)
    setDateDebut('')
    setDateFin('')
    router.refresh()
  }

  async function toggle(p: Publicite) {
    const supabase = createClient()
    await supabase.from('publicites').update({ actif: !p.actif }).eq('id', p.id)
    router.refresh()
  }

  async function remove(id: string) {
    if (!window.confirm('Supprimer cette publicité ?')) return
    const supabase = createClient()
    await supabase.from('publicites').delete().eq('id', id)
    router.refresh()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {publicites.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 rounded-xl border border-marine/10 bg-white p-4"
          >
            <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded">
              <Image src={p.image} alt={p.titre || 'Pub'} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-marine">{p.titre || p.lien}</p>
              <p className="text-xs text-marine/60">
                {p.emplacement} · {p.impressions} impressions · {p.clics} clics
              </p>
            </div>
            <button
              onClick={() => toggle(p)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                p.actif ? 'bg-green-100 text-green-700' : 'bg-marine/10 text-marine/60'
              }`}
            >
              {p.actif ? 'Actif' : 'Inactif'}
            </button>
            <button
              onClick={() => remove(p.id)}
              className="text-xs font-medium text-red-500 hover:underline"
            >
              Supprimer
            </button>
          </div>
        ))}
        {publicites.length === 0 && (
          <p className="rounded-xl border border-marine/10 bg-white p-8 text-center text-marine/50">
            Aucune publicité.
          </p>
        )}
      </div>

      <div className="space-y-3 rounded-xl border border-marine/10 bg-white p-4">
        <h2 className="font-serif text-lg font-bold text-marine">Nouvelle publicité</h2>
        <Field label="Titre">
          <input className={inputClass} value={titre} onChange={(e) => setTitre(e.target.value)} />
        </Field>
        <Field label="Lien">
          <input
            className={inputClass}
            value={lien}
            onChange={(e) => setLien(e.target.value)}
            placeholder="https://"
          />
        </Field>
        <Field label="Emplacement">
          <select
            className={inputClass}
            value={emplacement}
            onChange={(e) => setEmplacement(e.target.value)}
          >
            {EMPLACEMENTS.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Début">
            <input
              type="date"
              className={inputClass}
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
            />
          </Field>
          <Field label="Fin">
            <input
              type="date"
              className={inputClass}
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </Field>
        </div>
        <ImageUpload bucket="publicites" value={image} onChange={setImage} label="Visuel" />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          onClick={add}
          className="w-full rounded-md bg-marine px-4 py-2 text-sm font-semibold text-creme hover:bg-bleu"
        >
          Ajouter
        </button>
      </div>
    </div>
  )
}
