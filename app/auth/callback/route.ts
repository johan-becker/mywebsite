import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type') || 'signup'

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(requestUrl.origin + '/login?error=auth_error')
    }
  }

  // Check if this is a password recovery flow
  if (type === 'recovery') {
    // For password reset, redirect to reset-password page
    return NextResponse.redirect(requestUrl.origin + '/reset-password')
  } else {
    // For regular email confirmation, redirect to login
    return NextResponse.redirect(requestUrl.origin + '/login?confirmed=true')
  }
} 