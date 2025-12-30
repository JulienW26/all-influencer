import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

// Übersetzungen
const translations = {
  de: {
    pageTitle: 'Portal Login | ALL INFLUENCER',
    title: 'Portal Login',
    subtitle: 'Melde dich an, um auf dein Dashboard zuzugreifen',
    tabEmail: 'E-Mail & Passwort',
    tabCode: 'Einladungscode',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'deine@email.com',
    passwordLabel: 'Passwort',
    passwordPlaceholder: '••••••••',
    codeLabel: 'Einladungscode',
    codePlaceholder: 'IN-XXXX-XXXX-XXXX',
    codeHint: 'Format: IN-XXXX-XXXX-XXXX (Influencer) oder BR-XXXX-XXXX-XXXX (Brand)',
    loginButton: 'Anmelden',
    loggingIn: 'Anmelden...',
    forgotPassword: 'Passwort vergessen?',
    noAccount: 'Noch kein Konto?',
    register: 'Registrieren',
    backToHome: 'Zurück zur Hauptseite'
  },
  en: {
    pageTitle: 'Portal Login | ALL INFLUENCER',
    title: 'Portal Login',
    subtitle: 'Sign in to access your dashboard',
    tabEmail: 'Email & Password',
    tabCode: 'Invitation Code',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your@email.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    codeLabel: 'Invitation Code',
    codePlaceholder: 'IN-XXXX-XXXX-XXXX',
    codeHint: 'Format: IN-XXXX-XXXX-XXXX (Influencer) or BR-XXXX-XXXX-XXXX (Brand)',
    loginButton: 'Sign In',
    loggingIn: 'Signing in...',
    forgotPassword: 'Forgot password?',
    noAccount: 'No account yet?',
    register: 'Register',
    backToHome: 'Back to homepage'
  },
  es: {
    pageTitle: 'Portal Login | ALL INFLUENCER',
    title: 'Portal Login',
    subtitle: 'Inicia sesión para acceder a tu panel',
    tabEmail: 'Email y Contraseña',
    tabCode: 'Código de Invitación',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@email.com',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: '••••••••',
    codeLabel: 'Código de invitación',
    codePlaceholder: 'IN-XXXX-XXXX-XXXX',
    codeHint: 'Formato: IN-XXXX-XXXX-XXXX (Influencer) o BR-XXXX-XXXX-XXXX (Brand)',
    loginButton: 'Iniciar sesión',
    loggingIn: 'Iniciando sesión...',
    forgotPassword: '¿Olvidaste tu contraseña?',
    noAccount: '¿No tienes cuenta?',
    register: 'Registrarse',
    backToHome: 'Volver al inicio'
  }
};

export default function PortalLogin() {
  const router = useRouter();
  const [lang, setLang] = useState('de');
  const t = translations[lang];

  const [loginMethod, setLoginMethod] = useState('email'); // 'email' oder 'code'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    invitationCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Formatiere Einladungscode mit Bindestrichen
  const formatCode = (value) => {
    // Entferne alles außer alphanumerische Zeichen
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Formatiere als XX-XXXX-XXXX-XXXX
    let formatted = '';
    if (cleaned.length > 0) {
      formatted = cleaned.substring(0, 2);
    }
    if (cleaned.length > 2) {
      formatted += '-' + cleaned.substring(2, 6);
    }
    if (cleaned.length > 6) {
      formatted += '-' + cleaned.substring(6, 10);
    }
    if (cleaned.length > 10) {
      formatted += '-' + cleaned.substring(10, 14);
    }
    
    return formatted;
  };

  const handleCodeChange = (e) => {
    const formatted = formatCode(e.target.value);
    setFormData({ ...formData, invitationCode: formatted });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const body = loginMethod === 'email'
        ? { email: formData.email, password: formData.password }
        : { invitationCode: formData.invitationCode };

      const res = await fetch('/api/portal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login fehlgeschlagen');
      }

      // Erfolgreicher Login
      router.push('/portal/dashboard');
    } catch (err) {
      setError(err.message);
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
        {/* Language Switcher - NEU */}
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

        {/* Login Card */}
        <div className="w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {t.title}
          </h2>
          <p className="text-gray-400 text-center mb-6">
            {t.subtitle}
          </p>

          {/* Login Method Toggle */}
          <div className="flex bg-gray-800 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'email'
                  ? 'bg-amber-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.tabEmail}
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('code')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginMethod === 'code'
                  ? 'bg-amber-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.tabCode}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {loginMethod === 'email' ? (
              <>
                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder={t.emailPlaceholder}
                  />
                </div>

                {/* Password Field mit Auge-Symbol - AKTUALISIERT */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    {t.passwordLabel}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder={t.passwordPlaceholder}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Invitation Code Field */
              <div className="mb-6">
                <label htmlFor="invitationCode" className="block text-sm font-medium text-gray-300 mb-2">
                  {t.codeLabel}
                </label>
                <input
                  type="text"
                  id="invitationCode"
                  name="invitationCode"
                  value={formData.invitationCode}
                  onChange={handleCodeChange}
                  required
                  maxLength={17}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent font-mono text-center tracking-wider"
                  placeholder={t.codePlaceholder}
                />
                <p className="mt-2 text-xs text-gray-500">
                  {t.codeHint}
                </p>
              </div>
            )}

            {/* Submit Button */}
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
                  {t.loggingIn}
                </span>
              ) : (
                t.loginButton
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3">
            {loginMethod === 'email' && (
              <Link
                href="/portal/forgot-password"
                className="block text-center text-sm text-amber-400 hover:text-amber-300"
              >
                {t.forgotPassword}
              </Link>
            )}
            
            <div className="text-center text-sm text-gray-400">
              {t.noAccount}{' '}
              <Link href="/portal/register" className="text-amber-400 hover:text-amber-300">
                {t.register}
              </Link>
            </div>
          </div>
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
