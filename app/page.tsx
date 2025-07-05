"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import ProfessionalBackground from "@/components/ProfessionalBackground";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();
  const router = useRouter();
  
  useEffect(() => {
    // Check if we have recovery tokens in the URL hash
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');
      const accessToken = hashParams.get('access_token');
      
      if (type === 'recovery' && accessToken) {
        console.log('Recovery token detected on homepage, redirecting to reset-password');
        // Redirect to reset-password page with the token
        router.push(`/reset-password${window.location.hash}`);
        return;
      }
    }
  }, [router]);
  
  return (
    <>
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
