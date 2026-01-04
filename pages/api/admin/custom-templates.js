/**
 * API für benutzerdefinierte E-Mail-Templates
 * 
 * Speicherung in Redis mit folgender Struktur:
 * - Key: email:custom:{lang}:{templateId}
 * - Max 20 Templates pro Sprache
 * 
 * Endpoints:
 * - GET: Liste aller Templates oder einzelnes Template
 * - POST: Neues Template erstellen
 * - PUT: Template aktualisieren
 * - DELETE: Template löschen
 */

import { Redis } from '@upstash/redis';

// KORRIGIERT: Verwendet die richtigen Vercel KV Variablennamen
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const MAX_TEMPLATES_PER_LANG = 20;
const LANGUAGES = ['de', 'en', 'es'];

// Button-Typen mit Standardwerten
export const BUTTON_TYPES = {
  loi: {
    de: { text: 'LOI ausfüllen', icon: '📝' },
    en: { text: 'Fill Out LOI', icon: '📝' },
    es: { text: 'Completar LOI', icon: '📝' },
    urlPattern: 'https://all-influencer.com/?loi=true&lang={{LANG}}'
  },
  invite_code: {
    de: { text: 'Mit Code registrieren', icon: '🎟️' },
    en: { text: 'Register with Code', icon: '🎟️' },
    es: { text: 'Registrar con Código', icon: '🎟️' },
    urlPattern: 'https://all-influencer.com/portal/register?code={{CODE}}'
  },
  booking: {
    de: { text: 'Auftrag ansehen', icon: '📋' },
    en: { text: 'View Booking', icon: '📋' },
    es: { text: 'Ver Contrato', icon: '📋' },
    urlPattern: 'https://all-influencer.com/portal/bookings/{{BOOKING_ID}}'
  },
  portal: {
    de: { text: 'Zum Portal', icon: '🔐' },
    en: { text: 'Go to Portal', icon: '🔐' },
    es: { text: 'Ir al Portal', icon: '🔐' },
    urlPattern: 'https://all-influencer.com/portal/login'
  },
  calendar: {
    de: { text: 'Termin vereinbaren', icon: '📅' },
    en: { text: 'Schedule Meeting', icon: '📅' },
    es: { text: 'Agendar Cita', icon: '📅' },
    urlPattern: '{{CALENDAR_URL}}'
  },
  video: {
    de: { text: 'Video ansehen', icon: '🎬' },
    en: { text: 'Watch Video', icon: '🎬' },
    es: { text: 'Ver Video', icon: '🎬' },
    urlPattern: 'https://all-influencer.com/video/{{VIDEO_ID}}?lang={{LANG}}'
  },
  custom: {
    de: { text: '', icon: '⚡' },
    en: { text: '', icon: '⚡' },
    es: { text: '', icon: '⚡' },
    urlPattern: ''
  }
};

// Text-Farben (vordefiniert)
export const TEXT_COLORS = {
  gold: { name: 'Gold', hex: '#fbbf24', cssVar: 'text-gold' },
  white: { name: 'Weiß', hex: '#ffffff', cssVar: 'text-white' },
  lightGray: { name: 'Hellgrau', hex: '#e5e7eb', cssVar: 'text-light-gray' },
  gray: { name: 'Grau', hex: '#9ca3af', cssVar: 'text-gray' },
  green: { name: 'Grün', hex: '#22c55e', cssVar: 'text-green' }
};

