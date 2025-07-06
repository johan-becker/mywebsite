'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useTheme } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Crown, Sparkles, Home, LogOut } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function CoolPerson() {
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
          <p className="text-lg">Loading your awesome status...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const congratsMessages = [
    "🎉 Congratulations! You found the secret area!",
    "🕵️ Nice detective work! You discovered the Easter egg!",
    "🚀 Welcome to the exclusive club of cool people!",
    "💎 You're now officially a VIP member!",
    "🎯 Achievement unlocked: Secret Area Explorer!"
  ];

  const randomMessage = congratsMessages[Math.floor(Math.random() * congratsMessages.length)];

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 overflow-x-hidden" style={{
      background: theme === "professional" 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      paddingTop: "calc(5rem + 2rem)"
    }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden" style={{ top: "5rem" }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '4px',
              height: '4px',
              background: theme === "professional" ? '#fbbf24' : '#00ff00',
              borderRadius: '50%',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
            style={{ marginTop: "2rem" }}
          >
            <Crown 
              size={80} 
              style={{ 
                color: theme === "professional" ? '#fbbf24' : '#00ff00',
                margin: '0 auto',
                filter: 'drop-shadow(0 0 20px currentColor)'
              }} 
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${theme === "matrix" ? "glitch" : ""}`}
            style={{
              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
              color: theme === "professional" ? '#ffffff' : '#00ff00',
              textShadow: theme === "professional" 
                ? '0 0 30px rgba(251, 191, 36, 0.5)'
                : '0 0 30px rgba(0, 255, 0, 0.8)',
              maxWidth: '100%',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              hyphens: 'auto'
            }}
          >
            {theme === "professional" ? "🎉 COOL PERSON DETECTED!" : (
              <>
                [ELITE_STATUS]<br />
                [CONFIRMED]
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl mb-8"
            style={{
              fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
              color: theme === "professional" ? '#f1f5f9' : '#00ff00',
              opacity: 0.9,
              maxWidth: '100%',
              overflowWrap: 'break-word'
            }}
          >
            {randomMessage}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-8 mb-8"
          style={{
            background: theme === "professional" 
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 20, 0, 0.8)',
            border: theme === "professional" 
              ? '1px solid rgba(255, 255, 255, 0.2)'
              : '2px solid rgba(0, 255, 0, 0.3)',
            borderRadius: '20px',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="text-center p-6 rounded-lg"
              style={{
                background: theme === "professional" 
                  ? 'rgba(251, 191, 36, 0.1)'
                  : 'rgba(0, 255, 0, 0.1)',
                border: theme === "professional" 
                  ? '1px solid rgba(251, 191, 36, 0.3)'
                  : '1px solid rgba(0, 255, 0, 0.3)',
              }}
            >
              <Trophy size={40} className="mx-auto mb-3" style={{ color: theme === "professional" ? '#fbbf24' : '#00ff00' }} />
              <h3 className="text-lg font-bold mb-2" style={{ color: theme === "professional" ? '#ffffff' : '#00ff00' }}>
                {theme === "professional" ? "Easter Egg Hunter" : "[SECRET_FINDER]"}
              </h3>
              <p style={{ color: theme === "professional" ? '#f1f5f9' : '#00ff00', opacity: 0.8 }}>
                {theme === "professional" ? "Du hast das versteckte Login gefunden!" : ">>> HIDDEN_PATH_DISCOVERED"}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              className="text-center p-6 rounded-lg"
              style={{
                background: theme === "professional" 
                  ? 'rgba(251, 191, 36, 0.1)'
                  : 'rgba(0, 255, 0, 0.1)',
                border: theme === "professional" 
                  ? '1px solid rgba(251, 191, 36, 0.3)'
                  : '1px solid rgba(0, 255, 0, 0.3)',
              }}
            >
              <Star size={40} className="mx-auto mb-3" style={{ color: theme === "professional" ? '#fbbf24' : '#00ff00' }} />
              <h3 className="text-lg font-bold mb-2" style={{ color: theme === "professional" ? '#ffffff' : '#00ff00' }}>
                {theme === "professional" ? "VIP Status" : "[ELITE_ACCESS]"}
              </h3>
              <p style={{ color: theme === "professional" ? '#f1f5f9' : '#00ff00', opacity: 0.8 }}>
                {theme === "professional" ? "Willkommen im exklusiven Bereich!" : ">>> PREMIUM_MEMBER_CONFIRMED"}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="text-center p-6 rounded-lg"
              style={{
                background: theme === "professional" 
                  ? 'rgba(251, 191, 36, 0.1)'
                  : 'rgba(0, 255, 0, 0.1)',
                border: theme === "professional" 
                  ? '1px solid rgba(251, 191, 36, 0.3)'
                  : '1px solid rgba(0, 255, 0, 0.3)',
              }}
            >
              <Sparkles size={40} className="mx-auto mb-3" style={{ color: theme === "professional" ? '#fbbf24' : '#00ff00' }} />
              <h3 className="text-lg font-bold mb-2" style={{ color: theme === "professional" ? '#ffffff' : '#00ff00' }}>
                {theme === "professional" ? "Cool Person" : "[COOLNESS_LEVEL_MAX]"}
              </h3>
              <p style={{ color: theme === "professional" ? '#f1f5f9' : '#00ff00', opacity: 0.8 }}>
                {theme === "professional" ? "Du bist offiziell cool! 😎" : ">>> MAXIMUM_COOLNESS_ACHIEVED"}
              </p>
            </motion.div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: theme === "professional" ? '#ffffff' : '#00ff00' }}>
              {theme === "professional" ? `Hallo ${user.user_metadata?.full_name || user.email}!` : `>>> WELCOME ${user.user_metadata?.full_name || user.email}`}
            </h2>
            <p className="mb-6" style={{ color: theme === "professional" ? '#f1f5f9' : '#00ff00', opacity: 0.8 }}>
              {theme === "professional" 
                ? "Du hast erfolgreich den geheimen Bereich erreicht. Das macht dich zu einer offiziell coolen Person! 🎉"
                : ">>> CONGRATULATIONS: SECRET_AREA_ACCESS_GRANTED. COOLNESS_STATUS: CONFIRMED. 🎯"
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all"
                style={{
                  background: theme === "professional" 
                    ? 'rgba(251, 191, 36, 0.9)'
                    : 'linear-gradient(45deg, rgba(0, 255, 0, 0.2), rgba(0, 255, 0, 0.4))',
                  border: theme === "professional" 
                    ? 'none'
                    : '2px solid rgba(0, 255, 0, 0.7)',
                  color: theme === "professional" ? '#1e293b' : '#00ff00',
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                  fontWeight: 600,
                }}
              >
                <Home size={20} />
                {theme === "professional" ? "Zur Startseite" : ">>> RETURN_TO_MAIN"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all"
                style={{
                  background: theme === "professional" 
                    ? 'rgba(239, 68, 68, 0.9)'
                    : 'rgba(255, 0, 0, 0.2)',
                  border: theme === "professional" 
                    ? 'none'
                    : '1px solid rgba(255, 0, 0, 0.5)',
                  color: theme === "professional" ? '#ffffff' : '#ff0000',
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'monospace',
                  fontWeight: 600,
                }}
              >
                <LogOut size={20} />
                {theme === "professional" ? "Abmelden" : ">>> LOGOUT"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 