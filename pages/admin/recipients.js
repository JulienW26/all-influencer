/**
 * Empfänger-Verwaltung
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  getRecipients, 
  getLists,
  addRecipient, 
  updateRecipient,
  deleteRecipient,
  deleteRecipients,
  addList,
  deleteList,
  importFromCSV,
  exportToCSV,
  filterRecipients 
} from '../../lib/recipients';

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState([]);
  const [lists, setLists] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [filterList, setFilterList] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [editingRecipient, setEditingRecipient] = useState(null);
  const [importResult, setImportResult] = useState(null);

  // Daten laden
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRecipients(getRecipients());
    setLists(getLists());
  };

  // Gefilterte Empfänger
  const filteredRecipients = filterRecipients({
    search,
    category: filterCategory,
    language: filterLanguage,
    listId: filterList
  });

  // Alle auswählen
  const toggleSelectAll = () => {
    if (selected.length === filteredRecipients.length) {
      setSelected([]);
    } else {
      setSelected(filteredRecipients.map(r => r.id));
    }
  };

  // Einzeln auswählen
  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // Löschen
  const handleDelete = (id) => {
    if (confirm('Empfänger wirklich löschen?')) {
      deleteRecipient(id);
      loadData();
    }
  };

  // Mehrere löschen
  const handleDeleteSelected = () => {
    if (selected.length === 0) return;
    if (confirm(`${selected.length} Empfänger wirklich löschen?`)) {
      deleteRecipients(selected);
      setSelected([]);
      loadData();
    }
  };

  // Export
  const handleExport = () => {
    const csv = exportToCSV(selected.length > 0 ? selected : null);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'empfaenger_' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
  };

  return (
    <AdminLayout title="Empfänger">
      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Gesamt</p>
          <p style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{recipients.length}</p>
        </div>
        <div style={{ backgroundColor: '#111827', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Diamond</p>
          <p style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{recipients.filter(r => r.category === 'diamond').length}</p>
        </div>
        <div style={{ backgroundColor: '#111827', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Gold</p>
          <p style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{recipients.filter(r => r.category === 'gold').length}</p>
        </div>
        <div style={{ backgroundColor: '#111827', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Listen</p>
          <p style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{lists.length}</p>
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <button onClick={() => setShowAddModal(true)} style={{
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          border: 'none',
          borderRadius: '8px',
          color: '#000',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>+ Hinzufügen</button>
        <button onClick={() => setShowImportModal(true)} style={{
          padding: '10px 20px',
          backgroundColor: '#1f2937',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '8px',
          color: '#fff',
          cursor: 'pointer'
        }}>📥 CSV Import</button>
        <button onClick={handleExport} style={{
          padding: '10px 20px',
          backgroundColor: '#1f2937',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '8px',
          color: '#fff',
          cursor: 'pointer'
        }}>📤 Export</button>
        <button onClick={() => setShowListModal(true)} style={{
          padding: '10px 20px',
          backgroundColor: '#1f2937',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '8px',
          color: '#fff',
          cursor: 'pointer'
        }}>📋 Listen</button>
        {selected.length > 0 && (
          <button onClick={handleDeleteSelected} style={{
            padding: '10px 20px',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '8px',
            color: '#f87171',
            cursor: 'pointer'
          }}>🗑️ {selected.length} löschen</button>
        )}
      </div>

      {/* Filter */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px 16px',
            backgroundColor: '#1f2937',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '8px',
            color: '#fff',
            minWidth: '200px'
          }}
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{
          padding: '10px 16px',
          backgroundColor: '#1f2937',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '8px',
          color: '#fff'
        }}>
          <option value="all">Alle Kategorien</option>
          <option value="diamond">💎 Diamond</option>
          <option value="gold">🥇 Gold</option>
        </select>
        <select value={filterLanguage} onChange={(e) => setFilterLanguage(e.target.value)} style={{
          padding: '10px 16px',
          backgroundColor: '#1f2937',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '8px',
          color: '#fff'
        }}>
          <option value="all">Alle Sprachen</option>
          <option value="de">🇩🇪 Deutsch</option>
          <option value="en">🇬🇧 English</option>
          <option value="es">🇪🇸 Español</option>
        </select>
      </div>

      {/* Tabelle */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#1f2937' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>
                <input type="checkbox" checked={selected.length === filteredRecipients.length && filteredRecipients.length > 0} onChange={toggleSelectAll} />
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#f59e0b', fontSize: '12px', fontWeight: '600' }}>E-MAIL</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#f59e0b', fontSize: '12px', fontWeight: '600' }}>NAME</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#f59e0b', fontSize: '12px', fontWeight: '600' }}>SPOT</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#f59e0b', fontSize: '12px', fontWeight: '600' }}>KATEGORIE</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#f59e0b', fontSize: '12px', fontWeight: '600' }}>SPRACHE</th>
              <th style={{ padding: '12px 16px', textAlign: 'right', color: '#f59e0b', fontSize: '12px', fontWeight: '600' }}>AKTIONEN</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipients.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
                  {recipients.length === 0 ? 'Noch keine Empfänger. Klicke auf "Hinzufügen" oder "CSV Import".' : 'Keine Empfänger gefunden.'}
                </td>
              </tr>
            ) : (
              filteredRecipients.map((r) => (
                <tr key={r.id} style={{ borderTop: '1px solid rgba(251, 191, 36, 0.2)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <input type="checkbox" checked={selected.includes(r.id)} onChange={() => toggleSelect(r.id)} />
                  </td>
                  <td style={{ padding: '12px 16px', color: '#fff' }}>{r.email}</td>
                  <td style={{ padding: '12px 16px', color: '#d1d5db' }}>{r.firstName || '-'}</td>
                  <td style={{ padding: '12px 16px', color: '#f59e0b', fontWeight: '500' }}>#{r.spotNumber || '-'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: r.category === 'diamond' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                      color: r.category === 'diamond' ? '#a78bfa' : '#fbbf24',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>{r.category === 'diamond' ? '💎 Diamond' : r.category === 'gold' ? '🥇 Gold' : '-'}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#d1d5db' }}>
                    {r.language === 'de' ? '🇩🇪' : r.language === 'en' ? '🇬🇧' : r.language === 'es' ? '🇪🇸' : '-'}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => setEditingRecipient(r)} style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', marginRight: '8px' }}>✏️</button>
                    <button onClick={() => handleDelete(r.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingRecipient) && (
        <RecipientModal
          recipient={editingRecipient}
          onClose={() => { setShowAddModal(false); setEditingRecipient(null); }}
          onSave={(data) => {
            if (editingRecipient) {
              updateRecipient(editingRecipient.id, data);
            } else {
              addRecipient(data);
            }
            loadData();
            setShowAddModal(false);
            setEditingRecipient(null);
          }}
        />
      )}

      {/* Import Modal */}
      {showImportModal && (
        <ImportModal
          onClose={() => { setShowImportModal(false); setImportResult(null); }}
          onImport={(csv, listId) => {
            const result = importFromCSV(csv, listId);
            setImportResult(result);
            loadData();
          }}
          result={importResult}
          lists={lists}
        />
      )}

      {/* Lists Modal */}
      {showListModal && (
        <ListsModal
          lists={lists}
          onClose={() => setShowListModal(false)}
          onAdd={(name) => { addList({ name }); loadData(); }}
          onDelete={(id) => { deleteList(id); loadData(); }}
        />
      )}
    </AdminLayout>
  );
}

// Modal: Empfänger hinzufügen/bearbeiten
function RecipientModal({ recipient, onClose, onSave }) {
  const [form, setForm] = useState({
    email: recipient?.email || '',
    firstName: recipient?.firstName || '',
    spotNumber: recipient?.spotNumber || '',
    category: recipient?.category || 'gold',
    language: recipient?.language || 'de'
  });

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ backgroundColor: '#111827', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '450px' }}>
        <h3 style={{ color: '#fff', margin: '0 0 24px 0' }}>{recipient ? 'Empfänger bearbeiten' : 'Neuer Empfänger'}</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>E-Mail *</label>
          <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>Vorname</label>
          <input type="text" value={form.firstName} onChange={(e) => setForm({...form, firstName: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>Spot-Nummer</label>
          <input type="text" value={form.spotNumber} onChange={(e) => setForm({...form, spotNumber: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }} />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>Kategorie</label>
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff' }}>
              <option value="diamond">💎 Diamond</option>
              <option value="gold">🥇 Gold</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>Sprache</label>
            <select value={form.language} onChange={(e) => setForm({...form, language: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff' }}>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="en">🇬🇧 English</option>
              <option value="es">🇪🇸 Español</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', backgroundColor: '#1f2937', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>Abbrechen</button>
          <button onClick={() => form.email && onSave(form)} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>Speichern</button>
        </div>
      </div>
    </div>
  );
}

// Modal: CSV Import
function ImportModal({ onClose, onImport, result, lists }) {
  const [csv, setCsv] = useState('');
  const [listId, setListId] = useState('');

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ backgroundColor: '#111827', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '550px' }}>
        <h3 style={{ color: '#fff', margin: '0 0 24px 0' }}>📥 CSV Import</h3>
        
        {result ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <p style={{ color: '#22c55e', fontSize: '18px', margin: '0 0 8px 0' }}>{result.imported} Empfänger importiert</p>
            {result.duplicates > 0 && <p style={{ color: '#f59e0b', fontSize: '14px', margin: 0 }}>{result.duplicates} Duplikate übersprungen</p>}
            <button onClick={onClose} style={{ marginTop: '24px', padding: '12px 32px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>Fertig</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#1f2937', borderRadius: '8px' }}>
              <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>
                <strong style={{ color: '#fff' }}>Format:</strong> CSV mit Spalten: email, firstName, spotNumber, category, language<br/>
                <strong style={{ color: '#fff' }}>Trennzeichen:</strong> Komma (,) oder Semikolon (;)
              </p>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>Zu Liste hinzufügen (optional)</label>
              <select value={listId} onChange={(e) => setListId(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff' }}>
                <option value="">Keine Liste</option>
                {lists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>CSV-Daten einfügen</label>
              <textarea
                value={csv}
                onChange={(e) => setCsv(e.target.value)}
                placeholder="email,firstName,spotNumber,category,language&#10;max@example.com,Max,42,diamond,de&#10;anna@example.com,Anna,43,gold,en"
                style={{ width: '100%', height: '150px', padding: '12px', backgroundColor: '#1f2937', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', fontFamily: 'monospace', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={onClose} style={{ flex: 1, padding: '12px', backgroundColor: '#1f2937', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>Abbrechen</button>
              <button onClick={() => csv && onImport(csv, listId)} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>Importieren</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Modal: Listen verwalten
function ListsModal({ lists, onClose, onAdd, onDelete }) {
  const [newName, setNewName] = useState('');

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ backgroundColor: '#111827', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '450px' }}>
        <h3 style={{ color: '#fff', margin: '0 0 24px 0' }}>📋 Listen verwalten</h3>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Neue Liste..."
            style={{ flex: 1, padding: '10px', backgroundColor: '#1f2937', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff' }}
          />
          <button onClick={() => { if(newName) { onAdd(newName); setNewName(''); }}} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>+</button>
        </div>
        
        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
          {lists.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '24px 0' }}>Noch keine Listen erstellt.</p>
          ) : (
            lists.map(l => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#1f2937', borderRadius: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#fff' }}>{l.name}</span>
                <button onClick={() => onDelete(l.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>🗑️</button>
              </div>
            ))
          )}
        </div>
        
        <button onClick={onClose} style={{ width: '100%', marginTop: '24px', padding: '12px', backgroundColor: '#1f2937', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>Schließen</button>
      </div>
    </div>
  );
}  
