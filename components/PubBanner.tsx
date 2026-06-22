import Image from 'next/image'
import { getActivePub } from '@/lib/supabase/queries'

export default async function PubBanner({ emplacement }: { emplacement: string }) {
  let pub = null
  try {
    pub = await getActivePub(emplacement)
  } catch {
    pub = null
  }

  if (!pub) return null

  return (
    <a
      href={pub.lien}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block overflow-hidden rounded-lg border border-or"
    >
      <span className="block bg-or/10 px-3 py-1 text-[10px] uppercase tracking-wide text-marine/60">
        Publicité
      </span>
      <Image
        src={pub.image}
        alt={pub.titre || 'Publicité'}
        width={1200}
        height={300}
        className="h-auto w-full object-cover"
      />
    </a>
  )
}
