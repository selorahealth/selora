import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import QRGeneratorClient from '@/components/patient/QRGeneratorClient'

export default async function PatientQRPage() {
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
        return <div className="p-8 text-center text-red-400">Profile loading error or missing patient record.</div>
    }

    return (
        <QRGeneratorClient 
            patientId={profile.id}
        />
    )
}
