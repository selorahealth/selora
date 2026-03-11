'use client'

import { useState } from 'react'
import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight } from 'lucide-react'

function LoginPage(): JSX.Element {
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

        router.push('/patient')
        router.refresh()
    }

    return (
        <div>
            {/* Logo */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 p-[2px]">
                        <div className="w-full h-full bg-[#0A0A0A] rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-orange-500 to-purple-500" />
                        </div>
                    </div>
                    <span className="font-sora text-3xl font-black tracking-tight text-white">
                        Selora<span className="text-purple-500">.</span>
                    </span>
                </div>
                <p className="text-gray-400 text-sm">Patient Portal Access</p>
            </div>

            {/* Card */}
            <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl">
                <h1 className="font-sora text-xl font-bold text-white mb-1">Welcome back</h1>
                <p className="text-gray-500 text-sm mb-6">Sign in to your Selora health workspace</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide">
                                Password
                            </label>
                            <Link href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot?</Link>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-xl py-3.5 mt-2 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Signing in...' : (
                            <>Sign In <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-800/60 text-center">
                    <p className="text-gray-500 text-sm">
                        Don&apos;t have a patient account?{' '}
                        <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
