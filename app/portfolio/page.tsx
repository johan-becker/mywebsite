"use client";

import { motion } from "framer-motion";
import { Calendar, Code2, Zap, Globe, Database, Smartphone, Cpu, Shield, Rocket, Briefcase } from "lucide-react";
import BubbleLayer from "@/components/BubbleLayer";
import { useTheme } from "@/components/ThemeProvider";

const projects = [
  {
    title: "LINK TRACKING SYSTEM",
    description: "Advanced analytics platform with real-time device fingerprinting and user behavior tracking",
    tech: ["Next.js 14", "TypeScript", "PostgreSQL", "WebSocket", "Analytics API"],
    icon: <Globe className="w-6 h-6" />,
    status: "ACTIVE",
    color: "rgba(0, 255, 255, 0.6)",
  },
  {
    title: "AI AUTOMATION SUITE",
    description: "Intelligent workflow automation using machine learning and natural language processing",
    tech: ["Python", "TensorFlow", "FastAPI", "Redis", "Docker"],
    icon: <Cpu className="w-6 h-6" />,
    status: "COMPLETED",
    color: "rgba(150, 0, 255, 0.6)",
  },
  {
    title: "SECURE CLOUD PLATFORM",
    description: "End-to-end encrypted cloud storage with blockchain-based access control",
    tech: ["React", "Node.js", "Ethereum", "IPFS", "AWS"],
    icon: <Shield className="w-6 h-6" />,
    status: "COMPLETED",
    color: "rgba(255, 0, 255, 0.6)",
  },
];

const skills = [
  { 
    name: "FRONTEND", 
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    color: "rgba(0, 255, 255, 0.3)"
  },
  { 
    name: "BACKEND", 
    items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL", "WebSocket"],
    color: "rgba(150, 0, 255, 0.3)"
  },
  { 
    name: "DEVOPS", 
    items: ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Monitoring"],
    color: "rgba(255, 0, 255, 0.3)"
  },
  { 
    name: "EMERGING", 
    items: ["AI/ML", "Blockchain", "IoT", "AR/VR", "Quantum", "Edge Computing"],
    color: "rgba(255, 255, 0, 0.3)"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

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
                        initial={{ rotate: 0, opacity: 0 }}
                        animate={{ 
                          rotate: 360,
                          opacity: 0.3
                        }}
                        style={{
                          position: 'absolute',
                          top: '-50%',
                          left: '-50%',
                          width: '200%',
                          height: '200%',
                          background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)`
                        }}
                        transition={{
                          rotate: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          },
                          opacity: {
                            duration: 0.5
                          }
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
                        marginBottom: '1.5rem',
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
                              padding: '0.25rem 0.75rem',
                              background: theme === "professional" 
                                ? 'var(--background-secondary)' 
                                : 'rgba(0, 255, 255, 0.1)',
                              border: `1px solid ${theme === "professional" 
                                ? 'var(--border-color)' 
                                : 'rgba(0, 255, 255, 0.3)'}`,
                              borderRadius: '1rem',
                              fontFamily: theme === "professional" ? 'var(--font-secondary)' : 'Space Grotesk, sans-serif',
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

          {/* Skills Matrix */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
              color: theme === "professional" ? 'var(--secondary-color)' : '#ff00ff'
            }} className="neon-text-purple">
              <Zap className="w-8 h-8" />
              {theme === "professional" ? "Technologien" : "TECH MATRIX"}
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {category.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                          fontSize: '0.875rem',
                          marginBottom: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontFamily: theme === "professional" ? 'var(--font-secondary)' : undefined,
                          color: theme === "professional" ? 'var(--text-secondary)' : undefined
                        }}
                      >
                        <span style={{
                          width: '4px',
                          height: '4px',
                          background: theme === "professional" ? 'var(--primary-color)' : '#00ffff',
                          borderRadius: '50%',
                          boxShadow: theme === "professional" ? 'none' : '0 0 8px #00ffff'
                        }} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20"
          >
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
              color: theme === "professional" ? 'var(--warning-color)' : '#ffff00'
            }}>
              <Calendar className="w-8 h-8" />
              {theme === "professional" ? "Werdegang" : "TIMELINE"}
            </h2>
            
            <div style={{ position: 'relative' }}>
              {/* Timeline line */}
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  height: '100%',
                  width: '2px',
                  background: theme === "professional" 
                    ? 'linear-gradient(to bottom, var(--primary-color), var(--secondary-color), var(--warning-color))'
                    : 'linear-gradient(to bottom, #00ffff, #ff00ff, #ffff00)',
                  boxShadow: theme === "professional" 
                    ? '0 0 10px rgba(37, 99, 235, 0.3)'
                    : '0 0 20px rgba(0, 255, 255, 0.5)',
                  transformOrigin: 'top'
                }} 
              />
              
              {/* Timeline items */}
              {[
                {
                  date: "2024",
                  title: theme === "professional" ? "Aktuelle Projekte" : "CURRENT MISSION",
                  description: theme === "professional" 
                    ? "Entwicklung moderner Web-Anwendungen mit Next.js und TypeScript"
                    : "Building next-generation web applications with cutting-edge technologies",
                  color: theme === "professional" ? "var(--primary-color)" : "#00ffff"
                },
                {
                  date: "2023",
                  title: theme === "professional" ? "Technologie-Fokus" : "TECH EVOLUTION",
                  description: theme === "professional"
                    ? "Spezialisierung auf AI/ML Integration und Blockchain-Entwicklung"
                    : "Mastered AI/ML integration and blockchain development",
                  color: theme === "professional" ? "var(--secondary-color)" : "#ff00ff"
                },
                {
                  date: "2022",
                  title: theme === "professional" ? "System-Architektur" : "SYSTEM ARCHITECT",
                  description: theme === "professional"
                    ? "Design und Deployment skalierbarer Cloud-Infrastrukturen"
                    : "Designed and deployed scalable cloud infrastructures",
                  color: theme === "professional" ? "var(--warning-color)" : "#ffff00"
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                    marginBottom: '3rem'
                  }}
                >
                  <div style={{
                    width: '45%',
                    padding: index % 2 === 0 ? '0 2rem 0 0' : '0 0 0 2rem'
                  }}>
                    <div className="glass-card" style={{
                      padding: '1.5rem',
                      borderColor: item.color,
                      boxShadow: theme === "professional" 
                        ? `0 4px 24px ${item.color}20`
                        : `0 0 30px ${item.color}40`
                    }}>
                      <span style={{
                        color: item.color,
                        fontWeight: 700,
                        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                        fontSize: '0.875rem'
                      }}>
                        {item.date}
                      </span>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        margin: '0.5rem 0',
                        fontFamily: theme === "professional" ? 'var(--font-primary)' : 'Orbitron, monospace',
                        color: theme === "professional" ? 'var(--text-primary)' : undefined
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontSize: '0.875rem',
                        opacity: 0.8,
                        margin: 0,
                        fontFamily: theme === "professional" ? 'var(--font-secondary)' : undefined,
                        color: theme === "professional" ? 'var(--text-secondary)' : undefined
                      }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '20px',
                    background: item.color,
                    borderRadius: '50%',
                    border: `4px solid ${theme === "professional" ? 'var(--background-primary)' : 'rgb(10, 10, 20)'}`,
                    boxShadow: theme === "professional" 
                      ? `0 0 10px ${item.color}50`
                      : `0 0 20px ${item.color}`
                  }} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
} 