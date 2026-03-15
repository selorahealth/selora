'use client'

import { useState } from 'react'
import type { JSX } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Microscope, ShieldCheck } from 'lucide-react'

const COUNTRIES = [
    { code: 'NG', name: 'Nigeria', currency: 'NGN' },
    { code: 'GH', name: 'Ghana', currency: 'GHS' },
    { code: 'KE', name: 'Kenya', currency: 'KES' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
    { code: 'US', name: 'United States', currency: 'USD' },
]

export default function ResearcherSignupPage(): JSX.Element {
    const router = useRouter()
    const [fullName, setFullName] = useState('') // Using fullyName property in our generic schema for Institution name
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
                role: 'researcher',
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

        router.push('/researcher/login?signup=success')
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans selection:bg-teal-200 selection:text-teal-900">
            {/* Ambient background styling */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-100 opacity-60 blur-[120px]" />
                <div className="absolute top-1/2 right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-50 opacity-60 blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-xl">
                {/* Logo area */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Image src="/logo.png" alt="Selora Logo" width={32} height={32} className="object-contain" />
                        <span className="font-sora text-2xl font-bold tracking-tight text-slate-900">
                            Selora<span className="text-teal-600 text-[10px] align-top leading-none ml-1 uppercase">Research</span>
                        </span>
                    </div>
                </div>

                {/* Signup Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
                    <Link
                        href="/researcher"
                        className="text-slate-500 text-sm mb-6 inline-flex items-center gap-1 hover:text-slate-800 transition-colors font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" /> Cancel Application
                    </Link>

                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                        <div>
                            <h1 className="font-sora text-2xl font-bold text-slate-900">Apply for Access Data</h1>
                            <p className="text-slate-500 text-sm mt-1">Register your organization for dataset clearance</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                            <Microscope className="w-6 h-6 text-teal-600" />
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
                                    Research Organization / University
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    required
                                    placeholder="e.g. Oxford Bioinformatics Lab"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all shadow-sm"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                                    Principal Investigator Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="pi@university.edu"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all shadow-sm"
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition-all shadow-sm"
                                />
                            </div>

                            <div className="md:col-span-2 border-b border-t border-slate-100 py-4 my-2">
                                <div className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                                    Compliance Region
                                </div>
                                <p className="text-xs text-slate-500 mb-4">
                                    Data pooling is heavily restricted by regional health laws. Your operating region dictates which smart-contract networks you can query.
                                </p>
                                <select
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm outline-none focus:border-teal-500 transition-all shadow-sm"
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
                            Applying binds your institution to the <a href="#" className="font-semibold text-teal-600 hover:text-teal-800">Research Data Non-Disclosure Agreement</a>. 
                            Unauthorized deanonymization attempts result in immediate cryptographic lockout and regulatory reporting.
                        </p>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl py-4 mt-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-teal-600/20"
                        >
                            {loading ? 'Submitting Application...' : (
                                <>Submit Application for Review <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-600 text-sm font-medium">
                            Already verified?{' '}
                            <Link href="/researcher/login" className="text-teal-600 hover:text-teal-800 font-bold transition-colors">
                                Access Data Portal
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
