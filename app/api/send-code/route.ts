import { NextRequest, NextResponse } from 'next/server';
import { loginCodeService, supabaseAdmin } from '@/lib/supabase-admin';
import { sendVerificationEmail } from '@/lib/email-service';
import { sendVerificationSMS, validatePhoneNumber } from '@/lib/sms-service';

export async function POST(request: NextRequest) {
  try {
    const { email, phone } = await request.json();

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Email or phone number is required' },
        { status: 400 }
      );
    }

    if (email && phone) {
      return NextResponse.json(
        { error: 'Please provide either email or phone, not both' },
        { status: 400 }
      );
    }

    // Validate email format
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Validate phone format
    if (phone && !validatePhoneNumber(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Check if user exists
    const { data: users } = await supabaseAdmin.auth.admin.listUsers();
    let userExists = false;

    if (email) {
      userExists = users.users.some(user => user.email === email);
    } else if (phone) {
      userExists = users.users.some(user => 
        user.phone === phone || user.user_metadata?.phone_number === phone
      );
    }

    if (!userExists) {
      return NextResponse.json(
        { error: 'No account found with this email or phone number' },
        { status: 404 }
      );
    }

    // Get client information for abuse prevention
    const userAgent = request.headers.get('user-agent') || undefined;
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ipAddress = forwarded?.split(',')[0] || realIp || undefined;

    // Create verification code
    const { code, expiresAt } = await loginCodeService.createCode({
      email,
      phone,
      userAgent,
      ipAddress
    });

    // Send the code
    try {
      if (email) {
        await sendVerificationEmail({
          to: email,
          code,
          expiresAt
        });
      } else if (phone) {
        await sendVerificationSMS({
          to: phone,
          code,
          expiresAt
        });
      }
    } catch (sendError: any) {
      console.error('Failed to send verification code:', sendError);
      
      // Mark the code as used since sending failed
      await supabaseAdmin
        .from('login_codes')
        .update({ used: true })
        .eq('code', code);

      return NextResponse.json(
        { error: 'Failed to send verification code. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: email 
        ? 'Verification code sent to your email'
        : 'Verification code sent to your phone',
      type: email ? 'email' : 'phone',
      expiresAt: expiresAt.toISOString()
    });

  } catch (error: any) {
    console.error('Send code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 