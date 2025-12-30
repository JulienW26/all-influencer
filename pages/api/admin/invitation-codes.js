/**
 * API Route: Admin - Einladungscodes verwalten
 */

import dbConnect from '../../../lib/mongodb';
import InvitationCode from '../../../models/InvitationCode';

export default async function handler(req, res) {
  // Debug: Zeige dass API erreicht wurde
  console.log('API invitation-codes called:', req.method);
  
  try {
    await dbConnect();
    console.log('MongoDB connected');

    // GET - Alle Codes abrufen
    if (req.method === 'GET') {
      const { status, type } = req.query;
      
      const filter = {};
      if (status && status !== 'all') filter.status = status;
      if (type && type !== 'all') filter.type = type;

      const codes = await InvitationCode.find(filter)
        .sort({ createdAt: -1 })
        .limit(100);

      const stats = {
        total: await InvitationCode.countDocuments(),
        active: await InvitationCode.countDocuments({ status: 'active' }),
        used: await InvitationCode.countDocuments({ status: 'used' }),
        influencer: await InvitationCode.countDocuments({ type: 'influencer', status: 'active' }),
        brand: await InvitationCode.countDocuments({ type: 'brand', status: 'active' }),
      };

      return res.status(200).json({ codes, stats });
    }

    // POST - Neuen Code erstellen
    if (req.method === 'POST') {
      const { type, category, spotNumber, isFounderCode, maxUses, validUntil, notes, customCode } = req.body;

      if (!type) {
        return res.status(400).json({ error: 'Typ ist erforderlich' });
      }

      let code;
      if (customCode) {
        code = customCode.toUpperCase().trim();
        const existing = await InvitationCode.findOne({ code });
        if (existing) {
          return res.status(400).json({ error: 'Dieser Code existiert bereits' });
        }
      } else {
        const prefix = type === 'influencer' ? 'INF' : 'BRD';
        code = InvitationCode.generateCode(type);
      }

      const newCode = await InvitationCode.create({
        code,
        type,
        category: type === 'influencer' ? category : undefined,
        spotNumber: spotNumber || undefined,
        isFounderCode: isFounderCode || false,
        maxUses: maxUses || 1,
        validUntil: validUntil ? new Date(validUntil) : undefined,
        notes,
      });

      return res.status(201).json({ success: true, code: newCode });
    }

    // DELETE - Code deaktivieren oder permanent löschen
    if (req.method === 'DELETE') {
      const { id, permanent } = req.query;
      if (!id) return res.status(400).json({ error: 'Code-ID erforderlich' });

      const code = await InvitationCode.findById(id);
      if (!code) return res.status(404).json({ error: 'Code nicht gefunden' });

      // NEU: Permanent löschen wenn ?permanent=true
      if (permanent === 'true') {
        await InvitationCode.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Code permanent gelöscht' });
      }

      // Sonst: Nur deaktivieren (wie bisher)
      code.status = 'deactivated';
      await code.save();

      return res.status(200).json({ success: true, message: 'Code deaktiviert' });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error.message);
    console.error('Stack:', error.stack);
    return res.status(500).json({ error: error.message });
  }
}
