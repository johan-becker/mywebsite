'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Save, Eye, EyeOff, Settings } from 'lucide-react';
import Link from 'next/link';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function ProfileSettingsContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuthAndLoadProfile = async () => {
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
        setEmail(user.email || '');
        
        const userMetadata = user.user_metadata || {};
        setFullName(userMetadata.full_name || '');
        setPhoneNumber(userMetadata.phone_number || '');

      } catch (error: any) {
        console.error('Auth check error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoadProfile();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone_number: phoneNumber,
        }
      });

      if (updateError) {
        throw updateError;
      }

      setMessage(theme === "professional" ? 'Profil erfolgreich aktualisiert!' : '>>> PROFILE_UPDATED_SUCCESSFULLY');

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
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                variants={itemVariants}
                className="mb-4"
              >
                <User size={48} className={theme === "professional" ? "text-primary mx-auto" : "text-[#00ff00] mx-auto"} />
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
                {theme === "professional" ? "Profil bearbeiten" : "[EDIT_PROFILE]"}
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
                {theme === "professional" ? "Aktualisieren Sie Ihre persönlichen Daten" : ">>> UPDATE YOUR PERSONAL DATA"}
              </motion.p>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Full Name */}
              <motion.div variants={itemVariants}>
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
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                />
              </motion.div>

              {/* Email (read-only) */}
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
                  <span style={{ 
                    fontSize: '0.75rem', 
                    opacity: 0.7,
                    marginLeft: '0.5rem',
                    fontStyle: 'italic'
                  }}>
                    {theme === "professional" ? "(nicht änderbar)" : "(READ_ONLY)"}
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  readOnly
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
                    color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                    fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                    fontSize: '1rem',
                    outline: 'none',
                    opacity: 0.7,
                    cursor: 'not-allowed'
                  }}
                />
              </motion.div>

              {/* Phone Number */}
              <motion.div variants={itemVariants}>
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
                  id="phoneNumber"
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
                />
              </motion.div>

              {/* Submit Button */}
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
                      {theme === "professional" ? "Speichern..." : "SAVING..."}
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      {theme === "professional" ? "Profil speichern" : "SAVE_PROFILE"}
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Messages */}
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

            {/* Navigation Links */}
            <motion.div variants={itemVariants} className="mt-6 text-center space-y-2">
              <Link 
                href="/settings/security"
                style={{
                  display: 'block',
                  color: theme === "professional" ? 'var(--primary-color)' : '#00ff00',
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'underline'
                }}
              >
                {theme === "professional" ? "Sicherheitseinstellungen" : "SECURITY_SETTINGS"}
              </Link>
              
              <Link 
                href="/coolperson"
                style={{
                  display: 'block',
                  color: theme === "professional" ? 'var(--text-secondary)' : 'rgba(0, 255, 0, 0.7)',
                  fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                  fontSize: '0.875rem',
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

export default function ProfileSettings() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProfileSettingsContent />
    </Suspense>
  );
} 