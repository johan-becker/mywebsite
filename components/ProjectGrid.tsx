"use client";

import { motion } from "framer-motion";
import { Rocket, Code2, Server, Database, Briefcase } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const projects = [
  {
    title: "Next.js Portfolio",
    description: "Modern portfolio with Matrix theme system",
    tech: ["Next.js", "TypeScript", "Framer Motion"],
    status: "ACTIVE",
    color: "#00ff00",
    icon: <Code2 size={24} />
  },
  {
    title: "AI Integration Platform", 
    description: "Scalable ML pipeline architecture",
    tech: ["Python", "TensorFlow", "Docker"],
    status: "DEVELOPMENT",
    color: "#00ffff",
    icon: <Server size={24} />
  },
  {
    title: "Blockchain Analytics",
    description: "Cryptocurrency data analysis suite",
    tech: ["Solidity", "React", "Web3"],
    status: "RESEARCH",
    color: "#ff00ff",
    icon: <Database size={24} />
  }
];

export default function ProjectGrid() {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
        color: theme === "professional" ? 'var(--primary-color)' : '#00ffff'
      }} className="neon-text">
        {theme === "professional" ? <Briefcase className="w-8 h-8" /> : <Rocket className="w-8 h-8" />}
        {theme === "professional" ? "Projekte" : "FEATURED PROJECTS"}
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: theme === "professional" ? 1.02 : 1.05,
              rotateY: theme === "professional" ? 0 : 5,
              rotateX: theme === "professional" ? 0 : -5
            }}
            style={{
              transformStyle: theme === "professional" ? 'flat' : 'preserve-3d',
              perspective: theme === "professional" ? 'none' : '1000px'
            }}
            className="glass-card"
          >
            <div style={{
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Animated gradient background - only in matrix theme */}
              {theme === "matrix" && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${project.color}20, transparent)`,
                    pointerEvents: 'none'
                  }}
                />
              )}
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    padding: '0.75rem',
                    background: theme === "professional" 
                      ? 'var(--primary-color)'
                      : `linear-gradient(135deg, ${project.color}, transparent)`,
                    borderRadius: '0.75rem',
                    color: 'white'
                  }}>
                    {project.icon}
                  </div>
                  
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    background: project.status === 'ACTIVE' 
                      ? (theme === "professional" ? 'var(--accent-color)' : 'rgba(0, 255, 0, 0.2)')
                      : (theme === "professional" ? 'var(--background-secondary)' : 'rgba(255, 255, 255, 0.1)'),
                    border: `1px solid ${project.status === 'ACTIVE' 
                      ? (theme === "professional" ? 'var(--accent-color)' : 'rgba(0, 255, 0, 0.5)')
                      : (theme === "professional" ? 'var(--border-color)' : 'rgba(255, 255, 255, 0.2)')}`,
                    borderRadius: '1rem',
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                    letterSpacing: '0.1em',
                    color: project.status === 'ACTIVE' 
                      ? 'white'
                      : (theme === "professional" ? 'var(--text-secondary)' : undefined)
                  }}>
                    {project.status}
                  </span>
                </div>
                
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                  fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                  letterSpacing: theme === "professional" ? 'normal' : '0.05em',
                  color: theme === "professional" ? 'var(--text-primary)' : undefined
                }}>
                  {project.title}
                </h3>
                
                <p style={{
                  fontSize: '0.875rem',
                  opacity: 0.8,
                  marginBottom: '1rem',
                  lineHeight: 1.6,
                  fontFamily: theme === "professional" ? 'var(--font-secondary)' : undefined,
                  color: theme === "professional" ? 'var(--text-secondary)' : undefined
                }}>
                  {project.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        background: theme === "professional" 
                          ? 'var(--background-secondary)'
                          : 'rgba(255, 255, 255, 0.1)',
                        border: theme === "professional" 
                          ? '1px solid var(--border-color)'
                          : '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.25rem',
                        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'monospace',
                        color: theme === "professional" ? 'var(--text-secondary)' : undefined
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
} 