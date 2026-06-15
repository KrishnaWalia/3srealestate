import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/sidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')
  if (!['ADMIN', 'SUPER_ADMIN', 'AGENT'].includes(session.user.role as string)) redirect('/')

  return (
    <div className="flex min-h-screen bg-charcoal-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-charcoal-900 border-b border-white/10 flex items-center justify-between px-6 shrink-0">
          <div />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-white text-sm font-medium leading-none">{session.user.name}</p>
              <p className="text-white/40 text-xs mt-0.5">{(session.user.role as string)?.replace('_', ' ')}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-white font-bold text-sm shadow-gold">
              {session.user.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}