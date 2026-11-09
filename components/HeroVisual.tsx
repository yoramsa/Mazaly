'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current || !window.matchMedia('(pointer: fine)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    ref.current.style.setProperty('--px', `${x * 18}px`)
    ref.current.style.setProperty('--py', `${y * 18}px`)
  }

  function onMouseLeave() {
    ref.current?.style.setProperty('--px', '0px')
    ref.current?.style.setProperty('--py', '0px')
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative mx-auto aspect-square w-full max-w-sm"
      style={{ ['--px' as string]: '0px', ['--py' as string]: '0px' }}
    >
      <div
        className="absolute inset-6 rounded-[2.5rem] bg-brand-gradient opacity-90 blur-2xl transition-transform duration-300 ease-out"
        style={{ transform: 'translate(calc(var(--px) * -0.6), calc(var(--py) * -0.6))' }}
      />
      <div
        className="glass relative flex h-full w-full items-center justify-center rounded-[2.5rem] shadow-lift transition-transform duration-300 ease-out"
        style={{ transform: 'translate(var(--px), var(--py))' }}
      >
        <Image
          src="/mazaly-icon.png"
          alt="Mazaly"
          width={300}
          height={300}
          priority
          className="w-3/5 animate-float drop-shadow-[0_20px_40px_rgba(74,111,212,0.35)]"
        />
      </div>
    </div>
  )
}
