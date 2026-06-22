import { createClient } from '@/lib/supabase/server'
import type { Article, Adresse, Publicite, Mivzak } from '@/lib/types'

export async function getMivzakim(limit = 12) {
  const supabase = createClient()
  const { data } = await supabase
    .from('mivzakim')
    .select('*')
    .eq('actif', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data ?? []) as Mivzak[]
}

export async function getFeaturedArticles(limit = 3) {
  const supabase = createClient()
  const { data } = await supabase
    .from('articles')
    .select('*, categories(*), profiles(*)')
    .eq('statut', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  return (data ?? []) as Article[]
}

export async function getArticlesByType(type: string, limit?: number) {
  const supabase = createClient()
  let query = supabase
    .from('articles')
    .select('*, categories!inner(*), profiles(*)')
    .eq('statut', 'published')
    .eq('categories.type', type)
    .order('published_at', { ascending: false })
  if (limit) query = query.limit(limit)
  const { data } = await query
  return (data ?? []) as Article[]
}

export async function getArticleBySlug(slug: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('articles')
    .select('*, categories(*), profiles(*)')
    .eq('slug', slug)
    .eq('statut', 'published')
    .single()
  return data as Article | null
}

export async function getFeaturedAdresses(limit = 6) {
  const supabase = createClient()
  const { data } = await supabase
    .from('adresses')
    .select('*, categories(*)')
    .eq('statut', 'published')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data ?? []) as Adresse[]
}

export async function getAdresses() {
  const supabase = createClient()
  const { data } = await supabase
    .from('adresses')
    .select('*, categories(*)')
    .eq('statut', 'published')
    .order('created_at', { ascending: false })
  return (data ?? []) as Adresse[]
}

export async function getAdresseBySlug(slug: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('adresses')
    .select('*, categories(*)')
    .eq('slug', slug)
    .eq('statut', 'published')
    .single()
  return data as Adresse | null
}

export async function getActivePub(emplacement: string) {
  const supabase = createClient()
  const today = new Date().toISOString().slice(0, 10)
  const { data } = await supabase
    .from('publicites')
    .select('*')
    .eq('emplacement', emplacement)
    .eq('actif', true)
    .or(`date_debut.is.null,date_debut.lte.${today}`)
    .or(`date_fin.is.null,date_fin.gte.${today}`)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  return data as Publicite | null
}
