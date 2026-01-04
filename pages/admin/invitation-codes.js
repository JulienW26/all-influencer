/**
 * Admin-Seite: Einladungscodes
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminLanguage } from '../../lib/useAdminLanguage';

export default function InvitationCodesPage() {
  const { lang } = useAdminLanguage();
  const [codes, setCodes] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: 'all', type: 'all' });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ show: false, action: null, code: null });
  const [copiedCode, setCopiedCode] = useState(null); // NEU: Für Copy-Feedback

  // Texte
  const txt = {
    de: {
      title: 'Einladungscodes',
      createNew: '+ Neuen Code erstellen',
      total: 'Gesamt',
      active: 'Aktiv',
      used: 'Verwendet',
      influencer: 'Influencer',
      brand: 'Brand',
      allStatus: 'Alle Status',
      allTypes: 'Alle Typen',
      code: 'CODE',
      type: 'TYP',
      category: 'KATEGORIE',
      status: 'STATUS',
      created: 'ERSTELLT',
      actions: 'AKTIONEN',
      deactivate: 'Deaktivieren',
      copy: 'Kopieren',
      copied: 'Kopiert!',
      noResults: 'Keine Codes gefunden.',
      createTitle: 'Neuen Einladungscode erstellen',
      codeType: 'Code-Typ',
      selectCategory: 'Kategorie wählen',
      spotNumber: 'Spot-Nummer (optional)',
      founderCode: 'Gründer-Code',
      validUntil: 'Gültig bis (optional)',
      notes: 'Notizen (optional)',
      cancel: 'Abbrechen',
      create: 'Code erstellen',
      success: 'Code erfolgreich erstellt!',
      delete: 'Löschen',
      confirmTitle: 'Aktion bestätigen',
      confirmDeleteTitle: 'Code löschen?',
      confirmDelete: 'Möchtest du diesen Einladungscode wirklich permanent löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
      confirm: 'Bestätigen',
    },
    en: {
      title: 'Invitation Codes',
      createNew: '+ Create New Code',
      total: 'Total',
      active: 'Active',
      used: 'Used',
      influencer: 'Influencer',
      brand: 'Brand',
      allStatus: 'All Status',
      allTypes: 'All Types',
      code: 'CODE',
      type: 'TYPE',
      category: 'CATEGORY',
      status: 'STATUS',
      created: 'CREATED',
      actions: 'ACTIONS',
      deactivate: 'Deactivate',
      copy: 'Copy',
      copied: 'Copied!',
      noResults: 'No codes found.',
      createTitle: 'Create New Invitation Code',
      codeType: 'Code Type',
      selectCategory: 'Select Category',
      spotNumber: 'Spot Number (optional)',
      founderCode: 'Founder Code',
      validUntil: 'Valid Until (optional)',
      notes: 'Notes (optional)',
      cancel: 'Cancel',
      create: 'Create Code',
      success: 'Code created successfully!',
      delete: 'Delete',
      confirmTitle: 'Confirm Action',
      confirmDeleteTitle: 'Delete Code?',
      confirmDelete: 'Do you really want to permanently delete this invitation code? This action cannot be undone.',
      confirm: 'Confirm',
    },
  };
  const t = txt[lang] || txt.en;

  // Codes laden
  const loadCodes = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.status !== 'all') params.append('status', filter.status);
      if (filter.type !== 'all') params.append('type', filter.type);

      const res = await fetch(`/api/admin/invitation-codes?${params}`);
      const data = await res.json();
      setCodes(data.codes || []);
      setStats(data.stats || {});
    } catch (error) {
      console.error('Error loading codes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCodes();
  }, [filter]);

  // Code erstellen
  const handleCreate = async (formData) => {
    setCreating(true);
    try {
      const res = await fetch('/api/admin/invitation-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setShowCreateModal(false);
        loadCodes();
      }
    } catch (error) {
      console.error('Error creating code:', error);
    } finally {
      setCreating(false);
    }
  };

  // Code deaktivieren
  const handleDeactivate = async (id) => {
    if (!confirm(lang === 'de' ? 'Code wirklich deaktivieren?' : 'Really deactivate code?')) return;
    
    try {
      await fetch(`/api/admin/invitation-codes?id=${id}`, { method: 'DELETE' });
      loadCodes();
    } catch (error) {
      console.error('Error deactivating code:', error);
    }
  };

  // Code permanent löschen (NEU)
  const handleDelete = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/invitation-codes?id=${id}&permanent=true`, { 
        method: 'DELETE' 
      });
      if (res.ok) {
        loadCodes();
      }
    } catch (error) {
      console.error('Error deleting code:', error);
    } finally {
      setActionLoading(null);
      setConfirmDialog({ show: false, action: null, code: null });
    }
  };

  // Confirmation Dialog öffnen (NEU)
  const openConfirmDialog = (action, code) => {
    setConfirmDialog({ show: true, action, code });
  };

  // Confirmation Dialog Aktion ausführen (NEU)
  const executeConfirmAction = () => {
    if (!confirmDialog.code) return;
    
    if (confirmDialog.action === 'delete') {
      handleDelete(confirmDialog.code._id);
    }
  };

  // Code kopieren mit Feedback
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const statusColors = {
    active: { bg: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' },
    used: { bg: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af' },
    expired: { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' },
    deactivated: { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' },
  };

  return (
    <AdminLayout title={t.title}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: t.total, value: stats.total || 0, color: '#f59e0b' },
          { label: t.active, value: stats.active || 0, color: '#22c55e' },
          { label: t.used, value: stats.used || 0, color: '#9ca3af' },
          { label: t.influencer, value: stats.influencer || 0, color: '#3b82f6' },
          { label: t.brand, value: stats.brand || 0, color: '#8b5cf6' },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: '12px',
            padding: '20px',
          }}>
            <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>{stat.label}</p>
            <p style={{ color: stat.color, fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0' }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Actions Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
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
            <option value="active">{t.active}</option>
            <option value="used">{t.used}</option>
          </select>
          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
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
            <option value="influencer">{t.influencer}</option>
            <option value="brand">{t.brand}</option>
          </select>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#000',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {t.createNew}
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#111827', borderRadius: '12px', border: '1px solid rgba(251, 191, 36, 0.2)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.2)' }}>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.code}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.type}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.category}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.status}</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.created}</th>
              <th style={{ padding: '16px', textAlign: 'right', color: '#9ca3af', fontSize: '12px', fontWeight: '500' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>Loading...</td></tr>
            ) : codes.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>{t.noResults}</td></tr>
            ) : codes.map((code) => (
              <tr key={code._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '16px' }}>
                  <code style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '4px 8px', borderRadius: '4px', color: '#f59e0b', fontFamily: 'monospace' }}>
                    {code.code}
                  </code>
                  {code.isFounderCode && <span style={{ marginLeft: '8px', fontSize: '12px' }}>👑</span>}
                </td>
                <td style={{ padding: '16px', color: '#d1d5db', fontSize: '14px' }}>
                  {code.type === 'influencer' ? '👤 Influencer' : '🏢 Brand'}
                </td>
                <td style={{ padding: '16px', color: '#d1d5db', fontSize: '14px' }}>
                  {code.category ? `${code.category}` : '-'}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: statusColors[code.status]?.bg,
                    color: statusColors[code.status]?.color,
                  }}>
                    {code.status}
                  </span>
                </td>
                <td style={{ padding: '16px', color: '#9ca3af', fontSize: '14px' }}>
                  {new Date(code.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => copyCode(code.code)}
                      disabled={actionLoading === code._id}
                      style={{ 
                        padding: '6px 12px', 
                        backgroundColor: copiedCode === code.code ? 'rgba(34, 197, 94, 0.2)' : 'rgba(251, 191, 36, 0.1)', 
                        border: copiedCode === code.code ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(251, 191, 36, 0.3)', 
                        borderRadius: '6px', 
                        color: copiedCode === code.code ? '#22c55e' : '#f59e0b', 
                        cursor: 'pointer', 
                        fontSize: '12px',
                        opacity: actionLoading === code._id ? 0.5 : 1,
                        transition: 'all 0.2s ease',
                        minWidth: '70px',
                      }}
                    >
                      {copiedCode === code.code ? t.copied : t.copy}
                    </button>
                    {code.status === 'active' && (
                      <button
                        onClick={() => handleDeactivate(code._id)}
                        disabled={actionLoading === code._id}
                        style={{ 
                          padding: '6px 12px', 
                          backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                          border: '1px solid rgba(239, 68, 68, 0.3)', 
                          borderRadius: '6px', 
                          color: '#ef4444', 
                          cursor: 'pointer', 
                          fontSize: '12px',
                          opacity: actionLoading === code._id ? 0.5 : 1,
                        }}
                      >
                        {t.deactivate}
                      </button>
                    )}
                    {/* Löschen Button (NEU) */}
                    <button
                      onClick={() => openConfirmDialog('delete', code)}
                      disabled={actionLoading === code._id}
                      title={t.delete}
                      style={{ 
                        padding: '6px 8px', 
                        backgroundColor: 'transparent', 
                        border: 'none', 
                        color: '#ef4444', 
                        cursor: 'pointer',
                        opacity: actionLoading === code._id ? 0.5 : 1,
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

      {/* Create Modal */}
      {showCreateModal && (
        <CreateCodeModal
          t={t}
          lang={lang}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
          creating={creating}
        />
      )}

      {/* Confirmation Dialog (NEU) */}
      {confirmDialog.show && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 150,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
          padding: '16px',
        }} onClick={() => setConfirmDialog({ show: false, action: null, code: null })}>
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '400px',
            width: '100%',
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: '#fff', fontSize: '18px', margin: '0 0 16px 0' }}>
              {t.confirmDeleteTitle}
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 8px 0' }}>
              <code style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '4px 8px', borderRadius: '4px', color: '#f59e0b', fontFamily: 'monospace' }}>
                {confirmDialog.code?.code}
              </code>
            </p>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 24px 0' }}>
              {t.confirmDelete}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setConfirmDialog({ show: false, action: null, code: null })}
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
                  backgroundColor: '#ef4444',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  opacity: actionLoading ? 0.5 : 1,
                }}
              >
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// Modal Komponente
function CreateCodeModal({ t, lang, onClose, onCreate, creating }) {
  const [formData, setFormData] = useState({
    type: 'influencer',
    category: 'gold',
    spotNumber: '',
    isFounderCode: false,
    validUntil: '',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

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
      }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ color: '#fff', fontSize: '20px', margin: '0 0 24px 0' }}>{t.createTitle}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Code-Typ */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>{t.codeType}</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={{
                width: '100%', padding: '12px 16px',
                backgroundColor: '#1f2937',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px', color: '#fff', fontSize: '14px',
              }}
            >
              <option value="influencer">👤 Influencer</option>
              <option value="brand">🏢 Brand</option>
            </select>
          </div>

          {/* Kategorie (nur für Influencer) */}
          {formData.type === 'influencer' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>{t.selectCategory}</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  width: '100%', padding: '12px 16px',
                  backgroundColor: '#1f2937',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '8px', color: '#fff', fontSize: '14px',
                }}
              >
                <option value="diamond">💎 Diamond (20M+)</option>
                <option value="platin">💠 Platin (10M+)</option>
                <option value="gold">🥇 Gold (5M+)</option>
                <option value="rising">⭐ Rising Star (1M+)</option>
              </select>
            </div>
          )}

          {/* Spot-Nummer */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>{t.spotNumber}</label>
            <input
              type="number"
              value={formData.spotNumber}
              onChange={(e) => setFormData({ ...formData, spotNumber: e.target.value })}
              placeholder="z.B. 42"
              style={{
                width: '100%', padding: '12px 16px',
                backgroundColor: '#1f2937',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px', color: '#fff', fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Gründer-Code */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.isFounderCode}
                onChange={(e) => setFormData({ ...formData, isFounderCode: e.target.checked })}
                style={{ width: '20px', height: '20px', accentColor: '#f59e0b' }}
              />
              <span style={{ color: '#d1d5db', fontSize: '14px' }}>👑 {t.founderCode}</span>
            </label>
          </div>

          {/* Notizen */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>{t.notes}</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="2"
              style={{
                width: '100%', padding: '12px 16px',
                backgroundColor: '#1f2937',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px', color: '#fff', fontSize: '14px',
                resize: 'vertical', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px', color: '#9ca3af', cursor: 'pointer',
              }}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={creating}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                border: 'none', borderRadius: '8px',
                color: '#000', fontWeight: 'bold', cursor: 'pointer',
                opacity: creating ? 0.7 : 1,
              }}
            >
              {creating ? '...' : t.create}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
