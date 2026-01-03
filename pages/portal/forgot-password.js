import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { usePortalLanguage } from '../../lib/usePortalLanguage';

const translations = {
  de: {
    pageTitle: 'Passwort vergessen | ALL INFLUENCER',
    title: 'Passwort vergessen?',
    subtitle: 'Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen.',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'deine@email.com',
    submitButton: 'Link senden',
    submitting: 'Wird gesendet...',
    backToLogin: 'Zurück zum Login',
    successTitle: 'E-Mail gesendet!',
    successMessage: 'Falls ein Konto mit dieser E-Mail existiert, erhältst du in Kürze eine E-Mail mit einem Link zum Zurücksetzen deines Passworts.',
    checkSpam: 'Prüfe auch deinen Spam-Ordner.',
    errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
    errorInvalidEmail: 'Bitte gib eine gültige E-Mail-Adresse ein.'
  },
  en: {
    pageTitle: 'Forgot Password | ALL INFLUENCER',
    title: 'Forgot your password?',
    subtitle: 'Enter your email address and we\'ll send you a link to reset it.',
    emailLabel: 'Email address',
    emailPlaceholder: 'your@email.com',
    submitButton: 'Send link',
    submitting: 'Sending...',
    backToLogin: 'Back to login',
    successTitle: 'Email sent!',
    successMessage: 'If an account with this email exists, you will receive an email with a link to reset your password shortly.',
    checkSpam: 'Also check your spam folder.',
    errorGeneric: 'An error occurred. Please try again later.',
    errorInvalidEmail: 'Please enter a valid email address.'
  },
  es: {
    pageTitle: 'Olvidé mi contraseña | ALL INFLUENCER',
    title: '¿Olvidaste tu contraseña?',
    subtitle: 'Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@email.com',
    submitButton: 'Enviar enlace',
    submitting: 'Enviando...',
    backToLogin: 'Volver al inicio de sesión',
    successTitle: '¡Correo enviado!',
    successMessage: 'Si existe una cuenta con este correo, recibirás un enlace para restablecer tu contraseña en breve.',
    checkSpam: 'Revisa también tu carpeta de spam.',
    errorGeneric: 'Ocurrió un error. Por favor, inténtalo más tarde.',
    errorInvalidEmail: 'Por favor, ingresa un correo electrónico válido.'
  }
};

export default function ForgotPassword() {
  const { lang, setLang } = usePortalLanguage();
  const t = translations[lang];
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError(t.errorInvalidEmail);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/portal/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, lang }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || t.errorGeneric);
      }
    } catch (err) {
      setError(t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t.pageTitle}</title>
      </Head>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
        {/* Language Switcher */}
        <div className="absolute top-4 right-4 flex gap-2">
          {['DE', 'EN', 'ES'].map((language) => (
            <button
              key={language}
              onClick={() => setLang(language.toLowerCase())}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                lang === language.toLowerCase()
                  ? 'bg-amber-400 text-black'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {language}
            </button>
          ))}
        </div>

        {/* Logo */}
        <div className="mb-8">
          <Link href="/">
            <span className="text-2xl font-bold text-amber-400 cursor-pointer">ALL INFLUENCER</span>
          </Link>
        </div>

        {/* Card */}
        <div className="w-full max-w-md bg-gray-900 rounded-2xl border border-gray-800 p-8">
          {success ? (
            /* Success State */
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">{t.successTitle}</h1>
              <p className="text-gray-400 mb-2">{t.successMessage}</p>
              <p className="text-gray-500 text-sm mb-6">{t.checkSpam}</p>
              <Link href="/portal/login">
                <span className="inline-flex items-center text-amber-400 hover:text-amber-300 cursor-pointer">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {t.backToLogin}
                </span>
              </Link>
            </div>
          ) : (
            /* Form State */
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">{t.title}</h1>
                <p className="text-gray-400">{t.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Email Field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t.submitting : t.submitButton}
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <Link href="/portal/login">
                  <span className="inline-flex items-center text-gray-400 hover:text-white cursor-pointer">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t.backToLogin}
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
