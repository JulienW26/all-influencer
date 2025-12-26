/**
 * FAQ Editor Component
 * Verwaltet häufig gestellte Fragen in allen Sprachen
 * Mit Markdown-Unterstützung
 */

import { useState, useEffect } from 'react';
import MarkdownInfo from '../MarkdownInfo';

export default function FAQEditor({ language, data, onSave }) {
  const [formData, setFormData] = useState(data || { title: {}, description: {}, items: [] });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleTitleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      title: {
        ...prev.title,
        [language]: value
      }
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      description: {
        ...prev.description,
        [language]: value
      }
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData(prev => {
      const newItems = [...(prev.items || [])];
      if (!newItems[index]) {
        newItems[index] = { question: {}, answer: {} };
      }
      newItems[index] = {
        ...newItems[index],
        [field]: {
          ...newItems[index][field],
          [language]: value
        }
      };
      return { ...prev, items: newItems };
    });
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...(prev.items || []),
        {
          question: { de: '', en: '', es: '' },
          answer: { de: '', en: '', es: '' }
        }
      ]
    }));
    setExpandedItem((formData.items || []).length);
  };

  const removeItem = (index) => {
    if (confirm('Möchtest du diese FAQ wirklich löschen?')) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
      setExpandedItem(null);
    }
  };

  const moveItem = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= (formData.items || []).length) return;
    
    setFormData(prev => {
      const newItems = [...prev.items];
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
      return { ...prev, items: newItems };
    });
    setExpandedItem(newIndex);
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
    minHeight: '120px',
    resize: 'vertical',
    fontFamily: 'inherit',
    fontSize: '14px'
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

  const langLabels = { de: 'Deutsch', en: 'Englisch', es: 'Spanisch' };

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>❓ FAQ-Bereich</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>Häufig gestellte Fragen verwalten</p>
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

      {/* Section Header Settings */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', marginTop: 0, marginBottom: '24px' }}>
          📝 Bereichs-Überschrift ({langLabels[language]})
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Titel</label>
          <input
            type="text"
            value={formData.title?.[language] || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            style={inputStyle}
            placeholder={language === 'de' ? 'Häufig gestellte Fragen' : language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
          />
        </div>

        <div>
          <label style={labelStyle}>Beschreibung (optional)</label>
          <input
            type="text"
            value={formData.description?.[language] || ''}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            style={inputStyle}
            placeholder={language === 'de' ? 'Hier findest du Antworten auf die wichtigsten Fragen' : language === 'en' ? 'Find answers to the most important questions' : 'Encuentra respuestas a las preguntas más importantes'}
          />
        </div>
      </div>

      {/* FAQ Items */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', margin: 0 }}>
            📋 Fragen & Antworten ({(formData.items || []).length})
          </h3>
          <button
            type="button"
            onClick={addItem}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '8px',
              color: '#22c55e',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            ➕ Neue Frage
          </button>
        </div>

        {(formData.items || []).length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'rgba(255, 255, 255, 0.4)'
          }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>❓</p>
            <p>Noch keine FAQs vorhanden.</p>
            <p style={{ fontSize: '14px' }}>Klicke auf "Neue Frage" um zu beginnen.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(formData.items || []).map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: expandedItem === index ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                {/* Item Header */}
                <div
                  onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    cursor: 'pointer',
                    backgroundColor: expandedItem === index ? 'rgba(245, 158, 11, 0.1)' : 'transparent'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <span style={{ 
                      color: 'rgba(255, 255, 255, 0.3)', 
                      fontSize: '12px',
                      fontWeight: '600',
                      minWidth: '24px'
                    }}>
                      #{index + 1}
                    </span>
                    <span style={{ color: '#fff', fontSize: '14px' }}>
                      {item.question?.[language] || '(Keine Frage)'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); moveItem(index, -1); }}
                      disabled={index === 0}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: index === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)',
                        cursor: index === 0 ? 'default' : 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); moveItem(index, 1); }}
                      disabled={index === (formData.items || []).length - 1}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: index === (formData.items || []).length - 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)',
                        cursor: index === (formData.items || []).length - 1 ? 'default' : 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      ▼
                    </button>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '20px' }}>
                      {expandedItem === index ? '−' : '+'}
                    </span>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedItem === index && (
                  <div style={{ padding: '0 16px 16px 16px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={labelStyle}>Frage ({langLabels[language]})</label>
                      <input
                        type="text"
                        value={item.question?.[language] || ''}
                        onChange={(e) => handleItemChange(index, 'question', e.target.value)}
                        style={inputStyle}
                        placeholder="z.B. Wie kann ich mich anmelden?"
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(255, 255, 255, 0.7)' }}>
                          Antwort ({langLabels[language]})
                        </label>
                        <MarkdownInfo />
                      </div>
                      <textarea
                        value={item.answer?.[language] || ''}
                        onChange={(e) => handleItemChange(index, 'answer', e.target.value)}
                        style={textareaStyle}
                        placeholder="Ausführliche Antwort hier eingeben..."
                      />
                      <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '4px' }}>
                        Tipp: Du kannst Markdown verwenden (z.B. **fett**, *kursiv*, - Aufzählung)
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '6px',
                        color: '#ef4444',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️ Frage löschen
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div style={{
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <span style={{ fontSize: '20px' }}>💡</span>
        <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
          <strong style={{ color: '#fff' }}>Tipp:</strong> Vergiss nicht, die FAQs in allen drei Sprachen (DE, EN, ES) auszufüllen. 
          Wechsle oben die Sprache und fülle die Texte entsprechend aus.
        </div>
      </div>
    </form>
  );
  }
