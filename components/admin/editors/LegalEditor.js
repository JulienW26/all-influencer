/**
 * Legal Editor Component
 * Bearbeitet: Datenschutz, AGB, Impressum
 */

import { useState, useEffect } from 'react';

const legalPages = [
  { id: 'privacy', label: 'Datenschutz', icon: '🔒' },
  { id: 'terms', label: 'AGB', icon: '📋' },
  { id: 'imprint', label: 'Impressum', icon: '📄' },
];

export default function LegalEditor({ language, data, onSave }) {
  const [formData, setFormData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [activePage, setActivePage] = useState('privacy');

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (page, field, value, isMultilingual = false) => {
    if (isMultilingual) {
      setFormData(prev => ({
        ...prev,
        [page]: {
          ...prev[page],
          [field]: {
            ...prev[page]?.[field],
            [language]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [page]: {
          ...prev[page],
          [field]: value
        }
      }));
    }
  };

  const handleAddressChange = (field, value, isMultilingual = false) => {
    if (isMultilingual) {
      setFormData(prev => ({
        ...prev,
        imprint: {
          ...prev.imprint,
          address: {
            ...prev.imprint?.address,
            [field]: {
              ...prev.imprint?.address?.[field],
              [language]: value
            }
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        imprint: {
          ...prev.imprint,
          address: {
            ...prev.imprint?.address,
            [field]: value
          }
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
    }
    setIsSaving(false);
  };

  const currentPage = legalPages.find(p => p.id === activePage);

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '300px',
    resize: 'vertical',
    fontFamily: 'monospace',
    fontSize: '13px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '8px'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px'
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>📜 Rechtliche Seiten</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>Datenschutz, AGB und Impressum</p>
        </div>
        <button 
          type="submit" 
          disabled={isSaving}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#000',
            fontWeight: '600',
            cursor: 'pointer',
            opacity: isSaving ? 0.7 : 1
          }}
        >
          {isSaving ? '⏳ Speichern...' : '💾 Speichern'}
        </button>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <div style={{
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px',
          backgroundColor: saveStatus === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          color: saveStatus === 'success' ? '#22c55e' : '#ef4444'
        }}>
          {saveStatus === 'success' ? '✅ Änderungen gespeichert!' : '❌ Fehler beim Speichern'}
        </div>
      )}

      {/* Page Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {legalPages.map((page) => (
          <button
            key={page.id}
            type="button"
            onClick={() => setActivePage(page.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              background: activePage === page.id 
                ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
                : 'rgba(255, 255, 255, 0.05)',
              color: activePage === page.id ? '#000' : 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <span>{page.icon}</span>
            <span>{page.label}</span>
          </button>
        ))}
      </div>

      {/* Privacy & Terms (Fulltext) */}
      {(activePage === 'privacy' || activePage === 'terms') && (
        <div style={cardStyle}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>
            {currentPage.icon} {currentPage.label} ({language.toUpperCase()})
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Seiten-Titel</label>
            <input
              type="text"
              value={formData[activePage]?.title?.[language] || ''}
              onChange={(e) => handleChange(activePage, 'title', e.target.value, true)}
              style={inputStyle}
              placeholder={currentPage.label}
            />
          </div>

          <div>
            <label style={labelStyle}>Volltext-Inhalt</label>
            <textarea
              value={formData[activePage]?.content?.[language] || ''}
              onChange={(e) => handleChange(activePage, 'content', e.target.value, true)}
              style={textareaStyle}
              placeholder="Vollständiger Text hier eingeben..."
            />
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '4px' }}>
              Tipp: Du kannst Markdown verwenden für Formatierung (z.B. **fett**, *kursiv*, ## Überschrift)
            </p>
          </div>
        </div>
      )}

      {/* Imprint (Structured) */}
      {activePage === 'imprint' && (
        <div style={cardStyle}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>
            📄 Impressum ({language.toUpperCase()})
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Seiten-Titel</label>
            <input
              type="text"
              value={formData.imprint?.title?.[language] || ''}
              onChange={(e) => handleChange('imprint', 'title', e.target.value, true)}
              style={inputStyle}
              placeholder="Impressum"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={labelStyle}>Firmenname</label>
              <input
                type="text"
                value={formData.imprint?.companyName || ''}
                onChange={(e) => handleChange('imprint', 'companyName', e.target.value)}
                style={inputStyle}
                placeholder="All-Influencer.com"
              />
            </div>
            <div>
              <label style={labelStyle}>Inhaber/Geschäftsführer</label>
              <input
                type="text"
                value={formData.imprint?.ownerName || ''}
                onChange={(e) => handleChange('imprint', 'ownerName', e.target.value)}
                style={inputStyle}
                placeholder="Julien Weiss"
              />
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px', marginTop: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px', marginTop: 0 }}>Adresse</h4>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Straße</label>
              <input
                type="text"
                value={formData.imprint?.address?.street || ''}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                style={inputStyle}
                placeholder="Musterstraße 1"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>PLZ & Stadt</label>
                <input
                  type="text"
                  value={formData.imprint?.address?.city || ''}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  style={inputStyle}
                  placeholder="10115 Berlin"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Land ({language.toUpperCase()})</label>
                <input
                  type="text"
                  value={formData.imprint?.address?.country?.[language] || ''}
                  onChange={(e) => handleAddressChange('country', e.target.value, true)}
                  style={inputStyle}
                  placeholder="Deutschland"
                />
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px', marginTop: '20px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '16px', marginTop: 0 }}>Kontakt</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>E-Mail</label>
                <input
                  type="email"
                  value={formData.imprint?.email || ''}
                  onChange={(e) => handleChange('imprint', 'email', e.target.value)}
                  style={inputStyle}
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Telefon</label>
                <input
                  type="tel"
                  value={formData.imprint?.phone || ''}
                  onChange={(e) => handleChange('imprint', 'phone', e.target.value)}
                  style={inputStyle}
                  placeholder="+49 123 456789"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
