import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/lib/types'

export async function getProfile(): Promise<Profile | null> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  return data as Profile | null
}

export async function requireStaff(): Promise<Profile> {
  const profile = await getProfile()
  if (!profile) redirect('/login?redirect=/admin')
  if (profile.role !== 'admin' && profile.role !== 'redacteur') {
    redirect('/login?error=forbidden')
  }
  return profile
}

export async function requireAdmin(): Promise<Profile> {
  const profile = await requireStaff()
  if (profile.role !== 'admin') redirect('/admin')
  return profile
}
