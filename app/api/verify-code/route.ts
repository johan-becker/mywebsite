import { NextRequest, NextResponse } from 'next/server';
import { loginCodeService, supabaseAdmin } from '@/lib/supabase-admin';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { code, email, phone } = await request.json();

    if (!code || (!email && !phone)) {
      return NextResponse.json(
        { error: 'Code and email/phone are required' },
        { status: 400 }
      );
    }

    if (email && phone) {
      return NextResponse.json(
        { error: 'Please provide either email or phone, not both' },
        { status: 400 }
      );
    }

    // Verify the code using our custom service
    const verificationResult = await loginCodeService.verifyCode({
      email,
      phone,
      code
    });

    if (!verificationResult.valid) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    if (!verificationResult.userId) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get the user data
    const { user } = await loginCodeService.getUserById(verificationResult.userId);

    // Create a session using a different approach since admin.createSession might not be available
    // We'll generate a magic link and extract the session from it
    try {
      // Generate a magic link for the user
      const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email: user.email,
      });

      if (linkError) {
        throw linkError;
      }

      // Extract the tokens from the magic link
      const url = new URL(linkData.properties?.action_link || '');
      const access_token = url.searchParams.get('access_token');
      const refresh_token = url.searchParams.get('refresh_token');

      if (!access_token || !refresh_token) {
        throw new Error('Failed to extract tokens from magic link');
      }

      // Verify the session by creating a client with the tokens
      const userClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Set the session
      const { data: sessionData, error: sessionError } = await userClient.auth.setSession({
        access_token,
        refresh_token
      });

      if (sessionError) {
        throw sessionError;
      }

      return NextResponse.json({
        message: 'Verification successful',
        success: true,
        user: sessionData.user,
        session: sessionData.session,
        access_token,
        refresh_token
      });

    } catch (sessionError: any) {
      console.error('Session creation error:', sessionError);
      
      // Fallback: return user data without session, frontend will handle login
      return NextResponse.json({
        message: 'Verification successful',
        success: true,
        user: user,
        // Frontend should use these to create the session
        requiresClientLogin: true,
        email: user.email
      });
    }

  } catch (error: any) {
    console.error('Verify code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 