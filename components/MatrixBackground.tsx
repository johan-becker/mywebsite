"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function MatrixBackground() {
  const [matrixRain, setMatrixRain] = useState<string[]>([]);
  const { theme } = useTheme();

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

  if (theme !== "matrix") return null;

  return (
    <>
      {/* Matrix Digital Rain */}
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

      {/* Enhanced Matrix Background Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0, 255, 0, 0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1.2, 1, 1.2],
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
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
    </>
  );
} 