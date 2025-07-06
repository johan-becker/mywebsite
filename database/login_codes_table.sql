-- Create login_codes table for custom authentication flow
CREATE TABLE IF NOT EXISTS login_codes (
    id SERIAL PRIMARY KEY,
    email TEXT,
    phone TEXT,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_agent TEXT,
    ip_address INET,
    
    -- Constraints
    CONSTRAINT login_codes_email_or_phone_check CHECK (
        (email IS NOT NULL AND phone IS NULL) OR 
        (email IS NULL AND phone IS NOT NULL) OR
        (email IS NOT NULL AND phone IS NOT NULL)
    ),
    CONSTRAINT login_codes_code_format_check CHECK (code ~ '^[0-9]{6}$')
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_login_codes_email ON login_codes(email);
CREATE INDEX IF NOT EXISTS idx_login_codes_phone ON login_codes(phone);
CREATE INDEX IF NOT EXISTS idx_login_codes_code ON login_codes(code);
CREATE INDEX IF NOT EXISTS idx_login_codes_expires_at ON login_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_login_codes_used ON login_codes(used);

-- Create composite index for main lookup queries
CREATE INDEX IF NOT EXISTS idx_login_codes_lookup ON login_codes(code, expires_at, used);

-- Enable RLS (Row Level Security)
ALTER TABLE login_codes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow service role to manage all codes
CREATE POLICY "Service role can manage login codes" ON login_codes
    FOR ALL USING (auth.role() = 'service_role');

-- Allow authenticated users to view their own codes
CREATE POLICY "Users can view their own login codes" ON login_codes
    FOR SELECT USING (
        auth.uid() IS NOT NULL AND (
            email = auth.email() OR
            phone = (auth.jwt() ->> 'phone')
        )
    );

-- Function to clean up expired codes (optional cleanup job)
CREATE OR REPLACE FUNCTION cleanup_expired_login_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM login_codes 
    WHERE expires_at < NOW() - INTERVAL '24 hours';
END;
$$;

-- Create a function to generate random 6-digit codes
CREATE OR REPLACE FUNCTION generate_login_code()
RETURNS VARCHAR(6)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    code VARCHAR(6);
BEGIN
    -- Generate a random 6-digit code
    code := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
    
    -- Ensure it's not '000000' or '111111' etc for security
    WHILE code ~ '^(.)\1{5}$' OR code = '000000' LOOP
        code := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
    END LOOP;
    
    RETURN code;
END;
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON login_codes TO service_role;
GRANT SELECT ON login_codes TO authenticated;
GRANT EXECUTE ON FUNCTION generate_login_code() TO service_role;
GRANT EXECUTE ON FUNCTION cleanup_expired_login_codes() TO service_role;

-- Add comments for documentation
COMMENT ON TABLE login_codes IS 'Stores temporary login verification codes for passwordless authentication';
COMMENT ON COLUMN login_codes.email IS 'Email address for email-based verification';
COMMENT ON COLUMN login_codes.phone IS 'Phone number for SMS-based verification';
COMMENT ON COLUMN login_codes.code IS '6-digit verification code';
COMMENT ON COLUMN login_codes.expires_at IS 'When the code expires (typically 10 minutes from creation)';
COMMENT ON COLUMN login_codes.used IS 'Whether the code has been used (one-time use)';
COMMENT ON COLUMN login_codes.user_agent IS 'User agent for abuse prevention';
COMMENT ON COLUMN login_codes.ip_address IS 'IP address for abuse prevention'; 