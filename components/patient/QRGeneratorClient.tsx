'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { RefreshCw, Share2, Shield, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function QRGeneratorClient({ patientId }: { patientId: string }) {
    const [token, setToken] = useState<string | null>(null)
    const [expiresAt, setExpiresAt] = useState<Date | null>(null)
    const [timeLeft, setTimeLeft] = useState<number>(0)
    const [isGenerating, setIsGenerating] = useState(true)

    const generateNewToken = async () => {
        setIsGenerating(true)
        try {
            const supabase = createClient()
            const newToken = crypto.randomUUID()
            
            // Valid for 10 minutes
            const expiration = new Date()
            expiration.setMinutes(expiration.getMinutes() + 10)

            const { error } = await supabase
                .from('qr_tokens')
                .insert({
                    patient_id: patientId,
                    token_hash: newToken,
                    expires_at: expiration.toISOString()
                })

            if (error) throw error

            setToken(newToken)
            setExpiresAt(expiration)
            toast.success('Generated new access token')
        } catch (error) {
            console.error(error)
            toast.error('Failed to generate secure token')
        } finally {
            setIsGenerating(false)
        }
    }

    // Initial load
    useEffect(() => {
        generateNewToken()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Timer logic
    useEffect(() => {
        if (!expiresAt) return

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const diff = expiresAt.getTime() - now
            
            if (diff <= 0) {
                setTimeLeft(0)
                setToken(null)
                clearInterval(interval)
                // Auto-regenerate or wait for user? Let user manually regenerate.
            } else {
                setTimeLeft(Math.floor(diff / 1000))
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [expiresAt])

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0')
        const s = (seconds % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    const qrValue = token ? `selora://access/${token}` : ''

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header section */}
            <div className="mb-8">
                <h1 className="font-sora text-3xl font-bold text-white mb-2">Hospital Access</h1>
                <p className="text-muted">Generate a temporary, one-time QR code for doctors to access your encrypted history.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* QR Display */}
                <div className="bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-mint/10 blur-[80px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue/10 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10 w-full flex flex-col items-center">
                        <div className={`transition-opacity duration-300 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
                            {token ? (
                                <div className="bg-white p-4 rounded-2xl shadow-xl">
                                    <QRCodeSVG 
                                        value={qrValue} 
                                        size={220} 
                                        level="H"
                                        fgColor="#0A0B14"
                                    />
                                </div>
                            ) : (
                                <div className="w-[252px] h-[252px] bg-dark4/50 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center">
                                    <span className="text-muted font-medium">Token expired</span>
                                </div>
                            )}
                        </div>

                        {token && (
                            <div className="mt-8 bg-dark4/50 border border-white/5 rounded-xl px-6 py-3 flex items-center gap-3">
                                <Clock className={`w-5 h-5 ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-mint'}`} />
                                <div className="text-left">
                                    <div className="text-xs text-muted font-medium mb-0.5">Expires in</div>
                                    <div className={`font-mono text-xl font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-white'}`}>
                                        {formatTime(timeLeft)}
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={generateNewToken}
                            disabled={isGenerating}
                            className="mt-6 bg-dark3 hover:bg-dark4 text-white border border-white/10 px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                            Regenerate Code
                        </button>
                    </div>
                </div>

                {/* Instructions / Security */}
                <div className="space-y-6">
                    <div className="bg-[#1A1C35] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-blue" />
                            </div>
                            <h3 className="font-sora text-lg font-bold text-white">Zero-Knowledge Security</h3>
                        </div>
                        <ul className="space-y-3 text-sm text-body">
                            <li className="flex items-start gap-2">
                                <span className="text-blue mt-0.5">•</span>
                                This QR code acts as a cryptographic skeleton key for your records.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue mt-0.5">•</span>
                                It is valid for exactly 10 minutes and single-use only.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue mt-0.5">•</span>
                                The hospital's scanner will generate an on-chain zero-knowledge proof of access, which will appear in your Access Log instantly.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#1A1C35] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-white">Need to share remotely?</h3>
                            <button 
                                onClick={() => {
                                    if(token) {
                                        navigator.clipboard.writeText(token)
                                        toast.success('Token copied to clipboard')
                                    }
                                }}
                                disabled={!token}
                                className="w-8 h-8 rounded-full bg-dark4 hover:bg-dark4/80 flex items-center justify-center transition-colors text-white disabled:opacity-50"
                                title="Copy Token ID"
                            >
                                <Share2 className="w-4 h-4 text-muted" />
                            </button>
                        </div>
                        <p className="text-sm text-body">
                            If you are doing a tele-health consultation, click the share icon above to copy your raw 36-character token and send it to your doctor safely.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
