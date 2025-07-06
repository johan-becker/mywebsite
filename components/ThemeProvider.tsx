"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion";

type Theme = "matrix" | "professional";

type ThemeProviderContextType = {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
  isThemeLocked: boolean;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

// Paths where theme switching is locked
const THEME_LOCKED_PATHS = ['/coolperson'];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("matrix");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const controls = useAnimation();

  // Check if current path has theme switching locked
  const isThemeLocked = THEME_LOCKED_PATHS.includes(pathname);

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage or default to matrix
    const savedTheme = localStorage.getItem("design-theme") as Theme;
    if (savedTheme && (savedTheme === "matrix" || savedTheme === "professional")) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("design-theme", theme);
    }
  }, [theme, mounted]);

  const shakeAnimation = async () => {
    await controls.start({
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    });
  };

  const toggleTheme = () => {
    if (isThemeLocked) {
      // Play shake animation instead of switching theme
      shakeAnimation();
      return;
    }
    setTheme(prev => prev === "matrix" ? "professional" : "matrix");
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, toggleTheme, mounted, isThemeLocked }}>
      <motion.div animate={controls}>
        {children}
      </motion.div>
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 