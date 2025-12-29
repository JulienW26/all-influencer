import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';

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

    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({ error: 'Profildaten erforderlich' });
    }

    const updatedUser = await PortalUser.findByIdAndUpdate(
      decoded.userId,
      { 
        $set: { profile: profile },
        updatedAt: new Date()
      },
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
        profile: updatedUser.profile
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
