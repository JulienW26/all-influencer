/**
 * Admin Dashboard / Login Page
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import LoginForm from '../../components/admin/LoginForm';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/session');
      const data = await res.json();
      
      if (data.authenticated) {
        setIsAuthenticated(true);
        setUser({ username: data.username });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (username) => {
    setIsAuthenticated(true);
    setUser({ username });
    router.replace('/admin', undefined, { shallow: true });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#030712',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Head>
          <title>Admin | All-Influencer</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#000',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #f59e0b',
            margin: '0 auto 16px'
          }}>
            <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>AI</span>
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Laden...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | All-Influencer Admin</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <LoginForm onSuccess={handleLoginSuccess} />
      </>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 8px 0' }}>
          Willkommen zurück, <span style={{ color: '#f59e0b' }}>{user?.username}</span>!
        </h2>
        <p style={{ color: '#9ca3af', margin: 0 }}>
          Hier ist eine Übersicht deines Admin-Bereichs.
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 4px 0' }}>E-Mail Templates</p>
              <p style={{ color: '#fff', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>6</p>
            </div>
            <span style={{ fontSize: '32px' }}>📧</span>
          </div>
          <Link href="/admin/emails" style={{ color: '#f59e0b', fontSize: '14px', textDecoration: 'none', display: 'inline-block', marginTop: '16px' }}>
            Anzeigen →
          </Link>
        </div>

        <div style={{
          backgroundColor: '#111827',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '12px',
          padding: '24px',
          opacity: 0.5
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 4px 0' }}>Empfänger</p>
              <p style={{ color: '#fff', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>0</p>
            </div>
            <span style={{ fontSize: '32px' }}>👥</span>
          </div>
        </div>

        <div style={{
          backgroundColor: '#111827',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '12px',
          padding: '24px',
          opacity: 0.5
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 4px 0' }}>Gesendet</p>
              <p style={{ color: '#fff', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>0</p>
            </div>
            <span style={{ fontSize: '32px' }}>✉️</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', margin: '0 0 16px 0' }}>Schnellzugriff</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <Link href="/admin/emails" style={{
          backgroundColor: '#111827',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '12px',
          padding: '24px',
          textDecoration: 'none',
          display: 'block'
        }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
            <span style={{ fontSize: '32px' }}>📧</span>
            <div>
              <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '500', margin: '0 0 4px 0' }}>Templates bearbeiten</h4>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Cold Email Templates anzeigen und bearbeiten</p>
            </div>
          </div>
        </Link>

        <div style={{
          backgroundColor: '#111827',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '12px',
          padding: '24px',
          opacity: 0.5
        }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
            <span style={{ fontSize: '32px' }}>👥</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '500', margin: 0 }}>Empfänger verwalten</h4>
                <span style={{ fontSize: '10px', backgroundColor: '#1f2937', padding: '2px 8px', borderRadius: '4px', color: '#6b7280' }}>Soon</span>
              </div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0 0 0' }}>CSV importieren, Listen erstellen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderLeft: '4px solid #f59e0b',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
          <span style={{ fontSize: '24px' }}>💡</span>
          <div>
            <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '500', margin: '0 0 4px 0' }}>Phase 1 aktiv</h4>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
              Du kannst jetzt E-Mail Templates anzeigen, bearbeiten und den HTML-Code kopieren. 
              Weitere Module (Empfänger, Versand, Tracking) folgen in den nächsten Phasen.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
