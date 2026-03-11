import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import RecordsClient from '@/components/patient/RecordsClient'

export default async function PatientRecordsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('patient_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single()

    if (!profile) {
        return <div className="p-8 text-center text-red-400">Profile loading error format.</div>
    }

    const { data: records, error } = await supabase
        .from('medical_records')
        .select('id, title, record_type, file_url, status, created_at')
        .eq('patient_id', profile.id)
        .neq('status', 'deleted')
        .order('created_at', { ascending: false })

    if (error) {
        return <div className="p-8 text-center text-red-400">Error loading records: {error.message}</div>
    }

    return (
        <RecordsClient 
            initialRecords={records || []} 
            patientId={profile.id}
            userId={user.id}
        />
    )
}
