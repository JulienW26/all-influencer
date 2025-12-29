/**
 * API Route: Registrierung
 * POST /api/portal/register
 */

import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';
import InvitationCode from '../../../models/InvitationCode';
import { createToken, setTokenCookie } from '../../../lib/jwt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { 
      email, 
      password, 
      invitationCode,
      // Influencer-Felder
      displayName,
      platforms,
      bio,
      country,
      languages,
      niche,
      // Brand-Felder
      companyName,
      industry,
      website,
      contactPerson,
      phone,
      description,
    } = req.body;

    // Validierung
    if (!email || !password || !invitationCode) {
      return res.status(400).json({ 
        error: 'E-Mail, Passwort und Einladungscode sind erforderlich' 
      });
    }

    // E-Mail Format prüfen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
    }

    // Passwort-Stärke prüfen
    if (password.length < 8) {
      return res.status(400).json({ 
        error: 'Passwort muss mindestens 8 Zeichen haben' 
      });
    }

    // Einladungscode prüfen
    const invitation = await InvitationCode.findOne({ 
      code: invitationCode.toUpperCase().trim() 
    });

    if (!invitation || !invitation.isValid()) {
      return res.status(400).json({ error: 'Ungültiger Einladungscode' });
    }

    // Prüfen ob E-Mail bereits existiert
    const existingUser = await PortalUser.findOne({ 
      email: email.toLowerCase() 
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'Diese E-Mail-Adresse ist bereits registriert' 
      });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 12);

    // Gründer-Nummer ermitteln (falls Gründer-Code)
    let founderNumber = null;
    if (invitation.isFounderCode) {
      const founderCount = await PortalUser.countDocuments({ isFounder: true });
      founderNumber = founderCount + 1;
    }

    // Benutzer erstellen
    const userData = {
      email: email.toLowerCase(),
      password: hashedPassword,
      userType: invitation.type,
      invitationCode: invitation.code,
      isFounder: invitation.isFounderCode,
      founderNumber,
      status: 'pending', // Muss vom Admin freigegeben werden
    };

    // Profil-Daten je nach Typ
    if (invitation.type === 'influencer') {
      userData.influencerProfile = {
        displayName: displayName || '',
        category: invitation.category,
        spotNumber: invitation.spotNumber,
        platforms: platforms || [],
        bio: bio || '',
        country: country || '',
        languages: languages || [],
        niche: niche || [],
      };
    } else {
      userData.brandProfile = {
        companyName: companyName || '',
        industry: industry || '',
        website: website || '',
        contactPerson: contactPerson || '',
        phone: phone || '',
        description: description || '',
        country: country || '',
      };
    }

    const user = await PortalUser.create(userData);

    // Code als verwendet markieren
    await invitation.markAsUsed(user._id);

    // Token erstellen und Cookie setzen
    const token = createToken({
      userId: user._id.toString(),
      email: user.email,
      userType: user.userType,
      status: user.status,
    });

    setTokenCookie(res, token);

    // Erfolg
    return res.status(201).json({
      success: true,
      message: 'Registrierung erfolgreich! Dein Account wird geprüft.',
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType,
        status: user.status,
        isFounder: user.isFounder,
        founderNumber: user.founderNumber,
      },
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      error: 'Serverfehler. Bitte später erneut versuchen.' 
    });
  }
}
