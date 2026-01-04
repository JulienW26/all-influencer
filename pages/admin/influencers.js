/**
 * Influencer Manager - Admin Seite
 * Für: All-Influencer.com
 * 
 * Features:
 * - 333 exklusive Spots verwalten
 * - Profilbild aus Medien-Bibliothek wählen
 * - 7 Plattformen: Instagram, TikTok, YouTube, Facebook, X, Twitch, LinkedIn
 * - Automatische Kategorie nach Follower-Zahl
 * - Sortierung nach Follower-Zahl
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdminLayout from '../../components/admin/AdminLayout';
import { NICHE_CATEGORIES, getNicheLabel, getNicheIcon, NICHE_MAX } from '../../lib/niche-categories';

// Plattform-Icons und Farben (7 Plattformen)
const PLATFORM_INFO = {
  instagram: { icon: '📸', label: 'Instagram', color: '#E4405F' },
  tiktok: { icon: '🎵', label: 'TikTok', color: '#000000' },
  youtube: { icon: '▶️', label: 'YouTube', color: '#FF0000' },
  facebook: { icon: '📘', label: 'Facebook', color: '#1877F2' },
  x: { icon: '✖️', label: 'X', color: '#000000' },
  twitch: { icon: '🎮', label: 'Twitch', color: '#9146FF' },
  linkedin: { icon: '💼', label: 'LinkedIn', color: '#0A66C2' },
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
  const [stats, setStats] = useState({ 
    total: 0, 
    available: 333, 
    byCategory: {},
    // NEU: Erweiterte Stats
    spotsUsed: 0,
    spotsAvailable: 333,
    withoutSpot: 0,
    founders: 0,
    maxFounders: 100,
    maxSpots: 333
  });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  
  // Filter
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  // NEU: Zusätzliche Filter
  const [filterNiche, setFilterNiche] = useState('all');
  const [filterSpotStatus, setFilterSpotStatus] = useState('all');
  
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editingInfluencer, setEditingInfluencer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    profileImage: '',
    platform: 'instagram',
    platformLink: '',
    followers: '',
    // NEU: Nischen-Felder
    nicheCategories: [],
    nicheCustom: '',
    // NEU: Optionen beim Erstellen
    assignSpot: false,
    makeFounder: false
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
      // NEU: Zusätzliche Filter
      if (filterNiche !== 'all') params.append('niche', filterNiche);
      if (filterSpotStatus === 'with') params.append('hasSpot', 'true');
      if (filterSpotStatus === 'without') params.append('hasSpot', 'false');
      
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
  }, [filterCategory, filterPlatform, searchQuery, filterNiche, filterSpotStatus]);

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
      followers: '',
      // NEU: Nischen zurücksetzen
      nicheCategories: [],
      nicheCustom: '',
      assignSpot: false,
      makeFounder: false
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
      followers: influencer.followers.toString(),
      // NEU: Nischen laden
      nicheCategories: influencer.nicheCategories || [],
      nicheCustom: influencer.nicheCustom || '',
      assignSpot: false,
      makeFounder: false
    });
    setShowModal(true);
  };

  // NEU: Nische togglen
  const toggleNiche = (nicheId) => {
    setFormData(prev => {
      const current = prev.nicheCategories || [];
      if (current.includes(nicheId)) {
        return { ...prev, nicheCategories: current.filter(n => n !== nicheId) };
      } else if (current.length < NICHE_MAX) {
        return { ...prev, nicheCategories: [...current, nicheId] };
      }
      return prev;
    });
  };

  // NEU: Spot vergeben
  const handleAssignSpot = async (influencer) => {
    try {
      const response = await fetch('/api/admin/influencers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: influencer.id, action: 'assignSpot' })
      });
      const data = await response.json();
      if (data.success) {
        showNotification(data.message, 'success');
        setShowModal(false);
        loadInfluencers();
      } else {
        showNotification(data.error, 'error');
      }
    } catch (error) {
      showNotification('Fehler beim Vergeben des Spots', 'error');
    }
  };

  // NEU: Spot entziehen
  const handleRemoveSpot = async (influencer) => {
    try {
      const response = await fetch('/api/admin/influencers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: influencer.id, action: 'removeSpot' })
      });
      const data = await response.json();
      if (data.success) {
        showNotification(data.message, 'success');
        setShowModal(false);
        loadInfluencers();
      } else {
        showNotification(data.error, 'error');
      }
    } catch (error) {
      showNotification('Fehler beim Entziehen des Spots', 'error');
    }
  };

  // NEU: Founder-Status vergeben
  const handleMakeFounder = async (influencer) => {
    try {
      const response = await fetch('/api/admin/influencers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: influencer.id, action: 'makeFounder' })
      });
      const data = await response.json();
      if (data.success) {
        showNotification(data.message, 'success');
        setShowModal(false);
        loadInfluencers();
      } else {
        showNotification(data.error, 'error');
      }
    } catch (error) {
      showNotification('Fehler beim Vergeben des Founder-Status', 'error');
    }
  };

  // Speichern
  const handleSave = async () => {
    if (!formData.name || !formData.username || !formData.followers) {
      showNotification('Bitte alle Pflichtfelder ausfüllen', 'error');
      return;
    }

    // NEU: Nischen-Validierung
    if (!formData.nicheCategories || formData.nicheCategories.length === 0) {
      showNotification('Bitte mindestens eine Nische auswählen', 'error');
      return;
    }

    // NEU: Custom-Nische Validierung
    if (formData.nicheCategories.includes('other') && !formData.nicheCustom.trim()) {
      showNotification('Bitte eigene Nische angeben', 'error');
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
    <AdminLayout title="Influencer Manager">
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

      {/* Header mit Add Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #f59e0b, #fbbf24)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          👥 Influencer Manager
        </h2>
        
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
      </div>

      {/* Statistiken - ERWEITERT */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        {/* Spots belegt */}
        <div style={{
          padding: '1rem',
          borderRadius: '1rem',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
            {stats.spotsUsed || stats.total || 0}/333
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
            Spots belegt
          </div>
        </div>
        
        {/* Ohne Spot */}
        <div style={{
          padding: '1rem',
          borderRadius: '1rem',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1' }}>
            {stats.withoutSpot || 0}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
            Ohne Spot
          </div>
        </div>
        
        {/* Founder */}
        <div style={{
          padding: '1rem',
          borderRadius: '1rem',
          backgroundColor: 'rgba(234, 179, 8, 0.1)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#eab308' }}>
            🏅 {stats.founders || 0}/100
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
            Founder
          </div>
        </div>
        
        {/* Gesamt */}
        <div style={{
          padding: '1rem',
          borderRadius: '1rem',
          backgroundColor: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
            {stats.total}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
            Gesamt
          </div>
        </div>
      </div>
      
      {/* Kategorie-Statistiken */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
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

      {/* Filter - ERWEITERT */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
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
            minWidth: '180px'
          }}
        />
        
        {/* NEU: Spot-Status Filter */}
        <select
          value={filterSpotStatus}
          onChange={(e) => setFilterSpotStatus(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="all">🏆 Alle Influencer</option>
          <option value="with">✅ Mit Spot</option>
          <option value="without">⏳ Ohne Spot</option>
        </select>
        
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
        
        {/* NEU: Nischen-Filter */}
        <select
          value={filterNiche}
          onChange={(e) => setFilterNiche(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="all">Alle Nischen</option>
          {NICHE_CATEGORIES.map((niche) => (
            <option key={niche.id} value={niche.id}>{niche.icon} {niche.label.de}</option>
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
                  border: influencer.hasSpot 
                    ? '2px solid rgba(245, 158, 11, 0.5)' 
                    : '1px solid rgba(255,255,255,0.1)',
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
                {/* Kategorie-Banner - ERWEITERT mit Spot-Info */}
                <div style={{
                  background: categoryStyle?.gradient || '#333',
                  padding: '0.5rem',
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {influencer.isFounder && <span title="Founder">🏅</span>}
                  {categoryStyle?.icon} {categoryStyle?.label}
                  {influencer.hasSpot ? (
                    <span style={{ 
                      backgroundColor: 'rgba(0,0,0,0.3)', 
                      padding: '0.1rem 0.4rem', 
                      borderRadius: '0.25rem' 
                    }}>
                      #{influencer.spotNumber}
                    </span>
                  ) : (
                    <span style={{ 
                      backgroundColor: 'rgba(0,0,0,0.3)', 
                      padding: '0.1rem 0.4rem', 
                      borderRadius: '0.25rem',
                      fontSize: '0.65rem'
                    }}>
                      Kein Spot
                    </span>
                  )}
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
                  
                  {/* NEU: Founder Badge */}
                  {influencer.isFounder && (
                    <div style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      backgroundColor: '#eab308',
                      color: 'black',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.6rem',
                      fontWeight: 'bold'
                    }}>
                      🏅 FOUNDER
                    </div>
                  )}
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
                  
                  {/* NEU: Nischen-Tags */}
                  {influencer.nicheCategories?.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.25rem',
                      marginBottom: '0.5rem'
                    }}>
                      {influencer.nicheCategories.slice(0, 3).map(nicheId => (
                        <span key={nicheId} style={{
                          backgroundColor: 'rgba(245, 158, 11, 0.2)',
                          color: '#f59e0b',
                          padding: '0.1rem 0.3rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.6rem'
                        }}>
                          {getNicheIcon(nicheId)} {nicheId === 'other' && influencer.nicheCustom 
                            ? influencer.nicheCustom 
                            : getNicheLabel(nicheId, 'de')}
                        </span>
                      ))}
                    </div>
                  )}
                  
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

      {/* Modal: Influencer hinzufügen/bearbeiten */}
      {showModal && (
        <div 
          style={{
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
          <div 
            style={{
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
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'white' }}>
                {editingInfluencer ? '✏️ Influencer bearbeiten' : '➕ Neuer Influencer'}
              </h2>
              {/* NEU: Status-Badges im Header */}
              {editingInfluencer && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {editingInfluencer.isFounder && (
                    <span style={{ 
                      backgroundColor: '#eab308', 
                      color: 'black', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '0.25rem',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>
                      🏅 FOUNDER
                    </span>
                  )}
                  {editingInfluencer.hasSpot && (
                    <span style={{ 
                      backgroundColor: '#f59e0b', 
                      color: 'black', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '0.25rem',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>
                      Spot #{editingInfluencer.spotNumber}
                    </span>
                  )}
                </div>
              )}
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
                    fontSize: '1rem',
                    boxSizing: 'border-box'
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
                    fontSize: '1rem',
                    boxSizing: 'border-box'
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
                    cursor: 'pointer',
                    boxSizing: 'border-box'
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
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              {/* Follower */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                  Follower-Anzahl * (min. 1000000)
                </label>
                <input
                  type="number"
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
                    fontSize: '1rem',
                    boxSizing: 'border-box'
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
              
              {/* NEU: Nischen-Kategorien */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                  Nischen-Kategorien * (1-3 auswählen)
                </label>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {NICHE_CATEGORIES.map((niche) => {
                    const isSelected = formData.nicheCategories?.includes(niche.id);
                    return (
                      <button
                        key={niche.id}
                        type="button"
                        onClick={() => toggleNiche(niche.id)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.5rem',
                          border: isSelected ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.2)',
                          backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                          color: isSelected ? '#f59e0b' : 'rgba(255,255,255,0.7)',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          transition: 'all 0.2s'
                        }}
                      >
                        {niche.icon} {niche.label.de}
                      </button>
                    );
                  })}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
                  {formData.nicheCategories?.length || 0}/3 ausgewählt
                </div>
              </div>
              
              {/* NEU: Custom-Nische wenn "other" gewählt */}
              {formData.nicheCategories?.includes('other') && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                    Eigene Nische angeben *
                  </label>
                  <input
                    type="text"
                    value={formData.nicheCustom}
                    onChange={(e) => setFormData(prev => ({ ...prev, nicheCustom: e.target.value }))}
                    placeholder="z.B. Automobile, Musik, Kunst..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}
              
              {/* NEU: Optionen beim Erstellen */}
              {!editingInfluencer && (
                <div style={{ 
                  marginBottom: '1.5rem',
                  padding: '1rem', 
                  backgroundColor: 'rgba(255,255,255,0.05)', 
                  borderRadius: '0.5rem' 
                }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginBottom: '0.75rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.assignSpot}
                      onChange={(e) => setFormData(prev => ({ ...prev, assignSpot: e.target.checked }))}
                      style={{ width: '1.25rem', height: '1.25rem', accentColor: '#f59e0b' }}
                    />
                    <span style={{ color: 'white' }}>✅ Direkt Spot zuweisen</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.makeFounder}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        makeFounder: e.target.checked, 
                        assignSpot: e.target.checked ? true : prev.assignSpot 
                      }))}
                      style={{ width: '1.25rem', height: '1.25rem', accentColor: '#eab308' }}
                    />
                    <span style={{ color: 'white' }}>🏅 Als Founder registrieren (24 Monate gratis)</span>
                  </label>
                </div>
              )}
              
              {/* Buttons */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'transparent',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: saving ? '#6b7280' : 'linear-gradient(to right, #f59e0b, #d97706)',
                    color: 'black',
                    fontWeight: 'bold',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1,
                    fontSize: '1rem'
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
                        type="button"                
                        onClick={() => handleDelete(editingInfluencer)}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: 'none',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '1rem'
                        }}
                      >
                        Ja, löschen!
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm(null)}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(255,255,255,0.2)',
                          backgroundColor: 'transparent',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        Abbrechen
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm(editingInfluencer.id)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        backgroundColor: 'rgba(220, 38, 38, 0.2)',
                        color: '#fca5a5',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      🗑️ Influencer entfernen
                    </button>
                  )}
                </div>
              )}
              
              {/* NEU: Spot & Founder Verwaltung (beim Bearbeiten) */}
              {editingInfluencer && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
                    Spot & Founder Verwaltung
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {/* Spot vergeben/entziehen */}
                    {editingInfluencer.hasSpot ? (
                      <button
                        type="button"
                        onClick={() => handleRemoveSpot(editingInfluencer)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #ef4444',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        ❌ Spot entziehen
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAssignSpot(editingInfluencer)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #22c55e',
                          backgroundColor: 'rgba(34, 197, 94, 0.1)',
                          color: '#22c55e',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        ✅ Spot vergeben
                      </button>
                    )}
                    
                    {/* Founder vergeben */}
                    {!editingInfluencer.isFounder && (
                      <button
                        type="button"
                        onClick={() => handleMakeFounder(editingInfluencer)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #eab308',
                          backgroundColor: 'rgba(234, 179, 8, 0.1)',
                          color: '#eab308',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        🏅 Zum Founder machen
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Medien-Auswahl */}
      {showMediaPicker && (
        <div 
          style={{
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
          <div 
            style={{
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
              <h3 style={{ margin: 0, color: 'white' }}>🖼️ Bild auswählen</h3>
              <Link href="/admin/media" target="_blank" style={{
                color: '#f59e0b',
                fontSize: '0.875rem'
              }}>
                Zur Medien-Bibliothek →
              </Link>
            </div>
            
            <div style={{ padding: '1rem' }}>      
              {loadingMedia ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
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
                type="button"
                onClick={() => setShowMediaPicker(false)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
