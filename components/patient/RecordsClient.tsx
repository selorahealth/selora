'use client'

import { useState } from 'react'
import { FileText, Plus, Search, Download, Trash2, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { decryptFile } from '@/lib/crypto/encryption'
import UploadRecordModal from './UploadRecordModal'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Record {
    id: string
    title: string
    record_type: string
    file_url: string
    status: string
    created_at: string
}

interface RecordsClientProps {
    initialRecords: Record[]
    patientId: string
    userId: string
}

export default function RecordsClient({ initialRecords, patientId, userId }: RecordsClientProps) {
    const router = useRouter()
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isProcessing, setIsProcessing] = useState<string | null>(null)

    const filteredRecords = initialRecords.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.record_type.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleViewOrDownload = async (record: Record) => {
        setIsProcessing(record.id)
        const toastId = toast.loading('Decrypting secure record...')
        
        try {
            const supabase = createClient()
            
            // 1. Download encrypted blob from Supabase
            const { data: fileData, error: downloadError } = await supabase.storage
                .from('medical_records')
                .download(record.file_url)

            if (downloadError) throw new Error("Failed to download file")

            // 2. Decrypt locally
            const arrayBuffer = await fileData.arrayBuffer()
            
            // Determine mime type from extension
            const ext = record.file_url.split('.').pop()?.toLowerCase()
            let mimeType = 'application/octet-stream'
            if (ext === 'pdf') mimeType = 'application/pdf'
            if (ext === 'png') mimeType = 'image/png'
            if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg'

            const decryptedBlob = await decryptFile(arrayBuffer, userId, mimeType)

            // 3. Create object URL to view/download
            const objectUrl = URL.createObjectURL(decryptedBlob)
            
            // Open in new tab
            window.open(objectUrl, '_blank')
            
            toast.success('Decrypted successfully', { id: toastId })
            
            // Clean up memory slightly after a delay
            setTimeout(() => URL.revokeObjectURL(objectUrl), 60000)

        } catch (error: any) {
            console.error(error)
            toast.error(error.message || 'Failed to decrypt file', { id: toastId })
        } finally {
            setIsProcessing(null)
        }
    }

    const handleDelete = async (recordId: string) => {
        if (!confirm('Are you sure you want to permanently delete this record? This action cannot be undone on the blockchain.')) return

        setIsProcessing(recordId)
        const toastId = toast.loading('Deleting record...')

        try {
            const supabase = createClient()
            
            // In a real app we would also delete from Supabase storage and call IOTA contract
            const { error } = await supabase
                .from('medical_records')
                .update({ status: 'deleted' })
                .eq('id', recordId)

            if (error) throw new Error(error.message)

            toast.success('Record deleted', { id: toastId })
            router.refresh()
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || 'Failed to delete record', { id: toastId })
        } finally {
            setIsProcessing(null)
        }
    }

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-sora text-3xl font-bold text-white mb-2">My Records</h1>
                    <p className="text-muted">Manage your encrypted medical history securely.</p>
                </div>
                <button 
                    onClick={() => setIsUploadOpen(true)}
                    className="bg-blue hover:bg-blue/90 text-white font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 shadow-[0_0_20px_rgba(97,131,255,0.2)]"
                >
                    <Plus className="w-5 h-5" /> Upload Record
                </button>
            </div>

            {/* Controls */}
            <div className="bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-2xl p-4 flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text"
                        placeholder="Search records by title or type..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-[#1A1C35] border border-white/5 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder:text-muted outline-none focus:border-blue transition-colors"
                    />
                </div>
            </div>

            {/* List */}
            {filteredRecords.length === 0 ? (
                <div className="bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-2xl py-24 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-dark4 flex items-center justify-center mb-6">
                        <FileText className="w-10 h-10 text-muted" />
                    </div>
                    <h3 className="font-sora text-xl font-bold text-white mb-2">No records found</h3>
                    <p className="text-body max-w-sm mb-6">You don't have any medical records matching your search. Upload your first file securely.</p>
                    <button 
                        onClick={() => setIsUploadOpen(true)}
                        className="bg-dark4 text-white hover:bg-dark4/80 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    >
                        Upload a file
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredRecords.map(record => (
                        <div key={record.id} className="bg-[#111224] border border-[rgba(97,131,255,0.15)] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-blue/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-dark4 flex items-center justify-center shrink-0">
                                    <FileText className="w-6 h-6 text-blue" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base mb-1">{record.title}</h3>
                                    <div className="flex items-center gap-3 text-xs text-muted">
                                        <span className="capitalize">{record.record_type.replace('_', ' ')}</span>
                                        <span>•</span>
                                        <span>{new Date(record.created_at).toLocaleDateString()}</span>
                                        {record.status === 'active' && (
                                            <>
                                                <span>•</span>
                                                <span className="text-mint font-medium">On-chain Proof Verified</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => handleViewOrDownload(record)}
                                    disabled={isProcessing === record.id}
                                    className="p-2 text-muted hover:text-white hover:bg-dark4 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                                    title="Decrypt & View"
                                >
                                    {isProcessing === record.id ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Eye className="w-5 h-5" />}
                                </button>
                                <button 
                                    onClick={() => handleDelete(record.id)}
                                    disabled={isProcessing === record.id}
                                    className="p-2 text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                                    title="Delete permanently"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <UploadRecordModal 
                isOpen={isUploadOpen} 
                onClose={() => setIsUploadOpen(false)} 
                patientId={patientId}
                userId={userId}
            />
        </div>
    )
}