// Platzhalter
export const PLACEHOLDERS = {
  NAME: { label: 'Vorname', example: 'Max', brevo: '{{contact.FIRSTNAME}}' },
  SPOT: { label: 'Spot-Nummer', example: '42', brevo: '{{contact.SPOT_NUMBER}}' },
  COMPANY: { label: 'Firmenname', example: 'Acme Inc.', brevo: '{{contact.COMPANY}}' },
  CODE: { label: 'Einladungscode', example: 'ABC123', brevo: '{{contact.INVITE_CODE}}' },
  BOOKING_ID: { label: 'Auftrags-ID', example: 'B-12345', brevo: '{{contact.BOOKING_ID}}' },
  LANG: { label: 'Sprache', example: 'de', brevo: '{{contact.LANG}}' }
};

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        return await handleGet(req, res);
      case 'POST':
        return await handlePost(req, res);
      case 'PUT':
        return await handlePut(req, res);
      case 'DELETE':
        return await handleDelete(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Custom templates API error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

// GET: Liste aller Templates oder einzelnes Template
async function handleGet(req, res) {
  const { lang, id } = req.query;

  // Einzelnes Template abrufen
  if (id && lang) {
    const template = await redis.get(`email:custom:${lang}:${id}`);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    return res.status(200).json({ template });
  }

  // Alle Templates für eine Sprache abrufen
  if (lang) {
    const keys = await redis.keys(`email:custom:${lang}:*`);
    const templates = [];
    
    for (const key of keys) {
      const template = await redis.get(key);
      if (template) {
        templates.push(template);
      }
    }
    
    // Nach Erstellungsdatum sortieren (neueste zuerst)
    templates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return res.status(200).json({ templates, count: templates.length });
  }

  // Alle Templates für alle Sprachen (Übersicht)
  const overview = {};
  for (const l of LANGUAGES) {
    const keys = await redis.keys(`email:custom:${l}:*`);
    overview[l] = keys.length;
  }
  
  return res.status(200).json({ 
    overview, 
    maxPerLang: MAX_TEMPLATES_PER_LANG,
    buttonTypes: BUTTON_TYPES,
    textColors: TEXT_COLORS,
    placeholders: PLACEHOLDERS
  });
}

// POST: Neues Template erstellen
async function handlePost(req, res) {
  const { lang, name, content } = req.body;

  if (!lang || !LANGUAGES.includes(lang)) {
    return res.status(400).json({ error: 'Invalid language. Must be de, en, or es' });
  }

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: 'Template name is required' });
  }

  // Prüfen ob Limit erreicht
  const existingKeys = await redis.keys(`email:custom:${lang}:*`);
  if (existingKeys.length >= MAX_TEMPLATES_PER_LANG) {
    return res.status(400).json({ 
      error: `Maximum of ${MAX_TEMPLATES_PER_LANG} templates per language reached`,
      suggestion: 'Delete an existing template to create a new one'
    });
  }

  // Eindeutige ID generieren
  const id = `t_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const template = {
    id,
    lang,
    name: name.trim(),
    content: {
      subject: content?.subject || '',
      greeting: content?.greeting || 'Liebe/r {{NAME}},',
      blocks: content?.blocks || [], // Rich-Text-Blöcke
      buttons: content?.buttons || [], // 1-3 Buttons
      closing: content?.closing || '',
      signature: content?.signature || true, // Standard-Signatur verwenden
      ps: content?.ps || ''
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await redis.set(`email:custom:${lang}:${id}`, JSON.stringify(template));

  return res.status(201).json({ 
    message: 'Template created successfully',
    template 
  });
}

// PUT: Template aktualisieren
async function handlePut(req, res) {
  const { id, lang, name, content } = req.body;

  if (!id || !lang) {
    return res.status(400).json({ error: 'Template ID and language are required' });
  }

  const existing = await redis.get(`email:custom:${lang}:${id}`);
  if (!existing) {
    return res.status(404).json({ error: 'Template not found' });
  }

  const existingTemplate = typeof existing === 'string' ? JSON.parse(existing) : existing;

  const updatedTemplate = {
    ...existingTemplate,
    name: name?.trim() || existingTemplate.name,
    content: content || existingTemplate.content,
    updatedAt: new Date().toISOString()
  };

  await redis.set(`email:custom:${lang}:${id}`, JSON.stringify(updatedTemplate));

  return res.status(200).json({ 
    message: 'Template updated successfully',
    template: updatedTemplate 
  });
}

// DELETE: Template löschen
async function handleDelete(req, res) {
  const { id, lang } = req.query;

  if (!id || !lang) {
    return res.status(400).json({ error: 'Template ID and language are required' });
  }

  const existing = await redis.get(`email:custom:${lang}:${id}`);
  if (!existing) {
    return res.status(404).json({ error: 'Template not found' });
  }

  await redis.del(`email:custom:${lang}:${id}`);

  return res.status(200).json({ 
    message: 'Template deleted successfully',
    deletedId: id 
  });
}
