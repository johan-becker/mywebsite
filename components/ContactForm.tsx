"use client";

import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import StatusMessage from "./StatusMessage";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send to API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Fehler beim Senden der Nachricht');
      }

      // Show success message
      console.log('✅ Form submission successful:', result);
      setStatusMessage(`${result.message} (ID: ${result.submissionId})`);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      setStatusMessage(errorMessage);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Status Message */}
      <StatusMessage 
        status={submitStatus === 'idle' ? null : submitStatus}
        message={statusMessage}
        onClose={() => {
          setSubmitStatus('idle');
          setStatusMessage('');
        }}
      />
      
      <motion.section
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="glass-card"
      style={{
        padding: '3rem',
        background: theme === "professional" 
          ? 'var(--background-card)'
          : 'rgba(0, 255, 255, 0.1)',
        border: theme === "professional" 
          ? '1px solid var(--border-color)'
          : '2px solid rgba(0, 255, 255, 0.3)',
        borderRadius: theme === "professional" ? '16px' : '20px',
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
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent)',
            pointerEvents: 'none'
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
          color: theme === "professional" ? 'var(--primary-color)' : '#00ffff'
        }} className="neon-text">
          <Mail className="w-8 h-8" />
          {theme === "professional" ? "Nachricht senden" : "SEND TRANSMISSION"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
              color: theme === "professional" ? 'var(--text-primary)' : undefined,
              fontSize: '0.875rem',
              letterSpacing: theme === "professional" ? 'normal' : '0.1em'
            }}>
              <User className="w-4 h-4 inline mr-2" />
              {theme === "professional" ? "Name" : "IDENTITY"}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder={theme === "professional" ? "Ihr Name..." : "Enter your identity..."}
              style={{
                width: '100%',
                padding: '1rem',
                background: theme === "professional" 
                  ? 'var(--background-secondary)'
                  : 'rgba(0, 0, 0, 0.3)',
                border: theme === "professional" 
                  ? '1px solid var(--border-color)'
                  : '2px solid rgba(0, 255, 255, 0.3)',
                borderRadius: theme === "professional" ? '8px' : '0',
                color: theme === "professional" ? 'var(--text-primary)' : '#00ffff',
                fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'Orbitron, monospace',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              className={theme === "matrix" ? "cyber-input" : ""}
            />
          </motion.div>

          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
              color: theme === "professional" ? 'var(--text-primary)' : undefined,
              fontSize: '0.875rem',
              letterSpacing: theme === "professional" ? 'normal' : '0.1em'
            }}>
              <Mail className="w-4 h-4 inline mr-2" />
              {theme === "professional" ? "E-Mail" : "COMMUNICATION_CHANNEL"}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder={theme === "professional" ? "ihre@email.de" : "your@transmission.net"}
              style={{
                width: '100%',
                padding: '1rem',
                background: theme === "professional" 
                  ? 'var(--background-secondary)'
                  : 'rgba(0, 0, 0, 0.3)',
                border: theme === "professional" 
                  ? '1px solid var(--border-color)'
                  : '2px solid rgba(0, 255, 255, 0.3)',
                borderRadius: theme === "professional" ? '8px' : '0',
                color: theme === "professional" ? 'var(--text-primary)' : '#00ffff',
                fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'Orbitron, monospace',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              className={theme === "matrix" ? "cyber-input" : ""}
            />
          </motion.div>

          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
              color: theme === "professional" ? 'var(--text-primary)' : undefined,
              fontSize: '0.875rem',
              letterSpacing: theme === "professional" ? 'normal' : '0.1em'
            }}>
              <MessageSquare className="w-4 h-4 inline mr-2" />
              {theme === "professional" ? "Nachricht" : "MESSAGE_CONTENT"}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder={theme === "professional" 
                ? "Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                : "Encrypt your message transmission..."
              }
              style={{
                width: '100%',
                padding: '1rem',
                background: theme === "professional" 
                  ? 'var(--background-secondary)'
                  : 'rgba(0, 0, 0, 0.3)',
                border: theme === "professional" 
                  ? '1px solid var(--border-color)'
                  : '2px solid rgba(0, 255, 255, 0.3)',
                borderRadius: theme === "professional" ? '8px' : '0',
                color: theme === "professional" ? 'var(--text-primary)' : '#00ffff',
                fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'Orbitron, monospace',
                fontSize: '1rem',
                outline: 'none',
                resize: 'vertical',
                transition: 'all 0.3s ease'
              }}
              className={theme === "matrix" ? "cyber-input" : ""}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                background: isSubmitting 
                  ? (theme === "professional" ? '#94a3b8' : 'rgba(0, 255, 255, 0.1)')
                  : (theme === "professional"
                    ? 'var(--primary-color)'
                    : 'linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.4))'),
                border: theme === "professional"
                  ? 'none'
                  : '2px solid rgba(0, 255, 255, 0.7)',
                borderRadius: theme === "professional" ? '8px' : '0',
                color: theme === "professional" ? 'white' : '#00ffff',
                fontWeight: 600,
                fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                fontSize: '1rem',
                letterSpacing: theme === "professional" ? 'normal' : '0.1em',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                textTransform: theme === "professional" ? 'none' : 'uppercase',
                opacity: isSubmitting ? 0.7 : 1
              }}
              className={theme === "matrix" ? "cyber-button" : ""}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: `2px solid ${theme === "professional" ? 'white' : '#00ffff'}`,
                      borderRadius: '50%'
                    }}
                  />
                  {theme === "professional" ? "Wird gesendet..." : "TRANSMITTING..."}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {theme === "professional" ? "Nachricht senden" : "TRANSMIT MESSAGE"}
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.section>
    </>
  );
} 