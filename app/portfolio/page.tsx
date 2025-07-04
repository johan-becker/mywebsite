"use client";

import { motion } from "framer-motion";
import { Calendar, Code2, Zap, Globe, Database, Smartphone } from "lucide-react";
import BubbleLayer from "@/components/BubbleLayer";

const projects = [
  {
    title: "Link Tracking Tool",
    description: "Ein Tool, das trackt, wer wann mit welchem Gerät einen Link geöffnet hat.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Analytics"],
    icon: <Globe className="w-6 h-6" />,
    status: "In Entwicklung",
  },
  {
    title: "[PROJEKT NAME HIER]",
    description: "[PROJEKT BESCHREIBUNG HIER] - Eine innovative Lösung für digitale Herausforderungen.",
    tech: ["React", "Node.js", "MongoDB"],
    icon: <Database className="w-6 h-6" />,
    status: "Abgeschlossen",
  },
  {
    title: "[WEITERES PROJEKT]",
    description: "[BESCHREIBUNG] - Mobile-first Anwendung mit modernem Design.",
    tech: ["React Native", "Firebase", "TypeScript"],
    icon: <Smartphone className="w-6 h-6" />,
    status: "Abgeschlossen",
  },
];

const skills = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { name: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"] },
  { name: "Tools", items: ["Git", "Docker", "VS Code", "Figma", "Vercel"] },
  { name: "Weitere", items: ["[SKILL 1]", "[SKILL 2]", "[SKILL 3]"] },
];

export default function Portfolio() {
  return (
    <>
      <BubbleLayer count={15} />
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-width-container section-padding">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Projekte, Skills und Erfahrungen
            </p>
          </motion.div>

          {/* Projects Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-primary" />
              Projekte
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      {project.icon}
                    </div>
                    <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              Skills & Tech Stack
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {skills.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="font-semibold mb-4 text-primary">{category.name}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-gray-600 dark:text-gray-300 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Timeline Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Werdegang
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-gray-700" />
              
              {/* Timeline items */}
              {[
                {
                  date: "2024",
                  title: "Aktuell",
                  description: "Entwicklung von Web-Anwendungen mit modernen Technologien",
                },
                {
                  date: "[JAHR]",
                  title: "[POSITION/PROJEKT]",
                  description: "[BESCHREIBUNG HIER] - Weitere Erfahrungen und Projekte",
                },
                {
                  date: "[JAHR]",
                  title: "[AUSBILDUNG/START]",
                  description: "[BESCHREIBUNG] - Beginn der Reise in die Softwareentwicklung",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <span className="text-primary font-semibold">{item.date}</span>
                      <h3 className="text-xl font-semibold mt-1 mb-2">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-[#1E1E1E]" />
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
} 