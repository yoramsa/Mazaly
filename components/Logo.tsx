import Image from 'next/image'
import Link from 'next/link'

export default function Logo({
  light = false,
  size = 40,
}: {
  light?: boolean
  size?: number
}) {
  return (
    <Link
      href="/"
      aria-label="Mazaly — accueil"
      className="group flex items-center gap-2.5"
    >
      <span
        className="relative inline-flex shrink-0 items-center justify-center transition-transform duration-500 ease-premium group-hover:scale-105 group-hover:rotate-[-3deg]"
        style={{ width: size, height: size }}
      >
        <Image
          src="/mazaly-icon.png"
          alt="Mazaly"
          width={size}
          height={size}
          priority
          className="h-full w-full object-contain drop-shadow-[0_4px_10px_rgba(74,111,212,0.25)]"
        />
      </span>
      <span
        className={`font-serif text-[1.55rem] font-bold leading-none tracking-tight ${
          light ? 'text-creme' : 'text-marine'
        }`}
      >
        Mazaly
      </span>
    </Link>
  )
}
