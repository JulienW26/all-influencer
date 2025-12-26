/**
 * Media Manager - Admin Seite
 * Für: All-Influencer.com
 * 
 * Features:
 * - Drag & Drop Upload
 * - Kategorien: Influencer, Logos, Videos, Allgemein
 * - Galerie-Ansicht mit Thumbnails
 * - Löschen von Dateien
 * - URL kopieren
 */

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Kategorien mit Icons
const CATEGORIES = [
  { id: 'all', label: 'Alle', icon: '📁' },
  { id: 'influencer', label: 'Influencer', icon: '👤' },
  { id: 'logos', label: 'Logos', icon: '🏢' },
  { id: 'videos', label: 'Videos', icon: '🎬' },
  { id: 'general', label: 'Allgemein', icon: '📎' },
];

// Hilfsfunktion für Dateigröße
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Hilfsfunktion für Datum
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function MediaManager() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadCategory, setUploadCategory] = useState('general');
  const [isDragging, setIsDragging] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Medien laden
  const loadMedia = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/media?category=${selectedCategory}`);
      const data = await response.json();
      if (data.success) {
        setMedia(data.media);
      }
    } catch (error) {
      showNotification('Fehler beim Laden der Medien', 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  // Notification anzeigen
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Datei hochladen
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', uploadCategory);

    try {
      setUploading(true);
      setUploadProgress(0);

      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showNotification(`"${file.name}" erfolgreich hochgeladen!`, 'success');
        loadMedia();
      } else {
        showNotification(data.error || 'Upload fehlgeschlagen', 'error');
      }
    } catch (error) {
      showNotification('Fehler beim Hochladen', 'error');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Datei löschen
  const deleteMedia = async (mediaItem) => {
    try {
      const response = await fetch(`/api/admin/media?url=${encodeURIComponent(mediaItem.url)}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        showNotification('Datei gelöscht', 'success');
        setDeleteConfirm(null);
        setSelectedMedia(null);
        loadMedia();
      } else {
        showNotification(data.error || 'Löschen fehlgeschlagen', 'error');
      }
    } catch (error) {
      showNotification('Fehler beim Löschen', 'error');
    }
  };

  // URL kopieren
  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    showNotification('URL kopiert!', 'success');
  };

  // Drag & Drop Handler
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => uploadFile(file));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => uploadFile(file));
    e.target.value = '';
  };

  return (
    <>
      <Head>
        <title>Medien-Bibliothek | All-Influencer Admin</title>
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
          background: 'linear-gradient(to right, rgba(245, 158, 11, 0.1), transparent)'
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
              🖼️ Medien-Bibliothek
            </h1>
          </div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
            {media.length} Dateien
          </div>
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
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            animation: 'slideIn 0.3s ease'
          }}>
            {notification.message}
          </div>
        )}

        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Upload-Bereich */}
          <div style={{
            marginBottom: '2rem',
            padding: '2rem',
            borderRadius: '1rem',
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: isDragging 
              ? '2px dashed #f59e0b' 
              : '2px dashed rgba(255,255,255,0.1)'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem',
                opacity: isDragging ? 1 : 0.5
              }}>
                {uploading ? '⏳' : '📤'}
              </div>
              
              {uploading ? (
                <div>
                  <p style={{ marginBottom: '1rem', color: '#f59e0b' }}>
                    Wird hochgeladen...
                  </p>
                  <div style={{
                    width: '200px',
                    height: '4px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    margin: '0 auto',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '50%',
                      height: '100%',
                      backgroundColor: '#f59e0b',
                      animation: 'progress 1s infinite'
                    }} />
                  </div>
                </div>
              ) : (
                <>
                  <p style={{ 
                    marginBottom: '1rem', 
                    color: isDragging ? '#f59e0b' : 'rgba(255,255,255,0.7)'
                  }}>
                    {isDragging 
                      ? 'Hier ablegen zum Hochladen...' 
                      : 'Dateien hierher ziehen oder klicken zum Auswählen'}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    {/* Kategorie-Auswahl für Upload */}
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="influencer">👤 Influencer</option>
                      <option value="logos">🏢 Logos</option>
                      <option value="videos">🎬 Videos</option>
                      <option value="general">📎 Allgemein</option>
                    </select>

                    <label style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      background: 'linear-gradient(to right, #f59e0b, #d97706)',
                      color: 'black',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}>
                      📎 Dateien auswählen
                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif,video/mp4,video/webm"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  
                  <p style={{ 
                    marginTop: '1rem', 
                    fontSize: '0.75rem', 
                    color: 'rgba(255,255,255,0.4)' 
                  }}>
                    Erlaubt: JPG, PNG, WebP, SVG, GIF, MP4, WebM | Max: 10 MB (Bilder), 100 MB (Videos)
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Kategorie-Filter */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: selectedCategory === cat.id 
                    ? '#f59e0b' 
                    : 'rgba(255,255,255,0.05)',
                  color: selectedCategory === cat.id ? 'black' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontWeight: selectedCategory === cat.id ? 'bold' : 'normal'
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Galerie */}
          {loading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem',
              color: 'rgba(255,255,255,0.5)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
              Lade Medien...
            </div>
          ) : media.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem',
              color: 'rgba(255,255,255,0.5)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
              <p>Noch keine Medien vorhanden.</p>
              <p style={{ fontSize: '0.875rem' }}>
                Lade deine ersten Bilder oder Videos hoch!
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {media.map((item) => (
                <div
                  key={item.url}
                  onClick={() => setSelectedMedia(item)}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {item.type === 'video' ? (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                      <span style={{ fontSize: '3rem' }}>🎬</span>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.filename}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  
                  {/* Overlay mit Infos */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '0.5rem',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    fontSize: '0.75rem'
                  }}>
                    <div style={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {item.filename}
                    </div>
                    <div style={{ 
                      color: 'rgba(255,255,255,0.5)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '0.25rem'
                    }}>
                      <span>{formatFileSize(item.size)}</span>
                      <span style={{ color: '#f59e0b' }}>
                        {CATEGORIES.find(c => c.id === item.category)?.icon}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail-Modal */}
        {selectedMedia && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem'
            }}
            onClick={() => setSelectedMedia(null)}
          >
            <div 
              style={{
                backgroundColor: '#111827',
                borderRadius: '1rem',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Vorschau */}
              <div style={{
                aspectRatio: '16/9',
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedMedia.type === 'video' ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.filename}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                )}
              </div>
              
              {/* Infos */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  marginBottom: '1rem',
                  wordBreak: 'break-all'
                }}>
                  {selectedMedia.filename}
                </h3>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.875rem'
                }}>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>Kategorie:</span>
                    <span style={{ marginLeft: '0.5rem' }}>
                      {CATEGORIES.find(c => c.id === selectedMedia.category)?.label}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>Größe:</span>
                    <span style={{ marginLeft: '0.5rem' }}>
                      {formatFileSize(selectedMedia.size)}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>Typ:</span>
                    <span style={{ marginLeft: '0.5rem' }}>
                      {selectedMedia.type === 'video' ? 'Video' : 'Bild'}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>Hochgeladen:</span>
                    <span style={{ marginLeft: '0.5rem' }}>
                      {selectedMedia.uploadedAt ? formatDate(selectedMedia.uploadedAt) : '-'}
                    </span>
                  </div>
                </div>
                
                {/* URL */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.875rem'
                  }}>
                    URL:
                  </label>
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.5rem' 
                  }}>
                    <input
                      type="text"
                      value={selectedMedia.url}
                      readOnly
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '0.875rem'
                      }}
                    />
                    <button
                      onClick={() => copyUrl(selectedMedia.url)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        backgroundColor: '#f59e0b',
                        color: 'black',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      📋 Kopieren
                    </button>
                  </div>
                </div>
                
                {/* Aktionen */}
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem',
                  justifyContent: 'space-between'
                }}>
                  <button
                    onClick={() => setSelectedMedia(null)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255,255,255,0.2)',
                      backgroundColor: 'transparent',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Schließen
                  </button>
                  
                  {deleteConfirm === selectedMedia.url ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => deleteMedia(selectedMedia)}
                        style={{
                          padding: '0.75rem 1.5rem',
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
                          padding: '0.75rem 1.5rem',
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
                      onClick={() => setDeleteConfirm(selectedMedia.url)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        backgroundColor: 'rgba(220, 38, 38, 0.2)',
                        color: '#fca5a5',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️ Löschen
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CSS Animationen */}
        <style jsx global>{`
          @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
      </div>
    </>
  );
}
