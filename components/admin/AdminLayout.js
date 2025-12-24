/**
 * Admin Layout
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Sidebar from './Sidebar';

export default function AdminLayout({ children, title = 'Admin' }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/session');
      const data = await res.json();
      
      if (data.authenticated) {
        setUser({ username: data.username });
      } else {
        router.push('/admin?login=true');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin?login=true');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setUser(null);
      router.push('/admin?login=true');
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
          <title>Laden... | All-Influencer Admin</title>
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

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{title} | All-Influencer Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div style={{ minHeight: '100vh', backgroundColor: '#030712' }}>
        <Sidebar onLogout={handleLogout} />
        
        <main style={{ marginLeft: '250px', minHeight: '100vh' }}>
          <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            backgroundColor: 'rgba(3, 7, 18, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(251, 191, 36, 0.3)'
          }}>
            <div style={{
              padding: '16px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h1 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', margin: 0 }}>{title}</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Eingeloggt als</p>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#f59e0b', margin: 0 }}>{user.username}</p>
                </div>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </header>
          
          <div style={{ padding: '32px' }}>
            {children}
          </div>
        </main>
      </div>
    </>
  );
    }
