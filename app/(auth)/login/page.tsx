'use client'

import { useState } from 'react'
import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

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

        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
            return
        }

        // Get user role and redirect to correct dashboard
        const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', data.user.id)
            .single()

        const role = userData?.role || 'patient'
        router.push(`/${role}`)
        router.refresh()
    }

    return (
        <div>
            {/* Logo */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-3">
                    <span className="font-sora text-3xl font-black text-white tracking-tight">
                        Selora<span className="text-[#5DFFAD]">.</span>
                    </span>
                </div>
                <p className="text-[#A0A4C8] text-sm">Your health story, everywhere you go.</p>
            </div>

            {/* Card */}
            <div className="bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-2xl p-8">
                <h1 className="font-sora text-xl font-700 text-white mb-1">Welcome back</h1>
                <p className="text-[#6B6F8E] text-sm mb-6">Sign in to your Selora account</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-[#A0A4C8] mb-1.5 uppercase tracking-wide">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            className="w-full bg-[#1A1C35] border border-[rgba(97,131,255,0.15)] rounded-xl px-4 py-3 text-white text-sm placeholder-[#6B6F8E] outline-none focus:border-[#6183FF] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-[#A0A4C8] mb-1.5 uppercase tracking-wide">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-[#1A1C35] border border-[rgba(97,131,255,0.15)] rounded-xl px-4 py-3 text-white text-sm placeholder-[#6B6F8E] outline-none focus:border-[#6183FF] transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#6183FF] hover:bg-[#7394FF] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl py-3 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-[rgba(97,131,255,0.1)] text-center">
                    <p className="text-[#6B6F8E] text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-[#6183FF] hover:text-[#7394FF] font-medium transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
