# Vercel Deployment Setup

## Environment Variables

Für das Deployment auf Vercel müssen die folgenden Umgebungsvariablen konfiguriert werden:

### 1. Vercel Dashboard öffnen
- Gehe zu [vercel.com/dashboard](https://vercel.com/dashboard)
- Wähle dein Projekt aus

### 2. Environment Variables hinzufügen
Navigiere zu **Settings** → **Environment Variables** und füge folgende Variablen hinzu:

#### Production Environment:
```
NEXT_PUBLIC_SUPABASE_URL=https://ovpxnemelfcapprtyvuf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein_supabase_anon_key
```

#### Preview Environment (optional):
```
NEXT_PUBLIC_SUPABASE_URL=https://ovpxnemelfcapprtyvuf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein_supabase_anon_key
```

#### Development Environment (optional):
```
NEXT_PUBLIC_SUPABASE_URL=https://ovpxnemelfcapprtyvuf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein_supabase_anon_key
```

### 3. Deployment auslösen
Nach dem Hinzufügen der Umgebungsvariablen:
1. Gehe zu **Deployments**
2. Klicke auf **Redeploy** beim letzten Deployment
3. Oder pushe einen neuen Commit

### 4. Supabase URLs konfigurieren
Stelle sicher, dass in deinem Supabase-Dashboard folgende URLs konfiguriert sind:

**Site URL:**
```
https://dein-projekt.vercel.app
```

**Redirect URLs:**
```
https://dein-projekt.vercel.app/**
https://dein-projekt.vercel.app/auth/callback
https://dein-projekt.vercel.app/dashboard
```

## Troubleshooting

### Build-Fehler: "supabaseUrl is required"
- Stelle sicher, dass die Umgebungsvariablen in Vercel konfiguriert sind
- Überprüfe, dass die Variablennamen korrekt sind (case-sensitive)
- Führe ein Redeploy durch nach dem Hinzufügen der Variablen

### Authentication funktioniert nicht
- Überprüfe die Supabase Redirect URLs
- Stelle sicher, dass die Site URL in Supabase korrekt ist
- Überprüfe die Browser-Konsole auf Fehler

### Lokale Entwicklung
Für lokale Entwicklung erstelle eine `.env.local` Datei:
```
NEXT_PUBLIC_SUPABASE_URL=https://ovpxnemelfcapprtyvuf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein_supabase_anon_key
```

**Wichtig:** Niemals die `.env.local` Datei in Git committen! 