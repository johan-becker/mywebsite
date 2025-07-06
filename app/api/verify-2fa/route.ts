import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { authenticator } from 'otplib';

export async function POST(request: NextRequest) {
  try {
    const { token, action } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Get the user from the session
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userMetadata = user.user_metadata || {};
    const tempSecret = userMetadata.temp_2fa_secret;
    const twoFactorSecret = userMetadata.two_factor_secret;
    const twoFactorEnabled = userMetadata.two_factor_enabled;

    if (action === 'setup') {
      // Setting up 2FA - verify token with temp secret
      if (!tempSecret) {
        return NextResponse.json(
          { error: 'No 2FA setup in progress' },
          { status: 400 }
        );
      }

      const isValid = authenticator.verify({
        token,
        secret: tempSecret
      });

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid 2FA token' },
          { status: 400 }
        );
      }

      // Enable 2FA and move temp secret to permanent
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          two_factor_secret: tempSecret,
          two_factor_enabled: true,
          temp_2fa_secret: null
        }
      });

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to enable 2FA' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: '2FA enabled successfully',
        enabled: true
      });

    } else if (action === 'verify') {
      // Verifying 2FA during login
      if (!twoFactorEnabled || !twoFactorSecret) {
        return NextResponse.json(
          { error: '2FA not enabled for this account' },
          { status: 400 }
        );
      }

      const isValid = authenticator.verify({
        token,
        secret: twoFactorSecret
      });

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid 2FA token' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        message: '2FA verification successful',
        verified: true
      });

    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('2FA verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 