/**
 * E-Mail Send Page V3
 * 
 * Features:
 * - V3 Templates (24: 12 kurz + 12 ausführlich)
 * - Custom Templates aus Template-Builder (Redis)
 * - Direkt senden über Resend API
 * - Test-E-Mail Funktion
 * - Bulk-Versand mit Progress
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminLanguage } from '../../lib/useAdminLanguage';
import { getRecipients } from '../../lib/recipients';
import { 
  templatesShort, 
  templatesDetailed, 
  generateHTML, 
  replacePlaceholders 
} from '../../lib/email-templates-v3';
import { trackSentEmail } from '../../lib/tracking';

// V3 Template-Liste: Kurz + Ausführlich
const v3Templates = [
  // Kurze Templates
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
  // Ausführliche Templates
  { id: 'detailed-de-diamond', name: '📄 🇩🇪 Diamond - Ausführlich', lang: 'de', cat: 'diamond', type: 'detailed' },
  { id: 'detailed-de-platin', name: '📄 🇩🇪 Platin - Ausführlich', lang: 'de', cat: 'platin', type: 'detailed' },
  { id: 'detailed-de-gold', name: '📄 🇩🇪 Gold - Ausführlich', lang: 'de', cat: 'gold', type: 'detailed' },
  { id: 'detailed-de-rising', name: '📄 🇩🇪 Rising Star - Ausführlich', lang: 'de', cat: 'rising', type: 'detailed' },
  { id: 'detailed-en-diamond', name: '📄 🇬🇧 Diamond - Detailed', lang: 'en', cat: 'diamond', type: 'detailed' },
  { id: 'detailed-en-platin', name: '📄 🇬🇧 Platinum - Detailed', lang: 'en', cat: 'platin', type: 'detailed' },
  { id: 'detailed-en-gold', name: '📄 🇬🇧 Gold - Detailed', lang: 'en', cat: 'gold', type: 'detailed' },
  { id: 'detailed-en-rising', name: '📄 🇬🇧 Rising Star - Detailed', lang: 'en', cat: 'rising', type: 'detailed' },
  { id: 'detailed-es-diamond', name: '📄 🇪🇸 Diamond - Detallado', lang: 'es', cat: 'diamond', type: 'detailed' },
  { id: 'detailed-es-platin', name: '📄 🇪🇸 Platino - Detallado', lang: 'es', cat: 'platin', type: 'detailed' },
  { id: 'detailed-es-gold', name: '📄 🇪🇸 Gold - Detallado', lang: 'es', cat: 'gold', type: 'detailed' },
  { id: 'detailed-es-rising', name: '📄 🇪🇸 Rising Star - Detallado', lang: 'es', cat: 'rising', type: 'detailed' },
];

export default function SendPage() {
  const [recipients, setRecipients] = useState([]);
  const [customTemplates, setCustomTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  
  // Personalisierung
  const [personName, setPersonName] = useState('');
  const [personSpot, setPersonSpot] = useState('');
  
  // Test E-Mail
  const [testEmail, setTestEmail] = useState('');
  const [sending, setSending] = useState(false);
  
  // Bulk Versand
  const [sendingBulk, setSendingBulk] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  // Vorschau
  const [previewHtml, setPreviewHtml] = useState('');
  const [previewSubject, setPreviewSubject] = useState('');
  
  const { t, lang } = useAdminLanguage();
  const txt = t('send') || {};

  // Empfänger und Custom Templates laden
  useEffect(() => {
    setRecipients(getRecipients());
    loadCustomTemplates();
  }, []);

  // Custom Templates aus Redis laden
  const loadCustomTemplates = async () => {
    try {
      const responses = await Promise.all([
        fetch('/api/admin/custom-templates?lang=de'),
        fetch('/api/admin/custom-templates?lang=en'),
        fetch('/api/admin/custom-templates?lang=es'),
      ]);
      
      const allTemplates = [];
      for (const res of responses) {
        if (res.ok) {
          const data = await res.json();
          if (data.templates) {
            allTemplates.push(...data.templates);
          }
        }
      }
      setCustomTemplates(allTemplates);
    } catch (error) {
      console.error('Error loading custom templates:', error);
    }
  };

  // Template-Daten holen
  const getTemplateData = (templateId) => {
    // Check if it's a custom template
    if (templateId.startsWith('custom-')) {
      const customId = templateId.replace('custom-', '');
      return customTemplates.find(t => t.id === customId);
    }
    
    // V3 Template
    const v3Info = v3Templates.find(t => t.id === templateId);
    if (!v3Info) return null;
    
    const templates = v3Info.type === 'detailed' ? templatesDetailed : templatesShort;
    const template = templates[v3Info.lang]?.[v3Info.cat];
    if (!template) return null;
    
    return {
      ...v3Info,
      template,
      isV3: true
    };
  };

  // Vorschau generieren
  useEffect(() => {
    if (!selectedTemplateId) {
      setPreviewHtml('');
      setPreviewSubject('');
      return;
    }

    const data = getTemplateData(selectedTemplateId);
    if (!data) return;

    const name = personName || 'Name';
    const spot = personSpot || '1';

    if (data.isV3) {
      // V3 Template
      const html = generateHTML(data.lang, data.cat, data.template, name, spot, data.type);
      const subject = replacePlaceholders(data.template.subject, name, spot);
      setPreviewHtml(html);
      setPreviewSubject(subject);
    } else {
      // Custom Template
      const html = generateCustomHTML(data, name, spot);
      const subject = replacePlaceholders(data.subject || 'All-Influencer.com', name, spot);
      setPreviewHtml(html);
      setPreviewSubject(subject);
    }
  }, [selectedTemplateId, personName, personSpot, customTemplates]);

  // Custom Template HTML generieren
  const generateCustomHTML = (template, name, spot) => {
    if (!template || !template.blocks) return '';
    
    let bodyContent = '';
    
    template.blocks.forEach(block => {
      let text = replacePlaceholders(block.content || '', name, spot);
      const color = block.color || '#e5e7eb';
      
      switch (block.type) {
        case 'heading':
          bodyContent += `<h2 style="color: ${color}; font-size: 20px; margin: 24px 0 12px 0;">${text}</h2>`;
          break;
        case 'highlight':
          bodyContent += `<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 16px; margin: 16px 0; color: ${color};">${text}</div>`;
          break;
        case 'list':
          const items = text.split('\n').filter(item => item.trim());
          bodyContent += '<ul style="margin: 16px 0; padding-left: 24px;">';
          items.forEach(item => {
            bodyContent += `<li style="color: ${color}; margin: 8px 0;">${item.replace(/^[-•]\s*/, '')}</li>`;
          });
          bodyContent += '</ul>';
          break;
        default:
          bodyContent += `<p style="color: ${color}; line-height: 1.6; margin: 16px 0;">${text}</p>`;
      }
    });
    
    // Buttons
    if (template.buttons && template.buttons.length > 0) {
      bodyContent += '<div style="margin: 32px 0; text-align: center;">';
      template.buttons.forEach(btn => {
        const url = replacePlaceholders(btn.url || '#', name, spot);
        bodyContent += `<a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 8px;">${btn.label}</a>`;
      });
      bodyContent += '</div>';
    }
    
    // Komplettes HTML
    return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #1a1a1a; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a;">
    <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 20px; text-align: center;">
      <div style="width: 60px; height: 60px; background: #000; border-radius: 16px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #f59e0b; font-weight: bold; font-size: 20px;">AI</span>
      </div>
      <h1 style="color: #000; margin: 0; font-size: 24px; letter-spacing: 2px;">ALL INFLUENCER</h1>
      <p style="color: rgba(0,0,0,0.7); margin: 8px 0 0; font-size: 12px; letter-spacing: 3px;">PREMIUM NETWORK</p>
    </div>
    <div style="padding: 40px 30px;">
      ${bodyContent}
    </div>
    <div style="padding: 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
      <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">© ${new Date().getFullYear()} All-Influencer.com</p>
    </div>
  </div>
