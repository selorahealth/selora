'use client'

import { useState } from 'react'
import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const COUNTRIES = [
    { code: 'NG', name: 'Nigeria', currency: 'NGN' },
    { code: 'GH', name: 'Ghana', currency: 'GHS' },
    { code: 'KE', name: 'Kenya', currency: 'KES' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
    { code: 'US', name: 'United States', currency: 'USD' },
]

export default function SignupPage(): JSX.Element {
    const router = useRouter()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [country, setCountry] = useState('NG')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const selectedCountry = COUNTRIES.find(c => c.code === country)

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                role: 'patient',
                fullName,
                country,
                currency: selectedCountry?.currency || 'NGN',
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error || 'Something went wrong')
            setLoading(false)
            return
        }

        router.push('/login?signup=success')
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
                <p className="text-gray-400 text-sm">Create your health vault</p>
            </div>

            <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl">
                <Link
                    href="/"
                    className="text-gray-500 text-sm mb-6 inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to home
                </Link>

                <h1 className="font-sora text-xl font-bold text-white mb-1">Patient Registration</h1>
                <p className="text-gray-500 text-sm mb-6">
                    Join Selora to securely manage your medical history.
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            required
                            placeholder="Kwame Osei"
                            className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

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
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            minLength={8}
                            placeholder="At least 8 characters"
                            className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                            Country
                        </label>
                        <select
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            className="w-full bg-[#0A0A0A] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-purple-500 transition-colors appearance-none"
                        >
                            {COUNTRIES.map(c => (
                                <option key={c.code} value={c.code}>
                                    {c.name} ({c.currency})
                                </option>
                            ))}
                        </select>
                    </div>

                    <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                        By registering, you agree to our <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a> and acknowledge our <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a> governing zero-knowledge health data.
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-xl py-3.5 mt-2 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Creating secure vault...' : (
                            <>Create Account <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-800/60 text-center">
                    <p className="text-gray-500 text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}