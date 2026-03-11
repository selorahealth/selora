'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import {
    Activity, ArrowRight, Building2, CheckCircle2, ChevronRight, FileText, 
    HeartPulse, LineChart, Lock, Monitor, Moon, QrCode, Search, ShieldCheck, 
    Sun, Users, XCircle, FileSignature, Stethoscope, WifiOff, Briefcase
} from 'lucide-react'

export default function InsurerLandingPage() {
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
        // Navis Theme: Light, clean, modern corporate feel, white/blue minimal look.
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
                    <Image src="/logo.png" alt="Selora Logo" width={24} height={24} className="object-contain" />
                    <span className="font-sora text-xl font-bold tracking-tight text-[#0A0B14]">
                        Selora<span className="text-blue text-xs align-top leading-none ml-1">PAYER</span>
                    </span>
                </div>
                
                <div className="hidden md:flex flex-1 justify-center">
                    <div className="flex items-center gap-8 text-sm font-semibold text-gray-600 font-sora">
                        <Link href="#features" className="hover:text-blue transition-colors">Features</Link>
                        <Link href="#accuracy" className="hover:text-blue transition-colors">Claims Accuracy</Link>
                        <Link href="#demo" className="hover:text-blue transition-colors">Book a Demo</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/insurers/login" className="text-sm font-semibold text-gray-600 hover:text-blue transition-colors font-sora">
                        Log In
                    </Link>
                    <Link href="/insurers/signup" className="text-sm bg-[#0A0B14] hover:bg-[#0A0B14]/90 font-semibold text-white px-6 py-2.5 rounded-lg transition-all font-sora shadow-md">
                        Get Started
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
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Smarter Underwriting & Claims
                        </motion.div>
                        
                        <motion.h1 variants={itemVariants} className="font-sora text-5xl md:text-[64px] font-black tracking-tight text-[#0A0B14] mb-6 leading-[1.1]">
                            Zero-knowledge <br/>
                            <span className="text-blue">claims verification.</span>
                        </motion.h1>
                        
                        <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                            Access cryptographically proven medical histories to instantly verify claims, detect fraud, and streamline underwriting—all with explicit, provable patient consent.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full font-sora">
                            <Link href="#demo" className="w-full sm:w-auto bg-[#0A0B14] text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0A0B14]/90 transition-all shadow-lg">
                                Book a Demo <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="#how-it-works" className="w-full sm:w-auto bg-white border border-gray-200 text-[#0A0B14] font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                                How it Works
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative"
                    >
                        {/* Clean hospital interface graphic */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white min-h-[450px]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue/5 to-transparent z-0" />
                            
                            {/* Floating UI Element overlays onto the image to simulate the interface */}
                            <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100 z-20">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-xl bg-blue/10 flex items-center justify-center shrink-0 border border-blue/20">
                                        <Briefcase className="w-7 h-7 text-blue" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="text-sm font-bold text-[#0A0B14] uppercase tracking-wider font-sora">Claim #4092-A</div>
                                            <div className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md border border-green-200 uppercase tracking-widest font-sora">Verified</div>
                                        </div>
                                        <div className="text-sm text-gray-600 font-medium">Hospital records cryptographic match.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 px-6 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="font-sora text-3xl md:text-5xl font-bold text-[#0A0B14] mb-6">Built for Trust and Efficiency.</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">Eliminate the manual back-and-forth with hospitals and patients. Process claims based on immutable, source-verified clinical data.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            {[
                                {
                                    icon: ShieldCheck,
                                    title: "Fraud Elimination",
                                    desc: "Every record is cryptographically signed by the originating hospital. Duplicate or fabricated claims are mathematically impossible to forge."
                                },
                                {
                                    icon: Activity,
                                    title: "Real-time Verification",
                                    desc: "When a patient consents to sharing their medical history for a claim, your agents can instantly access the guaranteed authentic source records."
                                },
                                {
                                    icon: Lock,
                                    title: "Provable Consent",
                                    desc: "Audit trails are stored securely on the ledger, guaranteeing you always have proof that the patient legally authorized data sharing."
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

                {/* Final CTA */}
                <section className="px-6 max-w-[800px] mx-auto text-center py-20 bg-blue/5 rounded-[3rem] border border-blue/10 mt-32 mb-20">
                    <h2 className="font-sora text-4xl font-bold text-[#0A0B14] mb-6">Modernize your claims process</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                        See how Selora can integrate with your existing payer infrastructure to radically reduce processing time and eliminate fraud.
                    </p>
                    <Link 
                        href="#demo" 
                        className="inline-flex px-10 py-5 bg-[#0A0B14] text-white text-lg font-bold rounded-xl hover:bg-[#0A0B14]/90 transition-all shadow-xl tracking-wide font-sora"
                    >
                        Schedule a Consultation
                    </Link>
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
                            <li><Link href="/researcher" className="hover:text-blue transition-colors">For Researchers</Link></li>
                            <li><Link href="/insurers" className="text-blue transition-colors">For Insurers</Link></li>
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
