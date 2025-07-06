'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Copy, Check, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function Setup2FAContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [setupData, setSetupData] = useState<{
    secret: string;
    qrCode: string;
    manualEntryKey: string;
  } | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuthAndSetup2FA = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/login');
          return;
        }

        // Initialize 2FA setup
        const response = await fetch('/api/setup-2fa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to setup 2FA');
        }

        const data = await response.json();
        setSetupData(data);

      } catch (error: any) {
        console.error('2FA setup error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndSetup2FA();
  }, [router]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

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
          action: 'setup'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '2FA verification failed');
      }

      setMessage(theme === "professional" ? '2FA erfolgreich aktiviert!' : '>>> 2FA_ENABLED_SUCCESSFULLY');
      
      // Redirect to dashboard after successful setup
      setTimeout(() => {
        router.push('/coolperson');
      }, 2000);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push('/coolperson');
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
        marginTop: "3rem",
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
                left: '15%',
                width: '250px',
                height: '250px',
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
                right: '15%',
                width: '350px',
                height: '350px',
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
          className="relative z-10 w-full max-w-lg mx-auto"
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
                {theme === "professional" ? "2FA Einrichten" : "[SETUP_2FA]"}
              </motion.h2>
              
              <motion.p
                variants={itemVariants}
                style={{
                  fontSize: '1rem',
                  fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                  color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                  opacity: 0.8
                }}
              >
                {theme === "professional" ? "Schützen Sie Ihr Konto mit Zwei-Faktor-Authentifizierung" : ">>> SECURE YOUR ACCOUNT WITH 2FA"}
              </motion.p>
            </div>

            {setupData && (
              <div className="space-y-6">
                {/* QR Code */}
                <motion.div variants={itemVariants} className="text-center">
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                    color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                  }}>
                    {theme === "professional" ? "1. QR-Code scannen" : ">>> SCAN_QR_CODE"}
                  </h3>
                  <div style={{
                    padding: '1rem',
                    background: theme === "professional" ? 'white' : 'rgba(255, 255, 255, 0.9)',
                    borderRadius: theme === "professional" ? '12px' : '0',
                    display: 'inline-block',
                    border: theme === "professional" ? '1px solid var(--border-color)' : '2px solid rgba(0, 255, 0, 0.3)'
                  }}>
                    <Image
                      src={setupData.qrCode}
                      alt="2FA QR Code"
                      width={200}
                      height={200}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </motion.div>

                {/* Manual Entry */}
                <motion.div variants={itemVariants}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                    color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                  }}>
                    {theme === "professional" ? "2. Oder manuell eingeben" : ">>> MANUAL_ENTRY"}
                  </h3>
                  <div style={{
                    padding: '1rem',
                    background: theme === "professional" ? 'var(--background-secondary)' : 'rgba(0, 0, 0, 0.3)',
                    border: theme === "professional" ? '1px solid var(--border-color)' : '2px solid rgba(0, 255, 0, 0.3)',
                    borderRadius: theme === "professional" ? '8px' : '0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <code style={{
                      flex: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                      wordBreak: 'break-all'
                    }}>
                      {showSecret ? setupData.manualEntryKey : '••••••••••••••••'}
                    </code>
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                        padding: '0.25rem'
                      }}
                    >
                      {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(setupData.manualEntryKey)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                        padding: '0.25rem'
                      }}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </motion.div>

                {/* Verification */}
                <motion.div variants={itemVariants}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                    color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                  }}>
                    {theme === "professional" ? "3. Code eingeben" : ">>> ENTER_CODE"}
                  </h3>
                  <form onSubmit={handleVerify2FA} className="space-y-4">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder={theme === "professional" ? "6-stelliger Code" : "6-digit code"}
                      maxLength={6}
                      required
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
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                        letterSpacing: '0.5rem'
                      }}
                    />

                    <motion.button
                      type="submit"
                      disabled={loading || verificationCode.length !== 6}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      style={{
                        width: '100%',
                        padding: '1rem 2rem',
                        background: loading 
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
                        cursor: loading ? 'not-allowed' : 'pointer',
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
                          {theme === "professional" ? "2FA wird aktiviert..." : "ENABLING_2FA..."}
                        </>
                      ) : (
                        <>
                          <Shield size={20} />
                          {theme === "professional" ? "2FA aktivieren" : "ENABLE_2FA"}
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>

                {(error || message) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
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

                {/* Skip Option */}
                <motion.div variants={itemVariants} className="text-center">
                  <button
                    type="button"
                    onClick={handleSkip}
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
                      gap: '0.5rem',
                      margin: '0 auto'
                    }}
                  >
                    <ArrowRight size={16} />
                    {theme === "professional" ? "Später einrichten" : ">>> SKIP_FOR_NOW"}
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default function Setup2FA() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Setup2FAContent />
    </Suspense>
  );
} 