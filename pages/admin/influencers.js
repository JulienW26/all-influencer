/**
 * Influencer Manager - Admin Seite
 * Für: All-Influencer.com
 * 
 * Features:
 * - 333 exklusive Spots verwalten
 * - Profilbild aus Medien-Bibliothek wählen
 * - 6 Plattformen: Instagram, TikTok, YouTube, Facebook, X, Twitch
 * - Automatische Kategorie nach Follower-Zahl
 * - Sortierung nach Follower-Zahl
 */

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Plattform-Icons und Farben
const PLATFORM_INFO = {
  instagram: { icon: '📸', label: 'Instagram', color: '#E4405F' },
  tiktok: { icon: '🎵', label: 'TikTok', color: '#000000' },
  youtube: { icon: '▶️', label: 'YouTube', color: '#FF0000' },
  facebook: { icon: '📘', label: 'Facebook', color: '#1877F2' },
  x: { icon: '✖️', label: 'X', color: '#000000' },
  twitch: { icon: '🎮', label: 'Twitch', color: '#9146FF' },
};

// Kategorie-Styles
const CATEGORY_STYLES = {
  diamond: {
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6, #6366f1)',
    label: 'Diamond',
    icon: '💎',
    min: '20M+'
  },
  platin: {
    gradient: 'linear-gradient(135deg, #64748b, #94a3b8, #cbd5e1)',
    label: 'Platin',
    icon: '🏆',
    min: '10M+'
  },
  gold: {
    gradient: 'linear-gradient(135deg, #eab308, #f59e0b, #f97316)',
    label: 'Gold',
    icon: '🥇',
    min: '5M+'
  },
  rising: {
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899, #f43f5e)',
    label: 'Rising Star',
    icon: '⭐',
    min: '1M+'
  },
};

