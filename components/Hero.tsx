"use client";

import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";

// Dynamic imports with SSR disabled
const MatrixBackground = dynamic(() => import("./MatrixBackground"), { ssr: false });
const HeroText = dynamic(() => import("./HeroText"), { ssr: false });
const MissionCard = dynamic(() => import("./MissionCard"), { ssr: false });
const ActionButtons = dynamic(() => import("./ActionButtons"), { ssr: false });

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section 
      className={theme === "professional" ? "hero-section" : ""}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '4rem',
        overflow: 'hidden',
        background: theme === "professional" 
          ? 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
          : 'linear-gradient(180deg, var(--background-primary) 0%, var(--background-secondary) 50%, var(--background-primary) 100%)'
      }}
    >
      {/* Matrix Background Effects */}
      <MatrixBackground />

      {/* Main Content Container */}
      <div className="max-width-container section-padding" style={{ 
        position: 'relative', 
        zIndex: 10,
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Hero Text */}
        <HeroText />

        {/* Mission Card */}
        <MissionCard />

        {/* Action Buttons */}
        <ActionButtons />
      </div>
    </section>
  );
} 