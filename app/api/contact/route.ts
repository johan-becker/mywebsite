import { NextRequest, NextResponse } from 'next/server';
import { sendToN8nWebhook } from '@/lib/webhook';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    // Log the submission (in a real app, you'd save to database)
    const submission = {
      timestamp: new Date().toISOString(),
      name: body.name,
      email: body.email,
      message: body.message,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    };

    console.log('📧 New Contact Form Submission:', submission);

    // Send data to n8n webhook
    const webhookResult = await sendToN8nWebhook({
      identity: body.name,
      communication_channel: body.email,
      message_content: body.message
    });

    if (!webhookResult.success) {
      console.warn('⚠️ Webhook sending failed, but continuing with form submission:', webhookResult.error);
      // Note: We don't fail the entire request if webhook fails
      // The form submission is still considered successful
    }

    // Here you would typically also:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send auto-reply email

    return NextResponse.json({
      success: true,
      message: 'Nachricht erfolgreich gesendet!',
      submissionId: `msg_${Date.now()}`
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
} 