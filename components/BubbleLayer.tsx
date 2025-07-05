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
  const [showBubbles, setShowBubbles] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoother spring configs
  const smoothSpringConfig = { damping: 25, stiffness: 50, mass: 0.8 };
  const mouseXSpring = useSpring(mouseX, smoothSpringConfig);
  const mouseYSpring = useSpring(mouseY, smoothSpringConfig);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check scroll position to show/hide bubbles
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      setShowBubbles(scrollPosition > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
    
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      const visibleCount = isMobile ? 
        Math.min(Math.max(count, 8), 10) : // 8-10 bubbles for mobile
        Math.min(Math.max(count, 12), 15); // 12-15 bubbles for desktop
      
      for (let i = 0; i < visibleCount; i++) {
        newBubbles.push({
          id: i,
          x: Math.random() * 90 + 5,
          y: Math.random() * 70 + 20,
          size: Math.random() * 80 + 30,
          delay: Math.random() * 8,
          duration: Math.random() * 25 + 20,
          interactive: interactive && i < 3,
          label: interactive && i === 0 ? "Portfolio" : 
                 interactive && i === 1 ? "Kontakt" : 
                 interactive && i === 2 ? "Mehr erfahren" : undefined,
        });
      }
      
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, [count, interactive, isMobile]);

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
        zIndex: 0,
        opacity: showBubbles ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out'
      }}
    >
      {bubbles.map(bubble => (
        <BubbleItem
          key={bubble.id}
          bubble={bubble}
          mouseXSpring={mouseXSpring}
          mouseYSpring={mouseYSpring}
          showBubbles={showBubbles}
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

function BubbleItem({ 
  bubble, 
  mouseXSpring, 
  mouseYSpring, 
  showBubbles,
  onBubbleClick 
}: {
  bubble: Bubble;
  mouseXSpring: any;
  mouseYSpring: any;
  showBubbles: boolean;
  onBubbleClick: (bubble: Bubble) => void;
}) {
  // Pre-calculate motion values
  const baseX = bubble.x;
  const baseY = bubble.y;
  const range = 20; // Movement range in percentage
  
  const x = useTransform(
    mouseXSpring,
    [0, 1],
    [baseX - range/2, baseX + range/2]
  );
  
  const y = useTransform(
    mouseYSpring,
    [0, 1],
    [baseY - range/2, baseY + range/2]
  );

  return (
    <motion.div
      className={`bubble ${bubble.interactive ? "bubble-interactive" : ""}`}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: bubble.size,
        height: bubble.size,
        pointerEvents: bubble.interactive ? 'auto' : 'none',
        opacity: showBubbles ? 1 : 0,
      }}
      animate={{
        x: `${x.get()}%`,
        y: `${y.get()}%`,
        scale: [1, 1.08, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        x: { type: "spring", stiffness: 100, damping: 30 },
        y: { type: "spring", stiffness: 100, damping: 30 },
        scale: {
          duration: bubble.duration,
          delay: bubble.delay,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        },
        opacity: {
          duration: bubble.duration * 1.2,
          delay: bubble.delay,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }
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