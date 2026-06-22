'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils/slug'
import { Field, inputClass } from '@/components/admin/Field'
import ImageUpload from '@/components/admin/ImageUpload'
import Editor from '@/components/admin/Editor'
import type { Article, Categorie, Tag } from '@/lib/types'

export default function ArticleForm({
  article,
  categories,
  tags,
  selectedTagIds = [],
  authorId,
}: {
  article?: Article
  categories: Categorie[]
  tags: Tag[]
  selectedTagIds?: string[]
  authorId: string
}) {
  const router = useRouter()
  const isEdit = Boolean(article)

  const [titre, setTitre] = useState(article?.titre ?? '')
  const [slug, setSlug] = useState(article?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [extrait, setExtrait] = useState(article?.extrait ?? '')
  const [contenu, setContenu] = useState(article?.contenu ?? '')
  const [imageCover, setImageCover] = useState<string | null>(article?.image_cover ?? null)
  const [categorieId, setCategorieId] = useState(article?.categorie_id ?? '')
  const [statut, setStatut] = useState(article?.statut ?? 'draft')
  const [featured, setFeatured] = useState(article?.featured ?? false)
  const [tagIds, setTagIds] = useState<string[]>(selectedTagIds)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function onTitreChange(v: string) {
    setTitre(v)
    if (!slugTouched) setSlug(slugify(v))
  }

  function toggleTag(id: string) {
    setTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  async function save() {
    setSaving(true)
    setError('')
    const supabase = createClient()

    const payload = {
      titre,
      slug: slug || slugify(titre),
      extrait: extrait || null,
      contenu,
      image_cover: imageCover,
      categorie_id: categorieId || null,
      statut,
      featured,
      auteur_id: authorId,
      published_at:
        statut === 'published'
          ? article?.published_at ?? new Date().toISOString()
          : null,
    }

    let articleId = article?.id

    if (isEdit && articleId) {
      const { error: upErr } = await supabase
        .from('articles')
        .update(payload)
        .eq('id', articleId)
      if (upErr) {
        setError(upErr.message)
        setSaving(false)
        return
      }
    } else {
      const { data, error: insErr } = await supabase
        .from('articles')
        .insert(payload)
        .select('id')
        .single()
      if (insErr || !data) {
        setError(insErr?.message ?? 'Création impossible')
        setSaving(false)
        return
      }
      articleId = data.id
    }

    if (articleId) {
      await supabase.from('articles_tags').delete().eq('article_id', articleId)
      if (tagIds.length > 0) {
        await supabase
          .from('articles_tags')
          .insert(tagIds.map((tag_id) => ({ article_id: articleId, tag_id })))
      }
    }

    router.push('/admin/articles')
    router.refresh()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <Field label="Titre">
          <input
            className={inputClass}
            value={titre}
            onChange={(e) => onTitreChange(e.target.value)}
            placeholder="Titre de l'article"
          />
        </Field>
        <Field label="Slug" hint="Identifiant unique dans l'URL.">
          <input
            className={inputClass}
            value={slug}
            onChange={(e) => {
              setSlug(slugify(e.target.value))
              setSlugTouched(true)
            }}
          />
        </Field>
        <Field label="Extrait" hint="Résumé affiché dans les listes et le SEO.">
          <textarea
            className={`${inputClass} h-20 resize-y`}
            value={extrait}
            onChange={(e) => setExtrait(e.target.value)}
          />
        </Field>
        <Field label="Contenu">
          <Editor value={contenu} onChange={setContenu} />
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
                  {c.nom} ({c.type})
                </option>
              ))}
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm text-marine">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Mettre à la une
          </label>
        </div>

        <div className="rounded-xl border border-marine/10 bg-white p-4">
          <ImageUpload
            bucket="articles"
            value={imageCover}
            onChange={setImageCover}
            label="Image de couverture"
          />
        </div>

        <div className="rounded-xl border border-marine/10 bg-white p-4">
          <p className="mb-2 text-sm font-medium text-marine">Tags</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  tagIds.includes(tag.id)
                    ? 'border-bleu bg-bleu text-white'
                    : 'border-marine/20 text-marine'
                }`}
              >
                {tag.nom}
              </button>
            ))}
            {tags.length === 0 && <p className="text-xs text-marine/50">Aucun tag créé.</p>}
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={save}
          disabled={saving || !titre}
          className="w-full rounded-md bg-marine px-4 py-2 text-sm font-semibold text-creme hover:bg-bleu disabled:opacity-60"
        >
          {saving ? 'Enregistrement…' : isEdit ? 'Mettre à jour' : "Créer l'article"}
        </button>
      </div>
    </div>
  )
}
