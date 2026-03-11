import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  // Sign out server-side (invalidates the session token in Supabase)
  const { error } = await supabase.auth.signOut({ scope: 'global' })
  
  if (error) {
    console.error('Sign out error:', error)
  }

  // Redirect to the universal login page
  return NextResponse.redirect(new URL('/login', request.url), {
    status: 302,
  })
}
