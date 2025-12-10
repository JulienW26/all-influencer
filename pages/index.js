import React, { useState } from 'react';
import { Search, Home, Users, Mail, X, Upload, Check, AlertCircle, LogIn, UserPlus, Info, TrendingUp } from 'lucide-react';

const AllInfluencerPlatform = () => {
  const [language, setLanguage] = useState('de');
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContactInfluencer, setShowContactInfluencer] = useState(false);
  const [showContactCompany, setShowContactCompany] = useState(false);
  const [showImprint, setShowImprint] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showAllRisingStar, setShowAllRisingStar] = useState(false);

  const translations = {
    de: {
      home: 'HOME',
      workWith: 'ARBEITEN MIT UNS',
      contact: 'KONTAKT',
      buyNow: 'JETZT KAUFEN',
      bookNow: 'JETZT BUCHEN',
      search: 'Suche nach Name oder Kategorie...',
      followers: 'Follower',
      categories: 'Kategorien',
      close: 'Schließen',
      available: 'VERFÜGBAR',
      reserved: 'RESERVIERT',
      minFollowers: 'Mindestens',
      onePlatform: 'auf einer Plattform',
      perMonth: 'mtl',
      diamond: 'DIAMOND',
      platinum: 'PLATIN',
      gold: 'GOLD',
      risingStar: 'RISING STAR',
      verifyFollowers: 'Follower verifizieren',
      uploadProof: 'Nachweis hochladen',
      platformLink: 'Link zu deinem Profil',
      submitVerification: 'Zur Prüfung einreichen',
      calendarTitle: 'Verfügbarkeit',
      monthsAvailable: 'Verfügbare Monate',
      monthsBooked: 'Gebuchte Monate',
      maxBooking: 'Max. 3 Monate im Voraus',
      payment: 'Zahlung',
      cardNumber: 'Kartennummer',
      expiryDate: 'Ablaufdatum',
      cvv: 'CVV',
      completePayment: 'Zahlung abschließen',
      login: 'Login',
      register: 'Registrieren',
      newsletter: 'Newsletter',
      subscribe: 'Anmelden',
      footerAbout: 'Über uns',
      footerContact: 'Kontakt',
      footerForInfluencers: 'Für Influencer',
      footerForCompanies: 'Für Unternehmen',
      footerImprint: 'Impressum',
      footerPrivacy: 'Datenschutz',
      footerTerms: 'AGB',
      moreSpots: 'weitere Rising Star Spots',
      newsletterSubtitle: 'Bleiben Sie informiert über neue Influencer und Angebote',
      emailPlaceholder: 'ihre@email.com',
      gdprNotice: 'DSGVO-konform • Abmeldung jederzeit möglich',
      monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      adminApproval: 'Nach Prüfung durch unseren Administrator erhältst du eine Freischaltung per E-Mail.',
      securePayment: 'Sichere Zahlung via Stripe',
      uploadScreenshot: 'Screenshot hochladen',
      allRightsReserved: 'Alle Rechte vorbehalten',
      showAllSpots: 'Alle 302 Spots anzeigen',
      spots: 'Spots',
      name: 'Name',
      email: 'Email',
      message: 'Nachricht',
      sendMessage: 'Nachricht senden',
      price: 'Preis'
    },
    en: {
      home: 'HOME',
      workWith: 'WORK WITH US',
      contact: 'CONTACT',
      buyNow: 'BUY NOW',
      bookNow: 'BOOK NOW',
      search: 'Search by name or category...',
      followers: 'Followers',
      categories: 'Categories',
      close: 'Close',
      available: 'AVAILABLE',
      reserved: 'RESERVED',
      minFollowers: 'Minimum',
      onePlatform: 'on one platform',
      perMonth: 'mo',
      diamond: 'DIAMOND',
      platinum: 'PLATINUM',
      gold: 'GOLD',
      risingStar: 'RISING STAR',
      verifyFollowers: 'Verify Followers',
      uploadProof: 'Upload Proof',
      platformLink: 'Link to your profile',
      submitVerification: 'Submit for Review',
      calendarTitle: 'Availability',
      monthsAvailable: 'Available Months',
      monthsBooked: 'Booked Months',
      maxBooking: 'Max. 3 months in advance',
      payment: 'Payment',
      cardNumber: 'Card Number',
      expiryDate: 'Expiry Date',
      cvv: 'CVV',
      completePayment: 'Complete Payment',
      login: 'Login',
      register: 'Register',
      newsletter: 'Newsletter',
      subscribe: 'Subscribe',
      footerAbout: 'About Us',
      footerContact: 'Contact',
      footerForInfluencers: 'For Influencers',
      footerForCompanies: 'For Companies',
      footerImprint: 'Imprint',
      footerPrivacy: 'Privacy Policy',
      footerTerms: 'Terms & Conditions',
      moreSpots: 'more Rising Star Spots',
      newsletterSubtitle: 'Stay informed about new influencers and offers',
      emailPlaceholder: 'your@email.com',
      gdprNotice: 'GDPR compliant • Unsubscribe anytime',
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      adminApproval: 'After review by our administrator, you will receive approval via email.',
      securePayment: 'Secure payment via Stripe',
      uploadScreenshot: 'Upload screenshot',
      allRightsReserved: 'All rights reserved',
      showAllSpots: 'Show all 302 spots',
      spots: 'Spots',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      sendMessage: 'Send Message',
      price: 'Price'
    },
    es: {
      home: 'INICIO',
      workWith: 'TRABAJA CON NOSOTROS',
      contact: 'CONTACTO',
      buyNow: 'COMPRAR AHORA',
      bookNow: 'RESERVAR AHORA',
      search: 'Buscar por nombre o categoría...',
      followers: 'Seguidores',
      categories: 'Categorías',
      close: 'Cerrar',
      available: 'DISPONIBLE',
      reserved: 'RESERVADO',
      minFollowers: 'Mínimo',
      onePlatform: 'en una plataforma',
      perMonth: 'mes',
      diamond: 'DIAMOND',
      platinum: 'PLATINO',
      gold: 'ORO',
      risingStar: 'ESTRELLA EMERGENTE',
      verifyFollowers: 'Verificar Seguidores',
      uploadProof: 'Subir Prueba',
      platformLink: 'Enlace a tu perfil',
      submitVerification: 'Enviar para Revisión',
      calendarTitle: 'Disponibilidad',
      monthsAvailable: 'Meses Disponibles',
      monthsBooked: 'Meses Reservados',
      maxBooking: 'Máx. 3 meses de anticipación',
      payment: 'Pago',
      cardNumber: 'Número de Tarjeta',
      expiryDate: 'Fecha de Vencimiento',
      cvv: 'CVV',
      completePayment: 'Completar Pago',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      newsletter: 'Boletín',
      subscribe: 'Suscribirse',
      footerAbout: 'Sobre Nosotros',
      footerContact: 'Contacto',
      footerForInfluencers: 'Para Influencers',
      footerForCompanies: 'Para Empresas',
      footerImprint: 'Aviso Legal',
      footerPrivacy: 'Política de Privacidad',
      footerTerms: 'Términos y Condiciones',
      moreSpots: 'más Spots Rising Star',
      newsletterSubtitle: 'Manténgase informado sobre nuevos influencers y ofertas',
      emailPlaceholder: 'su@email.com',
      gdprNotice: 'Conforme al RGPD • Cancelar en cualquier momento',
      monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      adminApproval: 'Después de la revisión por nuestro administrador, recibirá la aprobación por correo electrónico.',
      securePayment: 'Pago seguro vía Stripe',
      uploadScreenshot: 'Subir captura de pantalla',
      allRightsReserved: 'Todos los derechos reservados',
      showAllSpots: 'Mostrar todos los 302 spots',
      spots: 'Spots',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      sendMessage: 'Enviar Mensaje',
      price: 'Precio'
    }
  };

  const t = translations[language];

  const formatPrice = (price) => {
    if (language === 'en') {
      return `€${price.toLocaleString('en-US')}/${t.perMonth}`;
    } else if (language === 'es') {
      return `${price.toLocaleString('es-ES')}€/${t.perMonth}`;
    } else {
      return `${price.toLocaleString('de-DE')}€/${t.perMonth}`;
    }
  };

  const brands = ['PUMA', 'AUDI', 'MARRIOTT', 'BMW', 'GUCCI', 'PRADA', 'LOUIS VUITTON', 'DIOR', 'CHANEL', 'VERSACE', 'TESLA', 'APPLE'];

  const diamondInfluencer = {
    id: 1,
    name: 'Elena Martinez',
    followers: '25M',
    category: 'Fashion & Lifestyle',
    price: 10000,
    tier: 'diamond',
    minFollowers: '20M',
    available: false,
    image: '👑',
    bookedMonths: [0, 1, 2]
  };

  const platinumInfluencers = Array.from({length: 10}, (_, i) => ({
    id: 2 + i,
    name: i < 4 ? ['Marcus Chen', 'Sofia Rodriguez', 'James Wilson', 'Aisha Kumar'][i] : null,
    followers: i < 4 ? ['18M', '15M', '12M', '14M'][i] : '10M+',
    category: ['Tech', 'Wellness', 'Business', 'Travel', 'Food', 'Sports', 'Music', 'Art', 'Gaming', 'Beauty'][i],
    price: 5000,
    tier: 'platinum',
    minFollowers: '10M',
    available: i >= 4,
    image: ['💻', '🏋️', '💼', '✈️', '🍳', '⚽', '🎵', '🎨', '🎮', '💄'][i],
    bookedMonths: i < 4 ? [0, 2] : []
  }));

  const goldInfluencers = Array.from({length: 20}, (_, i) => ({
    id: 12 + i,
    name: i < 8 ? `Creator ${i + 1}` : null,
    followers: i < 8 ? `${5 + Math.floor(Math.random() * 3)}M` : '5M+',
    category: ['Fashion', 'Tech', 'Food', 'Travel', 'Fitness', 'Design', 'Photo', 'Video'][i % 8],
    price: 2500,
    tier: 'gold',
    minFollowers: '5M',
    available: i >= 8,
    image: ['👗', '📱', '🍕', '🗺️', '💪', '✨', '📸', '🎬'][i % 8],
    bookedMonths: i < 8 ? [1] : []
  }));

  const specialNumbers = [77, 111, 222, 333];
  
  const risingStarInfluencers = Array.from({length: 302}, (_, i) => {
    const number = 32 + i;
    const isSpecial = specialNumbers.includes(number);
    const isVisible = i < 54;
    return {
      id: number,
      number: number,
      available: Math.random() > 0.4,
      price: (isVisible || isSpecial) ? 250 : 100,
      tier: 'risingStar',
      minFollowers: '1M',
      isSpecial: isSpecial,
      isVisible: isVisible,
      image: ['🌟', '🎭', '📸', '🎬', '🎵', '✨', '💡', '🚀', '🎪', '🔥'][i % 10],
      category: ['Content', 'Photo', 'Video', 'Music', 'Design'][i % 5],
      bookedMonths: Math.random() > 0.6 ? [0] : []
    };
  });

  const Logo3D = ({ size = 'large' }) => {
    const dimensions = size === 'large' ? 'w-16 h-16' : 'w-12 h-12';
    const fontSize = size === 'large' ? 'text-3xl' : 'text-xl';
    
    return (
      <div 
        className={`${dimensions} rounded-full flex items-center justify-center relative`}
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #808080 100%)',
          boxShadow: '0 5px 15px rgba(255,255,255,0.3), inset 0 -5px 10px rgba(0,0,0,0.2)',
          border: '3px solid rgba(255,255,255,0.3)'
        }}
      >
        <span 
          className={`${fontSize} font-black`}
          style={{ 
            letterSpacing: '-3px',
            background: 'linear-gradient(180deg, #000 0%, #444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          AI
        </span>
      </div>
    );
  };

  const CalendarModal = ({ influencer, onClose }) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const nextYear = currentMonth >= 10 ? currentYear + 1 : currentYear;
    
    const allMonths = Array.from({length: 12}, (_, i) => i);
    const bookableMonths = Array.from({length: 3}, (_, i) => (currentMonth + i) % 12);
    
    const isMonthBookable = (monthIndex) => {
      return bookableMonths.includes(monthIndex);
    };
    
    const isMonthBooked = (monthIndex) => {
      const bookableIndex = bookableMonths.indexOf(monthIndex);
      return bookableIndex !== -1 && influencer.bookedMonths?.includes(bookableIndex);
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-blue-500 rounded-lg max-w-3xl w-full p-6" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">{t.calendarTitle}</h3>
              <p className="text-sm text-gray-400 mt-1">{nextYear}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mb-6 text-center">{t.maxBooking}</p>
          
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
            {allMonths.map((monthIndex) => {
              const isBookable = isMonthBookable(monthIndex);
              const isBooked = isMonthBooked(monthIndex);
              
              return (
                <div
                  key={monthIndex}
                  className={`p-4 rounded-lg text-center font-bold transition-all ${
                    isBooked
                      ? 'bg-red-900 border-2 border-red-600 text-red-200' 
                      : 'bg-gray-800 border-2 border-white text-white hover:bg-gray-700 cursor-pointer hover:scale-105'
                  }`}
                >
                  {t.monthsShort[monthIndex]}
                </div>
              );
            })}
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm mb-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-800 border-2 border-white rounded"></div>
              <span className="text-gray-300">{t.monthsAvailable}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-900 border-2 border-red-600 rounded"></div>
              <span className="text-gray-300">{t.monthsBooked}</span>
            </div>
          </div>
          
          <button 
            onClick={() => { setShowCalendar(false); setShowVerification(true); }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            {t.buyNow}
          </button>
        </div>
      </div>
    );
  };

  const VerificationModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-600 rounded-lg max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-yellow-500">{t.verifyFollowers}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t.platformLink}</label>
            <input 
              type="url" 
              placeholder="https://instagram.com/yourprofile"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-600"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t.uploadProof}</label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-yellow-600 cursor-pointer transition">
              <Upload size={32} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-400">{t.uploadScreenshot}</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg p-4 mb-6">
          <div className="flex gap-2">
            <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200">{t.adminApproval}</p>
          </div>
        </div>
        <button 
          onClick={() => { setShowVerification(false); setShowPayment(true); }}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3 rounded-lg transition"
        >
          {t.submitVerification}
        </button>
      </div>
    </div>
  );

  const PaymentModal = ({ influencer, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-600 rounded-lg max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-green-500">{t.payment}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">{t.categories}:</span>
            <span className="text-white font-bold">{t[influencer?.tier] || t.risingStar}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{t.price}:</span>
            <span className="text-green-500 font-bold text-xl">{formatPrice(influencer?.price || 100)}</span>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t.cardNumber}</label>
            <input 
              type="text" 
              placeholder="4242 4242 4242 4242"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">{t.expiryDate}</label>
              <input 
                type="text" 
                placeholder="MM/YY"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">{t.cvv}</label>
              <input 
                type="text" 
                placeholder="123"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-600"
              />
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Check size={20} />
          {t.completePayment}
        </button>
        <p className="text-xs text-gray-500 text-center mt-4">
          🔒 {t.securePayment}
        </p>
      </div>
    </div>
  );

  const InfoModal = ({ title, content, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-600 rounded-lg max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="text-gray-300 lea
