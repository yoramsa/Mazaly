import { WHATSAPP_CHANNEL_URL } from '@/lib/config'
import { WhatsAppIcon } from '@/components/ui/icons'
import PhoneMockup from '@/components/motion/PhoneMockup'

/** Bouton « Rejoindre la chaîne WhatsApp », vert WhatsApp. */
export function WhatsAppButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#0B3B24] shadow-lift transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 motion-safe:animate-pulse-ring ${className}`}
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
  showPhone = false,
}: {
  title?: string
  description?: string
  showPhone?: boolean
}) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0b3b24] via-[#0e2b1c] to-ink px-6 py-14 text-center shadow-lift md:px-12 md:py-16 md:text-left">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-60 w-60 rounded-full bg-[#25D366]/25 blur-[90px] motion-safe:animate-blob" />
        <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full bg-mauve/25 blur-[90px] motion-safe:animate-blob-slow" />
      </div>
      <div
        className={`relative mx-auto flex max-w-lg flex-col items-center gap-10 md:max-w-none md:flex-row md:items-center md:justify-between ${
          showPhone ? '' : 'md:mx-auto md:max-w-lg md:text-center'
        }`}
      >
        <div className={showPhone ? 'md:max-w-md' : ''}>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#25D366]">
            <WhatsAppIcon size={28} />
          </span>
          <h2 className="mt-5 font-serif text-3xl font-bold text-creme md:text-4xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-md text-creme/70 md:mx-0">{description}</p>
          <div className="mt-8">
            <WhatsAppButton />
          </div>
        </div>
        {showPhone && (
          <div className="shrink-0">
            <PhoneMockup />
          </div>
        )}
      </div>
    </div>
  )
}
