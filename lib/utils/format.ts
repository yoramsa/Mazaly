/**
 * Nom d'auteur affichable publiquement.
 * Supabase renseigne `profiles.nom` avec l'email quand le compte n'a pas de nom :
 * on n'affiche jamais une adresse email sur le site.
 */
export function authorName(nom: string | null | undefined): string | null {
  const value = nom?.trim()
  if (!value) return null
  if (value.includes('@')) return null
  return value
}

export function formatDate(value: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatTime(value: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/** Temps de lecture estimé (~200 mots/min) à partir d'un contenu HTML. */
export function readingTimeMinutes(html: string | null): number {
  if (!html) return 1
  const words = html
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatDateShort(value: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}
