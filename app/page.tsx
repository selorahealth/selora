'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
    ShieldCheck,
    Wallet,
    Activity,
    QrCode,
    Database,
    LineChart,
    ArrowRight
} from 'lucide-react'

export default function HomePage() {
    const [activeTab, setActiveTab] = useState<'patient' | 'hospital' | 'researcher'>('patient')

    const navVariants: Variants = {
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    }

    const heroVariants: Variants = {
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.2 } }
    }

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    }

    return (
        <div className="min-h-screen bg-dark text-body selection:bg-blue/30 selection:text-white overflow-hidden font-sans">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-blue opacity-[0.04] blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-mint opacity-[0.03] blur-[150px]" />
                <div className="absolute top-[40%] left-[60%] w-[500px] h-[500px] rounded-full bg-lime opacity-[0.02] blur-[120px]" />
            </div>

            {/* Navigation */}
            <motion.nav
                variants={navVariants}
                initial="hidden"
                animate="visible"
                className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto"
            >
                <div className="flex items-center gap-2">
                    <span className="font-sora text-2xl font-black text-white tracking-tight">
                        Selora<span className="text-mint">.</span>
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-body hover:text-white transition-colors">
                        Sign In
                    </Link>
                    <Link href="/signup" className="text-sm font-medium bg-white text-dark px-5 py-2.5 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                        Get Started
                    </Link>
                </div>
            </motion.nav>

            <main className="relative z-10 w-full">
                {/* Hero Section */}
                <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto text-center">
                    <motion.div
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl mx-auto flex flex-col items-center"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-blue text-xs font-semibold uppercase tracking-wider mb-8">
                            <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
                            Built on IOTA Rebased
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="font-sora text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Your health story,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue via-mint to-lime">
                                everywhere you go.
                            </span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            Own your medical records securely. Share them instantly with any hospital. Consent to research and earn in your local currency—powered by invisible blockchain technology.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full">
                            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="w-full sm:w-auto">
                                <Link href="/signup" className="w-full sm:w-auto bg-blue hover:bg-blue/90 text-white font-medium px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(97,131,255,0.3)] transition-all">
                                    Create Free Account <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="w-full sm:w-auto">
                                <Link href="#how-it-works" className="w-full sm:w-auto bg-dark2 border border-white/5 hover:border-white/10 text-white font-medium px-8 py-4 rounded-xl flex items-center justify-center transition-all">
                                    How it works
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Stats Section */}
                <section className="py-20 border-y border-white/5 bg-dark2/30 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
                        {[
                            { label: 'Secured Records', value: '140k+' },
                            { label: 'Patient Earnings', value: '$2.4M' },
                            { label: 'Active Studies', value: '85+' },
                            { label: 'Partner Hospitals', value: '120+' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="flex flex-col items-center justify-center text-center px-4"
                            >
                                <div className="font-sora text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm font-medium text-muted uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* How it works */}
                <section id="how-it-works" className="py-32 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="font-sora text-3xl md:text-5xl font-bold text-white mb-6">Built for <span className="text-blue">patients first.</span></h2>
                        <p className="text-muted text-lg max-w-2xl mx-auto">We've handled all the complex blockchain infrastructure so you can focus on what matters: your health and your data.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-blue/20 to-transparent z-0" />

                        {[
                            {
                                icon: ShieldCheck,
                                title: 'Claim your identity',
                                desc: 'Sign up in seconds. We automatically generate a secure, encrypted vault for your medical history.',
                                color: 'text-blue',
                                bg: 'bg-blue/10',
                                border: 'border-blue/20'
                            },
                            {
                                icon: QrCode,
                                title: 'Sync & Share',
                                desc: 'Upload past records or simply show your universal QR code at partner hospitals to sync new visits instantly.',
                                color: 'text-mint',
                                bg: 'bg-mint/10',
                                border: 'border-mint/20'
                            },
                            {
                                icon: Wallet,
                                title: 'Earn from research',
                                desc: 'Opt-in to anonymized medical studies. Researchers pay for data, and earnings go straight to your local bank account.',
                                color: 'text-lime',
                                bg: 'bg-lime/10',
                                border: 'border-lime/20'
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.6 }}
                                className="relative z-10 flex flex-col items-center text-center"
                            >
                                <div className={`w-24 h-24 rounded-3xl ${step.bg} ${step.border} border flex items-center justify-center mb-8 rotate-3 transition-transform hover:rotate-0 duration-300`}>
                                    <step.icon className={`w-10 h-10 ${step.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-body leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Features Tabs */}
                <section className="py-32 bg-dark2/50 border-y border-white/5 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-sora text-3xl md:text-5xl font-bold text-white mb-6">One platform. <span className="text-mint">Three ecosystems.</span></h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">Connecting patients, providers, and researchers through trustless, incentivized data exchange.</p>
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            {(['patient', 'hospital', 'researcher'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-3 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${activeTab === tab
                                        ? 'bg-white text-dark shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                                        : 'bg-dark3 text-muted hover:text-white border border-white/5 hover:border-white/10'
                                        }`}
                                >
                                    {tab} Ecosystem
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="min-h-[400px]">
                            <AnimatePresence mode="wait">
                                {activeTab === 'patient' && (
                                    <motion.div
                                        key="patient"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="grid md:grid-cols-2 gap-12 items-center"
                                    >
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-4">You own the keys to your health.</h3>
                                            <p className="text-body mb-8">No more carrying physical files or forgetting your medical history when visiting a new doctor. Selora gives you a unified, lifelong health record that only you control.</p>

                                            <ul className="space-y-4">
                                                {[
                                                    'Social recovery via trusted guardians',
                                                    'Granular consent toggles for research sharing',
                                                    'Instant withdrawals to local bank via Flutterwave',
                                                    'Cryptographically verified scan access logs'
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-body">
                                                        <div className="w-5 h-5 rounded-full bg-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                                            <div className="w-2 h-2 rounded-full bg-blue" />
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-dark3 border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue/10 blur-[100px] rounded-full" />
                                            <div className="space-y-4 relative z-10">
                                                <div className="flex justify-between items-center mb-6">
                                                    <div className="w-12 h-12 rounded-full bg-dark4 flex items-center justify-center"><Wallet className="w-5 h-5 text-lime" /></div>
                                                    <div className="text-right">
                                                        <div className="text-xs text-muted">Available Balance</div>
                                                        <div className="text-lg font-bold text-white">₦ 145,500.00</div>
                                                    </div>
                                                </div>
                                                <div className="bg-dark4 rounded-xl p-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Activity className="w-5 h-5 text-blue" />
                                                        <div>
                                                            <div className="text-sm text-white font-medium">Lagos General Hospital</div>
                                                            <div className="text-xs text-muted">Record sync • 2h ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs font-semibold text-mint">Verified</div>
                                                </div>
                                                <div className="bg-dark4 rounded-xl p-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Database className="w-5 h-5 text-lime" />
                                                        <div>
                                                            <div className="text-sm text-white font-medium">Genomic Study #882</div>
                                                            <div className="text-xs text-muted">Data reward • 1d ago</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-bold text-white">+ ₦ 12,000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'hospital' && (
                                    <motion.div
                                        key="hospital"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="grid md:grid-cols-2 gap-12 items-center"
                                    >
                                        <div className="order-2 md:order-1 bg-dark3 border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-64 h-64 bg-mint/10 blur-[100px] rounded-full" />
                                            <div className="space-y-4 relative z-10">
                                                <div className="border-2 border-dashed border-mint/20 rounded-2xl h-48 flex flex-col items-center justify-center bg-dark4/50">
                                                    <QrCode className="w-12 h-12 text-mint mb-3 opacity-80" />
                                                    <div className="text-sm text-white font-medium">Scanning Patient...</div>
                                                    <div className="text-xs text-muted mt-1">Waiting for QR token</div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 mt-4">
                                                    <div className="bg-dark4 rounded-xl p-4">
                                                        <div className="text-xs text-muted mb-1">Total Scans Today</div>
                                                        <div className="text-xl font-bold text-white">142</div>
                                                    </div>
                                                    <div className="bg-dark4 rounded-xl p-4">
                                                        <div className="text-xs text-muted mb-1">Research Revenue</div>
                                                        <div className="text-xl font-bold text-white">₦ 45k</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order-1 md:order-2">
                                            <h3 className="text-2xl font-bold text-white mb-4">Instant access, anywhere.</h3>
                                            <p className="text-body mb-8">Stop relying on fragmented legacy systems. Scan a patient's temporary QR code to instantly access their lifelong medical history, securely decrypted on your device.</p>

                                            <ul className="space-y-4">
                                                {[
                                                    'Zero-knowledge access logs tracked on-chain',
                                                    'Earn 21% of research revenue for patients you onboard',
                                                    'Comprehensive allergy and vitals timeline',
                                                    'Multi-staff access with centralized auditing'
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-body">
                                                        <div className="w-5 h-5 rounded-full bg-mint/20 flex items-center justify-center shrink-0 mt-0.5">
                                                            <div className="w-2 h-2 rounded-full bg-mint" />
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'researcher' && (
                                    <motion.div
                                        key="researcher"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="grid md:grid-cols-2 gap-12 items-center"
                                    >
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-4">High-quality, consented datasets.</h3>
                                            <p className="text-body mb-8">Access the most diverse, cryptographically verified medical datasets. Create smart-contract bounties for specific cohorts and immediately query anonymized data.</p>

                                            <ul className="space-y-4">
                                                {[
                                                    'Browse marketplace by region and condition',
                                                    'Automated fiat-to-crypto payments via Flutterwave',
                                                    'Guaranteed patient consent through on-chain proofs',
                                                    'Real-time data streaming into your existing pipelines'
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-body">
                                                        <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center shrink-0 mt-0.5">
                                                            <div className="w-2 h-2 rounded-full bg-lime" />
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-dark3 border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-lime/10 blur-[100px] rounded-full" />
                                            <div className="space-y-4 relative z-10">
                                                <div className="flex justify-between items-end mb-6">
                                                    <div>
                                                        <div className="text-sm text-white font-medium mb-1">Study Enrollment Velocity</div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="text-2xl font-bold text-white">4,281</div>
                                                            <div className="text-xs text-lime bg-lime/10 px-2 rounded-full">+12% / wk</div>
                                                        </div>
                                                    </div>
                                                    <LineChart className="w-6 h-6 text-lime mb-1" />
                                                </div>
                                                {/* Mock Chart Bars */}
                                                <div className="h-32 flex items-end justify-between gap-2 pt-4 border-t border-white/5">
                                                    {[40, 60, 45, 80, 65, 90, 100].map((h, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ height: 0 }}
                                                            animate={{ height: `${h}%` }}
                                                            transition={{ duration: 1, delay: i * 0.1 }}
                                                            className="w-full bg-lime/20 rounded-t-sm relative group cursor-pointer hover:bg-lime/40 transition-colors"
                                                        >
                                                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-dark rounded text-[10px] text-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {h * 12}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6">
                    <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue/20 via-dark2 to-mint/10 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        <h2 className="font-sora text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to own your health?</h2>
                        <p className="text-body text-lg max-w-xl mx-auto mb-10 relative z-10">
                            Join thousands of patients who are securely managing their medical history and earning from research.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block relative z-10">
                            <Link href="/signup" className="inline-flex bg-white text-dark font-bold text-lg px-10 py-4 rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-shadow">
                                Get Started Now
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-6 bg-dark2/50 mt-10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="font-sora text-2xl font-black text-white tracking-tight">
                                Selora<span className="text-mint">.</span>
                            </span>
                        </div>
                        <p className="text-body text-sm max-w-xs">
                            Decentralized, trustless, and incentivized medical records powered by IOTA Rebased.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-body">
                            <li><Link href="/patient" className="hover:text-blue transition-colors">For Patients</Link></li>
                            <li><Link href="/hospital" className="hover:text-mint transition-colors">For Hospitals</Link></li>
                            <li><Link href="/researcher" className="hover:text-lime transition-colors">For Researchers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-body">
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">HIPAA Compliance</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm text-body">
                            <li><Link href="https://x.com/selorahealth" className="hover:text-white transition-colors">Twitter (X)</Link></li>
                            <li><Link href="https://discord.gg/XqZkcdhf2k" className="hover:text-white transition-colors">Discord</Link></li>
                            <li><Link href="https://github.com/selorahealth" className="hover:text-white transition-colors">GitHub</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
                    <p>© {new Date().getFullYear()} Selora Health. All rights reserved.</p>
                    <p className="flex items-center gap-1">Built with 🩵 on IOTA Rebased</p>
                </div>
            </footer>
        </div>
    )
}