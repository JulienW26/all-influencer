/**
 * Global Stats API - Alle Admins sehen alle Daten
 */

import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // E-Mail Templates zählen
    const templates = await redis.get('cms:emails') || [];
    const templateCount = Array.isArray(templates) ? templates.length : 6;

    // Empfänger zählen
    const recipients = await redis.get('cms:recipients') || [];
    const recipientCount = Array.isArray(recipients) ? recipients.length : 0;

    // Gesendete E-Mails zählen
    const sent = await redis.get('cms:sent') || [];
    const sentCount = Array.isArray(sent) ? sent.length : 0;

    // Influencer zählen
    const influencers = await redis.get('cms:influencers') || [];
    const influencerCount = Array.isArray(influencers) ? influencers.length : 0;

    // Media zählen
    const media = await redis.get('cms:media') || [];
    const mediaCount = Array.isArray(media) ? media.length : 0;

    return res.status(200).json({
      success: true,
      stats: {
        templates: templateCount,
        recipients: recipientCount,
        sent: sentCount,
        influencers: influencerCount,
        media: mediaCount
      }
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Fehler beim Laden der Statistiken' 
    });
  }
}
