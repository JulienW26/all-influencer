import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Fehler beim Senden');
      }

      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Passwort vergessen | ALL INFLUENCER</title>
      </Head>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        {/* Logo */}
        <Link href="/" className="mb-8">
          <h1 className="text-3xl font-bold text-amber-400">ALL INFLUENCER</h1>
        </Link>

        {/* Card */}
        <div className="w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 p-6 md:p-8">
          {!sent ? (
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Passwort vergessen?
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen deines Passworts.
              </p>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    E-Mail-Adresse
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="deine@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Wird gesendet...' : 'Reset-Link senden'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                E-Mail gesendet!
              </h2>
              <p className="text-gray-400 mb-6">
                Falls ein Account mit dieser E-Mail existiert, erhältst du in Kürze einen Link zum Zurücksetzen deines Passworts.
              </p>
              <p className="text-sm text-gray-500">
                Keine E-Mail erhalten? Prüfe deinen Spam-Ordner oder{' '}
                <button 
                  onClick={() => setSent(false)} 
                  className="text-amber-400 hover:text-amber-300"
                >
                  versuche es erneut
                </button>
              </p>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/portal/login"
              className="text-sm text-gray-400 hover:text-gray-300 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Zurück zum Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
