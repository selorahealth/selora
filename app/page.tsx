'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import {
    Activity,
    ShieldCheck,
    Wallet,
    ArrowRight,
    MessageSquare,
    Files,
    Clock,
    Search
} from 'lucide-react'

export default function PatientLandingPage() {
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
        <div className="min-h-screen bg-[#0A0A0A] text-gray-300 selection:bg-purple-500/30 selection:text-white overflow-hidden font-sans">
            {/* Alien AI Theme Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-purple-600 opacity-[0.05] blur-[150px]" />
                <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-500 opacity-[0.03] blur-[150px]" />
                <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-pink-500 opacity-[0.03] blur-[120px]" />
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
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 p-[2px]">
                        <div className="w-full h-full bg-[#0A0A0A] rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-orange-500 to-purple-500" />
                        </div>
                    </div>
                    <span className="font-sora text-2xl font-black tracking-tight text-white">
                        Selora<span className="text-purple-500">.</span>
                    </span>
                </div>
                
                <div className="hidden md:flex flex-1 justify-center">
                    <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
                        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                        <Link href="#security" className="hover:text-white transition-colors">Security</Link>
                        <Link href="#earn" className="hover:text-white transition-colors">Earn</Link>
                        <Link href="#about" className="hover:text-white transition-colors">About Us</Link>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <Link href="/login" className="text-sm border border-gray-800 bg-[#111111] hover:bg-gray-800 font-medium text-white px-6 py-2.5 rounded-full transition-all">
                        SIGN IN
                    </Link>
                </div>
            </motion.nav>

            <main className="relative z-10 w-full mt-12 md:mt-24">
                {/* Hero Section */}
                <section className="px-6 max-w-5xl mx-auto text-center">
                    <motion.div 
                        variants={heroVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-white/5 text-gray-300 text-xs font-semibold uppercase tracking-widest mb-8">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                            2 Months Free — Annually
                        </motion.div>
                        
                        <motion.h1 variants={itemVariants} className="font-sora text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">Health Workspace</span>
                        </motion.h1>
                        
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            Plan, organize, and manage your daily medical history in one secure place—without the chaos. Designed specifically for patients prioritizing control.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link href="/signup" className="w-full sm:w-auto bg-white text-black font-semibold px-8 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                                    GET STARTED FOR FREE
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link href="#demo" className="w-full sm:w-auto bg-[#171717] border border-gray-800 hover:border-gray-700 text-white font-semibold px-8 py-3.5 rounded-full flex items-center justify-center transition-all">
                                    BOOK A DEMO
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Dashboard Mockup Showcase (Alien AI Style) */}
                <section className="mt-20 px-4 md:px-8 max-w-[1200px] mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="relative rounded-[2rem] p-[2px] bg-gradient-to-b from-gray-700 via-gray-900 to-[#0A0A0A] shadow-[0_0_80px_rgba(168,85,247,0.1)]"
                    >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-t-[2rem] opacity-50" />
                        
                        <div className="bg-[#111111] rounded-[calc(2rem-2px)] overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-800/50">
                            
                            {/* Sidebar Mock */}
                            <div className="w-full md:w-64 border-r border-gray-800/60 p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-10">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 p-[2px]">
                                            <div className="w-full h-full bg-[#111111] rounded-full flex items-center justify-center">
                                                <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-orange-500 to-purple-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm">Selora</div>
                                            <div className="text-xs text-gray-500">Patient portal</div>
                                        </div>
                                    </div>
                                    
                                    <button className="w-full bg-white/5 hover:bg-white/10 text-white flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium mb-8 transition-colors">
                                        <span className="text-gray-400">+</span> New record
                                    </button>

                                    <div className="space-y-1">
                                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3 px-2">Main</div>
                                        {[
                                            { icon: Activity, label: 'Dashboard', active: true },
                                            { icon: Files, label: 'Medical History' },
                                            { icon: MessageSquare, label: 'Consultations' },
                                            { icon: Clock, label: 'Timeline' },
                                            { icon: Wallet, label: 'Earnings' },
                                        ].map((item, i) => (
                                            <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors ${item.active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                                <item.icon className="w-4 h-4" />
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-gray-800/60 flex items-center gap-3">
                                    <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-gray-700" />
                                    <div>
                                        <div className="text-sm font-medium text-white">Chidi O.</div>
                                        <div className="text-xs text-gray-500">chidi@example.com</div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Area Mock */}
                            <div className="flex-1 p-8 bg-[#0D0D0D]">
                                <div className="flex items-center justify-between gap-4 mb-12">
                                    <div className="flex-1 bg-[#171717] border border-gray-800 rounded-xl px-4 py-2.5 flex items-center gap-3">
                                        <Search className="w-4 h-4 text-gray-500" />
                                        <div className="text-sm text-gray-500">Search records...</div>
                                        <div className="ml-auto text-xs font-mono text-gray-600 bg-gray-800/50 px-2 py-0.5 rounded">⌘ K</div>
                                    </div>
                                    <button className="bg-[#171717] border border-gray-800 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                                        Share Access
                                    </button>
                                </div>

                                <div className="mb-10">
                                    <h2 className="text-3xl font-sora font-medium text-gray-500 mb-2">Hello, Chidi</h2>
                                    <h3 className="text-3xl font-sora font-medium text-white mb-8 gap-2">How is your health today?</h3>
                                    
                                    <div className="flex items-center gap-2 mb-8">
                                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mr-2">Vitals</div>
                                        {['Normal', 'Checkup Needed', 'Past records', 'Medications'].map((tag, i) => (
                                            <div key={i} className={`px-4 py-1.5 rounded-full text-xs font-medium ${i === 0 ? 'bg-purple-500 text-white' : 'bg-[#171717] text-gray-400 hover:text-white border border-gray-800'}`}>
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Glowing Gradient Cards Section */}
                                <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mb-8">
                                    <div className="bg-[#111111] rounded-[calc(1rem-1px)] p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-lg font-medium text-white">Recent Updates</h4>
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[
                                                { icon: Activity, title: 'Sync completed', desc: 'General Hospital visit synced' },
                                                { icon: ShieldCheck, title: 'Access granted', desc: 'Dr. Sarah has temporary view' },
                                                { icon: Wallet, title: 'Earnings', desc: '+ ₦12,500 from Study #42' }
                                            ].map((card, i) => (
                                                <div key={i} className="bg-[#171717] border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors group cursor-pointer">
                                                    <div className="w-8 h-8 rounded-lg bg-[#222] flex items-center justify-center mb-4 group-hover:bg-gray-700 transition-colors">
                                                        <card.icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                                    </div>
                                                    <div className="text-sm text-gray-400 mb-1">{card.desc}</div>
                                                    <div className="text-base font-medium text-white">{card.title}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
                
                {/* Secondary Call to Action built on trust */}
                <section className="py-32 px-6 max-w-5xl mx-auto text-center mt-10 border-t border-gray-900">
                    <h2 className="font-sora text-3xl md:text-5xl font-bold text-white mb-6">Designed for your peace of mind.</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">We prioritize zero-knowledge encryption so your medical data stays exactly where it belongs: in your hands.</p>
                    <Link href="/signup" className="inline-flex bg-white text-black font-semibold px-8 py-3.5 rounded-full gap-2 hover:bg-gray-100 transition-all">
                        Create Your Secure Vault <ArrowRight className="w-4 h-4" />
                    </Link>
                </section>
            </main>

            {/* Platform Nav Links (for ecosystem separation) */}
            <footer className="border-t border-gray-900 py-12 px-6 mt-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 p-[1px]">
                            <div className="w-full h-full bg-[#0A0A0A] rounded-full flex items-center justify-center">
                            </div>
                        </div>
                        <span className="font-sora text-xl font-bold text-white">Selora.</span>
                    </div>
                    
                    <div className="flex gap-6 text-sm">
                        <Link href="/" className="text-purple-400 font-medium">For Patients</Link>
                        <Link href="/hospital" className="text-gray-500 hover:text-white transition-colors">For Hospitals</Link>
                        <Link href="/researcher" className="text-gray-500 hover:text-white transition-colors">For Researchers</Link>
                        <Link href="/admin" className="text-gray-500 hover:text-white transition-colors">Administrators</Link>
                    </div>
                    
                    <div className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Selora Health.
                    </div>
                </div>
            </footer>
        </div>
    )
}