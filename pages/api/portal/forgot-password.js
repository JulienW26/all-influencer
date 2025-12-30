import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../../../lib/email';

/**
 * Forgot Password API
 * 
 * Generiert Reset-Token und sendet E-Mail
 * Token ist 1 Stunde gültig
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Methode ${req.method} nicht erlaubt` });
  }

  const { email, lang = 'de' } = req.body;

  // E-Mail validieren
  if (!email) {
    return res.status(400).json({ error: 'E-Mail-Adresse fehlt' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
  }

  try {
    await dbConnect();

    // User finden (case-insensitive)
    const user = await PortalUser.findOne({ 
      email: email.toLowerCase().trim() 
    });

    // WICHTIG: Aus Sicherheitsgründen IMMER Erfolg melden
    // Sonst können Angreifer prüfen, welche E-Mails registriert sind
    if (!user) {
      console.log('Passwort-Reset angefragt für nicht existierende E-Mail:', email);
      return res.status(200).json({ 
        success: true,
        message: 'Falls ein Account mit dieser E-Mail existiert, wurde eine E-Mail gesendet.'
      });
    }

    // Reset-Token generieren (sicherer Zufallsstring)
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Token hashen für DB-Speicherung (zusätzliche Sicherheit)
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Token und Ablaufdatum speichern (1 Stunde)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 Stunde
    await user.save();

    // E-Mail senden
    try {
      await sendPasswordResetEmail(user.email, hashedToken, lang);
      console.log('✅ Reset-E-Mail gesendet an:', user.email);
    } catch (emailError) {
      console.error('E-Mail-Versand Fehler:', emailError);
      // Trotzdem Erfolg melden (Token ist gespeichert)
    }

    return res.status(200).json({ 
      success: true,
      message: 'Falls ein Account mit dieser E-Mail existiert, wurde eine E-Mail gesendet.'
    });

  } catch (error) {
    console.error('Forgot Password Fehler:', error);
    return res.status(500).json({ error: 'Serverfehler' });
  }
}
