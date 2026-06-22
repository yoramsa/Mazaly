'use client'

import { useState } from 'react'

export default function NewsletterForm({
  variant = 'light',
}: {
  variant?: 'light' | 'dark'
}) {
  const [email, setEmail] = useState('')
  const [nom, setNom] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nom }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur')
      setStatus('ok')
      setMessage('Merci ! Votre inscription est confirmée.')
      setEmail('')
      setNom('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  const dark = variant === 'dark'
  const inputClass = dark
    ? 'w-full rounded-md border border-creme/30 bg-creme/10 px-3 py-2 text-sm text-creme placeholder:text-creme/50 focus:border-or focus:outline-none'
    : 'w-full rounded-md border border-marine/20 bg-white px-3 py-2 text-sm text-marine placeholder:text-marine/40 focus:border-bleu focus:outline-none'

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="Votre prénom"
        className={inputClass}
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre email"
        className={inputClass}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-md bg-or px-4 py-2 text-sm font-semibold text-marine transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === 'loading' ? 'Inscription…' : "S'inscrire"}
      </button>
      {message && (
        <p className={`text-xs ${status === 'error' ? 'text-red-400' : dark ? 'text-or' : 'text-bleu'}`}>
          {message}
        </p>
      )}
    </form>
  )
}
