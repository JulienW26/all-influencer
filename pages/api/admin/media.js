/**
 * Media API - Vercel Blob Storage
 * Für: All-Influencer.com
 * 
 * Endpoints:
 * - GET: Alle Medien auflisten
 * - POST: Neue Datei hochladen
 * - DELETE: Datei löschen
 */

import { put, list, del } from '@vercel/blob';

// Erlaubte Dateitypen
const ALLOWED_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'],
  videos: ['video/mp4', 'video/webm']
};

// Maximale Dateigrößen (in Bytes)
const MAX_SIZES = {
  images: 10 * 1024 * 1024,  // 10 MB für Bilder
  videos: 100 * 1024 * 1024  // 100 MB für Videos
};

// Kategorien für Medien
const CATEGORIES = ['influencer', 'logos', 'videos', 'general'];

export const config = {
  api: {
    bodyParser: false, // Wichtig für File-Uploads
  },
};

// Hilfsfunktion zum Parsen von FormData
async function parseFormData(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  
  // Boundary aus Content-Type extrahieren
  const contentType = req.headers['content-type'] || '';
  const boundaryMatch = contentType.match(/boundary=(.+)$/);
  if (!boundaryMatch) {
    throw new Error('No boundary found in content-type');
  }
  
  const boundary = boundaryMatch[1];
  const parts = buffer.toString('binary').split(`--${boundary}`);
  
  const result = {
    fields: {},
    files: []
  };
  
  for (const part of parts) {
    if (part.includes('Content-Disposition')) {
      const headerMatch = part.match(/Content-Disposition: form-data; name="([^"]+)"(?:; filename="([^"]+)")?/);
      if (headerMatch) {
        const [, fieldName, fileName] = headerMatch;
        
        if (fileName) {
          // Es ist eine Datei
          const contentTypeMatch = part.match(/Content-Type: ([^\r\n]+)/);
          const fileContentType = contentTypeMatch ? contentTypeMatch[1] : 'application/octet-stream';
          
          // Datei-Inhalt extrahieren (nach den Headers)
          const headerEnd = part.indexOf('\r\n\r\n');
          if (headerEnd !== -1) {
            const fileContent = part.slice(headerEnd + 4, part.lastIndexOf('\r\n'));
            result.files.push({
              fieldName,
              fileName,
              contentType: fileContentType,
              buffer: Buffer.from(fileContent, 'binary')
            });
          }
        } else {
          // Es ist ein normales Feld
          const headerEnd = part.indexOf('\r\n\r\n');
          if (headerEnd !== -1) {
            const value = part.slice(headerEnd + 4, part.lastIndexOf('\r\n')).trim();
            result.fields[fieldName] = value;
          }
        }
      }
    }
  }
  
  return result;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // ========== GET: Alle Medien auflisten ==========
    if (req.method === 'GET') {
      const { category } = req.query;
      
      // Alle Blobs aus dem Store holen
      const { blobs } = await list();
      
      // Nach Kategorie filtern falls angegeben
      let filteredBlobs = blobs;
      if (category && category !== 'all') {
        filteredBlobs = blobs.filter(blob => 
          blob.pathname.startsWith(`${category}/`)
        );
      }
      
      // Blob-Daten formatieren
      const media = filteredBlobs.map(blob => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
        // Kategorie aus Pfad extrahieren
        category: blob.pathname.split('/')[0] || 'general',
        // Dateiname extrahieren
        filename: blob.pathname.split('/').pop(),
        // Typ bestimmen
        type: blob.pathname.match(/\.(mp4|webm)$/i) ? 'video' : 'image'
      }));
      
      return res.status(200).json({
        success: true,
        media,
        total: media.length
      });
    }

    // ========== POST: Neue Datei hochladen ==========
    if (req.method === 'POST') {
      const formData = await parseFormData(req);
      const file = formData.files[0];
      const category = formData.fields.category || 'general';
      
      if (!file) {
        return res.status(400).json({
          success: false,
          error: 'Keine Datei gefunden'
        });
      }
      
      // Kategorie validieren
      if (!CATEGORIES.includes(category)) {
        return res.status(400).json({
          success: false,
          error: `Ungültige Kategorie. Erlaubt: ${CATEGORIES.join(', ')}`
        });
      }
      
      // Dateityp prüfen
      const isImage = ALLOWED_TYPES.images.includes(file.contentType);
      const isVideo = ALLOWED_TYPES.videos.includes(file.contentType);
      
      if (!isImage && !isVideo) {
        return res.status(400).json({
          success: false,
          error: 'Dateityp nicht erlaubt. Erlaubt: JPG, PNG, WebP, SVG, GIF, MP4, WebM'
        });
      }
      
      // Dateigröße prüfen
      const maxSize = isVideo ? MAX_SIZES.videos : MAX_SIZES.images;
      if (file.buffer.length > maxSize) {
        const maxMB = maxSize / (1024 * 1024);
        return res.status(400).json({
          success: false,
          error: `Datei zu groß. Maximum: ${maxMB} MB`
        });
      }
      
      // Dateinamen säubern (Sonderzeichen entfernen)
      const cleanFilename = file.fileName
        .replace(/[^a-zA-Z0-9.-]/g, '_')
        .toLowerCase();
      
      // Pfad mit Kategorie erstellen
      const pathname = `${category}/${Date.now()}-${cleanFilename}`;
      
      // Zu Vercel Blob hochladen
      const blob = await put(pathname, file.buffer, {
        access: 'public',
        contentType: file.contentType,
      });
      
      return res.status(200).json({
        success: true,
        media: {
          url: blob.url,
          pathname: blob.pathname,
          size: file.buffer.length,
          category,
          filename: cleanFilename,
          type: isVideo ? 'video' : 'image'
        }
      });
    }

    // ========== DELETE: Datei löschen ==========
    if (req.method === 'DELETE') {
      const { url } = req.query;
      
      if (!url) {
        return res.status(400).json({
          success: false,
          error: 'URL zum Löschen erforderlich'
        });
      }
      
      await del(url);
      
      return res.status(200).json({
        success: true,
        message: 'Datei erfolgreich gelöscht'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('Media API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Ein Fehler ist aufgetreten'
    });
  }
}
