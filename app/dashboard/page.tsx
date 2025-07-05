'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useTheme } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';
import { LogOut, User as UserIcon, Mail, Calendar } from 'lucide-react';

// Force dynamic rendering to avoid build-time environment variable issues
export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
      
      if (!user) {
        router.push('/login');
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          router.push('/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 mb-8"
          style={{
            background: theme === "professional" 
              ? 'var(--background-card)'
              : 'rgba(0, 20, 0, 0.8)',
            border: theme === "professional" 
              ? '1px solid var(--border-color)'
              : '2px solid rgba(0, 255, 0, 0.3)',
            borderRadius: theme === "professional" ? '16px' : '20px',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 
                className={`text-3xl font-bold mb-2 ${theme === "matrix" ? "glitch" : ""}`}
                style={{
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                  color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                }}
              >
                {theme === "professional" ? "Dashboard" : "[SYSTEM_ACCESS]"}
              </h1>
              <p 
                style={{
                  fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                  color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                  opacity: 0.8
                }}
              >
                {theme === "professional" ? "Willkommen zurück!" : ">>> ACCESS GRANTED"}
              </p>
            </div>
            
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
              style={{
                background: theme === "professional" 
                  ? 'var(--primary-color)'
                  : 'rgba(255, 0, 0, 0.2)',
                border: theme === "professional" 
                  ? 'none'
                  : '1px solid rgba(255, 0, 0, 0.5)',
                color: theme === "professional" ? 'white' : '#ff0000',
                fontFamily: theme === "professional" ? 'var(--font-primary)' : 'monospace',
              }}
            >
              <LogOut size={16} />
              {theme === "professional" ? "Abmelden" : "LOGOUT"}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-lg"
              style={{
                background: theme === "professional" 
                  ? 'var(--background-secondary)'
                  : 'rgba(0, 0, 0, 0.3)',
                border: theme === "professional" 
                  ? '1px solid var(--border-color)'
                  : '1px solid rgba(0, 255, 0, 0.3)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <UserIcon 
                  size={24} 
                  style={{ color: theme === "professional" ? 'var(--primary-color)' : '#00ff00' }}
                />
                <h2 
                  className="text-xl font-semibold"
                  style={{
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                    color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                  }}
                >
                  {theme === "professional" ? "Benutzer Info" : "USER_DATA"}
                </h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail size={16} style={{ color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00' }} />
                  <span 
                    style={{
                      fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                      color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                    }}
                  >
                    {user.email}
                  </span>
                </div>
                
                {user.user_metadata?.full_name && (
                  <div className="flex items-center gap-2">
                    <UserIcon size={16} style={{ color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00' }} />
                    <span 
                      style={{
                        fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                        color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                      }}
                    >
                      {user.user_metadata.full_name}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar size={16} style={{ color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00' }} />
                  <span 
                    style={{
                      fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                      color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                    }}
                  >
                    {theme === "professional" ? "Registriert: " : "REGISTERED: "}
                    {new Date(user.created_at).toLocaleDateString('de-DE')}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded-lg"
              style={{
                background: theme === "professional" 
                  ? 'var(--background-secondary)'
                  : 'rgba(0, 0, 0, 0.3)',
                border: theme === "professional" 
                  ? '1px solid var(--border-color)'
                  : '1px solid rgba(0, 255, 0, 0.3)',
              }}
            >
              <h2 
                className="text-xl font-semibold mb-4"
                style={{
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                  color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                }}
              >
                {theme === "professional" ? "Aktionen" : "ACTIONS"}
              </h2>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/')}
                  className="w-full p-3 rounded-lg text-left transition-all"
                  style={{
                    background: theme === "professional" 
                      ? 'var(--primary-color)'
                      : 'rgba(0, 255, 0, 0.1)',
                    border: theme === "professional" 
                      ? 'none'
                      : '1px solid rgba(0, 255, 0, 0.3)',
                    color: theme === "professional" ? 'white' : '#00ff00',
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'monospace',
                  }}
                >
                  {theme === "professional" ? "Zur Startseite" : ">>> RETURN_TO_MAIN"}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/portfolio')}
                  className="w-full p-3 rounded-lg text-left transition-all"
                  style={{
                    background: theme === "professional" 
                      ? 'var(--background-tertiary)'
                      : 'rgba(0, 255, 0, 0.1)',
                    border: theme === "professional" 
                      ? '1px solid var(--border-color)'
                      : '1px solid rgba(0, 255, 0, 0.3)',
                    color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'monospace',
                  }}
                >
                  {theme === "professional" ? "Portfolio ansehen" : ">>> VIEW_PORTFOLIO"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 