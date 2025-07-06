import { createClient } from '@supabase/supabase-js';

// Admin client with service role key for server-side operations
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // This should be in .env.local
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Type definitions for our login_codes table
export interface LoginCode {
  id: number;
  email?: string;
  phone?: string;
  code: string;
  expires_at: string;
  used: boolean;
  created_at: string;
  user_agent?: string;
  ip_address?: string;
}

// Helper functions for login code operations
export const loginCodeService = {
  // Create a new login code
  async createCode(params: {
    email?: string;
    phone?: string;
    userAgent?: string;
    ipAddress?: string;
  }): Promise<{ code: string; expiresAt: Date }> {
    const { email, phone, userAgent, ipAddress } = params;
    
    if (!email && !phone) {
      throw new Error('Either email or phone must be provided');
    }

    // Invalidate any existing unused codes for this email/phone
    if (email) {
      await supabaseAdmin
        .from('login_codes')
        .update({ used: true })
        .eq('email', email)
        .eq('used', false);
    }
    
    if (phone) {
      await supabaseAdmin
        .from('login_codes')
        .update({ used: true })
        .eq('phone', phone)
        .eq('used', false);
    }

    // Generate a new 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration to 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Insert the new code
    const { error } = await supabaseAdmin
      .from('login_codes')
      .insert({
        email,
        phone,
        code,
        expires_at: expiresAt.toISOString(),
        user_agent: userAgent,
        ip_address: ipAddress
      });

    if (error) {
      throw new Error(`Failed to create login code: ${error.message}`);
    }

    return { code, expiresAt };
  },

  // Verify a login code
  async verifyCode(params: {
    email?: string;
    phone?: string;
    code: string;
  }): Promise<{ valid: boolean; userId?: string }> {
    const { email, phone, code } = params;

    if (!email && !phone) {
      throw new Error('Either email or phone must be provided');
    }

    // Find the code in database
    let query = supabaseAdmin
      .from('login_codes')
      .select('*')
      .eq('code', code)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString());

    if (email) {
      query = query.eq('email', email);
    } else if (phone) {
      query = query.eq('phone', phone);
    }

    const { data: codes, error } = await query.order('created_at', { ascending: false }).limit(1);

    if (error) {
      throw new Error(`Failed to verify code: ${error.message}`);
    }

    if (!codes || codes.length === 0) {
      return { valid: false };
    }

    // Mark code as used
    await supabaseAdmin
      .from('login_codes')
      .update({ used: true })
      .eq('id', codes[0].id);

    // Find the user by email or phone
    let userQuery = supabaseAdmin.auth.admin.listUsers();
    
    // We need to filter by email or phone after getting the list
    // since Supabase doesn't provide direct user lookup by phone
    const { data: users, error: userError } = await userQuery;
    
    if (userError) {
      throw new Error(`Failed to find user: ${userError.message}`);
    }

    let userId: string | undefined;

    if (email) {
      const user = users.users.find(u => u.email === email);
      userId = user?.id;
    } else if (phone) {
      const user = users.users.find(u => u.phone === phone || u.user_metadata?.phone_number === phone);
      userId = user?.id;
    }

    return { valid: true, userId };
  },

  // Get user data for session creation
  async getUserById(userId: string): Promise<{ user: any }> {
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (userError) {
      throw new Error(`Failed to get user: ${userError.message}`);
    }

    return { user: userData.user };
  },

  // Generate a magic link for the user (alternative approach)
  async generateMagicLink(email: string): Promise<{ link: string }> {
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    });

    if (error) {
      throw new Error(`Failed to generate magic link: ${error.message}`);
    }

    return { link: data.properties?.action_link || '' };
  }
};

// Cleanup function to remove expired codes
export async function cleanupExpiredCodes(): Promise<void> {
  const { error } = await supabaseAdmin
    .from('login_codes')
    .delete()
    .lt('expires_at', new Date().toISOString());

  if (error) {
    console.error('Failed to cleanup expired codes:', error);
  }
} 