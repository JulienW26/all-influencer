import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PortalLayout from '../../components/portal/PortalLayout';
import { usePortalLanguage } from '../../lib/usePortalLanguage';

const translations = {
  de: {
    pageTitle: 'Favoriten | ALL INFLUENCER',
    title: 'Favoriten',
    subtitle: 'Deine gespeicherten Influencer',
    searchPlaceholder: 'Favoriten durchsuchen...',
    allFavorites: 'Alle',
    byCategory: 'Nach Kategorie',
    byPlatform: 'Nach Plattform',
    noFavorites: 'Keine Favoriten',
    noFavoritesDesc: 'Speichere Influencer als Favoriten, um sie später schnell wiederzufinden.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'Die Favoriten-Funktion wird bald verfügbar sein. Speichere deine Lieblings-Influencer hier.',
    discoverInfluencers: 'Influencer entdecken',
    remove: 'Entfernen',
    contact: 'Kontaktieren',
    viewProfile: 'Profil ansehen',
    sortBy: 'Sortieren',
    recentlyAdded: 'Zuletzt hinzugefügt',
    nameAZ: 'Name A-Z',
    followers: 'Follower'
  },
  en: {
    pageTitle: 'Favorites | ALL INFLUENCER',
    title: 'Favorites',
    subtitle: 'Your saved influencers',
    searchPlaceholder: 'Search favorites...',
    allFavorites: 'All',
    byCategory: 'By Category',
    byPlatform: 'By Platform',
    noFavorites: 'No favorites',
    noFavoritesDesc: 'Save influencers as favorites to quickly find them later.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'The favorites feature will be available soon. Save your favorite influencers here.',
    discoverInfluencers: 'Discover Influencers',
    remove: 'Remove',
    contact: 'Contact',
    viewProfile: 'View Profile',
    sortBy: 'Sort',
    recentlyAdded: 'Recently Added',
    nameAZ: 'Name A-Z',
    followers: 'Followers'
  },
  es: {
    pageTitle: 'Favoritos | ALL INFLUENCER',
    title: 'Favoritos',
    subtitle: 'Tus influencers guardados',
    searchPlaceholder: 'Buscar favoritos...',
    allFavorites: 'Todos',
    byCategory: 'Por categoría',
    byPlatform: 'Por plataforma',
    noFavorites: 'Sin favoritos',
    noFavoritesDesc: 'Guarda influencers como favoritos para encontrarlos rápidamente después.',
    comingSoon: 'Próximamente',
    comingSoonDesc: 'La función de favoritos estará disponible pronto. Guarda tus influencers favoritos aquí.',
    discoverInfluencers: 'Descubrir influencers',
    remove: 'Eliminar',
    contact: 'Contactar',
    viewProfile: 'Ver perfil',
    sortBy: 'Ordenar',
    recentlyAdded: 'Recién añadidos',
    nameAZ: 'Nombre A-Z',
    followers: 'Seguidores'
  }
};

export default function Favorites() {
  const { lang, setLang } = usePortalLanguage();
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{t.title}</h1>
            <p className="text-gray-400">{t.subtitle}</p>
          </div>
          <Link
            href="/portal/discover"
            className="mt-4 md:mt-0 px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t.discoverInfluencers}
          </Link>
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

        {/* Search and Filters */}
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
          <select
            className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            disabled
          >
            <option>{t.sortBy}: {t.recentlyAdded}</option>
            <option>{t.nameAZ}</option>
            <option>{t.followers}</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'all', label: t.allFavorites },
            { id: 'category', label: t.byCategory },
            { id: 'platform', label: t.byPlatform }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-black'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empty State */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-12 text-center">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{t.noFavorites}</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">{t.noFavoritesDesc}</p>
          <Link
            href="/portal/discover"
            className="inline-flex items-center px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors"
          >
            {t.discoverInfluencers}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </PortalLayout>
  );
}
