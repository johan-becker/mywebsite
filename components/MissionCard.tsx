"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Wifi, Briefcase, User } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function MissionCard() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        y: 50,
        scale: 0.9
      }}
      animate={{ 
        opacity: 1,
        y: 0,
        scale: 1
      }}
      transition={{
        duration: 0.8,
        delay: 1.5,
        ease: "easeOut"
      }}
      className={theme === "professional" ? "mission-block" : ""}
      style={{
        padding: '2rem',
        marginTop: '4rem',
        background: theme === "professional" 
          ? 'var(--background-card)'
          : 'rgba(0, 20, 0, 0.8)',
        border: theme === "professional" 
          ? '1px solid var(--border-color)'
          : '2px solid #00ff00',
        borderRadius: theme === "professional" ? '16px' : '20px',
        backdropFilter: 'blur(15px)',
        boxShadow: theme === "professional" 
          ? '0 4px 24px var(--shadow-color)'
          : '0 8px 32px rgba(0, 255, 0, 0.2)',
        maxWidth: '600px',
        margin: '4rem auto 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated gradient background - only in matrix theme */}
      {theme === "matrix" && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent)',
            pointerEvents: 'none'
          }}
        />
      )}
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 
          className={theme === "matrix" ? "mission-glitch" : ""}
          data-text={theme === "matrix" ? "[CURRENT_MISSION]" : ""}
          style={{
            fontSize: '1.5rem',
            fontWeight: theme === "professional" ? 600 : 700,
            marginBottom: '1rem',
            color: theme === "professional" ? 'var(--primary-color)' : '#00ff00',
            fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
            textShadow: theme === "professional" ? 'none' : '0 0 10px #00ff00',
            display: 'inline-block'
          }}
        >
          {theme === "professional" ? "Aktuelle Projekte" : "[CURRENT_MISSION]"}
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
          color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
          fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'Orbitron, monospace'
        }}>
          {theme === "professional" 
            ? "Entwicklung moderner Web-Anwendungen mit Next.js, TypeScript und Cloud-Technologien"
            : ">>> Konstruktion einer neuen digitalen Matrix-Infrastruktur"
          }
        </p>
        
        {/* System Status */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: theme === "professional" ? User : Terminal, label: theme === "professional" ? 'ENTWICKLUNG' : 'TERMINAL', status: theme === "professional" ? 'AKTIV' : 'ONLINE' },
            { icon: Database, label: 'DATABASE', status: 'SYNC' },
            { icon: Wifi, label: 'NETWORK', status: 'SECURE' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                y: 20,
                scale: 0.9
              }}
              animate={{ 
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.2,
                ease: "easeOut"
              }}
              className={theme === "professional" ? "status-indicator" : ""}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                border: theme === "professional" ? '1px solid var(--border-color)' : '1px solid #00ff00',
                borderRadius: theme === "professional" ? '8px' : '20px',
                background: theme === "professional" ? 'var(--background-secondary)' : 'rgba(0, 255, 0, 0.1)',
                color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                fontSize: '0.75rem',
                fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                position: 'relative'
              }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5
                }}
              >
                <item.icon style={{ width: '1rem', height: '1rem' }} />
              </motion.div>
              <span>{item.label}: {item.status}</span>
              
              {/* Glow effect - only in matrix theme */}
              {theme === "matrix" && (
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    pointerEvents: 'none'
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 5px #00ff00', 
                      '0 0 20px #00ff00', 
                      '0 0 5px #00ff00'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.5 + i * 0.3
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 