/**
 * Admin-Seite: Portal-Benutzer
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminLanguage } from '../../lib/useAdminLanguage';

export default function PortalUsersPage() {
  const { lang } = useAdminLanguage();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: 'all', userType: 'all' });
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // Texte
  const txt = {
    de: {
      title: 'Portal-Benutzer',
      total: 'Gesamt',
      pending: 'Ausstehend',
      approved: 'Freigegeben',
      rejected: 'Abgelehnt',
      influencers: 'Influencer',
      brands: 'Brands',
      founders: 'Gründer',
      searchPlaceholder: 'E-Mail oder Name suchen...',
      allStatus: 'Alle Status',
      allTypes: 'Alle Typen',
      email: 'E-MAIL',
      type: 'TYP',
      name: 'NAME',
      status: 'STATUS',
      registered: 'REGISTRIERT',
      actions: 'AKTIONEN',
      view: 'Details',
      approve: 'Freigeben',
      reject: 'Ablehnen',
      suspend: 'Sperren',
      noResults: 'Keine Benutzer gefunden.',
      userDetails: 'Benutzer-Details',
      close: 'Schließen',
      category: 'Kategorie',
      spot: 'Spot',
      founder: 'Gründer',
      platforms: 'Plattformen',
      company: 'Unternehmen',
      industry: 'Branche',
      website: 'Website',
      contact: 'Kontakt',
      confirmApprove: 'Benutzer wirklich freigeben?',
      confirmReject: 'Benutzer wirklich ablehnen?',
      confirmSuspend: 'Benutzer wirklich sperren?',
    },
    en: {
      title: 'Portal Users',
      total: 'Total',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      influencers: 'Influencers',
      brands: 'Brands',
      founders: 'Founders',
      searchPlaceholder: 'Search email or name...',
      allStatus: 'All Status',
      allTypes: 'All Types',
      email: 'EMAIL',
      type: 'TYPE',
      name: 'NAME',
      status: 'STATUS',
      registered: 'REGISTERED',
      actions: 'ACTIONS',
      view: 'Details',
      approve: 'Approve',
      reject: 'Reject',
      suspend: 'Suspend',
      noResults: 'No users found.',
      userDetails: 'User Details',
      close: 'Close',
      category: 'Category',
      spot: 'Spot',
      founder: 'Founder',
      platforms: 'Platforms',
      company: 'Company',
      industry: 'Industry',
      website: 'Website',
      contact: 'Contact',
      confirmApprove: 'Really approve user?',
      confirmReject: 'Really reject user?',
      confirmSuspend: 'Really suspend user?',
    },
  };
  const t = txt[lang] || txt.en;

  // Benutzer laden
  const loadUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.status !== 'all') params.append('status', filter.status);
      if (filter.userType !== 'all') params.append('userType', filter.userType);
      if (search) params.append('search', search);

      const res = await fetch(`/api/admin/portal-users?${params}`);
      const data = await res.json();
      setUsers(data.users || []);
      setStats(data.stats || {});
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [filter]);

  // Suche mit Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Status ändern
  const updateStatus = async (userId, newStatus, confirmMsg) => {
    if (!confirm(confirmMsg)) return;
    
    try {
      await fetch('/api/admin/portal-users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, status: newStatus }),
      });
      loadUsers();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const statusColors = {
    pending: { bg: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' },
    approved: { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' },
    rejected: { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' },
    suspended: { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' },
  };

  const statusLabels = {
    de: { pending: 'Ausstehend', approved: 'Freigegeben', rejected: 'Abgelehnt', suspended: 'Gesperrt' },
    en: { pending: 'Pending', approved: 'Approved', rejected: 'Rejected', suspended: 'Suspended' },
  };

  // Benutzername ermitteln
  const getUserName = (user) => {
    if (user.userType === 'influencer') {
      return user.influencerProfile?.displayName || '-';
    }
    return user.brandProfile?.companyName || '-';
  };

  return (
    <AdminLayout title={t.title}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: t.total, value: stats.total || 0, color: '#f59e0b' },
          { label: t.pending, value: stats.pending || 0, color: '#fbbf24' },
          { label: t.approved, value: stats.approved || 0, color: '#22c55e' },
          { label: t.influencers, value: stats.influencers || 0, color: '#3b82f6' },
          { label: t.brands, value: stats.brands || 0, color: '#8b5cf6' },
          { label: t.founders, value: stats.founders || 0, color: '#f59e0b', icon: '👑' },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: '12px',
            padding: '16px',
          }}>
            <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0 }}>{stat.icon} {stat.label}</p>
            <p style={{ color: stat.color, fontSize: '24px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: '200px',
            padding: '10px 16px',
            backgroundColor: '#1f2937',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '14px',
          }}
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          style={{
            padding: '10px 16px',
            backgroundColor: '#1f2937',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '14px',
          }}
        >
          <option value="all">{t.allStatus}</option>
          <option value="pending">{t.pending}</option>
          <option value="approved">{t.approved}</option>
          <option value="rejected">{t.rejected}</option>
        </select>
        <select
          value={filter.userType}
          onChange={(e) => setFilter({ ...filter, userType: e.target.value })}
          style={{
            padding: '10px 16px',
            backgroundColor: '#1f2937',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '14px',
          }}
        >
          <option value="all">{t.allTypes}</option>
          <option value="influencer">{t.influencers}</option>
          <option value="brand">{t.brands}</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#111827', borderRadius: '12px', border: '1px solid rgba(251, 191, 36, 0.2)', overflow: 'hidden', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.2)' }}>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.email}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.type}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.name}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.status}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.registered}</th>
              <th style={{ padding: '16px', textAlign: 'right', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>{t.noResults}</td></tr>
            ) : users.map((user) => (
              <tr key={user._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '16px' }}>
                  <span style={{ color: '#d1d5db', fontSize: '14px' }}>{user.email}</span>
                  {user.isFounder && <span style={{ marginLeft: '8px' }}>👑</span>}
                </td>
                <td style={{ padding: '16px', color: '#d1d5db', fontSize: '14px' }}>
                  {user.userType === 'influencer' ? '👤' : '🏢'} {user.userType}
                </td>
                <td style={{ padding: '16px', color: '#fff', fontSize: '14px' }}>
                  {getUserName(user)}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: statusColors[user.status]?.bg,
                    color: statusColors[user.status]?.color,
                  }}>
                    {statusLabels[lang][user.status]}
                  </span>
                </td>
                <td style={{ padding: '16px', color: '#9ca3af', fontSize: '14px' }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button
                    onClick={() => setSelectedUser(user)}
                    style={{ padding: '6px 12px', marginRight: '8px', backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '6px', color: '#f59e0b', cursor: 'pointer', fontSize: '12px' }}
                  >
                    {t.view}
                  </button>
                  {user.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(user._id, 'approved', t.confirmApprove)}
                        style={{ padding: '6px 12px', marginRight: '8px', backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '6px', color: '#22c55e', cursor: 'pointer', fontSize: '12px' }}
                      >
                        {t.approve}
                      </button>
                      <button
                        onClick={() => updateStatus(user._id, 'rejected', t.confirmReject)}
                        style={{ padding: '6px 12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}
                      >
                        {t.reject}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          t={t}
          lang={lang}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </AdminLayout>
  );
}

// Detail Modal
function UserDetailModal({ user, t, lang, onClose }) {
  const isInfluencer = user.userType === 'influencer';
  const profile = isInfluencer ? user.influencerProfile : user.brandProfile;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
      padding: '16px',
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#fff', fontSize: '20px', margin: 0 }}>
            {isInfluencer ? '👤' : '🏢'} {t.userDetails}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '24px', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <InfoRow label="E-Mail" value={user.email} />
          <InfoRow label={t.status} value={user.status} />
          <InfoRow label={t.registered} value={new Date(user.createdAt).toLocaleString()} />
          
          {user.isFounder && (
            <InfoRow label={t.founder} value={`#${user.founderNumber} 👑`} highlight />
          )}

          {isInfluencer ? (
            <>
              <InfoRow label="Name" value={profile?.displayName} />
              <InfoRow label={t.category} value={profile?.category} />
              <InfoRow label={t.spot} value={profile?.spotNumber} />
              {profile?.platforms?.length > 0 && (
                <div>
                  <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 4px 0' }}>{t.platforms}</p>
                  {profile.platforms.map((p, i) => (
                    <p key={i} style={{ color: '#d1d5db', fontSize: '14px', margin: '4px 0' }}>
                      {p.name}: @{p.handle} ({p.followers?.toLocaleString()} followers)
                    </p>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <InfoRow label={t.company} value={profile?.companyName} />
              <InfoRow label={t.industry} value={profile?.industry} />
              <InfoRow label={t.website} value={profile?.website} />
              <InfoRow label={t.contact} value={profile?.contactPerson} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }) {
  if (!value) return null;
  return (
    <div>
      <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 4px 0' }}>{label}</p>
      <p style={{ color: highlight ? '#f59e0b' : '#d1d5db', fontSize: '14px', margin: 0, fontWeight: highlight ? 'bold' : 'normal' }}>{value}</p>
    </div>
  );
}
