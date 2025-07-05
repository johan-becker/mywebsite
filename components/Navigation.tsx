"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code, Briefcase, Terminal } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "HOME", professionalLabel: "Home", icon: "01" },
  { href: "/portfolio", label: "PORTFOLIO", professionalLabel: "Portfolio", icon: "02" },
  { href: "/kontakt", label: "CONTACT", professionalLabel: "Kontakt", icon: "03" },
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
        background: theme === "professional" 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'rgba(10, 10, 20, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: theme === "professional" 
          ? '1px solid rgba(0, 0, 0, 0.1)' 
          : '1px solid rgba(0, 255, 255, 0.2)',
        boxShadow: theme === "professional" 
          ? '0 1px 3px rgba(0, 0, 0, 0.1)' 
          : 'none',
      }}
    >
      <div className="max-width-container section-padding">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '5rem'
        }}>
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
              color: theme === "professional" ? 'var(--primary-color)' : '#00ffff',
              textDecoration: 'none',
              letterSpacing: theme === "professional" ? 'normal' : '0.1em',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            className={theme === "matrix" ? "neon-text" : ""}
          >
            {theme === "professional" ? (
              <Briefcase style={{ width: '1.5rem', height: '1.5rem' }} />
            ) : (
              <Terminal style={{ width: '1.5rem', height: '1.5rem' }} />
            )}
            {theme === "professional" ? "Johan Becker" : "JB"}
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
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Space Grotesk, sans-serif',
                  fontWeight: theme === "professional" ? 500 : 600,
                  fontSize: theme === "professional" ? '0.95rem' : '0.875rem',
                  letterSpacing: theme === "professional" ? 'normal' : '0.1em',
                  color: pathname === item.href 
                    ? (theme === "professional" ? 'var(--primary-color)' : '#00ffff')
                    : (theme === "professional" ? 'var(--text-secondary)' : 'rgba(255, 255, 255, 0.7)'),
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme === "professional" ? '0.25rem' : '0.5rem',
                  padding: theme === "professional" ? '0.5rem 1rem' : '0',
                  borderRadius: theme === "professional" ? '8px' : '0',
                  background: pathname === item.href && theme === "professional" 
                    ? 'var(--background-secondary)' 
                    : 'transparent'
                }}
                className={pathname === item.href && theme === "matrix" ? "neon-text" : ""}
              >
                {theme === "matrix" && (
                  <span style={{
                    fontSize: '0.75rem',
                    opacity: 0.5,
                    fontFamily: 'Orbitron, monospace'
                  }}>
                    {item.icon}
                  </span>
                )}
                {theme === "professional" ? item.professionalLabel : item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    style={{
                      position: 'absolute',
                      bottom: theme === "professional" ? '-2px' : '-26px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: theme === "professional" 
                        ? 'var(--primary-color)' 
                        : 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                      boxShadow: theme === "professional" 
                        ? 'none' 
                        : '0 0 10px #00ffff',
                      borderRadius: theme === "professional" ? '1px' : '0'
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
                background: theme === "professional" 
                  ? 'rgba(37, 99, 235, 0.1)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: theme === "professional" 
                  ? '1px solid rgba(37, 99, 235, 0.2)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className="md:hidden glass-card"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X style={{ 
                  width: '1.25rem', 
                  height: '1.25rem', 
                  color: theme === "professional" ? '#2563eb' : '#00ffff' 
                }} />
              ) : (
                <Menu style={{ 
                  width: '1.25rem', 
                  height: '1.25rem', 
                  color: theme === "professional" ? '#2563eb' : '#00ffff' 
                }} />
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
              background: theme === "professional" 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(10, 10, 20, 0.95)',
              borderBottom: theme === "professional" 
                ? '1px solid rgba(0, 0, 0, 0.1)' 
                : '1px solid rgba(0, 255, 255, 0.2)',
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
                        ? (theme === "professional" ? 'var(--background-secondary)' : 'rgba(0, 255, 255, 0.1)')
                        : 'transparent',
                      border: '1px solid',
                      borderColor: pathname === item.href 
                        ? (theme === "professional" ? 'var(--primary-color)' : 'rgba(0, 255, 255, 0.3)')
                        : 'transparent',
                      color: pathname === item.href 
                        ? (theme === "professional" ? 'var(--primary-color)' : '#00ffff')
                        : (theme === "professional" ? 'var(--text-secondary)' : 'rgba(255, 255, 255, 0.7)'),
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Space Grotesk, sans-serif',
                      fontWeight: theme === "professional" ? 500 : 600,
                      fontSize: '0.875rem',
                      letterSpacing: theme === "professional" ? 'normal' : '0.1em'
                    }}
                  >
                    {theme === "matrix" && (
                      <span style={{
                        fontSize: '0.75rem',
                        opacity: 0.5,
                        fontFamily: 'Orbitron, monospace'
                      }}>
                        {item.icon}
                      </span>
                    )}
                    {theme === "professional" ? item.professionalLabel : item.label}
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