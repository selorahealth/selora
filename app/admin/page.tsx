'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import {
    ShieldAlert,
    Users,
    Activity,
    Server,
    ArrowRight,
    Sun,
    Moon,
    Monitor
} from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function AdminLandingPage() {
    const { theme, setTheme } = useTheme()
    const [themeMenuOpen, setThemeMenuOpen] = useState(false)

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
        <div className="min-h-screen bg-dark text-text selection:bg-lime/30 selection:text-white font-sans flex flex-col overflow-hidden transition-colors duration-300">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-lime/10 blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
            </div>

            {/* Navigation */}
            <motion.nav 
                variants={navVariants}
                initial="hidden"
                animate="visible"
                className="relative z-50 flex items-center justify-between px-8 py-6 w-full"
            >
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Selora Logo" width={24} height={24} className="object-contain" />
                    <span className="font-sora text-xl font-bold tracking-tight text-text">
                        Selora<span className="text-lime text-xs align-top leading-none ml-1">SYSTEMS</span>
                    </span>
                </div>

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
            </motion.nav>

            <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center p-6">
                <motion.div 
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md bg-dark2 rounded-2xl shadow-2xl border border-border p-8 text-center"
                >
                    <motion.div variants={itemVariants} className="w-16 h-16 rounded-2xl bg-dark3 border border-border flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-8 h-8 text-lime" />
                    </motion.div>
                    
                    <motion.h1 variants={itemVariants} className="font-sora text-2xl font-bold text-text mb-2">
                        Restricted Access
                    </motion.h1>
                    
                    <motion.p variants={itemVariants} className="text-sm text-body mb-8 leading-relaxed">
                        This portal is strictly for authorized Selora Systems architects and network administrators.
                    </motion.p>
                    
                    <motion.div variants={itemVariants} className="space-y-3">
                        <Link href="/admin/login" className="w-full bg-text hover:opacity-90 text-dark font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
                            Administrator Login <ArrowRight className="w-4 h-4" />
                        </Link>
                        
                        <div className="pt-4 mt-4 border-t border-border">
                            <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">Operations Status</div>
                            <div className="grid grid-cols-2 gap-2 text-left">
                                <div className="bg-dark3 rounded-lg p-3 border border-border">
                                    <div className="flex items-center justify-between mb-1">
                                        <Server className="w-3 h-3 text-muted" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-mint" />
                                    </div>
                                    <div className="text-[10px] text-body uppercase font-semibold tracking-wider">Nodes</div>
                                    <div className="text-sm font-bold text-text">100% Sync</div>
                                </div>
                                <div className="bg-dark3 rounded-lg p-3 border border-border">
                                    <div className="flex items-center justify-between mb-1">
                                        <Users className="w-3 h-3 text-muted" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                    </div>
                                    <div className="text-[10px] text-body uppercase font-semibold tracking-wider">KYC Queue</div>
                                    <div className="text-sm font-bold text-text">14 Pending</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-xs text-muted font-medium"
                >
                    Unauthorized access is logged and reported.
                </motion.div>
            </main>
        </div>
    )
}
