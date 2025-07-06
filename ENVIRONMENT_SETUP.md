# Environment Setup for Custom Authentication

This document describes the environment variables required for the custom authentication flow.

## Required Environment Variables

Add these variables to your `.env.local` file:

### Supabase Configuration
```bash
# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Your Supabase anon/public key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Your Supabase service role key (server-side only)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Email Service (Resend)
```bash
# Get this from https://resend.com/api-keys
RESEND_API_KEY=re_your_resend_api_key
```

### SMS Service (Seven.io)
```bash
# Get this from https://www.seven.io/
SEVEN_API_KEY=your_seven_api_key
```

### Alternative SMS Service (Twilio - Optional)
```bash
# If you prefer to use Twilio instead of Seven.io
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### Site Configuration
```bash
# Your site URL for redirects
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Database Setup

Before using the authentication flow, you need to create the `login_codes` table in your Supabase database.

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `database/login_codes_table.sql`

## Service Setup Instructions

### 1. Supabase Setup
- Create a Supabase project at https://supabase.com
- Get your project URL and keys from Settings > API
- Make sure RLS (Row Level Security) is enabled

### 2. Resend Setup
1. Sign up at https://resend.com
2. Add and verify your domain
3. Create an API key
4. Update the `from` address in `lib/email-service.ts` to use your domain

### 3. Seven.io Setup
1. Sign up at https://www.seven.io/
2. Add credits to your account
3. Get your API key from the dashboard
4. Test SMS sending in the Seven.io interface
5. Note: Seven.io uses Basic Authentication with your API key

### 4. Domain Configuration
Make sure to configure your domain in Resend:
- Add your domain (e.g., `johanbecker.de`)
- Verify DNS records
- Update the email service to use your domain

## Security Notes

- Never commit `.env.local` to version control
- Keep your service role key secure - it has admin access
- Use HTTPS in production
- Regularly rotate API keys
- Monitor usage and costs for SMS/email services

## Testing

You can test the authentication flow:

1. **Email**: Use your verified domain email address
2. **SMS**: Use a real phone number (SMS services charge per message)
3. **Development**: Consider using email-only for development to avoid SMS costs

## Troubleshooting

### Common Issues

1. **"RESEND_API_KEY is not configured"**
   - Make sure you've added the Resend API key to `.env.local`
   - Restart your development server after adding environment variables

2. **"SEVEN_API_KEY is not configured"**
   - Add your Seven.io API key to `.env.local`
   - Make sure you have credits in your Seven.io account

3. **"User not found"**
   - The user must exist in Supabase auth.users before they can request a code
   - Users need to register first through the normal signup flow

4. **Database errors**
   - Make sure you've run the SQL setup script
   - Check that RLS policies are correctly applied

### Email Issues

- Verify your domain in Resend
- Check spam folder
- Ensure DNS records are set up correctly

### SMS Issues

- Verify phone number format (international format with +)
- Check Seven.io account balance
- Make sure the destination country is supported

## Production Deployment

For production:

1. Use your production domain in `NEXT_PUBLIC_SITE_URL`
2. Set up proper DNS records for email
3. Monitor API usage and costs
4. Set up proper error logging
5. Consider rate limiting for abuse prevention 