/**
 * Customers Editor Component
 * Bearbeitet: Goldene Kunden mit Drag & Drop Reihenfolge
 */

import { useState, useEffect } from 'react';

export default function CustomersEditor({ language, data, onSave }) {
  const [formData, setFormData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

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

  const handleCustomerChange = (index, field, value) => {
    const newCustomers = [...(formData.customers || [])];
    newCustomers[index] = {
      ...newCustomers[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      customers: newCustomers
    }));
  };

  const addCustomer = () => {
    const newId = `c${Date.now()}`;
    const newOrder = (formData.customers?.length || 0) + 1;
    setFormData(prev => ({
      ...prev,
      customers: [
        ...(prev.customers || []),
        { id: newId, name: '', logo: '', link: '', order: newOrder }
      ]
    }));
  };

  const removeCustomer = (index) => {
    const newCustomers = formData.customers.filter((_, i) => i !== index);
    newCustomers.forEach((customer, i) => {
      customer.order = i + 1;
    });
    setFormData(prev => ({
      ...prev,
      customers: newCustomers
    }));
  };

  // Drag & Drop handlers
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newCustomers = [...formData.customers];
    const draggedItem = newCustomers[draggedIndex];
    
    newCustomers.splice(draggedIndex, 1);
    newCustomers.splice(index, 0, draggedItem);
    
    newCustomers.forEach((customer, i) => {
      customer.order = i + 1;
    });

    setFormData(prev => ({
      ...prev,
      customers: newCustomers
    }));
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
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

  const customers = formData.customers || [];

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
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>⭐ Goldene Kunden</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>Partner und Marken mit Drag & Drop Reihenfolge</p>
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
            style={{ ...inputStyle, padding: '12px 16px', fontSize: '14px' }}
            placeholder="Goldene Kunden"
          />
        </div>

        <div>
          <label style={labelStyle}>Beschreibung</label>
          <textarea
            value={formData.description?.[language] || ''}
            onChange={(e) => handleChange('description', e.target.value, true)}
            style={{ ...inputStyle, padding: '12px 16px', fontSize: '14px', minHeight: '80px', resize: 'vertical' }}
            placeholder="Unsere Premium-Partner..."
          />
        </div>
      </div>

      {/* Customers List */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#f59e0b', margin: 0 }}>Kunden-Liste</h3>
          <button
            type="button"
            onClick={addCustomer}
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
            + Kunde hinzufügen
          </button>
        </div>

        <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>↕️</span>
          Ziehe die Karten um die Reihenfolge zu ändern
        </p>
        
        <div>
          {customers.map((customer, index) => (
            <div
              key={customer.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: draggedIndex === index ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
                cursor: 'move',
                opacity: draggedIndex === index ? 0.5 : 1,
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                {/* Drag Handle */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8px', color: 'rgba(255, 255, 255, 0.3)' }}>
                  <span style={{ fontSize: '12px' }}>#{customer.order}</span>
                  <span style={{ fontSize: '18px' }}>⋮⋮</span>
                </div>

                {/* Form Fields */}
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Name</label>
                    <input
                      type="text"
                      value={customer.name || ''}
                      onChange={(e) => handleCustomerChange(index, 'name', e.target.value)}
                      style={inputStyle}
                      placeholder="Markenname"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Logo-URL</label>
                    <input
                      type="text"
                      value={customer.logo || ''}
                      onChange={(e) => handleCustomerChange(index, 'logo', e.target.value)}
                      style={inputStyle}
                      placeholder="/uploads/logos/..."
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '4px' }}>Link</label>
                    <input
                      type="text"
                      value={customer.link || ''}
                      onChange={(e) => handleCustomerChange(index, 'link', e.target.value)}
                      style={inputStyle}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => removeCustomer(index)}
                  style={{
                    padding: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginTop: '16px'
                  }}
                  title="Entfernen"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          
          {customers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255, 255, 255, 0.4)' }}>
              <p style={{ fontSize: '32px', marginBottom: '8px' }}>⭐</p>
              <p>Noch keine Kunden. Klicke "Kunde hinzufügen" um zu starten.</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
