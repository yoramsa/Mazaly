const DIACRITICS = /[̀-ͯ]/g
const NON_SLUG = /[^a-z0-9\s-]/g
const SEPARATORS = /[\s_-]+/g
const EDGES = /^-+|-+$/g

export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .toLowerCase()
    .trim()
    .replace(NON_SLUG, '')
    .replace(SEPARATORS, '-')
    .replace(EDGES, '')
}

export function uniqueSlug(base: string, suffix?: string | number): string {
  const slug = slugify(base)
  if (suffix === undefined || suffix === null || suffix === '') return slug
  return `${slug}-${suffix}`
}
