'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import {
    Building2,
    QrCode,
    ShieldCheck,
    LineChart,
    ArrowRight,
    Search,
    Users,
    Activity
} from 'lucide-react'

export default function HospitalLandingPage() {
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
        <div className="min-h-screen bg-white text-slate-800 selection:bg-blue-200 selection:text-blue-900 overflow-hidden font-sans">
            {/* Navis Theme Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-100 opacity-50 blur-[120px]" />
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
                    <div className="w-8 h-8 rounded-md bg-blue-600 p-[2px] shadow-md">
                        <div className="w-full h-full bg-white rounded-sm flex items-center justify-center">
                            <div className="w-3 h-3 rounded-sm bg-blue-600" />
                        </div>
                    </div>
                    <span className="font-sora text-2xl font-bold tracking-tight text-slate-900">
                        Selora<span className="text-blue-600 text-sm align-top leading-none ml-1">HOSPITAL</span>
                    </span>
                </div>
                
                <div className="hidden md:flex flex-1 justify-center">
                    <div className="flex items-center gap-8 text-sm font-semibold text-slate-600">
                        <Link href="#solutions" className="hover:text-blue-600 transition-colors">Solutions</Link>
                        <Link href="#integration" className="hover:text-blue-600 transition-colors">Integration</Link>
                        <Link href="#compliance" className="hover:text-blue-600 transition-colors">Compliance</Link>
                        <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/hospital/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                        Log In
                    </Link>
                    <Link href="/hospital/signup" className="text-sm bg-blue-600 hover:bg-blue-700 font-semibold text-white px-6 py-2.5 rounded-lg transition-all shadow-sm shadow-blue-600/20">
                        Partner With Us
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
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                            <ShieldCheck className="w-3 h-3" />
                            Enterprise Grade Medical Records
                        </motion.div>
                        
                        <motion.h1 variants={itemVariants} className="font-sora text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.15]">
                            Instant access to <span className="text-blue-600">lifelong patient history.</span>
                        </motion.h1>
                        
                        <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                            Stop relying on fragmented legacy systems. Scan a patient's universal QR code to instantly access their verified medical history, securely decrypted on your device.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full">
                            <Link href="/hospital/signup" className="w-full md:w-auto bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20">
                                Start Onboarding <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="#demo" className="w-full md:w-auto bg-white border border-slate-200 text-slate-700 font-semibold px-8 py-3.5 rounded-lg flex items-center justify-center hover:bg-slate-50 transition-all">
                                Request Demo
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-10 flex items-center gap-4 text-sm text-slate-500 font-medium">
                            <div className="flex -space-x-2">
                                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Doctor" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                                <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Doctor" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                                <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Doctor" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                            </div>
                            <span>Trusted by 120+ leading clinics</span>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative"
                    >
                        {/* Abstract Corporate graphic / image showing African healthcare professionals */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 aspect-[4/3]">
                            <img 
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="African Healthcare Professionals" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                            
                            {/* Floating UI Element */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl border border-white/20">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                        <QrCode className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Instant Access</div>
                                        <div className="text-sm font-semibold text-slate-900">Patient #8824 scanned successfully. Medical history decrypted.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section id="solutions" className="py-24 px-6 bg-slate-50 mt-24 border-y border-slate-200">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-sora text-3xl md:text-4xl font-bold text-slate-900 mb-4">Streamlined Clinical Workflows</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">Enhance patient care with immediate access to holistic health data, while maintaining strict compliance automatically.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Activity,
                                    title: "Universal Patient History",
                                    desc: "Access previous diagnoses, lab results, and allergies from other hospitals. No more blind spots in critical care."
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Zero-Knowledge Auditing",
                                    desc: "Every access log is cryptographically signed. Prove compliance to regulators without exposing sensitive health data."
                                },
                                {
                                    icon: LineChart,
                                    title: "Research Revenue Sharing",
                                    desc: "Opt-in to anonymized data aggregation. Earn revenue automatically when researchers query cohorts from your patient pool."
                                }
                            ].map((feature, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                                        <feature.icon className="w-6 h-6 text-blue-600" />
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
                    <div className="bg-blue-600 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-600/20 relative">
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-500 to-transparent skew-x-12 translate-x-1/4"></div>
                        
                        <div className="relative z-10 p-12 md:p-16 grid md:grid-cols-2 gap-12 items-center text-white">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
                                    Rigorous KYC
                                </div>
                                <h2 className="font-sora text-3xl md:text-5xl font-bold mb-6 leading-tight">A network built entirely on trust.</h2>
                                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                    Every medical institution on Selora undergoes strict verification. Patients trust the network because they know their data is only handled by verified professionals.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {[
                                        'Corporate registration verification',
                                        'Medical board license validation',
                                        'Cryptographic identity issuance'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-white" />
                                            </div>
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/hospital/signup" className="inline-flex bg-white text-blue-600 font-bold px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
                                    Begin Verification
                                </Link>
                            </div>
                            <div className="hidden md:flex justify-center">
                                {/* Dashboard image placeholder placeholder placeholder */}
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-sm rotate-2 shadow-2xl">
                                    <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                                        <Building2 className="w-8 h-8 text-white" />
                                        <div>
                                            <div className="font-bold">Lagos General</div>
                                            <div className="text-xs text-blue-200">Verification Pending</div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 bg-white/20 rounded w-full"></div>
                                        <div className="h-2 bg-white/20 rounded w-5/6"></div>
                                        <div className="h-2 bg-white/20 rounded w-4/6"></div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                                        <div className="text-xs font-bold uppercase tracking-wider text-blue-200">Upload License Document</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 py-12 px-6 bg-slate-50 mt-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-md bg-blue-600 p-[2px]">
                            <div className="w-full h-full bg-white rounded-sm flex items-center justify-center">
                            </div>
                        </div>
                        <span className="font-sora text-xl font-bold text-slate-900">Selora <span className="text-slate-500 font-medium">B2B</span></span>
                    </div>
                    
                    <div className="flex gap-6 text-sm font-semibold">
                        <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">For Patients</Link>
                        <Link href="/hospital" className="text-blue-600">For Hospitals</Link>
                        <Link href="/researcher" className="text-slate-500 hover:text-slate-900 transition-colors">For Researchers</Link>
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
