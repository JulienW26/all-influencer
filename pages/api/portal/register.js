import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../../../lib/email';

/**
 * Register API für ALL INFLUENCER
 * 
 * Erstellt neuen Benutzer und sendet Welcome-E-Mail
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Methode ${req.method} nicht erlaubt` });
  }

  const { 
    email, 
    password, 
    role = 'influencer',
    name,
    firstName,
    lastName,
    phone,
    instagram,
    tiktok,
    youtube,
    company,
    website,
    industry,
    lang = 'de'
  } = req.body;

  // === Validierung ===
  
  // E-Mail
  if (!email) {
    return res.status(400).json({ error: 'E-Mail ist erforderlich' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
  }

  // Passwort
  if (!password) {
    return res.status(400).json({ error: 'Passwort ist erforderlich' });
  }
  
  if (password.length < 8) {
    return res.status(400).json({ error: 'Passwort muss mindestens 8 Zeichen haben' });
  }

  // Rolle
  if (!['influencer', 'brand'].includes(role)) {
    return res.status(400).json({ error: 'Ungültige Rolle' });
  }

  try {
    await dbConnect();

    // Prüfen ob E-Mail bereits existiert
    const existingUser = await PortalUser.findOne({ 
      email: email.toLowerCase().trim() 
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Diese E-Mail-Adresse ist bereits registriert' });
    }

    // Passwort hashen
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Benutzer erstellen
    const userData = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
      status: 'pending', // Muss von Admin freigeschaltet werden
      preferredLanguage: lang
    };

    // Optionale Felder hinzufügen
    if (name) userData.name = name.trim();
    if (firstName) userData.firstName = firstName.trim();
    if (lastName) userData.lastName = lastName.trim();
    if (phone) userData.phone = phone.trim();
    
    // Influencer-spezifische Felder
    if (role === 'influencer') {
      if (instagram) userData.instagram = instagram.trim().replace('@', '');
      if (tiktok) userData.tiktok = tiktok.trim().replace('@', '');
      if (youtube) userData.youtube = youtube.trim();
    }
    
    // Brand-spezifische Felder
    if (role === 'brand') {
      if (company) userData.company = company.trim();
      if (website) userData.website = website.trim();
      if (industry) userData.industry = industry.trim();
    }

    const user = await PortalUser.create(userData);
    console.log('✅ Neuer Benutzer registriert:', user.email, '| Rolle:', user.role);

    // Welcome-E-Mail senden
    try {
      await sendWelcomeEmail(user.email, {
        name: user.firstName || user.name || user.email.split('@')[0]
      }, lang);
      console.log('✅ Welcome-E-Mail gesendet an:', user.email);
    } catch (emailError) {
      // E-Mail-Fehler nicht kritisch - Registrierung trotzdem erfolgreich
      console.error('Welcome-E-Mail Fehler:', emailError);
    }

    // Erfolg (ohne Passwort zurückgeben)
    return res.status(201).json({
      success: true,
      message: 'Registrierung erfolgreich! Dein Account wird geprüft.',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });

  } catch (error) {
    console.error('Registrierung Fehler:', error);
    
    // Mongoose Validation Error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    
    // Duplicate Key Error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Diese E-Mail-Adresse ist bereits registriert' });
    }
    
    return res.status(500).json({ error: 'Serverfehler bei der Registrierung' });
  }
}
