'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MoonIcon, SunIcon } from '@/components/ui/icons'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const shell = document.getElementById('site-shell')
    setDark(Boolean(shell?.classList.contains('dark')))
    setMounted(true)
  }, [])

  function toggle() {
    const shell = document.getElementById('site-shell')
    if (!shell) return
    const next = !shell.classList.contains('dark')
    shell.classList.toggle('dark', next)
    try {
      localStorage.setItem('mazaly-theme', next ? 'dark' : 'light')
    } catch {
      // stockage indisponible : on ignore
    }
    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-marine/10 bg-surface/70 text-marine backdrop-blur transition-colors hover:bg-surface ${className}`}
    >
      {mounted && (
        <motion.span
          key={dark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {dark ? <MoonIcon size={17} /> : <SunIcon size={17} />}
        </motion.span>
      )}
    </button>
  )
}
