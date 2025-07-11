'use client';

import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import AuthForm from '@/components/AuthForm';
import ProfessionalBackground from '@/components/ProfessionalBackground';
import Head from 'next/head';
import Link from 'next/link';

// Force dynamic rendering to avoid build-time environment variable issues
export const dynamic = 'force-dynamic';

export default function Signup() {
  const { theme } = useTheme();

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
          <AuthForm 
            mode="signup" 
            onToggleMode={() => {}} // Not used since we have separate pages
          />
          
          {/* Link to login page */}
          <div className="text-center mt-6">
            <p style={{
              fontSize: '0.875rem',
              fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
              color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
              opacity: 0.8
            }}>
              {theme === "professional" ? "Bereits ein Konto?" : ">>> ALREADY REGISTERED?"}
            </p>
            <Link 
              href="/login"
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
              {theme === "professional" ? "Hier anmelden" : "[ACCESS_EXISTING_ACCOUNT]"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 