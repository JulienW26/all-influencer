/**
 * Recipients Helper - Empfänger-Verwaltung
 * Speichert Daten im localStorage des Browsers
 */

const STORAGE_KEY = 'all_influencer_recipients';
const LISTS_KEY = 'all_influencer_lists';

// Leere Datenstruktur
const emptyData = {
  recipients: [],
  lists: []
};

/**
 * Alle Empfänger laden
 */
export function getRecipients() {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Alle Listen laden
 */
export function getLists() {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(LISTS_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Empfänger speichern
 */
export function saveRecipients(recipients) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipients));
}

/**
 * Listen speichern
 */
export function saveLists(lists) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LISTS_KEY, JSON.stringify(lists));
}

/**
 * Neuen Empfänger hinzufügen
 */
export function addRecipient(recipient) {
  const recipients = getRecipients();
  const newRecipient = {
    id: 'rec_' + Date.now(),
    createdAt: new Date().toISOString(),
    ...recipient
  };
  recipients.push(newRecipient);
  saveRecipients(recipients);
  return newRecipient;
}

/**
 * Empfänger aktualisieren
 */
export function updateRecipient(id, updates) {
  const recipients = getRecipients();
  const index = recipients.findIndex(r => r.id === id);
  if (index !== -1) {
    recipients[index] = { ...recipients[index], ...updates };
    saveRecipients(recipients);
    return recipients[index];
  }
  return null;
}

/**
 * Empfänger löschen
 */
export function deleteRecipient(id) {
  const recipients = getRecipients();
  const filtered = recipients.filter(r => r.id !== id);
  saveRecipients(filtered);
  return true;
}

/**
 * Mehrere Empfänger löschen
 */
export function deleteRecipients(ids) {
  const recipients = getRecipients();
  const filtered = recipients.filter(r => !ids.includes(r.id));
  saveRecipients(filtered);
  return true;
}

/**
 * Neue Liste erstellen
 */
export function addList(list) {
  const lists = getLists();
  const newList = {
    id: 'list_' + Date.now(),
    createdAt: new Date().toISOString(),
    ...list
  };
  lists.push(newList);
  saveLists(lists);
  return newList;
}

/**
 * Liste löschen
 */
export function deleteList(id) {
  const lists = getLists();
  const filtered = lists.filter(l => l.id !== id);
  saveLists(filtered);
  return true;
}

/**
 * CSV parsen
 */
export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  // Header-Zeile
  const headers = lines[0].split(/[,;]/).map(h => h.trim().toLowerCase().replace(/"/g, ''));
  
  // Mapping der Header-Namen
  const headerMap = {
    'email': 'email',
    'e-mail': 'email',
    'mail': 'email',
    'firstname': 'firstName',
    'first_name': 'firstName',
    'vorname': 'firstName',
    'name': 'firstName',
    'spot': 'spotNumber',
    'spot_number': 'spotNumber',
    'spotnumber': 'spotNumber',
    'spot-number': 'spotNumber',
    'category': 'category',
    'kategorie': 'category',
    'language': 'language',
    'sprache': 'language',
    'lang': 'language',
    'list': 'list',
    'liste': 'list'
  };
  
  const recipients = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(/[,;]/).map(v => v.trim().replace(/"/g, ''));
    if (values.length < 2) continue;
    
    const recipient = {
      id: 'rec_' + Date.now() + '_' + i,
      createdAt: new Date().toISOString()
    };
    
    headers.forEach((header, index) => {
      const mappedKey = headerMap[header] || header;
      if (values[index]) {
        recipient[mappedKey] = values[index];
      }
    });
    
    // Nur hinzufügen wenn E-Mail vorhanden
    if (recipient.email) {
      recipients.push(recipient);
    }
  }
  
  return recipients;
}

/**
 * Import von CSV - fügt zu bestehenden hinzu
 */
export function importFromCSV(csvText, listId = null) {
  const newRecipients = parseCSV(csvText);
  const existingRecipients = getRecipients();
  
  // Liste hinzufügen falls angegeben
  if (listId) {
    newRecipients.forEach(r => {
      r.lists = [listId];
    });
  }
  
  // Duplikate prüfen (nach E-Mail)
  const existingEmails = new Set(existingRecipients.map(r => r.email.toLowerCase()));
  const uniqueNew = newRecipients.filter(r => !existingEmails.has(r.email.toLowerCase()));
  
  const allRecipients = [...existingRecipients, ...uniqueNew];
  saveRecipients(allRecipients);
  
  return {
    imported: uniqueNew.length,
    duplicates: newRecipients.length - uniqueNew.length,
    total: allRecipients.length
  };
}

/**
 * Export zu CSV
 */
export function exportToCSV(recipientIds = null) {
  const recipients = getRecipients();
  const toExport = recipientIds 
    ? recipients.filter(r => recipientIds.includes(r.id))
    : recipients;
  
  if (toExport.length === 0) return '';
  
  const headers = ['email', 'firstName', 'spotNumber', 'category', 'language'];
  const csvLines = [headers.join(',')];
  
  toExport.forEach(r => {
    const values = headers.map(h => {
      const val = r[h] || '';
      return val.includes(',') ? `"${val}"` : val;
    });
    csvLines.push(values.join(','));
  });
  
  return csvLines.join('\n');
}

/**
 * Empfänger filtern
 */
export function filterRecipients({ search, category, language, listId }) {
  let recipients = getRecipients();
  
  if (search) {
    const s = search.toLowerCase();
    recipients = recipients.filter(r => 
      r.email?.toLowerCase().includes(s) ||
      r.firstName?.toLowerCase().includes(s)
    );
  }
  
  if (category && category !== 'all') {
    recipients = recipients.filter(r => r.category === category);
  }
  
  if (language && language !== 'all') {
    recipients = recipients.filter(r => r.language === language);
  }
  
  if (listId && listId !== 'all') {
    recipients = recipients.filter(r => r.lists?.includes(listId));
  }
  
  return recipients;
}

export default {
  getRecipients,
  getLists,
  saveRecipients,
  saveLists,
  addRecipient,
  updateRecipient,
  deleteRecipient,
  deleteRecipients,
  addList,
  deleteList,
  parseCSV,
  importFromCSV,
  exportToCSV,
  filterRecipients
};
