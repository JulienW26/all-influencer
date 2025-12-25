/**
 * Contact Editor Component
 * Bearbeitet: Kontakt-Sektion und Formular-Labels
 */

import { useState, useEffect } from 'react';

export default function ContactEditor({ language, data, onSave }) {
  const [formData, setFormData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (field, value, isMultilingual = false) => {
    if (isMultilingual) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [language]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleLabelChange = (labelKey, value) => {
    setFormData(prev => ({
      ...prev,
      formLabels: {
        ...prev.formLabels,
        [labelKey]: {
          ...prev.formLabels?.[labelKey],
          [language]: value
        }
      }
    }));
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
    minHeight: '80px',
    resize: 'vertical'
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
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>📞 Kontakt</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>Kontakt-Sektion und Formular-Labels</p>
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

      {/* Section Header */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>Sektions-Texte ({language.toUpperCase()})</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Titel</label>
          <input
            type="text"
            value={formData.title?.[language] || ''}
            onChange={(e) => handleChange('title', e.target.value, true)}
            style={inputStyle}
            placeholder="Kontakt"
          />
        </div>

        <div>
          <label style={labelStyle}>Beschreibung</label>
          <textarea
            value={formData.description?.[language] || ''}
            onChange={(e) => handleChange('description', e.target.value, true)}
            style={textareaStyle}
            placeholder="Hast du Fragen? Wir sind für dich da."
          />
        </div>
      </div>

      {/* Form Labels */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>Formular-Labels ({language.toUpperCase()})</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Name-Feld</label>
            <input
              type="text"
              value={formData.formLabels?.name?.[language] || ''}
              onChange={(e) => handleLabelChange('name', e.target.value)}
              style={inputStyle}
              placeholder="Name"
            />
          </div>
          
          <div>
            <label style={labelStyle}>E-Mail-Feld</label>
            <input
              type="text"
              value={formData.formLabels?.email?.[language] || ''}
              onChange={(e) => handleLabelChange('email', e.target.value)}
              style={inputStyle}
              placeholder="E-Mail"
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Nachricht-Feld</label>
          <input
            type="text"
            value={formData.formLabels?.message?.[language] || ''}
            onChange={(e) => handleLabelChange('message', e.target.value)}
            style={inputStyle}
            placeholder="Nachricht"
          />
        </div>

        <div>
          <label style={labelStyle}>Absenden-Button</label>
          <input
            type="text"
            value={formData.formLabels?.submit?.[language] || ''}
            onChange={(e) => handleLabelChange('submit', e.target.value)}
            style={inputStyle}
            placeholder="Absenden"
          />
        </div>
      </div>

      {/* Preview */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>Vorschau</h3>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>
              {formData.formLabels?.name?.[language] || 'Name'}
            </label>
            <div style={{ ...inputStyle, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>Max Mustermann</div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>
              {formData.formLabels?.email?.[language] || 'E-Mail'}
            </label>
            <div style={{ ...inputStyle, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>max@example.com</div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>
              {formData.formLabels?.message?.[language] || 'Nachricht'}
            </label>
            <div style={{ ...inputStyle, minHeight: '60px', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>Ihre Nachricht...</div>
          </div>
          <button type="button" style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#000',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            {formData.formLabels?.submit?.[language] || 'Absenden'}
          </button>
        </div>
      </div>
    </form>
  );
}
