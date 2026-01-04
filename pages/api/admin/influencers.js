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
import { NICHE_CATEGORIES, validateNicheSelection, hasOtherNiche } from '../../../lib/niche-categories';

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

// NEU: Maximale Founder
const MAX_FOUNDERS = 100;

// NEU: Founder Gratis-Monate
const FOUNDER_FREE_MONTHS = 24;

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

// NEU: Nächste freie Spot-Nummer finden
function getNextSpotNumber(influencers) {
  const usedSpots = influencers
    .filter(inf => inf.hasSpot && inf.spotNumber)
    .map(inf => inf.spotNumber);
  
  for (let i = 1; i <= MAX_SPOTS; i++) {
    if (!usedSpots.includes(i)) {
      return i;
    }
  }
  return null;
}

// NEU: Spot-Nummern neu berechnen
function recalculateSpotNumbers(influencers) {
  const withSpot = influencers.filter(inf => inf.hasSpot);
  
  const byCategory = {
    diamond: withSpot.filter(inf => inf.category === 'diamond').sort((a, b) => b.followers - a.followers),
    platin: withSpot.filter(inf => inf.category === 'platin').sort((a, b) => b.followers - a.followers),
    gold: withSpot.filter(inf => inf.category === 'gold').sort((a, b) => b.followers - a.followers),
    rising: withSpot.filter(inf => inf.category === 'rising').sort((a, b) => b.followers - a.followers),
  };
  
  let spotNumber = 1;
  ['diamond', 'platin', 'gold', 'rising'].forEach(cat => {
    byCategory[cat].forEach(inf => {
      const index = influencers.findIndex(i => i.id === inf.id);
      if (index !== -1) {
        influencers[index].spotNumber = spotNumber++;
      }
    });
  });
  
  influencers.forEach(inf => {
    if (!inf.hasSpot) {
      inf.spotNumber = null;
    }
  });
  
  return influencers;
}

// NEU: Anzahl der Founder zählen
function countFounders(influencers) {
  return influencers.filter(inf => inf.isFounder === true).length;
}

// NEU: Prüfen ob Founder-Status noch gültig (24 Monate)
function isFounderStillFree(founderSince) {
  if (!founderSince) return false;
  const founderDate = new Date(founderSince);
  const now = new Date();
  const monthsDiff = (now.getFullYear() - founderDate.getFullYear()) * 12 + 
                     (now.getMonth() - founderDate.getMonth());
  return monthsDiff < FOUNDER_FREE_MONTHS;
}

