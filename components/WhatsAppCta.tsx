import { WHATSAPP_CHANNEL_URL } from '@/lib/config'
import { WhatsAppIcon } from '@/components/ui/icons'

/** Bouton « Rejoindre la chaîne WhatsApp », vert WhatsApp. */
export function WhatsAppButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#0B3B24] shadow-lift transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 ${className}`}
    >
      <WhatsAppIcon size={18} />
      Rejoindre la chaîne
    </a>
  )
}

/**
 * Panneau sombre invitant à rejoindre la chaîne WhatsApp.
 * Même gabarit que NewsletterCta, dont il prend la place.
 */
export default function WhatsAppCta({
  title = 'Rejoignez la chaîne WhatsApp de Mazaly',
  description = "Toute l'actualité de la communauté francophone en Israël, directement sur votre téléphone. Gratuit, sans spam, et vous partez quand vous voulez.",
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 text-center shadow-lift md:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-60 w-60 rounded-full bg-[#25D366]/20 blur-[90px]" />
        <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full bg-mauve/25 blur-[90px]" />
      </div>
      <div className="relative mx-auto max-w-lg">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#25D366]">
          <WhatsAppIcon size={28} />
        </span>
        <h2 className="mt-5 font-serif text-3xl font-bold text-creme md:text-4xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-md text-creme/70">{description}</p>
        <div className="mt-8">
          <WhatsAppButton />
        </div>
      </div>
    </div>
  )
}
