import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Übersetzungen
const translations = {
  de: {
    pageTitle: 'Registrierung | ALL INFLUENCER',
    step1Title: 'Einladungscode eingeben',
    step1Subtitle: 'Gib deinen persönlichen Einladungscode ein',
    codeHint: 'IN-Codes für Influencer • BR-Codes für Brands',
    verifyButton: 'Code prüfen',
    verifying: 'Prüfe...',
    // Influencer
    influencerTitle: 'Influencer Registrierung',
    influencerSubtitle: 'Erstelle deinen Account',
    // Brand
    brandTitle: 'Brand Registrierung',
    brandSubtitle: 'Registriere dein Unternehmen',
    // Felder
    emailLabel: 'E-Mail-Adresse *',
    emailPlaceholder: 'deine@email.com',
    passwordLabel: 'Passwort *',
    passwordPlaceholder: 'Mindestens 8 Zeichen',
    passwordConfirmLabel: 'Passwort bestätigen *',
    passwordConfirmPlaceholder: 'Passwort wiederholen',
    profileLinkLabel: 'Link zum Hauptprofil',
    profileLinkPlaceholder: 'https://instagram.com/deinname',
    profileLinkHint: 'Instagram, TikTok, YouTube oder andere',
    companyNameLabel: 'Firmenname *',
    companyNamePlaceholder: 'Muster GmbH',
    contactNameLabel: 'Ansprechpartner *',
    contactNamePlaceholder: 'Max Mustermann',
    phoneLabel: 'Telefon',
    phonePlaceholder: '+49 123 456789',
    industryLabel: 'Branche *',
    industryPlaceholder: 'Bitte wählen...',
    websiteLabel: 'Website',
    websitePlaceholder: 'https://firma.com',
    descriptionLabel: 'Kurze Beschreibung',
    descriptionPlaceholder: 'Was macht Ihr Unternehmen?',
    registerButton: 'Registrieren',
    registering: 'Wird gesendet...',
    // Industrien
    industryFashion: 'Fashion & Beauty',
    industryTech: 'Technologie',
    industryFood: 'Food & Beverage',
    industryTravel: 'Travel & Hospitality',
    industryFitness: 'Fitness & Sport',
    industryEntertainment: 'Entertainment',
    industryFinance: 'Finanzen',
    industryAutomotive: 'Automotive',
    industryOther: 'Sonstige',
    // Erfolg
    successTitle: 'Registrierung erfolgreich!',
    successMessage: 'Dein Account wird geprüft. Wir melden uns per E-Mail bei dir.',
    successNote: 'Die Prüfung dauert normalerweise 24-48 Stunden.',
    toLogin: 'Zum Login',
    // Errors
    errorPasswordMatch: 'Passwörter stimmen nicht überein',
    errorPasswordLength: 'Passwort muss mindestens 8 Zeichen haben',
    // Links
    otherCode: '← Anderen Code eingeben',
    alreadyRegistered: 'Bereits registriert? Anmelden'
  },
  en: {
    pageTitle: 'Registration | ALL INFLUENCER',
    step1Title: 'Enter Invitation Code',
    step1Subtitle: 'Enter your personal invitation code',
    codeHint: 'IN-codes for Influencers • BR-codes for Brands',
    verifyButton: 'Verify Code',
    verifying: 'Verifying...',
    influencerTitle: 'Influencer Registration',
    influencerSubtitle: 'Create your account',
    brandTitle: 'Brand Registration',
    brandSubtitle: 'Register your company',
    emailLabel: 'Email Address *',
    emailPlaceholder: 'your@email.com',
    passwordLabel: 'Password *',
    passwordPlaceholder: 'At least 8 characters',
    passwordConfirmLabel: 'Confirm Password *',
    passwordConfirmPlaceholder: 'Repeat password',
    profileLinkLabel: 'Link to Main Profile',
    profileLinkPlaceholder: 'https://instagram.com/yourname',
    profileLinkHint: 'Instagram, TikTok, YouTube or other',
    companyNameLabel: 'Company Name *',
    companyNamePlaceholder: 'Sample Inc.',
    contactNameLabel: 'Contact Person *',
    contactNamePlaceholder: 'John Doe',
    phoneLabel: 'Phone',
    phonePlaceholder: '+1 234 567890',
    industryLabel: 'Industry *',
    industryPlaceholder: 'Please select...',
    websiteLabel: 'Website',
    websitePlaceholder: 'https://company.com',
    descriptionLabel: 'Short Description',
    descriptionPlaceholder: 'What does your company do?',
    registerButton: 'Register',
    registering: 'Submitting...',
    industryFashion: 'Fashion & Beauty',
    industryTech: 'Technology',
    industryFood: 'Food & Beverage',
    industryTravel: 'Travel & Hospitality',
    industryFitness: 'Fitness & Sport',
    industryEntertainment: 'Entertainment',
    industryFinance: 'Finance',
    industryAutomotive: 'Automotive',
    industryOther: 'Other',
    successTitle: 'Registration successful!',
    successMessage: 'Your account is being reviewed. We will contact you via email.',
    successNote: 'Review usually takes 24-48 hours.',
    toLogin: 'Go to Login',
    errorPasswordMatch: 'Passwords do not match',
    errorPasswordLength: 'Password must be at least 8 characters',
    otherCode: '← Enter different code',
    alreadyRegistered: 'Already registered? Sign in'
  },
  es: {
    pageTitle: 'Registro | ALL INFLUENCER',
    step1Title: 'Ingresa el código de invitación',
    step1Subtitle: 'Ingresa tu código de invitación personal',
    codeHint: 'Códigos IN para Influencers • Códigos BR para Brands',
    verifyButton: 'Verificar código',
    verifying: 'Verificando...',
    influencerTitle: 'Registro de Influencer',
    influencerSubtitle: 'Crea tu cuenta',
    brandTitle: 'Registro de Brand',
    brandSubtitle: 'Registra tu empresa',
    emailLabel: 'Correo electrónico *',
    emailPlaceholder: 'tu@email.com',
    passwordLabel: 'Contraseña *',
    passwordPlaceholder: 'Mínimo 8 caracteres',
    passwordConfirmLabel: 'Confirmar contraseña *',
    passwordConfirmPlaceholder: 'Repetir contraseña',
    profileLinkLabel: 'Link al perfil principal',
    profileLinkPlaceholder: 'https://instagram.com/tunombre',
    profileLinkHint: 'Instagram, TikTok, YouTube u otro',
    companyNameLabel: 'Nombre de la empresa *',
    companyNamePlaceholder: 'Empresa S.A.',
    contactNameLabel: 'Persona de contacto *',
    contactNamePlaceholder: 'Juan Pérez',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '+34 123 456789',
    industryLabel: 'Industria *',
    industryPlaceholder: 'Por favor selecciona...',
    websiteLabel: 'Sitio web',
    websitePlaceholder: 'https://empresa.com',
    descriptionLabel: 'Descripción breve',
    descriptionPlaceholder: '¿Qué hace tu empresa?',
    registerButton: 'Registrarse',
    registering: 'Enviando...',
    industryFashion: 'Moda y Belleza',
    industryTech: 'Tecnología',
    industryFood: 'Alimentación y Bebidas',
    industryTravel: 'Viajes y Hospitalidad',
    industryFitness: 'Fitness y Deporte',
    industryEntertainment: 'Entretenimiento',
    industryFinance: 'Finanzas',
    industryAutomotive: 'Automotriz',
    industryOther: 'Otros',
    successTitle: '¡Registro exitoso!',
    successMessage: 'Tu cuenta está siendo revisada. Te contactaremos por email.',
    successNote: 'La revisión normalmente toma 24-48 horas.',
    toLogin: 'Ir al Login',
    errorPasswordMatch: 'Las contraseñas no coinciden',
    errorPasswordLength: 'La contraseña debe tener al menos 8 caracteres',
    otherCode: '← Ingresar otro código',
    alreadyRegistered: '¿Ya registrado? Iniciar sesión'
  }
};

