// Seven.io SMS Service - using native fetch API
import { sendSMS } from './sendSms';

export interface SendSMSOptions {
  to: string;
  code: string;
  expiresAt: Date;
}

// Seven.io SMS Service implementation for verification codes
export async function sendVerificationSMS({ to, code, expiresAt }: SendSMSOptions): Promise<void> {
  // Format phone number (remove any non-digit characters except +)
  const phoneNumber = to.replace(/[^\d+]/g, '');
  
  // Ensure phone number starts with + or 00
  const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : 
                        phoneNumber.startsWith('00') ? '+' + phoneNumber.substring(2) :
                        phoneNumber.startsWith('0') ? '+49' + phoneNumber.substring(1) :
                        '+' + phoneNumber;

  const expirationTime = expiresAt.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const message = `Ihr Anmeldecode: ${code}\n\nDieser Code ist bis ${expirationTime} gültig.\n\nTeilen Sie diesen Code niemals mit anderen.`;

  try {
    const result = await sendSMS(formattedPhone, message);
    console.log('Verification SMS sent successfully:', result);
  } catch (error: any) {
    console.error('SMS sending error:', error);
    throw new Error(`Failed to send verification SMS: ${error.message}`);
  }
}

// Alternative: Twilio implementation (commented out, can be used instead of Seven.io)
/*
import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendVerificationSMSTwilio({ to, code, expiresAt }: SendSMSOptions): Promise<void> {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    throw new Error('Twilio credentials are not configured');
  }

  const expirationTime = expiresAt.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const message = `Ihr Anmeldecode: ${code}\n\nDieser Code ist bis ${expirationTime} gültig.\n\nTeilen Sie diesen Code niemals mit anderen.`;

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    console.log('Verification SMS sent successfully:', result.sid);
  } catch (error: any) {
    console.error('SMS sending error:', error);
    throw new Error(`Failed to send verification SMS: ${error.message}`);
  }
}
*/

// Generic function to validate phone numbers
export function validatePhoneNumber(phone: string): boolean {
  // Basic validation for international phone numbers
  const phoneRegex = /^(\+|00)[1-9]\d{6,14}$/;
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  return phoneRegex.test(cleanPhone);
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  if (cleaned.startsWith('+49')) {
    // German number formatting
    const number = cleaned.substring(3);
    if (number.length >= 10) {
      return `+49 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
    }
  }
  
  return cleaned;
} 