import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createWallet } from '@/lib/iota/wallet'

export async function POST(request: NextRequest) {
    try {
        const { email, password, role, fullName, country, currency } = await request.json()

        // Validate inputs
        if (!email || !password || !role || !fullName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        if (!['patient', 'hospital', 'researcher'].includes(role)) {
            return NextResponse.json(
                { error: 'Invalid role' },
                { status: 400 }
            )
        }

        const supabase = createServiceClient()

        // 1. Create Supabase auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // auto-confirm for now — add email verification later
            user_metadata: { role, full_name: fullName },
        })

        if (authError || !authData.user) {
            return NextResponse.json(
                { error: authError?.message || 'Failed to create user' },
                { status: 400 }
            )
        }

        const userId = authData.user.id

        // 2. Update users table with country/currency
        await supabase
            .from('users')
            .update({ country: country || 'NG', currency: currency || 'NGN' })
            .eq('id', userId)

        // 3. Create IOTA wallet silently in background
        const { address, encryptedSeed } = createWallet()

        // 4. Create role-specific profile with wallet
        if (role === 'patient') {
            const { error: profileError } = await supabase
                .from('patient_profiles')
                .insert({
                    user_id: userId,
                    full_name: fullName,
                    wallet_address: address,
                    wallet_seed_encrypted: encryptedSeed,
                    tier: 'free',
                })

            if (profileError) {
                // Rollback: delete the auth user if profile creation fails
                await supabase.auth.admin.deleteUser(userId)
                return NextResponse.json(
                    { error: 'Failed to create patient profile' },
                    { status: 500 }
                )
            }

            // Auto-create default consent settings
            await supabase
                .from('consent_settings')
                .insert({
                    patient_id: (
                        await supabase
                            .from('patient_profiles')
                            .select('id')
                            .eq('user_id', userId)
                            .single()
                    ).data?.id,
                    emergency_access: true,
                    research_sharing: false,
                    insurance_access: false,
                    pharma_studies: false,
                })

        } else if (role === 'hospital') {
            await supabase
                .from('hospital_profiles')
                .insert({
                    user_id: userId,
                    hospital_name: fullName,
                    wallet_address: address,
                    wallet_seed_encrypted: encryptedSeed,
                    verified: false, // must be approved by admin
                })

        } else if (role === 'researcher') {
            await supabase
                .from('researcher_profiles')
                .insert({
                    user_id: userId,
                    full_name: fullName,
                    institution: '',
                    verified: false,
                })
        }

        return NextResponse.json({
            success: true,
            message: 'Account created successfully',
            userId,
            // Never return wallet address or seed to client
        })

    } catch (error) {
        console.error('Signup error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