export default function PortalRegister() {
  const [lang, setLang] = useState('de');
  const t = translations[lang];

  const [step, setStep] = useState(1);
  const [codeType, setCodeType] = useState(null);
  const [invitationCode, setInvitationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Passwort-Sichtbarkeit States
  const [showInfluencerPassword, setShowInfluencerPassword] = useState(false);
  const [showInfluencerPasswordConfirm, setShowInfluencerPasswordConfirm] = useState(false);
  const [showBrandPassword, setShowBrandPassword] = useState(false);
  const [showBrandPasswordConfirm, setShowBrandPasswordConfirm] = useState(false);
  
  const [influencerData, setInfluencerData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    profileLink: '',
  });
  
  const [brandData, setBrandData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    industry: '',
    website: '',
    description: ''
  });

  const formatCode = (value) => {
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    let formatted = '';
    if (cleaned.length > 0) formatted = cleaned.substring(0, 2);
    if (cleaned.length > 2) formatted += '-' + cleaned.substring(2, 6);
    if (cleaned.length > 6) formatted += '-' + cleaned.substring(6, 10);
    if (cleaned.length > 10) formatted += '-' + cleaned.substring(10, 14);
    return formatted;
  };

  const handleCodeChange = (e) => {
    const formatted = formatCode(e.target.value);
    setInvitationCode(formatted);
    setError('');
  };

  const verifyCode = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/portal/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: invitationCode })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Code ungültig');
      }

      if (invitationCode.startsWith('IN-')) {
        setCodeType('influencer');
      } else if (invitationCode.startsWith('BR-')) {
        setCodeType('brand');
      }
      
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInfluencerSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (influencerData.password !== influencerData.passwordConfirm) {
      setError(t.errorPasswordMatch);
      return;
    }

    if (influencerData.password.length < 8) {
      setError(t.errorPasswordLength);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/portal/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationCode: invitationCode,
          email: influencerData.email,
          password: influencerData.password,
          profileLink: influencerData.profileLink,
          userType: 'influencer',
          role: 'influencer'
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registrierung fehlgeschlagen');
      }

      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (brandData.password !== brandData.passwordConfirm) {
      setError(t.errorPasswordMatch);
      return;
    }

    if (brandData.password.length < 8) {
      setError(t.errorPasswordLength);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/portal/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationCode: invitationCode,
          email: brandData.email,
          password: brandData.password,
          companyName: brandData.companyName,
          contactName: brandData.contactName,
          phone: brandData.phone,
          industry: brandData.industry,
          website: brandData.website,
          description: brandData.description,
          userType: 'brand',
          role: 'brand'
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registrierung fehlgeschlagen');
      }

      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auge-Symbol Komponente
  const PasswordToggle = ({ show, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
    >
      {show ? (
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
  );

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

        <Link href="/" className="mb-8">
          <h1 className="text-3xl font-bold text-amber-400">ALL INFLUENCER</h1>
        </Link>

        <div className="flex items-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? 'bg-amber-400 text-black' : 'bg-gray-800 text-gray-500'}`}>
                {step > s ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : s}
              </div>
              {s < 3 && <div className={`w-16 h-0.5 ${step > s ? 'bg-amber-400' : 'bg-gray-800'}`}></div>}
            </div>
          ))}
        </div>

        <div className="w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 p-6 md:p-8">
          
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-2">{t.step1Title}</h2>
              <p className="text-gray-400 text-center mb-6">{t.step1Subtitle}</p>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>
              )}

              <div className="mb-6">
                <input
                  type="text"
                  value={invitationCode}
                  onChange={handleCodeChange}
                  maxLength={17}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent font-mono text-center text-xl tracking-wider"
                  placeholder="XX-XXXX-XXXX-XXXX"
                />
                <p className="mt-2 text-xs text-gray-500 text-center">{t.codeHint}</p>
              </div>

              <button
                onClick={verifyCode}
                disabled={loading || invitationCode.length !== 17}
                className="w-full py-3 px-4 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? t.verifying : t.verifyButton}
              </button>
            </>
          )}

          {step === 2 && codeType === 'influencer' && (
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-2">{t.influencerTitle}</h2>
              <p className="text-gray-400 text-center mb-6">{t.influencerSubtitle}</p>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>
              )}

              <form onSubmit={handleInfluencerSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={influencerData.email}
                    onChange={(e) => setInfluencerData({...influencerData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder={t.emailPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.passwordLabel}</label>
                  <div className="relative">
                    <input
                      type={showInfluencerPassword ? 'text' : 'password'}
                      required
                      value={influencerData.password}
                      onChange={(e) => setInfluencerData({...influencerData, password: e.target.value})}
                      className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder={t.passwordPlaceholder}
                    />
                    <PasswordToggle show={showInfluencerPassword} onClick={() => setShowInfluencerPassword(!showInfluencerPassword)} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.passwordConfirmLabel}</label>
                  <div className="relative">
                    <input
                      type={showInfluencerPasswordConfirm ? 'text' : 'password'}
                      required
                      value={influencerData.passwordConfirm}
                      onChange={(e) => setInfluencerData({...influencerData, passwordConfirm: e.target.value})}
                      className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder={t.passwordConfirmPlaceholder}
                    />
                    <PasswordToggle show={showInfluencerPasswordConfirm} onClick={() => setShowInfluencerPasswordConfirm(!showInfluencerPasswordConfirm)} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.profileLinkLabel}</label>
                  <input
                    type="url"
                    value={influencerData.profileLink}
                    onChange={(e) => setInfluencerData({...influencerData, profileLink: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder={t.profileLinkPlaceholder}
                  />
                  <p className="mt-1 text-xs text-gray-500">{t.profileLinkHint}</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? t.registering : t.registerButton}
                </button>
              </form>
            </>
          )}

          {step === 2 && codeType === 'brand' && (
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-2">{t.brandTitle}</h2>
              <p className="text-gray-400 text-center mb-6">{t.brandSubtitle}</p>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>
              )}

              <form onSubmit={handleBrandSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.emailLabel}</label>
                  <input type="email" required value={brandData.email} onChange={(e) => setBrandData({...brandData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={t.emailPlaceholder} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.passwordLabel}</label>
                  <div className="relative">
                    <input type={showBrandPassword ? 'text' : 'password'} required value={brandData.password} onChange={(e) => setBrandData({...brandData, password: e.target.value})} className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={t.passwordPlaceholder} />
                    <PasswordToggle show={showBrandPassword} onClick={() => setShowBrandPassword(!showBrandPassword)} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.passwordConfirmLabel}</label>
                  <div className="relative">
                    <input type={showBrandPasswordConfirm ? 'text' : 'password'} required value={brandData.passwordConfirm} onChange={(e) => setBrandData({...brandData, passwordConfirm: e.target.value})} className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={t.passwordConfirmPlaceholder} />
                    <PasswordToggle show={showBrandPasswordConfirm} onClick={() => setShowBrandPasswordConfirm(!showBrandPasswordConfirm)} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.companyNameLabel}</label>
                  <input type="text" required value={brandData.companyName} onChange={(e) => setBrandData({...brandData, companyName: e.target.value})} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={t.companyNamePlaceholder} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.contactNameLabel}</label>
                  <input type="text" required value={brandData.contactName} onChange={(e) => setBrandData({...brandData, contactName: e.target.value})} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={t.contactNamePlaceholder} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.phoneLabel}</label>
                  <input type="tel" value={brandData.phone} onChange={(e) => setBrandData({...brandData, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={t.phonePlaceholder} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.industryLabel}</label>
                  <select required value={brandData.industry} onChange={(e) => setBrandData({...brandData, industry: e.target.value})} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400">
                    <option value="">{t.industryPlaceholder}</option>
                    <option value="fashion">{t.industryFashion}</option>
                    <option value="tech">{t.industryTech}</option>
                    <option value="food">{t.industryFood}</option>
                    <option value="travel">{t.industryTravel}</option>
                    <option value="fitness">{t.industryFitness}</option>
                    <option value="entertainment">{t.industryEntertainment}</option>
                    <option value="finance">{t.industryFinance}</option>
                    <option value="automotive">{t.industryAutomotive}</option>
                    <option value="other">{t.industryOther}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.websiteLabel}</label>
                  <input type="url" value={brandData.website} onChange={(e) => setBrandData({...brandData, website: e.target.value})} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={t.websitePlaceholder} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.descriptionLabel}</label>
                  <textarea value={brandData.description} onChange={(e) => setBrandData({...brandData, description: e.target.value})} rows={3} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" placeholder={t.descriptionPlaceholder} />
                </div>

                <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {loading ? t.registering : t.registerButton}
                </button>
              </form>
            </>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{t.successTitle}</h2>
              <p className="text-gray-400 mb-6">{t.successMessage}</p>
              <p className="text-gray-500 text-sm mb-8">{t.successNote}</p>
              <Link href="/portal/login" className="inline-block py-3 px-6 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors">
                {t.toLogin}
              </Link>
            </div>
          )}
        </div>

        {step !== 3 && (
          <div className="mt-6 flex flex-col items-center space-y-2">
            {step === 2 && (
              <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-300">{t.otherCode}</button>
            )}
            <Link href="/portal/login" className="text-sm text-amber-400 hover:text-amber-300">{t.alreadyRegistered}</Link>
          </div>
        )}
      </div>
    </>
  );
}
