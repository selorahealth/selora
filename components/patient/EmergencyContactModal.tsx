'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ShieldAlert, Search, UserPlus, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function EmergencyContactModal({ patientId }: { patientId: string }) {
    const [emailSearch, setEmailSearch] = useState('')
    const [searching, setSearching] = useState(false)
    const [foundUser, setFoundUser] = useState<any>(null)
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        setSearching(true)
        setError('')
        setFoundUser(null)

        if (!emailSearch) {
            setSearching(false)
            return
        }

        // Search for a user with the given email who is a patient
        const { data, error } = await supabase
            .from('users')
            .select(`
                id,
                email,
                role,
                patient_profiles (
                    id,
                    full_name
                )
            `)
            .eq('email', emailSearch)
            .eq('role', 'patient')
            .single()

        setSearching(false)

        if (error || !data || !data.patient_profiles) {
            setError('No patient found with this email on Selora.')
            return
        }

        const profileList = data.patient_profiles as any
        const contactProfileId = Array.isArray(profileList) ? profileList[0].id : profileList.id;

        if (contactProfileId === patientId) {
            setError('You cannot add yourself as an emergency contact.')
            return
        }

        setFoundUser({
            id: contactProfileId,
            name: Array.isArray(profileList) ? profileList[0].full_name : profileList.full_name,
            email: data.email
        })
    }

    async function handleAddContact() {
        if (!foundUser) return
        setSaving(true)
        setError('')

        const { error } = await supabase
            .from('emergency_contacts')
            .insert({
                patient_id: patientId,
                contact_patient_id: foundUser.id,
                relationship: 'Emergency Contact',
                can_access_records: true, // During onboarding, we'll grant access by default for emergency
            })

        setSaving(false)

        if (error) {
            setError(error.message)
            return
        }

        setSuccess(true)
        setTimeout(() => {
            router.refresh() // Reload layout to clear the modal
        }, 1500)
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0B14]/80 backdrop-blur-md p-4">
            <div className="max-w-md w-full bg-[#1A1C2C] border border-[#2A2D40] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                {/* Ambient glow inside modal */}
                <div className="absolute top-[-20%] left-[-10%] w-[200px] h-[200px] rounded-full bg-[#5DFFAD] opacity-[0.05] blur-[50px] pointer-events-none" />
                
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#2A2D40] flex items-center justify-center border border-[#5DFFAD]/20 relative">
                        <div className="absolute inset-0 rounded-full border border-[#5DFFAD] animate-ping opacity-20" />
                        <ShieldAlert className="w-8 h-8 text-[#5DFFAD]" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-xl font-sora font-bold text-white mb-2">Mandatory Security Step</h2>
                    <p className="text-sm text-[#A0A4C8]">
                        Before accessing your unified health record, you must nominate at least one trusted emergency contact who is also registered on the Selora network.
                    </p>
                </div>

                {success ? (
                    <div className="bg-[#5DFFAD]/10 border border-[#5DFFAD]/20 rounded-xl p-6 text-center">
                        <CheckCircle2 className="w-10 h-10 text-[#5DFFAD] mx-auto mb-3" />
                        <h3 className="text-[#5DFFAD] font-bold mb-1">Contact Added Successfully</h3>
                        <p className="text-[#A0A4C8] text-sm">Initializing your dashboard...</p>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSearch} className="mb-6">
                            <label className="block text-xs font-bold text-[#A0A4C8] mb-2 uppercase tracking-wide">
                                Search Patient by Email
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="w-4 h-4 text-[#A0A4C8] absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        value={emailSearch}
                                        onChange={(e) => setEmailSearch(e.target.value)}
                                        placeholder="contact@email.com"
                                        required
                                        className="w-full bg-[#0A0B14] border border-[#2A2D40] rounded-xl pl-9 pr-4 py-3 text-white text-sm outline-none focus:border-[#6183FF] transition-colors"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={searching}
                                    className="bg-[#2A2D40] hover:bg-[#343851] text-white px-4 rounded-xl font-bold transition-colors disabled:opacity-50"
                                >
                                    {searching ? '...' : 'Find'}
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-4">
                                {error}
                            </div>
                        )}

                        {foundUser && (
                            <div className="bg-[#0A0B14] border border-[#5DFFAD]/30 rounded-xl p-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#2A2D40] flex items-center justify-center font-bold text-white shrink-0">
                                        {foundUser.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-white font-bold text-sm truncate">{foundUser.name}</div>
                                        <div className="text-[#A0A4C8] text-xs truncate">{foundUser.email}</div>
                                    </div>
                                    <UserPlus className="w-5 h-5 text-[#5DFFAD]" />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleAddContact}
                            disabled={!foundUser || saving}
                            className="w-full bg-[#5DFFAD] hover:bg-[#4CEB9D] disabled:opacity-50 disabled:cursor-not-allowed text-[#0A0B14] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            {saving ? 'Saving...' : 'Nominate as Emergency Contact'}
                            {!saving && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
