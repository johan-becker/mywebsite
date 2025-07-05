"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Github, Mail, MapPin, Phone } from "lucide-react";
import BubbleLayer from "@/components/BubbleLayer";
import { useTheme } from "@/components/ThemeProvider";

// Dynamic imports with SSR disabled
const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: false });

export default function Kontakt() {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {theme === "matrix" && <BubbleLayer count={12} />}
      <div className="min-h-screen relative overflow-hidden" style={{ 
        marginTop: "5rem",
        background: theme === "professional" 
          ? 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
          : 'linear-gradient(180deg, #000000 0%, #001100 50%, #000000 100%)'
      }}>
        {/* Matrix Background Effects - only in matrix theme */}
        {theme === "matrix" && (
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
            transition={{ duration: 2 }}
              style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(0, 255, 0, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)'
              }}
          />
          <motion.div
            initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)'
              }}
          />
        </div>
        )}

        <div className="max-width-container section-padding relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h1 className={theme === "matrix" ? "glitch" : ""} 
                  data-text={theme === "matrix" ? "[CONTACT_PROTOCOL]" : ""} 
                  style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                fontWeight: theme === "professional" ? 700 : 900,
                marginBottom: '2rem',
                color: theme === "professional" ? 'var(--text-primary)' : '#00ff00',
                textShadow: theme === "professional" ? 'none' : '0 0 20px #00ff00'
              }}>
                {theme === "professional" ? "Kontakt" : "[CONTACT_PROTOCOL]"}
              </h1>
              
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{
                  height: '2px',
                  background: theme === "professional" 
                    ? 'linear-gradient(90deg, transparent, var(--primary-color), transparent)'
                    : 'linear-gradient(90deg, transparent, #00ff00, transparent)',
                  margin: '0 auto',
                  maxWidth: '400px',
                  boxShadow: theme === "professional" 
                    ? `0 0 10px var(--primary-color)`
                    : '0 0 10px #00ff00'
                }}
              />
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="neon-text"
                style={{
                  fontSize: '1.2rem',
                  marginTop: '1rem',
                  fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'Orbitron, monospace',
                  color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00'
                }}
              >
                {theme === "professional" 
                  ? "Lassen Sie uns über Ihr nächstes Projekt sprechen"
                  : ">>> INITIATING_SECURE_CONNECTION..."
                }
              </motion.p>
          </motion.div>

            <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
              {/* Contact Information */}
              <motion.div
                variants={itemVariants}
                className="space-y-6"
              >
                {/* Email */}
            <motion.div
                  className="glass-card"
                  style={{
                    padding: '2rem',
                    border: theme === "professional" 
                      ? '1px solid var(--border-color)'
                      : '2px solid #00ff00',
                    background: theme === "professional" 
                      ? 'var(--background-card)'
                      : 'rgba(0, 20, 0, 0.8)',
                    borderRadius: theme === "professional" ? '16px' : '0',
                    clipPath: theme === "professional" 
                      ? 'none'
                      : 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                  }}
                >
              <a
                href="mailto:contact@johanbecker.de"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'calc(1.5rem + 8px)',
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <motion.div 
                      style={{
                        padding: '1.5rem',
                        background: theme === "professional" 
                          ? 'var(--primary-color)'
                          : 'rgba(0, 255, 0, 0.1)',
                        borderRadius: '12px',
                        border: theme === "professional" 
                          ? 'none'
                          : '1px solid #00ff00',
                        boxShadow: theme === "professional" 
                          ? '0 4px 16px rgba(37, 99, 235, 0.3)'
                          : '0 0 20px rgba(0, 255, 0, 0.3)'
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Mail style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        color: theme === "professional" ? 'white' : '#00ff00' 
                      }} />
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                        color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
                      }}>
                        {theme === "professional" ? "E-Mail" : "[EMAIL_CHANNEL]"}
                  </h2>
                      <p style={{
                        fontSize: '1.1rem',
                        fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                        color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00'
                      }}>
                    contact@johanbecker.de
                  </p>
                </div>
                  </a>
                </motion.div>

                {/* GitHub */}
                <motion.div
                  className="glass-card"
                  style={{
                    padding: '2rem',
                    border: theme === "professional" 
                      ? '1px solid var(--border-color)'
                      : '2px solid #00ffff',
                    background: theme === "professional" 
                      ? 'var(--background-card)'
                      : 'rgba(0, 20, 20, 0.8)',
                    borderRadius: theme === "professional" ? '16px' : '0',
                    clipPath: theme === "professional" 
                      ? 'none'
                      : 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)'
                  }}
                >
                  <a
                    href="https://github.com/johanbecker"
                target="_blank"
                rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'calc(1.5rem + 8px)',
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <motion.div 
                      style={{
                        padding: '1.5rem',
                        background: theme === "professional" 
                          ? 'var(--accent-color)'
                          : 'rgba(0, 255, 255, 0.1)',
                        borderRadius: '12px',
                        border: theme === "professional" 
                          ? 'none'
                          : '1px solid #00ffff',
                        boxShadow: theme === "professional" 
                          ? '0 4px 16px rgba(124, 58, 237, 0.3)'
                          : '0 0 20px rgba(0, 255, 255, 0.3)'
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Github style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        color: theme === "professional" ? 'white' : '#00ffff' 
                      }} />
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                        color: theme === "professional" ? 'var(--text-primary)' : '#00ffff'
                      }}>
                        {theme === "professional" ? "GitHub" : "[CODE_REPOSITORY]"}
                  </h2>
                      <p style={{
                        fontSize: '1.1rem',
                        fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                        color: theme === "professional" ? 'var(--text-secondary)' : '#00ffff'
                      }}>
                        github.com/johanbecker
                  </p>
                </div>
                  </a>
                </motion.div>
            </motion.div>

              {/* Contact Form */}
              <ContactForm />
              </div>
            </motion.div>
        </div>
      </div>
    </>
  );
} 