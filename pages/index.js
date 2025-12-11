import React, { useState } from 'react';
import { 
  Search, 
  Home, 
  Users, 
  Mail, 
  X, 
  Upload, 
  Check, 
  AlertCircle, 
  LogIn, 
  UserPlus, 
  Info, 
  TrendingUp,
  Instagram,
  Youtube,
  Twitter,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Crown,
  Gem
} from 'lucide-react';

const AllInfluencerPlatform = () => {
  // State für Modals
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showWork, setShowWork] = useState(false);
  
  // State für Anzeige
  const [showAllRisingStar, setShowAllRisingStar] = useState(false);
  const [showAllPlatin, setShowAllPlatin] = useState(false);
  const [language, setLanguage] = useState('de');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Übersetzungen
  const translations = {
    de: {
      title: "ALL INFLUENCER",
      subtitle: "Premium Network",
      searchPlaceholder: "Suche nach Name oder Kategorie...",
      diamond: "DIAMOND",
      platin: "PLATIN",
      risingStar: "RISING STAR",
      diamondDesc: "Mindestens 20M auf einer Plattform",
      platinDesc: "Mindestens 10M auf einer Plattform",
      risingStarDesc: "Mindestens 1M auf einer Plattform",
      followers: "Follower",
      monthly: "mtl",
      reserved: "RESERVIERT",
      available: "VERFÜGBAR",
      showAll: "Alle anzeigen",
      showLess: "Weniger anzeigen",
      spots: "Spots",
      login: "Login",
      register: "Registrieren",
      logout: "Abmelden",
      email: "E-Mail",
      password: "Passwort",
      name: "Name",
      confirmPassword: "Passwort bestätigen",
      forgotPassword: "Passwort vergessen?",
      noAccount: "Noch kein Konto?",
      hasAccount: "Bereits ein Konto?",
      nav: { 
        home: "HOME", 
        about: "Über uns", 
        contact: "KONTAKT", 
        work: "ARBEITEN MIT UNS" 
      },
      contactTitle: "Kontaktieren Sie uns",
      contactText: "Haben Sie Fragen? Wir sind für Sie da!",
      contactEmail: "E-Mail: contact@all-influencer.com",
      contactPhone: "Tel: +49 123 456 789",
      contactAddress: "Adresse: Berlin, Deutschland",
      aboutTitle: "Über ALL INFLUENCER",
      aboutText1: "ALL INFLUENCER ist das führende Premium-Netzwerk für Top-Influencer weltweit.",
      aboutText2: "Wir verbinden Marken mit den einflussreichsten Content-Creators der Welt.",
      aboutText3: "Unser exklusives Netzwerk bietet drei Mitgliedschaftsstufen: Diamond, Platin und Rising Star.",
      workTitle: "Arbeiten mit uns",
      workText1: "Werden Sie Teil unseres exklusiven Netzwerks!",
      workText2: "Wir suchen talentierte Influencer mit mindestens 1 Million Followern.",
      workText3: "Bewerben Sie sich jetzt und profitieren Sie von unseren Premium-Partnerschaften.",
      workButton: "Jetzt bewerben",
      privacyTitle: "Datenschutzerklärung",
      termsTitle: "Nutzungsbedingungen",
      footerRights: "Alle Rechte vorbehalten.",
      footerPrivacy: "Datenschutz",
      footerTerms: "AGB",
      footerImprint: "Impressum"
    },
    en: {
      title: "ALL INFLUENCER",
      subtitle: "Premium Network",
      searchPlaceholder: "Search by name or category...",
      diamond: "DIAMOND",
      platin: "PLATINUM",
      risingStar: "RISING STAR",
      diamondDesc: "Minimum 20M on one platform",
      platinDesc: "Minimum 10M on one platform",
      risingStarDesc: "Minimum 1M on one platform",
      followers: "Followers",
      monthly: "mo",
      reserved: "RESERVED",
      available: "AVAILABLE",
      showAll: "Show all",
      showLess: "Show less",
      spots: "Spots",
      login: "Login",
      register: "Register",
      logout: "Logout",
      email: "Email",
      password: "Password",
      name: "Name",
      confirmPassword: "Confirm password",
      forgotPassword: "Forgot password?",
      noAccount: "No account yet?",
      hasAccount: "Already have an account?",
      nav: { 
        home: "HOME", 
        about: "About us", 
        contact: "CONTACT", 
        work: "WORK WITH US" 
      },
      contactTitle: "Contact us",
      contactText: "Have questions? We are here for you!",
      contactEmail: "Email: contact@all-influencer.com",
      contactPhone: "Phone: +49 123 456 789",
      contactAddress: "Address: Berlin, Germany",
      aboutTitle: "About ALL INFLUENCER",
      aboutText1: "ALL INFLUENCER is the leading premium network for top influencers worldwide.",
      aboutText2: "We connect brands with the most influential content creators in the world.",
      aboutText3: "Our exclusive network offers three membership tiers: Diamond, Platinum and Rising Star.",
      workTitle: "Work with us",
      workText1: "Become part of our exclusive network!",
      workText2: "We are looking for talented influencers with at least 1 million followers.",
      workText3: "Apply now and benefit from our premium partnerships.",
      workButton: "Apply now",
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms and Conditions",
      footerRights: "All rights reserved.",
      footerPrivacy: "Privacy",
      footerTerms: "Terms",
      footerImprint: "Imprint"
    },
    es: {
      title: "ALL INFLUENCER",
      subtitle: "Red Premium",
      searchPlaceholder: "Buscar por nombre o categoría...",
      diamond: "DIAMANTE",
      platin: "PLATINO",
      risingStar: "ESTRELLA EMERGENTE",
      diamondDesc: "Mínimo 20M en una plataforma",
      platinDesc: "Mínimo 10M en una plataforma",
      risingStarDesc: "Mínimo 1M en una plataforma",
      followers: "Seguidores",
      monthly: "mes",
      reserved: "RESERVADO",
      available: "DISPONIBLE",
      showAll: "Mostrar todos",
      showLess: "Mostrar menos",
      spots: "Lugares",
      login: "Iniciar sesión",
      register: "Registrarse",
      logout: "Cerrar sesión",
      email: "Correo electrónico",
      password: "Contraseña",
      name: "Nombre",
      confirmPassword: "Confirmar contraseña",
      forgotPassword: "¿Olvidó su contraseña?",
      noAccount: "¿No tiene cuenta?",
      hasAccount: "¿Ya tiene cuenta?",
      nav: { 
        home: "INICIO", 
        about: "Sobre nosotros", 
        contact: "CONTACTO", 
        work: "TRABAJA CON NOSOTROS" 
      },
      contactTitle: "Contáctenos",
      contactText: "¿Tiene preguntas? ¡Estamos aquí para usted!",
      contactEmail: "Email: contact@all-influencer.com",
      contactPhone: "Tel: +49 123 456 789",
      contactAddress: "Dirección: Berlín, Alemania",
      aboutTitle: "Sobre ALL INFLUENCER",
      aboutText1: "ALL INFLUENCER es la red premium líder para los mejores influencers del mundo.",
      aboutText2: "Conectamos marcas con los creadores de contenido más influyentes del mundo.",
      aboutText3: "Nuestra red exclusiva ofrece tres niveles de membresía: Diamante, Platino y Estrella Emergente.",
      workTitle: "Trabaja con nosotros",
      workText1: "¡Forme parte de nuestra red exclusiva!",
      workText2: "Buscamos influencers talentosos con al menos 1 millón de seguidores.",
      workText3: "Solicite ahora y benefíciese de nuestras asociaciones premium.",
      workButton: "Solicitar ahora",
      privacyTitle: "Política de privacidad",
      termsTitle: "Términos y condiciones",
      footerRights: "Todos los derechos reservados.",
      footerPrivacy: "Privacidad",
      footerTerms: "Términos",
      footerImprint: "Aviso legal"
    }
  };

  const t = translations[language];
  // Marken für den Ticker
  const brands = [
    "GUCCI", "PRADA", "LOUIS VUITTON", "DIOR", "CHANEL", 
    "VERSACE", "TESLA", "APPLE", "PUMA", "AUDI", 
    "MARRIOTT", "BMW", "MERCEDES", "ROLEX", "CARTIER"
  ];

  // Diamond Influencer (1 Spot - größte Karte)
  const diamondInfluencers = [
    { 
      id: 1, 
      name: "Elena Martinez", 
      category: "Fashion & Lifestyle", 
      followers: "25M", 
      price: "10.000",
      instagram: "12M",
      youtube: "8M",
      tiktok: "5M",
      reserved: true, 
      emoji: "👑",
      image: null,
      bio: "Internationale Fashion-Ikone und Lifestyle-Expertin"
    }
  ];

  // Platin Influencer (10 Spots - mittlere Karten, 2 pro Reihe)
  const platinInfluencers = [
    { id: 1, name: "Marcus Chen", category: "Tech", followers: "18M", price: "5.000", reserved: true, emoji: "💻", bio: "Tech-Visionär und Startup-Gründer" },
    { id: 2, name: "Sofia Rodriguez", category: "Wellness", followers: "15M", price: "5.000", reserved: true, emoji: "🏋️", bio: "Fitness-Coach und Wellness-Guru" },
    { id: 3, name: "James Wilson", category: "Business", followers: "12M", price: "5.000", reserved: true, emoji: "💼", bio: "Business-Stratege und Keynote-Speaker" },
    { id: 4, name: "Aisha Kumar", category: "Travel", followers: "14M", price: "5.000", reserved: true, emoji: "✈️", bio: "Weltreisende und Abenteuer-Bloggerin" },
    { id: 5, name: "", category: "", followers: "", price: "5.000", reserved: false, emoji: "🔍" },
    { id: 6, name: "", category: "", followers: "", price: "5.000", reserved: false, emoji: "🔍" },
    { id: 7, name: "", category: "", followers: "", price: "5.000", reserved: false, emoji: "🔍" },
    { id: 8, name: "", category: "", followers: "", price: "5.000", reserved: false, emoji: "🔍" },
    { id: 9, name: "", category: "", followers: "", price: "5.000", reserved: false, emoji: "🔍" },
    { id: 10, name: "", category: "", followers: "", price: "5.000", reserved: false, emoji: "🔍" }
  ];
  // Rising Star Emojis für Variation
  const risingStarEmojis = [
    "🚀", "🔥", "⭐", "📸", "🎬", "🎵", "✨", "💡", 
    "🎯", "🎪", "🎨", "🎭", "🎤", "🎧", "📱", "🌟",
    "💫", "🏆", "💎", "🎮", "🎹", "🎸", "🎺", "🎻"
  ];

  // Rising Star Influencer (302 Spots - kleine Karten, 3 pro Reihe)
  const risingStarInfluencers = Array.from({ length: 302 }, (_, i) => {
    const isReserved = i < 45 ? Math.random() > 0.3 : Math.random() > 0.6;
    const categories = ["Lifestyle", "Fashion", "Tech", "Food", "Travel", "Fitness", "Music", "Art", "Comedy", "Education"];
    return {
      id: i + 1,
      name: isReserved ? `Creator ${i + 1}` : "",
      category: isReserved ? categories[i % categories.length] : "",
      followers: isReserved ? `${(Math.floor(Math.random() * 9) + 1)}M` : "",
      price: "250",
      reserved: isReserved,
      emoji: risingStarEmojis[i % risingStarEmojis.length]
    };
  });

  // Suchfilter-Funktion
  const filterInfluencers = (influencers) => {
    if (!searchTerm) return influencers;
    return influencers.filter(inf =>
      inf.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inf.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Gefilterte Listen
  const filteredDiamond = filterInfluencers(diamondInfluencers);
  const filteredPlatin = filterInfluencers(platinInfluencers);
  const filteredRisingStar = filterInfluencers(risingStarInfluencers);

  // Angezeigte Rising Stars (9 oder alle)
  const displayedRisingStars = showAllRisingStar 
    ? filteredRisingStar 
    : filteredRisingStar.slice(0, 9);

  // Angezeigte Platin (4 oder alle)
  const displayedPlatin = showAllPlatin 
    ? filteredPlatin 
    : filteredPlatin.slice(0, 4);
  // Modal-Komponente (wiederverwendbar für alle Popups)
  const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
    if (!isOpen) return null;
    
    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl"
    };
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div 
          className={`bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl w-full ${sizeClasses[size]} max-h-[85vh] overflow-y-auto border border-gray-700 shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full p-1 transition-all"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Influencer-Karte für Diamond (große Karte, 1 pro Reihe)
  const DiamondCard = ({ influencer }) => (
    <div className="group relative bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-purple-900/60 rounded-2xl border-2 border-purple-500/50 hover:border-purple-400 transition-all duration-500 overflow-hidden">
      {influencer.reserved && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
          {t.reserved}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="relative p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="text-7xl md:text-8xl animate-pulse">{influencer.emoji}</div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{influencer.name}</h3>
            <p className="text-purple-300 text-lg mb-1">{influencer.category}</p>
            <p className="text-gray-400 mb-3">{influencer.bio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              <span className="flex items-center gap-1 text-pink-400"><Instagram size={16} /> {influencer.instagram}</span>
              <span className="flex items-center gap-1 text-red-400"><Youtube size={16} /> {influencer.youtube}</span>
              <span className="flex items-center gap-1 text-blue-400"><Twitter size={16} /> {influencer.tiktok}</span>
            </div>
            <p className="text-gray-500 text-sm">{influencer.followers} {t.followers}</p>
            <p className="text-pink-400 font-bold text-2xl mt-3">{influencer.price}€/{t.monthly}</p>
          </div>
        </div>
      </div>
    </div>
  );
// Influencer-Karte für Platin (mittlere Karte, 2 pro Reihe)
  const PlatinCard = ({ influencer }) => (
    <div className="group relative bg-gradient-to-br from-yellow-900/40 via-orange-900/30 to-yellow-900/40 rounded-xl border-2 border-yellow-600/30 hover:border-yellow-500 transition-all duration-300 overflow-hidden">
      {influencer.reserved ? (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
          {t.reserved}
        </div>
      ) : (
        <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
          {t.available}
        </div>
      )}
      <div className="p-4 md:p-6">
        <div className="text-center">
          <div className="text-4xl md:text-5xl mb-3">{influencer.emoji}</div>
          <h3 className="font-bold text-lg text-white mb-1">
            {influencer.name || `#${influencer.id}`}
          </h3>
          {influencer.category && (
            <p className="text-yellow-300/80 text-sm mb-1">{influencer.category}</p>
          )}
          {influencer.followers && (
            <p className="text-gray-500 text-xs mb-2">{influencer.followers} {t.followers}</p>
          )}
          {influencer.bio && (
            <p className="text-gray-400 text-xs mb-3 line-clamp-2">{influencer.bio}</p>
          )}
          <p className="text-yellow-400 font-bold text-lg">{influencer.price}€/{t.monthly}</p>
        </div>
      </div>
    </div>
  );

  // Influencer-Karte für Rising Star (kleine Karte, 3 pro Reihe)
  const RisingStarCard = ({ influencer }) => (
    <div className={`group relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${
      influencer.reserved 
        ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/30 border-green-600/30 hover:border-green-500' 
        : 'bg-gradient-to-br from-gray-800/40 to-gray-900/30 border-gray-700 hover:border-gray-600'
    }`}>
      {influencer.reserved ? (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg z-10">
          {t.reserved}
        </div>
      ) : (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg z-10">
          {t.available}
        </div>
      )}
      <div className="p-3 md:p-4">
        <div className="text-center">
          <div className="text-2xl md:text-3xl mb-2">{influencer.emoji}</div>
          <p className="font-bold text-sm text-white">#{influencer.id}</p>
          {influencer.category && (
            <p className="text-green-300/70 text-xs">{influencer.category}</p>
          )}
          <p className="text-green-400 font-bold text-sm mt-1">{influencer.price}€/{t.monthly}</p>
        </div>
      </div>
    </div>
  );
// Hauptkomponente - Return Statement beginnt hier
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Header / Navigation */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          
          {/* Top Bar - Logo, Buttons, Sprache */}
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-lg md:text-xl font-bold border-2 border-gray-500 shadow-lg">
                AI
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">{t.title}</h1>
                <p className="text-xs text-gray-400 hidden sm:block">{t.subtitle}</p>
              </div>
            </div>
            
            {/* Desktop: Login, Register, Sprache */}
            <div className="hidden md:flex items-center space-x-3">
              <button 
                onClick={() => setShowLogin(true)} 
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-all border border-gray-700"
              >
                <LogIn size={16} />
                <span>{t.login}</span>
              </button>
              <button 
                onClick={() => setShowRegister(true)} 
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-4 py-2 rounded-lg transition-all shadow-lg"
              >
                <UserPlus size={16} />
                <span>{t.register}</span>
              </button>
              <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                {['DE', 'EN', 'ES'].map(lang => (
                  <button 
                    key={lang} 
                    onClick={() => setLanguage(lang.toLowerCase())} 
                    className={`px-3 py-2 text-sm transition-all ${
                      language === lang.toLowerCase() 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mobile: Hamburger Menu */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <ChevronDown size={24} />}
            </button>
          </div>
{/* Mobile Menu (ausgeklappt) */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4 space-y-4">
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }} 
                  className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-all border border-gray-700"
                >
                  <LogIn size={16} />
                  <span>{t.login}</span>
                </button>
                <button 
                  onClick={() => { setShowRegister(true); setMobileMenuOpen(false); }} 
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-4 py-2 rounded-lg transition-all shadow-lg"
                >
                  <UserPlus size={16} />
                  <span>{t.register}</span>
                </button>
              </div>
              <div className="flex justify-center border border-gray-700 rounded-lg overflow-hidden">
                {['DE', 'EN', 'ES'].map(lang => (
                  <button 
                    key={lang} 
                    onClick={() => setLanguage(lang.toLowerCase())} 
                    className={`flex-1 px-3 py-2 text-sm transition-all ${
                      language === lang.toLowerCase() 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <nav className="flex flex-col space-y-2">
                <button onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all px-3 py-2 hover:bg-gray-800 rounded-lg">
                  <Home size={16} /><span>{t.nav.home}</span>
                </button>
                <button onClick={() => { setShowAbout(true); setMobileMenuOpen(false); }} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all px-3 py-2 hover:bg-gray-800 rounded-lg">
                  <Info size={16} /><span>{t.nav.about}</span>
                </button>
                <button onClick={() => { setShowContact(true); setMobileMenuOpen(false); }} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all px-3 py-2 hover:bg-gray-800 rounded-lg">
                  <Mail size={16} /><span>{t.nav.contact}</span>
                </button>
                <button onClick={() => { setShowWork(true); setMobileMenuOpen(false); }} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all px-3 py-2 hover:bg-gray-800 rounded-lg">
                  <Users size={16} /><span>{t.nav.work}</span>
                </button>
              </nav>
            </div>
          )}
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 mt-4">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all">
              <Home size={16} /><span>{t.nav.home}</span>
            </button>
            <button onClick={() => setShowAbout(true)} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all">
              <Info size={16} /><span>{t.nav.about}</span>
            </button>
            <button onClick={() => setShowContact(true)} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all">
              <Mail size={16} /><span>{t.nav.contact}</span>
            </button>
            <button onClick={() => setShowWork(true)} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all">
              <Users size={16} /><span>{t.nav.work}</span>
            </button>
          </nav>
        </div>
      </header>
{/* Marken-Ticker */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-3 overflow-hidden border-b border-gray-800">
        <div className="flex animate-pulse space-x-8 whitespace-nowrap">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span key={i} className="text-gray-400 font-medium flex items-center text-sm">
              <TrendingUp size={14} className="mr-1 text-gray-500" />
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* Hauptinhalt */}
      <main className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        
        {/* Suchleiste */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder} 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full bg-gray-900 border border-gray-700 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
          />
        </div>

        {/* DIAMOND Sektion - 1 Karte pro Reihe (Fibonacci: 1) */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="text-4xl md:text-5xl">💎</div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {t.diamond}
              </h2>
              <p className="text-gray-400 text-sm md:text-base">{t.diamondDesc}</p>
            </div>
          </div>
          
          {/* Diamond Grid: 1 Spalte */}
          <div className="grid grid-cols-1 gap-6">
            {filteredDiamond.map(inf => (
              <DiamondCard key={inf.id} influencer={inf} />
            ))}
          </div>
        </section>

        {/* PLATIN Sektion - 2 Karten pro Reihe (Fibonacci: 2) */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="text-4xl md:text-5xl">🏆</div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  {t.platin}
                </h2>
                <p className="text-gray-400 text-sm md:text-base">{t.platinDesc} • 10 {t.spots}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAllPlatin(!showAllPlatin)}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm transition-all"
            >
              <span>{showAllPlatin ? t.showLess : t.showAll}</span>
              {showAllPlatin ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          
          {/* Platin Grid: 2 Spalten auf Desktop, 1 auf Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedPlatin.map(inf => (
              <PlatinCard key={inf.id} influencer={inf} />
            ))}
          </div>
        </section>
{/* RISING STAR Sektion - 3 Karten pro Reihe (Fibonacci: 3) */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="text-4xl md:text-5xl">⭐</div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  {t.risingStar}
                </h2>
                <p className="text-gray-400 text-sm md:text-base">{t.risingStarDesc} • 302 {t.spots}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAllRisingStar(!showAllRisingStar)}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm transition-all"
            >
              <span>{showAllRisingStar ? t.showLess : t.showAll}</span>
              {showAllRisingStar ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          
          {/* Rising Star Grid: 3 Spalten auf Desktop, 2 auf Tablet, 3 auf Mobile */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2 md:gap-3">
            {displayedRisingStars.map(inf => (
              <RisingStarCard key={inf.id} influencer={inf} />
            ))}
          </div>
          
          {/* Hinweis wenn mehr vorhanden */}
          {!showAllRisingStar && filteredRisingStar.length > 9 && (
            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">
                +{filteredRisingStar.length - 9} weitere {t.spots}
              </p>
            </div>
          )}
        </section>
      </main>
{/* Login Modal */}
      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)} title={t.login}>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">{t.email}</label>
            <input type="email" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white" placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">{t.password}</label>
            <input type="password" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white" placeholder="••••••••" />
          </div>
          <div className="text-right">
            <button type="button" className="text-blue-400 hover:text-blue-300 text-sm">{t.forgotPassword}</button>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 py-3 rounded-lg font-bold transition-all shadow-lg">{t.login}</button>
          <p className="text-center text-gray-400 text-sm">
            {t.noAccount} <button type="button" onClick={() => { setShowLogin(false); setShowRegister(true); }} className="text-blue-400 hover:text-blue-300">{t.register}</button>
          </p>
        </form>
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={showRegister} onClose={() => setShowRegister(false)} title={t.register}>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">{t.name}</label>
            <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white" placeholder="Max Mustermann" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">{t.email}</label>
            <input type="email" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white" placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">{t.password}</label>
            <input type="password" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">{t.confirmPassword}</label>
            <input type="password" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-white" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 py-3 rounded-lg font-bold transition-all shadow-lg">{t.register}</button>
          <p className="text-center text-gray-400 text-sm">
            {t.hasAccount} <button type="button" onClick={() => { setShowRegister(false); setShowLogin(true); }} className="text-blue-400 hover:text-blue-300">{t.login}</button>
          </p>
        </form>
      </Modal>

      {/* Contact Modal */}
      <Modal isOpen={showContact} onClose={() => setShowContact(false)} title={t.contactTitle}>
        <div className="space-y-4">
          <p className="text-gray-300">{t.contactText}</p>
          <div className="bg-gray-800 rounded-lg p-4 space-y-2">
            <p className="text-gray-300 flex items-center"><Mail size={16} className="mr-2 text-blue-400" />{t.contactEmail}</p>
            <p className="text-gray-300 flex items-center"><span className="mr-2 text-blue-400">📞</span>{t.contactPhone}</p>
            <p className="text-gray-300 flex items-center"><span className="mr-2 text-blue-400">📍</span>{t.contactAddress}</p>
          </div>
        </div>
      </Modal>

      {/* About Modal */}
      <Modal isOpen={showAbout} onClose={() => setShowAbout(false)} title={t.aboutTitle} size="lg">
        <div className="space-y-4">
          <p className="text-gray-300">{t.aboutText1}</p>
          <p className="text-gray-300">{t.aboutText2}</p>
          <p className="text-gray-300">{t.aboutText3}</p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 rounded-lg p-4 text-center border border-purple-500/30">
              <div className="text-3xl mb-2">💎</div>
              <p className="text-purple-400 font-bold">{t.diamond}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/30 rounded-lg p-4 text-center border border-yellow-500/30">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-yellow-400 font-bold">{t.platin}</p>
            </div>
            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 rounded-lg p-4 text-center border border-green-500/30">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-green-400 font-bold">{t.risingStar}</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Work Modal */}
      <Modal isOpen={showWork} onClose={() => setShowWork(false)} title={t.workTitle}>
        <div className="space-y-4">
          <p className="text-gray-300">{t.workText1}</p>
          <p className="text-gray-300">{t.workText2}</p>
          <p className="text-gray-300">{t.workText3}</p>
          <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 py-3 rounded-lg font-bold transition-all shadow-lg mt-4">
            {t.workButton}
          </button>
        </div>
      </Modal>

      {/* Privacy Modal */}
      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title={t.privacyTitle} size="lg">
        <div className="space-y-4 text-gray-300 text-sm">
          <p>Datenschutz ist uns wichtig. Diese Datenschutzerklärung erklärt, wie wir Ihre Daten sammeln, verwenden und schützen.</p>
          <h4 className="font-bold text-white">1. Datenerfassung</h4>
          <p>Wir erfassen nur die Daten, die für die Nutzung unserer Plattform notwendig sind.</p>
          <h4 className="font-bold text-white">2. Datenverwendung</h4>
          <p>Ihre Daten werden nur zur Bereitstellung unserer Dienste verwendet.</p>
          <h4 className="font-bold text-white">3. Datensicherheit</h4>
          <p>Wir setzen modernste Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen.</p>
        </div>
      </Modal>

      {/* Terms Modal */}
      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title={t.termsTitle} size="lg">
        <div className="space-y-4 text-gray-300 text-sm">
          <p>Mit der Nutzung unserer Plattform stimmen Sie den folgenden Bedingungen zu.</p>
          <h4 className="font-bold text-white">1. Nutzungsbedingungen</h4>
          <p>Die Plattform darf nur für legale Zwecke genutzt werden.</p>
          <h4 className="font-bold text-white">2. Mitgliedschaft</h4>
          <p>Eine Mitgliedschaft erfordert mindestens 1 Million Follower auf einer Plattform.</p>
          <h4 className="font-bold text-white">3. Zahlung</h4>
          <p>Die monatlichen Gebühren sind im Voraus zu entrichten.</p>
        </div>
      </Modal>
{/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Footer Top */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            {/* Logo & Beschreibung */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-lg font-bold border-2 border-gray-500">
                  AI
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t.title}</h3>
                  <p className="text-xs text-gray-400">{t.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                {t.aboutText1}
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setShowAbout(true)} className="text-gray-400 hover:text-white transition-all text-sm">{t.nav.about}</button></li>
                <li><button onClick={() => setShowContact(true)} className="text-gray-400 hover:text-white transition-all text-sm">{t.nav.contact}</button></li>
                <li><button onClick={() => setShowWork(true)} className="text-gray-400 hover:text-white transition-all text-sm">{t.nav.work}</button></li>
              </ul>
            </div>
            
            {/* Legal Links */}
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setShowPrivacy(true)} className="text-gray-400 hover:text-white transition-all text-sm">{t.footerPrivacy}</button></li>
                <li><button onClick={() => setShowTerms(true)} className="text-gray-400 hover:text-white transition-all text-sm">{t.footerTerms}</button></li>
                <li><button className="text-gray-400 hover:text-white transition-all text-sm">{t.footerImprint}</button></li>
              </ul>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 ALL INFLUENCER. {t.footerRights}
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-all"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-all"><Youtube size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-all"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AllInfluencerPlatform;
