"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code } from "lucide-react";

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '4rem'
    }}>
      <div className="max-width-container section-padding" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          {/* Large inflated headline */}
          <motion.h1
            style={{
              fontSize: 'clamp(3rem, 12vw, 8rem)',
              fontWeight: 900,
              color: 'inherit',
              marginBottom: '2rem',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            Johan Becker
          </motion.h1>

          {/* Intro text */}
          <motion.p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: 'rgba(107, 114, 128, 1)',
              maxWidth: '48rem',
              margin: '0 auto 2rem auto',
              lineHeight: 1.6
            }}
            className="dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Ich interessiere mich für Softwareentwicklung, digitale Systeme und technische Automatisierung.
          </motion.p>

          {/* Current project */}
          <motion.div
            style={{
              backgroundColor: 'rgba(13, 110, 253, 0.1)',
              borderRadius: '1rem',
              padding: '1.5rem',
              maxWidth: '32rem',
              margin: '0 auto 3rem auto'
            }}
            className="dark:bg-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem'
            }}>
              <Code style={{ width: '1.25rem', height: '1.25rem', color: '#0D6EFD' }} />
              <span style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#0D6EFD',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Aktuelles Projekt
              </span>
            </div>
            <p style={{
              color: 'rgba(55, 65, 81, 1)',
              margin: 0,
              lineHeight: 1.5
            }} className="dark:text-gray-200">
              Ein Tool, das trackt, wer wann mit welchem Gerät einen Link geöffnet hat.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center'
            }}
            className="sm:flex-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link
              href="/portfolio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: '#0D6EFD',
                color: 'white',
                borderRadius: '2rem',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'background-color 0.3s ease',
                border: 'none'
              }}
              className="hover:bg-primary-600 group"
            >
              Portfolio ansehen
              <ArrowRight style={{ width: '1rem', height: '1rem' }} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/kontakt"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: 'rgba(243, 244, 246, 1)',
                color: 'rgba(17, 24, 39, 1)',
                borderRadius: '2rem',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'background-color 0.3s ease',
                border: 'none'
              }}
              className="dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Kontakt aufnehmen
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: '1.5rem',
            height: '2.5rem',
            border: '2px solid rgba(156, 163, 175, 1)',
            borderRadius: '1rem',
            display: 'flex',
            justifyContent: 'center'
          }}
          className="dark:border-gray-600"
        >
          <motion.div
            style={{
              width: '0.25rem',
              height: '0.5rem',
              backgroundColor: 'rgba(156, 163, 175, 1)',
              borderRadius: '0.125rem',
              marginTop: '0.5rem'
            }}
            className="dark:bg-gray-600"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
} 