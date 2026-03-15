'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import {
    Database, ShieldCheck, LineChart, ArrowRight, Microscope,
    Lock, Zap, Monitor, Building2, CheckCircle2
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
        <div className="min-h-screen bg-white text-[#0A0B14] selection:bg-blue/30 selection:text-white overflow-hidden font-sans transition-colors duration-300">
            {/* Ambient Background - Clean & Light */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[rgba(97,131,255,0.03)] blur-[120px]" />
            </div>

            {/* Navigation */}
            <motion.nav 
                variants={navVariants}
                initial="hidden"
                animate="visible"
                className="relative z-50 flex items-center justify-between px-8 py-6 max-w-[1400px] mx-auto bg-white/80 backdrop-blur-md border-b border-gray-100"
            >
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Selora Logo" width={32} height={32} className="object-contain" />
                    <span className="font-sora text-xl font-bold tracking-tight text-[#0A0B14]">
                        Selora<span className="text-blue text-xs align-top leading-none ml-1">DATA</span>
                    </span>
                </div>
                
                <div className="hidden md:flex flex-1 justify-center">
                    <div className="flex items-center gap-8 text-sm font-semibold text-gray-600 font-sora">
                        <Link href="#datasets" className="hover:text-blue transition-colors">Datasets</Link>
                        <Link href="#compliance" className="hover:text-blue transition-colors">Compliance</Link>
                        <Link href="#api" className="hover:text-blue transition-colors">API Docs</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/researcher/login" className="text-sm font-semibold text-gray-600 hover:text-blue transition-colors font-sora">
                        Sign In
                    </Link>
                    <Link href="/researcher/signup" className="text-sm bg-[#0A0B14] hover:bg-[#0A0B14]/90 font-semibold text-white px-6 py-2.5 rounded-lg transition-all font-sora shadow-md">
                        Apply for Access
                    </Link>
                </div>
            </motion.nav>

            <main className="relative z-10 w-full pt-16 pb-24">
                {/* Hero Section */}
                <section className="px-6 max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div 
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-start text-left"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue/5 border border-blue/10 text-blue font-bold uppercase tracking-widest mb-8 text-xs font-sora">
                            <Microscope className="w-3.5 h-3.5" />
                            Clinical Research Network
                        </motion.div>
                        
                        <motion.h1 variants={itemVariants} className="font-sora text-5xl md:text-[64px] font-black tracking-tight text-[#0A0B14] mb-6 leading-[1.1]">
                            High-quality, <br/>
                            <span className="text-blue">consented datasets.</span>
                        </motion.h1>
                        
                        <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                            Access the most diverse, cryptographically verified medical datasets. Create smart-contract bounties for specific cohorts and immediately query anonymized data.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full font-sora">
                            <Link href="/researcher/signup" className="w-full sm:w-auto bg-[#0A0B14] text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0A0B14]/90 transition-all shadow-lg">
                                Browse Marketplace <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="#docs" className="w-full sm:w-auto bg-white border border-gray-200 text-[#0A0B14] font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                                Read API Docs
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-10 flex items-center gap-3 text-sm text-[#0A0B14] font-bold bg-gray-50 border border-gray-200 px-5 py-3 rounded-xl font-sora">
                            <Lock className="w-4 h-4 text-blue" />
                            <span>HIPAA & GDPR Compliant by Design</span>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative"
                    >
                        {/* Clean minimal abstract chart / interface */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white min-h-[450px]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue/5 to-transparent z-0" />
                            
                            <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100 z-20">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-xl bg-blue/10 flex items-center justify-center shrink-0 border border-blue/20">
                                        <Database className="w-7 h-7 text-blue" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="text-sm font-bold text-[#0A0B14] uppercase tracking-wider font-sora">Cohort Alpha</div>
                                            <div className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md border border-green-200 uppercase tracking-widest font-sora">Active</div>
                                        </div>
                                        <div className="text-sm text-gray-600 font-medium">Streaming 450 new records...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section id="datasets" className="py-24 px-6 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="font-sora text-3xl md:text-5xl font-bold text-[#0A0B14] mb-6">Accelerate Discovery</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">Skip the months-long ethics board delays. Access pre-consented, standardized datasets from verified patient networks.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
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
                                <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                                    <div className="w-14 h-14 rounded-2xl bg-blue/10 border border-blue/10 flex items-center justify-center mb-8">
                                        <feature.icon className="w-7 h-7 text-blue" />
                                    </div>
                                    <h3 className="font-sora text-xl font-bold text-[#0A0B14] mb-4">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Verification/KYC Highlight */}
                <section className="py-32 px-6 max-w-[1000px] mx-auto text-center" id="compliance">
                    <div className="bg-[#0A0B14] rounded-[3rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue/10 z-0"></div>
                        <div className="absolute right-[-10%] top-[-20%] w-[500px] h-[500px] bg-blue/20 blur-[100px] rounded-full"></div>
                        
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <Building2 className="w-12 h-12 text-blue mx-auto mb-8" />
                            <h2 className="font-sora text-3xl md:text-5xl font-bold mb-6">Strictly Vetted Access</h2>
                            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                                To protect patient privacy, we employ rigorous KYC procedures for all research institutions. Access is granted only to verifiable organizations executing legitimate clinical or demographic studies.
                            </p>
                            <Link href="/researcher/signup" className="inline-flex bg-white text-[#0A0B14] font-bold px-10 py-5 rounded-xl hover:bg-gray-50 transition-colors shadow-lg font-sora text-lg tracking-wide">
                                Apply for Institution Verification
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-16 px-6 bg-gray-50">
                <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Image src="/logo.png" alt="Selora Logo" width={20} height={20} className="object-contain" />
                            <span className="font-sora text-xl font-bold text-[#0A0B14]">Selora<span className="text-blue">.</span></span>
                        </div>
                        <p className="text-[13px] text-gray-500 max-w-xs leading-relaxed">
                            Enterprise infrastructure for decentralized, trustless medical records powered by IOTA Rebased.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#0A0B14] font-bold text-[15px] mb-5 font-sora">Ecosystem</h4>
                        <ul className="space-y-3 text-[13px] text-gray-500">
                            <li><Link href="/" className="hover:text-blue transition-colors">For Patients</Link></li>
                            <li><Link href="/hospital" className="hover:text-blue transition-colors">For Hospitals</Link></li>
                            <li><Link href="/researcher" className="text-blue transition-colors">For Researchers</Link></li>
                            <li><Link href="/insurers" className="hover:text-blue transition-colors">For Insurers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#0A0B14] font-bold text-[15px] mb-5 font-sora">Legal & Compliance</h4>
                        <ul className="space-y-3 text-[13px] text-gray-500">
                            <li><Link href="#" className="hover:text-blue transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-blue transition-colors">Enterprise Terms</Link></li>
                            <li><Link href="#" className="hover:text-blue transition-colors">NDPR Compliance</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#0A0B14] font-bold text-[15px] mb-5 font-sora">Connect</h4>
                        <ul className="space-y-3 text-[13px] text-gray-500">
                            <li><Link href="mailto:partners@selora.health" className="hover:text-blue transition-colors">Contact Sales</Link></li>
                            <li><Link href="https://x.com/selorahealth" className="hover:text-blue transition-colors">Twitter (X)</Link></li>
                            <li><Link href="https://github.com/selorahealth" className="hover:text-blue transition-colors">GitHub</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-[1200px] mx-auto pt-8 border-t border-gray-200 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-400">
                    <p>© {new Date().getFullYear()} Selora Health. All rights reserved.</p>
                    <p className="flex items-center gap-1 font-sora">Built with 🩵 on IOTA Rebased</p>
                </div>
            </footer>
        </div>
    )
}
