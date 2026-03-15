'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import {
    Activity, ArrowRight, Building2, CheckCircle2, ChevronRight, FileText, 
    HeartPulse, LineChart, Lock, Monitor, Moon, QrCode, Search, ShieldCheck, 
    Sun, Users, XCircle, FileSignature, Stethoscope, WifiOff
} from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function HospitalLandingPage() {
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
                    <Image src="/logo.png" alt="Selora Logo" width={32} height={32} className="object-contain" />
                    <span className="font-sora text-xl font-bold tracking-tight text-[#0A0B14]">
                        Selora<span className="text-blue text-xs align-top leading-none ml-1">HOSPITAL</span>
                    </span>
                </div>
                
                <div className="hidden md:flex flex-1 justify-center">
                    <div className="flex items-center gap-8 text-sm font-semibold text-gray-600 font-sora">
                        <Link href="#features" className="hover:text-blue transition-colors">Features</Link>
                        <Link href="#pricing" className="hover:text-blue transition-colors">Pricing</Link>
                        <Link href="#case-studies" className="hover:text-blue transition-colors">Case Studies</Link>
                        <Link href="#demo" className="hover:text-blue transition-colors">Book a Demo</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/hospital/login" className="text-sm font-semibold text-gray-600 hover:text-blue transition-colors font-sora">
                        Log In
                    </Link>
                    <Link href="/hospital/signup" className="text-sm bg-blue hover:bg-blue/90 font-semibold text-white px-6 py-2.5 rounded-lg transition-all font-sora shadow-md shadow-blue/20">
                        Get Started <ArrowRight className="inline w-4 h-4 ml-1" />
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
                            Trusted by clinicians across Nigeria, Ghana, and Kenya
                        </motion.div>
                        
                        <motion.h1 variants={itemVariants} className="font-sora text-5xl md:text-[64px] font-black tracking-tight text-[#0A0B14] mb-6 leading-[1.1]">
                            Your patients' records.<br/>
                            <span className="text-blue">Wherever care happens.</span>
                        </motion.h1>
                        
                        <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                            Stop asking patients to remember. Stop chasing faxes. When your staff scan a Selora QR, the patient's verified medical history appears — instantly, with their consent, from any device.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full font-sora">
                            <Link href="#demo" className="w-full sm:w-auto bg-blue text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue/90 transition-all shadow-lg shadow-blue/20">
                                Book a Demo
                            </Link>
                            <Link href="#how-it-works" className="w-full sm:w-auto bg-white border border-gray-200 text-[#0A0B14] font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                                See How It Works  <ArrowRight className="w-4 h-4 text-blue" />
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
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white min-h-[400px]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue/5 to-transparent z-0" />
                            
                            {/* Floating UI Element overlays onto the image to simulate the interface */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-gray-100 z-20">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-sora font-bold text-[#0A0B14]">Sarah O.</span>
                                            <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-600 text-[10px] font-bold uppercase tracking-widest">Verified History</span>
                                        </div>
                                        <div className="text-sm text-gray-500">Records accessed successfully via QR scan.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Problem Strip */}
                <section className="bg-gray-50 py-20 border-y border-gray-100 mb-32">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <XCircle className="w-6 h-6 text-red-500" />
                                    <h3 className="font-sora font-bold text-lg text-[#0A0B14]">"Do you have any records with you?"</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm">Most patients arrive with nothing. No history, no allergies, no medication list. Your team works blind.</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <XCircle className="w-6 h-6 text-red-500" />
                                    <h3 className="font-sora font-bold text-lg text-[#0A0B14]">The referral letter that never arrives</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm">You referred a patient three weeks ago. The receiving hospital still doesn't have your notes. The patient is being re-investigated from scratch.</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <XCircle className="w-6 h-6 text-red-500" />
                                    <h3 className="font-sora font-bold text-lg text-[#0A0B14]">Duplicate tests. Preventable errors.</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm">Without a shared record, patients get the same blood work done twice, the same questions asked five times, the same risks missed.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="px-6 max-w-[1200px] mx-auto mb-32">
                    <div className="text-center mb-16">
                        <h2 className="font-sora text-3xl md:text-5xl font-bold text-[#0A0B14] mb-4">Three steps. No IT project required.</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-16 h-16 rounded-2xl bg-blue/10 flex items-center justify-center font-sora font-black text-2xl text-blue mb-8">1</div>
                            <h3 className="font-sora text-xl font-bold text-[#0A0B14] mb-4">Your patient opens Selora</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">They tap "Share access" and show you a QR code. Takes eight seconds.</p>
                        </div>
                        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-16 h-16 rounded-2xl bg-blue/10 flex items-center justify-center font-sora font-black text-2xl text-blue mb-8">2</div>
                            <h3 className="font-sora text-xl font-bold text-[#0A0B14] mb-4">Your staff scan it</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">Any phone, any tablet, any computer. No app required on your end. The QR opens a secure view of the patient's records — everything they've chosen to share.</p>
                        </div>
                        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-16 h-16 rounded-2xl bg-blue/10 flex items-center justify-center font-sora font-black text-2xl text-blue mb-8">3</div>
                            <h3 className="font-sora text-xl font-bold text-[#0A0B14] mb-4">You see their verified history</h3>
                            <p className="text-gray-600 leading-relaxed text-sm mb-4">Lab results, prescriptions, imaging reports, consultant notes. Each record labelled by who provided it and when. Verified records carry a green badge from the originating institution.</p>
                            <p className="text-xs text-gray-400">Access expires automatically when the patient set it to. Every access is logged on the patient's audit trail.</p>
                        </div>
                    </div>
                </section>

                {/* Features Matrix Grid */}
                <section id="features" className="px-6 max-w-[1200px] mx-auto mb-32">
                    <div className="mb-16 max-w-2xl">
                        <h2 className="font-sora text-3xl md:text-5xl font-bold text-[#0A0B14] mb-4">Built for how Nigerian hospitals actually work.</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { title: "Instant QR Access", icon: QrCode, desc: "No login required for clinical staff to view a record. Scan the QR, see the history. Works on any device with a browser." },
                            { title: "Verified Record Provenance", icon: ShieldCheck, desc: "Every record carries its source — which hospital, which lab, which doctor. Self-reported records are clearly marked. Your clinical team always knows what they're looking at." },
                            { title: "Cosign & Add Records", icon: FileSignature, desc: "Your team can add records to a patient's file directly — discharge summaries, investigation results, follow-up notes. Patient approves what gets added. Institution is credited as source." },
                            { title: "Emergency Profile — No PIN Required", icon: HeartPulse, desc: "Blood type, known allergies, current medications, emergency contact. Always accessible without patient interaction. Critical for unconscious or unresponsive patients." },
                            { title: "Staff Access Management", icon: Users, desc: "Assign roles to your clinical and admin staff. Doctors get record access. Receptionists get scheduling only. Audit every action. Remove access instantly when staff leave." },
                            { title: "Works Offline", icon: WifiOff, desc: "Emergency profile and last-loaded records available even without internet. Designed for Nigerian network conditions." },
                            { title: "FHIR-Ready Integration", icon: Building2, desc: "Already running an EMR? Connect Selora to your existing system via our FHIR R4 API. Records flow both ways. No duplicate data entry." },
                            { title: "Full Audit Trail", icon: FileText, desc: "Every scan, every access, every record addition — logged immutably. Protects your institution in disputes. Required for accreditation." },
                        ].map((feature, i) => (
                            <div key={i} className="flex gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center shrink-0 border border-blue/10">
                                    <feature.icon className="w-6 h-6 text-blue" />
                                </div>
                                <div>
                                    <h3 className="font-sora font-bold text-[#0A0B14] mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Trust Section */}
                <section className="bg-[#0A0B14] text-white py-24 mb-32">
                    <div className="max-w-[1000px] mx-auto px-6 text-center">
                        <h2 className="font-sora text-3xl md:text-5xl font-bold mb-8">Your patients' privacy is not a feature.<br/>It's the architecture.</h2>
                        <p className="text-lg text-gray-400 leading-relaxed mb-12 max-w-3xl mx-auto">
                            Selora is built on a foundational guarantee: your institution never holds your patients' encryption keys. Records are encrypted on the patient's device before Selora ever sees them. When a patient revokes access, access ends — immediately, irreversibly, on the blockchain. No override. Not even by us.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto mb-12">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <Lock className="w-8 h-8 text-blue mb-4" />
                                <p className="text-sm">Patient data cannot be subpoenaed from Selora — we don't have it</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <ShieldCheck className="w-8 h-8 text-blue mb-4" />
                                <p className="text-sm">A breach of Selora's servers exposes no readable health data</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <FileText className="w-8 h-8 text-blue mb-4" />
                                <p className="text-sm">Your institution's liability for patient data loss is structurally reduced</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-blue font-sora">
                            <span className="px-4 py-2 rounded-full border border-blue/20 bg-blue/10 text-white">NDPR compliant</span>
                            <span className="px-4 py-2 rounded-full border border-blue/20 bg-blue/10 text-white">GDPR-aligned</span>
                            <span className="px-4 py-2 rounded-full border border-blue/20 bg-blue/10 text-white">HL7 FHIR R4 ready</span>
                        </div>
                    </div>
                </section>

                {/* Pricing Placeholder */}
                <section id="pricing" className="px-6 max-w-[1200px] mx-auto mb-32">
                    <div className="text-center mb-16">
                        <h2 className="font-sora text-3xl md:text-5xl font-bold text-[#0A0B14] mb-4">Simple. Scales with how you use it.</h2>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="p-6 font-sora text-[#0A0B14]"></th>
                                    <th className="p-6 font-sora font-bold text-[#0A0B14] text-center border-l border-gray-200">Scan Only</th>
                                    <th className="p-6 font-sora font-bold text-[#0A0B14] text-center border-l border-gray-200 bg-blue/5">Starter</th>
                                    <th className="p-6 font-sora font-bold text-[#0A0B14] text-center border-l border-gray-200">Professional</th>
                                    <th className="p-6 font-sora font-bold text-[#0A0B14] text-center border-l border-gray-200">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b border-gray-200">
                                    <td className="p-6 font-medium text-gray-600">Monthly</td>
                                    <td className="p-6 text-center font-bold text-gray-900 border-l border-gray-200">Free</td>
                                    <td className="p-6 text-center font-bold text-blue border-l border-gray-200 bg-blue/5">₦45,000</td>
                                    <td className="p-6 text-center font-bold text-gray-900 border-l border-gray-200">₦120,000</td>
                                    <td className="p-6 text-center font-bold text-gray-900 border-l border-gray-200">Custom</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="p-4 px-6 text-gray-600">QR Scans</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200">50/month</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 bg-blue/5">500/month</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200">Unlimited</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200">Unlimited</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="p-4 px-6 text-gray-600">Staff Accounts</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200">3</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 bg-blue/5">10</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200">50</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200">Unlimited</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="p-4 px-6 text-gray-600">Add Records</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 text-gray-300">✗</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 bg-blue/5 text-green-500"><CheckCircle2 className="w-5 h-5 mx-auto"/></td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 text-green-500"><CheckCircle2 className="w-5 h-5 mx-auto"/></td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 text-green-500"><CheckCircle2 className="w-5 h-5 mx-auto"/></td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="p-4 px-6 text-gray-600">Cosigning</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 text-gray-300">✗</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 bg-blue/5 text-gray-300">✗</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 text-green-500"><CheckCircle2 className="w-5 h-5 mx-auto"/></td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 text-green-500"><CheckCircle2 className="w-5 h-5 mx-auto"/></td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="p-4 px-6 text-gray-600">EMR Integration</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 text-gray-300">✗</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 bg-blue/5 text-gray-300">✗</td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 text-green-500"><CheckCircle2 className="w-5 h-5 mx-auto"/></td>
                                    <td className="p-4 px-6 text-center border-l border-gray-200 text-green-500"><CheckCircle2 className="w-5 h-5 mx-auto"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center mt-8">
                        <p className="text-sm text-gray-500 mb-6">All paid plans include a 30-day free trial. No setup fees. Cancel anytime.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 font-sora">
                            <Link href="/hospital/signup" className="bg-blue text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-blue/90 transition-colors">
                                Start Free Trial
                            </Link>
                            <Link href="#contact" className="bg-white border border-gray-300 text-[#0A0B14] font-bold py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors">
                                Talk to Sales for Enterprise <ArrowRight className="inline w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="px-6 max-w-[800px] mx-auto text-center py-20 bg-blue/5 rounded-[3rem] border border-blue/10 mb-20">
                    <h2 className="font-sora text-4xl font-bold text-[#0A0B14] mb-6">Ready to see it in your hospital?</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                        A demo takes 20 minutes. We'll show you a live scan, walk through the staff dashboard, and answer every question your IT team has.
                    </p>
                    <Link 
                        href="#demo" 
                        className="inline-flex px-10 py-5 bg-blue text-white text-lg font-bold rounded-xl hover:bg-blue/90 transition-all shadow-xl shadow-blue/20 tracking-wide font-sora"
                    >
                        Book a Demo
                    </Link>
                    <div className="mt-4 text-sm text-gray-500 font-sora">No commitment. No sales pressure. Just the product.</div>
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
                            <li><Link href="/hospital" className="text-blue transition-colors">For Hospitals</Link></li>
                            <li><Link href="/researcher" className="hover:text-blue transition-colors">For Researchers</Link></li>
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
