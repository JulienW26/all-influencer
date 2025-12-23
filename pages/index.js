/**
 * ALL INFLUENCER Platform v4.6
 * 
 * CHANGELOG v4.6:
 * - NEU: Gesamte Reichweite Display im Hero-Bereich (Entwurf 4)
 * - NEU: Animierter Zähler beim Laden der Seite
 * - NEU: Weltkugel-Icon mit goldener Box
 * - Nachweis-Fenster (ProofModal) nach Buchung/Einladungscode
 * - Screenshot-Upload für Follower-Nachweis
 * - E-Mail mit Nachweis an Administrator
 * - Kalender ab Januar 2026
 * - Einladungscode-Modal für Influencer-Kacheln
 * - Kontakt/Arbeiten-Formulare mit E-Mail-Versand
 * - "Ausschließlich 50 Plätze verfügbar"
 * - Alle Daten an contact@all-influencer.com
 * 
 * KEINE ÄNDERUNG OHNE SCHRIFTLICHE GENEHMIGUNG
 */

import React, { useState, useEffect, useContext, createContext, useRef, useCallback } from 'react';
import FounderLOIModal from '../components/FounderLOIModal';

// ============================================================================
// DEFAULT KONFIGURATION
// ============================================================================

const DEFAULT_CONFIG = {
  site: { name: 'ALL INFLUENCER', tagline: 'Premium Network', contactEmail: 'contact@all-influencer.com' },
  impressum: { name: 'Don Giuliano', street: 'Uetzer Str. 5', city: '38536 Meinersen', mobile: '+49 163 260 0084', email: 'contact@all-influencer.com' },
  socialLinks: { instagram: '', youtube: '', x: '', facebook: '', tiktok: '' },
  categories: {
    diamond: { spots: 3, minFollowers: 20000000, price: 10000, gradient: 'from-cyan-400 via-blue-500 to-indigo-600', icon: '💎' },
    platinum: { spots: 10, minFollowers: 10000000, price: 5000, gradient: 'from-slate-300 via-slate-400 to-slate-600', icon: '🏆' },
    gold: { spots: 20, minFollowers: 5000000, price: 1000, gradient: 'from-yellow-400 via-amber-500 to-orange-600', icon: '🥇' },
    risingStar: { spots: 300, minFollowers: 1000000, price: 250, gradient: 'from-purple-400 via-pink-500 to-rose-600', icon: '⭐' }
  },
  goldenClients: { maxSpots: 50, itemsPerPage: 4 },
  marquee: { enabled: true, speed: 30, brands: ['LOUIS VUITTON', 'DIOR', 'CHANEL', 'VERSACE', 'TESLA', 'APPLE', 'GUCCI', 'PRADA', 'ROLEX', 'BMW', 'MERCEDES-BENZ', 'PORSCHE', 'FERRARI', 'CARTIER', 'HERMÈS'] },
  // Influencer-Daten für Follower-Berechnung (wird durch config.json überschrieben)
  influencerData: {
    diamond: [],
    platinum: [],
    gold: [],
    risingStar: []
  },
  translations: {
    de: {
      clickToBook: 'Klicken zum Buchen',
      booked: 'Gebucht',
      close: 'Schließen',
      more: 'mehr',
      ourClients: 'Unsere Goldenen Kunden',
      partnerSince: 'Partner seit',
      invitationCode: 'Einladungscode',
      aboutUs: 'Über uns',
      contact: 'Kontakt',
      workWithUs: 'Arbeite mit uns',
      privacy: 'Datenschutz',
      terms: 'AGB',
      imprint: 'Impressum',
      rank: 'Rang',
      available: 'Verfügbar',
      heroTitle: 'Premium Influencer Network',
      heroSubtitle: 'Sichere dir deinen exklusiven Spot unter den Top-Influencern',
      ourCategories: 'Unsere Kategorien',
      minFollowers: 'Mind. Follower',
      perMonth: '/Monat',
      exclusiveSpots: 'Ausschließlich 50 Plätze verfügbar',
      login: 'Login',
      register: 'Registrieren',
      home: 'Home',
      selectMonths: 'Wähle deine Buchungsmonate',
      maxMonths: 'Maximal 3 aufeinanderfolgende Monate buchbar',
      bookNow: 'JETZT KAUFEN',
      selectedMonths: 'Monate ausgewählt',
      january: 'Jan', february: 'Feb', march: 'Mär', april: 'Apr',
      may: 'Mai', june: 'Jun', july: 'Jul', august: 'Aug',
      september: 'Sep', october: 'Okt', november: 'Nov', december: 'Dez',
      or: 'oder',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Senden',
      selectPosition: 'Position wählen',
      marketing: 'Marketing',
      technology: 'Technik',
      content: 'Content',
      sales: 'Vertrieb',
      other: 'Sonstiges',
      motivation: 'Motivation',
      submitApplication: 'Bewerbung absenden',
      invitationOnly: 'Nur auf Einladung',
      enterInvitationCode: 'Einladungscode eingeben',
      codePlaceholder: 'XXXX-XXXX-XXXX',
      registration: 'Registrierung',
      spotNumber: 'Platz',
      legendAvailable: 'Verfügbar',
      legendBooked: 'Gebucht',
      legendSelected: 'Ausgewählt',
      sending: 'Wird gesendet...',
      sent: 'Gesendet!',
      error: 'Fehler',
      adminApproval: 'Freigabe erfolgt ausschließlich durch den Administrator.',
      submitProof: 'Nachweis einreichen',
      proofSubtitle: 'Nach Prüfung durch unseren Administrator erhältst du eine Freischaltung per E-Mail',
      minFollowersCategory: 'Mindest-Follower für diese Kategorie',
      yourEmail: 'Deine E-Mail-Adresse',
      profileLink: 'Link zu deinem Profil',
      uploadScreenshot: 'Screenshot hochladen',
      dragOrClick: 'Ziehe eine Datei hierher oder klicke zum Auswählen',
      submitForReview: 'Zur Prüfung einreichen',
      proofSubmitted: 'Nachweis eingereicht!',
      totalReach: 'Gesamte Reichweite',
      followers: 'Followers',
      updatedMonthly: 'Aktualisiert am 1. jeden Monats'
    },
    en: {
      clickToBook: 'Click to book',
      booked: 'Booked',
      close: 'Close',
      more: 'more',
      ourClients: 'Our Golden Clients',
      partnerSince: 'Partner since',
      invitationCode: 'Invitation Code',
      aboutUs: 'About us',
      contact: 'Contact',
      workWithUs: 'Work with us',
      privacy: 'Privacy',
      terms: 'Terms',
      imprint: 'Imprint',
      rank: 'Rank',
      available: 'Available',
      heroTitle: 'Premium Influencer Network',
      heroSubtitle: 'Secure your exclusive spot among top influencers',
      ourCategories: 'Our Categories',
      minFollowers: 'Min. Followers',
      perMonth: '/month',
      exclusiveSpots: 'Exclusively 50 spots available',
      login: 'Login',
      register: 'Register',
      home: 'Home',
      selectMonths: 'Select your booking months',
      maxMonths: 'Maximum 3 consecutive months bookable',
      bookNow: 'BUY NOW',
      selectedMonths: 'months selected',
      january: 'Jan', february: 'Feb', march: 'Mar', april: 'Apr',
      may: 'May', june: 'Jun', july: 'Jul', august: 'Aug',
      september: 'Sep', october: 'Oct', november: 'Nov', december: 'Dec',
      or: 'or',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      selectPosition: 'Select position',
      marketing: 'Marketing',
      technology: 'Technology',
      content: 'Content',
      sales: 'Sales',
      other: 'Other',
      motivation: 'Motivation',
      submitApplication: 'Submit application',
      invitationOnly: 'By Invitation Only',
      enterInvitationCode: 'Enter invitation code',
      codePlaceholder: 'XXXX-XXXX-XXXX',
      registration: 'Registration',
      spotNumber: 'Spot',
      legendAvailable: 'Available',
      legendBooked: 'Booked',
      legendSelected: 'Selected',
      sending: 'Sending...',
      sent: 'Sent!',
      error: 'Error',
      adminApproval: 'Approval is exclusively granted by the administrator.',
      submitProof: 'Submit Proof',
      proofSubtitle: 'After review by our administrator, you will receive activation via email',
      minFollowersCategory: 'Minimum followers for this category',
      yourEmail: 'Your email address',
      profileLink: 'Link to your profile',
      uploadScreenshot: 'Upload screenshot',
      dragOrClick: 'Drag a file here or click to select',
      submitForReview: 'Submit for review',
      proofSubmitted: 'Proof submitted!',
      totalReach: 'Total Reach',
      followers: 'Followers',
      updatedMonthly: 'Updated on the 1st of each month'
    },
    es: {
      clickToBook: 'Clic para reservar',
      booked: 'Reservado',
      close: 'Cerrar',
      more: 'más',
      ourClients: 'Nuestros Clientes Dorados',
      partnerSince: 'Socio desde',
      invitationCode: 'Código de invitación',
      aboutUs: 'Sobre nosotros',
      contact: 'Contacto',
      workWithUs: 'Trabaja con nosotros',
      privacy: 'Privacidad',
      terms: 'Términos',
      imprint: 'Aviso legal',
      rank: 'Rango',
      available: 'Disponible',
      heroTitle: 'Premium Influencer Network',
      heroSubtitle: 'Asegura tu lugar exclusivo entre los mejores influencers',
      ourCategories: 'Nuestras Categorías',
      minFollowers: 'Mín. Seguidores',
      perMonth: '/mes',
      exclusiveSpots: 'Exclusivamente 50 plazas disponibles',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      home: 'Inicio',
      selectMonths: 'Selecciona tus meses de reserva',
      maxMonths: 'Máximo 3 meses consecutivos reservables',
      bookNow: 'COMPRAR AHORA',
      selectedMonths: 'meses seleccionados',
      january: 'Ene', february: 'Feb', march: 'Mar', april: 'Abr',
      may: 'May', june: 'Jun', july: 'Jul', august: 'Ago',
      september: 'Sep', october: 'Oct', november: 'Nov', december: 'Dic',
      or: 'o',
      name: 'Nombre',
      email: 'Correo',
      message: 'Mensaje',
      send: 'Enviar',
      selectPosition: 'Seleccionar posición',
      marketing: 'Marketing',
      technology: 'Tecnología',
      content: 'Contenido',
      sales: 'Ventas',
      other: 'Otro',
      motivation: 'Motivación',
      submitApplication: 'Enviar solicitud',
      invitationOnly: 'Solo por invitación',
      enterInvitationCode: 'Ingrese código de invitación',
      codePlaceholder: 'XXXX-XXXX-XXXX',
      registration: 'Registro',
      spotNumber: 'Plaza',
      legendAvailable: 'Disponible',
      legendBooked: 'Reservado',
      legendSelected: 'Seleccionado',
      sending: 'Enviando...',
      sent: '¡Enviado!',
      error: 'Error',
      adminApproval: 'La aprobación es otorgada exclusivamente por el administrador.',
      submitProof: 'Enviar prueba',
      proofSubtitle: 'Después de la revisión por nuestro administrador, recibirás la activación por correo',
      minFollowersCategory: 'Seguidores mínimos para esta categoría',
      yourEmail: 'Tu dirección de correo',
      profileLink: 'Enlace a tu perfil',
      uploadScreenshot: 'Subir captura de pantalla',
      dragOrClick: 'Arrastra un archivo aquí o haz clic para seleccionar',
      submitForReview: 'Enviar para revisión',
      proofSubmitted: '¡Prueba enviada!',
      totalReach: 'Alcance Total',
      followers: 'Seguidores',
      updatedMonthly: 'Actualizado el 1 de cada mes'
    }
  },
  aboutUs: {
    de: { title: 'Über ALL INFLUENCER', paragraphs: ['ALL INFLUENCER ist die erste und exklusivste Plattform, die Premium-Influencer mit weltweit führenden Marken verbindet.', 'Unsere Mission ist es, eine einzigartige Bühne für die einflussreichsten Content Creator zu schaffen und ihnen die Sichtbarkeit zu bieten, die sie verdienen.', 'Mit strengen Qualitätsstandards und einem kuratierten Auswahlprozess garantieren wir höchste Exklusivität für unsere Mitglieder und Partner.'] },
    en: { title: 'About ALL INFLUENCER', paragraphs: ['ALL INFLUENCER is the first and most exclusive platform connecting premium influencers with world-leading brands.', 'Our mission is to create a unique stage for the most influential content creators and provide them with the visibility they deserve.', 'With strict quality standards and a curated selection process, we guarantee the highest exclusivity for our members and partners.'] },
    es: { title: 'Sobre ALL INFLUENCER', paragraphs: ['ALL INFLUENCER es la primera y más exclusiva plataforma que conecta influencers premium con marcas líderes a nivel mundial.', 'Nuestra misión es crear un escenario único para los creadores de contenido más influyentes y brindarles la visibilidad que merecen.', 'Con estrictos estándares de calidad y un proceso de selección curado, garantizamos la máxima exclusividad para nuestros miembros y socios.'] }
  },
  legalTexts: { privacy: { de: '', en: '', es: '' }, terms: { de: '', en: '', es: '' }, imprint: { de: '', en: '', es: '' } },
  goldenClientsData: []
};

