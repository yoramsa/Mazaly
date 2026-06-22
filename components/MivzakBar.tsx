import { getMivzakim } from '@/lib/supabase/queries'
import MivzakTicker from './MivzakTicker'

export default async function MivzakBar() {
  const items = await getMivzakim(15).catch(() => [])
  return <MivzakTicker items={items} />
}
