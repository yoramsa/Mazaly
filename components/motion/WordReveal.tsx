'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function WordReveal({
  text,
  className = '',
  gradientWords = [],
  delay = 0,
}: {
  text: string
  className?: string
  gradientWords?: string[]
  delay?: number
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span key={i} className={gradientWords.includes(w) ? 'text-gradient' : ''}>
            {w}{' '}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            initial={{ opacity: 0, y: '60%', filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
            transition={{
              duration: 0.65,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block ${gradientWords.includes(word) ? 'text-gradient' : ''}`}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
