/**
 * Content CMS API
 * Lädt und speichert Website-Inhalte mit Upstash Redis
 */

import { Redis } from '@upstash/redis';

// Redis Client initialisieren
const redis = Redis.fromEnv();

// Standard-Daten falls noch nichts in der Datenbank ist
const defaultGlobal = {
  companyName: "All-Influencer.com",
  slogan: {
    de: "Die 333 — Premium Network",
    en: "The 333 — Premium Network",
    es: "Los 333 — Premium Network"
  },
  contact: {
    email: "contact@all-influencer.com",
    phone: "+49 163 260 0084",
    founder: "Julien Weiss"
  }
};

const defaultSections = {
  hero: {
    headline: { de: "Die 333", en: "The 333", es: "Los 333" },
    subheadline: {
      de: "Premium Influencer Network — Nur für die Top 1%",
      en: "Premium Influencer Network — Only for the Top 1%",
      es: "Red de Influencers Premium — Solo para el Top 1%"
    },
    ctaText: { de: "Jetzt bewerben", en: "Apply Now", es: "Aplicar Ahora" },
    ctaLink: "/loi"
  }
};

const defaultCustomers = {
  title: { de: "Goldene Kunden", en: "Golden Customers", es: "Clientes Dorados" },
  description: {
    de: "Unsere Premium-Partner und Marken",
    en: "Our premium partners and brands",
    es: "Nuestros socios y marcas premium"
  },
  customers: []
};

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - Alle Inhalte laden
    if (req.method === 'GET') {
      // Daten aus Redis laden (oder Defaults verwenden)
      let global = await redis.get('cms:global');
      let sections = await redis.get('cms:sections');
      let customers = await redis.get('cms:customers');

      // Falls keine Daten vorhanden, Defaults verwenden und speichern
      if (!global) {
        global = defaultGlobal;
        await redis.set('cms:global', defaultGlobal);
      }
      if (!sections) {
        sections = defaultSections;
        await redis.set('cms:sections', defaultSections);
      }
      if (!customers) {
        customers = defaultCustomers;
        await redis.set('cms:customers', defaultCustomers);
      }

      return res.status(200).json({
        success: true,
        data: { global, sections, customers }
      });
    }

    // PUT - Inhalte speichern
    if (req.method === 'PUT') {
      const { type, data } = req.body;

      if (!type || !data) {
        return res.status(400).json({
          success: false,
          error: 'Missing type or data'
        });
      }

      switch (type) {
        case 'global':
          await redis.set('cms:global', data);
          break;
        case 'sections':
          await redis.set('cms:sections', data);
          break;
        case 'section':
          const { sectionId, sectionData } = data;
          let currentSections = await redis.get('cms:sections') || {};
          currentSections[sectionId] = sectionData;
          await redis.set('cms:sections', currentSections);
          break;
        case 'customers':
          await redis.set('cms:customers', data);
          break;
        default:
          return res.status(400).json({
            success: false,
            error: 'Invalid type'
          });
      }

      return res.status(200).json({
        success: true,
        message: 'Content saved successfully'
      });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
