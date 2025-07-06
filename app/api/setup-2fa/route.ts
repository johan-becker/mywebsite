import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  try {
    // Get the user from the session
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Generate a secret for the user
    const secret = authenticator.generateSecret();
    
    // Create the service name and account name for the QR code
    const serviceName = 'Portfolio Auth';
    const accountName = user.email;
    
    // Generate the otpauth URL
    const otpauthUrl = authenticator.keyuri(accountName, serviceName, secret);
    
    // Generate QR code
    const qrCodeDataURL = await QRCode.toDataURL(otpauthUrl);
    
    // Store the secret in the user's metadata (temporarily, until verified)
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        temp_2fa_secret: secret,
        two_factor_enabled: false
      }
    });
    
    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to setup 2FA' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      secret,
      qrCode: qrCodeDataURL,
      manualEntryKey: secret
    });

  } catch (error) {
    console.error('2FA setup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 