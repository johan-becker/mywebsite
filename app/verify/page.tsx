'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function VerifyContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Get token from URL hash (Supabase typically sends it in the hash)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const access_token = hashParams.get('access_token');
        const refresh_token = hashParams.get('refresh_token');
        
        // Also check URL search params as fallback
        const access_token_query = searchParams.get('access_token');
        const refresh_token_query = searchParams.get('refresh_token');
        
        const token = access_token || access_token_query;
        const refresh = refresh_token || refresh_token_query;

        if (!token) {
          setVerificationStatus('error');
          setMessage(theme === "professional" 
            ? 'Kein Verifizierungstoken gefunden. Bitte fordern Sie einen neuen Link an.'
            : '>>> NO_VERIFICATION_TOKEN_FOUND');
          return;
        }

        // Verify the token with Supabase
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: window.location.hash,
          type: 'email'
        });

        if (error) {
          setVerificationStatus('error');
          setMessage(theme === "professional" 
            ? 'Verifizierung fehlgeschlagen. Der Link ist möglicherweise abgelaufen.'
            : '>>> VERIFICATION_FAILED');
          return;
        }

        setVerificationStatus('success');
        setMessage(theme === "professional" 
          ? 'E-Mail erfolgreich verifiziert! Sie werden zur Anmeldung weitergeleitet.'
          : '>>> EMAIL_VERIFIED_SUCCESSFULLY');

        // Clean up URL
        window.history.replaceState({}, '', '/verify');

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);

      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('error');
        setMessage(theme === "professional" 
          ? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
          : '>>> ERROR_OCCURRED');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [router, searchParams, theme]);

  if (isVerifying) {
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
                top: '30%',
                left: '20%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(0, 255, 0, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                opacity: 0.4
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '30%',
                right: '20%',
                width: '300px',
                height: '300px',
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
                : '0 8px 32px rgba(0, 255, 0, 0.2)',
              textAlign: 'center'
            }}
          >
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              {verificationStatus === 'success' ? (
                <CheckCircle size={64} className={theme === "professional" ? "text-green-600 mx-auto" : "text-[#00ff00] mx-auto"} />
              ) : (
                <XCircle size={64} className={theme === "professional" ? "text-red-600 mx-auto" : "text-[#ff0000] mx-auto"} />
              )}
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className={theme === "matrix" ? "glitch" : ""}
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '1rem',
                fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
              }}
            >
              {verificationStatus === 'success' 
                ? (theme === "professional" ? "Verifizierung erfolgreich!" : "[VERIFICATION_SUCCESS]")
                : (theme === "professional" ? "Verifizierung fehlgeschlagen" : "[VERIFICATION_FAILED]")
              }
            </motion.h2>

            <motion.div
              variants={itemVariants}
              style={{
                padding: '1rem',
                borderRadius: theme === "professional" ? '8px' : '0',
                background: verificationStatus === 'success'
                  ? (theme === "professional" ? '#dcfce7' : 'rgba(0, 255, 0, 0.1)')
                  : (theme === "professional" ? '#fee2e2' : 'rgba(255, 0, 0, 0.1)'),
                border: theme === "professional" 
                  ? `1px solid ${verificationStatus === 'success' ? '#4ade80' : '#f87171'}`
                  : `2px solid ${verificationStatus === 'success' ? '#00ff00' : '#ff0000'}`,
                color: verificationStatus === 'success'
                  ? (theme === "professional" ? '#16a34a' : '#00ff00')
                  : (theme === "professional" ? '#dc2626' : '#ff0000'),
                fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                fontSize: '1rem',
                marginBottom: '2rem'
              }}
            >
              {message}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-4"
            >
              {verificationStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                    fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                    fontSize: '0.875rem'
                  }}
                >
                  <ArrowRight size={16} />
                  {theme === "professional" ? "Weiterleitung in 3 Sekunden..." : ">>> REDIRECTING_IN_3_SECONDS..."}
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <Link 
                    href="/login"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '1rem 2rem',
                      background: theme === "professional"
                        ? 'var(--primary-color)'
                        : 'linear-gradient(45deg, rgba(0, 255, 0, 0.2), rgba(0, 255, 0, 0.4))',
                      border: theme === "professional"
                        ? 'none'
                        : '2px solid rgba(0, 255, 0, 0.7)',
                      borderRadius: theme === "professional" ? '8px' : '0',
                      color: theme === "professional" ? 'white' : '#00ff00',
                      fontWeight: 600,
                      fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                      fontSize: '1rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      width: '100%'
                    }}
                  >
                    <Mail size={20} />
                    {theme === "professional" ? "Zur Anmeldung" : "GO_TO_LOGIN"}
                  </Link>
                  
                  <Link 
                    href="/signup"
                    style={{
                      display: 'inline-block',
                      color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                      fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                      fontSize: '0.875rem',
                      textDecoration: 'underline',
                      opacity: 0.8
                    }}
                  >
                    {theme === "professional" ? "Neuen Account erstellen" : "[CREATE_NEW_ACCOUNT]"}
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Always show continue to login button for general verification page */}
            <motion.div
              variants={itemVariants}
              className="mt-6 text-center"
            >
              <Link 
                href="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: theme === "professional"
                    ? 'var(--primary-color)'
                    : 'linear-gradient(45deg, rgba(0, 255, 0, 0.2), rgba(0, 255, 0, 0.4))',
                  border: theme === "professional"
                    ? 'none'
                    : '2px solid rgba(0, 255, 0, 0.7)',
                  borderRadius: theme === "professional" ? '8px' : '0',
                  color: theme === "professional" ? 'white' : '#00ff00',
                  fontWeight: 600,
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  width: '100%'
                }}
              >
                <ArrowRight size={20} />
                {theme === "professional" ? "Weiter zur Anmeldung" : "CONTINUE_TO_LOGIN"}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default function Verify() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyContent />
    </Suspense>
  );
} 