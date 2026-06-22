'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ImageUpload({
  bucket,
  value,
  onChange,
  label = 'Image',
}: {
  bucket: string
  value: string | null
  onChange: (url: string | null) => void
  label?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    setUploading(true)
    setError('')
    try {
      const body = new FormData()
      body.append('file', file)
      body.append('bucket', bucket)
      const res = await fetch('/api/upload', { method: 'POST', body })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload impossible')
      onChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload impossible')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-marine">{label}</label>
      {value ? (
        <div className="relative inline-block">
          <Image
            src={value}
            alt="Aperçu"
            width={240}
            height={150}
            className="rounded-md border border-marine/10 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 top-2 rounded-md bg-marine/80 px-2 py-1 text-xs text-creme"
          >
            Retirer
          </button>
        </div>
      ) : (
        <label className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-marine/20 bg-white text-sm text-marine/50 hover:border-bleu">
          {uploading ? 'Téléversement…' : 'Cliquez pour téléverser'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
          />
        </label>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
