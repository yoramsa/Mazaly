'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AdresseCard from '@/components/AdresseCard'
import { paysFlag } from '@/lib/utils/pays'
import type { Adresse } from '@/lib/types'

export default function AdressesExplorer({ adresses }: { adresses: Adresse[] }) {
  // Build the list of available countries from the data, ordered France → Israël → autres
  const pays = useMemo(() => {
    const set = new Set(
      adresses.map((a) => a.pays).filter((p): p is string => Boolean(p)),
    )
    const order = ['France', 'Israël']
    return Array.from(set).sort(
      (a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99),
    )
  }, [adresses])

  const [filtre, setFiltre] = useState<string>('all')

  const filtered = useMemo(
    () => (filtre === 'all' ? adresses : adresses.filter((a) => a.pays === filtre)),
    [adresses, filtre],
  )

  const countFor = (p: string) =>
    p === 'all' ? adresses.length : adresses.filter((a) => a.pays === p).length

  if (adresses.length === 0) {
    return (
      <div className="surface mosaic flex flex-col items-center gap-2 px-6 py-16 text-center text-marine/55">
        <span className="text-3xl">🐟</span>
        Aucune adresse publiée pour le moment.
      </div>
    )
  }

  const tabs = pays.length > 1 ? ['all', ...pays] : []

  return (
    <div>
      {tabs.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const active = filtre === tab
            const label = tab === 'all' ? 'Tous les pays' : `${paysFlag(tab)} ${tab}`
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFiltre(tab)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  active ? 'text-white' : 'text-marine/70 hover:text-marine'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="adresse-filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-gradient shadow-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {!active && (
                  <span className="absolute inset-0 -z-10 rounded-full border border-marine/10 bg-white/70 backdrop-blur" />
                )}
                {label}
                <span className={active ? 'ml-1.5 opacity-80' : 'ml-1.5 opacity-50'}>
                  {countFor(tab)}
                </span>
              </button>
            )
          })}
        </div>
      )}

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((adresse) => (
            <motion.div
              key={adresse.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <AdresseCard adresse={adresse} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="surface mosaic mt-2 flex flex-col items-center gap-2 px-6 py-14 text-center text-marine/55">
          <span className="text-3xl">🐟</span>
          Aucune adresse pour ce pays pour le moment.
        </div>
      )}
    </div>
  )
}
