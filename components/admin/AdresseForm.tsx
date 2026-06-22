'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils/slug'
import { Field, inputClass } from '@/components/admin/Field'
import ImageUpload from '@/components/admin/ImageUpload'
import type { Adresse, Categorie } from '@/lib/types'

export default function AdresseForm({
  adresse,
  categories,
}: {
  adresse?: Adresse
  categories: Categorie[]
}) {
  const router = useRouter()
  const isEdit = Boolean(adresse)

  const [nom, setNom] = useState(adresse?.nom ?? '')
  const [slug, setSlug] = useState(adresse?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [description, setDescription] = useState(adresse?.description ?? '')
  const [categorieId, setCategorieId] = useState(adresse?.categorie_id ?? '')
  const [adresseTxt, setAdresseTxt] = useState(adresse?.adresse ?? '')
  const [ville, setVille] = useState(adresse?.ville ?? '')
  const [region, setRegion] = useState(adresse?.region ?? '')
  const [telephone, setTelephone] = useState(adresse?.telephone ?? '')
  const [siteWeb, setSiteWeb] = useState(adresse?.site_web ?? '')
  const [email, setEmail] = useState(adresse?.email ?? '')
  const [instagram, setInstagram] = useState(adresse?.instagram ?? '')
  const [horaires, setHoraires] = useState(adresse?.horaires ?? '')
  const [prixMoyen, setPrixMoyen] = useState(adresse?.prix_moyen ?? '')
  const [image, setImage] = useState<string | null>(adresse?.image ?? null)
  const [statut, setStatut] = useState(adresse?.statut ?? 'draft')
  const [featured, setFeatured] = useState(adresse?.featured ?? false)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function onNomChange(v: string) {
    setNom(v)
    if (!slugTouched) setSlug(slugify(v))
  }

  async function save() {
    setSaving(true)
    setError('')
    const supabase = createClient()

    const payload = {
      nom,
      slug: slug || slugify(nom),
      description: description || null,
      categorie_id: categorieId || null,
      adresse: adresseTxt || null,
      ville: ville || null,
      region: region || null,
      telephone: telephone || null,
      site_web: siteWeb || null,
      email: email || null,
      instagram: instagram || null,
      horaires: horaires || null,
      prix_moyen: prixMoyen || null,
      image,
      statut,
      featured,
    }

    const result = isEdit
      ? await supabase.from('adresses').update(payload).eq('id', adresse!.id)
      : await supabase.from('adresses').insert(payload)

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    router.push('/admin/adresses')
    router.refresh()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <Field label="Nom">
          <input className={inputClass} value={nom} onChange={(e) => onNomChange(e.target.value)} />
        </Field>
        <Field label="Slug">
          <input
            className={inputClass}
            value={slug}
            onChange={(e) => {
              setSlug(slugify(e.target.value))
              setSlugTouched(true)
            }}
          />
        </Field>
        <Field label="Description">
          <textarea
            className={`${inputClass} h-32 resize-y`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Adresse">
            <input className={inputClass} value={adresseTxt} onChange={(e) => setAdresseTxt(e.target.value)} />
          </Field>
          <Field label="Ville">
            <input className={inputClass} value={ville} onChange={(e) => setVille(e.target.value)} />
          </Field>
          <Field label="Région">
            <input className={inputClass} value={region} onChange={(e) => setRegion(e.target.value)} />
          </Field>
          <Field label="Téléphone">
            <input className={inputClass} value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          </Field>
          <Field label="Site web">
            <input className={inputClass} value={siteWeb} onChange={(e) => setSiteWeb(e.target.value)} />
          </Field>
          <Field label="Email">
            <input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Instagram">
            <input className={inputClass} value={instagram} onChange={(e) => setInstagram(e.target.value)} />
          </Field>
          <Field label="Prix moyen">
            <input className={inputClass} value={prixMoyen} onChange={(e) => setPrixMoyen(e.target.value)} />
          </Field>
        </div>
        <Field label="Horaires">
          <textarea
            className={`${inputClass} h-20 resize-y`}
            value={horaires}
            onChange={(e) => setHoraires(e.target.value)}
          />
        </Field>
      </div>

      <div className="space-y-5">
        <div className="space-y-4 rounded-xl border border-marine/10 bg-white p-4">
          <Field label="Statut">
            <select
              className={inputClass}
              value={statut}
              onChange={(e) => setStatut(e.target.value as 'draft' | 'published')}
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
          </Field>
          <Field label="Catégorie">
            <select
              className={inputClass}
              value={categorieId}
              onChange={(e) => setCategorieId(e.target.value)}
            >
              <option value="">— Choisir —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom}
                </option>
              ))}
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm text-marine">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Mettre en avant
          </label>
        </div>

        <div className="rounded-xl border border-marine/10 bg-white p-4">
          <ImageUpload bucket="adresses" value={image} onChange={setImage} label="Image principale" />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={save}
          disabled={saving || !nom}
          className="w-full rounded-md bg-marine px-4 py-2 text-sm font-semibold text-creme hover:bg-bleu disabled:opacity-60"
        >
          {saving ? 'Enregistrement…' : isEdit ? 'Mettre à jour' : "Créer l'adresse"}
        </button>
      </div>
    </div>
  )
}
