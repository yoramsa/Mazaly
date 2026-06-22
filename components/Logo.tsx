import Link from 'next/link'

export default function Logo({ light = false }: { light?: boolean }) {
  const textColor = light ? 'text-creme' : 'text-marine'
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg width="38" height="38" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#4A6FD4" opacity="0.12" />
        <circle cx="32" cy="32" r="30" stroke="#4A6FD4" strokeWidth="2" />
        <path
          d="M14 32c6-10 22-10 28 0-6 10-22 10-28 0z"
          fill="#7B5EA7"
        />
        <path d="M42 24l8 8-8 8 3-8-3-8z" fill="#7B5EA7" />
        <circle cx="24" cy="30" r="2.2" fill="#FAF8F5" />
        <path
          d="M34 20l3.5 6h-7L34 20zM34 32l-3.5-6h7L34 32z"
          stroke="#C9A84C"
          strokeWidth="1.6"
          fill="none"
        />
      </svg>
      <span className={`font-serif text-2xl font-bold tracking-tight ${textColor}`}>
        Mazaly
      </span>
    </Link>
  )
}
