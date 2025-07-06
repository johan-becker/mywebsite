'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function TwoFAContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (!session) {
          // No session, redirect to login
          router.push('/login');
          return;
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;

        if (!user) {
          router.push('/login');
          return;
        }

        const userMetadata = user.user_metadata || {};
        const twoFactorEnabled = userMetadata.two_factor_enabled;

        if (!twoFactorEnabled) {
          // User doesn't have 2FA enabled, redirect to coolperson
          router.push('/coolperson');
          return;
        }

        setUserEmail(user.email || '');

      } catch (error: any) {
        console.error('Auth check error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch('/api/verify-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          token: verificationCode,
          action: 'verify'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '2FA verification failed');
      }

      setMessage(theme === "professional" ? 'Erfolgreich angemeldet!' : '>>> ACCESS_GRANTED');
      
      // Redirect to dashboard after successful 2FA
      setTimeout(() => {
        router.push('/coolperson');
      }, 1500);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = async () => {
    try {
      // Sign out the user since 2FA verification failed
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      router.push('/login');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      {theme === "professional" && <ProfessionalBackground variant="minimal" />}
      <div className="min-h-screen flex items-center justify-center" style={{ 
        marginTop: "5rem",
        padding: "2rem",
        background: theme === "professional" 
          ? 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
          : 'linear-gradient(180deg, #000000 0%, #001100 50%, #000000 100%)'
      }}>
        {/* Matrix Background Effects */}
        {theme === "matrix" && (
          <div className="absolute inset-0 z-0">
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(0, 255, 0, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                opacity: 0.4
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                opacity: 0.3
              }}
            />
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-md mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="glass-card"
            style={{
              padding: '2rem',
              background: theme === "professional" 
                ? 'var(--background-card)'
                : 'rgba(0, 20, 0, 0.8)',
              border: theme === "professional" 
                ? '1px solid var(--border-color)'
                : '2px solid rgba(0, 255, 0, 0.3)',
              borderRadius: theme === "professional" ? '16px' : '20px',
              backdropFilter: 'blur(20px)',
              boxShadow: theme === "professional"
                ? '0 8px 32px rgba(0, 0, 0, 0.08)'
                : '0 8px 32px rgba(0, 255, 0, 0.2)'
            }}
          >
            <div className="text-center mb-8">
              <motion.div
                variants={itemVariants}
                className="mb-4"
              >
                <Shield size={48} className={theme === "professional" ? "text-primary mx-auto" : "text-[#00ff00] mx-auto"} />
              </motion.div>
              
              <motion.h2
                variants={itemVariants}
                className={theme === "matrix" ? "glitch" : ""}
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                  color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                }}
              >
                {theme === "professional" ? "Zwei-Faktor-Authentifizierung" : "[2FA_VERIFICATION]"}
              </motion.h2>
              
              <motion.p
                variants={itemVariants}
                style={{
                  fontSize: '1rem',
                  fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                  color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                  opacity: 0.8,
                  marginBottom: '1rem'
                }}
              >
                {theme === "professional" 
                  ? "Geben Sie den 6-stelligen Code aus Ihrer Authenticator-App ein"
                  : ">>> ENTER 6-DIGIT CODE FROM AUTHENTICATOR APP"
                }
              </motion.p>
              
              {userEmail && (
                <motion.p
                  variants={itemVariants}
                  style={{
                    fontSize: '0.875rem',
                    fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                    color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                    fontWeight: 600,
                    padding: '0.5rem 1rem',
                    background: theme === "professional" ? 'var(--background-secondary)' : 'rgba(0, 255, 0, 0.1)',
                    borderRadius: theme === "professional" ? '8px' : '0',
                    border: theme === "professional" ? '1px solid var(--border-color)' : '1px solid rgba(0, 255, 0, 0.3)'
                  }}
                >
                  {userEmail}
                </motion.p>
              )}
            </div>

            <form onSubmit={handleVerify2FA} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label 
                  htmlFor="verificationCode"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                    color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                    fontSize: '0.875rem'
                  }}
                >
                  <Shield className="w-4 h-4 inline mr-2" />
                  {theme === "professional" ? "Authenticator-Code" : "AUTHENTICATOR_CODE"}
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  placeholder={theme === "professional" ? "6-stelliger Code" : "6-digit code"}
                  maxLength={6}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: theme === "professional" 
                      ? 'var(--background-secondary)'
                      : 'rgba(0, 0, 0, 0.3)',
                    border: theme === "professional" 
                      ? '1px solid var(--border-color)'
                      : '2px solid rgba(0, 255, 0, 0.3)',
                    borderRadius: theme === "professional" ? '8px' : '0',
                    color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                    fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                    fontSize: '1.5rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    letterSpacing: '0.5rem'
                  }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={loading || verificationCode.length !== 6}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  style={{
                    width: '100%',
                    padding: '1rem 2rem',
                    background: loading || verificationCode.length !== 6
                      ? (theme === "professional" ? '#94a3b8' : 'rgba(0, 255, 0, 0.1)')
                      : (theme === "professional"
                        ? 'var(--primary-color)'
                        : 'linear-gradient(45deg, rgba(0, 255, 0, 0.2), rgba(0, 255, 0, 0.4))'),
                    border: theme === "professional"
                      ? 'none'
                      : '2px solid rgba(0, 255, 0, 0.7)',
                    borderRadius: theme === "professional" ? '8px' : '0',
                    color: theme === "professional" ? 'white' : '#00ff00',
                    fontWeight: 600,
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                    fontSize: '1rem',
                    cursor: loading || verificationCode.length !== 6 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: loading || verificationCode.length !== 6 ? 0.7 : 1
                  }}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid transparent',
                          borderTop: `2px solid ${theme === "professional" ? 'white' : '#00ff00'}`,
                          borderRadius: '50%'
                        }}
                      />
                      {theme === "professional" ? "Verifizierung..." : "VERIFYING..."}
                    </>
                  ) : (
                    <>
                      <Shield size={20} />
                      {theme === "professional" ? "Bestätigen" : "VERIFY"}
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Error/Success Messages */}
            {(error || message) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  borderRadius: theme === "professional" ? '8px' : '0',
                  background: error 
                    ? (theme === "professional" ? '#fee2e2' : 'rgba(255, 0, 0, 0.1)')
                    : (theme === "professional" ? '#dcfce7' : 'rgba(0, 255, 0, 0.1)'),
                  border: theme === "professional" 
                    ? `1px solid ${error ? '#f87171' : '#4ade80'}`
                    : `2px solid ${error ? '#ff0000' : '#00ff00'}`,
                  color: error 
                    ? (theme === "professional" ? '#dc2626' : '#ff0000')
                    : (theme === "professional" ? '#16a34a' : '#00ff00'),
                  fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                  fontSize: '0.875rem'
                }}
              >
                {error || message}
              </motion.div>
            )}

            {/* Help Text */}
            <motion.div variants={itemVariants} className="mt-6 text-center">
              <p style={{
                fontSize: '0.875rem',
                fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                color: theme === "professional" ? 'var(--text-secondary)' : 'rgba(0, 255, 0, 0.7)',
                opacity: 0.8,
                marginBottom: '1rem'
              }}>
                {theme === "professional" 
                  ? "Verwenden Sie Google Authenticator, Authy oder eine andere TOTP-App"
                  : ">>> USE GOOGLE AUTHENTICATOR, AUTHY OR OTHER TOTP APP"
                }
              </p>

              <button
                type="button"
                onClick={handleBackToLogin}
                style={{
                  background: 'none',
                  border: 'none',
                  color: theme === "professional" ? 'var(--text-secondary)' : 'rgba(0, 255, 0, 0.7)',
                  fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                  fontSize: '0.875rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  margin: '0 auto'
                }}
              >
                <ArrowLeft size={16} />
                {theme === "professional" ? "Zurück zur Anmeldung" : "BACK_TO_LOGIN"}
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default function TwoFA() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TwoFAContent />
    </Suspense>
  );
} 