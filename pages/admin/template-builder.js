/**
 * Flexibler E-Mail-Template-Editor
 * 
 * Features:
 * - Rich-Text-Blöcke mit Formatierung
 * - Vordefinierte Farben (Gold, Weiß, Grau, Grün)
 * - 7 Button-Typen (1-3 pro E-Mail)
 * - Platzhalter (optional)
 * - Speichern in Redis (max 20 pro Sprache)
 * - Live-Vorschau
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

// UI Texte
const ui = {
  de: {
    title: 'E-Mail Template Builder',
    newTemplate: '+ Neues Template',
    savedTemplates: 'Gespeicherte Templates',
    noTemplates: 'Noch keine Templates erstellt',
    templateName: 'Template-Name:',
    templateNamePlaceholder: 'z.B. Follow-up Nr. 1',
    subject: 'Betreffzeile:',
    subjectPlaceholder: 'Betreff eingeben...',
    greeting: 'Begrüßung:',
    content: 'Inhalt:',
    addBlock: '+ Block hinzufügen',
    blockTypes: {
      paragraph: '📝 Absatz',
      heading: '📌 Überschrift',
      highlight: '⭐ Highlight-Box',
      list: '📋 Liste'
    },
    buttons: 'Buttons (1-3):',
    addButton: '+ Button hinzufügen',
    buttonTypes: {
      loi: '📝 LOI',
      invite_code: '🎟️ Einladungscode',
      booking: '📋 Auftrag',
      portal: '🔐 Portal',
      calendar: '📅 Termin',
      video: '🎬 Video',
      custom: '⚡ Neutral'
    },
    customButtonText: 'Button-Text:',
    customButtonUrl: 'Button-URL:',
    closing: 'Abschluss:',
    ps: 'P.S. (optional):',
    placeholders: 'Platzhalter einfügen:',
    preview: 'Vorschau',
    save: '💾 Speichern',
    update: '💾 Aktualisieren',
    delete: '🗑️ Löschen',
    cancel: 'Abbrechen',
    confirmDelete: 'Wirklich löschen?',
    saved: '✅ Gespeichert!',
    deleted: '✅ Gelöscht!',
    error: '❌ Fehler',
    langLabel: '🌐 Sprache:',
    colorLabel: 'Farbe:',
    colors: {
      gold: 'Gold',
      white: 'Weiß',
      lightGray: 'Hellgrau',
      gray: 'Grau',
      green: 'Grün'
    },
    remaining: 'verbleibend',
    copyHtml: '📋 HTML kopieren',
    copied: '✅ Kopiert!'
  },
  en: {
    title: 'Email Template Builder',
    newTemplate: '+ New Template',
    savedTemplates: 'Saved Templates',
    noTemplates: 'No templates created yet',
    templateName: 'Template Name:',
    templateNamePlaceholder: 'e.g. Follow-up #1',
    subject: 'Subject Line:',
    subjectPlaceholder: 'Enter subject...',
    greeting: 'Greeting:',
    content: 'Content:',
    addBlock: '+ Add Block',
    blockTypes: {
      paragraph: '📝 Paragraph',
      heading: '📌 Heading',
      highlight: '⭐ Highlight Box',
      list: '📋 List'
    },
    buttons: 'Buttons (1-3):',
    addButton: '+ Add Button',
    buttonTypes: {
      loi: '📝 LOI',
      invite_code: '🎟️ Invite Code',
      booking: '📋 Booking',
      portal: '🔐 Portal',
      calendar: '📅 Calendar',
      video: '🎬 Video',
      custom: '⚡ Custom'
    },
    customButtonText: 'Button Text:',
    customButtonUrl: 'Button URL:',
    closing: 'Closing:',
    ps: 'P.S. (optional):',
    placeholders: 'Insert Placeholder:',
    preview: 'Preview',
    save: '💾 Save',
    update: '💾 Update',
    delete: '🗑️ Delete',
    cancel: 'Cancel',
    confirmDelete: 'Really delete?',
    saved: '✅ Saved!',
    deleted: '✅ Deleted!',
    error: '❌ Error',
    langLabel: '🌐 Language:',
    colorLabel: 'Color:',
    colors: {
      gold: 'Gold',
      white: 'White',
      lightGray: 'Light Gray',
      gray: 'Gray',
      green: 'Green'
    },
    remaining: 'remaining',
    copyHtml: '📋 Copy HTML',
    copied: '✅ Copied!'
  },
  es: {
    title: 'Constructor de Plantillas',
    newTemplate: '+ Nueva Plantilla',
    savedTemplates: 'Plantillas Guardadas',
    noTemplates: 'Aún no hay plantillas',
    templateName: 'Nombre:',
    templateNamePlaceholder: 'ej. Seguimiento #1',
    subject: 'Asunto:',
    subjectPlaceholder: 'Ingresa el asunto...',
    greeting: 'Saludo:',
    content: 'Contenido:',
    addBlock: '+ Agregar Bloque',
    blockTypes: {
      paragraph: '📝 Párrafo',
      heading: '📌 Título',
      highlight: '⭐ Destacado',
      list: '📋 Lista'
    },
    buttons: 'Botones (1-3):',
    addButton: '+ Agregar Botón',
    buttonTypes: {
      loi: '📝 LOI',
      invite_code: '🎟️ Código',
      booking: '📋 Contrato',
      portal: '🔐 Portal',
      calendar: '📅 Cita',
      video: '🎬 Video',
      custom: '⚡ Personalizado'
    },
    customButtonText: 'Texto del Botón:',
    customButtonUrl: 'URL del Botón:',
    closing: 'Cierre:',
    ps: 'P.D. (opcional):',
    placeholders: 'Insertar Variable:',
    preview: 'Vista Previa',
    save: '💾 Guardar',
    update: '💾 Actualizar',
    delete: '🗑️ Eliminar',
    cancel: 'Cancelar',
    confirmDelete: '¿Eliminar?',
    saved: '✅ ¡Guardado!',
    deleted: '✅ ¡Eliminado!',
    error: '❌ Error',
    langLabel: '🌐 Idioma:',
    colorLabel: 'Color:',
    colors: {
      gold: 'Dorado',
      white: 'Blanco',
      lightGray: 'Gris Claro',
      gray: 'Gris',
      green: 'Verde'
    },
    remaining: 'restantes',
    copyHtml: '📋 Copiar HTML',
    copied: '✅ ¡Copiado!'
  }
};

// Farben
const COLORS = {
  gold: '#fbbf24',
  white: '#ffffff',
  lightGray: '#e5e7eb',
  gray: '#9ca3af',
  green: '#22c55e'
};

// Button-Typen mit URLs
const BUTTON_CONFIGS = {
  loi: { 
    de: 'LOI ausfüllen', en: 'Fill Out LOI', es: 'Completar LOI',
    url: 'https://all-influencer.com/?loi=true&lang={{LANG}}'
  },
  invite_code: { 
    de: 'Mit Code registrieren', en: 'Register with Code', es: 'Registrar con Código',
    url: 'https://all-influencer.com/portal/register?code={{CODE}}'
  },
  booking: { 
    de: 'Auftrag ansehen', en: 'View Booking', es: 'Ver Contrato',
    url: 'https://all-influencer.com/portal/bookings/{{BOOKING_ID}}'
  },
  portal: { 
    de: 'Zum Portal', en: 'Go to Portal', es: 'Ir al Portal',
    url: 'https://all-influencer.com/portal/login'
  },
  calendar: { 
    de: 'Termin vereinbaren', en: 'Schedule Meeting', es: 'Agendar Cita',
    url: ''
  },
  video: { 
    de: 'Video ansehen', en: 'Watch Video', es: 'Ver Video',
    url: 'https://all-influencer.com/video/founder-invitation?lang={{LANG}}'
  },
  custom: { 
    de: '', en: '', es: '',
    url: ''
  }
};

// Platzhalter
const PLACEHOLDERS = [
  { key: '{{NAME}}', label: 'Name', brevo: '{{contact.FIRSTNAME}}' },
  { key: '{{SPOT}}', label: 'Spot-Nr.', brevo: '{{contact.SPOT_NUMBER}}' },
  { key: '{{COMPANY}}', label: 'Firma', brevo: '{{contact.COMPANY}}' },
  { key: '{{CODE}}', label: 'Code', brevo: '{{contact.INVITE_CODE}}' }
];

export default function TemplateBuilderPage() {
  const [lang, setLang] = useState('de');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  // Editor State
  const [templateName, setTemplateName] = useState('');
  const [subject, setSubject] = useState('');
  const [greeting, setGreeting] = useState('Liebe/r {{NAME}},');
  const [blocks, setBlocks] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [closing, setClosing] = useState('Mit freundlichen Grüßen,');
  const [ps, setPs] = useState('');

  const u = ui[lang];

  // Templates laden
  useEffect(() => {
    loadTemplates();
  }, [lang]);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/custom-templates?lang=${lang}`);
      const data = await res.json();
      setTemplates(data.templates || []);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
    setLoading(false);
  };

  // Neues Template starten
  const startNewTemplate = () => {
    setEditingTemplate(null);
    setTemplateName('');
    setSubject('');
    setGreeting(lang === 'de' ? 'Liebe/r {{NAME}},' : lang === 'en' ? 'Dear {{NAME}},' : 'Querido/a {{NAME}},');
    setBlocks([]);
    setButtons([]);
    setClosing(lang === 'de' ? 'Mit freundlichen Grüßen,' : lang === 'en' ? 'Best regards,' : 'Saludos cordiales,');
    setPs('');
    setShowEditor(true);
  };

  // Template bearbeiten
  const editTemplate = (template) => {
    const t = typeof template === 'string' ? JSON.parse(template) : template;
    setEditingTemplate(t);
    setTemplateName(t.name);
    setSubject(t.content?.subject || '');
    setGreeting(t.content?.greeting || '');
    setBlocks(t.content?.blocks || []);
    setButtons(t.content?.buttons || []);
    setClosing(t.content?.closing || '');
    setPs(t.content?.ps || '');
    setShowEditor(true);
  };

  // Block hinzufügen
  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      text: '',
      color: type === 'heading' ? 'gold' : 'gray',
      items: type === 'list' ? [''] : undefined
    };
    setBlocks([...blocks, newBlock]);
  };

  // Block aktualisieren
  const updateBlock = (id, updates) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  // Block löschen
  const removeBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  // Block verschieben
  const moveBlock = (id, direction) => {
    const index = blocks.findIndex(b => b.id === id);
    if (direction === 'up' && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      setBlocks(newBlocks);
    } else if (direction === 'down' && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  // Button hinzufügen
  const addButton = (type) => {
    if (buttons.length >= 3) return;
    const config = BUTTON_CONFIGS[type];
    const newButton = {
      id: Date.now(),
      type,
      text: type === 'custom' ? '' : config[lang],
      url: config.url
    };
    setButtons([...buttons, newButton]);
  };

  // Button aktualisieren
  const updateButton = (id, updates) => {
    setButtons(buttons.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  // Button löschen
  const removeButton = (id) => {
    setButtons(buttons.filter(b => b.id !== id));
  };

  // Platzhalter einfügen
  const insertPlaceholder = (placeholder, targetRef) => {
    if (targetRef && targetRef.current) {
      const start = targetRef.current.selectionStart;
      const end = targetRef.current.selectionEnd;
      const text = targetRef.current.value;
      const newText = text.substring(0, start) + placeholder + text.substring(end);
      targetRef.current.value = newText;
      targetRef.current.focus();
      targetRef.current.setSelectionRange(start + placeholder.length, start + placeholder.length);
    }
  };

  // Template speichern
  const saveTemplate = async () => {
    if (!templateName.trim()) {
      setStatus('error');
      return;
    }

    const content = {
      subject,
      greeting,
      blocks,
      buttons,
      closing,
      ps
    };

    try {
      const method = editingTemplate ? 'PUT' : 'POST';
      const body = editingTemplate 
        ? { id: editingTemplate.id, lang, name: templateName, content }
        : { lang, name: templateName, content };

      const res = await fetch('/api/admin/custom-templates', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setStatus('saved');
        setTimeout(() => setStatus(''), 2000);
        loadTemplates();
        setShowEditor(false);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      setStatus('error');
    }
  };

  // Template löschen
  const deleteTemplate = async (template) => {
    const t = typeof template === 'string' ? JSON.parse(template) : template;
    if (!confirm(u.confirmDelete)) return;

    try {
      const res = await fetch(`/api/admin/custom-templates?id=${t.id}&lang=${lang}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setStatus('deleted');
        setTimeout(() => setStatus(''), 2000);
        loadTemplates();
      }
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  // HTML generieren
  const generateHTML = () => {
    let blocksHTML = blocks.map(block => {
      const color = COLORS[block.color] || COLORS.gray;
      
      switch (block.type) {
        case 'heading':
          return `<h3 style="color:${color};font-size:16px;margin:30px 0 15px 0;font-weight:600;">${block.text}</h3>`;
        case 'highlight':
          return `<div style="background:linear-gradient(135deg,rgba(251,191,36,0.15) 0%,rgba(217,119,6,0.1) 100%);border-left:4px solid #f59e0b;padding:16px 18px;margin:20px 0;border-radius:0 8px 8px 0;"><p style="color:#fbbf24;font-size:14px;margin:0;font-weight:500;line-height:1.6;">${block.text}</p></div>`;
        case 'list':
          const items = (block.items || []).filter(i => i.trim()).map(item => 
            `<tr><td style="padding:8px 0;"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="color:#f59e0b;font-size:14px;vertical-align:top;padding-right:10px;">▸</td><td style="color:${color};font-size:14px;line-height:1.5;">${item}</td></tr></table></td></tr>`
          ).join('');
          return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${items}</table>`;
        default: // paragraph
          return `<p style="color:${color};font-size:14px;line-height:1.7;margin:0 0 14px 0;">${block.text}</p>`;
      }
    }).join('');

    let buttonsHTML = buttons.map(btn => 
      `<tr><td align="center" style="padding:10px 0;"><a href="${btn.url}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);color:#000000;text-decoration:none;padding:16px 40px;border-radius:8px;font-weight:bold;font-size:15px;letter-spacing:0.5px;">${btn.text}</a></td></tr>`
    ).join('');

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#030712;font-family:'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#030712;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#111827;border-radius:16px;border:1px solid rgba(251,191,36,0.3);overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);padding:30px;text-align:center;">
              <div style="width:50px;height:50px;background-color:#000;border-radius:12px;display:inline-block;line-height:50px;font-weight:bold;color:#f59e0b;font-size:18px;">AI</div>
              <h1 style="margin:15px 0 0 0;color:#000;font-size:24px;font-weight:bold;letter-spacing:2px;">ALL INFLUENCER</h1>
              <p style="margin:5px 0 0 0;color:rgba(0,0,0,0.7);font-size:12px;letter-spacing:3px;">PREMIUM NETWORK</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 30px;">
              <p style="color:#ffffff;font-size:16px;margin:0 0 20px 0;">${greeting}</p>
              ${blocksHTML}
              ${buttonsHTML ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:25px 0;">${buttonsHTML}</table>` : ''}
              <div style="margin-top:40px;padding-top:25px;border-top:1px solid rgba(251,191,36,0.3);">
                <p style="color:#9ca3af;font-size:14px;margin:0 0 20px 0;">${closing}</p>
                <p style="color:#ffffff;font-size:16px;font-weight:700;margin:0;">Julien Weiss</p>
                <p style="color:#d1d5db;font-size:14px;margin:8px 0 0 0;">${lang === 'de' ? 'Geschäftsführer' : 'CEO'}, All-Influencer.com | Die 333</p>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:15px;">
                  <tr>
                    <td style="padding-right:20px;"><a href="tel:+491632600084" style="color:#fbbf24;font-size:14px;text-decoration:none;font-weight:500;">📱 +49 163 260 0084</a></td>
                    <td><a href="mailto:contact@all-influencer.com" style="color:#fbbf24;font-size:14px;text-decoration:none;font-weight:500;">✉️ contact@all-influencer.com</a></td>
                  </tr>
                </table>
              </div>
              ${ps ? `<div style="margin-top:30px;padding:15px;background-color:rgba(251,191,36,0.08);border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;"><p style="color:#d1d5db;font-size:13px;margin:0;font-style:italic;">${ps}</p></div>` : ''}
            </td>
          </tr>
          <tr>
            <td style="background-color:#000000;padding:25px 30px;text-align:center;border-top:1px solid rgba(251,191,36,0.2);">
              <p style="color:#6b7280;font-size:11px;margin:0;">© 2025 ALL INFLUENCER. All rights reserved.</p>
              <p style="color:#4b5563;font-size:10px;margin:10px 0 0 0;"><a href="https://all-influencer.com" style="color:#f59e0b;text-decoration:none;">all-influencer.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  };

  // HTML kopieren
  const copyHTML = () => {
    navigator.clipboard.writeText(generateHTML());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Styles
  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: '#374151',
    border: '1px solid #4b5563',
    borderRadius: '8px',
    color: '#fff',
    boxSizing: 'border-box',
    fontSize: '14px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const goldButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: '#000'
  };

  const grayButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#374151',
    color: '#fff'
  };

  return (
    <AdminLayout title={u.title}>
      {/* Sprache & Aktionen */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: '#9ca3af', fontSize: '14px' }}>{u.langLabel}</span>
          {['de', 'en', 'es'].map(l => (
            <button key={l} onClick={() => { setLang(l); setShowEditor(false); }} style={{
              ...buttonStyle,
              background: lang === l ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '#374151',
              color: lang === l ? '#000' : '#9ca3af'
            }}>
              {l === 'de' ? '🇩🇪' : l === 'en' ? '🇬🇧' : '🇪🇸'} {l.toUpperCase()}
            </button>
          ))}
        </div>
        
        {!showEditor && (
          <button onClick={startNewTemplate} style={goldButtonStyle}>
            {u.newTemplate}
          </button>
        )}
      </div>

      {/* Status */}
      {status && (
        <div style={{ 
          padding: '12px 16px', 
          borderRadius: '8px', 
          marginBottom: '16px',
          backgroundColor: status === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
          color: status === 'error' ? '#f87171' : '#22c55e'
        }}>
          {status === 'saved' ? u.saved : status === 'deleted' ? u.deleted : u.error}
        </div>
      )}

      {/* Editor */}
      {showEditor ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Linke Seite: Editor */}
          <div style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '12px', padding: '24px', border: '1px solid #374151' }}>
            {/* Template Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#9ca3af', fontSize: '14px', display: 'block', marginBottom: '4px' }}>{u.templateName}</label>
              <input 
                type="text" 
                value={templateName} 
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder={u.templateNamePlaceholder}
                style={inputStyle}
              />
            </div>

            {/* Betreff */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#9ca3af', fontSize: '14px', display: 'block', marginBottom: '4px' }}>{u.subject}</label>
              <input 
                type="text" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
                placeholder={u.subjectPlaceholder}
                style={inputStyle}
              />
            </div>

            {/* Platzhalter */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#9ca3af', fontSize: '14px', display: 'block', marginBottom: '4px' }}>{u.placeholders}</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {PLACEHOLDERS.map(p => (
                  <button 
                    key={p.key} 
                    onClick={() => navigator.clipboard.writeText(p.key)}
                    style={{ ...grayButtonStyle, padding: '6px 12px', fontSize: '12px' }}
                  >
                    {p.label}: {p.key}
                  </button>
                ))}
              </div>
            </div>

            {/* Begrüßung */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#9ca3af', fontSize: '14px', display: 'block', marginBottom: '4px' }}>{u.greeting}</label>
              <input 
                type="text" 
                value={greeting} 
                onChange={(e) => setGreeting(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Content Blocks */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#9ca3af', fontSize: '14px', display: 'block', marginBottom: '8px' }}>{u.content}</label>
              
              {blocks.map((block, index) => (
                <div key={block.id} style={{ 
                  backgroundColor: 'rgba(251, 191, 36, 0.1)', 
                  borderRadius: '8px', 
                  padding: '12px', 
                  marginBottom: '8px',
                  border: '1px solid rgba(251, 191, 36, 0.3)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#fbbf24', fontSize: '12px' }}>{u.blockTypes[block.type]}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => moveBlock(block.id, 'up')} style={{ ...grayButtonStyle, padding: '4px 8px', fontSize: '12px' }}>↑</button>
                      <button onClick={() => moveBlock(block.id, 'down')} style={{ ...grayButtonStyle, padding: '4px 8px', fontSize: '12px' }}>↓</button>
                      <button onClick={() => removeBlock(block.id)} style={{ ...grayButtonStyle, padding: '4px 8px', fontSize: '12px', backgroundColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}>✕</button>
                    </div>
                  </div>
                  
                  {/* Farbe */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#9ca3af', fontSize: '12px' }}>{u.colorLabel}</span>
                    {Object.entries(COLORS).map(([key, hex]) => (
                      <button 
                        key={key}
                        onClick={() => updateBlock(block.id, { color: key })}
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '4px', 
                          backgroundColor: hex,
                          border: block.color === key ? '2px solid #f59e0b' : '2px solid transparent',
                          cursor: 'pointer'
                        }}
                        title={u.colors[key]}
                      />
                    ))}
                  </div>

                  {/* Text oder Liste */}
                  {block.type === 'list' ? (
                    <div>
                      {(block.items || ['']).map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ color: '#f59e0b' }}>▸</span>
                          <input 
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const newItems = [...(block.items || [''])];
                              newItems[i] = e.target.value;
                              updateBlock(block.id, { items: newItems });
                            }}
                            style={{ ...inputStyle, flex: 1 }}
                            placeholder="Listenpunkt..."
                          />
                          <button 
                            onClick={() => {
                              const newItems = (block.items || ['']).filter((_, idx) => idx !== i);
                              updateBlock(block.id, { items: newItems.length ? newItems : [''] });
                            }}
                            style={{ ...grayButtonStyle, padding: '4px 8px' }}
                          >✕</button>
                        </div>
                      ))}
                      <button 
                        onClick={() => updateBlock(block.id, { items: [...(block.items || ['']), ''] })}
                        style={{ ...grayButtonStyle, padding: '4px 12px', fontSize: '12px', marginTop: '4px' }}
                      >+ Punkt</button>
                    </div>
                  ) : (
                    <textarea 
                      value={block.text}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      rows={block.type === 'heading' ? 1 : 3}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      placeholder="Text eingeben..."
                    />
                  )}
                </div>
              ))}

              {/* Block hinzufügen */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.entries(u.blockTypes).map(([type, label]) => (
                  <button key={type} onClick={() => addBlock(type)} style={{ ...grayButtonStyle, padding: '8px 12px', fontSize: '12px' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#9ca3af', fontSize: '14px', display: 'block', marginBottom: '8px' }}>{u.buttons}</label>
              
              {buttons.map((btn) => (
                <div key={btn.id} style={{ 
                  backgroundColor: 'rgba(251, 191, 36, 0.1)', 
                  borderRadius: '8px', 
                  padding: '12px', 
                  marginBottom: '8px',
                  border: '1px solid rgba(251, 191, 36, 0.3)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#fbbf24', fontSize: '12px' }}>{u.buttonTypes[btn.type]}</span>
                    <button onClick={() => removeButton(btn.id)} style={{ ...grayButtonStyle, padding: '4px 8px', fontSize: '12px', backgroundColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}>✕</button>
                  </div>
                  
                  <input 
                    type="text"
                    value={btn.text}
                    onChange={(e) => updateButton(btn.id, { text: e.target.value })}
                    placeholder={u.customButtonText}
                    style={{ ...inputStyle, marginBottom: '8px' }}
                  />
                  
                  {btn.type === 'custom' && (
                    <input 
                      type="text"
                      value={btn.url}
                      onChange={(e) => updateButton(btn.id, { url: e.target.value })}
                      placeholder={u.customButtonUrl}
                      style={inputStyle}
                    />
                  )}
                </div>
              ))}

              {buttons.length < 3 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {Object.entries(u.buttonTypes).map(([type, label]) => (
                    <button key={type} onClick={() => addButton(type)} style={{ ...grayButtonStyle, padding: '8px 12px', fontSize: '12px' }}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Abschluss */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#9ca3af', fontSize: '14px', display: 'block', marginBottom: '4px' }}>{u.closing}</label>
              <input 
                type="text" 
                value={closing} 
                onChange={(e) => setClosing(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* P.S. */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#9ca3af', fontSize: '14px', display: 'block', marginBottom: '4px' }}>{u.ps}</label>
              <textarea 
                value={ps} 
                onChange={(e) => setPs(e.target.value)}
                rows={2}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {/* Aktionen */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={saveTemplate} style={goldButtonStyle}>
                {editingTemplate ? u.update : u.save}
              </button>
              <button onClick={() => setShowEditor(false)} style={grayButtonStyle}>
                {u.cancel}
              </button>
            </div>
          </div>

          {/* Rechte Seite: Vorschau */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>{u.preview}</p>
              <button onClick={copyHTML} style={{ ...grayButtonStyle, padding: '8px 16px', fontSize: '13px' }}>
                {copied ? u.copied : u.copyHtml}
              </button>
            </div>
            <div style={{ 
              backgroundColor: '#111827', 
              borderRadius: '12px', 
              border: '1px solid rgba(251, 191, 36, 0.3)', 
              overflow: 'hidden',
              maxHeight: 'calc(100vh - 200px)',
              overflowY: 'auto'
            }}>
              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', padding: '24px', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#000', borderRadius: '10px', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#f59e0b', fontSize: '14px' }}>AI</div>
                <h2 style={{ color: '#000', fontWeight: 'bold', fontSize: '18px', letterSpacing: '2px', margin: 0 }}>ALL INFLUENCER</h2>
              </div>
              
              {/* Content */}
              <div style={{ padding: '24px' }}>
                <p style={{ color: '#fff', marginBottom: '16px' }}>{greeting}</p>
                
                {blocks.map(block => {
                  const color = COLORS[block.color] || COLORS.gray;
                  
                  switch (block.type) {
                    case 'heading':
                      return <h3 key={block.id} style={{ color, fontSize: '15px', marginTop: '24px', marginBottom: '12px', fontWeight: '600' }}>{block.text || '...'}</h3>;
                    case 'highlight':
                      return (
                        <div key={block.id} style={{ background: 'rgba(251, 191, 36, 0.1)', borderLeft: '4px solid #f59e0b', padding: '14px', margin: '16px 0', borderRadius: '0 8px 8px 0' }}>
                          <p style={{ color: '#fbbf24', fontWeight: '500', margin: 0, fontSize: '13px' }}>{block.text || '...'}</p>
                        </div>
                      );
                    case 'list':
                      return (
                        <ul key={block.id} style={{ listStyle: 'none', padding: 0, margin: '12px 0' }}>
                          {(block.items || []).filter(i => i.trim()).map((item, i) => (
                            <li key={i} style={{ display: 'flex', gap: '10px', color, marginBottom: '8px', fontSize: '13px' }}>
                              <span style={{ color: '#f59e0b' }}>▸</span>{item}
                            </li>
                          ))}
                        </ul>
                      );
                    default:
                      return <p key={block.id} style={{ color, fontSize: '13px', lineHeight: '1.6', marginBottom: '12px' }}>{block.text || '...'}</p>;
                  }
                })}

                {/* Buttons */}
                {buttons.length > 0 && (
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    {buttons.map(btn => (
                      <div key={btn.id} style={{ marginBottom: '10px' }}>
                        <span style={{
                          display: 'inline-block',
                          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                          color: '#000',
                          fontWeight: 'bold',
                          padding: '12px 32px',
                          borderRadius: '8px',
                          fontSize: '13px'
                        }}>{btn.text || 'Button'}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Closing */}
                <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(251, 191, 36, 0.3)' }}>
                  <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '13px' }}>{closing}</p>
                  <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '15px', margin: 0 }}>Julien Weiss</p>
                  <p style={{ color: '#d1d5db', fontSize: '12px', marginTop: '6px' }}>{lang === 'de' ? 'Geschäftsführer' : 'CEO'}, All-Influencer.com</p>
                </div>

                {ps && (
                  <div style={{ marginTop: '24px', padding: '12px', backgroundColor: 'rgba(251, 191, 36, 0.08)', borderLeft: '3px solid #f59e0b', borderRadius: '0 8px 8px 0' }}>
                    <p style={{ color: '#d1d5db', fontSize: '12px', fontStyle: 'italic', margin: 0 }}>{ps}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Template Liste */
        <div style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '12px', padding: '24px', border: '1px solid #374151' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#f59e0b', fontWeight: '600', margin: 0 }}>{u.savedTemplates}</h3>
            <span style={{ color: '#9ca3af', fontSize: '13px' }}>{20 - templates.length} {u.remaining}</span>
          </div>
          
          {loading ? (
            <p style={{ color: '#9ca3af' }}>Loading...</p>
          ) : templates.length === 0 ? (
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>{u.noTemplates}</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {templates.map((template) => {
                const t = typeof template === 'string' ? JSON.parse(template) : template;
                return (
                  <div key={t.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(251, 191, 36, 0.3)'
                  }}>
                    <div>
                      <p style={{ color: '#fff', fontWeight: '500', margin: 0 }}>{t.name}</p>
                      <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>
                        {t.content?.subject || 'Kein Betreff'} • {new Date(t.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => editTemplate(t)} style={{ ...grayButtonStyle, padding: '8px 16px', fontSize: '13px' }}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => deleteTemplate(t)} style={{ ...grayButtonStyle, padding: '8px 16px', fontSize: '13px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
