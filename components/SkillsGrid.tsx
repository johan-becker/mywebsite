"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const skills = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    color: "#ff0040"  // Rot-Pink (oben)
  },
  {
    name: "Backend", 
    items: ["Node.js", "Python", "PostgreSQL", "Redis"],
    color: "#ff8000"  // Orange
  },
  {
    name: "DevOps",
    items: ["Docker", "AWS", "CI/CD", "Kubernetes"],
    color: "#00ff80"  // Grün
  },
  {
    name: "Tools",
    items: ["Git", "VS Code", "Figma", "Linux"],
    color: "#0080ff"  // Blau (unten)
  }
];

export default function SkillsGrid() {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-20"
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated color flow background - only in matrix theme */}
      {theme === "matrix" && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: '-50%',
            left: 0,
            right: 0,
            height: '200%',
            background: 'linear-gradient(180deg, #ff004020, #ff800020, #00ff8020, #0080ff20, transparent)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      )}
      <h2 style={{
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: '2rem',
        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
        color: theme === "professional" ? 'var(--primary-color)' : '#ffffff',
        textShadow: theme === "professional" ? 'none' : '0 0 20px #ffffff, 0 0 40px #ffffff80',
        position: 'relative',
        zIndex: 1
      }} className="neon-text">
        {theme === "professional" ? "Technologien" : "SKILL MATRIX"}
      </h2>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ position: 'relative', zIndex: 1 }}>
        {skills.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: theme === "professional" ? 1.02 : 1.05 }}
            className="glass-card"
            style={{
              background: theme === "professional" 
                ? 'var(--background-card)'
                : `linear-gradient(135deg, ${category.color}15, rgba(0, 20, 0, 0.9), ${category.color}05)`,
              backdropFilter: 'blur(10px)',
              padding: '1.5rem',
              border: theme === "professional" 
                ? '1px solid var(--border-color)'
                : `2px solid ${category.color}60`,
              boxShadow: theme === "professional" 
                ? '0 4px 24px var(--shadow-color)'
                : `0 0 30px ${category.color}40, inset 0 0 20px ${category.color}10`
            }}
          >
            <h3 style={{
              fontWeight: 700,
              marginBottom: '1rem',
              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
              fontSize: '1.125rem',
              letterSpacing: theme === "professional" ? 'normal' : '0.1em',
              color: theme === "professional" ? 'var(--text-primary)' : category.color,
              textShadow: theme === "professional" ? 'none' : `0 0 15px ${category.color}, 0 0 30px ${category.color}80`
            }}>
              {category.name}
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {category.items.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={theme === "matrix" ? {
                    scale: 1.02,
                    boxShadow: `0 0 20px ${category.color}60`,
                    borderColor: category.color
                  } : {}}
                  style={{
                    fontSize: '0.875rem',
                    padding: '0.5rem',
                    background: theme === "professional" 
                      ? 'var(--background-secondary)'
                      : `rgba(0, 0, 0, 0.6)`,
                    border: theme === "professional" 
                      ? '1px solid var(--border-color)'
                      : `1px solid ${category.color}50`,
                    borderRadius: theme === "professional" ? '6px' : '4px',
                    fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                    color: theme === "professional" ? 'var(--text-secondary)' : category.color,
                    textShadow: theme === "professional" 
                      ? 'none' 
                      : `0 0 8px ${category.color}80`,
                    boxShadow: theme === "professional" 
                      ? 'none' 
                      : `0 0 10px ${category.color}30`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
} 