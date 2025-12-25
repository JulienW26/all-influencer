/**
 * Language Tabs Component
 * Sprach-Umschaltung für DE | EN | ES
 */

const languages = [
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
];

export default function LanguageTabs({ activeLanguage, onChange }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '4px',
      borderRadius: '8px'
    }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: activeLanguage === lang.code 
              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
              : 'transparent',
            color: activeLanguage === lang.code ? '#000' : 'rgba(255, 255, 255, 0.6)'
          }}
        >
          <span style={{ fontSize: '16px' }}>{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
