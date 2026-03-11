'use client'

import { useState } from 'react'
import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight, Microscope, ShieldAlert } from 'lucide-react'

export default function ResearcherLoginPage(): JSX.Element {
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

        router.push('/researcher/dashboard')
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans selection:bg-teal-200 selection:text-teal-900">
            {/* Ambient background styling */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-100 opacity-60 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-slate-200 opacity-60 blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo area */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Image src="/logo.png" alt="Selora Logo" width={32} height={32} className="object-contain" />
                        <span className="font-sora text-2xl font-bold tracking-tight text-slate-900">
                            Selora<span className="text-teal-600 text-[10px] align-top leading-none ml-1 uppercase">Research</span>
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm">Data Access Portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                        <div>
                            <h1 className="font-sora text-xl font-bold text-slate-900">Sign In</h1>
                            <p className="text-slate-500 text-xs mt-1">Access clinical datasets and queries</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                            <Microscope className="w-5 h-5 text-teal-600" />
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
                                Researcher ID / Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                autoComplete="off"
                                placeholder="researcher@university.edu"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all shadow-sm"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                    Secure Password
                                </label>
                                <Link href="#" className="text-xs text-teal-600 hover:text-teal-700 font-semibold transition-colors">Recover Keys</Link>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all shadow-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl py-3.5 mt-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-teal-600/20"
                        >
                            {loading ? 'Authenticating...' : (
                                <>Access Data Portal <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-5 bg-teal-50/50 -mx-8 -mb-8 p-6 rounded-b-2xl border-t border-slate-100 flex items-start gap-4">
                        <ShieldAlert className="w-8 h-8 text-teal-600 shrink-0 opacity-80" />
                        <div>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                Access to raw anonymized patient data is tightly monitored. Researchers must adhere strictly to demographic querying limits.
                            </p>
                            <div className="mt-2 text-sm">
                                <Link href="/researcher/signup" className="text-teal-600 hover:text-teal-800 font-bold transition-colors">
                                    Apply for Institute Key &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                     <Link href="/researcher" className="text-xs text-slate-500 font-semibold hover:text-slate-800 transition-colors uppercase tracking-widest">
                        Return to Research Home
                     </Link>
                </div>
            </div>
        </div>
    )
}
