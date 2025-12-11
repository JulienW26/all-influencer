# ALL INFLUENCER - Premium Influencer Network

Eine Premium-Influencer-Plattform, auf der Influencer monatliche Spots buchen können.

## 🌐 Live
- **URL:** https://all-influencer.com
- **Hosting:** Vercel

## 🚀 Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Für Production Build
npm run build
npm start
```

## 📁 Projektstruktur

```
all-influencer/
├── pages/
│   ├── index.js        # Hauptseite mit allen Komponenten
│   └── _app.js         # App-Wrapper
├── styles/
│   └── globals.css     # Tailwind CSS + Custom Styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## ✨ Features

### Kategorien (333 Spots)
- 💎 **Diamond** (1 Spot) - 20M+ Follower - 10.000€/Monat
- 🏆 **Platin** (10 Spots) - 10M+ Follower - 5.000€/Monat
- 🥇 **Gold** (21 Spots) - 5M+ Follower - 1.000€/Monat
- ⭐ **Rising Star** (301 Spots) - 1M+ Follower - 250€/Monat

### Funktionen
- ✅ Kalender-Modal (12 Monate, max. 3 aufeinanderfolgend)
- ✅ Nachweis-Modal (Profil-Link + Screenshot)
- ✅ Login/Registrierung Modals
- ✅ Kontakt, Über uns, Arbeiten mit uns Modals
- ✅ Datenschutz & AGB Modals
- ✅ "Mehr laden" für Rising Star
- ✅ Beweglicher Marken-Banner
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Mehrsprachigkeit (DE, EN, ES)

## 🔧 API-Integration (Vorbereitet)

### Stripe (Zahlungen)
Die Checkout-Struktur ist vorbereitet. Um Stripe zu aktivieren:
1. Stripe-Konto erstellen
2. API-Keys in `.env.local` einfügen:
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Resend (E-Mails)
Die E-Mail-Struktur ist vorbereitet. Um Resend zu aktivieren:
1. Resend-Konto erstellen
2. API-Key in `.env.local` einfügen:
```
RESEND_API_KEY=re_...
```

## 🎨 Design
- **Framework:** Next.js + React
- **Styling:** Tailwind CSS
- **Fonts:** Playfair Display + Montserrat
- **Theme:** Dark Premium mit Gold-Akzenten

## 📱 Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment auf Vercel

```bash
# Vercel CLI installieren
npm i -g vercel

# Deployen
vercel
```

## 📄 Lizenz
© 2025 ALL INFLUENCER. Alle Rechte vorbehalten.
