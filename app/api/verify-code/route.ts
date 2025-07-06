import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// This should match the same storage as send-code (in production, use shared storage)
const verificationCodes = new Map<string, { code: string; expires: number; type: 'email' | 'phone' }>();

export async function POST(request: NextRequest) {
  try {
    const { code, email, phone, type } = await request.json();

    if (!code || (!email && !phone)) {
      return NextResponse.json(
        { error: 'Code and email/phone are required' },
        { status: 400 }
      );
    }

    let verifyResult;

    if (type === 'email' && email) {
      // Verify OTP for email
      verifyResult = await supabase.auth.verifyOtp({
        email: email,
        token: code,
        type: 'email'
      });
    } else if (type === 'phone' && phone) {
      // Verify OTP for SMS
      verifyResult = await supabase.auth.verifyOtp({
        phone: phone,
        token: code,
        type: 'sms'
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid verification type' },
        { status: 400 }
      );
    }

    if (verifyResult.error) {
      return NextResponse.json(
        { error: verifyResult.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Verification successful',
      success: true,
      user: verifyResult.data.user,
      session: verifyResult.data.session
    });

  } catch (error) {
    console.error('Verify code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 