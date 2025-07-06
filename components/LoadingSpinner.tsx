'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

export default function LoadingSpinner() {
  const { theme } = useTheme();

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: theme === "professional" 
          ? 'var(--background-primary)'
          : 'linear-gradient(180deg, #000000 0%, #001100 50%, #000000 100%)',
        zIndex: 9999
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid transparent',
            borderTop: `3px solid ${theme === "professional" ? 'var(--primary-color)' : '#00ff00'}`,
            borderRadius: '50%'
          }}
        />
        <motion.p
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          style={{
            fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
            color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
            fontSize: '1rem',
            fontWeight: 500
          }}
        >
          {theme === "professional" ? "Wird geladen..." : ">>> LOADING..."}
        </motion.p>
      </div>
    </div>
  );
} 