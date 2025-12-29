import { useState, useEffect } from 'react';
import Head from 'next/head';
import PortalLayout from '../../components/portal/PortalLayout';

export default function Profile() {
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

      setMessage({ type: 'success', text: 'Profil erfolgreich gespeichert!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <Head>
        <title>Profil bearbeiten | ALL INFLUENCER</title>
      </Head>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Profil bearbeiten</h1>
          <p className="text-gray-400">
            {user?.userType === 'influencer' 
              ? 'Vervollständige dein Profil, um für Brands sichtbar zu sein.'
              : 'Aktualisiere deine Unternehmensinformationen.'}
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
                <h2 className="text-lg font-semibold text-white mb-4">Grundinformationen</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Anzeigename
                    </label>
                    <input
                      type="text"
                      value={influencerProfile.displayName}
                      onChange={(e) => handleInfluencerChange('displayName', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="Dein Name / Künstlername"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={influencerProfile.bio}
                      onChange={(e) => handleInfluencerChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                      placeholder="Erzähle etwas über dich..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Standort
                    </label>
                    <input
                      type="text"
                      value={influencerProfile.location}
                      onChange={(e) => handleInfluencerChange('location', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="z.B. Berlin, Deutschland"
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Kategorien</h2>
                <p className="text-sm text-gray-400 mb-4">Wähle passende Kategorien für deinen Content</p>
                
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
                <h2 className="text-lg font-semibold text-white mb-4">Social Media Plattformen</h2>
                
                <div className="space-y-4">
                  {['instagram', 'tiktok', 'youtube', 'twitter'].map((platform) => (
                    <div key={platform} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                          {platform} Handle
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
                          Follower
                        </label>
                        <input
                          type="text"
                          value={influencerProfile.platforms[platform]?.followers || ''}
                          onChange={(e) => handlePlatformChange(platform, 'followers', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                          placeholder="z.B. 1.5M"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Preisvorstellung</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ab (€)
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
                      Bis (€)
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
                <h2 className="text-lg font-semibold text-white mb-4">Sprachen</h2>
                
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
                  Firmenname
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
                  Ansprechpartner
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
                  Telefon
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
                  Branche
                </label>
                <select
                  value={brandProfile.industry}
                  onChange={(e) => handleBrandChange('industry', e.target.value)}
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Website
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
                  Beschreibung
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
              {saving ? 'Wird gespeichert...' : 'Profil speichern'}
            </button>
          </div>
        </form>
      </div>
    </PortalLayout>
  );
}
