import type { JSX } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Building2, LayoutDashboard, Search, LogOut, Settings, Users, QrCode } from 'lucide-react'

export default async function HospitalDashboardLayout({
    children,
}: {
    children: React.ReactNode
}): Promise<JSX.Element> {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/hospital/login')
    }

    // Verify role, if role is not hospital, redirect to root
    const { data: userData } = await supabase
        .from('users')
        .select('role, verification_status, full_name')
        .eq('id', user.id)
        .single()

    if (userData?.role !== 'hospital') {
        redirect('/')
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                            <Building2 className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-sora font-bold text-lg tracking-tight">Selora <span className="text-blue-600 text-[10px] align-top">CLINIC</span></span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <nav className="space-y-1">
                        <Link href="/hospital/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm">
                            <LayoutDashboard className="w-4 h-4" />
                            Overview
                        </Link>
                        <Link href="/hospital/dashboard/patients" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium text-sm transition-colors">
                            <Users className="w-4 h-4" />
                            Patient Roster
                        </Link>
                        <Link href="/hospital/dashboard/scan" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium text-sm transition-colors">
                            <QrCode className="w-4 h-4" />
                            Scan Code
                        </Link>
                    </nav>

                    <div className="mt-8">
                         <div className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Systems</div>
                         <nav className="space-y-1">
                            <Link href="/hospital/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium text-sm transition-colors">
                                <Settings className="w-4 h-4" />
                                Configuration
                            </Link>
                         </nav>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-200">
                     <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
                            {userData?.full_name?.charAt(0) || 'H'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate">{userData?.full_name || 'Hospital Admin'}</div>
                            <div className="text-xs text-slate-500 truncate flex items-center gap-1">
                                {userData?.verification_status === 'verified' ? (
                                    <><div className="w-1.5 h-1.5 bg-green-500 rounded-full"/> Verified</>
                                ) : (
                                    <><div className="w-1.5 h-1.5 bg-amber-500 rounded-full"/> Pending KYC</>
                                )}
                            </div>
                        </div>
                     </div>
                     <form action="/api/auth/signout" method="post">
                        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                     <div>
                        {/* Breadcrumbs or Title could go here */}
                        <div className="text-lg font-bold font-sora">Dashboard Overview</div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text" 
                                placeholder="Search records (Ctrl+K)" 
                                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 text-sm rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-colors w-64"
                            />
                        </div>
                     </div>
                </header>
                <div className="flex-1 overflow-auto p-8">
                    {/* KYC Warning Banner */}
                    {userData?.verification_status !== 'verified' && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-4">
                            <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                <Building2 className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-amber-900">Verification Pending</h4>
                                <p className="text-xs text-amber-700 mt-1 max-w-3xl">
                                    Your institutional account is currently under review by the Selora administrative team. You will not be able to scan patient QR codes or access decrypted records until your medical license and corporate identity are verified.
                                </p>
                            </div>
                        </div>
                    )}
                    {children}
                </div>
            </main>
        </div>
    )
}
