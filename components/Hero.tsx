"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, Zap, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '4rem',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '200%',
        height: '200%',
        transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        pointerEvents: 'none',
        opacity: 0.5
      }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            y
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(150, 0, 255, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            y: useTransform(scrollY, [0, 500], [0, -100])
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-width-container section-padding" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center' }}
          transition={{
            staggerChildren: 0.2,
            duration: 1.2,
            ease: "easeInOut"
          }}
        >
          {/* Glitch effect title */}
          <motion.div
            variants={textVariants}
            style={{ marginBottom: '2rem', position: 'relative' }}
          >
            <h1 className="glitch" style={{
              fontSize: 'clamp(3rem, 12vw, 8rem)',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 900,
              margin: 0,
              position: 'relative'
            }}>
              JOHAN BECKER
            </h1>
            
            {/* Subtitle with typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{
                marginTop: '1rem',
                fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                fontFamily: 'Space Grotesk, sans-serif',
                color: 'rgba(0, 255, 255, 0.8)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em'
              }}
            >
              <TypewriterText text="FULL-STACK DEVELOPER // TECH ENTHUSIAST // INNOVATOR" />
            </motion.div>
          </motion.div>

          {/* Bio text with neon effect */}
          <motion.p
            variants={textVariants}
            className="neon-text"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              maxWidth: '48rem',
              margin: '0 auto 3rem auto',
              lineHeight: 1.8,
              opacity: 0.9
            }}
          >
            Ich entwickle futuristische digitale Lösungen mit modernsten Technologien.
            Spezialisiert auf innovative Web-Anwendungen und technische Automatisierung.
          </motion.p>

          {/* Current project - Holographic card */}
          <motion.div
            variants={textVariants}
            className="glass-card"
            style={{
              maxWidth: '40rem',
              margin: '0 auto 3rem auto',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)',
                transform: 'rotate(45deg)',
              }}
              animate={{
                x: ['0%', '200%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
              position: 'relative'
            }}>
              <Cpu style={{ width: '1.5rem', height: '1.5rem', color: '#00ffff' }} />
              <span className="holographic" style={{
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                CURRENT PROJECT
              </span>
            </div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
              lineHeight: 1.6,
              fontSize: '1.125rem',
              position: 'relative'
            }}>
              Advanced Link Tracking System - Real-time Analytics & Device Fingerprinting
            </p>
          </motion.div>

          {/* CTA Buttons - Cyberpunk style */}
          <motion.div
            variants={textVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            className="sm:flex-row"
          >
            <Link
              href="/portfolio"
              className="cyber-button group"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                position: 'relative'
              }}
            >
              <Zap style={{ width: '1.25rem', height: '1.25rem' }} />
              EXPLORE PORTFOLIO
              <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/kontakt"
              className="cyber-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                background: 'linear-gradient(45deg, rgba(255, 0, 255, 0.1), rgba(0, 255, 255, 0.1))',
                borderColor: 'rgba(255, 0, 255, 0.5)'
              }}
            >
              <Code style={{ width: '1.25rem', height: '1.25rem' }} />
              INITIALIZE CONTACT
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Futuristic scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: '30px',
            height: '50px',
            border: '2px solid rgba(0, 255, 255, 0.5)',
            borderRadius: '25px',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <motion.div
            style={{
              width: '4px',
              height: '10px',
              backgroundColor: 'rgba(0, 255, 255, 0.8)',
              borderRadius: '2px',
              marginTop: '8px'
            }}
            animate={{ 
              y: [0, 20, 0],
              opacity: [1, 0, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Typewriter component
function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ color: 'rgba(0, 255, 255, 1)' }}
      >
        |
      </motion.span>
    </span>
  );
} 