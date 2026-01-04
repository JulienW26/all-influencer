import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';
import { validateNicheSelection, hasOtherNiche } from '../../../lib/niche-categories';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.cookies.portal_token;

    if (!token) {
      return res.status(401).json({ error: 'Nicht autorisiert' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await dbConnect();

    const { profile, nicheCategories, nicheCustom } = req.body;

    // NEU: Nischen validieren wenn angegeben
    if (nicheCategories !== undefined && nicheCategories.length > 0) {
      const validation = validateNicheSelection(nicheCategories, nicheCustom);
      if (!validation.valid) {
        return res.status(400).json({ 
          error: validation.errors[0]?.de || 'Ungültige Nischen-Auswahl' 
        });
      }
    }

    // Update-Objekt erstellen
    const updateData = {
      updatedAt: new Date()
    };

    // Profil-Daten wenn vorhanden
    if (profile) {
      updateData.profile = profile;
    }

    // NEU: Nischen wenn vorhanden
    if (nicheCategories !== undefined) {
      updateData.nicheCategories = nicheCategories;
      updateData.nicheCustom = hasOtherNiche(nicheCategories) ? (nicheCustom || null) : null;
    }

    const updatedUser = await PortalUser.findByIdAndUpdate(
      decoded.userId,
      { $set: updateData },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    res.status(200).json({
      success: true,
      message: 'Profil erfolgreich aktualisiert',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        userType: updatedUser.userType,
        status: updatedUser.status,
        profile: updatedUser.profile,
        nicheCategories: updatedUser.nicheCategories,
        nicheCustom: updatedUser.nicheCustom
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token ungültig oder abgelaufen' });
    }
    
    res.status(500).json({ error: 'Server-Fehler beim Speichern' });
  }
}
