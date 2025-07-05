import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type') || 'signup'

  console.log('Auth callback - type:', type, 'code:', code ? 'present' : 'missing')

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(requestUrl.origin + '/login?error=auth_error')
    }
  }

  // Check the type and redirect accordingly
  if (type === 'recovery') {
    // For password reset, redirect to reset-password page
    console.log('Redirecting to reset-password page for password recovery')
    return NextResponse.redirect(requestUrl.origin + '/reset-password')
  } else if (type === 'signup') {
    // For email confirmation after signup, redirect to login with confirmation message
    console.log('Redirecting to login page after email confirmation')
    return NextResponse.redirect(requestUrl.origin + '/login?confirmed=true')
  } else {
    // Default fallback to login
    console.log('Default redirect to login page')
    return NextResponse.redirect(requestUrl.origin + '/login')
  }
} 