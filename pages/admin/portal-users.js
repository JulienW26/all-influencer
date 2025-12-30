/**
 * Admin-Seite: Portal-Benutzer
 * KOMBINIERT: Original (AdminLayout, Mehrsprachigkeit, Detail-Modal) + Neu (Löschen, mehr Aktionen, besserer Dialog)
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminLanguage } from '../../lib/useAdminLanguage';

export default function PortalUsersPage() {
  const { lang } = useAdminLanguage();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [filter, setFilter] = useState({ status: 'all', userType: 'all' });
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Confirmation Dialog State (NEU)
  const [confirmDialog, setConfirmDialog] = useState({ show: false, action: null, user: null });

  // Texte (Mehrsprachig)
  const txt = {
    de: {
      title: 'Portal-Benutzer',
      total: 'Gesamt',
      pending: 'Ausstehend',
      approved: 'Freigegeben',
      rejected: 'Abgelehnt',
      suspended: 'Gesperrt',
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
      code: 'CODE',
      registered: 'REGISTRIERT',
      actions: 'AKTIONEN',
      view: 'Details',
      approve: 'Freigeben',
      reject: 'Ablehnen',
      suspend: 'Sperren',
      reactivate: 'Reaktivieren',
      approveAnyway: 'Doch freigeben',
      delete: 'Löschen',
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
      // Confirmation Dialog Texte (NEU)
      confirmTitle: 'Aktion bestätigen',
      confirmDeleteTitle: 'Benutzer löschen?',
      confirmApprove: 'Möchtest du diesen Benutzer freischalten?',
      confirmReject: 'Möchtest du diesen Benutzer ablehnen?',
      confirmSuspend: 'Möchtest du diesen Benutzer sperren?',
      confirmDelete: 'Möchtest du diesen Benutzer wirklich permanent löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
      cancel: 'Abbrechen',
      confirm: 'Bestätigen',
    },
    en: {
      title: 'Portal Users',
      total: 'Total',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      suspended: 'Suspended',
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
      code: 'CODE',
      registered: 'REGISTERED',
      actions: 'ACTIONS',
      view: 'Details',
      approve: 'Approve',
      reject: 'Reject',
      suspend: 'Suspend',
      reactivate: 'Reactivate',
      approveAnyway: 'Approve anyway',
      delete: 'Delete',
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
      // Confirmation Dialog Texte (NEU)
      confirmTitle: 'Confirm Action',
      confirmDeleteTitle: 'Delete User?',
      confirmApprove: 'Do you want to approve this user?',
      confirmReject: 'Do you want to reject this user?',
      confirmSuspend: 'Do you want to suspend this user?',
      confirmDelete: 'Do you really want to permanently delete this user? This action cannot be undone.',
      cancel: 'Cancel',
      confirm: 'Confirm',
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

  // Status ändern (VERBESSERT mit actionLoading)
  const updateStatus = async (userId, newStatus) => {
    setActionLoading(userId);
    try {
      const res = await fetch('/api/admin/portal-users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, status: newStatus }),
      });
      if (res.ok) {
        loadUsers();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setActionLoading(null);
      setConfirmDialog({ show: false, action: null, user: null });
    }
  };

  // Benutzer löschen (NEU)
  const deleteUser = async (userId) => {
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/portal-users?id=${userId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        loadUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setActionLoading(null);
      setConfirmDialog({ show: false, action: null, user: null });
    }
  };

  // Confirmation Dialog öffnen (NEU)
  const openConfirmDialog = (action, user) => {
    setConfirmDialog({ show: true, action, user });
  };

  // Confirmation Dialog Aktion ausführen (NEU)
  const executeConfirmAction = () => {
    if (!confirmDialog.user) return;
    
    if (confirmDialog.action === 'delete') {
      deleteUser(confirmDialog.user._id);
    } else {
      updateStatus(confirmDialog.user._id, confirmDialog.action);
    }
  };

  // Confirmation Dialog Text (NEU)
  const getConfirmMessage = () => {
    switch (confirmDialog.action) {
      case 'approved': return t.confirmApprove;
      case 'rejected': return t.confirmReject;
      case 'suspended': return t.confirmSuspend;
      case 'delete': return t.confirmDelete;
      default: return '';
    }
  };

  const statusColors = {
    pending: { bg: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' },
    approved: { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' },
    rejected: { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' },
    suspended: { bg: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af' },
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

  // Datum formatieren
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout title={t.title}>
      {/* Stats (ERWEITERT mit suspended) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: t.total, value: stats.total || 0, color: '#f59e0b' },
          { label: t.pending, value: stats.pending || 0, color: '#fbbf24' },
          { label: t.approved, value: stats.approved || 0, color: '#22c55e' },
          { label: t.rejected, value: stats.rejected || 0, color: '#ef4444' },
          { label: t.suspended, value: stats.suspended || 0, color: '#9ca3af' },
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
          <option value="suspended">{t.suspended}</option>
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

      {/* Table (ERWEITERT mit Code-Spalte und mehr Aktionen) */}
      <div style={{ backgroundColor: '#111827', borderRadius: '12px', border: '1px solid rgba(251, 191, 36, 0.2)', overflow: 'hidden', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.2)' }}>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.email}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.type}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.name}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.status}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.code}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.registered}</th>
              <th style={{ padding: '16px', textAlign: 'right', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>{t.noResults}</td></tr>
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
                    {statusLabels[lang]?.[user.status] || user.status}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <code style={{ fontSize: '11px', color: '#9ca3af', backgroundColor: '#1f2937', padding: '4px 8px', borderRadius: '4px' }}>
                    {user.invitationCode || '-'}
                  </code>
                </td>
                <td style={{ padding: '16px', color: '#9ca3af', fontSize: '14px' }}>
                  {formatDate(user.createdAt)}
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {/* Details Button */}
                    <button
                      onClick={() => setSelectedUser(user)}
                      disabled={actionLoading === user._id}
                      style={{ 
                        padding: '6px 12px', 
                        backgroundColor: 'rgba(251, 191, 36, 0.1)', 
                        border: '1px solid rgba(251, 191, 36, 0.3)', 
                        borderRadius: '6px', 
                        color: '#f59e0b', 
                        cursor: 'pointer', 
                        fontSize: '12px',
                        opacity: actionLoading === user._id ? 0.5 : 1,
                      }}
                    >
                      {t.view}
                    </button>

                    {/* Pending: Freigeben + Ablehnen */}
                    {user.status === 'pending' && (
                      <>
                        <button
                          onClick={() => openConfirmDialog('approved', user)}
                          disabled={actionLoading === user._id}
                          style={{ 
                            padding: '6px 12px', 
                            backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                            border: '1px solid rgba(34, 197, 94, 0.3)', 
                            borderRadius: '6px', 
                            color: '#22c55e', 
                            cursor: 'pointer', 
                            fontSize: '12px',
                            opacity: actionLoading === user._id ? 0.5 : 1,
                          }}
                        >
                          {t.approve}
                        </button>
                        <button
                          onClick={() => openConfirmDialog('rejected', user)}
                          disabled={actionLoading === user._id}
                          style={{ 
                            padding: '6px 12px', 
                            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                            border: '1px solid rgba(239, 68, 68, 0.3)', 
                            borderRadius: '6px', 
                            color: '#ef4444', 
                            cursor: 'pointer', 
                            fontSize: '12px',
                            opacity: actionLoading === user._id ? 0.5 : 1,
                          }}
                        >
                          {t.reject}
                        </button>
                      </>
                    )}

                    {/* Approved: Sperren */}
                    {user.status === 'approved' && (
                      <button
                        onClick={() => openConfirmDialog('suspended', user)}
                        disabled={actionLoading === user._id}
                        style={{ 
                          padding: '6px 12px', 
                          backgroundColor: 'rgba(107, 114, 128, 0.1)', 
                          border: '1px solid rgba(107, 114, 128, 0.3)', 
                          borderRadius: '6px', 
                          color: '#9ca3af', 
                          cursor: 'pointer', 
                          fontSize: '12px',
                          opacity: actionLoading === user._id ? 0.5 : 1,
                        }}
                      >
                        {t.suspend}
                      </button>
                    )}

                    {/* Suspended: Reaktivieren */}
                    {user.status === 'suspended' && (
                      <button
                        onClick={() => openConfirmDialog('approved', user)}
                        disabled={actionLoading === user._id}
                        style={{ 
                          padding: '6px 12px', 
                          backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                          border: '1px solid rgba(34, 197, 94, 0.3)', 
                          borderRadius: '6px', 
                          color: '#22c55e', 
                          cursor: 'pointer', 
                          fontSize: '12px',
                          opacity: actionLoading === user._id ? 0.5 : 1,
                        }}
                      >
                        {t.reactivate}
                      </button>
                    )}

                    {/* Rejected: Doch freigeben */}
                    {user.status === 'rejected' && (
                      <button
                        onClick={() => openConfirmDialog('approved', user)}
                        disabled={actionLoading === user._id}
                        style={{ 
                          padding: '6px 12px', 
                          backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                          border: '1px solid rgba(34, 197, 94, 0.3)', 
                          borderRadius: '6px', 
                          color: '#22c55e', 
                          cursor: 'pointer', 
                          fontSize: '12px',
                          opacity: actionLoading === user._id ? 0.5 : 1,
                        }}
                      >
                        {t.approveAnyway}
                      </button>
                    )}

                    {/* Löschen Button (NEU) */}
                    <button
                      onClick={() => openConfirmDialog('delete', user)}
                      disabled={actionLoading === user._id}
                      title={t.delete}
                      style={{ 
                        padding: '6px 8px', 
                        backgroundColor: 'transparent', 
                        border: 'none', 
                        color: '#ef4444', 
                        cursor: 'pointer',
                        opacity: actionLoading === user._id ? 0.5 : 1,
                      }}
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal (Original) */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          t={t}
          lang={lang}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* Confirmation Dialog (NEU - schöner Modal statt browser confirm) */}
      {confirmDialog.show && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 150,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
          padding: '16px',
        }} onClick={() => setConfirmDialog({ show: false, action: null, user: null })}>
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '400px',
            width: '100%',
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: '#fff', fontSize: '18px', margin: '0 0 16px 0' }}>
              {confirmDialog.action === 'delete' ? t.confirmDeleteTitle : t.confirmTitle}
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 8px 0' }}>
              <strong style={{ color: '#d1d5db' }}>{confirmDialog.user?.email}</strong>
            </p>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 24px 0' }}>
              {getConfirmMessage()}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setConfirmDialog({ show: false, action: null, user: null })}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#1f2937',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#d1d5db',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                {t.cancel}
              </button>
              <button
                onClick={executeConfirmAction}
                disabled={actionLoading}
                style={{
                  padding: '10px 20px',
                  backgroundColor: confirmDialog.action === 'delete' || confirmDialog.action === 'rejected' || confirmDialog.action === 'suspended' 
                    ? '#ef4444' 
                    : '#22c55e',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  opacity: actionLoading ? 0.5 : 1,
                }}
              >
                {confirmDialog.action === 'delete' ? t.delete : t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// Detail Modal (Original)
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
          <InfoRow label={t.code} value={user.invitationCode} />
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
