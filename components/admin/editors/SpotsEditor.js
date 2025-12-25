/**
 * Spots Editor Component
 * Bearbeitet: Influencer-Spots (4 Kategorien)
 */

import { useState, useEffect } from 'react';

const categoryIcons = {
  diamond: '💎',
  platinum: '💠',
  gold: '🥇',
  risingStar: '⭐'
};

const categoryLabels = {
  diamond: 'Diamond',
  platinum: 'Platin',
  gold: 'Gold',
  risingStar: 'Rising Star'
};

export default function SpotsEditor({ language, data, onSave }) {
  const [formData, setFormData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [activeCategory, setActiveCategory] = useState('diamond');

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

  const handleCategoryChange = (category, field, value, isMultilingual = false) => {
    if (isMultilingual) {
      setFormData(prev => ({
        ...prev,
        categories: {
          ...prev.categories,
          [category]: {
            ...prev.categories?.[category],
            [field]: {
              ...prev.categories?.[category]?.[field],
              [language]: value
            }
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        categories: {
          ...prev.categories,
          [category]: {
            ...prev.categories?.[category],
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

  const categories = Object.keys(categoryIcons);

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
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>👤 Influencer-Spots</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>Die 4 Kategorien: Diamond, Platin, Gold, Rising Star</p>
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
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>Sektions-Überschrift ({language.toUpperCase()})</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Titel</label>
          <input
            type="text"
            value={formData.title?.[language] || ''}
            onChange={(e) => handleChange('title', e.target.value, true)}
            style={inputStyle}
            placeholder="Influencer-Spots"
          />
        </div>

        <div>
          <label style={labelStyle}>Beschreibung</label>
          <textarea
            value={formData.description?.[language] || ''}
            onChange={(e) => handleChange('description', e.target.value, true)}
            style={textareaStyle}
            placeholder="333 exklusive Plätze..."
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
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
              background: activeCategory === cat 
                ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
                : 'rgba(255, 255, 255, 0.05)',
              color: activeCategory === cat ? '#000' : 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <span>{categoryIcons[cat]}</span>
            <span>{categoryLabels[cat]}</span>
          </button>
        ))}
      </div>

      {/* Active Category Editor */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>
          {categoryIcons[activeCategory]} {categoryLabels[activeCategory]} bearbeiten ({language.toUpperCase()})
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Kategorie-Titel</label>
          <input
            type="text"
            value={formData.categories?.[activeCategory]?.title?.[language] || ''}
            onChange={(e) => handleCategoryChange(activeCategory, 'title', e.target.value, true)}
            style={inputStyle}
            placeholder={`${categoryIcons[activeCategory]} ${categoryLabels[activeCategory]}`}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Beschreibung</label>
          <textarea
            value={formData.categories?.[activeCategory]?.description?.[language] || ''}
            onChange={(e) => handleCategoryChange(activeCategory, 'description', e.target.value, true)}
            style={textareaStyle}
            placeholder="Beschreibung der Kategorie..."
          />
        </div>

        <div>
          <label style={labelStyle}>Preisspanne</label>
          <input
            type="text"
            value={formData.categories?.[activeCategory]?.priceRange || ''}
            onChange={(e) => handleCategoryChange(activeCategory, 'priceRange', e.target.value)}
            style={inputStyle}
            placeholder="$50K-100K"
          />
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '4px' }}>
            Gleich für alle Sprachen (nur Zahlen/Symbole)
          </p>
        </div>
      </div>

      {/* Info Box */}
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
          <p style={{ color: '#3b82f6', fontWeight: '500', margin: '0 0 4px 0' }}>Hinweis zur Reihenfolge</p>
          <p style={{ color: 'rgba(147, 197, 253, 0.8)', fontSize: '14px', margin: 0 }}>
            Die Reihenfolge der 333 Influencer-Spots wird automatisch nach Follower-Zahl sortiert. 
            Einzelne Spots werden in einem separaten Modul verwaltet.
          </p>
        </div>
      </div>
    </form>
  );
}
