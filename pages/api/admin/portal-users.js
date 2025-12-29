/**
 * API Route: Admin - Portal-Benutzer verwalten
 * GET/PUT /api/admin/portal-users
 */

import { getSession } from '../../../lib/auth';
import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';

export default async function handler(req, res) {
  // Admin-Auth prüfen
  const session = getSession(req);
  if (!session) {
    return res.status(401).json({ error: 'Nicht authentifiziert' });
  }

  try {
    await dbConnect();

    // GET - Benutzer abrufen
    if (req.method === 'GET') {
      const { status, userType, search, id } = req.query;

      // Einzelnen Benutzer abrufen
      if (id) {
        const user = await PortalUser.findById(id).select('-password');
        if (!user) {
          return res.status(404).json({ error: 'Benutzer nicht gefunden' });
        }
        return res.status(200).json({ user });
      }

      // Filter aufbauen
      const filter = {};
      if (status && status !== 'all') filter.status = status;
      if (userType && userType !== 'all') filter.userType = userType;
      
      if (search) {
        filter.$or = [
          { email: { $regex: search, $options: 'i' } },
          { 'influencerProfile.displayName': { $regex: search, $options: 'i' } },
          { 'brandProfile.companyName': { $regex: search, $options: 'i' } },
        ];
      }

      const users = await PortalUser.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .limit(100);

      // Statistiken
      const stats = {
        total: await PortalUser.countDocuments(),
        pending: await PortalUser.countDocuments({ status: 'pending' }),
        approved: await PortalUser.countDocuments({ status: 'approved' }),
        rejected: await PortalUser.countDocuments({ status: 'rejected' }),
        suspended: await PortalUser.countDocuments({ status: 'suspended' }),
        influencers: await PortalUser.countDocuments({ userType: 'influencer' }),
        brands: await PortalUser.countDocuments({ userType: 'brand' }),
        founders: await PortalUser.countDocuments({ isFounder: true }),
      };

      return res.status(200).json({ users, stats });
    }

    // PUT - Benutzer aktualisieren (Status ändern, etc.)
    if (req.method === 'PUT') {
      const { id, status, notes } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Benutzer-ID erforderlich' });
      }

      const user = await PortalUser.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'Benutzer nicht gefunden' });
      }

      // Status aktualisieren
      if (status) {
        const oldStatus = user.status;
        user.status = status;

        // Bei Freischaltung: approvedAt setzen
        if (status === 'approved' && oldStatus !== 'approved') {
          user.approvedAt = new Date();
        }
      }

      await user.save();

      return res.status(200).json({ 
        success: true, 
        user: {
          id: user._id,
          email: user.email,
          status: user.status,
        }
      });
    }

    // DELETE - Benutzer löschen (nur für Admins)
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Benutzer-ID erforderlich' });
      }

      const user = await PortalUser.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'Benutzer nicht gefunden' });
      }

      await PortalUser.findByIdAndDelete(id);

      return res.status(200).json({ 
        success: true, 
        message: 'Benutzer gelöscht' 
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Portal users API error:', error);
    return res.status(500).json({ error: 'Serverfehler' });
  }
}
