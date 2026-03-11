'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import {
    ShieldAlert,
    Users,
    Activity,
    Server,
    ArrowRight
} from 'lucide-react'

export default function AdminLandingPage() {
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
        <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-indigo-200 selection:text-indigo-900 font-sans flex flex-col">
            {/* Navis Theme Ambient Background (Indigo Tint for Admins) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-100 opacity-50 blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-slate-200 opacity-50 blur-[120px]" />
            </div>

            {/* Navigation */}
            <motion.nav 
                variants={navVariants}
                initial="hidden"
                animate="visible"
                className="relative z-50 flex items-center justify-between px-8 py-6 w-full"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-indigo-600 p-[2px] shadow-sm">
                        <div className="w-full h-full bg-white rounded-sm flex items-center justify-center">
                            <div className="w-3 h-3 rounded-sm bg-indigo-600" />
                        </div>
                    </div>
                    <span className="font-sora text-xl font-bold tracking-tight text-slate-900">
                        Selora<span className="text-indigo-600 text-xs align-top leading-none ml-1">SYSTEMS</span>
                    </span>
                </div>
            </motion.nav>

            <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center p-6">
                <motion.div 
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-indigo-900/5 border border-slate-100 p-8 text-center"
                >
                    <motion.div variants={itemVariants} className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-8 h-8 text-indigo-600" />
                    </motion.div>
                    
                    <motion.h1 variants={itemVariants} className="font-sora text-2xl font-bold text-slate-900 mb-2">
                        Restricted Access
                    </motion.h1>
                    
                    <motion.p variants={itemVariants} className="text-sm text-slate-500 mb-8 leading-relaxed">
                        This portal is strictly for authorized Selora Systems architects and network administrators.
                    </motion.p>
                    
                    <motion.div variants={itemVariants} className="space-y-3">
                        <Link href="/admin/login" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-indigo-600/20 text-sm">
                            Administrator Login <ArrowRight className="w-4 h-4" />
                        </Link>
                        
                        <div className="pt-4 mt-4 border-t border-slate-100">
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Operations Status</div>
                            <div className="grid grid-cols-2 gap-2 text-left">
                                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                    <div className="flex items-center justify-between mb-1">
                                        <Server className="w-3 h-3 text-slate-400" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Nodes</div>
                                    <div className="text-sm font-bold text-slate-700">100% Sync</div>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                    <div className="flex items-center justify-between mb-1">
                                        <Users className="w-3 h-3 text-slate-400" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    </div>
                                    <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">KYC Queue</div>
                                    <div className="text-sm font-bold text-slate-700">14 Pending</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-xs text-slate-400 font-medium"
                >
                    Unauthorized access is logged and reported.
                </motion.div>
            </main>
        </div>
    )
}
