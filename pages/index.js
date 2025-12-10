
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

  // Data
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
    bookedMonths: [0, 1, 2, 4]
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

  // Components
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
    const nextYear = currentMonth >= 10 ? currentYear + 1 : currentYear; // Switch to next year if we're in Nov/Dec
    
    // All 12 months of the display year
    const allMonths = Array.from({length: 12}, (_, i) => i);
    
    // Only next 3 months are bookable
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
        <div className="text-gray-300 leading-relaxed">{content}</div>
      </div>
    </div>
  );

  const ContactModal = ({ type, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-blue-500 rounded-lg max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {type === 'influencer' ? t.footerForInfluencers : t.footerForCompanies}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t.name}</label>
            <input 
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t.email}</label>
            <input 
              type="email"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">{t.message}</label>
            <textarea 
              rows="4"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600"
            />
          </div>
<button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            {t.sendMessage}
          </button>
        </form>
      </div>
    </div>
  );

  const InfluencerCard = ({ inf, size }) => {
    const tierColors = {
      diamond: 'border-purple-500 bg-gradient-to-br from-purple-900/20 to-pink-900/20',
      platinum: 'border-blue-400 bg-gradient-to-br from-blue-900/20 to-cyan-900/20',
      gold: 'border-yellow-500 bg-gradient-to-br from-yellow-900/20 to-amber-900/20',
      risingStar: inf.available ? 'border-green-700' : 'border-gray-700'
    };

    const handleClick = () => {
      setSelectedInfluencer(inf);
      if (!inf.available) {
        setShowCalendar(true);
      } else {
        setShowVerification(true);
      }
    };

    return (
      <div
        onClick={handleClick}
        className={`${size} ${tierColors[inf.tier]} border-2 rounded-lg p-3 cursor-pointer hover:scale-105 transition-all flex flex-col items-center justify-center relative overflow-hidden group bg-black`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
        <div className="text-3xl mb-2 relative z-10">{inf.image}</div>
        {inf.name && (
          <>
            <h3 className="text-sm font-bold mb-1 relative z-10 text-center">{inf.name}</h3>
            <p className="text-xs text-gray-400 mb-1 relative z-10">{inf.category}</p>
            <p className="text-xs text-gray-500 mb-2 relative z-10">{inf.followers} {t.followers}</p>
          </>
        )}
        {inf.number && !inf.name && (
          <p className="text-xs text-green-500 font-bold relative z-10">#{inf.number}</p>
        )}
        <p className="text-sm font-bold relative z-10 text-yellow-400">{formatPrice(inf.price)}</p>
        {inf.isSpecial && (
          <div className="absolute top-1 right-1 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-bold z-20">
            SPECIAL
          </div>
        )}
        {!inf.available && (
          <div className="absolute top-1 left-1 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold z-20">
            {t.reserved}
          </div>
                 )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Logo3D size="large" />
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide">ALL INFLUENCER</h1>
                <p className="text-xs text-gray-400">Premium Network</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition text-sm">
                <LogIn size={16} />
                {t.login}
              </button>
              <button className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition text-sm">
                <UserPlus size={16} />
                {t.register}
              </button>
              <div className="flex gap-2">
                {['de', 'en', 'es'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded text-sm ${language === lang ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <nav className="flex items-center justify-center gap-8 text-sm">
            <button className="flex items-center gap-2 hover:text-white transition text-gray-400">
              <Home size={18} />
              <span className="hidden md:inline">{t.home}</span>
            </button>
            <button onClick={() => setShowAbout(true)} className="flex items-center gap-2 hover:text-white transition text-gray-400">
              <Info size={18} />
              <span className="hidden md:inline">{t.footerAbout}</span>
            </button>
            <button onClick={() => setShowContactInfluencer(true)} className="flex items-center gap-2 hover:text-white transition text-gray-400">
              <Mail size={18} />
              <span className="hidden md:inline">{t.contact}</span>
            </button>
            <button onClick={() => setShowContactCompany(true)} className="flex items-center gap-2 hover:text-white transition text-gray-400">
              <Users size={18} />
              <span className="hidden md:inline">{t.workWith}</span>
            </button>
          </nav>
        </div>
      </header>

      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 overflow-hidden py-3">
        <div className="flex items-center whitespace-nowrap animate-scroll">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span key={i} className="inline-flex items-center mx-8 text-gray-500 text-sm font-bold">
              <TrendingUp size={16} className="mr-2 text-yellow-600" />
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 border-b border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-white"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">💎</span>
            <div>
              <h2 className="text-3xl font-bold text-purple-400">{t.diamond}</h2>
              <p className="text-sm text-gray-400">{t.minFollowers} 20M {t.onePlatform}</p>
            </div>
          </div>
          <InfluencerCard inf={diamondInfluencer} size="h-64 w-full" />
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🏆</span>
            <div>
              <h2 className="text-3xl font-bold text-blue-400">{t.platinum}</h2>
              <p className="text-sm text-gray-400">{t.minFollowers} 10M {t.onePlatform} • 10 {t.spots}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {platinumInfluencers.map((inf) => (
              <InfluencerCard key={inf.id} inf={inf} size="h-48" />
            ))}
          </div>
        </div>


        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🥇</span>
            <div>
              <h2 className="text-3xl font-bold text-yellow-400">{t.gold}</h2>
              <p className="text-sm text-gray-400">{t.minFollowers} 5M {t.onePlatform} • 20 {t.spots}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {goldInfluencers.map((inf) => (
              <InfluencerCard key={inf.id} inf={inf} size="h-40" />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">⭐</span>
            <div>
              <h2 className="text-3xl font-bold text-green-400">{t.risingStar}</h2>
              <p className="text-sm text-gray-400">{t.minFollowers} 1M {t.onePlatform} • 302 {t.spots}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
            {(showAllRisingStar ? risingStarInfluencers : risingStarInfluencers.slice(0, 54)).map((inf) => (
              <InfluencerCard key={inf.id} inf={inf} size="aspect-square" />
            ))}
          </div>
          {!showAllRisingStar && (
            <div className="text-center mt-8">
              <p className="text-gray-400 mb-4">+ 248 {t.moreSpots}</p>
              <button 
                onClick={() => setShowAllRisingStar(true)}
                className="bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-lg transition font-bold"
              >
                {t.showAllSpots}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-y border-gray-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">{t.newsletter}</h3>
          <p className="text-gray-400 mb-6">{t.newsletterSubtitle}</p>
          <div className="max-w-md mx-auto flex gap-3">
            <input 
              type="email" 
              placeholder={t.emailPlaceholder}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white"
            />
            <button className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-lg font-bold transition">
              {t.subscribe}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">{t.gdprNotice}</p>
        </div>
      </div>

      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo3D size="small" />
                <span className="font-bold text-white">ALL INFLUENCER</span>
              </div>
              <p className="text-sm text-gray-400">Premium Network</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">{t.footerContact}</h4>
              <button onClick={() => setShowContactInfluencer(true)} className="block text-sm text-gray-400 hover:text-white mb-2">
                {t.footerForInfluencers}
              </button>
              <button onClick={() => setShowContactCompany(true)} className="block text-sm text-gray-400 hover:text-white">
                {t.footerForCompanies}
              </button>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">{t.footerAbout}</h4>
              <button onClick={() => setShowAbout(true)} className="block text-sm text-gray-400 hover:text-white">
                {t.footerAbout}
              </button>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <button onClick={() => setShowImprint(true)} className="block text-sm text-gray-400 hover:text-white mb-2">
                {t.footerImprint}
              </button>
              <button onClick={() => setShowPrivacy(true)} className="block text-sm text-gray-400 hover:text-white mb-2">
                {t.footerPrivacy}
              </button>
              <button onClick={() => setShowTerms(true)} className="block text-sm text-gray-400 hover:text-white">
                {t.footerTerms}
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 ALL INFLUENCER. {t.allRightsReserved}</p>
          </div>
        </div>
      </footer>

      {showCalendar && selectedInfluencer && (
        <CalendarModal 
          influencer={selectedInfluencer} 
          onClose={() => { setShowCalendar(false); setSelectedInfluencer(null); }} 
        />
      )}

      {showVerification && (
        <VerificationModal 
          onClose={() => { setShowVerification(false); setSelectedInfluencer(null); }} 
        />
      )}

      {showPayment && selectedInfluencer && (
        <PaymentModal 
          influencer={selectedInfluencer} 
          onClose={() => { setShowPayment(false); setSelectedInfluencer(null); }} 
        />
      )}

      {showContactInfluencer && (
        <ContactModal 
          type="influencer"
          onClose={() => setShowContactInfluencer(false)} 
        />
      )}

      {showContactCompany && (
        <ContactModal 
          type="company"
          onClose={() => setShowContactCompany(false)} 
        />
      )}

      {showAbout && (
        <InfoModal 
          title={t.footerAbout}
          content={
            <p>{language === 'de' ? 'ALL INFLUENCER ist die Premium-Plattform, die Top-Influencer mit führenden Marken verbindet.' : language === 'en' ? 'ALL INFLUENCER is the premium platform connecting top influencers with leading brands.' : 'ALL INFLUENCER es la plataforma premium que conecta influencers top con marcas líderes.'}</p>
          }
          onClose={() => setShowAbout(false)} 
        />
      )}

      {showImprint && (
        <InfoModal 
          title={t.footerImprint}
          content={
            <div>
              <p className="mb-2"><strong>ALL INFLUENCER GmbH</strong></p>
              <p>Musterstraße 123</p>
              <p>30159 Hannover</p>
              <p className="mt-4">Email: info@all-influencer.com</p>
            </div>
          }
          onClose={() => setShowImprint(false)} 
        />
      )}

      {showPrivacy && (
        <InfoModal 
          title={t.footerPrivacy}
          content={
            <p>{language === 'de' ? 'Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten vertraulich entsprechend der DSGVO.' : language === 'en' ? 'We take the protection of your personal data very seriously and treat your personal data confidentially in accordance with GDPR.' : 'Nos tomamos muy en serio la protección de sus datos personales.'}</p>
          }
          onClose={() => setShowPrivacy(false)} 
        />
      )}

      {showTerms && (
        <InfoModal 
          title={t.footerTerms}
          content={
            <p>{language === 'de' ? 'Diese AGB gelten für alle Verträge zwischen ALL INFLUENCER und den Nutzern der Plattform. Für jede erfolgreiche Vermittlung berechnen wir eine Gebühr von 10% des Projektwertes.' : language === 'en' ? 'These terms apply to all contracts between ALL INFLUENCER and users. For each successful placement, we charge a fee of 10% of the project value.' : 'Estos términos se aplican a todos los contratos. Cobramos una tarifa del 10% del valor del proyecto.'}</p>
          }
          onClose={() => setShowTerms(false)} 
        />
      )}

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AllInfluencerPlatform;
