'use client'

import { motion, useReducedMotion } from 'framer-motion'

const messages = [
  { from: 'them', text: 'Bienvenue sur la chaîne Mazaly 👋' },
  { from: 'them', text: "L'actu de la communauté, directement ici." },
  { from: 'me', text: 'Trop bien, je rejoins 🙌' },
  { from: 'them', text: 'Gratuit, sans spam. À tout de suite !' },
]

export default function PhoneMockup() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto w-[220px] select-none sm:w-[240px]">
      <div className="relative rounded-[2.2rem] border-[6px] border-black/40 bg-black/40 p-1.5 shadow-lift">
        <div className="absolute left-1/2 top-2.5 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-black/50" />
        <div className="flex h-[440px] flex-col overflow-hidden rounded-[1.6rem] bg-[#e5ddd0] px-3 pb-4 pt-8">
          <div className="flex flex-col gap-2">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 10, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: reduce ? 0 : i * 0.55, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`max-w-[80%] rounded-xl px-3 py-2 text-[0.72rem] leading-snug shadow-sm ${
                  m.from === 'me'
                    ? 'ml-auto bg-[#dcf8c6] text-[#0b2e13]'
                    : 'bg-white text-[#1b1b1b]'
                }`}
              >
                {m.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
