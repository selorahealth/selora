import type { JSX } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Server, ShieldAlert, Users, LayoutDashboard, Search, LogOut, Settings, Building2 } from 'lucide-react'

export default async function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode
}): Promise<JSX.Element> {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    // Verify role
    const { data: userData } = await supabase
        .from('users')
        .select('role, full_name')
        .eq('id', user.id)
        .single()

    if (userData?.role !== 'admin') {
        redirect('/')
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center">
                            <Server className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-sora font-bold text-lg tracking-tight text-white">Selora <span className="text-indigo-400 text-[10px] align-top">SYSADMIN</span></span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <nav className="space-y-1">
                        <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-indigo-500/20 text-indigo-400 rounded-lg font-medium text-sm">
                            <LayoutDashboard className="w-4 h-4" />
                            Command Center
                        </Link>
                        <Link href="/admin/dashboard/kyc" className="flex items-center justify-between px-3 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium text-sm transition-colors group">
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="w-4 h-4" />
                                KYC Queue
                            </div>
                            <div className="bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                                14
                            </div>
                        </Link>
                        <Link href="/admin/dashboard/institutions" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium text-sm transition-colors">
                            <Building2 className="w-4 h-4" />
                            Institutions
                        </Link>
                        <Link href="/admin/dashboard/patients" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium text-sm transition-colors">
                            <Users className="w-4 h-4" />
                            Network Users
                        </Link>
                    </nav>

                    <div className="mt-8">
                         <div className="px-3 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Infrastructure</div>
                         <nav className="space-y-1">
                            <Link href="/admin/dashboard/nodes" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium text-sm transition-colors">
                                <Server className="w-4 h-4" />
                                Storage Nodes
                            </Link>
                            <Link href="/admin/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium text-sm transition-colors">
                                <Settings className="w-4 h-4" />
                                Global Parameters
                            </Link>
                         </nav>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                     <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0">
                            {userData?.full_name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate text-slate-200">{userData?.full_name || 'System Administrator'}</div>
                            <div className="text-xs text-slate-500 truncate flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"/> Lvl 4 Access
                            </div>
                        </div>
                     </div>
                     <form action="/api/auth/signout" method="post">
                        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg font-medium transition-colors">
                            <LogOut className="w-4 h-4" /> Terminate Session
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                     <div className="text-lg font-bold font-sora">Network Administration</div>
                     <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text" 
                                placeholder="Global Search (Ctrl+K)" 
                                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors w-64"
                            />
                        </div>
                     </div>
                </header>
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
