'use client'

import { useState } from 'react'
import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const ROLES = [
    { value: 'patient', label: 'Patient', icon: '🧑‍⚕️', desc: 'Own and share your medical records' },
    { value: 'hospital', label: 'Hospital', icon: '🏥', desc: 'Access patient records via QR scan' },
    { value: 'researcher', label: 'Researcher', icon: '🔬', desc: 'Access consented health datasets' },
]

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
    const [step, setStep] = useState<'role' | 'details'>('role')
    const [role, setRole] = useState('')
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
                role,
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
            <div className="text-center mb-8">
                <span className="font-sora text-3xl font-black text-white tracking-tight">
                    Selora<span className="text-[#5DFFAD]">.</span>
                </span>
                <p className="text-[#A0A4C8] text-sm mt-1">Create your account</p>
            </div>

            <div className="bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-2xl p-8">

                {/* STEP 1 — Role */}
                {step === 'role' && (
                    <div>
                        <h1 className="font-sora text-xl font-bold text-white mb-1">Who are you?</h1>
                        <p className="text-[#6B6F8E] text-sm mb-6">Choose the account type that fits you</p>

                        <div className="space-y-3">
                            {ROLES.map(r => (
                                <button
                                    key={r.value}
                                    onClick={() => setRole(r.value)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${role === r.value
                                        ? 'border-[#6183FF] bg-[rgba(97,131,255,0.1)]'
                                        : 'border-[rgba(97,131,255,0.1)] bg-[#1A1C35] hover:border-[rgba(97,131,255,0.3)]'
                                        }`}
                                >
                                    <span className="text-2xl">{r.icon}</span>
                                    <div>
                                        <div className="text-white text-sm font-medium">{r.label}</div>
                                        <div className="text-[#6B6F8E] text-xs mt-0.5">{r.desc}</div>
                                    </div>
                                    {role === r.value && (
                                        <div className="ml-auto w-5 h-5 rounded-full bg-[#6183FF] flex items-center justify-center text-white text-xs">✓</div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setStep('details')}
                            disabled={!role}
                            className="w-full mt-6 bg-[#6183FF] hover:bg-[#7394FF] disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl py-3 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            Continue
                        </button>
                    </div>
                )}

                {/* STEP 2 — Details */}
                {step === 'details' && (
                    <div>
                        <button
                            onClick={() => setStep('role')}
                            className="text-[#6B6F8E] text-sm mb-4 flex items-center gap-1 hover:text-white transition-colors"
                        >
                            ← Back
                        </button>

                        <h1 className="font-sora text-xl font-bold text-white mb-1">Your details</h1>
                        <p className="text-[#6B6F8E] text-sm mb-6">
                            Signing up as{' '}
                            <span className="text-[#6183FF] font-medium capitalize">{role}</span>
                        </p>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#A0A4C8] mb-1.5 uppercase tracking-wide">
                                    {role === 'hospital' ? 'Hospital Name' : 'Full Name'}
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    required
                                    placeholder={role === 'hospital' ? 'Lagos Island General Hospital' : 'Amaka Osei'}
                                    className="w-full bg-[#1A1C35] border border-[rgba(97,131,255,0.15)] rounded-xl px-4 py-3 text-white text-sm placeholder-[#6B6F8E] outline-none focus:border-[#6183FF] transition-colors"
                                />
                            </div>

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
                                    minLength={8}
                                    placeholder="At least 8 characters"
                                    className="w-full bg-[#1A1C35] border border-[rgba(97,131,255,0.15)] rounded-xl px-4 py-3 text-white text-sm placeholder-[#6B6F8E] outline-none focus:border-[#6183FF] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#A0A4C8] mb-1.5 uppercase tracking-wide">
                                    Country
                                </label>
                                <select
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                    className="w-full bg-[#1A1C35] border border-[rgba(97,131,255,0.15)] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#6183FF] transition-colors"
                                >
                                    {COUNTRIES.map(c => (
                                        <option key={c.code} value={c.code}>
                                            {c.name} ({c.currency})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#6183FF] hover:bg-[#7394FF] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl py-3 transition-all duration-200 hover:-translate-y-0.5"
                            >
                                {loading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>
                    </div>
                )}

                <div className="mt-6 pt-6 border-t border-[rgba(97,131,255,0.1)] text-center">
                    <p className="text-[#6B6F8E] text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-[#6183FF] hover:text-[#7394FF] font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}