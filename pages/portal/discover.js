import { useState, useEffect } from 'react';
import Head from 'next/head';
import PortalLayout from '../../components/portal/PortalLayout';

const translations = {
  de: {
    pageTitle: 'Entdecken | ALL INFLUENCER',
    title: 'Influencer entdecken',
    subtitle: 'Finde die perfekten Creator für deine Kampagne',
    searchPlaceholder: 'Suche nach Name, Kategorie oder Plattform...',
    filters: 'Filter',
    category: 'Kategorie',
    platform: 'Plattform',
    followers: 'Follower',
    priceRange: 'Preisbereich',
    location: 'Standort',
    allCategories: 'Alle Kategorien',
    allPlatforms: 'Alle Plattformen',
    noResults: 'Keine Influencer gefunden',
    noResultsDesc: 'Versuche andere Suchbegriffe oder passe deine Filter an.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'Die Influencer-Suche wird bald verfügbar sein. Wir arbeiten daran, dir die besten Creator zu zeigen.',
    clearFilters: 'Filter zurücksetzen',
    sortBy: 'Sortieren nach',
    relevance: 'Relevanz',
    followersHigh: 'Follower (hoch)',
    followersLow: 'Follower (niedrig)',
    priceHigh: 'Preis (hoch)',
    priceLow: 'Preis (niedrig)'
  },
  en: {
    pageTitle: 'Discover | ALL INFLUENCER',
    title: 'Discover Influencers',
    subtitle: 'Find the perfect creators for your campaign',
    searchPlaceholder: 'Search by name, category or platform...',
    filters: 'Filters',
    category: 'Category',
    platform: 'Platform',
    followers: 'Followers',
    priceRange: 'Price Range',
    location: 'Location',
    allCategories: 'All Categories',
    allPlatforms: 'All Platforms',
    noResults: 'No influencers found',
    noResultsDesc: 'Try different search terms or adjust your filters.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'Influencer search will be available soon. We are working to show you the best creators.',
    clearFilters: 'Clear Filters',
    sortBy: 'Sort by',
    relevance: 'Relevance',
    followersHigh: 'Followers (high)',
    followersLow: 'Followers (low)',
    priceHigh: 'Price (high)',
    priceLow: 'Price (low)'
  },
  es: {
    pageTitle: 'Descubrir | ALL INFLUENCER',
    title: 'Descubrir Influencers',
    subtitle: 'Encuentra los creadores perfectos para tu campaña',
    searchPlaceholder: 'Buscar por nombre, categoría o plataforma...',
    filters: 'Filtros',
    category: 'Categoría',
    platform: 'Plataforma',
    followers: 'Seguidores',
    priceRange: 'Rango de precio',
    location: 'Ubicación',
    allCategories: 'Todas las categorías',
    allPlatforms: 'Todas las plataformas',
    noResults: 'No se encontraron influencers',
    noResultsDesc: 'Intenta con diferentes términos de búsqueda o ajusta tus filtros.',
    comingSoon: 'Próximamente',
    comingSoonDesc: 'La búsqueda de influencers estará disponible pronto. Estamos trabajando para mostrarte los mejores creadores.',
    clearFilters: 'Limpiar filtros',
    sortBy: 'Ordenar por',
    relevance: 'Relevancia',
    followersHigh: 'Seguidores (alto)',
    followersLow: 'Seguidores (bajo)',
    priceHigh: 'Precio (alto)',
    priceLow: 'Precio (bajo)'
  }
};

const categories = ['Fashion', 'Beauty', 'Fitness', 'Travel', 'Food', 'Tech', 'Gaming', 'Lifestyle', 'Music', 'Comedy'];
const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter'];

export default function Discover() {
  const [lang, setLang] = useState('de');
  const t = translations[lang];
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

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

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-6 mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-amber-400 font-semibold">{t.comingSoon}</h3>
              <p className="text-gray-400 text-sm">{t.comingSoonDesc}</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              disabled
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:border-gray-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {t.filters}
          </button>
        </div>

        {/* Filters (expandable) */}
        {showFilters && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t.category}</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  disabled
                >
                  <option value="">{t.allCategories}</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t.platform}</label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  disabled
                >
                  <option value="">{t.allPlatforms}</option>
                  {platforms.map((plat) => (
                    <option key={plat} value={plat}>{plat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t.followers}</label>
                <select
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  disabled
                >
                  <option>Alle</option>
                  <option>1K - 10K</option>
                  <option>10K - 100K</option>
                  <option>100K - 1M</option>
                  <option>1M+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t.priceRange}</label>
                <select
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  disabled
                >
                  <option>Alle</option>
                  <option>€0 - €500</option>
                  <option>€500 - €2,000</option>
                  <option>€2,000 - €5,000</option>
                  <option>€5,000+</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Empty State / Results */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-12 text-center">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{t.noResults}</h3>
          <p className="text-gray-500 max-w-md mx-auto">{t.noResultsDesc}</p>
        </div>
      </div>
    </PortalLayout>
  );
}
