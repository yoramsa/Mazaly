import { requireStaff } from '@/lib/supabase/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Administration',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await requireStaff()

  return (
    <div className="flex min-h-screen bg-creme">
      <AdminSidebar role={profile.role} nom={profile.nom || 'Rédaction'} />
      <main className="flex-1 overflow-x-hidden p-6 md:p-8">{children}</main>
    </div>
  )
}
