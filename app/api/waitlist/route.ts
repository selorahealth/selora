import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email } = body

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email address required.' }, { status: 400 })
        }

        // Initialize Google Auth
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        })

        const sheets = google.sheets({ version: 'v4', auth })
        const spreadsheetId = process.env.GOOGLE_SHEET_ID

        // Append to the sheet
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:B', // Adjust if your sheet name is different
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [email, new Date().toISOString()] // Col A: Email, Col B: Timestamp
                ],
            },
        })

        return NextResponse.json({ success: true, message: 'Added to waitlist!' }, { status: 200 })
    } catch (error: any) {
        console.error('Waitlist Error:', error)
        return NextResponse.json({ error: 'Failed to join waitlist. Please try again later.' }, { status: 500 })
    }
}
