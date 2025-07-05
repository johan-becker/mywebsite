"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, Zap, Cpu, Terminal, Database, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [matrixRain, setMatrixRain] = useState<string[]>([]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Matrix Digital Rain Effect
  useEffect(() => {
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
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #000000 0%, #001100 50%, #000000 100%)'
    }}>
      {/* Matrix Digital Rain */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.3
      }}>
        {matrixRain.map((char, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${i * 20}px`,
              top: `${Math.random() * window.innerHeight}px`,
              color: '#00ff00',
              fontSize: '14px',
              fontFamily: 'monospace',
              animation: `matrix-fall ${Math.random() * 3 + 2}s linear infinite`,
              textShadow: '0 0 10px #00ff00'
            }}
          >
            {char}
          </div>
        ))}
      </div>

      {/* Enhanced Matrix Background Elements */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '200%',
        height: '200%',
        transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        pointerEvents: 'none',
        opacity: 0.6
      }}>
        <motion.div
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
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
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
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
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
          {/* Matrix-Style Title */}
          <motion.div
            variants={textVariants}
            style={{ marginBottom: '2rem', position: 'relative' }}
          >
            <h1 className="glitch" data-text="JOHAN BECKER" style={{
              fontSize: 'clamp(3rem, 12vw, 8rem)',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 900,
              margin: 0,
              position: 'relative',
              color: '#00ff00'
            }}>
              JOHAN BECKER
            </h1>
            
            {/* Matrix Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{
                marginTop: '1rem',
                fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                fontFamily: 'Orbitron, monospace',
                color: '#00ff00',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                textShadow: '0 0 10px #00ff00'
              }}
            >
              <TypewriterText text="&gt;&gt;&gt; SYSTEM_ARCHITECT // MATRIX_DEVELOPER // CYBER_INNOVATOR" />
            </motion.div>
          </motion.div>

          {/* Matrix Bio */}
          <motion.p
            variants={textVariants}
            className="neon-text"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              maxWidth: '48rem',
              margin: '0 auto 3rem auto',
              lineHeight: 1.8,
              opacity: 0.9,
              fontFamily: 'Orbitron, monospace',
              color: '#00ff00'
            }}
          >
            [INITIATING_PROTOCOL] Entwicklung futuristischer digitaler Systeme mit Matrix-Technologien.
            Spezialisiert auf Cyber-Architekturen und digitale Realitäten.
          </motion.p>

          {/* Matrix Status Display */}
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
            className="glass-card"
            style={{
              maxWidth: '40rem',
              margin: '0 auto 3rem auto',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              border: '2px solid #00ff00',
              background: 'rgba(0, 20, 0, 0.8)'
            }}
          >
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
                delay: 1 // Start after entrance animation
              }}
            />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 
                className="mission-glitch"
                data-text="[CURRENT_MISSION]"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#00ff00',
                  fontFamily: 'Orbitron, monospace',
                  textShadow: '0 0 10px #00ff00',
                  display: 'inline-block'
                }}
              >
                [CURRENT_MISSION]
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
                color: '#00ff00',
                fontFamily: 'Orbitron, monospace'
              }}>
                {'>'}{'>'}{'>'} Konstruktion einer neuen digitalen Matrix-Infrastruktur
              </p>
              
              {/* Matrix System Status */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  { icon: Terminal, label: 'TERMINAL', status: 'ONLINE' },
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
                      delay: 0.5 + i * 0.2, // Delay after parent entrance
                      ease: "easeOut"
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      border: '1px solid #00ff00',
                      borderRadius: '20px',
                      background: 'rgba(0, 255, 0, 0.1)',
                      color: '#00ff00',
                      fontSize: '0.75rem',
                      fontFamily: 'Orbitron, monospace'
                    }}
                  >
                    <item.icon style={{ width: '1rem', height: '1rem' }} />
                    <span>{item.label}: {item.status}</span>
                    
                    {/* Separate loop animation for box-shadow */}
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
                        delay: 1.5 + i * 0.3 // Start after entrance animations complete
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Matrix Action Buttons */}
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
                  background: 'rgba(0, 255, 0, 0.1)',
                  border: '2px solid #00ff00',
                  color: '#00ff00'
                }}
              >
                <Code style={{ width: '1.25rem', height: '1.25rem' }} />
                [ACCESS_PORTFOLIO]
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </motion.button>
            </Link>
            
            <Link href="/kontakt" style={{ textDecoration: 'none' }}>
              <motion.button
                className="cyber-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'rgba(0, 255, 255, 0.1)',
                  border: '2px solid #00ffff',
                  color: '#00ffff'
                }}
              >
                <Zap style={{ width: '1.25rem', height: '1.25rem' }} />
                [ESTABLISH_CONTACT]
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Matrix Scroll Indicator */}
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