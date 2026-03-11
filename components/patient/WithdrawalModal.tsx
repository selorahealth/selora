'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Building2, CreditCard } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    patientId: string
    currency: string
    availableBalance: number
}

// Mock Nigerian Banks for demo
const BANKS = [
    { code: '044', name: 'Access Bank' },
    { code: '058', name: 'Guaranty Trust Bank' },
    { code: '033', name: 'United Bank for Africa' },
    { code: '057', name: 'Zenith Bank' },
    { code: '011', name: 'First Bank of Nigeria' },
]

export default function WithdrawalModal({ isOpen, onClose, patientId, currency, availableBalance }: ModalProps) {
    const router = useRouter()
    const [amount, setAmount] = useState('')
    const [bankCode, setBankCode] = useState(BANKS[0].code)
    const [accountNumber, setAccountNumber] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    if (!isOpen) return null

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const numAmount = parseFloat(amount)
        if (isNaN(numAmount) || numAmount <= 0) {
            return toast.error('Please enter a valid amount')
        }
        
        if (numAmount > availableBalance) {
            return toast.error('Insufficient available balance')
        }

        if (accountNumber.length < 10) {
            return toast.error('Enter a valid 10-digit account number')
        }

        setIsProcessing(true)
        const toastId = toast.loading('Initiating withdrawal...')

        try {
            const supabase = createClient()
            
            // In a real app, we would:
            // 1. Verify account name via Flutterwave Bank Verification
            // 2. Initiate Transfer via Flutterwave API
            // 3. Update IOTA contract to mark funds as withdrawn
            
            // Mock Flutterwave reference
            const flwRef = `FLW-${Math.random().toString(36).substring(2, 10).toUpperCase()}`

            // Insert withdrawal record
            const { error } = await supabase
                .from('withdrawals')
                .insert({
                    patient_id: patientId,
                    amount_local: numAmount,
                    currency,
                    bank_code: bankCode,
                    account_number: accountNumber,
                    account_name: 'Verified Patient Account', // Mock verified name
                    flutterwave_ref: flwRef,
                    status: 'processing' // Starts processing, webhooks resolve it later
                })

            if (error) throw error

            // For the demo, we optimistically add a negative earning entry to deduct the balance
            // Real system would debit `earnings` status or keep a ledger balance
            await supabase.from('earnings').insert({
                patient_id: patientId,
                amount_local: -numAmount,
                currency,
                status: 'withdrawn',
                iota_tx_digest: 'withdrawal_deduction'
            })

            toast.success('Withdrawal processing started', { id: toastId })
            
            setAmount('')
            setAccountNumber('')
            onClose()
            router.refresh()
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || 'Withdrawal failed', { id: toastId })
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-2xl p-6 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
                    disabled={isProcessing}
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="font-sora text-xl font-bold text-white mb-1">Withdraw Funds</h2>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                    <p className="text-sm text-body">Available Balance:</p>
                    <p className="font-mono text-lg font-bold text-mint">
                        {currency} {availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>

                <form onSubmit={handleWithdraw} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-body mb-1.5 uppercase tracking-wide">
                            Amount ({currency})
                        </label>
                        <input
                            type="number"
                            required
                            min="100"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-[#1A1C35] border border-[rgba(97,131,255,0.15)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted outline-none focus:border-lime transition-colors font-mono"
                            disabled={isProcessing}
                        />
                    </div>

                    <div>
                        <label className="flex items-center justify-between text-xs font-medium text-body mb-1.5 uppercase tracking-wide">
                            <span>Select Bank</span>
                            <Building2 className="w-3 h-3" />
                        </label>
                        <select
                            value={bankCode}
                            onChange={(e) => setBankCode(e.target.value)}
                            className="w-full bg-[#1A1C35] border border-[rgba(97,131,255,0.15)] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-lime transition-colors"
                            disabled={isProcessing}
                        >
                            {BANKS.map(bank => (
                                <option key={bank.code} value={bank.code}>{bank.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="flex items-center justify-between text-xs font-medium text-body mb-1.5 uppercase tracking-wide">
                            <span>Account Number</span>
                            <CreditCard className="w-3 h-3" />
                        </label>
                        <input
                            type="text"
                            required
                            maxLength={10}
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="0123456789"
                            className="w-full bg-[#1A1C35] border border-[rgba(97,131,255,0.15)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted outline-none focus:border-lime transition-colors font-mono"
                            disabled={isProcessing}
                        />
                    </div>

                    <p className="text-xs text-muted text-center py-2">
                        Withdrawals are typically processed within 5 minutes via Flutterwave.
                    </p>

                    <button
                        type="submit"
                        disabled={isProcessing || !amount || !accountNumber}
                        className="w-full bg-lime hover:bg-lime/90 text-dark font-bold text-sm rounded-xl py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? 'Processing Transfer...' : 'Withdraw to Bank'}
                    </button>
                </form>
            </div>
        </div>
    )
}
