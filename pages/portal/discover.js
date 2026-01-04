/**
 * Portal Discover - Influencer entdecken
 * Für Brands: Alle aktiven Influencer durchsuchen und filtern
 */

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import PortalLayout from '../../components/portal/PortalLayout';
import { usePortalLanguage } from '../../lib/usePortalLanguage';
import { NICHE_CATEGORIES, getNicheLabel, getNicheIcon } from '../../lib/niche-categories';

// Übersetzungen
const translations = {
  de: {
    pageTitle: 'Influencer entdecken | ALL INFLUENCER',
    title: 'Influencer entdecken',
    subtitle: 'Finde die perfekten Influencer für deine Marke',
    searchPlaceholder: 'Name oder Username suchen...',
    filterAll: 'Alle',
    filterWithSpot: 'Mit Spot',
    filterAllInfluencers: 'Alle Influencer',
    filterCategory: 'Follower-Kategorie',
    filterPlatform: 'Plattform',
    filterNiche: 'Nische',
    allCategories: 'Alle Kategorien',
    allPlatforms: 'Alle Plattformen',
    allNiches: 'Alle Nischen',
    followers: 'Follower',
    perMonth: '/Monat',
    noResults: 'Keine Influencer gefunden',
    noResultsDesc: 'Versuche andere Filter oder erweitere deine Suche.',
    loading: 'Lade Influencer...',
    saveButton: 'Merken',
    savedButton: 'Gemerkt',
    contactButton: 'Kontakt',
    spotBadge: 'ALL INFLUENCER',
    founderBadge: 'FOUNDER',
    resultsCount: 'Ergebnisse'
  },
  en: {
    pageTitle: 'Discover Influencers | ALL INFLUENCER',
    title: 'Discover Influencers',
    subtitle: 'Find the perfect influencers for your brand',
    searchPlaceholder: 'Search name or username...',
    filterAll: 'All',
    filterWithSpot: 'With Spot',
    filterAllInfluencers: 'All Influencers',
    filterCategory: 'Follower Category',
    filterPlatform: 'Platform',
    filterNiche: 'Niche',
    allCategories: 'All Categories',
    allPlatforms: 'All Platforms',
    allNiches: 'All Niches',
    followers: 'Followers',
    perMonth: '/month',
    noResults: 'No influencers found',
    noResultsDesc: 'Try different filters or expand your search.',
    loading: 'Loading influencers...',
    saveButton: 'Save',
    savedButton: 'Saved',
    contactButton: 'Contact',
    spotBadge: 'ALL INFLUENCER',
    founderBadge: 'FOUNDER',
    resultsCount: 'Results'
  },
  es: {
    pageTitle: 'Descubrir Influencers | ALL INFLUENCER',
    title: 'Descubrir Influencers',
    subtitle: 'Encuentra los influencers perfectos para tu marca',
    searchPlaceholder: 'Buscar nombre o usuario...',
    filterAll: 'Todos',
    filterWithSpot: 'Con Spot',
    filterAllInfluencers: 'Todos los Influencers',
    filterCategory: 'Categoría de Seguidores',
    filterPlatform: 'Plataforma',
    filterNiche: 'Nicho',
    allCategories: 'Todas las Categorías',
    allPlatforms: 'Todas las Plataformas',
    allNiches: 'Todos los Nichos',
    followers: 'Seguidores',
    perMonth: '/mes',
    noResults: 'No se encontraron influencers',
    noResultsDesc: 'Intenta con otros filtros o amplía tu búsqueda.',
    loading: 'Cargando influencers...',
    saveButton: 'Guardar',
    savedButton: 'Guardado',
    contactButton: 'Contacto',
    spotBadge: 'ALL INFLUENCER',
    founderBadge: 'FOUNDER',
    resultsCount: 'Resultados'
  }
};

// Plattform-Info
const PLATFORM_INFO = {
  instagram: { icon: '📸', label: 'Instagram', color: '#E4405F' },
  tiktok: { icon: '🎵', label: 'TikTok', color: '#000000' },
  youtube: { icon: '▶️', label: 'YouTube', color: '#FF0000' },
  facebook: { icon: '📘', label: 'Facebook', color: '#1877F2' },
  x: { icon: '✖️', label: 'X', color: '#000000' },
  twitch: { icon: '🎮', label: 'Twitch', color: '#9146FF' },
  linkedin: { icon: '💼', label: 'LinkedIn', color: '#0A66C2' },
};

// Kategorie-Styles
const CATEGORY_STYLES = {
  diamond: { gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)', label: 'Diamond', icon: '💎' },
  platin: { gradient: 'linear-gradient(135deg, #64748b, #94a3b8)', label: 'Platin', icon: '🏆' },
  gold: { gradient: 'linear-gradient(135deg, #eab308, #f59e0b)', label: 'Gold', icon: '🥇' },
  rising: { gradient: 'linear-gradient(135deg, #a855f7, #ec4899)', label: 'Rising Star', icon: '⭐' },
};

