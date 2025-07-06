'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Settings, Eye, EyeOff, Copy, Check, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function SecuritySettingsContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [settingUp2FA, setSettingUp2FA] = useState(false);
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
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (!session) {
          router.push('/login');
          return;
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;

        if (!user) {
          router.push('/login');
          return;
        }

        setUser(user);
        const userMetadata = user.user_metadata || {};
        setTwoFactorEnabled(userMetadata.two_factor_enabled || false);

      } catch (error: any) {
        console.error('Auth check error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleEnable2FA = async () => {
    setSettingUp2FA(true);
    setError('');
    setMessage('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

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
      setError(error.message);
      setSettingUp2FA(false);
    }
  };

  const handleDisable2FA = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      // Update user metadata to disable 2FA
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          two_factor_enabled: false,
          two_factor_secret: null,
          temp_2fa_secret: null
        }
      });

      if (updateError) {
        throw new Error('Failed to disable 2FA');
      }

      setTwoFactorEnabled(false);
      setMessage(theme === "professional" ? '2FA erfolgreich deaktiviert!' : '>>> 2FA_DISABLED_SUCCESSFULLY');

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
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

      setTwoFactorEnabled(true);
      setSettingUp2FA(false);
      setSetupData(null);
      setVerificationCode('');
      setMessage(theme === "professional" ? '2FA erfolgreich aktiviert!' : '>>> 2FA_ENABLED_SUCCESSFULLY');

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel2FASetup = () => {
    setSettingUp2FA(false);
    setSetupData(null);
    setVerificationCode('');
    setError('');
    setMessage('');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
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
                top: '15%',
                left: '10%',
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
                bottom: '15%',
                right: '10%',
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
          className="relative z-10 w-full max-w-2xl mx-auto"
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
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                variants={itemVariants}
                className="mb-4"
              >
                <Settings size={48} className={theme === "professional" ? "text-primary mx-auto" : "text-[#00ff00] mx-auto"} />
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
                {theme === "professional" ? "Sicherheitseinstellungen" : "[SECURITY_SETTINGS]"}
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
                {theme === "professional" ? "Verwalten Sie Ihre Kontosicherheit" : ">>> MANAGE YOUR ACCOUNT SECURITY"}
              </motion.p>
            </div>

            {/* User Info */}
            {user && (
              <motion.div variants={itemVariants} className="mb-8">
                <div style={{
                  padding: '1rem',
                  background: theme === "professional" ? 'var(--background-secondary)' : 'rgba(0, 255, 0, 0.05)',
                  borderRadius: theme === "professional" ? '8px' : '0',
                  border: theme === "professional" ? '1px solid var(--border-color)' : '1px solid rgba(0, 255, 0, 0.2)'
                }}>
                  <p style={{
                    fontSize: '0.875rem',
                    fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                    color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                    marginBottom: '0.5rem'
                  }}>
                    {theme === "professional" ? "Angemeldet als:" : ">>> LOGGED IN AS:"}
                  </p>
                  <p style={{
                    fontSize: '1rem',
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'monospace',
                    color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                    fontWeight: 600
                  }}>
                    {user.email}
                  </p>
                </div>
              </motion.div>
            )}

            {/* 2FA Section */}
            <motion.div variants={itemVariants} className="mb-8">
              <div style={{
                padding: '2rem',
                background: theme === "professional" ? 'var(--background-secondary)' : 'rgba(0, 0, 0, 0.3)',
                borderRadius: theme === "professional" ? '12px' : '0',
                border: theme === "professional" ? '1px solid var(--border-color)' : '2px solid rgba(0, 255, 0, 0.3)'
              }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Shield size={32} className={theme === "professional" ? "text-primary" : "text-[#00ff00]"} />
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                        color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                        marginBottom: '0.25rem'
                      }}>
                        {theme === "professional" ? "Zwei-Faktor-Authentifizierung" : "TWO_FACTOR_AUTHENTICATION"}
                      </h3>
                      <p style={{
                        fontSize: '0.875rem',
                        fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                        color: theme === "professional" ? 'var(--text-secondary)' : 'rgba(0, 255, 0, 0.7)'
                      }}>
                        {theme === "professional" ? "Zusätzliche Sicherheit für Ihr Konto" : ">>> EXTRA SECURITY FOR YOUR ACCOUNT"}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '0.5rem 1rem',
                    borderRadius: theme === "professional" ? '6px' : '0',
                    background: twoFactorEnabled 
                      ? (theme === "professional" ? '#dcfce7' : 'rgba(0, 255, 0, 0.2)')
                      : (theme === "professional" ? '#fee2e2' : 'rgba(255, 255, 0, 0.2)'),
                    border: theme === "professional" 
                      ? `1px solid ${twoFactorEnabled ? '#4ade80' : '#f87171'}`
                      : `1px solid ${twoFactorEnabled ? '#00ff00' : '#ffff00'}`,
                    color: twoFactorEnabled
                      ? (theme === "professional" ? '#16a34a' : '#00ff00')
                      : (theme === "professional" ? '#dc2626' : '#ffff00'),
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'monospace',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}>
                    {twoFactorEnabled 
                      ? (theme === "professional" ? "Aktiviert" : "ENABLED")
                      : (theme === "professional" ? "Deaktiviert" : "DISABLED")
                    }
                  </div>
                </div>

                {!settingUp2FA && (
                  <div className="space-y-4">
                    <p style={{
                      fontSize: '0.875rem',
                      fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                      color: theme === "professional" ? 'var(--text-secondary)' : 'rgba(0, 255, 0, 0.8)',
                      lineHeight: '1.5'
                    }}>
                      {twoFactorEnabled 
                        ? (theme === "professional" 
                          ? "2FA ist aktiviert. Ihr Konto ist durch einen zusätzlichen Sicherheitscode geschützt."
                          : ">>> 2FA IS ENABLED. YOUR ACCOUNT IS PROTECTED BY AN ADDITIONAL SECURITY CODE."
                        )
                        : (theme === "professional" 
                          ? "2FA ist nicht aktiviert. Aktivieren Sie es für zusätzliche Sicherheit."
                          : ">>> 2FA IS NOT ENABLED. ENABLE IT FOR ADDITIONAL SECURITY."
                        )
                      }
                    </p>

                    <div className="flex gap-3">
                      {!twoFactorEnabled ? (
                        <button
                          onClick={handleEnable2FA}
                          disabled={loading}
                          style={{
                            padding: '0.75rem 1.5rem',
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
                            fontSize: '0.875rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {theme === "professional" ? "2FA aktivieren" : "ENABLE_2FA"}
                        </button>
                      ) : (
                        <button
                          onClick={handleDisable2FA}
                          disabled={loading}
                          style={{
                            padding: '0.75rem 1.5rem',
                            background: theme === "professional"
                              ? '#dc2626'
                              : 'linear-gradient(45deg, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.4))',
                            border: theme === "professional"
                              ? 'none'
                              : '2px solid rgba(255, 0, 0, 0.7)',
                            borderRadius: theme === "professional" ? '8px' : '0',
                            color: theme === "professional" ? 'white' : '#ff0000',
                            fontWeight: 600,
                            fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                            fontSize: '0.875rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {loading ? (
                            theme === "professional" ? "Deaktivieren..." : "DISABLING..."
                          ) : (
                            theme === "professional" ? "2FA deaktivieren" : "DISABLE_2FA"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 2FA Setup */}
                {settingUp2FA && setupData && (
                  <div className="space-y-6">
                    <div style={{
                      padding: '1rem',
                      background: theme === "professional" ? '#fef3c7' : 'rgba(255, 255, 0, 0.1)',
                      borderRadius: theme === "professional" ? '8px' : '0',
                      border: theme === "professional" ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <AlertTriangle size={20} className={theme === "professional" ? "text-amber-600" : "text-[#ffff00]"} />
                      <p style={{
                        fontSize: '0.875rem',
                        fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                        color: theme === "professional" ? '#92400e' : '#ffff00',
                        margin: 0
                      }}>
                        {theme === "professional" 
                          ? "Speichern Sie den geheimen Schlüssel sicher, bevor Sie fortfahren!"
                          : ">>> SAVE THE SECRET KEY SECURELY BEFORE PROCEEDING!"
                        }
                      </p>
                    </div>

                    {/* QR Code */}
                    <div className="text-center">
                      <h4 style={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        marginBottom: '1rem',
                        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                        color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                      }}>
                        {theme === "professional" ? "1. QR-Code scannen" : ">>> SCAN_QR_CODE"}
                      </h4>
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
                    </div>

                    {/* Manual Entry */}
                    <div>
                      <h4 style={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        marginBottom: '1rem',
                        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                        color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                      }}>
                        {theme === "professional" ? "2. Oder manuell eingeben" : ">>> MANUAL_ENTRY"}
                      </h4>
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
                    </div>

                    {/* Verification */}
                    <div>
                      <h4 style={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        marginBottom: '1rem',
                        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                        color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                      }}>
                        {theme === "professional" ? "3. Code eingeben" : ">>> ENTER_CODE"}
                      </h4>
                      <form onSubmit={handleVerify2FA} className="space-y-4">
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
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

                        <div className="flex gap-3">
                          <button
                            type="submit"
                            disabled={loading || verificationCode.length !== 6}
                            style={{
                              flex: 1,
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
                              opacity: loading || verificationCode.length !== 6 ? 0.7 : 1,
                              transition: 'all 0.3s ease'
                            }}
                          >
                            {loading ? (
                              theme === "professional" ? "Aktivieren..." : "ENABLING..."
                            ) : (
                              theme === "professional" ? "2FA aktivieren" : "ENABLE_2FA"
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleCancel2FASetup}
                            style={{
                              padding: '1rem 2rem',
                              background: 'transparent',
                              border: theme === "professional" 
                                ? '1px solid var(--border-color)'
                                : '2px solid rgba(0, 255, 0, 0.3)',
                              borderRadius: theme === "professional" ? '8px' : '0',
                              color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                              fontWeight: 600,
                              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                              fontSize: '1rem',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            {theme === "professional" ? "Abbrechen" : "CANCEL"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Messages */}
            {(error || message) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginBottom: '1rem',
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

            {/* Back to Dashboard */}
            <motion.div variants={itemVariants} className="text-center">
              <Link 
                href="/coolperson"
                style={{
                  color: theme === "professional" ? 'var(--primary-color)' : '#00ff00',
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'underline'
                }}
              >
                {theme === "professional" ? "Zurück zum Dashboard" : "BACK_TO_DASHBOARD"}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default function SecuritySettings() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SecuritySettingsContent />
    </Suspense>
  );
} 