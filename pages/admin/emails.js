/**
 * E-Mail Templates Page
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { emailTemplates, generateEmailHTML, generatePlainText, listTemplates } from '../../lib/email-templates';

const templates = listTemplates();

const languageLabels = {
  de: '🇩🇪 Deutsch',
  en: '🇬🇧 English',
  es: '🇪🇸 Español',
};

const categoryLabels = {
  diamond: '💎 Diamond & Platin (10M+)',
  gold: '🥇 Gold & Rising Star (1-10M)',
};

export default function EmailsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewData, setPreviewData] = useState({ NAME: 'Max Mustermann', SPOT: '42' });
  const [previewHtml, setPreviewHtml] = useState('');
  const [activeTab, setActiveTab] = useState('preview');
  const [copySuccess, setCopySuccess] = useState(false);
  const [filterLanguage, setFilterLanguage] = useState('all');

  useEffect(() => {
    if (selectedTemplate) {
      const html = generateEmailHTML(selectedTemplate, previewData);
      setPreviewHtml(html);
    }
  }, [selectedTemplate, previewData]);

  const filteredTemplates = templates.filter(t => {
    if (filterLanguage !== 'all' && t.language !== filterLanguage) return false;
    return true;
  });

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const getSubject = (template) => {
    if (!template) return '';
    return template.subject
      .replace(/\{\{NAME\}\}/g, previewData.NAME)
      .replace(/\{\{SPOT\}\}/g, previewData.SPOT);
  };

  return (
    <AdminLayout title="E-Mail Templates">
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        {/* Sidebar - Template Liste */}
        <div style={{ width: '300px', flexShrink: 0 }}>
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            {/* Filter */}
            <div style={{ padding: '16px', borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#fff', marginBottom: '8px' }}>Sprache filtern</label>
              <select 
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: '#1f2937',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px'
                }}
              >
                <option value="all">Alle Sprachen</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
              </select>
            </div>

            {/* Template Liste */}
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {filteredTemplates.map((template) => {
                const isSelected = selectedTemplate?.id === template.id;
                return (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '16px',
                      borderBottom: '1px solid rgba(251, 191, 36, 0.3)',
                      backgroundColor: isSelected ? 'rgba(251, 191, 36, 0.1)' : 'transparent',
                      borderLeft: isSelected ? '4px solid #f59e0b' : '4px solid transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(251, 191, 36, 0.3)',
                      cursor: 'pointer'
                    }}
                  >
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: isSelected ? '#f59e0b' : '#fff',
                      margin: '0 0 4px 0'
                    }}>{template.name}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                      {languageLabels[template.language]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {!selectedTemplate ? (
            <div style={{
              backgroundColor: '#111827',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '12px',
              padding: '64px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>📧</span>
              <h3 style={{ color: '#fff', fontSize: '20px', margin: '0 0 8px 0' }}>Template auswählen</h3>
              <p style={{ color: '#9ca3af', margin: 0 }}>
                Wähle links ein Template aus, um die Vorschau zu sehen.
              </p>
            </div>
          ) : (
            <>
              {/* Template Header */}
              <div style={{
                backgroundColor: '#111827',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h2 style={{ color: '#fff', fontSize: '18px', margin: '0 0 12px 0' }}>{selectedTemplate.name}</h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '4px 12px',
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                    color: '#f59e0b',
                    borderRadius: '20px',
                    fontSize: '12px'
                  }}>{languageLabels[selectedTemplate.language]}</span>
                  <span style={{
                    padding: '4px 12px',
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                    color: '#f59e0b',
                    borderRadius: '20px',
                    fontSize: '12px'
                  }}>{categoryLabels[selectedTemplate.category]}</span>
                </div>
              </div>

              {/* Personalisierung */}
              <div style={{
                backgroundColor: '#111827',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{ color: '#fff', fontSize: '14px', margin: '0 0 16px 0' }}>Personalisierung (Vorschau)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Name</label>
                    <input
                      type="text"
                      value={previewData.NAME}
                      onChange={(e) => setPreviewData({ ...previewData, NAME: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        backgroundColor: '#1f2937',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Spot-Nummer</label>
                    <input
                      type="text"
                      value={previewData.SPOT}
                      onChange={(e) => setPreviewData({ ...previewData, SPOT: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        backgroundColor: '#1f2937',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Betreff */}
              <div style={{
                backgroundColor: '#111827',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{ color: '#fff', fontSize: '14px', margin: '0 0 12px 0' }}>Betreff-Optionen</h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#1f2937',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: '#d1d5db', fontSize: '14px' }}>{getSubject(selectedTemplate)}</span>
                  <button
                    onClick={() => copyToClipboard(getSubject(selectedTemplate))}
                    style={{
                      padding: '4px 12px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#f59e0b',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >Kopieren</button>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {['preview', 'html', 'plain'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: activeTab === tab ? '#f59e0b' : '#1f2937',
                      color: activeTab === tab ? '#000' : '#9ca3af',
                      fontWeight: activeTab === tab ? '500' : 'normal',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {tab === 'preview' ? 'Vorschau' : tab === 'html' ? 'HTML Code' : 'Plain Text'}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{
                backgroundColor: '#111827',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                {activeTab === 'preview' && (
                  <div style={{ backgroundColor: '#f3f4f6', padding: '16px' }}>
                    <iframe
                      srcDoc={previewHtml}
                      style={{
                        width: '100%',
                        height: '700px',
                        border: 'none',
                        borderRadius: '8px',
                        backgroundColor: '#fff'
                      }}
                      title="E-Mail Vorschau"
                    />
                  </div>
                )}

                {activeTab === 'html' && (
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => copyToClipboard(previewHtml)}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '10px 20px',
                        background: copySuccess ? '#22c55e' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        color: copySuccess ? '#fff' : '#000',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      {copySuccess ? '✓ Kopiert!' : 'HTML kopieren'}
                    </button>
                    <pre style={{
                      padding: '64px 16px 16px',
                      margin: 0,
                      fontSize: '12px',
                      color: '#d1d5db',
                      overflowX: 'auto',
                      maxHeight: '600px',
                      overflowY: 'auto'
                    }}>
                      <code>{previewHtml}</code>
                    </pre>
                  </div>
                )}

                {activeTab === 'plain' && (
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => copyToClipboard(generatePlainText(selectedTemplate, previewData))}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '10px 20px',
                        background: copySuccess ? '#22c55e' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        color: copySuccess ? '#fff' : '#000',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      {copySuccess ? '✓ Kopiert!' : 'Text kopieren'}
                    </button>
                    <pre style={{
                      padding: '64px 16px 16px',
                      margin: 0,
                      fontSize: '14px',
                      color: '#d1d5db',
                      whiteSpace: 'pre-wrap',
                      maxHeight: '600px',
                      overflowY: 'auto'
                    }}>
                      {generatePlainText(selectedTemplate, previewData)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: '#111827',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <span style={{ fontSize: '18px' }}>💡</span>
                  <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
                    <strong style={{ color: '#fff' }}>Tipp:</strong> Kopiere den HTML-Code und füge ihn in deinen E-Mail-Client (z.B. Brevo, Mailchimp) ein.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
