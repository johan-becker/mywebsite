"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function HeroText() {
  const { theme } = useTheme();

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        textAlign: 'center',
        zIndex: 10,
        position: 'relative'
      }}
    >
      {/* Animated Title */}
      <motion.h1
        variants={textVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          fontSize: theme === "professional" ? 'clamp(2.5rem, 8vw, 5rem)' : 'clamp(3rem, 12vw, 8rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '2rem',
          fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
          color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
          textShadow: theme === "professional" ? 'none' : '0 0 20px #00ff00',
          letterSpacing: theme === "professional" ? 'normal' : '-0.02em'
        }}
        className={theme === "matrix" ? "glitch" : ""}
        data-text={theme === "matrix" ? "JOHAN BECKER" : ""}
      >
        JOHAN BECKER
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        variants={textVariants}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="neon-text"
        style={{
          fontSize: theme === "professional" ? '1.125rem' : 'clamp(1rem, 2.5vw, 1.5rem)',
          maxWidth: theme === "professional" ? '600px' : '48rem',
          margin: '0 auto 3rem auto',
          lineHeight: theme === "professional" ? 1.7 : 1.8,
          opacity: theme === "professional" ? 1 : 0.9,
          fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'Orbitron, monospace',
          color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
          fontWeight: theme === "professional" ? 400 : 'normal'
        }}
      >
        {theme === "professional" 
          ? "Spezialisiert auf moderne Webtechnologien und skalierbare Systemarchitekturen. Entwicklung innovativer digitaler Lösungen mit Fokus auf Performance und Benutzererfahrung."
          : "[INITIATING_PROTOCOL] Entwicklung futuristischer digitaler Systeme mit Matrix-Technologien. Spezialisiert auf Cyber-Architekturen und digitale Realitäten."
        }
      </motion.p>

      {/* Animated Divider */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: '100%' }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{
          height: '2px',
          background: theme === "professional" 
            ? 'linear-gradient(90deg, transparent, var(--primary-color), transparent)'
            : 'linear-gradient(90deg, transparent, #00ff00, transparent)',
          margin: '0 auto 3rem auto',
          maxWidth: '400px',
          boxShadow: theme === "professional" 
            ? `0 0 10px var(--primary-color)`
            : '0 0 10px #00ff00'
        }}
      />
    </motion.div>
  );
} 