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

export function formatDateShort(value: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}
