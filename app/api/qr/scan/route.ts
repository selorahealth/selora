import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
    // Prevent caching for sensitive token operations
    const secureHeaders = { 'Cache-Control': 'no-store, max-age=0' }

    try {
        const supabase = await createClient()
        const body = await request.json()
        const { token, patientId } = body

        if (!token || !patientId) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400, headers: secureHeaders })
        }

        // Query the latest valid token without matching the hash query directly
        // This mitigates DB-level timing attacks
        const { data: dbTokens, error } = await supabase
            .from('qr_tokens')
            .select('token_hash, expires_at')
            .eq('patient_id', patientId)
            .gte('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false })
            .limit(1)

        if (error || !dbTokens || dbTokens.length === 0) {
            return NextResponse.json({ error: 'Access denied or token expired' }, { status: 403, headers: secureHeaders })
        }

        const dbTokenHash = dbTokens[0].token_hash

        // Enforce constant-time string comparison for token checking to prevent timing timing attacks
        const inputBuffer = Buffer.from(token)
        const dbBuffer = Buffer.from(dbTokenHash)

        if (inputBuffer.length !== dbBuffer.length) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 403, headers: secureHeaders })
        }

        if (crypto.timingSafeEqual(inputBuffer, dbBuffer)) {
            return NextResponse.json({ success: true, message: 'Token valid. Access granted.' }, { headers: secureHeaders })
        } else {
            return NextResponse.json({ error: 'Invalid token' }, { status: 403, headers: secureHeaders })
        }
    } catch (e) {
        return NextResponse.json({ error: 'Internal validation error' }, { status: 500, headers: secureHeaders })
    }
}