'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, LogIn, Smartphone, Eye, EyeOff } from 'lucide-react';

// Force dynamic rendering to avoid build-time environment variable issues
export const dynamic = 'force-dynamic';

type LoginMethod = 'password' | 'code';

function LoginContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('password');
  
  // Password login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Code login fields
  const [emailOrPhone, setEmailOrPhone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check if we have an active session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (session) {
          // If we have a session, redirect to coolperson page
          router.push('/coolperson');
          return;
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        // Clean up URL by removing any auth-related parameters or hash
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          const cleanUrl = `${url.origin}${url.pathname}`;
          window.history.replaceState({}, '', cleanUrl);
        }
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Check if user has 2FA enabled
      const { data: { user } } = await supabase.auth.getUser();
      const userMetadata = user?.user_metadata || {};
      const twoFactorEnabled = userMetadata.two_factor_enabled;
      
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

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const isEmail = emailOrPhone.includes('@');
      const payload = isEmail 
        ? { email: emailOrPhone }
        : { phone: emailOrPhone };

      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send code');
      }

      // Store the email/phone and type in localStorage for the code page
      localStorage.setItem('codeVerificationData', JSON.stringify({
        emailOrPhone,
        type: isEmail ? 'email' : 'phone'
      }));

      // Redirect to code page
      router.push('/code');

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
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
      <Head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="password-manager" content="allow" />
      </Head>
      {theme === "professional" && <ProfessionalBackground variant="minimal" />}
      <div className="min-h-screen flex items-center justify-center" style={{ 
        marginTop: "5rem",
        padding: "2rem",
        background: theme === "professional" 
          ? 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
          : 'linear-gradient(180deg, #000000 0%, #001100 50%, #000000 100%)'
      }}>
        {/* Matrix Background Effects - only in matrix theme */}
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
                <LogIn size={48} className={theme === "professional" ? "text-primary mx-auto" : "text-[#00ff00] mx-auto"} />
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
                {theme === "professional" ? "Anmelden" : "[ACCESS_TERMINAL]"}
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
                {theme === "professional" ? "Wählen Sie Ihre Anmeldemethode" : ">>> SELECT AUTH METHOD..."}
              </motion.p>
            </div>

            {/* Login Method Selection */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('password');
                    setError('');
                    setMessage('');
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: loginMethod === 'password' 
                      ? (theme === "professional" ? 'var(--primary-color)' : 'rgba(0, 255, 0, 0.2)')
                      : 'transparent',
                    border: theme === "professional" 
                      ? `1px solid ${loginMethod === 'password' ? 'var(--primary-color)' : 'var(--border-color)'}`
                      : `1px solid ${loginMethod === 'password' ? '#00ff00' : 'rgba(0, 255, 0, 0.3)'}`,
                    borderRadius: theme === "professional" ? '6px' : '0',
                    color: loginMethod === 'password'
                      ? (theme === "professional" ? 'white' : '#00ff00')
                      : (theme === "professional" ? 'var(--text-secondary)' : 'rgba(0, 255, 0, 0.7)'),
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'monospace',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Lock size={16} />
                  {theme === "professional" ? "Passwort" : "PASSWORD"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('code');
                    setError('');
                    setMessage('');
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: loginMethod === 'code' 
                      ? (theme === "professional" ? 'var(--primary-color)' : 'rgba(0, 255, 0, 0.2)')
                      : 'transparent',
                    border: theme === "professional" 
                      ? `1px solid ${loginMethod === 'code' ? 'var(--primary-color)' : 'var(--border-color)'}`
                      : `1px solid ${loginMethod === 'code' ? '#00ff00' : 'rgba(0, 255, 0, 0.3)'}`,
                    borderRadius: theme === "professional" ? '6px' : '0',
                    color: loginMethod === 'code'
                      ? (theme === "professional" ? 'white' : '#00ff00')
                      : (theme === "professional" ? 'var(--text-secondary)' : 'rgba(0, 255, 0, 0.7)'),
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'monospace',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Smartphone size={16} />
                  {theme === "professional" ? "Code" : "CODE"}
                </button>
              </div>
            </motion.div>

            {/* Password Login Form */}
            {loginMethod === 'password' && (
              <form onSubmit={handlePasswordLogin} className="space-y-6">
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
                    {theme === "professional" ? "Passwort" : "PASSWORD"}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder={theme === "professional" ? "Ihr Passwort" : "Enter password..."}
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
                        {theme === "professional" ? "Anmelden..." : "LOGGING_IN..."}
                      </>
                    ) : (
                      <>
                        <LogIn size={20} />
                        {theme === "professional" ? "Anmelden" : "LOGIN"}
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            )}

            {/* Code Login Form */}
            {loginMethod === 'code' && (
              <form onSubmit={handleSendCode} className="space-y-6">
                    <motion.div variants={itemVariants}>
                      <label 
                        htmlFor="emailOrPhone"
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
                    {theme === "professional" ? "E-Mail oder Telefonnummer" : "EMAIL_OR_PHONE"}
                      </label>
                      <input
                        type="text"
                        id="emailOrPhone"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        required
                    placeholder={theme === "professional" ? "ihre@email.de oder +49123456789" : "user@matrix.net or +1234567890"}
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
                            {theme === "professional" ? "Code wird gesendet..." : "SENDING_CODE..."}
                          </>
                        ) : (
                          <>
                        <Smartphone size={20} />
                            {theme === "professional" ? "Code senden" : "SEND_CODE"}
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
            )}

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

            {/* Links */}
            <motion.div variants={itemVariants} className="mt-6 text-center space-y-2">
              <Link 
                href="/reset-password"
                style={{
                  display: 'block',
                  color: theme === "professional" ? 'var(--text-secondary)' : 'rgba(0, 255, 0, 0.7)',
                  fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                  fontSize: '0.875rem',
                  textDecoration: 'underline'
                }}
              >
                {theme === "professional" ? "Passwort vergessen?" : "[FORGOT_PASSWORD]"}
              </Link>
              <div>
                <span style={{
              fontSize: '0.875rem',
              fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
              color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                  opacity: 0.8
            }}>
                  {theme === "professional" ? "Noch kein Konto?" : ">>> NO_ACCOUNT?"}
                </span>
            <Link 
                  href="/signup"
              style={{
                    marginLeft: '0.5rem',
                color: theme === "professional" ? 'var(--primary-color)' : '#00ff00',
                fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                fontWeight: 600,
                fontSize: '0.875rem',
                    textDecoration: 'underline'
              }}
            >
                  {theme === "professional" ? "Registrieren" : "[REGISTER]"}
                </Link>
        </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginContent />
    </Suspense>
  );
} 