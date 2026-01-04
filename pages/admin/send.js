/**
 * E-Mail Versand Seite V3
 * Unterstützt kurze und ausführliche Templates
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminLanguage } from '../../lib/useAdminLanguage';
import { getRecipients, getLists } from '../../lib/recipients';
import { 
  templatesShort, 
  templatesDetailed, 
  generateHTML, 
  replacePlaceholders 
} from '../../lib/email-templates-v3';
import { trackSentEmail } from '../../lib/tracking';

// Template-Liste: Kurz (Original) + Ausführlich (Neu)
const templateList = [
  // Kurze Templates (Original)
  { id: 'short-de-diamond', name: '⚡ 🇩🇪 Diamond - Kurz', lang: 'de', cat: 'diamond', type: 'short' },
  { id: 'short-de-platin', name: '⚡ 🇩🇪 Platin - Kurz', lang: 'de', cat: 'platin', type: 'short' },
  { id: 'short-de-gold', name: '⚡ 🇩🇪 Gold - Kurz', lang: 'de', cat: 'gold', type: 'short' },
  { id: 'short-de-rising', name: '⚡ 🇩🇪 Rising Star - Kurz', lang: 'de', cat: 'rising', type: 'short' },
  { id: 'short-en-diamond', name: '⚡ 🇬🇧 Diamond - Short', lang: 'en', cat: 'diamond', type: 'short' },
  { id: 'short-en-platin', name: '⚡ 🇬🇧 Platinum - Short', lang: 'en', cat: 'platin', type: 'short' },
  { id: 'short-en-gold', name: '⚡ 🇬🇧 Gold - Short', lang: 'en', cat: 'gold', type: 'short' },
  { id: 'short-en-rising', name: '⚡ 🇬🇧 Rising Star - Short', lang: 'en', cat: 'rising', type: 'short' },
  { id: 'short-es-diamond', name: '⚡ 🇪🇸 Diamond - Corto', lang: 'es', cat: 'diamond', type: 'short' },
  { id: 'short-es-platin', name: '⚡ 🇪🇸 Platino - Corto', lang: 'es', cat: 'platin', type: 'short' },
  { id: 'short-es-gold', name: '⚡ 🇪🇸 Gold - Corto', lang: 'es', cat: 'gold', type: 'short' },
  { id: 'short-es-rising', name: '⚡ 🇪🇸 Rising Star - Corto', lang: 'es', cat: 'rising', type: 'short' },
  // Ausführliche Templates (Neu - Entwurf 1 & 2)
  { id: 'detailed-de-diamond', name: '📄 🇩🇪 Diamond - Ausführlich (2 Buttons)', lang: 'de', cat: 'diamond', type: 'detailed' },
  { id: 'detailed-de-platin', name: '📄 🇩🇪 Platin - Ausführlich (2 Buttons)', lang: 'de', cat: 'platin', type: 'detailed' },
  { id: 'detailed-de-gold', name: '📄 🇩🇪 Gold - Ausführlich (2 Buttons)', lang: 'de', cat: 'gold', type: 'detailed' },
  { id: 'detailed-de-rising', name: '📄 🇩🇪 Rising Star - Ausführlich (2 Buttons)', lang: 'de', cat: 'rising', type: 'detailed' },
  { id: 'detailed-en-diamond', name: '📄 🇬🇧 Diamond - Detailed (2 Buttons)', lang: 'en', cat: 'diamond', type: 'detailed' },
  { id: 'detailed-en-platin', name: '📄 🇬🇧 Platinum - Detailed (2 Buttons)', lang: 'en', cat: 'platin', type: 'detailed' },
  { id: 'detailed-en-gold', name: '📄 🇬🇧 Gold - Detailed (2 Buttons)', lang: 'en', cat: 'gold', type: 'detailed' },
  { id: 'detailed-en-rising', name: '📄 🇬🇧 Rising Star - Detailed (2 Buttons)', lang: 'en', cat: 'rising', type: 'detailed' },
  { id: 'detailed-es-diamond', name: '📄 🇪🇸 Diamond - Detallado (2 Botones)', lang: 'es', cat: 'diamond', type: 'detailed' },
  { id: 'detailed-es-platin', name: '📄 🇪🇸 Platino - Detallado (2 Botones)', lang: 'es', cat: 'platin', type: 'detailed' },
  { id: 'detailed-es-gold', name: '📄 🇪🇸 Gold - Detallado (2 Botones)', lang: 'es', cat: 'gold', type: 'detailed' },
  { id: 'detailed-es-rising', name: '📄 🇪🇸 Rising Star - Detallado (2 Botones)', lang: 'es', cat: 'rising', type: 'detailed' },
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
  const { t } = useAdminLanguage();
  const txt = t('send');

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

  // Template holen (V3)
  const getTemplate = (templateId) => {
    const tpl = templateList.find(t => t.id === templateId);
    if (!tpl) return null;
    
    const templates = tpl.type === 'detailed' ? templatesDetailed : templatesShort;
    return templates[tpl.lang]?.[tpl.cat] || null;
  };

  // Template-Info holen (für HTML-Generierung)
  const getTemplateInfo = (templateId) => {
    return templateList.find(t => t.id === templateId) || null;
  };

  // Template-Name holen
  const getTemplateName = (templateId) => {
    const tpl = templateList.find(t => t.id === templateId);
    return tpl ? tpl.name : templateId;
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
      alert(txt.selectTemplateAndRecipients || 'Bitte Template und Test-E-Mail-Adresse auswählen');
      return;
    }

    const template = getTemplate(selectedTemplate);
    const templateInfo = getTemplateInfo(selectedTemplate);
    if (!template || !templateInfo) return;

    setSending(true);
    try {
      // V3: generateHTML mit templateType
      const html = generateHTML(
        templateInfo.lang, 
        templateInfo.cat, 
        template, 
        'Test', 
        '1', 
        templateInfo.type
      );
      const subject = replacePlaceholders(template.subject, 'Test', '1');

      const res = await fetch('/api/admin/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: testEmail, subject, html })
      });

      const data = await res.json();
      
      // Tracking
      trackSentEmail({
        email: testEmail,
        recipientName: 'Test',
        templateId: selectedTemplate,
        templateName: getTemplateName(selectedTemplate),
        subject,
        success: res.ok,
        error: res.ok ? null : data.error
      });

      if (res.ok) {
        alert(txt.testSuccess || '✅ Test-E-Mail erfolgreich gesendet!');
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
      alert(txt.selectTemplateAndRecipients || 'Bitte Template und mindestens einen Empfänger auswählen');
      return;
    }

    if (!confirm(`${txt.confirmSend || 'Wirklich E-Mails senden?'} (${selectedRecipients.length})`)) {
      return;
    }

    const template = getTemplate(selectedTemplate);
    const templateInfo = getTemplateInfo(selectedTemplate);
    if (!template || !templateInfo) return;

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
        const recipientName = recipient.firstName || 'Influencer';
        const recipientSpot = recipient.spotNumber || '1';
        
        // V3: generateHTML mit templateType
        const html = generateHTML(
          templateInfo.lang, 
          templateInfo.cat, 
          template, 
          recipientName, 
          recipientSpot, 
          templateInfo.type
        );
        const subject = replacePlaceholders(template.subject, recipientName, recipientSpot);

        const res = await fetch('/api/admin/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: recipient.email, subject, html })
        });

        const data = await res.json();
        
        // Tracking
        trackSentEmail({
          email: recipient.email,
          recipientName: recipient.firstName || '',
          templateId: selectedTemplate,
          templateName: getTemplateName(selectedTemplate),
          subject,
          success: res.ok,
          error: res.ok ? null : data.error
        });

        newResults.push({
          email: recipient.email,
          success: res.ok,
          error: res.ok ? null : data.error
        });

      } catch (error) {
        // Tracking bei Fehler
        trackSentEmail({
          email: recipient.email,
          recipientName: recipient.firstName || '',
          templateId: selectedTemplate,
          templateName: getTemplateName(selectedTemplate),
          subject: '',
          success: false,
          error: error.message
        });

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
    <AdminLayout title={txt.title || 'E-Mail Versand'}>
      {/* Template Auswahl */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>{txt.step1 || '1. Template auswählen'}</h3>
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
          <option value="">{txt.selectTemplate || '-- Template wählen --'}</option>
          <optgroup label="⚡ Kurze Templates (Original)">
            {templateList.filter(t => t.type === 'short').map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </optgroup>
          <optgroup label="📄 Ausführliche Templates (2 Buttons - LOI + Video)">
            {templateList.filter(t => t.type === 'detailed').map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </optgroup>
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
        <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>{txt.step2 || '2. Test-E-Mail senden (optional)'}</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="email"
            placeholder={txt.testEmail || 'deine@email.com'}
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
            {sending ? (txt.sending || 'Sende...') : (txt.sendTest || '📧 Test senden')}
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
        <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>{txt.step3 || '3. Empfänger auswählen'}</h3>
        
        {/* Filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{
            padding: '10px 16px',
            backgroundColor: '#1f2937',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px',
            color: '#fff'
          }}>
            <option value="all">{txt.allCategories || 'Alle Kategorien'}</option>
            <option value="diamond">💎 Diamond</option>
            <option value="platin">🏆 Platin</option>
            <option value="gold">🥇 Gold</option>
            <option value="rising">⭐ Rising Star</option>
          </select>
          <select value={filterLanguage} onChange={(e) => setFilterLanguage(e.target.value)} style={{
            padding: '10px 16px',
            backgroundColor: '#1f2937',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px',
            color: '#fff'
          }}>
            <option value="all">{txt.allLanguages || 'Alle Sprachen'}</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="en">🇬🇧 English</option>
            <option value="es">🇪🇸 Español</option>
          </select>
          <span style={{ color: '#9ca3af', padding: '10px 0' }}>
            {selectedRecipients.length} {txt.of || 'von'} {filteredRecipients.length} {txt.selected || 'ausgewählt'}
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
                    {txt.noRecipients || 'Keine Empfänger gefunden. Füge zuerst Empfänger hinzu.'}
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
        <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>{txt.step4 || '4. E-Mails senden'}</h3>
        
        {sendingBulk ? (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#fff' }}>{txt.sendingEmails || 'Sende E-Mails...'}</span>
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
            🚀 {selectedRecipients.length} {selectedRecipients.length !== 1 ? (txt.emails || 'E-Mails') : (txt.email || 'E-Mail')} {txt.sendEmails || 'senden'}
          </button>
        )}

        {/* Ergebnisse */}
        {showResults && results.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <span style={{ color: '#22c55e' }}>✅ {txt.successful || 'Erfolgreich'}: {successCount}</span>
              {errorCount > 0 && <span style={{ color: '#f87171' }}>❌ {txt.failed || 'Fehler'}: {errorCount}</span>}
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
