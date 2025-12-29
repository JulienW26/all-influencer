/**
 * API Route: Einladungscode prüfen
 * POST /api/portal/verify-code
 */

import dbConnect from '../../../lib/mongodb';
import InvitationCode from '../../../models/InvitationCode';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ 
        valid: false, 
        error: 'Bitte Einladungscode eingeben' 
      });
    }

    // Code suchen (case-insensitive)
    const invitation = await InvitationCode.findOne({ 
      code: code.toUpperCase().trim() 
    });

    if (!invitation) {
      return res.status(404).json({ 
        valid: false, 
        error: 'Ungültiger Einladungscode' 
      });
    }

    // Prüfen ob Code noch gültig ist
    if (invitation.status === 'used') {
      return res.status(400).json({ 
        valid: false, 
        error: 'Dieser Code wurde bereits verwendet' 
      });
    }
    
    if (invitation.status === 'deactivated') {
      return res.status(400).json({ 
        valid: false, 
        error: 'Dieser Code wurde deaktiviert' 
      });
    }

    // Prüfen ob Code abgelaufen ist
    if (invitation.validUntil && new Date(invitation.validUntil) < new Date()) {
      return res.status(400).json({ 
        valid: false, 
        error: 'Dieser Code ist abgelaufen' 
      });
    }

    // Prüfen ob maximale Nutzungen erreicht
    if (invitation.maxUses && invitation.usedCount >= invitation.maxUses) {
      return res.status(400).json({ 
        valid: false, 
        error: 'Dieser Code wurde bereits zu oft verwendet' 
      });
    }

    // Code ist gültig - Infos zurückgeben
    return res.status(200).json({
      valid: true,
      type: invitation.type,
      category: invitation.category || null,
      spotNumber: invitation.spotNumber || null,
      isFounderCode: invitation.isFounderCode,
    });

  } catch (error) {
    console.error('Verify code error:', error);
    return res.status(500).json({ 
      valid: false, 
      error: 'Serverfehler. Bitte später erneut versuchen.' 
    });
  }
}
