"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(229, 231, 235, 1)',
    }} className="dark:bg-[#1E1E1E]/80 dark:border-gray-800">
      <div className="max-width-container section-padding">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem'
        }}>
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: theme === 'dark' ? '#ffffff' : '#111827',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
          >
            JB
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem'
          }} className="md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  position: 'relative',
                  fontWeight: '500',
                  color: pathname === item.href 
                    ? '#0D6EFD' 
                    : theme === 'dark' ? '#d1d5db' : '#6b7280',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    style={{
                      position: 'absolute',
                      bottom: '-21px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#0D6EFD'
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {mounted && (
              <button
                onClick={toggleTheme}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon style={{ width: '1.25rem', height: '1.25rem' }} />
                ) : (
                  <Sun style={{ width: '1.25rem', height: '1.25rem' }} />
                )}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: 'block',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              ) : (
                <Menu style={{ width: '1.25rem', height: '1.25rem' }} />
              )}
            </button>
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
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: theme === 'dark' ? '#1E1E1E' : '#ffffff',
              borderBottom: '1px solid',
              borderBottomColor: theme === 'dark' ? '#374151' : '#e5e7eb'
            }}
            className="md:hidden"
          >
            <div className="section-padding" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    marginBottom: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: pathname === item.href 
                      ? 'rgba(13, 110, 253, 0.1)' 
                      : 'transparent',
                    color: pathname === item.href 
                      ? '#0D6EFD' 
                      : theme === 'dark' ? '#d1d5db' : '#6b7280',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 