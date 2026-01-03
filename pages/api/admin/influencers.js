/**
 * Influencer API - All-Influencer.com
 * Verwaltet 333 exklusive Influencer-Spots
 * 
 * Endpoints:
 * - GET: Alle Influencer laden
 * - POST: Neuen Influencer hinzufügen
 * - PUT: Influencer aktualisieren
 * - DELETE: Influencer löschen
 */

import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// Kategorie-Schwellenwerte
const CATEGORIES = {
  diamond: { min: 20000000, price: 10000, label: 'Diamond', icon: '💎' },
  platin: { min: 10000000, price: 5000, label: 'Platin', icon: '🏆' },
  gold: { min: 5000000, price: 1000, label: 'Gold', icon: '🥇' },
  rising: { min: 1000000, price: 250, label: 'Rising Star', icon: '⭐' },
};

// Erlaubte Plattformen (7 Plattformen)
const PLATFORMS = ['instagram', 'tiktok', 'youtube', 'facebook', 'x', 'twitch', 'linkedin'];

// Maximale Spots
const MAX_SPOTS = 333;

// Kategorie automatisch berechnen
function calculateCategory(followers) {
  const count = parseInt(followers) || 0;
  if (count >= CATEGORIES.diamond.min) return 'diamond';
  if (count >= CATEGORIES.platin.min) return 'platin';
  if (count >= CATEGORIES.gold.min) return 'gold';
  if (count >= CATEGORIES.rising.min) return 'rising';
  return null; // Unter 1M = nicht qualifiziert
}

