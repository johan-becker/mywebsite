"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const skills = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    color: "#00ff00"
  },
  {
    name: "Backend", 
    items: ["Node.js", "Python", "PostgreSQL", "Redis"],
    color: "#00ffff"
  },
  {
    name: "DevOps",
    items: ["Docker", "AWS", "CI/CD", "Kubernetes"],
    color: "#ff00ff"
  },
  {
    name: "Tools",
    items: ["Git", "VS Code", "Figma", "Linux"],
    color: "#ffff00"
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
    >
      <h2 style={{
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: '2rem',
        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
        color: theme === "professional" ? 'var(--primary-color)' : '#ffff00'
      }} className="neon-text">
        {theme === "professional" ? "Technologien" : "SKILL MATRIX"}
      </h2>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: theme === "professional" ? 1.02 : 1.05 }}
            className="glass-card"
            style={{
              background: theme === "professional" 
                ? 'var(--background-card)'
                : `linear-gradient(135deg, ${category.color}, transparent)`,
              backdropFilter: 'blur(10px)',
              padding: '1.5rem'
            }}
          >
            <h3 style={{
              fontWeight: 700,
              marginBottom: '1rem',
              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
              fontSize: '1.125rem',
              letterSpacing: theme === "professional" ? 'normal' : '0.1em',
              color: theme === "professional" ? 'var(--text-primary)' : undefined
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
                  style={{
                    fontSize: '0.875rem',
                    padding: '0.5rem',
                    background: theme === "professional" 
                      ? 'var(--background-secondary)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: theme === "professional" 
                      ? '1px solid var(--border-color)'
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: theme === "professional" ? '6px' : '4px',
                    fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'monospace',
                    color: theme === "professional" ? 'var(--text-secondary)' : undefined
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