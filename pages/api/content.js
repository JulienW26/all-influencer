/**
 * Public Content API
 * Stellt CMS-Inhalte für die öffentliche Website bereit (nur Lesen)
 */

import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// Standard-Daten falls nichts in der Datenbank
const defaults = {
  global: {
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
  },
  sections: {},
  customers: { customers: [] }
};

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Daten aus Redis laden
    const [global, sections, customers] = await Promise.all([
      redis.get('cms:global'),
      redis.get('cms:sections'),
      redis.get('cms:customers')
    ]);

    return res.status(200).json({
      global: global || defaults.global,
      sections: sections || defaults.sections,
      customers: customers || defaults.customers
    });

  } catch (error) {
    console.error('Content API Error:', error);
    // Bei Fehler Defaults zurückgeben
    return res.status(200).json(defaults);
  }
}
