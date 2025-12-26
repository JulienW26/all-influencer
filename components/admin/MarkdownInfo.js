/**
 * Markdown Info Component
 * Zeigt Formatierungshilfe bei Textfeldern
 */

import { useState } from 'react';

export default function MarkdownInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          border: '1px solid rgba(245, 158, 11, 0.5)',
          borderRadius: '6px',
          color: '#f59e0b',
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        Formatierung
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#111827',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>✨</span>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Markdown-Formatierung</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  borderRadius: '8px'
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '20px' }}>
              Nutze diese Syntax um deinen Text zu formatieren:
            </p>

            {/* Überschriften */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
              <h4 style={{ color: '#f59e0b', fontWeight: '600', fontSize: '14px', marginTop: 0, marginBottom: '8px' }}>📌 Überschriften</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '13px' }}>
                <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px', color: '#d1d5db', fontFamily: 'monospace' }}># Überschrift 1</code>
                <span style={{ color: '#9ca3af' }}>→ Große Überschrift</span>
                <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px', color: '#d1d5db', fontFamily: 'monospace' }}>## Überschrift 2</code>
                <span style={{ color: '#9ca3af' }}>→ Mittlere Überschrift</span>
                <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px', color: '#d1d5db', fontFamily: 'monospace' }}>### Überschrift 3</code>
                <span style={{ color: '#9ca3af' }}>→ Kleine Überschrift</span>
              </div>
            </div>

            {/* Textformatierung */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
              <h4 style={{ color: '#f59e0b', fontWeight: '600', fontSize: '14px', marginTop: 0, marginBottom: '8px' }}>✏️ Textformatierung</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '13px' }}>
                <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px', color: '#d1d5db', fontFamily: 'monospace' }}>**fetter Text**</code>
                <span style={{ color: '#9ca3af' }}>→ <strong style={{ color: '#fff' }}>fetter Text</strong></span>
                <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px', color: '#d1d5db', fontFamily: 'monospace' }}>*kursiver Text*</code>
                <span style={{ color: '#9ca3af' }}>→ <em>kursiver Text</em></span>
              </div>
            </div>

            {/* Listen */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
              <h4 style={{ color: '#f59e0b', fontWeight: '600', fontSize: '14px', marginTop: 0, marginBottom: '8px' }}>📋 Listen</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '13px' }}>
                <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px', color: '#d1d5db', fontFamily: 'monospace' }}>- Punkt 1</code>
                <span style={{ color: '#9ca3af' }}>→ • Punkt 1</span>
                <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px', color: '#d1d5db', fontFamily: 'monospace' }}>1. Erster</code>
                <span style={{ color: '#9ca3af' }}>→ 1. Erster</span>
              </div>
            </div>

            {/* Links */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
              <h4 style={{ color: '#f59e0b', fontWeight: '600', fontSize: '14px', marginTop: 0, marginBottom: '8px' }}>🔗 Links</h4>
              <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px', color: '#d1d5db', fontFamily: 'monospace', fontSize: '13px' }}>[Link-Text](https://url.com)</code>
              <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px', marginBottom: 0 }}>→ <span style={{ color: '#f59e0b', textDecoration: 'underline' }}>Link-Text</span></p>
            </div>

            {/* Absätze */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
              <h4 style={{ color: '#f59e0b', fontWeight: '600', fontSize: '14px', marginTop: 0, marginBottom: '8px' }}>↩️ Absätze</h4>
              <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>
                <strong style={{ color: '#d1d5db' }}>Leere Zeile</strong> = Neuer Absatz
              </p>
            </div>

            {/* Trennlinie */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px' }}>
              <h4 style={{ color: '#f59e0b', fontWeight: '600', fontSize: '14px', marginTop: 0, marginBottom: '8px' }}>➖ Trennlinie</h4>
              <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px', color: '#d1d5db', fontFamily: 'monospace', fontSize: '13px' }}>---</code>
              <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px', marginBottom: 0 }}>→ Horizontale Linie</p>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: '#6b7280', fontSize: '12px', textAlign: 'center', margin: 0 }}>
                Funktioniert in allen Textfeldern
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