// ============================================================================
// CONTEXT
// ============================================================================

const ConfigContext = createContext(null);
const LanguageContext = createContext(null);
const ModalContext = createContext(null);
const useConfig = () => useContext(ConfigContext);
const useLanguage = () => useContext(LanguageContext);
const useModal = () => useContext(ModalContext);

const deepMerge = (target, source) => {
  const output = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
};

// ============================================================================
// HELPERS
// ============================================================================

const formatFollowers = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num?.toString() || '0';
};

const formatFollowersAnimated = (num) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toLocaleString('de-DE');
};

const formatPrice = (price) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);

const getMonthNames = (t) => [t.january, t.february, t.march, t.april, t.may, t.june, t.july, t.august, t.september, t.october, t.november, t.december];

const generateGoldenClientSpots = (existingData = []) => {
  const spots = [];
  for (let i = 1; i <= 50; i++) {
    const existing = existingData.find(c => c.id === `gc${i}` || c.spotNumber === i);
    spots.push(existing ? { ...existing, spotNumber: i } : { id: `gc${i}`, spotNumber: i, name: null, logo: null, image: null, description: { de: '', en: '', es: '' }, partnerSince: null, details: { de: '', en: '', es: '' } });
  }
  return spots;
};

// Berechne Gesamtzahl der Follower
const calculateTotalFollowers = (influencerData) => {
  let total = 0;
  if (influencerData) {
    Object.values(influencerData).forEach(category => {
      if (Array.isArray(category)) {
        category.forEach(influencer => {
          total += influencer.followers || 0;
        });
      }
    });
  }
  return total;
};

