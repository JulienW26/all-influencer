import { useState, useEffect } from 'react';
import Head from 'next/head';
import PortalLayout from '../../components/portal/PortalLayout';

const translations = {
  de: {
    pageTitle: 'Buchungen | ALL INFLUENCER',
    title: 'Meine Buchungen',
    subtitle: 'Verwalte deine Aufträge und Kooperationen',
    tabAll: 'Alle',
    tabPending: 'Ausstehend',
    tabActive: 'Aktiv',
    tabCompleted: 'Abgeschlossen',
    noBookings: 'Keine Buchungen',
    noBookingsDesc: 'Wenn Brands dich buchen, erscheinen die Aufträge hier. Vervollständige dein Profil, um für Brands sichtbar zu werden.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'Das Buchungssystem wird bald verfügbar sein. Du wirst benachrichtigt, sobald es aktiviert ist.',
    completeProfile: 'Profil vervollständigen',
    filterLabel: 'Filter',
    sortLabel: 'Sortieren'
  },
  en: {
    pageTitle: 'Bookings | ALL INFLUENCER',
    title: 'My Bookings',
    subtitle: 'Manage your orders and collaborations',
    tabAll: 'All',
    tabPending: 'Pending',
    tabActive: 'Active',
    tabCompleted: 'Completed',
    noBookings: 'No bookings',
    noBookingsDesc: 'When brands book you, the orders will appear here. Complete your profile to become visible to brands.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'The booking system will be available soon. You will be notified when it is activated.',
    completeProfile: 'Complete Profile',
    filterLabel: 'Filter',
    sortLabel: 'Sort'
  },
  es: {
    pageTitle: 'Reservas | ALL INFLUENCER',
    title: 'Mis Reservas',
    subtitle: 'Administra tus pedidos y colaboraciones',
    tabAll: 'Todas',
    tabPending: 'Pendientes',
    tabActive: 'Activas',
    tabCompleted: 'Completadas',
    noBookings: 'Sin reservas',
    noBookingsDesc: 'Cuando las marcas te reserven, los pedidos aparecerán aquí. Completa tu perfil para ser visible para las marcas.',
    comingSoon: 'Próximamente',
    comingSoonDesc: 'El sistema de reservas estará disponible pronto. Se te notificará cuando esté activado.',
    completeProfile: 'Completar perfil',
    filterLabel: 'Filtrar',
    sortLabel: 'Ordenar'
  }
};

export default function Bookings() {
  const [lang, setLang] = useState('de');
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
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'all', label: t.tabAll },
            { id: 'pending', label: t.tabPending },
            { id: 'active', label: t.tabActive },
            { id: 'completed', label: t.tabCompleted }
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{t.noBookings}</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">{t.noBookingsDesc}</p>
          <a
            href="/portal/profile"
            className="inline-flex items-center px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors"
          >
            {t.completeProfile}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </PortalLayout>
  );
}
