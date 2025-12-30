import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function PortalRegister() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Code eingeben, 2: Formular, 3: Bestätigung
  const [codeType, setCodeType] = useState(null); // 'influencer' oder 'brand'
  const [invitationCode, setInvitationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Influencer Formular
  const [influencerData, setInfluencerData] = useState({
    email: '',
    profileLink: '',
    screenshot: null
  });
  
  // Brand Formular
  const [brandData, setBrandData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
    website: '',
    logo: null,
    description: ''
  });

  // Formatiere Einladungscode mit Bindestrichen
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

      // Code ist gültig - bestimme Typ
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
    setLoading(true);

    try {
      const res = await fetch('/api/portal/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationCode: invitationCode,
          userType: 'influencer',
          email: influencerData.email,
          profileLink: influencerData.profileLink,
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
    setLoading(true);

    try {
      const res = await fetch('/api/portal/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationCode: invitationCode,
          userType: 'brand',
          email: brandData.email,
          companyName: brandData.companyName,
          contactName: brandData.contactName,
          phone: brandData.phone,
          industry: brandData.industry,
          website: brandData.website,
          description: brandData.description,
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

  return (
    <>
      <Head>
        <title>Registrierung | ALL INFLUENCER</title>
      </Head>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        {/* Logo */}
        <Link href="/" className="mb-8">
          <h1 className="text-3xl font-bold text-amber-400">ALL INFLUENCER</h1>
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s
                    ? 'bg-amber-400 text-black'
                    : 'bg-gray-800 text-gray-500'
                }`}
              >
                {step > s ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-0.5 ${step > s ? 'bg-amber-400' : 'bg-gray-800'}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 p-6 md:p-8">
          
          {/* Step 1: Code eingeben */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Einladungscode eingeben
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Gib deinen persönlichen Einladungscode ein
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
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
                <p className="mt-2 text-xs text-gray-500 text-center">
                  IN-Codes für Influencer • BR-Codes für Brands
                </p>
              </div>

              <button
                onClick={verifyCode}
                disabled={loading || invitationCode.length !== 17}
                className="w-full py-3 px-4 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Prüfe...' : 'Code prüfen'}
              </button>
            </>
          )}

          {/* Step 2: Influencer Formular */}
          {step === 2 && codeType === 'influencer' && (
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Influencer Registrierung
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Verifiziere deinen Account
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Info Box */}
              <div className="mb-6 p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg">
                <p className="text-amber-400 text-sm flex items-start">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>
                    <strong>Mindest-Follower:</strong> 1.000.000 auf mindestens einer Plattform
                  </span>
                </p>
              </div>

              <form onSubmit={handleInfluencerSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    required
                    value={influencerData.email}
                    onChange={(e) => setInfluencerData({...influencerData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="deine@email.com"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Link zum Hauptprofil *
                  </label>
                  <input
                    type="url"
                    required
                    value={influencerData.profileLink}
                    onChange={(e) => setInfluencerData({...influencerData, profileLink: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="https://instagram.com/deinname"
                  />
                  <p className="mt-1 text-xs text-gray-500">Instagram, TikTok, YouTube oder andere</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Screenshot Follower-Nachweis
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setInfluencerData({...influencerData, screenshot: e.target.files[0]})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-400 file:text-black file:font-medium hover:file:bg-amber-500"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Optional - beschleunigt die Verifizierung</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Wird gesendet...' : 'Zur Prüfung einreichen'}
                </button>
              </form>
            </>
          )}

          {/* Step 2: Brand Formular */}
          {step === 2 && codeType === 'brand' && (
            <>
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Brand Registrierung
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Registriere dein Unternehmen
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleBrandSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Firmenname *</label>
                  <input
                    type="text"
                    required
                    value={brandData.companyName}
                    onChange={(e) => setBrandData({...brandData, companyName: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Muster GmbH"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ansprechpartner *</label>
                  <input
                    type="text"
                    required
                    value={brandData.contactName}
                    onChange={(e) => setBrandData({...brandData, contactName: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Max Mustermann"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">E-Mail-Adresse *</label>
                  <input
                    type="email"
                    required
                    value={brandData.email}
                    onChange={(e) => setBrandData({...brandData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="kontakt@firma.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={brandData.phone}
                    onChange={(e) => setBrandData({...brandData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="+49 123 456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Branche *</label>
                  <select
                    required
                    value={brandData.industry}
                    onChange={(e) => setBrandData({...brandData, industry: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="fashion">Fashion & Beauty</option>
                    <option value="tech">Technologie</option>
                    <option value="food">Food & Beverage</option>
                    <option value="travel">Travel & Hospitality</option>
                    <option value="fitness">Fitness & Sport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="finance">Finanzen</option>
                    <option value="automotive">Automotive</option>
                    <option value="other">Sonstige</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                  <input
                    type="url"
                    value={brandData.website}
                    onChange={(e) => setBrandData({...brandData, website: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="https://firma.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBrandData({...brandData, logo: e.target.files[0]})}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-400 file:text-black file:font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Kurze Beschreibung</label>
                  <textarea
                    value={brandData.description}
                    onChange={(e) => setBrandData({...brandData, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                    placeholder="Was macht Ihr Unternehmen? Was ist Ihr Interesse an der Plattform?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Wird gesendet...' : 'Antrag absenden'}
                </button>
              </form>
            </>
          )}

          {/* Step 3: Bestätigung */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Vielen Dank!
              </h2>
              <p className="text-gray-400 mb-6">
                Wir prüfen deinen Antrag und melden uns per E-Mail bei dir.
              </p>
              <p className="text-gray-500 text-sm mb-8">
                Die Prüfung dauert normalerweise 24-48 Stunden.
              </p>
              <Link
                href="/"
                className="inline-block py-3 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Zurück zur Hauptseite
              </Link>
            </div>
          )}
        </div>

        {/* Back Links */}
        {step !== 3 && (
          <div className="mt-6 flex flex-col items-center space-y-2">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-500 hover:text-gray-300"
              >
                ← Anderen Code eingeben
              </button>
            )}
            <Link
              href="/portal/login"
              className="text-sm text-amber-400 hover:text-amber-300"
            >
              Bereits registriert? Anmelden
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
