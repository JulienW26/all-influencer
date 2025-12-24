/**
 * Login Form Component
 */

import { useState } from 'react';

export default function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onSuccess(data.username);
      } else {
        setError(data.error || 'Anmeldung fehlgeschlagen');
      }
    } catch (err) {
      setError('Verbindungsfehler. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030712',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#111827',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '16px',
        padding: '32px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#000',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #f59e0b',
            margin: '0 auto 16px'
          }}>
            <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '20px' }}>AI</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0' }}>ALL INFLUENCER</h1>
          <p style={{ color: '#f59e0b', fontSize: '12px', letterSpacing: '3px', margin: 0 }}>ADMIN BEREICH</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>
              Benutzername
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#1f2937',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="Dein Benutzername"
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#1f2937',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <p style={{ color: '#f87171', fontSize: '14px', margin: 0, textAlign: 'center' }}>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 24px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Anmelden...' : 'Anmelden →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '12px', marginTop: '24px' }}>
          Zugang nur für autorisierte Benutzer
        </p>
      </div>
    </div>
  );
}
