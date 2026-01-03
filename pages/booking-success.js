/**
 * Booking Success Page
 * Wird nach erfolgreicher Stripe-Zahlung angezeigt
 * Mit automatischer Spracherkennung (DE/EN/ES)
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Translations for different languages
const translations = {
  de: {
    title: 'Buchung erfolgreich!',
    subtitle: 'Vielen Dank für deine Buchung. Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details.',
    nextSteps: 'Nächste Schritte:',
    step1: 'Prüfe dein E-Mail-Postfach für die Bestätigung',
    step2: 'Unser Team wird sich innerhalb von 24h bei dir melden',
    step3: 'Bereite deine Profilinfos und Medien vor',
    backButton: 'Zurück zur Startseite'
  },
  en: {
    title: 'Booking Successful!',
    subtitle: 'Thank you for your booking. You will receive a confirmation email with all details shortly.',
    nextSteps: 'Next Steps:',
    step1: 'Check your inbox for the confirmation email',
    step2: 'Our team will contact you within 24 hours',
    step3: 'Prepare your profile information and media',
    backButton: 'Back to Homepage'
  },
  es: {
    title: '¡Reserva exitosa!',
    subtitle: 'Gracias por tu reserva. Recibirás un correo de confirmación con todos los detalles en breve.',
    nextSteps: 'Próximos pasos:',
    step1: 'Revisa tu bandeja de entrada para el correo de confirmación',
    step2: 'Nuestro equipo se pondrá en contacto contigo en 24 horas',
    step3: 'Prepara la información de tu perfil y medios',
    backButton: 'Volver a la página principal'
  }
};

// German-speaking countries
const germanCountries = ['DE', 'AT', 'CH', 'LI', 'LU'];
// Spanish-speaking countries  
const spanishCountries = ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR', 'GQ'];

function detectLanguage() {
  if (typeof window === 'undefined') return 'en';
  
  // First check URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam && translations[langParam]) {
    return langParam;
  }
  
  // Check localStorage for user preference from website menu
  const storedLang = localStorage.getItem('selectedLanguage');
  if (storedLang) {
    const lang = storedLang.toLowerCase();
    if (lang === 'de' || lang === 'german' || lang === 'deutsch') return 'de';
    if (lang === 'en' || lang === 'english' || lang === 'englisch') return 'en';
    if (lang === 'es' || lang === 'spanish' || lang === 'spanisch' || lang === 'español') return 'es';
  }
  
  // Check browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang) {
    const langCode = browserLang.substring(0, 2).toLowerCase();
    if (langCode === 'de') return 'de';
    if (langCode === 'es') return 'es';
    if (langCode === 'en') return 'en';
  }
  
  // Default to English
  return 'en';
}

export default function BookingSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [status, setStatus] = useState('loading');
  const [lang, setLang] = useState('en');
  const [notificationSent, setNotificationSent] = useState(false);

  // Detect language on mount
  useEffect(() => {
    const detectedLang = detectLanguage();
    setLang(detectedLang);
  }, []);

  // Handle session and send notification
  useEffect(() => {
    if (session_id) {
      setStatus('success');
      
      // Send notification email (only once)
      if (!notificationSent) {
        fetch('/api/send-booking-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session_id }),
        })
          .then(res => res.json())
          .then(data => {
            console.log('Notification sent:', data);
            setNotificationSent(true);
          })
          .catch(err => console.error('Failed to send notification:', err));
      }
    }
  }, [session_id, notificationSent]);

  const t = translations[lang] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {status === 'loading' ? (
          <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
        ) : (
          <>
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              {t.title}
            </h1>

            {/* Message */}
            <p className="text-gray-400 mb-8">
              {t.subtitle}
            </p>

            {/* Info Box */}
            <div className="bg-gray-800/50 border border-amber-400/30 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-amber-400 mb-2">{t.nextSteps}</h3>
              <ul className="text-gray-300 text-sm text-left space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">1.</span>
                  <span>{t.step1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">2.</span>
                  <span>{t.step2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">3.</span>
                  <span>{t.step3}</span>
                </li>
              </ul>
            </div>

            {/* Back Button */}
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-semibold rounded-lg transition-all"
            >
              {t.backButton}
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
