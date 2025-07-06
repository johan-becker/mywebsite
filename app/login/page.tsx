'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import AuthForm from '@/components/AuthForm';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/LoadingSpinner';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering to avoid build-time environment variable issues
export const dynamic = 'force-dynamic';

function LoginContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

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

        <div className="relative z-10 w-full" data-testid="auth-container">
          <AuthForm mode="login" onToggleMode={() => {}} />
          
          {/* Link to signup page */}
          <div className="text-center mt-6">
            <p style={{
              fontSize: '0.875rem',
              fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
              color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
              opacity: 0.8
            }}>
              {theme === "professional" ? "Noch kein Konto?" : ">>> NO ACCOUNT?"}
            </p>
            <Link 
              href="/signup"
              style={{
                color: theme === "professional" ? 'var(--primary-color)' : '#00ff00',
                fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'underline',
                marginTop: '0.5rem',
                display: 'inline-block'
              }}
            >
              {theme === "professional" ? "Hier registrieren" : "[CREATE_NEW_ACCOUNT]"}
            </Link>
            
            {/* Forgot Password Link */}
            <div className="mt-4">
              <Link 
                href="/reset-password"
                style={{
                  color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                  fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                  fontSize: '0.75rem',
                  textDecoration: 'underline',
                  opacity: 0.7
                }}
              >
                {theme === "professional" ? "Passwort vergessen?" : "[FORGOT_PASSWORD?]"}
              </Link>
            </div>
          </div>
        </div>
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