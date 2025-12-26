/**
 * About Editor Component
 * Bearbeitet: Über uns / Das Modell Sektion
 */

import { useState, useEffect } from 'react';
import MarkdownInfo from '../MarkdownInfo';

export default function AboutEditor({ language, data, onSave }) {
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

  const handleBulletPointChange = (index, value) => {
    const currentBullets = formData.bulletPoints?.[language] || [];
    const newBullets = [...currentBullets];
    newBullets[index] = value;
    
    setFormData(prev => ({
      ...prev,
      bulletPoints: {
        ...prev.bulletPoints,
        [language]: newBullets
      }
    }));
  };

  const addBulletPoint = () => {
    const currentBullets = formData.bulletPoints?.[language] || [];
    setFormData(prev => ({
      ...prev,
      bulletPoints: {
        ...prev.bulletPoints,
        [language]: [...currentBullets, '']
      }
    }));
  };

  const removeBulletPoint = (index) => {
    const currentBullets = formData.bulletPoints?.[language] || [];
    const newBullets = currentBullets.filter((_, i) => i !== index);
    
    setFormData(prev => ({
      ...prev,
      bulletPoints: {
        ...prev.bulletPoints,
        [language]: newBullets
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

  const bulletPoints = formData.bulletPoints?.[language] || [];

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
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>📊 Über uns / Das Modell</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>Erkläre wie All-Influencer.com funktioniert</p>
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
            placeholder="Das Modell"
          />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.7)' }}>Beschreibung</label>
            <MarkdownInfo />
          </div>
          <textarea
            value={formData.description?.[language] || ''}
            onChange={(e) => handleChange('description', e.target.value, true)}
            style={textareaStyle}
            placeholder="Erkläre hier das Geschäftsmodell..."
          />
        </div>
      </div>

      {/* Bullet Points */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', margin: 0 }}>Aufzählungspunkte ({language.toUpperCase()})</h3>
          <button
            type="button"
            onClick={addBulletPoint}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              border: 'none',
              borderRadius: '6px',
              color: '#f59e0b',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            + Punkt hinzufügen
          </button>
        </div>
        
        <div>
          {bulletPoints.map((point, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ color: '#f59e0b' }}>•</span>
              <input
                type="text"
                value={point}
                onChange={(e) => handleBulletPointChange(index, e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
                placeholder={`Punkt ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeBulletPoint(index)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
                title="Entfernen"
              >
                ✕
              </button>
            </div>
          ))}
          
          {bulletPoints.length === 0 && (
            <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '14px', fontStyle: 'italic' }}>
              Noch keine Punkte. Klicke "Punkt hinzufügen" um zu starten.
            </p>
          )}
        </div>
      </div>

      {/* Image */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>Bild (optional)</h3>
        
        <div>
          <label style={labelStyle}>Bild-URL</label>
          <input
            type="text"
            value={formData.image || ''}
            onChange={(e) => handleChange('image', e.target.value)}
            style={inputStyle}
            placeholder="/images/about.jpg"
          />
        </div>
      </div>
    </form>
  );
  }
