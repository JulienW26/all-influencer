import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PortalLayout from '../../components/portal/PortalLayout';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // User-Daten laden
      const userRes = await fetch('/api/portal/me');
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user);
      }

      // Stats laden (wenn verfügbar)
      // const statsRes = await fetch('/api/portal/stats');
      // if (statsRes.ok) {
      //   const statsData = await statsRes.json();
      //   setStats(statsData);
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
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

  // Pending Status View
  if (user?.status === 'pending') {
    return (
      <PortalLayout>
        <Head>
          <title>Dashboard | ALL INFLUENCER</title>
        </Head>

        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-20 h-20 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Dein Account wird geprüft
          </h1>
          <p className="text-gray-400 mb-8">
            Wir überprüfen deine Registrierung. Dies dauert normalerweise 24-48 Stunden.
            Du erhältst eine E-Mail, sobald dein Account freigeschaltet wurde.
          </p>
          
          {/* Blurred Preview */}
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-md bg-black/50 z-10 flex items-center justify-center">
              <div className="bg-gray-900 rounded-lg px-6 py-4 border border-gray-700">
                <p className="text-amber-400 font-medium flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Freischaltung ausstehend
                </p>
              </div>
            </div>
            
            {/* Blurred Content Preview */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 h-24"></div>
                <div className="bg-gray-800 rounded-lg p-4 h-24"></div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 h-32 mb-4"></div>
              <div className="bg-gray-800 rounded-lg p-4 h-32"></div>
            </div>
          </div>
        </div>
      </PortalLayout>
    );
  }

  // Active User Dashboard
  return (
    <PortalLayout>
      <Head>
        <title>Dashboard | ALL INFLUENCER</title>
      </Head>

      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Willkommen zurück! 👋
        </h1>
        <p className="text-gray-400">
          Hier ist deine Übersicht für heute.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {user?.userType === 'influencer' ? (
          <>
            <StatCard
              label="Profil-Aufrufe"
              value="0"
              icon="eye"
              trend="+0%"
            />
            <StatCard
              label="Aktive Buchungen"
              value="0"
              icon="calendar"
              color="blue"
            />
            <StatCard
              label="Einnahmen (Monat)"
              value="€0"
              icon="euro"
              color="green"
            />
            <StatCard
              label="Nachrichten"
              value="0"
              icon="message"
              color="purple"
            />
          </>
        ) : (
          <>
            <StatCard
              label="Gespeicherte Influencer"
              value="0"
              icon="heart"
            />
            <StatCard
              label="Aktive Aufträge"
              value="0"
              icon="briefcase"
              color="blue"
            />
            <StatCard
              label="Ausgaben (Monat)"
              value="€0"
              icon="euro"
              color="green"
            />
            <StatCard
              label="Nachrichten"
              value="0"
              icon="message"
              color="purple"
            />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Schnellaktionen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user?.userType === 'influencer' ? (
            <>
              <QuickAction
                href="/portal/profile"
                icon="user"
                title="Profil bearbeiten"
                description="Aktualisiere deine Informationen"
              />
              <QuickAction
                href="/portal/bookings"
                icon="calendar"
                title="Buchungen ansehen"
                description="Verwalte deine Aufträge"
              />
              <QuickAction
                href="/portal/earnings"
                icon="chart"
                title="Einnahmen"
                description="Deine Verdienste im Überblick"
              />
            </>
          ) : (
            <>
              <QuickAction
                href="/portal/discover"
                icon="search"
                title="Influencer finden"
                description="Entdecke passende Creator"
              />
              <QuickAction
                href="/portal/marketplace/create"
                icon="plus"
                title="Auftrag erstellen"
                description="Poste einen neuen Job"
              />
              <QuickAction
                href="/portal/favorites"
                icon="heart"
                title="Favoriten"
                description="Deine gespeicherten Influencer"
              />
            </>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Letzte Aktivitäten</h2>
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p>Noch keine Aktivitäten vorhanden</p>
        </div>
      </div>
    </PortalLayout>
  );
}

// Stat Card Component
function StatCard({ label, value, icon, color = 'amber', trend }) {
  const colorClasses = {
    amber: 'bg-amber-400/10 text-amber-400',
    blue: 'bg-blue-400/10 text-blue-400',
    green: 'bg-green-400/10 text-green-400',
    purple: 'bg-purple-400/10 text-purple-400',
  };

  const icons = {
    eye: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    calendar: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    euro: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    message: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    heart: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    briefcase: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    chart: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icons[icon]}
        </div>
        {trend && (
          <span className="text-xs text-green-400">{trend}</span>
        )}
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

// Quick Action Component
function QuickAction({ href, icon, title, description }) {
  const icons = {
    user: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    calendar: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    chart: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    search: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    plus: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    heart: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  };

  return (
    <Link
      href={href}
      className="flex items-center p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-amber-400/50 hover:bg-gray-800 transition-all group"
    >
      <div className="w-12 h-12 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 mr-4 group-hover:bg-amber-400/20">
        {icons[icon]}
      </div>
      <div>
        <h3 className="text-white font-medium group-hover:text-amber-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
}
