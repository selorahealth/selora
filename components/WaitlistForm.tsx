"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, CheckCircle2 } from 'lucide-react'

export function WaitlistModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!email) return
        
        setStatus('loading')
        setMessage('')

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            
            const data = await res.json()
            if (res.ok) {
                setStatus('success')
                setEmail('')
            } else {
                setStatus('error')
                setMessage(data.error || 'Failed to join waitlist.')
            }
        } catch (err: any) {
            setStatus('error')
            setMessage('Network error. Please try again.')
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-[#1A1C2C] border border-[#2A2D40] rounded-3xl p-8 overflow-hidden shadow-2xl"
                    >
                        {/* Ambient Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-mint/10 blur-[60px] rounded-full pointer-events-none" />
                        
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-[#A0A4C8] hover:text-white bg-[#0A0B14]/50 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-8">
                            <h2 className="font-sora text-2xl font-bold text-white mb-2">Join the Future</h2>
                            <p className="text-sm text-[#A0A4C8] leading-relaxed">
                                Get early access to Selora Health. Your complete medical history, encrypted on your phone.
                            </p>
                        </div>

                        {status === 'success' ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-[#5DFFAD]/10 border border-[#5DFFAD]/30 rounded-2xl p-6 text-center"
                            >
                                <CheckCircle2 className="w-12 h-12 text-[#5DFFAD] mx-auto mb-4" />
                                <h3 className="font-bold text-white mb-2">You're on the list!</h3>
                                <p className="text-sm text-[#A0A4C8]">We'll notify you as soon as early access opens.</p>
                                <button 
                                    onClick={onClose}
                                    className="mt-6 w-full py-3 bg-[#2A2D40] text-white rounded-xl font-bold hover:bg-[#343851] transition-colors"
                                >
                                    Close
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#A0A4C8] mb-1.5 uppercase tracking-wide">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={status === 'loading'}
                                        placeholder="you@example.com"
                                        className="w-full bg-[#0A0B14] border border-[#2A2D40] rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-[#5DFFAD] transition-colors placeholder:text-[#4A4D60]"
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="text-red-400 text-xs px-2">{message}</div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading' || !email}
                                    className="w-full bg-[#5DFFAD] hover:bg-[#4CEB9D] disabled:opacity-50 text-[#0A0B14] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
                                >
                                    {status === 'loading' ? 'Joining...' : 'Get Early Access'}
                                    {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
                                </button>
                                
                                <p className="text-center text-[11px] text-[#A0A4C8] mt-4">
                                    By joining, you agree to our privacy policy. No spam, ever.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
