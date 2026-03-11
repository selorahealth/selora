'use client'

import { useState } from 'react'
import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight, ArrowLeft } from 'lucide-react'

function LoginPage(): JSX.Element {
    const router = useRouter()
    const [authMethod, setAuthMethod] = useState<'email' | null>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleEmailLogin(e: React.FormEvent) {
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

    async function handleGoogleLogin() {
        setLoading(true)
        setError('')
        const supabase = createClient()
        
        const { error: authError } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            }
        })

        if (authError) {
            setError(authError.message)
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Logo */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                    <Image src="/logo.png" alt="Selora Logo" width={32} height={32} className="object-contain" />
                    <span className="font-sora text-3xl font-black tracking-tight text-text">
                        Selora<span className="text-blue">.</span>
                    </span>
                </div>
                <p className="text-body text-sm">Patient Portal Access</p>
            </div>

            {/* Card */}
            <div className="bg-dark2 border border-border rounded-2xl p-8 shadow-2xl">
                {!authMethod && (
                    <>
                        <h1 className="font-sora text-xl font-bold text-text mb-1 text-center">Welcome back</h1>
                        <p className="text-body text-sm mb-6 text-center">Sign in to your Selora health workspace</p>
                        
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl p-3 mb-4">
                                {error}
                            </div>
                        )}

                        <div className="space-y-3">
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full bg-dark hover:bg-dark3 border border-border text-text font-semibold text-sm rounded-xl py-3.5 transition-all duration-200 flex items-center justify-center gap-3"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                                    <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.71 16.69 5.84 14.09H2.17V16.94C3.98 20.53 7.69 23 12 23Z" fill="#34A853"/>
                                    <path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.06H2.17C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.17 16.94L5.84 14.09Z" fill="#FBBC05"/>
                                    <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.35 3.87C17.45 2.09 14.97 1 12 1C7.69 1 3.98 3.47 2.17 7.06L5.84 9.91C6.71 7.31 9.13 5.38 12 5.38Z" fill="#EA4335"/>
                                </svg>
                                {loading ? 'Redirecting...' : 'Continue with Google'}
                            </button>
                            <button
                                onClick={() => setAuthMethod('email')}
                                className="w-full bg-text hover:opacity-90 text-dark font-semibold text-sm rounded-xl py-3.5 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                Continue with Email
                            </button>
                        </div>
                    </>
                )}

                {authMethod === 'email' && (
                    <>
                        <button 
                            onClick={() => setAuthMethod(null)}
                            className="text-body text-sm mb-6 inline-flex items-center gap-1 hover:text-text transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                        
                        <h1 className="font-sora text-xl font-bold text-text mb-1">Email Sign In</h1>
                        <p className="text-body text-sm mb-6">Enter your email and password to continue</p>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl p-3 mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-body mb-1.5 uppercase tracking-wide">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    autoComplete="off"
                                    placeholder="you@example.com"
                                    className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text text-sm placeholder:text-muted outline-none focus:border-blue transition-colors"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="block text-xs font-medium text-body uppercase tracking-wide">
                                        Password
                                    </label>
                                    <Link href="#" className="text-xs text-blue hover:text-mint transition-colors">Forgot?</Link>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className="w-full bg-dark border border-border rounded-xl px-4 py-3 text-text text-sm placeholder:text-muted outline-none focus:border-blue transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-text hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-dark font-semibold text-sm rounded-xl py-3.5 mt-2 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Signing in...' : (
                                    <>Sign In <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </form>
                    </>
                )}

                <div className="mt-6 pt-6 border-t border-border text-center">
                    <p className="text-body text-sm">
                        Don&apos;t have a patient account?{' '}
                        <Link href="/signup" className="text-blue hover:text-mint font-medium transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
