import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(requestUrl.origin + '/login?error=auth_error')
    }
  }

  // Always redirect to /login - the page will handle session check and further redirects
  return NextResponse.redirect(requestUrl.origin + '/login')
} 