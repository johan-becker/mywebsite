import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Johan Becker - Portfolio",
  description: "Ich interessiere mich für Softwareentwicklung, digitale Systeme und technische Automatisierung.",
  keywords: ["Johan Becker", "Portfolio", "Softwareentwicklung", "Web Development", "Next.js", "React"],
  authors: [{ name: "Johan Becker" }],
  creator: "Johan Becker",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://johanbecker.de",
    siteName: "Johan Becker Portfolio",
    title: "Johan Becker - Portfolio",
    description: "Ich interessiere mich für Softwareentwicklung, digitale Systeme und technische Automatisierung.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Johan Becker Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Johan Becker - Portfolio",
    description: "Ich interessiere mich für Softwareentwicklung, digitale Systeme und technische Automatisierung.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head />
      <body className="antialiased">
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
