import dbConnect from '../../../../lib/mongodb';
import PortalUser from '../../../../models/PortalUser';
import { sendApprovedEmail } from '../../../../lib/email';
import { getSession } from 'next-auth/react';

/**
 * Admin API: Benutzer-Status ändern
 * 
 * PATCH /api/admin/users/[id]
 * Body: { status: 'approved' | 'rejected' | 'suspended', adminNotes?: string }
 * 
 * DELETE /api/admin/users/[id]
 * Löscht den Benutzer
 */
export default async function handler(req, res) {
  // Session prüfen
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'Nicht authentifiziert' });
  }

  // Admin-Berechtigung prüfen
  if (session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Keine Admin-Berechtigung' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Benutzer-ID fehlt' });
  }

  await dbConnect();

  // === PATCH: Status ändern ===
  if (req.method === 'PATCH') {
    const { status, adminNotes } = req.body;

    // Gültige Status prüfen
    const validStatuses = ['pending', 'approved', 'rejected', 'suspended'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Ungültiger Status' });
    }

    try {
      const user = await PortalUser.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'Benutzer nicht gefunden' });
      }

      const previousStatus = user.status;
      
      // Status aktualisieren
      if (status) {
        user.status = status;
      }
      
      // Admin-Notizen aktualisieren
      if (adminNotes !== undefined) {
        user.adminNotes = adminNotes;
      }

      await user.save();

      console.log(`✅ Benutzer ${user.email} Status: ${previousStatus} → ${status}`);

      // E-Mail senden wenn auf "approved" gesetzt
      if (status === 'approved' && previousStatus !== 'approved') {
        try {
          await sendApprovedEmail(user.email, {
            name: user.firstName || user.name || user.email.split('@')[0]
          }, user.preferredLanguage || 'de');
          console.log('✅ Approved-E-Mail gesendet an:', user.email);
        } catch (emailError) {
          console.error('Approved-E-Mail Fehler:', emailError);
          // Nicht kritisch - Status wurde trotzdem geändert
        }
      }

      return res.status(200).json({
        success: true,
        message: `Benutzer-Status auf "${status}" geändert`,
        user: user.toJSON()
      });

    } catch (error) {
      console.error('Status-Update Fehler:', error);
      return res.status(500).json({ error: 'Serverfehler' });
    }
  }

  // === DELETE: Benutzer löschen ===
  if (req.method === 'DELETE') {
    try {
      const user = await PortalUser.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'Benutzer nicht gefunden' });
      }

      // Admins können nicht gelöscht werden
      if (user.role === 'admin') {
        return res.status(403).json({ error: 'Admin-Accounts können nicht gelöscht werden' });
      }

      await PortalUser.findByIdAndDelete(id);
      console.log('🗑️ Benutzer gelöscht:', user.email);

      return res.status(200).json({
        success: true,
        message: 'Benutzer erfolgreich gelöscht'
      });

    } catch (error) {
      console.error('Löschen Fehler:', error);
      return res.status(500).json({ error: 'Serverfehler beim Löschen' });
    }
  }

  // === GET: Einzelnen Benutzer abrufen ===
  if (req.method === 'GET') {
    try {
      const user = await PortalUser.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'Benutzer nicht gefunden' });
      }

      return res.status(200).json({ user: user.toJSON() });

    } catch (error) {
      console.error('Abruf Fehler:', error);
      return res.status(500).json({ error: 'Serverfehler' });
    }
  }

  // Andere Methoden nicht erlaubt
  res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
  return res.status(405).json({ error: `Methode ${req.method} nicht erlaubt` });
  }
