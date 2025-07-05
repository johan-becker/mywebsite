"use client";

import { motion } from "framer-motion";
import { Mail, Github, Terminal, Database, Wifi, Shield, Zap } from "lucide-react";
import BubbleLayer from "@/components/BubbleLayer";

export default function Kontakt() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <>
      <BubbleLayer count={12} />
      <div className="min-h-screen relative overflow-hidden" style={{ 
        marginTop: "5rem",
        background: 'linear-gradient(180deg, #000000 0%, #001100 50%, #000000 100%)'
      }}>
        {/* Matrix Background Effects */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2 }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(0, 255, 0, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)'
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '20%',
              right: '10%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(80px)'
            }}
          />
        </div>

        <div className="max-width-container section-padding relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Matrix Header */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h1 className="glitch" data-text="[CONTACT_PROTOCOL]" style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontFamily: 'Orbitron, monospace',
                fontWeight: 900,
                marginBottom: '2rem',
                color: '#00ff00',
                textShadow: '0 0 20px #00ff00'
              }}>
                [CONTACT_PROTOCOL]
              </h1>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #00ff00, transparent)',
                  margin: '0 auto',
                  maxWidth: '400px',
                  boxShadow: '0 0 10px #00ff00'
                }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="neon-text"
                style={{
                  fontSize: '1.2rem',
                  marginTop: '1rem',
                  fontFamily: 'Orbitron, monospace',
                  color: '#00ff00'
                }}
              >
                {'>'} INITIATING_SECURE_CONNECTION...
              </motion.p>
            </motion.div>

            {/* Contact Cards Grid */}
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Email Contact - Matrix Style with Glitch */}
              <motion.div
                variants={itemVariants}
                className="relative group"
              >
                <div className="glass-card" style={{
                  padding: '2rem',
                  border: '2px solid #00ff00',
                  background: 'rgba(0, 20, 0, 0.8)',
                  position: 'relative',
                  overflow: 'hidden',
                  clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
                }}>
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-100%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 0, 0.1) 50%, transparent 70%)',
                      transform: 'rotate(45deg)',
                    }}
                    animate={{
                      x: ['0%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <a
                    href="mailto:contact@johanbecker.de"
                    className="relative flex items-center gap-6 text-decoration-none"
                    style={{ textDecoration: 'none', color: 'inherit', gap: 'calc(1.5rem + 8px)' }}
                  >
                    <motion.div 
                      style={{
                        padding: '1.5rem',
                        background: 'rgba(0, 255, 0, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid #00ff00',
                        boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
                      }}
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(0, 255, 0, 0.3)',
                          '0 0 40px rgba(0, 255, 0, 0.6)',
                          '0 0 20px rgba(0, 255, 0, 0.3)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      <Mail style={{ width: '2rem', height: '2rem', color: '#00ff00' }} />
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <motion.h2 
                        className="glitch"
                        data-text="[EMAIL_CHANNEL]"
                        style={{
                          fontSize: '1.8rem',
                          fontWeight: 700,
                          marginBottom: '0.5rem',
                          fontFamily: 'Orbitron, monospace',
                          color: '#00ff00',
                          textShadow: '0 0 10px #00ff00'
                        }}
                        animate={{
                          textShadow: [
                            '0 0 10px #00ff00',
                            '0 0 20px #00ff00, 0 0 30px #00ff00',
                            '0 0 10px #00ff00'
                          ]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity
                        }}
                      >
                        [EMAIL_CHANNEL]
                      </motion.h2>
                      <p style={{
                        fontSize: '1.2rem',
                        color: '#00ff00',
                        fontFamily: 'Orbitron, monospace',
                        opacity: 0.8
                      }}>
                        contact@johanbecker.de
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      animate={{
                        rotate: [0, 5, -5, 0]
                      }}
                      style={{
                        transition: 'all 0.1s ease'
                      }}
                    >
                      <Zap style={{ width: '1.5rem', height: '1.5rem', color: '#00ff00' }} />
                    </motion.div>
                  </a>
                </div>
              </motion.div>

              {/* GitHub Contact - Hexagonal Cyber Style */}
              <motion.div
                variants={itemVariants}
                className="relative group"
              >
                <div className="glass-card" style={{
                  padding: '2rem',
                  border: '2px solid #00ffff',
                  background: 'rgba(0, 20, 20, 0.8)',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '0',
                  clipPath: 'polygon(25px 0%, 100% 0%, calc(100% - 25px) 100%, 0% 100%)'
                }}>
                  {/* Animated border lines */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                    }}
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                    }}
                    animate={{
                      x: ['100%', '-100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1
                    }}
                  />
                  
                  <a
                    href="https://github.com/johan-becker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-6 text-decoration-none"
                    style={{ textDecoration: 'none', color: 'inherit', gap: 'calc(1.5rem + 8px)' }}
                  >
                    <motion.div 
                      style={{
                        padding: '1.5rem',
                        background: 'rgba(0, 255, 255, 0.1)',
                        borderRadius: '0',
                        border: '1px solid #00ffff',
                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                        clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
                      }}
                      whileHover={{
                        rotate: 45,
                        scale: 1.1
                      }}
                      transition={{
                        duration: 0.3
                      }}
                    >
                      <Github style={{ width: '2rem', height: '2rem', color: '#00ffff' }} />
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        fontFamily: 'Orbitron, monospace',
                        color: '#00ffff',
                        textShadow: '0 0 10px #00ffff',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                      }}>
                        [GITHUB_REPOSITORY]
                      </h2>
                      <motion.p 
                        style={{
                          fontSize: '1.2rem',
                          color: '#00ffff',
                          fontFamily: 'Orbitron, monospace',
                          opacity: 0.8
                        }}
                        animate={{
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity
                        }}
                      >
                        github.com/johan-becker
                      </motion.p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      animate={{
                        y: [0, -5, 0]
                      }}
                      style={{
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Zap style={{ width: '1.5rem', height: '1.5rem', color: '#00ffff' }} />
                    </motion.div>
                  </a>
                </div>
              </motion.div>

              {/* System Status Panel - Terminal Style with Heavy Glitch */}
              <motion.div
                variants={itemVariants}
                className="glass-card"
                style={{
                  padding: '2rem',
                  border: '2px solid #00ff00',
                  background: 'rgba(0, 20, 0, 0.9)',
                  position: 'relative',
                  borderRadius: '0',
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)'
                }}
              >
                {/* Terminal scan lines */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
                    pointerEvents: 'none'
                  }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Infinity
                  }}
                />
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                    style={{
                      width: '12px',
                      height: '12px',
                      background: '#00ff00',
                      borderRadius: '50%',
                      boxShadow: '0 0 20px #00ff00'
                    }}
                  />
                  <motion.h3 
                    className="glitch"
                    data-text="[SYSTEM_STATUS: ONLINE]"
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      fontFamily: 'Orbitron, monospace',
                      color: '#00ff00',
                      textShadow: '0 0 10px #00ff00'
                    }}
                    animate={{
                      x: [0, 2, -2, 0],
                      textShadow: [
                        '0 0 10px #00ff00',
                        '2px 0 10px #ff0000, -2px 0 10px #00ffff',
                        '0 0 10px #00ff00'
                      ]
                    }}
                    transition={{
                      duration: 0.2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    [SYSTEM_STATUS: ONLINE]
                  </motion.h3>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {[
                    { icon: Terminal, label: 'TERMINAL', status: 'READY', color: '#00ff00' },
                    { icon: Database, label: 'DATABASE', status: 'SYNC', color: '#ffff00' },
                    { icon: Wifi, label: 'NETWORK', status: 'SECURE', color: '#00ffff' },
                    { icon: Shield, label: 'FIREWALL', status: 'ACTIVE', color: '#ff00ff' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        border: `1px solid ${item.color}`,
                        borderRadius: '8px',
                        background: `rgba(${item.color === '#00ff00' ? '0, 255, 0' : item.color === '#ffff00' ? '255, 255, 0' : item.color === '#00ffff' ? '0, 255, 255' : '255, 0, 255'}, 0.05)`,
                        fontSize: '0.9rem',
                        fontFamily: 'Orbitron, monospace',
                        color: item.color
                      }}
                      animate={{
                        boxShadow: [`0 0 5px ${item.color}`, `0 0 15px ${item.color}`, `0 0 5px ${item.color}`],
                        borderColor: [item.color, `${item.color}88`, item.color]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: `rgba(${item.color === '#00ff00' ? '0, 255, 0' : item.color === '#ffff00' ? '255, 255, 0' : item.color === '#00ffff' ? '0, 255, 255' : '255, 0, 255'}, 0.1)`
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <item.icon style={{ width: '1rem', height: '1rem' }} />
                      </motion.div>
                      <span>{item.label}: {item.status}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.p 
                  style={{
                    fontSize: '1.1rem',
                    color: '#00ff00',
                    fontFamily: 'Orbitron, monospace',
                    opacity: 0.8,
                    lineHeight: 1.6
                  }}
                  animate={{
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}
                >
                  {'>'} BEREIT FÜR NEUE PROJEKTE UND KOOPERATIONEN<br/>
                  {'>'} INITIIEREN SIE DEN KONTAKT FÜR ERFOLGREICHE ZUSAMMENARBEIT<br/>
                  {'>'} RESPONSE_TIME: &lt; 24H
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 