export default function Discover() {
  const { lang, setLang } = usePortalLanguage();
  const t = translations[lang];

  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedInfluencers, setSavedInfluencers] = useState(new Set());

  // Filter
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterNiche, setFilterNiche] = useState('all');
  const [filterSpotStatus, setFilterSpotStatus] = useState('all');

  // Influencer laden
  const loadInfluencers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('forPortal', 'true');
      
      if (filterCategory !== 'all') params.append('category', filterCategory);
      if (filterPlatform !== 'all') params.append('platform', filterPlatform);
      if (filterNiche !== 'all') params.append('niche', filterNiche);
      if (filterSpotStatus === 'with') params.append('hasSpot', 'true');
      if (search) params.append('search', search);

      const response = await fetch(`/api/admin/influencers?${params}`);
      const data = await response.json();

      if (data.success) {
        setInfluencers(data.influencers);
      }
    } catch (error) {
      console.error('Error loading influencers:', error);
    } finally {
      setLoading(false);
    }
  }, [filterCategory, filterPlatform, filterNiche, filterSpotStatus, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadInfluencers();
    }, 300);
    return () => clearTimeout(timer);
  }, [loadInfluencers]);

  // Favorit togglen (UI only)
  const toggleSave = (influencerId) => {
    setSavedInfluencers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(influencerId)) {
        newSet.delete(influencerId);
      } else {
        newSet.add(influencerId);
      }
      return newSet;
    });
  };

  return (
    <PortalLayout lang={lang} setLang={setLang}>
      <Head>
        <title>{t.pageTitle}</title>
      </Head>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            {/* Suche */}
            <div className="flex-grow min-w-[200px]">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Spot Status Filter */}
            <select
              value={filterSpotStatus}
              onChange={(e) => setFilterSpotStatus(e.target.value)}
              className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">{t.filterAllInfluencers}</option>
              <option value="with">🏆 {t.filterWithSpot}</option>
            </select>

            {/* Kategorie Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">{t.allCategories}</option>
              <option value="diamond">💎 Diamond (20M+)</option>
              <option value="platin">🏆 Platin (10M+)</option>
              <option value="gold">🥇 Gold (5M+)</option>
              <option value="rising">⭐ Rising Star (1M+)</option>
            </select>

            {/* Plattform Filter */}
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">{t.allPlatforms}</option>
              {Object.entries(PLATFORM_INFO).map(([key, info]) => (
                <option key={key} value={key}>{info.icon} {info.label}</option>
              ))}
            </select>

            {/* Nischen Filter */}
            <select
              value={filterNiche}
              onChange={(e) => setFilterNiche(e.target.value)}
              className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">{t.allNiches}</option>
              {NICHE_CATEGORIES.map((niche) => (
                <option key={niche.id} value={niche.id}>
                  {niche.icon} {niche.label[lang] || niche.label.de}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ergebnis-Anzahl */}
        <div className="mb-4 text-gray-400 text-sm">
          {influencers.length} {t.resultsCount}
        </div>

        {/* Influencer Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400 mx-auto mb-4"></div>
              <p className="text-gray-400">{t.loading}</p>
            </div>
          </div>
        ) : influencers.length === 0 ? (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">{t.noResults}</h3>
            <p className="text-gray-400">{t.noResultsDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {influencers.map((influencer) => {
              const categoryStyle = CATEGORY_STYLES[influencer.category];
              const platformInfo = PLATFORM_INFO[influencer.platform];
              const isSaved = savedInfluencers.has(influencer.id);

              return (
                <div
                  key={influencer.id}
                  className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-amber-400/50 transition-all hover:-translate-y-1"
                >
                  {/* Kategorie-Banner mit Spot-Nummer */}
                  <div 
                    className="px-3 py-2 text-center text-xs font-bold flex items-center justify-center gap-2"
                    style={{ background: categoryStyle?.gradient || '#333' }}
                  >
                    {influencer.isFounder && (
                      <span className="bg-black/30 px-2 py-0.5 rounded text-[10px]">
                        🏅 {t.founderBadge}
                      </span>
                    )}
                    {categoryStyle?.icon} {categoryStyle?.label}
                    {influencer.hasSpot && (
                      <span className="bg-black/30 px-2 py-0.5 rounded">
                        #{influencer.spotNumber}
                      </span>
                    )}
                  </div>

                  {/* Profilbild */}
                  <div className="aspect-square bg-gray-800 relative">
                    {influencer.profileImage ? (
                      <img
                        src={influencer.profileImage}
                        alt={influencer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">
                        👤
                      </div>
                    )}

                    {/* Plattform-Badge */}
                    <div 
                      className="absolute top-3 right-3 px-2 py-1 rounded-lg text-sm"
                      style={{ backgroundColor: platformInfo?.color || '#333' }}
                    >
                      {platformInfo?.icon}
                    </div>

                    {/* Spot-Badge */}
                    {influencer.hasSpot && (
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-amber-400 text-black text-xs font-bold py-1.5 px-3 rounded-lg text-center">
                          {t.spotBadge} #{influencer.spotNumber}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-white truncate">{influencer.name}</h3>
                    <p className="text-amber-400 text-sm mb-2">{influencer.username}</p>

                    {/* Nischen-Tags */}
                    {influencer.nicheCategories?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {influencer.nicheCategories.slice(0, 3).map(nicheId => (
                          <span 
                            key={nicheId}
                            className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded"
                          >
                            {getNicheIcon(nicheId)} {nicheId === 'other' && influencer.nicheCustom 
                              ? influencer.nicheCustom 
                              : getNicheLabel(nicheId, lang)}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Follower & Preis */}
                    <div className="flex justify-between items-center text-sm mb-4">
                      <span className="text-gray-400">
                        {influencer.followersFormatted} {t.followers}
                      </span>
                      <span className="text-amber-400 font-medium">
                        {influencer.categoryInfo?.price?.toLocaleString()}€{t.perMonth}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleSave(influencer.id)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isSaved
                            ? 'bg-amber-400/20 text-amber-400 border border-amber-400'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {isSaved ? `⭐ ${t.savedButton}` : `☆ ${t.saveButton}`}
                      </button>
                      <button
                        className="flex-1 py-2 rounded-lg text-sm font-medium bg-amber-400 text-black hover:bg-amber-500 transition-colors"
                      >
                        ✉️ {t.contactButton}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PortalLayout>
  );
  }
