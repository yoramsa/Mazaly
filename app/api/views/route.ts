import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { slug } = await request.json()
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'Slug requis' }, { status: 400 })
    }
    const supabase = createClient()
    await supabase.rpc('increment_vues', { article_slug: slug })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
