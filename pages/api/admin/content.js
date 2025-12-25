/**
 * Content CMS API
 * Lädt und speichert Website-Inhalte
 */

import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

// JSON-Datei lesen
function readJsonFile(filename) {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

// JSON-Datei schreiben
function writeJsonFile(filename, data) {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export default function handler(req, res) {
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
      const global = readJsonFile('global.json') || {};
      const sections = readJsonFile('sections.json') || {};
      const customers = readJsonFile('customers.json') || {};

      return res.status(200).json({
        success: true,
        data: {
          global,
          sections,
          customers
        }
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
          writeJsonFile('global.json', data);
          break;
        case 'sections':
          writeJsonFile('sections.json', data);
          break;
        case 'section':
          const { sectionId, sectionData } = data;
          const currentSections = readJsonFile('sections.json') || {};
          currentSections[sectionId] = sectionData;
          writeJsonFile('sections.json', currentSections);
          break;
        case 'customers':
          writeJsonFile('customers.json', data);
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
