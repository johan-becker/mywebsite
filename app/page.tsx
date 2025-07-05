"use client";

import Hero from "@/components/Hero";
import BubbleLayer from "@/components/BubbleLayer";
import ProfessionalBackground from "@/components/ProfessionalBackground";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();
  
  return (
    <>
      {theme === "matrix" && <BubbleLayer count={25} interactive={true} />}
      {theme === "professional" && <ProfessionalBackground variant="subtle" />}
      <Hero />
      
      {/* Additional section for scroll demonstration */}
      <section id="next-section" className="min-h-screen flex items-center justify-center section-padding">
        <div className="max-width-container text-center">
          <h2 className="text-4xl font-bold mb-4">Weitere Informationen</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            [DEIN TEXT HIER] - Hier können weitere Inhalte eingefügt werden.
          </p>
        </div>
      </section>
    </>
  );
}
