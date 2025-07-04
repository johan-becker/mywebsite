"use client";

import { motion } from "framer-motion";
import { Mail, Github, Zap } from "lucide-react";
import BubbleLayer from "@/components/BubbleLayer";

export default function Kontakt() {
  return (
    <>
      <BubbleLayer count={15} />
      <div className="min-h-screen relative overflow-hidden" style={{ marginTop: "5rem" }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-purple-500/20 to-transparent rounded-full blur-3xl"
          />
        </div>

        <div className="max-width-container section-padding relative z-10">
          {/* Header with glitch effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="glitch text-5xl md:text-7xl font-bold mb-6 font-orbitron tracking-wider">
              KONTAKT_
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative inline-block"
            >
              <p className="text-xl md:text-2xl text-cyan-400 font-space-grotesk tracking-wide mb-2">
                INITIIERE VERBINDUNG
              </p>
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            </motion.div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Main contact card with hover effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <a
                href="mailto:contact@johanbecker.de"
                className="relative flex items-center gap-8 p-8 bg-black/50 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="p-6 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-white/10">
                  <Mail className="w-12 h-12 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-3 font-orbitron bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    E-MAIL
                  </h2>
                  <p className="text-2xl text-gray-300 font-space-grotesk tracking-wide">
                    contact@johanbecker.de
                  </p>
                </div>
                <motion.div
                  className="ml-auto"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Zap className="w-8 h-8 text-cyan-400" />
                </motion.div>
              </a>
            </motion.div>

            {/* GitHub link with similar styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="relative mt-8 group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <a
                href="https://github.com/johan-becker"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-8 p-8 bg-black/50 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="p-6 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl border border-white/10">
                  <Github className="w-12 h-12 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-3 font-orbitron bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    GITHUB
                  </h2>
                  <p className="text-2xl text-gray-300 font-space-grotesk tracking-wide">
                    github.com/johan-becker
                  </p>
                </div>
                <motion.div
                  className="ml-auto"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Zap className="w-8 h-8 text-purple-400" />
                </motion.div>
              </a>
            </motion.div>

            {/* Status card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-12 relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 to-purple-500/50 rounded-2xl blur-xl opacity-30" />
              <div className="relative p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-black/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <h3 className="text-xl font-bold font-orbitron text-green-400">
                    SYSTEM STATUS: ONLINE
                  </h3>
                </div>
                <p className="text-lg text-gray-300 font-space-grotesk">
                  Bereit für neue Projekte und Kooperationen. 
                  Initiieren Sie den Kontakt für eine erfolgreiche Zusammenarbeit.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
} 