import { WHATSAPP_CHANNEL_URL } from '@/lib/config'
import NewsletterCta from '@/components/NewsletterCta'
import WhatsAppCta from '@/components/WhatsAppCta'

/**
 * Invitation à suivre Mazaly : chaîne WhatsApp dès que le lien est renseigné
 * dans lib/config.ts, formulaire newsletter sinon.
 */
export default function CommunityCta({
  title,
  showPhone = false,
}: {
  title?: string
  showPhone?: boolean
}) {
  return WHATSAPP_CHANNEL_URL ? (
    <WhatsAppCta title={title} showPhone={showPhone} />
  ) : (
    <NewsletterCta title={title} />
  )
}
