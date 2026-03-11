import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    // Prevent caching of sensitive record presigned URLs
    const secureHeaders = { 'Cache-Control': 'no-store, max-age=0' }

    try {
        const supabase = await createClient()
        const { id } = await params
        
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: secureHeaders })
        }

        const { data: record, error: dbError } = await supabase
            .from('medical_records')
            .select('file_url')
            .eq('id', id)
            .single()

        if (dbError || !record) {
            return NextResponse.json({ error: 'Record not found' }, { status: 404, headers: secureHeaders })
        }

        // Use short-lived presigned URLs (60 seconds) instead of public buckets
        const { data, error } = await supabase.storage.from('medical_records').createSignedUrl(record.file_url, 60)

        if (error || !data) {
            return NextResponse.json({ error: 'Failed to generate secure URL' }, { status: 500, headers: secureHeaders })
        }

        return NextResponse.json({ url: data.signedUrl }, { headers: secureHeaders })

    } catch (e) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: secureHeaders })
    }
}