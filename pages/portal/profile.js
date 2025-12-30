import { useState, useEffect } from 'react';
import Head from 'next/head';
import PortalLayout from '../../components/portal/PortalLayout';

// Übersetzungen
const translations = {
  de: {
    pageTitle: 'Profil bearbeiten | ALL INFLUENCER',
    title: 'Profil bearbeiten',
    subtitleInfluencer: 'Vervollständige dein Profil, um für Brands sichtbar zu sein.',
    subtitleBrand: 'Aktualisiere deine Unternehmensinformationen.',
    // Influencer sections
    basicInfo: 'Grundinformationen',
    displayName: 'Anzeigename',
    displayNamePlaceholder: 'Dein Name / Künstlername',
    bio: 'Bio',
    bioPlaceholder: 'Erzähle etwas über dich...',
    location: 'Standort',
    locationPlaceholder: 'z.B. Berlin, Deutschland',
    categoriesTitle: 'Kategorien',
    categoriesHint: 'Wähle passende Kategorien für deinen Content',
    platformsTitle: 'Social Media Plattformen',
    handle: 'Handle',
    followers: 'Follower',
    followersPlaceholder: 'z.B. 1.5M',
    pricingTitle: 'Preisvorstellung',
    priceFrom: 'Ab (€)',
    priceTo: 'Bis (€)',
    languagesTitle: 'Sprachen',
    // Brand fields
    companyName: 'Firmenname',
    contactName: 'Ansprechpartner',
    phone: 'Telefon',
    industry: 'Branche',
    industryPlaceholder: 'Bitte wählen...',
    website: 'Website',
    description: 'Beschreibung',
    // Industries
    industryFashion: 'Fashion & Beauty',
    industryTech: 'Technologie',
    industryFood: 'Food & Beverage',
    industryTravel: 'Travel & Hospitality',
    industryFitness: 'Fitness & Sport',
    industryEntertainment: 'Entertainment',
    industryFinance: 'Finanzen',
    industryAutomotive: 'Automotive',
    industryOther: 'Sonstige',
    // Actions
    saveButton: 'Profil speichern',
    saving: 'Wird gespeichert...',
    successMessage: 'Profil erfolgreich gespeichert!'
  },
  en: {
    pageTitle: 'Edit Profile | ALL INFLUENCER',
    title: 'Edit Profile',
    subtitleInfluencer: 'Complete your profile to be visible to brands.',
    subtitleBrand: 'Update your company information.',
    basicInfo: 'Basic Information',
    displayName: 'Display Name',
    displayNamePlaceholder: 'Your name / stage name',
    bio: 'Bio',
    bioPlaceholder: 'Tell us about yourself...',
    location: 'Location',
    locationPlaceholder: 'e.g. Berlin, Germany',
    categoriesTitle: 'Categories',
    categoriesHint: 'Select categories that match your content',
    platformsTitle: 'Social Media Platforms',
    handle: 'Handle',
    followers: 'Followers',
    followersPlaceholder: 'e.g. 1.5M',
    pricingTitle: 'Pricing',
    priceFrom: 'From (€)',
    priceTo: 'To (€)',
    languagesTitle: 'Languages',
    companyName: 'Company Name',
    contactName: 'Contact Person',
    phone: 'Phone',
    industry: 'Industry',
    industryPlaceholder: 'Please select...',
    website: 'Website',
    description: 'Description',
    industryFashion: 'Fashion & Beauty',
    industryTech: 'Technology',
    industryFood: 'Food & Beverage',
    industryTravel: 'Travel & Hospitality',
    industryFitness: 'Fitness & Sport',
    industryEntertainment: 'Entertainment',
    industryFinance: 'Finance',
    industryAutomotive: 'Automotive',
    industryOther: 'Other',
    saveButton: 'Save Profile',
    saving: 'Saving...',
    successMessage: 'Profile saved successfully!'
  },
  es: {
    pageTitle: 'Editar Perfil | ALL INFLUENCER',
    title: 'Editar Perfil',
    subtitleInfluencer: 'Completa tu perfil para ser visible para las marcas.',
    subtitleBrand: 'Actualiza la información de tu empresa.',
    basicInfo: 'Información Básica',
    displayName: 'Nombre para mostrar',
    displayNamePlaceholder: 'Tu nombre / nombre artístico',
    bio: 'Biografía',
    bioPlaceholder: 'Cuéntanos sobre ti...',
    location: 'Ubicación',
    locationPlaceholder: 'ej. Berlín, Alemania',
    categoriesTitle: 'Categorías',
    categoriesHint: 'Selecciona categorías que coincidan con tu contenido',
    platformsTitle: 'Plataformas de Redes Sociales',
    handle: 'Usuario',
    followers: 'Seguidores',
    followersPlaceholder: 'ej. 1.5M',
    pricingTitle: 'Precios',
    priceFrom: 'Desde (€)',
    priceTo: 'Hasta (€)',
    languagesTitle: 'Idiomas',
    companyName: 'Nombre de la empresa',
    contactName: 'Persona de contacto',
    phone: 'Teléfono',
    industry: 'Industria',
    industryPlaceholder: 'Por favor selecciona...',
    website: 'Sitio web',
    description: 'Descripción',
    industryFashion: 'Moda y Belleza',
    industryTech: 'Tecnología',
    industryFood: 'Alimentación y Bebidas',
    industryTravel: 'Viajes y Hospitalidad',
    industryFitness: 'Fitness y Deporte',
    industryEntertainment: 'Entretenimiento',
    industryFinance: 'Finanzas',
    industryAutomotive: 'Automotriz',
    industryOther: 'Otros',
    saveButton: 'Guardar Perfil',
    saving: 'Guardando...',
    successMessage: '¡Perfil guardado exitosamente!'
  }
};

