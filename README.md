# Johan Becker - Portfolio Website

Ein modernes, interaktives Portfolio-Website mit Next.js, TypeScript und Tailwind CSS.

## Features

- 🎨 **Interaktives Bubble-System**: Floating Bubbles mit Parallax-Effekten und Hover-Interaktionen
- 🌓 **Dark/Light Mode**: Theme-Toggle mit System-Präferenz-Fallback
- 📱 **Fully Responsive**: Mobile-first Design mit Burger-Menü
- ⚡ **Performance**: Optimiert mit Next.js App Router und Framer Motion
- 🎯 **SEO-freundlich**: Metadata, Sitemap und robots.txt
- ♿ **Barrierefrei**: Semantisches HTML und ARIA-Attribute

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS
- **Animationen**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## Installation

```bash
# Repository klonen
git clone https://github.com/johan-becker/mywebsite.git
cd mywebsite

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Anpassung

### Persönliche Informationen

Suche nach `[DEIN TEXT HIER]`, `[PROJEKT NAME HIER]`, etc. in den folgenden Dateien:

- `app/page.tsx` - Homepage-Inhalte
- `app/portfolio/page.tsx` - Projekte, Skills, Werdegang
- `app/kontakt/page.tsx` - Kontaktinformationen
- `app/layout.tsx` - Meta-Tags und Domain

### Farben

Passe die Farbpalette in `tailwind.config.ts` an:

```js
colors: {
  primary: {
    500: '#0D6EFD', // Hauptfarbe
    // ... weitere Schattierungen
  },
}
```

### Bubble-System

Das Bubble-System kann in `components/BubbleLayer.tsx` angepasst werden:
- Anzahl der Bubbles
- Interaktive Labels
- Animationsgeschwindigkeit
- Parallax-Effekte

## Deployment

### Vercel (Empfohlen)

1. Push zu GitHub
2. Importiere das Repository auf [vercel.com](https://vercel.com)
3. Deploy automatisch

### Andere Plattformen

Das Projekt kann auf jeder Plattform deployed werden, die Next.js unterstützt.

## Struktur

```
├── app/                  # Next.js App Router
│   ├── kontakt/         # Kontaktseite
│   ├── portfolio/       # Portfolio-Seite
│   └── page.tsx         # Homepage
├── components/          # React-Komponenten
│   ├── BubbleLayer.tsx  # Interaktives Bubble-System
│   ├── Hero.tsx         # Hero-Section
│   ├── Navigation.tsx   # Navigation mit Theme-Toggle
│   └── ThemeProvider.tsx # Dark/Light Mode Provider
├── public/              # Statische Assets
└── tailwind.config.ts   # Tailwind-Konfiguration
```

## Lizenz

MIT

---

Entwickelt mit ❤️ von Johan Becker
