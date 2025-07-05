"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, Zap, Briefcase } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ActionButtons() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
      style={{
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '2rem',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Portfolio Button */}
      <motion.div
        whileHover={{ 
          scale: 1.05, 
          rotateX: theme === "professional" ? 0 : 5,
          rotateY: theme === "professional" ? 0 : -5 
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href="/portfolio"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2rem',
            background: theme === "professional"
              ? 'var(--primary-color)'
              : 'linear-gradient(45deg, rgba(0, 255, 0, 0.1), rgba(0, 255, 255, 0.1))',
            border: theme === "professional"
              ? 'none'
              : '2px solid rgba(0, 255, 0, 0.7)',
            borderRadius: theme === "professional" ? '12px' : '0',
            clipPath: theme === "professional" 
              ? 'none'
              : 'polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)',
            color: theme === "professional" ? 'white' : '#00ff00',
            fontWeight: 600,
            fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
            textTransform: theme === "professional" ? 'none' : 'uppercase',
            letterSpacing: theme === "professional" ? 'normal' : '2px',
            textDecoration: 'none',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: theme === "professional"
              ? '0 4px 16px rgba(37, 99, 235, 0.3)'
              : '0 0 20px rgba(0, 255, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
          className={theme === "matrix" ? "cyber-button" : ""}
        >
          {theme === "professional" ? <Briefcase size={18} /> : <Code size={18} />}
          {theme === "professional" ? "Portfolio ansehen" : "[ACCESS_PORTFOLIO]"}
          <ArrowRight size={18} />
        </Link>
      </motion.div>

      {/* Contact Button */}
      <motion.div
        whileHover={{ 
          scale: 1.05, 
          rotateX: theme === "professional" ? 0 : 5,
          rotateY: theme === "professional" ? 0 : 5 
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href="/kontakt"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2rem',
            background: theme === "professional"
              ? 'transparent'
              : 'linear-gradient(45deg, rgba(255, 0, 255, 0.1), rgba(0, 255, 255, 0.1))',
            border: theme === "professional"
              ? '2px solid var(--primary-color)'
              : '2px solid rgba(0, 255, 255, 0.7)',
            borderRadius: theme === "professional" ? '12px' : '0',
            clipPath: theme === "professional" 
              ? 'none'
              : 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)',
            color: theme === "professional" ? 'var(--primary-color)' : '#00ffff',
            fontWeight: 600,
            fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
            textTransform: theme === "professional" ? 'none' : 'uppercase',
            letterSpacing: theme === "professional" ? 'normal' : '2px',
            textDecoration: 'none',
            overflow: 'hidden',
            position: 'relative',
            transition: 'all 0.3s ease'
          }}
          className={theme === "matrix" ? "cyber-button" : ""}
        >
          <Zap size={18} />
          {theme === "professional" ? "Kontakt aufnehmen" : "[ESTABLISH_CONTACT]"}
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </motion.div>
  );
} 