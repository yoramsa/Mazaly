'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DeleteButton({
  table,
  id,
  label = 'Supprimer',
}: {
  table: string
  id: string
  label?: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function remove() {
    if (!window.confirm('Confirmer la suppression ?')) return
    setLoading(true)
    const supabase = createClient()
    await supabase.from(table).delete().eq('id', id)
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={remove}
      disabled={loading}
      className="text-xs font-medium text-red-500 hover:underline disabled:opacity-50"
    >
      {loading ? '…' : label}
    </button>
  )
}