</body>
</html>`;
  };

  // Gefilterte Empfänger
  const filteredRecipients = recipients.filter(r => {
    if (filterCategory !== 'all' && r.category !== filterCategory) return false;
    if (filterLanguage !== 'all' && r.language !== filterLanguage) return false;
    return true;
  });

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
    if (!selectedTemplateId || !testEmail) {
      alert('Bitte Template und Test-E-Mail-Adresse eingeben');
      return;
    }

    if (!previewHtml || !previewSubject) {
      alert('Template konnte nicht generiert werden');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/admin/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          to: testEmail, 
          subject: previewSubject, 
          html: previewHtml 
        })
      });

      const data = await res.json();
      
      // Tracking
      trackSentEmail({
        email: testEmail,
        recipientName: personName || 'Test',
        templateId: selectedTemplateId,
        templateName: selectedTemplateId,
        subject: previewSubject,
        success: res.ok,
        error: res.ok ? null : data.error
      });

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
    if (!selectedTemplateId || selectedRecipients.length === 0) {
      alert('Bitte Template und mindestens einen Empfänger auswählen');
      return;
    }

    if (!confirm(`Wirklich ${selectedRecipients.length} E-Mails senden?`)) {
      return;
    }

    const data = getTemplateData(selectedTemplateId);
    if (!data) return;

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
        
        let html, subject;
        
        if (data.isV3) {
          html = generateHTML(data.lang, data.cat, data.template, recipientName, recipientSpot, data.type);
          subject = replacePlaceholders(data.template.subject, recipientName, recipientSpot);
        } else {
          html = generateCustomHTML(data, recipientName, recipientSpot);
          subject = replacePlaceholders(data.subject || 'All-Influencer.com', recipientName, recipientSpot);
        }

        const res = await fetch('/api/admin/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: recipient.email, subject, html })
        });

        const resData = await res.json();
        
        trackSentEmail({
          email: recipient.email,
          recipientName,
          templateId: selectedTemplateId,
          templateName: selectedTemplateId,
          subject,
          success: res.ok,
          error: res.ok ? null : resData.error
        });

        newResults.push({
          email: recipient.email,
          success: res.ok,
          error: res.ok ? null : resData.error
        });

      } catch (error) {
        newResults.push({
          email: recipient.email,
          success: false,
          error: error.message
        });
      }

      setResults([...newResults]);

      // 1 Sekunde Pause (Rate Limiting)
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Linke Spalte: Konfiguration */}
        <div>
          {/* Template Auswahl */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>
              📧 1. Template wählen
            </h3>
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#1f2937',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px'
              }}
            >
              <option value="">-- Template wählen --</option>
              
              <optgroup label="⚡ Kurze Templates (Original)">
                {v3Templates.filter(t => t.type === 'short').map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </optgroup>
              
              <optgroup label="📄 Ausführliche Templates (LOI + Video)">
                {v3Templates.filter(t => t.type === 'detailed').map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </optgroup>
              
              {customTemplates.length > 0 && (
                <optgroup label="🎨 Eigene Templates (Template-Builder)">
                  {customTemplates.map(t => (
                    <option key={`custom-${t.id}`} value={`custom-${t.id}`}>
                      🎨 {t.name} ({t.language?.toUpperCase()})
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* Personalisierung */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>
              ✏️ 2. Personalisierung (für Test-E-Mail)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ color: '#9ca3af', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  Vorname
                </label>
                <input
                  type="text"
                  placeholder="z.B. Max"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#1f2937',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ color: '#9ca3af', fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  Spot-Nummer
                </label>
                <input
                  type="text"
                  placeholder="z.B. 77"
                  value={personSpot}
                  onChange={(e) => setPersonSpot(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#1f2937',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Test-E-Mail */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>
              🧪 3. Test-E-Mail senden
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="email"
                placeholder="deine@email.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  backgroundColor: '#1f2937',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <button
                onClick={sendTestEmail}
                disabled={sending || !selectedTemplateId || !testEmail}
                style={{
                  padding: '12px 24px',
                  background: sending ? '#4b5563' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#000',
                  fontWeight: 'bold',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {sending ? '⏳ Sende...' : '📧 Test senden'}
              </button>
            </div>
          </div>

          {/* Empfänger-Auswahl (für Bulk) */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{ color: '#fff', margin: '0 0 16px 0', fontSize: '16px' }}>
              👥 4. Empfänger wählen (Bulk-Versand)
            </h3>
            
            {/* Filter */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{
                padding: '8px 12px',
                backgroundColor: '#1f2937',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px'
              }}>
                <option value="all">Alle Kategorien</option>
                <option value="diamond">💎 Diamond</option>
                <option value="platin">🏆 Platin</option>
                <option value="gold">🥇 Gold</option>
                <option value="rising">⭐ Rising Star</option>
              </select>
              <select value={filterLanguage} onChange={(e) => setFilterLanguage(e.target.value)} style={{
                padding: '8px 12px',
                backgroundColor: '#1f2937',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px'
              }}>
                <option value="all">Alle Sprachen</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
              </select>
              <span style={{ color: '#9ca3af', padding: '8px 0', fontSize: '13px' }}>
                {selectedRecipients.length} von {filteredRecipients.length} ausgewählt
              </span>
            </div>

            {/* Tabelle */}
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1f2937' }}>
                    <th style={{ padding: '10px', textAlign: 'left', position: 'sticky', top: 0, backgroundColor: '#1f2937' }}>
                      <input type="checkbox" checked={selectedRecipients.length === filteredRecipients.length && filteredRecipients.length > 0} onChange={toggleSelectAll} />
                    </th>
                    <th style={{ padding: '10px', textAlign: 'left', color: '#f59e0b', fontSize: '11px', position: 'sticky', top: 0, backgroundColor: '#1f2937' }}>E-MAIL</th>
                    <th style={{ padding: '10px', textAlign: 'left', color: '#f59e0b', fontSize: '11px', position: 'sticky', top: 0, backgroundColor: '#1f2937' }}>NAME</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecipients.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                        Keine Empfänger. Füge welche unter "Empfänger" hinzu.
                      </td>
                    </tr>
                  ) : (
                    filteredRecipients.map(r => (
                      <tr key={r.id} style={{ borderTop: '1px solid rgba(251, 191, 36, 0.1)' }}>
                        <td style={{ padding: '10px' }}>
                          <input type="checkbox" checked={selectedRecipients.includes(r.id)} onChange={() => toggleSelect(r.id)} />
                        </td>
                        <td style={{ padding: '10px', color: '#fff' }}>{r.email}</td>
                        <td style={{ padding: '10px', color: '#d1d5db' }}>{r.firstName || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Bulk Senden Button */}
            <div style={{ marginTop: '16px' }}>
              {sendingBulk ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#fff', fontSize: '13px' }}>Sende E-Mails...</span>
                    <span style={{ color: '#f59e0b', fontSize: '13px' }}>{progress.current} / {progress.total}</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#1f2937', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(progress.current / progress.total) * 100}%`,
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                </div>
              ) : (
                <button
                  onClick={sendBulkEmails}
                  disabled={!selectedTemplateId || selectedRecipients.length === 0}
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    background: (!selectedTemplateId || selectedRecipients.length === 0) ? '#4b5563' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    cursor: (!selectedTemplateId || selectedRecipients.length === 0) ? 'not-allowed' : 'pointer'
                  }}
                >
                  🚀 {selectedRecipients.length} E-Mail{selectedRecipients.length !== 1 ? 's' : ''} senden
                </button>
              )}
            </div>

            {/* Ergebnisse */}
            {showResults && results.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#22c55e' }}>✅ Erfolgreich: {successCount}</span>
                  {errorCount > 0 && <span style={{ color: '#f87171' }}>❌ Fehler: {errorCount}</span>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rechte Spalte: Vorschau */}
        <div>
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
            padding: '24px',
            position: 'sticky',
            top: '24px'
          }}>
            <h3 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '16px' }}>
              👁️ Vorschau
            </h3>
            
            {previewSubject && (
              <div style={{ 
                backgroundColor: '#1f2937', 
                padding: '12px', 
                borderRadius: '8px', 
                marginBottom: '16px',
                fontSize: '13px'
              }}>
                <span style={{ color: '#9ca3af' }}>Betreff: </span>
                <span style={{ color: '#fff' }}>{previewSubject}</span>
              </div>
            )}
            
            <div style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              overflow: 'hidden',
              maxHeight: '600px',
              overflowY: 'auto'
            }}>
              {previewHtml ? (
                <iframe
                  srcDoc={previewHtml}
                  style={{
                    width: '100%',
                    height: '550px',
                    border: 'none',
                    backgroundColor: '#1a1a1a'
                  }}
                  title="E-Mail Vorschau"
                />
              ) : (
                <div style={{ 
                  padding: '60px 20px', 
                  textAlign: 'center', 
                  color: '#6b7280' 
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📧</div>
                  <p>Wähle ein Template um die Vorschau zu sehen</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
