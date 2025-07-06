'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus, Phone } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onToggleMode: () => void;
}

export default function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Synchronize hidden form fields with visible ones for password managers
  useEffect(() => {
    const syncHiddenFields = () => {
      const hiddenEmail = document.getElementById('hidden-email') as HTMLInputElement;
      const hiddenPassword = document.getElementById('hidden-password') as HTMLInputElement;
      const hiddenName = document.getElementById('hidden-name') as HTMLInputElement;
      const hiddenPhone = document.getElementById('hidden-phone') as HTMLInputElement;
      const hiddenConfirm = document.getElementById('hidden-confirmPassword') as HTMLInputElement;

      if (hiddenEmail) hiddenEmail.value = email;
      if (hiddenPassword) hiddenPassword.value = password;
      if (hiddenName && mode === 'signup') hiddenName.value = fullName;
      if (hiddenPhone && mode === 'signup') hiddenPhone.value = phoneNumber;
      if (hiddenConfirm && mode === 'signup') hiddenConfirm.value = confirmPassword;
    };

    syncHiddenFields();
  }, [email, password, fullName, phoneNumber, confirmPassword, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError('Authentication service is not configured. Please contact the administrator.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone_number: phoneNumber,
            }
          }
        });

        if (error) throw error;
        setMessage(theme === "professional" 
          ? 'Registrierung erfolgreich! Sie können sich jetzt anmelden.'
          : '>>> REGISTRATION_COMPLETE: LOGIN_NOW <<<');
        
        // Redirect to login after successful registration
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        setMessage(theme === "professional" 
          ? 'Successfully logged in!'
          : '>>> ACCESS_GRANTED <<<');
        
        // Redirect to the cool person Easter egg page after successful login
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

  const fieldVariants = {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      {/* Hidden form for password managers - properly synchronized */}
      <form 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          opacity: 0, 
          pointerEvents: 'none',
          height: 0,
          overflow: 'hidden'
        }}
        autoComplete="on"
        data-form-type={mode === 'login' ? 'login' : 'signup'}
        onSubmit={handleSubmit}
      >
        {mode === 'signup' && (
          <>
            <input 
              type="text" 
              name="name" 
              id="hidden-name"
              autoComplete="name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              tabIndex={-1}
              data-lpignore="false"
            />
            <input 
              type="tel" 
              name="phone" 
              id="hidden-phone"
              autoComplete="tel" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              tabIndex={-1}
              data-lpignore="false"
            />
          </>
        )}
        <input 
          type="email" 
          name="email" 
          id="hidden-email"
          autoComplete="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          tabIndex={-1}
          data-lpignore="false"
        />
        <input 
          type="password" 
          name="password" 
          id="hidden-password"
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          tabIndex={-1}
          data-lpignore="false"
        />
                 {mode === 'signup' && (
           <input 
             type="password" 
             name="password-confirm" 
             id="hidden-confirmPassword"
             autoComplete="new-password"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             tabIndex={-1}
             data-lpignore="false"
           />
         )}
        <input type="submit" value="Submit" tabIndex={-1} />
      </form>

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
            {mode === 'login' ? (
              <LogIn size={48} className={theme === "professional" ? "text-primary mx-auto" : "text-[#00ff00] mx-auto"} />
            ) : (
              <UserPlus size={48} className={theme === "professional" ? "text-primary mx-auto" : "text-[#00ff00] mx-auto"} />
            )}
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
            {mode === 'login' 
              ? (theme === "professional" ? "Anmelden" : "[ACCESS_TERMINAL]")
              : (theme === "professional" ? "Registrieren" : "[CREATE_ACCOUNT]")
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
            {mode === 'login' 
              ? (theme === "professional" ? "Melden Sie sich in Ihrem Konto an" : ">>> ENTER CREDENTIALS...")
              : (theme === "professional" ? "Erstellen Sie ein neues Konto" : ">>> INITIALIZE NEW USER...")
            }
          </motion.p>
        </div>

        <form 
          className="space-y-6" 
          onSubmit={handleSubmit} 
          autoComplete="on"
          data-form-type={mode === 'login' ? 'login' : 'signup'}
          role="form"
          aria-label={mode === 'login' ? 'Login Form' : 'Signup Form'}
        >
          {mode === 'signup' && (
            <motion.div variants={fieldVariants}>
              <label 
                htmlFor="fullName"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                  color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                  fontSize: '0.875rem'
                }}
              >
                <User className="w-4 h-4 inline mr-2" />
                {theme === "professional" ? "Vollständiger Name" : "FULL_NAME"}
              </label>
                              <input
                  type="text"
                  name="name"
                  id="fullName"
                  autoComplete="name"
                  data-lpignore="false"
                  data-form-type="other"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder={theme === "professional" ? "Ihr vollständiger Name" : "Enter full name..."}
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
                  className={theme === "matrix" ? "cyber-input" : ""}
                />
            </motion.div>
          )}

          {mode === 'signup' && (
            <motion.div variants={fieldVariants}>
              <label 
                htmlFor="phoneNumber"
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
                {theme === "professional" ? "Telefonnummer" : "PHONE_NUMBER"}
                <span style={{ 
                  fontSize: '0.75rem', 
                  opacity: 0.7,
                  marginLeft: '0.5rem',
                  fontStyle: 'italic'
                }}>
                  {theme === "professional" ? "(optional)" : "(OPTIONAL)"}
                </span>
              </label>
              <input
                type="tel"
                name="phone"
                id="phoneNumber"
                autoComplete="tel"
                data-lpignore="false"
                data-form-type="other"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={theme === "professional" ? "+49 123 456 7890" : "+1234567890"}
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
                className={theme === "matrix" ? "cyber-input" : ""}
              />
            </motion.div>
          )}

          <motion.div variants={fieldVariants}>
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
              name="email"
              id="email"
              autoComplete="email"
              data-lpignore="false"
              data-form-type="other"
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
              className={theme === "matrix" ? "cyber-input" : ""}
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
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
                name="password"
                id="password"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                data-lpignore="false"
                data-form-type="other"
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
                className={theme === "matrix" ? "cyber-input" : ""}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
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

          {mode === 'signup' && (
            <motion.div variants={fieldVariants}>
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
                  name="password-confirm"
                  id="confirmPassword"
                  autoComplete="new-password"
                  data-lpignore="false"
                  data-form-type="other"
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
                  className={theme === "matrix" ? "cyber-input" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
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
              className={theme === "matrix" ? "cyber-button" : ""}
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
                  {mode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
                  {mode === 'login' 
                    ? (theme === "professional" ? "Anmelden" : "ACCESS_GRANTED")
                    : (theme === "professional" ? "Registrieren" : "CREATE_ACCOUNT")
                  }
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
} 