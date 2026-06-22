'use client'

import type { Newsletter } from '@/lib/types'

export default function NewsletterExport({ abonnes }: { abonnes: Newsletter[] }) {
  function exportCsv() {
    const header = 'email,nom,actif,date\n'
    const rows = abonnes
      .map((a) => {
        const nom = (a.nom ?? '').replace(/"/g, '""')
        const date = new Date(a.created_at).toISOString().slice(0, 10)
        return `"${a.email}","${nom}",${a.actif},${date}`
      })
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `mazaly-newsletter-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={exportCsv}
      disabled={abonnes.length === 0}
      className="rounded-md bg-or px-4 py-2 text-sm font-semibold text-marine hover:opacity-90 disabled:opacity-50"
    >
      Exporter CSV
    </button>
  )
}
