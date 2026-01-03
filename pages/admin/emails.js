/**
 * E-Mail Template Generator V3
 * 
 * Features:
 * - Kurze Templates (Original V2)
 * - Ausführliche Templates (NEU: Entwurf 1 & 2)
 * - Alle 3 Sprachen (DE, EN, ES)
 * - Zwei Buttons bei ausführlichen Templates (LOI + Video)
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
  const [templateType, setTemplateType] = useState('short'); // NEU: 'short' oder 'detailed'
  const [name, setName] = useState('');
  const [spot, setSpot] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [customTexts, setCustomTexts] = useState({});
  const [copied, setCopied] = useState('');

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

  useEffect(() => {
    setCustomTexts({});
  }, [lang, cat, templateType]);

  const useBrevoCodes = () => {
    setName('{{contact.FIRSTNAME}}');
    setSpot('{{contact.SPOT_NUMBER}}');
  };

  const resetTexts = () => {
    setCustomTexts({});
  };

  const copyHTML = () => {
    const html = generateHTML(lang, cat, template, name, spot, templateType);
    navigator.clipboard.writeText(html);
    setCopied('html');
    setTimeout(() => setCopied(''), 2000);
  };

  const copyPlainText = () => {
    const text = generatePlainText(lang, template, name, spot, templateType);
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
    const html = generateHTML(lang, cat, template, name, spot, templateType);
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `email-template-${lang}-${cat}-${templateType}.html`;
    a.click();
  };

  const loiUrl = `https://all-influencer.com/?loi=true&lang=${lang}`;
  const videoUrl = `https://all-influencer.com/video/founder-invitation?lang=${lang}`;

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

      {/* NEU: Template Typ */}
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
            ✨ Ausführliches Template mit zwei Buttons (LOI + Video)
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
