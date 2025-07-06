'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Smartphone, ArrowLeft, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function CodeContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationData, setVerificationData] = useState<{
    emailOrPhone: string;
    type: 'email' | 'phone';
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    const checkVerificationData = async () => {
      try {
        // Check if user already has a session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push('/coolperson');
          return;
        }

        // Get verification data from localStorage
        const storedData = localStorage.getItem('codeVerificationData');
        if (!storedData) {
          // No verification data, redirect to login
          router.push('/login');
          return;
        }

        const data = JSON.parse(storedData);
        setVerificationData(data);
        setCodeSent(true);
      } catch (error) {
        console.error('Error checking verification data:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkVerificationData();
  }, [router]);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationData) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const payload = {
        code: verificationCode,
        ...(verificationData.type === 'email' 
          ? { email: verificationData.emailOrPhone } 
          : { phone: verificationData.emailOrPhone })
      };

      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Code verification failed');
      }

      // Clear verification data from localStorage
      localStorage.removeItem('codeVerificationData');

      // Handle session creation
      if (data.access_token && data.refresh_token) {
        // Set the session using the tokens
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token
        });

        if (sessionError) {
          throw new Error('Failed to create session');
        }
      } else if (data.requiresClientLogin && data.email) {
        // Fallback: attempt to sign in with the email (passwordless)
        const { error: signInError } = await supabase.auth.signInWithOtp({
          email: data.email,
          options: {
            shouldCreateUser: false
          }
        });

        if (signInError) {
          console.warn('Fallback sign-in failed, proceeding anyway');
        }
      }

      // Check if user has 2FA enabled
      let twoFactorEnabled = false;
      if (data.user && data.user.user_metadata) {
        twoFactorEnabled = data.user.user_metadata.two_factor_enabled || false;
      } else {
        // Try to get current user data
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user && user.user_metadata) {
            twoFactorEnabled = user.user_metadata.two_factor_enabled || false;
          }
        } catch (error) {
          console.warn('Could not check 2FA status');
        }
      }

      if (twoFactorEnabled) {
        // Redirect to 2FA page
        router.push('/2fa');
      } else {
        // Redirect to coolperson page
        setMessage(theme === "professional" ? 'Erfolgreich angemeldet!' : '>>> ACCESS_GRANTED');
        setTimeout(() => {
          router.push('/coolperson');
        }, 1500);
      }

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!verificationData) return;

    setResendLoading(true);
    setError('');
    setMessage('');

    try {
      const payload = verificationData.type === 'email' 
        ? { email: verificationData.emailOrPhone }
        : { phone: verificationData.emailOrPhone };

      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend code');
      }

      setMessage(theme === "professional" ? 'Code erneut gesendet!' : '>>> CODE_RESENT');
      setVerificationCode(''); // Clear the code input

    } catch (error: any) {
      setError(error.message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleBackToLogin = () => {
    localStorage.removeItem('codeVerificationData');
    router.push('/login');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!verificationData) {
    return null; // Will redirect to login
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
                <Smartphone size={48} className={theme === "professional" ? "text-primary mx-auto" : "text-[#00ff00] mx-auto"} />
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
                {theme === "professional" ? "Code eingeben" : "[ENTER_CODE]"}
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
                  ? `Wir haben einen 6-stelligen Code an ${verificationData.type === 'email' ? 'Ihre E-Mail' : 'Ihre Telefonnummer'} gesendet:`
                  : `>>> 6-DIGIT CODE SENT TO ${verificationData.type === 'email' ? 'EMAIL' : 'PHONE'}:`
                }
              </motion.p>
              
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
                {verificationData.emailOrPhone}
              </motion.p>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-6">
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
                  <Smartphone className="w-4 h-4 inline mr-2" />
                  {theme === "professional" ? "Bestätigungscode" : "VERIFICATION_CODE"}
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
                      <Smartphone size={20} />
                      {theme === "professional" ? "Code bestätigen" : "VERIFY_CODE"}
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

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="mt-6 text-center space-y-3">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendLoading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: theme === "professional" ? 'var(--primary-color)' : '#00ff00',
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  cursor: resendLoading ? 'not-allowed' : 'pointer',
                  opacity: resendLoading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  margin: '0 auto'
                }}
              >
                {resendLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: `2px solid ${theme === "professional" ? 'var(--primary-color)' : '#00ff00'}`,
                        borderRadius: '50%'
                      }}
                    />
                    {theme === "professional" ? "Code wird gesendet..." : "SENDING..."}
                  </>
                ) : (
                  <>
                    <RotateCcw size={16} />
                    {theme === "professional" ? "Code erneut senden" : "RESEND_CODE"}
                  </>
                )}
              </button>

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

export default function Code() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CodeContent />
    </Suspense>
  );
} 