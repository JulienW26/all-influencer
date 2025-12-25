/**
 * E-Mail Versand Seite
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getRecipients, getLists } from '../../lib/recipients';
import { emailTemplates, generateEmailHTML } from '../../lib/email-templates';

const templateList = [
  { id: 'de-diamond', name: '🇩🇪 Diamond & Platin - Deutsch', lang: 'de', cat: 'diamond' },
  { id: 'de-gold', name: '🇩🇪 Gold & Rising Star - Deutsch', lang: 'de', cat: 'gold' },
  { id: 'en-diamond', name: '🇬🇧 Diamond & Platinum - English', lang: 'en', cat: 'diamond' },
  { id: 'en-gold', name: '🇬🇧 Gold & Rising Star - English', lang: 'en', cat: 'gold' },
  { id: 'es-diamond', name: '🇪🇸 Diamond & Platino - Español', lang: 'es', cat: 'diamond' },
  { id: 'es-gold', name: '🇪🇸 Gold & Rising Star - Español', lang: 'es', cat: 'gold' },
];

export default function SendPage() {
  const [recipients, setRecipients] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [testEmail, setTestEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sendingBulk, setSendingBulk] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setRecipients(getRecipients());
    setLists(getLists());
  }, []);

  // Gefilterte Empfänger
  const filteredRecipients = recipients.filter(r => {
    if (filterCategory !== 'all' && r.category !== filterCategory) return false;
    if (filterLanguage !== 'all' && r.language !== filterLanguage) return false;
    return true;
  });

  // Template holen
  const getTemplate = (templateId) => {
    const tpl = templateList.find(t => t.id === templateId);
    if (!tpl) return null;
    return emailTemplates[tpl.lang]?.[tpl.cat] || null;
  };

  // Alle auswählen/abwählen
  const toggleSelectAll = () => {
    if (selectedRecipients.length === filteredRecipients.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(filteredRecipients.map(r => r.id));
    }
  };

  // Einzeln auswählen
  const toggleSelect = (id) => {
    if (selectedRecipients.includes(id)) {
      setSelectedRecipients(selectedRecipients.filter(s => s !== id));
    } else {
      setSelectedRecipients([...selectedRecipients, id]);
    }
  };

  // Test-E-Mail senden
  const sendTestEmail = async () => {
    if (!selectedTemplate || !testEmail) {
      alert('Bitte Template und Test-E-Mail-Adresse auswählen');
      return;
    }

    const template = getTemplate(selectedTemplate);
    if (!template) return;

    setSending(true);
    try {
      const html = generateEmailHTML(template, { NAME: 'Test', SPOT: '1' });
      const subject = template.subject.replace(/\{\{NAME\}\}/g, 'Test').replace(/\{\{SPOT\}\}/g, '1');

      const res = await fetch('/api/admin/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: testEmail, subject, html })
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Test-E-Mail erfolgreich gesendet!');
      } else {
        alert('❌ Fehler: ' + (data.error || 'Unbekannter Fehler'));
      }
    } catch (error) {
      alert('❌ Fehler: ' + error.message);
    } finally {
      setSending(false);
    }
  };

  // Bulk-Versand
  const sendBulkEmails = async () => {
    if (!selectedTemplate || selectedRecipients.length === 0) {
      alert('Bitte Template und mindestens einen Empfänger auswählen');
      return;
    }

    if (!confirm(`Wirklich ${selectedRecipients.length} E-Mails senden?`)) {
      return;
    }

    const template = getTemplate(selectedTemplate);
    if (!template) return;

    setSendingBulk(true);
    setProgress({ current: 0, total: selectedRecipients.length });
    setResults([]);
    setShowResults(true);

    const newResults = [];

    for (let i = 0; i < selectedRecipients.length; i++) {
      const recipientId = selectedRecipients[i];
      const recipient = recipients.find(r => r.id === recipientId);
      if (!recipient) continue;

      setProgress({ current: i + 1, total: selectedRecipients.length });

      try {
        const html = generateEmailHTML(template, { 
          NAME: recipient.firstName || 'Influencer', 
          SPOT: recipient.spotNumber || '1' 
        });
        const subject = template.subject
          .replace(/\{\{NAME\}\}/g, recipient.firstName || 'Influencer')
          .replace(/\{\{SPOT\}\}/g, recipient.spotNumber || '1');

        const res = await fetch('/api/admin/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: recipient.email, subject, html })
        });

        const data = await res.json();
        newResults.push({
          email: recipient.email,
          success: res.ok,
          error: res.ok ? null : data.error
        });

      } catch (error) {
        newResults.push({
          email: recipient.email,
          success: false,
          error: error.message
        });
      }

      setResults([...newResults]);

      // 1 Sekunde Pause zwischen E-Mails (Rate Limiting)
      if (i < selectedRecipients.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    setSendingBulk(false);
    setSelectedRecipients([]);
  };

  const successCount = results.filter(r => r.success).length;
  const errorCount = results.filter(r => !r.success).length;

  return (
    <AdminLayout title="E-Mail Versand">
      {/* Template Auswahl */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>1. Template auswählen</h3>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: '#1f2937',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '16px'
          }}
        >
          <option value="">-- Template wählen --</option>
          {templateList.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* Test-E-Mail */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>2. Test-E-Mail senden (optional)</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="email"
            placeholder="deine@email.com"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            style={{
              flex: 1,
              minWidth: '250px',
              padding: '12px 16px',
              backgroundColor: '#1f2937',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <button
            onClick={sendTestEmail}
            disabled={sending || !selectedTemplate || !testEmail}
            style={{
              padding: '12px 24px',
              background: sending ? '#4b5563' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontWeight: 'bold',
              cursor: sending ? 'not-allowed' : 'pointer'
            }}
          >
            {sending ? 'Sende...' : '📧 Test senden'}
          </button>
        </div>
      </div>

      {/* Empfänger Auswahl */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>3. Empfänger auswählen</h3>
        
        {/* Filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{
            padding: '10px 16px',
            backgroundColor: '#1f2937',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px',
            color: '#fff'
          }}>
            <option value="all">Alle Kategorien</option>
            <option value="diamond">💎 Diamond</option>
            <option value="gold">🥇 Gold</option>
          </select>
          <select value={filterLanguage} onChange={(e) => setFilterLanguage(e.target.value)} style={{
            padding: '10px 16px',
            backgroundColor: '#1f2937',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px',
            color: '#fff'
          }}>
            <option value="all">Alle Sprachen</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="en">🇬🇧 English</option>
            <option value="es">🇪🇸 Español</option>
          </select>
          <span style={{ color: '#9ca3af', padding: '10px 0' }}>
            {selectedRecipients.length} von {filteredRecipients.length} ausgewählt
          </span>
        </div>

        {/* Tabelle */}
        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#1f2937' }}>
                <th style={{ padding: '12px', textAlign: 'left', position: 'sticky', top: 0, backgroundColor: '#1f2937' }}>
                  <input type="checkbox" checked={selectedRecipients.length === filteredRecipients.length && filteredRecipients.length > 0} onChange={toggleSelectAll} />
                </th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#f59e0b', fontSize: '12px', position: 'sticky', top: 0, backgroundColor: '#1f2937' }}>E-MAIL</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#f59e0b', fontSize: '12px', position: 'sticky', top: 0, backgroundColor: '#1f2937' }}>NAME</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#f59e0b', fontSize: '12px', position: 'sticky', top: 0, backgroundColor: '#1f2937' }}>SPOT</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipients.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                    Keine Empfänger gefunden. Füge zuerst Empfänger hinzu.
                  </td>
                </tr>
              ) : (
                filteredRecipients.map(r => (
                  <tr key={r.id} style={{ borderTop: '1px solid rgba(251, 191, 36, 0.1)' }}>
                    <td style={{ padding: '12px' }}>
                      <input type="checkbox" checked={selectedRecipients.includes(r.id)} onChange={() => toggleSelect(r.id)} />
                    </td>
                    <td style={{ padding: '12px', color: '#fff' }}>{r.email}</td>
                    <td style={{ padding: '12px', color: '#d1d5db' }}>{r.firstName || '-'}</td>
                    <td style={{ padding: '12px', color: '#f59e0b' }}>#{r.spotNumber || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Senden Button */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>4. E-Mails senden</h3>
        
        {sendingBulk ? (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#fff' }}>Sende E-Mails...</span>
                <span style={{ color: '#f59e0b' }}>{progress.current} / {progress.total}</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#1f2937', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(progress.current / progress.total) * 100}%`,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={sendBulkEmails}
            disabled={!selectedTemplate || selectedRecipients.length === 0}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: (!selectedTemplate || selectedRecipients.length === 0) ? '#4b5563' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: (!selectedTemplate || selectedRecipients.length === 0) ? 'not-allowed' : 'pointer'
            }}
          >
            🚀 {selectedRecipients.length} E-Mail{selectedRecipients.length !== 1 ? 's' : ''} senden
          </button>
        )}

        {/* Ergebnisse */}
        {showResults && results.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <span style={{ color: '#22c55e' }}>✅ Erfolgreich: {successCount}</span>
              {errorCount > 0 && <span style={{ color: '#f87171' }}>❌ Fehler: {errorCount}</span>}
            </div>
            <div style={{ maxHeight: '200px', overflowY: 'auto', backgroundColor: '#1f2937', borderRadius: '8px', padding: '12px' }}>
              {results.map((r, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#d1d5db' }}>{r.email}</span>
                  <span style={{ color: r.success ? '#22c55e' : '#f87171' }}>{r.success ? '✅' : '❌ ' + r.error}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
