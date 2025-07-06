'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function VerifyContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push('/coolperson');
          return;
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Auto redirect to login after 5 seconds
    const timer = setTimeout(() => {
      router.push('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

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
              <CheckCircle size={64} className={theme === "professional" ? "text-green-600 mx-auto" : "text-[#00ff00] mx-auto"} />
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
              {theme === "professional" ? "Registrierung abgeschlossen!" : "[REGISTRATION_COMPLETE]"}
            </motion.h2>

            <motion.div
              variants={itemVariants}
              style={{
                padding: '1rem',
                borderRadius: theme === "professional" ? '8px' : '0',
                background: theme === "professional" ? '#dcfce7' : 'rgba(0, 255, 0, 0.1)',
                border: theme === "professional" ? '1px solid #4ade80' : '2px solid #00ff00',
                color: theme === "professional" ? '#16a34a' : '#00ff00',
                fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                fontSize: '1rem',
                marginBottom: '2rem'
              }}
            >
              {theme === "professional" 
                ? "Ihr Konto wurde erfolgreich erstellt! Sie können sich jetzt anmelden."
                : ">>> ACCOUNT_CREATED_SUCCESSFULLY. LOGIN_AVAILABLE_NOW."
              }
            </motion.div>

            {/* Continue to Login Button */}
            <motion.div
              variants={itemVariants}
              className="space-y-4"
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
                {theme === "professional" ? "Zur Anmeldung" : "CONTINUE_TO_LOGIN"}
              </Link>
              
              <p style={{
                fontSize: '0.875rem',
                fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                color: theme === "professional" ? 'var(--text-secondary)' : 'rgba(0, 255, 0, 0.7)',
                opacity: 0.8
              }}>
                {theme === "professional" 
                  ? "Automatische Weiterleitung in 5 Sekunden..."
                  : ">>> AUTO_REDIRECT_IN_5_SECONDS..."
                }
              </p>
              
              <Link 
                href="/signup"
                style={{
                  display: 'inline-block',
                  color: theme === "professional" ? 'var(--text-secondary)' : 'rgba(0, 255, 0, 0.7)',
                  fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                  fontSize: '0.875rem',
                  textDecoration: 'underline',
                  opacity: 0.8
                }}
              >
                {theme === "professional" ? "Anderes Konto erstellen" : "[CREATE_DIFFERENT_ACCOUNT]"}
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