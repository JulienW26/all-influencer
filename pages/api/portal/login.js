/**
 * API Route: Login
 * POST /api/portal/login
 */

import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';
import { createToken, setTokenCookie } from '../../../lib/jwt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { email, password } = req.body;

    // Validierung
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'E-Mail und Passwort sind erforderlich' 
      });
    }

    // Benutzer suchen
    const user = await PortalUser.findOne({ 
      email: email.toLowerCase() 
    });

    if (!user) {
      return res.status(401).json({ 
        error: 'Ungültige E-Mail oder Passwort' 
      });
    }

    // Passwort prüfen
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Ungültige E-Mail oder Passwort' 
      });
    }

    // Status prüfen
    if (user.status === 'suspended') {
      return res.status(403).json({ 
        error: 'Dein Account wurde gesperrt. Bitte kontaktiere den Support.' 
      });
    }

    if (user.status === 'rejected') {
      return res.status(403).json({ 
        error: 'Deine Registrierung wurde abgelehnt.' 
      });
    }

    // Last Login aktualisieren
    user.lastLoginAt = new Date();
    await user.save();

    // Token erstellen
    const token = createToken({
      userId: user._id.toString(),
      email: user.email,
      userType: user.userType,
      status: user.status,
    });

    setTokenCookie(res, token);

    // Profil-Daten je nach Typ
    const profile = user.userType === 'influencer' 
      ? user.influencerProfile 
      : user.brandProfile;

    // Erfolg
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType,
        status: user.status,
        isFounder: user.isFounder,
        founderNumber: user.founderNumber,
        profile,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      error: 'Serverfehler. Bitte später erneut versuchen.' 
    });
  }
}
