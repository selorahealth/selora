'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import {
    Database,
    ShieldCheck,
    LineChart,
    ArrowRight,
    Microscope,
    Lock,
    Zap
} from 'lucide-react'

export default function ResearcherLandingPage() {
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
        <div className="min-h-screen bg-white text-slate-800 selection:bg-teal-200 selection:text-teal-900 overflow-hidden font-sans">
            {/* Navis Theme Ambient Background (Teal Tint for Researchers) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-teal-100 opacity-40 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-slate-100 opacity-50 blur-[120px]" />
            </div>

            {/* Navigation */}
            <motion.nav 
                variants={navVariants}
                initial="hidden"
                animate="visible"
                className="relative z-50 flex items-center justify-between px-8 py-6 max-w-[1400px] mx-auto"
            >
                <div className="flex items-center gap-3">
                    {/* Brand Logo & Name */}
                    <div className="w-8 h-8 rounded-md bg-teal-600 p-[2px] shadow-md">
                        <div className="w-full h-full bg-white rounded-sm flex items-center justify-center">
                            <div className="w-3 h-3 rounded-sm bg-teal-600" />
                        </div>
                    </div>
                    <span className="font-sora text-2xl font-bold tracking-tight text-slate-900">
                        Selora<span className="text-teal-600 text-sm align-top leading-none ml-1">DATA</span>
                    </span>
                </div>
                
                <div className="hidden md:flex flex-1 justify-center">
                    <div className="flex items-center gap-8 text-sm font-semibold text-slate-600">
                        <Link href="#datasets" className="hover:text-teal-600 transition-colors">Datasets</Link>
                        <Link href="#compliance" className="hover:text-teal-600 transition-colors">Compliance</Link>
                        <Link href="#api" className="hover:text-teal-600 transition-colors">API Docs</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/researcher/login" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">
                        Sign In
                    </Link>
                    <Link href="/researcher/signup" className="text-sm bg-teal-600 hover:bg-teal-700 font-semibold text-white px-6 py-2.5 rounded-lg transition-all shadow-sm shadow-teal-600/20">
                        Apply for Access
                    </Link>
                </div>
            </motion.nav>

            <main className="relative z-10 w-full mt-12 md:mt-20">
                {/* Hero Section */}
                <section className="px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-start text-left"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                            <Microscope className="w-3 h-3" />
                            Clinical Research Network
                        </motion.div>
                        
                        <motion.h1 variants={itemVariants} className="font-sora text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.15]">
                            High-quality, <span className="text-teal-600">consented datasets.</span>
                        </motion.h1>
                        
                        <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                            Access the most diverse, cryptographically verified medical datasets. Create smart-contract bounties for specific cohorts and immediately query anonymized data.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full">
                            <Link href="/researcher/signup" className="w-full md:w-auto bg-teal-600 text-white font-semibold px-8 py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-700 transition-all shadow-md shadow-teal-600/20">
                                Browse Marketplace <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="#docs" className="w-full md:w-auto bg-white border border-slate-200 text-slate-700 font-semibold px-8 py-3.5 rounded-lg flex items-center justify-center hover:bg-slate-50 transition-all">
                                Read API Docs
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-10 flex items-center gap-3 text-sm text-slate-500 font-medium bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg">
                            <Lock className="w-4 h-4 text-slate-400" />
                            <span>HIPAA & GDPR Compliant by Design</span>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative"
                    >
                        {/* Abstract Corporate graphic / image showing African scientific researchers */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-teal-900/10 aspect-[4/3]">
                            <img 
                                src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="African Scientists in Lab" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent" />
                            
                            {/* Floating UI Element */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl border border-white/20">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                                        <Database className="w-6 h-6 text-teal-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cohort Alpha</div>
                                            <div className="text-xs text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded">Active</div>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900">Streaming 450 new records...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section id="datasets" className="py-24 px-6 bg-slate-50 mt-24 border-y border-slate-200">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-sora text-3xl md:text-4xl font-bold text-slate-900 mb-4">Accelerate Discovery</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">Skip the months-long ethics board delays. Access pre-consented, standardized datasets from verified patient networks.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Database,
                                    title: "Targeted Cohorts",
                                    desc: "Filter by region, age, genetics, and historical diagnoses to find exactly the patient profiles your study requires."
                                },
                                {
                                    icon: Zap,
                                    title: "Real-time Streaming",
                                    desc: "Don't settle for static dumps. Configure pipelines to automatically ingest newly acquired patient data as it's minted."
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Immutable Consent",
                                    desc: "Smart contracts guarantee every data point was legally consented to by the patient, shielding you from compliance risks."
                                }
                            ].map((feature, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-6">
                                        <feature.icon className="w-6 h-6 text-teal-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Verification/KYC Highlight */}
                <section className="py-24 px-6 max-w-6xl mx-auto">
                    <div className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl relative">
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-teal-900/50 to-transparent skew-x-12 translate-x-1/2"></div>
                        
                        <div className="relative z-10 p-12 md:p-16 text-center max-w-3xl mx-auto text-white">
                            <h2 className="font-sora text-3xl md:text-5xl font-bold mb-6">Strictly Vetted Access</h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                                To protect patient privacy, we employ rigorous KYC procedures for all research institutions. Access is granted only to verifiable organizations executing legitimate clinical or demographic studies.
                            </p>
                            <Link href="/researcher/signup" className="inline-flex bg-teal-500 text-white font-bold px-8 py-3.5 rounded-lg hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20">
                                Apply for Institution Verification
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 py-12 px-6 bg-slate-50 mt-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-md bg-teal-600 p-[2px]">
                            <div className="w-full h-full bg-white rounded-sm flex items-center justify-center">
                            </div>
                        </div>
                        <span className="font-sora text-xl font-bold text-slate-900">Selora <span className="text-slate-500 font-medium">B2B</span></span>
                    </div>
                    
                    <div className="flex gap-6 text-sm font-semibold">
                        <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">For Patients</Link>
                        <Link href="/hospital" className="text-slate-500 hover:text-slate-900 transition-colors">For Hospitals</Link>
                        <Link href="/researcher" className="text-teal-600">For Researchers</Link>
                        <Link href="/admin" className="text-slate-500 hover:text-slate-900 transition-colors">Administrators</Link>
                    </div>
                    
                    <div className="text-slate-500 text-sm font-medium">
                        © {new Date().getFullYear()} Selora Health.
                    </div>
                </div>
            </footer>
        </div>
    )
}
