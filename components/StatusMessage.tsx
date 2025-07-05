"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface StatusMessageProps {
  status: 'success' | 'error' | null;
  message: string;
  onClose: () => void;
}

export default function StatusMessage({ status, message, onClose }: StatusMessageProps) {
  const { theme } = useTheme();

  if (!status) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          zIndex: 1000,
          maxWidth: '400px',
          padding: '1rem 1.5rem',
          background: status === 'success' 
            ? (theme === "professional" ? '#10b981' : 'rgba(0, 255, 0, 0.1)')
            : (theme === "professional" ? '#ef4444' : 'rgba(255, 0, 0, 0.1)'),
          border: theme === "professional" 
            ? 'none'
            : `2px solid ${status === 'success' ? '#00ff00' : '#ff0000'}`,
          borderRadius: theme === "professional" ? '8px' : '0',
          color: theme === "professional" ? 'white' : (status === 'success' ? '#00ff00' : '#ff0000'),
          fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
          boxShadow: theme === "professional" 
            ? '0 8px 32px rgba(0, 0, 0, 0.12)'
            : `0 0 20px ${status === 'success' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)'}`,
          backdropFilter: 'blur(10px)'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          {status === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 flex-shrink-0" />
          )}
          
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            lineHeight: 1.4,
            flex: 1
          }}>
            {message}
          </p>
          
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 