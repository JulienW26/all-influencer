/**
 * Tracking Helper - Versand-Historie
 */

const TRACKING_KEY = 'all_influencer_tracking';
const CAMPAIGNS_KEY = 'all_influencer_campaigns';

/**
 * Alle Tracking-Einträge laden
 */
export function getTrackingData() {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(TRACKING_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Tracking-Daten speichern
 */
export function saveTrackingData(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TRACKING_KEY, JSON.stringify(data));
}

/**
 * Alle Kampagnen laden
 */
export function getCampaigns() {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(CAMPAIGNS_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Kampagnen speichern
 */
export function saveCampaigns(campaigns) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
}

/**
 * Neue Kampagne erstellen
 */
export function createCampaign(name, templateId) {
  const campaigns = getCampaigns();
  const campaign = {
    id: 'camp_' + Date.now(),
    name: name,
    templateId: templateId,
    createdAt: new Date().toISOString(),
    sentCount: 0,
    successCount: 0,
    errorCount: 0
  };
  campaigns.push(campaign);
  saveCampaigns(campaigns);
  return campaign;
}

/**
 * Gesendete E-Mail tracken
 */
export function trackSentEmail({ 
  email, 
  recipientName, 
  templateId, 
  templateName,
  subject, 
  success, 
  error = null,
  campaignId = null 
}) {
  const data = getTrackingData();
  
  const entry = {
    id: 'track_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    email,
    recipientName: recipientName || '',
    templateId,
    templateName: templateName || '',
    subject,
    success,
    error,
    campaignId,
    sentAt: new Date().toISOString()
  };
  
  data.push(entry);
  saveTrackingData(data);
  
  // Kampagne aktualisieren
  if (campaignId) {
    const campaigns = getCampaigns();
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      campaign.sentCount++;
      if (success) {
        campaign.successCount++;
      } else {
        campaign.errorCount++;
      }
      saveCampaigns(campaigns);
    }
  }
  
  return entry;
}

/**
 * Statistiken berechnen
 */
export function getStats() {
  const data = getTrackingData();
  
  const total = data.length;
  const successful = data.filter(d => d.success).length;
  const failed = data.filter(d => !d.success).length;
  
  // Pro Tag
  const byDay = {};
  data.forEach(d => {
    const day = d.sentAt.slice(0, 10);
    if (!byDay[day]) byDay[day] = { total: 0, success: 0, failed: 0 };
    byDay[day].total++;
    if (d.success) byDay[day].success++;
    else byDay[day].failed++;
  });
  
  // Pro Template
  const byTemplate = {};
  data.forEach(d => {
    const tpl = d.templateId || 'unknown';
    if (!byTemplate[tpl]) byTemplate[tpl] = { total: 0, success: 0, name: d.templateName || tpl };
    byTemplate[tpl].total++;
    if (d.success) byTemplate[tpl].success++;
  });
  
  // Letzte 7 Tage
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStr = date.toISOString().slice(0, 10);
    last7Days.push({
      date: dayStr,
      label: date.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric' }),
      ...( byDay[dayStr] || { total: 0, success: 0, failed: 0 })
    });
  }
  
  return {
    total,
    successful,
    failed,
    successRate: total > 0 ? Math.round((successful / total) * 100) : 0,
    byDay,
    byTemplate,
    last7Days
  };
}

/**
 * Tracking-Daten exportieren
 */
export function exportTrackingCSV() {
  const data = getTrackingData();
  if (data.length === 0) return '';
  
  const headers = ['Datum', 'E-Mail', 'Name', 'Template', 'Betreff', 'Status', 'Fehler'];
  const rows = data.map(d => [
    new Date(d.sentAt).toLocaleString('de-DE'),
    d.email,
    d.recipientName,
    d.templateName || d.templateId,
    d.subject,
    d.success ? 'Erfolgreich' : 'Fehler',
    d.error || ''
  ]);
  
  const csv = [headers, ...rows].map(row => 
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
  ).join('\n');
  
  return csv;
}

/**
 * Alle Tracking-Daten löschen
 */
export function clearTrackingData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TRACKING_KEY);
  localStorage.removeItem(CAMPAIGNS_KEY);
}

export default {
  getTrackingData,
  saveTrackingData,
  getCampaigns,
  saveCampaigns,
  createCampaign,
  trackSentEmail,
  getStats,
  exportTrackingCSV,
  clearTrackingData
};