// ============================================================================
// EMAIL API HELPER
// ============================================================================

const sendEmail = async (type, data) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data: { ...data, timestamp: new Date().toLocaleString('de-DE') } })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Fehler beim Senden');
    return { success: true, id: result.id };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

// ============================================================================
// ANIMATED COUNTER
// ============================================================================

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (value === 0) {
      setCount(0);
      return;
    }
    
    let start = 0;
    const end = value;
    const incrementTime = duration / 100;
    const increment = end / 100;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <>{formatFollowersAnimated(count)}</>;
};

// ============================================================================
// TOTAL FOLLOWERS DISPLAY (Entwurf 4 - Goldene Box + Weltkugel)
// ============================================================================

const TotalFollowersDisplay = ({ total }) => {
  const { t } = useLanguage();
  
  if (total === 0) return null;
  
  return (
    <div className="mt-10 flex justify-center">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-2xl blur opacity-30 animate-pulse" />
        
        {/* Main Box */}
        <div className="relative bg-black/80 backdrop-blur-xl border border-amber-400/50 rounded-2xl px-10 py-8">
          {/* Globe Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-400/30">
              <svg className="w-9 h-9 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
          </div>
          
          <p className="text-amber-400/80 text-sm font-medium tracking-widest uppercase mb-3 text-center">
            {t.totalReach}
          </p>
          
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              <AnimatedCounter value={total} />
            </span>
            <span className="text-amber-400/60 text-lg">{t.followers}</span>
          </div>
          
          <p className="text-gray-500 text-xs mt-4 text-center">
            {t.updatedMonthly}
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// HEADER
// ============================================================================

const Header = () => {
  const { config } = useConfig();
  const { lang, setLang, t } = useLanguage();
  const { openModal } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center font-bold text-black text-sm">AI</div>
          <div>
            <div className="font-bold text-lg tracking-tight">{config.site.name}</div>
            <div className="text-[10px] text-amber-400/80 tracking-widest uppercase">Premium Network</div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="text-white hover:text-amber-400 transition-colors">{t.home.toUpperCase()}</a>
          <button onClick={() => openModal('about')} className="text-gray-400 hover:text-white transition-colors">{t.aboutUs.toUpperCase()}</button>
          <button onClick={() => openModal('contact')} className="text-gray-400 hover:text-white transition-colors">{t.contact.toUpperCase()}</button>
          <button onClick={() => openModal('work')} className="text-gray-400 hover:text-white transition-colors">{t.workWithUs.toUpperCase()}</button>
        </nav>
        
        <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2">
            <button className="text-gray-400 hover:text-white text-sm px-2 py-1">{t.login}</button>
            <button className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-lg">{t.register}</button>
          </div>
          
          <div className="flex items-center gap-1">
            {['de', 'en', 'es'].map(l => (
              <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${lang === l ? 'bg-amber-400 text-black' : 'text-gray-400 hover:text-white'}`}>{l.toUpperCase()}</button>
            ))}
          </div>
          
          <button className="md:hidden p-2 hover:bg-white/10 rounded-lg" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-black/95 border-t border-white/10 px-4 py-4">
          <div className="flex flex-col gap-3">
            <a href="#" className="text-white py-2">{t.home}</a>
            <button onClick={() => { openModal('about'); setMenuOpen(false); }} className="text-gray-400 py-2 text-left">{t.aboutUs}</button>
            <button onClick={() => { openModal('contact'); setMenuOpen(false); }} className="text-gray-400 py-2 text-left">{t.contact}</button>
            <button onClick={() => { openModal('work'); setMenuOpen(false); }} className="text-gray-400 py-2 text-left">{t.workWithUs}</button>
            <div className="border-t border-white/10 pt-3 mt-2 flex gap-2">
              <button className="flex-1 py-2 text-gray-400">{t.login}</button>
              <button className="flex-1 py-2 bg-amber-400 text-black font-semibold rounded-lg">{t.register}</button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

// ============================================================================
// HERO SECTION (MIT TOTAL FOLLOWERS DISPLAY)
// ============================================================================

const HeroSection = () => {
  const { config } = useConfig();
  const { t } = useLanguage();
  const totalFollowers = calculateTotalFollowers(config.influencerData);
  
  return (
    <section className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-5"><div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} /></div>
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">{t.heroTitle}</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">{t.heroSubtitle}</p>
        
        {/* Total Followers Display */}
        <TotalFollowersDisplay total={totalFollowers} />
      </div>
    </section>
  );
};

