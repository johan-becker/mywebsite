"use client";

import { motion } from "framer-motion";
import { Mail, Github } from "lucide-react";
import BubbleLayer from "@/components/BubbleLayer";

export default function Kontakt() {
  return (
    <>
      <BubbleLayer count={10} />
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-width-container section-padding">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontakt</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Lassen Sie uns in Kontakt treten!
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Email */}
              <motion.a
                href="mailto:contact@johanbecker.de"
                className="flex items-center gap-6 p-6 bg-white/5 dark:bg-gray-800/20 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group border border-primary/20"
                whileHover={{ scale: 1.02 }}
                style={{
                  background: "linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))",
                  backdropFilter: "blur(10px)"
                }}
              >
                <div className="p-4 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 font-orbitron">Email</h2>
                  <p className="text-xl text-gray-300 font-space-grotesk">contact@johanbecker.de</p>
                </div>
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="https://github.com/johan-becker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-6 bg-white/5 dark:bg-gray-800/20 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group border border-primary/20"
                whileHover={{ scale: 1.02 }}
                style={{
                  background: "linear-gradient(135deg, rgba(255, 0, 255, 0.1), rgba(150, 0, 255, 0.1))",
                  backdropFilter: "blur(10px)"
                }}
              >
                <div className="p-4 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Github className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 font-orbitron">GitHub</h2>
                  <p className="text-xl text-gray-300 font-space-grotesk">github.com/johan-becker</p>
                </div>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-12 p-8 rounded-2xl text-center"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 255, 255, 0.05), rgba(255, 0, 255, 0.05))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(0, 255, 255, 0.2)"
                }}
              >
                <h3 className="text-2xl font-bold mb-4 font-orbitron">Verfügbarkeit</h3>
                <p className="text-lg text-gray-300 font-space-grotesk">
                  Ich bin offen für neue Projekte und Kooperationen. 
                  Zögern Sie nicht, mich zu kontaktieren!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
} 