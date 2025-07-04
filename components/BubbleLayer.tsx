"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  interactive?: boolean;
  label?: string;
  action?: () => void;
}

interface BubbleLayerProps {
  count?: number;
  interactive?: boolean;
}

export default function BubbleLayer({ count = 20, interactive = false }: BubbleLayerProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  // Spring configs for smooth animations
  const springConfig = { damping: 15, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      
      // Generate random bubbles
      for (let i = 0; i < count; i++) {
        newBubbles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 20,
          delay: Math.random() * 5,
          duration: Math.random() * 20 + 15,
          interactive: interactive && i < 3, // Make first 3 bubbles interactive
          label: interactive && i === 0 ? "Portfolio" : 
                 interactive && i === 1 ? "Kontakt" : 
                 interactive && i === 2 ? "Mehr erfahren" : undefined,
        });
      }
      
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, [count, interactive]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleBubbleClick = (bubble: Bubble) => {
    if (bubble.label === "Portfolio") {
      window.location.href = "/portfolio";
    } else if (bubble.label === "Kontakt") {
      window.location.href = "/kontakt";
    } else if (bubble.label === "Mehr erfahren") {
      // Scroll to next section
      const nextSection = document.querySelector("#next-section");
      nextSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => {
        // Parallax effect based on scroll
        const parallaxY = useTransform(
          scrollYProgress,
          [0, 1],
          [0, bubble.size * 2]
        );

        // Mouse parallax effect
        const x = useTransform(
          mouseXSpring,
          [0, 1],
          [bubble.x - 5, bubble.x + 5]
        );
        const y = useTransform(
          [mouseYSpring, parallaxY],
          ([mouseY, scrollY]) => bubble.y + (mouseY as number - 0.5) * 10 + (scrollY as number)
        );

        return (
          <motion.div
            key={bubble.id}
            className={`bubble ${bubble.interactive ? "bubble-interactive pointer-events-auto" : ""}`}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: bubble.size,
              height: bubble.size,
              x,
              y,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={bubble.interactive ? { scale: 1.2 } : {}}
            onClick={() => bubble.interactive && handleBubbleClick(bubble)}
          >
            {bubble.interactive && bubble.label && (
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary dark:text-primary-300 opacity-0 hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {bubble.label}
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
} 