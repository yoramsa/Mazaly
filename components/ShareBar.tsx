'use client'

import { useEffect, useState } from 'react'
import { CheckIcon, InstagramIcon, LinkIcon } from '@/components/ui/icons'

/** Boutons de partage (WhatsApp, Facebook, X, Instagram) + copie du lien. */
export default function ShareBar({ title }: { title: string }) {
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [instaCopied, setInstaCopied] = useState(false)

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const targets = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
  ]

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard indisponible (http, permissions) : on ignore silencieusement
    }
  }

  async function shareToInstagram() {
    // Instagram n'a pas d'URL de partage web : on passe par le partage natif
    // (qui propose Instagram sur mobile), sinon on copie le lien à coller.
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // partage annulé ou indisponible : on bascule sur la copie
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setInstaCopied(true)
      setTimeout(() => setInstaCopied(false), 2500)
    } catch {
      // clipboard indisponible : on ignore silencieusement
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-[0.14em] text-marine/45">
        Partager
      </span>
      {targets.map((t) => (
        <a
          key={t.label}
          href={url ? t.href : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-marine/[0.12] bg-surface/70 px-4 py-1.5 text-xs font-semibold text-marine backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-bleu/40 hover:text-bleu hover:shadow-soft"
        >
          {t.label}
        </a>
      ))}
      <button
        type="button"
        onClick={shareToInstagram}
        className="inline-flex items-center gap-1.5 rounded-full border border-marine/[0.12] bg-surface/70 px-4 py-1.5 text-xs font-semibold text-marine backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-bleu/40 hover:text-bleu hover:shadow-soft"
      >
        {instaCopied ? (
          <>
            <CheckIcon size={13} className="text-green-600" />
            Lien copié !
          </>
        ) : (
          <>
            <InstagramIcon size={13} />
            Instagram
          </>
        )}
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 rounded-full border border-marine/[0.12] bg-surface/70 px-4 py-1.5 text-xs font-semibold text-marine backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-bleu/40 hover:text-bleu hover:shadow-soft"
      >
        {copied ? (
          <>
            <CheckIcon size={13} className="text-green-600" />
            Copié !
          </>
        ) : (
          <>
            <LinkIcon size={13} />
            Copier le lien
          </>
        )}
      </button>
    </div>
  )
}