// Follower-Zahl formatieren (z.B. 25000000 -> "25M")
function formatFollowers(count) {
  const num = parseInt(count) || 0;
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

// ID generieren
function generateId() {
  return 'inf-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // ========== GET: Alle Influencer laden ==========
    if (req.method === 'GET') {
      const { category, platform, search } = req.query;
      
      // Aus Redis laden
      let influencers = await redis.get('cms:influencers') || [];
      
      // Nach Kategorie filtern
      if (category && category !== 'all') {
        influencers = influencers.filter(inf => inf.category === category);
      }
      
      // Nach Plattform filtern
      if (platform && platform !== 'all') {
        influencers = influencers.filter(inf => inf.platform === platform);
      }
      
      // Suche nach Name/Username
      if (search) {
        const searchLower = search.toLowerCase();
        influencers = influencers.filter(inf => 
          inf.name?.toLowerCase().includes(searchLower) ||
          inf.username?.toLowerCase().includes(searchLower)
        );
      }
      
      // Nach Follower-Zahl sortieren (höchste zuerst)
      influencers.sort((a, b) => (b.followers || 0) - (a.followers || 0));
      
      // Statistiken berechnen
      const allInfluencers = await redis.get('cms:influencers') || [];
      const stats = {
        total: allInfluencers.length,
        available: MAX_SPOTS - allInfluencers.length,
        byCategory: {
          diamond: allInfluencers.filter(i => i.category === 'diamond').length,
          platin: allInfluencers.filter(i => i.category === 'platin').length,
          gold: allInfluencers.filter(i => i.category === 'gold').length,
          rising: allInfluencers.filter(i => i.category === 'rising').length,
        }
      };
      
      return res.status(200).json({
        success: true,
        influencers,
        stats,
        categories: CATEGORIES,
        platforms: PLATFORMS,
        maxSpots: MAX_SPOTS
      });
    }

    // ========== POST: Neuen Influencer hinzufügen ==========
    if (req.method === 'POST') {
      const { name, username, profileImage, platform, platformLink, followers } = req.body;
      
      // Validierung
      if (!name || !username) {
        return res.status(400).json({
          success: false,
          error: 'Name und Username sind erforderlich'
        });
      }
      
      if (!platform || !PLATFORMS.includes(platform)) {
        return res.status(400).json({
          success: false,
          error: 'Gültige Plattform erforderlich'
        });
      }
      
      const followerCount = parseInt(followers) || 0;
      if (followerCount < 1000000) {
        return res.status(400).json({
          success: false,
          error: 'Mindestens 1 Million Follower erforderlich'
        });
      }
      
      // Aktuelle Influencer laden
      const influencers = await redis.get('cms:influencers') || [];
      
      // Spot-Limit prüfen
      if (influencers.length >= MAX_SPOTS) {
        return res.status(400).json({
          success: false,
          error: `Alle ${MAX_SPOTS} Spots sind bereits vergeben`
        });
      }
      
      // Username-Duplikat prüfen
      const usernameExists = influencers.some(
        inf => inf.username?.toLowerCase() === username.toLowerCase()
      );
      if (usernameExists) {
        return res.status(400).json({
          success: false,
          error: 'Dieser Username existiert bereits'
        });
      }
      
      // Kategorie berechnen
      const category = calculateCategory(followerCount);
      
      // Neuen Influencer erstellen
      const newInfluencer = {
        id: generateId(),
        spotNumber: influencers.length + 1,
        name: name.trim(),
        username: username.trim().startsWith('@') ? username.trim() : '@' + username.trim(),
        profileImage: profileImage || null,
        platform,
        platformLink: platformLink || null,
        followers: followerCount,
        followersFormatted: formatFollowers(followerCount),
        category,
        categoryInfo: CATEGORIES[category],
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Speichern
      influencers.push(newInfluencer);
      await redis.set('cms:influencers', influencers);
      
      return res.status(200).json({
        success: true,
        influencer: newInfluencer,
        message: `Influencer erfolgreich hinzugefügt (Spot #${newInfluencer.spotNumber})`
      });
    }

    // ========== PUT: Influencer aktualisieren ==========
    if (req.method === 'PUT') {
      const { id, name, username, profileImage, platform, platformLink, followers, status } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Influencer-ID erforderlich'
        });
      }
      
      // Influencer laden
      const influencers = await redis.get('cms:influencers') || [];
      const index = influencers.findIndex(inf => inf.id === id);
      
      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Influencer nicht gefunden'
        });
      }
      
      // Username-Duplikat prüfen (außer eigener)
      if (username) {
        const usernameExists = influencers.some(
          inf => inf.id !== id && inf.username?.toLowerCase() === username.toLowerCase()
        );
        if (usernameExists) {
          return res.status(400).json({
            success: false,
            error: 'Dieser Username existiert bereits'
          });
        }
      }
      
      // Follower-Validierung
      const followerCount = parseInt(followers) || influencers[index].followers;
      if (followerCount < 1000000) {
        return res.status(400).json({
          success: false,
          error: 'Mindestens 1 Million Follower erforderlich'
        });
      }
      
      // Kategorie neu berechnen
      const category = calculateCategory(followerCount);
      
      // Aktualisieren
      influencers[index] = {
        ...influencers[index],
        name: name?.trim() || influencers[index].name,
        username: username ? (username.trim().startsWith('@') ? username.trim() : '@' + username.trim()) : influencers[index].username,
        profileImage: profileImage !== undefined ? profileImage : influencers[index].profileImage,
        platform: platform || influencers[index].platform,
        platformLink: platformLink !== undefined ? platformLink : influencers[index].platformLink,
        followers: followerCount,
        followersFormatted: formatFollowers(followerCount),
        category,
        categoryInfo: CATEGORIES[category],
        status: status || influencers[index].status,
        updatedAt: new Date().toISOString()
      };
      
      await redis.set('cms:influencers', influencers);
      
      return res.status(200).json({
        success: true,
        influencer: influencers[index],
        message: 'Influencer erfolgreich aktualisiert'
      });
    }

    // ========== DELETE: Influencer löschen ==========
    if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Influencer-ID erforderlich'
        });
      }
      
      // Influencer laden
      let influencers = await redis.get('cms:influencers') || [];
      const influencer = influencers.find(inf => inf.id === id);
      
      if (!influencer) {
        return res.status(404).json({
          success: false,
          error: 'Influencer nicht gefunden'
        });
      }
      
      // Entfernen
      influencers = influencers.filter(inf => inf.id !== id);
      
      // Spot-Nummern neu vergeben
      influencers.forEach((inf, idx) => {
        inf.spotNumber = idx + 1;
      });
      
      await redis.set('cms:influencers', influencers);
      
      return res.status(200).json({
        success: true,
        message: `${influencer.name} wurde entfernt`
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('Influencer API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Ein Fehler ist aufgetreten'
    });
  }
}
