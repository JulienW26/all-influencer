import { useState, useEffect } from 'react';
import Head from 'next/head';

// ==================== TRANSLATIONS ====================
const translations = {
  de: {
    nav: {
      home: 'HOME',
      about: 'ÜBER UNS',
      contact: 'KONTAKT',
      workWithUs: 'ARBEITEN MIT UNS',
      login: 'Login',
      register: 'Registrieren'
    },
    hero: {
      title: 'Premium Influencer Network',
      subtitle: 'Sichere dir deinen exklusiven Spot unter den Top-Influencern'
    },
    categories: {
      diamond: 'Diamond',
      platinum: 'Platin',
      gold: 'Gold',
      risingStar: 'Rising Star',
      available: 'Verfügbar',
      booked: 'Gebucht',
      minFollowers: 'Mind. Follower',
      priceMonth: '/Monat'
    },
    calendar: {
      title: 'Wähle deine Buchungsmonate',
      subtitle: 'Maximal 3 aufeinanderfolgende Monate buchbar',
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      legend: 'Legende',
      available: 'Verfügbar',
      booked: 'Gebucht',
      selected: 'Ausgewählt',
      buyNow: 'JETZT KAUFEN',
      selectMonths: 'Bitte wähle mindestens einen Monat'
    },
    verification: {
      title: 'Nachweis einreichen',
      subtitle: 'Nach Prüfung durch unseren Administrator erhältst du eine Freischaltung per E-Mail',
      profileLink: 'Link zu deinem Profil',
      profilePlaceholder: 'https://instagram.com/deinprofil',
      screenshot: 'Screenshot hochladen',
      screenshotHint: 'Ziehe eine Datei hierher oder klicke zum Auswählen',
      minFollowersRequired: 'Mindest-Follower für diese Kategorie',
      submit: 'Zur Prüfung einreichen',
      uploading: 'Wird eingereicht...',
      email: 'Deine E-Mail-Adresse',
      emailPlaceholder: 'deine@email.com',
      emailRequired: 'Bitte gib deine E-Mail-Adresse ein',
      success: 'Erfolgreich eingereicht! Du erhältst eine Bestätigung per E-Mail.',
      error: 'Fehler beim Einreichen. Bitte versuche es erneut.'
    },
    loadMore: 'Mehr anzeigen',
    login: {
      title: 'Login',
      email: 'E-Mail',
      password: 'Passwort',
            forgotPassword: 'Passwort vergessen?',
      submit: 'Einloggen',
      noAccount: 'Noch kein Konto?',
      registerLink: 'Registrieren'
    },
    register: {
      title: 'Registrieren',
      name: 'Name',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      submit: 'Registrieren',
      submitting: 'Wird registriert...',
      hasAccount: 'Bereits ein Konto?',
      loginLink: 'Login',
      success: 'Registrierung erfolgreich! Prüfe deine E-Mails.',
      error: 'Registrierung fehlgeschlagen. Bitte versuche es erneut.',
      passwordMismatch: 'Passwörter stimmen nicht überein'
    },
    contact: {
      title: 'Kontakt',
      text: 'Hast du Fragen oder möchtest mehr erfahren? Kontaktiere uns!',
      email: 'E-Mail',
      phone: 'Telefon',
      address: 'Adresse',
      name: 'Dein Name',
      yourEmail: 'Deine E-Mail',
      message: 'Deine Nachricht',
      messagePlaceholder: 'Schreibe uns deine Nachricht...',
      send: 'Nachricht senden',
      sending: 'Wird gesendet...',
      success: 'Nachricht erfolgreich gesendet!',
      error: 'Fehler beim Senden. Bitte versuche es erneut.'
    },
    about: {
      title: 'Über uns',
      text: 'ALL INFLUENCER ist die exklusivste Plattform für Premium-Influencer. Wir verbinden die erfolgreichsten Content Creator mit führenden Marken weltweit.',
      categoriesTitle: 'Unsere Kategorien'
    },
    workWithUs: {
      title: 'Arbeiten mit uns',
      text: 'Du möchtest Teil unseres Teams werden? Wir suchen immer nach talentierten Menschen, die unsere Vision teilen. Ob Marketing, Design oder Entwicklung - bewirb dich jetzt!',
      apply: 'Jetzt bewerben'
    },
    privacy: {
      title: 'Datenschutz',
      text: 'Wir nehmen den Schutz deiner Daten sehr ernst. Diese Datenschutzerklärung informiert dich über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten auf unserer Website. Verantwortlicher für die Datenverarbeitung ist ALL INFLUENCER, Berlin, Deutschland. Wir erheben nur Daten, die für die Nutzung unserer Dienste erforderlich sind. Deine Daten werden nicht an Dritte verkauft.'
    },
       terms: {
      title: 'AGB',
      text: 'Mit der Nutzung unserer Plattform akzeptierst du diese Allgemeinen Geschäftsbedingungen. Die Buchung eines Spots erfolgt auf monatlicher Basis. Die Mindest-Follower-Anforderungen müssen erfüllt sein. Nach erfolgreicher Prüfung wird dein Profil freigeschaltet. Stornierungen sind bis 7 Tage vor Beginn des Buchungszeitraums möglich.'
    },
    footer: {
      description: 'Die exklusivste Plattform für Premium-Influencer weltweit.',
      quickLinks: 'Quick Links',
      legal: 'Rechtliches',
      privacy: 'Datenschutz',
      terms: 'AGB',
      imprint: 'Impressum',
      copyright: '© 2025 ALL INFLUENCER. Alle Rechte vorbehalten.'
    }
  },
  en: {
    nav: {
      home: 'HOME',
      about: 'ABOUT US',
      contact: 'CONTACT',
      workWithUs: 'WORK WITH US',
      login: 'Login',
      register: 'Register'
    },
    hero: {
      title: 'Premium Influencer Network',
      subtitle: 'Secure your exclusive spot among the top influencers'
    },
    categories: {
      diamond: 'Diamond',
      platinum: 'Platinum',
      gold: 'Gold',
      risingStar: 'Rising Star',
      available: 'Available',
      booked: 'Booked',
      minFollowers: 'Min. Followers',
      priceMonth: '/month'
    },
    calendar: {
      title: 'Choose your booking months',
      subtitle: 'Maximum 3 consecutive months bookable',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      legend: 'Legend',
      available: 'Available',
      booked: 'Booked',
      selected: 'Selected',
      buyNow: 'BUY NOW',
      selectMonths: 'Please select at least one month'
    },
    verification: {
      title: 'Submit Verification',
      subtitle: 'After review by our administrator, you will receive activation via email',
      profileLink: 'Link to your profile',
      profilePlaceholder: 'https://instagram.com/yourprofile',
      screenshot: 'Upload Screenshot',
      screenshotHint: 'Drag a file here or click to select',
      minFollowersRequired: 'Minimum followers for this category',
      submit: 'Submit for Review',
      uploading: 'Submitting...',
      email: 'Your Email Address',
      emailPlaceholder: 'your@email.com',
      emailRequired: 'Please enter your email address',
      success: 'Successfully submitted! You will receive a confirmation email.',
      error: 'Error submitting. Please try again.'
    },
    loadMore: 'Load More',
    login: {
      title: 'Login',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      submit: 'Login',
        registerLink: 'Register'
    },
    register: {
      title: 'Register',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      submit: 'Register',
      submitting: 'Registering...',
      hasAccount: 'Already have an account?',
      loginLink: 'Login',
      success: 'Registration successful! Check your email.',
      error: 'Registration failed. Please try again.',
      passwordMismatch: 'Passwords do not match'
    },
    contact: {
      title: 'Contact',
      text: 'Do you have questions or want to learn more? Contact us!',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      name: 'Your Name',
      yourEmail: 'Your Email',
      message: 'Your Message',
      messagePlaceholder: 'Write us your message...',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Error sending. Please try again.'
    },
    about: {
      title: 'About Us',
      text: 'ALL INFLUENCER is the most exclusive platform for premium influencers. We connect the most successful content creators with leading brands worldwide.',
      categoriesTitle: 'Our Categories'
    },
    workWithUs: {
      title: 'Work With Us',
      text: 'Want to be part of our team? We are always looking for talented people who share our vision. Whether marketing, design or development - apply now!',
      apply: 'Apply Now'
    },
    privacy: {
      title: 'Privacy Policy',
      text: 'We take the protection of your data very seriously. This privacy policy informs you about the type, scope and purpose of processing personal data on our website. The person responsible for data processing is ALL INFLUENCER, Berlin, Germany. We only collect data that is necessary for the use of our services. Your data will not be sold to third parties.'
    },
    terms: {
      title: 'Terms & Conditions',
      text: 'By using our platform, you accept these Terms and Conditions. Booking a spot is done on a monthly basis. Minimum follower requirements must be met. After successful review, your profile will be activated. Cancellations are possible up to 7 days before the start of the booking period.'
    },
    footer: {
      description: 'The most exclusive platform for premium influencers worldwide.',
      quickLinks: 'Quick Links',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms',
      imprint: 'Imprint',
      copyright: '© 2025 ALL INFLUENCER. All rights reserved.'
    }
  },
  es: {
  es: {
    nav: {
      home: 'INICIO',
      about: 'SOBRE NOSOTROS',
      contact: 'CONTACTO',
      workWithUs: 'TRABAJA CON NOSOTROS',
      login: 'Iniciar sesión',
      register: 'Registrarse'
    },
    hero: {
      title: 'Red Premium de Influencers',
      subtitle: 'Asegura tu lugar exclusivo entre los mejores influencers'
    },
    categories: {
      diamond: 'Diamante',
      platinum: 'Platino',
      gold: 'Oro',
      risingStar: 'Estrella Emergente',
      available: 'Disponible',
      booked: 'Reservado',
      minFollowers: 'Seguidores mín.',
      priceMonth: '/mes'
    },
    calendar: {
      title: 'Elige tus meses de reserva',
      subtitle: 'Máximo 3 meses consecutivos reservables',
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      legend: 'Leyenda',
      available: 'Disponible',
      booked: 'Reservado',
      selected: 'Seleccionado',
      buyNow: 'COMPRAR AHORA',
      selectMonths: 'Por favor selecciona al menos un mes'
    },
    verification: {
      title: 'Enviar Verificación',
      subtitle: 'Después de la revisión por nuestro administrador, recibirás la activación por correo electrónico',
      profileLink: 'Enlace a tu perfil',
      profilePlaceholder: 'https://instagram.com/tuperfil',
      screenshot: 'Subir Captura de Pantalla',
      screenshotHint: 'Arrastra un archivo aquí o haz clic para seleccionar',
      minFollowersRequired: 'Seguidores mínimos para esta categoría',
      submit: 'Enviar para Revisión',
      uploading: 'Enviando...',
      email: 'Tu Correo Electrónico',
      emailPlaceholder: 'tu@email.com',
      emailRequired: 'Por favor ingresa tu dirección de correo',
      success: '¡Enviado exitosamente! Recibirás un correo de confirmación.',
      error: 'Error al enviar. Por favor intenta de nuevo.'
    },
    loadMore: 'Cargar Más',
    login: {
      title: 'Iniciar sesión',
      email: 'Correo electrónico',
      password: 'Contraseña',
      forgotPassword: '¿Olvidaste tu contraseña?',
      submit: 'Iniciar sesión',
      noAccount: '¿No tienes cuenta?',
      registerLink: 'Registrarse'
    },
    register: {
      title: 'Registrarse',
      name: 'Nombre',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      submit: 'Registrarse',
      submitting: 'Registrando...',
      hasAccount: '¿Ya tienes una cuenta?',
      loginLink: 'Iniciar sesión',
      success: '¡Registro exitoso! Revisa tu correo.',
      error: 'Registro fallido. Por favor intenta de nuevo.',
      passwordMismatch: 'Las contraseñas no coinciden'
    },
        contact: {
      title: 'Contacto',
      text: '¿Tienes preguntas o quieres saber más? ¡Contáctanos!',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      address: 'Dirección',
      name: 'Tu Nombre',
      yourEmail: 'Tu Correo',
      message: 'Tu Mensaje',
      messagePlaceholder: 'Escríbenos tu mensaje...',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado exitosamente!',
      error: 'Error al enviar. Por favor intenta de nuevo.'
    },
    about: {
      title: 'Sobre Nosotros',
      text: 'ALL INFLUENCER es la plataforma más exclusiva para influencers premium. Conectamos a los creadores de contenido más exitosos con las marcas líderes en todo el mundo.',
      categoriesTitle: 'Nuestras Categorías'
    },
    workWithUs: {
      title: 'Trabaja con Nosotros',
      text: '¿Quieres ser parte de nuestro equipo? Siempre buscamos personas talentosas que compartan nuestra visión. Ya sea marketing, diseño o desarrollo - ¡aplica ahora!',
      apply: 'Aplicar Ahora'
    },
    privacy: {
      title: 'Política de Privacidad',
      text: 'Tomamos muy en serio la protección de tus datos. Esta política de privacidad te informa sobre el tipo, alcance y propósito del procesamiento de datos personales en nuestro sitio web. El responsable del procesamiento de datos es ALL INFLUENCER, Berlín, Alemania. Solo recopilamos datos necesarios para el uso de nuestros servicios. Tus datos no se venderán a terceros.'
    },
    terms: {
      title: 'Términos y Condiciones',
      text: 'Al usar nuestra plataforma, aceptas estos Términos y Condiciones. La reserva de un lugar se realiza mensualmente. Se deben cumplir los requisitos mínimos de seguidores. Después de una revisión exitosa, tu perfil será activado. Las cancelaciones son posibles hasta 7 días antes del inicio del período de reserva.'
    },
    footer: {
      description: 'La plataforma más exclusiva para influencers premium en todo el mundo.',
      quickLinks: 'Enlaces Rápidos',
      legal: 'Legal',
      privacy: 'Privacidad',
      terms: 'Términos',
      imprint: 'Aviso Legal',
      copyright: '© 2025 ALL INFLUENCER. Todos los derechos reservados.'
    }
  }
};

// ==================== CATEGORY DATA ====================
const categoryData = {
  diamond: { spots: 1, perRow: 1, minFollowers: '20M', price: '10.000€', icon: '💎', color: 'from-cyan-400 to-blue-500', height: 'h-44', width: 'w-64' },
  platinum: { spots: 10, perRow: 2, minFollowers: '10M', price: '5.000€', icon: '🏆', color: 'from-slate-300 to-slate-500', height: 'h-32', width: 'w-36' },
  gold: { spots: 21, perRow: 3, minFollowers: '5M', price: '1.000€', icon: '🥇', color: 'from-yellow-400 to-amber-600', height: 'h-28', width: 'w-28' },
  risingStar: { spots: 301, perRow: 3, minFollowers: '1M', price: '250€', icon: '⭐', color: 'from-purple-400 to-pink-500', height: 'h-24', width: 'w-24', initialShow: 54, loadMore: 9 }
};

// ==================== BRANDS ====================
const brands = ['GUCCI', 'PRADA', 'LOUIS VUITTON', 'DIOR', 'CHANEL', 'VERSACE', 'TESLA', 'APPLE', 'PUMA', 'AUDI', 'MARRIOTT', 'BMW', 'MERCEDES', 'ROLEX', 'CARTIER'];

// ==================== MAIN COMPONENT ====================
export default function Home() {
  const [language, setLanguage] = useState('de');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [risingStarVisible, setRisingStarVisible] = useState(54);
  const [bookedMonths, setBookedMonths] = useState({});
  const [verificationData, setVerificationData] = useState({ profileLink: '', screenshot: null, email: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const t = translations[language];

  // Generate booked months randomly for demo
  useEffect(() => {
    const booked = {};
    for (let i = 0; i < 50; i++) {
      const spotId = `spot-${Math.floor(Math.random() * 333)}`;
      const month = Math.floor(Math.random() * 12);
      if (!booked[spotId]) booked[spotId] = [];
      if (!booked[spotId].includes(month)) booked[spotId].push(month);
    }
    setBookedMonths(booked);
  }, []);

  // ==================== EMAIL FUNCTION ====================
  const sendEmail = async (type, data) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data })
      });
      const result = await response.json();
      return { success: response.ok, ...result };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error: error.message };
    }
  };

  const openCalendarModal = (category, spotIndex) => {
    setSelectedSpot({ category, spotIndex, id: `${category}-${spotIndex}` });
    setSelectedMonths([]);
    setStatusMessage({ type: '', message: '' });
    setActiveModal('calendar');
  };

  const toggleMonth = (monthIndex) => {
    const spotId = selectedSpot?.id;
    if (bookedMonths[spotId]?.includes(monthIndex)) return;

    setSelectedMonths(prev => {
      if (prev.includes(monthIndex)) {
        return prev.filter(m => m !== monthIndex);
      }
      const newSelection = [...prev, monthIndex].sort((a, b) => a - b);
      // Check consecutive and max 3
      if (newSelection.length > 3) return prev;
      for (let i = 1; i < newSelection.length; i++) {
        if (newSelection[i] - newSelection[i-1] !== 1) return prev;
      }
      return newSelection;
    });
  };

  const handleBuyNow = () => {
    if (selectedMonths.length === 0) {
      alert(t.calendar.selectMonths);
      return;
    }
    setStatusMessage({ type: '', message: '' });
    setActiveModal('verification');
  };

  const handleVerificationSubmit = async () => {
    if (!verificationData.email) {
      setStatusMessage({ type: 'error', message: t.verification.emailRequired });
      return;
    }
    if (!verificationData.profileLink || !verificationData.screenshot) {
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: '', message: '' });

    try {
      // Send booking notification to admin
      await sendEmail('booking', {
        category: selectedSpot.category,
        spotIndex: selectedSpot.spotIndex,
        months: selectedMonths,
        profileLink: verificationData.profileLink,
        screenshotName: verificationData.screenshot.name
      });

      // Send confirmation to user
      await sendEmail('booking-confirmation', {
        email: verificationData.email
      });

      setStatusMessage({ type: 'success', message: t.verification.success });
      
      setTimeout(() => {
        setActiveModal(null);
        setVerificationData({ profileLink: '', screenshot: null, email: '' });
        setStatusMessage({ type: '', message: '' });
      }, 3000);

     } catch (error) {
      setStatusMessage({ type: 'error', message: t.verification.error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      setStatusMessage({ type: 'error', message: t.register.passwordMismatch });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: '', message: '' });

    try {
      const result = await sendEmail('registration', {
        name: registerData.name,
        email: registerData.email
      });

      if (result.success) {
        setStatusMessage({ type: 'success', message: t.register.success });
        setTimeout(() => {
          setActiveModal('login');
          setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
          setStatusMessage({ type: '', message: '' });
        }, 3000);
      } else {
        setStatusMessage({ type: 'error', message: t.register.error });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', message: t.register.error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = async () => {
    if (!contactData.name || !contactData.email || !contactData.message) {
      return;
    }

      setIsLoading(true);
    setStatusMessage({ type: '', message: '' });

    try {
      const result = await sendEmail('contact', {
        name: contactData.name,
        email: contactData.email,
        message: contactData.message
      });

      if (result.success) {
        setStatusMessage({ type: 'success', message: t.contact.success });
        setTimeout(() => {
          setContactData({ name: '', email: '', message: '' });
          setStatusMessage({ type: '', message: '' });
        }, 3000);
      } else {
        setStatusMessage({ type: 'error', message: t.contact.error });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', message: t.contact.error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVerificationData(prev => ({ ...prev, screenshot: file }));
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedSpot(null);
    setSelectedMonths([]);
    setStatusMessage({ type: '', message: '' });
  };

  // ==================== STATUS MESSAGE COMPONENT ====================
  const StatusMessage = () => {
    if (!statusMessage.message) return null;
    return (
      <div className={`p-4 rounded-xl mb-4 ${
        statusMessage.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-300' :
        statusMessage.type === 'error' ? 'bg-red-500/20 border border-red-500/30 text-red-300' : ''
      }`}>
        {statusMessage.message}
      </div>
    );
  };

  // ==================== RENDER SPOTS ====================
  const renderSpots = (category, data) => {
    const spots = [];
    const totalSpots = category === 'risingStar' ? risingStarVisible : data.spots;
    
    for (let i = 0; i < totalSpots; i++) {
      const spotId = `${category}-${i}`;
      const isBooked = bookedMonths[spotId]?.length > 0;
      
      spots.push(
        <button
          key={spotId}
          onClick={() => openCalendarModal(category, i)}
          className={`
            ${data.height} ${data.width} rounded-xl cursor-pointer
            bg-gradient-to-br ${data.color} 
            hover:scale-105 hover:shadow-2xl hover:shadow-current/30
            transition-all duration-300 ease-out
            flex items-center justify-center
            border-2 border-white/20 hover:border-white/40
            relative overflow-hidden group
            ${isBooked ? 'opacity-60' : ''}
          `}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <span className="text-3xl relative z-10">{data.icon}</span>
          {isBooked && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-semibold bg-red-500 px-2 py-0.5 rounded">
              {t.categories.booked}
            </div>
          )}
        </button>
      );
    }
    return spots;
  };

  return (
    <>
      <Head>
        <title>ALL INFLUENCER - Premium Influencer Network</title>
        <meta name="description" content="Die exklusivste Plattform für Premium-Influencer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white font-['Montserrat']">
        
        {/* ==================== HEADER ==================== */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center font-bold text-xl text-black">
                  AI
                </div>
                <div>
                  <div className="font-['Playfair_Display'] font-bold text-xl tracking-wider">ALL INFLUENCER</div>
                  <div className="text-xs text-gray-400 tracking-widest">Premium Network</div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                <a href="#" className="text-sm font-medium hover:text-yellow-400 transition-colors">{t.nav.home}</a>
                <button onClick={() => setActiveModal('about')} className="text-sm font-medium hover:text-yellow-400 transition-colors">{t.nav.about}</button>
                <button onClick={() => setActiveModal('contact')} className="text-sm font-medium hover:text-yellow-400 transition-colors">{t.nav.contact}</button>
                <button onClick={() => setActiveModal('workWithUs')} className="text-sm font-medium hover:text-yellow-400 transition-colors">{t.nav.workWithUs}</button>
              </nav>

              {/* Right Side */}
              <div className="hidden lg:flex items-center gap-4">
                <button onClick={() => setActiveModal('login')} className="text-sm font-medium hover:text-yellow-400 transition-colors">
                  {t.nav.login}
                </button>
                <button onClick={() => setActiveModal('register')} className="bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-blue-800 transition-all">
                  {t.nav.register}
                </button>
                
                {/* Language Selector */}
                <div className="flex items-center gap-1 ml-4 border-l border-white/20 pl-4">
                  {['de', 'en', 'es'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
                        language === lang ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-white/10">
                <nav className="flex flex-col gap-3">
                  <a href="#" className="text-sm font-medium hover:text-yellow-400 transition-colors py-2">{t.nav.home}</a>
                  <button onClick={() => { setActiveModal('about'); setMobileMenuOpen(false); }} className="text-sm font-medium hover:text-yellow-400 transition-colors py-2 text-left">{t.nav.about}</button>
                  <button onClick={() => { setActiveModal('contact'); setMobileMenuOpen(false); }} className="text-sm font-medium hover:text-yellow-400 transition-colors py-2 text-left">{t.nav.contact}</button>
                  <button onClick={() => { setActiveModal('workWithUs'); setMobileMenuOpen(false); }} className="text-sm font-medium hover:text-yellow-400 transition-colors py-2 text-left">{t.nav.workWithUs}</button>
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => { setActiveModal('login'); setMobileMenuOpen(false); }} className="flex-1 py-2 border border-white/20 rounded-lg text-sm font-medium">
                      {t.nav.login}
                    </button>
                    <button onClick={() => { setActiveModal('register'); setMobileMenuOpen(false); }} className="flex-1 py-2 bg-blue-600 rounded-lg text-sm font-semibold">
                      {t.nav.register}
                    </button>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {['de', 'en', 'es'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                          language === lang ? 'bg-yellow-500 text-black' : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* ==================== HERO SECTION ==================== */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              {t.hero.title}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>
        </section>

        {/* ==================== BRAND BANNER ==================== */}
        <div className="overflow-hidden py-8 bg-gradient-to-r from-transparent via-white/5 to-transparent">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...brands, ...brands].map((brand, i) => (
              <span key={i} className="mx-12 text-2xl font-light text-gray-500 tracking-widest">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* ==================== DIAMOND SECTION ==================== */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-2">
                <span className="mr-3">{categoryData.diamond.icon}</span>
                {t.categories.diamond}
              </h2>
              <p className="text-gray-400">
                {t.categories.minFollowers}: {categoryData.diamond.minFollowers} • {categoryData.diamond.price}{t.categories.priceMonth}
              </p>
            </div>
            <div className="flex justify-center">
              {renderSpots('diamond', categoryData.diamond)}
            </div>
          </div>
        </section>

        {/* ==================== PLATINUM SECTION ==================== */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-2">
                <span className="mr-3">{categoryData.platinum.icon}</span>
                {t.categories.platinum}
              </h2>
              <p className="text-gray-400">
                {t.categories.minFollowers}: {categoryData.platinum.minFollowers} • {categoryData.platinum.price}{t.categories.priceMonth}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
              {renderSpots('platinum', categoryData.platinum)}
            </div>
          </div>
        </section>

        {/* ==================== GOLD SECTION ==================== */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-2">
                <span className="mr-3">{categoryData.gold.icon}</span>
                {t.categories.gold}
              </h2>
              <p className="text-gray-400">
                {t.categories.minFollowers}: {categoryData.gold.minFollowers} • {categoryData.gold.price}{t.categories.priceMonth}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {renderSpots('gold', categoryData.gold)}
            </div>
          </div>
        </section>

         {/* ==================== RISING STAR SECTION ==================== */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-2">
                <span className="mr-3">{categoryData.risingStar.icon}</span>
                {t.categories.risingStar}
              </h2>
              <p className="text-gray-400">
                {t.categories.minFollowers}: {categoryData.risingStar.minFollowers} • {categoryData.risingStar.price}{t.categories.priceMonth}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {renderSpots('risingStar', categoryData.risingStar)}
            </div>
            {risingStarVisible < categoryData.risingStar.spots && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setRisingStarVisible(prev => Math.min(prev + 9, categoryData.risingStar.spots))}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105"
                >
                  {t.loadMore} ({risingStarVisible}/{categoryData.risingStar.spots})
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="bg-black/50 border-t border-white/10 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Logo & Description */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg flex items-center justify-center font-bold text-black">
                    AI
                  </div>
                  <div className="font-['Playfair_Display'] font-bold text-lg">ALL INFLUENCER</div>
                </div>
                <p className="text-gray-400 text-sm max-w-md">{t.footer.description}</p>
                {/* Social Icons */}
                <div className="flex gap-4 mt-6">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold mb-4">{t.footer.quickLinks}</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><button onClick={() => setActiveModal('about')} className="hover:text-white transition-colors">{t.nav.about}</button></li>
                  <li><button onClick={() => setActiveModal('contact')} className="hover:text-white transition-colors">{t.nav.contact}</button></li>
                  <li><button onClick={() => setActiveModal('workWithUs')} className="hover:text-white transition-colors">{t.nav.workWithUs}</button></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold mb-4">{t.footer.legal}</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">{t.footer.privacy}</button></li>
                  <li><button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">{t.footer.terms}</button></li>
                  <li><button onClick={() => setActiveModal('imprint')} className="hover:text-white transition-colors">{t.footer.imprint}</button></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
              {t.footer.copyright}
            </div>
          </div>
        </footer>

        {/* ==================== MODALS ==================== */}
        
        {/* Calendar Modal */}
        {activeModal === 'calendar' && selectedSpot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold">{t.calendar.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{t.calendar.subtitle}</p>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">2026</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {t.calendar.months.map((month, index) => {
                    const isBooked = bookedMonths[selectedSpot.id]?.includes(index);
                    const isSelected = selectedMonths.includes(index);
                    return (
                      <button
                        key={index}
                        onClick={() => toggleMonth(index)}
                        disabled={isBooked}
                        className={`
                                py-3 px-2 rounded-lg text-sm font-medium transition-all
                          ${isBooked ? 'bg-red-500/30 text-red-300 cursor-not-allowed' : 
                            isSelected ? 'bg-green-500 text-white' : 
                            'bg-white/10 hover:bg-white/20 text-white'}
                        `}
                      >
                        {month.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white/10 rounded" />
                  <span className="text-gray-400">{t.calendar.available}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500/30 rounded" />
                  <span className="text-gray-400">{t.calendar.booked}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-gray-400">{t.calendar.selected}</span>
                </div>
              </div>

              {/* Selected Info */}
              {selectedMonths.length > 0 && (
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-400">
                    {selectedMonths.length} {selectedMonths.length === 1 ? 'Monat' : 'Monate'} ausgewählt: {selectedMonths.map(m => t.calendar.months[m]).join(', ')}
                  </p>
                  <p className="text-lg font-bold mt-1">
                    {categoryData[selectedSpot.category].price} × {selectedMonths.length} = {(parseInt(categoryData[selectedSpot.category].price.replace(/\D/g, '')) * selectedMonths.length).toLocaleString()}€
                  </p>
                </div>
              )}

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-xl text-black font-bold text-lg hover:from-yellow-500 hover:to-amber-700 transition-all"
              >
                {t.calendar.buyNow}
              </button>
            </div>
          </div>
        )}

        {/* Verification Modal */}
        {activeModal === 'verification' && selectedSpot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold">{t.verification.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{t.verification.subtitle}</p>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <StatusMessage />

              {/* Min Followers Info */}
              <div className="bg-gradient-to-r from-yellow-400/20 to-amber-600/20 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <p className="text-sm text-yellow-200">
                  <span className="font-semibold">{t.verification.minFollowersRequired}:</span> {categoryData[selectedSpot.category].minFollowers}
                </p>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.verification.email}</label>
                <input
                  type="email"
                  value={verificationData.email}
                  onChange={(e) => setVerificationData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={t.verification.emailPlaceholder}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              {/* Profile Link */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.verification.profileLink}</label>
                <input
                  type="url"
                  value={verificationData.profileLink}
                  onChange={(e) => setVerificationData(prev => ({ ...prev, profileLink: e.target.value }))}
                  placeholder={t.verification.profilePlaceholder}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              {/* Screenshot Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">{t.verification.screenshot}</label>
                <label className="block border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white/40 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <svg className="w-10 h-10 mx-auto mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-400 text-sm">{t.verification.screenshotHint}</p>
                  {verificationData.screenshot && (
                    <p className="text-green-400 text-sm mt-2">✓ {verificationData.screenshot.name}</p>
                  )}
                </label>
              </div>

              <button
                onClick={handleVerificationSubmit}
                disabled={!verificationData.profileLink || !verificationData.screenshot || !verificationData.email || isLoading}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {isLoading ? t.verification.uploading : t.verification.submit}
              </button>
            </div>
          </div>
        )}

        {/* Login Modal */}
        {activeModal === 'login' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold">{t.login.title}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.login.email}</label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.login.password}</label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                <button className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
                  {t.login.forgotPassword}
                </button>
                <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-xl text-black font-bold text-lg hover:from-yellow-500 hover:to-amber-700 transition-all">
                  {t.login.submit}
                </button>
                <p className="text-center text-sm text-gray-400">
                  {t.login.noAccount}{' '}
                  <button onClick={() => setActiveModal('register')} className="text-yellow-400 hover:text-yellow-300">
                    {t.login.registerLink}
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Register Modal */}
        {activeModal === 'register' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold">{t.register.title}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <StatusMessage />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.register.name}</label>
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.register.email}</label>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.register.password}</label>
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.register.confirmPassword}</label>
                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                <button 
                  onClick={handleRegisterSubmit}
                  disabled={!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword || isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl text-white font-bold text-lg hover:from-blue-600 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading && (
                     <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {isLoading ? t.register.submitting : t.register.submit}
                </button>
                <p className="text-center text-sm text-gray-400">
                  {t.register.hasAccount}{' '}
                  <button onClick={() => { setActiveModal('login'); setStatusMessage({ type: '', message: '' }); }} className="text-yellow-400 hover:text-yellow-300">
                    {t.register.loginLink}
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {activeModal === 'contact' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/10" onClick={e => e.stopPropagation()}>
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold">{t.contact.title}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-400 mb-6">{t.contact.text}</p>

              <StatusMessage />

              {/* Contact Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.name}</label>
                  <input
                    type="text"
                    value={contactData.name}
                    onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.yourEmail}</label>
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.contact.message}</label>
                  <textarea
                    value={contactData.message}
                    onChange={(e) => setContactData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={t.contact.messagePlaceholder}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                  />
                </div>
                <button
                  onClick={handleContactSubmit}
                  disabled={!contactData.name || !contactData.email || !contactData.message || isLoading}
                  className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl text-white font-bold text-lg hover:from-yellow-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading && (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {isLoading ? t.contact.sending : t.contact.send}
                </button>
              </div>

              {/* Contact Info */}
              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-400">{t.contact.email}</p>
                    <p className="font-medium">contact@all-influencer.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-400">{t.contact.phone}</p>
                    <p className="font-medium">+49 123 456 789</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-400">{t.contact.address}</p>
                    <p className="font-medium">Berlin, Deutschland</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        )}

        {/* About Modal */}
        {activeModal === 'about' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold">{t.about.title}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-400 mb-8">{t.about.text}</p>

              <h3 className="font-semibold text-lg mb-4">{t.about.categoriesTitle}</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(categoryData).map(([key, data]) => (
                  <div key={key} className={`p-4 rounded-xl bg-gradient-to-br ${data.color} bg-opacity-20`}>
                    <span className="text-2xl">{data.icon}</span>
                    <h4 className="font-semibold mt-2">{t.categories[key]}</h4>
                    <p className="text-sm text-gray-300">{t.categories.minFollowers}: {data.minFollowers}</p>
                    <p className="text-sm text-gray-300">{data.price}{t.categories.priceMonth}</p>
                  </div>
                ))}
                </div>
            </div>
          </div>
        )}

        {/* Work With Us Modal */}
        {activeModal === 'workWithUs' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold">{t.workWithUs.title}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-400 mb-6">{t.workWithUs.text}</p>

              <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-xl text-black font-bold text-lg hover:from-yellow-500 hover:to-amber-700 transition-all">
                {t.workWithUs.apply}
              </button>
            </div>
          </div>
        )}

        {/* Privacy Modal */}
        {activeModal === 'privacy' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold">{t.privacy.title}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-400">{t.privacy.text}</p>
            </div>
          </div>
        )}

        {/* Terms Modal */}
        {activeModal === 'terms' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold">{t.terms.title}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-400">{t.terms.text}</p>
            </div>
          </div>
        )}

        {/* Imprint Modal */}
        {activeModal === 'imprint' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold">{t.footer.imprint}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2 text-gray-400">
                <p><strong className="text-white">ALL INFLUENCER</strong></p>
                <p>Musterstraße 123</p>
                <p>10115 Berlin</p>
                <p>Deutschland</p>
                <br />
                <p>E-Mail: contact@all-influencer.com</p>
                <p>Tel: +49 123 456 789</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ==================== GLOBAL STYLES ==================== */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
          }
