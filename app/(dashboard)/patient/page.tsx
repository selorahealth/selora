import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { FileText, ShieldCheck, Wallet, ArrowRight } from 'lucide-react'

// Note: Server Components don't support Framer Motion natively unless passed to a Client Component.
// Since most of the dashboard is dynamic data fetching, we will structure the layout server-side
// and possibly drop in a client component for animations if needed. For now, simple CSS transitions.

export default async function PatientOverviewPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // 1. Get patient profile
    const { data: profile } = await supabase
        .from('patient_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

    if (!profile) {
        return <div className="p-8 text-center text-red-400">Profile loading error or missing patient record.</div>
    }

    // 2. Get stats concurrently
    const [
        { count: recordsCount },
        { data: consent },
        { data: earnings }
    ] = await Promise.all([
        supabase.from('medical_records').select('*', { count: 'exact', head: true }).eq('patient_id', profile.id),
        supabase.from('consent_settings').select('*').eq('patient_id', profile.id).single(),
        supabase.from('earnings').select('amount_local').eq('patient_id', profile.id),
    ])

    const totalEarnings = (earnings || []).reduce((sum, e) => sum + Number(e.amount_local), 0)
    let activeConsents = 0
    if (consent) {
        if (consent.emergency_access) activeConsents++
        if (consent.research_sharing) activeConsents++
        if (consent.insurance_access) activeConsents++
        if (consent.pharma_studies) activeConsents++
    }

    // 3. Get recent records
    const { data: recentRecords } = await supabase
        .from('medical_records')
        .select('id, title, record_type, created_at, status')
        .eq('patient_id', profile.id)
        .order('created_at', { ascending: false })
        .limit(3)

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h1 className="font-sora text-3xl font-bold text-white mb-2">
                    Welcome back, {profile.full_name?.split(' ')[0] || 'Patient'}
                </h1>
                <p className="text-muted">Here is what is happening with your health data today.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue/10 blur-[50px] rounded-full group-hover:bg-blue/20 transition-all" />
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue" />
                            </div>
                        </div>
                        <div className="mt-auto">
                            <div className="text-3xl font-bold text-white mb-1">{recordsCount || 0}</div>
                            <div className="text-sm text-body">Secured Records</div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 blur-[50px] rounded-full group-hover:bg-mint/20 transition-all" />
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-mint" />
                            </div>
                        </div>
                        <div className="mt-auto">
                            <div className="text-3xl font-bold text-white mb-1">{activeConsents}/4</div>
                            <div className="text-sm text-body">Active Consents</div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-lime/10 blur-[50px] rounded-full group-hover:bg-lime/20 transition-all" />
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center">
                                <Wallet className="w-5 h-5 text-lime" />
                            </div>
                            <Link href="/patient/earnings" className="text-xs text-lime font-medium hover:underline">
                                Withdraw
                            </Link>
                        </div>
                        <div className="mt-auto">
                            <div className="text-3xl font-bold text-white mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                                {profile.currency || 'NGN'} {(totalEarnings).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-sm text-body">Available Balance</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* QR Shortcut */}
                <div className="bg-[#1A1C35] rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-mint/20 to-blue/20 flex items-center justify-center border border-white/10 mb-5 relative overflow-hidden group hover:scale-105 transition-transform cursor-pointer">
                        {/* Placeholder for QR illustration */}
                        <div className="w-12 h-12 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNURGRkFEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIgcnk9IjIiLz48cmVjdCB4PSI3IiB5PSI3IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIi8+PHJlY3QgeD0iMTQiIHk9IjciIHdpZHRoPSIzIiBoZWlnaHQ9IjMiLz48cmVjdCB4PSI3IiB5PSIxNCIgd2lkdGg9IjMiIGhlaWdodD0iMyIvPjxwYXRoIGQ9Ik0xNCAxNGgzdjNoLTMuIi8+PC9zdmc+')] bg-contain bg-center bg-no-repeat opacity-80" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Hospital Visit?</h3>
                    <p className="text-sm text-body mb-6">Generate a one-time secure QR code for doctors to access your records instantly.</p>
                    <Link href="/patient/qr" className="w-full bg-[#111224] hover:bg-[#232540] text-white border border-white/10 rounded-xl py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        Show QR Code <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Recent Records */}
                <div className="lg:col-span-2 bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-2xl p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-sora text-lg font-bold text-white">Recent Records</h3>
                        <Link href="/patient/records" className="text-sm text-blue hover:text-white transition-colors">
                            View all
                        </Link>
                    </div>

                    <div className="flex-1 flex flex-col">
                        {!recentRecords || recentRecords.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                                <div className="w-16 h-16 rounded-full bg-dark4 flex items-center justify-center mb-4">
                                    <FileText className="w-8 h-8 text-muted" />
                                </div>
                                <div className="text-white font-medium mb-1">No records yet</div>
                                <div className="text-sm text-muted mb-4">Your medical history is completely empty.</div>
                                <Link href="/patient/records" className="text-xs bg-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue/90 transition-colors">
                                    Upload First Record
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentRecords.map(record => (
                                    <div key={record.id} className="bg-[#1A1C35] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-blue/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-dark4 flex items-center justify-center text-blue">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white mb-0.5">{record.title}</div>
                                                <div className="text-xs text-muted capitalize">
                                                    {record.record_type.replace('_', ' ')} • {new Date(record.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {record.status === 'active' && (
                                                <span className="px-2.5 py-1 rounded-md bg-mint/10 text-mint text-[10px] font-bold uppercase tracking-wider">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
