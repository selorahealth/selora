'use client'

import { useState } from 'react'
import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight, Lock, Server } from 'lucide-react'

export default function AdminLoginPage(): JSX.Element {
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

        router.push('/admin/dashboard')
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans selection:bg-indigo-200 selection:text-indigo-900">
            {/* Ambient background styling */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-100 opacity-60 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-slate-200 opacity-60 blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo area */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Image src="/logo.png" alt="Selora Logo" width={32} height={32} className="object-contain" />
                        <span className="font-sora text-2xl font-bold tracking-tight text-slate-900">
                            Selora<span className="text-indigo-600 text-[10px] align-top leading-none ml-1 uppercase">Systems</span>
                        </span>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                        <div>
                            <h1 className="font-sora text-xl font-bold text-slate-900">System Access</h1>
                            <p className="text-slate-500 text-xs mt-1">Authenticate identity for level 4 clearance</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                            <Server className="w-5 h-5 text-indigo-600" />
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
                                Admin Protocol ID
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                autoComplete="off"
                                placeholder="sysadmin@selora.io"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                    Operator Keypass
                                </label>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl py-3.5 mt-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
                        >
                            {loading ? 'Verifying Identity...' : (
                                <>Initialize Session <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-5 bg-indigo-50/50 -mx-8 -mb-8 p-6 rounded-b-2xl border-t border-slate-100 flex items-start gap-4">
                        <Lock className="w-8 h-8 text-indigo-600 shrink-0 opacity-80" />
                        <div>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                Proceeding acknowledges the monitoring of all actions taken within the Selora control plane. Violations result in immediate key revocation.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                     <Link href="/admin" className="text-xs text-slate-500 font-semibold hover:text-slate-800 transition-colors uppercase tracking-widest">
                        Return
                     </Link>
                </div>
            </div>
        </div>
    )
}
