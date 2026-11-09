'use client'

import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function TiltCard({
  children,
  className = '',
  max = 8,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  max?: number
  as?: 'div' | 'article'
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce || !ref.current || !window.matchMedia('(pointer: fine)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`
  }

  function onMouseLeave() {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </Tag>
  )
}