export default function InfluencerManager() {
  const [influencers, setInfluencers] = useState([]);
  const [stats, setStats] = useState({ total: 0, available: 333, byCategory: {} });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  
  // Filter
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editingInfluencer, setEditingInfluencer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    profileImage: '',
    platform: 'instagram',
    platformLink: '',
    followers: ''
  });
  const [saving, setSaving] = useState(false);
  
  // Medien-Auswahl Modal
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  
  // Löschen-Bestätigung
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Influencer laden
  const loadInfluencers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterCategory !== 'all') params.append('category', filterCategory);
      if (filterPlatform !== 'all') params.append('platform', filterPlatform);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`/api/admin/influencers?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setInfluencers(data.influencers);
        setStats(data.stats);
      }
    } catch (error) {
      showNotification('Fehler beim Laden', 'error');
    } finally {
      setLoading(false);
    }
  }, [filterCategory, filterPlatform, searchQuery]);

  useEffect(() => {
    loadInfluencers();
  }, [loadInfluencers]);

  // Notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Modal öffnen für neuen Influencer
  const openNewModal = () => {
    setEditingInfluencer(null);
    setFormData({
      name: '',
      username: '',
      profileImage: '',
      platform: 'instagram',
      platformLink: '',
      followers: ''
    });
    setShowModal(true);
  };

  // Modal öffnen zum Bearbeiten
  const openEditModal = (influencer) => {
    setEditingInfluencer(influencer);
    setFormData({
      name: influencer.name,
      username: influencer.username.replace('@', ''),
      profileImage: influencer.profileImage || '',
      platform: influencer.platform,
      platformLink: influencer.platformLink || '',
      followers: influencer.followers.toString()
    });
    setShowModal(true);
  };

  // Speichern
  const handleSave = async () => {
    if (!formData.name || !formData.username || !formData.followers) {
      showNotification('Bitte alle Pflichtfelder ausfüllen', 'error');
      return;
    }

    setSaving(true);
    try {
      const url = '/api/admin/influencers';
      const method = editingInfluencer ? 'PUT' : 'POST';
      const body = editingInfluencer 
        ? { ...formData, id: editingInfluencer.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (data.success) {
        showNotification(data.message || 'Erfolgreich gespeichert!', 'success');
        setShowModal(false);
        loadInfluencers();
      } else {
        showNotification(data.error || 'Fehler beim Speichern', 'error');
      }
    } catch (error) {
      showNotification('Fehler beim Speichern', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Löschen
  const handleDelete = async (influencer) => {
    try {
      const response = await fetch(`/api/admin/influencers?id=${influencer.id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        showNotification(data.message, 'success');
        setDeleteConfirm(null);
        loadInfluencers();
      } else {
        showNotification(data.error || 'Fehler beim Löschen', 'error');
      }
    } catch (error) {
      showNotification('Fehler beim Löschen', 'error');
    }
  };

  // Medien laden für Picker
  const loadMedia = async () => {
    setLoadingMedia(true);
    try {
      const response = await fetch('/api/admin/media?category=influencer');
      const data = await response.json();
      if (data.success) {
        setMediaList(data.media);
      }
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoadingMedia(false);
    }
  };

  // Media Picker öffnen
  const openMediaPicker = () => {
    loadMedia();
    setShowMediaPicker(true);
  };

  // Bild auswählen
  const selectImage = (url) => {
    setFormData(prev => ({ ...prev, profileImage: url }));
    setShowMediaPicker(false);
  };

  return (
    <>
      <Head>
        <title>Influencer Manager | All-Influencer Admin</title>
      </Head>

      <div style={{
        minHeight: '100vh',
        backgroundColor: '#030712',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Header */}
        <header style={{
          padding: '1rem 2rem',
          borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(to right, rgba(245, 158, 11, 0.1), transparent)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/admin/content" style={{ 
              color: '#f59e0b', 
              textDecoration: 'none',
              fontSize: '1.5rem'
            }}>
              ←
            </Link>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #f59e0b, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              👥 Influencer Manager
            </h1>
          </div>
          
          <button
            onClick={openNewModal}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'linear-gradient(to right, #f59e0b, #d97706)',
              color: 'black',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ➕ Influencer hinzufügen
          </button>
        </header>

        {/* Notification */}
        {notification && (
          <div style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: notification.type === 'error' ? '#dc2626' : '#16a34a',
            color: 'white',
            zIndex: 1000,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            {notification.message}
          </div>
        )}

        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Statistiken */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {stats.total}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
                von 333 Spots
              </div>
            </div>
            
            {Object.entries(CATEGORY_STYLES).map(([key, style]) => (
              <div key={key} style={{
                padding: '1rem',
                borderRadius: '1rem',
                background: style.gradient,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {stats.byCategory?.[key] || 0}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                  {style.icon} {style.label}
                </div>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {/* Suche */}
            <input
              type="text"
              placeholder="🔍 Suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'white',
                minWidth: '200px'
              }}
            />
            
            {/* Kategorie-Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="all">Alle Kategorien</option>
              <option value="diamond">💎 Diamond (20M+)</option>
              <option value="platin">🏆 Platin (10M+)</option>
              <option value="gold">🥇 Gold (5M+)</option>
              <option value="rising">⭐ Rising Star (1M+)</option>
            </select>
            
            {/* Plattform-Filter */}
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="all">Alle Plattformen</option>
              {Object.entries(PLATFORM_INFO).map(([key, info]) => (
                <option key={key} value={key}>{info.icon} {info.label}</option>
              ))}
            </select>
          </div>

          {/* Influencer Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.5)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
              Lade Influencer...
            </div>
          ) : influencers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.5)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <p>Noch keine Influencer vorhanden.</p>
              <p style={{ fontSize: '0.875rem' }}>
                Füge den ersten Influencer hinzu!
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {influencers.map((influencer) => {
                const categoryStyle = CATEGORY_STYLES[influencer.category];
                const platformInfo = PLATFORM_INFO[influencer.platform];
                
                return (
                  <div
                    key={influencer.id}
                    style={{
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      cursor: 'pointer'
                    }}
                    onClick={() => openEditModal(influencer)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 10px 40px rgba(245, 158, 11, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Kategorie-Banner */}
                    <div style={{
                      background: categoryStyle?.gradient || '#333',
                      padding: '0.5rem',
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      {categoryStyle?.icon} {categoryStyle?.label} • Spot #{influencer.spotNumber}
                    </div>
                    
                    {/* Profilbild */}
                    <div style={{
                      aspectRatio: '1',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      {influencer.profileImage ? (
                        <img
                          src={influencer.profileImage}
                          alt={influencer.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '4rem', opacity: 0.3 }}>👤</span>
                      )}
                      
                      {/* Plattform-Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        backgroundColor: platformInfo?.color || '#333',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        {platformInfo?.icon}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div style={{ padding: '1rem' }}>
                      <div style={{
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        marginBottom: '0.25rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {influencer.name}
                      </div>
                      <div style={{
                        color: '#f59e0b',
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem'
                      }}>
                        {influencer.username}
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.875rem',
                        color: 'rgba(255,255,255,0.7)'
                      }}>
                        <span>{influencer.followersFormatted} Followers</span>
                        <span style={{ color: '#f59e0b' }}>
                          {influencer.categoryInfo?.price?.toLocaleString()}€/Mo
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal: Influencer hinzufügen/bearbeiten */}
        {showModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setShowModal(false)}
          >
            <div style={{
              backgroundColor: '#111827',
              borderRadius: '1rem',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>
                  {editingInfluencer ? '✏️ Influencer bearbeiten' : '➕ Neuer Influencer'}
                </h2>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                {/* Profilbild */}
                <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    margin: '0 auto 1rem',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid #f59e0b'
                  }}>
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage}
                        alt="Profilbild"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ fontSize: '3rem', opacity: 0.3 }}>👤</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={openMediaPicker}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #f59e0b',
                      backgroundColor: 'transparent',
                      color: '#f59e0b',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    🖼️ Bild aus Medien-Bibliothek wählen
                  </button>
                </div>
                
                {/* Name */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="z.B. Max Mustermann"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                {/* Username */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                    Username *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="z.B. maxmustermann"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                {/* Plattform */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                    Plattform *
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    {Object.entries(PLATFORM_INFO).map(([key, info]) => (
                      <option key={key} value={key}>{info.icon} {info.label}</option>
                    ))}
                  </select>
                </div>
                
                {/* Plattform-Link */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                    Profil-Link (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.platformLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, platformLink: e.target.value }))}
                    placeholder="https://instagram.com/username"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                {/* Follower */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                    Follower-Anzahl * (min. 1.000.000)
                  </label>
                  <input
                    type="number
                    value={formData.followers}
                    onChange={(e) => setFormData(prev => ({ ...prev, followers: e.target.value }))}
                    placeholder="5000000"
                    min="1000000"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                  {formData.followers && parseInt(formData.followers) >= 1000000 && (
                    <div style={{
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'rgba(245, 158, 11, 0.1)',
                      fontSize: '0.875rem',
                      color: '#f59e0b'
                    }}>
                      → Kategorie: {
                        parseInt(formData.followers) >= 20000000 ? '💎 Diamond' :
                        parseInt(formData.followers) >= 10000000 ? '🏆 Platin' :
                        parseInt(formData.followers) >= 5000000 ? '🥇 Gold' : '⭐ Rising Star'
                      }
                    </div>
                  )}
                </div>
                
                {/* Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.2)',
                      backgroundColor: 'transparent',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: 'linear-gradient(to right, #f59e0b, #d97706)',
                      color: 'black',
                      fontWeight: 'bold',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      opacity: saving ? 0.7 : 1
                    }}
                  >
                    {saving ? '⏳ Speichern...' : '💾 Speichern'}
                  </button>
                </div>
                
                {/* Löschen-Button (nur beim Bearbeiten) */}
                {editingInfluencer && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    {deleteConfirm === editingInfluencer.id ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleDelete(editingInfluencer)}
                          style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            backgroundColor: '#dc2626',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          Ja, löschen!
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(255,255,255,0.2)',
                            backgroundColor: 'transparent',
                            color: 'white',
                            cursor: 'pointer'
                          }}
                        >
                          Abbrechen
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(editingInfluencer.id)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: 'none',
                          backgroundColor: 'rgba(220, 38, 38, 0.2)',
                          color: '#fca5a5',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Influencer entfernen
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal: Medien-Auswahl */}
        {showMediaPicker && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '1rem'
          }}
          onClick={() => setShowMediaPicker(false)}
          >
            <div style={{
              backgroundColor: '#111827',
              borderRadius: '1rem',
              width: '100%',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ margin: 0 }}>🖼️ Bild auswählen</h3>
                <Link href="/admin/media" target="_blank" style={{
                  color: '#f59e0b',
                  fontSize: '0.875rem'
                }}>
                  Zur Medien-Bibliothek →
                </Link>
              </div>
              
              <div style={{ padding: '1rem' }}>      
                {loadingMedia ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    ⏳ Lade Bilder...
                  </div>
                ) : mediaList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.5)' }}>
                    <p>Keine Bilder in der Kategorie "Influencer"</p>
                    <Link href="/admin/media" style={{ color: '#f59e0b' }}>
                      Bilder hochladen →
                    </Link>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {mediaList.map((item) => (
                      <div
                        key={item.url}
                        onClick={() => selectImage(item.url)}
                        style={{
                          aspectRatio: '1',
                          borderRadius: '0.5rem',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: formData.profileImage === item.url 
                            ? '3px solid #f59e0b' 
                            : '1px solid rgba(255,255,255,0.1)',
                          transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <img
                          src={item.url}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => setShowMediaPicker(false)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'transparent',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
