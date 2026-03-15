'use client'

import Image from "next/image";
import { useState } from 'react'
import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Building2, UploadCloud } from 'lucide-react'

const COUNTRIES = [
    { code: 'NG', name: 'Nigeria', currency: 'NGN' },
    { code: 'GH', name: 'Ghana', currency: 'GHS' },
    { code: 'KE', name: 'Kenya', currency: 'KES' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
    { code: 'US', name: 'United States', currency: 'USD' },
]

export default function HospitalSignupPage(): JSX.Element {
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
                role: 'hospital',
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

        router.push('/hospital/login?signup=success')
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans selection:bg-blue-200 selection:text-blue-900">
            {/* Ambient background styling */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100 opacity-60 blur-[120px]" />
                <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] rounded-full bg-teal-50 opacity-60 blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-xl">
                {/* Logo area */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Image src="/logo.png" alt="Selora Logo" width={32} height={32} className="object-contain" />
                        <span className="font-sora text-2xl font-bold tracking-tight text-slate-900">
                            Selora<span className="text-blue-600 text-[10px] align-top leading-none ml-1 uppercase">Hospital</span>
                        </span>
                    </div>
                </div>

                {/* Signup Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
                    <Link
                        href="/hospital"
                        className="text-slate-500 text-sm mb-6 inline-flex items-center gap-1 hover:text-slate-800 transition-colors font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" /> Go Back
                    </Link>

                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                        <div>
                            <h1 className="font-sora text-2xl font-bold text-slate-900">Institution Registration</h1>
                            <p className="text-slate-500 text-sm mt-1">Connect your hospital to the Selora network</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-3 mb-6 flex items-start gap-2">
                            <span className="text-lg leading-none mt-0.5">&times;</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                                    Official Institution Name
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    required
                                    placeholder="e.g. Lagos General Hospital"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                                    Official Administrator Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@hospital.com"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                                    Secure Account Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    placeholder="At least 8 characters"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm"
                                />
                            </div>

                            <div className="md:col-span-2 border-b border-t border-slate-100 py-4 my-2">
                                <div className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                                    <UploadCloud className="w-5 h-5 text-blue-600" />
                                    KYC Verification Documents
                                </div>
                                <p className="text-xs text-slate-500 mb-4">
                                    As a healthcare provider, strictly authenticated documents must be verified post-registration before active system access is allowed.
                                </p>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                                    Operating Region
                                </label>
                                <select
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none focus:border-blue-500 transition-all shadow-sm"
                                >
                                    {COUNTRIES.map(c => (
                                        <option key={c.code} value={c.code}>
                                            {c.name} ({c.currency})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 text-center leading-relaxed">
                            Submitting this form executes a request for institutional inclusion. You are subject to our <a href="#" className="font-semibold text-blue-600 hover:text-blue-800">Compliance & KYC Service Level Agreement</a> and data processing terms.
                        </p>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl py-4 mt-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
                        >
                            {loading ? 'Submitting Application...' : (
                                <>Submit Application for Verification <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-600 text-sm font-medium">
                            Already registered and verified?{' '}
                            <Link href="/hospital/login" className="text-blue-600 hover:text-blue-800 font-bold transition-colors">
                                Access Portal System
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
