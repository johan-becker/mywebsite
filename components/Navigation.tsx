"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code, Briefcase, Terminal } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "HOME", icon: "01" },
  { href: "/portfolio", label: "PORTFOLIO", icon: "02" },
  { href: "/kontakt", label: "CONTACT", icon: "03" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <nav 
      className="nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 20, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
      }}
    >
      <div className="max-width-container section-padding">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '5rem'
        }}>
          {/* Logo with glitch effect */}
          <Link
            href="/"
            style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              fontFamily: 'Orbitron, monospace',
              color: '#00ffff',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            className="neon-text"
          >
            <Terminal style={{ width: '1.5rem', height: '1.5rem' }} />
            JB
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '2.5rem'
          }} className="md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  position: 'relative',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                  color: pathname === item.href 
                    ? '#00ffff' 
                    : 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                className={pathname === item.href ? "neon-text" : ""}
              >
                <span style={{
                  fontSize: '0.75rem',
                  opacity: 0.5,
                  fontFamily: 'Orbitron, monospace'
                }}>
                  {item.icon}
                </span>
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    style={{
                      position: 'absolute',
                      bottom: '-26px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                      boxShadow: '0 0 10px #00ffff'
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  background: theme === "matrix" 
                    ? 'rgba(0, 255, 0, 0.1)' 
                    : 'rgba(37, 99, 235, 0.1)',
                  border: `1px solid ${theme === "matrix" ? '#00ff00' : '#2563eb'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme === "matrix" ? '#00ff00' : '#2563eb'
                }}
                className="glass-card"
                aria-label={`Switch to ${theme === "matrix" ? "Professional" : "Matrix"} theme`}
                title={`Switch to ${theme === "matrix" ? "Professional" : "Matrix"} theme`}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "matrix" ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "matrix" ? (
                    <Briefcase style={{ width: '1.25rem', height: '1.25rem' }} />
                  ) : (
                    <Code style={{ width: '1.25rem', height: '1.25rem' }} />
                  )}
                </motion.div>
              </motion.button>
            )}

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                display: 'block',
                padding: '0.75rem',
                borderRadius: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className="md:hidden glass-card"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X style={{ width: '1.25rem', height: '1.25rem', color: '#00ffff' }} />
              ) : (
                <Menu style={{ width: '1.25rem', height: '1.25rem', color: '#00ffff' }} />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              background: 'rgba(10, 10, 20, 0.95)',
              borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)'
            }}
            className="md:hidden"
          >
            <div className="section-padding" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      marginBottom: '0.5rem',
                      borderRadius: '0.75rem',
                      background: pathname === item.href 
                        ? 'rgba(0, 255, 255, 0.1)' 
                        : 'transparent',
                      border: '1px solid',
                      borderColor: pathname === item.href 
                        ? 'rgba(0, 255, 255, 0.3)' 
                        : 'transparent',
                      color: pathname === item.href 
                        ? '#00ffff' 
                        : 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      letterSpacing: '0.1em'
                    }}
                  >
                    <span style={{
                      fontSize: '0.75rem',
                      opacity: 0.5,
                      fontFamily: 'Orbitron, monospace'
                    }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 