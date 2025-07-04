import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#0D6EFD',
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0D6EFD',
          600: '#0A5AD4',
          700: '#0847AB',
          800: '#063482',
          900: '#042159',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 25s ease-in-out infinite',
        'float-slow': 'float 35s ease-in-out infinite',
        'float-fast': 'float 18s ease-in-out infinite',
        'float-smooth': 'float-smooth 30s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bubble-drift': 'bubble-drift 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) translateX(8px) rotate(1deg)' },
          '50%': { transform: 'translateY(8px) translateX(-8px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-8px) translateX(15px) rotate(0.5deg)' },
        },
        'float-smooth': {
          '0%, 100%': { 
            transform: 'translateY(0) translateX(0) scale(1)',
            opacity: '0.3'
          },
          '33%': { 
            transform: 'translateY(-20px) translateX(15px) scale(1.05)',
            opacity: '0.5'
          },
          '66%': { 
            transform: 'translateY(10px) translateX(-15px) scale(0.95)',
            opacity: '0.4'
          },
        },
        'bubble-drift': {
          '0%': { transform: 'translateX(-10px) rotate(0deg)' },
          '25%': { transform: 'translateX(10px) rotate(90deg)' },
          '50%': { transform: 'translateX(20px) rotate(180deg)' },
          '75%': { transform: 'translateX(-5px) rotate(270deg)' },
          '100%': { transform: 'translateX(-10px) rotate(360deg)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.6, 1)',
        'bounce-smooth': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
export default config; 