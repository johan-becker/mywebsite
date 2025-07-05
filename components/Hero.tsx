"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, Zap, Cpu, Terminal, Database, Wifi, Briefcase, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [matrixRain, setMatrixRain] = useState<string[]>([]);
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Matrix Digital Rain Effect - only for matrix theme
  useEffect(() => {
    if (theme !== "matrix") return;
    
    const chars = "アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const columns = Math.floor(window.innerWidth / 20);
    const drops: number[] = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
    
    const generateRain = () => {
      const newRain: string[] = [];
      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        newRain.push(char);
        
        if (drops[i] * 20 > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      setMatrixRain(newRain);
    };

    const interval = setInterval(generateRain, 100);
    return () => clearInterval(interval);
  }, [theme]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      className={theme === "professional" ? "hero-section" : ""}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '4rem',
        overflow: 'hidden',
        background: theme === "professional" 
          ? 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
          : 'linear-gradient(180deg, var(--background-primary) 0%, var(--background-secondary) 50%, var(--background-primary) 100%)'
      }}
    >
      {/* Matrix Digital Rain - Only in Matrix theme */}
      {theme === "matrix" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="matrix-only"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {matrixRain.map((char, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${i * 20}px`,
                top: `${Math.random() * window.innerHeight}px`,
                color: 'var(--primary-color)',
                fontSize: '14px',
                fontFamily: 'monospace',
                animation: `matrix-fall ${Math.random() * 3 + 2}s linear infinite`,
                textShadow: '0 0 10px var(--primary-color)'
              }}
            >
              {char}
            </div>
          ))}
        </motion.div>
      )}

      {/* Enhanced Matrix Background Elements - Only in Matrix theme */}
      {theme === "matrix" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="matrix-only"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200%',
            height: '200%',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            pointerEvents: 'none'
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(0, 255, 0, 0.4) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              y
            }}
            transition={{
              scale: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              },
              opacity: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }
            }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            style={{
              position: 'absolute',
              bottom: '20%',
              right: '10%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              y: useTransform(scrollY, [0, 500], [0, -100])
            }}
            transition={{
              scale: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              },
              opacity: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }
            }}
          />
        </motion.div>
      )}

      <div className={`max-width-container section-padding ${theme === "professional" ? "hero-content" : ""}`} style={{ position: 'relative', zIndex: 10 }}>
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
          {/* Title */}
          <motion.div
            variants={textVariants}
            style={{ marginBottom: '2rem', position: 'relative' }}
          >
            <h1 className="glitch" data-text="JOHAN BECKER" style={{
              fontSize: theme === "professional" ? 'clamp(2.5rem, 8vw, 4rem)' : 'clamp(3rem, 12vw, 8rem)',
              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
              fontWeight: theme === "professional" ? 800 : 900,
              margin: 0,
              position: 'relative',
              color: theme === "professional" ? 'var(--text-primary)' : '#00ff00'
            }}>
              JOHAN BECKER
            </h1>
            
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className={theme === "professional" ? "hero-subtitle" : ""}
              style={{
                marginTop: '1rem',
                fontSize: theme === "professional" ? '1.25rem' : 'clamp(0.875rem, 2vw, 1.25rem)',
                fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                color: theme === "professional" ? 'var(--text-secondary)' : '#00ff00',
                textTransform: theme === "professional" ? 'none' : 'uppercase',
                letterSpacing: theme === "professional" ? 'normal' : '0.3em',
                textShadow: theme === "professional" ? 'none' : '0 0 10px #00ff00',
                fontWeight: theme === "professional" ? 400 : 'normal'
              }}
            >
              {theme === "professional" ? (
                "Full-Stack Developer & System Architect"
              ) : (
                <TypewriterText text="&gt;&gt;&gt; SYSTEM_ARCHITECT // MATRIX_DEVELOPER // CYBER_INNOVATOR" />
              )}
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={textVariants}
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

          {/* Mission/Status Display */}
          <motion.div
            variants={textVariants}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
            className={`glass-card ${theme === "professional" ? "mission-block" : ""}`}
            style={{
              maxWidth: theme === "professional" ? '600px' : '40rem',
              margin: '0 auto 3rem auto',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              border: theme === "professional" ? '1px solid var(--border-color)' : '2px solid #00ff00',
              background: theme === "professional" ? 'var(--background-card)' : 'rgba(0, 20, 0, 0.8)'
            }}
          >
            {/* Matrix gradient overlay - only in matrix theme */}
            {theme === "matrix" && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 0, 0.2) 50%, transparent 70%)',
                  transform: 'rotate(45deg)',
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1
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
                      fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace'
                    }}
                  >
                    <item.icon style={{ width: '1rem', height: '1rem' }} />
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

          {/* Action Buttons */}
          <motion.div
            variants={textVariants}
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Link href="/portfolio" style={{ textDecoration: 'none' }}>
              <motion.button
                className="cyber-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: theme === "professional" ? 'var(--primary-color)' : 'rgba(0, 255, 0, 0.1)',
                  border: theme === "professional" ? 'none' : '2px solid #00ff00',
                  color: theme === "professional" ? 'white' : '#00ff00'
                }}
              >
                {theme === "professional" ? <Briefcase style={{ width: '1.25rem', height: '1.25rem' }} /> : <Code style={{ width: '1.25rem', height: '1.25rem' }} />}
                {theme === "professional" ? "Portfolio ansehen" : "[ACCESS_PORTFOLIO]"}
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </motion.button>
            </Link>
            
            <Link href="/kontakt" style={{ textDecoration: 'none' }}>
              <motion.button
                className="cyber-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: theme === "professional" ? 'var(--secondary-color)' : 'rgba(0, 255, 255, 0.1)',
                  border: theme === "professional" ? 'none' : '2px solid #00ffff',
                  color: theme === "professional" ? 'white' : '#00ffff'
                }}
              >
                <Zap style={{ width: '1.25rem', height: '1.25rem' }} />
                {theme === "professional" ? "Kontakt aufnehmen" : "[ESTABLISH_CONTACT]"}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - only in matrix theme */}
      {theme === "matrix" && (
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
              border: '2px solid #00ff00',
              borderRadius: '25px',
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 20px #00ff00'
            }}
          >
            <motion.div
              style={{
                width: '4px',
                height: '10px',
                backgroundColor: '#00ff00',
                borderRadius: '2px',
                marginTop: '8px',
                boxShadow: '0 0 10px #00ff00'
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
      )}
    </section>
  );
}

// Enhanced Matrix Typewriter
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
        style={{ color: '#00ff00', textShadow: '0 0 10px #00ff00' }}
      >
        █
      </motion.span>
    </span>
  );
} 