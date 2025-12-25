/**
 * Footer Editor Component
 * Bearbeitet: Copyright, Social Links, Menü-Links
 */

import { useState, useEffect } from 'react';

export default function FooterEditor({ language, data, onSave }) {
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

  const handleSocialLinkChange = (index, field, value) => {
    const newLinks = [...(formData.socialLinks || [])];
    newLinks[index] = {
      ...newLinks[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      socialLinks: newLinks
    }));
  };

  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      socialLinks: [
        ...(prev.socialLinks || []),
        { name: '', url: '', icon: '' }
      ]
    }));
  };

  const removeSocialLink = (index) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const handleMenuLinkChange = (index, field, value, isMultilingual = false) => {
    const newLinks = [...(formData.menuLinks || [])];
    if (isMultilingual) {
      newLinks[index] = {
        ...newLinks[index],
        text: {
          ...newLinks[index]?.text,
          [language]: value
        }
      };
    } else {
      newLinks[index] = {
        ...newLinks[index],
        [field]: value
      };
    }
    setFormData(prev => ({
      ...prev,
      menuLinks: newLinks
    }));
  };

  const addMenuLink = () => {
    setFormData(prev => ({
      ...prev,
      menuLinks: [
        ...(prev.menuLinks || []),
        { text: { de: '', en: '', es: '' }, url: '' }
      ]
    }));
  };

  const removeMenuLink = (index) => {
    setFormData(prev => ({
      ...prev,
      menuLinks: prev.menuLinks.filter((_, i) => i !== index)
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
    padding: '10px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box'
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
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>🦶 Footer</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>Copyright, Social Links und Menü</p>
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

      {/* Copyright */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>Copyright ({language.toUpperCase()})</h3>
        
        <div>
          <label style={labelStyle}>Copyright-Text</label>
          <input
            type="text"
            value={formData.copyright?.[language] || ''}
            onChange={(e) => handleChange('copyright', e.target.value, true)}
            style={{ ...inputStyle, padding: '12px 16px', fontSize: '14px' }}
            placeholder="© 2024 All-Influencer.com. Alle Rechte vorbehalten."
          />
        </div>
      </div>

      {/* Social Links */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', margin: 0 }}>Social Media Links</h3>
          <button
            type="button"
            onClick={addSocialLink}
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
            + Link hinzufügen
          </button>
        </div>
        
        <div>
          {(formData.socialLinks || []).map((link, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '8px'
            }}>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Name</label>
                  <input
                    type="text"
                    value={link.name || ''}
                    onChange={(e) => handleSocialLinkChange(index, 'name', e.target.value)}
                    style={inputStyle}
                    placeholder="Instagram"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>URL</label>
                  <input
                    type="text"
                    value={link.url || ''}
                    onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                    style={inputStyle}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Icon</label>
                  <input
                    type="text"
                    value={link.icon || ''}
                    onChange={(e) => handleSocialLinkChange(index, 'icon', e.target.value)}
                    style={inputStyle}
                    placeholder="instagram"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ✕
              </button>
            </div>
          ))}
          
          {(!formData.socialLinks || formData.socialLinks.length === 0) && (
            <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '14px', fontStyle: 'italic', textAlign: 'center', padding: '16px' }}>
              Noch keine Social Links. Klicke "Link hinzufügen" um zu starten.
            </p>
          )}
        </div>
      </div>

      {/* Menu Links */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', margin: 0 }}>Menü-Links ({language.toUpperCase()})</h3>
          <button
            type="button"
            onClick={addMenuLink}
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
            + Link hinzufügen
          </button>
        </div>
        
        <div>
          {(formData.menuLinks || []).map((link, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '8px'
            }}>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Text ({language.toUpperCase()})</label>
                  <input
                    type="text"
                    value={link.text?.[language] || ''}
                    onChange={(e) => handleMenuLinkChange(index, 'text', e.target.value, true)}
                    style={inputStyle}
                    placeholder="Datenschutz"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>URL</label>
                  <input
                    type="text"
                    value={link.url || ''}
                    onChange={(e) => handleMenuLinkChange(index, 'url', e.target.value)}
                    style={inputStyle}
                    placeholder="/privacy"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeMenuLink(index)}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ✕
              </button>
            </div>
          ))}
          
          {(!formData.menuLinks || formData.menuLinks.length === 0) && (
            <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '14px', fontStyle: 'italic', textAlign: 'center', padding: '16px' }}>
              Noch keine Menü-Links. Klicke "Link hinzufügen" um zu starten.
            </p>
          )}
        </div>
      </div>

      {/* Info Box for FAQ */}
      <div style={{
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <span style={{ color: '#3b82f6', fontSize: '20px' }}>ℹ️</span>
        <div>
          <p style={{ color: '#3b82f6', fontWeight: '500', margin: '0 0 4px 0' }}>FAQ-Sektion</p>
          <p style={{ color: 'rgba(147, 197, 253, 0.8)', fontSize: '14px', margin: 0 }}>
            Die FAQ-Sektion ist modular und kann später hinzugefügt werden. 
            Dies wird in einer späteren Phase implementiert.
          </p>
        </div>
      </div>
    </form>
  );
}
