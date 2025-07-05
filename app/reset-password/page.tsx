'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import LoadingSpinner from '@/components/LoadingSpinner';

// Force dynamic rendering to avoid build-time environment variable issues
export const dynamic = 'force-dynamic';

function ResetPasswordContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    // Check if we have a token (for password reset)
    const token = searchParams.get('token') || searchParams.get('access_token');
    
    // Also check in hash parameters (Supabase might send tokens there)
    let hashToken = null;
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      hashToken = hashParams.get('access_token') || hashParams.get('token');
    }
    
    const finalToken = token || hashToken;
    
    // Check for errors in URL hash (Supabase redirects with errors in hash)
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const error = hashParams.get('error');
      const errorCode = hashParams.get('error_code');
      const errorDescription = hashParams.get('error_description');
      
      if (error && errorCode) {
        if (errorCode === 'otp_expired') {
          setError(theme === "professional" 
            ? 'Der Reset-Link ist abgelaufen. Bitte fordern Sie einen neuen Link an.'
            : '>>> RESET_LINK_EXPIRED: REQUEST_NEW_LINK <<<');
        } else if (errorCode === 'access_denied') {
          setError(theme === "professional" 
            ? 'Der Reset-Link ist ungültig oder wurde bereits verwendet. Bitte fordern Sie einen neuen Link an.'
            : '>>> INVALID_RESET_LINK: ACCESS_DENIED <<<');
        } else {
          setError(theme === "professional" 
            ? (errorDescription || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
            : '>>> RESET_ERROR: TRY_AGAIN <<<');
        }
        
        // Clear the hash from URL
        window.history.replaceState(null, '', window.location.pathname);
        setIsResetting(false);
        return;
      }
    }
    
    if (finalToken) {
      setIsResetting(true);
    }
  }, [searchParams, theme]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });

      if (error) throw error;
      setMessage(theme === "professional" 
        ? 'Password reset email sent! Check your inbox.'
        : '>>> RESET_EMAIL_SENT: CHECK_INBOX <<<');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      setMessage('Password updated successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
                <Lock size={48} className={theme === "professional" ? "text-primary mx-auto" : "text-[#00ff00] mx-auto"} />
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
                {isResetting
                  ? (theme === "professional" ? "Neues Passwort" : "[RESET_PASSWORD]")
                  : (theme === "professional" ? "Passwort zurücksetzen" : "[PASSWORD_RECOVERY]")
                }
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
                {isResetting 
                  ? (theme === "professional" ? "Geben Sie Ihr neues Passwort ein" : ">>> SET NEW PASSWORD...")
                  : (theme === "professional" ? "Geben Sie Ihre E-Mail-Adresse ein" : ">>> ENTER EMAIL FOR RESET...")
                }
              </motion.p>
            </div>

            <form onSubmit={isResetting ? handlePasswordReset : handleRequestReset} className="space-y-6">
              {!isResetting ? (
                <motion.div variants={itemVariants}>
                  <label 
                    htmlFor="email"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 600,
                      fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                      color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                      fontSize: '0.875rem'
                    }}
                  >
                    <Mail className="w-4 h-4 inline mr-2" />
                    {theme === "professional" ? "E-Mail" : "EMAIL_ADDRESS"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={theme === "professional" ? "ihre@email.de" : "user@matrix.net"}
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
                      transition: 'all 0.3s ease'
                    }}
                  />
                </motion.div>
              ) : (
                <>
                  <motion.div variants={itemVariants}>
                    <label 
                      htmlFor="password"
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 600,
                        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                        color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                        fontSize: '0.875rem'
                      }}
                    >
                      <Lock className="w-4 h-4 inline mr-2" />
                      {theme === "professional" ? "Neues Passwort" : "NEW_PASSWORD"}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder={theme === "professional" ? "Neues Passwort" : "Enter new password..."}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          paddingRight: '3rem',
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
                          transition: 'all 0.3s ease'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00'
                        }}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label 
                      htmlFor="confirmPassword"
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 600,
                        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                        color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                        fontSize: '0.875rem'
                      }}
                    >
                      <Lock className="w-4 h-4 inline mr-2" />
                      {theme === "professional" ? "Passwort bestätigen" : "CONFIRM_PASSWORD"}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder={theme === "professional" ? "Passwort wiederholen" : "Confirm password..."}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          paddingRight: '3rem',
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
                          transition: 'all 0.3s ease'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00'
                        }}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </motion.div>
                </>
              )}

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

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={loading}
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
                    opacity: loading ? 0.7 : 1
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
                      {theme === "professional" ? "Wird verarbeitet..." : "PROCESSING..."}
                    </>
                  ) : (
                    <>
                      <Lock size={20} />
                      {isResetting 
                        ? (theme === "professional" ? "Passwort ändern" : "UPDATE_PASSWORD")
                        : (theme === "professional" ? "Reset-Link senden" : "SEND_RESET_LINK")
                      }
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            <motion.div
              variants={itemVariants}
              className="mt-6 text-center"
            >
              <Link 
                href="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: theme === "professional" ? 'var(--primary-color)' : '#00ff00',
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'underline'
                }}
              >
                <ArrowLeft size={16} />
                {theme === "professional" ? "Zurück zur Anmeldung" : "[BACK_TO_LOGIN]"}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordContent />
    </Suspense>
  );
} 