/**
 * Work With Us Editor Component
 * Bearbeitet: Arbeite mit uns Sektion
 */

import { useState, useEffect } from 'react';

export default function WorkWithUsEditor({ language, data, onSave }) {
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
    minHeight: '100px',
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
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>💼 Arbeite mit uns</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>Call-to-Action für Influencer-Bewerbungen</p>
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

      {/* Texts */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>Texte ({language.toUpperCase()})</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Titel</label>
          <input
            type="text"
            value={formData.title?.[language] || ''}
            onChange={(e) => handleChange('title', e.target.value, true)}
            style={inputStyle}
            placeholder="Arbeite mit uns"
          />
        </div>

        <div>
          <label style={labelStyle}>Beschreibung</label>
          <textarea
            value={formData.description?.[language] || ''}
            onChange={(e) => handleChange('description', e.target.value, true)}
            style={textareaStyle}
            placeholder="Du bist ein Influencer mit über 1M Followers?..."
          />
        </div>
      </div>

      {/* CTA Button */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>Call-to-Action Button</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Button-Text ({language.toUpperCase()})</label>
            <input
              type="text"
              value={formData.ctaText?.[language] || ''}
              onChange={(e) => handleChange('ctaText', e.target.value, true)}
              style={inputStyle}
              placeholder="Letter of Intent ausfüllen"
            />
          </div>
          
          <div>
            <label style={labelStyle}>Button-Link</label>
            <input
              type="text"
              value={formData.ctaLink || ''}
              onChange={(e) => handleChange('ctaLink', e.target.value)}
              style={inputStyle}
              placeholder="/loi"
            />
          </div>
        </div>

        {/* Preview */}
        <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '8px', marginTop: 0 }}>Vorschau:</p>
          <button type="button" style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#000',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            {formData.ctaText?.[language] || 'Button-Text'}
          </button>
        </div>
      </div>
    </form>
  );
        }
