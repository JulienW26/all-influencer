/**
 * Admin Sidebar Navigation
 * Mit Portal-Verwaltung (Einladungscodes & Benutzer)
 */

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAdminLanguage } from '../../lib/useAdminLanguage';

export default function Sidebar({ onLogout }) {
  const router = useRouter();
  const { t } = useAdminLanguage();
  const txt = t('sidebar');

  const navItems = [
    {
      href: '/admin',
      label: txt.dashboard || 'Dashboard',
      icon: '📊',
    },
    {
      href: '/admin/content',
      label: txt.contentCms || 'Content CMS',
      icon: '📝',
    },
    {
      href: '/admin/media',
      label: txt.mediaLibrary || 'Medien-Bibliothek',
      icon: '🖼️',
    },
    {
      href: '/admin/influencers',
      label: txt.influencer || 'Influencer',
      icon: '👥',
    },
    // === NEU: Portal-Verwaltung ===
    {
      type: 'divider',
      label: txt.portalManagement || 'Portal',
    },
    {
      href: '/admin/invitation-codes',
      label: txt.invitationCodes || 'Einladungscodes',
      icon: '🎟️',
    },
    {
      href: '/admin/portal-users',
      label: txt.portalUsers || 'Portal-Benutzer',
      icon: '👤',
    },
    // === Ende NEU ===
    {
      type: 'divider',
      label: txt.emailMarketing || 'E-Mail',
    },
    {
      href: '/admin/emails',
      label: txt.emailTemplates || 'E-Mail Templates',
      icon: '📧',
    },
    {
      href: '/admin/recipients',
      label: txt.recipients || 'Empfänger',
      icon: '👥',
    },
    {
      href: '/admin/send',
      label: txt.send || 'Versand',
      icon: '🚀',
    },
    {
      href: '/admin/tracking',
      label: txt.tracking || 'Tracking',
      icon: '📈',
    },
  ];
  
  return (
    <aside style={{
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      width: '250px',
      backgroundColor: '#111827',
      borderRight: '1px solid rgba(251, 191, 36, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 40
    }}>
      {/* Logo */}
      <div style={{ padding: '24px', borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
        <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#000',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(251, 191, 36, 0.3)'
          }}>
            <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '14px' }}>AI</span>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>ALL INFLUENCER</div>
            <div style={{ color: '#f59e0b', fontSize: '11px', letterSpacing: '2px' }}>ADMIN</div>
          </div>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map((item, index) => {
            // Divider/Section Header
            if (item.type === 'divider') {
              return (
                <li key={index} style={{ 
                  marginTop: '16px', 
                  marginBottom: '8px',
                  padding: '8px 16px',
                }}>
                  <span style={{ 
                    color: '#6b7280', 
                    fontSize: '10px', 
                    fontWeight: '600',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}>
                    {item.label}
                  </span>
                </li>
              );
            }

            const isActive = router.pathname === item.href;
            
            return (
              <li key={item.href} style={{ marginBottom: '4px' }}>
                <Link href={item.href} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  background: isActive ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
                  color: isActive ? '#000' : '#9ca3af',
                  fontWeight: isActive ? '500' : 'normal',
                  transition: 'all 0.2s'
                }}>
                  <span>{item.icon}</span>
                  <span style={{ fontSize: '14px' }}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Logout Button */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(251, 191, 36, 0.3)' }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '14px 16px',
            borderRadius: '10px',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#f87171',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
          }}
        >
          {/* Logout Icon */}
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>{txt.logout || 'Abmelden'}</span>
        </button>
      </div>
    </aside>
  );
}
