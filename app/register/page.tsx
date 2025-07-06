'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function RegisterContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/login');
        return;
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          phone: phone || null
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setMessage(data.message);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
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
                <UserPlus size={48} className={theme === "professional" ? "text-primary mx-auto" : "text-[#00ff00] mx-auto"} />
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
                {theme === "professional" ? "Registrieren" : "[CREATE_ACCOUNT]"}
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
                {theme === "professional" ? "Erstellen Sie Ihr Konto" : ">>> INITIALIZE NEW USER..."}
              </motion.p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  htmlFor="phone"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                    color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                    fontSize: '0.875rem'
                  }}
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  {theme === "professional" ? "Telefon (optional)" : "PHONE_NUMBER (OPTIONAL)"}
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={theme === "professional" ? "+49 123 456789" : "+49 123 456789"}
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
                    placeholder={theme === "professional" ? "Mindestens 6 Zeichen" : "Min 6 characters..."}
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
                      {theme === "professional" ? "Registrierung..." : "CREATING_ACCOUNT..."}
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} />
                      {theme === "professional" ? "Konto erstellen" : "CREATE_ACCOUNT"}
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            <motion.div
              variants={itemVariants}
              className="mt-6 text-center"
            >
              <p style={{
                fontSize: '0.875rem',
                fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                opacity: 0.8,
                marginBottom: '0.5rem'
              }}>
                {theme === "professional" ? "Bereits ein Konto?" : ">>> ALREADY HAVE ACCOUNT?"}
              </p>
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
                {theme === "professional" ? "Zur Anmeldung" : "[BACK_TO_LOGIN]"}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default function Register() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RegisterContent />
    </Suspense>
  );
} 