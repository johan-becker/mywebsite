"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import BubbleLayer from "@/components/BubbleLayer";
import { useTheme } from "@/components/ThemeProvider";

// Dynamic imports with SSR disabled
const ProjectGrid = dynamic(() => import("@/components/ProjectGrid"), { ssr: false });
const SkillsGrid = dynamic(() => import("@/components/SkillsGrid"), { ssr: false });

export default function Portfolio() {
  const { theme } = useTheme();

  return (
    <>
      {theme === "matrix" && <BubbleLayer count={10} />}
      <div className="min-h-screen" style={{ marginTop: "5rem" }}>
        <div className="max-width-container section-padding py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="glitch" style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
              marginBottom: '1rem',
              color: theme === "professional" ? 'var(--text-primary)' : undefined,
              fontWeight: theme === "professional" ? 700 : undefined
            }}>
              {theme === "professional" ? "Portfolio" : "PORTFOLIO"}
            </h1>
            <p className="neon-text" style={{
              fontSize: '1.25rem',
              opacity: 0.8,
              color: theme === "professional" ? 'var(--text-secondary)' : undefined,
              fontFamily: theme === "professional" ? 'var(--font-secondary)' : undefined
            }}>
              {theme === "professional" 
                ? "Ausgewählte Projekte und technische Expertise"
                : "Cutting-edge projects & technical expertise"
              }
            </p>
          </motion.div>

          {/* Projects Section */}
          <ProjectGrid />

          {/* Skills Section */}
          <SkillsGrid />

          {/* Experience Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
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
              color: theme === "professional" ? 'var(--primary-color)' : '#ff00ff'
            }} className="neon-text">
              <Calendar className="w-8 h-8" />
              {theme === "professional" ? "Werdegang" : "TIMELINE"}
            </h2>
            
            <div className="space-y-8">
              {[
                {
                  year: "2024",
                  title: theme === "professional" ? "Freelance Entwickler" : "FREELANCE DEVELOPER",
                  description: theme === "professional" 
                    ? "Spezialisierung auf Full-Stack Entwicklung und System-Integration"
                    : "Specializing in full-stack development & system integration"
                },
                {
                  year: "2023",
                  title: theme === "professional" ? "Senior Web Developer" : "SENIOR WEB DEVELOPER",
                  description: theme === "professional" 
                    ? "Leitung von Entwicklungsteams und Architektur-Design"
                    : "Leading development teams & architectural design"
                },
                {
                  year: "2022",
                  title: theme === "professional" ? "Full-Stack Developer" : "FULL-STACK DEVELOPER",
                  description: theme === "professional" 
                    ? "Entwicklung komplexer Web-Anwendungen mit modernen Technologien"
                    : "Building complex web applications with modern technologies"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="glass-card"
                  style={{
                    padding: '2rem',
                    background: theme === "professional" 
                      ? 'var(--background-card)'
                      : 'rgba(255, 0, 255, 0.1)',
                    border: theme === "professional" 
                      ? '1px solid var(--border-color)'
                      : '1px solid rgba(255, 0, 255, 0.3)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: theme === "professional" ? 'var(--primary-color)' : '#ff00ff',
                      fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace'
                    }}>
                      {item.year}
                      </span>
                    <div style={{
                      flex: 1,
                      height: '2px',
                      background: theme === "professional" 
                        ? 'var(--border-color)'
                        : 'linear-gradient(90deg, #ff00ff, transparent)'
                    }} />
                  </div>
                      <h3 style={{
                        fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                    color: theme === "professional" ? 'var(--text-primary)' : undefined
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        opacity: 0.8,
                    lineHeight: 1.6,
                    fontFamily: theme === "professional" ? 'var(--font-secondary)' : undefined,
                    color: theme === "professional" ? 'var(--text-secondary)' : undefined
                      }}>
                        {item.description}
                      </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
} 