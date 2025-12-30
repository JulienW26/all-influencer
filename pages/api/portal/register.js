/**
 * API Route: Registrierung
 * POST /api/portal/register
 */

import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';
import InvitationCode from '../../../models/InvitationCode';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { 
      invitationCode,
      email,
      password,
      // Influencer
      profileLink,
      // Brand
      companyName,
      contactName,
      phone,
      industry,
      website,
      description,
    } = req.body;

    // Validierung
    if (!invitationCode || !email || !password) {
      return res.status(400).json({ 
        error: 'Einladungscode, E-Mail und Passwort sind erforderlich' 
      });
    }

    // Passwort-Länge prüfen
    if (password.length < 8) {
      return res.status(400).json({ 
        error: 'Passwort muss mindestens 8 Zeichen haben' 
      });
    }

    // E-Mail Format prüfen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
    }

    // Einladungscode prüfen
    const invitation = await InvitationCode.findOne({ 
      code: invitationCode.toUpperCase().trim() 
    });

    if (!invitation) {
      return res.status(400).json({ error: 'Ungültiger Einladungscode' });
    }

    if (invitation.status !== 'active') {
      return res.status(400).json({ error: 'Dieser Code ist nicht mehr gültig' });
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

    // Benutzer erstellen
    const userData = {
      email: email.toLowerCase(),
      password: hashedPassword,
      userType: invitation.type,
      invitationCode: invitation.code,
      status: 'pending',
    };

    // Profil-Daten je nach Typ
    if (invitation.type === 'influencer') {
      userData.influencerProfile = {
        category: invitation.category,
        spotNumber: invitation.spotNumber,
        platforms: profileLink ? [{ url: profileLink }] : [],
      };
    } else {
      userData.brandProfile = {
        companyName: companyName || '',
        contactPerson: contactName || '',
        phone: phone || '',
        industry: industry || '',
        website: website || '',
        description: description || '',
      };
    }

    const user = await PortalUser.create(userData);

    // Code als verwendet markieren
    await InvitationCode.findByIdAndUpdate(invitation._id, {
      status: 'used',
      usedCount: (invitation.usedCount || 0) + 1,
      $push: { usedBy: user._id }
    });

    // Erfolg
    return res.status(201).json({
      success: true,
      message: 'Registrierung erfolgreich! Dein Account wird geprüft.',
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType,
        status: user.status,
      },
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      error: 'Serverfehler: ' + error.message 
    });
  }
}