export default function Profile() {
  const [lang, setLang] = useState('de');
  const t = translations[lang];

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Influencer Profile Data
  const [influencerProfile, setInfluencerProfile] = useState({
    displayName: '',
    bio: '',
    categories: [],
    platforms: {
      instagram: { handle: '', followers: '' },
      tiktok: { handle: '', followers: '' },
      youtube: { handle: '', followers: '' },
      twitter: { handle: '', followers: '' }
    },
    priceRange: { min: '', max: '' },
    languages: [],
    location: ''
  });

  // Brand Profile Data
  const [brandProfile, setBrandProfile] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    industry: '',
    website: '',
    description: ''
  });

  const categories = [
    'Fashion', 'Beauty', 'Fitness', 'Travel', 'Food', 'Tech', 
    'Gaming', 'Lifestyle', 'Music', 'Comedy', 'Education', 'Finance'
  ];

  const languages = ['Deutsch', 'English', 'Español', 'Français', 'Italiano', 'Português'];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/portal/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        
        // Profil-Daten setzen
        if (data.user.userType === 'influencer' && data.user.profile) {
          setInfluencerProfile(prev => ({ ...prev, ...data.user.profile }));
        } else if (data.user.userType === 'brand' && data.user.profile) {
          setBrandProfile(prev => ({ ...prev, ...data.user.profile }));
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInfluencerChange = (field, value) => {
    setInfluencerProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlatformChange = (platform, field, value) => {
    setInfluencerProfile(prev => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: {
          ...prev.platforms[platform],
          [field]: value
        }
      }
    }));
  };

  const handleCategoryToggle = (category) => {
    setInfluencerProfile(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleLanguageToggle = (language) => {
    setInfluencerProfile(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleBrandChange = (field, value) => {
    setBrandProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const profile = user.userType === 'influencer' ? influencerProfile : brandProfile;
      
      const res = await fetch('/api/portal/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Speichern fehlgeschlagen');
      }

      setMessage({ type: 'success', text: t.successMessage });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PortalLayout lang={lang} setLang={setLang}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout lang={lang} setLang={setLang}>
      <Head>
        <title>{t.pageTitle}</title>
      </Head>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-gray-400">
            {user?.userType === 'influencer' ? t.subtitleInfluencer : t.subtitleBrand}
          </p>
        </div>

        {/* Status Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/20 border border-green-500/50 text-green-400'
              : 'bg-red-500/20 border border-red-500/50 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Influencer Profile Form */}
          {user?.userType === 'influencer' && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">{t.basicInfo}</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.displayName}
                    </label>
                    <input
                      type="text"
                      value={influencerProfile.displayName}
                      onChange={(e) => handleInfluencerChange('displayName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder={t.displayNamePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.bio}
                    </label>
                    <textarea
                      value={influencerProfile.bio}
                      onChange={(e) => handleInfluencerChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                      placeholder={t.bioPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.location}
                    </label>
                    <input
                      type="text"
                      value={influencerProfile.location}
                      onChange={(e) => handleInfluencerChange('location', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder={t.locationPlaceholder}
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">{t.categoriesTitle}</h2>
                <p className="text-sm text-gray-400 mb-4">{t.categoriesHint}</p>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryToggle(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        influencerProfile.categories.includes(category)
                          ? 'bg-amber-400 text-black'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Platforms */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">{t.platformsTitle}</h2>
                
                <div className="space-y-4">
                  {['instagram', 'tiktok', 'youtube', 'twitter'].map((platform) => (
                    <div key={platform} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                          {platform} {t.handle}
                        </label>
                        <input
                          type="text"
                          value={influencerProfile.platforms[platform]?.handle || ''}
                          onChange={(e) => handlePlatformChange(platform, 'handle', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                          placeholder="@username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          {t.followers}
                        </label>
                        <input
                          type="text"
                          value={influencerProfile.platforms[platform]?.followers || ''}
                          onChange={(e) => handlePlatformChange(platform, 'followers', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                          placeholder={t.followersPlaceholder}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">{t.pricingTitle}</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.priceFrom}
                    </label>
                    <input
                      type="number"
                      value={influencerProfile.priceRange?.min || ''}
                      onChange={(e) => setInfluencerProfile(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, min: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.priceTo}
                    </label>
                    <input
                      type="number"
                      value={influencerProfile.priceRange?.max || ''}
                      onChange={(e) => setInfluencerProfile(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, max: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="5000"
                    />
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">{t.languagesTitle}</h2>
                
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => handleLanguageToggle(language)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        influencerProfile.languages.includes(language)
                          ? 'bg-amber-400 text-black'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Brand Profile Form */}
          {user?.userType === 'brand' && (
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.companyName}
                </label>
                <input
                  type="text"
                  value={brandProfile.companyName}
                  onChange={(e) => handleBrandChange('companyName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.contactName}
                </label>
                <input
                  type="text"
                  value={brandProfile.contactName}
                  onChange={(e) => handleBrandChange('contactName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  value={brandProfile.phone}
                  onChange={(e) => handleBrandChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.industry}
                </label>
                <select
                  value={brandProfile.industry}
                  onChange={(e) => handleBrandChange('industry', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.website}
                </label>
                <input
                  type="url"
                  value={brandProfile.website}
                  onChange={(e) => handleBrandChange('website', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="https://"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.description}
                </label>
                <textarea
                  value={brandProfile.description}
                  onChange={(e) => handleBrandChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto px-8 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? t.saving : t.saveButton}
            </button>
          </div>
        </form>
      </div>
    </PortalLayout>
  );
}
