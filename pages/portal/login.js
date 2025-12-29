import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function PortalLogin() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' oder 'code'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    invitationCode: ''
  });
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
        <title>Portal Login | ALL INFLUENCER</title>
      </Head>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        {/* Logo */}
        <Link href="/" className="mb-8">
          <h1 className="text-3xl font-bold text-amber-400">ALL INFLUENCER</h1>
        </Link>

        {/* Login Card */}
        <div className="w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Portal Login
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Melde dich an, um auf dein Dashboard zuzugreifen
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
              E-Mail & Passwort
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
              Einladungscode
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
                    E-Mail-Adresse
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="deine@email.com"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Passwort
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </>
            ) : (
              /* Invitation Code Field */
              <div className="mb-6">
                <label htmlFor="invitationCode" className="block text-sm font-medium text-gray-300 mb-2">
                  Einladungscode
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
                  placeholder="IN-XXXX-XXXX-XXXX"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Format: IN-XXXX-XXXX-XXXX (Influencer) oder BR-XXXX-XXXX-XXXX (Brand)
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
                  Anmelden...
                </span>
              ) : (
                'Anmelden'
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
                Passwort vergessen?
              </Link>
            )}
            
            <div className="text-center text-sm text-gray-400">
              Noch kein Konto?{' '}
              <Link href="/portal/register" className="text-amber-400 hover:text-amber-300">
                Registrieren
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
          Zurück zur Hauptseite
        </Link>
      </div>
    </>
  );
}
