/**
 * API Route: Admin - Einladungscodes verwalten
 * GET/POST/DELETE /api/admin/invitation-codes
 */

import { getSession } from '../../../lib/auth';
import dbConnect from '../../../lib/mongodb';
import InvitationCode from '../../../models/InvitationCode';

export default async function handler(req, res) {
  // Admin-Auth prüfen
  const session = getSession(req);
  if (!session) {
    return res.status(401).json({ error: 'Nicht authentifiziert' });
  }

  try {
    await dbConnect();

    // GET - Alle Codes abrufen
    if (req.method === 'GET') {
      const { status, type } = req.query;
      
      const filter = {};
      if (status && status !== 'all') filter.status = status;
      if (type && type !== 'all') filter.type = type;

      const codes = await InvitationCode.find(filter)
        .sort({ createdAt: -1 })
        .limit(100);

      // Statistiken
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
      const { 
        type, 
        category, 
        spotNumber, 
        isFounderCode,
        maxUses,
        validUntil,
        notes,
        customCode,
      } = req.body;

      if (!type) {
        return res.status(400).json({ error: 'Typ ist erforderlich' });
      }

      // Code generieren oder benutzerdefinierten Code verwenden
      let code;
      if (customCode) {
        code = customCode.toUpperCase().trim();
        // Prüfen ob Code bereits existiert
        const existing = await InvitationCode.findOne({ code });
        if (existing) {
          return res.status(400).json({ error: 'Dieser Code existiert bereits' });
        }
      } else {
        // Prefix basierend auf Typ
        const prefix = type === 'influencer' ? 'INF' : 'BRD';
        code = InvitationCode.generateCode(prefix);
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
        createdBy: session.username,
      });

      return res.status(201).json({ 
        success: true, 
        code: newCode 
      });
    }

    // DELETE - Code deaktivieren
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Code-ID erforderlich' });
      }

      const code = await InvitationCode.findById(id);
      if (!code) {
        return res.status(404).json({ error: 'Code nicht gefunden' });
      }

      code.status = 'deactivated';
      await code.save();

      return res.status(200).json({ 
        success: true, 
        message: 'Code deaktiviert' 
      });
    }

    // PUT - Code aktualisieren
    if (req.method === 'PUT') {
      const { id, status, notes } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Code-ID erforderlich' });
      }

      const code = await InvitationCode.findById(id);
      if (!code) {
        return res.status(404).json({ error: 'Code nicht gefunden' });
      }

      if (status) code.status = status;
      if (notes !== undefined) code.notes = notes;
      await code.save();

      return res.status(200).json({ 
        success: true, 
        code 
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Invitation codes API error:', error);
    return res.status(500).json({ error: 'Serverfehler' });
  }
}
