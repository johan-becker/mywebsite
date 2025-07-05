'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

export default function LoadingSpinner() {
  const { theme } = useTheme();

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: theme === "professional" 
          ? 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
          : 'linear-gradient(180deg, #000000 0%, #001100 50%, #000000 100%)'
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid transparent',
          borderTop: `3px solid ${theme === "professional" ? '#3b82f6' : '#00ff00'}`,
          borderRadius: '50%'
        }}
      />
    </div>
  );
} 