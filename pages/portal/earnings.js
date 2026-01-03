import { useState, useEffect } from 'react';
import Head from 'next/head';
import PortalLayout from '../../components/portal/PortalLayout';
import { usePortalLanguage } from '../../lib/usePortalLanguage';

const translations = {
  de: {
    pageTitle: 'Einnahmen | ALL INFLUENCER',
    title: 'Einnahmen',
    subtitle: 'Deine Verdienste im Überblick',
    totalEarnings: 'Gesamteinnahmen',
    thisMonth: 'Diesen Monat',
    pending: 'Ausstehend',
    paidOut: 'Ausgezahlt',
    overview: 'Übersicht',
    transactions: 'Transaktionen',
    payouts: 'Auszahlungen',
    noEarnings: 'Noch keine Einnahmen',
    noEarningsDesc: 'Sobald du Aufträge abschließt, werden deine Einnahmen hier angezeigt.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'Das Einnahmen-System wird bald verfügbar sein. Alle Zahlungen werden sicher über unsere Plattform abgewickelt.',
    requestPayout: 'Auszahlung beantragen'
  },
  en: {
    pageTitle: 'Earnings | ALL INFLUENCER',
    title: 'Earnings',
    subtitle: 'Your earnings overview',
    totalEarnings: 'Total Earnings',
    thisMonth: 'This Month',
    pending: 'Pending',
    paidOut: 'Paid Out',
    overview: 'Overview',
    transactions: 'Transactions',
    payouts: 'Payouts',
    noEarnings: 'No earnings yet',
    noEarningsDesc: 'Once you complete orders, your earnings will be displayed here.',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'The earnings system will be available soon. All payments will be securely processed through our platform.',
    requestPayout: 'Request Payout'
  },
  es: {
    pageTitle: 'Ingresos | ALL INFLUENCER',
    title: 'Ingresos',
    subtitle: 'Resumen de tus ganancias',
    totalEarnings: 'Ingresos totales',
    thisMonth: 'Este mes',
    pending: 'Pendiente',
    paidOut: 'Pagado',
    overview: 'Resumen',
    transactions: 'Transacciones',
    payouts: 'Pagos',
    noEarnings: 'Sin ingresos aún',
    noEarningsDesc: 'Una vez que completes pedidos, tus ingresos se mostrarán aquí.',
    comingSoon: 'Próximamente',
    comingSoonDesc: 'El sistema de ingresos estará disponible pronto. Todos los pagos se procesarán de forma segura a través de nuestra plataforma.',
    requestPayout: 'Solicitar pago'
  }
};

export default function Earnings() {
  const { lang, setLang } = usePortalLanguage();
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState('overview');
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-sm text-gray-400 mb-1">{t.totalEarnings}</p>
            <p className="text-2xl font-bold text-white">€0,00</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-sm text-gray-400 mb-1">{t.thisMonth}</p>
            <p className="text-2xl font-bold text-green-400">€0,00</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-sm text-gray-400 mb-1">{t.pending}</p>
            <p className="text-2xl font-bold text-amber-400">€0,00</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-sm text-gray-400 mb-1">{t.paidOut}</p>
            <p className="text-2xl font-bold text-blue-400">€0,00</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'overview', label: t.overview },
            { id: 'transactions', label: t.transactions },
            { id: 'payouts', label: t.payouts }
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{t.noEarnings}</h3>
          <p className="text-gray-500 max-w-md mx-auto">{t.noEarningsDesc}</p>
        </div>
      </div>
    </PortalLayout>
  );
}