// ============================================================================
// MARQUEE BANNER
// ============================================================================

const MarqueeBanner = () => {
  const { config } = useConfig();
  if (!config.marquee?.enabled) return null;
  const brands = [...config.marquee.brands, ...config.marquee.brands];
  return (
    <div className="bg-black border-y border-white/10 py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee" style={{ animationDuration: `${config.marquee.speed}s` }}>
        {brands.map((brand, i) => <span key={i} className="mx-10 text-gray-400 text-sm font-medium tracking-[0.2em]">{brand}</span>)}
      </div>
    </div>
  );
};

// ============================================================================
// NAVIGATION BUTTON
// ============================================================================

const NavButton = ({ direction, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className={`absolute ${direction === 'left' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg transition-all ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}`}>
    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} /></svg>
  </button>
);

// ============================================================================
// CALENDAR MODAL (AB 2026)
// ============================================================================

const CalendarModal = ({ spot, category, onClose, onBook, onInvitationCode }) => {
  const { config } = useConfig();
  const { t } = useLanguage();
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [sending, setSending] = useState(false);
  const cat = config.categories[category];
   const monthNames = getMonthNames(t);
  const bookedMonths = spot.bookedMonths || [];
  
  const toggleMonth = (idx) => {
    if (bookedMonths.includes(idx)) return;
    setSelectedMonths(prev => {
      if (prev.includes(idx)) return prev.filter(m => m !== idx);
      if (prev.length >= 3) return prev;
      return [...prev, idx].sort((a, b) => a - b);
    });
  };
  
  const handleBook = async () => {
    if (selectedMonths.length === 0) return;
    setSending(true);
    const fullMonthNames = [t.january, t.february, t.march, t.april, t.may, t.june, t.july, t.august, t.september, t.october, t.november, t.december];
    const categoryNames = { diamond: 'Diamond', platinum: 'Platin', gold: 'Gold', risingStar: 'Rising Star' };
    await sendEmail('influencer_booking', {
      category: categoryNames[category],
      rank: spot.rank,
      months: selectedMonths.map(m => fullMonthNames[m]).join(', ') + ' 2026',
      totalPrice: formatPrice(cat.price * selectedMonths.length)
    });
    setSending(false);
    onBook(selectedMonths);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/10 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-white">{t.selectMonths}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <p className="text-gray-500 text-sm mb-4">{t.maxMonths}</p>
        
        <h3 className="text-lg font-bold mb-3 text-white">2026</h3>
        
        <div className="grid grid-cols-4 gap-2 mb-4">
          {monthNames.map((month, idx) => {
            const isBooked = bookedMonths.includes(idx);
            const isSelected = selectedMonths.includes(idx);
            return (
              <button key={idx} onClick={() => toggleMonth(idx)} disabled={isBooked}
                className={`py-3 px-2 rounded-lg text-sm font-medium transition-all ${isBooked ? 'bg-red-500/30 text-red-400 cursor-not-allowed' : isSelected ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                {month}
              </button>
                 );
          })}
        </div>
        
        <div className="flex gap-4 mb-4 text-xs">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-gray-700" /><span className="text-gray-400">{t.legendAvailable}</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500/50" /><span className="text-gray-400">{t.legendBooked}</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500" /><span className="text-gray-400">{t.legendSelected}</span></div>
        </div>
        
        {selectedMonths.length > 0 && (
          <div className="mb-4 p-4 bg-gray-800 rounded-xl">
            <p className="text-gray-400 text-sm">{selectedMonths.length} {t.selectedMonths}: {selectedMonths.map(m => monthNames[m]).join(', ')}</p>
            <p className="text-white text-2xl font-bold mt-1">{formatPrice(cat.price)} × {selectedMonths.length} = {formatPrice(cat.price * selectedMonths.length)}</p>
          </div>
        )}
        
        <button onClick={handleBook} disabled={selectedMonths.length === 0 || sending}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-colors mb-3 ${selectedMonths.length > 0 && !sending ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
          {sending ? t.sending : t.bookNow}
        </button>

        <p className="text-center text-gray-500 mb-3">{t.or}</p>
        
        <button onClick={onInvitationCode} className="w-full py-4 rounded-lg font-semibold border-2 border-amber-400 text-amber-400 hover:bg-amber-400/10 transition-colors">
          {t.invitationCode}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// PROOF MODAL (Nachweis einreichen)
// ============================================================================

const ProofModal = ({ category, spot, onClose }) => {
    const { config } = useConfig();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [file, setFile] = useState(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  
  const cat = config.categories[category];
  const categoryNames = { diamond: 'Diamond', platinum: 'Platin', gold: 'Gold', risingStar: 'Rising Star' };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !profileLink) return;

        setSending(true);
    
    let fileData = null;
    if (file) {
      const reader = new FileReader();
      fileData = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }
    
    const result = await sendEmail('influencer_proof', {
      category: categoryNames[category],
      rank: spot.rank,
      minFollowers: formatFollowers(cat.minFollowers),
      email: email,
      profileLink: profileLink,
      fileName: file?.name || 'Kein Screenshot',
      fileData: fileData
    });
    
    setSending(false);
    if (result.success) {
      setStatus('success');
      setTimeout(() => onClose(), 2000);
    } else {
      setStatus('error');
    }
  };
  
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/10 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-white">{t.submitProof}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-400 text-sm mb-4">{t.proofSubtitle}</p>
        
        <div className="bg-amber-400/20 border border-amber-400/50 rounded-lg p-3 mb-4">
          <p className="text-amber-400 font-medium text-center">
            {t.minFollowersCategory}: {formatFollowers(cat.minFollowers)}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t.yourEmail}</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              placeholder="deine@email.com"
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-amber-400 focus:outline-none text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t.profileLink}</label>
            <input 
              type="url" 
              value={profileLink} 
              onChange={e => setProfileLink(e.target.value)}
              placeholder="https://instagram.com/deinprofil"
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-amber-400 focus:outline-none text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t.uploadScreenshot}</label>
            <div 
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onClick={() => document.getElementById('proofFileInput').click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${file ? 'border-green-500 bg-green-500/10' : 'border-gray-600 hover:border-amber-400'}`}
            >
              {file ? (
                <>
                  <svg className="w-8 h-8 mx-auto mb-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-500">{file.name}</p>
                </>
              ) : (
                <>
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">{t.dragOrClick}</p>
                </>
              )}
              <input id="proofFileInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={!email || !profileLink || sending}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
              email && profileLink && !sending 
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black' 
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {sending ? t.sending : status === 'success' ? t.proofSubmitted : t.submitForReview}
          </button>
          
          {status === 'error' && <p className="text-red-400 text-center text-sm">{t.error}</p>}
        </form>
      </div>
    </div>
  );
};

// ============================================================================
// INVITATION CODE MODAL (für Influencer UND Goldene Kunden)
// ============================================================================

const InvitationCodeModal = ({ type, data, onClose, onSuccess }) => {
  const { t } = useLanguage();
  const [code, setCode] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  
  const handleCodeChange = (e) => {
    let value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (value.length > 12) value = value.slice(0, 12);
    const parts = [];
    for (let i = 0; i < value.length; i += 4) parts.push(value.slice(i, i + 4));
    setCode(parts.join('-'));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length < 14) return;
    
    setSending(true);
    setStatus(null);
    
    let result;
    if (type === 'influencer') {
      const categoryNames = { diamond: 'Diamond', platinum: 'Platin', gold: 'Gold', risingStar: 'Rising Star' };
      result = await sendEmail('influencer_invitation', {
        category: categoryNames[data.category],
        rank: data.rank,
        code: code
      });
    } else {
           result = await sendEmail('golden_client_invitation', {
        spotNumber: data.spotNumber,
        clientName: data.name,
        code: code
      });
    }
    
    setSending(false);
    if (result.success) {
      setStatus('success');
      setTimeout(() => {
        if (onSuccess) onSuccess();
        else onClose();
      }, 1500);
    } else {
      setStatus('error');
    }
  };
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-amber-400/30" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-amber-400">{t.invitationOnly}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t.enterInvitationCode}</label>
            <input type="text" value={code} onChange={handleCodeChange} placeholder={t.codePlaceholder}
              className="w-full px-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-center text-xl tracking-widest font-mono focus:border-amber-400 focus:outline-none text-white" maxLength={14} />
          </div>
          
          <button type="submit" disabled={code.length < 14 || sending}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${code.length >= 14 && !sending ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}>
            {sending ? t.sending : status === 'success' ? t.sent : t.registration}
          </button>
          
          {status === 'error' && <p className="text-red-400 text-center text-sm">{t.error}</p>}
        </form>
      </div>
    </div>
  );
};

// ============================================================================
// INFLUENCER SPOT
// ============================================================================

const InfluencerSpot = ({ spot, category, isMobile }) => {
  const { config } = useConfig();
  const { t } = useLanguage();
  const { openCalendar } = useModal();
  const cat = config.categories[category];
  
  return (
    <article onClick={() => openCalendar(spot, category)} className="group relative cursor-pointer" role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openCalendar(spot, category); }}>
      <div className="absolute -top-2 -left-2 z-10 w-8 h-8 rounded-full bg-black border-2 border-amber-400 flex items-center justify-center font-bold text-amber-400 text-sm shadow-lg">{spot.rank}</div>
      <div className={`relative ${isMobile ? 'aspect-video' : 'aspect-square'} rounded-2xl overflow-hidden bg-gradient-to-br ${cat.gradient} border border-white/20 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:border-white/40`}>
        {spot.image ? <><img src={spot.image} alt={spot.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /></> : <div className="absolute inset-0 flex items-center justify-center"><span className="text-5xl md:text-6xl opacity-60">{cat.icon}</span></div>}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          {spot.name && <h3 className="font-semibold text-white text-sm truncate">{spot.name}</h3>}
          {spot.followers && <p className="text-white/80 text-xs">{formatFollowers(spot.followers)} Followers</p>}
          {!spot.booked && <p className="text-amber-400 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{t.clickToBook}</p>}
        </div>
        {spot.booked && <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-500/90 rounded text-[10px] font-medium">{t.booked}</div>}
      </div>
    </article>
  );
};

      // ============================================================================
// CATEGORY ROW
// ============================================================================

const CategoryRow = ({ category, spots }) => {
  const { config } = useConfig();
  const { lang, t } = useLanguage();
  const [page, setPage] = useState(0);
  const cat = config.categories[category];
  const [touchStart, setTouchStart] = useState(null);
  const [layout, setLayout] = useState({ cols: 3, isMobile: false });
  
  useEffect(() => {
        const checkLayout = () => {
      const w = window.innerWidth, h = window.innerHeight, isPortrait = h > w;
      if (w < 640) setLayout({ cols: 1, isMobile: true });
      else if (w < 1024 && isPortrait) setLayout({ cols: 2, isMobile: false });
      else setLayout({ cols: 3, isMobile: false });
    };
    checkLayout();
    window.addEventListener('resize', checkLayout);
    window.addEventListener('orientationchange', checkLayout);
    return () => { window.removeEventListener('resize', checkLayout); window.removeEventListener('orientationchange', checkLayout); };
  }, []);
  
  const itemsPerPage = layout.isMobile ? 3 : layout.cols;
  const totalPages = Math.ceil(spots.length / itemsPerPage);
  const getVisibleItems = () => {
    if (layout.isMobile) return spots.slice(page * 3, page * 3 + 3);
    if (page === totalPages - 1 && spots.length % itemsPerPage !== 0 && spots.length >= itemsPerPage) return spots.slice(Math.max(0, spots.length - itemsPerPage), spots.length);
    return spots.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  };

  const handleTouchStart = e => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = e => { if (touchStart === null) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0 && page < totalPages - 1) setPage(p => p + 1); else if (diff < 0 && page > 0) setPage(p => p - 1); } setTouchStart(null); };
  
  const titles = { diamond: { de: 'Diamond', en: 'Diamond', es: 'Diamante' }, platinum: { de: 'Platin', en: 'Platinum', es: 'Platino' }, gold: { de: 'Gold', en: 'Gold', es: 'Oro' }, risingStar: { de: 'Rising Star', en: 'Rising Star', es: 'Rising Star' } };
  
  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6"><h2 className="font-serif text-2xl md:text-3xl font-bold mb-1 flex items-center justify-center gap-3"><span>{cat.icon}</span><span>{titles[category][lang]}</span></h2><p className="text-gray-500 text-xs md:text-sm">{t.minFollowers}: {formatFollowers(cat.minFollowers)} • {formatPrice(cat.price)}{t.perMonth}</p></div>
        <div className="relative px-6 md:px-10" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {totalPages > 1 && !layout.isMobile && <><NavButton direction="left" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} /><NavButton direction="right" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} /></>}
          <div className={`grid gap-4 md:gap-5 ${layout.isMobile ? 'grid-cols-1' : layout.cols === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>{getVisibleItems().map(spot => <InfluencerSpot key={spot.id} spot={spot} category={category} isMobile={layout.isMobile} />)}</div>
          {totalPages > 1 && <div className="flex justify-center gap-1.5 mt-5">{Array.from({ length: totalPages }).map((_, i) => <button key={i} onClick={() => setPage(i)} className={`h-1.5 rounded-full transition-all ${i === page ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/20 hover:bg-white/40'}`} />)}</div>}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// GOLDEN CLIENT SPOT
// ============================================================================

const GoldenClientSpot = ({ client, onClick }) => {
  const { t } = useLanguage();
  const hasContent = client.name || client.image || client.logo;
  
  return (
    <div onClick={onClick} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-amber-400/30 hover:border-amber-400 bg-black transition-all" role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}>
      {client.image && <><img src={client.image} alt={client.name} className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-black/60" /></>}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        {client.logo && <img src={client.logo} alt={client.name} className="h-10 md:h-12 object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity mb-3" onError={e => e.target.style.display = 'none'} />}
        <h3 className="font-semibold text-white text-sm text-center">{client.name || `${t.spotNumber} ${client.spotNumber}`}</h3>
        {!hasContent && <div className="mt-2 w-8 h-8 rounded-full border-2 border-dashed border-amber-400/40 flex items-center justify-center"><span className="text-amber-400/60 text-lg">+</span></div>}
      </div>
    </div>
  );
};

// ============================================================================
// GOLDEN CLIENTS SECTION
// ============================================================================

const GoldenClientsSection = () => {
  const { config } = useConfig();
  const { lang, t } = useLanguage();
  const [selectedClient, setSelectedClient] = useState(null);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  
  const allSpots = generateGoldenClientSpots(config.goldenClientsData || []);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(allSpots.length / itemsPerPage);
  const visibleClients = (page === totalPages - 1 && allSpots.length % itemsPerPage !== 0) 
  ? allSpots.slice(allSpots.length - itemsPerPage, allSpots.length) 
  : allSpots.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  
  const handleTouchStart = e => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = e => { if (touchStart === null) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0 && page < totalPages - 1) setPage(p => p + 1); else if (diff < 0 && page > 0) setPage(p => p - 1); } setTouchStart(null); };
  
  return (
       <>
      <section className="py-12 px-4 mt-8 bg-gradient-to-b from-black via-gray-950 to-black border-y border-amber-400/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8"><h2 className="font-serif text-2xl md:text-3xl font-bold text-amber-400 flex items-center justify-center gap-3 mb-2"><span>🏅</span><span>{t.ourClients}</span></h2><p className="text-gray-500 text-sm">{t.exclusiveSpots}</p></div>
          <div className="relative px-6 md:px-10" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {totalPages > 1 && <><NavButton direction="left" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} /><NavButton direction="right" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} /></>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{visibleClients.map(client => <GoldenClientSpot key={client.id} client={client} onClick={() => setSelectedClient(client)} />)}</div>
            {totalPages > 1 && <div className="flex justify-center gap-1.5 mt-5">{Array.from({ length: totalPages }).map((_, i) => <button key={i} onClick={() => setPage(i)} className={`h-1.5 rounded-full transition-all ${i === page ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/20'}`} />)}</div>}
          </div>
        </div>
      </section>
      
      {selectedClient && !showInvitationModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedClient(null)}>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-gray-900 border-l border-amber-400/30 animate-slideIn overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="relative h-48 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
              {selectedClient.image && <><img src={selectedClient.image} alt={selectedClient.name} className="absolute inset-0 w-full h-full object-cover opacity-50" /><div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" /></>}
              {selectedClient.logo && <img src={selectedClient.logo} alt={selectedClient.name} className="relative h-16 object-contain filter brightness-0 invert" />}
              <button onClick={() => setSelectedClient(null)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg bg-black/30 text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">{selectedClient.name || `${t.spotNumber} ${selectedClient.spotNumber}`}</h3>
              {selectedClient.description?.[lang] && <p className="text-amber-400 mb-4">{selectedClient.description[lang]}</p>}
              <div className="h-px bg-gradient-to-r from-amber-400/50 to-transparent mb-4" />
              {selectedClient.partnerSince && <p className="text-gray-300 text-sm mb-2">{t.partnerSince}: {selectedClient.partnerSince}</p>}
              {selectedClient.details?.[lang] && <p className="text-gray-400 leading-relaxed mb-6">{selectedClient.details[lang]}</p>}
              <button onClick={() => setShowInvitationModal(true)} className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-semibold rounded-lg transition-all text-lg">{t.invitationCode}</button>
            </div>
          </div>
        </div>
      )}
      
      {showInvitationModal && <InvitationCodeModal type="golden_client" data={selectedClient} onClose={() => { setShowInvitationModal(false); setSelectedClient(null); }} />}
    </>
  );
};

