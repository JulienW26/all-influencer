import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PortalLayout from '../../components/portal/PortalLayout';
import { usePortalLanguage } from '../../lib/usePortalLanguage';

const translations = {
  de: {
    pageTitle: 'Marktplatz | ALL INFLUENCER',
    title: 'Marktplatz',
    subtitle: 'Erstelle Aufträge und finde passende Influencer',
    createOrder: 'Auftrag erstellen',
    myOrders: 'Meine Aufträge',
    allOrders: 'Alle',
    activeOrders: 'Aktiv',
    draftOrders: 'Entwürfe',
    completedOrders: 'Abgeschlossen',
    noOrders: 'Keine Aufträge',
    noOrdersDesc: 'Erstelle deinen ersten Auftrag und finde Influencer für deine Kampagne.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'Der Marktplatz wird bald verfügbar sein. Hier kannst du Aufträge erstellen und Influencer buchen.',
    orderTitle: 'Titel',
    orderBudget: 'Budget',
    orderStatus: 'Status',
    orderApplications: 'Bewerbungen',
    createFirst: 'Ersten Auftrag erstellen',
    browseInfluencers: 'Oder Influencer durchsuchen'
  },
  en: {
    pageTitle: 'Marketplace | ALL INFLUENCER',
    title: 'Marketplace',
    subtitle: 'Create orders and find matching influencers',
    createOrder: 'Create Order',
    myOrders: 'My Orders',
    allOrders: 'All',
    activeOrders: 'Active',
    draftOrders: 'Drafts',
    completedOrders: 'Completed',
    noOrders: 'No orders',
    noOrdersDesc: 'Create your first order and find influencers for your campaign.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'The marketplace will be available soon. Here you can create orders and book influencers.',
    orderTitle: 'Title',
    orderBudget: 'Budget',
    orderStatus: 'Status',
    orderApplications: 'Applications',
    createFirst: 'Create First Order',
    browseInfluencers: 'Or browse influencers'
  },
  es: {
    pageTitle: 'Mercado | ALL INFLUENCER',
    title: 'Mercado',
    subtitle: 'Crea pedidos y encuentra influencers adecuados',
    createOrder: 'Crear pedido',
    myOrders: 'Mis pedidos',
    allOrders: 'Todos',
    activeOrders: 'Activos',
    draftOrders: 'Borradores',
    completedOrders: 'Completados',
    noOrders: 'Sin pedidos',
    noOrdersDesc: 'Crea tu primer pedido y encuentra influencers para tu campaña.',
    comingSoon: 'Próximamente',
    comingSoonDesc: 'El mercado estará disponible pronto. Aquí podrás crear pedidos y reservar influencers.',
    orderTitle: 'Título',
    orderBudget: 'Presupuesto',
    orderStatus: 'Estado',
    orderApplications: 'Solicitudes',
    createFirst: 'Crear primer pedido',
    browseInfluencers: 'O explorar influencers'
  }
};

export default function Marketplace() {
  const { lang, setLang } = usePortalLanguage();
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

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
          <button
            className="mt-4 md:mt-0 px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors flex items-center gap-2 opacity-50 cursor-not-allowed"
            disabled
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {t.createOrder}
          </button>
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

        {/* Tabs */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">{t.myOrders}</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: t.allOrders },
              { id: 'active', label: t.activeOrders },
              { id: 'drafts', label: t.draftOrders },
              { id: 'completed', label: t.completedOrders }
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
        </div>

        {/* Empty State */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-12 text-center">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{t.noOrders}</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">{t.noOrdersDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors opacity-50 cursor-not-allowed"
              disabled
            >
              {t.createFirst}
            </button>
            <Link
              href="/portal/discover"
              className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              {t.browseInfluencers}
            </Link>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
