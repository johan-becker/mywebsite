"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProfessionalBackgroundProps {
  variant?: "subtle" | "minimal" | "geometric";
}

export default function ProfessionalBackground({ variant = "subtle" }: ProfessionalBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6
      }}
    >
      {variant === "subtle" && (
        <>
          {/* Subtle gradient orbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            style={{
              position: 'absolute',
              top: '10%',
              left: '15%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)'
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '20%',
              right: '15%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)'
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 1 }}
            style={{
              position: 'absolute',
              top: '60%',
              left: '60%',
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(5, 150, 105, 0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(50px)'
            }}
          />
        </>
      )}

      {variant === "geometric" && (
        <>
          {/* Geometric shapes */}
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              width: '200px',
              height: '200px',
              border: '1px solid rgba(37, 99, 235, 0.1)',
              borderRadius: '50%',
              transform: 'rotate(0deg)'
            }}
          />
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              bottom: '25%',
              right: '25%',
              width: '150px',
              height: '150px',
              border: '1px solid rgba(124, 58, 237, 0.08)',
              borderRadius: '20px',
              transform: 'rotate(45deg)'
            }}
          />
        </>
      )}

      {variant === "minimal" && (
        <>
          {/* Minimal dots pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              backgroundPosition: '0 0, 25px 25px'
            }}
          />
        </>
      )}
    </div>
  );
} 