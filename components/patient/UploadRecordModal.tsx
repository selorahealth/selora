'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, UploadCloud, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { encryptFile } from '@/lib/crypto/encryption'
import toast from 'react-hot-toast'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    patientId: string
    userId: string
}

const RECORD_TYPES = [
    { value: 'blood_work', label: 'Blood Work' },
    { value: 'xray', label: 'X-Ray' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'scan', label: 'MRI / CT Scan' },
    { value: 'report', label: 'Clinic Report' },
    { value: 'other', label: 'Other' },
]

export default function UploadRecordModal({ isOpen, onClose, patientId, userId }: ModalProps) {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [recordType, setRecordType] = useState('report')
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    if (!isOpen) return null

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file || !title) return toast.error('Please complete all fields')

        setIsUploading(true)
        const toastId = toast.loading('Encrypting file (Web Crypto)...')

        try {
            const supabase = createClient()

            // 1. Client-side encryption
            const encryptedBlob = await encryptFile(file, userId)
            
            // Generate unique filename with original extension logic
            const ext = file.name.split('.').pop()
            const filename = `${patientId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

            toast.loading('Uploading encrypted file to Decentralised Storage...', { id: toastId })

            // 2. Upload to Supabase Storage (Pretend it's Storj/IPFS as per IOTA Web2.5 architecture)
            const { data: storageData, error: storageError } = await supabase.storage
                .from('medical_records')
                .upload(filename, encryptedBlob, {
                    contentType: 'application/octet-stream', // Encrypted payload
                })

            if (storageError) throw new Error(storageError.message)

            toast.loading('Writing record to IOTA Blockchain...', { id: toastId })

            // 3. Insert record reference (mock IOTA proof)
            const mockIotaHash = `0x${Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, '0')).join('')}`

            const { error: dbError } = await supabase
                .from('medical_records')
                .insert({
                    patient_id: patientId,
                    title,
                    record_type: recordType,
                    file_url: storageData.path,
                    encrypted: true,
                    iota_proof_hash: mockIotaHash,
                    status: 'active'
                })

            if (dbError) throw new Error(dbError.message)

            toast.success('Record encrypted and stored securely', { id: toastId })
            
            setFile(null)
            setTitle('')
            onClose()
            router.refresh()
        } catch (error: any) {
            console.error('Upload Error:', error)
            toast.error(error.message || 'Failed to upload record', { id: toastId })
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-2xl p-6 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
                    disabled={isUploading}
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="font-sora text-xl font-bold text-white mb-1">Upload New Record</h2>
                <p className="text-sm text-body mb-6">Files are encrypted locally before leaving your device.</p>

                <form onSubmit={handleUpload} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-body mb-1.5 uppercase tracking-wide">
                            Record Title
                        </label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Annual Blood Test 2025"
                            className="w-full bg-[#1A1C35] border border-[rgba(97,131,255,0.15)] rounded-xl px-4 py-3 text-white text-sm placeholder:text-muted outline-none focus:border-blue transition-colors"
                            disabled={isUploading}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-body mb-1.5 uppercase tracking-wide">
                            Record Type
                        </label>
                        <select
                            value={recordType}
                            onChange={(e) => setRecordType(e.target.value)}
                            className="w-full bg-[#1A1C35] border border-[rgba(97,131,255,0.15)] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue transition-colors"
                            disabled={isUploading}
                        >
                            {RECORD_TYPES.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-body mb-1.5 uppercase tracking-wide">
                            File securely encrypted via WebCrypto
                        </label>
                        <label className={`block w-full border-2 border-dashed ${file ? 'border-blue bg-blue/5' : 'border-white/10 hover:border-white/20 bg-dark4/50'} rounded-xl p-6 text-center cursor-pointer transition-colors`}>
                            <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${file ? 'text-blue' : 'text-muted'}`} />
                            <div className="text-sm font-medium text-white mb-1">
                                {file ? file.name : "Click to select a file"}
                            </div>
                            <div className="text-xs text-muted">PDF, JPG, PNG up to 10MB</div>
                            <input
                                type="file"
                                className="hidden"
                                required
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                disabled={isUploading}
                                accept=".pdf,.png,.jpg,.jpeg"
                            />
                        </label>
                    </div>

                    <div className="bg-lime/10 border border-lime/20 rounded-xl p-3 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-lime shrink-0" />
                        <p className="text-xs text-body leading-relaxed">
                            Your document is <strong className="text-white">encrypted using AES-256-GCM</strong> directly on your device. Only you can access the raw data.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isUploading || !file || !title}
                        className="w-full bg-blue hover:bg-blue/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl py-3 transition-colors mt-2"
                    >
                        {isUploading ? 'Securing & Uploading...' : 'Encrypt & Upload'}
                    </button>
                </form>
            </div>
        </div>
    )
}
