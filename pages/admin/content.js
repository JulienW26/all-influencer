/**
 * Content CMS - Hauptseite
 * Alle Website-Inhalte bearbeiten
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import LanguageTabs from '../../components/admin/LanguageTabs';
import SectionEditor from '../../components/admin/SectionEditor';

const sections = [
  { id: 'global', label: 'Globale Texte', icon: '🌐', description: 'Firmenname, Slogan, Kontakt' },
  { id: 'hero', label: 'Hero', icon: '🏠', description: 'Hauptbanner' },
  { id: 'about', label: 'Über uns / Modell', icon: '📊', description: 'Das Modell erklären' },
  { id: 'spots', label: 'Influencer-Spots', icon: '👤', description: '4 Kategorien' },
  { id: 'customers', label: 'Goldene Kunden', icon: '⭐', description: 'Drag & Drop' },
  { id: 'contact', label: 'Kontakt', icon: '📞', description: 'Kontaktformular' },
  { id: 'workWithUs', label: 'Arbeite mit uns', icon: '💼', description: 'CTA-Sektion' },
  { id: 'legal', label: 'Rechtliches', icon: '📜', description: 'Datenschutz, AGB, Impressum' },
  { id: 'footer', label: 'Footer', icon: '🦶', description: 'Copyright, Links' },
];

export default function ContentCMS() {
  const [activeSection, setActiveSection] = useState('global');
  const [activeLanguage, setActiveLanguage] = useState('de');
  const [isLoading, setIsLoading] = useState(true);
  const [globalData, setGlobalData] = useState({});
  const [sectionsData, setSectionsData] = useState({});
  const [customersData, setCustomersData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/content');
      const result = await response.json();
      
      if (result.success) {
        setGlobalData(result.data.global);
        setSectionsData(result.data.sections);
        setCustomersData(result.data.customers);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Fehler beim Laden der Inhalte');
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleGlobalSave = async (data) => {
    const response = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'global', data })
    });
    const result = await response.json();
    if (result.success) {
      setGlobalData(data);
    }
    return result;
  };

  const handleSectionSave = async (sectionId, sectionData) => {
    const newSections = { ...sectionsData, [sectionId]: sectionData };
    const response = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type: 'section', 
        data: { sectionId, sectionData }
      })
    });
    const result = await response.json();
    if (result.success) {
      setSectionsData(newSections);
    }
    return result;
  };

  const handleCustomersSave = async (data) => {
    const response = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'customers', data })
    });
    const result = await response.json();
    if (result.success) {
      setCustomersData(data);
    }
    return result;
  };

  return (
    <AdminLayout title="Content CMS">
      <div style={{ display: 'flex', gap: '32px' }}>
        {/* Sidebar - Sektions-Auswahl */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '16px',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{ 
              fontSize: '12px', 
              fontWeight: '600', 
              color: 'rgba(255, 255, 255, 0.4)', 
              textTransform: 'uppercase', 
              letterSpacing: '1px',
              marginTop: 0,
              marginBottom: '16px',
              paddingLeft: '12px'
            }}>
              Sektionen
            </h3>
            
            <div>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: activeSection === section.id 
                      ? '1px solid rgba(245, 158, 11, 0.3)' 
                      : '1px solid transparent',
                    backgroundColor: activeSection === section.id 
                      ? 'rgba(245, 158, 11, 0.1)' 
                      : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginBottom: '4px',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '20px', marginTop: '2px' }}>{section.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '14px', 
                      fontWeight: '500',
                      color: activeSection === section.id ? '#f59e0b' : '#fff'
                    }}>
                      {section.label}
                    </p>
                    <p style={{ 
                      margin: '2px 0 0 0', 
                      fontSize: '12px', 
                      color: 'rgba(255, 255, 255, 0.4)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {section.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Language Tabs */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>
                {sections.find(s => s.id === activeSection)?.icon} {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'rgba(255, 255, 255, 0.5)' }}>
                Wähle eine Sprache und bearbeite die Inhalte
              </p>
            </div>
            <LanguageTabs 
              activeLanguage={activeLanguage}
              onChange={setActiveLanguage}
            />
          </div>

          {/* Content Area */}
          {isLoading ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '256px' 
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px', animation: 'spin 1s linear infinite' }}>⏳</div>
                <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Lade Inhalte...</p>
              </div>
            </div>
          ) : error ? (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#ef4444', fontSize: '18px', margin: '0 0 16px 0' }}>❌ {error}</p>
              <button 
                onClick={loadContent}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#000',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Erneut versuchen
              </button>
            </div>
          ) : (
            <SectionEditor
              section={activeSection}
              language={activeLanguage}
              data={sectionsData}
              globalData={globalData}
              customersData={customersData}
              onSave={handleSectionSave}
              onGlobalSave={handleGlobalSave}
              onCustomersSave={handleCustomersSave}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
