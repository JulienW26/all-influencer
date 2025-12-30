import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const translations = {
  de: {
    pageTitle: 'Neues Passwort | ALL INFLUENCER',
    title: 'Neues Passwort erstellen',
    subtitle: 'Gib dein neues Passwort ein',
    newPassword: 'Neues Passwort',
    confirmPassword: 'Passwort bestätigen',
    passwordPlaceholder: 'Mindestens 8 Zeichen',
    confirmPlaceholder: 'Passwort wiederholen',
    submit: 'Passwort ändern',
    submitting: 'Wird geändert...',
    success: 'Passwort erfolgreich geändert!',
    successDesc: 'Du kannst dich jetzt mit deinem neuen Passwort anmelden.',
    backToLogin: 'Zum Login',
    invalidToken: 'Ungültiger Link',
    invalidTokenDesc: 'Dieser Link ist ungültig oder abgelaufen. Bitte fordere einen neuen Link an.',
    requestNew: 'Neuen Link anfordern',
    passwordMismatch: 'Passwörter stimmen nicht überein',
    passwordTooShort: 'Passwort muss mindestens 8 Zeichen haben',
    error: 'Fehler beim Ändern des Passworts',
    loading: 'Link wird überprüft...',
    requirements: 'Mindestens 8 Zeichen',
    showPassword: 'Passwort anzeigen',
    hidePassword: 'Passwort verbergen'
  },
  en: {
    pageTitle: 'New Password | ALL INFLUENCER',
    title: 'Create new password',
    subtitle: 'Enter your new password',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
    passwordPlaceholder: 'At least 8 characters',
    confirmPlaceholder: 'Repeat password',
    submit: 'Change password',
    submitting: 'Changing...',
    success: 'Password changed successfully!',
    successDesc: 'You can now log in with your new password.',
    backToLogin: 'Go to Login',
    invalidToken: 'Invalid link',
    invalidTokenDesc: 'This link is invalid or expired. Please request a new link.',
    requestNew: 'Request new link',
    passwordMismatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 8 characters',
    error: 'Error changing password',
    loading: 'Verifying link...',
    requirements: 'At least 8 characters',
    showPassword: 'Show password',
    hidePassword: 'Hide password'
  },
  es: {
    pageTitle: 'Nueva Contraseña | ALL INFLUENCER',
    title: 'Crear nueva contraseña',
    subtitle: 'Ingresa tu nueva contraseña',
    newPassword: 'Nueva contraseña',
    confirmPassword: 'Confirmar contraseña',
    passwordPlaceholder: 'Mínimo 8 caracteres',
    confirmPlaceholder: 'Repetir contraseña',
    submit: 'Cambiar contraseña',
    submitting: 'Cambiando...',
    success: '¡Contraseña cambiada exitosamente!',
    successDesc: 'Ahora puedes iniciar sesión con tu nueva contraseña.',
    backToLogin: 'Ir al Login',
    invalidToken: 'Enlace inválido',
    invalidTokenDesc: 'Este enlace es inválido o ha expirado. Por favor solicita un nuevo enlace.',
    requestNew: 'Solicitar nuevo enlace',
    passwordMismatch: 'Las contraseñas no coinciden',
    passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
    error: 'Error al cambiar la contraseña',
    loading: 'Verificando enlace...',
    requirements: 'Mínimo 8 caracteres',
    showPassword: 'Mostrar contraseña',
    hidePassword: 'Ocultar contraseña'
  }
};

export default function ResetPassword() {
  const router = useRouter();
  const { token, lang: queryLang } = router.query;
  
  const [lang, setLang] = useState('de');
  const t = translations[lang];
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Sprache aus URL-Parameter übernehmen
  useEffect(() => {
    if (queryLang && translations[queryLang]) {
      setLang(queryLang);
    }
  }, [queryLang]);

  // Token validieren beim Laden
  useEffect(() => {
    if (!token) return;
    
    const validateToken = async () => {
      try {
        const res = await fetch(`/api/portal/reset-password?token=${token}`);
        const data = await res.json();
        
        if (data.valid) {
          setTokenValid(true);
          setMaskedEmail(data.email || '');
        } else {
          setTokenValid(false);
        }
      } catch (err) {
        console.error('Token-Validierung Fehler:', err);
        setTokenValid(false);
      } finally {
        setLoading(false);
      }
    };
    
    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validierung
    if (password.length < 8) {
      setError(t.passwordTooShort);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/portal/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.error || t.error);
      }
    } catch (err) {
      console.error('Reset Fehler:', err);
      setError(t.error);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading State
  if (loading && token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Head>
          <title>{t.pageTitle}</title>
        </Head>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-gray-400">{t.loading}</p>
        </div>
      </div>
    );
  }

  // Ungültiger Token
  if (!tokenValid && !loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Head>
          <title>{t.pageTitle}</title>
        </Head>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-amber-400">
              ALL INFLUENCER
            </Link>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t.invalidToken}</h1>
            <p className="text-gray-400 mb-6">{t.invalidTokenDesc}</p>
            <Link
              href="/portal/forgot-password"
              className="inline-block px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors"
            >
              {t.requestNew}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Erfolg
  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Head>
          <title>{t.pageTitle}</title>
        </Head>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-amber-400">
              ALL INFLUENCER
            </Link>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t.success}</h1>
            <p className="text-gray-400 mb-6">{t.successDesc}</p>
            <Link
              href="/portal/login"
              className="inline-block px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors"
            >
              {t.backToLogin}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Formular
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Head>
        <title>{t.pageTitle}</title>
      </Head>
      
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-amber-400">
            ALL INFLUENCER
          </Link>
        </div>

        {/* Sprachumschalter */}
        <div className="flex justify-center gap-2 mb-6">
          {['de', 'en', 'es'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                lang === l
                  ? 'bg-amber-400 text-black'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Formular */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">{t.title}</h1>
            <p className="text-gray-400">{t.subtitle}</p>
            {maskedEmail && (
              <p className="text-amber-400 text-sm mt-2">{maskedEmail}</p>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Neues Passwort */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t.newPassword}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  title={showPassword ? t.hidePassword : t.showPassword}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">{t.requirements}</p>
            </div>

            {/* Passwort bestätigen */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t.confirmPassword}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t.confirmPlaceholder}
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  title={showConfirmPassword ? t.hidePassword : t.showPassword}
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? t.submitting : t.submit}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/portal/login" className="text-amber-400 hover:underline text-sm">
              {t.backToLogin}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
