import { useState, useEffect } from 'react';
import Head from 'next/head';
import PortalLayout from '../../components/portal/PortalLayout';

const translations = {
  de: {
    pageTitle: 'Aktien | ALL INFLUENCER',
    title: 'Deine Aktien',
    subtitle: 'Verwalte deine ALL INFLUENCER Anteile',
    founderShares: 'Founder-Aktien',
    totalValue: 'Geschätzter Wert',
    shareCount: 'Anzahl Aktien',
    vestingStatus: 'Vesting-Status',
    noShares: 'Keine Aktien vorhanden',
    noSharesDesc: 'Du hast derzeit keine Aktien. Founder-Aktien werden an ausgewählte Early Adopter vergeben.',
    founderBadge: 'Founder-Programm',
    founderBadgeDesc: 'Als Founder erhältst du Anteile an ALL INFLUENCER und profitierst vom Wachstum der Plattform.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'Das Aktien-System wird in einer späteren Phase der Plattform freigeschaltet.',
    learnMore: 'Mehr erfahren',
    overview: 'Übersicht',
    history: 'Historie',
    documents: 'Dokumente'
  },
  en: {
    pageTitle: 'Shares | ALL INFLUENCER',
    title: 'Your Shares',
    subtitle: 'Manage your ALL INFLUENCER shares',
    founderShares: 'Founder Shares',
    totalValue: 'Estimated Value',
    shareCount: 'Share Count',
    vestingStatus: 'Vesting Status',
    noShares: 'No shares available',
    noSharesDesc: 'You currently have no shares. Founder shares are awarded to selected early adopters.',
    founderBadge: 'Founder Program',
    founderBadgeDesc: 'As a founder, you receive shares in ALL INFLUENCER and benefit from the platform\'s growth.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'The share system will be unlocked in a later phase of the platform.',
    learnMore: 'Learn More',
    overview: 'Overview',
    history: 'History',
    documents: 'Documents'
  },
  es: {
    pageTitle: 'Acciones | ALL INFLUENCER',
    title: 'Tus Acciones',
    subtitle: 'Administra tus acciones de ALL INFLUENCER',
    founderShares: 'Acciones de Fundador',
    totalValue: 'Valor Estimado',
    shareCount: 'Cantidad de Acciones',
    vestingStatus: 'Estado de Vesting',
    noShares: 'Sin acciones disponibles',
    noSharesDesc: 'Actualmente no tienes acciones. Las acciones de fundador se otorgan a los primeros adoptantes seleccionados.',
    founderBadge: 'Programa Fundador',
    founderBadgeDesc: 'Como fundador, recibes acciones en ALL INFLUENCER y te beneficias del crecimiento de la plataforma.',
    comingSoon: 'Próximamente',
    comingSoonDesc: 'El sistema de acciones se desbloqueará en una fase posterior de la plataforma.',
    learnMore: 'Más información',
    overview: 'Resumen',
    history: 'Historial',
    documents: 'Documentos'
  }
};

export default function Shares() {
  const [lang, setLang] = useState('de');
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/portal/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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

  const isFounder = user?.isFounder;

  return (
    <PortalLayout lang={lang} setLang={setLang}>
      <Head>
        <title>{t.pageTitle}</title>
      </Head>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>

        {/* Founder Badge (if applicable) */}
        {isFounder && (
          <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/10 border border-amber-400/50 rounded-xl p-6 mb-6">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-amber-400 font-bold text-lg">{t.founderBadge}</h3>
                  <span className="px-2 py-0.5 bg-amber-400 text-black text-xs font-bold rounded">
                    #{user.founderNumber}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{t.founderBadgeDesc}</p>
              </div>
            </div>
          </div>
        )}

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

        {/* Stats Cards (disabled/placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <p className="text-sm text-gray-400 mb-2">{t.founderShares}</p>
            <p className="text-3xl font-bold text-white">{isFounder ? '1,000' : '0'}</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <p className="text-sm text-gray-400 mb-2">{t.totalValue}</p>
            <p className="text-3xl font-bold text-green-400">-</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <p className="text-sm text-gray-400 mb-2">{t.vestingStatus}</p>
            <p className="text-3xl font-bold text-amber-400">-</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'overview', label: t.overview },
            { id: 'history', label: t.history },
            { id: 'documents', label: t.documents }
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
        {!isFounder && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-12 text-center">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{t.noShares}</h3>
            <p className="text-gray-500 max-w-md mx-auto">{t.noSharesDesc}</p>
          </div>
        )}

        {/* Founder Content */}
        {isFounder && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{t.founderShares}</h3>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                Active
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 mb-1">Allocated</p>
                <p className="text-white font-semibold">1,000 Shares</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-gray-400 mb-1">Vesting Period</p>
                <p className="text-white font-semibold">4 Years</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
