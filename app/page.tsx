'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronRight, Moon, Sun, Monitor, Plus, Command, Calendar, ListTodo, Shield, Search, CheckCircle2, ShieldAlert, HeartPulse, QrCode, Lock, Database } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { WaitlistModal } from '@/components/WaitlistForm'

export default function Home() {
    const { theme, setTheme } = useTheme()
    const [themeMenuOpen, setThemeMenuOpen] = useState(false)
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

    return (
        <div className="min-h-screen bg-dark text-text font-sans selection:bg-blue/30 selection:text-white relative overflow-hidden transition-colors duration-300">
            
            {/* The grand ambient gradient in the background matching the Alien AI glow */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-blue via-mint to-lime opacity-[0.12] blur-[120px] pointer-events-none rounded-full mix-blend-screen mix-blend-plus-lighter" />

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-dark/70 backdrop-blur-md transition-all duration-300">
                <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Selora Logo" width={32} height={32} className="object-contain" />
                        <span className="font-sora font-black text-xl tracking-tight text-white">
                            Selora<span className="text-[#5DFFAD]">.</span>
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-body font-sora">
                        <Link href="/" className="text-text hover:text-white transition-colors">Home</Link>
                        <Link href="#how-it-works" className="hover:text-text transition-colors">How It Works</Link>
                        <Link href="#pricing" className="hover:text-text transition-colors">Pricing</Link>
                        <Link href="/hospital" className="hover:text-text transition-colors">For Hospitals</Link>
                        <Link href="/researcher" className="hover:text-text transition-colors">For Researchers</Link>
                        <Link href="/insurers" className="hover:text-text transition-colors">For Insurers</Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4 relative">
                        {/* Theme Toggle Button */}
                        <div className="relative">
                            <button 
                                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-body hover:text-text hover:bg-dark3 transition-colors"
                            >
                                <Sun className="w-4 h-4" />
                            </button>
                            
                            {/* Theme Dropdown */}
                            <AnimatePresence>
                                {themeMenuOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-10 mt-2 w-32 bg-dark2 border border-dark4 rounded-xl overflow-hidden shadow-xl"
                                    >
                                        <button onClick={() => {setTheme('light'); setThemeMenuOpen(false)}} className="w-full text-left px-4 py-2.5 text-xs text-body hover:text-text hover:bg-dark3 flex items-center gap-2">
                                            <Sun className="w-3.5 h-3.5" /> Light
                                        </button>
                                        <button onClick={() => {setTheme('dark'); setThemeMenuOpen(false)}} className="w-full text-left px-4 py-2.5 text-xs text-body hover:text-text hover:bg-dark3 flex items-center gap-2">
                                            <Moon className="w-3.5 h-3.5" /> Dark
                                        </button>
                                        <button onClick={() => {setTheme('warm'); setThemeMenuOpen(false)}} className="w-full text-left px-4 py-2.5 text-xs text-body hover:text-text hover:bg-dark3 flex items-center gap-2">
                                            <Monitor className="w-3.5 h-3.5" /> Warm
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sign In & Get Started Button */}
                        <div className="flex items-center gap-3 font-sora">
                            <Link 
                                href="/login" 
                                className="inline-flex items-center justify-center px-5 py-2 text-[13px] font-bold text-text bg-transparent border border-dark4 rounded-full hover:bg-dark2 transition-colors"
                            >
                                Log In
                            </Link>
                            <button 
                                onClick={() => setIsWaitlistOpen(true)}
                                className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2 text-[13px] font-bold text-dark bg-mint rounded-full hover:bg-mint/90 transition-colors"
                            >
                                Join Waitlist <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="text-center px-4 mb-32 relative z-10 max-w-[900px] mx-auto pt-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mint/30 bg-mint/5 backdrop-blur-sm relative overflow-hidden group">
                            <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                            <span className="text-xs font-bold text-text uppercase tracking-wider relative z-10 font-sora">
                                The one thing missing from every doctor's visit
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-sora text-5xl md:text-[72px] leading-[1.1] font-bold mb-8 text-white relative"
                    >
                        Your complete health history — <span className="bg-gradient-to-r from-blue via-mint to-lime text-transparent bg-clip-text">encrypted on your phone.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[18px] md:text-[20px] text-body mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Shared with a single QR. Revoked the moment you're done. No more starting from scratch with every new doctor.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button 
                            onClick={() => setIsWaitlistOpen(true)}
                            className="w-full sm:w-auto px-8 py-4 bg-mint text-dark text-sm font-bold rounded-xl hover:bg-mint/90 transition-all text-center uppercase tracking-wide font-sora shadow-[0_0_20px_rgba(93,255,173,0.3)]"
                        >
                            Join the Waitlist — It's Free
                        </button>
                        <Link 
                            href="#demo" 
                            className="w-full sm:w-auto px-8 py-4 bg-dark3 text-text border border-border text-sm font-bold rounded-xl hover:bg-dark4 transition-all flex items-center justify-center gap-2 uppercase tracking-wide font-sora"
                        >
                            Watch how it works <ArrowRight className="w-4 h-4 text-blue" />
                        </Link>
                    </motion.div>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="mt-6 text-xs text-muted font-sora uppercase tracking-widest"
                    >
                        Joining 4,000+ people taking control of their health records
                    </motion.p>
                </section>

                {/* The Moment That Changes Everything */}
                <section className="px-4 max-w-[1000px] mx-auto mb-32 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue/5 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="bg-dark2 border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-mint/5 blur-[50px] rounded-full" />
                        
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-6">The moment that changes everything.</h2>
                                <div className="space-y-4 text-body text-[16px] leading-relaxed">
                                    <p>Picture this. You're in a new city. You're unwell. The doctor asks about your medical history and you have nothing — no files, no records, no idea what medications you were last prescribed.</p>
                                    <p>Or worse — it's not you. It's your mother. She's unconscious. The nurses are asking about her allergies and nobody in the room knows the answer.</p>
                                    <p>This is a solvable problem. It has been a solvable problem for years. The reason it hasn't been solved is that health records have always belonged to hospitals, not patients.</p>
                                    <p className="text-mint font-bold text-xl pt-4">Selora changes that.</p>
                                </div>
                            </div>
                            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-border group">
                                <Image src="/media__1773240429808.jpg" alt="African mother and child in hospital" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* What Selora Does */}
                <section id="how-it-works" className="px-4 max-w-[1200px] mx-auto mb-32">
                    <div className="text-center mb-16">
                        <h2 className="font-sora text-4xl font-bold text-white mb-4">What Selora Does</h2>
                        <p className="text-body max-w-xl mx-auto">Your health infrastructure, redesigned around you.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-dark3 border border-border rounded-2xl p-8 hover:border-blue/30 transition-all relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue to-transparent opacity-50" />
                            <div className="w-14 h-14 rounded-xl bg-dark border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Lock className="w-6 h-6 text-blue" />
                            </div>
                            <h3 className="font-sora text-xl font-bold text-white mb-4">Your records. Encrypted. Permanent. Yours.</h3>
                            <p className="text-body text-sm leading-relaxed">
                                Every lab result, prescription, diagnosis, scan, and vaccination — stored on your phone, encrypted before it ever leaves your device. We cannot read your records. Nobody can, unless you say so.
                            </p>
                        </div>

                        <div className="bg-dark3 border border-border rounded-2xl p-8 hover:border-mint/30 transition-all relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mint to-transparent opacity-50" />
                            <div className="w-14 h-14 rounded-xl bg-dark border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <QrCode className="w-6 h-6 text-mint" />
                            </div>
                            <h3 className="font-sora text-xl font-bold text-white mb-4">A QR code that works anywhere</h3>
                            <p className="text-body text-sm leading-relaxed">
                                Open Selora. Tap Share. Show your QR. Any doctor or nurse can request access. You decide how long they have it. One hour. One day. One week. When the time is up, access ends. No exceptions.
                            </p>
                        </div>

                        <div className="bg-dark3 border border-border rounded-2xl p-8 hover:border-lime/30 transition-all relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime to-transparent opacity-50" />
                            <div className="w-14 h-14 rounded-xl bg-dark border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Database className="w-6 h-6 text-lime" />
                            </div>
                            <h3 className="font-sora text-xl font-bold text-white mb-4">A record of everyone who looked</h3>
                            <p className="text-body text-sm leading-relaxed">
                                Every scan, every access — logged permanently on the blockchain. You can see the exact moment a hospital opened your file and exactly what they saw. Your history is yours to audit.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Three Things */}
                <section className="px-4 max-w-[1000px] mx-auto mb-32">
                    <div className="bg-[#111224] border border-border rounded-3xl p-8 md:p-16 relative overflow-hidden">
                        {/* Background glowing effects */}
                        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-mint/5 blur-[100px] rounded-full pointer-events-none" />
                        
                        <div className="text-center mb-16">
                            <h2 className="font-sora text-3xl md:text-5xl font-bold text-white mb-4">Three things that make Selora different</h2>
                        </div>

                        <div className="space-y-12">
                            <div className="flex gap-6 max-w-3xl">
                                <div className="hidden sm:flex w-12 h-12 rounded-full bg-dark3 border border-border items-center justify-center shrink-0 font-sora font-bold text-text">1</div>
                                <div>
                                    <h3 className="font-sora text-xl font-bold text-blue mb-3">You hold the key. Not us.</h3>
                                    <p className="text-body leading-relaxed">When you add a record, your phone encrypts it before it uploads. Selora's servers receive a locked file with no key. If our servers were breached tomorrow, the attacker would find nothing readable. We built it this way deliberately — because the safest way to protect your health data is to never have access to it in the first place.</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-6 max-w-3xl ml-auto">
                                <div className="hidden sm:flex w-12 h-12 rounded-full bg-dark3 border border-border flex items-center justify-center shrink-0 font-sora font-bold text-text">2</div>
                                <div>
                                    <h3 className="font-sora text-xl font-bold text-mint mb-3">Deletion actually means deletion.</h3>
                                    <p className="text-body leading-relaxed">When you delete a record, it is permanently removed from our servers and cryptographically erased from the blockchain record. You receive a proof of deletion. This is not an archive. This is not a soft delete. Gone means gone — because NDPR says it should, and because you deserve it to be.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 max-w-3xl">
                                <div className="hidden sm:flex w-12 h-12 rounded-full bg-dark3 border border-border items-center justify-center shrink-0 font-sora font-bold text-text">3</div>
                                <div>
                                    <h3 className="font-sora text-xl font-bold text-lime mb-3">Access ends the moment you say so.</h3>
                                    <p className="text-body leading-relaxed">When you revoke a doctor's access, the revocation is recorded on the blockchain immediately and irreversibly. Not after a delay. Not pending a review. The instant you tap Revoke, it is over. We cannot undo it. Nobody can.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What You Get Matrix */}
                <section className="px-4 max-w-[1200px] mx-auto mb-32">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <div className="sticky top-32">
                                <h2 className="font-sora text-4xl font-bold text-white mb-6">What you get.</h2>
                                <p className="text-body text-lg mb-8 max-w-md">Everything you need to manage your health, protect your family, and even monetise your own data.</p>
                                <div className="relative h-[300px] rounded-2xl overflow-hidden border border-border mt-8">
                                    <Image src="/media__1773240364693.png" alt="Selora features UI" fill className="object-cover object-top opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            {[
                                { title: "For you", icon: ShieldAlert, color: "text-blue", bg: "bg-blue/10", border: "border-blue/20", desc: "Complete health history in one place • QR-based sharing with any doctor • Emergency profile always accessible without a PIN • Health score built from your actual records • Full audit trail of every access" },
                                { title: "For your family", icon: Plus, color: "text-mint", bg: "bg-mint/10", border: "border-mint/20", desc: "Manage records for up to 6 family members • Generate QR codes on behalf of children or elderly parents • One app, one login, one family vault" },
                                { title: "For your earnings (optional)", icon: Database, color: "text-lime", bg: "bg-lime/10", border: "border-lime/20", desc: "Opt into anonymised health research and earn monthly payments — directly to your OPay, MTN, or bank account. Your identity is never shared. You can opt out of any study at any time. You keep 75% of everything your data earns." },
                                { title: "For emergencies", icon: HeartPulse, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20", desc: "Blood type, allergies, current medications, and emergency contact — always visible, even if your phone is locked, even without internet. The one thing that works when you cannot speak for yourself." },
                            ].map((item, i) => (
                                <div key={i} className="bg-dark3 border border-border rounded-2xl p-6 hover:bg-dark2 transition-colors">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center shrink-0`}>
                                            <item.icon className={`w-6 h-6 ${item.color}`} />
                                        </div>
                                        <h3 className="font-sora text-xl font-bold text-white">{item.title}</h3>
                                    </div>
                                    <p className="text-body text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section id="pricing" className="px-4 max-w-[1200px] mx-auto mb-32">
                    <div className="text-center mb-16">
                        <h2 className="font-sora text-4xl font-bold text-white mb-4">Free to start. Seriously.</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
                        {/* Free Tier */}
                        <div className="bg-dark3 border border-border rounded-3xl p-8">
                            <h3 className="font-sora text-2xl font-bold text-white mb-2">Free</h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-bold text-white">₦0</span>
                            </div>

                            <ul className="space-y-4 mb-8 text-body text-sm">
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-muted" /> 10 Records limit</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-muted" /> Just you</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue" /> QR sharing</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue" /> Emergency profile</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue" /> Health score</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue" /> Research earnings</li>
                            </ul>

                            <Link href="/signup" className="block w-full text-center py-4 bg-dark2 hover:bg-dark4 text-white rounded-xl font-sora font-bold transition-colors border border-border">
                                Start Free
                            </Link>
                        </div>

                        {/* Premium Tier */}
                        <div className="bg-gradient-to-b from-dark2 to-dark3 border border-mint/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(93,255,173,0.1)]">
                            <div className="absolute top-0 right-0 bg-mint text-dark text-xs font-bold px-4 py-1.5 rounded-bl-xl font-sora uppercase tracking-wider">
                                Early Access Offer
                            </div>
                            
                            <h3 className="font-sora text-2xl font-bold text-mint mb-2">Premium</h3>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-4xl font-bold text-white">₦1000</span>
                                <span className="text-body">/month</span>
                            </div>
                            <div className="text-xs text-mint/70 mb-8 font-medium">Normally ₦1,500. Lock in forever.</div>

                            <ul className="space-y-4 mb-8 text-text text-sm">
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-mint" /> Unlimited Records</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-mint" /> Up to 6 Family members</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-mint" /> All Free features</li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-mint shrink-0 mt-0.5" /> 
                                    <div>
                                        <span className="font-bold">Physical NFC Card</span>
                                        <div className="text-xs text-body mt-1">Tap for emergency profile. No app needed.</div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-mint" /> Priority support</li>
                            </ul>

                            <Link href="/signup" className="block w-full text-center py-4 bg-mint hover:bg-mint/90 text-dark rounded-xl font-sora font-bold transition-colors">
                                Claim Early Access Pricing
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="px-4 max-w-[800px] mx-auto mb-32">
                    <div className="text-center mb-16">
                        <h2 className="font-sora text-3xl font-bold text-white">Questions people actually ask</h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            { q: "Do doctors need to download anything?", a: "No. Hospitals on the Selora network scan through their portal. For everyone else, the QR opens a secure web page — no app, no account, no friction on their end." },
                            { q: "What if I lose my phone?", a: "Your records are encrypted in the cloud — losing your phone doesn't lose your data. Restore your account on a new device. If you've also lost your credentials, your nominated guardians can help you recover access." },
                            { q: "Will insurers be able to see my data?", a: "Only if you explicitly choose to share it with them. Insurer access is opt-in, scope-limited, time-limited, and revocable at any moment." },
                            { q: "What if Selora shuts down?", a: "Export all your records anytime — as PDFs or FHIR-compatible files. Your data is yours. You can take it anywhere, with or without us." },
                            { q: "Does it work outside Nigeria?", a: "Yes. The QR works at partner hospitals in Ghana, Kenya, the UK, India, Turkey, and the UAE — and any hospital anywhere can access the web view without being a partner." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-dark2 border border-border rounded-xl p-6">
                                <h4 className="font-sora text-lg font-bold text-white mb-2">{faq.q}</h4>
                                <p className="text-body text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="px-4 max-w-[800px] mx-auto text-center border-t border-border pt-20">
                    <h2 className="font-sora text-4xl font-bold text-white mb-6">A Simple Truth</h2>
                    <p className="text-body text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                        Nigerian patients carry their health history in their heads — or they don't carry it at all. They repeat the same tests. They arrive in emergencies and no one knows what medications they take. This is because the technology was never built around the patient.<br/><br/><span className="text-mint font-bold">Selora is built around you.</span>
                    </p>
                    <button 
                        onClick={() => setIsWaitlistOpen(true)}
                        className="inline-flex px-10 py-5 bg-text text-dark text-lg font-bold rounded-xl hover:opacity-90 transition-all uppercase tracking-wide font-sora shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        Join the Waitlist
                    </button>
                    <div className="mt-4 text-sm text-muted font-sora">Free. Takes 90 seconds. No card required.</div>
                </section>

            </main>

            {/* Footer */}
            <footer className="border-t border-border py-16 px-6 bg-dark">
                <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Image src="/logo.png" alt="Selora Health Logo" width={20} height={20} className="object-contain" />
                            <span className="font-sora text-xl font-bold text-text tracking-wide">
                                Selora<span className="text-mint">.</span>
                            </span>
                        </div>
                        <p className="text-[13px] text-body max-w-xs leading-relaxed">
                            Decentralized, trustless, and incentivized medical records powered by IOTA Rebased.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-text font-bold text-[15px] mb-5 font-sora">Platform</h4>
                        <ul className="space-y-3 text-[13px] text-body">
                            <li><Link href="/" className="hover:text-blue transition-colors">For Patients</Link></li>
                            <li><Link href="/hospital" className="hover:text-mint transition-colors">For Hospitals</Link></li>
                            <li><Link href="/researcher" className="hover:text-lime transition-colors">For Researchers</Link></li>
                            <li><Link href="/insurers" className="hover:text-blue transition-colors">For Insurers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-text font-bold text-[15px] mb-5 font-sora">Legal</h4>
                        <ul className="space-y-3 text-[13px] text-body">
                            <li><Link href="#" className="hover:text-text transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-text transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-text transition-colors">NDPR Compliance</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-text font-bold text-[15px] mb-5 font-sora">Connect</h4>
                        <ul className="space-y-3 text-[13px] text-body">
                            <li><Link href="https://x.com/selorahealth" className="hover:text-text transition-colors">Twitter (X)</Link></li>
                            <li><Link href="https://discord.gg/XqZkcdhf2k" className="hover:text-text transition-colors">Discord</Link></li>
                            <li><Link href="https://github.com/selorahealth" className="hover:text-text transition-colors">GitHub</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-[1200px] mx-auto pt-8 border-t border-border text-center flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-muted">
                    <p>© {new Date().getFullYear()} Selora Health. All rights reserved.</p>
                    <p className="flex items-center gap-1 font-sora">Built with 🩵 on IOTA Rebased</p>
                </div>
            </footer>

            <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
        </div>
    )
}