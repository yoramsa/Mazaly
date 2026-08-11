import { WHATSAPP_CHANNEL_URL } from '@/lib/config'
import NewsletterCta from '@/components/NewsletterCta'
import WhatsAppCta from '@/components/WhatsAppCta'

/**
 * Invitation à suivre Mazaly : chaîne WhatsApp dès que le lien est renseigné
 * dans lib/config.ts, formulaire newsletter sinon.
 */
export default function CommunityCta({ title }: { title?: string }) {
  return WHATSAPP_CHANNEL_URL ? <WhatsAppCta title={title} /> : <NewsletterCta title={title} />
}
