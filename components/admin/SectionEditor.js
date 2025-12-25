/**
 * Section Editor Component
 * Wählt den richtigen Editor für jede Sektion
 */

import GlobalEditor from './editors/GlobalEditor';
import HeroEditor from './editors/HeroEditor';
import AboutEditor from './editors/AboutEditor';
import SpotsEditor from './editors/SpotsEditor';
import CustomersEditor from './editors/CustomersEditor';
import ContactEditor from './editors/ContactEditor';
import WorkWithUsEditor from './editors/WorkWithUsEditor';
import LegalEditor from './editors/LegalEditor';
import FooterEditor from './editors/FooterEditor';

const editors = {
  global: GlobalEditor,
  hero: HeroEditor,
  about: AboutEditor,
  spots: SpotsEditor,
  customers: CustomersEditor,
  contact: ContactEditor,
  workWithUs: WorkWithUsEditor,
  legal: LegalEditor,
  footer: FooterEditor,
};

export default function SectionEditor({ 
  section, 
  language, 
  data, 
  globalData,
  customersData,
  onSave,
  onGlobalSave,
  onCustomersSave
}) {
  const Editor = editors[section];
  
  if (!Editor) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '256px',
        color: 'rgba(255, 255, 255, 0.5)'
      }}>
        <p>Editor für "{section}" nicht gefunden.</p>
      </div>
    );
  }

  // Spezieller Fall für globale Daten
  if (section === 'global') {
    return (
      <GlobalEditor 
        language={language} 
        data={globalData} 
        onSave={onGlobalSave} 
      />
    );
  }

  // Spezieller Fall für Goldene Kunden
  if (section === 'customers') {
    return (
      <CustomersEditor 
        language={language} 
        data={customersData} 
        onSave={onCustomersSave} 
      />
    );
  }

  return (
    <Editor 
      language={language} 
      data={data[section] || {}} 
      onSave={(newData) => onSave(section, newData)} 
    />
  );
                                  }
