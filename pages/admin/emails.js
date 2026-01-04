/**
 * E-Mail Template Generator V3
 * 
 * Features:
 * - 24 V3 Templates (12 kurz + 12 ausführlich) in 3 Sprachen
 * - Direkter Versand über Resend API
 * - Einladungscode Integration (Dropdown + manuell)
 * - Live-Vorschau
 * - Copy HTML für Backup
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ui, 
  templatesShort, 
  templatesDetailed,
  templateTypes,
  categories, 
  languages, 
  replacePlaceholders, 
  generateHTML, 
  generatePlainText 
} from '../../lib/email-templates-v3';

export default function EmailsPage() {
  const [lang, setLang] = useState('de');
  const [cat, setCat] = useState('diamond');
  const [templateType, setTemplateType] = useState('short');
  const [name, setName] = useState('');
  const [spot, setSpot] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [customTexts, setCustomTexts] = useState({});
  const [copied, setCopied] = useState('');

  // NEU: Versand-State
  const [recipientEmail, setRecipientEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState({ type: '', message: '' });

  // NEU: Einladungscode-State
  const [invitationCodes, setInvitationCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [codeMode, setCodeMode] = useState('dropdown'); // 'dropdown' oder 'manual'
  const [loadingCodes, setLoadingCodes] = useState(false);

  const u = ui[lang];
  
  // Template basierend auf Typ auswählen
  const baseTemplate = templateType === 'detailed' 
    ? templatesDetailed[lang][cat] 
    : templatesShort[lang][cat];
  
  // Für kurze Templates: Custom Texts anwenden
  const template = templateType === 'short' ? {
    ...baseTemplate,
    subject: customTexts.subject || baseTemplate.subject,
    greeting: customTexts.greeting || baseTemplate.greeting,
    intro: customTexts.intro || baseTemplate.intro,
    highlight: customTexts.highlight || baseTemplate.highlight,
    ctaText: customTexts.ctaText || baseTemplate.ctaText,
    buttonText: customTexts.buttonText || baseTemplate.buttonText,
    ps: customTexts.ps || baseTemplate.ps
  } : baseTemplate;

  const displayName = name || '[Name]';
  const displaySpot = spot || '[XX]';

  // Aktueller Code (aus Dropdown oder manuell)
  const currentCode = codeMode === 'dropdown' ? selectedCode : manualCode;

  useEffect(() => {
    setCustomTexts({});
  }, [lang, cat, templateType]);

  // NEU: Einladungscodes laden
  useEffect(() => {
    loadInvitationCodes();
  }, []);

  const loadInvitationCodes = async () => {
    setLoadingCodes(true);
    try {
      const res = await fetch('/api/admin/invitation-codes?status=active');
      const data = await res.json();
      setInvitationCodes(data.codes || []);
    } catch (error) {
      console.error('Error loading codes:', error);
    }
    setLoadingCodes(false);
  };

  const useBrevoCodes = () => {
    setName('{{contact.FIRSTNAME}}');
    setSpot('{{contact.SPOT_NUMBER}}');
  };

  const resetTexts = () => {
    setCustomTexts({});
  };

  // Placeholder-Ersetzung mit Code-Unterstützung
  const replaceAllPlaceholders = (text, nameVal, spotVal, codeVal = '') => {
    return text
      .replace(/\{NAME\}/g, nameVal)
      .replace(/\{SPOT\}/g, spotVal)
      .replace(/\{CODE\}/g, codeVal)
      .replace(/\{\{NAME\}\}/g, nameVal)
      .replace(/\{\{SPOT\}\}/g, spotVal)
      .replace(/\{\{CODE\}\}/g, codeVal);
  };

  const copyHTML = () => {
    let html = generateHTML(lang, cat, template, name, spot, templateType);
    // Code-Placeholder ersetzen falls vorhanden
    if (currentCode) {
      html = html.replace(/\{CODE\}/g, currentCode).replace(/\{\{CODE\}\}/g, currentCode);
    }
    navigator.clipboard.writeText(html);
    setCopied('html');
    setTimeout(() => setCopied(''), 2000);
  };

  const copyPlainText = () => {
    let text = generatePlainText(lang, template, name, spot, templateType);
    if (currentCode) {
      text = text.replace(/\{CODE\}/g, currentCode).replace(/\{\{CODE\}\}/g, currentCode);
    }
    navigator.clipboard.writeText(text);
    setCopied('text');
    setTimeout(() => setCopied(''), 2000);
  };

  const copySubject = () => {
    navigator.clipboard.writeText(replacePlaceholders(template.subject, name, spot));
    setCopied('subject');
    setTimeout(() => setCopied(''), 2000);
  };

  const downloadHTML = () => {
    let html = generateHTML(lang, cat, template, name, spot, templateType);
    if (currentCode) {
      html = html.replace(/\{CODE\}/g, currentCode).replace(/\{\{CODE\}\}/g, currentCode);
    }
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `email-template-${lang}-${cat}-${templateType}.html`;
    a.click();
  };

  // NEU: E-Mail senden
  const sendEmail = async () => {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      setSendStatus({ type: 'error', message: lang === 'de' ? 'Bitte gültige E-Mail-Adresse eingeben' : 'Please enter a valid email address' });
      return;
    }

    setSending(true);
    setSendStatus({ type: '', message: '' });

    try {
      let html = generateHTML(lang, cat, template, name || 'Name', spot || '1', templateType);
      // Code-Placeholder ersetzen
      if (currentCode) {
        html = html.replace(/\{CODE\}/g, currentCode).replace(/\{\{CODE\}\}/g, currentCode);
      }

      const subject = replacePlaceholders(template.subject, name || 'Name', spot || '1');

      const res = await fetch('/api/admin/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipientEmail,
          subject: subject,
          html: html
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSendStatus({ 
          type: 'success', 
          message: lang === 'de' ? '✅ E-Mail erfolgreich gesendet!' : '✅ Email sent successfully!' 
        });
        // Optional: Empfänger-Feld leeren nach erfolgreichem Versand
        // setRecipientEmail('');
      } else {
        setSendStatus({ 
          type: 'error', 
          message: data.error || (lang === 'de' ? 'Fehler beim Senden' : 'Error sending email')
        });
      }
    } catch (error) {
      console.error('Send error:', error);
      setSendStatus({ 
        type: 'error', 
        message: lang === 'de' ? 'Verbindungsfehler' : 'Connection error'
      });
    }

    setSending(false);
    setTimeout(() => setSendStatus({ type: '', message: '' }), 5000);
  };

  const loiUrl = `https://all-influencer.com/?loi=true&lang=${lang}`;
  const videoUrl = `https://all-influencer.com/video/founder-invitation?lang=${lang}`;

  // UI-Texte für neue Features
  const sendTexts = {
    de: {
      recipientLabel: '📧 Empfänger-E-Mail:',
      recipientPlaceholder: 'z.B. influencer@example.com',
      codeLabel: '🎟️ Einladungscode (optional):',
      codeDropdown: 'Aus Liste wählen',
      codeManual: 'Manuell eingeben',
      selectCode: '-- Code auswählen --',
      codePlaceholder: 'z.B. IN-AHJ6-Z3SK-4FE2',
      sendBtn: '📧 E-Mail senden',
      sending: 'Sende...',
      codeHint: 'Der Code wird im Template für {CODE} eingesetzt',
      refreshCodes: '🔄 Aktualisieren'
    },
    en: {
      recipientLabel: '📧 Recipient Email:',
      recipientPlaceholder: 'e.g. influencer@example.com',
      codeLabel: '🎟️ Invitation Code (optional):',
      codeDropdown: 'Select from list',
      codeManual: 'Enter manually',
      selectCode: '-- Select code --',
      codePlaceholder: 'e.g. IN-AHJ6-Z3SK-4FE2',
      sendBtn: '📧 Send Email',
      sending: 'Sending...',
      codeHint: 'The code replaces {CODE} in the template',
      refreshCodes: '🔄 Refresh'
    },
    es: {
      recipientLabel: '📧 Email del destinatario:',
      recipientPlaceholder: 'ej. influencer@example.com',
      codeLabel: '🎟️ Código de invitación (opcional):',
      codeDropdown: 'Seleccionar de lista',
      codeManual: 'Ingresar manualmente',
      selectCode: '-- Seleccionar código --',
      codePlaceholder: 'ej. IN-AHJ6-Z3SK-4FE2',
      sendBtn: '📧 Enviar Email',
      sending: 'Enviando...',
      codeHint: 'El código reemplaza {CODE} en la plantilla',
      refreshCodes: '🔄 Actualizar'
    }
  };
  const st = sendTexts[lang] || sendTexts.en;

  // Render Preview für kurze Templates
  const renderShortPreview = () => (
    <>
      <p style={{ color: '#fff', marginBottom: '20px' }}>{replacePlaceholders(template.greeting, displayName, displaySpot)}</p>
      <p style={{ color: '#9ca3af', marginBottom: '16px', lineHeight: '1.6' }}>{template.intro}</p>
      
      <div style={{ background: 'rgba(251, 191, 36, 0.1)', borderLeft: '4px solid #f59e0b', padding: '20px', margin: '24px 0', borderRadius: '0 8px 8px 0' }}>
        <p style={{ color: '#fbbf24', fontWeight: '500', margin: 0 }}>{template.highlight}</p>
      </div>
      
      <h3 style={{ color: '#f59e0b', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>{template.modelTitle}</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {template.model.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: '12px', color: '#d1d5db', marginBottom: '12px' }}>
            <span style={{ color: '#f59e0b' }}>▸</span>{item}
          </li>
        ))}
      </ul>
      
      <h3 style={{ color: '#f59e0b', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>{template.benefitsTitle}</h3>
      <div style={{ backgroundColor: 'rgba(251, 191, 36, 0.05)', borderRadius: '8px', padding: '16px' }}>
        {template.benefits.map((item, i) => (
          <p key={i} style={{ display: 'flex', gap: '12px', color: '#fff', margin: i === 0 ? 0 : '12px 0 0 0' }}>
            <span style={{ color: '#22c55e' }}>✓</span>{item}
          </p>
        ))}
      </div>
      
      <h3 style={{ color: '#fff', fontWeight: '600', marginTop: '32px', marginBottom: '12px' }}>{template.ctaTitle}</h3>
      <p style={{ color: '#9ca3af', marginBottom: '24px' }}>{template.ctaText}</p>
      
      <div style={{ textAlign: 'center' }}>
        <a href={loiUrl} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#000',
          fontWeight: 'bold',
          padding: '16px 40px',
          borderRadius: '8px',
          textDecoration: 'none'
        }}>{template.buttonText}</a>
      </div>
      
      <p style={{ color: '#f59e0b', textAlign: 'center', marginTop: '24px', fontWeight: '500' }}>{replacePlaceholders(template.spotText, displayName, displaySpot)}</p>
    </>
  );

  // Render Preview für ausführliche Templates
  const renderDetailedPreview = () => (
    <>
      <p style={{ color: '#fff', marginBottom: '20px' }}>{replacePlaceholders(template.greeting, displayName, displaySpot)}</p>
      <p style={{ color: '#9ca3af', marginBottom: '16px', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: template.intro }} />
      
      <div style={{ background: 'rgba(251, 191, 36, 0.1)', borderLeft: '4px solid #f59e0b', padding: '20px', margin: '24px 0', borderRadius: '0 8px 8px 0' }}>
        <p style={{ color: '#fbbf24', fontWeight: '500', margin: 0 }}>{template.highlight}</p>
      </div>
      
      {/* Sections */}
      {template.sections && template.sections.map((section, i) => (
        <div key={i}>
          <h3 style={{ color: '#f59e0b', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>{section.title}</h3>
          
          {section.content && (
            <div style={{ color: '#9ca3af', lineHeight: '1.7', marginBottom: '16px' }} 
                 dangerouslySetInnerHTML={{ __html: section.content.replace(/\n\n/g, '</p><p style="margin:14px 0;">').replace(/\n/g, '<br/>') }} />
          )}
          
          {section.categories && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '16px 0' }}>
              <span style={{ padding: '6px 14px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '20px', fontSize: '12px', color: '#fbbf24' }}>💎 Diamond (20M+)</span>
              <span style={{ padding: '6px 14px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '20px', fontSize: '12px', color: '#fbbf24' }}>💠 Platin (10-20M)</span>
              <span style={{ padding: '6px 14px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '20px', fontSize: '12px', color: '#fbbf24' }}>🥇 Gold (5-10M)</span>
              <span style={{ padding: '6px 14px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '20px', fontSize: '12px', color: '#fbbf24' }}>⭐ Rising Star (1-5M)</span>
            </div>
          )}
          
          {section.list && (
            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
              {section.list.map((item, j) => (
                <li key={j} style={{ display: 'flex', gap: '12px', color: '#d1d5db', marginBottom: '10px', lineHeight: '1.5' }}>
                  <span style={{ color: '#f59e0b' }}>▸</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          )}
          
          {section.note && (
            <p style={{ color: '#e5e7eb', lineHeight: '1.7', margin: '16px 0' }} dangerouslySetInnerHTML={{ __html: section.note }} />
          )}
          
          {section.highlight && (
            <div style={{ background: 'rgba(251, 191, 36, 0.1)', borderLeft: '4px solid #f59e0b', padding: '16px 18px', margin: '20px 0', borderRadius: '0 8px 8px 0' }}>
              <p style={{ color: '#fbbf24', fontWeight: '500', margin: 0, lineHeight: '1.6' }}>{section.highlight}</p>
            </div>
          )}
          
          {section.after && (
            <p style={{ color: '#9ca3af', lineHeight: '1.7', marginTop: '16px' }} dangerouslySetInnerHTML={{ __html: section.after }} />
          )}
        </div>
      ))}
      
      {/* Benefits */}
      <h3 style={{ color: '#f59e0b', fontWeight: '600', marginTop: '32px', marginBottom: '16px' }}>{template.benefitsTitle}</h3>
      <p style={{ color: '#9ca3af', marginBottom: '16px' }}>{template.benefitsIntro}</p>
      <div style={{ backgroundColor: 'rgba(251, 191, 36, 0.05)', borderRadius: '8px', padding: '16px' }}>
        {template.benefits.map((item, i) => (
          <p key={i} style={{ display: 'flex', gap: '12px', color: '#fff', margin: i === 0 ? 0 : '12px 0 0 0', lineHeight: '1.5' }}>
            <span style={{ color: '#22c55e' }}>✓</span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </p>
        ))}
      </div>
      
      {/* Value Note (für Gold/Rising Star) */}
      {template.valueNote && (
        <p style={{ color: '#e5e7eb', fontSize: '14px', fontWeight: '500', margin: '16px 0' }}>{template.valueNote}</p>
      )}
      
      {/* Spot Text */}
      <p style={{ color: '#f59e0b', textAlign: 'center', marginTop: '24px', fontWeight: '500' }}>{replacePlaceholders(template.spotText, displayName, displaySpot)}</p>
      
      {/* Two Buttons */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href={loiUrl} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#000',
          fontWeight: 'bold',
          padding: '16px 40px',
          borderRadius: '8px',
          textDecoration: 'none',
          marginBottom: '12px'
        }}>📝 {template.buttonText}</a>
      </div>
      <div style={{ textAlign: 'center' }}>
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#000',
          fontWeight: 'bold',
          padding: '16px 40px',
          borderRadius: '8px',
          textDecoration: 'none'
        }}>🎬 {template.videoButtonText}</a>
      </div>
    </>
  );

  return (
    <AdminLayout title={u.title}>
      {/* Sprache */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>{u.langLabel}</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {languages.map(l => (
            <button key={l.id} onClick={() => setLang(l.id)} style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              background: lang === l.id ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '#374151',
              color: lang === l.id ? '#000' : '#9ca3af'
            }}>{l.label}</button>
          ))}
        </div>
      </div>

      {/* Kategorie */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>{u.catLabel}</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              background: cat === c.id ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '#374151',
              color: cat === c.id ? '#000' : '#9ca3af'
            }}>{c.label}</button>
          ))}
        </div>
      </div>

      {/* Template Typ */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>{u.templateLabel}</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {templateTypes.map(t => (
            <button key={t.id} onClick={() => setTemplateType(t.id)} style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: templateType === t.id ? 'none' : '1px solid rgba(251, 191, 36, 0.3)',
              fontWeight: '500',
              cursor: 'pointer',
              background: templateType === t.id ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
              color: templateType === t.id ? '#000' : '#fbbf24'
            }}>{t.label[lang]}</button>
          ))}
        </div>
        {templateType === 'detailed' && (
          <p style={{ color: '#22c55e', fontSize: '12px', marginTop: '8px' }}>
            ✨ {lang === 'de' ? 'Ausführliches Template mit zwei Buttons (LOI + Video)' : lang === 'en' ? 'Detailed template with two buttons (LOI + Video)' : 'Plantilla detallada con dos botones (LOI + Video)'}
          </p>
        )}
      </div>

      {/* Personalisierung */}
      <div style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #374151' }}>
        <h3 style={{ color: '#f59e0b', fontWeight: '600', marginBottom: '16px', marginTop: 0 }}>{u.personalTitle}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ color: '#9ca3af', fontSize: '14px' }}>{u.nameLabel}</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={u.namePlaceholder}
              style={{ width: '100%', marginTop: '4px', padding: '10px 12px', backgroundColor: '#374151', border: '1px solid #4b5563', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ color: '#9ca3af', fontSize: '14px' }}>{u.spotLabel}</label>
            <input type="text" value={spot} onChange={(e) => setSpot(e.target.value)} placeholder={u.spotPlaceholder}
              style={{ width: '100%', marginTop: '4px', padding: '10px 12px', backgroundColor: '#374151', border: '1px solid #4b5563', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ color: '#9ca3af', fontSize: '14px' }}>{u.brevoLabel}</label>
            <button onClick={useBrevoCodes} style={{ width: '100%', marginTop: '4px', padding: '10px 12px', backgroundColor: '#d97706', border: 'none', borderRadius: '8px', color: '#000', fontWeight: '500', cursor: 'pointer' }}>{u.brevoBtn}</button>
          </div>
        </div>
      </div>

      {/* NEU: Versand-Sektion */}
      <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
        <h3 style={{ color: '#22c55e', fontWeight: '600', marginBottom: '16px', marginTop: 0 }}>
          🚀 {lang === 'de' ? 'Direktversand' : lang === 'en' ? 'Direct Send' : 'Envío Directo'}
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Empfänger E-Mail */}
          <div>
            <label style={{ color: '#9ca3af', fontSize: '14px' }}>{st.recipientLabel}</label>
            <input 
              type="email" 
              value={recipientEmail} 
              onChange={(e) => setRecipientEmail(e.target.value)} 
              placeholder={st.recipientPlaceholder}
              style={{ 
                width: '100%', 
                marginTop: '4px', 
                padding: '12px', 
                backgroundColor: '#1f2937', 
                border: '1px solid rgba(34, 197, 94, 0.3)', 
                borderRadius: '8px', 
                color: '#fff', 
                boxSizing: 'border-box',
                fontSize: '14px'
              }} 
            />
          </div>

          {/* Einladungscode */}
          <div>
            <label style={{ color: '#9ca3af', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {st.codeLabel}
              <button 
                onClick={loadInvitationCodes}
                style={{ 
                  padding: '2px 8px', 
                  fontSize: '11px', 
                  backgroundColor: 'transparent', 
                  border: '1px solid rgba(251, 191, 36, 0.3)', 
                  borderRadius: '4px', 
                  color: '#f59e0b', 
                  cursor: 'pointer' 
                }}
              >
                {st.refreshCodes}
              </button>
            </label>
            
            {/* Toggle zwischen Dropdown und Manual */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px', marginBottom: '8px' }}>
              <button 
                onClick={() => setCodeMode('dropdown')}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: codeMode === 'dropdown' ? '#f59e0b' : '#374151',
                  color: codeMode === 'dropdown' ? '#000' : '#9ca3af'
                }}
              >
                {st.codeDropdown}
              </button>
              <button 
                onClick={() => setCodeMode('manual')}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: codeMode === 'manual' ? '#f59e0b' : '#374151',
                  color: codeMode === 'manual' ? '#000' : '#9ca3af'
                }}
              >
                {st.codeManual}
              </button>
            </div>

            {codeMode === 'dropdown' ? (
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                disabled={loadingCodes}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  backgroundColor: '#1f2937', 
                  border: '1px solid rgba(251, 191, 36, 0.3)', 
                  borderRadius: '8px', 
                  color: '#fff', 
                  boxSizing: 'border-box',
                  fontSize: '14px'
                }}
              >
                <option value="">{st.selectCode}</option>
                {invitationCodes.map(code => (
                  <option key={code._id} value={code.code}>
                    {code.code} ({code.type} - {code.category || 'n/a'})
                  </option>
                ))}
              </select>
            ) : (
              <input 
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                placeholder={st.codePlaceholder}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  backgroundColor: '#1f2937', 
                  border: '1px solid rgba(251, 191, 36, 0.3)', 
                  borderRadius: '8px', 
                  color: '#fff', 
                  boxSizing: 'border-box',
                  fontSize: '14px',
                  fontFamily: 'monospace'
                }}
              />
            )}
            <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px' }}>{st.codeHint}</p>
          </div>
        </div>

        {/* Senden Button */}
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button 
            onClick={sendEmail}
            disabled={sending || !recipientEmail}
            style={{
              padding: '14px 32px',
              background: (sending || !recipientEmail) ? '#4b5563' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '15px',
              cursor: (sending || !recipientEmail) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {sending ? (
              <>⏳ {st.sending}</>
            ) : (
              <>{st.sendBtn}</>
            )}
          </button>

          {sendStatus.message && (
            <span style={{ 
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: sendStatus.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: sendStatus.type === 'success' ? '#22c55e' : '#ef4444'
            }}>
              {sendStatus.message}
            </span>
          )}
        </div>
      </div>

      {/* Edit Mode Toggle - nur für kurze Templates */}
      {templateType === 'short' && (
        <div style={{ marginBottom: '24px' }}>
          <button onClick={() => setEditMode(!editMode)} style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: editMode ? '#f59e0b' : '#374151',
            color: editMode ? '#000' : '#fff',
            cursor: 'pointer',
            fontWeight: '500'
          }}>✏️ {u.editLabel}</button>
        </div>
      )}

      {/* Edit Section - nur für kurze Templates */}
      {editMode && templateType === 'short' && (
        <div style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
          <h3 style={{ color: '#f59e0b', fontWeight: '600', marginBottom: '8px', marginTop: 0 }}>{u.editTitle}</h3>
          <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>{u.editHint}</p>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ color: '#9ca3af', fontSize: '14px' }}>{u.editSubject}</label>
              <input type="text" value={customTexts.subject || baseTemplate.subject} onChange={(e) => setCustomTexts({...customTexts, subject: e.target.value})}
                style={{ width: '100%', marginTop: '4px', padding: '10px 12px', backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#9ca3af', fontSize: '14px' }}>{u.editGreeting}</label>
              <input type="text" value={customTexts.greeting || baseTemplate.greeting} onChange={(e) => setCustomTexts({...customTexts, greeting: e.target.value})}
                style={{ width: '100%', marginTop: '4px', padding: '10px 12px', backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#9ca3af', fontSize: '14px' }}>{u.editIntro}</label>
              <textarea value={customTexts.intro || baseTemplate.intro} onChange={(e) => setCustomTexts({...customTexts, intro: e.target.value})} rows={3}
                style={{ width: '100%', marginTop: '4px', padding: '10px 12px', backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box', resize: 'vertical' }} />
            </div>
            <div>
              <label style={{ color: '#9ca3af', fontSize: '14px' }}>{u.editHighlight}</label>
              <textarea value={customTexts.highlight || baseTemplate.highlight} onChange={(e) => setCustomTexts({...customTexts, highlight: e.target.value})} rows={2}
                style={{ width: '100%', marginTop: '4px', padding: '10px 12px', backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box', resize: 'vertical' }} />
            </div>
            <div>
              <label style={{ color: '#9ca3af', fontSize: '14px' }}>{u.editCta}</label>
              <textarea value={customTexts.ctaText || baseTemplate.ctaText} onChange={(e) => setCustomTexts({...customTexts, ctaText: e.target.value})} rows={2}
                style={{ width: '100%', marginTop: '4px', padding: '10px 12px', backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box', resize: 'vertical' }} />
            </div>
            <div>
              <label style={{ color: '#9ca3af', fontSize: '14px' }}>{u.editButton}</label>
              <input type="text" value={customTexts.buttonText || baseTemplate.buttonText} onChange={(e) => setCustomTexts({...customTexts, buttonText: e.target.value})}
                style={{ width: '100%', marginTop: '4px', padding: '10px 12px', backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#9ca3af', fontSize: '14px' }}>{u.editPs}</label>
              <textarea value={customTexts.ps || baseTemplate.ps} onChange={(e) => setCustomTexts({...customTexts, ps: e.target.value})} rows={2}
                style={{ width: '100%', marginTop: '4px', padding: '10px 12px', backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box', resize: 'vertical' }} />
            </div>
            <button onClick={resetTexts} style={{ alignSelf: 'flex-start', padding: '10px 16px', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: 'none', borderRadius: '8px', color: '#f87171', cursor: 'pointer', fontSize: '14px' }}>{u.resetBtn}</button>
          </div>
        </div>
      )}

      {/* Betreffzeile */}
      <div style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px solid #374151' }}>
        <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px', marginTop: 0 }}>{u.subjectLabel}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <p style={{ color: '#fff', fontWeight: '500', flex: 1, margin: 0 }}>{replacePlaceholders(template.subject, displayName, displaySpot)}</p>
          <button onClick={copySubject} style={{ padding: '6px 12px', backgroundColor: '#374151', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>
            {copied === 'subject' ? '✅' : '📋'}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button onClick={copyHTML} style={{
          padding: '14px 24px',
          borderRadius: '12px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>{copied === 'html' ? u.copied : u.copyHtml}</button>
        <button onClick={copyPlainText} style={{
          padding: '14px 24px',
          borderRadius: '12px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          backgroundColor: '#374151',
          color: '#fff'
        }}>{copied === 'text' ? u.copied : u.copyText}</button>
        <button onClick={downloadHTML} style={{
          padding: '14px 24px',
          borderRadius: '12px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          backgroundColor: '#374151',
          color: '#fff'
        }}>{u.download}</button>
      </div>

      {/* Preview */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>{u.previewLabel}</p>
        <div style={{ backgroundColor: '#111827', borderRadius: '12px', border: '1px solid rgba(251, 191, 36, 0.3)', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', padding: '32px', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#000', borderRadius: '12px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#f59e0b' }}>AI</div>
            <h2 style={{ color: '#000', fontWeight: 'bold', fontSize: '20px', letterSpacing: '2px', margin: 0 }}>ALL INFLUENCER</h2>
            <p style={{ color: 'rgba(0,0,0,0.7)', fontSize: '12px', letterSpacing: '3px', marginTop: '4px' }}>PREMIUM NETWORK</p>
          </div>
          
          {/* Content - dynamisch basierend auf Template-Typ */}
          <div style={{ padding: '32px' }}>
            {templateType === 'detailed' ? renderDetailedPreview() : renderShortPreview()}

            {/* Closing - gemeinsam für beide */}
            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(251, 191, 36, 0.3)' }}>
              <p style={{ color: '#9ca3af', marginBottom: '20px' }}>{template.closing}</p>
              <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px', margin: 0 }}>Julien Weiss</p>
              <p style={{ color: '#d1d5db', fontSize: '14px', marginTop: '8px' }}>{u.senderTitle}, All-Influencer.com | Die 333</p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '16px', flexWrap: 'wrap' }}>
                <a href="tel:+491632600084" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: '500' }}>📱 +49 163 260 0084</a>
                <a href="mailto:contact@all-influencer.com" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: '500' }}>✉️ contact@all-influencer.com</a>
              </div>
            </div>
            
            <div style={{ marginTop: '32px', padding: '16px', backgroundColor: 'rgba(251, 191, 36, 0.08)', borderLeft: '3px solid #f59e0b', borderRadius: '0 8px 8px 0' }}>
              <p style={{ color: '#d1d5db', fontSize: '13px', fontStyle: 'italic', margin: 0 }}>{template.ps}</p>
            </div>
          </div>

          {/* Footer */}
          <div style={{ backgroundColor: '#000', padding: '24px', textAlign: 'center', borderTop: '1px solid rgba(251, 191, 36, 0.2)' }}>
            <p style={{ color: '#6b7280', fontSize: '11px', margin: 0 }}>© 2025 ALL INFLUENCER. All rights reserved.</p>
            <a href="https://all-influencer.com" style={{ color: '#f59e0b', fontSize: '10px', textDecoration: 'none' }}>all-influencer.com</a>
          </div>
        </div>
      </div>

      {/* Anleitung */}
      <div style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '12px', padding: '24px', border: '1px solid #374151' }}>
        <h3 style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '18px', marginTop: 0, marginBottom: '16px' }}>{u.instructionsTitle}</h3>
        <ol style={{ color: '#d1d5db', fontSize: '14px', paddingLeft: '20px', margin: 0 }}>
          {u.instructions.map((item, i) => (
            <li key={i} style={{ marginBottom: '8px' }}>{item}</li>
          ))}
        </ol>
      </div>
    </AdminLayout>
  );
}
