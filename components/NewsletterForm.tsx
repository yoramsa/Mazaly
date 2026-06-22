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
    ? 'w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-creme shadow-inset backdrop-blur transition-all duration-200 placeholder:text-creme/45 focus:border-or/60 focus:bg-white/15 focus:outline-none focus:ring-4 focus:ring-or/10'
    : 'input-premium'

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
        className={
          dark
            ? 'w-full rounded-full bg-or px-5 py-3 text-sm font-semibold text-marine transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-lift disabled:opacity-60'
            : 'btn-primary w-full py-3'
        }
      >
        {status === 'loading' ? 'Inscription…' : "S'inscrire"}
      </button>
      {message && (
        <p
          className={`text-xs ${
            status === 'error'
              ? 'text-red-400'
              : dark
                ? 'text-or'
                : 'text-bleu'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
