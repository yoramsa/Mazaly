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
    <div className="flex min-h-screen flex-col bg-creme md:flex-row">
      <AdminSidebar role={profile.role} nom={profile.nom || 'Rédaction'} />
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  )
}
