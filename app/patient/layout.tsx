import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import EmergencyContactModal from '@/components/patient/EmergencyContactModal'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

    const role = userData?.role || 'patient'

    // Fetch patient profile and emergency contacts
    let requiresEmergencyContact = false;
    let patientId = null;

    if (role === 'patient') {
        const { data: patientProfile } = await supabase
            .from('patient_profiles')
            .select('id')
            .eq('user_id', user.id)
            .single()

        if (patientProfile) {
            patientId = patientProfile.id;
            const { count } = await supabase
                .from('emergency_contacts')
                .select('*', { count: 'exact', head: true })
                .eq('patient_id', patientId)

            requiresEmergencyContact = count === 0;
        }
    }

    return (
        <div className="min-h-screen bg-[#0A0B14] flex text-[#A0A4C8] relative">
            {requiresEmergencyContact && patientId && (
                <EmergencyContactModal patientId={patientId} />
            )}
            
            <Sidebar role={role} />
            <div className={`flex-1 flex flex-col min-w-0 ${requiresEmergencyContact ? 'pointer-events-none blur-sm' : ''}`}>
                <Topbar user={user} role={role} />
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Ambient glow for dashboards */}
                    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#6183FF] opacity-[0.03] blur-[150px]" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#5DFFAD] opacity-[0.02] blur-[150px]" />
                    </div>
                    {children}
                </main>
            </div>
        </div>
    )
}
