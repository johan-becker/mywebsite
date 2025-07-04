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

export default function BubbleLayer({ count = 15, interactive = false }: BubbleLayerProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  // Smoother spring configs
  const smoothSpringConfig = { damping: 25, stiffness: 50, mass: 0.8 };
  const mouseXSpring = useSpring(mouseX, smoothSpringConfig);
  const mouseYSpring = useSpring(mouseY, smoothSpringConfig);

  useEffect(() => {
    setMounted(true);
    
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      const visibleCount = Math.min(Math.max(count, 10), 20); // Ensure between 10-20 bubbles
      
      // Generate random bubbles with better distribution
      for (let i = 0; i < visibleCount; i++) {
        newBubbles.push({
          id: i,
          x: Math.random() * 90 + 5, // Keep bubbles away from edges
          y: Math.random() * 90 + 5,
          size: Math.random() * 80 + 30, // Larger size range
          delay: Math.random() * 8, // Longer delay range
          duration: Math.random() * 25 + 20, // Longer duration for smoother movement
          interactive: interactive && i < 3,
          label: interactive && i === 0 ? "Portfolio" : 
                 interactive && i === 1 ? "Kontakt" : 
                 interactive && i === 2 ? "Mehr erfahren" : undefined,
        });
      }
      
      setBubbles(newBubbles);
    };

    generateBubbles();

    // Regenerate bubbles periodically to ensure continuous movement
    const interval = setInterval(generateBubbles, 30000);
    return () => clearInterval(interval);
  }, [count, interactive]);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {bubbles.map(bubble => (
        <BubbleItem
          key={bubble.id}
          bubble={bubble}
          scrollYProgress={scrollYProgress}
          mouseXSpring={mouseXSpring}
          mouseYSpring={mouseYSpring}
          onBubbleClick={(bubble) => {
            if (bubble.label === "Portfolio") {
              window.location.href = "/portfolio";
            } else if (bubble.label === "Kontakt") {
              window.location.href = "/kontakt";
            }
          }}
        />
      ))}
    </div>
  );
}

// Separate component for individual bubbles
function BubbleItem({ 
  bubble, 
  scrollYProgress, 
  mouseXSpring, 
  mouseYSpring, 
  onBubbleClick 
}: {
  bubble: Bubble;
  scrollYProgress: any;
  mouseXSpring: any;
  mouseYSpring: any;
  onBubbleClick: (bubble: Bubble) => void;
}) {
  // Smoother parallax effect
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, bubble.size * 1.5]
  );

  // Smoother mouse parallax effect with reduced intensity
  const x = useTransform(
    mouseXSpring,
    [0, 1],
    [bubble.x - 3, bubble.x + 3]
  );
  
  const y = useTransform(
    [mouseYSpring, parallaxY],
    ([mouseY, scrollY]) => bubble.y + (mouseY as number - 0.5) * 8 + (scrollY as number)
  );

  return (
    <motion.div
      className={`bubble ${bubble.interactive ? "bubble-interactive" : ""}`}
      style={{
        left: `${bubble.x}%`,
        top: `${bubble.y}%`,
        width: bubble.size,
        height: bubble.size,
        x,
        y,
        pointerEvents: bubble.interactive ? 'auto' : 'none'
      }}
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: bubble.duration,
        delay: bubble.delay,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse",
      }}
      whileHover={bubble.interactive ? { 
        scale: 1.15,
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
      onClick={() => bubble.interactive && onBubbleClick(bubble)}
    >
      {bubble.interactive && bubble.label && (
        <motion.span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#0D6EFD',
            pointerEvents: 'none'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          {bubble.label}
        </motion.span>
      )}
    </motion.div>
  );
} 