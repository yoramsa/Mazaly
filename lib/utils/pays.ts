export const PAYS_LIST = ['France', 'Israël'] as const

export function paysFlag(pays?: string | null): string {
  switch ((pays || '').toLowerCase()) {
    case 'france':
      return '🇫🇷'
    case 'israël':
    case 'israel':
      return '🇮🇱'
    default:
      return '📍'
  }
}
