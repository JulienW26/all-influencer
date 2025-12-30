import dbConnect from '../../../lib/mongodb';
import PortalUser from '../../../models/PortalUser';
import bcrypt from 'bcryptjs';

/**
 * Reset Password API
 * 
 * GET: Token validieren
 * POST: Neues Passwort setzen
 */
export default async function handler(req, res) {
  await dbConnect();

  // GET: Token validieren (prüfen ob gültig)
  if (req.method === 'GET') {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: 'Token fehlt' });
    }

    try {
      // User mit diesem Token finden
      const user = await PortalUser.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() } // Token noch nicht abgelaufen
      });

      if (!user) {
        return res.status(400).json({ 
          error: 'Token ungültig oder abgelaufen',
          valid: false 
        });
      }

      // Token ist gültig
      return res.status(200).json({ 
        valid: true,
        email: user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3') // E-Mail teilweise maskieren
      });

    } catch (error) {
      console.error('Token-Validierung Fehler:', error);
      return res.status(500).json({ error: 'Serverfehler' });
    }
  }

  // POST: Neues Passwort setzen
  if (req.method === 'POST') {
    const { token, password } = req.body;

    // Validierung
    if (!token) {
      return res.status(400).json({ error: 'Token fehlt' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Passwort fehlt' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Passwort muss mindestens 8 Zeichen haben' });
    }

    try {
      // User mit diesem Token finden
      const user = await PortalUser.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ error: 'Token ungültig oder abgelaufen' });
      }

      // Neues Passwort hashen
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Passwort aktualisieren und Token löschen
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      console.log('✅ Passwort zurückgesetzt für:', user.email);

      return res.status(200).json({ 
        success: true,
        message: 'Passwort erfolgreich geändert'
      });

    } catch (error) {
      console.error('Passwort-Reset Fehler:', error);
      return res.status(500).json({ error: 'Serverfehler beim Zurücksetzen des Passworts' });
    }
  }

  // Andere Methoden nicht erlaubt
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Methode ${req.method} nicht erlaubt` });
}
