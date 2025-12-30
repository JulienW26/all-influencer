import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Übersetzungen
const translations = {
  de: {
    pageTitle: 'Passwort vergessen | ALL INFLUENCER',
    title: 'Passwort vergessen?',
    subtitle: 'Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen.',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'deine@email.com',
    submitButton: 'Reset-Link senden',
    submitting: 'Wird gesendet...',
    successTitle: 'E-Mail gesendet!',
    successMessage: 'Falls ein Account mit dieser E-Mail existiert, erhältst du in Kürze einen Link zum Zurücksetzen deines Passworts.',
    backToLogin: 'Zurück zum Login',
    backToHome: 'Zurück zur Hauptseite',
    rememberPassword: 'Erinnerst du dich an dein Passwort?',
    loginNow: 'Jetzt anmelden'
  },
  en: {
    pageTitle: 'Forgot Password | ALL INFLUENCER',
    title: 'Forgot your password?',
    subtitle: 'Enter your email address and we will send you a reset link.',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your@email.com',
    submitButton: 'Send Reset Link',
    submitting: 'Sending...',
    successTitle: 'Email sent!',
    successMessage: 'If an account with this email exists, you will receive a password reset link shortly.',
    backToLogin: 'Back to Login',
    backToHome: 'Back to homepage',
    rememberPassword: 'Remember your password?',
    loginNow: 'Sign in now'
  },
  es: {
    pageTitle: 'Olvidé mi contraseña | ALL INFLUENCER',
    title: '¿Olvidaste tu contraseña?',
    subtitle: 'Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@email.com',
    submitButton: 'Enviar enlace',
    submitting: 'Enviando...',
    successTitle: '¡Correo enviado!',
    successMessage: 'Si existe una cuenta con este correo, recibirás un enlace para restablecer tu contraseña.',
    backToLogin: 'Volver al login',
    backToHome: 'Volver al inicio',
    rememberPassword: '¿Recuerdas tu contraseña?',
    loginNow: 'Iniciar sesión'
  }
};

export default function ForgotPassword() {
  const [lang, setLang] = useState('de');
  const t = translations[lang];

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/portal/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      // Immer Erfolg anzeigen (aus Sicherheitsgründen - wie in der API)
      setSuccess(true);
    } catch (err) {
      // Auch bei Fehler Erfolg zeigen (Sicherheit)
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t.pageTitle}</title>
      </Head>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        {/* Language Switcher */}
        <div className="absolute top-4 right-4 flex gap-1">
          {['DE', 'EN', 'ES'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l.toLowerCase())}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                lang === l.toLowerCase()
                  ? 'bg-amber-400 text-black font-medium'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Logo */}
        <Link href="/" className="mb-8">
          <h1 className="text-3xl font-bold text-amber-400">ALL INFLUENCER</h1>
        </Link>

        {/* Card */}
        <div className="w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 p-6 md:p-8">
          {success ? (
            // Erfolgsanzeige
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{t.successTitle}</h2>
              <p className="text-gray-400 mb-6">{t.successMessage}</p>
              <Link
                href="/portal/login"
                className="inline-block py-3 px-6 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors"
              >
                {t.backToLogin}
              </Link>
            </div>
          ) : (
            // Formular
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                {t.title}
              </h2>
              <p className="text-gray-400 text-center mb-6">
                {t.subtitle}
              </p>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder={t.emailPlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t.submitting}
                    </span>
                  ) : (
                    t.submitButton
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                {t.rememberPassword}{' '}
                <Link href="/portal/login" className="text-amber-400 hover:text-amber-300">
                  {t.loginNow}
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Back to Homepage */}
        <Link
          href="/"
          className="mt-6 text-sm text-gray-500 hover:text-gray-300 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t.backToHome}
        </Link>
      </div>
    </>
  );
}
