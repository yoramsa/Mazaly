import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { slugify } from '@/lib/utils/slug'

const BUCKETS = ['articles', 'adresses', 'publicites']

export async function POST(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (!profile || (profile.role !== 'admin' && profile.role !== 'redacteur')) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  const form = await request.formData()
  const file = form.get('file')
  const bucket = String(form.get('bucket') || '')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 })
  }
  if (!BUCKETS.includes(bucket)) {
    return NextResponse.json({ error: 'Bucket invalide' }, { status: 400 })
  }

  const admin = createAdminClient()

  const { error: bucketErr } = await admin.storage.createBucket(bucket, { public: true })
  if (bucketErr && !/already exists/i.test(bucketErr.message)) {
    return NextResponse.json({ error: bucketErr.message }, { status: 500 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'image'
  const path = `${Date.now()}-${base}.${ext}`
  const bytes = new Uint8Array(await file.arrayBuffer())

  const { error: upErr } = await admin.storage.from(bucket).upload(path, bytes, {
    contentType: file.type || 'application/octet-stream',
    cacheControl: '3600',
    upsert: false,
  })
  if (upErr) {
    return NextResponse.json({ error: upErr.message }, { status: 500 })
  }

  const { data } = admin.storage.from(bucket).getPublicUrl(path)
  return NextResponse.json({ url: data.publicUrl })
}