// NEU: Erweiterte Statistiken
function calculateStats(influencers) {
  const withSpot = influencers.filter(inf => inf.hasSpot === true);
  const withoutSpot = influencers.filter(inf => inf.hasSpot !== true);
  const founders = influencers.filter(inf => inf.isFounder === true);
  
  return {
    total: influencers.length,
    spotsUsed: withSpot.length,
    spotsAvailable: MAX_SPOTS - withSpot.length,
    withoutSpot: withoutSpot.length,
    founders: founders.length,
    maxFounders: MAX_FOUNDERS,
    maxSpots: MAX_SPOTS,
    byCategory: {
      diamond: influencers.filter(i => i.category === 'diamond').length,
      platin: influencers.filter(i => i.category === 'platin').length,
      gold: influencers.filter(i => i.category === 'gold').length,
      rising: influencers.filter(i => i.category === 'rising').length,
    }
  };
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
      const { category, platform, search, hasSpot, forWebsite, forPortal, niche, niches } = req.query;
      
      // Aus Redis laden
      let influencers = await redis.get('cms:influencers') || [];
      
      // NEU: Für Website = nur mit Spot und aktiv
      if (forWebsite === 'true') {
        influencers = influencers.filter(inf => 
          inf.hasSpot === true && inf.status === 'active'
        );
      }
      
      // NEU: Für Portal = alle aktiven
      if (forPortal === 'true') {
        influencers = influencers.filter(inf => inf.status === 'active');
      }
      
      // NEU: Nach Spot-Status filtern
      if (hasSpot === 'true') {
        influencers = influencers.filter(inf => inf.hasSpot === true);
      } else if (hasSpot === 'false') {
        influencers = influencers.filter(inf => inf.hasSpot !== true);
      }
      
      // Nach Kategorie filtern
      if (category && category !== 'all') {
        influencers = influencers.filter(inf => inf.category === category);
      }
      
      // Nach Plattform filtern
      if (platform && platform !== 'all') {
        influencers = influencers.filter(inf => inf.platform === platform);
      }
      
      // NEU: Nach einzelner Nische filtern
      if (niche && niche !== 'all') {
        influencers = influencers.filter(inf => 
          inf.nicheCategories?.includes(niche)
        );
      }
      
      // NEU: Nach mehreren Nischen filtern (OR)
      if (niches) {
        const nicheArray = niches.split(',').map(n => n.trim());
        influencers = influencers.filter(inf => 
          inf.nicheCategories?.some(n => nicheArray.includes(n))
        );
      }
      
      // Suche nach Name/Username
      if (search) {
        const searchLower = search.toLowerCase();
        influencers = influencers.filter(inf => 
          inf.name?.toLowerCase().includes(searchLower) ||
          inf.username?.toLowerCase().includes(searchLower)
        );
      }
      
      // Sortierung: Für Website nach Spot-Nummer, sonst nach Followern
      if (forWebsite === 'true') {
        influencers.sort((a, b) => (a.spotNumber || 999) - (b.spotNumber || 999));
      } else {
        influencers.sort((a, b) => (b.followers || 0) - (a.followers || 0));
      }
      
      // NEU: Erweiterte Statistiken
      const allInfluencers = await redis.get('cms:influencers') || [];
      const stats = calculateStats(allInfluencers);
      
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
      const { name, username, profileImage, platform, platformLink, followers, nicheCategories, nicheCustom, assignSpot, makeFounder } = req.body;
      
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
      
      // NEU: Nischen-Validierung
      if (nicheCategories && nicheCategories.length > 0) {
        const validation = validateNicheSelection(nicheCategories, nicheCustom);
        if (!validation.valid) {
          return res.status(400).json({
            success: false,
            error: validation.errors[0]?.de || 'Ungültige Nischen-Auswahl'
          });
        }
      }
      
      // Aktuelle Influencer laden
      let influencers = await redis.get('cms:influencers') || [];
      
      // Username-Duplikat prüfen
      const usernameExists = influencers.some(
        inf => inf.username?.toLowerCase().replace('@', '') === username.toLowerCase().replace('@', '')
      );
      if (usernameExists) {
        return res.status(400).json({
          success: false,
          error: 'Dieser Username existiert bereits'
        });
      }
      
      // Kategorie berechnen
      const category = calculateCategory(followerCount);
      
      // NEU: Spot-Vergabe prüfen
      let hasSpotValue = false;
      let spotNumberValue = null;
      let isFounderValue = false;
      let founderSinceValue = null;
      
      // NEU: Bei makeFounder automatisch auch Spot vergeben
      if (makeFounder) {
        const currentFounders = countFounders(influencers);
        if (currentFounders >= MAX_FOUNDERS) {
          return res.status(400).json({
            success: false,
            error: `Alle ${MAX_FOUNDERS} Founder-Plätze sind bereits vergeben`
          });
        }
        isFounderValue = true;
        founderSinceValue = new Date().toISOString();
        hasSpotValue = true; // Founder bekommen automatisch Spot
      }
      
      // NEU: Spot vergeben wenn gewünscht oder Founder
      if (assignSpot || makeFounder) {
        const withSpot = influencers.filter(inf => inf.hasSpot === true);
        if (withSpot.length >= MAX_SPOTS) {
          return res.status(400).json({
            success: false,
            error: `Alle ${MAX_SPOTS} Spots sind bereits vergeben`
          });
        }
        hasSpotValue = true;
        spotNumberValue = getNextSpotNumber(influencers);
      }
      
      // Neuen Influencer erstellen
      const newInfluencer = {
        id: generateId(),
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
        // NEU: Spot-Felder
        hasSpot: hasSpotValue,
        spotNumber: spotNumberValue,
        // NEU: Founder-Felder
        isFounder: isFounderValue,
        founderSince: founderSinceValue,
        // NEU: Nischen-Felder
        nicheCategories: nicheCategories || [],
        nicheCustom: hasOtherNiche(nicheCategories || []) ? (nicheCustom || null) : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      influencers.push(newInfluencer);
      
      // NEU: Spot-Nummern neu berechnen wenn Spot vergeben
      if (hasSpotValue) {
        influencers = recalculateSpotNumbers(influencers);
      }
      
      await redis.set('cms:influencers', influencers);
      
      return res.status(201).json({
        success: true,
        message: `Influencer "${name}" erfolgreich hinzugefügt${hasSpotValue ? ` (Spot #${newInfluencer.spotNumber})` : ''}`,
        influencer: newInfluencer
      });
    }

    // ========== PUT: Influencer aktualisieren ==========
    if (req.method === 'PUT') {
      const { id, name, username, profileImage, platform, platformLink, followers, status, action, nicheCategories, nicheCustom } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Influencer-ID erforderlich'
        });
      }
      
      // Influencer laden
      let influencers = await redis.get('cms:influencers') || [];
      const index = influencers.findIndex(inf => inf.id === id);
      
      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Influencer nicht gefunden'
        });
      }
      
      const influencer = influencers[index];
      
      // NEU: Aktionen verarbeiten
      if (action === 'assignSpot') {
        // Spot vergeben
        if (influencer.hasSpot) {
          return res.status(400).json({
            success: false,
            error: 'Influencer hat bereits einen Spot'
          });
        }
        
        const withSpot = influencers.filter(inf => inf.hasSpot === true);
        if (withSpot.length >= MAX_SPOTS) {
          return res.status(400).json({
            success: false,
            error: `Alle ${MAX_SPOTS} Spots sind bereits vergeben`
          });
        }
        
        influencers[index].hasSpot = true;
        influencers[index].spotNumber = getNextSpotNumber(influencers);
        influencers[index].updatedAt = new Date().toISOString();
        
        influencers = recalculateSpotNumbers(influencers);
        await redis.set('cms:influencers', influencers);
        
        return res.status(200).json({
          success: true,
          message: `Spot #${influencers[index].spotNumber} erfolgreich vergeben`,
          influencer: influencers[index]
        });
      }
      
      if (action === 'removeSpot') {
        // Spot entziehen
        if (!influencer.hasSpot) {
          return res.status(400).json({
            success: false,
            error: 'Influencer hat keinen Spot'
          });
        }
        
        // Prüfen ob Founder noch in Gratis-Zeit
        if (influencer.isFounder && isFounderStillFree(influencer.founderSince)) {
          return res.status(400).json({
            success: false,
            error: 'Founder-Spot kann während der 24-Monats-Gratis-Zeit nicht entzogen werden'
          });
        }
        
        influencers[index].hasSpot = false;
        influencers[index].spotNumber = null;
        influencers[index].updatedAt = new Date().toISOString();
        
        influencers = recalculateSpotNumbers(influencers);
        await redis.set('cms:influencers', influencers);
        
        return res.status(200).json({
          success: true,
          message: 'Spot erfolgreich entzogen',
          influencer: influencers[index]
        });
      }
      
      if (action === 'makeFounder') {
        // Founder-Status vergeben
        if (influencer.isFounder) {
          return res.status(400).json({
            success: false,
            error: 'Influencer ist bereits Founder'
          });
        }
        
        const currentFounders = countFounders(influencers);
        if (currentFounders >= MAX_FOUNDERS) {
          return res.status(400).json({
            success: false,
            error: `Alle ${MAX_FOUNDERS} Founder-Plätze sind bereits vergeben`
          });
        }
        
        influencers[index].isFounder = true;
        influencers[index].founderSince = new Date().toISOString();
        
        // Automatisch Spot vergeben wenn noch keiner
        if (!influencer.hasSpot) {
          const withSpot = influencers.filter(inf => inf.hasSpot === true);
          if (withSpot.length < MAX_SPOTS) {
            influencers[index].hasSpot = true;
            influencers[index].spotNumber = getNextSpotNumber(influencers);
          }
        }
        
        influencers[index].updatedAt = new Date().toISOString();
        
        influencers = recalculateSpotNumbers(influencers);
        await redis.set('cms:influencers', influencers);
        
        return res.status(200).json({
          success: true,
          message: `Founder-Status vergeben (24 Monate gratis)${influencers[index].hasSpot ? ` - Spot #${influencers[index].spotNumber}` : ''}`,
          influencer: influencers[index]
        });
      }
      
      // Username-Duplikat prüfen (außer eigener)
      if (username) {
        const usernameExists = influencers.some(
          inf => inf.id !== id && inf.username?.toLowerCase().replace('@', '') === username.toLowerCase().replace('@', '')
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
      
      // NEU: Nischen-Validierung
      if (nicheCategories !== undefined && nicheCategories.length > 0) {
        const validation = validateNicheSelection(nicheCategories, nicheCustom);
        if (!validation.valid) {
          return res.status(400).json({
            success: false,
            error: validation.errors[0]?.de || 'Ungültige Nischen-Auswahl'
          });
        }
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
        // NEU: Nischen aktualisieren
        nicheCategories: nicheCategories !== undefined ? nicheCategories : influencers[index].nicheCategories,
        nicheCustom: nicheCategories !== undefined 
          ? (hasOtherNiche(nicheCategories) ? (nicheCustom || null) : null)
          : influencers[index].nicheCustom,
        updatedAt: new Date().toISOString()
      };
      
      // Spot-Nummern neu berechnen wenn Kategorie sich geändert hat
      if (influencers[index].hasSpot) {
        influencers = recalculateSpotNumbers(influencers);
      }
      
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
      
      // NEU: Spot-Nummern korrekt neu berechnen
      influencers = recalculateSpotNumbers(influencers);
      
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
