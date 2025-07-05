"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "matrix" | "professional";

type ThemeProviderContextType = {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("matrix");
  const [mounted, setMounted] = useState(false);

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

  const toggleTheme = () => {
    setTheme(prev => prev === "matrix" ? "professional" : "matrix");
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
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