// ============================================================================
// FOOTER
// ============================================================================

const Footer = () => {
  const { config } = useConfig();
  const { t } = useLanguage();
  const { openModal } = useModal();

    const socialIcons = { instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>, youtube: <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>, x: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>, facebook: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>, tiktok: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/> };

  return (
    <footer className="bg-black border-t border-white/10 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center font-bold text-black text-sm">AI</div><div><div className="font-bold text-lg">{config.site.name}</div><div className="text-xs text-gray-500">{config.site.tagline}</div></div></div>
        <div className="flex justify-center gap-4 mb-8">{Object.entries(config.socialLinks).map(([platform, url]) => <a key={platform} href={url || '#'} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-400/20 transition-colors ${!url && 'opacity-30 pointer-events-none'}`}><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{socialIcons[platform]}</svg></a>)}</div>
        <div className="text-center mb-6"><h4 className="text-sm font-semibold mb-3">Quick Links</h4><nav className="flex flex-wrap justify-center gap-6 text-sm"><button onClick={() => openModal('about')} className="text-gray-400 hover:text-white">{t.aboutUs}</button><button onClick={() => openModal('contact')} className="text-gray-400 hover:text-white">{t.contact}</button><button onClick={() => openModal('work')} className="text-gray-400 hover:text-white">{t.workWithUs}</button></nav></div>
        <nav className="flex flex-wrap justify-center gap-6 mb-6 text-sm"><button onClick={() => openModal('privacy')} className="text-gray-400 hover:text-white">{t.privacy}</button><button onClick={() => openModal('terms')} className="text-gray-400 hover:text-white">{t.terms}</button><button onClick={() => openModal('imprint')} className="text-gray-400 hover:text-white">{t.imprint}</button></nav>
        <p className="text-center text-gray-600 text-xs">© {new Date().getFullYear()} {config.site.name}</p>
      </div>
    </footer>
  );
};

// ============================================================================
// FOOTER MODAL (MIT INTERAKTIVEN FORMULAREN)
// ============================================================================

    const FooterModal = ({ type, onClose }) => {
  const { config } = useConfig();
  const { lang, t } = useLanguage();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', position: '', motivation: '' });
  
  const titles = { about: t.aboutUs, contact: t.contact, work: t.workWithUs, privacy: t.privacy, terms: t.terms, imprint: t.imprint };
  
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    const result = await sendEmail('contact', { name: formData.name, email: formData.email, message: formData.message });
    setSending(false);
    if (result.success) { setStatus('success'); setTimeout(() => onClose(), 1500); }
    else setStatus('error');
  };
  
  const handleWorkSubmit = async (e) => {
        e.preventDefault();
    setSending(true);
    setStatus(null);
    const result = await sendEmail('application', { name: formData.name, email: formData.email, position: formData.position, motivation: formData.motivation });
    setSending(false);
    if (result.success) { setStatus('success'); setTimeout(() => onClose(), 1500); }
    else setStatus('error');
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto border border-white/10" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          {type === 'about' ? <div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center font-bold text-black text-sm">AI</div><h2 className="text-lg font-bold text-white">{titles[type]}</h2></div> : <h2 className="text-lg font-bold text-white">{titles[type]}</h2>}
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>

             {type === 'about' && <div>{(config.aboutUs?.[lang]?.paragraphs || []).map((p, i) => <p key={i} className="text-gray-300 mb-4">{p}</p>)}<h3 className="font-semibold text-white mt-6 mb-4">{t.ourCategories}</h3><div className="grid grid-cols-2 gap-3">{Object.entries(config.categories).map(([key, cat]) => { const names = { diamond: { de: 'Diamond', en: 'Diamond', es: 'Diamante' }, platinum: { de: 'Platin', en: 'Platinum', es: 'Platino' }, gold: { de: 'Gold', en: 'Gold', es: 'Oro' }, risingStar: { de: 'Rising Star', en: 'Rising Star', es: 'Rising Star' } }; return <div key={key} className={`p-4 rounded-xl bg-gradient-to-br ${cat.gradient}`}><span className="text-2xl">{cat.icon}</span><h4 className="font-semibold text-white mt-2">{names[key][lang]}</h4><p className="text-white/80 text-xs">{t.minFollowers}: {formatFollowers(cat.minFollowers)}</p><p className="text-white/80 text-xs">{formatPrice(cat.price)}{t.perMonth}</p></div>; })}</div></div>}
        
        {type === 'imprint' && <pre className="text-gray-300 whitespace-pre-wrap font-sans">{config.legalTexts?.imprint?.[lang] || `${config.impressum.name}\n${config.impressum.street}\n${config.impressum.city}\n\nTel: ${config.impressum.mobile}\nE-Mail: ${config.impressum.email}`}</pre>}
        
        {(type === 'privacy' || type === 'terms') && <p className="text-gray-400 italic">{config.legalTexts?.[type]?.[lang] || (lang === 'de' ? 'Dieser Bereich kann vom Administrator bearbeitet werden.' : lang === 'en' ? 'This section can be edited by the administrator.' : 'Esta sección puede ser editada por el administrador.')}</p>}
        
        {type === 'contact' && (
          <form className="space-y-4" onSubmit={handleContactSubmit}>
            <input type="text" placeholder={t.name} required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-400 focus:outline-none text-white " />
            <input type="email" placeholder={t.email} required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-400 focus:outline-none text-white" />
            <textarea placeholder={t.message} rows={4} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-400 focus:outline-none resize-none text-white" />
            <button type="submit" disabled={sending} className={`w-full py-3 rounded-lg font-semibold transition-colors ${sending ? 'bg-gray-600 text-gray-400' : status === 'success' ? 'bg-green-500 text-white' : 'bg-amber-400 hover:bg-amber-500 text-black'}`}>
              {sending ? t.sending : status === 'success' ? t.sent : t.send}
            </button>
            {status === 'error' && <p className="text-red-400 text-center text-sm">{t.error}</p>}
          </form>
               )}
        
        {type === 'work' && (
          <form className="space-y-4" onSubmit={handleWorkSubmit}>
            <input type="text" placeholder={t.name} required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-400 focus:outline-none text-white" />
            <input type="email" placeholder={t.email} required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-400 focus:outline-none text-white" />
            <select required value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-400 focus:outline-none text-white">
              <option value="">{t.selectPosition}</option>
              <option value={t.marketing}>{t.marketing}</option>
              <option value={t.technology}>{t.technology}</option>
              <option value={t.content}>{t.content}</option>
              <option value={t.sales}>{t.sales}</option>
              <option value={t.other}>{t.other}</option>
            </select>
                      <textarea placeholder={t.motivation} rows={3} required value={formData.motivation} onChange={e => setFormData({...formData, motivation: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-400 focus:outline-none resize-none text-white" />
            <button type="submit" disabled={sending} className={`w-full py-3 rounded-lg font-semibold transition-colors ${sending ? 'bg-gray-600 text-gray-400' : status === 'success' ? 'bg-green-500 text-white' : 'bg-amber-400 hover:bg-amber-500 text-black'}`}>
              {sending ? t.sending : status === 'success' ? t.sent : t.submitApplication}
            </button>
            {status === 'error' && <p className="text-red-400 text-center text-sm">{t.error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

const App = () => {
  const { config, loading } = useConfig();
  const generateSpots = (category) => { const count = config.categories[category]?.spots || 3; return Array.from({ length: count }, (_, i) => ({ id: `${category}-${i + 1}`, rank: i + 1, name: null, followers: null, image: null, booked: false, bookedMonths: [] })); };
  
  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Header /><HeroSection /><MarqueeBanner />
      <main><CategoryRow category="diamond" spots={generateSpots('diamond')} /><CategoryRow category="platinum" spots={generateSpots('platinum')} /><CategoryRow category="gold" spots={generateSpots('gold')} /><CategoryRow category="risingStar" spots={generateSpots('risingStar')} /><GoldenClientsSection /></main>
      <Footer />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');.font-serif{font-family:'Playfair Display',serif;}body{font-family:'Inter',sans-serif;}@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}.animate-marquee{animation:marquee linear infinite;}@keyframes slideIn{from{transform:translateX(100%);}to{transform:translateX(0);}}.animate-slideIn{animation:slideIn 0.3s ease-out;}`}</style>
    </div>
  );
};

// ============================================================================
// MODAL PROVIDER
// ============================================================================

const ModalProvider = ({ children }) => {
  const { t } = useLanguage();
  const [footerModal, setFooterModal] = useState(null);
  const [calendarModal, setCalendarModal] = useState(null);
  const [invitationModal, setInvitationModal] = useState(null);
  const [proofModal, setProofModal] = useState(null);
  
  const openModal = useCallback(type => setFooterModal(type), []);
  const closeModal = useCallback(() => setFooterModal(null), []);
  const openCalendar = useCallback((spot, category) => setCalendarModal({ spot, category }), []);
  const closeCalendar = useCallback(() => setCalendarModal(null), []);
  
  const handleBook = useCallback((months) => {
    const currentCalendar = calendarModal;
    setCalendarModal(null);
    setProofModal({ category: currentCalendar.category, spot: currentCalendar.spot });
  }, [calendarModal]);

    const handleInvitationCode = useCallback(() => {
    if (calendarModal) {
      const currentCalendar = calendarModal;
      setCalendarModal(null);
      setInvitationModal({ 
        type: 'influencer', 
        data: { category: currentCalendar.category, rank: currentCalendar.spot.rank },
        onSuccess: () => {
          setInvitationModal(null);
          setProofModal({ category: currentCalendar.category, spot: currentCalendar.spot });
        }
      });
    }
  }, [calendarModal]);
  
  return (
       <ModalContext.Provider value={{ openModal, closeModal, openCalendar, closeCalendar }}>
      {children}
      {footerModal && <FooterModal type={footerModal} onClose={closeModal} />}
      {calendarModal && <CalendarModal spot={calendarModal.spot} category={calendarModal.category} onClose={closeCalendar} onBook={handleBook} onInvitationCode={handleInvitationCode} />}
      {invitationModal && <InvitationCodeModal type={invitationModal.type} data={invitationModal.data} onClose={() => setInvitationModal(null)} onSuccess={invitationModal.onSuccess} />}
      {proofModal && <ProofModal category={proofModal.category} spot={proofModal.spot} onClose={() => setProofModal(null)} />}
    </ModalContext.Provider>
  );
};

// ============================================================================
// EXPORT
// ============================================================================

export default function InfluencerPlatformV4() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('de');
  const [loiModalOpen, setLoiModalOpen] = useState(false);
  
  useEffect(() => { fetch('/config.json').then(res => res.ok ? res.json() : Promise.reject()).then(ext => setConfig(deepMerge(DEFAULT_CONFIG, ext))).catch(() => console.warn('Using default config')).finally(() => setLoading(false)); }, []);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('loi') === 'true') {
      setLoiModalOpen(true);
      const langParam = urlParams.get('lang');
      if (langParam && ['de', 'en', 'es'].includes(langParam)) {
        setLang(langParam);
      }
    }
  }, []);
  const t = config.translations[lang] || config.translations.de;
  
return (
    <ConfigContext.Provider value={{ config, setConfig, loading }}>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        <ModalProvider>
          <App />
          <FounderLOIModal 
            isOpen={loiModalOpen}
            onClose={() => setLoiModalOpen(false)}
            initialLanguage={lang}
          />
        </ModalProvider>
      </LanguageContext.Provider>
    </ConfigContext.Provider>
  );
}
