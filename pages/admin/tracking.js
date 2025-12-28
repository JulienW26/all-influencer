/**
 * Tracking & Statistiken Seite
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminLanguage } from '../../lib/useAdminLanguage';
import { getTrackingData, getStats, getCampaigns, exportTrackingCSV, clearTrackingData } from '../../lib/tracking';

export default function TrackingPage() {
  const [trackingData, setTrackingData] = useState([]);
  const [stats, setStats] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchEmail, setSearchEmail] = useState('');
  const { t } = useAdminLanguage();
  const txt = t('tracking');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setTrackingData(getTrackingData());
    setStats(getStats());
    setCampaigns(getCampaigns());
  };

  // Gefilterte Daten
  const filteredData = trackingData
    .filter(d => {
      if (filter === 'success' && !d.success) return false;
      if (filter === 'failed' && d.success) return false;
      if (searchEmail && !d.email.toLowerCase().includes(searchEmail.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));

  // Export
  const handleExport = () => {
    const csv = exportTrackingCSV();
    if (!csv) {
      alert(txt.noExportData || 'Keine Daten zum Exportieren');
      return;
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tracking_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
  };

  // Daten löschen
  const handleClear = () => {
    if (confirm(txt.confirmDeleteAll || 'Wirklich ALLE Tracking-Daten löschen? Dies kann nicht rückgängig gemacht werden!')) {
      clearTrackingData();
      loadData();
    }
  };

  return (
    <AdminLayout title={txt.title || 'Tracking & Statistiken'}>
      {/* Stats Übersicht */}
      {stats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>{txt.totalSent || 'Gesamt gesendet'}</p>
            <p style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{stats.total}</p>
          </div>
          <div style={{ backgroundColor: '#111827', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px', padding: '20px' }}>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>{txt.successful || 'Erfolgreich'}</p>
            <p style={{ color: '#22c55e', fontSize: '28px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{stats.successful}</p>
          </div>
          <div style={{ backgroundColor: '#111827', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '20px' }}>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>{txt.failed || 'Fehlgeschlagen'}</p>
            <p style={{ color: '#f87171', fontSize: '28px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{stats.failed}</p>
          </div>
          <div style={{ backgroundColor: '#111827', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>{txt.successRate || 'Erfolgsrate'}</p>
            <p style={{ color: '#f59e0b', fontSize: '28px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{stats.successRate}%</p>
          </div>
        </div>
      )}

      {/* Letzte 7 Tage Chart */}
      {stats && stats.last7Days && (
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h3 style={{ color: '#fff', margin: '0 0 20px 0', fontSize: '16px' }}>{txt.last7Days || '📊 Letzte 7 Tage'}</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
            {stats.last7Days.map((day, i) => {
              const maxVal = Math.max(...stats.last7Days.map(d => d.total), 1);
              const height = (day.total / maxVal) * 100;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '12px', marginBottom: '4px' }}>{day.total}</span>
                  <div style={{
                    width: '100%',
                    height: `${Math.max(height, 4)}px`,
                    background: day.total > 0 ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '#1f2937',
                    borderRadius: '4px 4px 0 0'
                  }} />
                  <span style={{ color: '#6b7280', fontSize: '11px', marginTop: '8px' }}>{day.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Aktionen */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <button onClick={handleExport} style={{
          padding: '10px 20px',
          backgroundColor: '#1f2937',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '8px',
          color: '#fff',
          cursor: 'pointer'
        }}>{txt.csvExport || '📤 CSV Export'}</button>
        <button onClick={handleClear} style={{
          padding: '10px 20px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          color: '#f87171',
          cursor: 'pointer'
        }}>{txt.deleteAll || '🗑️ Alle löschen'}</button>
      </div>

      {/* Filter */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder={txt.searchEmail || 'E-Mail suchen...'}
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={{
            padding: '10px 16px',
            backgroundColor: '#1f2937',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px',
            color: '#fff',
            minWidth: '200px'
          }}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{
          padding: '10px 16px',
          backgroundColor: '#1f2937',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '8px',
          color: '#fff'
        }}>
          <option value="all">{txt.allStatus || 'Alle Status'}</option>
          <option value="success">{txt.statusSuccess || '✅ Erfolgreich'}</option>
          <option value="failed">{txt.statusFailed || '❌ Fehlgeschlagen'}</option>
        </select>
        <span style={{ color: '#9ca3af', padding: '10px 0' }}>
          {filteredData.length} {txt.entries || 'Einträge'}
        </span>
      </div>

      {/* Tabelle */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#1f2937', position: 'sticky', top: 0 }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#f59e0b', fontSize: '12px', fontWeight: '600' }}>{txt.date || 'DATUM'}</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#f59e0b', fontSize: '12px', fontWeight: '600' }}>{txt.email || 'E-MAIL'}</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#f59e0b', fontSize: '12px', fontWeight: '600' }}>{txt.template || 'TEMPLATE'}</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', color: '#f59e0b', fontSize: '12px', fontWeight: '600' }}>{txt.status || 'STATUS'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
                    {trackingData.length === 0 
                      ? (txt.noEmails || 'Noch keine E-Mails gesendet. Gehe zu "Versand" um E-Mails zu senden.')
                      : (txt.noResults || 'Keine Einträge gefunden.')}
                  </td>
                </tr>
              ) : (
                filteredData.map((entry) => (
                  <tr key={entry.id} style={{ borderTop: '1px solid rgba(251, 191, 36, 0.2)' }}>
                    <td style={{ padding: '12px 16px', color: '#9ca3af', fontSize: '13px' }}>
                      {new Date(entry.sentAt).toLocaleString('de-DE', { 
                        day: '2-digit', 
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ color: '#fff', fontSize: '14px' }}>{entry.email}</div>
                      {entry.recipientName && (
                        <div style={{ color: '#6b7280', fontSize: '12px' }}>{entry.recipientName}</div>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#d1d5db', fontSize: '13px' }}>
                      {entry.templateName || entry.templateId}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      {entry.success ? (
                        <span style={{
                          padding: '4px 12px',
                          backgroundColor: 'rgba(34, 197, 94, 0.2)',
                          color: '#22c55e',
                          borderRadius: '20px',
                          fontSize: '12px'
                        }}>{txt.statusSuccess || '✅ Erfolgreich'}</span>
                      ) : (
                        <span style={{
                          padding: '4px 12px',
                          backgroundColor: 'rgba(239, 68, 68, 0.2)',
                          color: '#f87171',
                          borderRadius: '20px',
                          fontSize: '12px'
                        }} title={entry.error || ''}>{txt.statusFailed || '❌ Fehler'}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Template Stats */}
      {stats && Object.keys(stats.byTemplate).length > 0 && (
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '12px',
          padding: '24px',
          marginTop: '24px'
        }}>
          <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>{txt.byTemplate || '📧 Nach Template'}</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {Object.entries(stats.byTemplate).map(([id, tpl]) => (
              <div key={id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                backgroundColor: '#1f2937',
                borderRadius: '8px'
              }}>
                <span style={{ color: '#d1d5db' }}>{tpl.name}</span>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ color: '#9ca3af' }}>{tpl.total} {txt.sent || 'gesendet'}</span>
                  <span style={{ color: '#22c55e' }}>{tpl.success} {txt.successful || 'erfolgreich'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
