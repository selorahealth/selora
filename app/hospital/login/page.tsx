'use client'

import { useState } from 'react'
import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight, Building2, ShieldCheck } from 'lucide-react'

export default function HospitalLoginPage(): JSX.Element {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const supabase = createClient()

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
            return
        }

        router.push('/hospital/dashboard')
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans selection:bg-blue-200 selection:text-blue-900">
            {/* Ambient background styling */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100 opacity-60 blur-[120px]" />
                <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] rounded-full bg-teal-50 opacity-60 blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo area */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-md bg-blue-600 p-[2px] shadow-sm">
                            <div className="w-full h-full bg-white rounded-sm flex items-center justify-center">
                                <div className="w-3 h-3 rounded-sm bg-blue-600" />
                            </div>
                        </div>
                        <span className="font-sora text-2xl font-bold tracking-tight text-slate-900">
                            Selora<span className="text-blue-600 text-[10px] align-top leading-none ml-1 uppercase">Hospital</span>
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm">Provider Access Portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                        <div>
                            <h1 className="font-sora text-xl font-bold text-slate-900">Log In</h1>
                            <p className="text-slate-500 text-xs mt-1">Access your institutional workspace</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-3 mb-5 flex items-start gap-2">
                            <span className="text-lg leading-none mt-0.5">&times;</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                                Institutional Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="biller@hospital.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                    Secure Password
                                </label>
                                <Link href="#" className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors">Recover</Link>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl py-3.5 mt-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
                        >
                            {loading ? 'Authenticating...' : (
                                <>Authenticate Session <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-5 bg-blue-50/50 -mx-8 -mb-8 p-6 rounded-b-2xl border-t border-slate-100 flex items-start gap-4">
                        <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0 opacity-80" />
                        <div>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                Institutional access requires verified KYC. If your hospital is not yet onboarded, you cannot access this portal.
                            </p>
                            <div className="mt-2 text-sm">
                                <Link href="/hospital/signup" className="text-blue-600 hover:text-blue-800 font-bold transition-colors">
                                    Begin Onboarding Application &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                     <Link href="/" className="text-xs text-slate-500 font-semibold hover:text-slate-800 transition-colors uppercase tracking-widest">
                        Return to Main Site
                     </Link>
                </div>
            </div>
        </div>
    )
}
