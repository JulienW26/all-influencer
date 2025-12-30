import { useState, useEffect } from 'react';
import Head from 'next/head';
import PortalLayout from '../../components/portal/PortalLayout';

const translations = {
  de: {
    pageTitle: 'Nachrichten | ALL INFLUENCER',
    title: 'Nachrichten',
    subtitle: 'Kommuniziere mit Brands und Influencern',
    searchPlaceholder: 'Konversation suchen...',
    noMessages: 'Noch keine Nachrichten',
    noMessagesDesc: 'Wenn du mit Brands oder Influencern kommunizierst, erscheinen die Gespräche hier.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'Die Nachrichtenfunktion wird bald verfügbar sein. Du wirst benachrichtigt, sobald sie aktiviert ist.',
    allMessages: 'Alle',
    unread: 'Ungelesen',
    archived: 'Archiviert'
  },
  en: {
    pageTitle: 'Messages | ALL INFLUENCER',
    title: 'Messages',
    subtitle: 'Communicate with brands and influencers',
    searchPlaceholder: 'Search conversation...',
    noMessages: 'No messages yet',
    noMessagesDesc: 'When you communicate with brands or influencers, the conversations will appear here.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'The messaging feature will be available soon. You will be notified when it is activated.',
    allMessages: 'All',
    unread: 'Unread',
    archived: 'Archived'
  },
  es: {
    pageTitle: 'Mensajes | ALL INFLUENCER',
    title: 'Mensajes',
    subtitle: 'Comunícate con marcas e influencers',
    searchPlaceholder: 'Buscar conversación...',
    noMessages: 'Sin mensajes aún',
    noMessagesDesc: 'Cuando te comuniques con marcas o influencers, las conversaciones aparecerán aquí.',
    comingSoon: 'Próximamente',
    comingSoonDesc: 'La función de mensajes estará disponible pronto. Se te notificará cuando esté activada.',
    allMessages: 'Todos',
    unread: 'No leídos',
    archived: 'Archivados'
  }
};

export default function Messages() {
  const [lang, setLang] = useState('de');
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
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

      <div className="max-w-4xl mx-auto">
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
        <div className="mb-6">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              disabled
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'all', label: t.allMessages },
            { id: 'unread', label: t.unread },
            { id: 'archived', label: t.archived }
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{t.noMessages}</h3>
          <p className="text-gray-500 max-w-md mx-auto">{t.noMessagesDesc}</p>
        </div>
      </div>
    </PortalLayout>
  );
}
